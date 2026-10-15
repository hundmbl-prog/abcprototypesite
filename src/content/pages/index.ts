/** All content pages built so far (Payload "pages" collection in Step 5). */
import type { ContentPage } from '../types'
import { bildungsangebotePage, lernfoerderungPage } from './bildung'
import { kursePage, kursSubpages } from './kurse'
import { projektePage } from './projekte'
import { einbuergerungstestPage, pruefungenPage } from './pruefungen'
import { telcPage } from './telc'

export const contentPages: ContentPage[] = [
  kursePage,
  ...kursSubpages,
  pruefungenPage,
  einbuergerungstestPage,
  telcPage,
  projektePage,
  bildungsangebotePage,
  lernfoerderungPage,
]
