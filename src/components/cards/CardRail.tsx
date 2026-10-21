'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { CardClassic } from './CardClassic'
import type { HeadingLevel, OfferCardData } from './types'

const DESKTOP = '(min-width: 64rem)'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Variant 5 – swipeable carousel row on mobile and tablet, a regular 3-column grid on desktop.
 */
export function CardRail({
  cards,
  label,
  headingLevel = 'h3',
  className,
}: {
  cards: OfferCardData[]
  /** Accessible name of the carousel, e.g. "Aktuelle Projekte". */
  label: string
  headingLevel?: HeadingLevel
  className?: string
}) {
  const [viewportRef, api] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    breakpoints: { [DESKTOP]: { active: false } },
  })
  const [isDesktop, setIsDesktop] = useState(false)
  const [index, setIndex] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [snapCount, setSnapCount] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP)
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const sync = useCallback(() => {
    if (!api) return
    setIndex(api.selectedScrollSnap())
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
    setSnapCount(api.scrollSnapList().length)
  }, [api])

  useEffect(() => {
    if (!api) return
    sync()
    api.on('select', sync).on('reInit', sync)
    return () => {
      api.off('select', sync).off('reInit', sync)
    }
  }, [api, sync])

  const carousel = !isDesktop

  return (
    <div
      role={carousel ? 'region' : undefined}
      aria-roledescription={carousel ? 'Karussell' : undefined}
      aria-label={carousel ? label : undefined}
      className={cn('flex flex-col gap-6', className)}
    >
      <div ref={viewportRef} className="-m-2 overflow-hidden p-2 lg:overflow-visible">
        <div
          role={carousel ? undefined : 'list'}
          className="flex gap-4 lg:grid lg:grid-cols-3 lg:gap-6"
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              role={carousel ? 'group' : 'listitem'}
              aria-roledescription={carousel ? 'Folie' : undefined}
              aria-label={carousel ? `${i + 1} von ${cards.length}` : undefined}
              className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-auto"
            >
              <CardClassic
                card={card}
                headingLevel={headingLevel}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 85vw"
              />
            </div>
          ))}
        </div>
      </div>

      {carousel && snapCount > 1 ? (
        <div className="flex items-center justify-between gap-4">
          <p className="text-small text-ink-muted" aria-live="polite">
            {index + 1} / {snapCount}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => api?.scrollPrev(prefersReducedMotion())}
              disabled={!canPrev}
              className="grid size-11 place-items-center rounded-pill border border-control text-navy transition-colors duration-(--dur-base) disabled:opacity-40 hov:bg-blue hov:text-on-dark"
            >
              <Icon name="arrow-left" label="Vorherige Karte" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext(prefersReducedMotion())}
              disabled={!canNext}
              className="grid size-11 place-items-center rounded-pill border border-control text-navy transition-colors duration-(--dur-base) disabled:opacity-40 hov:bg-blue hov:text-on-dark"
            >
              <Icon name="arrow-right" label="Nächste Karte" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
