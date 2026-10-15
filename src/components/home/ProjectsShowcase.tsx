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
      <div ref={viewportRef} className="overflow-hidden py-4">
        <div className="flex">
          {items.map((project, i) => {
            const active = i === index
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
                    'relative grid overflow-hidden rounded-2xl bg-surface shadow-(--shadow-float) ring-1 ring-blue-900/5 transition-[transform,opacity] duration-(--dur-slower) ease-out-expo lg:grid-cols-12',
                    !active && 'scale-95 opacity-50',
                  )}
                >
                  {/* Photo */}
                  <div className="relative aspect-16/10 overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-120">
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
                    {/* soft seam into the info panel */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-surface/60 to-transparent lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-1/5 lg:bg-linear-to-l"
                    />
                  </div>

                  {/* Info panel: the same photo, blurred and darkened, so its colours always match */}
                  <div className="relative isolate overflow-hidden lg:col-span-5">
                    <Image
                      src={project.image.src}
                      alt=""
                      width={project.image.width}
                      height={project.image.height}
                      sizes="400px"
                      className="absolute inset-0 -z-20 size-full scale-150 object-cover blur-3xl"
                    />
                    <span aria-hidden className="absolute inset-0 -z-10 bg-surface/90" />
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-x-0 top-0 h-1 lg:inset-x-auto lg:inset-y-0 lg:left-0 lg:h-auto lg:w-1',
                        'bg-red-500',
                      )}
                    />
                    <div
                      className={cn(
                        'flex h-full flex-col gap-5 p-6 md:p-10 [&>*]:transition-[opacity,transform] [&>*]:duration-(--dur-slower) [&>*]:ease-out-expo',
                        active
                          ? '[&>*]:translate-y-0 [&>*]:opacity-100 [&>*:nth-child(2)]:delay-100 [&>*:nth-child(3)]:delay-150 [&>*:nth-child(4)]:delay-200 [&>*:nth-child(5)]:delay-300'
                          : '[&>*]:translate-y-4 [&>*]:opacity-0',
                      )}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="rounded-pill bg-red-500 px-3 py-1 text-caption font-semibold tracking-wide text-on-dark uppercase">
                          Projekt
                        </span>
                        <span
                          aria-hidden
                          className="font-display text-h3 font-semibold text-red-600"
                        >
                          {String(i + 1).padStart(2, '0')}
                          <span className="text-h4 text-ink-muted">
                            {' '}
                            / {String(items.length).padStart(2, '0')}
                          </span>
                        </span>
                      </div>
                      <h3 className="text-h3 text-blue-900">{project.title}</h3>
                      <p className="line-clamp-4 text-lead text-ink-muted">{project.description}</p>
                      {project.partners.length > 0 ? (
                        <p className="flex flex-wrap items-center gap-2 text-small">
                          <span className="text-ink-muted">In Kooperation mit</span>
                          {project.partners.map((partner) => (
                            <span
                              key={partner}
                              className="rounded-pill bg-blue-50 px-3 py-1 font-semibold text-blue-800 ring-1 ring-blue-100"
                            >
                              {partner}
                            </span>
                          ))}
                        </p>
                      ) : null}
                      <div className="mt-auto pt-2">
                        <Button
                          href={`/projekte/${project.slug}`}
                          variant="pill-red"
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
                        className={'absolute inset-0 origin-left rounded-pill bg-red-500'}
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
            className="grid size-11 place-items-center rounded-pill bg-surface text-red-700 shadow-md ring-1 ring-red-100 transition-[background-color,color,transform] duration-(--dur-base) active:scale-90 hov:bg-red-50"
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
            className="grid size-11 place-items-center rounded-pill bg-surface text-red-700 shadow-md ring-1 ring-red-100 transition-[background-color,color,transform] duration-(--dur-base) active:scale-90 hov:bg-red-50"
          >
            <Icon name="arrow-left" label="Vorheriges Projekt" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext(reducedMotion())}
            className="grid size-11 place-items-center rounded-pill bg-red-500 text-on-dark shadow-md transition-[background-color,transform] duration-(--dur-base) active:scale-90 hov:bg-red-600"
          >
            <Icon name="arrow-right" label="Nächstes Projekt" />
          </button>
        </div>
      </div>
    </div>
  )
}
