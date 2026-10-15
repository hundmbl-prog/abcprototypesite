import Link from 'next/link'
import { getNavigation, getSiteSettings } from '@/content'
import { Icon } from '@/components/ui/Icon'
import { Logo } from './Logo'

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/** Brand-blue footer with white text: logo on a white plate, navigation, contact block, legal row. */
export async function SiteFooter() {
  const [navigation, settings] = await Promise.all([getNavigation(), getSiteSettings()])
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative isolate overflow-hidden bg-blue-900 text-on-dark [--focus-ring:var(--color-on-dark)]"
      aria-labelledby="footer-titel"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-red-500 via-red-400 to-blue-400"
      />
      <h2 id="footer-titel" className="sr-only">
        Fußbereich
      </h2>
      <div className="container-wide grid gap-12 pt-section-sm pb-12 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <span className="self-start rounded-2xl bg-surface p-3 shadow-lg [--focus-ring:var(--color-blue)]">
            <Logo variant="full" />
          </span>
          <p className="max-w-prose text-small text-on-dark-muted">{settings.footerAbout}</p>
          <Link
            href={navigation.cta.href}
            className="inline-flex items-center gap-2 self-start rounded-pill bg-red-500 px-5 py-2.5 text-small font-semibold text-on-dark shadow-(--shadow-glow-red) hov:bg-red-600"
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
            Kontakt
          </p>
          <ul className="flex flex-col gap-4 text-small">
            {settings.locations.map((location) => (
              <li key={location.id} className="flex flex-col gap-1">
                <span className="font-semibold text-on-dark">{location.name}</span>
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

      <div className="border-t border-on-dark/15">
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
