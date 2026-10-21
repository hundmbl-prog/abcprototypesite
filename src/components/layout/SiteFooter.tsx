import Link from 'next/link'
import { getNavigation, getSiteSettings } from '@/content'
import { BrandMark } from '@/components/ui/BrandMark'
import { Icon } from '@/components/ui/Icon'
import { Logo } from './Logo'

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/** ABC Blue footer, all text white: white logo, navigation, locations, legal row. Links get a white chip and shift slightly on hover. */
export async function SiteFooter() {
  const [navigation, settings] = await Promise.all([getNavigation(), getSiteSettings()])
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative isolate overflow-hidden bg-blue-900 text-on-dark [--focus-ring:var(--color-on-dark)]"
      aria-labelledby="footer-titel"
    >
      <BrandMark tone="dark" className="-right-12 -bottom-12 w-[28rem]" />
      <h2 id="footer-titel" className="sr-only">
        Fußbereich
      </h2>
      <div className="container-wide grid gap-12 pt-section-sm pb-12 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <Logo variant="full" white className="self-start" />
          <p className="max-w-prose text-small text-on-dark">{settings.footerAbout}</p>
          <Link
            href={navigation.cta.href}
            className="inline-flex items-center gap-2 self-start rounded-pill bg-red-500 px-5 py-2.5 text-small font-semibold text-on-dark shadow-(--shadow-glow-red) ring-2 ring-red hov:scale-[1.03] hov:bg-surface hov:text-red"
          >
            {navigation.cta.label}
            <Icon name="arrow-right" className="size-4" />
          </Link>
        </div>

        <nav
          aria-label="Fußnavigation"
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5"
        >
          {navigation.footer.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <p className="text-caption font-semibold tracking-widest text-on-dark uppercase">
                {group.title}
              </p>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="-mx-1.5 inline-block rounded-sm px-1.5 text-small text-on-dark transition-[background-color,transform] duration-(--dur-base) hov:translate-x-1 hov:bg-on-dark hov:text-blue"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-4 lg:col-span-3">
          <p className="text-caption font-semibold tracking-widest text-on-dark uppercase">
            Standorte
          </p>
          <ul className="flex flex-col gap-4 text-small">
            {settings.locations.map((location) => (
              <li key={location.id} className="flex flex-col gap-1">
                <span className="font-semibold text-on-dark">
                  {location.name} · {location.kind}
                </span>
                <span className="text-on-dark">
                  {location.street}, {location.postalCode} {location.city}
                </span>
                {location.hours.map((h) => (
                  <span key={h.days} className="text-on-dark">
                    {h.days}: {h.hours}
                  </span>
                ))}
                <a
                  href={telHref(location.phone)}
                  className="-mx-1.5 inline-block self-start rounded-sm px-1.5 text-on-dark transition-[background-color,transform] duration-(--dur-base) hov:translate-x-1 hov:bg-on-dark hov:text-blue"
                >
                  Tel. {location.phone}
                </a>
                <a
                  href={`mailto:${location.email}`}
                  className="-mx-1.5 inline-block self-start rounded-sm px-1.5 break-all text-on-dark transition-[background-color,transform] duration-(--dur-base) hov:translate-x-1 hov:bg-on-dark hov:text-blue"
                >
                  {location.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-on-dark-muted">
        <div className="container-wide flex flex-col gap-4 py-6 text-small text-on-dark md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {settings.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {settings.legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="-mx-1.5 inline-block rounded-sm px-1.5 transition-[background-color,transform] duration-(--dur-base) hov:translate-x-1 hov:bg-on-dark hov:text-blue"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
