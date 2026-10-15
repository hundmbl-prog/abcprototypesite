/**
 * Sprachkurse – content carried over from the current abc-mainz.de pages, without prices
 * (prices follow once confirmed) and without past start dates.
 */
import type { CardVariant, OfferCardData } from '@/components/cards/types'
import { images } from '../images'
import type { ContentImage, ContentPage, FaqItem, PageBlock } from '../types'
import { CONTACT_EMAIL_COURSES, contact, cta } from './shared'
import { telcExamCards } from './telc'

const courses: OfferCardData[] = [
  {
    id: 'a1-a2',
    title: 'Kurse für Anfänger (A1 & A2)',
    description:
      'Ohne oder mit wenig Vorkenntnissen starten: sich vorstellen, Fragen stellen, im Alltag zurechtkommen.',
    href: '/sprachkurse/a1-a2',
    image: images.abcWhiteboard,
    tag: 'Kurs',
    facts: { level: 'A1–A2', format: 'Präsenz & online', location: 'Mainz' },
  },
  {
    id: 'b1-b2',
    title: 'B1 & B2 Prüfungsvorbereitung',
    description:
      'Sicher in Alltag und Beruf – mit gezieltem Training für die telc Prüfungen B1 und B2.',
    href: '/sprachkurse/b1-b2',
    image: images.abcLernen,
    tag: 'Kurs',
    facts: { level: 'B1–B2', format: 'Präsenz & online', location: 'Mainz' },
  },
  {
    id: 'c1-c2',
    title: 'Kurse für Experten (C1 & C2)',
    description:
      'Anspruchsvolle Texte verstehen, diskutieren, präsentieren – Deutsch auf hohem Niveau.',
    href: '/sprachkurse/c1-c2',
    image: images.abcSeminarraum,
    tag: 'Kurs',
    facts: { level: 'C1–C2', location: 'Mainz' },
  },
  {
    id: 'c1-hochschule',
    title: 'C1 Hochschule – Studienvorbereitung',
    description:
      'Intensivkurs mit rund 20 Unterrichtseinheiten pro Woche und Prüfung „telc Deutsch C1 Hochschule“ vor Ort.',
    href: '/sprachkurse/c1-hochschule',
    image: images.qmSchulung,
    tag: 'Intensivkurs',
    facts: { level: 'C1', duration: '8 Wochen', location: 'Mainz' },
  },
  {
    id: 'berufssprachkurse',
    title: 'Berufssprachkurse (BSK)',
    description:
      'Deutsch für Arbeit und Ausbildung – gefördert nach der DeuFöV, unter bestimmten Voraussetzungen kostenlos.',
    href: '/sprachkurse/berufssprachkurse',
    image: images.sprachkurse,
    tag: 'Kurs',
    badge: 'kostenlos',
    facts: { level: 'A2–C1', location: 'Mainz' },
  },
  {
    id: 'schnupperkurs',
    title: 'Kostenloser Online-Schnupperkurs',
    description:
      'Lehrkräfte und Unterricht kennenlernen, bevor Sie sich anmelden – bequem von zu Hause.',
    href: '/sprachkurse/kostenloser-schnupperkurs',
    image: images.weiterbildung,
    tag: 'Online',
    badge: 'kostenlos',
    facts: { level: 'A1–A2, B2', format: 'Online über Zoom' },
  },
]

const related = (id: string, variant: CardVariant): PageBlock => ({
  type: 'cards',
  id: 'weitere-kurse',
  eyebrow: 'Weitere Kurse',
  title: 'Das könnte auch passen',
  variant,
  cards: courses.filter((c) => c.id !== id).slice(0, 3),
  cta: { label: 'Alle Sprachkurse', href: '/sprachkurse' },
})

