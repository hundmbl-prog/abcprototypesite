'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { useLenis } from './SmoothScroll'

/** Back-to-top button after the first screen. */
export function ScrollExtras() {
  const [showTop, setShowTop] = useState(false)
  const lenis = useLenis()
  const reduce = useReducedMotion()

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setShowTop(window.scrollY > window.innerHeight * 1.2)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  function toTop() {
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    document.getElementById('inhalt')?.focus({ preventScroll: true })
  }

  return (
    <>
      <AnimatePresence>
        {showTop ? (
          <motion.button
            type="button"
            onClick={toTop}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="fixed right-4 bottom-4 z-40 grid size-12 place-items-center rounded-pill text-blue-800 glass-strong md:right-6 md:bottom-6 hov:text-blue-600"
          >
            <Icon name="arrow-right" className="size-5 -rotate-90" />
            <span className="sr-only">Nach oben</span>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  )
}
