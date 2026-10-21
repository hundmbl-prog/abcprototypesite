import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Heading + optional intro, with an optional plain action (usually a text link) underneath.
 * Since the redesign there is no small label ("eyebrow") above the heading; the prop is
 * still accepted so content can keep it for later use.
 */
export function SectionHeader({
  id,
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
      className={cn(
        'mb-10 flex max-w-narrow flex-col gap-4 md:mb-12',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      <Heading
        id={id}
        className={cn(
          Heading === 'h1' ? 'text-h1' : Heading === 'h3' ? 'text-h3' : 'text-h2',
          tone === 'light' ? 'text-navy' : 'text-on-dark',
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
      {action ? <div>{action}</div> : null}
    </header>
  )
}
