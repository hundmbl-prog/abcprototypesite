/**
 * Projekte – one page: intro, project cards (photo + short text + "Mehr erfahren") and one detail
 * section per project. Content from the current abc-mainz.de project pages; only links that were
 * reachable on 15.10.2026 are included.
 */
import type { OfferCardData } from '@/components/cards/types'
import { images } from '../images'
import type { ContentImage, ContentPage, Project, SpotlightBlock } from '../types'
import { cta } from './shared'

type ProjectData = Omit<SpotlightBlock, 'type' | 'back' | 'reverse' | 'eyebrow'> & {
  short: string
  tag: string
  partners: string[]
  image: ContentImage
}

const projects: ProjectData[] = [
  {
    id: 'strassenfotografie',
    title: 'Straßenfotografie Mainz',
    tag: 'Kultur',
    short:
      'Mit der Kamera die Mainzer Neu- und Altstadt entdecken und die eigene Perspektive zeigen.',
    partners: ['BGZ'],
    image: images.projektStrassenfotografie,
    paragraphs: [
      'Die Mainzer Neu- und Altstadt warten darauf, entdeckt zu werden: Gemeinsam gehen die Teilnehmenden mit der Kamera auf Tour und halten fest, was sie beeindruckt – Straßenkunst, Rheinufer, Feste, Wochenmarkt, Parks, Gebäude und Denkmäler.',
      'Wir stellen alle Werkzeuge: Grundlagen der Fotografie und eine moderne Kamera. Die Bilder teilen wir in den sozialen Medien und zeigen sie in einer Ausstellung in der Innenstadt – mit Fotopreis und Überraschungspreisen. Alle Sprachniveaus sind willkommen.',
      'Am 6. September 2025 zeigten 12 Teilnehmende ihre Fotos bei der zweiten Ausstellung auf dem Frauenlobplatz in der Mainzer Neustadt. 2026 ging das Projekt in seine dritte und letzte Runde.',
    ],
    facts: [
      { label: 'Laufzeit', value: '2024 bis 2026' },
      { label: 'Teilnahme', value: 'ab 18 Jahren' },
      { label: 'Sprachniveau', value: 'alle willkommen' },
      { label: 'Förderung', value: 'BGZ / BMI' },
    ],
    lists: [
      {
        title: 'Ablauf',
        items: [
          'Kennenlernen und Grundlagen der Fotografie',
          'Fotowalks durch Mainz',
          'Fotoauswahl',
          'Ausstellung und Preisverleihung',
        ],
      },
    ],
    funding:
      'Gefördert im Rahmen des Bundesprogramms „Gesellschaftlicher Zusammenhalt – Vor Ort. Vernetzt. Verbunden.“ (BGZ) durch das Bundesministerium des Innern (BMI).',
    contact: {
      label: 'Projektkoordination: Sabrina Zaiene',
      email: 'strassenfotografie@abc-mainz.de',
    },
  },
  {
    id: 'natur-erleben',
    title: 'Natur erleben – Umwelt erfahren',
    tag: 'Umwelt',
    short:
      'Ein inklusives Naturprojekt am Bonifaziusplatz für Kinder und Jugendliche von 8 bis 16 Jahren.',
    partners: ['Aktion Mensch'],
    image: images.projektNatur,
    paragraphs: [
      'Mit „Natur erleben – Umwelt erfahren am Bonifaziusplatz“ sprechen wir alle Kinder und Jugendlichen von 8 bis 16 Jahren an – mit und ohne Behinderung, mit und ohne Migrationsgeschichte. Alle können aktiv mitmachen, egal welche Voraussetzungen sie mitbringen.',
      'Die Kinder lernen viel über die Natur – und wie man gemeinsam Verantwortung übernimmt und sich gegenseitig unterstützt. Am 15. November 2025 bauten sie zum Beispiel Nisthilfen für Wildbienen und besuchten das NABU-Naturschutzzentrum Rheinauen.',
    ],
    facts: [
      { label: 'Alter', value: '8 bis 16 Jahre' },
      { label: 'Ort', value: 'Bonifaziusplatz, Mainz' },
      { label: 'Angebot', value: 'inklusiv' },
      { label: 'Förderung', value: 'Aktion Mensch' },
    ],
    lists: [
      {
        title: 'Was wir anbieten',
        items: [
          'Exkursionen, z. B. ins Naturhistorische Museum Mainz',
          'Workshops wie Bienenhäuser bauen',
          'Clean-Ups und Naturprojekte',
          'Ferienangebote und regelmäßige Termine',
        ],
      },
    ],
    funding: 'Das Projekt wird von der Aktion Mensch gefördert.',
    contact: { label: 'Anmeldung und Fragen', email: 'projekte@abc-mainz.de' },
  },
  {
    id: 'startklar',
    title: 'STARTklar – Stabil in Arbeit durch Netzwerk',
    tag: 'Arbeit',
    short: 'Begleitung für Menschen mit Fluchterfahrung auf dem Weg in Arbeit oder Ausbildung.',
    partners: ['ESF Plus', 'BMAS'],
    image: images.projektStartklar,
    paragraphs: [
      'STARTklar unterstützt Menschen mit Fluchterfahrung auf ihrem Weg in Arbeit oder Ausbildung. Wir begleiten die Teilnehmenden individuell und entwickeln mit ihnen passende berufliche Perspektiven – die eigenen Stärken und Wünsche stehen im Mittelpunkt.',
      'Beratung und Unterstützung sind kostenlos.',
    ],
    facts: [
      { label: 'Zielgruppe', value: 'Geflüchtete mit Arbeitsmarktzugang' },
      { label: 'Kosten', value: 'kostenlos' },
      { label: 'Programm', value: 'WIR (ESF Plus)' },
      { label: 'Förderung', value: 'BMAS und EU' },
    ],
    lists: [
      {
        title: 'Das Angebot',
        items: [
          'Berufsbezogene Sprachkurse',
          'Unterstützung bei Bewerbungen',
          'Praxisnahe Trainings',
          'Kontakte zu Betrieben',
        ],
      },
      {
        title: 'Für wen?',
        items: [
          'Mit Aufenthaltserlaubnis, Aufenthaltsgestattung oder Duldung',
          'Mit Zugang zum Arbeitsmarkt',
        ],
      },
    ],
    funding:
      'STARTklar wird im Rahmen des Programms „WIR – Netzwerke integrieren Geflüchtete in den regionalen Arbeitsmarkt“ durch das Bundesministerium für Arbeit und Soziales und die Europäische Union über den Europäischen Sozialfonds Plus (ESF Plus) gefördert.',
    contact: { label: 'Projektkoordination: Regina Molitor', email: 'startklar@abc-mainz.de' },
    link: {
      label: 'Das WIR-Programm',
      href: 'https://www.esf.de/portal/DE/ESF-Plus-2021-2027/Foerderprogramme/bmas/wir.html',
    },
  },
  {
    id: 'wir-sind-vielfalt',
    title: 'Wir sind Vielfalt',
    tag: 'Wettbewerb',
    short:
      'Der Kreativwettbewerb für Kinder und Jugendliche – 2026 unter dem Motto „Mut hat viele Gesichter“.',
    partners: [],
    image: images.projektVielfalt,
    paragraphs: [
      'Jedes Jahr veranstalten wir den Schülerwettbewerb „Wir sind Vielfalt“ – 2026 bereits zum 12. Mal. Kinder und Jugendliche nehmen allein, als Gruppe oder mit ihrer Klasse teil und gestalten Beiträge zu wichtigen gesellschaftlichen Themen: Kurzfilme, Bilder, Fotos, Geschichten oder Plakate.',
      'Die Beiträge werden einer Jury aus Professorinnen und Professoren, Landtagsmitgliedern und weiteren Persönlichkeiten präsentiert. Unterstützt wird der Wettbewerb unter anderem vom Staatstheater Mainz, dem „05er Klassenzimmer“ des 1. FSV Mainz 05 und der Johannes Gutenberg-Universität.',
    ],
    facts: [
      { label: 'Motto 2026', value: 'Mut hat viele Gesichter' },
      { label: 'Ausgabe', value: '12. Wettbewerb' },
      { label: 'Für', value: 'Kinder und Jugendliche' },
      { label: 'Region', value: 'Mainz und Umgebung' },
    ],
    lists: [
      {
        title: 'Bisherige Mottos (Auswahl)',
        items: [
          'Grundrechte',
          'Konsumgesellschaft',
          'Die Geschichte des Anderen',
          'Jung-Alt-Vielfalt',
          'Jede Stimme hat Gewicht',
          'Farben der Welt',
        ],
      },
    ],
    contact: { label: 'Fragen zum Wettbewerb', email: 'projekte@abc-mainz.de' },
    link: { label: 'wirsindvielfalt.de', href: 'https://www.wirsindvielfalt.de/' },
  },
  {
    id: 'medien-machen-meinung',
    title: 'Medien.Machen.Meinung',
    tag: 'Medien',
    short: 'Jugendliche lernen, Social Media kreativ, positiv und verantwortungsvoll zu nutzen.',
    partners: [],
    image: images.hero,
    paragraphs: [
      'Jugendliche verbringen viel Zeit auf Social Media und orientieren sich oft an Influencerinnen und Influencern, die nicht immer realistische Ideale vermitteln. Im Schülerprojekt „How to become an influencer?“ zeigen wir, wie man Social Media bewusst, kreativ und verantwortungsvoll nutzt.',
      'Statt nur zu konsumieren, entwickeln die Jugendlichen eigene Beiträge, die unterhaltsam und gesellschaftlich relevant sind. Im Mittelpunkt stehen Verantwortung, Authentizität und Inhalte mit Wirkung – nicht Likes oder Reichweite.',
    ],
    facts: [
      { label: 'Alter', value: '12 bis 20 Jahre' },
      { label: 'Plätze', value: 'höchstens 20' },
      { label: 'Vorkenntnisse', value: 'keine nötig' },
      { label: 'Format', value: 'Schülerprojekt' },
    ],
    lists: [
      {
        title: 'Ziele',
        items: [
          'Medienkompetenz',
          'Teamwork',
          'Kreative, authentische Inhalte',
          'Verantwortung lernen',
        ],
      },
      {
        title: 'Ablauf',
        items: [
          'Eigener YouTube-Kanal und Kurzvideos',
          'Workshops mit Profis aus Fotografie, Drehbuch und Produktion',
          'Treffen mit Influencer:innen aus der Region',
          'Exkursionen zu Medienhäusern',
        ],
      },
    ],
    contact: { label: 'Anmeldung und Fragen', email: 'projekte@abc-mainz.de' },
  },
  {
    id: 'integrationsgeschichten',
    title: 'Integrationsgeschichten',
    tag: 'Gesellschaft',
    short:
      'Mit Motivation zum Erfolg: Erfolgsgeschichten, die Mut machen und neue Perspektiven öffnen.',
    partners: ['BGZ'],
    image: images.team,
    paragraphs: [
      'Wir möchten Migrantinnen und Migranten dabei helfen, ihr Selbstvertrauen zu stärken und neue Perspektiven zu entwickeln. Dafür erzählen wir die Geschichten erfolgreicher Akademikerinnen, Akademiker und Berufserfahrener – und zeigen: Beruflicher Erfolg und gesellschaftliche Teilhabe in Deutschland sind möglich.',
      'In Vorträgen, Workshops und Podiumsdiskussionen kommen Teilnehmende direkt mit den Erfolgsgeschichten ins Gespräch. Zum Abschluss des ersten Projektjahres feierte am 25. Oktober 2025 unsere Interviewreihe Premiere – mit einer Podiumsdiskussion mit Daniel Baldy, MdB.',
    ],
    facts: [
      { label: 'Laufzeit', value: 'seit 2025' },
      { label: '2026', value: 'zweite Runde' },
      { label: 'Formate', value: 'Vorträge, Workshops, Podien' },
      { label: 'Förderung', value: 'BGZ / BMI' },
    ],
    lists: [
      {
        title: 'Veranstaltungen 2025',
        items: [
          'Netzwerktreffen für Frauen',
          'Ehrenamt macht’s möglich',
          'Workshop für Fachkräfte mit ausländischen Abschlüssen',
          'Ein Abend voller Geschichten',
        ],
      },
    ],
    funding:
      'Gefördert im Rahmen des Bundesprogramms „Gesellschaftlicher Zusammenhalt – Vor Ort. Vernetzt. Verbunden.“ (BGZ) durch das Bundesministerium des Innern (BMI).',
    contact: {
      label: 'Projektkoordination: Herr Hakkioglu und Bahadir Erdem',
      email: 'h.hakkioglu@abc-mainz.de',
    },
  },
  {
    id: 'abc-uploaded',
    title: 'ABC UPLOADED – Gemeinsam Modern Arbeiten',
    tag: 'Organisation',
    short:
      'Wissen sichern, Fachkräfte gewinnen und halten – ein Projekt für moderne Arbeit im ABC.',
    partners: ['ESF Plus', 'BMAS'],
    image: images.abcSeminarraum,
    paragraphs: [
      'Personalmangel, häufige Wechsel bei Honorarlehrkräften und in der Verwaltung und der damit verbundene Wissensverlust sind Herausforderungen für viele soziale Organisationen. Mit ABC UPLOADED bauen wir eine Organisationskultur auf, die Wissen, Erfahrungen und Netzwerke nachhaltig sichert.',
      'Wir entwickeln strukturierte Prozesse für die Gewinnung und Förderung von Mitarbeitenden – und teilen unsere Erkenntnisse mit anderen Organisationen der Sozialwirtschaft.',
    ],
    facts: [
      { label: 'Laufzeit', value: '2025 bis 2027' },
      { label: 'Programm', value: 'rückenwind³ (ESF Plus)' },
      { label: 'Schwerpunkt', value: 'Wissensmanagement' },
      { label: 'Förderung', value: 'BMAS und EU' },
    ],
    lists: [
      {
        title: 'Ziele',
        items: [
          'Nachhaltiges Wissensmanagement',
          'Mitarbeitende fördern und begleiten',
          'Neue Talente durch moderne Arbeitsmodelle',
        ],
      },
      {
        title: 'Bausteine',
        items: [
          'Workshops und Schulungen',
          'Webbasiertes Wissensmanagementsystem',
          'Digitale Wissensplattform',
          'Physische Ressourcenzentren',
        ],
      },
    ],
    funding:
      'Das Projekt „ABC UPLOADED: Gemeinsam Modern Arbeiten“ wird im Rahmen des Programms „rückenwind³ für Vielfalt, Wandel und Zukunftsfähigkeit in der Sozialwirtschaft“ durch das Bundesministerium für Arbeit und Soziales und die Europäische Union über den Europäischen Sozialfonds Plus (ESF Plus) gefördert.',
  },
  {
    id: 'menschen-staerken-menschen',
    title: 'Menschen stärken Menschen',
    tag: 'Patenschaften',
    short:
      'Patenschaften zwischen Geflüchteten und hier lebenden Menschen – für ein dauerhaftes Miteinander.',
    partners: [],
    image: images.projektBruecken,
    paragraphs: [
      'Im Bundesprogramm „Menschen stärken Menschen“ stiften wir Patenschaften zwischen geflüchteten oder zugewanderten und bereits hier lebenden Menschen. Im besten Fall entwickeln sich daraus feste Freundschaften und gegenseitige Unterstützung über das Projekt hinaus.',
      'Nach einem Vorgespräch suchen wir die passende Patin oder den passenden Paten – nach Alter, Interessen und Wünschen. Ideal ist ein Treffen pro Woche; dazu kommen gemeinsame Aktivitäten wie eine Studienfahrt nach Berlin mit Besuch im Bundestag.',
    ],
    facts: [
      { label: 'Form', value: 'Patenschaften' },
      { label: 'Für', value: 'Einzelpersonen und Familien' },
      { label: 'Treffen', value: 'möglichst wöchentlich' },
      { label: 'Engagement', value: 'ehrenamtlich' },
    ],
    lists: [
      {
        title: 'Was Patinnen und Paten tun',
        items: [
          'Unterstützung bei Behördengängen',
          'Hilfe bei der Wohnungssuche',
          'Gemeinsame Ausflüge',
          'Lesestunden mit Kindern',
        ],
      },
    ],
    contact: {
      label: 'Pate oder Patin werden – oder eine Patenschaft finden',
      email: 'projekte@abc-mainz.de',
    },
  },
  {
    id: 'mainzer-jugendplattform',
    title: 'Mainzer Jugendplattform',
    tag: 'Jugend',
    short:
      'Ein Beitrag zum Zusammenhalt: Jugendliche entfalten sich nach ihren Fähigkeiten und Vorstellungen.',
    partners: [],
    image: images.projektJugendplattform,
    paragraphs: [
      'Mit der Mainzer Jugendplattform möchten wir einen Beitrag zum gesellschaftlichen Zusammenhalt leisten – damit sich Jugendliche entsprechend ihrer Fähigkeiten und Vorstellungen entfalten können.',
      'Ein besonderes Augenmerk liegt auf jungen Menschen, die strukturellen Benachteiligungen ausgesetzt sind oder schwerer Zugang zu Bildungsangeboten finden – darunter Geflüchtete und Zugewanderte.',
    ],
    facts: [
      { label: 'Für', value: 'Jugendliche in Mainz' },
      { label: 'Ziel', value: 'Zusammenhalt und Teilhabe' },
      { label: 'Förderung', value: 'Unternehmen, Stiftungen, Fonds' },
      { label: 'Ort', value: 'Mainz' },
    ],
    contact: { label: 'Fragen zur Jugendplattform', email: 'projekte@abc-mainz.de' },
  },
]

