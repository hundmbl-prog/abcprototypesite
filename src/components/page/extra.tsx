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
              <li key={point} className="flex items-start gap-2.5 text-ink">
                <Icon name="check" className="mt-1 size-4 shrink-0 text-blue" strokeWidth={2.5} />
                {point}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="rounded-lg border border-line bg-surface p-6 md:p-10 lg:col-span-8">
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
      <ul className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {block.items.map((item) => (
          <li key={item.title} className="flex flex-col gap-2 border-t border-line pt-5">
            <h3 className="flex items-center gap-2.5 text-h4 text-navy">
              <Icon name={item.icon} className="size-5 text-blue" />
              {item.title}
            </h3>
            {item.text ? <p className="text-small text-ink-muted">{item.text}</p> : null}
            <div className="mt-auto flex flex-col gap-1.5 pt-1">
              {item.email ? (
                <a
                  href={`mailto:${item.email}`}
                  className="inline-flex items-center gap-2 text-small font-semibold break-all text-blue underline-offset-4 hov:underline foc:outline-2 foc:outline-offset-2 foc:outline-blue"
                >
                  <Icon name="mail" className="size-4 shrink-0" />
                  {item.email}
                </a>
              ) : null}
              {item.phone ? (
                <a
                  href={`tel:${item.phone.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center gap-2 text-small font-semibold text-blue underline-offset-4 hov:underline foc:outline-2 foc:outline-offset-2 foc:outline-blue"
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
      <ol className="flex flex-col divide-y divide-line border-y border-line">
        {block.items.map((item) => (
          <li key={`${item.outlet}-${item.title}`}>
            <article className="grid grid-cols-1 gap-1 py-5 md:grid-cols-[14rem_1fr] md:gap-6">
              <p className="text-small text-ink-muted">
                <span className="font-semibold text-navy">{item.outlet}</span> · {item.date}
              </p>
              <h3 className="text-h4 text-navy">{item.title}</h3>
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
    <div className="mx-auto flex max-w-narrow flex-col gap-6">
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
