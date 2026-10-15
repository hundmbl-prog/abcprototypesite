import Image from 'next/image'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Icon, type IconName } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { HomePage } from '@/content'
import type { ContentImage } from '@/content/types'
import { Counter } from './Counter'

/** All stat cards share one look (logo blue); only the icon differs. */
const statIcons: IconName[] = ['calendar', 'location', 'users', 'level']
const statStyle = {
  number: 'text-blue-700',
  badge: 'bg-blue-100 text-blue-700',
  line: 'bg-blue-600',
  bg: 'from-surface to-blue-100',
}

export function WhySection({ content, image }: { content: HomePage['why']; image: ContentImage }) {
  return (
    <section
      id="warum-abc"
      aria-labelledby="warum-titel"
      className="relative isolate overflow-hidden bg-blue-50 py-section"
    >
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeader
            id="warum-titel"
            eyebrow={content.eyebrow}
            title={content.title}
            intro={content.intro}
            className="mb-0! md:mb-0!"
          />
          <figure className="relative">
            <div
              data-reveal="image"
              className="relative aspect-16/10 overflow-hidden rounded-2xl shadow-(--shadow-float)"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder={image.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={image.blurDataURL}
                className="size-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-small text-ink-muted">{content.caption}</figcaption>
          </figure>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-7">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {content.stats.map((stat, i) => {
              const style = statStyle
              const icon = statIcons[i % statIcons.length] ?? 'check'
              return (
                <div
                  key={stat.id}
                  data-reveal
                  className={cn(
                    'relative flex flex-col-reverse gap-4 overflow-hidden rounded-2xl border border-line bg-linear-to-br p-6 shadow-md transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo md:p-8 hov:-translate-y-1 hov:shadow-(--shadow-float)',
                    style.bg,
                  )}
                >
                  <span aria-hidden className={cn('absolute inset-x-0 top-0 h-1', style.line)} />
                  <dt className="text-small font-medium text-ink-muted md:text-body">
                    {stat.label}
                  </dt>
                  <dd className="flex items-center justify-between gap-4">
                    <span className={cn('font-display text-h1 font-semibold', style.number)}>
                      <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                    </span>
                    <span
                      className={cn('grid size-12 place-items-center rounded-pill', style.badge)}
                    >
                      <Icon name={icon} className="size-5" />
                    </span>
                  </dd>
                </div>
              )
            })}
          </dl>
          <ul className="grid gap-3 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-line sm:grid-cols-2">
            {content.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-small font-medium text-blue-900"
              >
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-pill bg-blue-600 text-on-dark">
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
