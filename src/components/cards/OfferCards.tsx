import { cn } from '@/lib/cn'
import { BentoGrid } from './BentoGrid'
import { CardClassic, type CardShade } from './CardClassic'
import { CardHorizontal } from './CardHorizontal'
import { CardOverlay } from './CardOverlay'
import { CardRail } from './CardRail'
import type { CardVariant, HeadingLevel, OfferCardData } from './types'

/** Renders a list of offers in the variant an editor picked for this section. */
export function OfferCards({
  cards,
  variant,
  label,
  headingLevel = 'h3',
  shades,
  simple = false,
  className,
}: {
  /** Classic variant only: photo with overlapping info box. */
  simple?: boolean
  /** Classic variant only: solid text-area colours, used in turn for each card. */
  shades?: CardShade[]
  cards: OfferCardData[]
  variant: CardVariant
  /** Accessible name, used by the carousel variant. */
  label: string
  headingLevel?: HeadingLevel
  className?: string
}) {
  switch (variant) {
    case 'bento':
      return <BentoGrid cards={cards} headingLevel={headingLevel} className={className} />
    case 'rail':
      return (
        <CardRail cards={cards} label={label} headingLevel={headingLevel} className={className} />
      )
    case 'horizontal':
      return (
        <ul className={cn('flex flex-col gap-4', className)}>
          {cards.map((card) => (
            <li key={card.id} className="min-w-0">
              <CardHorizontal card={card} headingLevel={headingLevel} />
            </li>
          ))}
        </ul>
      )
    case 'overlay':
      return (
        <ul className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
          {cards.map((card) => (
            <li key={card.id} className="min-w-0">
              <CardOverlay card={card} headingLevel={headingLevel} />
            </li>
          ))}
        </ul>
      )
    case 'classic':
      return (
        <ul className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
          {cards.map((card, i) => (
            <li key={card.id} data-reveal className="min-w-0">
              <CardClassic
                card={card}
                headingLevel={headingLevel}
                shade={shades?.[i % shades.length]}
                simple={simple}
              />
            </li>
          ))}
        </ul>
      )
  }
}
