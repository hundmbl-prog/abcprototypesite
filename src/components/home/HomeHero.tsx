import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Magnetic } from '@/components/motion/Magnetic'
import type { HeroContent } from '@/content/types'
import { HeroScroll } from './HeroScroll'

const HERO_ID = 'start'

export function HomeHero({ hero, nextId }: { hero: HeroContent; nextId: string }) {
  const words = hero.title.split(' ')
  return (
    <section
      id={HERO_ID}
      aria-labelledby="hero-titel"
      className="relative isolate flex min-h-svh items-end overflow-hidden tone-navy"
    >
      <div data-hero-media className="absolute inset-0 -z-10 overflow-hidden will-change-transform">
        <div className="size-full motion-safe:animate-kenburns">
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
            className="size-full object-cover"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-navy via-navy/70 to-navy/30"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-navy/80 via-navy/30 to-transparent"
        />
      </div>

      <div data-hero-content className="container-wide flex flex-col gap-8 pt-40 pb-24 md:pb-32">
        <p className="inline-flex animate-fade-up items-center gap-3 text-small font-semibold tracking-widest text-on-dark-muted uppercase">
          <span aria-hidden className="h-0.5 w-8 bg-red" />
          {hero.eyebrow}
        </p>
        <h1 id="hero-titel" className="max-w-narrow text-display">
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
        <p className="max-w-prose text-lead text-on-dark-muted">{hero.text}</p>
        <div
          className="flex animate-fade-up flex-wrap items-center gap-4"
          style={{ animationDelay: `${320 + words.length * 80}ms` }}
        >
          <Magnetic>
            <Button href={hero.primaryCta.href} variant="cta" size="lg" icon="arrow-right">
              {hero.primaryCta.label}
            </Button>
          </Magnetic>
          <Button href={hero.secondaryCta.href} variant="ghost" size="lg">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>

      <a
        href={`#${nextId}`}
        className="absolute right-6 bottom-8 hidden items-center gap-3 rounded-pill text-small font-semibold text-on-dark-muted md:inline-flex hov:text-on-dark"
      >
        Weiter scrollen
        <span className="grid size-11 place-items-center rounded-pill border border-on-dark/40">
          <Icon name="chevron-down" className="size-4 motion-safe:animate-bounce" />
        </span>
      </a>
      <HeroScroll targetId={HERO_ID} />
    </section>
  )
}
