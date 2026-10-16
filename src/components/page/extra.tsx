import Image from 'next/image'
import { SiteForm } from '@/components/forms/SiteForm'
import { LocationCards } from '@/components/home/LocationCards'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Icon } from '@/components/ui/Icon'
import type {
  ArticleBlock,
  ContactsBlock,
  FormBlock,
  Location,
  LocationsBlock,
  PressBlock,
} from '@/content/types'

/** A form with a short introduction and points beside it. */
export function FormSection({
  block,
  phone,
  email,
}: {
  block: FormBlock
  phone: string
  email: string
}) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="flex flex-col gap-6 lg:col-span-4">
        <SectionHeader
          id={`${block.id}-titel`}
          eyebrow={block.eyebrow}
          title={block.title}
          intro={block.intro}
          className="mb-0! md:mb-0!"
        />
        {block.points?.length ? (
          <ul className="flex flex-col gap-3">
            {block.points.map((point) => (
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
        ) : null}
      </div>
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-md md:p-10 lg:col-span-8">
        <SiteForm formId={block.formId} phone={phone} email={block.email ?? email} />
      </div>
    </div>
  )
}

/** Contacts by topic – e-mail and phone as large, tappable links. */
export function Contacts({ block }: { block: ContactsBlock }) {
  return (
    <>
      <SectionHeader
        id={`${block.id}-titel`}
        eyebrow={block.eyebrow}
        title={block.title}
        intro={block.intro}
      />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {block.items.map((item) => (
          <li
            key={item.title}
            data-reveal
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-sm transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo hov:-translate-y-1 hov:shadow-(--shadow-float)"
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-red-500" />
            <span className="grid size-11 place-items-center rounded-pill bg-blue-600 text-on-dark">
              <Icon name={item.icon} className="size-5" />
            </span>
            <h3 className="text-h4 text-blue-900">{item.title}</h3>
            {item.text ? <p className="text-small text-ink-muted">{item.text}</p> : null}
            <div className="mt-auto flex flex-col gap-1.5 pt-1">
              {item.email ? (
                <a
                  href={`mailto:${item.email}`}
                  className="inline-flex items-center gap-2 text-small font-semibold break-all text-blue-700 underline-offset-4 hov:underline foc:outline-2 foc:outline-offset-2 foc:outline-blue"
                >
                  <Icon name="mail" className="size-4 shrink-0" />
                  {item.email}
                </a>
              ) : null}
              {item.phone ? (
                <a
                  href={`tel:${item.phone.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center gap-2 text-small font-semibold text-blue-700 underline-offset-4 hov:underline foc:outline-2 foc:outline-offset-2 foc:outline-blue"
                >
                  <Icon name="phone" className="size-4 shrink-0" />
                  {item.phone}
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export function Locations({
  block,
  locations,
  orgName,
}: {
  block: LocationsBlock
  locations: Location[]
  orgName: string
}) {
  return (
    <>
      <SectionHeader
        id={`${block.id}-titel`}
        eyebrow={block.eyebrow}
        title={block.title}
        intro={block.intro}
      />
      <LocationCards locations={locations} orgName={orgName} />
    </>
  )
}

/** Press archive as a clean list (outlet, date, headline). */
export function Press({ block }: { block: PressBlock }) {
  return (
    <>
      <SectionHeader
        id={`${block.id}-titel`}
        eyebrow={block.eyebrow}
        title={block.title}
        intro={block.intro}
      />
      <ol className="relative flex flex-col gap-4 border-l-2 border-blue-100 pl-6 md:pl-8">
        {block.items.map((item) => (
          <li key={`${item.outlet}-${item.title}`} data-reveal className="relative">
            <span
              aria-hidden
              className="absolute top-6 -left-[33px] size-3.5 rounded-pill border-2 border-surface bg-red-500 md:-left-[41px]"
            />
            <article className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 shadow-sm md:p-6">
              <p className="flex flex-wrap items-center gap-2 text-caption font-semibold tracking-wide text-ink-muted uppercase">
                <span className="rounded-pill bg-blue-900 px-2.5 py-0.5 text-on-dark normal-case">
                  {item.outlet}
                </span>
                {item.date}
              </p>
              <h3 className="text-h4 text-blue-900">{item.title}</h3>
            </article>
          </li>
        ))}
      </ol>
    </>
  )
}

/** Body of a news article. */
export function Article({ block }: { block: ArticleBlock }) {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <SectionHeader
        id={`${block.id}-titel`}
        eyebrow={block.eyebrow}
        title={block.title}
        className="mb-0! md:mb-0!"
      />
      {block.image ? (
        <Image
          src={block.image.src}
          alt={block.image.alt}
          width={block.image.width}
          height={block.image.height}
          sizes="(min-width: 768px) 768px, 100vw"
          placeholder={block.image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={block.image.blurDataURL}
          className="h-auto w-full rounded-2xl shadow-md"
        />
      ) : null}
      {block.paragraphs.map((text) => (
        <p key={text} className="text-lead text-ink">
          {text}
        </p>
      ))}
      {block.points?.length ? (
        <ul className="flex flex-col gap-2 rounded-xl bg-blue-50 p-5 ring-1 ring-blue-100">
          {block.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-ink">
              <Icon name="check" className="mt-1 size-4 text-blue-600" strokeWidth={2.5} />
              {point}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
