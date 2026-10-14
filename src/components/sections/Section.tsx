import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type SectionTone = 'light' | 'light-2' | 'light-3' | 'soft' | 'navy' | 'red'
export type SectionSpacing = 'sm' | 'md' | 'lg'

const tones: Record<SectionTone, string> = {
  light: 'tone-light',
  'light-2': 'tone-light-2',
  'light-3': 'tone-light-3',
  soft: 'tone-soft',
  navy: 'tone-navy',
  red: 'tone-red',
}

const spacings: Record<SectionSpacing, string> = {
  sm: 'py-section-sm',
  md: 'py-section',
  lg: 'py-section-lg',
}

/** Page section with a background tone (sets matching text + focus colours) and vertical rhythm. */
export function Section({
  tone = 'light',
  spacing = 'md',
  width = 'content',
  id,
  labelledBy,
  className,
  children,
}: {
  tone?: SectionTone
  spacing?: SectionSpacing
  width?: 'content' | 'wide' | 'full'
  id?: string
  labelledBy?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(tones[tone], spacings[spacing], className)}
    >
      <div
        className={cn(
          width === 'content' && 'container-page',
          width === 'wide' && 'container-wide',
        )}
      >
        {children}
      </div>
    </section>
  )
}
