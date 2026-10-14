import Link from 'next/link'
import { getNavigation, getSiteSettings } from '@/content'
import { Icon } from '@/components/ui/Icon'
import { Watermark } from '@/components/ui/Watermark'
import { Logo } from './Logo'

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/** Light, corporate footer: brand line on top, navigation, short contact block, legal row. */
export async function SiteFooter() {
  const [navigation, settings] = await Promise.all([getNavigation(), getSiteSettings()])
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative isolate overflow-hidden border-t border-line bg-surface-2"
      aria-labelledby="footer-titel"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-600 via-blue-400 to-red-500"
      />
      <h2 id="footer-titel" className="sr-only">
        Fußbereich
      </h2>
      <div className="container-wide grid gap-12 pt-section-sm pb-12 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <Logo />
          <p className="max-w-prose text-small text-ink-muted">{settings.footerAbout}</p>
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
              <p className="text-caption font-semibold tracking-widest text-blue-700 uppercase">
                {group.title}
              </p>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-sm text-small text-ink hov:text-blue-700 hov:underline"
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
          <p className="text-caption font-semibold tracking-widest text-blue-700 uppercase">
            Kontakt
          </p>
          <ul className="flex flex-col gap-4 text-small">
            {settings.locations.map((location) => (
              <li key={location.id} className="flex flex-col gap-1">
                <span className="font-semibold text-blue-900">{location.name}</span>
                <a
                  href={telHref(location.phone)}
                  className="text-ink hov:text-blue-700 hov:underline"
                >
                  Tel. {location.phone}
                </a>
                <a
                  href={`mailto:${location.email}`}
                  className="break-all text-ink hov:text-blue-700 hov:underline"
                >
                  {location.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-wide flex flex-col gap-4 py-6 text-small text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {settings.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {settings.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hov:text-blue-700 hov:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Watermark
        text="ABC"
        className="-right-8 -bottom-6 -z-10 w-[min(60vw,34rem)] text-blue-900/4"
      />
    </footer>
  )
}
