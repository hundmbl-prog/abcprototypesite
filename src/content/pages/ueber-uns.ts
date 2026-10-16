/** Über uns (one page with sections) and Kontakt. Content from abc-mainz.de. */
import type { ContentPage } from '../types'
import { cta } from './shared'

export const ueberUnsPage: ContentPage = {
  path: 'ueber-uns',
  label: 'Über uns',
  seo: {
    title: 'Über uns – Akademisches Bildungs-Center e.V.',
    description:
      'Das ABC e.V. in Mainz: gemeinnütziger Bildungsträger seit 1997, gegründet aus der Community für die Community. Warum ABC, Mitgliedschaft, Mitmachen und Jobs.',
  },
  hero: {
    eyebrow: 'Über uns',
    title: 'Aus der Community – für die Community',
    intro:
      'Gemeinnütziger Verein, 1997 von migrantischen Eltern, Studierenden und Hochschulabsolventen gegründet.',
    facts: [
      { icon: 'calendar', label: 'Gegründet', value: '1997 in Mainz' },
      { icon: 'users', label: 'Rechtsform', value: 'gemeinnütziger Verein' },
      { icon: 'location', label: 'Standorte', value: 'Mainz & Bad Kreuznach' },
      { icon: 'award', label: 'Prüfungen', value: 'telc Prüfungszentrum' },
    ],
    primaryCta: { label: 'Warum ABC?', href: '#warum-abc' },
    secondaryCta: { label: 'Jobs', href: '#jobs' },
  },
  blocks: [
    {
      type: 'spotlight',
      id: 'warum-abc',
      eyebrow: 'Warum ABC?',
      title: 'Ein Ort, an dem Sie ankommen',
      paragraphs: [
        'Langjährige Erfahrung in Sprache und Integration, eine familiäre Atmosphäre – und telc Prüfungen direkt im Haus.',
      ],
      facts: [
        { label: 'Erfahrung', value: 'seit 1997' },
        { label: 'Lehrkräfte', value: 'qualifiziert und erfahren' },
        { label: 'Lage', value: 'nah am Mainzer Hauptbahnhof' },
        { label: 'Prüfungen', value: 'telc direkt vor Ort' },
      ],
      lists: [
        {
          title: 'Was das Lernen besonders macht',
          items: [
            'Intensive Unterstützung durch erfahrene Lehrkräfte',
            'Familiäre Atmosphäre',
            'Starker Zusammenhalt in den Kursen',
            'Lernen vor Ort und online',
          ],
        },
      ],
    },
    {
      type: 'form',
      id: 'mitgliedschaft',
      eyebrow: 'Mitgliedschaft',
      title: 'Mitglied werden',
      intro: 'Unterstützen Sie den Verein als Mitglied – die Anfrage ist unverbindlich.',
      formId: 'mitgliedschaft',
      points: [
        'Unverbindliche Anfrage',
        'Persönliche Rückmeldung',
        'Den Verein aktiv mitgestalten',
      ],
    },
    {
      type: 'spotlight',
      id: 'machen-sie-mit',
      eyebrow: 'Engagement',
      title: 'Machen Sie mit!',
      paragraphs: [
        'Ehrenamtlich oder mit einer Spende – schreiben Sie uns, wir senden Ihnen alle Informationen.',
      ],
      lists: [
        {
          title: 'So können Sie helfen',
          items: [
            'Als Patin oder Pate',
            'Bei Projekten und Veranstaltungen',
            'Mit Ihrem Wissen und Ihrer Zeit',
            'Mit einer Spende',
          ],
        },
      ],
      contact: { label: 'Engagement und Spenden', email: 'kontakt@abc-mainz.de' },
    },
    {
      type: 'columns',
      id: 'jobs',
      eyebrow: 'Jobs',
      title: 'Arbeiten beim ABC',
      columns: [
        {
          icon: 'pen',
          title: 'Nachhilfe-Lehrkräfte',
          items: [
            'Sehr gute Kenntnisse in Ihren Fächern',
            'Sehr gute Deutschkenntnisse',
            'Freude an der Arbeit mit Kindern und Jugendlichen',
            'Weitere Sprachen sind ein Vorteil',
          ],
        },
        {
          icon: 'users',
          title: 'Sozialpädagogik / Familienhilfe',
          items: [
            'Studium Soziale Arbeit, (Sozial-)Pädagogik oder Erziehungswissenschaften',
            'Aufsuchende Arbeit mit Familien',
            'Erfahrung im Kinderschutz von Vorteil',
          ],
        },
        {
          icon: 'book',
          title: 'Deutsch-Lehrkräfte (DaZ/DaF)',
          items: [
            'Deutsch auf muttersprachlichem Niveau',
            'Studienabschluss',
            'Zulassung für Integrationskurse (BAMF)',
          ],
        },
      ],
    },
    {
      type: 'form',
      id: 'bewerben',
      eyebrow: 'Bewerbung',
      title: 'Jetzt bewerben',
      formId: 'bewerbung',
      points: [
        'Offenes, internationales Team',
        'Einarbeitung und flexible Zeiten',
        'Lebenslauf als PDF',
        'Initiativbewerbungen willkommen',
      ],
    },
    cta({
      title: 'Lernen Sie uns persönlich kennen',
      text: 'Besuchen Sie uns in Mainz oder Bad Kreuznach.',
      primary: { label: 'Kontakt', href: '/ueber-uns/kontakt' },
      secondary: { label: 'Unsere Projekte', href: '/projekte' },
    }),
  ],
}

