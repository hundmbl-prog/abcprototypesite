import Image from 'next/image'
import { SectionHeader } from '@/components/sections/SectionHeader'
import type { HomePage } from '@/content'
import { Counter } from './Counter'

/**
 * "Warum ABC" as one full screen on large displays: the learners' photo beside the heading, four
 * large figures and two calm sentences – no tiles, no icons. The figures are the typography.
 */
export function WhySection({ content }: { content: HomePage['why'] }) {
  return (
    <section
      id="warum-abc"
      aria-labelledby="warum-titel"
      className="bg-surface-2 py-section-lg lg:flex lg:min-h-svh lg:flex-col lg:justify-center"
    >
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-8">
        <div className="order-last aspect-3/2 overflow-hidden rounded-xl lg:order-none lg:col-span-5 lg:aspect-4/5">
          <Image
            data-parallax
            src={content.image.src}
            alt={content.image.alt}
            width={content.image.width}
            height={content.image.height}
            sizes="(min-width: 1024px) 40vw, 100vw"
            placeholder={content.image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={content.image.blurDataURL}
            className="size-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-12 lg:col-span-6 lg:col-start-7">
          <SectionHeader
            id="warum-titel"
            eyebrow={content.eyebrow}
            title={content.title}
            size="h1"
            mark
            reveal={false}
            className="mb-0! md:mb-0!"
          />
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10">
            {content.stats.map((stat) => (
              <div key={stat.id} className="flex flex-col-reverse gap-1">
                <dt className="text-small text-ink-muted">{stat.label}</dt>
                <dd className="font-display text-display font-semibold text-navy">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
          <ul className="flex flex-col gap-3">
            {content.points.map((point) => (
              <li key={point} className="max-w-prose text-lead text-ink">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
