'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section aria-labelledby="fehler-titel" className="tone-light-3">
      <div className="container-page flex min-h-[80svh] flex-col justify-center gap-6 pt-32 pb-section">
        <p className="text-small font-semibold tracking-widest text-blue uppercase">Fehler 500</p>
        <h1 id="fehler-titel" className="max-w-narrow text-h1 text-navy">
          Hier ist etwas schiefgelaufen.
        </h1>
        <p className="max-w-prose text-lead text-ink-muted">
          Bitte versuchen Sie es noch einmal. Wenn der Fehler bleibt, erreichen Sie uns telefonisch
          oder per E-Mail.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant="primary" onClick={reset}>
            Erneut versuchen
          </Button>
          <Button href="/" variant="outline">
            Zur Startseite
          </Button>
        </div>
      </div>
    </section>
  )
}
