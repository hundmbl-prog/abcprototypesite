import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type TagTone = 'light' | 'image' | 'dark'

const tones: Record<TagTone, string> = {
  light: 'bg-blue-soft text-navy',
  image: 'bg-surface/90 text-navy backdrop-blur-sm',
  dark: 'border border-on-dark/40 text-on-dark',
}

/** Category pill, e.g. "Kurs", "Prüfung", "Projekt". */
export function Tag({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode
  tone?: TagTone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-3 py-1 text-caption font-semibold tracking-wide uppercase',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
