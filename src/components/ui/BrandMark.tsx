import house from '@/assets/brand/logo-house.png'
import { cn } from '@/lib/cn'

/**
 * The ABC house as a solid tone-on-tone brand element (no transparency): the logo shape is
 * filled with ABC Blue on navy ("dark") or with the Blue tint on light backgrounds ("light").
 * Used in key places only: heroes, blue bands, the closing card and the footer.
 */
export function BrandMark({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'dark'
  className?: string
}) {
  const mask = `url(${house.src}) center / contain no-repeat`
  return (
    <span
      aria-hidden
      className={cn(
        'pointer-events-none absolute -z-10 aspect-2/1 select-none',
        tone === 'dark' ? 'bg-blue' : 'bg-surface-3',
        className,
      )}
      style={{ mask, WebkitMask: mask }}
    />
  )
}
