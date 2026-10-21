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
      const below = (el: HTMLElement) => el.getBoundingClientRect().top > window.innerHeight * 0.92
      const all = gsap.utils.toArray<HTMLElement>('[data-reveal]').filter(below)
      const images = all.filter((el) => el.dataset.reveal === 'image')
      const blocks = all.filter((el) => el.dataset.reveal !== 'image')

      if (blocks.length) {
        // opacity only (not visibility): content stays available to screen readers before it scrolls in
        gsap.set(blocks, { opacity: 0, y: 32 })
        ScrollTrigger.batch(blocks, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'expo.out',
              stagger: 0.08,
              overwrite: true,
            }),
        })
      }
      // Photos: a soft wipe from bottom to top with a slight zoom-out.
      images.forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(18% 0% 0% 0% round 1.5rem)', scale: 1.04 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
            scale: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })
    })
    return () => ctx.revert()
  }, [pathname])

  return null
}
