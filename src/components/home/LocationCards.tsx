'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import house from '@/assets/brand/logo-house.png'
import { Icon } from '@/components/ui/Icon'
import { Toast } from '@/components/ui/Toast'
import { cn } from '@/lib/cn'
import { nowInBerlin, openStatus, weekdayNames, type OpenStatus } from '@/lib/opening-hours'
import type { Location } from '@/content'
import { ConsentMap } from './ConsentMap'

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  )
}

function StatusPill({ status }: { status: OpenStatus | null }) {
  if (!status)
    return <span className="h-8 w-40 animate-pulse rounded-pill bg-surface-3" aria-hidden />
  if (status.state === 'appointment') {
    return (
      <span className="inline-flex items-center gap-2 rounded-pill bg-blue-900 px-3 py-1.5 text-small font-semibold text-on-dark shadow-sm">
        <Icon name="calendar" className="size-4" />
        Termine nach Vereinbarung
      </span>
    )
  }
  const open = status.state === 'open'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill px-3 py-1.5 text-small font-semibold ring-1',
        open
          ? 'bg-success-soft text-success ring-line'
          : 'bg-blue-900 text-on-dark shadow-sm ring-blue-900',
      )}
    >
      <span className="relative flex size-2">
        {open ? (
          <span className="absolute inline-flex size-full rounded-pill bg-success opacity-60 motion-safe:animate-ping" />
        ) : null}
        <span
          className={cn(
            'relative inline-flex size-2 rounded-pill',
            open ? 'bg-success' : 'bg-red-300',
          )}
        />
      </span>
      {open
        ? `Jetzt geöffnet · bis ${status.until} Uhr`
        : status.next
          ? `Geschlossen · öffnet ${status.next.label} ${status.next.time} Uhr`
          : 'Geschlossen'}
    </span>
  )
}

