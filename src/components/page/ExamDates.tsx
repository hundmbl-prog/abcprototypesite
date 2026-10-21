'use client'

import { useEffect, useMemo, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { FilterChip } from '@/components/ui/FilterChip'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { ExamDate, TelcExam } from '@/content/types'

export const SELECT_EVENT = 'telc:select'
export type SelectDetail = { examId: string; dateId: string }

const ALL = 'Alle'
const dateFormat = new Intl.DateTimeFormat('de-DE', {
  weekday: 'short',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'Europe/Berlin',
})
const format = (iso: string) => dateFormat.format(new Date(`${iso}T12:00:00Z`))
const todayIso = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin' }).format(new Date())

type Status = 'open' | 'few' | 'full' | 'closed'
function statusOf(date: ExamDate, today: string | null): Status {
  if (today && date.registrationDeadline < today) return 'closed'
  if (date.seatsFree <= 0) return 'full'
  if (date.seatsFree <= 3) return 'few'
  return 'open'
}

/**
 * Filterable exam dates (level, location, free seats). Rows become cards on small screens;
 * explicit table roles keep the table semantics when the row layout changes.
 */
export function ExamDates({
  exams,
  dates,
  emptyText,
  phone,
  email,
}: {
  exams: TelcExam[]
  dates: ExamDate[]
  emptyText: string
  phone: string
  email: string
}) {
  // "today" is only known in the browser – avoids a server/client mismatch around midnight
  const [today, setToday] = useState<string | null>(null)
  useEffect(() => setToday(todayIso()), [])

  const examById = useMemo(() => new Map(exams.map((e) => [e.id, e])), [exams])
  const upcoming = useMemo(
    () =>
      dates.filter((d) => !today || d.date >= today).sort((a, b) => a.date.localeCompare(b.date)),
    [dates, today],
  )
  const levels = [
    ALL,
    ...exams.filter((e) => upcoming.some((d) => d.examId === e.id)).map((e) => e.level),
  ]
  const locations = [ALL, ...Array.from(new Set(upcoming.map((d) => d.location)))]
  const [level, setLevel] = useState(ALL)
  const [location, setLocation] = useState(ALL)
  const [onlyFree, setOnlyFree] = useState(false)

  const rows = upcoming.filter((d) => {
    const exam = examById.get(d.examId)
    if (level !== ALL && exam?.level !== level) return false
    if (location !== ALL && d.location !== location) return false
    if (onlyFree) {
      const s = statusOf(d, today)
      if (s === 'full' || s === 'closed') return false
    }
    return true
  })

  function select(detail: SelectDetail) {
    window.dispatchEvent(new CustomEvent<SelectDetail>(SELECT_EVENT, { detail }))
    document.getElementById('anmeldung')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  if (upcoming.length === 0) {
    return (
      <div className="flex flex-col items-start gap-6 rounded-2xl border border-dashed border-blue-300 bg-surface p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-pill bg-blue-900 text-on-dark">
            <Icon name="calendar" className="size-5" />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-h4 font-semibold text-blue-900">Neue Termine folgen in Kürze</p>
            <p className="max-w-prose text-ink-muted">{emptyText}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${phone.replace(/[^\d+]/g, '')}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-red-500 px-5 text-small font-semibold text-on-dark shadow-sm ring-2 ring-red transition-[background-color,transform] duration-(--dur-base) active:scale-95 hov:scale-[1.03] hov:bg-surface hov:text-red foc:outline-2 foc:outline-offset-2 foc:outline-blue"
          >
            <Icon name="phone" className="size-4" />
            Anrufen
          </a>
          <a
            href={`mailto:${email}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-surface px-5 text-small font-semibold text-red-700 ring-1 ring-red-200 transition-[background-color,transform] duration-(--dur-base) active:scale-95 hov:scale-[1.03] hov:bg-red-50 foc:outline-2 foc:outline-offset-2 foc:outline-blue"
          >
            <Icon name="mail" className="size-4" />
            E-Mail
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-100 md:p-5">
        <div
          role="group"
          aria-label="Nach Prüfung filtern"
          className="flex flex-wrap items-center gap-2"
        >
          <span className="mr-1 text-caption font-semibold tracking-wide text-ink-muted uppercase">
            Prüfung
          </span>
          {levels.map((l) => (
            <FilterChip key={l} selected={level === l} onClick={() => setLevel(l)}>
              {l}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {locations.length > 2 ? (
            <div
              role="group"
              aria-label="Nach Ort filtern"
              className="flex flex-wrap items-center gap-2"
            >
              <span className="mr-1 text-caption font-semibold tracking-wide text-ink-muted uppercase">
                Ort
              </span>
              {locations.map((l) => (
                <FilterChip key={l} selected={location === l} onClick={() => setLocation(l)}>
                  {l}
                </FilterChip>
              ))}
            </div>
          ) : null}
          <FilterChip selected={onlyFree} onClick={() => setOnlyFree((v) => !v)}>
            Nur mit freien Plätzen
          </FilterChip>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {rows.length} {rows.length === 1 ? 'Termin' : 'Termine'} gefunden
      </p>

      {rows.length === 0 ? (
        <p className="rounded-2xl border border-line bg-surface p-6 text-ink-muted">
          Für diese Auswahl gibt es zurzeit keinen Termin. Bitte ändern Sie die Filter.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-md">
          <table role="table" className="w-full text-left text-small">
            <caption className="sr-only">Prüfungstermine</caption>
            <thead role="rowgroup" className="sr-only bg-blue-900 text-on-dark md:not-sr-only">
              <tr role="row">
                {['Prüfung', 'Datum', 'Ort', 'Anmeldeschluss', 'Freie Plätze', 'Anmeldung'].map(
                  (h) => (
                    <th key={h} role="columnheader" scope="col" className="p-4 font-semibold">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody role="rowgroup">
              {rows.map((d) => {
                const exam = examById.get(d.examId)
                const status = statusOf(d, today)
                const bookable = status === 'open' || status === 'few'
                return (
                  <tr
                    key={d.id}
                    role="row"
                    className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line p-5 first:border-t-0 md:table-row md:p-0 md:odd:bg-blue-50"
                  >
                    <th
                      role="rowheader"
                      scope="row"
                      className="col-span-2 font-semibold text-blue-900 md:p-4"
                    >
                      {exam?.name ?? d.examId}
                    </th>
                    <td role="cell" data-label="Datum" className="cell md:p-4">
                      <span className="font-semibold text-ink">{format(d.date)}</span>
                      <span className="block text-ink-muted">{d.time} Uhr</span>
                    </td>
                    <td role="cell" data-label="Ort" className="cell md:p-4">
                      {d.location}
                    </td>
                    <td
                      role="cell"
                      data-label="Anmeldeschluss"
                      className={cn('cell md:p-4', status === 'closed' && 'text-red-700')}
                    >
                      {format(d.registrationDeadline)}
                    </td>
                    <td role="cell" data-label="Freie Plätze" className="cell md:p-4">
                      {status === 'full' ? (
                        <Badge status="ausgebucht" />
                      ) : status === 'closed' ? (
                        <span className="font-semibold text-red-700">Anmeldung geschlossen</span>
                      ) : (
                        <Badge
                          status={status === 'few' ? 'wenige-plaetze' : 'plaetze-frei'}
                          label={`${d.seatsFree} von ${d.seatsTotal} frei`}
                        />
                      )}
                    </td>
                    <td role="cell" className="col-span-2 md:p-4">
                      <button
                        type="button"
                        disabled={!bookable}
                        onClick={() => select({ examId: d.examId, dateId: d.id })}
                        className="inline-flex min-h-11 items-center gap-2 rounded-pill bg-red-500 px-4 font-semibold text-on-dark shadow-sm ring-2 ring-red transition-[background-color,transform] duration-(--dur-base) active:scale-95 disabled:cursor-not-allowed disabled:bg-surface-3 disabled:text-ink-muted disabled:shadow-none hov:scale-[1.03] hov:bg-surface hov:text-red foc:outline-2 foc:outline-offset-2 foc:outline-blue"
                      >
                        Anmelden
                        <span className="sr-only">
                          : {exam?.name} am {format(d.date)}
                        </span>
                        <Icon name="arrow-right" className="size-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
