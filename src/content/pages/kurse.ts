/**
 * Kurse – overview plus three course pages (B1/B2, BSK, Integrationskurse), structured like a course
 * catalogue. Content from the current abc-mainz.de pages; no prices and no past start dates.
 * Final exams: the DTZ is run by g.a.s.t. on behalf of the BAMF (checked 15.10.2026).
 */
import type { OfferCardData } from '@/components/cards/types'
import { images } from '../images'
import type { ColumnsBlock, ContentPage, FaqItem, PageBlock, TabsBlock } from '../types'
import { CONTACT_EMAIL_COURSES, contact, cta } from './shared'
import { telcLevels } from './telc'

const courseCards: OfferCardData[] = [
  {
    id: 'b1-b2',
    title: 'B1 & B2 – Prüfung und Prüfungsvorbereitung',
    description:
      'Sicher in Alltag und Beruf – mit gezieltem Training und der telc Prüfung B1 oder B2 direkt bei uns.',
    href: '/kurse/b1-b2',
    image: images.abcLernen,
    tag: 'Kurs',
    facts: { level: 'B1–B2', format: 'Präsenz & online', location: 'Mainz' },
  },
  {
    id: 'bsk',
    title: 'Berufssprachkurse (BSK)',
    description:
      'Deutsch für Arbeit und Ausbildung – gefördert nach der DeuFöV, unter bestimmten Voraussetzungen kostenlos.',
    href: '/kurse/bsk',
    image: images.sprachkurse,
    tag: 'Kurs',
    facts: { level: 'A2–C1', location: 'Mainz' },
  },
  {
    id: 'integrationskurse',
    title: 'Integrationskurse',
    description:
      'Sprachkurs und Orientierungskurs – allgemein, für junge Menschen oder mit Alphabetisierung.',
    href: '/kurse/integrationskurse',
    image: images.abcUnterricht,
    tag: 'Kurs',
    facts: { level: 'A1–B1', duration: '700–1.000 UE', location: 'Mainz & Bad Kreuznach' },
  },
]

const advantages: PageBlock = {
  type: 'features',
  id: 'vorteile',
  eyebrow: 'Ihre Vorteile',
  title: 'Warum Sie bei uns lernen',
  items: [
    {
      icon: 'users',
      title: 'Kleine Gruppen',
      text: 'Persönliche Betreuung und viel Zeit zum Sprechen.',
    },
    {
      icon: 'award',
      title: 'Qualifizierte Lehrkräfte',
      text: 'Wir wählen unsere Lehrkräfte sorgfältig aus – für Qualität und Freude am Lernen.',
    },
    {
      icon: 'pen',
      title: 'Prüfung im Haus',
      text: 'Als lizenziertes telc Prüfungszentrum legen Sie Ihre Prüfung direkt bei uns ab.',
    },
    {
      icon: 'location',
      title: 'Zentral in Mainz',
      text: 'Nah am Mainzer Hauptbahnhof und an weiteren gut erreichbaren Standorten.',
    },
  ],
}

const requirements = (extra?: Partial<ColumnsBlock>): ColumnsBlock => ({
  type: 'columns',
  id: 'anmeldung',
  eyebrow: 'Anmeldung',
  title: 'Voraussetzungen und Anmeldung',
  columns: [
    {
      icon: 'users',
      title: 'Wer kann teilnehmen?',
      items: [
        'Integrationskurs: mit Berechtigungs- oder Verpflichtungsschein (BAMF, Jobcenter oder Ausländerbehörde)',
        'Berufssprachkurs: mit Berechtigung über Jobcenter, Agentur für Arbeit oder BAMF',
        'B1 & B2: alle mit passenden Vorkenntnissen',
      ],
    },
    {
      icon: 'id-card',
      title: 'Was Sie mitbringen',
      items: [
        'Gültigen Ausweis oder Reisepass',
        'Berechtigungs- oder Verpflichtungsschein, falls vorhanden',
        'Aufenthaltstitel, falls vorhanden',
      ],
    },
  ],
  note: {
    title: 'Wichtig',
    text: 'Vor Kursbeginn ermitteln wir Ihr Sprachniveau mit einem kostenlosen Einstufungstest – so starten Sie im passenden Kurs.',
  },
  ...extra,
})

