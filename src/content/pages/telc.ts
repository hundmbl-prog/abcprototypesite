/**
 * telc pages. Exam formats, durations and links are taken from the official telc.net product pages
 * and the telc Prüfungsregularien (gültig ab 15.04.2025), checked on 15.10.2026.
 */
import type { OfferCardData } from '@/components/cards/types'
import { images } from '../images'
import { telcExams } from '../exams'
import type { ContentImage, ContentPage, ExamPart, ResourceLink } from '../types'
import { CONTACT_EMAIL_GENERAL, contact, cta, telcLinks } from './shared'

type ExamInfo = {
  id: string
  image: ContentImage
  /** One sentence for cards. */
  short: string
  /** Who the exam is for. */
  about: string[]
  written: ExamPart[]
  breakMinutes?: number
  oral: { minutes: number; format: string; preparation?: string; text: string }
  formats: string
  productUrl: string
  mockUrl: string
}

const MOCK = 'https://www.telc.net/fileadmin/user_upload/mock_exams/Deutsch'

const info: ExamInfo[] = [
  {
    id: 'a1',
    image: images.abcWhiteboard,
    short: 'Erste Deutschkenntnisse nachweisen – einfache Gespräche, kurze Texte, Formulare.',
    about: [
      'Start Deutsch 1 / telc Deutsch A1 bestätigt erste Deutschkenntnisse: sich vorstellen, einfache Fragen stellen und beantworten, kurze Texte und Formulare verstehen.',
      'Kenntnisse auf Niveau A1 werden zum Beispiel für den Ehegattennachzug verlangt. Welche Prüfung im Einzelfall anerkannt wird, entscheidet die zuständige Stelle – fragen Sie im Zweifel dort nach.',
    ],
    written: [
      {
        name: 'Hören',
        minutes: 20,
        text: 'Drei Teile mit kurzen Gesprächen, Ansagen und Durchsagen.',
      },
      {
        name: 'Lesen und Schreiben',
        minutes: 45,
        text: 'Drei Leseteile und zwei Schreibteile, z. B. ein Formular ausfüllen und eine kurze Nachricht schreiben.',
      },
    ],
    oral: {
      minutes: 15,
      format: 'Gruppe, meist 4 Personen',
      preparation: 'Keine Vorbereitungszeit',
      text: 'Sie stellen sich vor, stellen Fragen zu Alltagsthemen und formulieren Bitten.',
    },
    formats: 'Papierprüfung',
    productUrl:
      'https://www.telc.net/sprachpruefungen/zertifikatspruefung/deutsch/start-deutsch-1-/-telc-deutsch-a1/',
    mockUrl: `${MOCK}/telc_deutsch_a1.zip`,
  },
  {
    id: 'a2',
    image: images.abcTafel,
    short: 'Grundlegende Deutschkenntnisse für Alltag und Beruf – der Schritt in Richtung B1.',
    about: [
      'Start Deutsch 2 / telc Deutsch A2 bestätigt grundlegende Deutschkenntnisse: Sie verständigen sich in vertrauten Alltagssituationen, verstehen kurze Texte und schreiben einfache Mitteilungen.',
      'Die Prüfung ist ein guter Zwischenschritt auf dem Weg zum Zertifikat Deutsch (B1).',
    ],
    written: [
      {
        name: 'Hören',
        minutes: 20,
        text: 'Kurze Gespräche, Ansagen und Radiomeldungen aus dem Alltag.',
      },
      {
        name: 'Lesen und Schreiben',
        minutes: 50,
        text: 'Drei Leseteile und zwei Schreibteile mit alltäglichen Texten und Mitteilungen.',
      },
    ],
    oral: {
      minutes: 15,
      format: 'Meist zu zweit',
      text: 'Sie stellen Fragen und geben Auskunft, erzählen von sich und planen gemeinsam etwas.',
    },
    formats: 'Papierprüfung',
    productUrl: 'https://www.telc.net/sprachpruefungen/deutsch/start-deutsch-2-telc-deutsch-a2/',
    mockUrl: `${MOCK}/telc_deutsch_a2_01.zip`,
  },
  {
    id: 'b1',
    image: images.abcLernen,
    short: 'Selbstständige Sprachverwendung im Alltag – das „Zertifikat Deutsch“.',
    about: [
      'Das Zertifikat Deutsch / telc Deutsch B1 bestätigt, dass Sie sich in den meisten Alltagssituationen sicher verständigen, über Erfahrungen berichten und Ihre Meinung begründen können.',
      'Deutschkenntnisse auf Niveau B1 sind zum Beispiel für die Einbürgerung nachzuweisen. Welche Nachweise im Einzelfall anerkannt werden, entscheidet die zuständige Behörde.',
    ],
    written: [
      {
        name: 'Lesen und Sprachbausteine',
        minutes: 90,
        text: 'Texte verstehen und Lücken mit passenden Wörtern und Strukturen füllen.',
      },
      { name: 'Hören', minutes: 30, text: 'Radiosendungen, Ansagen und Gespräche verstehen.' },
      {
        name: 'Schreiben',
        minutes: 30,
        text: 'Einen persönlichen oder halbformellen Brief schreiben.',
      },
    ],
    oral: {
      minutes: 15,
      format: 'Zu zweit',
      preparation: '20 Minuten',
      text: 'Kontaktaufnahme, Gespräch über ein Thema und gemeinsam etwas planen.',
    },
    formats: 'Digital, hybrid oder auf Papier',
    productUrl: 'https://www.telc.net/sprachpruefungen/deutsch/zertifikat-deutsch-telc-deutsch-b1/',
    mockUrl: `${MOCK}/telc_deutsch_b1.zip`,
  },
  {
    id: 'b2',
    image: images.abcKursraum,
    short: 'Komplexere Texte verstehen und sich spontan und fließend verständigen.',
    about: [
      'telc Deutsch B2 bestätigt, dass Sie auch komplexere Texte verstehen und sich spontan und fließend verständigen – im Alltag, in der Ausbildung und im Beruf.',
      'Viele Ausbildungen, Berufe und Anerkennungsverfahren setzen Deutschkenntnisse auf Niveau B2 voraus. Welche Prüfung gefordert ist, erfahren Sie bei der jeweiligen Stelle.',
    ],
    written: [
      {
        name: 'Lesen und Sprachbausteine',
        minutes: 90,
        text: 'Längere Texte verstehen und Sprachbausteine sicher anwenden.',
      },
      { name: 'Hören', minutes: 20, text: 'Nachrichten, Interviews und Gespräche verstehen.' },
      {
        name: 'Schreiben',
        minutes: 30,
        text: 'Einen formellen oder halbformellen Brief schreiben.',
      },
    ],
    oral: {
      minutes: 15,
      format: 'Zu zweit',
      preparation: '20 Minuten',
      text: 'Präsentation, Diskussion und gemeinsames Lösen einer Aufgabe.',
    },
    formats: 'Digital, hybrid oder auf Papier',
    productUrl:
      'https://www.telc.net/sprachpruefungen/zertifikatspruefung/deutsch/telc-deutsch-b2/',
    mockUrl: `${MOCK}/telc_deutsch_b2.zip`,
  },
  {
    id: 'c1',
    image: images.abcSeminarraum,
    short: 'Fachkundige Sprachverwendung für anspruchsvolle Aufgaben in Beruf und Gesellschaft.',
    about: [
      'telc Deutsch C1 bestätigt, dass Sie anspruchsvolle, längere Texte verstehen und sich klar, strukturiert und ausführlich zu komplexen Themen äußern.',
      'Das Zertifikat eignet sich für Berufe mit hohen sprachlichen Anforderungen. Für ein Studium wählen Sie in der Regel telc Deutsch C1 Hochschule.',
    ],
    written: [
      {
        name: 'Lesen und Sprachbausteine',
        minutes: 90,
        text: 'Anspruchsvolle Texte verstehen und Sprachbausteine sicher anwenden.',
      },
      { name: 'Hören', minutes: 40, text: 'Vorträge, Interviews und Diskussionen verstehen.' },
      {
        name: 'Schreiben',
        minutes: 70,
        text: 'Einen strukturierten Text zu einem anspruchsvollen Thema verfassen.',
      },
    ],
    breakMinutes: 20,
    oral: {
      minutes: 16,
      format: 'Zu zweit',
      preparation: '20 Minuten',
      text: 'Präsentation eines Themas und Diskussion mit der Prüfungspartnerin oder dem Prüfungspartner.',
    },
    formats: 'Digital, hybrid oder auf Papier',
    productUrl:
      'https://www.telc.net/sprachpruefungen/zertifikatspruefung/deutsch/telc-deutsch-c1/',
    mockUrl: `${MOCK}/telc_deutsch_c1.zip`,
  },
  {
    id: 'c1-hochschule',
    image: images.qmSchulung,
    short:
      'Die Prüfung für den Hochschulzugang – direkt bei uns als telc Hochschulkompetenzzentrum.',
    about: [
      'telc Deutsch C1 Hochschule ist die Prüfung für den Hochschulzugang: Sie weist nach, dass Sie wissenschaftlichen Texten und Vorträgen folgen und sich im Studium sicher ausdrücken können.',
      'Viele Hochschulen erkennen die Prüfung an. Welche Nachweise Ihre Hochschule verlangt, steht in den Zulassungsbedingungen – fragen Sie im Zweifel dort nach. Als offizielles telc Hochschulkompetenzzentrum bieten wir den passenden Vorbereitungskurs.',
    ],
    written: [
      {
        name: 'Lesen und Sprachbausteine',
        minutes: 90,
        text: 'Wissenschaftliche und gesellschaftliche Texte verstehen.',
      },
      { name: 'Hören', minutes: 40, text: 'Einem Vortrag folgen und Notizen anfertigen.' },
      {
        name: 'Schreiben',
        minutes: 70,
        text: 'Einen argumentativen Text im akademischen Stil schreiben.',
      },
    ],
    breakMinutes: 20,
    oral: {
      minutes: 16,
      format: 'Zu zweit',
      preparation: '20 Minuten',
      text: 'Präsentation eines Themas und anschließende Diskussion.',
    },
    formats: 'Digital, hybrid oder auf Papier',
    productUrl:
      'https://www.telc.net/sprachpruefungen/zertifikatspruefung/deutsch/telc-deutsch-c1-hochschule/',
    mockUrl: `${MOCK}/telc_deutsch_c1_hochschule.zip`,
  },
]