function WeekTable({ location, today }: { location: Location; today: number | null }) {
  return (
    <table className="w-full text-small">
      <caption className="sr-only">Öffnungszeiten {location.name}</caption>
      <tbody>
        {weekdayNames.map((name, i) => {
          const day = i + 1
          const slots = location.schedule.filter((s) => s.day === day)
          const isToday = today === day
          return (
            <tr key={name} className={cn('transition-colors', isToday && 'bg-blue-50')}>
              <th
                scope="row"
                className={cn(
                  'rounded-l-md py-1.5 pl-3 text-left font-medium',
                  isToday ? 'text-blue-900' : 'text-ink',
                )}
              >
                {name}
                {isToday ? (
                  <span className="ml-2 rounded-pill bg-blue-600 px-2 py-0.5 text-caption font-semibold text-on-dark">
                    Heute
                  </span>
                ) : null}
              </th>
              <td
                className={cn(
                  'rounded-r-md py-1.5 pr-3 text-right',
                  slots.length ? 'text-ink' : 'text-ink-muted',
                )}
              >
                {slots.length
                  ? slots.map((s) => `${s.open.replace(/^0/, '')}–${s.close} Uhr`).join(', ')
                  : 'geschlossen'}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function LocationCard({
  location,
  orgName,
  onCopied,
}: {
  location: Location
  orgName: string
  onCopied: (message: string) => void
}) {
  const [status, setStatus] = useState<OpenStatus | null>(null)
  const [today, setToday] = useState<number | null>(null)

  // Computed in the browser only (time-dependent), refreshed every minute.
  useEffect(() => {
    const update = () => {
      setStatus(openStatus(location.schedule))
      setToday(nowInBerlin().day)
    }
    update()
    const timer = window.setInterval(update, 60_000)
    return () => window.clearInterval(timer)
  }, [location.schedule])

  const address = `${location.street}, ${location.postalCode} ${location.city}`
  const route = `https://www.openstreetmap.org/directions?to=${location.lat}%2C${location.lon}`

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(`${orgName} ${location.name}, ${address}`)
      onCopied('Adresse kopiert')
    } catch {
      onCopied('Kopieren nicht möglich – bitte Adresse markieren')
    }
  }

  const [open, setOpen] = useState(false)
  const panelId = `standort-${location.id}-details`
  const summary = location.hours.map((h) => `${h.days} ${h.hours}`).join(' · ')

  return (
    <article
      data-reveal
      className="relative isolate flex flex-col overflow-hidden rounded-2xl bg-blue-50 p-5 shadow-md ring-1 ring-blue-100 transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo md:p-6 hov:-translate-y-1 hov:shadow-(--shadow-float)"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-red-500 to-red-600"
      />
      <Image
        src={house}
        alt=""
        width={house.width}
        height={house.height}
        sizes="160px"
        className="pointer-events-none absolute -right-6 -bottom-4 -z-10 w-40 opacity-[0.07] select-none"
      />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-caption font-semibold tracking-widest text-red-600 uppercase">
            {location.kind}
          </span>
          <h3 className="text-h3 text-blue-900">{location.name}</h3>
        </div>
        <StatusPill status={status} />
      </div>

      <div className="mt-3 flex items-center gap-2 text-small text-ink-muted">
        <Icon name="location" className="size-4 text-blue-600" />
        <address className="not-italic">{address}</address>
        <button
          type="button"
          onClick={copyAddress}
          className="ml-1 grid size-8 shrink-0 place-items-center rounded-pill text-blue-700 transition-colors hov:bg-blue-50"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            aria-hidden
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <rect x="8" y="8" width="12" height="12" rx="2" />
            <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
          </svg>
          <span className="sr-only">Adresse {location.name} kopieren</span>
        </button>
      </div>
      <p className="mt-1 flex items-center gap-2 text-small text-ink-muted">
        <Icon name="clock" className="size-4 text-blue-600" />
        {summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <a
          href={telHref(location.phone)}
          className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-red-500 px-4 text-small font-semibold text-on-dark shadow-sm transition-[background-color,box-shadow,transform] duration-(--dur-base) active:scale-95 hov:bg-navy hov:shadow-(--shadow-glow-red)"
        >
          <PhoneIcon />
          Anrufen
          <span className="sr-only">: {location.phone}</span>
        </a>
        <a
          href={`mailto:${location.email}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-surface px-4 text-small font-semibold text-red-700 ring-1 ring-red-200 transition-[background-color,transform] duration-(--dur-base) active:scale-95 hov:bg-red-50"
        >
          <Icon name="arrow-up-right" className="size-4" />
          E-Mail
          <span className="sr-only">: {location.email}</span>
        </a>
        <a
          href={route}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-surface px-4 text-small font-semibold text-red-700 ring-1 ring-red-200 transition-[background-color,transform] duration-(--dur-base) active:scale-95 hov:bg-red-50"
        >
          <Icon name="location" className="size-4" />
          Route
          <span className="sr-only">planen (öffnet OpenStreetMap in neuem Tab)</span>
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex min-h-11 items-center gap-1.5 rounded-pill px-3 text-small font-semibold text-red-700 hov:bg-red-50"
        >
          Öffnungszeiten &amp; Karte
          <Icon
            name="chevron-down"
            className={cn(
              'size-4 transition-transform duration-(--dur-base)',
              open && 'rotate-180',
            )}
          />
        </button>
      </div>

      <div
        id={panelId}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-(--dur-slow) ease-out-expo',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            <div className="rounded-xl bg-surface p-2 ring-1 ring-line">
              {location.schedule.length ? (
                <WeekTable location={location} today={today} />
              ) : (
                <p className="px-3 py-2 text-small text-ink-muted">
                  Beratung und Anmeldung nach telefonischer Vereinbarung.
                </p>
              )}
              {location.branches?.length ? (
                <div className="mt-2 border-t border-line px-3 pt-3 pb-1">
                  <p className="text-caption font-semibold text-blue-900">Zweigstellen</p>
                  <ul className="mt-1 flex flex-col gap-0.5 text-caption text-ink-muted">
                    {location.branches.map((branch) => (
                      <li key={branch}>{branch}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="overflow-hidden rounded-xl ring-1 ring-line">
              <ConsentMap location={location} compact />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

/** Both locations side by side, each with live status, week table, actions and an opt-in map. */
export function LocationCards({ locations, orgName }: { locations: Location[]; orgName: string }) {
  const [toast, setToast] = useState<string | null>(null)
  const clear = useCallback(() => setToast(null), [])
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            orgName={orgName}
            onCopied={setToast}
          />
        ))}
      </div>
      <Toast message={toast} onDone={clear} />
    </>
  )
}
