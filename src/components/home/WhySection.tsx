import Image from 'next/image'
import { Icon, type IconName } from '@/components/ui/Icon'
import type { HomePage } from '@/content'
import type { ContentImage } from '@/content/types'
import { Counter } from './Counter'

const statIcons: IconName[] = ['calendar', 'location', 'users', 'level']

/** Full-bleed photo band with glass stat cards (all four identical in style). */
export function WhySection({ content, image }: { content: HomePage['why']; image: ContentImage }) {
  return (
    <section
      id="warum-abc"
      aria-labelledby="warum-titel"
      className="relative isolate overflow-hidden py-section-lg text-on-dark [--focus-ring:var(--color-on-dark)]"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          sizes="100vw"
          placeholder={image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={image.blurDataURL}
          className="size-full scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-shade/75" />
        <div className="absolute inset-0 bg-linear-to-b from-shade/40 via-shade/0 to-shade/60" />
      </div>

      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <p className="inline-flex items-center gap-3 text-small font-semibold tracking-widest uppercase">
            <span aria-hidden className="h-0.5 w-8 bg-red" />
            {content.eyebrow}
          </p>
          <h2 id="warum-titel" className="text-h1">
            {content.title}
          </h2>
          {content.intro ? <p className="text-lead text-on-dark">{content.intro}</p> : null}
          <ul className="flex flex-col gap-3 rounded-2xl p-6 glass-dark">
            {content.points.map((point) => (
              <li key={point} className="flex items-start gap-3 font-medium">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-pill bg-red text-on-dark">
                  <Icon name="check" className="size-3.5" strokeWidth={2.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          {content.stats.map((stat, i) => (
            <div
              key={stat.id}
              data-reveal
              className="sheen relative flex flex-col-reverse gap-3 overflow-hidden rounded-2xl p-6 glass-dark md:p-8"
            >
              <dt className="text-small font-medium md:text-body">{stat.label}</dt>
              <dd className="flex items-center justify-between gap-4">
                <span className="font-display text-h1 font-semibold">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </span>
                <span className="grid size-12 place-items-center rounded-pill bg-on-dark/15">
                  <Icon name={statIcons[i % statIcons.length] ?? 'check'} className="size-5" />
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