const writtenMinutes = (e: ExamInfo) => e.written.reduce((s, p) => s + p.minutes, 0)

export function telcExamCards(excludeId?: string): OfferCardData[] {
  return info
    .filter((e) => e.id !== excludeId)
    .map((e) => {
      const exam = telcExams.find((x) => x.id === e.id)!
      return {
        id: e.id,
        title: exam.name,
        description: e.short,
        href: `/pruefungen/telc/${exam.slug}`,
        image: e.image,
        tag: 'Prüfung',
        facts: {
          level: exam.level,
          duration: `ca. ${writtenMinutes(e) + e.oral.minutes} Min.`,
          location: 'Mainz',
        },
        ctaLabel: 'Zur Prüfung',
      }
    })
}

const examDayColumns = [
  {
    icon: 'id-card' as const,
    title: 'Mitbringen',
    items: [
      'Gültigen amtlichen Lichtbildausweis – ohne Ausweis keine Teilnahme',
      'Bleistift, Kugelschreiber, Radiergummi und Anspitzer',
      'Getränke in durchsichtigen Flaschen ohne Etikett',
    ],
  },
  {
    icon: 'close' as const,
    title: 'Nicht erlaubt',
    items: [
      'Handy, Smartwatch und Armbanduhr – werden vorher abgegeben',
      'Taschen und Jacken am Platz',
      'Wörterbücher, Notizen und andere Hilfsmittel',
    ],
  },
  {
    icon: 'clock' as const,
    title: 'Pünktlich sein',
    items: [
      'Wer nach Beginn der Prüfungsbelehrung kommt, kann nicht mehr teilnehmen',
      'Der Ausweis liegt während der Prüfung sichtbar auf dem Tisch',
      'Schriftliche und mündliche Prüfung finden höchstens 7 Tage auseinander statt',
    ],
  },
]

