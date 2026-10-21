/**
 * Home page content (Payload "pages" document with blocks in Step 5).
 * News and facts are taken from the current abc-mainz.de.
 * The figures "über 1.200 Menschen" and "mehr als 60 Kurse" are not confirmed yet – check before launch.
 */
import { images } from './images'
import { partners } from './partners'
import type { HomePage } from './types'

export const homePage: HomePage = {
  hero: {
    eyebrow: '',
    title: 'Bildung, die Perspektiven schafft',
    text: 'Sprachkurse, Prüfungen, Nachhilfe und soziale Projekte in Mainz und Bad Kreuznach.',
    image: images.heroPoster,
    primaryCta: { label: 'Kurs finden', href: '/kurse' },
    secondaryCta: { label: 'Beratung anfragen', href: '/ueber-uns/kontakt' },
  },

  offers: {
    eyebrow: '',
    title: 'Für jeden Schritt das passende Angebot',
    cta: { label: 'Alle Angebote', href: '/kurse' },
    cards: [
      {
        id: 'sprach-integrationskurse',
        ctaLabel: 'Zu den Sprachkursen',
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
        ctaLabel: 'Prüfungen und Termine',
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
        ctaLabel: 'Nachhilfe anfragen',
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
    eyebrow: '',
    title: 'Wer wir sind',
    paragraphs: [
      'Seit 1997 bringt unser gemeinnütziger Verein Bildung zu den Menschen in Mainz und Bad Kreuznach – gegründet von migrantischen Eltern, Studierenden und Hochschulabsolventen.',
      'Heute lernen jedes Jahr über 1.200 Menschen in mehr als 60 Kursen und Prüfungen an unseren fünf Standorten.',
    ],
    image: images.team,
    cta: { label: 'Mehr über den Verein', href: '/ueber-uns' },
  },

  news: {
    eyebrow: '',
    title: 'Aktuelles',
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

  partners: {
    eyebrow: '',
    title: 'Unsere Partner und Förderer',
    items: partners,
  },
}
