import { cn } from '@/lib/cn'
import { Icon } from './Icon'

export type BadgeStatus = 'neu' | 'plaetze-frei' | 'wenige-plaetze' | 'ausgebucht' | 'kostenlos'

const config: Record<BadgeStatus, { label: string; className: string; dot?: boolean }> = {
  neu: { label: 'Neu', className: 'bg-blue text-on-dark' },
  'plaetze-frei': { label: 'Plätze frei', className: 'bg-success-soft text-success', dot: true },
  'wenige-plaetze': { label: 'Wenige Plätze', className: 'bg-red-soft text-red-strong', dot: true },
  ausgebucht: { label: 'Ausgebucht', className: 'bg-red text-on-dark' },
  kostenlos: { label: 'Kostenlos', className: 'bg-navy text-on-dark' },
}

/** Status badge. Sharp corners on purpose, so it reads differently from the category pill. */
export function Badge({
  status,
  label,
  className,
}: {
  status: BadgeStatus
  /** Overrides the default German label. */
  label?: string
  className?: string
}) {
  const item = config[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-caption font-bold',
        item.className,
        className,
      )}
    >
      {item.dot ? <span aria-hidden className="size-1.5 rounded-pill bg-current" /> : null}
      {status === 'ausgebucht' ? <Icon name="close" className="size-3" /> : null}
      {label ?? item.label}
    </span>
  )
}

export const badgeLabels: Record<BadgeStatus, string> = Object.fromEntries(
  Object.entries(config).map(([k, v]) => [k, v.label]),
) as Record<BadgeStatus, string>
