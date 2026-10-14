import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/sections/Section'
import { SectionHeader } from '@/components/sections/SectionHeader'
import type { HomePage } from '@/content'
import { Counter } from './Counter'

export function WhySection({ content }: { content: HomePage['why'] }) {
  return (
    <Section tone="soft" id="warum-abc" labelledBy="warum-titel">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeader
            id="warum-titel"
            eyebrow={content.eyebrow}
            title={content.title}
            intro={content.intro}
            className="mb-0! md:mb-0!"
          />
          <ul className="flex flex-col gap-3">
            {content.points.map((point) => (
              <li key={point} data-reveal className="flex items-start gap-3 font-medium text-navy">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-pill bg-navy text-on-dark">
                  <Icon name="check" className="size-3.5" strokeWidth={2.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <dl className="grid grid-cols-2 gap-px self-center overflow-hidden rounded-none bg-navy/15 lg:col-span-7">
          {content.stats.map((stat) => (
            <div
              key={stat.id}
              data-reveal
              className="flex flex-col-reverse gap-2 bg-blue-soft p-6 md:p-10"
            >
              <dt className="text-small font-medium text-navy md:text-body">{stat.label}</dt>
              <dd className="font-display text-h1 font-semibold text-navy">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
