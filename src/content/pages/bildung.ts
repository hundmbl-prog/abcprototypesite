/**
 * Bildungsangebote (Viona, Politische Bildungsarbeit) and Bildungs- & Lernförderung (Nachhilfe).
 * Content from the current abc-mainz.de pages. Outdated programmes (e.g. "Aufholen nach Corona", 2022)
 * are not presented as current offers.
 */
import { images } from '../images'
import type { ContentPage } from '../types'
import { contact, cta } from './shared'

/* ───────────────────────── /bildungsangebote */

export const bildungsangebotePage: ContentPage = {
  path: 'bildungsangebote',
  label: 'Bildungsangebote',
  seo: {
    title: 'Bildungsangebote – Viona Online-Weiterbildung und politische Bildung',
    description:
      'Berufliche Online-Weiterbildungen mit Viona am PC-Arbeitsplatz in Mainz, Förderung über Bildungsgutschein, und die politische Bildungsarbeit des ABC e.V.',
  },
  hero: {
    eyebrow: 'Bildungsangebote',
    title: 'Weiterbilden und mitgestalten',
    intro: 'Online-Weiterbildung mit Viona und politische Bildungsarbeit.',
    image: images.weiterbildung,
    facts: [
      { icon: 'monitor', label: 'Viona', value: 'Live-Online-Unterricht' },
      { icon: 'euro', label: 'Förderung', value: 'z. B. Bildungsgutschein' },
      { icon: 'users', label: 'Politische Bildung', value: 'für Jung und Alt' },
      { icon: 'check', label: 'Beratung', value: 'kostenlos' },
    ],
    primaryCta: { label: 'Viona', href: '#viona' },
    secondaryCta: { label: 'Beratung anfragen', href: '#kontakt' },
  },
  blocks: [
    {
      type: 'spotlight',
      id: 'viona',
      eyebrow: 'Weiterbildung · Viona',
      title: 'Online-Weiterbildungen mit Viona',
      paragraphs: [
        'Berufliche Weiterbildungen live im virtuellen Seminarraum – mit eigenem PC-Arbeitsplatz und fester Ansprechperson bei uns in Mainz. Auch mit wenig PC-Vorkenntnissen.',
      ],
      facts: [
        { label: 'Unterricht', value: 'live im virtuellen Seminarraum' },
        { label: 'Arbeitsplatz', value: 'PC bei uns in Mainz' },
        { label: 'Vollzeit', value: 'Mo–Fr, 8:00–16:00 Uhr' },
        { label: 'Teilzeit', value: 'Mo–Fr, 8:00–13:00 Uhr' },
      ],
      lists: [
        {
          title: 'Themenbereiche (Auswahl)',
          items: [
            'IT und Informatik',
            'Kaufmännisches, Büro und Personal',
            'Medizin, Pflege und Gesundheit',
            'Pädagogik und Didaktik',
            'Management und Qualitätsmanagement',
            'Grafikdesign und Mediengestaltung',
          ],
        },
        {
          title: 'Ihre Vorteile',
          items: [
            'Kurze Wartezeit bis zum Modulstart',
            'Feste Kontaktperson vor Ort',
            'Lernmaterialien inklusive',
            'Klare Lernziele',
          ],
        },
      ],
      funding:
        'Kundinnen und Kunden der Agentur für Arbeit, des Jobcenters oder eines Rentenversicherungsträgers können die Kosten über einen Bildungsgutschein übernehmen lassen. Für Privat- und Firmenkunden erstellen wir gerne ein Angebot.',
      contact: {
        label: 'Beratung zu Viona',
        email: 'viona@abc-mainz.de',
        phone: '+49 6131 385795',
      },
    },
    {
      type: 'faq',
      id: 'viona-faq',
      eyebrow: 'Viona',
      title: 'Fragen zur Weiterbildung',
      items: [
        {
          question: 'Was ist ein Bildungsgutschein?',
          answer:
            'Mit dem Bildungsgutschein sagt die Agentur für Arbeit oder das Jobcenter zu, die Kosten einer beruflichen Weiterbildung oder Umschulung zu übernehmen. Sie erhalten ihn bei Ihrer zuständigen Stelle.',
        },
        {
          question: 'Wie lange ist der Bildungsgutschein gültig?',
          answer:
            'Nach der Bewilligung höchstens drei Monate. In dieser Zeit muss die Weiterbildung beginnen – kommen Sie deshalb gerne früh auf uns zu.',
        },
        {
          question: 'Was bringe ich zum Gespräch mit der Agentur oder dem Jobcenter mit?',
          answer:
            'Informationen zum gewünschten Kurs, Ihre bisherigen Bewerbungen und Stellenanzeigen, für die Ihnen die Weiterbildung hilft.',
        },
        {
          question: 'Wie läuft die Anmeldung ab?',
          answer:
            'Im Beratungstermin finden wir die passende Weiterbildung und machen einen kurzen Eignungstest. Danach melden wir Sie für Ihr Viona-Modul an.',
        },
        {
          question: 'Wie lange dauert eine Weiterbildung?',
          answer:
            'Von wenigen Tagen bis zu mehreren Monaten – je nach Kurs und ob Sie in Voll- oder Teilzeit lernen. Eine Unterrichtseinheit dauert 45 Minuten.',
        },
        {
          question: 'Kann ich Viona vorher ausprobieren?',
          answer: 'Ja, gerne in einer Probestunde. Sprechen Sie uns an.',
        },
      ],
    },
    {
      type: 'spotlight',
      id: 'politische-bildungsarbeit',
      eyebrow: 'Bildung · Demokratie',
      title: 'Politische Bildungsarbeit',
      reverse: true,
      paragraphs: [
        'Grundlage für Teilhabe: der Orientierungskurs „Leben in Deutschland“ (100 UE) in unseren Integrationskursen – und für Jugendliche Projekte wie „Wir sind Vielfalt“ und „Menschen stärken Menschen“.',
      ],
      facts: [
        { label: 'Zielgruppen', value: 'Jugendliche und Erwachsene' },
        { label: 'Methoden', value: 'Gruppenarbeit, Rollenspiele' },
        { label: 'Material', value: 'u. a. von BpB und LpB' },
        { label: 'Qualität', value: 'Evaluation und Umfragen' },
      ],
      lists: [
        {
          title: 'Aktuell',
          items: [
            'Orientierungskurs „Leben in Deutschland“',
            'Schülerwettbewerb „Wir sind Vielfalt“',
            'Patenschaften „Menschen stärken Menschen“',
          ],
        },
        {
          title: 'Bisher',
          items: [
            'Schülercafé (2019/2020): Weltbürgertum, Kommunikation, Nachhaltigkeit, Social Media',
            'Ferienfreizeiten zu Themen wie Kochkulturen, Umwelt und Rassismus',
          ],
        },
      ],
      contact: {
        label: 'Sie möchten sich an politischer Bildungsarbeit beteiligen? Sprechen Sie uns an.',
        email: 'projekte@abc-mainz.de',
      },
      link: { label: 'Bundeszentrale für politische Bildung', href: 'https://www.bpb.de/' },
    },
    contact(
      'Sie interessieren sich für eine Weiterbildung oder unsere politische Bildungsarbeit? Wir beraten Sie gerne.',
    ),
    cta({
      title: 'Den nächsten Schritt gehen',
      text: 'Lassen Sie sich kostenlos beraten – auch zur Förderung mit Bildungsgutschein.',
      primary: { label: 'Viona-Beratung', href: 'mailto:viona@abc-mainz.de' },
      secondary: { label: 'Unsere Projekte', href: '/projekte' },
    }),
  ],
}

