/**
 * Placeholder photos (taken from the current abc-mainz.de media, stored locally).
 * In Step 5 these come from the Payload media collection instead.
 */
import type { StaticImageData } from 'next/image'
import type { ContentImage } from './types'
import frauenintegrationskurs from '@/assets/placeholder/frauenintegrationskurs.jpg'
import hero from '@/assets/placeholder/hero.jpg'
import jugendintegrationskursErfolg from '@/assets/placeholder/jugendintegrationskurs-erfolg.jpg'
import kindertagespflege from '@/assets/placeholder/kindertagespflege.jpg'
import nachhilfe from '@/assets/placeholder/nachhilfe.jpg'
import nachhilfeBadKreuznach from '@/assets/placeholder/nachhilfe-bad-kreuznach.jpg'
import paedagogik from '@/assets/placeholder/paedagogik.jpg'
import person1 from '@/assets/placeholder/person-1.jpg'
import person2 from '@/assets/placeholder/person-2.jpg'
import person3 from '@/assets/placeholder/person-3.jpg'
import person4 from '@/assets/placeholder/person-4.jpg'
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
import telcHochschule from '@/assets/placeholder/telc-hochschule.jpg'
import weiterbildung from '@/assets/placeholder/weiterbildung.jpg'

function img(src: StaticImageData, alt: string): ContentImage {
  return { src, alt, width: src.width, height: src.height, blurDataURL: src.blurDataURL }
}

export const images = {
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
  person1: img(person1, 'Porträt eines lächelnden Mannes mit Brille'),
  person2: img(person2, 'Porträt einer lächelnden Frau mit Kopftuch'),
  person3: img(person3, 'Porträt eines Mannes mit Bart'),
  person4: img(person4, 'Porträt einer Frau im Blazer'),
} satisfies Record<string, ContentImage>
