/**
 * Content shapes used by the frontend. They mirror the Payload collections planned for Step 5,
 * so swapping the data source later does not change any component.
 */
import type { CardImageData, OfferCardData } from '@/components/cards/types'

export type ContentImage = CardImageData

export type NavLink = {
  label: string
  href: string
  description?: string
  image?: ContentImage
}

export type NavSection = {
  label: string
  href: string
  intro: string
  image: ContentImage
  links: NavLink[]
}

export type OpeningHours = { days: string; hours: string }

/** Machine-readable opening time. day: 1 = Monday … 7 = Sunday, times as "HH:MM" (Europe/Berlin). */
export type OpeningSlot = { day: number; open: string; close: string }

export type Location = {
  id: string
  name: string
  street: string
  postalCode: string
  city: string
  phone: string
  email: string
  hours: OpeningHours[]
  /** Used for the live open/closed status. Empty = appointments only. */
  schedule: OpeningSlot[]
  /** Short label, e.g. Hauptsitz */
  kind: string
  /** Further addresses that belong to this location (branches). */
  branches?: string[]
  lat: number
  lon: number
  /** true = details not confirmed yet, must be checked before launch */
  placeholder?: boolean
}

export type SiteSettings = {
  name: string
  shortName: string
  claim: string
  foundingYear: number
  locations: Location[]
  footerAbout: string
  legalLinks: NavLink[]
}

export type HeroHighlight = { value: string; label: string }

export type HeroContent = {
  badge: string
  eyebrow: string
  highlights: HeroHighlight[]
  quickLinks: NavLink[]
  title: string
  text: string
  image: ContentImage
  primaryCta: NavLink
  secondaryCta: NavLink
}

export type NewsItem = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  image: ContentImage
}

export type Project = {
  id: string
  slug: string
  title: string
  description: string
  partners: string[]
  image: ContentImage
}

export type Stat = {
  id: string
  value: number
  prefix?: string
  suffix?: string
  label: string
  placeholder?: boolean
}

export type Partner = { id: string; name: string; url?: string; logo?: ContentImage }

export type SectionIntro = { eyebrow: string; title: string; intro?: string }

export type HomePage = {
  hero: HeroContent
  offers: SectionIntro & { cards: OfferCardData[]; cta: NavLink }
  about: SectionIntro & {
    paragraphs: string[]
    image: ContentImage
    badge: { value: string; label: string }
    milestones: Array<{ id: string; year: string; text: string }>
    cta: NavLink
  }
  news: SectionIntro & { items: NewsItem[]; cta: NavLink }
  projects: SectionIntro & { items: Project[]; cta: NavLink }
  why: SectionIntro & { stats: Stat[]; points: string[]; caption: string }
  partners: SectionIntro & { items: Partner[] }
  locations: SectionIntro
}
