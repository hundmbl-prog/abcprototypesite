import Image from 'next/image'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/sections/Section'
import { SectionHeader } from '@/components/sections/SectionHeader'
import type { HomePage, Person } from '@/content'

function PersonCard({ person }: { person: Person }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <div className="relative aspect-4/5 overflow-hidden bg-surface-3">
        <Image
          src={person.image.src}
          alt={person.image.alt}
          width={person.image.width}
          height={person.image.height}
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 25vw, 50vw"
          placeholder={person.image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={person.image.blurDataURL}
          className="size-full object-cover transition-transform duration-(--dur-slower) ease-out-expo motion-safe:group-hov:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-pill bg-surface/90 px-3 py-1 text-caption font-semibold text-navy backdrop-blur-sm">
          {person.location}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <h3 className="text-h4 text-navy">{person.name}</h3>
        <p className="text-small text-ink-muted">{person.role}</p>
        <ul className="mt-auto flex flex-col gap-1 pt-4 text-small">
          <li>
            <a
              href={`tel:${person.phone.replace(/[^\d+]/g, '')}`}
              className="inline-flex min-h-11 items-center gap-2 font-semibold text-blue hov:underline"
            >
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
              {person.phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${person.email}`}
              className="inline-flex min-h-11 items-center gap-2 font-semibold break-all text-blue hov:underline"
            >
              <Icon name="arrow-up-right" className="size-4" />
              {person.email}
            </a>
          </li>
        </ul>
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
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map((person) => (
          <li key={person.id} data-reveal className="min-w-0">
            <PersonCard person={person} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