export const kontaktPage: ContentPage = {
  path: 'ueber-uns/kontakt',
  label: 'Kontakt',
  seo: {
    title: 'Kontakt – ABC e.V. in Mainz und Bad Kreuznach',
    description:
      'So erreichen Sie das Akademische Bildungs-Center e.V.: Adressen, Öffnungszeiten und Ansprechpersonen in Mainz und Bad Kreuznach – mit Kontaktformular.',
  },
  hero: {
    eyebrow: 'Kontakt',
    title: 'Wir sind für Sie da',
    intro: 'Rufen Sie an, schreiben Sie uns oder besuchen Sie uns in Mainz und Bad Kreuznach.',
    facts: [
      { icon: 'location', label: 'Hauptsitz', value: 'Rhabanusstr. 5, Mainz' },
      { icon: 'clock', label: 'Sprechzeiten', value: 'Mo, Di, Mi, Fr 9–16 Uhr' },
      { icon: 'phone', label: 'Telefon', value: '+49 6131 385147' },
      { icon: 'mail', label: 'E-Mail', value: 'kontakt@abc-mainz.de' },
    ],
    primaryCta: { label: 'Nachricht schreiben', href: '#nachricht' },
    secondaryCta: { label: 'Standorte', href: '#standorte' },
  },
  blocks: [
    { type: 'locations', id: 'standorte', eyebrow: 'Standorte', title: 'So finden Sie uns' },
    {
      type: 'contacts',
      id: 'ansprechpersonen',
      eyebrow: 'Direkter Kontakt',
      title: 'Ihr Anliegen – Ihr Kontakt',
      items: [
        {
          icon: 'info',
          title: 'Allgemeine Fragen',
          email: 'kontakt@abc-mainz.de',
          phone: '+49 6131 385147',
        },
        {
          icon: 'book',
          title: 'Integrationskurse und DTZ',
          email: 'integration@abc-mainz.de',
          phone: '+49 6131 385147',
        },
        {
          icon: 'users',
          title: 'Berufssprachkurse (BSK)',
          email: 'bsk@abc-mainz.de',
          phone: '+49 6131 7202798',
        },
        { icon: 'award', title: 'telc Prüfungen', email: 'pruefungen@abc-mainz.de' },
        { icon: 'level', title: 'Sprachkurse B1 & B2', email: 'sprachkurse@abc-mainz.de' },
        {
          icon: 'pen',
          title: 'Nachhilfe',
          email: 'nachhilfe@abc-mainz.de',
          phone: '+49 155 63011628',
        },
        {
          icon: 'monitor',
          title: 'Viona Weiterbildungen',
          email: 'viona@abc-mainz.de',
          phone: '+49 6131 385795',
        },
        {
          icon: 'child',
          title: 'Familienhilfe und Erziehungsbeistand',
          email: 'sozialarbeit@abc-mainz.de',
          phone: '0157 35252607',
        },
        {
          icon: 'location',
          title: 'Standort Bad Kreuznach',
          email: 'badkreuznach@abc-mainz.de',
          phone: '+49 671 92067094',
        },
      ],
    },
    {
      type: 'form',
      id: 'nachricht',
      eyebrow: 'Kontaktformular',
      title: 'Schreiben Sie uns',
      formId: 'kontakt',
      points: ['Kostenlose Beratung', 'Antwort per E-Mail oder Telefon', 'Für alle Standorte'],
    },
  ],
}
