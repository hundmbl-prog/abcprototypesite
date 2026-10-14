'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'
import { canUseHoverMotion } from '@/lib/motion'
import { cn } from '@/lib/cn'

type MagneticProps = {
  children: ReactNode
  /** How strongly the element follows the cursor (0–1). */
  strength?: number
  className?: string
}

/** Wrap a single CTA so it gently follows the cursor on desktop. */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)

  function handleMove(event: PointerEvent<HTMLSpanElement>) {
    const el = ref.current
    if (!el || !canUseHoverMotion()) return
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * strength
    const y = (event.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  function reset() {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn(
        'inline-block transition-transform duration-(--dur-slow) ease-out-expo will-change-transform',
        className,
      )}
    >
      {children}
    </span>
  )
}
