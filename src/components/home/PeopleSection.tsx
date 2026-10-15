import Image from 'next/image'
import { cn } from '@/lib/cn'
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

/** Accent per person – warm reds with one blue, matching the blush section background. */
const accents = [
  { ring: 'from-red-400 to-red-600', role: 'text-red-700' },
  { ring: 'from-blue-500 to-blue-700', role: 'text-blue-700' },
  { ring: 'from-red-500 to-red-700', role: 'text-red-700' },
  { ring: 'from-red-300 to-red-500', role: 'text-red-700' },
] as const

/** Portrait on top, text below on a solid card – the name is never laid over the photo. */
function PersonCard({ person, index }: { person: Person; index: number }) {
  const accent = accents[index % accents.length] ?? accents[0]
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-linear-to-b from-surface to-red-50 shadow-md ring-1 ring-line transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo hov:-translate-y-1.5 hov:shadow-(--shadow-float)">
      <div className="relative aspect-4/5 overflow-hidden">
        <Image
          src={person.image.src}
          alt={person.image.alt}
          width={person.image.width}
          height={person.image.height}
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
          placeholder={person.image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={person.image.blurDataURL}
          className="size-full object-cover transition-transform duration-(--dur-slower) ease-out-expo motion-safe:group-hov:scale-105"
        />
        <span
          aria-hidden
          className={cn('absolute inset-x-0 bottom-0 h-1 bg-linear-to-r', accent.ring)}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-2">
          <span className="self-start rounded-pill bg-red-50 px-3 py-1 text-caption font-semibold text-red-700 ring-1 ring-red-200">
            {person.location}
          </span>
          <h3 className="text-h4 [hyphens:manual] text-navy">{person.name}</h3>
          <p className={cn('text-small font-semibold', accent.role)}>{person.role}</p>
        </div>
        <div className="mt-auto flex gap-2">
          <a
            href={telHref(person.phone)}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-pill bg-red-500 px-4 text-small font-semibold text-on-dark shadow-sm transition-[background-color,box-shadow,transform] duration-(--dur-base) active:scale-95 hov:bg-red-600 hov:shadow-(--shadow-glow-red)"
          >
            <PhoneIcon />
            Anrufen
            <span className="sr-only">
              : {person.name}, {person.phone}
            </span>
          </a>
          <a
            href={`mailto:${person.email}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-pill bg-red-50 px-3 text-small font-semibold text-red-700 ring-1 ring-red-200 hov:bg-red-100"
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
    <section
      id="ansprechpartner"
      aria-labelledby="ansprechpartner-titel"
      className="relative isolate overflow-hidden bg-blue-50 py-section"
    >
      <div className="container-page">
        <SectionHeader
          id="ansprechpartner-titel"
          eyebrow={content.eyebrow}
          title={content.title}
          intro={content.intro}
          accent="red"
        />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {content.items.map((person, i) => (
            <li key={person.id} data-reveal className="min-w-0">
              <PersonCard person={person} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
