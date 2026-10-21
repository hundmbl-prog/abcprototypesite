import Link from 'next/link'
import { getNavigation, getSiteSettings } from '@/content'
import { Logo } from './Logo'

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/** Compact light footer: logo and one line, three link columns, both locations, legal row. */
export async function SiteFooter() {
  const [navigation, settings] = await Promise.all([getNavigation(), getSiteSettings()])
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-blue-100 text-ink" aria-labelledby="footer-titel">
      <h2 id="footer-titel" className="sr-only">
        Fußbereich
      </h2>
      <div className="container-wide grid grid-cols-2 gap-x-8 gap-y-10 py-12 md:grid-cols-4 lg:grid-cols-12">
        <div className="col-span-2 flex flex-col gap-4 md:col-span-4 lg:col-span-3">
          <Logo variant="full" className="self-start" />
          <p className="max-w-[20rem] text-small text-ink-muted">{settings.footerAbout}</p>
        </div>

        <nav aria-label="Fußnavigation" className="contents">
          {navigation.footer.map((group) => (
            <div key={group.title} className="flex flex-col gap-3 lg:col-span-2">
              <p className="text-small font-semibold text-navy">{group.title}</p>
              <ul className="flex flex-col gap-1.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-small text-ink-muted hov:text-blue hov:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="col-span-2 flex flex-col gap-3 md:col-span-4 lg:col-span-3">
          <p className="text-small font-semibold text-navy">Standorte</p>
          <ul className="grid grid-cols-1 gap-4 text-small text-ink-muted sm:grid-cols-2 lg:grid-cols-1">
            {settings.locations.map((location) => (
              <li key={location.id} className="flex flex-col gap-0.5">
                <span className="font-semibold text-navy">{location.name}</span>
                <span>
                  {location.street}, {location.postalCode} {location.city}
                </span>
                <span>{location.hours.map((h) => `${h.days}: ${h.hours}`).join(' · ')}</span>
                <a href={telHref(location.phone)} className="hov:text-blue hov:underline">
                  Tel. {location.phone}
                </a>
                <a
                  href={`mailto:${location.email}`}
                  className="break-all hov:text-blue hov:underline"
                >
                  {location.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-wide flex flex-col gap-3 py-5 text-small text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {settings.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {settings.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hov:text-blue hov:underline">
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
