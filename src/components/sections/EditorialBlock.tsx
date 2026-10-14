import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Sharp-edged text block with a strong rule – for quotes, mission statements, key facts. */
export function EditorialBlock({
  kicker,
  children,
  footer,
  className,
}: {
  kicker?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}) {
  return (
    <figure
      className={cn('rounded-none border-l-4 border-red bg-surface-2 p-8 md:p-12', className)}
    >
      {kicker ? (
        <p className="mb-4 text-small font-semibold tracking-widest text-ink-muted uppercase">
          {kicker}
        </p>
      ) : null}
      <blockquote className="font-display text-h3 text-navy">{children}</blockquote>
      {footer ? <figcaption className="mt-6 text-small text-ink-muted">{footer}</figcaption> : null}
    </figure>
  )
}
