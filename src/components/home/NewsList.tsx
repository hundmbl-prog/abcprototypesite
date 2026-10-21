import Link from 'next/link'
import type { NewsItem } from '@/content/types'

/** The three latest news as a simple list: topic and headline, one link per row. */
export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.slice(0, 3).map((item) => (
        <li key={item.id}>
          <Link
            href={`/news/${item.slug}`}
            className="group grid grid-cols-1 gap-1 py-5 md:grid-cols-[12rem_1fr_auto] md:items-baseline md:gap-6"
          >
            <span className="text-small font-semibold text-red-600">{item.category}</span>
            <span className="text-h4 font-semibold text-navy transition-colors duration-(--dur-base) group-hover:text-blue">
              {item.title}
            </span>
            <span aria-hidden className="hidden text-blue md:block">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
