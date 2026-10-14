import Link from 'next/link'
import { getNavigation, getSiteSettings } from '@/content'
import { Icon } from '@/components/ui/Icon'
import { Watermark } from '@/components/ui/Watermark'
import { Logo } from './Logo'

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export async function SiteFooter() {
  const [navigation, settings] = await Promise.all([getNavigation(), getSiteSettings()])
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden tone-ink" aria-labelledby="footer-titel">
      <h2 id="footer-titel" className="sr-only">
        Fußbereich
      </h2>
      <div className="container-wide grid gap-12 pt-section pb-12 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Logo tone="dark" />
          <p className="max-w-prose text-on-dark-muted">{settings.footerAbout}</p>
          <Link
            href={navigation.cta.href}
            className="inline-flex items-center gap-2 self-start font-semibold underline decoration-on-dark/40 underline-offset-4 hov:decoration-on-dark"
          >
            {navigation.cta.label}
            <Icon name="arrow-right" className="size-4" />
          </Link>
        </div>

        <nav
          aria-label="Fußnavigation"
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6"
        >
          {navigation.footer.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <p className="text-small font-semibold tracking-widest text-on-dark-muted uppercase">
                {group.title}
              </p>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="rounded-sm text-small hov:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="grid gap-8 border-t border-on-dark/15 pt-10 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-2">
          {settings.locations.map((location) => (
            <address key={location.id} className="flex flex-col gap-2 text-small not-italic">
              <p className="font-display text-h4 font-semibold">{location.name}</p>
              <p className="text-on-dark-muted">
                {location.street}
                <br />
                {location.postalCode} {location.city}
              </p>
              <a
                href={telHref(location.phone)}
                className="inline-flex items-center gap-2 hov:underline"
              >
                Tel. {location.phone}
              </a>
              <a href={`mailto:${location.email}`} className="break-all hov:underline">
                {location.email}
              </a>
              <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-on-dark-muted">
                {location.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="font-semibold text-on-dark">{h.days}</dt>
                    <dd>{h.hours}</dd>
                  </div>
                ))}
              </dl>
            </address>
          ))}
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
      <Watermark text="ABC" className="-right-8 -bottom-6 w-[min(60vw,34rem)] text-on-dark/4" />
    </footer>
  )
}
