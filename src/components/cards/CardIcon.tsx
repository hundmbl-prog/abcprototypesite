import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import type { HeadingLevel, OfferCardData } from './types'

const factOrder = ['level', 'duration', 'format', 'location', 'start'] as const

/** Photo-free card: blue icon, category, title, one sentence, up to three facts, arrow link. */
export function CardIcon({
  card,
  headingLevel: Heading = 'h3',
}: {
  card: OfferCardData
  headingLevel?: HeadingLevel
}) {
  const facts = factOrder.map((key) => card.facts?.[key]).filter((f): f is string => !!f)
  return (
    <article className="h-full">
      <Link
        href={card.href}
        className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-(--dur-slow) ease-out-expo md:p-7 hov:-translate-y-1 hov:border-blue-200 hov:shadow-(--shadow-float)"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 origin-left scale-x-25 bg-red-500 transition-transform duration-(--dur-slow) ease-out-expo group-hover:scale-x-100"
        />
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-12 place-items-center rounded-xl bg-blue-600 text-on-dark transition-[background-color,transform] duration-(--dur-slow) ease-out-expo group-hover:scale-110 group-hover:bg-red-500">
            <Icon name={card.icon ?? 'arrow-right'} className="size-5" />
          </span>
          <span className="rounded-pill bg-blue-900 px-3 py-1 text-caption font-semibold text-on-dark">
            {card.tag}
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
        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-small font-semibold text-red-600">
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
