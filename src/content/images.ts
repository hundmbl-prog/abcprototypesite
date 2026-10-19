/**
 * Placeholder photos (taken from the current abc-mainz.de media, stored locally).
 * In Step 5 these come from the Payload media collection instead.
 */
import g00459 from '@/assets/gallery/dsc00459.jpg'
import g00460 from '@/assets/gallery/dsc00460.jpg'
import g00463 from '@/assets/gallery/dsc00463.jpg'
import g00467 from '@/assets/gallery/dsc00467.jpg'
import g00468 from '@/assets/gallery/dsc00468.jpg'
import g00477 from '@/assets/gallery/dsc00477.jpg'
import g03431 from '@/assets/gallery/dsc03431.jpg'
import g03432 from '@/assets/gallery/dsc03432.jpg'
import g03443 from '@/assets/gallery/dsc03443.jpg'
import g03445 from '@/assets/gallery/dsc03445.jpg'
import g03461 from '@/assets/gallery/dsc03461.jpg'
import g03465 from '@/assets/gallery/dsc03465.jpg'
import g03427 from '@/assets/gallery/dsc03427.jpg'
import g03438 from '@/assets/gallery/dsc03438.jpg'
import g03419 from '@/assets/gallery/dsc03419.jpg'
import g03458 from '@/assets/gallery/dsc03458.jpg'
import g03447 from '@/assets/gallery/dsc03447.jpg'
import g03454 from '@/assets/gallery/dsc03454.jpg'
import abcUnterricht from '@/assets/photos/dsc00475.jpg'
import abcTelc from '@/assets/photos/dsc03421.jpg'
import abcTafel from '@/assets/photos/dsc00466.jpg'
import abcKursraum from '@/assets/photos/dsc00462.jpg'
import abcWhiteboard from '@/assets/photos/dsc00474.jpg'
import abcLernen from '@/assets/photos/dsc00473.jpg'
import abcSeminarraum from '@/assets/photos/dsc03442.jpg'
import type { StaticImageData } from 'next/image'
import type { ContentImage } from './types'
import frauenintegrationskurs from '@/assets/placeholder/frauenintegrationskurs.jpg'
import hero from '@/assets/placeholder/hero.jpg'
import mainzSkyline from '@/assets/photos/mainz-skyline.webp'
import jugendintegrationskursErfolg from '@/assets/placeholder/jugendintegrationskurs-erfolg.jpg'
import kindertagespflege from '@/assets/placeholder/kindertagespflege.jpg'
import nachhilfe from '@/assets/placeholder/nachhilfe.jpg'
import nachhilfeBadKreuznach from '@/assets/placeholder/nachhilfe-bad-kreuznach.jpg'
import paedagogik from '@/assets/placeholder/paedagogik.jpg'
import projektBruecken from '@/assets/placeholder/projekt-bruecken.jpg'
import projektJugendplattform from '@/assets/placeholder/projekt-jugendplattform.jpg'
import projektNatur from '@/assets/placeholder/projekt-natur.jpg'
import projektStartklar from '@/assets/placeholder/projekt-startklar.jpg'
import projektStrassenfotografie from '@/assets/placeholder/projekt-strassenfotografie.jpg'
import projektVielfalt from '@/assets/placeholder/projekt-vielfalt.jpg'
import pruefungen from '@/assets/placeholder/pruefungen.jpg'
import qmSchulung from '@/assets/placeholder/qm-schulung.jpg'
import sozialeProjekte from '@/assets/placeholder/soziale-projekte.jpg'
import sprachkurse from '@/assets/placeholder/sprachkurse.jpg'
import team from '@/assets/placeholder/team.jpg'
import telcHochschule from '@/assets/placeholder/telc-hochschule.jpg'
import weiterbildung from '@/assets/placeholder/weiterbildung.jpg'

function img(src: StaticImageData, alt: string): ContentImage {
  return { src, alt, width: src.width, height: src.height, blurDataURL: src.blurDataURL }
}

