/** Pädagogische Angebote – one page (Familienhilfe, Erziehungsbeistand). Content from abc-mainz.de. */
import type { ContentPage } from '../types'
import { contact, cta } from './shared'

export const paedagogikPage: ContentPage = {
  path: 'paedagogische-angebote',
  label: 'Pädagogische Angebote',
  seo: {
    title: 'Sozialpädagogische Familienhilfe und Erziehungsbeistand in Mainz',
    description:
      'Ambulante Jugendhilfe beim ABC e.V.: Sozialpädagogische Familienhilfe und Erziehungsbeistand – Begleitung für Familien, Kinder und junge Menschen in Mainz.',
  },
  hero: {
    eyebrow: 'Pädagogische Angebote',
    title: 'Begleitung in ein selbstbestimmtes Leben',
    intro: 'Ambulante Jugendhilfe für Familien, Kinder und Jugendliche.',
    facts: [
      { icon: 'users', label: 'Für', value: 'Familien, Kinder, junge Menschen' },
      { icon: 'location', label: 'Arbeitsweise', value: 'aufsuchend, vor Ort' },
      { icon: 'check', label: 'Grundlage', value: 'Antrag beim Jugendamt' },
      { icon: 'award', label: 'Team', value: 'pädagogische Fachkräfte' },
    ],
    primaryCta: { label: 'Familienhilfe', href: '#familienhilfe' },
    secondaryCta: { label: 'Kontakt', href: '#kontakt' },
  },
  blocks: [
    {
      type: 'spotlight',
      id: 'familienhilfe',
      eyebrow: 'Familie',
      title: 'Sozialpädagogische Familienhilfe',
      paragraphs: [
        'Für Familien in schwierigen Lebenslagen: Hilfe im Alltag, bei Konflikten, in Krisen und mit Ämtern – aufsuchend und als Hilfe zur Selbsthilfe.',
      ],
      facts: [
        { label: 'Antrag', value: 'offiziell beantragen' },
        { label: 'Prüfung', value: 'Sozialdienst der Stadt Mainz' },
        { label: 'Voraussetzung', value: 'Freiwilligkeit und Mitarbeit' },
        { label: 'Arbeitsweise', value: 'aufsuchend' },
      ],
      lists: [
        {
          title: 'Leistungen (Auswahl)',
          items: [
            'Hausbesuche, Einzel- und Familiengespräche',
            'Hilfe bei persönlichen und familiären Krisen',
            'Begleitung zu Ämtern und Institutionen',
            'Förderung im schulischen und psychosozialen Bereich',
          ],
        },
        {
          title: 'Außerdem',
          items: [
            'Vermittlung von Ergotherapie, Logopädie oder Psychotherapie',
            'Begleitung zu Ärztinnen, Ärzten und Beratungen',
            'Beratung zu Haushalt und Finanzen',
            'Freizeit- und Ferienaktivitäten',
          ],
        },
      ],
      contact: {
        label: 'Fragen zur Familienhilfe',
        email: 'sozialarbeit@abc-mainz.de',
        phone: '0157 35252607',
      },
    },
    {
      type: 'spotlight',
      id: 'erziehungsbeistand',
      eyebrow: 'Jugend',
      title: 'Erziehungsbeistand',
      reverse: true,
      paragraphs: [
        'Das Kind oder der junge Mensch steht im Mittelpunkt, das Umfeld wird einbezogen. Beantragt wird der Erziehungsbeistand über das Jugendamt.',
      ],
      facts: [
        { label: 'Für', value: 'Kinder und junge Erwachsene' },
        { label: 'Fokus', value: 'Entwicklung und Umfeld' },
        { label: 'Antrag', value: 'über das Jugendamt' },
        { label: 'Team', value: 'pädagogische Fachkräfte' },
      ],
      contact: {
        label: 'Fragen zum Erziehungsbeistand',
        email: 'sozialarbeit@abc-mainz.de',
        phone: '0157 35252607',
      },
    },
    {
      type: 'steps',
      id: 'weg',
      eyebrow: 'So kommt die Hilfe zustande',
      title: 'Der Weg zur Unterstützung',
      steps: [
        {
          title: 'Kontakt',
          text: 'Sie wenden sich an das Jugendamt – oder fragen zuerst bei uns, wie der Weg aussieht.',
        },
        {
          title: 'Antrag und Prüfung',
          text: 'Bedarf und Umfang prüft der Sozialdienst der Stadt Mainz.',
        },
        {
          title: 'Hilfeplan',
          text: 'Gemeinsam mit allen Beteiligten werden Ziele und Schritte festgelegt.',
        },
        {
          title: 'Begleitung',
          text: 'Unsere Fachkräfte begleiten Sie – freiwillig und mit Ihrer aktiven Mitarbeit.',
        },
      ],
    },
    contact(
      'Sie haben Fragen zur Familienhilfe oder zum Erziehungsbeistand? Wir beraten Sie vertraulich.',
      'sozialarbeit@abc-mainz.de',
    ),
    cta({
      title: 'Gemeinsam einen Weg finden',
      text: 'Schreiben Sie uns oder rufen Sie an – wir nehmen uns Zeit für Ihre Fragen.',
      primary: { label: 'E-Mail schreiben', href: 'mailto:sozialarbeit@abc-mainz.de' },
      secondary: { label: 'Bildungs- & Lernförderung', href: '/lernfoerderung' },
    }),
  ],
}
