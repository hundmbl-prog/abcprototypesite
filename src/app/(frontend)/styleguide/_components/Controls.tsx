import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Button, type ButtonVariant, type PreviewState } from '@/components/ui/Button'
import { Badge, type BadgeStatus } from '@/components/ui/Badge'
import { FilterChip } from '@/components/ui/FilterChip'
import { Tag } from '@/components/ui/Tag'
import { Magnetic } from '@/components/motion/Magnetic'
import {
  Checkbox,
  Field,
  FileInput,
  Input,
  Radio,
  Select,
  Textarea,
  describedBy,
} from '@/components/forms/Field'
import { FilterDemo } from './FilterDemo'
import { SgLabel, SgSection, SgSub } from './SgSection'

type StateColumn = { label: string; preview?: PreviewState; disabled?: boolean; loading?: boolean }

const states: StateColumn[] = [
  { label: 'Standard' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Fokus', preview: 'focus' },
  { label: 'Aktiv', preview: 'active' },
  { label: 'Deaktiviert', disabled: true },
  { label: 'Lädt', loading: true },
]

type Row = {
  variant: ButtonVariant
  name: string
  label: string
  icon?: 'arrow-right' | 'arrow-up-right'
}

const groups: Array<{ tone: string; title: string; rows: Row[] }> = [
  {
    tone: 'tone-light border border-line',
    title: 'Auf Weiß / hellen Flächen',
    rows: [
      { variant: 'primary', name: 'Solid – Primär', label: 'Mehr erfahren' },
      {
        variant: 'cta',
        name: 'Solid – Haupt-CTA (1× pro Abschnitt)',
        label: 'Jetzt anmelden',
        icon: 'arrow-right',
      },
      { variant: 'outline', name: 'Outline', label: 'Alle Kurse' },
      { variant: 'pill', name: 'Pille mit Pfeil', label: 'Kurs ansehen' },
      { variant: 'link', name: 'Text-Link', label: 'Zum Kursplan', icon: 'arrow-right' },
    ],
  },
  {
    tone: 'tone-soft',
    title: 'Auf Hellblau',
    rows: [{ variant: 'navy', name: 'Solid – Navy', label: 'Beratung anfragen' }],
  },
  {
    tone: 'tone-navy',
    title: 'Auf Navy',
    rows: [
      { variant: 'white', name: 'Solid – Weiß', label: 'Kontakt aufnehmen' },
      { variant: 'cta', name: 'Solid – Haupt-CTA', label: 'Jetzt anmelden', icon: 'arrow-right' },
      { variant: 'ghost', name: 'Ghost', label: 'Mehr erfahren' },
    ],
  },
  {
    tone: 'tone-red',
    title: 'Auf Rot (nur kleine Banner)',
    rows: [{ variant: 'white-red', name: 'Solid – Weiß mit Rot', label: 'Platz sichern' }],
  },
]

const badges: BadgeStatus[] = ['neu', 'plaetze-frei', 'wenige-plaetze', 'ausgebucht', 'kostenlos']

function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('flex flex-col gap-6 rounded-xl p-6 md:p-8', className)}>{children}</div>
  )
}

