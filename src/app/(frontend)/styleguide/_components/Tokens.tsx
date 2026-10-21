import { cn } from '@/lib/cn'
import { contrastRatio, wcagLevel } from '@/lib/contrast'
import { SgLabel, SgSection, SgSub } from './SgSection'

type ColorTokens = Record<string, string>

const colorGroups: Array<{ title: string; note: string; tokens: Array<[string, string]> }> = [
  {
    title: 'Helle Flächen – 60–70 %',
    note: 'Grundfläche jeder Seite. Wechsel zwischen den drei Stufen gliedert Abschnitte.',
    tokens: [
      ['surface', 'Seitenhintergrund, Karten'],
      ['surface-2', 'Abschnittswechsel, Felder deaktiviert'],
      ['surface-3', 'Hervorgehobene Flächen'],
      ['line', 'Kartenrahmen, Trennlinien'],
      ['line-strong', 'Deaktivierte Rahmen'],
      ['control', 'Rahmen von Formularfeldern'],
    ],
  },
  {
    title: 'Blau – 20–30 %',
    note: 'Navy nur für Überschriften und Text, ABC Blau für dunkle Abschnitte, Links und Primärbuttons.',
    tokens: [
      ['navy', 'Überschriften und Zahlen (nur Text)'],
      ['navy-2', 'Hover auf Navy'],
      ['blue', 'Primärbutton, Links, Fokus'],
      ['blue-strong', 'Hover auf Blau'],
      ['blue-soft', 'Weiche Abschnitte, Tags'],
    ],
  },
  {
    title: 'Rot – 5–10 %',
    note: 'Nur für Dringlichkeit und den einen Haupt-CTA pro Abschnitt.',
    tokens: [
      ['red', 'Haupt-CTA, „Ausgebucht“'],
      ['red-strong', 'Roter Text, Hover auf Rot'],
      ['red-soft', 'Hinweisflächen'],
    ],
  },
  {
    title: 'Text & Status',
    note: 'Textfarben für helle und dunkle Flächen sowie Erfolgsmeldungen.',
    tokens: [
      ['ink', 'Fließtext auf hell'],
      ['ink-muted', 'Nebentext auf hell'],
      ['on-dark', 'Text auf Blau und Rot'],
      ['on-dark-muted', 'Nebentext auf Blau'],
      ['success', 'Erfolg, „Plätze frei“'],
      ['success-soft', 'Erfolgsflächen'],
    ],
  },
]

type Pairing = { fg: string; bg: string; use: string; kind?: 'text' | 'ui'; allowed?: boolean }

const pairings: Pairing[] = [
  { fg: 'ink', bg: 'surface', use: 'Fließtext auf Weiß' },
  { fg: 'navy', bg: 'surface-2', use: 'Überschriften auf hellen Flächen' },
  { fg: 'ink-muted', bg: 'surface-3', use: 'Nebentext auf hellen Flächen' },
  { fg: 'blue', bg: 'surface', use: 'Links und Text-Buttons' },
  { fg: 'on-dark', bg: 'blue', use: 'Primärbutton' },
  { fg: 'on-dark', bg: 'red', use: 'Haupt-CTA (einmal pro Abschnitt)' },
  { fg: 'on-dark', bg: 'blue', use: 'Text auf Blau' },
  { fg: 'on-dark-muted', bg: 'blue', use: 'Nebentext auf Blau' },
  { fg: 'navy', bg: 'surface', use: 'Weißer Button auf Blau' },
  { fg: 'navy', bg: 'blue-soft', use: 'Text auf Hellblau' },
  { fg: 'red-strong', bg: 'surface', use: 'Weißer Button auf Rot, Pflichtfeld-Stern' },
  { fg: 'red-strong', bg: 'red-soft', use: 'Badge „Wenige Plätze“' },
  { fg: 'success', bg: 'success-soft', use: 'Badge „Plätze frei“' },
  { fg: 'control', bg: 'surface', use: 'Rahmen von Formularfeldern (UI, mind. 3:1)', kind: 'ui' },
  {
    fg: 'red',
    bg: 'red-soft',
    use: 'Roter Text auf Rosa – stattdessen red-strong',
    allowed: false,
  },
  {
    fg: 'red',
    bg: 'blue',
    use: 'Roter Text/Icon auf Blau – nur als Button mit weißem Text',
    allowed: false,
  },
  {
    fg: 'red',
    bg: 'surface-3',
    use: 'Roter Fließtext auf surface-3 – stattdessen red-strong',
    allowed: false,
  },
]

