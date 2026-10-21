import Image from 'next/image'
import { TextLink } from '@/components/ui/TextLink'
import type { HomePage } from '@/content'

/** About: one real team photo beside a short text and one text link (the only place for "Seit 1997"). */
export function AboutSection({ content }: { content: HomePage['about'] }) {
  return (
    <section id="ueber-uns" aria-labelledby="ueber-uns-titel" className="bg-blue-100 py-section">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="overflow-hidden rounded-lg lg:col-span-7">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            width={content.image.width}
            height={content.image.height}
            sizes="(min-width: 1024px) 55vw, 100vw"
            placeholder={content.image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={content.image.blurDataURL}
            className="h-auto w-full"
          />
        </div>
        <div className="flex flex-col gap-5 lg:col-span-5">
          <h2 id="ueber-uns-titel" className="text-h2 text-navy">
            {content.title}
          </h2>
          {content.paragraphs.map((text) => (
            <p key={text} className="max-w-prose text-lead text-ink-muted">
              {text}
            </p>
          ))}
          <TextLink href={content.cta.href}>{content.cta.label}</TextLink>
        </div>
      </div>
    </section>
  )
}
