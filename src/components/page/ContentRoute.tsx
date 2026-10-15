import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlockRenderer } from '@/components/page/BlockRenderer'
import { LegalPage } from '@/components/page/LegalPage'
import { PageHero } from '@/components/page/PageHero'
import type { Crumb } from '@/components/page/Breadcrumbs'
import {
  getContentPage,
  getContentPaths,
  getPathLabels,
  getSiteSettings,
  getTelcData,
} from '@/content'

type Props = { params: Promise<{ slug?: string[] }> }

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

/**
 * Shared route logic for content pages under one top-level section (e.g. "sprachkurse").
 * Each section gets its own `[[...slug]]` route, so its pages are prerendered at build time while
 * the global catch-all stays on-demand for paths that do not exist yet.
 */
export function contentRoute(section: string) {
  async function generateStaticParams() {
    return (await getContentPaths())
      .filter((path) => path === section || path.startsWith(`${section}/`))
      .map((path) => ({ slug: path.split('/').slice(1) }))
  }

  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug = [] } = await params
    const page = await getContentPage([section, ...slug].join('/'))
    if (!page) return {}
    const url = `/${page.path}`
    const image =
      typeof page.hero.image.src === 'string' ? page.hero.image.src : page.hero.image.src.src
    return {
      title: page.seo.title,
      description: page.seo.description,
      alternates: { canonical: url },
      openGraph: {
        type: 'website',
        locale: 'de_DE',
        url,
        title: page.seo.title,
        description: page.seo.description,
        images: [{ url: image, alt: page.hero.image.alt }],
      },
    }
  }

  async function Page({ params }: Props) {
    const { slug: rest = [] } = await params
    const slug = [section, ...rest]
    const path = slug.join('/')
    const [page, labels, settings, telc] = await Promise.all([
      getContentPage(path),
      getPathLabels(),
      getSiteSettings(),
      getTelcData(),
    ])
    if (!page) notFound()

    const crumbs: Crumb[] = [{ label: 'Start', href: '/' }]
    slug.forEach((_, i) => {
      const sub = slug.slice(0, i + 1).join('/')
      const label = labels.get(sub)
      if (label) crumbs.push({ label, href: `/${sub}` })
    })

    const courseJsonLd =
      page.schema === 'Course'
        ? {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: page.hero.title,
            description: page.seo.description,
            inLanguage: 'de',
            url: `${SITE_URL}/${page.path}`,
            provider: { '@type': 'EducationalOrganization', name: settings.name, url: SITE_URL },
          }
        : null

    if (page.legal) return <LegalPage page={page} crumbs={crumbs} siteUrl={SITE_URL} />

    return (
      <>
        <PageHero hero={page.hero} crumbs={crumbs} siteUrl={SITE_URL} />
        <BlockRenderer
          blocks={page.blocks}
          data={{
            locations: settings.locations,
            orgName: settings.name,
            exams: telc.exams,
            dates: telc.dates,
          }}
        />
        {courseJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(courseJsonLd).replace(/</g, '\\u003c'),
            }}
          />
        ) : null}
      </>
    )
  }

  return { generateStaticParams, generateMetadata, Page }
}
