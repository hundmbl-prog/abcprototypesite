import Image from 'next/image'
import { Fragment } from 'react'
import { Button } from '@/components/ui/Button'
import type { HeroContent } from '@/content/types'

const HERO_ID = 'start'

/**
 * Home hero: the Mainz skyline, a navy overlay on the text side, headline, two solid buttons
 * and a white key-figures bar along the bottom edge. No glass, no transparency on hover.
 */
export function HomeHero({ hero }: { hero: HeroContent; nextId?: string }) {
  const words = hero.title.split(' ')
  return (
    <section
      id={HERO_ID}
      aria-labelledby="hero-titel"
      className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-navy text-on-dark [--focus-ring:var(--color-on-dark)]"
    >
      <div data-hero-media className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          width={hero.image.width}
          height={hero.image.height}
          sizes="100vw"
          priority
          fetchPriority="high"
          placeholder={hero.image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={hero.image.blurDataURL}
          className="size-full object-cover object-[65%_center] motion-safe:animate-kenburns"
        />
        {/* Navy only behind the text, so the skyline stays visible on the right */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/40 to-navy/0 lg:bg-linear-to-r lg:from-navy lg:via-navy/80 lg:to-navy/0"
        />
      </div>

      <div className="container-wide pt-36 pb-10 md:pb-14">
        <div className="max-w-3xl flex flex-col gap-6">
          <p className="inline-flex animate-fade-up items-center gap-3 text-small font-semibold tracking-widest text-on-dark-muted uppercase">
            <span aria-hidden className="h-0.5 w-8 bg-red" />
            {hero.eyebrow}
          </p>
          <h1 id="hero-titel" className="text-display">
            {words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span
                    className="inline-block animate-word-in"
                    style={{ animationDelay: `${120 + index * 80}ms` }}
                  >
                    {word}
                  </span>
                </span>
                {index < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </h1>
          <p className="max-w-prose text-lead text-on-dark">{hero.text}</p>
          <div
            className="flex animate-fade-up flex-wrap items-center gap-3"
            style={{ animationDelay: `${320 + words.length * 80}ms` }}
          >
            <Button
              href={hero.primaryCta.href}
              variant="cta"
              size="lg"
              icon="arrow-right"
              className="rounded-pill!"
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="white"
              size="lg"
              className="rounded-pill! hov:bg-navy! hov:text-on-dark!"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Key figures on a solid white bar */}
      <div className="container-wide">
        <dl className="md:max-w-3xl grid animate-fade-up grid-cols-3 divide-x divide-line rounded-t-2xl bg-surface text-ink shadow-lg [animation-delay:600ms]">
          {hero.highlights.map((item) => (
            <div key={item.label} className="flex flex-col-reverse gap-1 px-4 py-4 md:px-6 md:py-5">
              <dt className="text-caption text-ink-muted md:text-small">{item.label}</dt>
              <dd className="font-display text-h4 font-semibold text-red md:text-h3">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
