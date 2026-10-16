import type { StaticImageData } from 'next/image'
import type { BadgeStatus } from '@/components/ui/Badge'
import type { IconName } from '@/components/ui/Icon'

export type CardImageData = {
  src: string | StaticImageData
  alt: string
  width: number
  height: number
  blurDataURL?: string
}

/** Key facts shown as small icons. Every field is optional. */
export type OfferFacts = {
  level?: string
  start?: string
  duration?: string
  location?: string
  format?: string
  price?: string
}

/** One offer / course / exam / project, in the shape the CMS will deliver. */
export type OfferCardData = {
  id: string
  title: string
  description: string
  href: string
  image: CardImageData
  tag: string
  badge?: BadgeStatus
  facts?: OfferFacts
  ctaLabel?: string
  /** Icon for the photo-free "icon" variant. */
  icon?: IconName
}

export type HeadingLevel = 'h2' | 'h3' | 'h4'

/** The approved card variants ("icon" = no photo, for secondary pages). Editors choose one per section in the CMS. */
export type CardVariant = 'classic' | 'overlay' | 'horizontal' | 'bento' | 'rail' | 'icon'
