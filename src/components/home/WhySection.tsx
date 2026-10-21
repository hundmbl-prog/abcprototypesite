import { SectionHeader } from '@/components/sections/SectionHeader'
import { BrandMark } from '@/components/ui/BrandMark'
import { Icon } from '@/components/ui/Icon'
import type { HomePage } from '@/content'
import { Counter } from './Counter'

/** Compact "Warum ABC" section (white): four plain figures on the blue wash and the key points as a short list. */
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
        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {content.stats.map((stat) => (
            <div
              key={stat.id}
              data-reveal
              className="flex flex-col-reverse gap-2 rounded-lg bg-blue-50 p-5 md:p-6"
            >
              <dt className="text-small text-ink-muted">{stat.label}</dt>
              <dd className="font-display text-h2 font-semibold text-navy">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
        <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10">
          {content.points.map((point) => (
            <li
              key={point}
              className="inline-flex items-center gap-3 text-body font-medium text-ink"
            >
              <Icon name="check" className="size-5 text-blue" strokeWidth={2} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
