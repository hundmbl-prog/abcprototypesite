import Image from 'next/image'
import { TextLink } from '@/components/ui/TextLink'
import type { PageHero as PageHeroData } from '@/content/types'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'

const HERO_ID = 'seitenkopf'

/**
 * Compact, light hero for content pages: breadcrumb, dark heading (visible immediately,
 * no fade), one short intro, one text link. Main pages show a bright photo beside the text.
 * Key facts are a plain text line – no chips, no badges.
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
  const facts = hero.facts?.slice(0, 3) ?? []
  return (
    <section id={HERO_ID} aria-labelledby="seiten-titel" className="bg-blue-100">
      <div
        className={
          hero.image
            ? 'container-wide grid grid-cols-1 items-center gap-10 pt-28 pb-12 md:pt-32 lg:grid-cols-12 lg:gap-14'
            : 'container-wide pt-28 pb-12 md:pt-32 md:pb-14'
        }
      >
        <div className="flex max-w-narrow flex-col gap-5 lg:col-span-7">
          <Breadcrumbs items={crumbs} siteUrl={siteUrl} />
          <h1 id="seiten-titel" className="text-h1 text-navy">
            {hero.title}
          </h1>
          <p className="max-w-prose text-lead text-ink-muted">{hero.intro}</p>
          {facts.length ? (
            <dl className="flex flex-wrap gap-x-8 gap-y-2 text-small">
              {facts.map((fact) => (
                <div key={fact.label} className="flex gap-1.5">
                  <dt className="text-ink-muted">{fact.label}:</dt>
                  <dd className="font-semibold text-navy">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {hero.primaryCta ? (
            <TextLink href={hero.primaryCta.href} className="text-lead">
              {hero.primaryCta.label}
            </TextLink>
          ) : null}
        </div>
        {hero.image ? (
          <div className="overflow-hidden rounded-lg lg:col-span-5">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              width={hero.image.width}
              height={hero.image.height}
              sizes="(min-width: 1024px) 38vw, 100vw"
              priority
              fetchPriority="high"
              placeholder={hero.image.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={hero.image.blurDataURL}
              className="aspect-4/3 w-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
