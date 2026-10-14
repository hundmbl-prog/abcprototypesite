/** True when the user can hover with a precise pointer and has not asked for reduced motion. */
export function canUseHoverMotion(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
