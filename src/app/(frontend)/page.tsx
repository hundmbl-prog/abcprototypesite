import type { Metadata } from 'next'
import { HomeHero } from '@/components/home/HomeHero'
import { LocationCards } from '@/components/home/LocationCards'
import { NewsSlider } from '@/components/home/NewsSlider'
import { OffersFilter } from '@/components/home/OffersFilter'
import { PartnerMarquee } from '@/components/home/PartnerMarquee'
import { PeopleSection } from '@/components/home/PeopleSection'
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
      {/* 1 · Photo hero with glass quick access */}
      <HomeHero hero={home.hero} nextId="angebote" />

      {/* 2 · Soft blue: offers with animated filter, cards in light tints */}
      <section
        id="angebote"
        aria-labelledby="angebote-titel"
        className="relative isolate overflow-hidden bg-blue-50 py-section"
      >
        <div className="container-page">
          <SectionHeader
            id="angebote-titel"
            eyebrow={home.offers.eyebrow}
            title={home.offers.title}
            intro={home.offers.intro}
            action={
              <Button href={home.offers.cta.href} variant="pill-light">
                {home.offers.cta.label}
              </Button>
            }
          />
          <OffersFilter cards={home.offers.cards} filters={home.offers.filters} />
        </div>
      </section>

      {/* 3 · Warm red world: news slideshow */}
      <section
        id="news"
        aria-labelledby="news-titel"
        className="relative isolate overflow-hidden bg-surface py-section"
      >
        <div className="container-page">
          <SectionHeader
            id="news-titel"
            eyebrow={home.news.eyebrow}
            title={home.news.title}
            action={
              <Button href={home.news.cta.href} variant="pill-light">
                {home.news.cta.label}
              </Button>
            }
          />
          <NewsSlider items={home.news.items} />
        </div>
      </section>

      {/* 4 · White: stats and reasons */}
      <WhySection content={home.why} image={images.jugendErfolg} />

      {/* 5 · Sky blue world: projects, text beside the photo */}
      <section
        id="projekte"
        aria-labelledby="projekte-titel"
        className="relative isolate overflow-hidden bg-surface py-section"
      >
        <div className="container-page">
          <SectionHeader
            id="projekte-titel"
            eyebrow={home.projects.eyebrow}
            title={home.projects.title}
            intro={home.projects.intro}
            action={
              <Button href={home.projects.cta.href} variant="pill-light">
                {home.projects.cta.label}
              </Button>
            }
          />
        </div>
        <ProjectsShowcase items={home.projects.items} />
      </section>

      {/* 6 · Blush world: contact people */}
      <PeopleSection content={home.people} />

      {/* 7 · Light: partner cards */}
      <PartnerMarquee content={home.partners} />

      {/* 8 · Compact locations on a soft logo-blue tint */}
      <section
        id="standorte"
        aria-labelledby="standorte-titel"
        className="relative isolate overflow-hidden bg-blue-50 py-section-sm"
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
    </>
  )
}
