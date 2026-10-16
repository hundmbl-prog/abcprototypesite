/** Formulare – one page: Beschwerdeformular and Bildung und Teilhabe. */
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
    intro: 'Beschwerde und Bildung und Teilhabe – online.',
    facts: [
      { icon: 'pen', label: 'Formulare', value: 'Beschwerde, Bildung und Teilhabe' },
      { icon: 'check', label: 'Beschwerde', value: 'auch anonym möglich' },
      { icon: 'info', label: 'Datenschutz', value: 'vertraulich behandelt' },
      { icon: 'mail', label: 'Alternativ', value: 'kontakt@abc-mainz.de' },
    ],
    primaryCta: { label: 'Zur Beschwerde', href: '#beschwerde' },
  },
  blocks: [
    {
      type: 'form',
      id: 'beschwerde',
      eyebrow: 'Beschwerde',
      title: 'Beschwerdeformular',
      intro: 'Vertraulich – auf Wunsch auch anonym.',
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
      intro: 'Für Familien mit Anspruch auf Bildung und Teilhabe – wir helfen beim Antrag.',
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