const faq: FaqItem[] = [
  {
    question: 'Was kostet ein Kurs?',
    answer:
      'Das hängt vom Kurs ab: Integrations- und Berufssprachkurse sind unter bestimmten Voraussetzungen kostenlos. Für die B1- und B2-Kurse nennen wir Ihnen die aktuellen Preise gerne persönlich.',
  },
  {
    question: 'Wann starten die Kurse?',
    answer:
      'Neue Kurse beginnen regelmäßig. Den nächsten passenden Starttermin nennen wir Ihnen nach dem Einstufungstest.',
  },
  {
    question: 'Wie finde ich mein Niveau heraus?',
    answer:
      'Mit einem kostenlosen Einstufungstest bei uns. Danach empfehlen wir Ihnen den passenden Kurs.',
  },
  {
    question: 'Ich habe noch keine Berechtigung – was nun?',
    answer: 'Kein Problem: Wir beraten Sie kostenlos und helfen Ihnen beim Antrag.',
  },
]

const finalExams: TabsBlock = {
  type: 'tabs',
  id: 'abschluss',
  eyebrow: 'Abschluss',
  title: 'Prüfungen am Ende des Integrationskurses',
  tabs: [
    {
      id: 'dtz',
      label: 'Deutsch-Test für Zuwanderer',
      heading: 'DTZ – Niveau A2 bis B1',
      text: 'Der Sprachkurs endet mit dem Deutsch-Test für Zuwanderer, den die g.a.s.t. im Auftrag des BAMF durchführt. Geprüft werden Hören, Lesen, Schreiben und Sprechen; das Ergebnis lautet A2 oder B1.',
      items: [
        'Schriftlich: Hören, Lesen und Schreiben',
        'Mündlich: meist zu zweit',
        'Ergebnis A2 oder B1',
        'Kostenlose Übungssätze der g.a.s.t.',
      ],
    },
    {
      id: 'lid',
      label: '„Leben in Deutschland“',
      heading: 'Test zum Orientierungskurs',
      text: 'Der Orientierungskurs endet mit dem Test „Leben in Deutschland“: 33 Fragen zu Demokratie, Geschichte und Gesellschaft.',
      items: [
        '33 Fragen mit je vier Antworten',
        'Bestanden ab 15 richtigen Antworten',
        'Ab 17 richtigen Antworten zählt er auch für die Einbürgerung',
      ],
    },
  ],
}

/* ───────────────────────── /kurse */

export const kursePage: ContentPage = {
  path: 'kurse',
  label: 'Kurse',
  seo: {
    title: 'Deutschkurse in Mainz – B1/B2, Berufssprachkurse, Integrationskurse',
    description:
      'Deutschkurse beim ABC e.V. in Mainz: B1- und B2-Prüfungsvorbereitung, Berufssprachkurse (BSK) und Integrationskurse – in kleinen Gruppen, mit kostenloser Beratung und telc Prüfung vor Ort.',
  },
  schema: 'Course',
  hero: {
    eyebrow: 'Kurse',
    title: 'Deutschkurse in Mainz',
    intro: 'Vom Integrationskurs bis zur B2-Prüfung – in kleinen Gruppen.',
    image: images.abcKursraum,
    facts: [
      { icon: 'book', label: 'Kurse', value: 'B1/B2 · BSK · Integration' },
      { icon: 'users', label: 'Gruppen', value: 'klein und persönlich' },
      { icon: 'award', label: 'Prüfung', value: 'telc direkt bei uns' },
      { icon: 'check', label: 'Beratung', value: 'kostenlos' },
    ],
    primaryCta: { label: 'Kurs finden', href: '#kurse' },
    secondaryCta: { label: 'Beratung anfragen', href: '#kontakt' },
  },
  blocks: [
    {
      type: 'cards',
      id: 'kurse',
      eyebrow: 'Unsere Kurse',
      title: 'Drei Wege zu Ihrem Ziel',
      variant: 'classic',
      cards: courseCards,
    },
    advantages,
    requirements(),
    {
      type: 'steps',
      id: 'so-gehts',
      eyebrow: 'So geht es los',
      title: 'In vier Schritten zu Ihrem Kurs',
      steps: [
        {
          title: 'Beratung',
          text: 'Sie rufen an, schreiben uns oder kommen in die Sprechstunde – wir besprechen Ihr Ziel.',
        },
        {
          title: 'Einstufung',
          text: 'Ein kostenloser Einstufungstest zeigt, auf welchem Niveau Sie einsteigen.',
        },
        {
          title: 'Kursstart',
          text: 'Sie lernen in kleinen Gruppen mit qualifizierten Lehrkräften.',
        },
        { title: 'Prüfung', text: 'Zum Abschluss legen Sie Ihre Prüfung direkt bei uns ab.' },
      ],
    },
    {
      type: 'faq',
      id: 'faq',
      eyebrow: 'Häufige Fragen',
      title: 'Fragen zu unseren Kursen',
      items: faq,
    },
    contact(
      'Wir finden gemeinsam den Kurs, der zu Ihrem Niveau und Ihrem Alltag passt.',
      CONTACT_EMAIL_COURSES,
    ),
    cta({
      title: 'Ihr Einstieg beginnt mit einem Gespräch',
      text: 'Vereinbaren Sie Ihren kostenlosen Einstufungstest – wir melden uns schnell zurück.',
      primary: { label: 'Einstufungstest vereinbaren', href: '#kontakt' },
      secondary: { label: 'telc Prüfungen', href: '/pruefungen/telc' },
    }),
  ],
}

