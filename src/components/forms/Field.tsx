import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import type { PreviewState } from '@/components/ui/Button'

type FieldProps = {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  className?: string
  children: ReactNode
}

export function hintId(id: string) {
  return `${id}-hint`
}
export function errorId(id: string) {
  return `${id}-error`
}
/** aria-describedby value for a control inside <Field>. Pass whether a hint / error is shown. */
export function describedBy(
  id: string,
  { hint = false, error = false }: { hint?: boolean; error?: boolean },
) {
  return (
    [hint ? hintId(id) : null, error ? errorId(id) : null].filter(Boolean).join(' ') || undefined
  )
}

/** Label + control + hint + error message, wired up for screen readers. */
export function Field({ id, label, required, hint, error, className, children }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-small font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-red-strong">
            <span aria-hidden> *</span>
            <span className="sr-only"> (Pflichtfeld)</span>
          </span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={hintId(id)} className="text-small text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={errorId(id)}
          className="flex items-start gap-1.5 text-small font-medium text-red-strong"
        >
          <Icon name="alert" className="mt-0.5 size-4" />
          {error}
        </p>
      ) : null}
    </div>
  )
}

const control =
  'w-full rounded-md border bg-surface px-4 text-body text-ink placeholder:text-ink-muted transition-[border-color,box-shadow] duration-(--dur-fast) ' +
  'hov:border-blue foc:border-blue foc:outline-2 foc:outline-offset-0 foc:outline-blue ' +
  'disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-ink-muted disabled:border-line-strong ' +
  'read-only:bg-surface-2'

function controlClasses(invalid: boolean, className?: string) {
  return cn(
    control,
    invalid ? 'border-red-strong foc:outline-red-strong foc:border-red-strong' : 'border-control',
    className,
  )
}

type ControlExtras = { invalid?: boolean; preview?: PreviewState }

export function Input({
  invalid = false,
  preview,
  className,
  ...rest
}: ComponentPropsWithRef<'input'> & ControlExtras) {
  return (
    <input
      aria-invalid={invalid || undefined}
      data-preview={preview}
      className={controlClasses(invalid, cn('min-h-12', className))}
      {...rest}
    />
  )
}

export function Textarea({
  invalid = false,
  preview,
  className,
  rows = 5,
  ...rest
}: ComponentPropsWithRef<'textarea'> & ControlExtras) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      data-preview={preview}
      className={controlClasses(invalid, cn('resize-y py-3', className))}
      {...rest}
    />
  )
}

export function Select({
  invalid = false,
  preview,
  className,
  children,
  ...rest
}: ComponentPropsWithRef<'select'> & ControlExtras) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        data-preview={preview}
        className={controlClasses(invalid, cn('min-h-12 appearance-none pr-12', className))}
        {...rest}
      >
        {children}
      </select>
      <Icon
        name="chevron-down"
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-muted"
      />
    </div>
  )
}

type ChoiceProps = Omit<ComponentPropsWithRef<'input'>, 'type'> &
  ControlExtras & { label: ReactNode; description?: string }

function Choice({
  kind,
  label,
  description,
  invalid = false,
  preview,
  className,
  id,
  ...rest
}: ChoiceProps & { kind: 'checkbox' | 'radio' }) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'group/choice flex cursor-pointer items-start gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-60',
        className,
      )}
    >
      <span className="relative mt-0.5 grid size-6 shrink-0 place-items-center">
        <input
          id={id}
          type={kind}
          aria-invalid={invalid || undefined}
          data-preview={preview}
          className={cn(
            'peer size-6 appearance-none border-2 bg-surface transition-colors duration-(--dur-fast)',
            kind === 'checkbox' ? 'rounded-sm' : 'rounded-pill',
            invalid ? 'border-red-strong' : 'border-control',
            'checked:border-blue checked:bg-blue disabled:bg-surface-2 hov:border-blue foc:outline-2 foc:outline-offset-2 foc:outline-blue',
          )}
          {...rest}
        />
        {kind === 'checkbox' ? (
          <Icon
            name="check"
            strokeWidth={2.5}
            className="pointer-events-none absolute size-4 text-on-dark opacity-0 peer-checked:opacity-100"
          />
        ) : (
          <span className="pointer-events-none absolute size-2.5 rounded-pill bg-surface opacity-0 peer-checked:opacity-100" />
        )}
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-body text-ink">{label}</span>
        {description ? <span className="text-small text-ink-muted">{description}</span> : null}
      </span>
    </label>
  )
}

export function Checkbox(props: ChoiceProps) {
  return <Choice kind="checkbox" {...props} />
}

export function Radio(props: ChoiceProps) {
  return <Choice kind="radio" {...props} />
}

export function FileInput({
  invalid = false,
  preview,
  className,
  ...rest
}: Omit<ComponentPropsWithRef<'input'>, 'type'> & ControlExtras) {
  return (
    <input
      type="file"
      aria-invalid={invalid || undefined}
      data-preview={preview}
      className={cn(
        'block w-full cursor-pointer rounded-md border border-dashed bg-surface-2 p-3 text-small text-ink-muted',
        invalid ? 'border-red-strong' : 'border-control',
        'disabled:cursor-not-allowed disabled:opacity-60 hov:border-blue foc:outline-2 foc:outline-offset-2 foc:outline-blue',
        'file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-blue file:px-4 file:py-2 file:text-small file:font-semibold file:text-on-dark',
        className,
      )}
      {...rest}
    />
  )
}
