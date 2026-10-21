import Image from 'next/image'
import type { HomePage } from '@/content'

/** Partner and funder logos as a calm strip: greyscale, in colour on hover. No animation. */
export function PartnerMarquee({ content }: { content: HomePage['partners'] }) {
  return (
    <section
      aria-labelledby="partner-titel"
      className="border-t border-line bg-surface py-section-sm"
    >
      <div className="container-page flex flex-col gap-8">
        <h2 id="partner-titel" className="font-sans text-h4 text-navy">
          {content.title}
        </h2>
        <ul className="grid grid-cols-2 items-center gap-x-10 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {content.items.map((partner) => (
            <li key={partner.id} className="flex h-16 items-center justify-center">
              {partner.logo ? (
                <Image
                  src={partner.logo.src}
                  alt={partner.logo.alt}
                  width={partner.logo.width}
                  height={partner.logo.height}
                  sizes="160px"
                  className="max-h-14 w-auto max-w-full object-contain grayscale transition-[filter] duration-(--dur-base) hover:grayscale-0"
                />
              ) : (
                <span className="text-center text-small font-semibold text-ink-muted">
                  {partner.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