/* ───────────────────────── /kurse/b1-b2 */

const b1b2Page: ContentPage = {
  path: 'kurse/b1-b2',
  label: 'B1 & B2',
  seo: {
    title: 'B1 & B2 Prüfungsvorbereitung und telc Prüfung in Mainz',
    description:
      'Deutschkurse B1 und B2 mit gezielter Vorbereitung auf die telc Prüfungen – Prüfung direkt beim ABC e.V. in Mainz, vor Ort und online.',
  },
  schema: 'Course',
  hero: {
    eyebrow: 'Kurs · B1 & B2',
    title: 'B1 & B2 – Prüfung und Vorbereitung',
    intro: 'Gezielt vorbereiten – und das Niveau mit einer telc Prüfung nachweisen.',
    facts: [
      { icon: 'level', label: 'Niveau', value: 'B1 und B2' },
      { icon: 'pen', label: 'Schwerpunkt', value: 'Prüfungstraining' },
      { icon: 'monitor', label: 'Format', value: 'Präsenz & online' },
      { icon: 'award', label: 'Abschluss', value: 'telc B1 oder B2' },
    ],
    primaryCta: { label: 'Beratung anfragen', href: '#kontakt' },
    secondaryCta: { label: 'Prüfungstermine', href: '/pruefungen/telc#termine' },
  },
  blocks: [
    {
      type: 'features',
      id: 'kurs',
      eyebrow: 'Prüfungsvorbereitung B1 & B2',
      title: 'Deutsch mit klarem Ziel und persönlichem Tempo',
      items: [
        {
          icon: 'level',
          title: 'B1 und B2',
          text: 'Gezielte Vorbereitung auf Alltag, Beruf und die telc Prüfungen B1 und B2.',
        },
        {
          icon: 'users',
          title: 'Kleine Gruppen',
          text: 'Persönliche Betreuung und viel Raum für Fragen und aktives Sprechen.',
        },
        {
          icon: 'award',
          title: 'Prüfung vor Ort',
          text: 'Modelltest unter Prüfungsbedingungen – und die echte Prüfung direkt bei uns.',
        },
      ],
    },
    {
      type: 'columns',
      id: 'inhalte',
      eyebrow: 'Kursinhalte',
      title: 'Was Sie lernen – und für wen der Kurs ist',
      columns: [
        {
          icon: 'book',
          title: 'Kursinhalte',
          items: [
            'Grammatik und Wortschatz auf B1- und B2-Niveau',
            'Diskussionen zu Alltags- und Berufsthemen',
            'Lese- und Hörverstehen mit echten Texten',
            'Briefe, E-Mails und Stellungnahmen schreiben',
            'Alle Teile der telc Prüfung mit Strategien und Tipps',
            'Modelltest unter Prüfungsbedingungen',
          ],
        },
        {
          icon: 'users',
          title: 'Für wen?',
          items: [
            'Lernende mit Grundkenntnissen, die sicher B1 erreichen möchten',
            'Lernende mit B1, die auf B2 aufbauen möchten',
            'Alle, die einen Nachweis für Einbürgerung, Ausbildung, Beruf oder Studium brauchen',
          ],
        },
      ],
    },
    {
      type: 'tabs',
      id: 'kursmodelle',
      eyebrow: 'Kursmodelle',
      title: 'So lernen Sie bei uns',
      tabs: [
        {
          id: 'flex',
          label: 'FLEX',
          heading: 'Abendkurs – zweimal pro Woche',
          text: 'Ideal neben Arbeit oder Familie: zwei Abende pro Woche in einer kleinen Gruppe.',
          items: ['6 Unterrichtsstunden pro Woche', 'Abends', 'Einstieg jeden Monat'],
        },
        {
          id: 'smart',
          label: 'SMART',
          heading: 'Abendkurs – dreimal pro Woche',
          text: 'Schneller vorankommen, ohne den Tag zu blockieren.',
          items: ['10 Unterrichtsstunden pro Woche', 'Abends', 'Einstieg jeden Monat'],
        },
        {
          id: 'intensiv',
          label: 'INTENSIV',
          heading: 'Intensivkurs – jeden Tag',
          text: 'Für alle, die schnell ein Niveau erreichen möchten.',
          items: [
            '20 Unterrichtsstunden pro Woche',
            'Montag bis Freitag',
            'Prüfung vor Ort möglich',
          ],
        },
        {
          id: 'einzel',
          label: 'Einzelunterricht',
          heading: 'Einzelunterricht – ganz flexibel',
          text: 'Eins zu eins mit Ihrer Lehrkraft, online über Zoom, zu Zeiten, die Ihnen passen. Auch zu zweit buchbar.',
          items: ['Flexible Zeiten', 'Online über Zoom', 'Individuelles Tempo'],
        },
      ],
    },
    {
      type: 'exam-levels',
      id: 'pruefung',
      eyebrow: 'Die Prüfung',
      title: 'telc Deutsch B1 und B2 im Überblick',
      levels: telcLevels(['b1', 'b2']),
    },
    { type: 'faq', id: 'faq', eyebrow: 'Häufige Fragen', title: 'Gut zu wissen', items: faq },
    contact(
      'Wir beraten Sie, welcher Kurs und welche Prüfung zu Ihrem Ziel passen.',
      CONTACT_EMAIL_COURSES,
    ),
    cta({
      title: 'Prüfungstermin sichern',
      text: 'Sehen Sie die nächsten telc Termine oder melden Sie sich direkt an.',
      primary: { label: 'Zur Anmeldung', href: '/pruefungen/telc#anmeldung' },
      secondary: { label: 'Alle Kurse', href: '/kurse' },
    }),
  ],
}

