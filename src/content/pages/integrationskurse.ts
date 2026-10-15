/**
 * Integrationskurse – content carried over from the current abc-mainz.de pages. Final exams updated:
 * the DTZ is run by g.a.s.t. on behalf of the BAMF (no longer by telc). Course dates from 2023 are
 * not carried over; current start dates are given on request.
 */
import type { CardVariant, OfferCardData } from '@/components/cards/types'
import { images } from '../images'
import type { ContentImage, ContentPage, FaqItem, PageBlock, ResourceLink } from '../types'
import { contact, cta } from './shared'

const kinds: OfferCardData[] = [
  {
    id: 'allgemeine',
    title: 'Allgemeiner Integrationskurs',
    description:
      'Sprachkurs in sechs Modulen und Orientierungskurs – mit Kinderbeaufsichtigung vor Ort.',
    href: '/integrationskurse/allgemeine',
    image: images.abcUnterricht,
    tag: 'Integrationskurs',
    facts: { level: 'A1–B1', duration: '700 UE', location: 'Mainz & Bad Kreuznach' },
  },
  {
    id: 'jugendintegrationskurse',
    title: 'Jugendintegrationskurs',
    description:
      'Deutsch lernen und Perspektiven gewinnen – für junge Menschen von 16 bis 26 Jahren.',
    href: '/integrationskurse/jugendintegrationskurse',
    image: images.jugendErfolg,
    tag: 'Integrationskurs',
    facts: { level: 'A1–B1', duration: 'bis 1.000 UE', location: 'Mainz' },
  },
  {
    id: 'alphabetisierung',
    title: 'Integrationskurs mit Alphabetisierung',
    description:
      'Deutsch lernen und gleichzeitig lesen und schreiben lernen – nach besonderem Lernkonzept.',
    href: '/integrationskurse/alphabetisierung',
    image: images.abcTafel,
    tag: 'Integrationskurs',
    facts: { level: 'A1–B1', duration: 'bis 1.000 UE', location: 'Mainz' },
  },
  {
    id: 'lern-und-sozialbegleitung',
    title: 'Lern- und Sozialbegleitung',
    description:
      'Unterstützung beim selbstständigen Lernen und bei Fragen des Alltags – ein Angebot des BAMF.',
    href: '/integrationskurse/lern-und-sozialbegleitung',
    image: images.paedagogik,
    tag: 'Begleitung',
    facts: { location: 'Mainz' },
  },
  {
    id: 'termine',
    title: 'Kurstermine',
    description: 'Neue Kurse starten regelmäßig – wir nennen Ihnen den nächsten passenden Termin.',
    href: '/integrationskurse/termine',
    image: images.abcKursraum,
    tag: 'Termine',
    facts: { location: 'Mainz & Bad Kreuznach' },
  },
]

/** Official links, checked on 15.10.2026. */
const officialLinks: ResourceLink[] = [
  {
    label: 'Integrationskurse beim BAMF',
    href: 'https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/integrationskurse-node.html',
    description: 'Alles zu Ablauf, Berechtigung und Kosten.',
    kind: 'Website',
  },
  {
    label: 'Abschlussprüfungen (BAMF)',
    href: 'https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/Abschlusspruefung/abschlusspruefung-node.html',
    description: 'Deutsch-Test für Zuwanderer und Test „Leben in Deutschland“.',
    kind: 'Website',
  },
  {
    label: 'DTZ auf einen Blick (g.a.s.t.)',
    href: 'https://www.gast.de/de/forschung-entwicklung/entwicklung/auftraege/deutsch-test-fuer-zuwanderer-dtz/der-dtz-auf-einen-blick',
    description: 'Aufbau und Bewertung des Deutsch-Tests für Zuwanderer.',
    kind: 'Website',
  },
  {
    label: 'DTZ Übungssatz 1',
    href: 'https://www.gast.de/fileadmin/gast.de/GAST/5_DTZ/PDF/gast_DTZ_UEbungssatz_1.pdf',
    description: 'Kostenloser offizieller Übungssatz.',
    kind: 'PDF',
  },
  {
    label: 'DTZ Übungssatz 1 – Hören',
    href: 'https://www.gast.de/fileadmin/gast.de/GAST/5_DTZ/Audio/gast_Deutsch-Test_fuer_Zuwanderer_UEbungssatz_1.mp3',
    description: 'Die Audiodatei zum Übungssatz.',
    kind: 'MP3',
  },
  {
    label: 'Mustertest „Leben in Deutschland“',
    href: 'https://oet.bamf.de/ords/oetut/f?p=532',
    description: 'Online üben für den Test am Ende des Orientierungskurses.',
    kind: 'Online-Test',
  },
]

