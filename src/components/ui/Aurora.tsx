import { cn } from '@/lib/cn'

type Blob = { className: string }

const presets: Record<'news' | 'projects' | 'locations', Blob[]> = {
  news: [
    { className: '-top-24 -left-32 size-120 bg-blue-soft' },
    { className: 'top-1/3 -right-40 size-96 bg-red-soft' },
  ],
  projects: [
    { className: '-top-32 right-1/4 size-120 bg-blue-soft' },
    { className: 'bottom-0 -left-24 size-96 bg-red-soft' },
  ],
  locations: [{ className: '-bottom-32 right-0 size-120 bg-blue-soft' }],
}

/** Soft, blurred colour fields behind a section – gives glass panels something to reflect. */
export function Aurora({
  preset,
  className,
}: {
  preset: keyof typeof presets
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
    >
      {presets[preset].map((blob, i) => (
        <span key={i} className={cn('absolute rounded-pill opacity-70 blur-3xl', blob.className)} />
      ))}
    </div>
  )
}
