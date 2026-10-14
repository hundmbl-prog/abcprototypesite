'use client'

import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

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
    const instance = new Lenis({ anchors: { offset: -80 }, lerp: 0.12 })
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

  // New page: start at the top and let ScrollTrigger measure the new layout.
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
    ScrollTrigger.refresh()
  }, [pathname, lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