/* ───────────────────────── /pruefungen/telc */

export const telcPage: ContentPage = {
  path: 'pruefungen/telc',
  label: 'telc Prüfungen',
  seo: {
    title: 'telc Prüfungen in Mainz – A1 bis C1 Hochschule',
    description:
      'Offizielle telc Deutschprüfungen von A1 bis C1 Hochschule am lizenzierten Prüfungszentrum des ABC e.V. in Mainz: Prüfungstermine, Ablauf, Gebühren, FAQ und Anmeldung.',
  },
  schema: 'Exam',
  hero: {
    eyebrow: 'Lizenziertes telc Prüfungszentrum',
    title: 'telc Prüfungen in Mainz',
    intro:
      'Offizielle Deutschprüfungen von A1 bis C1 Hochschule – mit persönlicher Beratung, gut vorbereitet und in vertrauter Umgebung.',
    image: images.abcTelc,
    facts: [
      { icon: 'level', label: 'Niveaus', value: 'A1 bis C1 Hochschule' },
      { icon: 'award', label: 'Anbieter', value: 'telc gGmbH' },
      { icon: 'location', label: 'Prüfungsort', value: 'ABC Mainz' },
      { icon: 'clock', label: 'Ergebnis', value: 'nach ca. 4–6 Wochen' },
    ],
    primaryCta: { label: 'Prüfungstermine', href: '/pruefungen/telc#termine' },
    secondaryCta: { label: 'Zur Anmeldung', href: '/pruefungen/telc#anmeldung' },
  },
  blocks: [
    {
      type: 'intro',
      id: 'pruefungszentrum',
      eyebrow: 'Über das Prüfungszentrum',
      title: 'Ihre Prüfung bei Menschen, die Sie kennen',
      paragraphs: [
        'Das Akademische Bildungs-Center ist ein von der telc gGmbH lizenziertes Prüfungszentrum und offizielles telc Hochschulkompetenzzentrum. Sie legen Ihre Prüfung direkt bei uns in Mainz ab – dort, wo Sie vielleicht auch Ihren Kurs besucht haben.',
        'Wir beraten Sie, welche Prüfung Sie für Ihr Ziel brauchen, und begleiten Sie von der Anmeldung bis zum Zertifikat.',
      ],
      points: [
        'Offizielle telc Zertifikate',
        'Beratung zur passenden Prüfung',
        'Vorbereitungskurse im eigenen Haus',
        'Kleine Prüfungsgruppen',
      ],
      image: images.abcTelc,
    },
    {
      type: 'cards',
      id: 'pruefungen',
      eyebrow: 'Prüfungen',
      title: 'Welche Prüfung möchten Sie ablegen?',
      intro:
        'Wählen Sie Ihr Niveau – auf jeder Seite finden Sie Aufbau, Dauer und kostenlose Übungstests.',
      variant: 'rail',
      filterBy: 'level',
      cards: telcExamCards(),
    },
    {
      type: 'exam-dates',
      id: 'termine',
      eyebrow: 'Prüfungstermine',
      title: 'Nächste Prüfungstermine',
      intro:
        'Filtern Sie nach Prüfung und Ort. Mit „Anmelden“ übernehmen Sie den Termin direkt ins Anmeldeformular.',
      emptyText:
        'Sobald neue Prüfungstermine feststehen, veröffentlichen wir sie hier. Gerne nennen wir Ihnen den nächsten Termin für Ihre Prüfung persönlich.',
    },
    {
      type: 'fees',
      id: 'gebuehren',
      eyebrow: 'Gebühren',
      title: 'Was kostet die Prüfung?',
      intro:
        'Die Prüfungsgebühr legt jedes Prüfungszentrum selbst fest. Die aktuelle Gebühr für Ihre Prüfung nennen wir Ihnen gerne.',
      rows: telcExams.map((exam) => ({
        label: exam.name,
        value: 'auf Anfrage',
        note: exam.partialRetake ? 'Teilprüfung möglich' : undefined,
      })),
      officialFees: [
        { label: 'Überprüfung des Ergebnisses', value: '40 €' },
        { label: 'Zweitschrift des Zertifikats', value: '40 €' },
        { label: 'Nachträgliche Anrechnung einer Teilprüfung', value: '40 €' },
      ],
      note: 'Diese Gebühren erhebt die telc gGmbH laut Prüfungsordnung (gültig ab 15.04.2025).',
    },
    {
      type: 'steps',
      id: 'so-melden-sie-sich-an',
      eyebrow: 'Anmeldung',
      title: 'So melden Sie sich an',
      steps: [
        {
          title: 'Prüfung wählen',
          text: 'Wählen Sie Ihre Prüfung und einen Termin – wir beraten Sie gerne, welches Niveau zu Ihrem Ziel passt.',
        },
        {
          title: 'Anmelden',
          text: 'Melden Sie sich mit dem Formular, telefonisch oder persönlich an. Ihr Name muss genau wie im Ausweis geschrieben sein.',
        },
        {
          title: 'Gebühr bezahlen',
          text: 'Nach der Anmeldung erhalten Sie alle Informationen zur Prüfungsgebühr und zur Zahlung.',
        },
        {
          title: 'Vorbereiten',
          text: 'Üben Sie mit den kostenlosen Übungstests der telc gGmbH oder in unseren Vorbereitungskursen.',
        },
        {
          title: 'Prüfung ablegen',
          text: 'Kommen Sie pünktlich mit gültigem amtlichem Lichtbildausweis.',
        },
        {
          title: 'Zertifikat erhalten',
          text: 'Das Ergebnis liegt meist nach 4 bis 6 Wochen vor. Wir informieren Sie, sobald es da ist.',
        },
      ],
    },
    {
      type: 'columns',
      id: 'pruefungstag',
      eyebrow: 'Am Prüfungstag',
      title: 'Gut vorbereitet zur Prüfung',
      intro: 'Diese Regeln gelten laut Prüfungsordnung der telc gGmbH für alle Prüfungen.',
      columns: examDayColumns,
    },
    {
      type: 'faq',
      id: 'faq',
      eyebrow: 'Häufige Fragen',
      title: 'Fragen zu telc Prüfungen',
      intro: 'Ihre Frage ist nicht dabei? Rufen Sie uns an oder schreiben Sie uns.',
      items: [
        {
          question: 'Wann bekomme ich mein Ergebnis?',
          answer:
            'In der Regel liegt das Ergebnis nach 4 bis 6 Wochen vor. Sobald wir es von der telc gGmbH erhalten, geben wir es innerhalb von zwei Wochen an Sie weiter.',
        },
        {
          question: 'Wie lange ist das Zertifikat gültig?',
          answer:
            'Auf telc Zertifikaten steht kein Ablaufdatum. Ob ein älteres Zertifikat anerkannt wird, entscheidet die Stelle, bei der Sie es vorlegen.',
        },
        {
          question: 'Kann ich nur einen Teil der Prüfung wiederholen?',
          answer:
            'Bei telc Deutsch B1, B2, C1 und C1 Hochschule ja: Sie wiederholen innerhalb von 12 Monaten nur den schriftlichen oder nur den mündlichen Teil. Bitte geben Sie das bei der Anmeldung an. Bei A1 und A2 ist nur die ganze Prüfung möglich.',
        },
        {
          question: 'Wie oft darf ich eine Prüfung wiederholen?',
          answer: 'So oft Sie möchten. Jedes Ergebnis bleibt gültig.',
        },
        {
          question: 'Mein Name ist falsch geschrieben – was nun?',
          answer:
            'Der Name auf dem Zertifikat richtet sich nach Ihrem Ausweis. Eine Korrektur ist innerhalb von 4 Monaten möglich – sprechen Sie uns an.',
        },
        {
          question: 'Ich bin mit meinem Ergebnis nicht einverstanden.',
          answer:
            'Innerhalb von 6 Wochen können Sie eine Überprüfung des Ergebnisses beantragen. Die telc gGmbH berechnet dafür 40 €.',
        },
        {
          question: 'Ich habe mein Zertifikat verloren.',
          answer:
            'Innerhalb von 10 Jahren stellt die telc gGmbH eine Zweitschrift aus (40 €). Wir helfen Ihnen beim Antrag.',
        },
        {
          question: 'Ist der Deutsch-Test für Zuwanderer (DTZ) eine telc Prüfung?',
          answer:
            'Nein, nicht mehr: Der DTZ ist die Abschlussprüfung des Integrationskurses und wird seit 2023 von der g.a.s.t. im Auftrag des BAMF durchgeführt. Alles dazu finden Sie bei unseren Integrationskursen.',
        },
      ],
    },
    {
      type: 'links',
      id: 'offizielle-informationen',
      eyebrow: 'Offizielle Informationen',
      title: 'Alles direkt von telc',
      links: [telcLinks.overview, telcLinks.faq, telcLinks.rules, telcLinks.verify],
    },
    {
      type: 'telc-registration',
      id: 'anmeldung',
      eyebrow: 'Anmeldung',
      title: 'Zur Prüfung anmelden',
      intro: 'Füllen Sie das Formular aus – wir melden uns mit allen Details zu Termin und Gebühr.',
    },
    contact(
      'Sie sind unsicher, welche Prüfung Sie brauchen? Wir beraten Sie gerne persönlich oder am Telefon.',
      CONTACT_EMAIL_GENERAL,
    ),
  ],
}

