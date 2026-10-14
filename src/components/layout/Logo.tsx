import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import logoFull from '@/assets/brand/logo-full.png'
import logoWordmark from '@/assets/brand/logo-wordmark.png'

/**
 * Official ABC logo. "wordmark" (ABC + name, one line) for the header,
 * "full" (with the house) for the footer and menus.
 */
export function Logo({
  variant = 'wordmark',
  className,
}: {
  variant?: 'wordmark' | 'full'
  className?: string
}) {
  const src = variant === 'full' ? logoFull : logoWordmark
  return (
    <Link href="/" className={cn('inline-flex shrink-0 items-center rounded-md', className)}>
      <Image
        src={src}
        alt="ABC – Akademisches Bildungs-Center e.V., zur Startseite"
        width={src.width}
        height={src.height}
        sizes={variant === 'full' ? '240px' : '220px'}
        priority={variant === 'wordmark'}
        className={cn('w-auto', variant === 'full' ? 'h-24' : 'h-8 md:h-10')}
      />
    </Link>
  )
}
