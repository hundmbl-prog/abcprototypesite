import { cn } from '@/lib/cn'

/**
 * Large decorative background word. Drawn as SVG (not text) so it is ignored by screen readers
 * and by contrast checks – it is decoration only.
 */
export function Watermark({ text, className }: { text: string; className?: string }) {
  const width = text.length * 62
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox={`0 0 ${width} 100`}
      className={cn('pointer-events-none absolute select-none', className)}
      fill="currentColor"
    >
      <text
        x="0"
        y="88"
        fontSize="112"
        fontWeight="700"
        fontFamily="var(--font-display)"
        textLength={width}
      >
        {text}
      </text>
    </svg>
  )
}
