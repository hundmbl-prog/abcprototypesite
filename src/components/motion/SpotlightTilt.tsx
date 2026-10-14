'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'
import { canUseHoverMotion } from '@/lib/motion'
import { cn } from '@/lib/cn'

type SpotlightTiltProps = {
  children: ReactNode
  className?: string
  /** Maximum tilt in degrees. 0 disables tilt and keeps only the spotlight. */
  maxTilt?: number
}

/**
 * Desktop-only hover effect for cards: a soft light follows the cursor and the card tilts slightly.
 * Exposes --spot-x / --spot-y for the spotlight layer. No effect on touch or with reduced motion.
 */
export function SpotlightTilt({ children, className, maxTilt = 4 }: SpotlightTiltProps) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || !canUseHoverMotion()) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    el.style.setProperty('--spot-x', `${px * 100}%`)
    el.style.setProperty('--spot-y', `${py * 100}%`)
    el.style.setProperty('--spot-opacity', '1')
    if (maxTilt > 0) {
      el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * maxTilt}deg) rotateY(${(px - 0.5) * maxTilt}deg)`
    }
  }

  function reset() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--spot-opacity', '0')
    el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn(
        'relative h-full transition-transform duration-(--dur-slow) ease-out-expo',
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-2 rounded-[inherit] opacity-(--spot-opacity,0) transition-opacity duration-(--dur-slow) [background:radial-gradient(28rem_circle_at_var(--spot-x,50%)_var(--spot-y,50%),var(--spot-color,color-mix(in_srgb,var(--color-on-dark)_16%,transparent)),transparent_45%)]"
      />
    </div>
  )
}