const finalExams: PageBlock = {
  type: 'tabs',
  id: 'aufbau',
  eyebrow: 'Aufbau',
  title: 'Sprachkurs, Orientierungskurs, Abschluss',
  tabs: [
    {
      id: 'sprachkurs',
      label: 'Sprachkurs',
      heading: 'Deutsch für das Leben in Deutschland',
      text: 'Im Sprachkurs lernen Sie Deutsch für wichtige Bereiche des Alltags. Außerdem üben Sie, Briefe und E-Mails zu schreiben, Formulare auszufüllen, zu telefonieren und sich zu bewerben.',
      items: [
        'Arbeit und Beruf',
        'Aus- und Weiterbildung',
        'Freizeit und soziale Kontakte',
        'Gesundheit',
        'Betreuung und Erziehung von Kindern',
        'Medien, Einkaufen und Wohnen',
      ],
    },
    {
      id: 'orientierung',
      label: 'Orientierungskurs',
      heading: '100 Unterrichtseinheiten über Deutschland',
      text: 'Im Anschluss an den Sprachkurs lernen Sie die deutsche Rechtsordnung, Geschichte und Kultur kennen – und die Werte, die in Deutschland wichtig sind.',
      items: [
        'Rechtsordnung, Geschichte und Kultur',
        'Rechte und Pflichten',
        'Formen des Zusammenlebens',
        'Religionsfreiheit, Toleranz und Gleichberechtigung',
      ],
    },
    {
      id: 'abschluss',
      label: 'Abschlussprüfungen',
      heading: 'DTZ und „Leben in Deutschland“',
      text: 'Der Sprachkurs endet mit dem Deutsch-Test für Zuwanderer (DTZ, Niveau A2 bis B1), den die g.a.s.t. im Auftrag des BAMF durchführt. Der Orientierungskurs endet mit dem Test „Leben in Deutschland“.',
      items: [
        'DTZ: Hören, Lesen, Schreiben und Sprechen',
        'Ergebnis A2 oder B1',
        '„Leben in Deutschland“: 33 Fragen',
        'Bestanden ab 15 richtigen Antworten (Orientierungskurs)',
      ],
    },
  ],
}

const faq: FaqItem[] = [
  {
    question: 'Wer darf einen Integrationskurs besuchen?',
    answer:
      'Das hängt von Ihrem Aufenthaltsstatus ab. Manche sind zur Teilnahme verpflichtet, andere können freiwillig teilnehmen. Informationen und Förderungen erhalten Sie bei der Ausländerbehörde, beim Jobcenter oder beim BAMF – wir helfen Ihnen beim Antrag.',
  },
  {
    question: 'Was kostet der Integrationskurs?',
    answer:
      'Je nach Situation ist der Kurs kostenlos oder Sie zahlen einen Kostenbeitrag pro Unterrichtseinheit. Wir beraten Sie kostenlos, was in Ihrem Fall gilt.',
  },
  {
    question: 'Was ist der Einstufungstest?',
    answer:
      'Vor dem Kurs ermitteln wir mit einem zweistufigen Einstufungstest (schriftlich und mündlich) Ihre Deutschkenntnisse. Wer schon Deutsch spricht, kann in einem höheren Modul beginnen.',
  },
  {
    question: 'Kann mein Kind betreut werden?',
    answer:
      'Ja, wir bieten eine integrationskursbegleitende Kinderbeaufsichtigung vor Ort. Fragen Sie bitte schon bei der Anmeldung nach freien Plätzen.',
  },
  {
    question: 'Ich habe noch keine Zulassung – was nun?',
    answer: 'Kein Problem: Wir beraten Sie kostenlos und helfen Ihnen beim Antrag.',
  },
]

