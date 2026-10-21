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
      <section
        aria-labelledby="seiten-titel"
        className="tone-navy pt-36 pb-12 [--focus-ring:var(--color-on-dark)] md:pb-16"
      >
        <div className="container-page flex flex-col gap-5">
          <Breadcrumbs items={crumbs} siteUrl={siteUrl} />
          <h1 id="seiten-titel" className="text-h1">
            {page.hero.title}
          </h1>
          {legal.intro ? (
            <p className="max-w-2xl text-lead text-on-dark-muted">{legal.intro}</p>
          ) : null}
        </div>
      </section>
      <div className="bg-surface py-section-sm">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12">
          <nav aria-label="Inhaltsverzeichnis" className="lg:col-span-4">
            <div className="flex flex-col gap-3 rounded-2xl bg-blue-50 p-5 ring-1 ring-blue-100 lg:sticky lg:top-28 lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto">
              <p className="text-caption font-semibold tracking-widest text-red-600 uppercase">
                Inhalt
              </p>
              <ol className="flex flex-col gap-1">
                {legal.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded-md px-2 py-1.5 text-small break-words hyphens-auto text-navy hov:bg-surface foc:outline-2 foc:outline-offset-2 foc:outline-blue"
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
                  className="mb-4 text-h3 break-words hyphens-auto text-navy"
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
                      <h3 key={i} className="mt-2 text-h4 break-words hyphens-auto text-navy">
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
