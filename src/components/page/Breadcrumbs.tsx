export type Crumb = { label: string; href: string }

/** schema.org BreadcrumbList for search engines (no visible trail). */
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
  // The visible trail was removed on request (19.10.2026); search engines still get the path.
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output only, no user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}
