/**
 * Home page content (Payload "pages" document with blocks in Step 5).
 * News and facts are taken from the current abc-mainz.de.
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
    eyebrow: 'Gemeinnützig in Mainz und Bad Kreuznach',
    title: 'Bildung, die Menschen verbindet',
    text: 'Kurse, Prüfungen, Nachhilfe und Projekte in Mainz und Bad Kreuznach – seit 1997.',
    image: images.mainzSkyline,
    primaryCta: { label: 'Kurs finden', href: '/kurse' },
    secondaryCta: { label: 'Beratung anfragen', href: '/ueber-uns/kontakt' },
  },

  offers: {
    eyebrow: 'Unsere Angebote',
    title: 'Für jeden Schritt das passende Angebot',
    cta: { label: 'Alle Angebote', href: '/kurse' },
    cards: [
      {
        id: 'sprach-integrationskurse',
        icon: 'book',
        title: 'Sprach- & Integrationskurse',
        description: 'Deutsch von A1 bis C1 – mit Kinderbeaufsichtigung.',
        href: '/kurse/integrationskurse',
        image: images.abcUnterricht,
        tag: 'Kurse',
        badge: 'plaetze-frei',
        facts: { level: 'A1–C1', location: 'Mainz & Bad Kreuznach' },
      },
      {
        id: 'pruefungen',
        icon: 'award',
        title: 'Prüfungen',
        description: 'telc bis C1 Hochschule und Einbürgerungstest.',
        href: '/pruefungen',
        image: images.abcTelc,
        tag: 'Prüfung',
        facts: { level: 'A1–C1' },
      },
      {
        id: 'nachhilfe',
        icon: 'pen',
        title: 'Nachhilfe',
        description: 'Alle Fächer, alle Schulformen.',
        href: '/lernfoerderung',
        image: images.nachhilfe,
        tag: 'Lernförderung',
        facts: { format: 'Vor Ort' },
      },
      {
        id: 'soziale-projekte',
        icon: 'users',
        title: 'Soziale Projekte',
        description: 'Für Teilhabe und Zusammenhalt in Mainz.',
        href: '/projekte',
        image: images.sozialeProjekte,
        tag: 'Projekt',
      },
      {
        id: 'weiterbildungen',
        icon: 'monitor',
        title: 'Weiterbildungen',
        description: 'Viona und politische Bildungsarbeit.',
        href: '/bildungsangebote',
        image: images.qmSchulung,
        tag: 'Weiterbildung',
      },
      {
        id: 'paedagogische-angebote',
        icon: 'child',
        title: 'Pädagogische Angebote',
        description: 'Familienhilfe und Erziehungsbeistand.',
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
      '1997 von migrantischen Eltern, Studierenden und Hochschulabsolventen als gemeinnütziger Verein gegründet – für Bildung in den migrantischen Communitys.',
    ],
    image: images.team,
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
          'Mit dem Programm „Aufholen nach Corona“ boten wir in Bad Kreuznach kostenlose Hausaufgabenhilfe an.',
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

  why: {
    eyebrow: 'Warum ABC',
    title: 'Ein Ort zum Ankommen',
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
    points: [
      'Kleine Gruppen mit erfahrenen Lehrkräften',
      'telc Prüfungs- und Hochschulkompetenzzentrum',
      'Kinderbeaufsichtigung während der Integrationskurse',
      'Gemeinnützig seit 1997',
    ],
  },

  partners: {
    eyebrow: 'Partner & Förderer',
    title: 'Gemeinsam mehr erreichen',
    items: partners,
  },
}
