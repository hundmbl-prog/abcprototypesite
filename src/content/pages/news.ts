/**
 * News – overview and one page per article. Texts from the news posts on abc-mainz.de.
 * Older items are written in the past tense (with the year in the text) so nothing outdated
 * reads like a current offer; no separate dates are shown (decision for the news section).
 */
import type { OfferCardData } from '@/components/cards/types'
import { images } from '../images'
import type { ContentImage, ContentPage } from '../types'
import { cta } from './shared'

type Article = {
  slug: string
  title: string
  category: string
  excerpt: string
  image: ContentImage
  paragraphs: string[]
  points?: string[]
}

export const articles: Article[] = [
  {
    slug: 'wir-sind-offizielles-telc-hochschulkompetenzzentrum',
    title: 'Wir sind offizielles telc Hochschulkompetenzzentrum',
    category: 'Prüfungen',
    excerpt:
      'Seit 2021 bieten wir den studienvorbereitenden Kurs „telc Deutsch C1 Hochschule“ inklusive Prüfung an.',
    image: images.abcTelc,
    paragraphs: [
      'Seit 2021 sind wir offizielles telc Hochschulkompetenzzentrum. Neben den allgemeinen Deutschkursen bieten wir damit auch den studienvorbereitenden Kurs „telc Deutsch C1 Hochschule“ inklusive Prüfung an.',
      'Studierende und Studienbewerberinnen und -bewerber erwerben im Intensivkurs mit rund 20 Wochenstunden die Deutschkenntnisse, die sie für ein Studium in Deutschland brauchen – und legen die Prüfung anschließend direkt bei uns ab.',
    ],
  },
  {
    slug: 'qualifizierung-von-kindertagespflegepersonen',
    title: 'Qualifizierung von Kindertagespflegepersonen im Kompakt-Kurs',
    category: 'Weiterbildung',
    excerpt:
      'Im Auftrag des Amtes für Jugend und Familie der Stadt Mainz qualifizierten wir Tagesmütter und Tagesväter im Kompakt-Kurs.',
    image: images.kindertagespflege,
    paragraphs: [
      'Im April 2022 beauftragte das Amt für Jugend und Familie der Stadt Mainz das Akademische Bildungs-Center mit der Qualifizierung von Kindertagespflegepersonen – „Tagesmüttern“ und „Tagesvätern“ – in einem Kompakt-Kurs.',
      'Das Besondere war die verkürzte Kursdauer: Die kompakte Qualifizierung sollte geflüchtete ukrainische Familien bei ihrem Betreuungsbedarf unterstützen. Das Ministerium für Bildung Rheinland-Pfalz finanzierte die Maßnahme mit. „Die Vereinbarkeit von Familie und Beruf ist uns ein großes Anliegen“, sagte damals der Geschäftsführer des ABC.',
    ],
  },
  {
    slug: 'jugendintegrationskurs-mit-100-prozent-erfolg',
    title: 'Jugendintegrationskurs mit 100 % Erfolg abgeschlossen',
    category: 'Integrationskurse',
    excerpt: 'Alle Teilnehmenden unseres B1-Jugendintegrationskurses haben die Prüfung bestanden.',
    image: images.jugendErfolg,
    paragraphs: [
      'Ein großer Erfolg im November 2021: Alle Teilnehmenden unseres B1-Jugendintegrationskurses haben die Prüfung bestanden. Wir gratulieren herzlich!',
    ],
  },
  {
    slug: 'frauenintegrationskurs',
    title: 'Frauenintegrationskurs: 92 % bestanden',
    category: 'Integrationskurse',
    excerpt:
      '92 % der Teilnehmerinnen haben den Frauenintegrationskurs mit großem Erfolg abgeschlossen.',
    image: images.frauenintegrationskurs,
    paragraphs: [
      'Im Februar 2021 haben 92 % der Frauen unseres Frauenintegrationskurses die Prüfung mit großem Erfolg bestanden. Herzlichen Glückwunsch an alle Teilnehmerinnen!',
    ],
  },
  {
    slug: 'schulung-zum-qualitaets-manager',
    title: 'Schulung zum Qualitäts-Manager erfolgreich abgeschlossen',
    category: 'Weiterbildung',
    excerpt: 'Alle Teilnehmenden haben die Schulung zum Qualitäts-Manager mit Erfolg absolviert.',
    image: images.qmSchulung,
    paragraphs: [
      '2021 haben alle Teilnehmenden unserer öffentlich ausgeschriebenen Schulung zum Qualitäts-Manager (QM) das Seminar mit Erfolg absolviert.',
    ],
  },
  {
    slug: 'jetzt-kostenlose-nachhilfe-in-bad-kreuznach',
    title: 'Kostenlose Nachhilfe in Bad Kreuznach',
    category: 'Lernförderung',
    excerpt:
      'Mit dem Programm „Aufholen nach Corona“ boten wir in Bad Kreuznach kostenlose Hausaufgabenhilfe an.',
    image: images.nachhilfeBadKreuznach,
    paragraphs: [
      'Dank einer Förderung aus dem Programm „Aufholen nach Corona“ boten wir 2022 in Bad Kreuznach kostenlose Nachhilfe an: jeden Mittwoch und Samstag von 17 bis 20 Uhr Hilfe bei den Hausaufgaben.',
      'Unsere aktuellen Angebote zur Lernförderung finden Sie auf der Seite Bildungs- & Lernförderung.',
    ],
  },
]

