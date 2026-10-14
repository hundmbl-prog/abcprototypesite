import { cn } from '@/lib/cn'
import { CardClassic } from './CardClassic'
import { CardOverlay } from './CardOverlay'
import type { HeadingLevel, OfferCardData } from './types'

/**
 * Variant 4 – bento layout: the first card is featured large, the rest are smaller tiles
 * that alternate between overlay and image-top styles. Works best with 3–5 cards.
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
  const [featured, ...rest] = cards
  if (!featured) return null
  return (
    <ul
      className={cn(
        'grid gap-4 md:grid-cols-2 lg:auto-rows-[minmax(--spacing(72),auto)] lg:grid-cols-4 lg:gap-6',
        className,
      )}
    >
      <li className="min-w-0 md:col-span-2 lg:row-span-2">
        <CardOverlay
          card={featured}
          size="featured"
          headingLevel={headingLevel}
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </li>
      {rest.slice(0, 4).map((card, index) => (
        <li key={card.id} className="min-w-0">
          {index % 3 === 0 ? (
            <CardOverlay
              card={card}
              size="tile"
              headingLevel={headingLevel}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
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
