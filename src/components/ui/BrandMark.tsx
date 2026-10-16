import Image from 'next/image'
import house from '@/assets/brand/logo-house.png'
import { cn } from '@/lib/cn'

/**
 * The ABC house as a faint background mark – used sparingly as branding in key places
 * (compact page heroes, closing card, data panels). "dark" renders it white for blue backgrounds.
 */
export function BrandMark({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <Image
      src={house}
      alt=""
      width={house.width}
      height={house.height}
      sizes="320px"
      className={cn(
        'pointer-events-none absolute -z-10 select-none',
        tone === 'dark' ? 'opacity-[0.07] brightness-0 invert' : 'opacity-[0.07]',
        className,
      )}
    />
  )
}
