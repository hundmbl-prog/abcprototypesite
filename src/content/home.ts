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
    eyebrow: 'Gemeinnützig in Mainz und Bad Kreuznach',
    title: 'Bildung, die Menschen verbindet',
    text: 'Kurse, Prüfungen, Nachhilfe und Projekte in Mainz und Bad Kreuznach.',
    image: images.heroPoster,
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
        ctaLabel: 'Zu den Sprachkursen',
        icon: 'book',
        title: 'Sprach- & Integrationskurse',
        description: 'Deutsch lernen von A1 bis C1.',
        href: '/kurse/integrationskurse',
        image: images.abcUnterricht,
        tag: 'Kurse',
        badge: 'plaetze-frei',
      },
      {
        id: 'pruefungen',
        ctaLabel: 'Prüfungen und Termine',
        icon: 'award',
        title: 'Prüfungen',
        description: 'telc bis C1 Hochschule und Einbürgerungstest.',
        href: '/pruefungen',
        image: images.abcTelc,
        tag: 'Prüfung',
      },
      {
        id: 'nachhilfe',
        ctaLabel: 'Nachhilfe anfragen',
        icon: 'pen',
        title: 'Nachhilfe',
        description: 'Alle Fächer, alle Schulformen.',
        href: '/lernfoerderung',
        image: images.nachhilfe,
        tag: 'Lernförderung',
      },
      {
        id: 'soziale-projekte',
        ctaLabel: 'Projekte entdecken',
        icon: 'users',
        title: 'Soziale Projekte',
        description: 'Für Teilhabe und Zusammenhalt in Mainz.',
        href: '/projekte',
        image: images.sozialeProjekte,
        tag: 'Projekt',
      },
      {
        id: 'weiterbildungen',
        ctaLabel: 'Weiterbildung finden',
        icon: 'monitor',
        title: 'Weiterbildungen',
        description: 'Viona und politische Bildungsarbeit.',
        href: '/bildungsangebote',
        image: images.qmSchulung,
        tag: 'Weiterbildung',
      },
      {
        id: 'paedagogische-angebote',
        ctaLabel: 'Unterstützung für Familien',
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
    cta: { label: 'Mehr Informationen', href: '/ueber-uns' },
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
      { id: 'jahre', value: yearsActive, label: 'Jahre Erfahrung' },
      { id: 'standorte', value: 5, label: 'Standorte' },
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
      'Kinderbeaufsichtigung während der Integrationskurse',
    ],
  },

  partners: {
    eyebrow: 'Partner & Förderer',
    title: 'Gemeinsam mehr erreichen',
    items: partners,
  },
}
