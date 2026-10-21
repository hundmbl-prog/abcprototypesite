import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import type { NewsItem } from '@/content/types'

/** Compact news strip: the latest three headlines with category – no photos. */
export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.slice(0, 3).map((item) => (
        <li key={item.id} data-reveal className="min-w-0">
          <Link
            href={`/news/${item.slug}`}
            className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-sm transition-[transform,box-shadow,border-color] duration-(--dur-slow) ease-out-expo hov:-translate-y-1 hov:border-blue-200 hov:shadow-md"
          >
            <span className="self-start rounded-pill bg-blue-900 px-3 py-1 text-caption font-semibold text-on-dark">
              {item.category}
            </span>
            <h3 className="text-h4 text-blue-900">{item.title}</h3>
            <span className="mt-auto inline-flex items-center gap-2 text-small font-semibold text-red-600">
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
