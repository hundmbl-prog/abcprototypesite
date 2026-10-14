import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'
import type { PreviewState } from './Button'
import { Icon } from './Icon'

type FilterChipProps = Omit<ComponentPropsWithoutRef<'button'>, 'type'> & {
  selected?: boolean
  count?: number
  preview?: PreviewState
}

/** Toggle chip for filtering lists (e.g. level A1–C1, location, online/in Präsenz). */
export function FilterChip({
  selected = false,
  count,
  preview,
  className,
  children,
  ...rest
}: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-preview={preview}
      className={cn(
        'inline-flex min-h-11 items-center gap-2 rounded-pill border px-4 text-small font-semibold transition-colors duration-(--dur-base)',
        'disabled:cursor-not-allowed disabled:opacity-50 foc:outline-2 foc:outline-offset-3 foc:outline-(--focus-ring)',
        selected
          ? 'border-navy bg-navy text-on-dark hov:bg-navy-2'
          : 'border-control bg-surface text-ink hov:border-navy hov:bg-surface-3',
        className,
      )}
      {...rest}
    >
      {selected ? <Icon name="check" className="size-4" /> : null}
      {children}
      {count !== undefined ? (
        <span
          className={cn(
            'rounded-pill px-2 text-caption',
            selected ? 'bg-on-dark/15' : 'bg-surface-3 text-ink-muted',
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  )
}
