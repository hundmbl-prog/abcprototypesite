/** Über uns (one page with sections) and Kontakt. Content from abc-mainz.de. */
import { images } from '../images'
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
      'Seit 1997 begleiten wir Menschen auf ihrem Weg in Sprache, Ausbildung und Beruf – als gemeinnütziger Verein in Mainz und Bad Kreuznach.',
    image: images.team,
    facts: [
      { icon: 'calendar', label: 'Gegründet', value: '1997 in Mainz' },
      { icon: 'users', label: 'Rechtsform', value: 'gemeinnütziger Verein' },
      { icon: 'location', label: 'Standorte', value: 'Mainz & Bad Kreuznach' },
      { icon: 'award', label: 'Prüfungen', value: 'telc Prüfungszentrum' },
    ],
    primaryCta: { label: 'Mehr über uns', href: '#bereiche' },
    secondaryCta: { label: 'Kontakt', href: '/ueber-uns/kontakt' },
  },
  blocks: [
    {
      type: 'intro',
      id: 'geschichte',
      eyebrow: 'Unsere Geschichte',
      title: 'Wir sind Vielfalt – und leben sie',
      paragraphs: [
        'Im Jahr 1997 gründeten migrantische Eltern, Studierende und Hochschulabsolventen das Akademische Bildungs-Center als gemeinnützigen Verein. Sie erkannten den großen Bedarf an Unterstützung für die Bildung in den migrantischen Communitys und schufen passende Angebote wie Sprachkurse, Nachhilfe und Integrationskurse.',
        'Wir sind Brückenbauer und Partner für die Menschen vor Ort – mit Empowerment durch Bildung und einem solidarischen Miteinander.',
      ],
      points: ['Bildung', 'Sprache', 'Integration', 'Kinder- und Jugendhilfe'],
      image: images.g03438,
    },
    {
      type: 'cards',
      id: 'bereiche',
      eyebrow: 'Mehr erfahren',
      title: 'Lernen Sie uns kennen',
      variant: 'classic',
      simple: true,
      cards: [
        {
          id: 'warum-abc',
          title: 'Warum ABC?',
          description: 'Was das Lernen bei uns besonders macht.',
          href: '/ueber-uns#warum-abc',
          image: images.abcUnterricht,
          tag: 'Verein',
          ctaLabel: 'Mehr erfahren',
        },
        {
          id: 'mitgliedschaft',
          title: 'Mitgliedschaft',
          description: 'Werden Sie Teil des Vereins und gestalten Sie mit.',
          href: '/ueber-uns#mitgliedschaft',
          image: images.jugendErfolg,
          tag: 'Verein',
          ctaLabel: 'Mehr erfahren',
        },
        {
          id: 'machen-sie-mit',
          title: 'Machen Sie mit!',
          description: 'Ehrenamtlich helfen oder unsere Arbeit unterstützen.',
          href: '/ueber-uns#machen-sie-mit',
          image: images.projektBruecken,
          tag: 'Engagement',
          ctaLabel: 'Mehr erfahren',
        },
        {
          id: 'jobs',
          title: 'Jobs',
          description: 'Arbeiten in einem offenen, internationalen Team.',
          href: '/ueber-uns#jobs',
          image: images.abcTafel,
          tag: 'Karriere',
          ctaLabel: 'Mehr erfahren',
        },
      ],
    },
    {
      type: 'spotlight',
      id: 'warum-abc',
      eyebrow: 'Warum ABC?',
      title: 'Ein Ort, an dem Sie ankommen',
      image: images.abcUnterricht,
      paragraphs: [
        'Bei uns kommen Menschen aus unterschiedlichen Kulturen zusammen – mit eigenen Erfahrungen und Zielen. Durch unsere langjährige Erfahrung im Sprachenlernen und in der Integration wissen wir, worauf es ankommt.',
        'Sprache lernen ist mehr als Grammatik: Lehrende und Lernende gestalten gemeinsam eine positive Lernumgebung. Als telc-zertifizierte Sprachschule bereiten wir auf alle Prüfungen vor – und Sie legen sie direkt bei uns ab.',
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
      back: { label: 'Zurück zur Übersicht', href: '#bereiche' },
    },
    {
      type: 'spotlight',
      id: 'mitgliedschaft',
      eyebrow: 'Mitgliedschaft',
      title: 'Sei dabei!',
      image: images.jugendErfolg,
      reverse: true,
      paragraphs: [
        'Unser Verein lebt vom Engagement von Menschen, die eine Vision haben und die Vielfalt unserer Gesellschaft schätzen. Wir möchten wachsen und noch aktiver werden – helfen Sie uns dabei und unterstützen Sie uns als Mitglied.',
        'Senden Sie uns Ihre Anfrage – wir melden uns mit allen Informationen zur Mitgliedschaft.',
      ],
      back: { label: 'Zurück zur Übersicht', href: '#bereiche' },
    },
    {
      type: 'form',
      id: 'mitglied-werden',
      eyebrow: 'Mitgliedschaft',
      title: 'Mitglied werden',
      intro:
        'Ihre Anfrage ist unverbindlich. Wir schicken Ihnen alle Unterlagen und beantworten Ihre Fragen.',
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
      image: images.projektBruecken,
      paragraphs: [
        'Ob in der Freizeit oder hauptamtlich: Wir freuen uns über alle, die unsere Arbeit kennenlernen und mithelfen möchten.',
        'Sie möchten unsere Arbeit mit einer Spende unterstützen? Schreiben Sie uns – wir senden Ihnen gerne die Bankverbindung und alle Informationen.',
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
      back: { label: 'Zurück zur Übersicht', href: '#bereiche' },
    },
    {
      type: 'spotlight',
      id: 'jobs',
      eyebrow: 'Jobs',
      title: 'Arbeiten beim ABC',
      image: images.abcTafel,
      reverse: true,
      paragraphs: [
        'Als gemeinnütziger Verein haben wir langjährige Erfahrung in Bildungs- und Integrationsarbeit und in sozialen Projekten. Wir legen großen Wert auf ein respektvolles und tolerantes Miteinander in kultureller Vielfalt.',
        'Wir freuen uns über Bewerbungen in diesen Bereichen – auch initiativ.',
      ],
      lists: [
        {
          title: 'Wir bieten',
          items: [
            'Ein offenes, internationales Team',
            'Ausführliche Einarbeitung und Begleitung',
            'Flexible Zeiteinteilung',
            'Kontinuierliche pädagogische Unterstützung',
          ],
        },
      ],
      back: { label: 'Zurück zur Übersicht', href: '#bereiche' },
    },
    {
      type: 'columns',
      id: 'stellen',
      eyebrow: 'Bereiche',
      title: 'Hier verstärken Sie unser Team',
      columns: [
        {
          icon: 'pen',
          title: 'Nachhilfe-Lehrkräfte',
          items: [
            'Sehr gute Kenntnisse in Ihren Fächern',
            'Sehr gute Deutschkenntnisse',
            'Freude an der Arbeit mit Kindern und Jugendlichen',
            'Interkulturelle Kompetenz – weitere Sprachen sind ein Vorteil',
          ],
        },
        {
          icon: 'users',
          title: 'Sozialpädagogik / Familienhilfe',
          items: [
            'Studium der Sozialen Arbeit, (Sozial-)Pädagogik oder Erziehungswissenschaften',
            'Aufsuchende Arbeit mit Familien',
            'Teamfähigkeit, Engagement und Flexibilität',
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
            'Pädagogische und interkulturelle Stärke',
          ],
        },
      ],
    },
    {
      type: 'form',
      id: 'bewerben',
      eyebrow: 'Bewerbung',
      title: 'Jetzt bewerben',
      intro: 'Senden Sie uns Ihren Lebenslauf und ein paar Worte zu Ihnen.',
      formId: 'bewerbung',
      points: ['Lebenslauf als PDF', 'Kurzes Anschreiben', 'Initiativbewerbungen willkommen'],
    },
    cta({
      title: 'Lernen Sie uns persönlich kennen',
      text: 'Besuchen Sie uns in Mainz oder Bad Kreuznach – wir freuen uns auf Sie.',
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
    image: images.g03419,
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
      intro: 'Wir antworten so schnell wie möglich – in der Regel innerhalb weniger Werktage.',
      formId: 'kontakt',
      points: ['Kostenlose Beratung', 'Antwort per E-Mail oder Telefon', 'Für alle Standorte'],
    },
  ],
}
