'use client'

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { CardClassic, type CardShade } from '@/components/cards/CardClassic'
import type { OfferCardData } from '@/components/cards/types'
import { cn } from '@/lib/cn'
import type { OfferFilter } from '@/content/types'

/** Soft tints only: navy text on all of them (AA). A card keeps its tint while filtering. */
const tints: CardShade[] = ['blue-100', 'red-100', 'blue-100', 'red-100', 'blue-100', 'red-100']

/** Offer grid with filter chips; cards glide into their new place (off with reduced motion). */
export function OffersFilter({
  cards,
  filters,
}: {
  cards: OfferCardData[]
  filters: OfferFilter[]
}) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(filters[0]?.id ?? 'alle')
  const filter = filters.find((f) => f.id === active)
  const visible = cards
    .map((card, index) => ({ card, tint: tints[index % tints.length] }))
    .filter(({ card }) => !filter || filter.tags.length === 0 || filter.tags.includes(card.tag))

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Angebote filtern" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const selected = f.id === active
          const count =
            f.tags.length === 0 ? cards.length : cards.filter((c) => f.tags.includes(c.tag)).length
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(f.id)}
              className={cn(
                'relative inline-flex min-h-11 items-center gap-2 rounded-pill px-4 text-small font-semibold transition-colors duration-(--dur-base)',
                selected ? 'text-blue-900' : 'text-ink-muted hov:text-blue-900',
              )}
            >
              {selected ? (
                <motion.span
                  layoutId="offer-filter-pill"
                  transition={
                    reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                  }
                  className="absolute inset-0 -z-10 rounded-pill bg-surface shadow-md ring-1 ring-blue-200"
                />
              ) : null}
              {f.label}
              <span
                className={cn(
                  'rounded-pill px-2 text-caption',
                  selected ? 'bg-blue-100 text-blue-800' : 'bg-surface-3 text-ink-muted',
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} Angebote angezeigt
      </p>

      <LayoutGroup>
        <motion.ul layout={!reduce} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map(({ card, tint }) => (
              <motion.li
                key={card.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={
                  reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.96 }
                }
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="min-w-0"
              >
                <CardClassic card={card} shade={tint} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </div>
  )
}
