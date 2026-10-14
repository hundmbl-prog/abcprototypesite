'use client'

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { Location } from '@/content'
import { ConsentMap } from './ConsentMap'

/** Tabs to switch between locations (arrow keys move between tabs, WAI-ARIA tabs pattern). */
export function LocationsTabs({ locations }: { locations: Location[] }) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const location = locations[active]

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = locations.length - 1
    let next: number | null = null
    if (event.key === 'ArrowRight') next = active === last ? 0 : active + 1
    if (event.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = last
    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  if (!location) return null

  return (
    <div className="flex flex-col gap-8">
      <div
        role="tablist"
        aria-label="Standort wählen"
        className="flex gap-2 self-start rounded-pill bg-surface-3 p-1"
      >
        {locations.map((loc, i) => (
          <button
            key={loc.id}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            id={`${baseId}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown}
            className={cn(
              'min-h-11 rounded-pill px-5 text-small font-semibold transition-colors duration-(--dur-base)',
              i === active ? 'bg-navy text-on-dark shadow-sm' : 'text-navy hov:bg-surface',
            )}
          >
            {loc.name}
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="grid gap-6 lg:grid-cols-12"
      >
        <div className="flex flex-col gap-6 rounded-2xl bg-surface-2 p-6 md:p-10 lg:col-span-5">
          <h3 className="text-h3 text-navy">{location.name}</h3>
          <address className="flex flex-col gap-3 not-italic">
            <p className="flex items-start gap-3">
              <Icon name="location" className="mt-0.5 text-blue" />
              <span>
                {location.street}
                <br />
                {location.postalCode} {location.city}
              </span>
            </p>
            <a
              href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
              className="inline-flex min-h-11 items-center gap-3 font-semibold text-blue hov:underline"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                aria-hidden
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
              </svg>
              {location.phone}
            </a>
            <a
              href={`mailto:${location.email}`}
              className="inline-flex min-h-11 items-center gap-3 font-semibold break-all text-blue hov:underline"
            >
              <Icon name="arrow-up-right" />
              {location.email}
            </a>
          </address>
          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-2 font-semibold text-navy">
              <Icon name="clock" className="text-blue" />
              Öffnungszeiten
            </p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-small">
              {location.hours.map((h) => (
                <div key={h.days} className="contents">
                  <dt className="font-semibold text-ink">{h.days}</dt>
                  <dd className="text-ink-muted">{h.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
          {location.branches?.length ? (
            <div className="flex flex-col gap-2 border-t border-line pt-6">
              <p className="font-semibold text-navy">Zweigstellen</p>
              <ul className="flex flex-col gap-1 text-small text-ink-muted">
                {location.branches.map((branch) => (
                  <li key={branch}>{branch}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="lg:col-span-7">
          <ConsentMap key={location.id} location={location} />
        </div>
      </div>
    </div>
  )
}