const typeScale: Array<[string, string, string]> = [
  ['display', 'text-display font-display font-semibold', 'Bildung, die verbindet'],
  ['h1', 'text-h1 font-display font-semibold', 'Sprachkurse in Mainz'],
  ['h2', 'text-h2 font-display font-semibold', 'Unsere Angebote'],
  ['h3', 'text-h3 font-display font-semibold', 'Allgemeiner Integrationskurs'],
  ['h4', 'text-h4 font-display font-semibold', 'So melden Sie sich an'],
  ['lead', 'text-lead', 'Wir begleiten Menschen auf ihrem Weg in Sprache, Ausbildung und Beruf.'],
  [
    'body',
    'text-body',
    'Im Sprachkurs werden wichtige Themen aus dem Alltag behandelt – Arbeit, Gesundheit, Freizeit und Medien.',
  ],
  ['small', 'text-small', 'Anmeldeschluss: zwei Wochen vor Prüfungstermin'],
  ['caption', 'text-caption font-semibold uppercase tracking-wide', 'Prüfung'],
]

const spacingScale = [1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 32]

const radii: Array<[string, string]> = [
  ['none', 'rounded-none'],
  ['sm', 'rounded-sm'],
  ['md', 'rounded-md'],
  ['lg', 'rounded-lg'],
  ['xl', 'rounded-xl'],
  ['2xl', 'rounded-2xl'],
  ['pill', 'rounded-pill'],
]

const shadows: Array<[string, string]> = [
  ['xs', 'shadow-xs'],
  ['sm', 'shadow-sm'],
  ['md', 'shadow-md'],
  ['lg', 'shadow-lg'],
  ['xl', 'shadow-xl'],
]

const durations: Array<[string, string, string]> = [
  ['--dur-fast', '150 ms', 'Farbwechsel, kleine Elemente'],
  ['--dur-base', '250 ms', 'Buttons, Chips'],
  ['--dur-slow', '400 ms', 'Karten anheben, Pfeile'],
  ['--dur-slower', '700 ms', 'Bildzoom'],
  ['--dur-reveal', '1200 ms', 'Einblenden beim Scrollen'],
  ['--dur-kenburns', '20 s', 'Langsamer Zoom im Hero'],
]

export function ColorSection({ colors }: { colors: ColorTokens }) {
  return (
    <SgSection
      id="farben"
      title="Farben"
      intro="Alle Farben sind Tokens in src/styles/tokens.css. Komponenten verwenden nur diese Namen – nie feste Farbwerte."
    >
      <div
        className="flex h-6 overflow-hidden rounded-pill"
        role="img"
        aria-label="Farbverhältnis: etwa 65 Prozent helle Flächen, 27 Prozent Blau, 8 Prozent Rot"
      >
        <span className="w-[65%] bg-surface-3" />
        <span className="w-[27%] bg-blue" />
        <span className="w-[8%] bg-red" />
      </div>
      {colorGroups.map((group) => (
        <SgSub key={group.title} title={group.title} note={group.note}>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {group.tokens.map(([name, use]) => (
              <li key={name} className="flex flex-col gap-2">
                <span
                  className="aspect-4/3 rounded-lg border border-line"
                  style={{ background: `var(--color-${name})` }}
                />
                <span className="text-small font-semibold text-ink">{name}</span>
                <span className="font-mono text-caption text-ink-muted uppercase">
                  {colors[name] ?? '–'}
                </span>
                <span className="text-caption text-ink-muted">{use}</span>
              </li>
            ))}
          </ul>
        </SgSub>
      ))}
    </SgSection>
  )
}

