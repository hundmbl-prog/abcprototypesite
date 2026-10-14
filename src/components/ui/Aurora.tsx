import { cn } from '@/lib/cn'

const presets = {
  offers: [
    '-top-40 -right-32 size-144 bg-blue-200',
    'top-1/2 -left-48 size-120 bg-blue-100',
    '-bottom-24 right-1/3 size-80 bg-red-100',
  ],
  news: [
    '-top-32 -left-24 size-136 bg-red-200',
    'top-1/3 -right-40 size-112 bg-red-100',
    'bottom-0 left-1/3 size-72 bg-blue-100',
  ],
  stats: [
    '-top-40 -left-24 size-144 bg-blue-500',
    'bottom-0 -right-32 size-120 bg-red-500',
    'top-1/3 left-1/2 size-80 bg-blue-700',
  ],
  projects: ['-top-32 right-1/4 size-136 bg-blue-200', 'bottom-0 -left-24 size-96 bg-blue-100'],
  people: ['-top-24 right-0 size-120 bg-red-100', 'bottom-0 -left-32 size-112 bg-red-200'],
  partners: ['top-0 left-1/4 size-120 bg-blue-600', '-bottom-24 right-1/4 size-80 bg-red-600'],
  locations: ['-bottom-32 right-0 size-120 bg-blue-200', '-top-24 -left-24 size-80 bg-blue-100'],
} as const

/** Soft, blurred colour fields behind a section, in that section's colour family. */
export function Aurora({
  preset,
  strength = 'soft',
  className,
}: {
  preset: keyof typeof presets
  strength?: 'soft' | 'glow'
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
    >
      {presets[preset].map((blob) => (
        <span
          key={blob}
          className={cn(
            'absolute rounded-pill blur-3xl',
            strength === 'glow' ? 'opacity-40' : 'opacity-70',
            blob,
          )}
        />
      ))}
    </div>
  )
}

/** Fine dot grid texture for a section background. */
export function DotGrid({
  className,
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'dark'
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] [background-size:1.5rem_1.5rem]',
        tone === 'light'
          ? '[background-image:radial-gradient(var(--color-blue-200)_1px,transparent_1px)]'
          : '[background-image:radial-gradient(color-mix(in_srgb,var(--color-surface)_14%,transparent)_1px,transparent_1px)]',
        className,
      )}
    />
  )
}
