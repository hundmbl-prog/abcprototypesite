import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import type { OfferCardData } from '@/components/cards/types'
import { cn } from '@/lib/cn'

/** Bento layout (desktop, 4 columns × 3 rows): one feature card, two small, three wide. */
const spans = [
  'md:col-span-2 lg:col-span-2 lg:row-span-2',
  '',
  '',
  'lg:col-span-2',
  'lg:col-span-2',
  'md:col-span-2 lg:col-span-2',
]

/**
 * Offer cards as a bento grid: full-bleed photo with a frosted navy info panel.
 * Hover / keyboard focus: photo zooms, description opens, arrow turns, a red line runs along the bottom.
 * On touch screens the description is always visible.
 */
export function OfferBento({ cards }: { cards: OfferCardData[] }) {
  return (
    <ul className="grid auto-rows-[22rem] grid-cols-1 gap-5 md:grid-cols-2 lg:auto-rows-[17.5rem] lg:grid-cols-4">
      {cards.map((card, i) => {
        const feature = i === 0
        return (
          <li key={card.id} data-reveal className={cn('min-w-0', spans[i % spans.length])}>
            <Link
              href={card.href}
              className="group relative isolate flex size-full flex-col justify-between overflow-hidden rounded-2xl bg-blue-950 p-4 shadow-md ring-1 ring-blue-900/10 transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo md:p-5 hov:-translate-y-1 hov:shadow-(--shadow-float)"
            >
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={card.image.width}
                height={card.image.height}
                sizes={
                  feature
                    ? '(min-width: 1024px) 50vw, 100vw'
                    : '(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw'
                }
                placeholder={card.image.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={card.image.blurDataURL}
                className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-(--dur-slower) ease-out-expo motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-linear-to-t from-blue-950/70 via-blue-950/10 to-transparent"
              />

              <div className="flex items-start justify-between gap-3">
                <span className="rounded-pill bg-surface/90 px-3 py-1 text-caption font-semibold tracking-wide text-blue-900 uppercase shadow-sm backdrop-blur">
                  {card.tag}
                </span>
                <span
                  aria-hidden
                  className="font-display text-h4 font-semibold text-on-dark drop-shadow-[0_1px_8px_rgb(0_0_0/0.45)]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-blue-950/75 p-4 text-on-dark ring-1 ring-on-dark/10 backdrop-blur-md md:p-5">
                <div className="flex items-end justify-between gap-4">
                  <h3 className={cn('font-display font-semibold', feature ? 'text-h3' : 'text-h4')}>
                    {card.title}
                  </h3>
                  <span
                    aria-hidden
                    className="grid size-10 shrink-0 place-items-center rounded-pill bg-red-500 shadow-md transition-[transform,background-color] duration-(--dur-slow) ease-out-expo group-hover:-rotate-45 group-hover:bg-red-600 group-focus-visible:-rotate-45"
                  >
                    <Icon name="arrow-right" className="size-4" />
                  </span>
                </div>
                <div
                  className={cn(
                    'transition-[grid-template-rows,opacity] duration-(--dur-slow) ease-out-expo',
                    feature ? 'grid grid-rows-[1fr]' : 'reveal-on-hover',
                  )}
                >
                  <p className="min-h-0 overflow-hidden">
                    <span className="mt-2 line-clamp-2 block text-small text-on-dark-muted">
                      {card.description}
                    </span>
                  </p>
                </div>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-red-500 transition-transform duration-(--dur-slower) ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
