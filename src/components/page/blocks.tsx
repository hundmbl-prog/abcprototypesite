import Image from 'next/image'
import { OfferCards } from '@/components/cards/OfferCards'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { TextLink } from '@/components/ui/TextLink'
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

/** Section background chosen by the BlockRenderer: white or the light blue tint. */
export type SectionTone = 'white' | 'soft' | 'blue'

/** Steps fill whole rows: 4 → 4 columns, 5 → 5, 6 → 3 × 2. */
const stepCols: Record<number, string> = {
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-3',
}

/** Plain check list (blue ticks, no circles or boxes). */
function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-col gap-2.5', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-ink">
          <Icon name="check" className="mt-1 size-4 shrink-0 text-blue" strokeWidth={2.5} />
          {item}
        </li>
      ))}
    </ul>
  )
}

/** Text beside a photo; optional check list. Without a photo the points sit in a second column. */
export function IntroBlock({ block }: { block: IntroData }) {
  const text = (
    <div className="flex flex-col gap-5">
      <SectionHeader id={titleId(block.id)} title={block.title} className="mb-0! md:mb-0!" />
      {block.paragraphs.map((p) => (
        <p key={p} className="max-w-prose text-lead text-ink-muted">
          {p}
        </p>
      ))}
    </div>
  )
  if (!block.image) {
    return (
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">{text}</div>
        {block.points?.length ? (
          <CheckList items={block.points} className="lg:col-span-5 lg:pt-2" />
        ) : null}
      </div>
    )
  }
  const image = block.image
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={cn('lg:col-span-6', block.reverse && 'lg:order-2')}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 50vw, 100vw"
          placeholder={image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={image.blurDataURL}
          className="aspect-5/4 w-full rounded-lg object-cover"
        />
      </div>
      <div className={cn('flex flex-col gap-6 lg:col-span-6', block.reverse && 'lg:order-1')}>
        {text}
        {block.points?.length ? <CheckList items={block.points} /> : null}
      </div>
    </div>
  )
}

/** Photo tiles (optionally with a filter); a section link is a plain text link. */
export function CardsBlock({ block }: { block: CardsData }) {
  return (
    <>
      <SectionHeader
        id={titleId(block.id)}
        title={block.title}
        intro={block.intro}
        action={block.cta ? <TextLink href={block.cta.href}>{block.cta.label}</TextLink> : null}
      />
      {block.filterBy ? (
        <FilteredCards
          cards={block.cards}
          variant={block.variant}
          label={block.title}
          by={block.filterBy}
        />
      ) : (
        <OfferCards cards={block.cards} variant={block.variant} label={block.title} />
      )}
    </>
  )
}

/** Two or three short lists side by side, separated by a line – no boxes. Optional note. */
export function ColumnsBlock({ block }: { block: ColumnsData; tone?: SectionTone }) {
  return (
    <>
      <SectionHeader id={titleId(block.id)} title={block.title} intro={block.intro} />
      <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {block.columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-4 border-t-2 border-blue-200 pt-6">
            <h3 className="flex items-center gap-2.5 text-h4 text-navy">
              <Icon name={col.icon} className="size-5 text-blue" />
              {col.title}
            </h3>
            <CheckList items={col.items} className="text-small" />
          </div>
        ))}
        {block.note ? (
          <aside className="flex flex-col gap-2 rounded-lg border border-line bg-surface p-6">
            <p className="flex items-center gap-2 font-semibold text-navy">
              <Icon name="info" className="size-4 text-red" />
              {block.note.title}
            </p>
            <p className="text-ink-muted">{block.note.text}</p>
          </aside>
        ) : null}
      </div>
    </>
  )
}

