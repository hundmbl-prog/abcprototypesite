import type { HomePage } from '@/content'

/** Endless row of partner names. Pauses on hover; static and wrapped with reduced motion. */
export function PartnerMarquee({ content }: { content: HomePage['partners'] }) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-12 pr-12 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4 motion-reduce:pr-0"
    >
      {content.items.map((partner) => (
        <li
          key={partner.id}
          className="flex items-center gap-12 font-display text-h4 font-semibold whitespace-nowrap text-ink-muted"
        >
          {partner.name}
          <span aria-hidden className="size-2 rotate-45 bg-red" />
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-labelledby="partner-titel" className="overflow-hidden tone-light-2 py-section-sm">
      <div className="container-page mb-8 flex flex-col gap-2">
        <p className="text-small font-semibold tracking-widest text-blue uppercase">
          {content.eyebrow}
        </p>
        <h2 id="partner-titel" className="text-h3 text-navy">
          {content.title}
        </h2>
      </div>
      <div className="group flex [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
          {row(false)}
          <div className="contents motion-reduce:hidden">{row(true)}</div>
        </div>
      </div>
    </section>
  )
}
