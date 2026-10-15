/** All content pages built so far (Payload "pages" collection in Step 5). */
import type { ContentPage } from '../types'
import { integrationskursePage, integrationskursSubpages } from './integrationskurse'
import { einbuergerungstestPage, pruefungenPage } from './pruefungen'
import { sprachkursePage, sprachkursSubpages } from './sprachkurse'
import { telcExamPages, telcPage } from './telc'

export const contentPages: ContentPage[] = [
  sprachkursePage,
  ...sprachkursSubpages,
  integrationskursePage,
  ...integrationskursSubpages,
  pruefungenPage,
  einbuergerungstestPage,
  telcPage,
  ...telcExamPages,
]