function ikPage(page: {
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
}): ContentPage {
  return {
    path: `integrationskurse/${page.slug}`,
    label: page.label,
    seo: { title: page.seoTitle, description: page.seoDescription },
    schema: 'Course',
    hero: {
      eyebrow: page.eyebrow,
      title: page.title,
      intro: page.intro,
      image: page.image,
      facts: page.facts,
      primaryCta: { label: 'Kostenlos beraten lassen', href: '#kontakt' },
      secondaryCta: { label: 'Alle Integrationskurse', href: '/integrationskurse' },
    },
    blocks: [
      ...page.blocks,
      {
        type: 'cards',
        id: 'weitere-kurse',
        eyebrow: 'Weitere Angebote',
        title: 'Das könnte auch passen',
        variant: page.relatedVariant,
        cards: kinds.filter((k) => k.id !== page.slug).slice(0, 3),
        cta: { label: 'Alle Integrationskurse', href: '/integrationskurse' },
      },
      contact(
        'Sie suchen einen Integrationskurs oder haben schon eine Berechtigung? Wir beraten Sie kostenlos und finden den passenden Kurs.',
      ),
    ],
  }
}

const childcare: PageBlock = {
  type: 'intro',
  id: 'kinderbeaufsichtigung',
  eyebrow: 'Kinderbeaufsichtigung',
  title: 'Lernen, während Ihr Kind betreut wird',
  paragraphs: [
    'Während Sie am Unterricht teilnehmen, betreut unser qualifiziertes Personal Ihr Kind direkt vor Ort gemeinsam mit anderen Kindern. Dabei arbeiten wir eng mit dem Amt für Jugend und Familie in Mainz zusammen.',
    'Die Kosten können nach bewilligtem Antrag vom BAMF übernommen werden. Fragen Sie bitte schon bei der Anmeldung nach freien Plätzen.',
  ],
  points: [
    'Betreuung vor Ort',
    'Qualifiziertes Personal',
    'Kosten können übernommen werden',
    'Gefördert im ESF Plus-Programm',
  ],
  image: images.kindertagespflege,
  reverse: true,
}

/* ───────────────────────── /integrationskurse */