/** Numbered steps as a plain list with small numbers – no cards. */
export function StepsBlock({ block }: { block: StepsData; tone?: SectionTone }) {
  return (
    <>
      <SectionHeader
        id={titleId(block.id)}
        title={block.title}
        intro={block.intro}
        action={block.cta ? <TextLink href={block.cta.href}>{block.cta.label}</TextLink> : null}
      />
      <ol
        className={cn(
          'grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2',
          stepCols[block.steps.length] ?? 'lg:grid-cols-3',
        )}
      >
        {block.steps.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-blue-100 font-semibold text-blue-700 ring-1 ring-blue-200">
              {i + 1}
            </span>
            <h3 className="text-h4 text-navy">{step.title}</h3>
            <p className="text-ink-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </>
  )
}

/** FAQ as an accordion of native <details> elements, separated by lines. */
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
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <SectionHeader id={titleId(block.id)} title={block.title} intro={block.intro} />
      </div>
      <div className="divide-y divide-line border-y border-line lg:col-span-8">
        {block.items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-navy marker:hidden hov:text-blue foc:outline-2 foc:outline-offset-2 foc:outline-blue [&::-webkit-details-marker]:hidden">
              {item.question}
              <Icon
                name="chevron-down"
                className="size-5 shrink-0 text-blue transition-transform duration-(--dur-base) group-open:rotate-180"
              />
            </summary>
            <p className="max-w-prose pb-6 text-ink-muted">{item.answer}</p>
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

/** Official links as a simple list; external links open in a new tab. */
export function LinksBlock({ block }: { block: LinksData }) {
  return (
    <>
      <SectionHeader id={titleId(block.id)} title={block.title} intro={block.intro} />
      <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
        {block.links.map((link) => {
          const external = link.href.startsWith('http')
          const download = link.kind === 'ZIP' || link.kind === 'PDF' || link.kind === 'MP3'
          return (
            <li key={link.href} className="border-b border-line">
              <a
                href={link.href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-start gap-3 py-4 foc:outline-2 foc:outline-offset-2 foc:outline-blue"
              >
                <Icon
                  name={download ? 'download' : 'arrow-up-right'}
                  className="mt-1 size-4 shrink-0 text-blue"
                />
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-semibold text-navy group-hover:text-blue group-hover:underline">
                    {link.label}
                    {link.kind ? (
                      <span className="font-normal text-ink-muted"> ({link.kind})</span>
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

/** Closing band (ABC Blue, white text): text on the left, the page's one red button on the right. */
function Closing({
  id,
  title,
  text,
  primary,
  secondary,
  children,
}: {
  id?: string
  title: string
  text: string
  primary?: { href: string; label: string }
  secondary?: { href: string; label: string }
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex max-w-[36rem] flex-col gap-4">
        <h2 id={id} className="text-h2 text-on-dark">
          {title}
        </h2>
        <p className="text-lead text-on-dark-muted">{text}</p>
        {children}
      </div>
      {primary ? (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href={primary.href} variant="cta" size="lg">
            {primary.label}
          </Button>
          {secondary ? (
            <TextLink href={secondary.href} tone="dark">
              {secondary.label}
            </TextLink>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

/**
 * Closing section of a page: the call to action plus phone and department e-mail.
 * Addresses live in the footer and on the Kontakt page.
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
  const primary = cta
    ? {
        label: cta.primary.label,
        href: cta.primary.href === `#${contact.id}` ? `mailto:${contact.email}` : cta.primary.href,
      }
    : undefined
  return (
    <Closing
      id={titleId(contact.id)}
      title={cta?.title ?? contact.title}
      text={cta?.text ?? contact.text}
      primary={primary}
      secondary={cta?.secondary}
    >
      <p className="flex flex-wrap gap-x-6 gap-y-1 font-semibold">
        <a
          href={telHref(location.phone)}
          className="inline-flex min-h-11 items-center gap-2 text-on-dark hov:underline"
        >
          <Icon name="phone" className="size-4" />
          {location.phone}
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex min-h-11 items-center gap-2 break-all text-on-dark hov:underline"
        >
          <Icon name="mail" className="size-4" />
          {contact.email}
        </a>
      </p>
    </Closing>
  )
}

/** Closing call to action without a contact block. */
export function CtaBlock({ block }: { block: CtaData }) {
  return (
    <Closing
      title={block.title}
      text={block.text}
      primary={block.primary}
      secondary={block.secondary}
    />
  )
}

/** Fees: exam fees of the centre plus the official telc service fees. */
export function FeesBlock({ block }: { block: FeesData }) {
  return (
    <>
      <SectionHeader id={titleId(block.id)} title={block.title} intro={block.intro} />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <table className="w-full text-left lg:col-span-7">
          <caption className="sr-only">Prüfungsgebühren am ABC</caption>
          <thead className="border-b-2 border-blue-200 text-navy">
            <tr>
              <th scope="col" className="py-3 pr-4 text-small font-semibold">
                Prüfung
              </th>
              <th scope="col" className="py-3 text-small font-semibold">
                Gebühr
              </th>
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.label} className="border-b border-line">
                <th scope="row" className="py-4 pr-4 font-semibold text-navy">
                  {row.label}
                  {row.note ? (
                    <span className="block text-small font-normal text-ink-muted">{row.note}</span>
                  ) : null}
                </th>
                <td className="py-4 whitespace-nowrap text-ink">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <aside className="flex flex-col gap-3 lg:col-span-5">
          <h3 className="text-h4 text-navy">Gebühren der telc gGmbH</h3>
          <dl className="flex flex-col divide-y divide-line border-y border-line">
            {block.officialFees.map((fee) => (
              <div key={fee.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-ink-muted">{fee.label}</dt>
                <dd className="font-semibold whitespace-nowrap text-navy">{fee.value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-small text-ink-muted">{block.note}</p>
        </aside>
      </div>
    </>
  )
}
