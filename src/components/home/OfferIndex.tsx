'use client'

import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { OfferCardData } from '@/components/cards/types'

/**
 * Offer index (variant "index"): the offers as one typographic list beside a single sticky photo
 * frame – no cards. On large screens the entry in the middle of the viewport is "active": its
 * title is Navy, the others recede, and the frame cross-fades to its photo. A thin ABC-Blue line
 * in the gutter draws itself down the list exactly as far as the visitor has scrolled. Phones get
 * the first photo once and a plain list. Without JavaScript or with reduced motion everything is
 * static and complete.
 */
export function OfferIndex({ cards, className }: { cards: OfferCardData[]; className?: string }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const entries = Array.from(el.querySelectorAll<HTMLElement>('[data-index-entry]'))
    const images = Array.from(el.querySelectorAll<HTMLImageElement>('img'))
    const show = (index: number) => {
      images.forEach((image, i) => {
        if (i === index) {
          image.setAttribute('data-active', '')
          image.removeAttribute('aria-hidden')
        } else {
          image.removeAttribute('data-active')
          image.setAttribute('aria-hidden', 'true')
        }
      })
    }
    const mm = gsap.matchMedia()

    // Desktop: the entry in the middle band of the viewport is active.
    mm.add('(min-width: 64rem)', () => {
      const observer = new IntersectionObserver(
        (hits) => {
          for (const hit of hits) {
            if (!hit.isIntersecting) continue
            const index = entries.indexOf(hit.target as HTMLElement)
            entries.forEach((entry, i) => {
              entry.dataset.active = String(i === index)
            })
            show(index)
          }
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
      )
      entries.forEach((entry) => observer.observe(entry))
      return () => {
        observer.disconnect()
        entries.forEach((entry) => delete entry.dataset.active)
        show(0)
      }
    })

    // The thread: drawn exactly as far as the visitor has scrolled through the list. The line is
    // complete once the list's bottom passes 60 % of the viewport (pathLength=1, so 0–1 values).
    mm.add('(min-width: 64rem) and (prefers-reduced-motion: no-preference)', () => {
      const path = el.querySelector<SVGLineElement>('[data-thread] line')
      if (!path) return
      let frame = 0
      const draw = () => {
        frame = 0
        const rect = el.getBoundingClientRect()
        const progress = (window.innerHeight * 0.6 - rect.top) / rect.height
        path.style.strokeDasharray = '1'
        path.style.strokeDashoffset = String(1 - Math.min(1, Math.max(0, progress)))
      }
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(draw)
      }
      draw()
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule)
      return () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('scroll', schedule)
        window.removeEventListener('resize', schedule)
        path.style.strokeDasharray = ''
        path.style.strokeDashoffset = ''
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={root} className={cn('grid gap-10 lg:grid-cols-12 lg:gap-x-8', className)}>
      {/* One frame for all photos; sticky under the fixed header on large screens */}
      <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
        <div className="relative aspect-3/2 overflow-hidden rounded-xl lg:aspect-4/5">
          {cards.map((card, i) => (
            <Image
              key={card.id}
              src={card.image.src}
              alt={card.image.alt}
              width={card.image.width}
              height={card.image.height}
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={70}
              placeholder={card.image.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={card.image.blurDataURL}
              data-active={i === 0 ? '' : undefined}
              aria-hidden={i !== 0 ? true : undefined}
              className={cn(
                'absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-(--dur-slower) ease-in-out-soft data-active:opacity-100',
                card.imageFocus === 'left' && 'object-left',
                card.imageFocus === 'right' && 'object-right',
                i > 0 && 'max-lg:hidden',
              )}
            />
          ))}
        </div>
      </div>

      {/* The thread: a grid column of its own, so it never overlaps content. The svg is absolute
          inside the cell and the line uses percentages, so nothing is stretched or distorted. */}
      <div aria-hidden className="relative hidden lg:col-span-1 lg:block">
        <svg
          data-thread
          focusable="false"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-blue"
        >
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            pathLength={1}
            stroke="currentColor"
            strokeWidth={4}
            strokeLinecap="round"
          />
        </svg>
      </div>

      <ul className="flex flex-col gap-12 lg:col-span-6 lg:gap-0">
        {cards.map((card) => (
          <li key={card.id} className="min-w-0">
            <article className="flex flex-col justify-center lg:min-h-stage">
              <Link href={card.href} data-index-entry className="group flex flex-col gap-4">
                <h3 className="font-display text-h2 text-navy transition-colors duration-(--dur-slow) lg:text-h1 lg:group-data-[active=false]:text-ink-muted/70">
                  {card.title}
                </h3>
                <p className="max-w-prose text-lead text-ink-muted">{card.description}</p>
                <span className="inline-flex origin-left items-center gap-1.5 font-semibold text-blue transition-[color,transform] duration-(--dur-base) ease-out-expo group-hover:scale-105 group-hover:text-red">
                  {card.ctaLabel ?? card.title}
                  <Icon
                    name="arrow-right"
                    className="size-4 transition-transform duration-(--dur-base) group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