export function ButtonSection() {
  return (
    <SgSection
      id="buttons"
      title="Buttons"
      intro="Jede Variante hat Hover-, Fokus-, Aktiv-, Deaktiviert- und Ladezustand. Die Zustände hier sind fest dargestellt – mit Maus und Tabulator-Taste lassen sie sich auch live testen."
    >
      {groups.map((group) => (
        <Panel key={group.title} className={group.tone}>
          <h3 className="text-h4">{group.title}</h3>
          {group.rows.map((row) => (
            <div key={`${group.title}-${row.name}`} className="flex flex-col gap-3">
              <p className="text-small font-semibold">{row.name}</p>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-4">
                {states.map((state) => (
                  <li key={state.label} className="flex flex-col items-start gap-2">
                    <span className="text-caption tracking-wide uppercase">{state.label}</span>
                    <Button
                      variant={row.variant}
                      icon={row.icon}
                      preview={state.preview}
                      disabled={state.disabled}
                      loading={state.loading}
                      tabIndex={state.preview ? -1 : undefined}
                    >
                      {row.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Panel>
      ))}

      <div className="grid gap-6 lg:grid-cols-2">
        <SgSub title="Größen" note="Alle Größen sind mindestens 44 px hoch (Touch-Ziel).">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Klein</Button>
            <Button size="md">Mittel</Button>
            <Button size="lg">Groß</Button>
          </div>
        </SgSub>
        <SgSub
          title="Magnetischer CTA"
          note="Folgt dem Mauszeiger leicht (nur Desktop, nicht bei reduzierter Bewegung)."
        >
          <div>
            <Magnetic>
              <Button variant="cta" size="lg" icon="arrow-right">
                Beratungstermin vereinbaren
              </Button>
            </Magnetic>
          </div>
        </SgSub>
      </div>
    </SgSection>
  )
}

export function TagSection() {
  return (
    <SgSection
      id="tags"
      tone="light-2"
      title="Tags, Badges & Filter"
      intro="Kategorie-Tags sind Pillen, Status-Badges haben bewusst eckige Ecken – so sind beide sofort zu unterscheiden."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <SgSub title="Kategorie-Tags">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Tag>Kurs</Tag>
              <Tag>Prüfung</Tag>
              <Tag>Projekt</Tag>
            </div>
            <div className="flex flex-wrap gap-2 rounded-lg tone-navy p-4">
              <Tag tone="dark">Auf Navy</Tag>
              <Tag tone="image">Auf Foto</Tag>
            </div>
          </div>
        </SgSub>
        <SgSub title="Status-Badges">
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <Badge key={b} status={b} />
            ))}
          </div>
        </SgSub>
        <SgSub title="Filter-Chips – Zustände">
          <div className="flex flex-wrap gap-2">
            <FilterChip>Standard</FilterChip>
            <FilterChip preview="hover" tabIndex={-1}>
              Hover
            </FilterChip>
            <FilterChip preview="focus" tabIndex={-1}>
              Fokus
            </FilterChip>
            <FilterChip selected>Ausgewählt</FilterChip>
            <FilterChip disabled>Deaktiviert</FilterChip>
          </div>
        </SgSub>
      </div>
      <SgSub
        title="Filter-Chips – zum Ausprobieren"
        note="Mehrfachauswahl; der Zustand wird Screenreadern über aria-pressed gemeldet."
      >
        <FilterDemo />
      </SgSub>
    </SgSection>
  )
}

export function FormSection() {
  return (
    <SgSection
      id="formulare"
      title="Formularfelder"
      intro="Jedes Feld hat ein sichtbares Label, optional einen Hinweis und eine Fehlermeldung, die mit dem Feld verknüpft ist."
    >
      <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        <div className="flex flex-col gap-3">
          <SgLabel>Standard</SgLabel>
          <Field id="sg-name" label="Vorname" required>
            <Input id="sg-name" name="vorname" autoComplete="given-name" />
          </Field>
        </div>
        <div className="flex flex-col gap-3">
          <SgLabel>Hover</SgLabel>
          <Field id="sg-hover" label="Nachname">
            <Input id="sg-hover" preview="hover" defaultValue="Yılmaz" tabIndex={-1} />
          </Field>
        </div>
        <div className="flex flex-col gap-3">
          <SgLabel>Fokus</SgLabel>
          <Field
            id="sg-focus"
            label="E-Mail-Adresse"
            hint="Wir antworten innerhalb von zwei Werktagen."
          >
            <Input
              id="sg-focus"
              type="email"
              preview="focus"
              aria-describedby={describedBy('sg-focus', { hint: true })}
              tabIndex={-1}
            />
          </Field>
        </div>
        <div className="flex flex-col gap-3">
          <SgLabel>Fehler</SgLabel>
          <Field
            id="sg-error"
            label="Telefon"
            required
            error="Bitte geben Sie eine gültige Telefonnummer ein."
          >
            <Input
              id="sg-error"
              type="tel"
              invalid
              defaultValue="0613"
              aria-describedby={describedBy('sg-error', { error: true })}
            />
          </Field>
        </div>
        <div className="flex flex-col gap-3">
          <SgLabel>Deaktiviert</SgLabel>
          <Field id="sg-disabled" label="Kursnummer">
            <Input id="sg-disabled" disabled defaultValue="IK-2026-11" />
          </Field>
        </div>
        <div className="flex flex-col gap-3">
          <SgLabel>Auswahl</SgLabel>
          <Field id="sg-select" label="Standort">
            <Select id="sg-select" defaultValue="mainz">
              <option value="mainz">Mainz</option>
              <option value="bad-kreuznach">Bad Kreuznach</option>
              <option value="online">Online</option>
            </Select>
          </Field>
        </div>
        <div className="flex flex-col gap-3 md:col-span-2">
          <SgLabel>Textfeld</SgLabel>
          <Field id="sg-message" label="Ihre Nachricht" hint="Maximal 1.000 Zeichen.">
            <Textarea
              id="sg-message"
              aria-describedby={describedBy('sg-message', { hint: true })}
            />
          </Field>
        </div>
        <div className="flex flex-col gap-3">
          <SgLabel>Datei-Upload</SgLabel>
          <Field id="sg-file" label="Lebenslauf (PDF, max. 5 MB)">
            <FileInput id="sg-file" accept="application/pdf" />
          </Field>
        </div>
        <fieldset className="flex flex-col gap-4">
          <legend className="mb-4 text-small font-semibold text-ink">Kursformat</legend>
          <Radio id="sg-r1" name="format" value="praesenz" label="In Präsenz" defaultChecked />
          <Radio
            id="sg-r2"
            name="format"
            value="online"
            label="Online"
            description="Unterricht über Zoom"
          />
          <Radio id="sg-r3" name="format" value="hybrid" label="Hybrid" disabled />
        </fieldset>
        <div className="flex flex-col gap-4">
          <SgLabel>Checkboxen</SgLabel>
          <Checkbox id="sg-c1" name="newsletter" label="Newsletter abonnieren" />
          <Checkbox
            id="sg-c2"
            name="datenschutz"
            label="Ich stimme der Datenschutzerklärung zu."
            defaultChecked
          />
          <Checkbox id="sg-c3" name="fehler" label="Pflicht-Zustimmung (Fehlerzustand)" invalid />
        </div>
      </div>
    </SgSection>
  )
}
