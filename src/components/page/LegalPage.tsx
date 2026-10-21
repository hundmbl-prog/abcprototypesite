import { Icon } from '@/components/ui/Icon'
import type { ContentPage } from '@/content/types'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'

/** Legal pages: calm text layout with a sticky table of contents (no image hero). */
export function LegalPage({
  page,
  crumbs,
  siteUrl,
}: {
  page: ContentPage
  crumbs: Crumb[]
  siteUrl: string
}) {
  const legal = page.legal
  if (!legal) return null
  return (
    <>
      <section aria-labelledby="seiten-titel" className="bg-blue-100 pt-28 pb-12 md:pt-32 md:pb-14">
        <div className="container-page flex flex-col gap-5">
          <Breadcrumbs items={crumbs} siteUrl={siteUrl} />
          <h1 id="seiten-titel" className="text-h1 text-navy">
            {page.hero.title}
          </h1>
          {legal.intro ? (
            <p className="max-w-prose text-lead text-ink-muted">{legal.intro}</p>
          ) : null}
        </div>
      </section>
      <div className="bg-surface py-section-sm">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12">
          <nav aria-label="Inhaltsverzeichnis" className="lg:col-span-4">
            <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5 lg:sticky lg:top-28 lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto">
              <p className="text-small font-semibold text-navy">Inhalt</p>
              <ol className="flex flex-col gap-1">
                {legal.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded-md px-2 py-1.5 text-small break-words hyphens-auto text-blue-900 hov:bg-surface foc:outline-2 foc:outline-offset-2 foc:outline-blue"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="flex min-w-0 flex-col gap-10 lg:col-span-8">
            {legal.reviewNote ? (
              <p className="flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-small text-ink ring-1 ring-line">
                <Icon name="alert" className="mt-0.5 size-4 shrink-0" />
                {legal.reviewNote}
              </p>
            ) : null}
            {legal.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-titel`}
                className="scroll-mt-28"
              >
                <h2
                  id={`${section.id}-titel`}
                  className="mb-4 text-h3 break-words hyphens-auto text-blue-900"
                >
                  {section.title}
                </h2>
                <div className="flex flex-col gap-3 text-ink">
                  {section.content.map((item, i) =>
                    item.type === 'ul' ? (
                      <ul
                        key={i}
                        className="flex list-disc flex-col gap-1 pl-6 marker:text-blue-600"
                      >
                        {item.items.map((li) => (
                          <li key={li} className="break-words">
                            {li}
                          </li>
                        ))}
                      </ul>
                    ) : item.type === 'h3' ? (
                      <h3 key={i} className="mt-2 text-h4 break-words hyphens-auto text-blue-900">
                        {item.text}
                      </h3>
                    ) : (
                      <p key={i} className="break-words">
                        {item.text}
                      </p>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
