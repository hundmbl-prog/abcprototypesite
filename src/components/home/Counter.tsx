'use client'

import { useEffect, useRef, useState } from 'react'

const numberFormat = new Intl.NumberFormat('de-DE')

/**
 * Counts up to `value` when it scrolls into view. The final number is server-rendered,
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
    if (el.getBoundingClientRect().top < window.innerHeight) return
    setDisplay(0)
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const duration = 1600
        const step = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          setDisplay(Math.round(value * (1 - Math.pow(1 - t, 4))))
          if (t < 1) frame = requestAnimationFrame(step)
        }
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
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
