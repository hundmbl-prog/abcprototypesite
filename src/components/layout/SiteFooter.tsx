import Link from 'next/link'
import { getNavigation, getSiteSettings } from '@/content'
import { BrandMark } from '@/components/ui/BrandMark'
import { Icon } from '@/components/ui/Icon'
import { Logo } from './Logo'

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/** Brand-blue footer with white text: white logo, navigation, locations (address, hours, contact), legal row. */
export async function SiteFooter() {
  const [navigation, settings] = await Promise.all([getNavigation(), getSiteSettings()])
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative isolate overflow-hidden bg-blue-900 text-on-dark [--focus-ring:var(--color-on-dark)]"
      aria-labelledby="footer-titel"
    >
      <BrandMark tone="dark" className="-right-24 -bottom-24 w-[44rem]" />
      <h2 id="footer-titel" className="sr-only">
        Fußbereich
      </h2>
      <div className="container-wide grid gap-12 pt-section-sm pb-12 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <Logo variant="full" white className="self-start" />
          <p className="max-w-prose text-small text-on-dark-muted">{settings.footerAbout}</p>
          <Link
            href={navigation.cta.href}
            className="inline-flex items-center gap-2 self-start rounded-pill bg-red-500 px-5 py-2.5 text-small font-semibold text-on-dark shadow-(--shadow-glow-red) hov:bg-navy"
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
              <p className="text-caption font-semibold tracking-widest text-blue-200 uppercase">
                {group.title}
              </p>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-sm text-small text-on-dark-muted hov:text-on-dark hov:underline"
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
          <p className="text-caption font-semibold tracking-widest text-blue-200 uppercase">
            Standorte
          </p>
          <ul className="flex flex-col gap-4 text-small">
            {settings.locations.map((location) => (
              <li key={location.id} className="flex flex-col gap-1">
                <span className="font-semibold text-on-dark">
                  {location.name} · {location.kind}
                </span>
                <span className="text-on-dark-muted">
                  {location.street}, {location.postalCode} {location.city}
                </span>
                {location.hours.map((h) => (
                  <span key={h.days} className="text-on-dark-muted">
                    {h.days}: {h.hours}
                  </span>
                ))}
                <a
                  href={telHref(location.phone)}
                  className="text-on-dark-muted hov:text-on-dark hov:underline"
                >
                  Tel. {location.phone}
                </a>
                <a
                  href={`mailto:${location.email}`}
                  className="break-all text-on-dark-muted hov:text-on-dark hov:underline"
                >
                  {location.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-blue">
        <div className="container-wide flex flex-col gap-4 py-6 text-small text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {settings.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {settings.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hov:text-on-dark hov:underline">
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