/* ───────────────────────── /lernfoerderung */

export const lernfoerderungPage: ContentPage = {
  path: 'lernfoerderung',
  label: 'Bildungs- & Lernförderung',
  seo: {
    title: 'Nachhilfe in Mainz – Bildungs- und Lernförderung',
    description:
      'Nachhilfe beim ABC e.V. in Mainz: alle Fächer, alle Schulformen, Kleingruppen bis 5 Kinder oder Einzelunterricht, vor Ort oder online – mit kostenloser Beratung und Probestunde.',
  },
  hero: {
    eyebrow: 'Bildungs- & Lernförderung',
    title: 'Nachhilfe, die Mut macht',
    intro: 'Nachhilfe in allen Fächern – in kleinen Gruppen oder einzeln.',
    facts: [
      { icon: 'book', label: 'Fächer', value: 'alle Fächer, alle Schulformen' },
      { icon: 'users', label: 'Gruppen', value: 'bis 5 Kinder oder einzeln' },
      { icon: 'monitor', label: 'Format', value: 'vor Ort und online' },
      { icon: 'check', label: 'Start', value: 'Beratung und Probestunde' },
    ],
    primaryCta: { label: 'Probetermin vereinbaren', href: '#kontakt' },
    secondaryCta: { label: 'Fächer ansehen', href: '#faecher' },
  },
  blocks: [
    {
      type: 'features',
      id: 'angebot',
      eyebrow: 'Unser Angebot',
      title: 'Bildung für alle – jede und jeder ist willkommen',
      items: [
        {
          icon: 'users',
          title: 'Angepasste Förderung',
          text: 'In Kleingruppen mit höchstens 5 Kindern oder im Einzelunterricht – wir gehen auf jedes Kind ein.',
        },
        {
          icon: 'award',
          title: 'Erfahrene Lehrkräfte',
          text: 'Engagierte Lehrkräfte vermitteln Methoden für effektives und langfristiges Lernen.',
        },
        {
          icon: 'clock',
          title: 'Flexible Zeiten',
          text: 'Lernen in angenehmer Atmosphäre – zu Zeiten, die zu Ihrer Familie passen.',
        },
        {
          icon: 'mail',
          title: 'Feedback an Eltern',
          text: 'Regelmäßige Rückmeldungen, damit Sie wissen, wie Ihr Kind vorankommt.',
        },
      ],
    },
    {
      type: 'intro',
      id: 'hilfe',
      eyebrow: 'Wir helfen Ihnen und Ihrem Kind',
      title: 'Wieder Freude am Lernen',
      paragraphs: [
        'Unterrichtsmaterial stellen wir – vor Ort oder online über Zoom, bei Bedarf mit Leih-Tablet.',
      ],
      points: [
        'Kostenloses Beratungsgespräch',
        'Probestunde',
        'Unterricht vor Ort oder online',
        'Tablets bei Bedarf',
      ],
    },
    {
      type: 'tabs',
      id: 'faecher',
      eyebrow: 'Fächer',
      title: 'Wobei wir helfen',
      tabs: [
        {
          id: 'mathe',
          label: 'Mathematik',
          heading: 'Mathematik',
          text: 'Ob Algebra, Geometrie, Funktionen oder Wahrscheinlichkeitsrechnung – mit verständlichen Erklärungen wächst die Sicherheit in Mathe.',
          items: [
            'Algebra',
            'Geometrie',
            'Funktionen',
            'Bruchrechnung',
            'Wahrscheinlichkeitsrechnung',
            'Stochastik',
          ],
        },
        {
          id: 'deutsch',
          label: 'Deutsch',
          heading: 'Deutsch',
          text: 'Grammatik, Rechtschreibung, Textverständnis und Aufsätze – damit Sprache und Schreiben Schritt für Schritt sicherer werden.',
          items: [
            'Grammatik',
            'Rechtschreibung',
            'Textverständnis',
            'Aufsätze und Schreiben',
            'Literatur',
            'Ausdruck',
          ],
        },
        {
          id: 'englisch',
          label: 'Englisch',
          heading: 'Englisch',
          text: 'Grammatik und Vokabeln lernen und dabei Lesen, Schreiben und Sprechen trainieren.',
          items: [
            'Grammatik',
            'Vokabeln',
            'Textverständnis',
            'Schreiben',
            'Aussprache',
            'Sprechen',
          ],
        },
        {
          id: 'franzoesisch',
          label: 'Französisch',
          heading: 'Französisch',
          text: 'Grammatik, Vokabeln, Aussprache und Textverständnis – mit praktischen Übungen zu mehr Sicherheit.',
          items: [
            'Grammatik',
            'Vokabeln',
            'Textverständnis',
            'Schreiben',
            'Aussprache',
            'Sprechen',
          ],
        },
        {
          id: 'biologie',
          label: 'Biologie',
          heading: 'Biologie',
          text: 'Von Zellen und Genen bis zu Ökosystemen und dem menschlichen Körper – anschaulich erklärt.',
          items: [
            'Zellbiologie',
            'Genetik',
            'Evolution',
            'Ökologie',
            'Humanbiologie',
            'Stoffwechsel',
          ],
        },
        {
          id: 'chemie',
          label: 'Chemie',
          heading: 'Chemie',
          text: 'Von Atomen bis zu chemischen Reaktionen – Formeln, Fachbegriffe und Zusammenhänge sicher verstehen.',
          items: [
            'Atome und Moleküle',
            'Periodensystem',
            'Chemische Reaktionen',
            'Säuren und Basen',
            'Organische Chemie',
            'Stoffgemische',
          ],
        },
        {
          id: 'physik',
          label: 'Physik',
          heading: 'Physik',
          text: 'Mechanik, Elektrizität, Optik oder Magnetismus – Formeln und Lösungswege gemeinsam erarbeitet.',
          items: [
            'Mechanik',
            'Elektrizität',
            'Magnetismus',
            'Optik',
            'Wärmelehre',
            'Quantenphysik',
          ],
        },
      ],
    },
    {
      type: 'columns',
      id: 'so-gehts',
      eyebrow: 'So geht es los',
      title: 'Beratung, Probestunde, Förderung',
      columns: [
        {
          icon: 'users',
          title: 'Beratung und Probestunde',
          items: [
            'Kostenfreies Beratungsgespräch',
            'Probestunde zum Kennenlernen',
            'Gemeinsam den passenden Weg finden',
          ],
        },
        {
          icon: 'monitor',
          title: 'Online lernen',
          items: [
            'Unterricht über Zoom',
            'Bequem und produktiv von zu Hause',
            'Tablets bei Bedarf',
          ],
        },
        {
          icon: 'euro',
          title: 'Bildung und Teilhabe',
          items: [
            'Familien mit Anspruch auf Leistungen für Bildung und Teilhabe können die Kosten für Lernförderung beantragen',
            'Wir beraten Sie zum Antrag',
          ],
        },
      ],
    },
    {
      type: 'spotlight',
      id: 'sprachbildung',
      eyebrow: 'Partner',
      title: 'Sprachbildung mit System – InSL e.V.',
      reverse: true,
      paragraphs: [
        'Bildungssprache muss gelernt werden – auch von Kindern, die im Alltag sehr gut Deutsch sprechen. Die InSL e.V. ermöglicht Kindern dafür kostenlosen oder sehr günstigen Unterricht.',
      ],
    },
    contact(
      'Vereinbaren Sie ein kostenloses Beratungsgespräch und eine Probestunde für Ihr Kind.',
      'nachhilfe@abc-mainz.de',
    ),
    cta({
      title: 'Eine Probestunde vereinbaren',
      text: 'Schreiben Sie uns – wir melden uns schnell mit einem Termin.',
      primary: { label: 'Probetermin anfragen', href: 'mailto:nachhilfe@abc-mainz.de' },
      secondary: { label: 'Unsere Kurse', href: '/kurse' },
    }),
  ],
}
