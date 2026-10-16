import Image from 'next/image'
import { HeroScroll } from '@/components/home/HeroScroll'
import { Button } from '@/components/ui/Button'
import { BrandMark } from '@/components/ui/BrandMark'
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
  if (!hero.image) return <CompactHero hero={hero} crumbs={crumbs} siteUrl={siteUrl} />
  const image = hero.image
  return (
    <section
      id={HERO_ID}
      aria-labelledby="seiten-titel"
      className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden bg-shade text-on-dark [--focus-ring:var(--color-on-dark)]"
    >
      <div data-hero-media className="absolute inset-0 -z-10 overflow-hidden will-change-transform">
        <div className="size-full motion-safe:animate-kenburns">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="100vw"
            priority
            fetchPriority="high"
            placeholder={image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={image.blurDataURL}
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
                <dd className="pl-6 font-semibold text-pretty break-words hyphens-auto">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
      <HeroScroll targetId={HERO_ID} />
    </section>
  )
}

/** Photo-free hero for secondary pages: brand blue, logo mark, title, one sentence, key facts. */
function CompactHero({
  hero,
  crumbs,
  siteUrl,
}: {
  hero: PageHeroData
  crumbs: Crumb[]
  siteUrl: string
}) {
  return (
    <section
      id={HERO_ID}
      aria-labelledby="seiten-titel"
      className="relative isolate overflow-hidden bg-blue-900 text-on-dark [--focus-ring:var(--color-on-dark)]"
    >
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-red-500" />
      <BrandMark tone="dark" className="-right-16 -bottom-10 w-[34rem] opacity-[0.06]!" />
      <div className="container-wide flex flex-col gap-5 pt-32 pb-12 md:pt-36 md:pb-14">
        <Breadcrumbs items={crumbs} siteUrl={siteUrl} />
        <p className="inline-flex animate-fade-up items-center gap-3 text-small font-semibold tracking-widest text-red-300 uppercase">
          <span aria-hidden className="h-0.5 w-8 bg-current" />
          {hero.eyebrow}
        </p>
        <h1 id="seiten-titel" className="max-w-4xl animate-fade-up text-h1 text-balance">
          {hero.title}
        </h1>
        <p className="max-w-2xl animate-fade-up text-lead text-on-dark-muted [animation-delay:150ms]">
          {hero.intro}
        </p>
        {hero.primaryCta || hero.secondaryCta ? (
          <div className="flex animate-fade-up flex-wrap gap-3 [animation-delay:250ms]">
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
          <dl className="mt-3 flex animate-fade-up flex-wrap gap-3 [animation-delay:350ms]">
            {hero.facts.map((fact) => (
              <div
                key={fact.label}
                className="relative flex min-h-14 flex-col justify-center rounded-xl bg-on-dark/5 py-2 pr-4 pl-14 ring-1 ring-on-dark/15"
              >
                <dt className="text-caption font-semibold tracking-wide text-on-dark-muted uppercase">
                  <span className="absolute top-1/2 left-2.5 grid size-9 -translate-y-1/2 place-items-center rounded-lg bg-red-500 text-on-dark">
                    <Icon name={fact.icon} className="size-4" />
                  </span>
                  {fact.label}
                </dt>
                <dd className="text-small font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  )
}
