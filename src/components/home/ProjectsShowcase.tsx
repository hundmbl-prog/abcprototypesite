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
                    'relative isolate flex aspect-4/5 flex-col justify-end overflow-hidden rounded-2xl transition-[opacity,transform] duration-(--dur-slower) ease-out-expo sm:aspect-16/10 lg:aspect-21/9',
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
                    className="absolute inset-0 -z-10 bg-linear-to-t from-navy via-navy/60 to-navy/0"
                  />
                  <div
                    aria-hidden
                    className={cn(
                      'absolute inset-0 -z-10 bg-navy transition-opacity duration-(--dur-slower)',
                      active ? 'opacity-0' : 'opacity-60',
                    )}
                  />
                  <div
                    className={cn(
                      'flex max-w-narrow flex-col gap-4 p-6 transition-opacity duration-(--dur-slow) md:p-10 lg:p-14',
                      active ? 'opacity-100' : 'opacity-0',
                    )}
                  >
                    <p className="font-mono text-small text-on-dark-muted">
                      {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                    </p>
                    <h3 className="text-h2">{project.title}</h3>
                    <p className="line-clamp-3 text-on-dark-muted md:text-lead">
                      {project.description}
                    </p>
                    {project.partners.length > 0 ? (
                      <p className="flex flex-wrap items-center gap-2 text-small">
                        <span className="text-on-dark-muted">In Kooperation mit</span>
                        {project.partners.map((partner) => (
                          <span
                            key={partner}
                            className="rounded-pill border border-on-dark/40 px-3 py-1 font-semibold"
                          >
                            {partner}
                          </span>
                        ))}
                      </p>
                    ) : null}
                    <div className="pt-2">
                      <Button
                        href={`/projekte/${project.slug}`}
                        variant="white"
                        icon="arrow-right"
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
                    i === index ? 'bg-on-dark' : 'bg-on-dark/25 group-hover/dot:bg-on-dark/60',
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
            className="grid size-11 place-items-center rounded-pill border border-on-dark/40 hov:bg-on-dark hov:text-navy"
          >
            <Icon name="arrow-left" label="Vorheriges Projekt" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext(reducedMotion())}
            className="grid size-11 place-items-center rounded-pill border border-on-dark/40 hov:bg-on-dark hov:text-navy"
          >
            <Icon name="arrow-right" label="Nächstes Projekt" />
          </button>
        </div>
      </div>
    </div>
  )
}
