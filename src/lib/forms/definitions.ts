/**
 * Form definitions (Kontakt, Beschwerde, Bildung und Teilhabe, Mitgliedschaft, Bewerbung).
 * One description per form – the browser and the server build the same zod schema from it.
 */
export type FieldType =
  'text' | 'email' | 'tel' | 'date' | 'textarea' | 'select' | 'checkbox' | 'file'

export type FormField = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  hint?: string
  options?: string[]
  autoComplete?: string
  /** Take up the full row on wide screens. */
  wide?: boolean
  /** file: accepted MIME types and max size in MB */
  accept?: string[]
  maxMb?: number
}

export type FormDefinition = {
  id: FormId
  submitLabel: string
  fields: FormField[]
}

export const FORM_IDS = [
  'kontakt',
  'beschwerde',
  'bildung-und-teilhabe',
  'mitgliedschaft',
  'bewerbung',
] as const
export type FormId = (typeof FORM_IDS)[number]

const privacy: FormField = {
  name: 'privacy',
  label: 'Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden.',
  type: 'checkbox',
  required: true,
  wide: true,
}

export const formDefinitions: Record<FormId, FormDefinition> = {
  kontakt: {
    id: 'kontakt',
    submitLabel: 'Nachricht senden',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true, autoComplete: 'name' },
      { name: 'email', label: 'E-Mail', type: 'email', required: true, autoComplete: 'email' },
      { name: 'phone', label: 'Telefon', type: 'tel', autoComplete: 'tel' },
      {
        name: 'location',
        label: 'Standort',
        type: 'select',
        required: true,
        options: ['Mainz', 'Bad Kreuznach'],
      },
      {
        name: 'topic',
        label: 'Thema',
        type: 'select',
        required: true,
        options: [
          'Kurse',
          'Prüfungen',
          'Nachhilfe',
          'Weiterbildung',
          'Projekte',
          'Pädagogische Angebote',
          'Sonstiges',
        ],
        wide: true,
      },
      { name: 'message', label: 'Nachricht', type: 'textarea', required: true, wide: true },
      privacy,
    ],
  },
  beschwerde: {
    id: 'beschwerde',
    submitLabel: 'Beschwerde senden',
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        autoComplete: 'name',
        hint: 'Freiwillig – Sie können die Beschwerde auch anonym senden.',
      },
      {
        name: 'email',
        label: 'E-Mail',
        type: 'email',
        autoComplete: 'email',
        hint: 'Nur nötig, wenn Sie eine Antwort möchten.',
      },
      {
        name: 'area',
        label: 'Bereich',
        type: 'select',
        required: true,
        options: [
          'Kurs',
          'Prüfung',
          'Beratung',
          'Räume und Ausstattung',
          'Verwaltung',
          'Sonstiges',
        ],
      },
      { name: 'date', label: 'Datum (falls bekannt)', type: 'date' },
      { name: 'message', label: 'Ihre Beschwerde', type: 'textarea', required: true, wide: true },
      privacy,
    ],
  },
  'bildung-und-teilhabe': {
    id: 'bildung-und-teilhabe',
    submitLabel: 'Anfrage senden',
    fields: [
      {
        name: 'parentName',
        label: 'Name (Erziehungsberechtigte Person)',
        type: 'text',
        required: true,
        autoComplete: 'name',
      },
      { name: 'email', label: 'E-Mail', type: 'email', required: true, autoComplete: 'email' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: true, autoComplete: 'tel' },
      { name: 'childName', label: 'Name des Kindes', type: 'text', required: true },
      { name: 'school', label: 'Schulform und Klasse', type: 'text', required: true },
      {
        name: 'subjects',
        label: 'Fächer',
        type: 'text',
        required: true,
        hint: 'z. B. Mathematik, Deutsch',
      },
      {
        name: 'agency',
        label: 'Zuständige Stelle (falls bekannt)',
        type: 'text',
        hint: 'z. B. Jobcenter oder Sozialamt',
        wide: true,
      },
      { name: 'message', label: 'Anmerkungen', type: 'textarea', wide: true },
      privacy,
    ],
  },
  mitgliedschaft: {
    id: 'mitgliedschaft',
    submitLabel: 'Mitgliedschaft anfragen',
    fields: [
      {
        name: 'firstName',
        label: 'Vorname',
        type: 'text',
        required: true,
        autoComplete: 'given-name',
      },
      {
        name: 'lastName',
        label: 'Nachname',
        type: 'text',
        required: true,
        autoComplete: 'family-name',
      },
      { name: 'email', label: 'E-Mail', type: 'email', required: true, autoComplete: 'email' },
      { name: 'phone', label: 'Telefon', type: 'tel', autoComplete: 'tel' },
      {
        name: 'street',
        label: 'Straße und Hausnummer',
        type: 'text',
        required: true,
        autoComplete: 'street-address',
        wide: true,
      },
      {
        name: 'postalCode',
        label: 'PLZ',
        type: 'text',
        required: true,
        autoComplete: 'postal-code',
      },
      { name: 'city', label: 'Ort', type: 'text', required: true, autoComplete: 'address-level2' },
      {
        name: 'message',
        label: 'Warum möchten Sie Mitglied werden? (optional)',
        type: 'textarea',
        wide: true,
      },
      privacy,
    ],
  },
  bewerbung: {
    id: 'bewerbung',
    submitLabel: 'Bewerbung senden',
    fields: [
      {
        name: 'firstName',
        label: 'Vorname',
        type: 'text',
        required: true,
        autoComplete: 'given-name',
      },
      {
        name: 'lastName',
        label: 'Nachname',
        type: 'text',
        required: true,
        autoComplete: 'family-name',
      },
      { name: 'email', label: 'E-Mail', type: 'email', required: true, autoComplete: 'email' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: true, autoComplete: 'tel' },
      {
        name: 'position',
        label: 'Bereich',
        type: 'select',
        required: true,
        options: [
          'Nachhilfe-Lehrkraft',
          'Sozialpädagogik / Familienhilfe',
          'Deutsch-Lehrkraft (DaZ/DaF)',
          'Initiativbewerbung',
        ],
        wide: true,
      },
      { name: 'message', label: 'Kurzes Anschreiben', type: 'textarea', wide: true },
      {
        name: 'cv',
        label: 'Lebenslauf (PDF, höchstens 5 MB)',
        type: 'file',
        required: true,
        accept: ['application/pdf'],
        maxMb: 5,
        wide: true,
      },
      privacy,
    ],
  },
}
