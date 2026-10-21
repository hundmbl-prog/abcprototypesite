/**
 * The last word of a heading with a brush stroke in ABC Blue underneath: a filled stroke with a
 * blunt start, a tapering dry end and two bristle streaks. It is painted once from left to right
 * when it scrolls in (ScrollReveal, via `data-draw`); without JavaScript or with reduced motion
 * it is simply there, complete.
 */
export function Marked({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      {children}
      {/* Wrapper sets the box; an svg alone would fall back to its intrinsic width */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-mark-offset -bottom-mark-offset h-mark"
      >
        <svg
          aria-hidden
          focusable="false"
          data-draw
          viewBox="0 0 200 24"
          preserveAspectRatio="none"
          fill="currentColor"
          className="block size-full overflow-visible text-blue"
        >
          <path d="M4 14 C6 10 12 9 22 9.5 C50 8 80 9.5 110 8.2 C140 7 165 6.5 186 5.8 C192 5.6 197 6.4 198 7.2 C196 8.4 190 9.2 182 9.8 C160 11.6 130 12.6 100 13.6 C70 14.6 40 16 18 17.2 C10 17.6 5 17 4 14 Z" />
          <path
            opacity="0.6"
            d="M30 18.6 C60 17.4 90 16.4 120 15.4 C135 14.9 150 14.4 160 14.1 L159 14.9 C130 15.9 90 17.4 31 19.4 Z"
          />
          <path
            opacity="0.5"
            d="M120 6.8 C140 6.1 160 5.4 178 4.7 L178 5.3 C160 6 140 6.7 121 7.4 Z"
          />
        </svg>
      </span>
    </span>
  )
}
