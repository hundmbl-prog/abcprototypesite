/**
 * Home page content (Payload "pages" document with blocks in Step 5).
 * News, projects and facts are taken from the current abc-mainz.de.
 * Entries marked `placeholder: true` are invented and MUST be replaced before launch.
 */
import { images } from './images'
import { partners } from './partners'
import { siteSettings } from './site'
import type { HomePage } from './types'

const yearsActive = new Date().getFullYear() - siteSettings.foundingYear

export const homePage: HomePage = {
  hero: {
    badge: 'Willkommen beim ABC e.V.',
    highlights: [
      { value: 'seit 1997', label: 'gemeinnützig in Mainz' },
      { value: 'telc', label: 'Prüfungszentrum' },
      { value: '5', label: 'Standorte' },
    ],
    quickLinks: [
      { label: 'Sprachkurse', href: '/sprachkurse', description: 'A1 bis C1, auch online' },
      {
        label: 'Integrationskurse',
        href: '/integrationskurse',
        description: 'Mit Kinderbeaufsichtigung',
      },
      { label: 'telc Prüfungen', href: '/pruefungen/telc', description: 'Termine und Anmeldung' },
      {
        label: 'Nachhilfe',
        href: '/lernfoerderung/nachhilfe',
        description: 'Alle Fächer, alle Schulformen',
      },
    ],
    eyebrow: 'Gemeinnütziger Bildungsträger in Mainz und Bad Kreuznach',
    title: 'Bildung, die Menschen verbindet',
    text: 'Sprach- und Integrationskurse, Prüfungen, Nachhilfe und soziale Projekte – seit 1997 begleiten wir Menschen auf ihrem Weg in Sprache, Ausbildung und Beruf.',
    image: images.hero,
    primaryCta: { label: 'Kurs finden', href: '/sprachkurse' },
    secondaryCta: { label: 'Beratung anfragen', href: '/ueber-uns/kontakt' },
  },

  offers: {
    eyebrow: 'Unsere Angebote',
    title: 'Für jeden Schritt das passende Angebot',
    intro:
      'Vom ersten Deutschkurs bis zur Weiterbildung – wir beraten Sie gerne, welches Angebot zu Ihnen passt.',
    cta: { label: 'Alle Angebote', href: '/sprachkurse' },
    cards: [
      {
        id: 'sprach-integrationskurse',
        title: 'Sprach- & Integrationskurse',
        description:
          'Deutsch lernen von A1 bis C1, Integrations-, Jugendintegrations- und Alphabetisierungskurse – mit Orientierungskurs und Kinderbeaufsichtigung.',
        href: '/integrationskurse',
        image: images.sprachkurse,
        tag: 'Kurse',
        badge: 'plaetze-frei',
        facts: { level: 'A1–C1', location: 'Mainz & Bad Kreuznach' },
      },
      {
        id: 'pruefungen',
        title: 'Prüfungen',
        description: 'telc Sprachprüfungen bis C1 Hochschule und der Einbürgerungstest.',
        href: '/pruefungen',
        image: images.pruefungen,
        tag: 'Prüfung',
        facts: { level: 'A1–C1' },
      },
      {
        id: 'nachhilfe',
        title: 'Nachhilfe',
        description:
          'Alle Fächer, alle Schulformen – mit erfahrenen Lehrkräften und flexiblen Zeiten.',
        href: '/lernfoerderung/nachhilfe',
        image: images.nachhilfe,
        tag: 'Lernförderung',
        facts: { format: 'Vor Ort' },
      },
      {
        id: 'soziale-projekte',
        title: 'Soziale Projekte',
        description:
          'Straßenfotografie, Naturerlebnis, Kreativwettbewerb und mehr – für Zusammenhalt in Mainz.',
        href: '/projekte',
        image: images.sozialeProjekte,
        tag: 'Projekt',
      },
      {
        id: 'weiterbildungen',
        title: 'Weiterbildungen',
        description:
          'Qualifizierungen wie der Kompakt-Kurs für Kindertagespflegepersonen und Schulungen zum Qualitätsmanagement.',
        href: '/bildungsangebote',
        image: images.weiterbildung,
        tag: 'Weiterbildung',
      },
      {
        id: 'paedagogische-angebote',
        title: 'Pädagogische Angebote',
        description:
          'Sozialpädagogische Familienhilfe und Erziehungsbeistand – Begleitung im Familienalltag.',
        href: '/paedagogische-angebote',
        image: images.paedagogik,
        tag: 'Familie',
      },
    ],
  },

  about: {
    eyebrow: 'Über uns',
    title: 'Aus der Community – für die Community',
    paragraphs: [
      'Im Jahr 1997 gründeten migrantische Eltern, Studierende und Hochschulabsolventen das Akademische Bildungs-Center als gemeinnützigen Verein.',
      'Sie erkannten den großen Bedarf an Unterstützung für die Bildung in den migrantischen Communitys – und schufen passende Angebote wie Sprachkurse, Nachhilfe und Integrationskurse.',
    ],
    image: images.team,
    badge: { value: '1997', label: 'gegründet in Mainz' },
    milestones: [
      { id: 'gruendung', year: '1997', text: 'Gründung als gemeinnütziger Verein' },
      { id: 'telc', year: '2021', text: 'Offizielles telc Hochschulkompetenzzentrum' },
      { id: 'heute', year: 'Heute', text: '5 Standorte in Mainz und Bad Kreuznach' },
    ],
    cta: { label: 'Mehr über uns', href: '/ueber-uns' },
  },

  news: {
    eyebrow: 'News',
    title: 'Aktuelles aus dem ABC',
    cta: { label: 'Alle News', href: '/news' },
    items: [
      {
        id: 'nachhilfe-bad-kreuznach',
        slug: 'jetzt-kostenlose-nachhilfe-in-bad-kreuznach',
        title: 'Kostenlose Nachhilfe in Bad Kreuznach',
        excerpt:
          'Jeden Mittwoch und Samstag von 17 bis 20 Uhr gibt es bei uns Hilfe bei den Hausaufgaben – ermöglicht durch das Programm „Aufholen nach Corona“.',
        date: '2022-05-24',
        category: 'Lernförderung',
        image: images.nachhilfeBadKreuznach,
      },
      {
        id: 'kindertagespflege',
        slug: 'qualifizierung-von-kindertagespflegepersonen',
        title: 'Qualifizierung von Kindertagespflegepersonen im Kompakt-Kurs',
        excerpt:
          'Im Auftrag des Amtes für Jugend und Familie der Stadt Mainz qualifizieren wir ab sofort Kindertagespflegepersonen in einem Kompakt-Kurs.',
        date: '2022-04-22',
        category: 'Weiterbildung',
        image: images.kindertagespflege,
      },
      {
        id: 'telc-hochschulkompetenzzentrum',
        slug: 'wir-sind-offizielles-telc-hochschulkompetenzzentrum',
        title: 'Wir sind offizielles telc Hochschulkompetenzzentrum',
        excerpt:
          'Seit 2021 bieten wir neben den allgemeinen Deutschkursen auch den studienvorbereitenden Kurs „telc C1 Deutsch Hochschule“ inklusive Prüfung an.',
        date: '2021-11-26',
        category: 'Prüfungen',
        image: images.telc,
      },
      {
        id: 'jugendintegrationskurs-erfolg',
        slug: 'jugendintegrationskurs-mit-100-prozent-erfolg',
        title: 'Jugendintegrationskurs mit 100 % Erfolg abgeschlossen',
        excerpt:
          'Alle Teilnehmenden unseres B1-Jugendintegrationskurses haben die Prüfung bestanden. Herzlichen Glückwunsch!',
        date: '2021-11-19',
        category: 'Integrationskurse',
        image: images.jugendErfolg,
      },
      {
        id: 'frauenintegrationskurs',
        slug: 'frauenintegrationskurs',
        title: 'Frauenintegrationskurs: 92 % bestanden',
        excerpt:
          '92 % der Teilnehmerinnen haben den Integrationskurs mit großem Erfolg abgeschlossen.',
        date: '2021-06-16',
        category: 'Integrationskurse',
        image: images.frauenintegrationskurs,
      },
      {
        id: 'qm-schulung',
        slug: 'schulung-zum-qualitaets-manager',
        title: 'Schulung zum Qualitäts-Manager erfolgreich abgeschlossen',
        excerpt:
          'Alle Teilnehmenden haben das Seminar zum Qualitäts-Manager (QM) mit Erfolg absolviert.',
        date: '2021-06-16',
        category: 'Weiterbildung',
        image: images.qmSchulung,
      },
    ],
  },

  projects: {
    eyebrow: 'Projekte',
    title: 'Gemeinsam für ein starkes Miteinander',
    intro:
      'Mit unseren Projekten fördern wir Teilhabe, Kreativität und Zusammenhalt – oft gemeinsam mit starken Partnern.',
    cta: { label: 'Alle Projekte', href: '/projekte' },
    items: [
      {
        id: 'strassenfotografie',
        slug: 'strassenfotografie',
        title: 'Straßenfotografie Mainz 2026',
        description:
          'Mit der Kamera die Mainzer Neu- und Altstadt entdecken: Straßenkunst, Rheinufer, Wochenmarkt und Denkmäler – und die eigene Perspektive auf die Stadt zeigen.',
        partners: ['BGZ'],
        image: images.projektStrassenfotografie,
      },
      {
        id: 'natur-erleben',
        slug: 'natur-erleben',
        title: 'Natur erleben – Umwelt erfahren',
        description:
          'Ein inklusives Naturprojekt am Bonifaziusplatz für alle Kinder und Jugendlichen von 8 bis 16 Jahren – mit und ohne Behinderung.',
        partners: ['Aktion Mensch'],
        image: images.projektNatur,
      },
      {
        id: 'startklar',
        slug: 'startklar',
        title: 'STARTklar – Stabil in Arbeit',
        description:
          'Individuelle, kostenlose Begleitung für Menschen mit Fluchterfahrung auf dem Weg in Arbeit oder Ausbildung – mit Sprachkursen, Bewerbungshilfe und Kontakten zu Betrieben.',
        partners: [],
        image: images.projektStartklar,
      },
      {
        id: 'wir-sind-vielfalt',
        slug: 'wir-sind-vielfalt',
        title: 'Wir sind Vielfalt 2026',
        description:
          'Unser jährlicher Kreativwettbewerb für Kinder und Jugendliche. Das Motto 2026: „Mut hat viele Gesichter“.',
        partners: [],
        image: images.projektVielfalt,
      },
      {
        id: 'bruecken-ags',
        slug: 'bruecken-ags',
        title: 'Brücken AGs',
        description:
          'Wir bauen Brücken in die Mainzer Vereinslandschaft – für mehr gesellschaftliche Teilhabe unserer Kursteilnehmenden.',
        partners: ['Bundesamt für Migration und Flüchtlinge'],
        image: images.projektBruecken,
      },
      {
        id: 'mainzer-jugendplattform',
        slug: 'mainzer-jugendplattform',
        title: 'Mainzer Jugendplattform',
        description:
          'Ein Beitrag zum gesellschaftlichen Zusammenhalt: Jugendliche sollen sich nach ihren Fähigkeiten und Vorstellungen entfalten können.',
        partners: [],
        image: images.projektJugendplattform,
      },
    ],
  },

  why: {
    eyebrow: 'Warum ABC',
    title: 'Ein Ort zum Ankommen',
    intro:
      'Bei uns kommen Menschen aus unterschiedlichen Kulturen zusammen. Wir haben langjährige Erfahrung in der Integrationsarbeit und wissen, worauf es ankommt.',
    stats: [
      { id: 'jahre', value: yearsActive, label: 'Jahre Erfahrung seit 1997' },
      { id: 'standorte', value: 5, label: 'Standorte in Mainz und Bad Kreuznach' },
      {
        id: 'teilnehmende',
        value: 1200,
        suffix: '+',
        label: 'Teilnehmende pro Jahr',
        placeholder: true,
      },
      {
        id: 'kurse',
        value: 60,
        suffix: '+',
        label: 'Kurse und Prüfungen pro Jahr',
        placeholder: true,
      },
    ],
    caption: 'Gemeinsam lernen – in Mainz und Bad Kreuznach.',
    points: [
      'Kleine Gruppen mit erfahrenen Lehrkräften',
      'Offizielles telc Prüfungs- und Hochschulkompetenzzentrum',
      'Kinderbeaufsichtigung während der Integrationskurse',
      'Gemeinnützig – gegründet aus der Community für die Community',
    ],
  },

  partners: {
    eyebrow: 'Partner & Förderer',
    title: 'Gemeinsam mehr erreichen',
    items: partners,
  },

  locations: {
    eyebrow: 'Standorte',
    title: 'So finden Sie uns',
    intro:
      'Unser Hauptgebäude liegt mitten in der Mainzer Neustadt – dazu kommen drei Zweigstellen in Mainz und unser Standort in Bad Kreuznach.',
  },
}
