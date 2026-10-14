/** Partner and funder logos (taken from the current abc-mainz.de media). */
import type { StaticImageData } from 'next/image'
import aktionMensch from '@/assets/partners/aktion-mensch.png'
import bamf from '@/assets/partners/bamf.png'
import bmasEsf from '@/assets/partners/bmas-esf.png'
import bundesagentur from '@/assets/partners/bundesagentur-fuer-arbeit.png'
import certqua from '@/assets/partners/certqua.png'
import fernsehlotterie from '@/assets/partners/deutsche-fernsehlotterie.png'
import insl from '@/assets/partners/insl.png'
import paritaetische from '@/assets/partners/paritaetische.png'
import rueckenwind from '@/assets/partners/rueckenwind.png'
import swl from '@/assets/partners/swl.png'
import telc from '@/assets/partners/telc.png'
import type { Partner } from './types'

function logo(src: StaticImageData, name: string) {
  return { src, alt: `Logo ${name}`, width: src.width, height: src.height }
}

export const partners: Partner[] = [
  { id: 'telc', name: 'telc – lizenziertes Prüfungszentrum', logo: logo(telc, 'telc') },
  {
    id: 'bamf',
    name: 'Bundesamt für Migration und Flüchtlinge',
    logo: logo(bamf, 'Bundesamt für Migration und Flüchtlinge'),
  },
  {
    id: 'ba',
    name: 'Bundesagentur für Arbeit',
    logo: logo(bundesagentur, 'Bundesagentur für Arbeit'),
  },
  { id: 'aktion-mensch', name: 'Aktion Mensch', logo: logo(aktionMensch, 'Aktion Mensch') },
  {
    id: 'bmas-esf',
    name: 'Bundesministerium für Arbeit und Soziales / ESF',
    logo: logo(bmasEsf, 'Bundesministerium für Arbeit und Soziales und Europäische Union'),
  },
  {
    id: 'fernsehlotterie',
    name: 'Deutsche Fernsehlotterie',
    logo: logo(fernsehlotterie, 'Deutsche Fernsehlotterie Stiftung'),
  },
  { id: 'paritaetische', name: 'Der Paritätische', logo: logo(paritaetische, 'Der Paritätische') },
  { id: 'certqua', name: 'CERTQUA', logo: logo(certqua, 'CERTQUA Qualitätsmanagement') },
  { id: 'insl', name: 'InSL e.V.', logo: logo(insl, 'InSL e.V. – Sprachbildung mit System') },
  { id: 'swl', name: 'SWL', logo: logo(swl, 'SWL') },
  { id: 'rueckenwind', name: 'rückenwind³', logo: logo(rueckenwind, 'rückenwind³') },
]
