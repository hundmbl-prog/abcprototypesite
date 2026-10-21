import { SectionHeader } from '@/components/sections/SectionHeader'
import { BrandMark } from '@/components/ui/BrandMark'
import { Icon, type IconName } from '@/components/ui/Icon'
import type { HomePage } from '@/content'
import { Counter } from './Counter'

/** All stat tiles share one background; red numbers and top lines, blue icons. */
const statIcons: IconName[] = ['calendar', 'location', 'users', 'level']

/** Compact "Warum ABC" section (white): four counters and the key points as chips – no photo. */
export function WhySection({ content }: { content: HomePage['why'] }) {
  return (
    <section
      id="warum-abc"
      aria-labelledby="warum-titel"
      className="relative isolate overflow-hidden bg-surface py-section-sm"
    >
      <BrandMark className="-right-10 -bottom-10 w-[22rem]" />
      <div className="container-page flex flex-col gap-10">
        <SectionHeader
          id="warum-titel"
          eyebrow={content.eyebrow}
          title={content.title}
          className="mb-0! md:mb-0!"
        />
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat, i) => (
            <div
              key={stat.id}
              data-reveal
              className="group relative flex flex-col-reverse gap-3 overflow-hidden rounded-2xl bg-blue-50 p-5 text-ink ring-1 ring-line transition-transform duration-(--dur-slow) ease-out-expo md:p-6 hov:-translate-y-1"
            >
              <dt className="text-small font-medium text-ink-muted">{stat.label}</dt>
              <dd className="flex items-center justify-between gap-4">
                <span className="font-display text-h2 font-semibold text-red-600">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </span>
                <span className="grid size-11 place-items-center rounded-pill bg-blue-600 text-on-dark transition-transform duration-(--dur-slow) ease-out-expo group-hover:scale-110 group-hover:rotate-6">
                  <Icon name={statIcons[i % statIcons.length] ?? 'check'} className="size-5" />
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <ul className="flex flex-wrap gap-3">
          {content.points.map((point) => (
            <li
              key={point}
              className="inline-flex items-center gap-2 rounded-pill bg-blue-50 py-2 pr-4 pl-2 text-small font-semibold text-ink ring-1 ring-line"
            >
              <span className="grid size-6 place-items-center rounded-pill bg-red-500 text-on-dark">
                <Icon name="check" className="size-3.5" strokeWidth={2.5} />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
