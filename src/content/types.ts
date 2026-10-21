/**
 * Content shapes used by the frontend. They mirror the Payload collections planned for Step 5,
 * so swapping the data source later does not change any component.
 */
import type { CardImageData, CardVariant, OfferCardData } from '@/components/cards/types'
import type { IconName } from '@/components/ui/Icon'
import type { FormId } from '@/lib/forms/definitions'

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
  eyebrow: string
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
    cta: NavLink
  }
  news: SectionIntro & { items: NewsItem[]; cta: NavLink }
  why: SectionIntro & { stats: Stat[]; points: string[]; image: ContentImage }
  partners: SectionIntro & { items: Partner[] }
}

/* ───────────────────────── Content pages (Payload "pages" collection with blocks in Step 5) */

export type FactItem = { icon: IconName; label: string; value: string }
export type FaqItem = { question: string; answer: string }
export type StepItem = { title: string; text: string }
export type ResourceLink = {
  label: string
  href: string
  description?: string
  /** File type shown as a small tag. */
  kind?: 'Website' | 'PDF' | 'ZIP' | 'MP3' | 'Online-Test'
}

export type PageHero = {
  eyebrow: string
  title: string
  intro: string
  /** Only main pages (Kurse, Prüfungen) show a photo; all others get the compact blue hero. */
  image?: ContentImage
  facts?: FactItem[]
  primaryCta?: NavLink
  secondaryCta?: NavLink
}

type BlockBase = { id: string; eyebrow?: string; title: string; intro?: string }

export type IntroBlock = BlockBase & {
  type: 'intro'
  paragraphs: string[]
  points?: string[]
  /** Without an image the points are shown in a blue data panel instead. */
  image?: ContentImage
  reverse?: boolean
}
export type CardsBlock = BlockBase & {
  type: 'cards'
  variant: CardVariant
  cards: OfferCardData[]
  cta?: NavLink
  /** Classic variant only: photo with the info box below (no fact icons). */
  simple?: boolean
  /** Classic simple only: a wide, flat photo (e.g. news) instead of 4:3. */
  wide?: boolean
  /** Optional filter chips by level fact or by category tag. */
  filterBy?: 'level' | 'tag'
}
export type ColumnsBlock = BlockBase & {
  type: 'columns'
  columns: Array<{ icon: IconName; title: string; items: string[] }>
  note?: { title: string; text: string }
}
export type StepsBlock = BlockBase & { type: 'steps'; steps: StepItem[]; cta?: NavLink }
export type TabsBlock = BlockBase & {
  type: 'tabs'
  tabs: Array<{ id: string; label: string; heading: string; text: string; items?: string[] }>
}
export type ExamPart = { name: string; minutes: number; text: string }
export type ExamStructureBlock = BlockBase & {
  type: 'exam-structure'
  written: ExamPart[]
  /** Break between written parts in minutes, if any. */
  breakMinutes?: number
  oral: { minutes: number; format: string; preparation?: string; text: string }
  notes: string[]
}
export type FaqBlock = BlockBase & { type: 'faq'; items: FaqItem[] }
export type LinksBlock = BlockBase & { type: 'links'; links: ResourceLink[] }
export type ContactBlock = BlockBase & {
  type: 'contact'
  /** Location id from site settings. */
  locationId: string
  email: string
  text: string
}
export type CtaBlock = BlockBase & {
  type: 'cta'
  text: string
  primary: NavLink
  secondary?: NavLink
}
export type ExamDatesBlock = BlockBase & { type: 'exam-dates'; emptyText: string }
export type FeesBlock = BlockBase & {
  type: 'fees'
  rows: Array<{ label: string; value: string; note?: string }>
  officialFees: Array<{ label: string; value: string }>
  note: string
}
export type RegistrationBlock = BlockBase & { type: 'telc-registration' }