export const projectCards: OfferCardData[] = projects.map((p) => ({
  id: p.id,
  title: p.title,
  description: p.short,
  href: `/projekte#${p.id}`,
  image: p.image,
  tag: p.tag,
  ctaLabel: 'Mehr erfahren',
}))

/** Projects for the home page slideshow – same source as the Projekte page. */
export const projectShowcase: Project[] = projects.slice(0, 6).map((p) => ({
  id: p.id,
  slug: p.id,
  title: p.title,
  description: p.short,
  partners: p.partners,
  image: p.image,
}))

export const projektePage: ContentPage = {
  path: 'projekte',
  label: 'Projekte',
  seo: {
    title: 'Soziale Projekte in Mainz',
    description:
      'Die Projekte des ABC e.V.: Straßenfotografie, Natur erleben, STARTklar, Wir sind Vielfalt, Medien.Machen.Meinung, Integrationsgeschichten, ABC UPLOADED, Menschen stärken Menschen und Mainzer Jugendplattform.',
  },
  hero: {
    eyebrow: 'Projekte',
    title: 'Gemeinsam für ein starkes Miteinander',
    intro:
      'Unsere Projekte fördern Teilhabe, Kreativität und Zusammenhalt – oft gemeinsam mit starken Partnern.',
    image: images.projektStrassenfotografie,
    facts: [
      { icon: 'users', label: 'Projekte', value: `${projects.length} aktuelle Projekte` },
      { icon: 'award', label: 'Förderer', value: 'Bund, EU, Stiftungen' },
      { icon: 'location', label: 'Region', value: 'Mainz und Umgebung' },
      { icon: 'check', label: 'Mitmachen', value: 'ehrenamtlich möglich' },
    ],
    primaryCta: { label: 'Projekte ansehen', href: '#projekte' },
    secondaryCta: { label: 'Kontakt', href: '#mitmachen' },
  },
  blocks: [
    {
      type: 'intro',
      id: 'warum',
      eyebrow: 'Warum Projekte?',
      title: 'Damit sich jeder Mensch entfalten kann',
      paragraphs: [
        'Unser Ziel: eine Gesellschaft, in der sich jeder Mensch entfalten kann. Unsere Projekte richten sich besonders an Menschen, die Förderung brauchen – Geflüchtete, Zugewanderte, Jugendliche und Menschen, die Benachteiligung erfahren.',
        'Gefördert werden unsere Projekte von Unternehmen, Stiftungen und öffentlichen Programmen.',
      ],
      points: [
        'Teilhabe und Zusammenhalt',
        'Kreativität und Bildung',
        'Wege in Arbeit und Ausbildung',
        'Begegnung und Ehrenamt',
      ],
      image: images.sozialeProjekte,
    },
    {
      type: 'cards',
      id: 'projekte',
      eyebrow: 'Unsere Projekte',
      title: 'Aktuelle Projekte',
      intro:
        'Wählen Sie ein Projekt – mit „Mehr erfahren“ springen Sie zu allen Details weiter unten.',
      variant: 'classic',
      simple: true,
      cards: projectCards,
    },
    ...projects.map((p, i): SpotlightBlock => ({
      type: 'spotlight',
      id: p.id,
      eyebrow: `Projekt · ${p.tag}`,
      title: p.title,
      image: p.image,
      paragraphs: p.paragraphs,
      facts: p.facts,
      lists: p.lists,
      funding: p.funding,
      contact: p.contact,
      link: p.link,
      reverse: i % 2 === 1,
      back: { label: 'Zurück zur Projektübersicht', href: '#projekte' },
    })),
    {
      type: 'columns',
      id: 'mitmachen',
      eyebrow: 'Mitmachen',
      title: 'Sei ein Teil unseres Engagements',
      intro:
        'Jedes noch so kleine Engagement zählt – ob als Ehrenamtliche oder Ehrenamtlicher vor Ort oder mit einer Spende.',
      columns: [
        {
          icon: 'users',
          title: 'Ehrenamtlich helfen',
          items: [
            'Als Patin oder Pate',
            'Bei Projekten und Veranstaltungen',
            'Mit Ihrem Wissen und Ihrer Zeit',
          ],
        },
        {
          icon: 'mail',
          title: 'Kontakt zu unseren Projekten',
          items: ['E-Mail: projekte@abc-mainz.de', 'Telefon: 06131 8897826'],
        },
      ],
      note: {
        title: 'Spenden',
        text: 'Sie möchten unsere Projekte mit einer Spende unterstützen? Schreiben Sie uns – wir senden Ihnen gerne alle Informationen.',
      },
    },
    cta({
      title: 'Lust, mitzumachen?',
      text: 'Ob als Teilnehmende, Ehrenamtliche oder Partner – wir freuen uns auf Sie.',
      primary: { label: 'Projektteam kontaktieren', href: 'mailto:projekte@abc-mainz.de' },
      secondary: { label: 'Unsere Kurse', href: '/kurse' },
    }),
  ],
}