const placementSteps: PageBlock = {
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
      text: 'Ein kurzer Einstufungstest zeigt, auf welchem Niveau Sie einsteigen.',
    },
    {
      title: 'Kursstart',
      text: 'Sie lernen in kleinen Gruppen mit qualifizierten und erfahrenen Lehrkräften.',
    },
    {
      title: 'Prüfung',
      text: 'Zum Abschluss legen Sie auf Wunsch eine telc Prüfung direkt bei uns ab.',
    },
  ],
  cta: { label: 'Beratung anfragen', href: '#kontakt' },
}

const commonFaq: FaqItem[] = [
  {
    question: 'Was kostet ein Kurs?',
    answer:
      'Die aktuellen Preise nennen wir Ihnen gerne persönlich – sie hängen vom Kursmodell und der Dauer ab. Für geförderte Kurse wie Integrations- oder Berufssprachkurse gelten eigene Regeln.',
  },
  {
    question: 'Wann starten die Kurse?',
    answer:
      'Neue Kurse beginnen regelmäßig. Den nächsten passenden Starttermin nennen wir Ihnen nach der Einstufung.',
  },
  {
    question: 'Wie finde ich mein Niveau heraus?',
    answer:
      'Mit einem kurzen Einstufungstest bei uns. Danach empfehlen wir Ihnen den passenden Kurs.',
  },
  {
    question: 'Kann ich online lernen?',
    answer:
      'Ja, viele Kurse bieten wir auch online über Zoom an. Ein Wechsel in den Präsenzunterricht in Mainz ist möglich.',
  },
]

function coursePage(page: {
  slug: string
  label: string
  seoTitle: string
  seoDescription: string
  eyebrow: string
  title: string
  intro: string
  image: ContentImage
  facts: ContentPage['hero']['facts']
  blocks: PageBlock[]
  relatedVariant: CardVariant
  faq?: FaqItem[]
}): ContentPage {
  return {
    path: `sprachkurse/${page.slug}`,
    label: page.label,
    seo: { title: page.seoTitle, description: page.seoDescription },
    schema: 'Course',
    hero: {
      eyebrow: page.eyebrow,
      title: page.title,
      intro: page.intro,
      image: page.image,
      facts: page.facts,
      primaryCta: { label: 'Beratung anfragen', href: '#kontakt' },
      secondaryCta: { label: 'Alle Sprachkurse', href: '/sprachkurse' },
    },
    blocks: [
      ...page.blocks,
      ...(page.faq
        ? [
            {
              type: 'faq',
              id: 'faq',
              eyebrow: 'Häufige Fragen',
              title: 'Gut zu wissen',
              items: page.faq,
            } satisfies PageBlock,
          ]
        : []),
      related(page.slug, page.relatedVariant),
      contact(
        'Wir finden gemeinsam den Kurs, der zu Ihrem Niveau und Ihrem Alltag passt.',
        CONTACT_EMAIL_COURSES,
      ),
    ],
  }
}

/* ───────────────────────── /sprachkurse */

