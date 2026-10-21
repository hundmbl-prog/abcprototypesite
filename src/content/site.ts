/**
 * Global site content (Payload globals "site-settings", "header", "footer" in Step 5).
 * Addresses, phone numbers and opening hours are taken from the current abc-mainz.de.
 */
import { images } from './images'
import type { NavLink, NavSection, SiteSettings } from './types'

export const siteSettings: SiteSettings = {
  name: 'Akademisches Bildungs-Center e.V.',
  shortName: 'ABC Mainz',
  claim: 'Bildung, die verbindet',
  foundingYear: 1997,
  footerAbout:
    'Gemeinnütziger Bildungsträger in Mainz und Bad Kreuznach. Wir begleiten Menschen auf ihrem Weg in Sprache, Ausbildung und Beruf.',
  locations: [
    {
      id: 'mainz',
      name: 'Mainz',
      street: 'Rhabanusstr. 5',
      postalCode: '55118',
      city: 'Mainz',
      phone: '+49 6131 385147',
      email: 'kontakt@abc-mainz.de',
      kind: 'Hauptsitz',
      hours: [
        { days: 'Mo, Di, Mi, Fr', hours: '9:00–16:00 Uhr' },
        { days: 'Do', hours: 'keine Sprechstunde' },
      ],
      schedule: [1, 2, 3, 5].map((day) => ({ day, open: '09:00', close: '16:00' })),
      branches: [
        'Saarstraße 52, 55122 Mainz',
        'Bonifaziusplatz 1A, 55118 Mainz',
        'Rheinhessenstr. 13, 55129 Mainz-Hechtsheim',
      ],
      lat: 50.0035603,
      lon: 8.2592216,
    },
    {
      id: 'bad-kreuznach',
      name: 'Bad Kreuznach',
      street: 'Mathildenstr. 3–7',
      postalCode: '55543',
      city: 'Bad Kreuznach',
      phone: '+49 671 92067094',
      email: 'badkreuznach@abc-mainz.de',
      kind: 'Standort',
      hours: [{ days: 'Sprechzeiten', hours: 'nach Vereinbarung' }],
      schedule: [],
      lat: 49.8447785,
      lon: 7.8649269,
      placeholder: true,
    },
  ],
  legalLinks: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'Hausordnung', href: '/hausordnung' },
  ],
}

