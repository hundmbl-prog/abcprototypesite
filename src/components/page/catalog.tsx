import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { CourseTypesBlock, FeaturesBlock, SpotlightBlock } from '@/content/types'

/**
 * Course catalogue blocks: each course type as one large card – header with hours and summary,
 * target group, level chips, contents and the module plan (Kursaufbau).
 */
export function CourseTypes({ block }: { block: CourseTypesBlock }) {
  return (
    <>
      <SectionHeader
        id={`${block.id}-titel`}
        eyebrow={block.eyebrow}
        title={block.title}
        intro={block.intro}
      />
      <div className="flex flex-col gap-10">
        {block.courses.map((course) => (
          <article
            key={course.id}
            id={course.id}
            aria-labelledby={`${course.id}-titel`}
            className="scroll-mt-28 overflow-hidden rounded-2xl border border-line bg-surface shadow-md"
          >
            <header className="relative isolate flex flex-col gap-4 overflow-hidden bg-blue-900 p-6 text-on-dark md:p-8">
              <span
                aria-hidden
                className="absolute -top-24 -right-16 -z-10 size-72 rounded-pill bg-blue-600/40 blur-3xl"
              />
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-on-dark/10 ring-1 ring-on-dark/20">
                  <Icon name={course.icon} className="size-6" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 id={`${course.id}-titel`} className="text-h3">
                    {course.title}
                  </h3>
                  <p className="text-small font-semibold text-red-300">{course.hours}</p>
                </div>
              </div>
              <p className="max-w-3xl text-on-dark-muted">{course.summary}</p>
            </header>

            <div className="flex flex-col gap-6 p-6 md:p-8">
              <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <dt className="text-caption font-semibold tracking-wide text-ink-muted uppercase">
                    Zielgruppe
                  </dt>
                  <dd className="text-ink">{course.audience}</dd>
                </div>
                <div className="flex flex-col gap-2">
                  <dt className="text-caption font-semibold tracking-wide text-ink-muted uppercase">
                    Niveaustufen
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {course.levels.map((level) => (
                      <span
                        key={level}
                        className="rounded-pill bg-blue-900 px-3 py-1 text-caption font-semibold text-on-dark"
                      >
                        {level}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="rounded-xl bg-blue-50 p-5 ring-1 ring-blue-100 md:p-6">
                <h4 className="mb-3 text-small font-semibold text-blue-900">Kursinhalte</h4>
                <ul className="grid gap-2.5 md:grid-cols-2">
                  {course.contents.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-small text-ink">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-pill bg-blue-600 text-on-dark">
                        <Icon name="check" className="size-3" strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-small font-semibold text-blue-900">Kursaufbau</h4>
                {course.modulesIntro ? (
                  <p className="max-w-3xl text-small text-ink-muted">{course.modulesIntro}</p>
                ) : null}
                <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {course.modules.map((m) => (
                    <li
                      key={`${m.badge}-${m.level}`}
                      className="group flex flex-col gap-2 rounded-xl border border-line bg-surface p-4 transition-[transform,box-shadow,border-color] duration-(--dur-slow) ease-out-expo hov:-translate-y-0.5 hov:border-blue-200 hov:shadow-md"
                    >
                      <span className="flex items-center gap-2">
                        <span className="rounded-pill bg-blue-900 px-2.5 py-0.5 text-caption font-semibold text-on-dark transition-colors group-hover:bg-red-500">
                          {m.badge}
                        </span>
                        <span className="font-semibold text-blue-900">{m.level}</span>
                      </span>
                      <span className="text-small text-ink-muted">{m.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

/** Short benefit / feature cards with an icon. */
export function Features({ block }: { block: FeaturesBlock }) {
  const cols = block.items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
  return (
    <>
      <SectionHeader
        id={`${block.id}-titel`}
        eyebrow={block.eyebrow}
        title={block.title}
        intro={block.intro}
      />
      <ul className={cn('grid grid-cols-1 gap-5 sm:grid-cols-2', cols)}>
        {block.items.map((item) => (
          <li
            key={item.title}
            data-reveal
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-sm transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo hov:-translate-y-1 hov:shadow-(--shadow-float)"
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-red-500" />
            <span className="grid size-12 place-items-center rounded-pill bg-blue-600 text-on-dark transition-transform duration-(--dur-slow) ease-out-expo group-hover:scale-110">
              <Icon name={item.icon} className="size-5" />
            </span>
            <h3 className="text-h4 text-blue-900">{item.title}</h3>
            <p className="text-small text-ink-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

/** Detailed section for one project or offer; cards on the same page link here by id. */
export function Spotlight({ block }: { block: SpotlightBlock }) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={cn('flex flex-col gap-6 lg:col-span-5', block.reverse && 'lg:order-2')}>
        <div
          data-reveal="image"
          className="group aspect-4/3 overflow-hidden rounded-tl-2xl rounded-tr-sm rounded-br-2xl rounded-bl-sm shadow-md"
        >
          <Image
            src={block.image.src}
            alt={block.image.alt}
            width={block.image.width}
            height={block.image.height}
            sizes="(min-width: 1024px) 40vw, 100vw"
            placeholder={block.image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={block.image.blurDataURL}
            className="size-full object-cover transition-transform duration-(--dur-slower) ease-out-expo motion-safe:group-hover:scale-105"
          />
        </div>
        {block.facts?.length ? (
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-blue-100 ring-1 ring-blue-100 sm:grid-cols-2">
            {block.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 bg-surface p-4">
                <dt className="text-caption font-semibold tracking-wide text-ink-muted uppercase">
                  {fact.label}
                </dt>
                <dd className="font-semibold text-blue-900">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      <div className={cn('flex flex-col gap-6 lg:col-span-7', block.reverse && 'lg:order-1')}>
        <SectionHeader
          id={`${block.id}-titel`}
          eyebrow={block.eyebrow}
          title={block.title}
          className="mb-0! md:mb-0!"
        />
        {block.paragraphs.map((text) => (
          <p key={text} className="text-ink-muted md:text-lead">
            {text}
          </p>
        ))}
        {block.lists?.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {block.lists.map((list) => (
              <div key={list.title} className="rounded-xl bg-blue-50 p-5 ring-1 ring-blue-100">
                <h3 className="mb-3 text-small font-semibold text-blue-900">{list.title}</h3>
                <ul className="flex flex-col gap-2">
                  {list.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-small text-ink">
                      <Icon
                        name="check"
                        className="mt-0.5 size-4 text-blue-600"
                        strokeWidth={2.5}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
        {block.funding ? (
          <p className="flex items-start gap-3 border-l-4 border-red-500 bg-surface-2 p-4 text-small text-ink-muted">
            <Icon name="info" className="mt-0.5 size-4 text-blue-600" />
            {block.funding}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
          {block.contact?.email ? (
            <a
              href={`mailto:${block.contact.email}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-red-500 px-5 text-small font-semibold text-on-dark shadow-sm transition-[background-color,transform] duration-(--dur-base) active:scale-95 hov:bg-red-600 foc:outline-2 foc:outline-offset-2 foc:outline-blue"
            >
              <Icon name="mail" className="size-4" />
              {block.contact.email}
            </a>
          ) : null}
          {block.contact?.phone ? (
            <a
              href={`tel:${block.contact.phone.replace(/[^\d+]/g, '')}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-surface px-5 text-small font-semibold text-red-700 ring-1 ring-red-200 transition-[background-color,transform] duration-(--dur-base) active:scale-95 hov:bg-red-50 foc:outline-2 foc:outline-offset-2 foc:outline-blue"
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
              className="inline-flex min-h-11 items-center gap-2 rounded-pill px-3 text-small font-semibold text-blue-700 underline-offset-4 hov:underline foc:outline-2 foc:outline-offset-2 foc:outline-blue"
            >
              {block.link.label}
              <Icon name="arrow-up-right" className="size-4" />
              <span className="sr-only">(öffnet in neuem Tab)</span>
            </a>
          ) : null}
        </div>
        {block.contact?.label ? (
          <p className="text-small text-ink-muted">{block.contact.label}</p>
        ) : null}
        {block.back ? (
          <Link
            href={block.back.href}
            className="inline-flex items-center gap-2 self-start text-small font-semibold text-blue-700 underline-offset-4 hov:underline foc:outline-2 foc:outline-offset-2 foc:outline-blue"
          >
            <Icon name="arrow-up-right" className="size-4 -rotate-45" />
            {block.back.label}
          </Link>
        ) : null}
      </div>
    </div>
  )
}
