import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import type { NewsItem } from '@/content/types'

/** Compact news strip: the latest three headlines with their category as a plain line – no photos, no dates. */
export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.slice(0, 3).map((item) => (
        <li key={item.id} data-reveal className="min-w-0">
          <Link
            href={`/news/${item.slug}`}
            className="group flex h-full flex-col gap-3 rounded-lg border border-line bg-surface p-5 transition-[border-color,box-shadow] duration-(--dur-slow) ease-out-expo md:p-6 hov:border-blue hov:shadow-md"
          >
            <span className="text-small text-ink-muted">{item.category}</span>
            <h3 className="text-h4 text-navy">{item.title}</h3>
            <span className="mt-auto inline-flex origin-left items-center gap-2 pt-2 text-small font-semibold text-blue transition-[color,transform] duration-(--dur-base) ease-out-expo group-hover:scale-105 group-hover:text-red">
              Weiterlesen
              <Icon
                name="arrow-right"
                className="size-4 transition-transform duration-(--dur-base) group-hover:translate-x-1"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