/** One course type in the style of a course catalogue: hours, target group, levels, contents, modules. */
export type CourseType = {
  id: string
  icon: IconName
  title: string
  hours: string
  summary: string
  audience: string
  levels: string[]
  contents: string[]
  modulesIntro?: string
  modules: Array<{ badge: string; level: string; text: string }>
}
export type CourseTypesBlock = BlockBase & { type: 'course-types'; courses: CourseType[] }
export type FeaturesBlock = BlockBase & {
  type: 'features'
  items: Array<{ icon: IconName; title: string; text: string }>
}
/** A detailed section (project or offer) that cards on the same page link to by its id. */
export type SpotlightBlock = BlockBase & {
  type: 'spotlight'
  /** Without an image the facts are shown in a blue data panel instead. */
  image?: ContentImage
  paragraphs: string[]
  facts?: Array<{ label: string; value: string }>
  lists?: Array<{ title: string; items: string[] }>
  funding?: string
  contact?: { label: string; email?: string; phone?: string }
  link?: ResourceLink
  /** Small link back to the card overview of the page. */
  back?: NavLink
  reverse?: boolean
}
export type ExamLevel = {
  id: string
  level: string
  name: string
  about: string[]
  written: ExamPart[]
  breakMinutes?: number
  oral: { minutes: number; format: string; preparation?: string; text: string }
  notes: string[]
  links: ResourceLink[]
}
export type ExamLevelsBlock = BlockBase & { type: 'exam-levels'; levels: ExamLevel[] }

export type FormBlock = BlockBase & {
  type: 'form'
  formId: FormId
  /** Short points shown beside the form. */
  points?: string[]
  /** Address for the "send us an e-mail instead" note. */
  email?: string
}
export type ContactsBlock = BlockBase & {
  type: 'contacts'
  items: Array<{ icon: IconName; title: string; text?: string; email?: string; phone?: string }>
}
export type LocationsBlock = BlockBase & { type: 'locations' }
export type GalleryItem = { image: ContentImage; album: string; caption: string }
export type GalleryBlock = BlockBase & { type: 'gallery'; items: GalleryItem[] }
export type PressBlock = BlockBase & {
  type: 'press'
  items: Array<{ outlet: string; date: string; title: string }>
}
export type ArticleBlock = BlockBase & {
  type: 'article'
  paragraphs: string[]
  points?: string[]
  /** Shown whole (no cropping) above the text. */
  image?: ContentImage
}

export type PageBlock =
  | IntroBlock
  | CardsBlock
  | ColumnsBlock
  | StepsBlock
  | TabsBlock
  | ExamStructureBlock
  | FaqBlock
  | LinksBlock
  | ContactBlock
  | CtaBlock
  | ExamDatesBlock
  | FeesBlock
  | RegistrationBlock
  | CourseTypesBlock
  | FeaturesBlock
  | SpotlightBlock
  | ExamLevelsBlock
  | FormBlock
  | ContactsBlock
  | LocationsBlock
  | GalleryBlock
  | PressBlock
  | ArticleBlock

export type LegalContent = {
  intro?: string
  /** Shown as a note at the top, e.g. what must be checked before launch. */
  reviewNote?: string
  sections: Array<{
    id: string
    title: string
    content: Array<{ type: 'p' | 'h3'; text: string } | { type: 'ul'; items: string[] }>
  }>
}

export type ContentPage = {
  /** Path without leading slash, e.g. "pruefungen/telc". */
  path: string
  /** Short name for breadcrumbs and menus. */
  label: string
  seo: { title: string; description: string }
  hero: PageHero
  blocks: PageBlock[]
  /** Optional structured data type for this page. */
  schema?: 'Course' | 'Exam'
  /** Legal pages: clean text layout with a sticky table of contents instead of blocks. */
  legal?: LegalContent
}

/* ───────────────────────── telc exams and exam dates (Payload collections in Step 5) */

export type TelcExam = {
  id: string
  /** Short level label used in filters, e.g. "B1", "C1 Hochschule". */
  level: string
  name: string
  slug: string
  /** Allows repeating only the written or oral part (B1, B2, C1). */
  partialRetake: boolean
}

export type ExamDate = {
  id: string
  examId: string
  /** ISO date "YYYY-MM-DD" (Europe/Berlin). */
  date: string
  time: string
  location: string
  /** ISO date "YYYY-MM-DD". */
  registrationDeadline: string
  seatsTotal: number
  seatsFree: number
}
