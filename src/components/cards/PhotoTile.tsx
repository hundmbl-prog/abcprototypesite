import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import type { HeadingLevel, OfferCardData } from './types'

const factOrder = ['level', 'duration', 'format', 'location', 'start'] as const

/**
 * Photo-led tile: one real photo, the title, one line of text and – when it adds
 * something – a short fact line. The whole tile is one link. No box around it.
 * "row" puts the photo beside the text (used for short lists of two).
 */
export function PhotoTile({
  card,
  headingLevel: Heading = 'h3',
  showCta = false,
  orientation = 'column',
}: {
  card: OfferCardData
  headingLevel?: HeadingLevel
  showCta?: boolean
  orientation?: 'column' | 'row'
}) {
  const facts = factOrder
    .map((key) => card.facts?.[key])
    .filter((f): f is string => !!f)
    .slice(0, 3)
  const row = orientation === 'row'
  return (
    <article className="h-full">
      <Link
        href={card.href}
        className={cn(
          'group flex h-full rounded-lg',
          row ? 'flex-col gap-5 sm:flex-row sm:items-center' : 'flex-col',
        )}
      >
        <div
          className={cn(
            'aspect-4/3 shrink-0 overflow-hidden rounded-lg bg-blue-100',
            row && 'sm:w-2/5',
          )}
        >
          <Image
            src={card.image.src}
            alt={card.image.alt}
            width={card.image.width}
            height={card.image.height}
            sizes={
              row
                ? '(min-width: 640px) 25vw, 100vw'
                : '(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw'
            }
            placeholder={card.image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={card.image.blurDataURL}
            className="size-full object-cover transition-transform duration-(--dur-slow) ease-out-expo group-hover:scale-[1.03]"
          />
        </div>
        <div className={cn('flex flex-1 flex-col', row ? '' : 'pt-4')}>
          <Heading className="text-h4 text-navy transition-colors duration-(--dur-base) group-hover:text-blue">
            {card.title}
          </Heading>
          <p className="mt-1.5 text-ink-muted">{card.description}</p>
          {facts.length ? (
            <p className="mt-2 text-small text-ink-muted">{facts.join(' · ')}</p>
          ) : null}
          {showCta && card.ctaLabel ? (
            <span className="mt-3 inline-flex items-center gap-1.5 font-semibold text-blue group-hover:underline">
              {card.ctaLabel}
              <span aria-hidden>→</span>
            </span>
          ) : null}
        </div>
      </Link>
    </article>
  )
}
