'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import type { NavSection } from '@/content'

/** Dropdown panel for one main navigation section, with a preview image that follows the hovered link. */
export function MegaMenu({
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
  const [active, setActive] = useState<number | null>(null)
  const activeLink = active === null ? undefined : section.links[active]
  const preview = activeLink?.image ?? section.image
  const previewLabel = activeLink?.label ?? section.label

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          key={id}
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 top-full border-t border-line bg-surface text-ink shadow-xl [--focus-ring:var(--color-blue)]"
        >
          <div className="container-page grid grid-cols-12 gap-8 py-10">
            <div className="col-span-3 flex flex-col gap-4">
              <p className="font-display text-h3 font-semibold text-navy">{section.label}</p>
              <p className="text-ink-muted">{section.intro}</p>
              <Link
                href={section.href}
                onClick={onNavigate}
                className="mt-2 inline-flex items-center gap-2 self-start font-semibold text-blue hov:text-blue-strong"
              >
                Alle {section.label === 'Über uns' ? 'Infos' : 'Angebote'} ansehen
                <Icon name="arrow-right" className="size-4" />
              </Link>
            </div>
            <ul
              className="col-span-6 grid grid-cols-2 content-start gap-x-6 gap-y-1"
              onMouseLeave={() => setActive(null)}
            >
              {section.links.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="group/link flex flex-col gap-0.5 rounded-md px-3 py-3 transition-colors duration-(--dur-fast) hov:bg-surface-3"
                  >
                    <span className="inline-flex items-center gap-2 font-semibold text-navy">
                      {link.label}
                      <Icon
                        name="arrow-right"
                        className="size-4 -translate-x-1 text-blue opacity-0 transition-[opacity,transform] duration-(--dur-base) group-hover/link:translate-x-0 group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
                      />
                    </span>
                    {link.description ? (
                      <span className="text-small text-ink-muted">{link.description}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="col-span-3">
              <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-surface-3">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={previewLabel}
                    initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={preview.src}
                      alt=""
                      width={preview.width}
                      height={preview.height}
                      sizes="320px"
                      placeholder={preview.blurDataURL ? 'blur' : 'empty'}
                      blurDataURL={preview.blurDataURL}
                      className="size-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <span className="absolute inset-x-3 bottom-3 rounded-md bg-surface/90 px-3 py-2 text-small font-semibold text-navy backdrop-blur-sm">
                  {previewLabel}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
