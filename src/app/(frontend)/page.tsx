import type { Metadata } from 'next'
import { OfferCards } from '@/components/cards/OfferCards'
import { AboutSection } from '@/components/home/AboutSection'
import { HomeHero } from '@/components/home/HomeHero'
import { NewsList } from '@/components/home/NewsList'
import { PartnerMarquee } from '@/components/home/PartnerMarquee'
import { WhySection } from '@/components/home/WhySection'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { HouseMark } from '@/components/ui/HouseMark'
import { TextLink } from '@/components/ui/TextLink'
import { getHomePage } from '@/content'

export const metadata: Metadata = {
  title: { absolute: 'Akademisches Bildungs-Center e.V. | Sprachkurse & Bildung in Mainz' },
  description:
    'Sprach- und Integrationskurse, telc Prüfungen, Nachhilfe und soziale Projekte in Mainz und Bad Kreuznach – gemeinnützig seit 1997.',
}

export default async function HomePage() {
  const home = await getHomePage()

  return (
    <>
      {/* Below the hero nothing sits in a box: paper and white alternate, type and photos carry. */}
      <HomeHero hero={home.hero} nextId="angebote" />

      {/* Paper: the offers as a typographic index beside one sticky photo frame */}
      <section
        id="angebote"
        aria-labelledby="angebote-titel"
        className="relative isolate overflow-x-clip bg-surface-2 py-section-lg"
      >
        {/* The logo house as a quiet line drawing in the empty corner; overflow-x-clip keeps the sticky frame working */}
        <HouseMark
          stroke={6}
          className="absolute -right-40 bottom-0 -z-10 hidden w-[32rem] text-line md:block"
        />
        <div className="container-page">
          <SectionHeader
            id="angebote-titel"
            eyebrow={home.offers.eyebrow}
            title={home.offers.title}
            size="h1"
            mark
            reveal={false}
            action={<TextLink href={home.offers.cta.href}>{home.offers.cta.label}</TextLink>}
          />
          <OfferCards cards={home.offers.cards} variant="index" label={home.offers.title} />
        </div>
      </section>

      {/* White: who we are, one full screen */}
      <AboutSection content={home.about} />

      {/* White, short: three headlines */}
      <section id="news" aria-labelledby="news-titel" className="bg-surface py-section-lg">
        <div className="container-page">
          <SectionHeader
            id="news-titel"
            eyebrow={home.news.eyebrow}
            title={home.news.title}
            size="h1"
            mark
            reveal={false}
            action={<TextLink href={home.news.cta.href}>{home.news.cta.label}</TextLink>}
          />
          <NewsList items={home.news.items} />
        </div>
      </section>

      {/* Paper: figures and reasons beside the learners, one full screen */}
      <WhySection content={home.why} />

      {/* White, short: partner logos */}
      <PartnerMarquee content={home.partners} />
    </>
  )
}
