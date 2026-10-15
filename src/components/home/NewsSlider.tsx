'use client'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { NewsItem } from '@/content'

const DELAY = 6000
const dateFormat = new Intl.DateTimeFormat('de-DE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

/**
 * News slideshow: autoplay with progress bar, pauses on hover and keyboard focus,
 * play/pause button (WCAG 2.2.2), swipe, thumbnails. No autoplay with reduced motion.
 */
export function NewsSlider({ items }: { items: NewsItem[] }) {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: DELAY,
      playOnInit: false,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  )
  const [viewportRef, api] = useEmblaCarousel({ loop: true, duration: 30 }, [autoplay])
  const [index, setIndex] = useState(0)
  /** Paused by the user (button) or by reduced motion. Hover/focus pauses are temporary. */
  const [userPaused, setUserPaused] = useState(true)
  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setIndex(api.selectedScrollSnap())
    api.on('select', onSelect)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setUserPaused(false)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  // Play unless the user paused, or the pointer / keyboard focus is inside the slideshow.
  const sync = useCallback(() => {
    const plugin = api?.plugins().autoplay
    const region = api?.rootNode()
    if (!plugin || !region) return
    const busy = region.matches(':hover') || region.contains(document.activeElement)
    if (userPaused || busy) plugin.stop()
    else plugin.play()
  }, [api, userPaused])

  useEffect(() => {
    sync()
    const region = api?.rootNode()
    if (!region) return
    const later = () => window.setTimeout(sync, 0)
    region.addEventListener('mouseenter', later)
    region.addEventListener('mouseleave', later)
    region.addEventListener('focusin', later)
    region.addEventListener('focusout', later)
    return () => {
      region.removeEventListener('mouseenter', later)
      region.removeEventListener('mouseleave', later)
      region.removeEventListener('focusin', later)
      region.removeEventListener('focusout', later)
    }
  }, [api, sync])

  // Progress bar follows the autoplay timer.
  useEffect(() => {
    let frame = 0
    const loop = () => {
      const bar = progressRef.current
      const remaining = api?.plugins().autoplay?.timeUntilNext()
      if (bar && typeof remaining === 'number')
        bar.style.transform = `scaleX(${1 - remaining / DELAY})`
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [api])

  const playing = !userPaused
  const onToggle = () => setUserPaused((paused) => !paused)

  return (
    <div
      role="region"
      aria-roledescription="Karussell"
      aria-label="Aktuelle News"
      className="flex flex-col gap-6"
    >
      <div
        ref={viewportRef}
        className="overflow-hidden rounded-2xl border border-red-100 shadow-(--shadow-float)"
      >
        <div className="flex" aria-live={playing ? 'off' : 'polite'}>
          {items.map((item, i) => (
            <article
              key={item.id}
              role="group"
              aria-roledescription="Folie"
              aria-label={`${i + 1} von ${items.length}`}
              className="group relative grid min-w-0 shrink-0 grow-0 basis-full overflow-hidden rounded-2xl bg-linear-to-br from-surface via-surface to-red-50 lg:grid-cols-12"
            >
              <div className="relative aspect-16/10 overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-112">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  placeholder={item.image.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={item.image.blurDataURL}
                  className="absolute inset-0 size-full object-cover transition-transform duration-(--dur-slower) ease-out-expo motion-safe:group-hov:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-6 md:p-10 lg:col-span-5 lg:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-pill bg-red-100 px-3 py-1 text-caption font-semibold tracking-wide text-red-700 uppercase">
                    {item.category}
                  </span>
                  <time dateTime={item.date} className="text-small font-semibold text-red-700">
                    {dateFormat.format(new Date(item.date))}
                  </time>
                </div>
                <h3 className="text-h3 text-blue-900">
                  <Link href={`/news/${item.slug}`} className="stretched-link">
                    {item.title}
                  </Link>
                </h3>
                <p className="line-clamp-3 text-ink-muted">{item.excerpt}</p>
                <span
                  aria-hidden
                  className="inline-flex items-center gap-2 text-small font-semibold text-red-600"
                >
                  Weiterlesen
                  <Icon
                    name="arrow-right"
                    className="size-4 transition-transform group-hov:translate-x-1"
                  />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggle}
          className="grid size-11 shrink-0 place-items-center rounded-pill border border-red-200 bg-surface text-red-700 hov:border-red-600 hov:bg-red-600 hov:text-on-dark"
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
            {playing ? 'Automatisches Abspielen pausieren' : 'Automatisch abspielen'}
          </span>
        </button>
        <div className="relative h-1.5 flex-1 overflow-hidden rounded-pill bg-red-100" aria-hidden>
          <span
            ref={progressRef}
            className="absolute inset-0 origin-left scale-x-0 rounded-pill bg-linear-to-r from-red-400 to-red-600"
          />
        </div>
        <p className="shrink-0 font-mono text-small text-ink-muted">
          <span className="sr-only">Folie </span>
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            className="grid size-11 place-items-center rounded-pill border border-red-200 bg-surface text-red-700 hov:border-red-600 hov:bg-red-600 hov:text-on-dark"
          >
            <Icon name="arrow-left" label="Vorherige News" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            className="grid size-11 place-items-center rounded-pill border border-red-200 bg-surface text-red-700 hov:border-red-600 hov:bg-red-600 hov:text-on-dark"
          >
            <Icon name="arrow-right" label="Nächste News" />
          </button>
        </div>
      </div>

      <ul className="-mx-2 scrollbar-none flex gap-3 overflow-x-auto px-2 pb-2 md:grid md:grid-cols-6 md:overflow-visible">
        {items.map((item, i) => (
          <li key={item.id} className="w-40 shrink-0 md:w-auto">
            <button
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-current={i === index ? 'true' : undefined}
              className={cn(
                'relative flex w-full flex-col gap-2 rounded-lg p-1.5 text-left transition-colors duration-(--dur-base)',
                i === index
                  ? 'bg-surface shadow-md ring-2 ring-red-500'
                  : 'opacity-70 hov:bg-surface hov:opacity-100',
              )}
            >
              <span className="relative block aspect-16/10 overflow-hidden rounded-md">
                <Image
                  src={item.image.src}
                  alt=""
                  width={item.image.width}
                  height={item.image.height}
                  sizes="160px"
                  className="size-full object-cover"
                />
              </span>
              <span className="line-clamp-2 px-1 text-caption font-semibold text-blue-900">
                <span className="sr-only">Zu News: </span>
                {item.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
