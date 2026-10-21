import { getImageProps } from 'next/image'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Magnetic } from '@/components/motion/Magnetic'
import type { HeroContent } from '@/content/types'
import { HeroScroll } from './HeroScroll'
import { HeroVideo } from './HeroVideo'

const HERO_ID = 'start'

export function HomeHero({ hero, nextId }: { hero: HeroContent; nextId: string }) {
  const words = hero.title.split(' ')
  const { props: poster } = getImageProps({
    src: hero.image.src,
    alt: hero.image.alt,
    width: hero.image.width,
    height: hero.image.height,
    sizes: '100vw',
    quality: 75,
    priority: true,
  })
  return (
    <section
      id={HERO_ID}
      aria-labelledby="hero-titel"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-shade text-on-dark [--focus-ring:var(--color-on-dark)]"
    >
      <div data-hero-media className="absolute inset-0 -z-10 overflow-hidden will-change-transform">
        <div className="relative size-full">
          {/* Poster image: shown at once, until the video plays and instead of it with reduced motion */}
          {/* eslint-disable-next-line @next/next/no-img-element -- optimised via getImageProps */}
          <img
            src={poster.src}
            srcSet={poster.srcSet}
            sizes={poster.sizes}
            alt={poster.alt}
            width={poster.width}
            height={poster.height}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover"
          />
          <HeroVideo poster={poster.src} />
        </div>
        {/* Light shading only where the text sits, so the video stays bright */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-shade/60 via-shade/15 to-shade/0"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-shade/45 via-shade/5 to-shade/0"
        />
      </div>

      <div
        data-hero-content
        className="container-wide grid items-end gap-10 pt-36 pb-16 md:pb-20 lg:grid-cols-12 lg:gap-12"
      >
        <div className="flex flex-col gap-7 lg:col-span-7">
          <h1 id="hero-titel" className="text-display">
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <span
                  className="inline-block animate-word-in"
                  style={{ animationDelay: `${120 + index * 80}ms` }}
                >
                  {word}
                </span>
                {index < words.length - 1 ? ' ' : null}
              </span>
            ))}
          </h1>
          <p className="max-w-prose text-lead text-on-dark">{hero.text}</p>
          <div
            className="flex animate-fade-up flex-wrap items-center gap-3"
            style={{ animationDelay: `${320 + words.length * 80}ms` }}
          >
            <Magnetic>
              <Button
                href={hero.primaryCta.href}
                variant="cta"
                size="lg"
                icon="arrow-right"
                className="rounded-pill! shadow-(--shadow-glow-red)"
              >
                {hero.primaryCta.label}
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>

      <a
        href={`#${nextId}`}
        className="absolute bottom-6 left-1/2 hidden size-11 -translate-x-1/2 place-items-center rounded-pill glass-dark md:grid"
      >
        <Icon name="chevron-down" className="size-4 motion-safe:animate-bounce" />
        <span className="sr-only">Weiter zu den Angeboten</span>
      </a>
      <HeroScroll targetId={HERO_ID} />
    </section>
  )
}
