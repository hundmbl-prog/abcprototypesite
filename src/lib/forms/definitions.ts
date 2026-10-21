/**
 * Form definitions (Kontakt, Beschwerde, Bildung und Teilhabe, Mitgliedschaft, Bewerbung).
 * One description per form – the browser and the server build the same zod schema from it.
 */
export type FieldType =
  'text' | 'email' | 'tel' | 'date' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file'

export type FormField = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  hint?: string
  placeholder?: string
  /** select and radio: the choices */
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
  /* Beschwerdebogen – questions and choices as on abc-mainz.de/beschwerdeformular (anonymous, no consent box) */
  beschwerde: {
    id: 'beschwerde',
    submitLabel: 'Beschwerde absenden',
    fields: [
      {
        name: 'personType',
        label: '1. Ich bin …',
        type: 'radio',
        required: true,
        wide: true,
        options: [
          'ein Schüler in der Nachhilfe',
          'ein Schüler in dem Jugendprojekt',
          'ein Teilnehmer in einem Integrationskurs/ADD-Kurs/Berufssprachkurs',
          'ein Mitarbeiter',
          'ein Angehöriger/Besucher',
        ],
      },
      {
        name: 'complaintAbout',
        label: '2. Ich habe eine Beschwerde über …',
        type: 'radio',
        required: true,
        wide: true,
        options: [
          'eine Lehrkraft in der Nachhilfe',
          'eine Lehrkraft in dem Jugendprojekt',
          'eine Lehrkraft in einem Integrationskurs',
          'eine Lehrkraft in einem ADD-Kurs',
          'eine Lehrkraft in einem Berufssprachkurs',
          'eine Person in der Verwaltung',
          'die Reinigungskraft',
          'einen Schüler in der Nachhilfe',
          'einen Schüler in dem Jugendprojekt (Schüler-Café/Wir sind Vielfalt/...)',
          'einen Teilnehmer in einem Integrationskurs',
          'einen Teilnehmer in einem ADD-Kurs',
          'einen Teilnehmer in einem Berufssprachkurs',
          'den Zustand in einem Raum',
          'etwas anderes',
        ],
      },
      {
        name: 'personName',
        label: '3. Der Name der Person ist:',
        type: 'text',
        placeholder: 'Name der betroffenen Person',
      },
      {
        name: 'room',
        label: '4. Der Raum / Kursnummer:',
        type: 'text',
        placeholder: 'Raum oder Kursnummer',
      },
      {
        name: 'subject',
        label: 'Betreff',
        type: 'text',
        required: true,
        wide: true,
        placeholder: 'Betreff Ihrer Beschwerde',
      },
      {
        name: 'message',
        label: '5. Meine Beschwerde ist folgende:',
        type: 'textarea',
        required: true,
        wide: true,
        placeholder: 'Bitte schildern Sie Ihre Beschwerde möglichst genau.',
      },
      {
        name: 'solution',
        label: 'Lösungsvorschlag / zusätzliche Hinweise:',
        type: 'textarea',
        wide: true,
        placeholder: 'Hier können Sie einen Lösungsvorschlag oder weitere Hinweise eingeben.',
      },
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
