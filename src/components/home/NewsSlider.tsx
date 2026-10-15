'use client'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { NewsItem } from '@/content'

const DELAY = 6000

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
        className="overflow-hidden rounded-2xl bg-surface shadow-(--shadow-float) ring-1 ring-blue-900/5"
      >
        <div className="flex" aria-live={playing ? 'off' : 'polite'}>
          {items.map((item, i) => {
            const active = i === index
            return (
              <article
                key={item.id}
                role="group"
                aria-roledescription="Folie"
                aria-label={`${i + 1} von ${items.length}`}
                className="group relative grid min-w-0 shrink-0 grow-0 basis-full lg:grid-cols-12"
              >
                <div className="relative aspect-16/10 overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-112">
                  {/* each new slide's photo zooms out softly */}
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    placeholder={item.image.blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={item.image.blurDataURL}
                    className={cn(
                      'absolute inset-0 size-full object-cover transition-transform duration-[1600ms] ease-out-expo',
                      active ? 'scale-100' : 'motion-safe:scale-115',
                    )}
                  />
                </div>
                <div
                  className={cn(
                    'flex flex-col justify-center gap-4 p-6 md:p-10 lg:col-span-5 lg:p-12 [&>*]:transition-[opacity,transform] [&>*]:duration-(--dur-slower) [&>*]:ease-out-expo',
                    active
                      ? '[&>*]:translate-y-0 [&>*]:opacity-100 [&>*:nth-child(2)]:delay-100 [&>*:nth-child(3)]:delay-200 [&>*:nth-child(4)]:delay-300'
                      : '[&>*]:translate-y-4 [&>*]:opacity-0',
                  )}
                >
                  <span className="self-start rounded-pill bg-red-50 px-3 py-1 text-caption font-semibold tracking-wide text-red-700 uppercase ring-1 ring-red-100">
                    {item.category}
                  </span>
                  <h3 className="text-h3 text-blue-900">
                    <Link
                      href={`/news/${item.slug}`}
                      className="stretched-link"
                      tabIndex={active ? undefined : -1}
                    >
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
            )
          })}
        </div>
      </div>

      {/* One compact control: back · position · forward (+ pause, required for auto-advancing content) */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-pill bg-surface p-1 shadow-md ring-1 ring-red-100">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            className="grid size-11 place-items-center rounded-pill bg-red-500 text-on-dark transition-[background-color,transform] duration-(--dur-base) active:scale-90 hov:bg-red-600"
          >
            <Icon name="arrow-left" label="Vorherige News" />
          </button>
          <p className="min-w-20 px-2 text-center font-mono text-small font-semibold text-blue-900">
            <span className="sr-only">Folie </span>
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </p>
          <button
            type="button"
            onClick={onToggle}
            className="grid size-9 place-items-center rounded-pill text-red-700 transition-colors duration-(--dur-base) hov:bg-red-50"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden fill="currentColor">
                <path d="M7 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L8.5 4.64A1 1 0 0 0 7 5.5Z" />
              </svg>
            )}
            <span className="sr-only">
              {playing ? 'Automatisches Abspielen pausieren' : 'Automatisch abspielen'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            className="grid size-11 place-items-center rounded-pill bg-red-500 text-on-dark transition-[background-color,transform] duration-(--dur-base) active:scale-90 hov:bg-red-600"
          >
            <Icon name="arrow-right" label="Nächste News" />
          </button>
        </div>
      </div>
    </div>
  )
}
