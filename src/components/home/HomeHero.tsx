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
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-shade text-on-dark [--focus-ring:var(--color-on-dark)]"
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
        {/* Neutral (not blue) shading only where the text sits, so the photo keeps its colours */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-shade/80 via-shade/25 to-shade/0"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-shade/60 via-shade/15 to-shade/0"
        />
      </div>

      <div
        data-hero-content
        className="container-wide grid items-end gap-10 pt-36 pb-16 md:pb-20 lg:grid-cols-12 lg:gap-12"
      >
        <div className="flex flex-col gap-7 lg:col-span-7">
          <p className="inline-flex animate-fade-up items-center gap-2 self-start rounded-pill px-4 py-2 text-small font-semibold glass-dark">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-pill bg-success-soft opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-pill bg-success-soft" />
            </span>
            {hero.badge}
          </p>
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
            <Button
              href={hero.secondaryCta.href}
              variant="ghost"
              size="lg"
              className="rounded-pill! border-0! glass-dark hov:bg-on-dark/20!"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="hidden flex-col justify-end gap-4 lg:col-span-5 lg:flex">
          <ul
            className="grid animate-fade-up grid-cols-3 gap-3"
            style={{ animationDelay: '650ms' }}
          >
            {hero.highlights.map((item) => (
              <li key={item.label} className="flex flex-col gap-1 rounded-xl px-4 py-3 glass-dark">
                <span className="font-display text-h4 font-semibold">{item.value}</span>
                <span className="text-caption text-on-dark">{item.label}</span>
              </li>
            ))}
          </ul>
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
