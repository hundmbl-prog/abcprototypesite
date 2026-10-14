import { DotGrid } from '@/components/ui/Aurora'
import type { HomePage } from '@/content'

/** Dark navy band with bright white partner cards. Pauses on hover; static with reduced motion. */
export function PartnerMarquee({ content }: { content: HomePage['partners'] }) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-stretch gap-5 pr-5 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0"
    >
      {content.items.map((partner) => (
        <li
          key={partner.id}
          className="sheen relative grid h-24 min-w-56 place-items-center overflow-hidden rounded-xl bg-surface px-8 text-center shadow-md ring-1 ring-line"
        >
          <span className="font-display text-h4 leading-tight font-semibold text-ink-muted">
            {partner.name}
          </span>
        </li>
      ))}
    </ul>
  )
  return (
    <section
      aria-labelledby="partner-titel"
      className="relative isolate overflow-hidden bg-linear-to-b from-blue-50 to-surface py-section-sm"
    >
      <DotGrid />
      <div className="container-page mb-12 flex flex-col items-center gap-3 text-center">
        <p className="rounded-pill bg-blue-100 px-4 py-2 text-small font-semibold tracking-widest text-blue-800 uppercase">
          {content.eyebrow}
        </p>
        <h2 id="partner-titel" className="text-h2 text-blue-900">
          {content.title}
        </h2>
      </div>
      <div className="group flex [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] py-4 motion-reduce:[mask-image:none]">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
          {row(false)}
          <div className="contents motion-reduce:hidden">{row(true)}</div>
        </div>
      </div>
    </section>
  )
}
