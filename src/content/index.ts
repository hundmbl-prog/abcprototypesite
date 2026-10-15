/**
 * Data access for the frontend. Async on purpose: in Step 5 these functions query Payload,
 * and no component has to change.
 */
import { examDates, telcExams } from './exams'
import { homePage } from './home'
import { contentPages } from './pages'
import { footerNavigation, headerCta, mainNavigation, siteSettings } from './site'

export async function getSiteSettings() {
  return siteSettings
}

export async function getNavigation() {
  return { main: mainNavigation, cta: headerCta, footer: footerNavigation }
}

export async function getHomePage() {
  return homePage
}

export async function getContentPage(path: string) {
  return contentPages.find((page) => page.path === path) ?? null
}

export async function getContentPaths() {
  return contentPages.map((page) => page.path)
}

/** Label for each known path – used for breadcrumbs. */
export async function getPathLabels() {
  return new Map(contentPages.map((page) => [page.path, page.label]))
}

export async function getTelcData() {
  return { exams: telcExams, dates: examDates }
}

export type {
  ContentPage,
  HomePage,
  Location,
  NavSection,
  NewsItem,
  Project,
  SiteSettings,
} from './types'
