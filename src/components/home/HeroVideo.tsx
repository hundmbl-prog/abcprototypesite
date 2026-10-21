'use client'

import { useEffect, useRef } from 'react'

const SOURCES = [
  { src: '/media/hero-480.mp4', media: '(max-width: 767px)' },
  { src: '/media/hero-720.mp4' },
]

/**
 * Muted background loop for the home hero (mobile 480p, larger screens 720p).
 * The poster image underneath is shown first; the video only starts loading after the page
 * has loaded, so it never competes with the first paint. With reduced motion it is not
 * loaded at all, and off-screen it pauses.
 */
export function HeroVideo({ poster }: { poster: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let observer: IntersectionObserver | undefined
    const start = () => {
      // React does not render the "muted" attribute; iOS Safari needs it for autoplay
      video.muted = true
      video.setAttribute('muted', '')
      // Reuse the poster image that is already on screen (no second download, no new paint)
      const shown = video.previousElementSibling
      video.poster =
        shown instanceof HTMLImageElement && shown.currentSrc ? shown.currentSrc : poster
      for (const { src, media } of SOURCES) {
        const source = document.createElement('source')
        source.src = src
        source.type = 'video/mp4'
        if (media) source.media = media
        video.appendChild(source)
      }
      video.load()
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) void video.play().catch(() => {})
          else video.pause()
        },
        { threshold: 0.1 },
      )
      observer.observe(video)
    }

    let timer: number | undefined
    const schedule = () => {
      timer = window.setTimeout(start, 300)
    }
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })
    return () => {
      window.removeEventListener('load', schedule)
      window.clearTimeout(timer)
      observer?.disconnect()
    }
  }, [poster])

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
      className="absolute inset-0 size-full object-cover motion-reduce:hidden"
    />
  )
}