export function PairingSection({ colors }: { colors: ColorTokens }) {
  return (
    <SgSection
      id="kontrast"
      tone="light-2"
      title="Kontrast-Paarungen"
      intro="Die Werte werden beim Build direkt aus den Tokens berechnet. Normaler Text braucht mindestens 4,5 : 1, Bedienelemente und große Schrift 3 : 1 (WCAG 2.1 AA)."
    >
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pairings.map((p) => {
          const fg = colors[p.fg]
          const bg = colors[p.bg]
          const ratio = fg && bg ? contrastRatio(fg, bg) : 0
          const min = p.kind === 'ui' ? 3 : 4.5
          const passes = ratio >= min
          const allowed = p.allowed !== false
          return (
            <li
              key={`${p.fg}-${p.bg}-${p.use}`}
              className={cn(
                'flex overflow-hidden rounded-lg border bg-surface',
                allowed ? 'border-line' : 'border-red-strong',
              )}
            >
              <span
                className="grid w-28 shrink-0 place-items-center font-display text-h3 font-semibold"
                style={{ background: `var(--color-${p.bg})`, color: `var(--color-${p.fg})` }}
                aria-hidden
              >
                {p.kind === 'ui' ? (
                  <span
                    className="h-10 w-16 rounded-md border-2"
                    style={{ borderColor: `var(--color-${p.fg})` }}
                  />
                ) : allowed ? (
                  'Aa'
                ) : (
                  /* Forbidden pairs are drawn as a graphic so the page itself stays AA-compliant */
                  <svg
                    viewBox="0 0 48 32"
                    className="h-8 w-12"
                    fill="currentColor"
                    focusable="false"
                  >
                    <text
                      x="24"
                      y="25"
                      textAnchor="middle"
                      fontSize="26"
                      fontWeight="600"
                      fontFamily="inherit"
                    >
                      Aa
                    </text>
                  </svg>
                )}
              </span>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <p className="text-small font-semibold text-ink">
                  {p.fg} auf {p.bg}
                </p>
                <p className="text-small text-ink-muted">{p.use}</p>
                <p className="mt-auto flex items-center gap-2 pt-2 text-small">
                  <span className="font-mono font-semibold text-ink">
                    {ratio.toFixed(2).replace('.', ',')} : 1
                  </span>
                  <span
                    className={cn(
                      'rounded-sm px-2 py-0.5 text-caption font-bold',
                      passes && allowed
                        ? 'bg-success-soft text-success'
                        : 'bg-red-soft text-red-strong',
                    )}
                  >
                    {!allowed
                      ? 'Nicht verwenden'
                      : p.kind === 'ui'
                        ? passes
                          ? 'UI ≥ 3 : 1'
                          : 'Zu schwach'
                        : wcagLevel(ratio)}
                  </span>
                </p>
              </div>
            </li>
          )
        })}
      </ul>
      <SgSub title="Regeln je Hintergrund">
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <li className="flex flex-col gap-2 rounded-lg border border-line tone-light p-5">
            <p className="font-semibold text-navy">Weiß / helle Flächen</p>
            <p className="text-small text-ink-muted">
              Navy- oder Slate-Text, blaue Primärbuttons, Rot nur für den einen Haupt-CTA.
            </p>
          </li>
          <li className="flex flex-col gap-2 rounded-lg tone-navy p-5">
            <p className="font-semibold">ABC Blau</p>
            <p className="text-small text-on-dark-muted">
              Weißer Text, weißer Button mit Navy-Text oder roter Button, Ghost-Buttons mit weißem
              Rahmen.
            </p>
          </li>
          <li className="flex flex-col gap-2 rounded-lg tone-soft p-5">
            <p className="font-semibold">Hellblau</p>
            <p className="text-small">Navy-Text und Navy-Buttons.</p>
          </li>
          <li className="flex flex-col gap-2 rounded-lg tone-red p-5">
            <p className="font-semibold">Rot (selten, nur kleine Banner)</p>
            <p className="text-small">Weißer Text, weißer Button mit rotem Text.</p>
          </li>
        </ul>
      </SgSub>
    </SgSection>
  )
}

