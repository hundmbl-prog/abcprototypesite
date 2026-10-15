/**
 * Data access for the frontend. Async on purpose: in Step 5 these functions query Payload,
 * and no component has to change.
 */
import { homePage } from './home'
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

export type { HomePage, Location, NavSection, NewsItem, Project, SiteSettings } from './types'
