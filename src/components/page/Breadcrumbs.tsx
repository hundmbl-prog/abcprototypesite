import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'

export type Crumb = { label: string; href: string }

/** Breadcrumb trail (visible) plus schema.org BreadcrumbList for search engines. */
export function Breadcrumbs({ items, siteUrl }: { items: Crumb[]; siteUrl: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${siteUrl}${item.href}`,
    })),
  }
  return (
    <nav aria-label="Brotkrümelnavigation">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-small text-on-dark/85">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.href} className="inline-flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-semibold text-on-dark">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="underline-offset-4 hov:text-on-dark hov:underline foc:outline-2 foc:outline-offset-2 foc:outline-on-dark"
                  >
                    {item.label}
                  </Link>
                  <Icon name="chevron-down" className="size-3.5 -rotate-90 opacity-70" />
                </>
              )}
            </li>
          )
        })}
      </ol>
      <script
        type="application/ld+json"
        // JSON.stringify output only, no user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </nav>
  )
}
