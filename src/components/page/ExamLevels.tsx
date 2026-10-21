'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { ExamLevelsBlock } from '@/content/types'
import { ExamStructureBody } from './ExamStructure'

export const levelAnchor = (id: string) => `pruefung-${id}`

/**
 * All telc levels on one page: tabs per exam (arrow keys, Home/End). Links to `#pruefung-<id>`
 * (e.g. from the exam cards) select the matching tab – on load and on click.
 */
export function ExamLevels({ block }: { block: ExamLevelsBlock }) {
  const reduce = useReducedMotion()
  const baseId = useId()
  const [active, setActive] = useState(0)
  const refs = useRef<Array<HTMLButtonElement | null>>([])
  const exam = block.levels[active]

  useEffect(() => {
    const select = (hash: string) => {
      const i = block.levels.findIndex((l) => `#${levelAnchor(l.id)}` === hash)
      if (i >= 0) setActive(i)
    }
    select(window.location.hash)
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest('a[href*="#pruefung-"]')
      if (link) select(`#${link.getAttribute('href')!.split('#')[1]}`)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [block.levels])

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const n = block.levels.length
    const next =
      event.key === 'ArrowRight'
        ? (active + 1) % n
        : event.key === 'ArrowLeft'
          ? (active - 1 + n) % n
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? n - 1
              : null
    if (next === null) return
    event.preventDefault()
    setActive(next)
    refs.current[next]?.focus()
  }

  return (
    <div className="relative">
      {/* Jump targets for links from the exam cards */}
      {block.levels.map((l) => (
        <span key={l.id} id={levelAnchor(l.id)} aria-hidden className="absolute -top-28" />
      ))}
      <SectionHeader
        id={`${block.id}-titel`}
        eyebrow={block.eyebrow}
        title={block.title}
        intro={block.intro}
      />
      <div
        role="tablist"
        aria-labelledby={`${block.id}-titel`}
        onKeyDown={onKeyDown}
        className="mb-8 flex max-w-full gap-1 overflow-x-auto rounded-2xl bg-surface-3 p-1.5 ring-1 ring-line"
      >
        {block.levels.map((l, i) => (
          <button
            key={l.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${l.id}`}
            aria-selected={i === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              'relative min-h-11 shrink-0 rounded-xl px-5 text-small font-semibold whitespace-nowrap transition-colors duration-(--dur-base) foc:outline-2 foc:outline-offset-2 foc:outline-blue',
              i === active ? 'text-on-dark' : 'text-navy hov:bg-surface',
            )}
          >
            {i === active ? (
              <motion.span
                layoutId={`${baseId}-indicator`}
                transition={
                  reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                }
                className="absolute inset-0 rounded-xl bg-blue-900 shadow-md"
              />
            ) : null}
            <span className="relative">{l.level}</span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${exam?.id}`}
        tabIndex={0}
        className="rounded-2xl foc:outline-2 foc:outline-offset-4 foc:outline-blue"
      >
        <AnimatePresence mode="wait" initial={false}>
          {exam ? (
            <motion.div
              key={exam.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 gap-6 rounded-2xl border border-line bg-surface p-6 shadow-md md:p-8 lg:grid-cols-12">
                <div className="flex flex-col gap-3 lg:col-span-7">
                  <h3 className="text-h3 text-navy">{exam.name}</h3>
                  {exam.about.map((text) => (
                    <p key={text} className="text-ink-muted">
                      {text}
                    </p>
                  ))}
                </div>
                <ul className="flex flex-col gap-3 lg:col-span-5">
                  {exam.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100 transition-[background-color,box-shadow] duration-(--dur-base) hov:bg-surface hov:shadow-md foc:outline-2 foc:outline-offset-2 foc:outline-blue"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-pill bg-blue-900 text-on-dark transition-colors group-hover:bg-red-500">
                          <Icon
                            name={
                              link.kind === 'ZIP' || link.kind === 'PDF'
                                ? 'download'
                                : 'arrow-up-right'
                            }
                            className="size-4"
                          />
                        </span>
                        <span className="flex flex-col">
                          <span className="font-semibold text-navy">{link.label}</span>
                          {link.description ? (
                            <span className="text-small text-ink-muted">{link.description}</span>
                          ) : null}
                        </span>
                        <span className="sr-only">(öffnet in neuem Tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <ExamStructureBody exam={exam} headingLevel="h4" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
