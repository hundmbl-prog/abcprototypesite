'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { FilterChip } from '@/components/ui/FilterChip'
import { Icon } from '@/components/ui/Icon'
import type { GalleryBlock } from '@/content/types'

const ALL = 'Alle'

/**
 * Photo gallery: album filter, masonry grid and a lightbox built on the native <dialog>
 * (focus stays inside, Escape closes, arrow keys browse).
 */
export function Gallery({ block }: { block: GalleryBlock }) {
  const albums = useMemo(
    () => [ALL, ...Array.from(new Set(block.items.map((i) => i.album)))],
    [block.items],
  )
  const [album, setAlbum] = useState(ALL)
  const items = album === ALL ? block.items : block.items.filter((i) => i.album === album)
  const [open, setOpen] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const current = open === null ? null : items[open]

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (open !== null && !el.open) el.showModal()
    if (open === null && el.open) el.close()
  }, [open])

  const step = (delta: number) =>
    setOpen((i) => (i === null ? i : (i + delta + items.length) % items.length))

  return (
    <>
      <SectionHeader
        id={`${block.id}-titel`}
        eyebrow={block.eyebrow}
        title={block.title}
        intro={block.intro}
      />
      <div role="group" aria-label="Nach Album filtern" className="mb-8 flex flex-wrap gap-2">
        {albums.map((a) => (
          <FilterChip
            key={a}
            selected={album === a}
            count={a === ALL ? block.items.length : block.items.filter((i) => i.album === a).length}
            onClick={() => setAlbum(a)}
          >
            {a}
          </FilterChip>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {items.length} Fotos angezeigt
      </p>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {items.map((item, i) => (
          <li key={`${item.album}-${item.caption}`} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full overflow-hidden rounded-xl shadow-sm transition-shadow duration-(--dur-base) hov:shadow-(--shadow-float) foc:outline-2 foc:outline-offset-3 foc:outline-blue"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                placeholder={item.image.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={item.image.blurDataURL}
                className="h-auto w-full transition-transform duration-(--dur-slower) ease-out-expo motion-safe:group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-shade/75 to-transparent p-4 pt-10 text-left text-small font-semibold text-on-dark opacity-0 transition-opacity duration-(--dur-base) group-hover:opacity-100 group-focus-visible:opacity-100">
                {item.caption}
                <Icon name="arrow-up-right" className="size-4 shrink-0" />
              </span>
              <span className="sr-only">: Foto vergrößern</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Foto-Ansicht"
        onClose={() => setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        className="m-auto max-h-[92svh] w-[min(96vw,80rem)] overflow-visible bg-transparent p-0 backdrop:bg-shade/85 backdrop:backdrop-blur-sm"
      >
        {current ? (
          <figure className="flex flex-col gap-3">
            <div className="relative overflow-hidden rounded-xl bg-shade">
              <Image
                src={current.image.src}
                alt={current.image.alt}
                width={current.image.width}
                height={current.image.height}
                sizes="96vw"
                className="max-h-[78svh] w-full object-contain"
              />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-3 text-on-dark">
              <span className="font-semibold">{current.caption}</span>
              <span className="text-small text-on-dark-muted">
                {(open ?? 0) + 1} / {items.length}
              </span>
            </figcaption>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                className="grid size-11 place-items-center rounded-pill bg-surface text-red-700 transition-transform active:scale-90 hov:bg-red-50 foc:outline-2 foc:outline-offset-2 foc:outline-on-dark"
              >
                <Icon name="arrow-left" label="Vorheriges Foto" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="grid size-11 place-items-center rounded-pill bg-red-500 text-on-dark transition-transform active:scale-90 hov:bg-red-600 foc:outline-2 foc:outline-offset-2 foc:outline-on-dark"
              >
                <Icon name="close" label="Schließen" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="grid size-11 place-items-center rounded-pill bg-surface text-red-700 transition-transform active:scale-90 hov:bg-red-50 foc:outline-2 foc:outline-offset-2 foc:outline-on-dark"
              >
                <Icon name="arrow-right" label="Nächstes Foto" />
              </button>
            </div>
          </figure>
        ) : null}
      </dialog>
    </>
  )
}
