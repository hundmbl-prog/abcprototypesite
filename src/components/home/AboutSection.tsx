import Image from 'next/image'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Button } from '@/components/ui/Button'
import type { HomePage } from '@/content'

/** About us: photo with a small badge, founding story, three milestones and a red button. */
export function AboutSection({ content }: { content: HomePage['about'] }) {
  return (
    <section id="ueber-uns" aria-labelledby="ueber-uns-titel" className="bg-surface py-section">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="group relative lg:col-span-6">
          <div data-reveal="image" className="aspect-16/10 overflow-hidden rounded-2xl shadow-md">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={content.image.width}
              height={content.image.height}
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder={content.image.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={content.image.blurDataURL}
              className="size-full object-cover transition-transform duration-(--dur-slower) ease-out-expo motion-safe:group-hover:scale-105"
            />
          </div>
          <p className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-xl bg-surface px-5 py-3 shadow-(--shadow-float) ring-1 ring-blue-900/5 transition-transform duration-(--dur-slow) ease-out-expo group-hover:-translate-y-1">
            <span className="font-display text-h2 font-semibold text-red-600">
              {content.badge.value}
            </span>
            <span className="text-small font-medium text-blue-900">{content.badge.label}</span>
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-6">
          <SectionHeader
            id="ueber-uns-titel"
            eyebrow={content.eyebrow}
            title={content.title}
            className="mb-0! md:mb-0!"
          />
          {content.paragraphs.map((text) => (
            <p key={text} className="text-lead text-ink-muted">
              {text}
            </p>
          ))}
          <ul className="grid gap-3 sm:grid-cols-3">
            {content.milestones.map((m) => (
              <li
                key={m.id}
                data-reveal
                className="min-w-0 rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100 transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo hover:-translate-y-1 hover:shadow-md"
              >
                <p className="font-display text-h4 font-semibold text-red-600">{m.year}</p>
                <p className="text-small break-words hyphens-auto text-blue-900">{m.text}</p>
              </li>
            ))}
          </ul>
          <div>
            <Button href={content.cta.href} variant="pill-red">
              {content.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
