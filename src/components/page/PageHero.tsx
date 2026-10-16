import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { BrandMark } from '@/components/ui/BrandMark'
import { Icon } from '@/components/ui/Icon'
import type { PageHero as PageHeroData } from '@/content/types'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'

const HERO_ID = 'seitenkopf'

/** Facts as icon chips – shared by both hero variants. */
function HeroFacts({ facts }: { facts: NonNullable<PageHeroData['facts']> }) {
  return (
    <dl className="mt-3 flex animate-fade-up flex-wrap gap-3 [animation-delay:350ms]">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="relative flex min-h-14 flex-col justify-center rounded-xl bg-on-dark/5 py-2 pr-4 pl-14 ring-1 ring-on-dark/15 transition-[background-color,transform] duration-(--dur-base) ease-out-expo hov:-translate-y-0.5 hov:bg-on-dark/10"
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
  )
}

function HeroText({
  hero,
  crumbs,
  siteUrl,
}: {
  hero: PageHeroData
  crumbs: Crumb[]
  siteUrl: string
}) {
  return (
    <>
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
    </>
  )
}

/**
 * Hero for content pages, always on brand blue with the logo mark and a light that follows the
 * cursor. Main pages (with a photo) show it small beside the text in a tilting frame;
 * all other pages are text-only with the key facts as chips.
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
  if (!hero.image) return <CompactHero hero={hero} crumbs={crumbs} siteUrl={siteUrl} />
  const image = hero.image
  const highlight = hero.facts?.[0]
  return (
    <section
      id={HERO_ID}
      aria-labelledby="seiten-titel"
      data-glow="dark"
      className="relative isolate overflow-hidden bg-blue-900 text-on-dark [--focus-ring:var(--color-on-dark)]"
    >
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-red-500" />
      <BrandMark tone="dark" className="-bottom-10 -left-16 w-[30rem] opacity-[0.05]!" />
      <div className="container-wide grid grid-cols-1 items-center gap-12 pt-32 pb-14 md:pt-36 lg:grid-cols-12 lg:gap-16 lg:pb-16">
        <div className="flex flex-col gap-5 lg:col-span-7">
          <HeroText hero={hero} crumbs={crumbs} siteUrl={siteUrl} />
          {/* The first fact is shown on the photo badge. */}
          {hero.facts && hero.facts.length > 1 ? <HeroFacts facts={hero.facts.slice(1)} /> : null}
        </div>
        <div className="max-w-md relative mx-auto w-full animate-fade-up [animation-delay:200ms] lg:col-span-5 lg:max-w-none">
          <span
            aria-hidden
            className="absolute -top-3 -right-3 hidden size-full rounded-2xl border-2 border-red-500/70 sm:block md:-top-4 md:-right-4"
          />
          <figure data-tilt className="relative">
            <div
              data-hero-media
              className="shadow-2xl overflow-hidden rounded-2xl ring-1 ring-on-dark/15"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 40vw, 90vw"
                priority
                fetchPriority="high"
                placeholder={image.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={image.blurDataURL}
                className="aspect-4/3 w-full object-cover motion-safe:animate-kenburns"
              />
            </div>
            {highlight ? (
              <figcaption className="absolute -bottom-6 left-3 flex items-center gap-3 rounded-xl bg-surface py-3 pr-5 pl-3 text-ink shadow-lg md:-left-8">
                <span className="grid size-10 place-items-center rounded-lg bg-blue-700 text-on-dark">
                  <Icon name={highlight.icon} className="size-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-caption font-semibold tracking-wide text-red-600 uppercase">
                    {highlight.label}
                  </span>
                  <span className="text-small font-semibold text-blue-900">{highlight.value}</span>
                </span>
              </figcaption>
            ) : null}
          </figure>
        </div>
      </div>
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
      data-glow="dark"
      className="relative isolate overflow-hidden bg-blue-900 text-on-dark [--focus-ring:var(--color-on-dark)]"
    >
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-red-500" />
      <BrandMark tone="dark" className="-right-16 -bottom-10 w-[34rem] opacity-[0.06]!" />
      <div className="container-wide flex flex-col gap-5 pt-32 pb-12 md:pt-36 md:pb-14">
        <HeroText hero={hero} crumbs={crumbs} siteUrl={siteUrl} />
        {hero.facts?.length ? <HeroFacts facts={hero.facts} /> : null}
      </div>
    </section>
  )
}
