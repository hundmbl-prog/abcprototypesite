import Link from 'next/link'
import { cn } from '@/lib/cn'
import { BentoGrid } from './BentoGrid'
import { CardIcon } from './CardIcon'
import { PhotoTile } from './PhotoTile'
import { CardOverlay } from './CardOverlay'
import { CardRail } from './CardRail'
import type { CardVariant, HeadingLevel, OfferCardData } from './types'

/** Renders a list of offers in the variant an editor picked for this section. */
export function OfferCards({
  cards,
  variant,
  label,
  headingLevel = 'h3',
  className,
}: {
  cards: OfferCardData[]
  variant: CardVariant
  /** Accessible name, used by the carousel variant. */
  label: string
  headingLevel?: HeadingLevel
  className?: string
}) {
  switch (variant) {
    case 'text':
      // Photo-free offer list: title, one line and the card's own link text, divided by lines
      return (
        <ul className={cn('grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3', className)}>
          {cards.map((card) => (
            <li key={card.id} className="min-w-0 border-t border-line">
              <Link href={card.href} className="group flex h-full flex-col gap-2 py-7">
                <HeadingTag
                  level={headingLevel}
                  className="text-h4 text-navy group-hover:text-blue"
                >
                  {card.title}
                </HeadingTag>
                <p className="text-ink-muted">{card.description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-semibold text-blue group-hover:underline">
                  {card.ctaLabel ?? 'Mehr erfahren'}
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )
    case 'icon':
      return (
        <ul
          className={cn(
            'grid grid-cols-1 gap-5 sm:grid-cols-2',
            cards.length === 4 ? 'lg:grid-cols-4' : cards.length === 2 ? '' : 'lg:grid-cols-3',
            className,
          )}
        >
          {cards.map((card, index) => (
            <li key={card.id} data-reveal className="min-w-0">
              <CardIcon card={card} index={index} headingLevel={headingLevel} />
            </li>
          ))}
        </ul>
      )
    case 'bento':
      return <BentoGrid cards={cards} headingLevel={headingLevel} className={className} />
    case 'rail':
      return (
        <CardRail cards={cards} label={label} headingLevel={headingLevel} className={className} />
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
    case 'horizontal': {
      // Link texts are only shown when every card has its own – never the same label six times
      const labels = cards.map((c) => c.ctaLabel)
      const showCta = labels.every(Boolean) && new Set(labels).size === labels.length
      const row = variant === 'horizontal'
      return (
        <ul
          className={cn(
            'grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2',
            row
              ? ''
              : cards.length === 4
                ? 'lg:grid-cols-4'
                : cards.length === 2
                  ? ''
                  : 'lg:grid-cols-3',
            className,
          )}
        >
          {cards.map((card) => (
            <li key={card.id} className="min-w-0">
              <PhotoTile
                card={card}
                headingLevel={headingLevel}
                showCta={showCta}
                orientation={row ? 'row' : 'column'}
              />
            </li>
          ))}
        </ul>
      )
    }
  }
}

function HeadingTag({
  level,
  className,
  children,
}: {
  level: HeadingLevel
  className?: string
  children: React.ReactNode
}) {
  const Tag = level
  return <Tag className={className}>{children}</Tag>
}
