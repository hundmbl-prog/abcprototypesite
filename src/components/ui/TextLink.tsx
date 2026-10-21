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
        // hover: turns red and grows slightly (no underline)
        'group inline-flex origin-left items-center gap-1.5 font-semibold transition-[color,transform] duration-(--dur-base) ease-out-expo hov:scale-105',
        tone === 'dark' ? 'text-on-dark hov:text-red-200' : 'text-blue hov:text-red',
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-(--dur-base) group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  )
}
