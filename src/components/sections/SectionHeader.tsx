import type { ReactNode } from 'react'
import { Marked } from '@/components/ui/Marked'
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
  size,
  mark = false,
  reveal = true,
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
  /** Visual size only; the tag stays `as`. Default: h1 tags are text-h1, everything else text-h2. */
  size?: 'h1' | 'h2'
  /** Marker underline under the last word of the title (home page chapters). */
  mark?: boolean
  /** Fade-in when it scrolls into view. Off on the home page, where motion is scroll-linked instead. */
  reveal?: boolean
  className?: string
}) {
  const split = mark ? title.lastIndexOf(' ') : -1
  const visual = size ?? (Heading === 'h1' ? 'h1' : 'h2')
  return (
    <header
      data-reveal={reveal || undefined}
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
              'text-small font-semibold',
              tone === 'dark' ? 'text-on-dark-muted' : 'text-blue',
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <Heading
          id={id}
          className={cn(visual === 'h1' ? 'text-h1' : 'text-h2', tone === 'light' && 'text-navy')}
        >
          {split > 0 ? (
            <>
              {title.slice(0, split)} <Marked>{title.slice(split + 1)}</Marked>
            </>
          ) : (
            title
          )}
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