export const integrationskursePage: ContentPage = {
  path: 'integrationskurse',
  label: 'Integrationskurse',
  seo: {
    title: 'Integrationskurse in Mainz und Bad Kreuznach',
    description:
      'Integrationskurse beim ABC e.V.: allgemeine Integrationskurse, Jugendintegrationskurse und Alphabetisierungskurse mit Kinderbeaufsichtigung – kostenlose Beratung in Mainz und Bad Kreuznach.',
  },
  schema: 'Course',
  hero: {
    eyebrow: 'Integrationskurse',
    title: 'Sprache und Kultur kennenlernen',
    intro:
      'Seit über 25 Jahren begleiten wir Menschen auf dem Weg in ein selbstständiges Leben in Deutschland – mit Sprachkurs, Orientierungskurs und persönlicher Beratung.',
    image: images.abcKursraum,
    facts: [
      { icon: 'book', label: 'Sprachkurs', value: '600 UE in 6 Modulen' },
      { icon: 'users', label: 'Orientierungskurs', value: '100 UE' },
      { icon: 'award', label: 'Abschluss', value: 'DTZ & „Leben in Deutschland“' },
      { icon: 'child', label: 'Familie', value: 'Kinderbeaufsichtigung' },
    ],
    primaryCta: { label: 'Kostenlos beraten lassen', href: '#kontakt' },
    secondaryCta: { label: 'Kurstermine', href: '/integrationskurse/termine' },
  },
  blocks: [
    {
      type: 'intro',
      id: 'was-ist',
      eyebrow: 'Was ist ein Integrationskurs?',
      title: 'Deutsch lernen und Deutschland verstehen',
      paragraphs: [
        'Wer in Deutschland lebt, braucht die deutsche Sprache – bei der Arbeitssuche, bei Anträgen, in der Schule der Kinder oder um neue Menschen kennenzulernen. Jeder Integrationskurs besteht aus einem Sprachkurs und einem Orientierungskurs.',
        'Vor dem Kurs ermitteln wir mit einem Einstufungstest Ihre Deutschkenntnisse. In unseren Kursen kommen Menschen aus vielen Nationen zusammen, die ein Ziel teilen: am Leben in Deutschland teilzuhaben und selbstständig zu handeln.',
      ],
      points: [
        'Kostenlose Beratung',
        'Hilfe beim Antrag',
        'Qualifizierte Lehrkräfte',
        'Nah am Mainzer Hauptbahnhof',
      ],
      image: images.abcUnterricht,
    },
    {
      type: 'cards',
      id: 'kursarten',
      eyebrow: 'Kursarten',
      title: 'Unsere Integrationskurse',
      intro:
        'Bei uns lassen Sie sich kostenlos beraten und melden sich danach für den passenden Kurs an.',
      variant: 'overlay',
      cards: kinds,
    },
    finalExams,
    {
      type: 'steps',
      id: 'so-gehts',
      eyebrow: 'So geht es los',
      title: 'Ihr Weg in den Kurs',
      steps: [
        {
          title: 'Berechtigung klären',
          text: 'Ausländerbehörde, Jobcenter oder BAMF stellen Ihre Berechtigung oder Verpflichtung aus. Noch keine? Wir helfen beim Antrag.',
        },
        {
          title: 'Beratung',
          text: 'Kommen Sie mit Ihren Unterlagen in unsere Sprechstunde – die Beratung ist kostenlos.',
        },
        {
          title: 'Einstufungstest',
          text: 'Ein zweistufiger Test (schriftlich und mündlich) zeigt, in welchem Modul Sie beginnen.',
        },
        {
          title: 'Kursstart',
          text: 'Sie lernen in Ihrer Gruppe – auf Wunsch mit Kinderbeaufsichtigung.',
        },
      ],
    },
    childcare,
    {
      type: 'faq',
      id: 'faq',
      eyebrow: 'Häufige Fragen',
      title: 'Fragen zum Integrationskurs',
      items: faq,
    },
    {
      type: 'links',
      id: 'informationen',
      eyebrow: 'Offizielle Informationen',
      title: 'Informationen und Übungsmaterial',
      links: officialLinks,
    },
    contact(
      'Sie suchen einen Integrationskurs oder haben schon eine Berechtigung? Wir beraten Sie kostenlos und finden den passenden Kurs.',
    ),
    cta({
      title: 'Bereit für den nächsten Kurs?',
      text: 'Neue Kurse starten regelmäßig. Wir nennen Ihnen den nächsten passenden Termin.',
      primary: { label: 'Kurstermine', href: '/integrationskurse/termine' },
      secondary: { label: 'Prüfungen', href: '/pruefungen' },
    }),
  ],
}

/* ───────────────────────── /integrationskurse/[kurs] */

