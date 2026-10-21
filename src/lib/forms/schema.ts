import { z } from 'zod'
import type { FormDefinition, FormField } from './definitions'

const phonePattern = /^[+\d][\d\s/()-]{5,}$/

function isFile(value: unknown): value is File {
  return typeof File !== 'undefined' && value instanceof File && value.size > 0
}

/** Browser: a FileList; server: a File (or an empty File when nothing was chosen). */
function toFile(value: unknown) {
  if (typeof FileList !== 'undefined' && value instanceof FileList) return value[0]
  return isFile(value) ? value : undefined
}

function fieldSchema(field: FormField): z.ZodType {
  const required = field.required ?? false
  switch (field.type) {
    case 'checkbox':
      return required
        ? z.boolean().refine((v) => v, { error: 'Bitte stimmen Sie der Datenverarbeitung zu.' })
        : z.boolean()
    case 'file':
      return z.preprocess(
        toFile,
        z
          .custom<File | undefined>((v) => v === undefined || isFile(v))
          .refine((v) => !required || v !== undefined, { error: 'Bitte fügen Sie eine Datei an.' })
          .refine((v) => !v || !field.accept || field.accept.includes(v.type), {
            error: 'Bitte laden Sie eine PDF-Datei hoch.',
          })
          .refine((v) => !v || !field.maxMb || v.size <= field.maxMb * 1024 * 1024, {
            error: `Die Datei darf höchstens ${field.maxMb} MB groß sein.`,
          }),
      )
    case 'email': {
      const email = z.email({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' }).max(200)
      return required ? email : z.union([z.literal(''), email])
    }
    case 'tel': {
      const tel = z
        .string()
        .trim()
        .regex(phonePattern, { error: 'Bitte geben Sie eine gültige Telefonnummer an.' })
      return required ? tel : z.union([z.literal(''), tel])
    }
    case 'select':
    case 'radio':
      return required
        ? z
            .string()
            .refine((v) => !!field.options?.includes(v), { error: 'Bitte wählen Sie eine Option.' })
        : z.string().refine((v) => v === '' || !!field.options?.includes(v), {
            error: 'Bitte wählen Sie eine Option.',
          })
    case 'date':
      return z
        .string()
        .refine(
          (v) =>
            required ? /^\d{4}-\d{2}-\d{2}$/.test(v) : v === '' || /^\d{4}-\d{2}-\d{2}$/.test(v),
          {
            error: 'Bitte geben Sie ein gültiges Datum an.',
          },
        )
    case 'textarea':
    case 'text':
    default: {
      const max = field.type === 'textarea' ? 3000 : 200
      const text = z
        .string()
        .trim()
        .max(max, { error: `Bitte höchstens ${max.toLocaleString('de-DE')} Zeichen.` })
      return required ? text.min(1, { error: `Bitte füllen Sie „${field.label}“ aus.` }) : text
    }
  }
}

/** The zod schema of a form, plus the honeypot field "website" that must stay empty. */
export function buildSchema(definition: FormDefinition) {
  const shape: Record<string, z.ZodType> = { website: z.string().max(0) }
  for (const field of definition.fields) shape[field.name] = fieldSchema(field)
  return z.object(shape)
}

export type FormValues = Record<string, unknown>

export type FormResult =
  | { status: 'invalid'; fieldErrors: Record<string, string> }
  | { status: 'rate-limited' }
  /** Validated; e-mail delivery and CMS storage are connected in Step 6. */
  | { status: 'not-connected' }

export function errorsFrom(error: z.ZodError) {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key === 'string' && !out[key]) out[key] = issue.message
  }
  return out
}
