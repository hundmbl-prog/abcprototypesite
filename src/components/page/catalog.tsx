import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { CourseTypesBlock, FeaturesBlock, SpotlightBlock } from '@/content/types'

/** Plain check list used in the course catalogue and the detail sections. */
function Checks({ items, cols = false }: { items: string[]; cols?: boolean }) {
  return (
    <ul className={cn('grid gap-2.5', cols && 'md:grid-cols-2 md:gap-x-8')}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-ink">
          <Icon name="check" className="mt-1 size-4 shrink-0 text-blue" strokeWidth={2.5} />
          {item}
        </li>
      ))}
    </ul>
  )
}

/**
 * Course catalogue: each course type as one bordered card – title with hours and summary,
 * target group, levels, contents and the module plan as a simple numbered list.
 */
export function CourseTypes({ block }: { block: CourseTypesBlock }) {
  return (
    <>
      <SectionHeader id={`${block.id}-titel`} title={block.title} intro={block.intro} />
      <div className="flex flex-col gap-10">
        {block.courses.map((course) => (
          <article
            key={course.id}
            id={course.id}
            aria-labelledby={`${course.id}-titel`}
            className="flex scroll-mt-28 flex-col gap-8 rounded-lg border border-line bg-surface p-6 md:p-10"
          >
            <header className="flex flex-col gap-2 border-b border-line pb-6">
              <h3 id={`${course.id}-titel`} className="text-h3 text-navy">
                {course.title}
              </h3>
              <p className="font-semibold text-red-600">{course.hours}</p>
              <p className="max-w-narrow text-lead text-ink-muted">{course.summary}</p>
            </header>

            <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <dt className="text-small font-semibold text-navy">Zielgruppe</dt>
                <dd className="text-ink-muted">{course.audience}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-small font-semibold text-navy">Niveaustufen</dt>
                <dd className="text-ink-muted">{course.levels.join(' · ')}</dd>
              </div>
            </dl>

            <div className="flex flex-col gap-3">
              <h4 className="text-small font-semibold text-navy">Kursinhalte</h4>
              <Checks items={course.contents} cols />
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-small font-semibold text-navy">Kursaufbau</h4>
              {course.modulesIntro ? (
                <p className="max-w-narrow text-ink-muted">{course.modulesIntro}</p>
              ) : null}
              <ol className="grid grid-cols-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3">
                {course.modules.map((m) => (
                  <li
                    key={`${m.badge}-${m.level}`}
                    className="flex flex-col gap-1 border-t border-line py-4"
                  >
                    <span className="text-small font-semibold text-navy">
                      {m.badge} · {m.level}
                    </span>
                    <span className="text-small text-ink-muted">{m.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

/** Short benefits as a simple list with an icon – no cards. */
export function Features({ block }: { block: FeaturesBlock }) {
  const cols = block.items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
  return (
    <>
      <SectionHeader id={`${block.id}-titel`} title={block.title} intro={block.intro} />
      <ul className={cn('grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2', cols)}>
        {block.items.map((item) => (
          <li key={item.title} className="flex flex-col gap-2">
            <Icon name={item.icon} className="size-6 text-blue" />
            <h3 className="text-h4 text-navy">{item.title}</h3>
            <p className="text-ink-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

/** Detailed section for one project or offer: photo or key facts beside the text. */
export function Spotlight({ block }: { block: SpotlightBlock }) {
  const facts = block.facts?.length ? (
    <dl className="flex flex-col divide-y divide-line border-y border-line">
      {block.facts.map((fact) => (
        <div key={fact.label} className="flex items-baseline justify-between gap-4 py-3">
          <dt className="text-ink-muted">{fact.label}</dt>
          <dd className="text-right font-semibold text-navy">{fact.value}</dd>
        </div>
      ))}
    </dl>
  ) : null

  const body = (
    <div className="flex flex-col gap-6">
      <SectionHeader id={`${block.id}-titel`} title={block.title} className="mb-0! md:mb-0!" />
      {block.paragraphs.map((text) => (
        <p key={text} className="max-w-prose text-lead text-ink-muted">
          {text}
        </p>
      ))}
      {block.lists?.length ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {block.lists.map((list) => (
            <div key={list.title} className="flex flex-col gap-3">
              <h3 className="text-small font-semibold text-navy">{list.title}</h3>
              <Checks items={list.items} />
            </div>
          ))}
        </div>
      ) : null}
      {block.funding ? (
        <p className="flex items-start gap-3 border-l-2 border-blue-300 pl-4 text-small text-ink-muted">
          {block.funding}
        </p>
      ) : null}
      {block.contact?.email || block.contact?.phone || block.link ? (
        <div className="flex flex-col gap-1">
          {block.contact?.label ? (
            <p className="text-small text-ink-muted">{block.contact.label}</p>
          ) : null}
          <p className="flex flex-wrap gap-x-6 gap-y-1 font-semibold">
            {block.contact?.email ? (
              <a
                href={`mailto:${block.contact.email}`}
                className="inline-flex min-h-11 items-center gap-2 text-blue hov:underline"
              >
                <Icon name="mail" className="size-4" />
                {block.contact.email}
              </a>
            ) : null}
            {block.contact?.phone ? (
              <a
                href={`tel:${block.contact.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex min-h-11 items-center gap-2 text-blue hov:underline"
              >
                <Icon name="phone" className="size-4" />
                {block.contact.phone}
              </a>
            ) : null}
            {block.link ? (
              <a
                href={block.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-blue hov:underline"
              >
                {block.link.label}
                <Icon name="arrow-up-right" className="size-4" />
                <span className="sr-only">(öffnet in neuem Tab)</span>
              </a>
            ) : null}
          </p>
        </div>
      ) : null}
      {block.back ? (
        <Link
          href={block.back.href}
          className="self-start text-small font-semibold text-blue underline-offset-4 hov:underline"
        >
          ← {block.back.label}
        </Link>
      ) : null}
    </div>
  )

  if (!block.image && !facts) return <div className="max-w-narrow">{body}</div>

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={cn('flex flex-col gap-6 lg:col-span-5', block.reverse && 'lg:order-2')}>
        {block.image ? (
          <Image
            src={block.image.src}
            alt={block.image.alt}
            width={block.image.width}
            height={block.image.height}
            sizes="(min-width: 1024px) 40vw, 100vw"
            placeholder={block.image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={block.image.blurDataURL}
            className="h-auto w-full rounded-lg"
          />
        ) : null}
        {facts}
      </div>
      <div className={cn('lg:col-span-7', block.reverse && 'lg:order-1')}>{body}</div>
    </div>
  )
}
