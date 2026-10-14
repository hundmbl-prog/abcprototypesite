import { cn } from '@/lib/cn'
import { CardClassic } from './CardClassic'
import { CardOverlay } from './CardOverlay'
import type { HeadingLevel, OfferCardData } from './types'

/**
 * Variant 4 – bento layout: the first card is featured large, the rest are smaller tiles.
 * Works with 3–6 cards. With 6 cards the last three tiles become wide tiles, so the grid stays closed.
 */
export function BentoGrid({
  cards,
  headingLevel = 'h3',
  className,
}: {
  cards: OfferCardData[]
  headingLevel?: HeadingLevel
  className?: string
}) {
  const [featured, ...others] = cards
  if (!featured) return null
  const rest = others.slice(0, 5)
  const wide = (index: number) => rest.length === 5 && index >= 2
  return (
    <ul
      className={cn(
        'grid gap-4 md:grid-cols-2 lg:auto-rows-[minmax(--spacing(72),auto)] lg:grid-cols-4 lg:gap-6',
        className,
      )}
    >
      <li data-reveal className="min-w-0 md:col-span-2 lg:row-span-2">
        <CardOverlay
          card={featured}
          size="featured"
          headingLevel={headingLevel}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </li>
      {rest.map((card, index) => (
        <li key={card.id} data-reveal className={cn('min-w-0', wide(index) && 'md:col-span-2')}>
          {wide(index) || index % 3 === 0 ? (
            <CardOverlay
              card={card}
              size="tile"
              headingLevel={headingLevel}
              sizes={
                wide(index)
                  ? '(min-width: 768px) 50vw, 100vw'
                  : '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw'
              }
            />
          ) : (
            <CardClassic
              card={card}
              compact
              headingLevel={headingLevel}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            />
          )}
        </li>
      ))}
    </ul>
  )
}
