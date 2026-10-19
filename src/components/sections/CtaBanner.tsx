import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const textTone = { navy: 'text-on-dark-muted', red: 'text-on-dark', soft: 'text-navy' } as const

/**
 * Closing call-to-action band. "navy" is the default; "red" is for short, urgent banners only.
 * Pass exactly one main action (and optionally one secondary).
 */
export function CtaBanner({
  title,
  text,
  actions,
  tone = 'navy',
  as: Heading = 'h2',
  className,
}: {
  title: string
  text?: string
  actions: ReactNode
  tone?: 'navy' | 'red' | 'soft'
  as?: 'h2' | 'h3' | 'h4'
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-2xl px-6 py-12 md:px-12 md:py-16',
        tone === 'navy' && 'tone-navy',
        tone === 'red' && 'tone-red',
        tone === 'soft' && 'tone-soft',
        className,
      )}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-narrow flex-col gap-3">
          <Heading className="text-h2">{title}</Heading>
          {text ? <p className={cn('text-lead', textTone[tone])}>{text}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">{actions}</div>
      </div>
    </div>
  )
}
