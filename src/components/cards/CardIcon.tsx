import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import type { HeadingLevel, OfferCardData } from './types'

const factOrder = ['level', 'duration', 'format', 'location', 'start'] as const

/**
 * Photo-free card: numbered, with a blue icon tile, a large faint icon as visual, category,
 * title, one sentence, up to three facts and an arrow. On hover it lifts, a light follows the
 * cursor, the top line grows and the icon tile turns red.
 */
export function CardIcon({
  card,
  index,
  headingLevel: Heading = 'h3',
}: {
  card: OfferCardData
  index?: number
  headingLevel?: HeadingLevel
}) {
  const facts = factOrder.map((key) => card.facts?.[key]).filter((f): f is string => !!f)
  const icon = card.icon ?? 'arrow-right'
  return (
    <article className="h-full">
      <Link
        href={card.href}
        className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-(--dur-slow) ease-out-expo md:p-7 hov:-translate-y-1.5 hov:border-blue-200 hov:shadow-(--shadow-float)"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -bottom-8 -z-10 text-blue-50 transition-transform duration-(--dur-slower) ease-out-expo group-hover:scale-110 group-hover:-rotate-6"
        >
          <Icon name={icon} className="size-40" strokeWidth={1.25} />
        </span>
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-14 place-items-center rounded-2xl bg-blue-700 text-on-dark shadow-md transition-[background-color,transform] duration-(--dur-slow) ease-out-expo group-hover:-rotate-6 group-hover:bg-red-500">
            <Icon name={icon} className="size-6" />
          </span>
          <span className="flex flex-col items-end gap-2">
            {typeof index === 'number' ? (
              <span
                aria-hidden
                className="font-display text-h4 leading-none font-semibold text-red"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            ) : null}
            <span className="rounded-pill bg-blue-900 px-3 py-1 text-caption font-semibold text-on-dark">
              {card.tag}
            </span>
          </span>
        </div>
        <Heading className="text-h4 text-blue-900">{card.title}</Heading>
        <p className="text-small text-ink-muted">{card.description}</p>
        {facts.length ? (
          <ul className="flex flex-wrap gap-2">
            {facts.slice(0, 3).map((fact) => (
              <li
                key={fact}
                className="rounded-pill bg-blue-50 px-3 py-1 text-caption font-semibold text-blue-800 ring-1 ring-blue-100"
              >
                {fact}
              </li>
            ))}
          </ul>
        ) : null}
        <span className="mt-auto inline-flex origin-left items-center gap-2 pt-2 text-small font-semibold text-red-600 transition-transform duration-(--dur-base) ease-out-expo group-hover:scale-105">
          {card.ctaLabel ?? 'Mehr erfahren'}
          <Icon
            name="arrow-right"
            className="size-4 transition-transform duration-(--dur-base) group-hover:translate-x-1"
          />
        </span>
      </Link>
    </article>
  )
}
