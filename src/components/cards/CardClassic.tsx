import { cn } from '@/lib/cn'
import { SpotlightTilt } from '@/components/motion/SpotlightTilt'
import { CardCta, CardFacts, CardImage, CardMeta, CardTitle, cardFocus } from './parts'
import type { HeadingLevel, OfferCardData } from './types'

/** Solid colour for the text area. All shades are dark enough for white text (≥ 4.5:1). */
export type CardShade =
  | 'blue-500'
  | 'blue-600'
  | 'blue-700'
  | 'blue-800'
  | 'blue-900'
  | 'blue-950'
  | 'red-500'
  | 'red-600'

const shadeVar: Record<CardShade, string> = {
  'blue-500': '[--shade:var(--color-blue-500)]',
  'blue-600': '[--shade:var(--color-blue-600)]',
  'blue-700': '[--shade:var(--color-blue-700)]',
  'blue-800': '[--shade:var(--color-blue-800)]',
  'blue-900': '[--shade:var(--color-blue-900)]',
  'blue-950': '[--shade:var(--color-blue-950)]',
  'red-500': '[--shade:var(--color-red-500)]',
  'red-600': '[--shade:var(--color-red-600)]',
}

type CardClassicProps = {
  /** Optional solid colour for the text area (white text). Default: white card. */
  shade?: CardShade
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
  shade,
  preview,
  className,
}: CardClassicProps) {
  return (
    <SpotlightTilt maxTilt={3} className={cn('rounded-xl', className)}>
      <article
        data-preview={preview}
        className={cn(
          'group sheen relative flex h-full flex-col overflow-hidden rounded-xl shadow-md',
          'transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo hov:-translate-y-1.5 hov:shadow-(--shadow-float)',
          shade
            ? cn(
                shadeVar[shade],
                'bg-(--shade) text-on-dark [--focus-ring:var(--shade)] [--spot-color:color-mix(in_srgb,var(--color-surface)_14%,transparent)]',
              )
            : 'border border-line bg-surface [--spot-color:color-mix(in_srgb,var(--color-blue)_8%,transparent)]',
          cardFocus,
        )}
      >
        <div className={cn('relative overflow-hidden', compact ? 'aspect-video' : 'aspect-16/10')}>
          <CardImage image={card.image} sizes={sizes} />
          {shade ? (
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-(--shade) to-transparent"
            />
          ) : null}
        </div>
        <div className={cn('flex flex-1 flex-col gap-3', compact ? 'p-5' : 'p-6')}>
          <CardMeta card={card} tagTone={shade ? 'dark' : 'light'} />
          <CardTitle card={card} as={headingLevel} className={compact ? 'text-h4' : 'text-h3'} />
          <p className={cn('line-clamp-2', shade ? 'text-on-dark' : 'text-ink-muted')}>
            {card.description}
          </p>
          <CardFacts
            facts={card.facts}
            max={compact ? 2 : 4}
            tone={shade ? 'dark' : 'light'}
            className="mt-auto pt-2"
          />
          <CardCta
            label={card.ctaLabel ?? 'Mehr erfahren'}
            tone={shade ? 'dark' : 'light'}
            className="pt-2"
          />
        </div>
      </article>
    </SpotlightTilt>
  )
}
