import type { Metadata } from 'next'
import { OfferCards } from '@/components/cards/OfferCards'
import { AboutSection } from '@/components/home/AboutSection'
import { HomeHero } from '@/components/home/HomeHero'
import { NewsList } from '@/components/home/NewsList'
import { PartnerMarquee } from '@/components/home/PartnerMarquee'
import { WhySection } from '@/components/home/WhySection'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { BrandMark } from '@/components/ui/BrandMark'
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
      {/* Sections alternate soft logo-blue (blue-50) and white; cards always contrast with their section. */}
      <HomeHero hero={home.hero} nextId="angebote" />

      {/* Blue: offers – icon cards */}
      <section
        id="angebote"
        aria-labelledby="angebote-titel"
        className="relative isolate overflow-hidden bg-blue-50 py-section"
      >
        <BrandMark className="-top-6 -right-12 w-[24rem]" />
        <div className="container-page">
          <SectionHeader
            id="angebote-titel"
            eyebrow={home.offers.eyebrow}
            title={home.offers.title}
            intro={home.offers.intro}
            action={<TextLink href={home.offers.cta.href}>{home.offers.cta.label}</TextLink>}
          />
          <OfferCards cards={home.offers.cards} variant="icon" label={home.offers.title} />
        </div>
      </section>

      {/* White: about us */}
      <AboutSection content={home.about} />

      {/* Blue wash: compact news strip */}
      <section id="news" aria-labelledby="news-titel" className="bg-blue-50 py-section-sm">
        <div className="container-page">
          <SectionHeader
            id="news-titel"
            eyebrow={home.news.eyebrow}
            title={home.news.title}
            className="mb-8! md:mb-10!"
            action={<TextLink href={home.news.cta.href}>{home.news.cta.label}</TextLink>}
          />
          <NewsList items={home.news.items} />
        </div>
      </section>

      {/* White: compact stats and reasons */}
      <WhySection content={home.why} />

      {/* Blue wash: partner logos */}
      <PartnerMarquee content={home.partners} />
    </>
  )
}
