'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fades and lifts every element with `data-reveal` when it scrolls into view; siblings are staggered.
 * Content is visible without JavaScript: only elements below the first screen are hidden, and only
 * after this script runs. Does nothing with reduced motion.
 */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const targets = gsap.utils
        .toArray<HTMLElement>('[data-reveal]')
        .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92)
      if (targets.length === 0) return
      gsap.set(targets, { autoAlpha: 0, y: 32 })
      ScrollTrigger.batch(targets, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'expo.out',
            stagger: 0.08,
            overwrite: true,
          }),
      })
    })
    return () => ctx.revert()
  }, [pathname])

  return null
}
