import Link from 'next/link'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
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
  /** Optional colour for the text area. Default: white card. */
  shade?: CardShade
  card: OfferCardData
  headingLevel?: HeadingLevel
  /** next/image sizes attribute; default fits a 3-column grid. */
  sizes?: string
  compact?: boolean
  /** Photo with an overlapping white info box (category, title, short text, red button). */
  simple?: boolean
  preview?: 'hover'
  className?: string
}

/** Link text of a card (the whole card is the link) – plain red text with an arrow, no button shape. */
function RedButton({ label }: { label: string }) {
  return (
    <span
      aria-hidden
      className="mt-auto inline-flex items-center gap-2 self-start text-small font-semibold text-red-600 underline-offset-4 group-hov:underline"
    >
      {label}
      <Icon
        name="arrow-right"
        className="size-4 transition-transform duration-(--dur-base) group-hov:translate-x-1"
      />
    </span>
  )
}

/** Variant 1 – image on top, lifts with a deeper shadow on hover. */
export function CardClassic({
  card,
  headingLevel = 'h3',
  sizes = '(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw',
  compact = false,
  simple = false,
  shade,
  preview,
  className,
}: CardClassicProps) {
  const label = card.ctaLabel ?? 'Mehr erfahren'

  // Simple: the white info box overlaps the photo; on hover the photo zooms and the box lifts.
  if (simple) {
    const Heading = headingLevel
    return (
      <article
        data-preview={preview}
        className={cn('group relative flex h-full flex-col rounded-2xl', cardFocus, className)}
      >
        {/* One link for the whole card (photo + box), named by the title */}
        <Link
          href={card.href}
          className="absolute inset-0 z-20 rounded-2xl focus-visible:outline-none"
        >
          <span className="sr-only">{card.title}</span>
        </Link>
        <div className="aspect-4/3 overflow-hidden rounded-2xl shadow-md">
          <CardImage image={card.image} sizes={sizes} />
        </div>
        <div className="relative z-10 mx-4 -mt-16 flex flex-1 flex-col gap-3 rounded-xl bg-linear-to-b from-surface via-surface to-red-50 p-5 shadow-md ring-1 ring-line transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo group-hov:-translate-y-2 group-hov:shadow-(--shadow-float)">
          <CardMeta card={{ ...card, badge: undefined }} tagTone="solid" />
          <Heading className="font-display text-h4 font-semibold text-blue-900">
            {card.title}
          </Heading>
          <p className="line-clamp-2 text-small text-ink-muted">{card.description}</p>
          <RedButton label={label} />
        </div>
      </article>
    )
  }

  const dark = shade !== undefined && !lightShades.has(shade)
  const light = shade !== undefined && !dark
  return (
    <article
      data-preview={preview}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-xl shadow-md',
        'transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo hov:-translate-y-1 hov:shadow-(--shadow-float)',
        dark && shade
          ? cn(shadeVar[shade], 'bg-(--shade) text-on-dark [--focus-ring:var(--shade)]')
          : light && shade
            ? cn(
                shadeVar[shade],
                'bg-linear-to-b from-(--shade) to-surface text-ink ring-1 ring-line',
              )
            : 'border border-line bg-surface',
        cardFocus,
        className,
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
        <CardCta label={label} tone={dark ? 'dark' : 'light'} className="pt-2" />
      </div>
    </article>
  )
}
