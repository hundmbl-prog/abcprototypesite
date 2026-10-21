import type { Metadata } from 'next'
import { OfferCards } from '@/components/cards/OfferCards'
import { AboutSection } from '@/components/home/AboutSection'
import { HomeHero } from '@/components/home/HomeHero'
import { NewsList } from '@/components/home/NewsList'
import { PartnerMarquee } from '@/components/home/PartnerMarquee'
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
      <HomeHero hero={home.hero} />

      {/* White: offers as a simple text grid (no photos) */}
      <section id="angebote" aria-labelledby="angebote-titel" className="bg-surface py-section">
        <div className="container-page">
          <h2 id="angebote-titel" className="mb-10 max-w-narrow text-h2 text-navy md:mb-14">
            {home.offers.title}
          </h2>
          <OfferCards cards={home.offers.cards} variant="text" label={home.offers.title} />
        </div>
      </section>

      {/* Light blue: about us */}
      <AboutSection content={home.about} />

      {/* White: news as a simple list */}
      <section id="news" aria-labelledby="news-titel" className="bg-surface py-section">
        <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-3">
            <h2 id="news-titel" className="text-h2 text-navy">
              {home.news.title}
            </h2>
            <TextLink href={home.news.cta.href}>{home.news.cta.label}</TextLink>
          </div>
          <div className="lg:col-span-9">
            <NewsList items={home.news.items} />
          </div>
        </div>
      </section>

      {/* White with a line: partners */}
      <PartnerMarquee content={home.partners} />
    </>
  )
}
