'use client'

import { useEffect } from 'react'

/**
 * One pointer listener for the whole site (mouse and pen only, never touch):
 * - `data-glow` elements get a soft light that follows the cursor (CSS vars --gx/--gy),
 * - `data-tilt` elements lean slightly towards the cursor (CSS vars --rx/--ry).
 * Both are pure decoration; with reduced motion the tilt is switched off in CSS.
 */
export function PointerEffects() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let frame = 0
    let tilted: HTMLElement | null = null
    const reset = (el: HTMLElement) => {
      el.style.removeProperty('--rx')
      el.style.removeProperty('--ry')
    }
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const target = event.target instanceof Element ? event.target : null
        const glow = target?.closest<HTMLElement>('[data-glow]')
        if (glow) {
          const r = glow.getBoundingClientRect()
          glow.style.setProperty('--gx', `${event.clientX - r.left}px`)
          glow.style.setProperty('--gy', `${event.clientY - r.top}px`)
        }
        const tilt = target?.closest<HTMLElement>('[data-tilt]') ?? null
        if (tilted && tilted !== tilt) reset(tilted)
        tilted = tilt
        if (tilt) {
          const r = tilt.getBoundingClientRect()
          const x = (event.clientX - r.left) / r.width - 0.5
          const y = (event.clientY - r.top) / r.height - 0.5
          tilt.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`)
          tilt.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`)
        }
      })
    }
    const onLeave = () => {
      if (tilted) reset(tilted)
      tilted = null
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])
  return null
}