/* ───────────────────────── /kurse/bsk */

const bskPage: ContentPage = {
  path: 'kurse/bsk',
  label: 'Berufssprachkurse',
  seo: {
    title: 'Berufssprachkurse (BSK) nach DeuFöV in Mainz',
    description:
      'Berufsbezogene Deutschsprachförderung nach der DeuFöV beim ABC e.V. in Mainz – Deutsch für Arbeit und Ausbildung, unter bestimmten Voraussetzungen kostenlos.',
  },
  schema: 'Course',
  hero: {
    eyebrow: 'Kurs · Beruf',
    title: 'Berufssprachkurse (BSK)',
    intro: 'Deutsch für Arbeit und Ausbildung – aufbauend auf dem Integrationskurs.',
    facts: [
      { icon: 'award', label: 'Förderung', value: 'DeuFöV (BAMF)' },
      { icon: 'level', label: 'Zielniveau', value: 'je nach Kurs A2 bis C1' },
      { icon: 'euro', label: 'Kosten', value: 'oft kostenlos' },
      { icon: 'location', label: 'Ort', value: 'Mainz' },
    ],
    primaryCta: { label: 'Kostenlos beraten lassen', href: '#kontakt' },
    secondaryCta: { label: 'Alle Kurse', href: '/kurse' },
  },
  blocks: [
    {
      type: 'features',
      id: 'kurs',
      eyebrow: 'Berufsbezogene Deutschsprachförderung',
      title: 'Deutsch, das Sie im Beruf weiterbringt',
      items: [
        {
          icon: 'award',
          title: 'Gefördert',
          text: 'Berufssprachkurse nach der DeuFöV – unter bestimmten Voraussetzungen kostenlos.',
        },
        {
          icon: 'users',
          title: 'Starke Partner',
          text: 'Wir arbeiten mit der Bundesagentur für Arbeit, dem Jobcenter Mainz und dem BAMF zusammen.',
        },
        {
          icon: 'pen',
          title: 'Mit Abschluss',
          text: 'Am Ende steht eine Zertifikatsprüfung zum erreichten Niveau.',
        },
      ],
    },
    {
      type: 'columns',
      id: 'inhalte',
      eyebrow: 'Kursinhalte',
      title: 'Was Sie lernen – und wer teilnehmen kann',
      columns: [
        {
          icon: 'book',
          title: 'Kursinhalte',
          items: [
            'Textverstehen, Schreiben, Hören und Grammatik im beruflichen Kontext',
            'Bewerbung und Vorstellungsgespräch',
            'Berufsbilder, Arbeitsmarkt und Arbeitsalltag',
            'Diskussionen und Gespräche mit Kundschaft und Kollegium',
            'Telefonieren im Beruf',
          ],
        },
        {
          icon: 'users',
          title: 'Für wen?',
          items: [
            'Nach einem abgeschlossenen Integrationskurs',
            'Azubis und Ausbildungssuchende',
            'Arbeitsuchend Gemeldete, auch mit Bürgergeld oder Arbeitslosengeld',
            'Personen im Anerkennungsverfahren ihres Berufs- oder Ausbildungsabschlusses',
            'Alle, die für ihren Beruf sprachlich weiterkommen möchten',
          ],
        },
      ],
      note: {
        title: 'Kostenlos?',
        text: 'Unter bestimmten Voraussetzungen ist die Teilnahme kostenlos. Ihre Berechtigung erhalten Sie über Jobcenter, Agentur für Arbeit oder BAMF – wir beraten Sie gerne vorab.',
      },
    },
    {
      type: 'intro',
      id: 'unternehmen',
      eyebrow: 'Für Unternehmen',
      title: 'Deutschkurse für Ihr Team',
      paragraphs: [
        'Für Unternehmen organisieren wir Deutschkurse auch in den eigenen Räumen – angepasst an Arbeitszeiten und Bedürfnisse der Mitarbeitenden, zum Beispiel als Abend- oder Wochenendkurs.',
        'Die Kurse finden bei uns in Mainz oder an unseren weiteren Standorten statt.',
      ],
      points: [
        'Kurse im Unternehmen',
        'Flexible Zeiten',
        'Abend- und Wochenendkurse',
        'Individuelle Inhalte',
      ],
      reverse: true,
    },
    contact(
      'Sie möchten einen Berufssprachkurs besuchen oder haben Fragen zur Förderung? Wir beraten Sie kostenlos.',
      'bsk@abc-mainz.de',
    ),
    cta({
      title: 'Förderung klären, Kurs finden',
      text: 'Lassen Sie sich kostenlos beraten – wir klären mit Ihnen die Förderung.',
      primary: { label: 'Beratung anfragen', href: '#kontakt' },
      secondary: { label: 'Alle Kurse', href: '/kurse' },
    }),
  ],
}

