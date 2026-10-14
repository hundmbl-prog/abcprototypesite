import type { Metadata } from 'next'
import { BentoGrid } from '@/components/cards/BentoGrid'
import { HomeHero } from '@/components/home/HomeHero'
import { LocationsTabs } from '@/components/home/LocationsTabs'
import { NewsSlider } from '@/components/home/NewsSlider'
import { PartnerMarquee } from '@/components/home/PartnerMarquee'
import { PeopleSection } from '@/components/home/PeopleSection'
import { ProjectsShowcase } from '@/components/home/ProjectsShowcase'
import { WhySection } from '@/components/home/WhySection'
import { Section } from '@/components/sections/Section'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Button } from '@/components/ui/Button'
import { getHomePage, getSiteSettings } from '@/content'

export const metadata: Metadata = {
  title: { absolute: 'Akademisches Bildungs-Center e.V. | Sprachkurse & Bildung in Mainz' },
  description:
    'Sprach- und Integrationskurse, telc Prüfungen, Nachhilfe und soziale Projekte in Mainz und Bad Kreuznach – gemeinnützig seit 1997.',
}

export default async function HomePage() {
  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()])

  return (
    <>
      <HomeHero hero={home.hero} nextId="angebote" />

      <Section id="angebote" labelledBy="angebote-titel">
        <SectionHeader
          id="angebote-titel"
          eyebrow={home.offers.eyebrow}
          title={home.offers.title}
          intro={home.offers.intro}
          action={
            <Button href={home.offers.cta.href} variant="outline" icon="arrow-right">
              {home.offers.cta.label}
            </Button>
          }
        />
        <BentoGrid cards={home.offers.cards} />
      </Section>

      <Section tone="light-2" id="news" labelledBy="news-titel">
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
      </Section>

      <section id="projekte" aria-labelledby="projekte-titel" className="tone-navy py-section">
        <div className="container-page">
          <SectionHeader
            id="projekte-titel"
            tone="dark"
            eyebrow={home.projects.eyebrow}
            title={home.projects.title}
            intro={home.projects.intro}
            action={
              <Button href={home.projects.cta.href} variant="ghost" icon="arrow-right">
                {home.projects.cta.label}
              </Button>
            }
          />
        </div>
        <ProjectsShowcase items={home.projects.items} />
      </section>

      <WhySection content={home.why} />

      <PeopleSection content={home.people} />

      <PartnerMarquee content={home.partners} />

      <Section id="standorte" labelledBy="standorte-titel">
        <SectionHeader
          id="standorte-titel"
          eyebrow={home.locations.eyebrow}
          title={home.locations.title}
          intro={home.locations.intro}
        />
        <LocationsTabs locations={settings.locations} />
      </Section>
    </>
  )
}
