/** Formulare – one page: Beschwerdeformular and Bildung und Teilhabe. */
import { images } from '../images'
import type { ContentPage } from '../types'
import { cta } from './shared'

export const formularePage: ContentPage = {
  path: 'formulare',
  label: 'Formulare',
  seo: {
    title: 'Formulare – Beschwerde und Bildung und Teilhabe',
    description:
      'Formulare des ABC e.V.: Beschwerdeformular und Anfrage zur Lernförderung über Bildung und Teilhabe.',
  },
  hero: {
    eyebrow: 'Formulare',
    title: 'Ihre Anliegen – einfach online',
    intro: 'Teilen Sie uns Kritik mit oder fragen Sie Lernförderung über Bildung und Teilhabe an.',
    image: images.g03461,
    facts: [
      { icon: 'pen', label: 'Formulare', value: 'Beschwerde, Bildung und Teilhabe' },
      { icon: 'check', label: 'Beschwerde', value: 'auch anonym möglich' },
      { icon: 'info', label: 'Datenschutz', value: 'vertraulich behandelt' },
      { icon: 'mail', label: 'Alternativ', value: 'kontakt@abc-mainz.de' },
    ],
    primaryCta: { label: 'Zu den Formularen', href: '#uebersicht' },
  },
  blocks: [
    {
      type: 'cards',
      id: 'uebersicht',
      eyebrow: 'Übersicht',
      title: 'Welches Formular brauchen Sie?',
      variant: 'classic',
      simple: true,
      cards: [
        {
          id: 'beschwerde',
          title: 'Beschwerdeformular',
          description: 'Etwas ist nicht gut gelaufen? Sagen Sie es uns – auch anonym.',
          href: '/formulare#beschwerde',
          image: images.g03427,
          tag: 'Feedback',
          ctaLabel: 'Zum Formular',
        },
        {
          id: 'bildung-und-teilhabe',
          title: 'Bildung und Teilhabe',
          description: 'Lernförderung für Ihr Kind anfragen – wir helfen beim Antrag.',
          href: '/formulare#bildung-und-teilhabe',
          image: images.nachhilfe,
          tag: 'Lernförderung',
          ctaLabel: 'Zum Formular',
        },
      ],
    },
    {
      type: 'form',
      id: 'beschwerde',
      eyebrow: 'Beschwerde',
      title: 'Beschwerdeformular',
      intro:
        'Ihre Rückmeldung hilft uns, besser zu werden. Wir behandeln jede Beschwerde vertraulich.',
      formId: 'beschwerde',
      points: [
        'Auch anonym möglich',
        'Vertrauliche Bearbeitung',
        'Rückmeldung, wenn Sie es wünschen',
      ],
    },
    {
      type: 'form',
      id: 'bildung-und-teilhabe',
      eyebrow: 'Bildung und Teilhabe',
      title: 'Lernförderung anfragen',
      intro:
        'Familien mit Anspruch auf Leistungen für Bildung und Teilhabe können die Kosten für Lernförderung beantragen. Wir melden uns und helfen beim Antrag.',
      formId: 'bildung-und-teilhabe',
      email: 'nachhilfe@abc-mainz.de',
      points: ['Hilfe beim Antrag', 'Nachhilfe in allen Fächern', 'Vor Ort oder online'],
    },
    cta({
      title: 'Lieber persönlich?',
      text: 'Rufen Sie uns an oder kommen Sie in unsere Sprechstunde.',
      primary: { label: 'Kontakt', href: '/ueber-uns/kontakt' },
      secondary: { label: 'Lernförderung', href: '/lernfoerderung' },
    }),
  ],
}
