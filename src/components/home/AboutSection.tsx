import Image from 'next/image'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { HouseMark } from '@/components/ui/HouseMark'
import { TextLink } from '@/components/ui/TextLink'
import type { HomePage } from '@/content'

/**
 * About us as one full screen on large displays: heading and story side by side, the team photo
 * wide below (21:9 keeps all six faces). The photo drifts slowly while it crosses the viewport.
 */
export function AboutSection({ content }: { content: HomePage['about'] }) {
  return (
    <section
      id="ueber-uns"
      aria-labelledby="ueber-uns-titel"
      className="bg-surface py-section-lg lg:flex lg:min-h-svh lg:flex-col lg:justify-center"
    >
      <div className="container-page flex flex-col gap-12 lg:gap-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <HouseMark variant="roof" stroke={4} className="w-14 text-blue" />
            <SectionHeader
              id="ueber-uns-titel"
              eyebrow={content.eyebrow}
              title={content.title}
              size="h1"
              mark
              reveal={false}
              className="mb-0! md:mb-0!"
            />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
            {content.paragraphs.map((text) => (
              <p key={text} className="max-w-prose text-lead text-ink-muted">
                {text}
              </p>
            ))}
            <TextLink href={content.cta.href}>{content.cta.label}</TextLink>
          </div>
        </div>
        <div className="aspect-3/2 overflow-hidden rounded-xl md:aspect-21/9">
          <Image
            data-parallax
            src={content.image.src}
            alt={content.image.alt}
            width={content.image.width}
            height={content.image.height}
            sizes="(min-width: 1280px) 1216px, 100vw"
            placeholder={content.image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={content.image.blurDataURL}
            className="size-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
