'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { OfferCards } from '@/components/cards/OfferCards'
import type { CardVariant, OfferCardData } from '@/components/cards/types'
import { FilterChip } from '@/components/ui/FilterChip'

const ALL = 'Alle'

/** Offer cards with level filter chips; the result list fades and lifts when the filter changes. */
export function FilteredCards({
  cards,
  variant,
  label,
  by = 'level',
  simple = false,
}: {
  cards: OfferCardData[]
  variant: CardVariant
  label: string
  by?: 'level' | 'tag'
  simple?: boolean
}) {
  const reduce = useReducedMotion()
  const keyOf = (c: OfferCardData) => (by === 'tag' ? c.tag : c.facts?.level)
  const levels = useMemo(
    () => [
      ALL,
      ...Array.from(
        new Set(
          cards.map((c) => (by === 'tag' ? c.tag : c.facts?.level)).filter((l): l is string => !!l),
        ),
      ),
    ],
    [cards, by],
  )
  const [active, setActive] = useState(ALL)
  const visible = active === ALL ? cards : cards.filter((c) => keyOf(c) === active)

  return (
    <div className="flex flex-col gap-8">
      <div
        role="group"
        aria-label={`${label} nach ${by === 'tag' ? 'Kategorie' : 'Niveau'} filtern`}
        className="flex flex-wrap gap-2"
      >
        {levels.map((level) => (
          <FilterChip
            key={level}
            selected={active === level}
            count={level === ALL ? cards.length : cards.filter((c) => keyOf(c) === level).length}
            onClick={() => setActive(level)}
          >
            {level}
          </FilterChip>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'Angebot' : 'Angebote'} angezeigt
      </p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <OfferCards cards={visible} variant={variant} label={label} simple={simple} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
