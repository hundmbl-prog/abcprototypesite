'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'

let hasMounted = false

/**
 * Page transition: new pages fade and slide in on client-side navigation.
 * The very first page load is not animated, so the hero paints immediately (better LCP).
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const [isNavigation] = useState(() => hasMounted)
  useEffect(() => {
    hasMounted = true
  }, [])
  const animate = isNavigation && !reduce
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
