import type { Metadata } from 'next'
import { OfferCards } from '@/components/cards/OfferCards'
import { HomeHero } from '@/components/home/HomeHero'
import { LocationsTabs } from '@/components/home/LocationsTabs'
import { NewsSlider } from '@/components/home/NewsSlider'
import { PartnerMarquee } from '@/components/home/PartnerMarquee'
import { PeopleSection } from '@/components/home/PeopleSection'
import { ProjectsShowcase } from '@/components/home/ProjectsShowcase'
import { WhySection } from '@/components/home/WhySection'
import { Section } from '@/components/sections/Section'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Aurora } from '@/components/ui/Aurora'
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

      {/* 2 · Light grey: six identical photo cards */}
      <Section tone="light-2" id="angebote" labelledBy="angebote-titel">
        <SectionHeader
          id="angebote-titel"
          eyebrow={home.offers.eyebrow}
          title={home.offers.title}
          intro={home.offers.intro}
          action={
            <Button href={home.offers.cta.href} variant="pill">
              {home.offers.cta.label}
            </Button>
          }
        />
        <OfferCards cards={home.offers.cards} variant="classic" label={home.offers.title} />
      </Section>

      {/* 3 · White with soft colour fields: floating news slideshow */}
      <section
        id="news"
        aria-labelledby="news-titel"
        className="relative isolate overflow-hidden py-section"
      >
        <Aurora preset="news" />
        <div className="container-page">
          <SectionHeader
            id="news-titel"
            eyebrow={home.news.eyebrow}
            title={home.news.title}
            action={
              <Button href={home.news.cta.href} variant="pill">
                {home.news.cta.label}
              </Button>
            }
          />
          <NewsSlider items={home.news.items} />
        </div>
      </section>

      {/* 4 · Photo band with glass stats */}
      <WhySection content={home.why} image={images.jugendErfolg} />

      {/* 5 · Light gradient: cinematic projects with glass panels */}
      <section
        id="projekte"
        aria-labelledby="projekte-titel"
        className="relative isolate overflow-hidden bg-linear-to-b from-surface-3 to-surface py-section"
      >
        <Aurora preset="projects" />
        <div className="container-page">
          <SectionHeader
            id="projekte-titel"
            eyebrow={home.projects.eyebrow}
            title={home.projects.title}
            intro={home.projects.intro}
            action={
              <Button href={home.projects.cta.href} variant="pill">
                {home.projects.cta.label}
              </Button>
            }
          />
        </div>
        <ProjectsShowcase items={home.projects.items} />
      </section>

      {/* 6 · White: contact people */}
      <PeopleSection content={home.people} />

      {/* 7 · Light grey: partner logo cards */}
      <PartnerMarquee content={home.partners} />

      {/* 8 · White with colour field: locations */}
      <section
        id="standorte"
        aria-labelledby="standorte-titel"
        className="relative isolate overflow-hidden py-section"
      >
        <Aurora preset="locations" />
        <div className="container-page">
          <SectionHeader
            id="standorte-titel"
            eyebrow={home.locations.eyebrow}
            title={home.locations.title}
            intro={home.locations.intro}
          />
          <LocationsTabs locations={settings.locations} />
        </div>
      </section>
    </>
  )
}