export function TypeSection() {
  return (
    <SgSection
      id="typografie"
      title="Typografie"
      intro="Clash Display für Überschriften, Inter für Fließtext. Alle Größen wachsen fließend zwischen 375 px und 1920 px Bildschirmbreite."
    >
      <ul className="flex flex-col divide-y divide-line">
        {typeScale.map(([name, cls, sample]) => (
          <li
            key={name}
            className="grid gap-2 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,5fr)] md:items-baseline"
          >
            <span className="font-mono text-small text-ink-muted">text-{name}</span>
            <span className={cn(cls, 'text-navy')}>{sample}</span>
          </li>
        ))}
      </ul>
    </SgSection>
  )
}

export function SpacingSection() {
  return (
    <SgSection
      id="abstaende"
      tone="light-2"
      title="Abstände, Radien, Schatten & Bewegung"
      intro="Abstände folgen einem 4-px-Raster. Abschnitte nutzen fließende Abstände (section-sm, section, section-lg)."
    >
      <SgSub title="Abstandsskala" note="Klassenname × 4 px, z. B. p-4 = 16 px.">
        <ul className="flex flex-col gap-2">
          {spacingScale.map((n) => (
            <li key={n} className="flex items-center gap-4">
              <span className="w-24 font-mono text-small text-ink-muted">
                {n} · {n * 4} px
              </span>
              <span
                className="h-3 rounded-sm bg-blue"
                style={{ width: `calc(var(--spacing) * ${n})` }}
              />
            </li>
          ))}
        </ul>
      </SgSub>
      <SgSub title="Abschnittsabstände" note="Wachsen mit der Bildschirmbreite.">
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            ['section-sm', '48–72 px'],
            ['section', '72–128 px'],
            ['section-lg', '96–176 px'],
          ].map(([name, range]) => (
            <li key={name} className="flex flex-col gap-2">
              <span
                className="rounded-md bg-blue-soft"
                style={{ height: `var(--spacing-${name})` }}
              />
              <span className="font-mono text-small text-ink">{name}</span>
              <span className="text-caption text-ink-muted">{range}</span>
            </li>
          ))}
        </ul>
      </SgSub>
      <SgSub
        title="Radien"
        note="Bewusst gemischt: scharfe Editorial-Blöcke, runde Karten, Pillen für Tags."
      >
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {radii.map(([name, cls]) => (
            <li key={name} className="flex flex-col items-start gap-2">
              <span className={cn('size-20 border-2 border-blue bg-surface-3', cls)} />
              <span className="font-mono text-small text-ink-muted">{name}</span>
            </li>
          ))}
        </ul>
      </SgSub>
      <SgSub title="Schatten" note="Warm getönt statt grau.">
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-5">
          {shadows.map(([name, cls]) => (
            <li key={name} className="flex flex-col gap-3">
              <span className={cn('h-20 rounded-lg bg-surface', cls)} />
              <span className="font-mono text-small text-ink-muted">shadow-{name}</span>
            </li>
          ))}
        </ul>
      </SgSub>
      <SgSub
        title="Bewegung"
        note="Easing: ease-out-expo für fast alles, ease-in-out-soft für Schleifen. Bei „Bewegung reduzieren“ werden alle Animationen abgeschaltet."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {durations.map(([token, value, use]) => (
            <li
              key={token}
              className="flex flex-col gap-1 rounded-md border border-line bg-surface p-4"
            >
              <span className="font-mono text-small text-ink">{token}</span>
              <span className="text-small font-semibold text-navy">{value}</span>
              <span className="text-caption text-ink-muted">{use}</span>
            </li>
          ))}
        </ul>
      </SgSub>
      <SgLabel>Breakpoints: sm 640 · md 768 · lg 1024 · xl 1280 · 3xl 1920 px</SgLabel>
    </SgSection>
  )
}
