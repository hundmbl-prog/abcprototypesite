/**
 * Prüfungen overview and Einbürgerungstest. Test facts from bamf.de, EinbTestV and StAG
 * (gesetze-im-internet.de), checked on 15.10.2026.
 */
import { images } from '../images'
import type { ContentPage } from '../types'
import { contact, cta } from './shared'

export const pruefungenPage: ContentPage = {
  path: 'pruefungen',
  label: 'Prüfungen',
  seo: {
    title: 'Prüfungen in Mainz – telc Deutschprüfungen und Einbürgerungstest',
    description:
      'Deutschprüfungen von A1 bis C1 Hochschule und der Einbürgerungstest „Leben in Deutschland“ beim ABC e.V. in Mainz – Beratung, Termine und Anmeldung.',
  },
  hero: {
    eyebrow: 'Prüfungen',
    title: 'Ihr Nachweis für den nächsten Schritt',
    intro:
      'Ob Aufenthalt, Einbürgerung, Studium oder Beruf: Bei uns legen Sie offizielle Prüfungen ab – und wir sagen Ihnen vorher, welche Sie wirklich brauchen.',
    image: images.abcLernen,
    facts: [
      { icon: 'award', label: 'telc', value: 'Lizenziertes Prüfungszentrum' },
      { icon: 'level', label: 'Niveaus', value: 'A1 bis C1 Hochschule' },
      { icon: 'book', label: 'Einbürgerung', value: 'Test vor Ort' },
      { icon: 'users', label: 'Beratung', value: 'kostenlos' },
    ],
    primaryCta: { label: 'Prüfungstermine', href: '/pruefungen/telc#termine' },
    secondaryCta: { label: 'Beratung anfragen', href: '/ueber-uns/kontakt' },
  },
  blocks: [
    {
      type: 'cards',
      id: 'unsere-pruefungen',
      eyebrow: 'Unsere Prüfungen',
      title: 'Prüfungen am ABC',
      intro: 'Beide Prüfungen legen Sie direkt bei uns in Mainz ab.',
      variant: 'horizontal',
      cards: [
        {
          id: 'telc',
          title: 'telc Deutschprüfungen',
          description:
            'Offizielle Sprachzertifikate von A1 bis C1 Hochschule – mit Prüfungsterminen, Gebühren und Anmeldung.',
          href: '/pruefungen/telc',
          image: images.abcTelc,
          tag: 'Prüfung',
          facts: {
            level: 'A1–C1 Hochschule',
            location: 'Mainz',
            format: 'Digital, hybrid oder Papier',
          },
          ctaLabel: 'Zu den telc Prüfungen',
        },
        {
          id: 'einbuergerungstest',
          title: 'Einbürgerungstest „Leben in Deutschland“',
          description:
            '33 Fragen zu Demokratie, Geschichte und Gesellschaft – der Wissensnachweis für die Einbürgerung.',
          href: '/pruefungen/einbuergerungstest',
          image: images.team,
          tag: 'Prüfung',
          facts: { duration: '60 Min.', location: 'Mainz', price: '25 € (BAMF)' },
          ctaLabel: 'Zum Einbürgerungstest',
        },
      ],
    },
    {
      type: 'tabs',
      id: 'welche-pruefung',
      eyebrow: 'Orientierung',
      title: 'Welche Prüfung brauche ich?',
      intro:
        'Ein erster Überblick – welcher Nachweis im Einzelfall gilt, entscheidet die zuständige Stelle. Wir beraten Sie gerne.',
      tabs: [
        {
          id: 'einbuergerung',
          label: 'Einbürgerung',
          heading: 'Deutsch auf B1 und Einbürgerungstest',
          text: 'Für die Einbürgerung brauchen Sie in der Regel Deutschkenntnisse auf Niveau B1 und Kenntnisse der Rechts- und Gesellschaftsordnung – nachgewiesen zum Beispiel mit dem Einbürgerungstest.',
          items: [
            'Zertifikat Deutsch / telc Deutsch B1',
            'Einbürgerungstest „Leben in Deutschland“',
            'Alternativ: DTZ mit Ergebnis B1',
          ],
        },
        {
          id: 'familie',
          label: 'Familiennachzug',
          heading: 'Einfache Deutschkenntnisse (A1)',
          text: 'Für den Ehegattennachzug werden meist einfache Deutschkenntnisse auf Niveau A1 verlangt. Fragen Sie bei der Auslandsvertretung oder Ausländerbehörde nach, welcher Nachweis anerkannt wird.',
          items: ['Start Deutsch 1 / telc Deutsch A1'],
        },
        {
          id: 'studium',
          label: 'Studium',
          heading: 'Deutsch für den Hochschulzugang',
          text: 'Viele Hochschulen erkennen telc Deutsch C1 Hochschule als Sprachnachweis an. Die Anforderungen stehen in den Zulassungsbedingungen Ihrer Hochschule.',
          items: ['telc Deutsch C1 Hochschule'],
        },
        {
          id: 'beruf',
          label: 'Beruf & Ausbildung',
          heading: 'Je nach Beruf B1 bis C1',
          text: 'Arbeitgeber, Kammern und Anerkennungsstellen verlangen unterschiedliche Niveaus – häufig B2 oder C1. Wir helfen Ihnen, die passende Prüfung zu finden.',
          items: [
            'telc Deutsch B1',
            'telc Deutsch B2',
            'telc Deutsch C1',
            'Berufssprachkurse am ABC',
          ],
        },
      ],
    },
    {
      type: 'faq',
      id: 'faq',
      eyebrow: 'Häufige Fragen',
      title: 'Kurz beantwortet',
      items: [
        {
          question: 'Kann ich mich auf eine Prüfung vorbereiten?',
          answer:
            'Ja. Für die telc Prüfungen gibt es kostenlose offizielle Übungstests, für den Einbürgerungstest das Online-Testcenter des BAMF. Außerdem bieten wir Vorbereitungskurse an.',
        },
        {
          question: 'Was muss ich zur Prüfung mitbringen?',
          answer:
            'Immer einen gültigen amtlichen Lichtbildausweis. Ohne Ausweis ist keine Teilnahme möglich.',
        },
        {
          question: 'Wo finden die Prüfungen statt?',
          answer:
            'Bei uns in Mainz. Den genauen Raum nennen wir Ihnen mit der Einladung zur Prüfung.',
        },
        {
          question: 'Ich weiß nicht, welche Prüfung ich brauche.',
          answer:
            'Kein Problem – rufen Sie uns an oder kommen Sie in unsere Sprechstunde. Die Beratung ist kostenlos.',
        },
      ],
    },
    contact(
      'Wir helfen Ihnen, die richtige Prüfung zu finden, und begleiten Sie bis zum Zertifikat.',
    ),
    cta({
      title: 'Nächster Termin gesucht?',
      text: 'Alle telc Prüfungstermine und die Anmeldung finden Sie auf einer Seite.',
      primary: { label: 'Prüfungstermine', href: '/pruefungen/telc#termine' },
      secondary: { label: 'Einbürgerungstest', href: '/pruefungen/einbuergerungstest' },
    }),
  ],
}

