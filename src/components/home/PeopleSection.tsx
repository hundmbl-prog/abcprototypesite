import Image from 'next/image'
import { Section } from '@/components/sections/Section'
import { SectionHeader } from '@/components/sections/SectionHeader'
import type { HomePage, Person } from '@/content'

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

/** Portrait card with a glass name plate laid over the photo. All cards in the row are identical. */
function PersonCard({ person }: { person: Person }) {
  return (
    <article className="group sheen relative isolate flex aspect-4/5 flex-col justify-end overflow-hidden rounded-2xl bg-surface-3 shadow-md transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo sm:aspect-2/3 hov:-translate-y-1.5 hov:shadow-(--shadow-float)">
      <Image
        src={person.image.src}
        alt={person.image.alt}
        width={person.image.width}
        height={person.image.height}
        sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
        placeholder={person.image.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={person.image.blurDataURL}
        className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-(--dur-slower) ease-out-expo motion-safe:group-hov:scale-105"
      />
      <span className="absolute top-3 left-3 rounded-pill px-3 py-1 text-caption font-semibold text-navy glass">
        {person.location}
      </span>
      <div className="m-3 flex flex-col gap-3 rounded-xl p-4 glass-strong">
        <div>
          <h3 className="text-h4 text-navy">{person.name}</h3>
          <p className="text-small text-ink-muted">{person.role}</p>
        </div>
        <div className="flex gap-2">
          <a
            href={telHref(person.phone)}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-pill bg-navy px-3 text-small font-semibold text-on-dark hov:bg-navy-2"
          >
            <PhoneIcon />
            Anrufen
            <span className="sr-only">
              : {person.name}, {person.phone}
            </span>
          </a>
          <a
            href={`mailto:${person.email}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-pill border border-control bg-surface px-3 text-small font-semibold text-navy hov:border-navy"
          >
            <MailIcon />
            E-Mail
            <span className="sr-only">: {person.email}</span>
          </a>
        </div>
      </div>
    </article>
  )
}

export function PeopleSection({ content }: { content: HomePage['people'] }) {
  return (
    <Section id="ansprechpartner" labelledBy="ansprechpartner-titel">
      <SectionHeader
        id="ansprechpartner-titel"
        eyebrow={content.eyebrow}
        title={content.title}
        intro={content.intro}
      />
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {content.items.map((person) => (
          <li key={person.id} data-reveal className="min-w-0">
            <PersonCard person={person} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
