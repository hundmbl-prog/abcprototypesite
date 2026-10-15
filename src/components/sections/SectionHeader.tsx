import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Eyebrow + heading + intro text, with an optional action on the right. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  action,
  as: Heading = 'h2',
  align = 'start',
  tone = 'light',
  className,
}: {
  id?: string
  eyebrow?: string
  title: string
  intro?: string
  action?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  align?: 'start' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <header
      data-reveal
      className={cn(
        'mb-10 flex flex-col gap-6 md:mb-14',
        align === 'center'
          ? 'items-center text-center'
          : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('flex max-w-narrow flex-col gap-4', align === 'center' && 'items-center')}>
        {eyebrow ? (
          <p
            className={cn(
              'inline-flex items-center gap-3 text-small font-semibold tracking-widest uppercase',
              tone === 'dark' ? 'text-red-300' : 'text-red-600',
            )}
          >
            <span aria-hidden className="h-0.5 w-8 bg-current" />
            {eyebrow}
          </p>
        ) : null}
        <Heading
          id={id}
          className={cn(
            Heading === 'h1' ? 'text-h1' : 'text-h2',
            tone === 'light' && 'text-blue-900',
          )}
        >
          {title}
        </Heading>
        {intro ? (
          <p
            className={cn(
              'max-w-prose text-lead',
              tone === 'light' ? 'text-ink-muted' : 'text-on-dark-muted',
            )}
          >
            {intro}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  )
}
