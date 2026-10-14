import { cn } from '@/lib/cn'
import { CardCta, CardFacts, CardImage, CardMeta, CardTitle, cardFocus } from './parts'
import type { HeadingLevel, OfferCardData } from './types'

type CardHorizontalProps = {
  card: OfferCardData
  headingLevel?: HeadingLevel
  sizes?: string
  preview?: 'hover'
  className?: string
}

/** Variant 3 – image left, content right. For lists such as exam dates or course dates. */
export function CardHorizontal({
  card,
  headingLevel = 'h3',
  sizes = '(min-width: 768px) 320px, 100vw',
  preview,
  className,
}: CardHorizontalProps) {
  return (
    <article
      data-preview={preview}
      className={cn(
        'group relative grid overflow-hidden rounded-lg border border-line bg-surface transition-[border-color,box-shadow] duration-(--dur-slow) ease-out-expo',
        'md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)] hov:border-blue hov:shadow-lg',
        cardFocus,
        className,
      )}
    >
      <div className="aspect-16/10 overflow-hidden md:aspect-auto md:h-full">
        <CardImage image={card.image} sizes={sizes} />
      </div>
      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:gap-8 md:p-8">
        <div className="flex flex-1 flex-col gap-3">
          <CardMeta card={card} />
          <CardTitle card={card} as={headingLevel} className="text-h3" />
          <p className="line-clamp-2 text-ink-muted">{card.description}</p>
          <CardFacts facts={card.facts} max={5} />
        </div>
        <span
          aria-hidden
          className="inline-flex items-center gap-2 self-start rounded-pill border border-line px-4 py-2 transition-colors duration-(--dur-base) md:self-center group-hov:border-blue group-hov:bg-blue"
        >
          <CardCta label={card.ctaLabel ?? 'Mehr erfahren'} className="group-hov:text-on-dark" />
        </span>
      </div>
    </article>
  )
}
