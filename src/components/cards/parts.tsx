import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/Badge'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Tag, type TagTone } from '@/components/ui/Tag'
import type { CardImageData, HeadingLevel, OfferCardData, OfferFacts } from './types'

export function CardImage({
  image,
  sizes,
  className,
  priority = false,
}: {
  image: CardImageData
  sizes: string
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      placeholder={image.blurDataURL ? 'blur' : 'empty'}
      blurDataURL={image.blurDataURL}
      className={cn(
        'size-full object-cover transition-transform duration-(--dur-slower) ease-out-expo motion-safe:group-hov:scale-105',
        className,
      )}
    />
  )
}

const factOrder: Array<{ key: keyof OfferFacts; icon: IconName; label: string }> = [
  { key: 'level', icon: 'level', label: 'Niveau' },
  { key: 'start', icon: 'calendar', label: 'Beginn' },
  { key: 'duration', icon: 'clock', label: 'Dauer' },
  { key: 'location', icon: 'location', label: 'Ort' },
  { key: 'format', icon: 'monitor', label: 'Format' },
  { key: 'price', icon: 'euro', label: 'Preis' },
]

export function CardFacts({
  facts,
  tone = 'light',
  max = 4,
  className,
}: {
  facts?: OfferFacts
  tone?: 'light' | 'dark'
  max?: number
  className?: string
}) {
  if (!facts) return null
  const items = factOrder.filter((f) => facts[f.key]).slice(0, max)
  if (items.length === 0) return null
  return (
    <ul
      className={cn(
        'flex flex-wrap gap-x-4 gap-y-2 text-small',
        tone === 'light' ? 'text-ink-muted' : 'text-on-dark-muted',
        className,
      )}
    >
      {items.map((f) => (
        <li key={f.key} className="inline-flex items-center gap-1.5">
          <Icon
            name={f.icon}
            className={cn('size-4', tone === 'light' ? 'text-blue' : 'text-on-dark')}
          />
          <span className="sr-only">{f.label}: </span>
          {facts[f.key]}
        </li>
      ))}
    </ul>
  )
}

export function CardMeta({
  card,
  tagTone = 'light',
  className,
}: {
  card: OfferCardData
  tagTone?: TagTone
  className?: string
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <Tag tone={tagTone}>{card.tag}</Tag>
      {card.badge ? <Badge status={card.badge} /> : null}
    </div>
  )
}

/** Title with the one accessible link that makes the whole card clickable. */
export function CardTitle({
  card,
  as: Heading = 'h3',
  className,
}: {
  card: OfferCardData
  as?: HeadingLevel
  className?: string
}) {
  return (
    <Heading className={cn('font-display font-semibold', className)}>
      <Link href={card.href} className="stretched-link">
        {card.title}
      </Link>
    </Heading>
  )
}

/** Visual call to action. The link itself is on the title, so this is not announced twice. */
export function CardCta({
  label,
  tone = 'light',
  className,
}: {
  label: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex items-center gap-2 text-small font-semibold',
        tone === 'light' ? 'text-blue' : 'text-on-dark',
        className,
      )}
    >
      {label}
      <Icon
        name="arrow-right"
        className="size-4 transition-transform duration-(--dur-base) ease-out-expo group-hov:translate-x-1"
      />
    </span>
  )
}

/** Shared outer focus style: shows a ring around the card when its link has keyboard focus. */
export const cardFocus =
  'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-(--focus-ring)'
