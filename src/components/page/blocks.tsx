import Image from 'next/image'
import { OfferCards } from '@/components/cards/OfferCards'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type {
  CardsBlock as CardsData,
  ColumnsBlock as ColumnsData,
  ContactBlock as ContactData,
  CtaBlock as CtaData,
  FaqBlock as FaqData,
  FeesBlock as FeesData,
  IntroBlock as IntroData,
  LinksBlock as LinksData,
  Location,
  StepsBlock as StepsData,
} from '@/content/types'
import { FilteredCards } from './FilteredCards'

const titleId = (id: string) => `${id}-titel`

/** Section background chosen by the BlockRenderer; "deep" is the brand-blue section. */
export type SectionTone = 'white' | 'soft' | 'deep'

/** Steps fill whole rows: 4 → 4 columns, 5 → 5, 6 → 3 × 2. */
const stepCols: Record<number, string> = {
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-3',
}

/** Text beside a photo with an asymmetric mask; optional check list. */
export function IntroBlock({ block }: { block: IntroData }) {
  if (!block.image) return <IntroPanel block={block} />
  const image = block.image
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={block.reverse ? 'lg:order-2 lg:col-span-6' : 'lg:col-span-6'}>
        <div
          data-reveal="image"
          className="group aspect-5/4 overflow-hidden rounded-tl-2xl rounded-tr-sm rounded-br-2xl rounded-bl-sm shadow-md"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 50vw, 100vw"
            placeholder={image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={image.blurDataURL}
            className="size-full object-cover transition-transform duration-(--dur-slower) ease-out-expo motion-safe:group-hover:scale-105"
          />
        </div>
      </div>
      <div
        className={
          block.reverse
            ? 'flex flex-col gap-6 lg:order-1 lg:col-span-6'
            : 'flex flex-col gap-6 lg:col-span-6'
        }
      >
        <SectionHeader
          id={titleId(block.id)}
          eyebrow={block.eyebrow}
          title={block.title}
          className="mb-0! md:mb-0!"
        />
        {block.paragraphs.map((text) => (
          <p key={text} className="text-lead text-ink-muted">
            {text}
          </p>
        ))}
        {block.points?.length ? (
          <ul className="grid gap-3 sm:grid-cols-2">
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
    </div>
  )
}

/** Intro without a photo: text on the left, the key points in a blue panel with the logo mark. */
function IntroPanel({ block }: { block: IntroData }) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="flex flex-col gap-6 lg:col-span-7">
        <SectionHeader
          id={titleId(block.id)}
          eyebrow={block.eyebrow}
          title={block.title}
          className="mb-0! md:mb-0!"
        />
        {block.paragraphs.map((text) => (
          <p key={text} className="text-lead text-ink-muted">
            {text}
          </p>
        ))}
      </div>
      {block.points?.length ? (
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-2xl tone-navy p-6 md:p-8 lg:col-span-5"
        >
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {block.points.map((point) => (
              <li key={point} className="flex items-center gap-3 font-semibold">
                <span className="grid size-8 shrink-0 place-items-center rounded-pill bg-red-500">
                  <Icon name="check" className="size-4" strokeWidth={2.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

/** Photo offer cards in the variant chosen for this section (optionally with level filter). */
export function CardsBlock({ block }: { block: CardsData }) {
  return (
    <>
      <SectionHeader
        id={titleId(block.id)}
        eyebrow={block.eyebrow}
        title={block.title}
        intro={block.intro}
        action={
          block.cta ? (
            <Button href={block.cta.href} variant="pill-red">
              {block.cta.label}
            </Button>
          ) : undefined
        }
      />
      {block.filterBy ? (
        <FilteredCards
          cards={block.cards}
          variant={block.variant}
          label={block.title}
          by={block.filterBy}
          simple={block.simple}
        />
      ) : (
        <OfferCards
          cards={block.cards}
          variant={block.variant}
          label={block.title}
          simple={block.simple}
        />
      )}
    </>
  )
}

/** Two or three short lists side by side (e.g. target group, requirements, documents). */
export function ColumnsBlock({ block, tone }: { block: ColumnsData; tone?: SectionTone }) {
  const deep = tone === 'deep'
  return (
    <>
      <SectionHeader
        id={titleId(block.id)}
        eyebrow={block.eyebrow}
        title={block.title}
        intro={block.intro}
        tone={deep ? 'dark' : 'light'}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {block.columns.map((col) => (
          <div
            key={col.title}
            data-reveal
            className={cn(
              'group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6 transition-[transform,box-shadow,background-color] duration-(--dur-slow) ease-out-expo md:p-8 hov:-translate-y-1',
              deep
                ? 'bg-blue ring-1 ring-blue hov:ring-on-dark'
                : 'border border-line bg-linear-to-br from-surface to-blue-50 shadow-sm hov:shadow-(--shadow-float)',
            )}
          >
            <span
              className={cn(
                'grid size-12 place-items-center rounded-pill transition-transform duration-(--dur-slow) ease-out-expo group-hover:scale-110',
                deep ? 'bg-surface text-blue-700' : 'bg-blue-600 text-on-dark',
              )}
            >
              <Icon name={col.icon} className="size-5" />
            </span>
            <h3 className={cn('text-h4', deep ? 'text-on-dark' : 'text-blue-900')}>{col.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {col.items.map((item) => (
                <li
                  key={item}
                  className={cn(
                    'flex items-start gap-2.5 text-small',
                    deep ? 'text-on-dark-muted' : 'text-ink',
                  )}
                >
                  <Icon
                    name="check"
                    className={cn(
                      'mt-0.5 size-4 shrink-0',
                      deep ? 'text-red-300' : 'text-blue-600',
                    )}
                    strokeWidth={2.5}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {block.note ? (
          <aside
            data-reveal
            className={cn(
              'relative flex flex-col gap-3 overflow-hidden rounded-2xl p-6 md:p-8 lg:col-span-1',
              deep ? 'bg-surface text-ink shadow-lg' : 'tone-navy',
            )}
          >
            <Icon
              name="info"
              className={cn(
                'absolute -right-6 -bottom-6 size-32',
                deep ? 'text-blue-50' : 'text-blue',
              )}
            />
            <span
              className={cn(
                'relative inline-flex items-center gap-2 text-caption font-semibold tracking-widest uppercase',
                deep ? 'text-red-600' : 'text-red-300',
              )}
            >
              <Icon name="info" className="size-4" />
              {block.note.title}
            </span>
            <p className={cn('relative', deep ? 'text-ink-muted' : 'text-on-dark-muted')}>
              {block.note.text}
            </p>
          </aside>
        ) : null}
      </div>
    </>
  )
}

/** Numbered steps; a line connects them, each step lifts in as it scrolls into view. */
export function StepsBlock({ block, tone }: { block: StepsData; tone?: SectionTone }) {
  const deep = tone === 'deep'
  return (
    <>
      <SectionHeader
        id={titleId(block.id)}
        eyebrow={block.eyebrow}
        title={block.title}
        intro={block.intro}
        tone={deep ? 'dark' : 'light'}
        action={
          block.cta ? (
            <Button href={block.cta.href} variant="pill-red">
              {block.cta.label}
            </Button>
          ) : undefined
        }
      />
      <ol
        className={cn(
          'relative grid gap-6 md:grid-cols-2 md:gap-5',
          stepCols[block.steps.length] ?? 'lg:grid-cols-3',
        )}
      >
        {block.steps.map((step, i) => (
          <li
            key={step.title}
            data-reveal
            className={cn(
              'group relative flex flex-col gap-4 rounded-2xl p-6 transition-[transform,box-shadow,background-color] duration-(--dur-slow) ease-out-expo hov:-translate-y-1',
              deep
                ? 'bg-blue ring-1 ring-blue hov:ring-on-dark'
                : 'border border-line bg-surface shadow-sm hov:shadow-(--shadow-float)',
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'grid size-11 place-items-center rounded-pill font-display text-h4 font-semibold transition-colors duration-(--dur-base)',
                  deep
                    ? 'bg-red-500 text-on-dark group-hover:bg-surface group-hover:text-blue-900'
                    : 'bg-blue-900 text-on-dark group-hover:bg-red-500',
                )}
              >
                {i + 1}
              </span>
              <span
                aria-hidden
                className={cn(
                  'h-0.5 flex-1 bg-linear-to-r to-transparent',
                  deep ? 'from-blue' : 'from-blue-200',
                )}
              />
            </div>
            <h3 className={cn('text-h4', deep ? 'text-on-dark' : 'text-blue-900')}>{step.title}</h3>
            <p className={cn('text-small', deep ? 'text-on-dark-muted' : 'text-ink-muted')}>
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </>
  )
}

/** FAQ as an accordion of native <details> elements (keyboard and screen reader friendly). */
export function FaqBlock({ block }: { block: FaqData }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: block.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <SectionHeader
          id={titleId(block.id)}
          eyebrow={block.eyebrow}
          title={block.title}
          intro={block.intro}
        />
      </div>
      <div className="flex flex-col gap-3 lg:col-span-8">
        {block.items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-line bg-surface shadow-sm transition-shadow duration-(--dur-base) open:shadow-md"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl p-5 font-semibold text-blue-900 marker:hidden md:p-6 hov:bg-blue-50 foc:outline-2 foc:outline-offset-2 foc:outline-blue [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="grid size-8 shrink-0 place-items-center rounded-pill bg-blue-50 text-blue-700 transition-[transform,background-color,color] duration-(--dur-base) ease-out-expo group-open:rotate-180 group-open:bg-red-500 group-open:text-on-dark">
                <Icon name="chevron-down" className="size-4" />
              </span>
            </summary>
            <p className="px-5 pb-6 text-ink-muted md:px-6">{item.answer}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </div>
  )
}

/** Official links (practice tests, information pages); external links open in a new tab. */
export function LinksBlock({ block }: { block: LinksData }) {
  return (
    <>
      <SectionHeader
        id={titleId(block.id)}
        eyebrow={block.eyebrow}
        title={block.title}
        intro={block.intro}
      />
      <ul
        className={cn(
          'grid gap-4 md:grid-cols-2',
          block.links.length % 3 === 0 || block.links.length > 4 ? 'lg:grid-cols-3' : '',
        )}
      >
        {block.links.map((link) => {
          const external = link.href.startsWith('http')
          const download = link.kind === 'ZIP' || link.kind === 'PDF' || link.kind === 'MP3'
          return (
            <li key={link.href} data-reveal>
              <a
                href={link.href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group relative flex h-full items-start gap-4 overflow-hidden rounded-xl border border-line bg-surface p-5 shadow-sm transition-[transform,box-shadow,border-color] duration-(--dur-slow) ease-out-expo hov:-translate-y-1 hov:border-blue-300 hov:shadow-md foc:outline-2 foc:outline-offset-2 foc:outline-blue"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-pill bg-blue-50 text-blue-700 transition-colors duration-(--dur-base) group-hover:bg-blue-600 group-hover:text-on-dark">
                  <Icon name={download ? 'download' : 'arrow-up-right'} className="size-5" />
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-blue-900">{link.label}</span>
                    {link.kind ? (
                      <span className="rounded-pill bg-blue-900 px-2 py-0.5 text-caption font-semibold text-on-dark">
                        {link.kind}
                      </span>
                    ) : null}
                  </span>
                  {link.description ? (
                    <span className="text-small text-ink-muted">{link.description}</span>
                  ) : null}
                  {external ? <span className="sr-only">(öffnet in neuem Tab)</span> : null}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/**
 * Closing card of a page: the call to action plus phone and department e-mail in one
 * deep-blue card with the logo mark. Addresses live in the footer and on the Kontakt page.
 */
export function ClosingBlock({
  contact,
  cta,
  location,
}: {
  contact: ContactData
  cta?: CtaData
  location: Location
}) {
  const primaryHref = (href: string) =>
    href === `#${contact.id}` ? `mailto:${contact.email}` : href
  return (
    <div className="relative isolate flex flex-col gap-8 overflow-hidden rounded-2xl tone-navy p-6 shadow-lg md:p-12 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-xl flex flex-col gap-4">
        <SectionHeader
          id={titleId(contact.id)}
          eyebrow={contact.eyebrow}
          title={cta?.title ?? contact.title}
          tone="dark"
          className="mb-0! md:mb-0!"
        />
        <p className="text-lead text-on-dark-muted">{cta?.text ?? contact.text}</p>
      </div>
      <div className="flex flex-col gap-5 lg:items-end">
        {cta ? (
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button href={primaryHref(cta.primary.href)} variant="pill-red" size="lg">
              {cta.primary.label}
            </Button>
            {cta.secondary ? (
              <Button href={cta.secondary.href} variant="ghost" size="lg">
                {cta.secondary.label}
              </Button>
            ) : null}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-small font-semibold lg:justify-end">
          <a
            href={telHref(location.phone)}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm underline-offset-4 hov:underline"
          >
            <Icon name="phone" className="size-4 text-red-300" />
            {location.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm break-all underline-offset-4 hov:underline"
          >
            <Icon name="mail" className="size-4 text-red-300" />
            {contact.email}
          </a>
        </div>
      </div>
    </div>
  )
}

/** Closing call to action without a contact block (deep-blue banner). */
export function CtaBlock({ block }: { block: CtaData }) {
  return (
    <CtaBanner
      title={block.title}
      text={block.text}
      actions={
        <>
          <Button href={block.primary.href} variant="pill-red" size="lg">
            {block.primary.label}
          </Button>
          {block.secondary ? (
            <Button href={block.secondary.href} variant="ghost" size="lg">
              {block.secondary.label}
            </Button>
          ) : null}
        </>
      }
    />
  )
}

/** Fees: exam fees of the centre plus the official telc service fees. */
export function FeesBlock({ block }: { block: FeesData }) {
  return (
    <>
      <SectionHeader
        id={titleId(block.id)}
        eyebrow={block.eyebrow}
        title={block.title}
        intro={block.intro}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div
          data-reveal
          className="overflow-hidden rounded-2xl border border-line bg-surface shadow-md lg:col-span-7"
        >
          <table className="w-full text-left">
            <caption className="sr-only">Prüfungsgebühren am ABC</caption>
            <thead className="bg-blue-900 text-on-dark">
              <tr>
                <th scope="col" className="p-4 text-small font-semibold md:px-6">
                  Prüfung
                </th>
                <th scope="col" className="p-4 text-small font-semibold md:px-6">
                  Gebühr
                </th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.label} className="border-t border-line odd:bg-blue-50">
                  <th scope="row" className="p-4 font-semibold text-blue-900 md:px-6">
                    {row.label}
                    {row.note ? (
                      <span className="block text-small font-normal text-ink-muted">
                        {row.note}
                      </span>
                    ) : null}
                  </th>
                  <td className="p-4 font-semibold whitespace-nowrap text-ink md:px-6">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <aside
          data-reveal
          className="flex flex-col gap-4 rounded-2xl bg-blue-900 p-6 text-on-dark md:p-8 lg:col-span-5"
        >
          <h3 className="text-h4">Gebühren der telc gGmbH</h3>
          <dl className="flex flex-col divide-y divide-on-dark/15">
            {block.officialFees.map((fee) => (
              <div key={fee.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-on-dark-muted">{fee.label}</dt>
                <dd className="font-semibold whitespace-nowrap">{fee.value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-small text-on-dark-muted">{block.note}</p>
        </aside>
      </div>
    </>
  )
}
