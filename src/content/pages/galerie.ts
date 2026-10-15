/** Fotogalerie – photos from the shared Drive folder "Photos 2026" (web copies) and project photos. */
import { images } from '../images'
import type { ContentPage, GalleryItem } from '../types'
import { cta } from './shared'

const items: GalleryItem[] = [
  { image: images.abcUnterricht, album: 'Unterricht', caption: 'Unterricht im Integrationskurs' },
  { image: images.g00459, album: 'Unterricht', caption: 'An der digitalen Tafel' },
  { image: images.abcTafel, album: 'Unterricht', caption: 'Gemeinsam Aufgaben lösen' },
  { image: images.g00463, album: 'Unterricht', caption: 'Ein Blick in den Kursraum' },
  { image: images.abcLernen, album: 'Unterricht', caption: 'Konzentriert bei der Sache' },
  { image: images.g00467, album: 'Unterricht', caption: 'Erklären und nachfragen' },
  { image: images.abcWhiteboard, album: 'Unterricht', caption: 'Grammatik am Whiteboard' },
  { image: images.g00460, album: 'Unterricht', caption: 'Schritt für Schritt' },
  { image: images.g00468, album: 'Unterricht', caption: 'Arbeiten am Fenster' },
  { image: images.g00477, album: 'Unterricht', caption: 'Tafelbild' },
  { image: images.g03438, album: 'Unsere Räume', caption: 'Unsere Werte als Wertewolke' },
  {
    image: images.abcSeminarraum,
    album: 'Unsere Räume',
    caption: 'Seminarraum mit digitalen Tafeln',
  },
  { image: images.g03431, album: 'Unsere Räume', caption: 'Kursraum' },
  { image: images.g03443, album: 'Unsere Räume', caption: 'Großer Seminarraum' },
  { image: images.g03465, album: 'Unsere Räume', caption: 'Kursraum mit Bildschirm' },
  { image: images.g03432, album: 'Unsere Räume', caption: 'Heller Kursraum' },
  { image: images.g03445, album: 'Unsere Räume', caption: 'Seminarraum' },
  { image: images.g03461, album: 'Unsere Räume', caption: 'Beratungsraum' },
  { image: images.g03427, album: 'Unsere Räume', caption: 'Wartebereich' },
  { image: images.g03454, album: 'Unsere Räume', caption: 'Kinderbilder zum Thema Zukunft' },
  { image: images.abcTelc, album: 'Standort Mainz', caption: 'Lizenziertes telc Prüfungszentrum' },
  { image: images.g03419, album: 'Standort Mainz', caption: 'Willkommen im ABC' },
  { image: images.g03458, album: 'Standort Mainz', caption: 'Unser Eingang' },
  { image: images.g03447, album: 'Standort Mainz', caption: 'Rund um unseren Standort' },
  { image: images.sozialeProjekte, album: 'Projekte', caption: 'Straßenfotografie Mainz' },
  { image: images.projektStrassenfotografie, album: 'Projekte', caption: 'Ausstellung im Freien' },
  { image: images.team, album: 'Projekte', caption: 'Bei einer Fotoausstellung' },
  { image: images.jugendErfolg, album: 'Projekte', caption: 'Gemeinsam unterwegs' },
]

export const galeriePage: ContentPage = {
  path: 'fotogalerie',
  label: 'Fotogalerie',
  seo: {
    title: 'Fotogalerie – Einblicke ins ABC',
    description:
      'Fotos aus Unterricht, Räumen und Projekten des Akademischen Bildungs-Centers e.V. in Mainz.',
  },
  hero: {
    eyebrow: 'Fotogalerie',
    title: 'Einblicke ins ABC',
    intro: 'Unterricht, Räume und Projekte – so sieht es bei uns aus.',
    image: images.g03438,
    primaryCta: { label: 'Fotos ansehen', href: '#fotos' },
  },
  blocks: [
    {
      type: 'gallery',
      id: 'fotos',
      eyebrow: 'Galerie',
      title: 'Unsere Bilder',
      intro:
        'Klicken Sie auf ein Foto, um es groß anzusehen – mit den Pfeiltasten blättern Sie weiter.',
      items,
    },
    cta({
      title: 'Lust, uns kennenzulernen?',
      text: 'Besuchen Sie uns in Mainz oder Bad Kreuznach.',
      primary: { label: 'Kontakt', href: '/ueber-uns/kontakt' },
      secondary: { label: 'Unsere Kurse', href: '/kurse' },
    }),
  ],
}
