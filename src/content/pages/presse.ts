/** Presse – press review from abc-mainz.de (outlet, date, headline; no links were verifiable). */
import type { ContentPage } from '../types'
import { contact } from './shared'

export const pressePage: ContentPage = {
  path: 'presse',
  label: 'Presse',
  seo: {
    title: 'Presse – das ABC in den Medien',
    description:
      'Pressespiegel des Akademischen Bildungs-Centers e.V.: Berichte über Kurse, Projekte und Engagement in Mainz und Bad Kreuznach.',
  },
  hero: {
    eyebrow: 'Presse',
    title: 'Das ABC in den Medien',
    intro: 'Berichte über unsere Arbeit.',
    primaryCta: { label: 'Zum Pressespiegel', href: '#pressespiegel' },
  },
  blocks: [
    {
      type: 'press',
      id: 'pressespiegel',
      eyebrow: 'Pressespiegel',
      title: 'Berichte über uns',
      items: [
        {
          outlet: 'Rhein-Zeitung',
          date: '08.03.2023',
          title:
            'Flüchtlinge brauchen vor allem Sprachkurse – So ist die Lage im Kreis Bad Kreuznach',
        },
        {
          outlet: 'Blick aktuell',
          date: '07.03.2023',
          title:
            'Solidaritätsaktion für Erdbebenopfer – MdL Müller unterstützte Veranstaltung in Mainz',
        },
        {
          outlet: 'familien-in-badkreuznach.de',
          date: '01.06.2022',
          title: 'Kurzbeschreibung: ABC e.V. Mainz',
        },
        {
          outlet: 'Allgemeine Zeitung Bad Kreuznach',
          date: '24.05.2022',
          title: 'Beim Frühstück Frauen aus anderen Kulturen begegnen',
        },
        {
          outlet: 'Allgemeine Zeitung Bad Kreuznach',
          date: '02.05.2022',
          title: 'Kindertagespflege-Kurs in Mainz von Stadt und Verein ABC',
        },
        {
          outlet: 'Mainz.de',
          date: '29.04.2022',
          title:
            'Amt für Jugend und Familie beauftragt das Akademische Bildungs-Center e.V. mit der Qualifizierung von Kindertagespflegepersonen im Kompakt-Kurs',
        },
        {
          outlet: 'Radio Antenne Bad Kreuznach',
          date: '25.04.2022',
          title: 'Nachhilfeangebot für Kinder und Jugendliche',
        },
        {
          outlet: 'Allgemeine Zeitung Bad Kreuznach',
          date: '19.04.2022',
          title: 'Frauen die Angst vorm Deutsch-Sprechen nehmen',
        },
        {
          outlet: 'Allgemeine Zeitung Bad Kreuznach',
          date: '05.04.2022',
          title: 'Bad Kreuznach: Schulungen für Tagesmütter',
        },
        {
          outlet: 'Radio Antenne Bad Kreuznach',
          date: '22.03.2022',
          title: 'Zu Gast: Akademisches Bildungs-Center',
        },
        {
          outlet: 'Allgemeine Zeitung Bad Kreuznach',
          date: '22.01.2022',
          title: 'Wohlfühlen und mitgestalten im Akademischen Bildungs-Center',
        },
      ],
    },
    contact('Presseanfragen beantworten wir gerne – schreiben Sie uns oder rufen Sie an.'),
  ],
}
