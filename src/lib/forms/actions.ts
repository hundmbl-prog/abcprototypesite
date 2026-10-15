'use server'

import { headers } from 'next/headers'
import { rateLimit } from './rate-limit'
import { FORM_IDS, formDefinitions, type FormId } from './definitions'
import { buildSchema, errorsFrom, type FormResult } from './schema'
import {
  fieldErrorsFrom,
  telcRegistrationSchema,
  type TelcRegistrationResult,
} from './telc-registration'

/**
 * Server side of the telc registration. Validates with the same schema as the browser,
 * checks honeypot and rate limit. Sending the e-mail and saving the entry in the CMS follow in Step 6;
 * until then the visitor is told honestly to register by phone or e-mail.
 */
export async function submitTelcRegistration(input: unknown): Promise<TelcRegistrationResult> {
  const headerList = await headers()
  const ip = headerList.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!rateLimit(`telc:${ip}`)) return { status: 'rate-limited' }

  const parsed = telcRegistrationSchema.safeParse(input)
  if (!parsed.success) {
    // A filled honeypot is treated like any other submission, so bots learn nothing.
    if (parsed.error.issues.some((issue) => issue.path[0] === 'website')) {
      return { status: 'not-connected' }
    }
    return { status: 'invalid', fieldErrors: fieldErrorsFrom(parsed.error) }
  }
  return { status: 'not-connected' }
}

/**
 * Server side of the general forms (Kontakt, Beschwerde, Bildung und Teilhabe, Mitgliedschaft,
 * Bewerbung). Same rules as the browser (schema built from the same definition), honeypot and rate
 * limit. E-mail and CMS follow in Step 6 – until then the visitor is told that nothing was sent.
 */
export async function submitForm(formId: FormId, data: FormData): Promise<FormResult> {
  if (!FORM_IDS.includes(formId)) return { status: 'invalid', fieldErrors: {} }
  const headerList = await headers()
  const ip = headerList.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!rateLimit(`${formId}:${ip}`)) return { status: 'rate-limited' }

  const definition = formDefinitions[formId]
  const values: Record<string, unknown> = { website: String(data.get('website') ?? '') }
  for (const field of definition.fields) {
    const raw = data.get(field.name)
    values[field.name] =
      field.type === 'checkbox'
        ? raw === 'true'
        : field.type === 'file'
          ? (raw ?? undefined)
          : String(raw ?? '')
  }
  const parsed = buildSchema(definition).safeParse(values)
  if (!parsed.success) {
    if (parsed.error.issues.some((issue) => issue.path[0] === 'website'))
      return { status: 'not-connected' }
    return { status: 'invalid', fieldErrors: errorsFrom(parsed.error) }
  }
  return { status: 'not-connected' }
}
