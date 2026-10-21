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
import { MobileMenu } from './MobileMenu'
import { NavDropdown } from './NavDropdown'

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

  // Escape closes the dropdown and returns focus to its trigger; clicking outside closes it.
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

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={closeWithDelay}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenIndex(null)
        }}
        className={cn(
          'fixed inset-x-0 top-0 z-40 text-ink transition-[padding] duration-(--dur-slow) ease-out-expo [--focus-ring:var(--color-blue)]',
          scrolled ? 'pt-2' : 'pt-3 md:pt-4',
        )}
      >
        <div className="relative container-wide">
          <div
            className={cn(
              'flex items-center justify-between gap-4 rounded-2xl pr-2 pl-3 glass-strong transition-[height,border-radius] duration-(--dur-slow) ease-out-expo md:pl-4',
              scrolled ? 'h-14' : 'h-16',
            )}
          >
            <Logo />

            <nav aria-label="Hauptnavigation" className="hidden xl:block">
              <ul className="flex items-center gap-0.5">
                {sections.map((section, index) => {
                  const isOpen = openIndex === index
                  const isCurrent =
                    pathname === section.href || pathname.startsWith(`${section.href}/`)
                  const panelId = `nav-${index}`
                  return (
                    <li
                      key={section.href}
                      className="relative"
                      onMouseEnter={() => openWithDelay(index)}
                      onMouseLeave={closeWithDelay}
                    >
                      <div
                        className={cn(
                          'relative flex min-h-11 items-center rounded-pill text-small font-semibold whitespace-nowrap transition-colors duration-(--dur-fast)',
                          isOpen || isCurrent
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-ink hov:bg-surface-3',
                        )}
                      >
                        <Link
                          href={section.href}
                          aria-current={pathname === section.href ? 'page' : undefined}
                          onClick={closeMenus}
                          className="inline-flex min-h-11 items-center rounded-l-pill pl-3"
                        >
                          {section.label}
                        </Link>
                        <button
                          ref={(el) => {
                            triggerRefs.current[index] = el
                          }}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          aria-label={`Untermenü ${section.label}`}
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          className="inline-flex min-h-11 items-center rounded-r-pill pr-2.5 pl-1"
                        >
                          <Icon
                            name="chevron-down"
                            className={cn(
                              'size-4 transition-transform duration-(--dur-base)',
                              isOpen && 'rotate-180',
                            )}
                          />
                        </button>
                      </div>
                      <NavDropdown
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
              <span>
                <Button
                  href={cta.href}
                  variant="primary"
                  size="sm"
                  icon="mail"
                  className="max-sm:px-3"
                >
                  <span className="max-sm:sr-only">{cta.label}</span>
                </Button>
              </span>
              <button
                ref={menuButtonRef}
                type="button"
                aria-expanded={mobileOpen}
                aria-haspopup="dialog"
                onClick={() => setMobileOpen(true)}
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-surface px-4 text-small font-semibold text-navy transition-colors duration-(--dur-base) xl:hidden hov:bg-surface-3"
              >
                <span aria-hidden className="flex w-4 flex-col gap-1">
                  <span className="h-0.5 w-full rounded-pill bg-current" />
                  <span className="h-0.5 w-3/4 rounded-pill bg-current" />
                </span>
                Menü
              </button>
            </div>
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
