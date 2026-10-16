/** All content pages (Payload "pages" collection in Step 5). */
import type { ContentPage } from '../types'
import { bildungsangebotePage, lernfoerderungPage } from './bildung'
import { formularePage } from './formulare'
import { galeriePage } from './galerie'
import { kursePage, kursSubpages } from './kurse'
import { datenschutzPage, hausordnungPage, impressumPage } from './legal'
import { articlePages, newsPage } from './news'
import { paedagogikPage } from './paedagogik'
import { pressePage } from './presse'
import { projectPages, projektePage } from './projekte'
import { einbuergerungstestPage, pruefungenPage } from './pruefungen'
import { telcPage } from './telc'
import { kontaktPage, ueberUnsPage } from './ueber-uns'

export const contentPages: ContentPage[] = [
  kursePage,
  ...kursSubpages,
  pruefungenPage,
  einbuergerungstestPage,
  telcPage,
  projektePage,
  ...projectPages,
  bildungsangebotePage,
  lernfoerderungPage,
  paedagogikPage,
  ueberUnsPage,
  kontaktPage,
  formularePage,
  newsPage,
  ...articlePages,
  pressePage,
  galeriePage,
  impressumPage,
  datenschutzPage,
  hausordnungPage,
]