export const einbuergerungstestPage: ContentPage = {
  path: 'pruefungen/einbuergerungstest',
  label: 'Einbürgerungstest',
  seo: {
    title: 'Einbürgerungstest in Mainz – Ablauf, Kosten, Anmeldung',
    description:
      'Einbürgerungstest „Leben in Deutschland“ beim ABC e.V. in Mainz: 33 Fragen, 60 Minuten, ab 17 richtigen Antworten bestanden, Gebühr 25 €. Anmeldung, Vorbereitung und Ablauf.',
  },
  schema: 'Exam',
  hero: {
    eyebrow: 'Prüfung · BAMF',
    title: 'Einbürgerungstest in Mainz',
    intro:
      'Der Test „Leben in Deutschland“ für Ihre Einbürgerung – direkt bei uns in Mainz, mit persönlicher Beratung vorher.',
    image: images.team,
    facts: [
      { icon: 'book', label: 'Fragen', value: '33 (30 + 3 zu Rheinland-Pfalz)' },
      { icon: 'clock', label: 'Dauer', value: '60 Minuten' },
      { icon: 'check', label: 'Bestanden', value: 'ab 17 richtigen Antworten' },
      { icon: 'euro', label: 'Gebühr', value: '25 € (BAMF)' },
    ],
    primaryCta: { label: 'Termin anfragen', href: '#kontakt' },
    secondaryCta: { label: 'Online üben', href: '#vorbereitung' },
  },
  blocks: [
    {
      type: 'intro',
      id: 'der-test',
      eyebrow: 'Der Test',
      title: 'Was wird abgefragt?',
      paragraphs: [
        'Der Einbürgerungstest prüft Ihr Wissen über die Rechts- und Gesellschaftsordnung und die Lebensverhältnisse in Deutschland. Sie beantworten 33 Fragen mit je vier Antwortmöglichkeiten: 30 allgemeine Fragen und 3 Fragen zu Rheinland-Pfalz.',
        'Alle Fragen stammen aus dem offiziellen Gesamtfragenkatalog des BAMF mit 310 Fragen (300 allgemeine und je 10 pro Bundesland). Der aktuelle Katalog (Stand 07.05.2025) enthält auch Fragen zu jüdischem Leben, Antisemitismus und zur Verantwortung Deutschlands für Israel.',
      ],
      points: [
        'Leben in der Demokratie',
        'Geschichte und Verantwortung',
        'Mensch und Gesellschaft',
        'Fragen zu Rheinland-Pfalz',
      ],
      image: images.team,
    },
    {
      type: 'steps',
      id: 'ablauf',
      eyebrow: 'Ablauf',
      title: 'In fünf Schritten zum Test',
      steps: [
        {
          title: 'Anmelden',
          text: 'Melden Sie sich persönlich in unserer Sprechstunde oder telefonisch zum Test an. Bitte halten Sie Ihren Ausweis bereit.',
        },
        {
          title: 'Gebühr bezahlen',
          text: 'Die Gebühr für den Test beträgt 25 €. Die Zahlungsdetails erhalten Sie bei der Anmeldung.',
        },
        {
          title: 'Online üben',
          text: 'Mit dem kostenlosen Online-Testcenter des BAMF üben Sie alle Fragen aus dem offiziellen Katalog.',
        },
        {
          title: 'Test ablegen',
          text: 'Kommen Sie pünktlich mit einem gültigen Lichtbildausweis. Sie haben 60 Minuten Zeit.',
        },
        {
          title: 'Bescheinigung erhalten',
          text: 'Das BAMF wertet den Test aus und stellt die Bescheinigung aus. Die Bearbeitung kann derzeit mehrere Wochen dauern.',
        },
      ],
    },
    {
      type: 'columns',
      id: 'wer',
      eyebrow: 'Wer muss teilnehmen?',
      title: 'Test, Ausnahmen und Alternativen',
      columns: [
        {
          icon: 'users',
          title: 'Teilnehmen müssen',
          items: [
            'Alle, die sich einbürgern lassen möchten und keinen anderen Nachweis haben',
            'Zusätzlich sind Deutschkenntnisse auf Niveau B1 nachzuweisen',
          ],
        },
        {
          icon: 'check',
          title: 'Befreit sind zum Beispiel',
          items: [
            'Personen mit einem deutschen Schulabschluss',
            'Personen, die den Test wegen Krankheit, Behinderung oder Alter nicht ablegen können',
            'Kinder unter 16 Jahren',
            'Absolventinnen und Absolventen eines deutschen Studiums in Rechts-, Gesellschafts-, Sozial-, Politik- oder Verwaltungswissenschaft',
          ],
        },
        {
          icon: 'award',
          title: 'Auch anerkannt',
          items: [
            'Der Test „Leben in Deutschland“ aus dem Orientierungskurs – mit mindestens 17 von 33 richtigen Antworten',
          ],
        },
      ],
      note: {
        title: 'Gut zu wissen',
        text: 'Die Einbürgerungsbehörde entscheidet, welche Nachweise Sie brauchen. Klären Sie das am besten vor der Anmeldung zum Test.',
      },
    },
    {
      type: 'links',
      id: 'vorbereitung',
      eyebrow: 'Vorbereitung',
      title: 'Kostenlos üben – mit dem offiziellen Fragenkatalog',
      intro: 'Das BAMF stellt alle Fragen und einen Mustertest online bereit.',
      links: [
        {
          label: 'Online-Testcenter des BAMF',
          href: 'https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/OnlineTestcenter/online-testcenter-node.html',
          description: 'Einstieg in alle Übungsangebote.',
          kind: 'Website',
        },
        {
          label: 'Alle Fragen interaktiv',
          href: 'https://oet.bamf.de/ords/oetut/f?p=514',
          description: 'Gesamtfragenkatalog mit Lösungen – auch nach Bundesland.',
          kind: 'Online-Test',
        },
        {
          label: 'Mustertest starten',
          href: 'https://oet.bamf.de/ords/oetut/f?p=512',
          description: 'Ein kompletter Test mit 33 Fragen wie in der Prüfung.',
          kind: 'Online-Test',
        },
        {
          label: 'Gesamtfragenkatalog',
          href: 'https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Einbuergerung/gesamtfragenkatalog-lebenindeutschland.html',
          description: 'Alle 310 Fragen zum Herunterladen.',
          kind: 'PDF',
        },
        {
          label: 'Einbürgerung beim BAMF',
          href: 'https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Einbuergerung/einbuergerung-node.html',
          description: 'Offizielle Informationen zum Test und zur Einbürgerung.',
          kind: 'Website',
        },
        {
          label: 'Einbürgerung beim BMI',
          href: 'https://www.bmi.bund.de/DE/themen/verfassung/staatsangehoerigkeit/einbuergerung/einbuergerung-node.html',
          description: 'Voraussetzungen der Einbürgerung im Überblick.',
          kind: 'Website',
        },
      ],
    },
    {
      type: 'faq',
      id: 'faq',
      eyebrow: 'Häufige Fragen',
      title: 'Fragen zum Einbürgerungstest',
      items: [
        {
          question: 'Wie viele Fragen muss ich richtig beantworten?',
          answer: 'Mindestens 17 der 33 Fragen. Dann haben Sie den Test bestanden.',
        },
        {
          question: 'Was kostet der Test?',
          answer: 'Die Gebühr für den Einbürgerungstest beträgt 25 €.',
        },
        {
          question: 'Welche Fragen kommen dran?',
          answer:
            'Alle Fragen stammen aus dem offiziellen Katalog des BAMF: 30 allgemeine Fragen und 3 Fragen zu Rheinland-Pfalz, wenn Sie hier wohnen.',
        },
        {
          question: 'Wann bekomme ich das Ergebnis?',
          answer:
            'Das BAMF wertet den Test aus und schickt die Bescheinigung. Die Bearbeitung dauert derzeit mehrere Wochen.',
        },
        {
          question: 'Was muss ich am Testtag mitbringen?',
          answer: 'Einen gültigen amtlichen Lichtbildausweis. Kommen Sie bitte pünktlich.',
        },
        {
          question: 'Reicht der Test für die Einbürgerung aus?',
          answer:
            'Der Test ist ein Teil der Voraussetzungen. Außerdem brauchen Sie zum Beispiel Deutschkenntnisse auf Niveau B1. Die Einbürgerungsbehörde sagt Ihnen, was in Ihrem Fall gilt.',
        },
      ],
    },
    contact(
      'Melden Sie sich für den Einbürgerungstest an oder lassen Sie sich vorher beraten – persönlich oder am Telefon.',
    ),
    cta({
      title: 'Auch Deutsch auf B1 gesucht?',
      text: 'Den Sprachnachweis für die Einbürgerung erhalten Sie mit dem Zertifikat Deutsch / telc Deutsch B1 – ebenfalls bei uns.',
      primary: { label: 'telc Deutsch B1', href: '/pruefungen/telc#pruefung-b1' },
      secondary: { label: 'Alle Prüfungen', href: '/pruefungen' },
    }),
  ],
}
