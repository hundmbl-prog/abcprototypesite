'use client'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { Project } from '@/content'

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Each project gets its own accent shade (AA as text on white, and as chips with white text). */
const accents = [
  { chip: 'bg-blue-600', text: 'text-blue-700', bar: 'bg-blue-600' },
  { chip: 'bg-red-500', text: 'text-red-600', bar: 'bg-red-500' },
  { chip: 'bg-blue-800', text: 'text-blue-800', bar: 'bg-blue-800' },
  { chip: 'bg-blue-500', text: 'text-blue-700', bar: 'bg-blue-500' },
  { chip: 'bg-red-600', text: 'text-red-700', bar: 'bg-red-600' },
  { chip: 'bg-blue-700', text: 'text-blue-700', bar: 'bg-blue-700' },
] as const

const DELAY = 6500

/**
 * Project slideshow: photo and text side by side – text never sits on the photo.
 * Plays automatically (progress line, pause button); pauses on hover and keyboard focus.
 * Drag/swipe, arrow keys and buttons. No autoplay with reduced motion.
 */
export function ProjectsShowcase({ items }: { items: Project[] }) {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: DELAY,
      playOnInit: false,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  )
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: 'center', duration: 32 }, [
    autoplay,
  ])
  const [index, setIndex] = useState(0)
  const [userPaused, setUserPaused] = useState(true)
  const [busy, setBusy] = useState(false)
  const regionRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setIndex(api.selectedScrollSnap())
    api.on('select', onSelect)
    if (!reducedMotion()) setUserPaused(false)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  // Play unless paused by the user, or the pointer / keyboard focus is on the slideshow.
  const sync = useCallback(() => {
    const plugin = api?.plugins().autoplay
    const viewport = api?.rootNode()
    if (!plugin || !viewport) return
    const isBusy =
      viewport.matches(':hover') ||
      viewport.contains(document.activeElement) ||
      document.activeElement === regionRef.current
    setBusy(isBusy)
    if (userPaused || isBusy) plugin.stop()
    else plugin.play()
  }, [api, userPaused])

  useEffect(() => {
    sync()
    const region = regionRef.current
    if (!region) return
    const later = () => window.setTimeout(sync, 0)
    const events = ['mouseover', 'mouseleave', 'focusin', 'focusout'] as const
    events.forEach((e) => region.addEventListener(e, later))
    return () => events.forEach((e) => region.removeEventListener(e, later))
  }, [sync])

  // The active progress line fills up with the autoplay timer.
  useEffect(() => {
    let frame = 0
    const loop = () => {
      const bar = progressRef.current
      const remaining = api?.plugins().autoplay?.timeUntilNext()
      if (bar)
        bar.style.transform = `scaleX(${typeof remaining === 'number' ? 1 - remaining / DELAY : 1})`
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [api, index])

  const playing = !userPaused

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      api?.scrollNext(reducedMotion())
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      api?.scrollPrev(reducedMotion())
    }
  }

  const current = items[index]

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="Karussell"
      aria-label="Projekte – mit den Pfeiltasten blättern"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-6 rounded-2xl"
    >
      <div ref={viewportRef} className="overflow-hidden py-6">
        <div className="flex">
          {items.map((project, i) => {
            const active = i === index
            const accent = accents[i % accents.length] ?? accents[0]
            return (
              <article
                key={project.id}
                role="group"
                aria-roledescription="Folie"
                aria-label={`${i + 1} von ${items.length}: ${project.title}`}
                className="min-w-0 shrink-0 grow-0 basis-[90%] px-2 md:basis-[82%] md:px-3"
              >
                <div
                  className={cn(
                    'grid overflow-hidden rounded-2xl bg-surface shadow-(--shadow-float) ring-1 ring-line transition-transform duration-(--dur-slower) ease-out-expo lg:grid-cols-12',
                    !active && 'scale-95',
                  )}
                >
                  <div className="relative aspect-16/10 overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-112">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      width={project.image.width}
                      height={project.image.height}
                      sizes="(min-width: 1024px) 50vw, 90vw"
                      placeholder={project.image.blurDataURL ? 'blur' : 'empty'}
                      blurDataURL={project.image.blurDataURL}
                      className={cn(
                        'ease-out absolute inset-0 size-full object-cover transition-transform duration-(--dur-kenburns)',
                        active && 'motion-safe:scale-110',
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-0 bg-blue-50 transition-opacity duration-(--dur-slower)',
                        active ? 'opacity-0' : 'opacity-60',
                      )}
                    />
                  </div>
                  <div className="relative overflow-hidden bg-linear-to-br from-surface via-surface to-blue-50 lg:col-span-5">
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-x-0 top-0 h-1 lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:h-auto lg:w-1',
                        accent.bar,
                      )}
                    />
                    <div
                      className={cn(
                        'flex h-full flex-col gap-4 p-6 md:p-10 [&>*]:transition-[opacity,transform] [&>*]:duration-(--dur-slower) [&>*]:ease-out-expo',
                        active
                          ? '[&>*]:translate-y-0 [&>*]:opacity-100 [&>*:nth-child(2)]:delay-75 [&>*:nth-child(3)]:delay-150 [&>*:nth-child(4)]:delay-200 [&>*:nth-child(5)]:delay-300'
                          : '[&>*]:translate-y-3 [&>*]:opacity-0',
                      )}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span
                          className={cn(
                            'rounded-pill px-3 py-1 text-caption font-semibold tracking-wide text-on-dark uppercase',
                            accent.chip,
                          )}
                        >
                          Projekt
                        </span>
                        <span
                          aria-hidden
                          className={cn('font-display text-h2 font-semibold', accent.text)}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="text-h3 text-navy">{project.title}</h3>
                      <p className="text-ink-muted">{project.description}</p>
                      {project.partners.length > 0 ? (
                        <p className="flex flex-wrap items-center gap-2 text-small">
                          <span className="text-ink-muted">In Kooperation mit</span>
                          {project.partners.map((partner) => (
                            <span
                              key={partner}
                              className={cn(
                                'rounded-pill bg-surface-2 px-3 py-1 font-semibold',
                                accent.text,
                              )}
                            >
                              {partner}
                            </span>
                          ))}
                        </p>
                      ) : null}
                      <div className="mt-auto pt-2">
                        <Button
                          href={`/projekte/${project.slug}`}
                          variant="pill"
                          tabIndex={active ? undefined : -1}
                        >
                          Projekt ansehen
                          <span className="sr-only">: {project.title}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <div className="container-page flex items-center justify-between gap-6">
        <ul className="flex flex-1 gap-2" aria-label="Projekt auswählen">
          {items.map((project, i) => {
            const accent = accents[i % accents.length] ?? accents[0]
            return (
              <li key={project.id} className="flex-1">
                <button
                  type="button"
                  onClick={() => api?.scrollTo(i, reducedMotion())}
                  aria-current={i === index ? 'true' : undefined}
                  className="group/dot flex h-11 w-full items-center"
                >
                  <span className="relative h-1.5 w-full overflow-hidden rounded-pill bg-blue-200 transition-colors duration-(--dur-base) group-hover/dot:bg-blue-300">
                    {i === index ? (
                      <span
                        ref={progressRef}
                        className={cn('absolute inset-0 origin-left rounded-pill', accent.bar)}
                      />
                    ) : null}
                  </span>
                  <span className="sr-only">Projekt {project.title}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <p className="sr-only" aria-live={playing && !busy ? 'off' : 'polite'}>
          {current ? `Projekt ${index + 1} von ${items.length}: ${current.title}` : null}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setUserPaused((paused) => !paused)}
            className="grid size-11 place-items-center rounded-pill bg-surface text-navy shadow-md hov:bg-navy hov:text-on-dark"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor">
                <path d="M7 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L8.5 4.64A1 1 0 0 0 7 5.5Z" />
              </svg>
            )}
            <span className="sr-only">
              {playing
                ? 'Projekte: automatisches Abspielen pausieren'
                : 'Projekte automatisch abspielen'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => api?.scrollPrev(reducedMotion())}
            className="grid size-11 place-items-center rounded-pill bg-surface text-navy shadow-md hov:bg-navy hov:text-on-dark"
          >
            <Icon name="arrow-left" label="Vorheriges Projekt" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext(reducedMotion())}
            className="grid size-11 place-items-center rounded-pill bg-navy text-on-dark shadow-md hov:bg-blue-700"
          >
            <Icon name="arrow-right" label="Nächstes Projekt" />
          </button>
        </div>
      </div>
    </div>
  )
}
