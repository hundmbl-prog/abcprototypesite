/** Pädagogische Angebote – one page (Familienhilfe, Erziehungsbeistand). Content from abc-mainz.de. */
import { images } from '../images'
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
    intro:
      'Es gibt viele Gründe, warum Familien, Kinder und Jugendliche Unterstützung brauchen. Mit unseren Angeboten der ambulanten Jugendhilfe stehen wir an Ihrer Seite.',
    image: images.paedagogik,
    facts: [
      { icon: 'users', label: 'Für', value: 'Familien, Kinder, junge Menschen' },
      { icon: 'location', label: 'Arbeitsweise', value: 'aufsuchend, vor Ort' },
      { icon: 'check', label: 'Grundlage', value: 'Antrag beim Jugendamt' },
      { icon: 'award', label: 'Team', value: 'pädagogische Fachkräfte' },
    ],
    primaryCta: { label: 'Angebote ansehen', href: '#angebote' },
    secondaryCta: { label: 'Kontakt', href: '#kontakt' },
  },
  blocks: [
    {
      type: 'cards',
      id: 'angebote',
      eyebrow: 'Unsere Angebote',
      title: 'Ambulante Jugendhilfe',
      intro:
        'Fachkräfte unterstützen Familien bei der Alltagsbewältigung, in Krisen und Konflikten, bei Erziehungsfragen und in Notlagen.',
      variant: 'classic',
      simple: true,
      cards: [
        {
          id: 'familienhilfe',
          title: 'Sozialpädagogische Familienhilfe',
          description:
            'Unterstützung für Familien in schwierigen Lebenslagen – im Alltag, in Krisen und im Kontakt mit Ämtern.',
          href: '/paedagogische-angebote#familienhilfe',
          image: images.paedagogik,
          tag: 'Familie',
          ctaLabel: 'Mehr erfahren',
        },
        {
          id: 'erziehungsbeistand',
          title: 'Erziehungsbeistand',
          description:
            'Begleitung für Kinder und junge Erwachsene bei Entwicklungsfragen – mit Blick auf das ganze Umfeld.',
          href: '/paedagogische-angebote#erziehungsbeistand',
          image: images.projektJugendplattform,
          tag: 'Jugend',
          ctaLabel: 'Mehr erfahren',
        },
      ],
    },
    {
      type: 'spotlight',
      id: 'familienhilfe',
      eyebrow: 'Familie',
      title: 'Sozialpädagogische Familienhilfe',
      image: images.paedagogik,
      paragraphs: [
        'Die Sozialpädagogische Familienhilfe richtet sich an Familien in schwierigen Lebenssituationen mit komplexen Problemlagen. Sie unterstützt bei Alltagsproblemen und bei der Lösung von Konflikten, begleitet in Krisen und in der Zusammenarbeit mit Ämtern und Institutionen.',
        'Durch intensive Betreuung und Begleitung soll Hilfe zur Selbsthilfe entstehen. Unsere Fachkräfte arbeiten aufsuchend, beziehen das gesamte Familiensystem ein und orientieren sich an den Bedürfnissen und Lebenskonzepten der Familie.',
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
      back: { label: 'Zurück zur Übersicht', href: '#angebote' },
    },
    {
      type: 'spotlight',
      id: 'erziehungsbeistand',
      eyebrow: 'Jugend',
      title: 'Erziehungsbeistand',
      image: images.projektJugendplattform,
      reverse: true,
      paragraphs: [
        'Beim Erziehungsbeistand steht das Kind oder der junge Mensch im Mittelpunkt – und die Bewältigung von Entwicklungsproblemen. Das ganze soziale Umfeld wird mit einbezogen.',
        'Wie die Familienhilfe wird auch der Erziehungsbeistand über das Jugendamt beantragt. Sprechen Sie uns gerne an – wir erklären Ihnen den Weg.',
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
      back: { label: 'Zurück zur Übersicht', href: '#angebote' },
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
