import Image from 'next/image'
import { SectionHeader } from '@/components/sections/SectionHeader'
import type { HomePage } from '@/content'

/**
 * Partner logos moving slowly across the white coda – plain logos, no tiles. Pauses on hover;
 * static, wrapped row with reduced motion. Multiply blending hides the white boxes of logos
 * that have no transparency.
 */
export function PartnerMarquee({ content }: { content: HomePage['partners'] }) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:pr-0"
    >
      {content.items.map((partner) => (
        <li key={partner.id} className="grid h-20 w-44 shrink-0 place-items-center">
          {partner.logo ? (
            <Image
              src={partner.logo.src}
              alt={hidden ? '' : partner.logo.alt}
              width={partner.logo.width}
              height={partner.logo.height}
              sizes="176px"
              className="max-h-14 w-auto max-w-full object-contain mix-blend-multiply"
            />
          ) : (
            <span className="text-center font-semibold text-ink-muted">{partner.name}</span>
          )}
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-labelledby="partner-titel" className="overflow-hidden bg-surface py-section">
      <div className="container-page">
        <SectionHeader
          id="partner-titel"
          eyebrow={content.eyebrow}
          title={content.title}
          align="center"
          mark
          reveal={false}
        />
      </div>
      <div className="group flex [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-3 motion-reduce:[mask-image:none]">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
          {row(false)}
          <div className="contents motion-reduce:hidden">{row(true)}</div>
        </div>
      </div>
    </section>
  )
}
