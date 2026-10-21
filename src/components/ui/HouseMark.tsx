import { cn } from '@/lib/cn'

/* The ABC house redrawn as lines on the logo's 400 × 200 grid: roof, gabled body, three puzzle seams. */
const ROOF = 'M14 128 L200 16 L386 128'
/* Walls hang free under the roof (no slanted top edge), like the logo – the roof keeps its round ends */
const BODY = 'M58 118 V176 a14 14 0 0 0 14 14 H328 a14 14 0 0 0 14 -14 V118'
const SEAMS =
  'M196 40 V84 a24 24 0 0 0 0 48 V190 M58 132 H96 a28 28 0 0 0 56 0 H196 M196 150 H234 a30 30 0 0 1 60 0 H342'

/**
 * The house from the ABC logo as a stroke drawing in the current text colour – the quiet
 * decoration of the home page. "roof" is the chevron alone, "outline" the whole house with its
 * puzzle seams. Decoration only: aria-hidden, no pointer events.
 */
export function HouseMark({
  variant = 'outline',
  stroke = 4,
  className,
}: {
  variant?: 'outline' | 'roof'
  /** Stroke width in screen pixels (it does not scale with the size). */
  stroke?: number
  className?: string
}) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox={variant === 'roof' ? '0 0 400 144' : '0 0 400 200'}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('pointer-events-none overflow-visible select-none', className)}
    >
      <path d={ROOF} vectorEffect="non-scaling-stroke" />
      {variant === 'outline' ? (
        <>
          <path d={BODY} vectorEffect="non-scaling-stroke" />
          <path d={SEAMS} vectorEffect="non-scaling-stroke" />
        </>
      ) : null}
    </svg>
  )
}
