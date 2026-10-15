'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import type { NavSection } from '@/content'

/** Compact dropdown below one main navigation item: the sub-pages of that section. */
export function NavDropdown({
  section,
  id,
  open,
  onNavigate,
}: {
  section: NavSection
  id: string
  open: boolean
  onNavigate: () => void
}) {
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          key={id}
          initial={reduce ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          // pt-3 keeps the hover area continuous between the item and the panel.
          className="absolute top-full left-0 z-10 w-80 pt-3"
        >
          <ul className="flex flex-col gap-0.5 rounded-2xl p-2 text-ink shadow-lg glass-strong">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="group/link flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors duration-(--dur-fast) hov:bg-surface-3"
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-small font-semibold text-navy">{link.label}</span>
                    {link.description ? (
                      <span className="text-small text-ink-muted">{link.description}</span>
                    ) : null}
                  </span>
                  <Icon
                    name="arrow-right"
                    className="mt-0.5 size-4 shrink-0 -translate-x-1 text-red opacity-0 transition-[opacity,transform] duration-(--dur-base) group-hover/link:translate-x-0 group-hover/link:opacity-100 group-focus-visible/link:translate-x-0 group-focus-visible/link:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
