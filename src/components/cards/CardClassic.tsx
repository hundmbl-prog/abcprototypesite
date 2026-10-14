import { cn } from '@/lib/cn'
import { SpotlightTilt } from '@/components/motion/SpotlightTilt'
import { CardCta, CardFacts, CardImage, CardMeta, CardTitle, cardFocus } from './parts'
import type { HeadingLevel, OfferCardData } from './types'

/**
 * Colour of the text area. Light tints (50–100) get navy text, strong shades (500+) white text –
 * both combinations meet WCAG AA.
 */
export type LightShade = 'blue-50' | 'blue-100' | 'red-50' | 'red-100'
export type CardShade =
  | LightShade
  | 'blue-500'
  | 'blue-600'
  | 'blue-700'
  | 'blue-800'
  | 'blue-900'
  | 'blue-950'
  | 'red-500'
  | 'red-600'

const lightShades = new Set<CardShade>(['blue-50', 'blue-100', 'red-50', 'red-100'])

const shadeVar: Record<CardShade, string> = {
  'blue-50': '[--shade:var(--color-blue-50)]',
  'blue-100': '[--shade:var(--color-blue-100)]',
  'red-50': '[--shade:var(--color-red-50)]',
  'red-100': '[--shade:var(--color-red-100)]',
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
  const dark = shade !== undefined && !lightShades.has(shade)
  const light = shade !== undefined && !dark
  return (
    <SpotlightTilt maxTilt={3} className={cn('rounded-xl', className)}>
      <article
        data-preview={preview}
        className={cn(
          'group sheen relative flex h-full flex-col overflow-hidden rounded-xl shadow-md',
          'transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo hov:-translate-y-1.5 hov:shadow-(--shadow-float)',
          dark && shade
            ? cn(
                shadeVar[shade],
                'bg-(--shade) text-on-dark [--focus-ring:var(--shade)] [--spot-color:color-mix(in_srgb,var(--color-surface)_14%,transparent)]',
              )
            : light && shade
              ? cn(
                  shadeVar[shade],
                  'bg-linear-to-b from-(--shade) to-surface text-ink ring-1 ring-blue-900/5 [--spot-color:color-mix(in_srgb,var(--color-blue)_10%,transparent)]',
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
          <CardMeta card={card} tagTone={dark ? 'dark' : light ? 'image' : 'light'} />
          <CardTitle
            card={card}
            as={headingLevel}
            className={cn(compact ? 'text-h4' : 'text-h3', !dark && 'text-blue-900')}
          />
          <p className={cn('line-clamp-2', dark ? 'text-on-dark' : 'text-ink-muted')}>
            {card.description}
          </p>
          <CardFacts
            facts={card.facts}
            max={compact ? 2 : 4}
            tone={dark ? 'dark' : 'light'}
            className="mt-auto pt-2"
          />
          <CardCta
            label={card.ctaLabel ?? 'Mehr erfahren'}
            tone={dark ? 'dark' : 'light'}
            className="pt-2"
          />
        </div>
      </article>
    </SpotlightTilt>
  )
}
