import { z } from 'zod'

/**
 * telc registration – one schema for the browser (react-hook-form) and the server action,
 * so both always validate exactly the same rules.
 */
export const RETAKE_OPTIONS = ['keine', 'schriftlich', 'muendlich'] as const

const isoDate = /^\d{4}-\d{2}-\d{2}$/

export const telcRegistrationSchema = z.object({
  examId: z.string().min(1, { error: 'Bitte wählen Sie eine Prüfung.' }),
  dateId: z.string(),
  firstName: z.string().trim().min(1, { error: 'Bitte geben Sie Ihren Vornamen an.' }).max(80),
  lastName: z.string().trim().min(1, { error: 'Bitte geben Sie Ihren Nachnamen an.' }).max(80),
  birthDate: z
    .string()
    .regex(isoDate, { error: 'Bitte geben Sie Ihr Geburtsdatum an.' })
    .refine(
      (value) => {
        const date = new Date(`${value}T00:00:00Z`)
        const now = new Date()
        const age = (now.getTime() - date.getTime()) / (365.25 * 24 * 3600 * 1000)
        return !Number.isNaN(date.getTime()) && age >= 12 && age <= 110
      },
      { error: 'Bitte prüfen Sie das Geburtsdatum.' },
    ),
  birthPlace: z.string().trim().min(1, { error: 'Bitte geben Sie Ihren Geburtsort an.' }).max(120),
  email: z.email({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' }).max(200),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s/()-]{5,}$/, { error: 'Bitte geben Sie eine gültige Telefonnummer an.' }),
  retake: z.enum(RETAKE_OPTIONS),
  message: z.string().trim().max(1000, { error: 'Bitte höchstens 1.000 Zeichen.' }),
  privacy: z.boolean().refine((v) => v, { error: 'Bitte stimmen Sie der Datenverarbeitung zu.' }),
  /** Honeypot: must stay empty (hidden from people, bots fill it in). */
  website: z.string().max(0),
})

export type TelcRegistration = z.infer<typeof telcRegistrationSchema>

export type TelcRegistrationResult =
  | { status: 'invalid'; fieldErrors: Partial<Record<keyof TelcRegistration, string>> }
  | { status: 'rate-limited' }
  /** Validated, but e-mail delivery and CMS storage are connected in Step 6. */
  | { status: 'not-connected' }

/** Turns zod issues into one message per field. */
export function fieldErrorsFrom(error: z.ZodError<TelcRegistration>) {
  const out: Partial<Record<keyof TelcRegistration, string>> = {}
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof TelcRegistration | undefined
    if (key && !out[key]) out[key] = issue.message
  }
  return out
}
