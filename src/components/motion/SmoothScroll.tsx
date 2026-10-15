'use client'

import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

/** Space for the sticky header when scrolling to a section. */
const OFFSET = -80

function findTarget(hash: string) {
  if (!hash || hash === '#') return null
  return document.getElementById(decodeURIComponent(hash.slice(1)))
}

/** Access the smooth-scroll instance (null when reduced motion is on or before mount). */
export function useLenis() {
  return useContext(LenisContext)
}

/**
 * Lenis smooth scrolling, kept in sync with GSAP ScrollTrigger.
 * Not started when the user prefers reduced motion – native scrolling is used instead.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const instance = new Lenis({ anchors: { offset: OFFSET }, lerp: 0.12 })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  // New page: start at the top – or at the section named in the URL (e.g. /projekte#startklar) –
  // and let ScrollTrigger measure the new layout.
  useEffect(() => {
    const target = findTarget(window.location.hash)
    if (target)
      lenis?.scrollTo(target.getBoundingClientRect().top + window.scrollY + OFFSET, {
        immediate: true,
      })
    else lenis?.scrollTo(0, { immediate: true })
    ScrollTrigger.refresh()
  }, [pathname, lenis])

  // Links to a section of the current page, also written with the path (e.g. "/projekte#startklar"):
  // scroll there smoothly and update the address. Lenis would otherwise undo the native jump.
  useEffect(() => {
    if (!lenis) return
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]')
      if (!link || (link.target && link.target !== '_self')) return
      const url = new URL(link.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return
      const target = findTarget(url.hash)
      if (!target) return
      // handled here only – neither the router nor Lenis' own anchor handling may start a second scroll
      event.preventDefault()
      event.stopPropagation()
      window.history.pushState(window.history.state, '', url.hash)
      // Sync Lenis with the real position first (native scrolling, e.g. the scrollbar, can leave it
      // behind), then scroll to the target's absolute position.
      const current = window.scrollY
      lenis.scrollTo(current, { immediate: true })
      lenis.scrollTo(target.getBoundingClientRect().top + current + OFFSET)
      // keyboard and screen reader users continue reading at the section
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
