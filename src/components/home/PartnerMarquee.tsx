import Image from 'next/image'
import { SectionHeader } from '@/components/sections/SectionHeader'
import type { HomePage } from '@/content'

/** Partner logos on white cards, moving slowly. Pauses on hover; static grid with reduced motion. */
export function PartnerMarquee({ content }: { content: HomePage['partners'] }) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-stretch gap-5 pr-5 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0"
    >
      {content.items.map((partner) => (
        <li
          key={partner.id}
          className="group/logo grid h-32 w-64 shrink-0 place-items-center rounded-2xl bg-surface px-7 shadow-sm ring-1 ring-line transition-[transform,box-shadow] duration-(--dur-slow) ease-out-expo hover:-translate-y-1 hover:shadow-md"
        >
          {partner.logo ? (
            <Image
              src={partner.logo.src}
              alt={hidden ? '' : partner.logo.alt}
              width={partner.logo.width}
              height={partner.logo.height}
              sizes="224px"
              className="max-h-20 w-auto max-w-full object-contain opacity-90 transition-[opacity,transform] duration-(--dur-slow) group-hover/logo:scale-105 group-hover/logo:opacity-100"
            />
          ) : (
            <span className="text-center font-semibold text-ink-muted">{partner.name}</span>
          )}
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-labelledby="partner-titel" className="overflow-hidden bg-blue-50 py-section-sm">
      <div className="container-page">
        <SectionHeader
          id="partner-titel"
          eyebrow={content.eyebrow}
          title={content.title}
          align="center"
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