export const sprachkursePage: ContentPage = {
  path: 'sprachkurse',
  label: 'Sprachkurse',
  seo: {
    title: 'Deutschkurse in Mainz – A1 bis C1 Hochschule',
    description:
      'Deutschkurse beim ABC e.V. in Mainz: von A1 bis C1 Hochschule, Prüfungsvorbereitung, Berufssprachkurse und kostenloser Online-Schnupperkurs – in kleinen Gruppen, vor Ort und online.',
  },
  schema: 'Course',
  hero: {
    eyebrow: 'Sprachkurse',
    title: 'Deutsch lernen in Mainz',
    intro:
      'Von den ersten Wörtern bis zum Studium: Kurse in kleinen Gruppen, mit erfahrenen Lehrkräften – vor Ort und online.',
    image: images.abcUnterricht,
    facts: [
      { icon: 'level', label: 'Niveaus', value: 'A1 bis C1 Hochschule' },
      { icon: 'users', label: 'Gruppen', value: 'klein und persönlich' },
      { icon: 'monitor', label: 'Format', value: 'Präsenz & online' },
      { icon: 'award', label: 'Abschluss', value: 'telc Prüfung vor Ort' },
    ],
    primaryCta: { label: 'Kurs finden', href: '#kurse' },
    secondaryCta: { label: 'Beratung anfragen', href: '#kontakt' },
  },
  blocks: [
    {
      type: 'cards',
      id: 'kurse',
      eyebrow: 'Unsere Kurse',
      title: 'Für jedes Niveau der passende Kurs',
      intro:
        'Als telc-zertifizierte Sprachschule bieten wir Deutschkurse von A1 bis C1 Hochschule – und auf Wunsch die Prüfung gleich dazu.',
      variant: 'bento',
      cards: courses,
    },
    {
      type: 'tabs',
      id: 'kursmodelle',
      eyebrow: 'Kursmodelle',
      title: 'So lernen Sie bei uns',
      intro:
        'Wählen Sie das Modell, das zu Ihrem Alltag passt. Aktuelle Zeiten und Starttermine nennen wir Ihnen gerne.',
      tabs: [
        {
          id: 'flex',
          label: 'FLEX',
          heading: 'Abendkurs – zweimal pro Woche',
          text: 'Ideal neben Arbeit oder Familie: Sie lernen an zwei Abenden pro Woche in einer kleinen Gruppe.',
          items: [
            '6 Unterrichtsstunden pro Woche',
            'Abends',
            'Anfänger bis Fortgeschrittene (A1–B2)',
            'Einstieg jeden Monat',
          ],
        },
        {
          id: 'smart',
          label: 'SMART',
          heading: 'Abendkurs – dreimal pro Woche',
          text: 'Schneller vorankommen, ohne den Tag zu blockieren: drei Abende pro Woche in kleinen Gruppen.',
          items: [
            '10 Unterrichtsstunden pro Woche',
            'Abends',
            'Anfänger bis Fortgeschrittene (A1–B2)',
            'Einstieg jeden Monat',
          ],
        },
        {
          id: 'intensiv',
          label: 'INTENSIV',
          heading: 'Intensivkurs – jeden Tag',
          text: 'Für alle, die schnell ein Niveau erreichen möchten, zum Beispiel vor einem Studium.',
          items: [
            '20 Unterrichtsstunden pro Woche',
            'Montag bis Freitag',
            'A1 bis C1',
            'Prüfung vor Ort möglich',
          ],
        },
        {
          id: 'einzel',
          label: 'Einzelunterricht',
          heading: 'Einzelunterricht – ganz flexibel',
          text: 'Eins zu eins mit Ihrer Lehrkraft, online über Zoom, zu Zeiten, die Ihnen passen. Auch zu zweit buchbar.',
          items: [
            'Flexible Zeiten',
            'Online über Zoom',
            'Individuelles Tempo',
            'Flexibel verlängerbar',
          ],
        },
      ],
    },
    placementSteps,
    {
      type: 'faq',
      id: 'faq',
      eyebrow: 'Häufige Fragen',
      title: 'Fragen zu unseren Sprachkursen',
      items: commonFaq,
    },
    contact(
      'Wir finden gemeinsam den Kurs, der zu Ihrem Niveau und Ihrem Alltag passt.',
      CONTACT_EMAIL_COURSES,
    ),
    cta({
      title: 'Kurs gefunden? Dann ab zur Prüfung.',
      text: 'Als lizenziertes telc Prüfungszentrum nehmen wir Ihre Prüfung direkt bei uns ab.',
      primary: { label: 'telc Prüfungen', href: '/pruefungen/telc' },
      secondary: { label: 'Prüfungstermine', href: '/pruefungen/telc#termine' },
    }),
  ],
}

/* ───────────────────────── /sprachkurse/[kurs] */

