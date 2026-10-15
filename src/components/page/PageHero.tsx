import Image from 'next/image'
import { HeroScroll } from '@/components/home/HeroScroll'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import type { PageHero as PageHeroData } from '@/content/types'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'

const HERO_ID = 'seitenkopf'

/**
 * Hero for content pages: photo with slow Ken Burns zoom, headline revealed word by word,
 * scroll-linked zoom-out, breadcrumbs and an optional strip of key facts.
 */
export function PageHero({
  hero,
  crumbs,
  siteUrl,
}: {
  hero: PageHeroData
  crumbs: Crumb[]
  siteUrl: string
}) {
  const words = hero.title.split(' ')
  return (
    <section
      id={HERO_ID}
      aria-labelledby="seiten-titel"
      className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden bg-shade text-on-dark [--focus-ring:var(--color-on-dark)]"
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
          className="absolute inset-0 bg-linear-to-t from-shade/85 via-shade/35 to-shade/10"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-shade/60 via-shade/20 to-shade/0"
        />
      </div>

      <div data-hero-content className="container-wide flex flex-col gap-6 pt-36 pb-12 md:pb-16">
        <Breadcrumbs items={crumbs} siteUrl={siteUrl} />
        <p className="inline-flex animate-fade-up items-center gap-3 text-small font-semibold tracking-widest text-red-300 uppercase">
          <span aria-hidden className="h-0.5 w-8 bg-current" />
          {hero.eyebrow}
        </p>
        <h1 id="seiten-titel" className="max-w-4xl text-display text-balance">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="inline-block animate-fade-up"
              style={{ animationDelay: `${120 + index * 70}ms` }}
            >
              {word}
              {index < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>
        <p className="max-w-2xl animate-fade-up text-lead text-on-dark/90 [animation-delay:300ms]">
          {hero.intro}
        </p>
        {hero.primaryCta || hero.secondaryCta ? (
          <div className="flex animate-fade-up flex-wrap gap-3 [animation-delay:420ms]">
            {hero.primaryCta ? (
              <Button href={hero.primaryCta.href} variant="pill-red" size="lg">
                {hero.primaryCta.label}
              </Button>
            ) : null}
            {hero.secondaryCta ? (
              <Button href={hero.secondaryCta.href} variant="ghost" size="lg">
                {hero.secondaryCta.label}
              </Button>
            ) : null}
          </div>
        ) : null}
        {hero.facts?.length ? (
          <dl className="mt-4 grid animate-fade-up grid-cols-2 gap-px overflow-hidden rounded-xl glass-dark [animation-delay:520ms] md:grid-cols-4">
            {hero.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 bg-shade/20 p-4 md:p-5">
                <dt className="flex items-center gap-2 text-caption font-semibold tracking-wide text-on-dark/75 uppercase">
                  <Icon name={fact.icon} className="size-4 text-red-300" />
                  {fact.label}
                </dt>
                <dd className="pl-6 font-semibold text-pretty">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
      <HeroScroll targetId={HERO_ID} />
    </section>
  )
}
