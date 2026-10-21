'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { TabsBlock as TabsData } from '@/content/types'

/** WAI-ARIA tabs (arrow keys, Home/End) with an animated indicator and panel. */
export function TabsBlock({ block }: { block: TabsData }) {
  const reduce = useReducedMotion()
  const baseId = useId()
  const [active, setActive] = useState(0)
  const refs = useRef<Array<HTMLButtonElement | null>>([])
  const tab = block.tabs[active]

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = block.tabs.length - 1
    const next =
      event.key === 'ArrowRight'
        ? (active + 1) % block.tabs.length
        : event.key === 'ArrowLeft'
          ? (active - 1 + block.tabs.length) % block.tabs.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null
    if (next === null) return
    event.preventDefault()
    setActive(next)
    refs.current[next]?.focus()
  }

  return (
    <>
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
        className="mb-8 inline-flex max-w-full flex-wrap gap-1 rounded-2xl bg-surface-3 p-1.5 ring-1 ring-line"
      >
        {block.tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              'relative min-h-11 rounded-xl px-5 text-small font-semibold transition-colors duration-(--dur-base) foc:outline-2 foc:outline-offset-2 foc:outline-blue',
              i === active ? 'text-on-dark' : 'text-navy hov:bg-surface',
            )}
          >
            {i === active ? (
              <motion.span
                layoutId={`${baseId}-indicator`}
                transition={
                  reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                }
                className="absolute inset-0 -z-0 rounded-xl bg-blue-900 shadow-md"
              />
            ) : null}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${tab?.id}`}
        tabIndex={0}
        className="rounded-2xl foc:outline-2 foc:outline-offset-4 foc:outline-blue"
      >
        <AnimatePresence mode="wait" initial={false}>
          {tab ? (
            <motion.div
              key={tab.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 gap-8 rounded-2xl border border-line bg-surface p-6 shadow-md md:p-10 lg:grid-cols-12"
            >
              <div className="flex flex-col gap-4 lg:col-span-6">
                <h3 className="text-h3 text-navy">{tab.heading}</h3>
                <p className="text-lead text-ink-muted">{tab.text}</p>
              </div>
              {tab.items?.length ? (
                <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-6">
                  {tab.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl bg-blue-50 p-3 text-small font-medium text-navy"
                    >
                      <Icon
                        name="check"
                        className="mt-0.5 size-4 text-blue-600"
                        strokeWidth={2.5}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  )
}
