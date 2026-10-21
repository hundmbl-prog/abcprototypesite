'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { Icon } from './Icon'

/** Small confirmation message at the bottom of the screen; announced politely to screen readers. */
export function Toast({
  message,
  onDone,
  duration = 2600,
}: {
  message: string | null
  onDone: () => void
  duration?: number
}) {
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!message) return
    const timer = window.setTimeout(onDone, duration)
    return () => window.clearTimeout(timer)
  }, [message, onDone, duration])

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      <AnimatePresence>
        {message ? (
          <motion.p
            key={message}
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-pill px-5 py-3 text-small font-semibold text-navy glass-strong"
          >
            <span className="grid size-5 place-items-center rounded-pill bg-success text-on-dark">
              <Icon name="check" className="size-3" strokeWidth={3} />
            </span>
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
