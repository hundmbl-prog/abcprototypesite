import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function SgSection({
  id,
  title,
  intro,
  children,
  tone = 'light',
}: {
  id: string
  title: string
  intro?: string
  children: ReactNode
  tone?: 'light' | 'light-2'
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titel`}
      className={cn('scroll-mt-8 py-section-sm', tone === 'light' ? 'tone-light' : 'tone-light-2')}
    >
      <div className="container-page flex flex-col gap-10">
        <header className="flex max-w-narrow flex-col gap-3">
          <h2 id={`${id}-titel`} className="text-h2 text-navy">
            {title}
          </h2>
          {intro ? <p className="text-lead text-ink-muted">{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}

export function SgSub({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h3 className="text-h4 text-navy">{title}</h3>
        {note ? <p className="text-small text-ink-muted">{note}</p> : null}
      </div>
      {children}
    </div>
  )
}

export function SgLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-caption font-semibold tracking-wide text-ink-muted uppercase">{children}</p>
  )
}
