import type { Metadata } from 'next'
import { OfferCards } from '@/components/cards/OfferCards'
import { AboutSection } from '@/components/home/AboutSection'
import { HomeHero } from '@/components/home/HomeHero'
import { LocationCards } from '@/components/home/LocationCards'
import { NewsSlider } from '@/components/home/NewsSlider'
import { PartnerMarquee } from '@/components/home/PartnerMarquee'
import { ProjectsShowcase } from '@/components/home/ProjectsShowcase'
import { WhySection } from '@/components/home/WhySection'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Button } from '@/components/ui/Button'
import { getHomePage, getSiteSettings } from '@/content'
import { images } from '@/content/images'

export const metadata: Metadata = {
  title: { absolute: 'Akademisches Bildungs-Center e.V. | Sprachkurse & Bildung in Mainz' },
  description:
    'Sprach- und Integrationskurse, telc Prüfungen, Nachhilfe und soziale Projekte in Mainz und Bad Kreuznach – gemeinnützig seit 1997.',
}

export default async function HomePage() {
  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()])

  return (
    <>
      {/* Sections alternate soft logo-blue (blue-50) and white; cards always contrast with their section. */}
      <HomeHero hero={home.hero} nextId="angebote" />

      {/* Blue: offers – photo with overlapping white info box */}
      <section id="angebote" aria-labelledby="angebote-titel" className="bg-blue-50 py-section">
        <div className="container-page">
          <SectionHeader
            id="angebote-titel"
            eyebrow={home.offers.eyebrow}
            title={home.offers.title}
            intro={home.offers.intro}
            action={
              <Button href={home.offers.cta.href} variant="pill-red">
                {home.offers.cta.label}
              </Button>
            }
          />
          <OfferCards
            cards={home.offers.cards}
            variant="classic"
            label={home.offers.title}
            simple
            className="gap-y-10"
          />
        </div>
      </section>

      {/* White: about us */}
      <AboutSection content={home.about} />

      {/* Blue: news slideshow */}
      <section id="news" aria-labelledby="news-titel" className="bg-blue-50 py-section">
        <div className="container-page">
          <SectionHeader
            id="news-titel"
            eyebrow={home.news.eyebrow}
            title={home.news.title}
            action={
              <Button href={home.news.cta.href} variant="pill-red">
                {home.news.cta.label}
              </Button>
            }
          />
          <NewsSlider items={home.news.items} />
        </div>
      </section>

      {/* White: stats and reasons */}
      <WhySection content={home.why} image={images.jugendErfolg} />

      {/* Blue: projects slideshow */}
      <section id="projekte" aria-labelledby="projekte-titel" className="bg-blue-50 py-section">
        <div className="container-page">
          <SectionHeader
            id="projekte-titel"
            eyebrow={home.projects.eyebrow}
            title={home.projects.title}
            intro={home.projects.intro}
            action={
              <Button href={home.projects.cta.href} variant="pill-red">
                {home.projects.cta.label}
              </Button>
            }
          />
        </div>
        <ProjectsShowcase items={home.projects.items} />
      </section>

      {/* White: compact locations */}
      <section
        id="standorte"
        aria-labelledby="standorte-titel"
        className="bg-surface py-section-sm"
      >
        <div className="container-page">
          <SectionHeader
            id="standorte-titel"
            eyebrow={home.locations.eyebrow}
            title={home.locations.title}
            className="mb-8! md:mb-10!"
          />
          <LocationCards locations={settings.locations} orgName={settings.name} />
        </div>
      </section>

      {/* Blue: partner logos */}
      <PartnerMarquee content={home.partners} />
    </>
  )
}