export const integrationskursSubpages: ContentPage[] = [
  ikPage({
    slug: 'allgemeine',
    label: 'Allgemeine Integrationskurse',
    seoTitle: 'Allgemeiner Integrationskurs in Mainz',
    seoDescription:
      'Allgemeiner Integrationskurs beim ABC e.V.: 600 UE Sprachkurs in sechs Modulen, 100 UE Orientierungskurs, Kinderbeaufsichtigung vor Ort und kostenlose Beratung.',
    eyebrow: 'Integrationskurs',
    title: 'Allgemeiner Integrationskurs',
    intro:
      'So wird das Leben in Deutschland einfacher: ein ausgewogenes Programm für einen erfolgreichen Abschluss im Integrationskurs.',
    image: images.abcUnterricht,
    facts: [
      { icon: 'level', label: 'Niveau', value: 'A1 bis B1' },
      { icon: 'book', label: 'Sprachkurs', value: '600 UE (6 Module)' },
      { icon: 'users', label: 'Orientierungskurs', value: '100 UE' },
      { icon: 'child', label: 'Familie', value: 'Kinderbeaufsichtigung' },
    ],
    relatedVariant: 'classic',
    blocks: [
      {
        type: 'intro',
        id: 'programm',
        eyebrow: 'Das Programm',
        title: 'Sechs Module bis B1',
        paragraphs: [
          'Der Deutschkurs besteht aus sechs Modulen auf den Niveaustufen A1, A2 und B1 – insgesamt 600 Unterrichtseinheiten (1 UE = 45 Minuten): Basiskurs mit 300 UE und Aufbaukurs mit 300 UE. Danach folgt der Orientierungskurs über Geschichte, Politik und Kultur in Deutschland.',
          'Wer schon Deutsch spricht, kann in einem höheren Modul beginnen. Dafür gibt es einen zweistufigen Einstufungstest (schriftlich und mündlich).',
        ],
        points: [
          'Basiskurs: 300 UE',
          'Aufbaukurs: 300 UE',
          'Orientierungskurs: 100 UE',
          'Einstieg je nach Vorkenntnissen',
        ],
        image: images.abcTafel,
      },
      finalExams,
      childcare,
      { type: 'faq', id: 'faq', eyebrow: 'Häufige Fragen', title: 'Gut zu wissen', items: faq },
    ],
  }),
  ikPage({
    slug: 'jugendintegrationskurse',
    label: 'Jugendintegrationskurse',
    seoTitle: 'Jugendintegrationskurs in Mainz (16–26 Jahre)',
    seoDescription:
      'Jugendintegrationskurs beim ABC e.V. in Mainz: Deutschtraining für junge Zugewanderte von 16 bis 26 Jahren, kleine Gruppen, Praxisphase und kostenlose Beratung.',
    eyebrow: 'Integrationskurs · 16 bis 26 Jahre',
    title: 'Jugendintegrationskurs',
    intro:
      'Deutsch lernen – Perspektive gewinnen: ein Deutschtraining, zugeschnitten auf junge Menschen von 16 bis 26 Jahren.',
    image: images.jugendErfolg,
    facts: [
      { icon: 'users', label: 'Alter', value: '16 bis 26 Jahre' },
      { icon: 'book', label: 'Umfang', value: 'bis 1.000 UE' },
      { icon: 'level', label: 'Niveau', value: 'A1 bis B1' },
      { icon: 'award', label: 'Abschluss', value: 'DTZ & „Leben in Deutschland“' },
    ],
    relatedVariant: 'overlay',
    blocks: [
      {
        type: 'intro',
        id: 'programm',
        eyebrow: 'Das Programm',
        title: 'Lernen mit Gleichaltrigen',
        paragraphs: [
          'Der Jugendintegrationskurs umfasst bis zu 1.000 Unterrichtseinheiten: Basiskurs (300 UE), Aufbaukurs A (300 UE), Aufbaukurs B (300 UE) und Orientierungskurs (100 UE). Wer schon Deutsch spricht, beginnt in einem höheren Modul.',
          'Aktuelle Themen, die junge Menschen interessieren – zum Beispiel die Bewerbung um einen Ausbildungsplatz – machen Spaß und steigern die Motivation. Eine Praxisphase im 8. Kursabschnitt gibt Ihnen die Möglichkeit, das Gelernte in echten Situationen anzuwenden.',
        ],
        points: [
          'Kleine Gruppen mit Gleichaltrigen',
          'Praxisphase im 8. Kursabschnitt',
          'Themen rund um Ausbildung und Beruf',
          'Zweistufiger Einstufungstest',
        ],
        image: images.jugendErfolg,
      },
      {
        type: 'columns',
        id: 'fuer-wen',
        eyebrow: 'Für wen?',
        title: 'Wer kann teilnehmen?',
        columns: [
          {
            icon: 'users',
            title: 'Zielgruppe',
            items: [
              'Nicht mehr schulpflichtige junge Menschen von 16 bis 26 Jahren',
              'Spätaussiedlerinnen und Spätaussiedler',
              'Deutsche mit Migrationsgeschichte',
              'EU-Bürgerinnen und EU-Bürger',
              'Ggf. Asylsuchende im Verfahren und Geduldete',
            ],
          },
          {
            icon: 'info',
            title: 'Förderung und Zulassung',
            items: [
              'Bei der Ausländerbehörde',
              'Beim Jobcenter',
              'Beim Bundesamt für Migration und Flüchtlinge (BAMF)',
            ],
          },
        ],
        note: {
          title: 'Noch keine Zulassung?',
          text: 'Wir helfen Ihnen beim Antrag und beraten Sie kostenlos.',
        },
      },
      finalExams,
    ],
  }),
  ikPage({
    slug: 'alphabetisierung',
    label: 'Alphabetisierungskurse',
    seoTitle: 'Integrationskurs mit Alphabetisierung in Mainz',
    seoDescription:
      'Integrationskurs mit Alphabetisierung beim ABC e.V. in Mainz: Deutsch lernen und gleichzeitig lesen und schreiben lernen – in kleinen Gruppen mit besonderem Lernkonzept.',
    eyebrow: 'Integrationskurs · Alphabetisierung',
    title: 'Integrationskurs mit Alphabetisierung',
    intro:
      'Wer Deutsch lernen und gleichzeitig in lateinischer Schrift – oder überhaupt – lesen und schreiben lernen möchte, braucht besondere Unterstützung.',
    image: images.abcTafel,
    facts: [
      { icon: 'pen', label: 'Schwerpunkt', value: 'Lesen und Schreiben' },
      { icon: 'book', label: 'Umfang', value: 'bis 1.000 UE' },
      { icon: 'users', label: 'Gruppen', value: 'klein' },
      { icon: 'child', label: 'Familie', value: 'Kinderbeaufsichtigung' },
    ],
    relatedVariant: 'classic',
    blocks: [
      {
        type: 'intro',
        id: 'programm',
        eyebrow: 'Das Programm',
        title: 'Schritt für Schritt zur Schrift',
        paragraphs: [
          'Wir unterstützen Sie im Alphabetisierungskurs nach einem besonderen Lernkonzept. Der Kurs umfasst bis zu 1.000 Unterrichtseinheiten: Basiskurs (300 UE), Aufbaukurs A (300 UE), Aufbaukurs B (300 UE) und Orientierungskurs (100 UE).',
          'Wer schon Deutsch spricht, kann in einem höheren Modul beginnen. Unter bestimmten Voraussetzungen können zusätzliche Unterrichtseinheiten beantragt werden – wir beraten Sie dazu.',
        ],
        points: [
          'Kleine, effektive Gruppen',
          'Besonderes Lernkonzept',
          'Zweistufiger Einstufungstest',
          'Kinderbeaufsichtigung vor Ort',
        ],
        image: images.abcWhiteboard,
      },
      finalExams,
      childcare,
    ],
  }),
  ikPage({
    slug: 'lern-und-sozialbegleitung',
    label: 'Lern- und Sozialbegleitung',
    seoTitle: 'Lern- und Sozialbegleitung im Integrationskurs',
    seoDescription:
      'Lern- und Sozialbegleitung beim ABC e.V. in Mainz – ein Angebot des BAMF zur Unterstützung von Teilnehmenden im Integrationskurs.',
    eyebrow: 'Begleitung · BAMF',
    title: 'Lern- und Sozialbegleitung',
    intro:
      'Die Lern- und Sozialbegleitung in Integrationskursen ist ein Angebot des BAMF – bei uns seit Januar 2018.',
    image: images.paedagogik,
    facts: [
      { icon: 'calendar', label: 'Seit', value: 'Januar 2018' },
      { icon: 'users', label: 'Teilnehmende', value: 'über 50 pro Jahr' },
      { icon: 'info', label: 'Beratungen', value: 'über 200' },
      { icon: 'award', label: 'Träger', value: 'Angebot des BAMF' },
    ],
    relatedVariant: 'overlay',
    blocks: [
      {
        type: 'intro',
        id: 'angebot',
        eyebrow: 'Das Angebot',
        title: 'Damit Lernen gelingt',
        paragraphs: [
          'Jedes Jahr unterstützen wir mehr als 50 Teilnehmende – bei der Aktivierung, bei Schwierigkeiten im Kursalltag und vor allem dabei, das selbstständige Lernen zu organisieren.',
          'Bei Unterrichtsstörungen, Konflikten oder Disziplinproblemen unterstützen wir die Lehrkräfte, führen Gruppen- und Einzelgespräche und stärken mit teambildenden Maßnahmen die Gruppe.',
        ],
        points: [
          'Selbstständiges Lernen organisieren',
          'Einzel- und Gruppengespräche',
          'Deeskalation bei Konflikten',
          'Teambildende Maßnahmen',
        ],
        image: images.paedagogik,
      },
      {
        type: 'columns',
        id: 'beratung',
        eyebrow: 'Beratung im Alltag',
        title: 'Hilfe bei Alltagsfragen',
        intro:
          'Ehrenamtliche Helferinnen und Helfer führen jedes Jahr über 200 Beratungen für Gruppen und Einzelpersonen durch.',
        columns: [
          {
            icon: 'location',
            title: 'Themen',
            items: ['Wohnungssuche', 'Gesundheitspflege', 'Behördengänge', 'Orte der Begegnung'],
          },
          {
            icon: 'users',
            title: 'Wie wir helfen',
            items: [
              'Beratung und Verweisberatung',
              'Vermittlung an passende Stellen',
              'Kulturelles Orientierungswissen',
            ],
          },
        ],
      },
    ],
  }),
  ikPage({
    slug: 'termine',
    label: 'Kurstermine',
    seoTitle: 'Integrationskurs Termine in Mainz und Bad Kreuznach',
    seoDescription:
      'Neue Integrationskurse beim ABC e.V. starten regelmäßig in Mainz und Bad Kreuznach – vormittags, nachmittags und abends. Jetzt kostenlos beraten lassen.',
    eyebrow: 'Integrationskurse · Termine',
    title: 'Kurstermine',
    intro:
      'Neue Kurse starten regelmäßig – vormittags, nachmittags oder abends. Wir nennen Ihnen den nächsten passenden Termin.',
    image: images.abcSeminarraum,
    facts: [
      { icon: 'calendar', label: 'Start', value: 'regelmäßig' },
      { icon: 'clock', label: 'Zeiten', value: 'vormittags bis abends' },
      { icon: 'location', label: 'Orte', value: 'Mainz & Bad Kreuznach' },
      { icon: 'users', label: 'Anmeldung', value: 'in der Sprechstunde' },
    ],
    relatedVariant: 'classic',
    blocks: [
      {
        type: 'intro',
        id: 'starttermine',
        eyebrow: 'Starttermine',
        title: 'Den passenden Kurs finden',
        paragraphs: [
          'Integrationskurse buchen Sie bei uns persönlich: Kommen Sie in unsere Sprechstunde oder melden Sie sich telefonisch. Nach dem Einstufungstest nennen wir Ihnen den nächsten Kurs, der zu Ihrem Niveau und Ihren Zeiten passt.',
          'Aktuelle Starttermine veröffentlichen wir hier, sobald sie feststehen.',
        ],
        points: [
          'Allgemeiner Integrationskurs',
          'Integrationskurs mit Alphabetisierung',
          'Jugendintegrationskurs',
          'Kurse mit Kinderbeaufsichtigung',
        ],
        image: images.abcSeminarraum,
      },
    ],
  }),
]
