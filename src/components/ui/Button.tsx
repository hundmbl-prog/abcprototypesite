import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon, Spinner, type IconName } from './Icon'

/**
 * Pairing rules (see /styleguide):
 * - light backgrounds → primary, outline, cta (only once per section), pill, link
 * - soft-blue background → navy
 * - navy background → white, cta, ghost
 * - red banner → white-red
 */
export type ButtonVariant =
  | 'primary'
  | 'navy'
  | 'cta'
  | 'white'
  | 'white-red'
  | 'outline'
  | 'ghost'
  | 'pill'
  | 'pill-red'
  | 'link'

export type ButtonSize = 'sm' | 'md' | 'lg'

/** For the style guide: renders a state without user interaction. */
export type PreviewState = 'hover' | 'focus' | 'active'

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: IconName
  loading?: boolean
  loadingLabel?: string
  preview?: PreviewState
  className?: string
  children: ReactNode
}

type AsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof CommonProps> & { href?: undefined }
type AsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps> & {
    href: string
    disabled?: boolean
  }

export type ButtonProps = AsButton | AsLink

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2 font-sans font-semibold whitespace-nowrap ' +
  'transition-[background-color,color,border-color,box-shadow,transform] duration-(--dur-base) ease-out-expo ' +
  'foc:outline-2 foc:outline-offset-3 foc:outline-(--focus-ring) ' +
  'disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 text-small',
  md: 'min-h-12 px-6 text-body',
  lg: 'min-h-14 px-8 text-lead',
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'rounded-md bg-blue text-on-dark shadow-sm hov:bg-blue-strong hov:shadow-md act:translate-y-px',
  navy: 'rounded-md bg-navy text-on-dark shadow-sm hov:bg-navy-2 hov:shadow-md act:translate-y-px',
  cta: 'rounded-md bg-red text-on-dark shadow-sm hov:bg-red-strong hov:shadow-md act:translate-y-px',
  white: 'rounded-md bg-surface text-navy shadow-sm hov:bg-blue-soft act:translate-y-px',
  'white-red': 'rounded-md bg-surface text-red-strong shadow-sm hov:bg-red-soft act:translate-y-px',
  outline:
    'rounded-md border-2 border-navy text-navy hov:bg-navy hov:text-on-dark act:translate-y-px',
  ghost:
    'rounded-md border-2 border-on-dark/70 text-on-dark hov:border-on-dark hov:bg-on-dark/10 act:translate-y-px',
  pill: 'rounded-pill bg-navy pr-2 text-on-dark hov:bg-navy-2 act:translate-y-px',
  'pill-red':
    'rounded-pill bg-red-500 pr-1.5 text-on-dark shadow-sm hov:bg-red-600 hov:shadow-(--shadow-glow-red) act:scale-95',
  link: 'min-h-0! px-0! text-blue after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-(--dur-slow) after:ease-out-expo before:absolute before:inset-x-0 before:-bottom-0.5 before:h-0.5 before:bg-current before:opacity-25 hov:text-blue-strong hov:after:scale-x-100 foc:after:scale-x-100',
}

function Content({ variant, icon, loading, loadingLabel, children }: CommonProps) {
  if (variant === 'pill' || variant === 'pill-red') {
    return (
      <>
        <span className="pl-2">{children}</span>
        <span
          className={cn(
            'relative grid size-9 place-items-center overflow-hidden rounded-pill',
            variant === 'pill-red' ? 'bg-on-dark/15 text-on-dark' : 'bg-surface text-navy',
          )}
        >
          {loading ? (
            <Spinner className="size-4" />
          ) : (
            <>
              <Icon
                name={icon ?? 'arrow-right'}
                className="size-4 transition-transform duration-(--dur-slow) ease-out-expo group-hover/btn:translate-x-9 group-data-[preview=hover]/btn:translate-x-9"
              />
              <Icon
                name={icon ?? 'arrow-right'}
                className="absolute size-4 -translate-x-9 transition-transform duration-(--dur-slow) ease-out-expo group-hover/btn:translate-x-0 group-data-[preview=hover]/btn:translate-x-0"
              />
            </>
          )}
        </span>
        {loading ? <span className="sr-only">{loadingLabel}</span> : null}
      </>
    )
  }
  return (
    <>
      {loading ? <Spinner className="size-4" /> : null}
      <span>{children}</span>
      {!loading && icon ? (
        <Icon
          name={icon}
          className="size-4 transition-transform duration-(--dur-base) ease-out-expo group-hover/btn:translate-x-0.5 group-data-[preview=hover]/btn:translate-x-0.5"
        />
      ) : null}
      {loading ? <span className="sr-only">{loadingLabel}</span> : null}
    </>
  )
}

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className,
}: Pick<CommonProps, 'variant' | 'size' | 'className'>): string {
  return cn(base, sizes[size], variants[variant], className)
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    loading = false,
    loadingLabel = 'Wird geladen …',
    preview,
    className,
    children,
  } = props
  const classes = buttonClasses({ variant, size, className })
  const content = (
    <Content variant={variant} icon={icon} loading={loading} loadingLabel={loadingLabel}>
      {children}
    </Content>
  )

  if (props.href !== undefined) {
    const {
      variant: _v,
      size: _s,
      icon: _i,
      loading: _l,
      loadingLabel: _ll,
      preview: _p,
      className: _c,
      children: _ch,
      disabled,
      href,
      ...linkProps
    } = props
    if (disabled) {
      return (
        <a role="link" aria-disabled="true" className={classes} data-preview={preview}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} data-preview={preview} {...linkProps}>
        {content}
      </Link>
    )
  }

  const {
    variant: _v,
    size: _s,
    icon: _i,
    loading: _l,
    loadingLabel: _ll,
    preview: _p,
    className: _c,
    children: _ch,
    disabled,
    type = 'button',
    ...buttonProps
  } = props
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-preview={preview}
      {...buttonProps}
    >
      {content}
    </button>
  )
}
