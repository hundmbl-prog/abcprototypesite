'use client'

import Link from 'next/link'
import { useEffect, useState, useTransition } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import {
  Checkbox,
  Field,
  Input,
  Radio,
  Select,
  Textarea,
  describedBy,
} from '@/components/forms/Field'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { submitTelcRegistration } from '@/lib/forms/actions'
import {
  fieldErrorsFrom,
  telcRegistrationSchema,
  type TelcRegistration,
  type TelcRegistrationResult,
} from '@/lib/forms/telc-registration'
import type { ExamDate, TelcExam } from '@/content/types'
import { SELECT_EVENT, type SelectDetail } from './ExamDates'

/** react-hook-form resolver built on the shared zod schema (no extra package needed). */
const resolver: Resolver<TelcRegistration> = async (values) => {
  const parsed = telcRegistrationSchema.safeParse(values)
  if (parsed.success) return { values: parsed.data, errors: {} }
  const fieldErrors = fieldErrorsFrom(parsed.error)
  return {
    values: {},
    errors: Object.fromEntries(
      Object.entries(fieldErrors).map(([name, message]) => [name, { type: 'validation', message }]),
    ),
  }
}

const dateFormat = new Intl.DateTimeFormat('de-DE', {
  dateStyle: 'medium',
  timeZone: 'Europe/Berlin',
})

