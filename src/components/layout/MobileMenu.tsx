'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { Location, NavSection } from '@/content'
import type { NavLink } from '@/content/types'

/** Full-screen menu for phones and tablets. Traps focus, closes with Escape. */
export function MobileMenu({
  open,
  onClose,
  sections,
  cta,
  location,
  returnFocusTo,
}: {
  open: boolean
  onClose: () => void
  sections: NavSection[]
  cta: NavLink
  location?: Location
  returnFocusTo: React.RefObject<HTMLButtonElement | null>
}) {
  const reduce = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [expanded, setExpanded] = useState<number | null>(null)
  const baseId = useId()

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const returnTarget = returnFocusTo.current
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      returnTarget?.focus()
    }
  }, [open, onClose, returnFocusTo])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Hauptmenü"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.2 } }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain tone-navy xl:hidden"
          data-lenis-prevent
        >
          <div className="container-page flex h-20 shrink-0 items-center justify-between">
            <span className="font-display text-h4 font-semibold">Menü</span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="grid size-11 place-items-center rounded-pill border border-on-dark/40 hov:bg-on-dark/10"
            >
              <Icon name="close" label="Menü schließen" />
            </button>
          </div>
          <nav aria-label="Hauptnavigation" className="container-page flex-1 py-6">
            <ul className="flex flex-col divide-y divide-on-dark/15">
              {sections.map((section, index) => {
                const isOpen = expanded === index
                const panelId = `${baseId}-panel-${index}`
                return (
                  <motion.li
                    key={section.href}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduce ? 0 : 0.05 * index,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpanded(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left font-display text-h3 font-semibold"
                    >
                      {section.label}
                      <Icon
                        name="chevron-down"
                        className={cn(
                          'size-6 transition-transform duration-(--dur-base)',
                          isOpen && 'rotate-180',
                        )}
                      />
                    </button>
                    <div id={panelId} hidden={!isOpen} className="pb-4">
                      <ul className="flex flex-col gap-1">
                        <li>
                          <Link
                            href={section.href}
                            onClick={onClose}
                            className="block rounded-md py-2 font-semibold"
                          >
                            Übersicht {section.label}
                          </Link>
                        </li>
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={onClose}
                              className="block rounded-md py-2 text-on-dark-muted hov:text-on-dark"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.li>
                )
              })}
            </ul>
          </nav>
          <div className="container-page flex flex-col gap-4 border-t border-on-dark/15 py-8">
            <Button href={cta.href} variant="cta" icon="arrow-right" onClick={onClose}>
              {cta.label}
            </Button>
            {location ? (
              <p className="text-small text-on-dark-muted">
                {location.street}, {location.postalCode} {location.city} ·{' '}
                <a
                  href={`tel:${location.phone.replace(/\s/g, '')}`}
                  className="font-semibold text-on-dark underline"
                >
                  {location.phone}
                </a>
              </p>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
