/**
 * The last word of a heading with a marker underline in ABC Blue – the teacher's stroke from the
 * whiteboard in the ABC course rooms. It is drawn once when it scrolls in (ScrollReveal, via
 * `data-draw`); without JavaScript or with reduced motion it is simply there, complete.
 */
export function Marked({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden
        focusable="false"
        data-draw
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 -bottom-mark-offset h-mark w-full overflow-visible text-blue"
      >
        <path
          d="M2 7 C 30 4.5, 60 9, 98 3"
          fill="none"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  )
}
