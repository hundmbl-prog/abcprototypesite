import type { Metadata } from 'next'
import { readColorTokens } from '@/lib/design-tokens'
import { ButtonSection, FormSection, TagSection } from './_components/Controls'
import { CardSection, LayoutSection } from './_components/Cards'
import { ExamDatesDemo } from './_components/ExamDatesDemo'
import { SgSection } from './_components/SgSection'
import { ColorSection, PairingSection, SpacingSection, TypeSection } from './_components/Tokens'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Styleguide',
  description:
    'Design-Tokens, Farbpaarungen, Buttons, Karten und Formularfelder der ABC-Mainz-Website.',
  robots: { index: false, follow: false },
}

const toc = [
  ['farben', 'Farben'],
  ['kontrast', 'Kontrast'],
  ['typografie', 'Typografie'],
  ['abstaende', 'Abstände & Bewegung'],
  ['buttons', 'Buttons'],
  ['tags', 'Tags & Badges'],
  ['formulare', 'Formulare'],
  ['karten', 'Karten'],
  ['layouts', 'Layouts'],
  ['pruefungstermine', 'Prüfungstermine'],
] as const

export default function StyleguidePage() {
  const colors = readColorTokens()
  return (
    <>
      <div className="tone-navy pt-32 pb-section-sm">
        <div className="container-page flex flex-col gap-8">
          <p className="inline-flex items-center gap-3 text-small font-semibold tracking-widest text-on-dark-muted uppercase">
            <span aria-hidden className="h-0.5 w-8 bg-red" />
            ABC Mainz · Designsystem
          </p>
          <h1 className="max-w-narrow text-display">Styleguide</h1>
          <p className="max-w-prose text-lead text-on-dark-muted">
            Alle Tokens, Farbpaarungen, Buttons, Karten und Formularfelder an einem Ort. Diese Seite
            ist nur für das Team gedacht und wird nicht von Suchmaschinen indexiert.
          </p>
          <nav aria-label="Inhalt des Styleguides">
            <ul className="flex flex-wrap gap-2">
              {toc.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="inline-flex min-h-11 items-center rounded-pill border border-on-dark/40 px-4 text-small font-semibold transition-colors duration-(--dur-base) hov:border-on-dark hov:bg-on-dark/10"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <ColorSection colors={colors} />
      <PairingSection colors={colors} />
      <TypeSection />
      <SpacingSection />
      <ButtonSection />
      <TagSection />
      <FormSection />
      <CardSection />
      <LayoutSection />
      <SgSection
        id="pruefungstermine"
        title="Prüfungstermine"
        intro="Filterbare Terminliste der telc Seite – hier mit Beispieldaten zum Testen. Auf der öffentlichen Seite stehen nur echte Termine aus dem Admin."
        tone="light-2"
      >
        <ExamDatesDemo />
      </SgSection>
    </>
  )
}
