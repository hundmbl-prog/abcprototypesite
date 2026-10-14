'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import type { Location } from '@/content'

/**
 * Map that only loads after the visitor agrees (GDPR): no request to OpenStreetMap before the click.
 */
export function ConsentMap({ location }: { location: Location }) {
  const [loaded, setLoaded] = useState(false)
  const d = 0.006
  const bbox = [
    location.lon - d,
    location.lat - d / 2,
    location.lon + d,
    location.lat + d / 2,
  ].join(',')
  const embed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${location.lat},${location.lon}`
  const external = `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lon}#map=17/${location.lat}/${location.lon}`

  return (
    <div className="relative flex h-full min-h-96 flex-col overflow-hidden rounded-2xl border border-line bg-surface-3">
      {loaded ? (
        <iframe
          title={`Karte: ${location.name}, ${location.street}`}
          src={embed}
          loading="lazy"
          className="size-full min-h-96 flex-1 border-0"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 [background-image:radial-gradient(var(--color-line-strong)_1px,transparent_1px)] [background-size:var(--spacing-gutter)_var(--spacing-gutter)] p-8 text-center">
          <span className="grid size-14 place-items-center rounded-pill bg-navy text-on-dark shadow-lg">
            <Icon name="location" className="size-6" />
          </span>
          <p className="max-w-prose text-small text-ink-muted">
            Zum Schutz Ihrer Daten wird die Karte erst nach Ihrer Zustimmung geladen. Dabei werden
            Daten an OpenStreetMap übertragen.
          </p>
          <Button variant="navy" size="sm" onClick={() => setLoaded(true)}>
            Karte laden
          </Button>
        </div>
      )}
      <a
        href={external}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 border-t border-line bg-surface px-4 py-3 text-small font-semibold text-blue hov:underline"
      >
        In OpenStreetMap öffnen
        <Icon name="arrow-up-right" className="size-4" />
        <span className="sr-only">(öffnet in neuem Tab)</span>
      </a>
    </div>
  )
}