/* ───────────────────────── /pruefungen/telc/[exam] */

export const telcExamPages: ContentPage[] = info.map((e) => {
  const exam = telcExams.find((x) => x.id === e.id)!
  const links: ResourceLink[] = [
    {
      label: `Übungstest ${exam.level}`,
      href: e.mockUrl,
      description: 'Kostenloser Modelltest der telc gGmbH mit Lösungen und Audiodateien.',
      kind: 'ZIP',
    },
    {
      label: 'Prüfung bei telc',
      href: e.productUrl,
      description: `Offizielle Informationen zu ${exam.name}.`,
      kind: 'Website',
    },
    telcLinks.rules,
  ]
  return {
    path: `pruefungen/telc/${exam.slug}`,
    label: exam.level === 'C1 Hochschule' ? 'C1 Hochschule' : `telc ${exam.level}`,
    seo: {
      title: `${exam.name} in Mainz – Aufbau, Termine, Anmeldung`,
      description: `${exam.name} am ABC Mainz: ${e.short} Aufbau der Prüfung, Dauer, kostenloser Übungstest und Anmeldung.`,
    },
    schema: 'Exam',
    hero: {
      eyebrow: `telc Prüfung · Niveau ${exam.level}`,
      title: exam.name,
      intro: e.short,
      image: e.image,
      facts: [
        { icon: 'level', label: 'Niveau', value: exam.level },
        { icon: 'pen', label: 'Schriftlich', value: `ca. ${writtenMinutes(e)} Min.` },
        { icon: 'mic', label: 'Mündlich', value: `ca. ${e.oral.minutes} Min.` },
        { icon: 'monitor', label: 'Format', value: e.formats },
      ],
      primaryCta: { label: 'Termin finden', href: '/pruefungen/telc#termine' },
      secondaryCta: { label: 'Jetzt anmelden', href: '/pruefungen/telc#anmeldung' },
    },
    blocks: [
      {
        type: 'intro',
        id: 'fuer-wen',
        eyebrow: 'Für wen?',
        title: 'Das bestätigt die Prüfung',
        paragraphs: e.about,
        points: [
          'Offizielles telc Zertifikat',
          exam.partialRetake
            ? 'Teilprüfung innerhalb von 12 Monaten möglich'
            : 'Wiederholung nur als ganze Prüfung',
          'Prüfung direkt am ABC in Mainz',
          'Ergebnis nach ca. 4–6 Wochen',
        ],
        image: e.image,
      },
      {
        type: 'exam-structure',
        id: 'aufbau',
        eyebrow: 'Aufbau',
        title: 'So läuft die Prüfung ab',
        intro:
          'Fahren Sie mit der Maus über einen Prüfungsteil, um ihn in der Zeitleiste hervorzuheben.',
        written: e.written,
        breakMinutes: e.breakMinutes,
        oral: e.oral,
        notes: [
          'Bei Bestehen erhalten Sie ein Zertifikat, sonst einen Ergebnisbogen.',
          exam.partialRetake
            ? 'Haben Sie nur einen Teil bestanden, wiederholen Sie innerhalb von 12 Monaten nur den anderen Teil.'
            : 'Eine Teilprüfung ist bei diesem Niveau nicht möglich – Sie wiederholen die ganze Prüfung.',
          'Einzelne Prüfungsteile (z. B. nur „Hören“) können nicht wiederholt werden.',
          'Sie können die Prüfung beliebig oft ablegen; jedes Ergebnis bleibt gültig.',
        ],
      },
      {
        type: 'columns',
        id: 'pruefungstag',
        eyebrow: 'Am Prüfungstag',
        title: 'Das sollten Sie wissen',
        columns: examDayColumns,
      },
      {
        type: 'links',
        id: 'vorbereitung',
        eyebrow: 'Vorbereitung',
        title: 'Kostenlos üben mit dem Original',
        intro: 'Der Übungstest der telc gGmbH entspricht in Aufbau und Dauer der echten Prüfung.',
        links,
      },
      {
        type: 'cards',
        id: 'weitere-pruefungen',
        eyebrow: 'Weitere Prüfungen',
        title: 'Andere Niveaus',
        variant: 'classic',
        cards: telcExamCards(e.id).slice(0, 3),
        cta: { label: 'Alle telc Prüfungen', href: '/pruefungen/telc' },
      },
      cta({
        title: `Bereit für ${exam.level}?`,
        text: 'Sehen Sie die nächsten Termine oder melden Sie sich direkt an – wir beraten Sie gerne.',
        primary: { label: 'Jetzt anmelden', href: '/pruefungen/telc#anmeldung' },
        secondary: { label: 'Prüfungstermine', href: '/pruefungen/telc#termine' },
      }),
    ],
  }
})
