'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import type { HomePage } from '@/content'

gsap.registerPlugin(ScrollTrigger)

/**
 * Four-step process. While the section scrolls through the viewport, a line fills and each step
 * lights up when the line reaches it. With reduced motion everything is shown complete.
 */
export function ProcessSteps({ content }: { content: HomePage['steps'] }) {
  const rootRef = useRef<HTMLElement>(null)
  const count = content.items.length
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setProgress(0)
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    })
    return () => trigger.kill()
  }, [])

  const reached = (i: number) => progress >= (count > 1 ? i / (count - 1) : 0) - 0.001

  return (
    <section
      ref={rootRef}
      id="ablauf"
      aria-labelledby="ablauf-titel"
      className="bg-surface py-section"
      style={{ ['--step-progress' as string]: progress }}
    >
      <div className="container-page">
        <SectionHeader
          id="ablauf-titel"
          eyebrow={content.eyebrow}
          title={content.title}
          action={
            <Button href={content.cta.href} variant="pill-light">
              {content.cta.label}
            </Button>
          }
        />
        <ol className="relative grid gap-6 md:grid-cols-4 md:gap-6">
          {/* track + fill: vertical on phones, horizontal from md */}
          <span
            aria-hidden
            className="absolute top-6 bottom-6 left-6 w-0.5 bg-blue-100 md:top-6 md:right-[12.5%] md:bottom-auto md:left-[12.5%] md:h-0.5 md:w-auto"
          />
          <span
            aria-hidden
            className="absolute top-6 left-6 h-[calc((100%-3rem)*var(--step-progress))] w-0.5 bg-linear-to-b from-blue-600 to-red-500 md:right-auto md:left-[12.5%] md:h-0.5 md:w-[calc(75%*var(--step-progress))] md:bg-linear-to-r"
          />
          {content.items.map((step, i) => {
            const on = reached(i)
            return (
              <li
                key={step.id}
                className="relative flex gap-5 md:flex-col md:items-center md:gap-4 md:text-center"
              >
                <span
                  className={cn(
                    'relative z-10 grid size-12 shrink-0 place-items-center rounded-pill font-display text-h4 font-semibold ring-4 ring-surface transition-[background-color,color,transform,box-shadow] duration-(--dur-slow) ease-out-expo',
                    on
                      ? 'scale-110 bg-blue-600 text-on-dark shadow-md'
                      : 'bg-blue-50 text-blue-700',
                  )}
                >
                  {i + 1}
                </span>
                <div
                  className={cn(
                    'flex flex-1 flex-col gap-2 rounded-2xl p-5 ring-1 transition-[background-color,box-shadow,transform] duration-(--dur-slow) ease-out-expo md:w-full',
                    on
                      ? 'bg-linear-to-b from-blue-100 to-surface shadow-md ring-blue-200'
                      : 'bg-surface ring-line',
                  )}
                >
                  <h3 className="text-h4 text-blue-900">{step.title}</h3>
                  <p className="text-small text-ink-muted">{step.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
