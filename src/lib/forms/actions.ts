'use server'

import { headers } from 'next/headers'
import { rateLimit } from './rate-limit'
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
