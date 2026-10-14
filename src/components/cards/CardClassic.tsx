import { cn } from '@/lib/cn'
import { SpotlightTilt } from '@/components/motion/SpotlightTilt'
import { CardCta, CardFacts, CardImage, CardMeta, CardTitle, cardFocus } from './parts'
import type { HeadingLevel, OfferCardData } from './types'

type CardClassicProps = {
  card: OfferCardData
  headingLevel?: HeadingLevel
  /** next/image sizes attribute; default fits a 3-column grid. */
  sizes?: string
  compact?: boolean
  preview?: 'hover'
  className?: string
}

/** Variant 1 – image on top, lifts with a deeper shadow on hover. */
export function CardClassic({
  card,
  headingLevel = 'h3',
  sizes = '(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw',
  compact = false,
  preview,
  className,
}: CardClassicProps) {
  return (
    <SpotlightTilt maxTilt={3} className={cn('rounded-xl', className)}>
      <article
        data-preview={preview}
        className={cn(
          'group sheen relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-md [--spot-color:color-mix(in_srgb,var(--color-blue)_8%,transparent)]',
          'transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo hov:-translate-y-1.5 hov:shadow-(--shadow-float)',
          cardFocus,
        )}
      >
        <div className={cn('overflow-hidden', compact ? 'aspect-video' : 'aspect-16/10')}>
          <CardImage image={card.image} sizes={sizes} />
        </div>
        <div className={cn('flex flex-1 flex-col gap-3', compact ? 'p-5' : 'p-6')}>
          <CardMeta card={card} />
          <CardTitle card={card} as={headingLevel} className={compact ? 'text-h4' : 'text-h3'} />
          <p className="line-clamp-2 text-ink-muted">{card.description}</p>
          <CardFacts facts={card.facts} max={compact ? 2 : 4} className="mt-auto pt-2" />
          <CardCta label={card.ctaLabel ?? 'Mehr erfahren'} className="pt-2" />
        </div>
      </article>
    </SpotlightTilt>
  )
}