export function TelcRegistrationForm({
  exams,
  dates,
  phone,
  email,
}: {
  exams: TelcExam[]
  dates: ExamDate[]
  phone: string
  email: string
}) {
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<TelcRegistrationResult | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<TelcRegistration>({
    resolver,
    defaultValues: {
      examId: '',
      dateId: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      birthPlace: '',
      email: '',
      phone: '',
      retake: 'keine',
      message: '',
      privacy: false,
      website: '',
    },
  })

  // A click on "Anmelden" in the dates table preselects exam and date here
  useEffect(() => {
    const onSelect = (event: Event) => {
      const { examId, dateId } = (event as CustomEvent<SelectDetail>).detail
      setValue('examId', examId, { shouldValidate: true })
      setValue('dateId', dateId)
    }
    window.addEventListener(SELECT_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_EVENT, onSelect)
  }, [setValue])

  const examId = watch('examId')
  const exam = exams.find((e) => e.id === examId)
  const examDates = dates.filter((d) => d.examId === examId && d.seatsFree > 0)

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const response = await submitTelcRegistration(values)
      setResult(response)
      if (response.status === 'invalid') {
        for (const [name, message] of Object.entries(response.fieldErrors)) {
          setError(name as keyof TelcRegistration, { type: 'server', message })
        }
      }
    })
  })

  const err = (name: keyof TelcRegistration) => errors[name]?.message

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-6"
      aria-describedby="anmeldung-hinweis"
    >
      <p
        id="anmeldung-hinweis"
        className="flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-small text-navy ring-1 ring-blue-100"
      >
        <Icon name="info" className="mt-0.5 size-4 text-blue-600" />
        Die Online-Übermittlung wird gerade eingerichtet. Sie können das Formular schon ausfüllen
        und prüfen – für eine verbindliche Anmeldung rufen Sie uns bitte an oder schreiben Sie uns
        eine E-Mail.
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field id="examId" label="Prüfung" required error={err('examId')}>
          <Select
            id="examId"
            invalid={!!err('examId')}
            aria-describedby={describedBy('examId', { error: !!err('examId') })}
            {...register('examId')}
          >
            <option value="">Bitte wählen</option>
            {exams.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          id="dateId"
          label="Wunschtermin"
          hint={examDates.length ? undefined : 'Wir melden uns mit dem nächsten freien Termin.'}
        >
          <Select
            id="dateId"
            aria-describedby={describedBy('dateId', { hint: !examDates.length })}
            {...register('dateId')}
          >
            <option value="">Nächster freier Termin</option>
            {examDates.map((d) => (
              <option key={d.id} value={d.id}>
                {dateFormat.format(new Date(`${d.date}T12:00:00Z`))} · {d.location}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="firstName" label="Vorname (wie im Ausweis)" required error={err('firstName')}>
          <Input
            id="firstName"
            autoComplete="given-name"
            invalid={!!err('firstName')}
            aria-describedby={describedBy('firstName', { error: !!err('firstName') })}
            {...register('firstName')}
          />
        </Field>
        <Field id="lastName" label="Nachname (wie im Ausweis)" required error={err('lastName')}>
          <Input
            id="lastName"
            autoComplete="family-name"
            invalid={!!err('lastName')}
            aria-describedby={describedBy('lastName', { error: !!err('lastName') })}
            {...register('lastName')}
          />
        </Field>
        <Field id="birthDate" label="Geburtsdatum" required error={err('birthDate')}>
          <Input
            id="birthDate"
            type="date"
            autoComplete="bday"
            invalid={!!err('birthDate')}
            aria-describedby={describedBy('birthDate', { error: !!err('birthDate') })}
            {...register('birthDate')}
          />
        </Field>
        <Field id="birthPlace" label="Geburtsort" required error={err('birthPlace')}>
          <Input
            id="birthPlace"
            invalid={!!err('birthPlace')}
            aria-describedby={describedBy('birthPlace', { error: !!err('birthPlace') })}
            {...register('birthPlace')}
          />
        </Field>
        <Field id="email" label="E-Mail" required error={err('email')}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            invalid={!!err('email')}
            aria-describedby={describedBy('email', { error: !!err('email') })}
            {...register('email')}
          />
        </Field>
        <Field id="phone" label="Telefon" required error={err('phone')}>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            invalid={!!err('phone')}
            aria-describedby={describedBy('phone', { error: !!err('phone') })}
            {...register('phone')}
          />
        </Field>
      </div>

      {exam?.partialRetake ? (
        <fieldset className="flex flex-col gap-3 rounded-xl border border-line p-5">
          <legend className="px-1 text-small font-semibold text-ink">
            Teilprüfung wiederholen?
          </legend>
          <p className="text-small text-ink-muted">
            Nur möglich, wenn Sie innerhalb der letzten 12 Monate einen Prüfungsteil bestanden
            haben.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Radio
              id="retake-keine"
              value="keine"
              label="Nein, ganze Prüfung"
              {...register('retake')}
            />
            <Radio
              id="retake-schriftlich"
              value="schriftlich"
              label="Nur schriftlicher Teil"
              {...register('retake')}
            />
            <Radio
              id="retake-muendlich"
              value="muendlich"
              label="Nur mündlicher Teil"
              {...register('retake')}
            />
          </div>
        </fieldset>
      ) : null}

      <Field id="message" label="Anmerkungen (optional)" error={err('message')}>
        <Textarea
          id="message"
          rows={4}
          invalid={!!err('message')}
          aria-describedby={describedBy('message', { error: !!err('message') })}
          {...register('message')}
        />
      </Field>

      {/* Honeypot – hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="flex flex-col gap-2">
        <Checkbox
          id="privacy"
          invalid={!!err('privacy')}
          aria-describedby={err('privacy') ? 'privacy-error' : undefined}
          label={
            <>
              Ich stimme zu, dass meine Angaben zur Bearbeitung der Prüfungsanmeldung verarbeitet
              werden. Details in der{' '}
              <Link
                href="/datenschutz"
                className="font-semibold text-blue underline underline-offset-4"
              >
                Datenschutzerklärung
              </Link>
              . <span className="text-red-strong">*</span>
            </>
          }
          {...register('privacy')}
        />
        {err('privacy') ? (
          <p
            id="privacy-error"
            className="flex items-start gap-1.5 text-small font-medium text-red-strong"
          >
            <Icon name="alert" className="mt-0.5 size-4" />
            {err('privacy')}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          variant="cta"
          size="lg"
          loading={pending}
          loadingLabel="Wird geprüft …"
        >
          Angaben prüfen und absenden
        </Button>
        <p className="text-small text-ink-muted">
          <span aria-hidden className="text-red-strong">
            *
          </span>{' '}
          Pflichtfeld
        </p>
      </div>

      <div aria-live="polite" role="status">
        {result?.status === 'not-connected' ? (
          <div className="flex flex-col gap-3 rounded-xl bg-blue-900 p-5 text-on-dark md:p-6">
            <p className="inline-flex items-center gap-2 font-semibold">
              <Icon name="check" className="size-5 text-red-300" strokeWidth={2.5} />
              Ihre Angaben sind vollständig.
            </p>
            <p className="text-on-dark-muted">
              Die Online-Übermittlung ist noch nicht freigeschaltet – Ihre Daten wurden nicht
              gesendet. Bitte melden Sie sich telefonisch unter {phone} oder per E-Mail an {email}{' '}
              an.
            </p>
          </div>
        ) : result?.status === 'rate-limited' ? (
          <p className="rounded-xl bg-red-50 p-5 font-semibold text-red-700 ring-1 ring-red-200">
            Zu viele Versuche in kurzer Zeit. Bitte versuchen Sie es in ein paar Minuten erneut.
          </p>
        ) : result?.status === 'invalid' ? (
          <p className="rounded-xl bg-red-50 p-5 font-semibold text-red-700 ring-1 ring-red-200">
            Bitte prüfen Sie die markierten Felder.
          </p>
        ) : null}
      </div>
    </form>
  )
}
