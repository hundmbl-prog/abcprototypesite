'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useLenis } from '@/components/motion/SmoothScroll'
import { cn } from '@/lib/cn'
import type { Location, NavSection } from '@/content'
import type { NavLink } from '@/content/types'
import { Logo } from './Logo'
import { MegaMenu } from './MegaMenu'
import { MobileMenu } from './MobileMenu'

/** Pages whose first section is a dark full-screen hero: the header starts transparent there. */
const OVERLAY_PATHS = new Set(['/'])

export function HeaderClient({
  sections,
  cta,
  location,
}: {
  sections: NavSection[]
  cta: NavLink
  location?: Location
}) {
  const pathname = usePathname()
  const lenis = useLenis()
  const [scrolled, setScrolled] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([])
  const closeTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on navigation.
  useEffect(() => {
    setOpenIndex(null)
    setMobileOpen(false)
  }, [pathname])

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return
    lenis?.stop()
    const { overflow } = document.documentElement.style
    document.documentElement.style.overflow = 'hidden'
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = overflow
    }
  }, [mobileOpen, lenis])

  const closeMenus = useCallback(() => setOpenIndex(null), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  // Escape closes the mega menu and returns focus to its trigger; clicking outside closes it.
  useEffect(() => {
    if (openIndex === null) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && openIndex !== null) {
        triggerRefs.current[openIndex]?.focus()
        setOpenIndex(null)
      }
    }
    function onPointer(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpenIndex(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [openIndex])

  function openWithDelay(index: number) {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenIndex(index), 80)
  }
  function closeWithDelay() {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), 160)
  }

  const overlay = OVERLAY_PATHS.has(pathname) && !scrolled && openIndex === null
  const tone = overlay ? 'dark' : 'light'

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={closeWithDelay}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenIndex(null)
        }}
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,color] duration-(--dur-slow) ease-out-expo',
          overlay
            ? 'bg-transparent text-on-dark [--focus-ring:var(--color-on-dark)]'
            : 'bg-surface/95 text-ink shadow-sm backdrop-blur-md [--focus-ring:var(--color-blue)]',
        )}
      >
        <div
          className={cn(
            'container-wide flex items-center justify-between gap-6 transition-[height] duration-(--dur-slow) ease-out-expo',
            scrolled ? 'h-16' : 'h-20',
          )}
        >
          <Logo tone={tone} />

          <nav aria-label="Hauptnavigation" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {sections.map((section, index) => {
                const isOpen = openIndex === index
                const panelId = `mega-${index}`
                return (
                  <li key={section.href} onMouseEnter={() => openWithDelay(index)}>
                    <button
                      ref={(el) => {
                        triggerRefs.current[index] = el
                      }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className={cn(
                        'inline-flex min-h-11 items-center gap-1 rounded-pill px-3 text-small font-semibold whitespace-nowrap transition-colors duration-(--dur-fast)',
                        overlay ? 'hov:bg-on-dark/10' : 'hov:bg-surface-3',
                        isOpen && 'bg-surface-3 text-navy',
                      )}
                    >
                      {section.label}
                      <Icon
                        name="chevron-down"
                        className={cn(
                          'size-4 transition-transform duration-(--dur-base)',
                          isOpen && 'rotate-180',
                        )}
                      />
                    </button>
                    <MegaMenu
                      section={section}
                      id={panelId}
                      open={isOpen}
                      onNavigate={closeMenus}
                    />
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/news"
              className={cn(
                'hidden min-h-11 items-center rounded-pill px-3 text-small font-semibold 3xl:inline-flex',
                overlay ? 'hov:bg-on-dark/10' : 'hov:bg-surface-3',
              )}
            >
              News
            </Link>
            <Button
              href={cta.href}
              variant={overlay ? 'white' : 'cta'}
              size="sm"
              className="hidden sm:inline-flex"
            >
              {cta.label}
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={mobileOpen}
              aria-haspopup="dialog"
              onClick={() => setMobileOpen(true)}
              className={cn(
                'inline-flex min-h-11 items-center gap-2 rounded-pill border px-4 text-small font-semibold xl:hidden',
                overlay ? 'border-on-dark/50 hov:bg-on-dark/10' : 'border-control hov:bg-surface-3',
              )}
            >
              <span aria-hidden className="flex w-4 flex-col gap-1">
                <span className="h-0.5 w-full rounded-pill bg-current" />
                <span className="h-0.5 w-3/4 rounded-pill bg-current" />
              </span>
              Menü
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={mobileOpen}
        onClose={closeMobile}
        sections={sections}
        cta={cta}
        location={location}
        returnFocusTo={menuButtonRef}
      />
    </>
  )
}