export const mainNavigation: NavSection[] = [
  {
    label: 'Kurse',
    href: '/kurse',
    intro:
      'Deutschkurse mit Ziel: B1/B2-Prüfungsvorbereitung, Berufssprachkurse und Integrationskurse.',
    image: images.abcKursraum,
    links: [
      {
        label: 'B1 & B2 – Prüfung und Vorbereitung',
        href: '/kurse/b1-b2',
        description: 'Kurs mit telc Prüfung vor Ort',
        image: images.abcLernen,
      },
      {
        label: 'Berufssprachkurse (BSK)',
        href: '/kurse/bsk',
        description: 'Deutsch für Arbeit und Ausbildung',
        image: images.sprachkurse,
      },
      {
        label: 'Integrationskurse',
        href: '/kurse/integrationskurse',
        description: 'Allgemein, Jugend, Alphabetisierung',
        image: images.abcUnterricht,
      },
    ],
  },
  {
    label: 'Prüfungen',
    href: '/pruefungen',
    intro: 'Offizielle Sprachprüfungen und der Einbürgerungstest – direkt bei uns vor Ort.',
    image: images.abcTelc,
    links: [
      {
        label: 'telc Prüfungen',
        href: '/pruefungen/telc',
        description: 'A1 bis C1 Hochschule',
        image: images.abcTelc,
      },
      {
        label: 'Einbürgerungstest',
        href: '/pruefungen/einbuergerungstest',
        description: '„Leben in Deutschland“',
        image: images.team,
      },
      {
        label: 'Prüfungstermine',
        href: '/pruefungen/telc#termine',
        description: 'Termine und freie Plätze',
      },
    ],
  },
  {
    label: 'Bildung & Förderung',
    href: '/bildungsangebote',
    intro:
      'Weiterbildung, politische Bildung, Lernförderung und pädagogische Begleitung für Familien.',
    image: images.nachhilfe,
    links: [
      {
        label: 'Viona',
        href: '/bildungsangebote#viona',
        description: 'Online-Weiterbildungen',
        image: images.weiterbildung,
      },
      {
        label: 'Politische Bildungsarbeit',
        href: '/bildungsangebote#politische-bildungsarbeit',
        description: 'Dialog und Teilhabe',
        image: images.qmSchulung,
      },
      {
        label: 'Bildungs- & Lernförderung',
        href: '/lernfoerderung',
        description: 'Nachhilfe in allen Fächern',
        image: images.nachhilfe,
      },
      {
        label: 'Sozialpädagogische Familienhilfe',
        href: '/paedagogische-angebote#familienhilfe',
        description: 'Begleitung im Familienalltag',
        image: images.paedagogik,
      },
      {
        label: 'Erziehungsbeistand',
        href: '/paedagogische-angebote#erziehungsbeistand',
        description: 'Unterstützung für junge Menschen',
        image: images.paedagogik,
      },
    ],
  },
  {
    label: 'Projekte',
    href: '/projekte',
    intro: 'Soziale Projekte für Zusammenhalt, Teilhabe und Vielfalt in Mainz.',
    image: images.sozialeProjekte,
    links: [
      {
        label: 'Straßenfotografie Mainz',
        href: '/projekte/strassenfotografie',
        description: 'Mit der Kamera die Stadt entdecken',
        image: images.projektStrassenfotografie,
      },
      {
        label: 'Natur erleben',
        href: '/projekte/natur-erleben',
        description: 'Inklusives Naturprojekt',
        image: images.projektNatur,
      },
      {
        label: 'STARTklar',
        href: '/projekte/startklar',
        description: 'Stabil in Arbeit',
        image: images.projektStartklar,
      },
      {
        label: 'Wir sind Vielfalt',
        href: '/projekte/wir-sind-vielfalt',
        description: 'Kreativwettbewerb',
        image: images.projektVielfalt,
      },
    ],
  },
  {
    label: 'Über uns',
    href: '/ueber-uns',
    intro: 'Verein, Mitmachen, Jobs und Kontakt.',
    image: images.jugendErfolg,
    links: [
      { label: 'Warum ABC?', href: '/ueber-uns#warum-abc', description: 'Was uns ausmacht' },
      {
        label: 'Mitgliedschaft',
        href: '/ueber-uns#mitgliedschaft',
        description: 'Den Verein unterstützen',
      },
      { label: 'Jobs', href: '/ueber-uns#jobs', description: 'Arbeiten beim ABC e.V.' },
      {
        label: 'Machen Sie mit!',
        href: '/ueber-uns#machen-sie-mit',
        description: 'Ehrenamt und Engagement',
      },
      {
        label: 'News',
        href: '/news',
        description: 'Aktuelles aus dem Verein',
        image: images.kindertagespflege,
      },
      { label: 'Kontakt', href: '/ueber-uns/kontakt', description: 'Mainz und Bad Kreuznach' },
      {
        label: 'Beschwerdeformular',
        href: '/formulare#beschwerde',
        description: 'Anonym und vertraulich',
      },
    ],
  },
]

export const headerCta: NavLink = { label: 'Kontakt', href: '/ueber-uns/kontakt' }

export const footerNavigation: Array<{ title: string; links: NavLink[] }> = [
  {
    title: 'Angebote',
    links: [
      { label: 'Kurse', href: '/kurse' },
      { label: 'Integrationskurse', href: '/kurse/integrationskurse' },
      { label: 'Prüfungen', href: '/pruefungen' },
      { label: 'Nachhilfe', href: '/lernfoerderung' },
      { label: 'Pädagogische Angebote', href: '/paedagogische-angebote' },
    ],
  },
  {
    title: 'Verein',
    links: [
      { label: 'Über uns', href: '/ueber-uns' },
      { label: 'Projekte', href: '/projekte' },
      { label: 'News', href: '/news' },
      { label: 'Presse', href: '/presse' },
      { label: 'Fotogalerie', href: '/fotogalerie' },
      { label: 'Jobs', href: '/ueber-uns#jobs' },
    ],
  },
  {
    title: 'Service',
    links: [
      { label: 'Kontakt', href: '/ueber-uns/kontakt' },
      { label: 'Formulare', href: '/formulare' },
      { label: 'Beschwerdeformular', href: '/formulare#beschwerde' },
      { label: 'Mitgliedschaft', href: '/ueber-uns#mitgliedschaft' },
    ],
  },
]
