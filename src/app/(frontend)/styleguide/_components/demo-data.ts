/**
 * Example content for the style guide only. Facts are taken from the current abc-mainz.de pages;
 * badges are set to show every status. Real pages get their content from the CMS (Step 5).
 */
import type { CardImageData, OfferCardData } from '@/components/cards/types'
import berufssprachkurs from '@/assets/styleguide/berufssprachkurs.jpg'
import integrationskursGruppe from '@/assets/styleguide/integrationskurs-gruppe.jpg'
import jugendintegrationskurs from '@/assets/styleguide/jugendintegrationskurs.jpg'
import lernfoerderungKinder from '@/assets/styleguide/lernfoerderung-kinder.jpg'
import nachhilfe from '@/assets/styleguide/nachhilfe.jpg'
import onlineKurs from '@/assets/styleguide/online-kurs.jpg'
import projektStrassenfotografie from '@/assets/styleguide/projekt-strassenfotografie.jpg'
import pruefungTelc from '@/assets/styleguide/pruefung-telc.jpg'
import sprachkursUnterricht from '@/assets/styleguide/sprachkurs-unterricht.jpg'
import tafelMathe from '@/assets/styleguide/tafel-mathe.jpg'
import type { StaticImageData } from 'next/image'

function img(src: StaticImageData, alt: string): CardImageData {
  return { src, alt, width: src.width, height: src.height, blurDataURL: src.blurDataURL }
}

const href = '/styleguide#karten'

export const demoCards: OfferCardData[] = [
  {
    id: 'integrationskurs',
    title: 'Allgemeiner Integrationskurs',
    description:
      'Deutsch in sechs Modulen von A1 bis B1 – mit Themen aus Alltag, Arbeit und Gesundheit, danach der Orientierungskurs.',
    href,
    image: img(integrationskursGruppe, 'Kleine Lerngruppe im Gespräch an einem Tisch'),
    tag: 'Kurs',
    badge: 'plaetze-frei',
    facts: { level: 'A1–B1', duration: '600 UE + Orientierung', location: 'Mainz' },
    ctaLabel: 'Jetzt anmelden',
  },
  {
    id: 'jugendintegrationskurs',
    title: 'Jugendintegrationskurs',
    description:
      'Deutschtraining für 16- bis 26-Jährige mit einem Lernkonzept, das auf junge Menschen zugeschnitten ist.',
    href,
    image: img(jugendintegrationskurs, 'Junge Erwachsene lachen gemeinsam im Freien'),
    tag: 'Kurs',
    badge: 'neu',
    facts: { level: 'A1–B1', duration: '1.000 UE', location: 'Mainz' },
  },
  {
    id: 'alphabetisierung',
    title: 'Alphabetisierungskurs',
    description:
      'Deutsch lernen und dabei Lesen und Schreiben in lateinischer Schrift – in kleinen Gruppen bis 15 Personen.',
    href,
    image: img(sprachkursUnterricht, 'Lehrkraft unterstützt Lernende an ihren Plätzen'),
    tag: 'Kurs',
    facts: { level: 'A1–B1', duration: '1.000 UE', location: 'Mainz' },
  },
  {
    id: 'c1-hochschule',
    title: 'Deutsch Intensivkurs C1 Hochschule',
    description:
      'Vorbereitung auf das Studium in Deutschland und die telc C1 Hochschule Prüfung – 20 UE pro Woche.',
    href,
    image: img(berufssprachkurs, 'Zwei Frauen im Beratungsgespräch'),
    tag: 'Kurs',
    badge: 'ausgebucht',
    facts: { level: 'C1', duration: '120 UE', location: 'Bonifaziusplatz, Mainz', price: '540 €' },
  },
  {
    id: 'schnupperkurs',
    title: 'Kostenloser Online-Schnupperkurs',
    description:
      'Unsere Lehrkräfte und Methoden unverbindlich kennenlernen – für Anfänger (A1/A2) und Fortgeschrittene (B2).',
    href,
    image: img(onlineKurs, 'Frau lernt lächelnd am Laptop'),
    tag: 'Online',
    badge: 'kostenlos',
    facts: { level: 'A1, A2, B2', format: 'Online über Zoom', price: 'Kostenlos' },
  },
  {
    id: 'nachhilfe',
    title: 'Nachhilfe für alle Schulformen',
    description:
      'Erfahrene Lehrkräfte, alle Fächer und flexible Zeiten vor Ort – mit regelmäßigem Feedback an die Eltern.',
    href,
    image: img(nachhilfe, 'Mädchen lernt lächelnd mit einer Lehrerin'),
    tag: 'Lernförderung',
    badge: 'wenige-plaetze',
    facts: { location: 'Mainz & Bad Kreuznach', format: 'Vor Ort' },
  },
]

export const demoExtraCards: OfferCardData[] = [
  {
    id: 'telc-c1',
    title: 'telc Deutsch C1 Hochschule',
    description: 'Der Sprachnachweis für den Hochschulzugang – Prüfung direkt bei uns vor Ort.',
    href,
    image: img(pruefungTelc, 'Menschen arbeiten konzentriert in einem hellen Büro'),
    tag: 'Prüfung',
    badge: 'plaetze-frei',
    facts: { level: 'C1', location: 'Mainz', price: '175 €' },
    ctaLabel: 'Jetzt anmelden',
  },
  {
    id: 'strassenfotografie',
    title: 'Straßenfotografie Mainz 2026',
    description:
      'Mit der Kamera die Mainzer Neu- und Altstadt entdecken und die eigene Perspektive auf die Stadt zeigen.',
    href,
    image: img(projektStrassenfotografie, 'Ausstellung mit Fotografien auf Staffeleien im Freien'),
    tag: 'Projekt',
    facts: { location: 'Mainz' },
    ctaLabel: 'Projekt ansehen',
  },
  {
    id: 'lernfoerderung',
    title: 'Bildungs- und Lernförderung',
    description:
      'Angepasste Förderung für jedes Kind – damit Motivation und Selbstvertrauen wachsen.',
    href,
    image: img(lernfoerderungKinder, 'Drei Kinder stützen sich lachend auf einen Bücherstapel'),
    tag: 'Lernförderung',
    facts: { location: 'Mainz & Bad Kreuznach' },
  },
  {
    id: 'mathe',
    title: 'Mathematik-Nachhilfe',
    description:
      'Von Bruchrechnung bis Stochastik: Schritt für Schritt zu mehr Sicherheit im Fach.',
    href,
    image: img(tafelMathe, 'Zwei Kinder rechnen an einer Kreidetafel'),
    tag: 'Lernförderung',
    facts: { format: 'Vor Ort' },
  },
]

export const demoSplitImage = img(
  integrationskursGruppe,
  'Kleine Lerngruppe im Gespräch an einem Tisch',
)
export const demoArchImage = img(
  jugendintegrationskurs,
  'Junge Erwachsene lachen gemeinsam im Freien',
)
export const demoSharpImage = img(
  projektStrassenfotografie,
  'Ausstellung mit Fotografien auf Staffeleien im Freien',
)
