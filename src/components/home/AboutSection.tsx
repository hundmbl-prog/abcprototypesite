import Image from 'next/image'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { TextLink } from '@/components/ui/TextLink'
import type { HomePage } from '@/content'

/** About us: photo, founding story (the only place for "1997" on the home page) and one text link. */
export function AboutSection({ content }: { content: HomePage['about'] }) {
  return (
    <section id="ueber-uns" aria-labelledby="ueber-uns-titel" className="bg-surface py-section">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6">
          <div data-reveal="image" className="aspect-16/10 overflow-hidden rounded-xl">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={content.image.width}
              height={content.image.height}
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder={content.image.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={content.image.blurDataURL}
              className="size-full object-cover"
            />
          </div>
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
          <TextLink href={content.cta.href}>{content.cta.label}</TextLink>
        </div>
      </div>
    </section>
  )
}
