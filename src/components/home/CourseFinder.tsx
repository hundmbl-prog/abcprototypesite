'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useId, useState } from 'react'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { HomePage } from '@/content'

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Two-step course finder: choose a goal, then level/place, and get one matching offer.
 * Built on native radio buttons (keyboard + screen reader friendly); the result is announced politely.
 */
export function CourseFinder({ content }: { content: HomePage['finder'] }) {
  const reduce = useReducedMotion()
  const baseId = useId()
  const [goalId, setGoalId] = useState(content.goals[0]?.id ?? '')
  const [optionId, setOptionId] = useState<string | null>(null)
  const goal = content.goals.find((g) => g.id === goalId)
  const option = goal?.options.find((o) => o.id === optionId)

  const fade = reduce
    ? {
        initial: false as const,
        animate: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 0 } },
      }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.35, ease },
      }

  return (
    <section id="kursfinder" aria-labelledby="kursfinder-titel" className="bg-surface py-section">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeader
            id="kursfinder-titel"
            eyebrow={content.eyebrow}
            title={content.title}
            intro={content.intro}
            className="mb-0! md:mb-0!"
          />
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 flex items-center gap-2 text-small font-semibold text-blue-900">
              <span className="grid size-6 place-items-center rounded-pill bg-red-500 text-caption text-on-dark">
                1
              </span>
              {content.labels.goalQuestion}
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.goals.map((g) => {
                const inputId = `${baseId}-goal-${g.id}`
                return (
                  <label
                    key={g.id}
                    htmlFor={inputId}
                    className={cn(
                      'group/goal flex cursor-pointer items-center gap-3 rounded-xl p-4 ring-1 transition-[background-color,box-shadow,transform] duration-(--dur-base) ease-out-expo',
                      'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue',
                      goalId === g.id
                        ? 'bg-linear-to-b from-blue-100 to-surface shadow-md ring-blue-300'
                        : 'bg-surface ring-line hov:-translate-y-0.5 hov:shadow-sm hov:ring-blue-200',
                    )}
                  >
                    <input
                      id={inputId}
                      type="radio"
                      name={`${baseId}-goal`}
                      value={g.id}
                      checked={goalId === g.id}
                      onChange={() => {
                        setGoalId(g.id)
                        setOptionId(null)
                      }}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        'grid size-11 shrink-0 place-items-center rounded-pill transition-colors duration-(--dur-base)',
                        goalId === g.id ? 'bg-blue-600 text-on-dark' : 'bg-blue-50 text-blue-700',
                      )}
                    >
                      <Icon name={g.icon} className="size-5" />
                    </span>
                    <span className="font-semibold text-blue-900">{g.label}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        </div>

        <div className="lg:col-span-7">
          <div className="flex h-full flex-col gap-6 rounded-2xl bg-linear-to-b from-blue-100 to-surface p-6 shadow-md ring-1 ring-blue-900/5 md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {goal ? (
                <motion.fieldset key={goal.id} className="flex flex-col gap-3" {...fade}>
                  <legend className="mb-3 flex items-center gap-2 text-small font-semibold text-blue-900">
                    <span className="grid size-6 place-items-center rounded-pill bg-red-500 text-caption text-on-dark">
                      2
                    </span>
                    {goal.question}
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {goal.options.map((o) => {
                      const inputId = `${baseId}-opt-${goal.id}-${o.id}`
                      const selected = optionId === o.id
                      return (
                        <label
                          key={o.id}
                          htmlFor={inputId}
                          className={cn(
                            'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill px-4 text-small font-semibold ring-1 transition-[background-color,color,box-shadow] duration-(--dur-base)',
                            'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue',
                            selected
                              ? 'bg-blue-600 text-on-dark shadow-md ring-blue-600'
                              : 'bg-surface text-blue-900 ring-blue-200 hov:ring-blue-400',
                          )}
                        >
                          <input
                            id={inputId}
                            type="radio"
                            name={`${baseId}-opt-${goal.id}`}
                            value={o.id}
                            checked={selected}
                            onChange={() => setOptionId(o.id)}
                            className="sr-only"
                          />
                          {selected ? (
                            <Icon name="check" className="size-4" strokeWidth={2.5} />
                          ) : null}
                          {o.label}
                          {o.hint ? (
                            <span
                              className={cn(
                                'rounded-pill px-2 text-caption',
                                selected ? 'bg-on-dark/15' : 'bg-blue-50 text-blue-700',
                              )}
                            >
                              {o.hint}
                            </span>
                          ) : null}
                        </label>
                      )
                    })}
                  </div>
                </motion.fieldset>
              ) : null}
            </AnimatePresence>

            <div aria-live="polite" className="mt-auto">
              <AnimatePresence mode="wait" initial={false}>
                {option ? (
                  <motion.div
                    key={`${goalId}-${option.id}`}
                    className="flex flex-col gap-4 rounded-xl bg-surface p-6 shadow-(--shadow-float) ring-1 ring-line"
                    {...fade}
                  >
                    <p className="text-caption font-semibold tracking-widest text-red-600 uppercase">
                      {content.labels.result}
                    </p>
                    <p className="font-display text-h3 font-semibold text-blue-900">
                      {option.result.title}
                    </p>
                    <p className="text-ink-muted">{option.result.text}</p>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <Link
                        href={option.result.href}
                        className="group/cta inline-flex min-h-11 items-center gap-2 rounded-pill bg-red-500 py-1 pr-1.5 pl-5 text-small font-semibold text-on-dark shadow-sm transition-[background-color,box-shadow,transform] duration-(--dur-base) active:scale-95 hov:bg-red-600 hov:shadow-(--shadow-glow-red)"
                      >
                        {content.labels.resultCta}
                        <span className="relative grid size-8 place-items-center overflow-hidden rounded-pill bg-on-dark/15">
                          <Icon
                            name="arrow-right"
                            className="size-4 transition-transform duration-(--dur-slow) ease-out-expo group-hover/cta:translate-x-8"
                          />
                          <Icon
                            name="arrow-right"
                            className="absolute size-4 -translate-x-8 transition-transform duration-(--dur-slow) ease-out-expo group-hover/cta:translate-x-0"
                          />
                        </span>
                      </Link>
                      <Link
                        href={content.adviceCta.href}
                        className="text-small font-semibold text-blue-700 underline-offset-4 hov:underline"
                      >
                        {content.adviceCta.label}
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p
                    key="hint"
                    className="flex items-center gap-3 rounded-xl border border-dashed border-blue-300 bg-surface/60 p-6 text-ink-muted"
                    {...fade}
                  >
                    <Icon name="arrow-up-right" className="size-5 -rotate-45 text-blue-600" />
                    {content.labels.emptyHint}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
