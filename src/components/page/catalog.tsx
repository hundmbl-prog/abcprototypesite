import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { ContentImage, CourseTypesBlock, FeaturesBlock, SpotlightBlock } from '@/content/types'

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
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue ring-1 ring-blue">
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
        {block.items.map((item, i) => (
          <li
            key={item.title}
            data-reveal
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-sm transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo hov:-translate-y-1 hov:shadow-(--shadow-float)"
          >
            <span
              aria-hidden
              className="absolute top-5 right-6 font-display text-h3 font-semibold text-red"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
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

function SpotlightImage({ image, sizes }: { image: ContentImage; sizes: string }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      placeholder={image.blurDataURL ? 'blur' : 'empty'}
      blurDataURL={image.blurDataURL}
      className="h-auto w-full transition-transform duration-(--dur-slower) ease-out-expo motion-safe:group-hover:scale-105"
    />
  )
}

/** Heading, text, lists, funding note and actions of a spotlight. */
function SpotlightBody({
  block,
  withLists = true,
}: {
  block: SpotlightBlock
  withLists?: boolean
}) {
  return (
    <>
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
      {withLists && block.lists?.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {block.lists.map((list) => (
            <div
              key={list.title}
              className="relative overflow-hidden rounded-xl bg-surface p-5 shadow-sm ring-1 ring-line"
            >
              <h3 className="mb-3 text-small font-semibold text-blue-900">{list.title}</h3>
              <ul className="flex flex-col gap-2">
                {list.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-small text-ink">
                    <Icon name="check" className="mt-0.5 size-4 text-blue-600" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
      {block.funding ? (
        <p className="flex items-start gap-3 rounded-xl tone-navy p-4 text-small">
          <Icon name="info" className="mt-0.5 size-4 text-red-300" />
          <span className="text-on-dark-muted">{block.funding}</span>
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        {block.contact?.email ? (
          <a
            href={`mailto:${block.contact.email}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-red-500 px-5 text-small font-semibold text-on-dark shadow-sm ring-2 ring-red transition-[background-color,transform] duration-(--dur-base) active:scale-95 hov:scale-[1.03] hov:bg-surface hov:text-red foc:outline-2 foc:outline-offset-2 foc:outline-blue"
          >
            <Icon name="mail" className="size-4" />
            {block.contact.email}
          </a>
        ) : null}
        {block.contact?.phone ? (
          <a
            href={`tel:${block.contact.phone.replace(/[^\d+]/g, '')}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-surface px-5 text-small font-semibold text-red-700 ring-1 ring-red-200 transition-[background-color,transform] duration-(--dur-base) active:scale-95 hov:scale-[1.03] hov:bg-red-50 foc:outline-2 foc:outline-offset-2 foc:outline-blue"
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
    </>
  )
}

/**
 * Detailed section for one project or offer.
 * With a photo: the whole photo (no cropping) beside the text, key facts below it.
 * Without a photo: the key facts as a blue data panel with the logo mark beside the text.
 */
export function Spotlight({ block }: { block: SpotlightBlock }) {
  const facts = block.facts?.length ? (
    <dl
      className={cn(
        'grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-blue-800 ring-1 ring-blue-800',
        block.image ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-1',
      )}
    >
      {block.facts.map((fact) => (
        <div key={fact.label} className="flex flex-col gap-1 bg-blue-900 p-4 text-on-dark md:p-5">
          <dt className="text-caption font-semibold tracking-wide text-red-300 uppercase">
            {fact.label}
          </dt>
          <dd className="font-semibold">{fact.value}</dd>
        </div>
      ))}
    </dl>
  ) : null

  if (!block.image && !facts) {
    return (
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <SpotlightBody block={block} withLists={false} />
        </div>
        {block.lists?.length ? (
          <div className="relative isolate flex flex-col gap-4 overflow-hidden rounded-2xl tone-navy p-6 md:p-8 lg:col-span-6">
            {block.lists.map((list) => (
              <div key={list.title} className="flex flex-col gap-3">
                <h3 className="text-small font-semibold tracking-widest text-red-300 uppercase">
                  {list.title}
                </h3>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {list.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-semibold">
                      <span className="grid size-7 shrink-0 place-items-center rounded-pill bg-red-500">
                        <Icon name="check" className="size-3.5" strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
      <div
        className={cn(
          'relative isolate flex flex-col gap-6 lg:col-span-5',
          block.reverse && 'lg:order-2',
        )}
      >
        {block.image ? (
          <div
            data-reveal="image"
            className="group overflow-hidden rounded-tl-2xl rounded-tr-sm rounded-br-2xl rounded-bl-sm shadow-md"
          >
            <SpotlightImage image={block.image} sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        ) : null}
        {facts}
      </div>

      <div className={cn('flex flex-col gap-6 lg:col-span-7', block.reverse && 'lg:order-1')}>
        <SpotlightBody block={block} />
      </div>
    </div>
  )
}
