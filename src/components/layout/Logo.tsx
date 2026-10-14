import Link from 'next/link'
import { cn } from '@/lib/cn'

/** Wordmark placeholder until the official logo files (SVG) are delivered. */
export function Logo({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <Link
      href="/"
      aria-label="ABC Mainz – zur Startseite"
      className={cn('group/logo inline-flex items-center gap-3 rounded-md', className)}
    >
      <span
        aria-hidden
        className={cn(
          'grid h-10 place-items-center rounded-sm px-2 font-display text-h4 leading-none font-bold tracking-tight transition-colors duration-(--dur-base)',
          tone === 'light' ? 'bg-ink text-on-dark' : 'bg-on-dark text-ink',
        )}
      >
        ABC
      </span>
      <span
        aria-hidden
        className={cn(
          'hidden flex-col text-caption leading-tight font-semibold sm:flex',
          tone === 'light' ? 'text-ink' : 'text-on-dark',
        )}
      >
        <span>Akademisches</span>
        <span>Bildungs-Center e.V.</span>
      </span>
    </Link>
  )
}