export const images = {
  mainzSkyline: img(mainzSkyline, 'Mainzer Rheinufer mit Dom und Altstadt bei Sonnenuntergang'),
  hero: img(hero, 'Fröhliche junge Menschen jubeln gemeinsam in einer sonnigen Straße'),
  sprachkurse: img(sprachkurse, 'Lehrer unterstützt Jugendliche an ihren Laptops im Unterricht'),
  integrationskurse: img(
    jugendintegrationskursErfolg,
    'Gruppe von Kursteilnehmenden steht gemeinsam auf einem Platz',
  ),
  pruefungen: img(pruefungen, 'Menschen arbeiten konzentriert in einem hellen Großraumbüro'),
  nachhilfe: img(nachhilfe, 'Mädchen lernt lächelnd gemeinsam mit einer Lehrerin'),
  sozialeProjekte: img(sozialeProjekte, 'Projektgruppe zeigt stolz ihre Urkunden im Freien'),
  weiterbildung: img(weiterbildung, 'Frau lernt am Computer in einer Bibliothek'),
  paedagogik: img(paedagogik, 'Zwei Frauen im vertraulichen Beratungsgespräch'),
  kindertagespflege: img(kindertagespflege, 'Drei Kinder stützen sich lachend auf Bücherstapel'),
  nachhilfeBadKreuznach: img(nachhilfeBadKreuznach, 'Zwei Kinder rechnen an einer Kreidetafel'),
  frauenintegrationskurs: img(
    frauenintegrationskurs,
    'Drei Frauen arbeiten gemeinsam an einem Werktisch',
  ),
  qmSchulung: img(telcHochschule, 'Vortrag vor Publikum in einem Veranstaltungssaal'),
  telc: img(weiterbildung, 'Frau lernt am Computer in einer Bibliothek'),
  jugendErfolg: img(
    jugendintegrationskursErfolg,
    'Gruppe von Kursteilnehmenden steht gemeinsam auf einem Platz',
  ),
  abcUnterricht: img(
    abcUnterricht,
    'Lehrerin erklärt einer Gruppe Erwachsener im ABC-Kursraum eine Aufgabe',
  ),
  abcTelc: img(abcTelc, 'Schild „telc – Lizenziertes Prüfungszentrum“ am ABC'),
  abcTafel: img(abcTafel, 'Lehrerin erklärt eine Aufgabe an der digitalen Tafel im ABC-Kursraum'),
  abcKursraum: img(abcKursraum, 'Kursraum im ABC mit Teilnehmenden vor der digitalen Tafel'),
  abcWhiteboard: img(abcWhiteboard, 'Deutsche Beispielsätze an einem Whiteboard im Unterricht'),
  abcLernen: img(abcLernen, 'Junge Erwachsene lösen im Unterricht schriftliche Aufgaben'),
  abcSeminarraum: img(abcSeminarraum, 'Heller Seminarraum im ABC mit digitalen Tafeln'),
  g00459: img(g00459, 'Lehrerin schreibt an die digitale Tafel, Kursteilnehmende im Vordergrund'),
  g00460: img(g00460, 'Lehrerin zeigt eine Aufgabe an der digitalen Tafel'),
  g00463: img(g00463, 'Blick in einen Kursraum mit Teilnehmenden und Lehrerin an der Tafel'),
  g00467: img(g00467, 'Lehrerin erklärt vor der digitalen Tafel'),
  g00468: img(g00468, 'Teilnehmende arbeiten an Tischen am Fenster'),
  g00477: img(g00477, 'Lehrerin schreibt an ein Whiteboard'),
  g03431: img(g03431, 'Kursraum mit blauen Stühlen und Tischreihen'),
  g03432: img(g03432, 'Heller Kursraum mit Whiteboard und Tischen'),
  g03443: img(g03443, 'Großer Seminarraum mit Tischreihen und Bildschirmen'),
  g03445: img(g03445, 'Seminarraum mit Tischen vor hellen Fenstern'),
  g03461: img(g03461, 'Beratungsraum mit rundem Tisch und Bildern an der Wand'),
  g03465: img(g03465, 'Kursraum mit großem Bildschirm und Tischreihen'),
  g03427: img(g03427, 'Wartebereich mit Stühlen und Pflanzen'),
  g03438: img(
    g03438,
    'Wand mit der Wertewolke des ABC, unter anderem Familie, Solidarität, Menschlichkeit und Vielfalt',
  ),
  g03419: img(g03419, 'Schild des Akademischen Bildungs-Centers an einer Wand'),
  g03458: img(g03458, 'Eingangsschild des Akademischen Bildungs-Centers am Gebäude'),
  g03447: img(g03447, 'Hochhaus vor blauem Himmel'),
  g03454: img(g03454, 'Wand mit gemalten Kinderbildern zum Thema Zukunft'),
  team: img(team, 'Gruppenfoto bei einer Fotoausstellung'),
  gruppe: img(qmSchulung, 'Gesprächsrunde in einem hellen Raum mit Pflanzen'),
  projektStrassenfotografie: img(
    projektStrassenfotografie,
    'Fotografien auf Staffeleien bei einer Ausstellung im Freien',
  ),
  projektNatur: img(projektNatur, 'Mädchen zeigt stolz ein selbst gebautes Insektenhotel'),
  projektStartklar: img(projektStartklar, 'Bewerberin im Gespräch mit einer Beraterin'),
  projektVielfalt: img(projektVielfalt, 'Fünf junge Menschen sitzen lachend auf einem Sofa'),
  projektBruecken: img(
    projektBruecken,
    'Viele Hände liegen als Zeichen des Zusammenhalts aufeinander',
  ),
  projektJugendplattform: img(projektJugendplattform, 'Jugendliche lachen gemeinsam im Freien'),
} satisfies Record<string, ContentImage>
