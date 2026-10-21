import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import type { HeadingLevel, OfferCardData } from './types'

const factOrder = ['level', 'duration', 'format', 'location', 'start'] as const

/**
 * Photo-free card: a blue icon tile, title, one sentence, up to three facts and a link line.
 * No number, no category pill (the title says it already) and no decoration. On hover the
 * frame turns ABC Blue and the link grows slightly while its arrow moves.
 */
export function CardIcon({
  card,
  headingLevel: Heading = 'h3',
}: {
  card: OfferCardData
  headingLevel?: HeadingLevel
}) {
  const facts = factOrder.map((key) => card.facts?.[key]).filter((f): f is string => !!f)
  const icon = card.icon ?? 'arrow-right'
  return (
    <article className="h-full">
      <Link
        href={card.href}
        className="group flex h-full flex-col gap-4 rounded-lg border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-(--dur-slow) ease-out-expo md:p-7 hov:border-blue hov:shadow-md"
      >
        <span className="grid size-12 place-items-center rounded-md bg-blue text-on-dark">
          <Icon name={icon} className="size-6" />
        </span>
        <Heading className="text-h4 text-navy">{card.title}</Heading>
        <p className="text-small text-ink-muted">{card.description}</p>
        {facts.length ? (
          <ul className="flex flex-wrap gap-2">
            {facts.slice(0, 3).map((fact) => (
              <li
                key={fact}
                className="rounded-sm bg-blue-50 px-2.5 py-1 text-caption font-semibold text-blue-800"
              >
                {fact}
              </li>
            ))}
          </ul>
        ) : null}
        <span className="mt-auto inline-flex origin-left items-center gap-2 pt-2 text-small font-semibold text-blue transition-[color,transform] duration-(--dur-base) ease-out-expo group-hover:scale-105 group-hover:text-red">
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
