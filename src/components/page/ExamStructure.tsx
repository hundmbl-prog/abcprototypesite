'use client'

import { useState } from 'react'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { ExamStructureBlock } from '@/content/types'

const shades = ['bg-blue-900', 'bg-blue-600', 'bg-blue-400', 'bg-red-500']

/**
 * Exam structure: a time bar sized by each written part's minutes (hover a part to highlight it),
 * then the oral exam and important notes.
 */
export function ExamStructure({ block }: { block: ExamStructureBlock }) {
  const [focus, setFocus] = useState<number | null>(null)
  const writtenTotal = block.written.reduce((sum, part) => sum + part.minutes, 0)

  return (
    <>
      <SectionHeader
        id={`${block.id}-titel`}
        eyebrow={block.eyebrow}
        title={block.title}
        intro={block.intro}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 shadow-md md:p-8 lg:col-span-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="inline-flex items-center gap-3 text-h4 text-blue-900">
              <span className="grid size-10 place-items-center rounded-pill bg-blue-900 text-on-dark">
                <Icon name="pen" className="size-4" />
              </span>
              Schriftliche Prüfung
            </h3>
            <span className="rounded-pill bg-blue-900 px-3 py-1 text-small font-semibold text-on-dark">
              ca. {writtenTotal} Minuten
              {block.breakMinutes ? ` + ${block.breakMinutes} Min. Pause` : ''}
            </span>
          </div>
          <div aria-hidden className="flex h-3 w-full gap-1 overflow-hidden rounded-pill">
            {block.written.map((part, i) => (
              <span
                key={part.name}
                className={cn(
                  'h-full transition-opacity duration-(--dur-base)',
                  shades[i % shades.length],
                  focus !== null && focus !== i && 'opacity-30',
                )}
                style={{ flexGrow: part.minutes }}
              />
            ))}
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {block.written.map((part, i) => (
              <li
                key={part.name}
                onMouseEnter={() => setFocus(i)}
                onMouseLeave={() => setFocus(null)}
                className={cn(
                  'flex flex-col gap-1.5 rounded-xl border p-4 transition-[border-color,box-shadow] duration-(--dur-base)',
                  focus === i ? 'border-blue-300 shadow-md' : 'border-line',
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 font-semibold text-blue-900">
                    <span
                      aria-hidden
                      className={cn('size-2.5 rounded-pill', shades[i % shades.length])}
                    />
                    {part.name}
                  </span>
                  <span className="text-small font-semibold text-ink-muted">
                    {part.minutes} Min.
                  </span>
                </span>
                <span className="text-small text-ink-muted">{part.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 rounded-2xl bg-blue-900 p-6 text-on-dark shadow-md md:p-8 lg:col-span-4">
          <h3 className="inline-flex items-center gap-3 text-h4">
            <span className="grid size-10 place-items-center rounded-pill bg-red-500">
              <Icon name="mic" className="size-4" />
            </span>
            Mündliche Prüfung
          </h3>
          <dl className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-on-dark/10 p-3">
              <dt className="text-caption font-semibold tracking-wide text-on-dark-muted uppercase">
                Dauer
              </dt>
              <dd className="font-semibold">ca. {block.oral.minutes} Min.</dd>
            </div>
            <div className="rounded-xl bg-on-dark/10 p-3">
              <dt className="text-caption font-semibold tracking-wide text-on-dark-muted uppercase">
                Form
              </dt>
              <dd className="font-semibold">{block.oral.format}</dd>
            </div>
            {block.oral.preparation ? (
              <div className="col-span-2 rounded-xl bg-on-dark/10 p-3">
                <dt className="text-caption font-semibold tracking-wide text-on-dark-muted uppercase">
                  Vorbereitung
                </dt>
                <dd className="font-semibold">{block.oral.preparation}</dd>
              </div>
            ) : null}
          </dl>
          <p className="text-small text-on-dark-muted">{block.oral.text}</p>
        </div>
        <ul className="grid gap-3 rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100 sm:grid-cols-2 lg:col-span-12">
          {block.notes.map((note) => (
            <li key={note} className="flex items-start gap-3 text-small font-medium text-blue-900">
              <Icon name="info" className="mt-0.5 size-4 text-blue-600" />
              {note}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