export const sprachkursSubpages: ContentPage[] = [
  coursePage({
    slug: 'a1-a2',
    label: 'A1 & A2',
    seoTitle: 'Deutschkurse für Anfänger in Mainz (A1 & A2)',
    seoDescription:
      'Deutsch lernen ohne Vorkenntnisse: Anfängerkurse A1 und A2 beim ABC e.V. in Mainz – in kleinen Gruppen, vor Ort und online.',
    eyebrow: 'Sprachkurs · A1 & A2',
    title: 'Deutsch für Anfänger',
    intro:
      'Sie haben keine oder geringe Vorkenntnisse? Hier lernen Sie Schritt für Schritt, sich im Alltag zu verständigen.',
    image: images.abcWhiteboard,
    facts: [
      { icon: 'level', label: 'Niveau', value: 'A1 und A2' },
      { icon: 'users', label: 'Gruppen', value: 'klein' },
      { icon: 'monitor', label: 'Format', value: 'Präsenz & online' },
      { icon: 'award', label: 'Abschluss', value: 'telc A1 oder A2 möglich' },
    ],
    relatedVariant: 'classic',
    faq: commonFaq,
    blocks: [
      {
        type: 'tabs',
        id: 'niveaus',
        eyebrow: 'Kursinhalte',
        title: 'Was Sie lernen',
        tabs: [
          {
            id: 'a1',
            label: 'Niveau A1',
            heading: 'Der Einstieg',
            text: 'Sie lernen, einfache Informationen mündlich und schriftlich zu erfragen, sich vorzustellen und anderen Fragen zu stellen. Sie verständigen sich auf einfache Art, wenn Ihr Gegenüber langsam und deutlich spricht.',
            items: [
              'Nach dem Weg fragen und Wege beschreiben',
              'Auskünfte erfragen und geben',
              'Über Wohnung und Haushalt sprechen',
              'Menschen beschreiben',
              'Form, Größe und Farbe benennen',
              'Wünsche im Alltag ausdrücken',
            ],
          },
          {
            id: 'a2',
            label: 'Niveau A2',
            heading: 'Sicherer im Alltag',
            text: 'Sie verständigen sich im Alltag, lesen einfache Texte und erzählen von Herkunft und Ausbildung. Sie entnehmen einfachen Texten Informationen und geben einfache Auskünfte.',
            items: [
              'Schule und Karriere',
              'Nachrichten und Berichte',
              'Länder und Leute',
              'Sport und Gesundheit',
              'Berufswelt',
              'Kultur und Freizeit',
            ],
          },
        ],
      },
      placementSteps,
      {
        type: 'cards',
        id: 'pruefungen',
        eyebrow: 'Abschluss',
        title: 'Die passende Prüfung',
        variant: 'horizontal',
        cards: telcExamCards().filter((c) => c.id === 'a1' || c.id === 'a2'),
      },
    ],
  }),
  coursePage({
    slug: 'b1-b2',
    label: 'B1 & B2',
    seoTitle: 'B1 & B2 Prüfungsvorbereitung in Mainz',
    seoDescription:
      'Deutschkurse B1 und B2 mit gezielter Vorbereitung auf die telc Prüfungen – beim ABC e.V. in Mainz, vor Ort und online.',
    eyebrow: 'Sprachkurs · B1 & B2',
    title: 'B1 & B2 Prüfungsvorbereitung',
    intro:
      'Sie kommen im Alltag zurecht und möchten sicherer werden – und Ihr Niveau mit einer Prüfung nachweisen.',
    image: images.abcLernen,
    facts: [
      { icon: 'level', label: 'Niveau', value: 'B1 und B2' },
      { icon: 'pen', label: 'Schwerpunkt', value: 'Prüfungstraining' },
      { icon: 'monitor', label: 'Format', value: 'Präsenz & online' },
      { icon: 'award', label: 'Abschluss', value: 'telc B1 oder B2' },
    ],
    relatedVariant: 'overlay',
    faq: commonFaq,
    blocks: [
      {
        type: 'tabs',
        id: 'niveaus',
        eyebrow: 'Kursinhalte',
        title: 'Was Sie lernen',
        tabs: [
          {
            id: 'b1',
            label: 'Niveau B1',
            heading: 'Zusammenhängend sprechen',
            text: 'Sie vertiefen Ihre Grundkenntnisse und bewältigen die meisten Alltagssituationen. Sie sprechen über vertraute Themen, Ziele und Wünsche und begründen Ihre Meinung. Der Unterricht ist kommunikativ und wird durch Grammatik ergänzt.',
            items: [
              'An einfachen Diskussionen teilnehmen',
              'Zeitungsartikel verstehen',
              'Über Einkaufen, Familie, Reisen und Arbeit sprechen',
              'Prüfungsteile von telc Deutsch B1 üben',
            ],
          },
          {
            id: 'b2',
            label: 'Niveau B2',
            heading: 'Komplexe Themen erörtern',
            text: 'Sie üben Lesen, Schreiben und das mündliche Erörtern komplexer Themen. Die Grammatik wird in anspruchsvolleren Zusammenhängen angewendet, und Sie übernehmen einen Großteil des Sprechens im Unterricht.',
            items: [
              'Persönliche und formelle Briefe schreiben',
              'Bilder beschreiben und Vermutungen äußern',
              'Die eigene Meinung begründen',
              'Prüfungsteile von telc Deutsch B2 üben',
            ],
          },
          {
            id: 'training',
            label: 'Prüfungstraining',
            heading: 'Gezielt zur Prüfung',
            text: 'Sie lernen alle Teile der telc Prüfung kennen, üben mit echten Aufgaben und schreiben zum Abschluss einen Modelltest unter Prüfungsbedingungen.',
            items: [
              'Alle Prüfungsteile im Überblick',
              'Strategien und Tipps',
              'Modelltest unter Prüfungsbedingungen',
              'Prüfung direkt bei uns',
            ],
          },
        ],
      },
      {
        type: 'cards',
        id: 'pruefungen',
        eyebrow: 'Abschluss',
        title: 'Die passende Prüfung',
        variant: 'horizontal',
        cards: telcExamCards().filter((c) => c.id === 'b1' || c.id === 'b2'),
      },
      placementSteps,
    ],
  }),
  coursePage({
    slug: 'c1-c2',
    label: 'C1 & C2',
    seoTitle: 'Deutschkurse C1 & C2 in Mainz',
    seoDescription:
      'Deutsch auf hohem Niveau: Kurse C1 und C2 beim ABC e.V. in Mainz – Texte interpretieren, diskutieren, präsentieren.',
    eyebrow: 'Sprachkurs · C1 & C2',
    title: 'Deutsch auf hohem Niveau',
    intro:
      'Sie beherrschen Deutsch bereits gut und möchten sich zu fast jedem Thema klar, flüssig und genau ausdrücken.',
    image: images.abcSeminarraum,
    facts: [
      { icon: 'level', label: 'Niveau', value: 'C1 und C2' },
      { icon: 'book', label: 'Schwerpunkt', value: 'Texte & Diskussion' },
      { icon: 'location', label: 'Ort', value: 'Mainz' },
      { icon: 'award', label: 'Abschluss', value: 'telc C1 möglich' },
    ],
    relatedVariant: 'classic',
    blocks: [
      {
        type: 'tabs',
        id: 'niveaus',
        eyebrow: 'Kursinhalte',
        title: 'Was Sie lernen',
        tabs: [
          {
            id: 'c1',
            label: 'Niveau C1',
            heading: 'Zwischen den Zeilen lesen',
            text: 'Sie lesen lange, komplexe Texte aus Literatur, Wissenschaft und Forschung, interpretieren sie und tauschen sich darüber aus. Im Unterricht wird diskutiert, beraten und präsentiert; Sie schreiben regelmäßig eigene Texte.',
            items: [
              'Gesellschaft und Ratgeber',
              'Literatur und Theater',
              'Psychologie',
              'Wissenschaft und Forschung',
              'Kunst und Kultur',
            ],
          },
          {
            id: 'c2',
            label: 'Niveau C2',
            heading: 'Nahezu muttersprachlich',
            text: 'Sie verstehen praktisch alles mühelos, fassen Informationen aus verschiedenen Quellen zusammen und drücken auch feine Bedeutungsunterschiede spontan, flüssig und genau aus.',
            items: [
              'Informationen zusammenfassen',
              'Zusammenhängend argumentieren',
              'Feine Bedeutungsnuancen',
              'Spontan und präzise sprechen',
            ],
          },
        ],
      },
      placementSteps,
    ],
  }),
  coursePage({
    slug: 'c1-hochschule',
    label: 'C1 Hochschule',
    seoTitle: 'C1 Hochschule Intensivkurs in Mainz – Studienvorbereitung',
    seoDescription:
      'Studienvorbereitender Intensivkurs C1 Hochschule beim ABC e.V. in Mainz, rund 20 Unterrichtseinheiten pro Woche, Prüfung telc Deutsch C1 Hochschule direkt vor Ort.',
    eyebrow: 'Intensivkurs · Studienvorbereitung',
    title: 'C1 Hochschule',
    intro:
      'Der studienvorbereitende Intensivkurs mit der Prüfung „telc Deutsch C1 Hochschule“ – direkt bei uns als offiziellem telc Hochschulkompetenzzentrum.',
    image: images.qmSchulung,
    facts: [
      { icon: 'level', label: 'Voraussetzung', value: 'Niveau C1 vorhanden' },
      { icon: 'clock', label: 'Dauer', value: '8 Wochen' },
      { icon: 'calendar', label: 'Umfang', value: 'ca. 20 UE pro Woche' },
      { icon: 'award', label: 'Abschluss', value: 'telc C1 Hochschule' },
    ],
    relatedVariant: 'overlay',
    blocks: [
      {
        type: 'intro',
        id: 'kurs',
        eyebrow: 'Der Kurs',
        title: 'Sprachlich bereit fürs Studium',
        paragraphs: [
          'Im Zentrum stehen alle Fertigkeiten im akademischen Kontext: Leseverstehen an wissenschaftlichen und gesellschaftlichen Themen, Hörverstehen mit Notizen zu Vorträgen und das Schreiben von Beschreibungen, Vergleichen, Kommentaren, Stellungnahmen und Zusammenfassungen.',
          'Sie lernen alle Teile der telc Prüfung kennen, trainieren Prüfungsstrategien mit vielen Aufgaben und schreiben zum Abschluss einen Modelltest unter Prüfungsbedingungen.',
        ],
        points: [
          'Alle Lernmaterialien inklusive',
          'Kleine Gruppen',
          'Prüfung direkt vor Ort',
          'Einstieg mit Niveau C1',
        ],
        image: images.abcSeminarraum,
      },
      {
        type: 'columns',
        id: 'visum',
        eyebrow: 'Studium in Deutschland',
        title: 'Mit Studierenden- oder Studienbewerbervisum',
        columns: [
          {
            icon: 'award',
            title: 'Offiziell anerkannt',
            items: [
              'Zertifiziertes telc Hochschulprüfungszentrum',
              'Offizielles telc Hochschulkompetenzzentrum',
              'Prüfung telc Deutsch C1 Hochschule vor Ort',
            ],
          },
          {
            icon: 'book',
            title: 'Ohne C1? Kein Problem',
            items: [
              'Einstieg auch auf niedrigerem Niveau möglich',
              'Komplettbuchung von A1 bis C1 Hochschule möglich',
              'Wir begleiten Sie bis zur Prüfung',
            ],
          },
          {
            icon: 'mail',
            title: 'Fragen zu Kurs und Visum',
            items: [
              'Schreiben Sie uns an sprachkurse@abc-mainz.de',
              'Welche Sprachnachweise Ihre Hochschule verlangt, steht in den Zulassungsbedingungen',
            ],
          },
        ],
      },
      {
        type: 'links',
        id: 'informationen',
        eyebrow: 'Informationen',
        title: 'Offizielle Informationen zu Studium und Visum',
        links: [
          {
            label: 'Studium in Deutschland (BAMF)',
            href: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Bildung/Studium/studium-node.html',
            description: 'Aufenthalt zum Studium – Voraussetzungen und Ablauf.',
            kind: 'Website',
          },
          {
            label: 'Aufenthalt für einen Sprachkurs (BAMF)',
            href: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Bildung/Sprachkurs/sprachkurs-node.html',
            description: 'Anforderungen an Sprachkurse für das Visum.',
            kind: 'Website',
          },
          {
            label: 'telc Deutsch C1 Hochschule',
            href: '/pruefungen/telc/telc-deutsch-c1-hochschule',
            description: 'Aufbau, Dauer und Übungstest der Prüfung.',
          },
        ],
      },
    ],
  }),
  coursePage({
    slug: 'berufssprachkurse',
    label: 'Berufssprachkurse',
    seoTitle: 'Berufssprachkurse (DeuFöV) in Mainz',
    seoDescription:
      'Berufsbezogene Deutschsprachförderung nach der DeuFöV beim ABC e.V. in Mainz – Deutsch für Arbeit und Ausbildung, unter bestimmten Voraussetzungen kostenlos.',
    eyebrow: 'Sprachkurs · Beruf',
    title: 'Berufssprachkurse',
    intro:
      'Deutsch für Arbeit und Ausbildung: Aufbauend auf dem Integrationskurs bereiten die Berufssprachkurse auf die Arbeitswelt in Deutschland vor.',
    image: images.sprachkurse,
    facts: [
      { icon: 'level', label: 'Niveau', value: 'je nach Kurs' },
      { icon: 'award', label: 'Förderung', value: 'DeuFöV' },
      { icon: 'euro', label: 'Kosten', value: 'oft kostenlos' },
      { icon: 'location', label: 'Ort', value: 'Mainz' },
    ],
    relatedVariant: 'classic',
    blocks: [
      {
        type: 'intro',
        id: 'kurs',
        eyebrow: 'Der Kurs',
        title: 'Deutsch für den Beruf',
        paragraphs: [
          'Als telc-zertifizierte Sprachschule arbeiten wir mit der Bundesagentur für Arbeit, dem Jobcenter Mainz und dem Bundesamt für Migration und Flüchtlinge zusammen. In den Basiskursen erwerben Sie berufsübergreifende Deutschkenntnisse anhand von Inhalten aus der Arbeitswelt.',
          'Der Kurs schließt mit einer Zertifikatsprüfung ab. Für Unternehmen organisieren wir auf Wunsch auch Deutschkurse in den eigenen Räumen – passend zu den Arbeitszeiten.',
        ],
        points: [
          'Bewerbung und Vorstellungsgespräch',
          'Berufsbilder und Arbeitsalltag',
          'Gespräche mit Kundschaft und Kollegium',
          'Telefonieren im Beruf',
        ],
        image: images.sprachkurse,
      },
      {
        type: 'columns',
        id: 'voraussetzungen',
        eyebrow: 'Teilnahme',
        title: 'Wer kann teilnehmen?',
        columns: [
          {
            icon: 'users',
            title: 'Sie können teilnehmen, wenn Sie …',
            items: [
              'einen Integrationskurs abgeschlossen haben',
              'in Ausbildung sind oder eine Ausbildung suchen',
              'arbeitsuchend gemeldet sind',
              'Bürgergeld oder Arbeitslosengeld erhalten',
              'für Ihren Beruf eine sprachliche Weiterqualifizierung brauchen',
            ],
          },
          {
            icon: 'level',
            title: 'Sprachliche Voraussetzung',
            items: [
              'Abgeschlossener Integrationskurs und/oder Deutschkenntnisse auf A1 bis C1',
              'Für Kurse mit Ziel A2 oder B1: vorheriger Integrationskurs mit Deutsch-Test für Zuwanderer',
            ],
          },
        ],
        note: {
          title: 'Kostenlos?',
          text: 'Unter bestimmten Voraussetzungen ist die Teilnahme kostenlos. Wenden Sie sich dafür an Ihr Jobcenter, die Agentur für Arbeit oder das BAMF – wir beraten Sie gerne vorab.',
        },
      },
      {
        type: 'links',
        id: 'informationen',
        eyebrow: 'Informationen',
        title: 'Offizielle Informationen',
        links: [
          {
            label: 'Deutsch für den Beruf (BAMF)',
            href: 'https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/DeutschBeruf/deutsch-beruf-node.html',
            description: 'Alles zu den Berufssprachkursen beim Bundesamt.',
            kind: 'Website',
          },
        ],
      },
    ],
  }),
  coursePage({
    slug: 'kostenloser-schnupperkurs',
    label: 'Schnupperkurs',
    seoTitle: 'Kostenloser Online-Schnupperkurs Deutsch',
    seoDescription:
      'Unseren Online-Deutschkurs kostenlos und unverbindlich testen – für Anfänger (A1 & A2) und Fortgeschrittene (B2). Warteliste beim ABC e.V. Mainz.',
    eyebrow: 'Online · kostenlos',
    title: 'Kostenloser Online-Schnupperkurs',
    intro:
      'Lernen Sie unsere Lehrkräfte und den Unterricht kennen, bevor Sie sich für einen Kurs anmelden – bequem von zu Hause.',
    image: images.weiterbildung,
    facts: [
      { icon: 'level', label: 'Niveaus', value: 'A1–A2 und B2' },
      { icon: 'monitor', label: 'Format', value: 'Online über Zoom' },
      { icon: 'euro', label: 'Kosten', value: 'kostenlos' },
      { icon: 'calendar', label: 'Termine', value: 'Warteliste' },
    ],
    relatedVariant: 'overlay',
    blocks: [
      {
        type: 'intro',
        id: 'kurs',
        eyebrow: 'Online lernen',
        title: 'Warum online bei uns?',
        paragraphs: [
          'Im Schnupperkurs erleben Sie, wie unser Online-Unterricht funktioniert: in der Gruppe, mit einer qualifizierten Lehrkraft und nah an der Praxis.',
          'Zurzeit sind keine neuen Termine geplant. Tragen Sie sich in die Warteliste ein – wir benachrichtigen Sie, sobald neue Termine feststehen.',
        ],
        points: [
          'Hohe Lernintensität durch täglichen Unterricht',
          'Lernen in der Gruppe motiviert',
          'Virtuelles Klassenzimmer',
          'Wechsel in den Präsenzunterricht möglich',
        ],
        image: images.weiterbildung,
      },
      {
        type: 'columns',
        id: 'technik',
        eyebrow: 'Technik',
        title: 'Das brauchen Sie',
        columns: [
          {
            icon: 'monitor',
            title: 'Gerät',
            items: ['Computer, Laptop oder Smartphone', 'Stabile Internetverbindung'],
          },
          { icon: 'mic', title: 'Ton und Bild', items: ['Headset', 'Webcam'] },
        ],
        note: {
          title: 'Warteliste',
          text: 'Schreiben Sie uns an sprachkurse@abc-mainz.de – wir melden uns, sobald neue Schnupperkurs-Termine feststehen.',
        },
      },
    ],
  }),
]
