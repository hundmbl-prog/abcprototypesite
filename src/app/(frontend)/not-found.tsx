import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section aria-labelledby="fehler-titel" className="relative overflow-hidden tone-light-3">
      <div className="container-page flex min-h-[80svh] flex-col justify-center gap-6 pt-32 pb-section">
        <p className="text-small font-semibold tracking-widest text-blue uppercase">Fehler 404</p>
        <h1 id="fehler-titel" className="max-w-narrow text-h1 text-navy">
          Diese Seite gibt es (noch) nicht.
        </h1>
        <p className="max-w-prose text-lead text-ink-muted">
          Vielleicht hat sich die Adresse geändert oder die Seite wird gerade neu gestaltet. Über
          die Startseite oder das Menü finden Sie alle Angebote.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href="/" variant="primary" icon="arrow-right">
            Zur Startseite
          </Button>
          <Button href="/ueber-uns/kontakt" variant="outline">
            Kontakt aufnehmen
          </Button>
        </div>
      </div>
    </section>
  )
}
