import Link from 'next/link'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Icon, type IconName } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { HomePage, Location } from '@/content'

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/** Closing contact band: three equal ways to get in touch; the appointment request is the red main action. */
export function ContactBand({
  content,
  location,
}: {
  content: HomePage['contact']
  location: Location
}) {
  const tiles: Array<{
    icon: IconName
    label: string
    value: string
    href: string
    primary?: boolean
  }> = [
    { icon: 'phone', label: 'Anrufen', value: location.phone, href: telHref(location.phone) },
    {
      icon: 'mail',
      label: 'E-Mail schreiben',
      value: location.email,
      href: `mailto:${location.email}`,
    },
    {
      icon: 'calendar',
      label: content.primary.label,
      value: content.primaryNote,
      href: content.primary.href,
      primary: true,
    },
  ]
  return (
    <section id="kontakt" aria-labelledby="kontakt-titel" className="bg-blue-50 py-section-sm">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeader
            id="kontakt-titel"
            eyebrow={content.eyebrow}
            title={content.title}
            intro={content.intro}
            className="mb-0! md:mb-0!"
          />
        </div>
        <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
          {tiles.map((tile) => {
            const external = tile.href.startsWith('tel:') || tile.href.startsWith('mailto:')
            const className = cn(
              'group/tile flex h-full flex-col gap-4 rounded-2xl p-5 shadow-md ring-1 transition-[transform,box-shadow,background-color] duration-(--dur-slow) ease-out-expo hov:-translate-y-1 hov:shadow-(--shadow-float) active:scale-[0.98]',
              tile.primary
                ? 'bg-red-500 text-on-dark ring-red-500 hov:bg-red-600'
                : 'bg-linear-to-b from-blue-100 to-surface text-blue-900 ring-blue-900/5',
            )
            const inner = (
              <>
                <span
                  className={cn(
                    'grid size-11 place-items-center rounded-pill transition-transform duration-(--dur-slow) ease-out-expo group-hover/tile:scale-110',
                    tile.primary ? 'bg-on-dark/15' : 'bg-blue-600 text-on-dark',
                  )}
                >
                  <Icon name={tile.icon} className="size-5" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-semibold">{tile.label}</span>
                  <span
                    className={cn(
                      'text-small break-all',
                      tile.primary ? 'text-on-dark' : 'text-ink-muted',
                    )}
                  >
                    {tile.value}
                  </span>
                </span>
                <Icon
                  name="arrow-right"
                  className="mt-auto size-5 transition-transform duration-(--dur-slow) ease-out-expo group-hover/tile:translate-x-1.5"
                />
              </>
            )
            return (
              <li key={tile.label} data-reveal>
                {external ? (
                  <a href={tile.href} className={className}>
                    {inner}
                  </a>
                ) : (
                  <Link href={tile.href} className={className}>
                    {inner}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