export const newsCards: OfferCardData[] = articles.map((a) => ({
  id: a.slug,
  title: a.title,
  description: a.excerpt,
  href: `/news/${a.slug}`,
  image: a.image,
  tag: a.category,
  ctaLabel: 'Weiterlesen',
  icon: 'book',
}))

export const newsPage: ContentPage = {
  path: 'news',
  label: 'News',
  seo: {
    title: 'News – Aktuelles aus dem ABC',
    description:
      'Neuigkeiten des Akademischen Bildungs-Centers e.V. aus Kursen, Prüfungen, Weiterbildung und Lernförderung.',
  },
  hero: {
    eyebrow: 'News',
    title: 'Aktuelles aus dem ABC',
    intro: 'Neuigkeiten aus Kursen, Prüfungen und Projekten.',
  },
  blocks: [
    {
      type: 'cards',
      id: 'beitraege',
      eyebrow: 'Beiträge',
      title: 'Neuigkeiten',
      variant: 'classic',
      simple: true,
      wide: true,
      filterBy: 'tag',
      cards: newsCards,
    },
    cta({
      title: 'Immer auf dem Laufenden',
      text: 'Fragen zu unseren Angeboten? Wir beraten Sie gerne.',
      primary: { label: 'Kontakt', href: '/ueber-uns/kontakt' },
      secondary: { label: 'Unsere Projekte', href: '/projekte' },
    }),
  ],
}

export const articlePages: ContentPage[] = articles.map((a) => ({
  path: `news/${a.slug}`,
  label: a.title,
  seo: { title: a.title, description: a.excerpt },
  hero: { eyebrow: `News · ${a.category}`, title: a.title, intro: a.excerpt },
  blocks: [
    {
      type: 'article',
      id: 'beitrag',
      eyebrow: a.category,
      title: 'Der Beitrag',
      paragraphs: a.paragraphs,
      points: a.points,
      image: a.image,
    },
    {
      type: 'cards',
      id: 'weitere-news',
      eyebrow: 'Weitere News',
      title: 'Mehr aus dem ABC',
      variant: 'classic',
      simple: true,
      wide: true,
      cards: newsCards.filter((c) => c.id !== a.slug).slice(0, 3),
      cta: { label: 'Alle News', href: '/news' },
    },
  ],
}))
