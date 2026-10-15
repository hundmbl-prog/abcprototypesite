'use client'

import { useEffect, useRef, useState } from 'react'

const numberFormat = new Intl.NumberFormat('de-DE')

/**
 * Counts up to `value` when it scrolls into view and always ends on `value`. The final number is server-rendered,
 * so it is correct without JavaScript and with reduced motion.
 */
export function Counter({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Already on screen or scrolled past: keep the final number.
    if (el.getBoundingClientRect().top < window.innerHeight) return
    // Still below the screen (invisible), so it can start from 0.
    setDisplay(0)
    let frame = 0
    let started = false
    const start = () => {
      if (started || el.getBoundingClientRect().top > window.innerHeight * 0.9) return
      started = true
      window.removeEventListener('scroll', start)
      window.removeEventListener('resize', start)
      const begin = performance.now()
      const duration = 1600
      const step = (now: number) => {
        const t = Math.min((now - begin) / duration, 1)
        setDisplay(Math.round(value * (1 - Math.pow(1 - t, 4))))
        if (t < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }
    // A scroll listener (not only IntersectionObserver) so fast scrolling past it still finishes the count.
    window.addEventListener('scroll', start, { passive: true })
    window.addEventListener('resize', start)
    return () => {
      window.removeEventListener('scroll', start)
      window.removeEventListener('resize', start)
      cancelAnimationFrame(frame)
      setDisplay(value)
    }
  }, [value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {numberFormat.format(display)}
      {suffix}
    </span>
  )
}
