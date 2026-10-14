'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useEffect, useState, type KeyboardEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { Project } from '@/content'

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Cinematic project slideshow: drag/swipe, arrow keys, large image with title, partners and link. */
export function ProjectsShowcase({ items }: { items: Project[] }) {
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: 'center', duration: 32 })
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setIndex(api.selectedScrollSnap())
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

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
      role="region"
      aria-roledescription="Karussell"
      aria-label="Projekte – mit den Pfeiltasten blättern"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-8 rounded-2xl"
    >
      <div ref={viewportRef} className="overflow-hidden">
        <div className="flex">
          {items.map((project, i) => {
            const active = i === index
            return (
              <article
                key={project.id}
                role="group"
                aria-roledescription="Folie"
                aria-label={`${i + 1} von ${items.length}: ${project.title}`}
                className="min-w-0 shrink-0 grow-0 basis-[88%] px-2 md:basis-[80%] md:px-3"
              >
                <div
                  className={cn(
                    'sheen relative isolate flex aspect-4/5 flex-col justify-end overflow-hidden rounded-2xl shadow-(--shadow-float) transition-transform duration-(--dur-slower) ease-out-expo sm:aspect-16/10 lg:aspect-21/9',
                    !active && 'scale-95',
                  )}
                >
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    sizes="(min-width: 768px) 80vw, 88vw"
                    placeholder={project.image.blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={project.image.blurDataURL}
                    className={cn(
                      'ease-out absolute inset-0 -z-10 size-full object-cover transition-transform duration-(--dur-kenburns)',
                      active && 'motion-safe:scale-110',
                    )}
                  />
                  <div
                    aria-hidden
                    className={cn(
                      'absolute inset-0 -z-10 bg-surface transition-opacity duration-(--dur-slower)',
                      active ? 'opacity-0' : 'opacity-50',
                    )}
                  />
                  <div
                    className={cn(
                      'm-3 flex max-w-prose flex-col gap-3 rounded-2xl p-5 text-ink glass-strong transition-[opacity,transform] duration-(--dur-slow) ease-out-expo md:m-6 md:p-8',
                      active ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-pill bg-blue-soft px-3 py-1 text-caption font-semibold tracking-wide text-navy uppercase">
                        Projekt
                      </span>
                      <span className="font-mono text-small text-ink-muted">
                        {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-h3 text-navy">{project.title}</h3>
                    <p className="line-clamp-3 text-ink-muted">{project.description}</p>
                    {project.partners.length > 0 ? (
                      <p className="flex flex-wrap items-center gap-2 text-small">
                        <span className="text-ink-muted">In Kooperation mit</span>
                        {project.partners.map((partner) => (
                          <span
                            key={partner}
                            className="rounded-pill border border-line bg-surface px-3 py-1 font-semibold text-navy"
                          >
                            {partner}
                          </span>
                        ))}
                      </p>
                    ) : null}
                    <div className="pt-1">
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
              </article>
            )
          })}
        </div>
      </div>

      <div className="container-wide flex items-center justify-between gap-6">
        <ul className="flex flex-1 gap-2" aria-label="Projekt auswählen">
          {items.map((project, i) => (
            <li key={project.id} className="flex-1">
              <button
                type="button"
                onClick={() => api?.scrollTo(i, reducedMotion())}
                aria-current={i === index ? 'true' : undefined}
                className="group/dot flex h-11 w-full items-center"
              >
                <span
                  className={cn(
                    'h-1 w-full rounded-pill transition-colors duration-(--dur-base)',
                    i === index ? 'bg-navy' : 'bg-line-strong group-hover/dot:bg-ink-muted',
                  )}
                />
                <span className="sr-only">Projekt {project.title}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="sr-only" aria-live="polite">
          {current ? `Projekt ${index + 1} von ${items.length}: ${current.title}` : null}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => api?.scrollPrev(reducedMotion())}
            className="grid size-11 place-items-center rounded-pill border border-control bg-surface text-navy shadow-sm hov:bg-navy hov:text-on-dark"
          >
            <Icon name="arrow-left" label="Vorheriges Projekt" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext(reducedMotion())}
            className="grid size-11 place-items-center rounded-pill border border-control bg-surface text-navy shadow-sm hov:bg-navy hov:text-on-dark"
          >
            <Icon name="arrow-right" label="Nächstes Projekt" />
          </button>
        </div>
      </div>
    </div>
  )
}
