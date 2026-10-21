'use client'

import Link from 'next/link'
import { useMemo, useState, useTransition } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { submitForm } from '@/lib/forms/actions'
import { formDefinitions, type FormField, type FormId } from '@/lib/forms/definitions'
import { buildSchema, errorsFrom, type FormResult, type FormValues } from '@/lib/forms/schema'
import { Checkbox, Field, FileInput, Input, Select, Textarea, describedBy } from './Field'

/**
 * A complete form built from its definition: same zod rules in the browser and on the server,
 * honeypot, loading state and honest status messages (delivery follows in Step 6).
 */
export function SiteForm({
  formId,
  phone,
  email,
}: {
  formId: FormId
  phone: string
  email: string
}) {
  const definition = formDefinitions[formId]
  const schema = useMemo(() => buildSchema(definition), [definition])
  const resolver = useMemo<Resolver<FormValues>>(
    () => async (values) => {
      const parsed = schema.safeParse(values)
      if (parsed.success) return { values: parsed.data, errors: {} }
      return {
        values: {},
        errors: Object.fromEntries(
          Object.entries(errorsFrom(parsed.error)).map(([name, message]) => [
            name,
            { type: 'validation', message },
          ]),
        ),
      }
    },
    [schema],
  )
  const defaultValues = useMemo(
    () =>
      Object.fromEntries([
        ['website', ''],
        ...definition.fields.map((f) => [
          f.name,
          f.type === 'checkbox' ? false : f.type === 'file' ? undefined : '',
        ]),
      ]),
    [definition],
  )
  const { register, handleSubmit, setError, formState } = useForm<FormValues>({
    resolver,
    defaultValues,
  })
  const [pending, startTransition] = useTransition()
  const [result, setResult] = useState<FormResult | null>(null)
  const id = (name: string) => `${formId}-${name}`
  const err = (name: string) => {
    const message = formState.errors[name]?.message
    return typeof message === 'string' ? message : undefined
  }

  const onSubmit = handleSubmit((values) => {
    const data = new FormData()
    for (const [key, value] of Object.entries(values)) {
      if (value === undefined) continue
      data.append(key, value instanceof File ? value : String(value))
    }
    startTransition(async () => {
      const response = await submitForm(formId, data)
      setResult(response)
      if (response.status === 'invalid') {
        for (const [name, message] of Object.entries(response.fieldErrors))
          setError(name, { type: 'server', message })
      }
    })
  })

  function control(field: FormField) {
    const invalid = !!err(field.name)
    const common = {
      id: id(field.name),
      invalid,
      'aria-describedby': describedBy(id(field.name), { hint: !!field.hint, error: invalid }),
      ...register(field.name),
    }
    switch (field.type) {
      case 'textarea':
        return <Textarea rows={5} {...common} />
      case 'select':
        return (
          <Select {...common}>
            <option value="">Bitte wählen</option>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
        )
      case 'file':
        return <FileInput accept={field.accept?.join(',')} {...common} />
      default:
        return <Input type={field.type} autoComplete={field.autoComplete} {...common} />
    }
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-6"
      aria-describedby={`${formId}-hinweis`}
    >
      <p
        id={`${formId}-hinweis`}
        className="flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-small text-blue-900 ring-1 ring-blue-100"
      >
        <Icon name="info" className="mt-0.5 size-4 text-blue-600" />
        Die Online-Übermittlung wird gerade eingerichtet. Sie können das Formular schon ausfüllen
        und prüfen – bitte erreichen Sie uns bis dahin telefonisch oder per E-Mail.
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {definition.fields.map((field) =>
          field.type === 'checkbox' ? (
            <div key={field.name} className="flex flex-col gap-2 md:col-span-2">
              <Checkbox
                id={id(field.name)}
                invalid={!!err(field.name)}
                aria-describedby={err(field.name) ? `${id(field.name)}-error` : undefined}
                label={
                  <>
                    {field.label} Details in der{' '}
                    <Link
                      href="/datenschutz"
                      className="font-semibold text-blue underline underline-offset-4"
                    >
                      Datenschutzerklärung
                    </Link>
                    .{field.required ? <span className="text-red-strong"> *</span> : null}
                  </>
                }
                {...register(field.name)}
              />
              {err(field.name) ? (
                <p
                  id={`${id(field.name)}-error`}
                  className="flex items-start gap-1.5 text-small font-medium text-red-strong"
                >
                  <Icon name="alert" className="mt-0.5 size-4" />
                  {err(field.name)}
                </p>
              ) : null}
            </div>
          ) : (
            <Field
              key={field.name}
              id={id(field.name)}
              label={field.label}
              required={field.required}
              hint={field.hint}
              error={err(field.name)}
              className={cn(field.wide && 'md:col-span-2')}
            >
              {control(field)}
            </Field>
          ),
        )}
      </div>

      {/* Honeypot – hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id('website')}>Website</label>
        <input
          id={id('website')}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={pending}
          loadingLabel="Wird geprüft …"
        >
          {definition.submitLabel}
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
          <div className="flex flex-col gap-3 rounded-lg border border-blue-200 bg-blue-50 p-5 text-ink md:p-6">
            <p className="inline-flex items-center gap-2 font-semibold">
              <Icon name="check" className="size-5 text-success" strokeWidth={2.5} />
              Ihre Angaben sind vollständig.
            </p>
            <p className="text-ink-muted">
              Die Online-Übermittlung ist noch nicht freigeschaltet – Ihre Daten wurden nicht
              gesendet. Bitte erreichen Sie uns telefonisch unter {phone} oder per E-Mail an {email}
              .
            </p>
          </div>
        ) : result?.status === 'rate-limited' ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-5 font-semibold text-red-700">
            Zu viele Versuche in kurzer Zeit. Bitte versuchen Sie es in ein paar Minuten erneut.
          </p>
        ) : result?.status === 'invalid' ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-5 font-semibold text-red-700">
            Bitte prüfen Sie die markierten Felder.
          </p>
        ) : null}
      </div>
    </form>
  )
}
