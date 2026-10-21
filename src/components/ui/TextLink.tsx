import Link from 'next/link'
import { cn } from '@/lib/cn'

/** Plain inline text link with a small arrow – used instead of a button where an action is secondary. */
export function TextLink({
  href,
  children,
  tone = 'light',
  className,
}: {
  href: string
  children: React.ReactNode
  /** "dark" = white link on the blue closing band */
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-1.5 font-semibold underline-offset-4 hov:underline',
        tone === 'dark' ? 'text-on-dark' : 'text-blue hov:text-blue-strong',
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-(--dur-base) group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  )
}
