import Image from 'next/image'
import { Aurora, DotGrid } from '@/components/ui/Aurora'
import { Icon, type IconName } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { HomePage } from '@/content'
import type { ContentImage } from '@/content/types'
import { Counter } from './Counter'

/** One solid shade per stat – white text on all of them meets WCAG AA. */
const statStyles: Array<{ icon: IconName; className: string }> = [
  { icon: 'calendar', className: 'bg-linear-to-br from-blue-500 to-blue-700' },
  { icon: 'location', className: 'bg-linear-to-br from-red-500 to-red-700' },
  { icon: 'users', className: 'bg-linear-to-br from-blue-700 to-blue-900' },
  { icon: 'level', className: 'bg-linear-to-br from-blue-600 to-blue-800' },
]

/** Deep gradient band: no text sits on a photo; the photo is a framed element of its own. */
export function WhySection({ content, image }: { content: HomePage['why']; image: ContentImage }) {
  return (
    <section
      id="warum-abc"
      aria-labelledby="warum-titel"
      className="relative isolate overflow-hidden bg-linear-to-br from-blue-950 via-blue-900 to-blue-800 py-section-lg text-on-dark [--focus-ring:var(--color-on-dark)]"
    >
      <Aurora preset="stats" strength="glow" />
      <DotGrid tone="dark" />

      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <p className="inline-flex items-center gap-3 self-start rounded-pill bg-on-dark/10 px-4 py-2 text-small font-semibold tracking-widest uppercase">
            <span aria-hidden className="size-2 rounded-pill bg-red-400" />
            {content.eyebrow}
          </p>
          <h2 id="warum-titel" className="text-h1">
            {content.title}
          </h2>
          {content.intro ? <p className="text-lead text-blue-100">{content.intro}</p> : null}
          <div className="relative mt-2 flex items-center gap-4">
            <div className="sheen relative size-24 shrink-0 overflow-hidden rounded-2xl shadow-xl ring-4 ring-on-dark/10">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="96px"
                className="size-full object-cover"
              />
            </div>
            <p className="text-small text-blue-100">{content.caption}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-7">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {content.stats.map((stat, i) => {
              const style = statStyles[i % statStyles.length]
              return (
                <div
                  key={stat.id}
                  data-reveal
                  className={cn(
                    'sheen relative flex flex-col-reverse gap-3 overflow-hidden rounded-2xl p-6 shadow-xl ring-1 ring-on-dark/15 md:p-8',
                    style?.className,
                  )}
                >
                  <dt className="text-small font-medium md:text-body">{stat.label}</dt>
                  <dd className="flex items-center justify-between gap-4">
                    <span className="font-display text-h1 font-semibold">
                      <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                    </span>
                    <span className="grid size-12 place-items-center rounded-pill bg-on-dark/15">
                      <Icon name={style?.icon ?? 'check'} className="size-5" />
                    </span>
                  </dd>
                </div>
              )
            })}
          </dl>
          <ul className="grid gap-3 rounded-2xl bg-on-dark/5 p-6 ring-1 ring-on-dark/10 sm:grid-cols-2">
            {content.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-small font-medium">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-pill bg-red-500 text-on-dark">
                  <Icon name="check" className="size-3.5" strokeWidth={2.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