/* ───────────────────────── /kurse/integrationskurse */

const integrationPage: ContentPage = {
  path: 'kurse/integrationskurse',
  label: 'Integrationskurse',
  seo: {
    title: 'Integrationskurse in Mainz und Bad Kreuznach',
    description:
      'Integrationskurse beim ABC e.V.: allgemeiner Integrationskurs, Jugendintegrationskurs und Integrationskurs mit Alphabetisierung – mit Kursaufbau, Kinderbeaufsichtigung und kostenloser Beratung.',
  },
  schema: 'Course',
  hero: {
    eyebrow: 'Kurs · Integration',
    title: 'Integrationskurse',
    intro: 'Sprachkurs und Orientierungskurs – für ein selbstständiges Leben in Deutschland.',
    facts: [
      { icon: 'book', label: 'Sprachkurs', value: '600 bis 900 UE' },
      { icon: 'users', label: 'Orientierungskurs', value: '100 UE' },
      { icon: 'award', label: 'Abschluss', value: 'DTZ & „Leben in Deutschland“' },
      { icon: 'child', label: 'Familie', value: 'Kinderbeaufsichtigung' },
    ],
    primaryCta: { label: 'Kostenlos beraten lassen', href: '#kontakt' },
    secondaryCta: { label: 'Kursaufbau', href: '#kursaufbau' },
  },
  blocks: [
    {
      type: 'course-types',
      id: 'kursaufbau',
      eyebrow: 'Kursaufbau',
      title: 'Unsere Integrationskurse',
      intro:
        'Jeder Integrationskurs besteht aus einem Sprachkurs und einem Orientierungskurs. 1 Unterrichtseinheit (UE) = 45 Minuten.',
      courses: [
        {
          id: 'allgemeiner-integrationskurs',
          icon: 'book',
          title: 'Allgemeiner Integrationskurs',
          hours: '600 UE Sprachkurs + 100 UE Orientierungskurs',
          summary:
            'Der Weg vom Einstieg bis zum Niveau B1 – mit Themen aus Alltag, Arbeit und Familie.',
          audience:
            'Zugewanderte mit keinen oder geringen Deutschkenntnissen, die das lateinische Alphabet lesen und schreiben können.',
          levels: ['A1', 'A2', 'B1'],
          contents: [
            '6 Sprachmodule à 100 UE (Basiskurs und Aufbaukurs)',
            'Orientierungskurs mit 100 UE',
            'Abschluss: DTZ und „Leben in Deutschland“',
            'Kinderbeaufsichtigung vor Ort möglich',
            'Je nach Situation kostenlos oder mit Kostenbeitrag',
          ],
          modules: [
            {
              badge: 'Modul 1',
              level: 'A1.1',
              text: 'Erste Schritte: sich vorstellen, nach etwas fragen, Zahlen und Uhrzeiten, Einkaufen.',
            },
            {
              badge: 'Modul 2',
              level: 'A1.2',
              text: 'Über Familie, Wohnung und Tagesablauf sprechen; kurze Texte lesen und schreiben.',
            },
            {
              badge: 'Modul 3',
              level: 'A2.1',
              text: 'Termine vereinbaren, Wege beschreiben, Formulare ausfüllen.',
            },
            {
              badge: 'Modul 4',
              level: 'A2.2',
              text: 'Von Erlebtem erzählen, beim Arzt und auf Ämtern sicher sprechen.',
            },
            {
              badge: 'Modul 5',
              level: 'B1.1',
              text: 'Meinungen begründen, über Arbeit, Ausbildung und Ziele sprechen.',
            },
            {
              badge: 'Modul 6',
              level: 'B1.2',
              text: 'Alle Fertigkeiten festigen und gezielt auf den DTZ vorbereiten.',
            },
            {
              badge: 'Orientierung',
              level: '100 UE',
              text: 'Rechtsordnung, Geschichte, Kultur und Werte in Deutschland – mit dem Test „Leben in Deutschland“.',
            },
          ],
        },
        {
          id: 'jugendintegrationskurs',
          icon: 'users',
          title: 'Jugendintegrationskurs',
          hours: '900 UE Sprachkurs + 100 UE Orientierungskurs',
          summary:
            'Deutsch lernen und Perspektiven gewinnen – mit Gleichaltrigen und Themen rund um Ausbildung und Beruf.',
          audience: 'Junge Menschen von 16 bis 26 Jahren, die nicht mehr schulpflichtig sind.',
          levels: ['A1', 'A2', 'B1'],
          contents: [
            'Kleine Gruppen mit 10 bis 15 Gleichaltrigen',
            'Themen wie die Bewerbung um einen Ausbildungsplatz',
            'Praxisphase im 8. Kursabschnitt',
            'Abschluss: DTZ und „Leben in Deutschland“',
          ],
          modulesIntro:
            'Wer schon Deutsch spricht, beginnt nach dem zweistufigen Einstufungstest in einem höheren Abschnitt.',
          modules: [
            {
              badge: 'Basiskurs',
              level: '300 UE',
              text: 'Grundlagen für den Alltag: sich verständigen, Fragen stellen, einfache Texte verstehen.',
            },
            {
              badge: 'Aufbaukurs A',
              level: '300 UE',
              text: 'Sicherer im Alltag und in der Schule oder Ausbildung – über Erfahrungen und Pläne sprechen.',
            },
            {
              badge: 'Aufbaukurs B',
              level: '300 UE',
              text: 'Auf dem Weg zu B1 – mit Praxisphase im 8. Kursabschnitt und Vorbereitung auf den DTZ.',
            },
            {
              badge: 'Orientierung',
              level: '100 UE',
              text: 'Leben in Deutschland: Rechte, Pflichten, Geschichte und Zusammenleben.',
            },
          ],
        },
        {
          id: 'integrationskurs-mit-alphabetisierung',
          icon: 'pen',
          title: 'Integrationskurs mit Alphabetisierung',
          hours: '900 UE Sprachkurs + 100 UE Orientierungskurs',
          summary:
            'Deutsch lernen und gleichzeitig lesen und schreiben lernen – nach einem besonderen Lernkonzept.',
          audience:
            'Zugewanderte, die lesen und schreiben lernen oder die lateinische Schrift neu lernen möchten.',
          levels: ['Alphabetisierung', 'A1', 'A2', 'B1'],
          contents: [
            'Kleine Gruppen mit 12 bis 15 Teilnehmenden',
            'Buchstaben, Laute und Wörter Schritt für Schritt',
            'Unter bestimmten Voraussetzungen zusätzliche UE beantragbar',
            'Abschluss: DTZ und „Leben in Deutschland“',
          ],
          modulesIntro:
            'Wer schon Deutsch spricht, beginnt nach dem zweistufigen Einstufungstest in einem höheren Abschnitt.',
          modules: [
            {
              badge: 'Basiskurs',
              level: '300 UE',
              text: 'Lesen und Schreiben aufbauen und erste Sätze für den Alltag lernen.',
            },
            {
              badge: 'Aufbaukurs A',
              level: '300 UE',
              text: 'Lesen und Schreiben festigen, Wortschatz und Alltagsgespräche erweitern.',
            },
            {
              badge: 'Aufbaukurs B',
              level: '300 UE',
              text: 'Selbstständiger sprechen und schreiben – Vorbereitung auf den DTZ.',
            },
            {
              badge: 'Orientierung',
              level: '100 UE',
              text: 'Leben in Deutschland: Rechte, Pflichten, Geschichte und Zusammenleben.',
            },
          ],
        },
      ],
    },
    {
      type: 'features',
      id: 'begleitung',
      eyebrow: 'Begleitung',
      title: 'Unterstützung im Kurs und im Alltag',
      items: [
        {
          icon: 'users',
          title: 'Lern- und Sozialbegleitung',
          text: 'Angebot des BAMF, bei uns seit 2018 – für über 50 Teilnehmende im Jahr.',
        },
        {
          icon: 'info',
          title: 'Beratung im Alltag',
          text: 'Über 200 Beratungen im Jahr: Wohnung, Gesundheit, Behörden.',
        },
        {
          icon: 'child',
          title: 'Kinderbeaufsichtigung',
          text: 'Betreuung vor Ort; die Kosten kann das BAMF übernehmen.',
        },
        {
          icon: 'award',
          title: 'Gefördert',
          text: 'Im ESF Plus-Programm, in Zusammenarbeit mit dem Amt für Jugend und Familie.',
        },
      ],
    },
    finalExams,
    requirements({ id: 'voraussetzungen' }),
    {
      type: 'faq',
      id: 'faq',
      eyebrow: 'Häufige Fragen',
      title: 'Fragen zum Integrationskurs',
      items: faq,
    },
    contact(
      'Sie suchen einen Integrationskurs oder haben schon eine Berechtigung? Wir beraten Sie kostenlos und finden den passenden Kurs.',
      'integration@abc-mainz.de',
    ),
    cta({
      title: 'Ihr Platz im nächsten Kurs',
      text: 'Vereinbaren Sie Ihren kostenlosen Einstufungstest – neue Kurse starten regelmäßig.',
      primary: { label: 'Einstufungstest vereinbaren', href: '#kontakt' },
      secondary: { label: 'Alle Kurse', href: '/kurse' },
    }),
  ],
}

export const kursSubpages: ContentPage[] = [b1b2Page, bskPage, integrationPage]
