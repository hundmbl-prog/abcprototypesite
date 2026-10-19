'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

/** Scroll-linked zoom-out of the hero image; the text drifts up and fades. Off with reduced motion. */
export function HeroScroll({ targetId }: { targetId: string }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const section = document.getElementById(targetId)
    if (!section) return
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      })
      timeline
        .to('[data-hero-media]', { scale: 0.9, borderRadius: '2rem', ease: 'none' }, 0)
        .to('[data-hero-content]', { yPercent: -12, autoAlpha: 0.2, ease: 'none' }, 0)
    }, section)
    return () => ctx.revert()
  }, [targetId])
  return null
}
