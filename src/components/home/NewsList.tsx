import Link from 'next/link'
import type { NewsItem } from '@/content/types'

/** The latest three headlines as type in one narrow column – the whole headline is the link. No photos, no dates. */
export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <ul className="flex max-w-narrow flex-col gap-10">
      {items.slice(0, 3).map((item) => (
        <li key={item.id} className="min-w-0">
          <Link href={`/news/${item.slug}`} className="group flex flex-col gap-2">
            <span className="text-small text-ink-muted">{item.category}</span>
            <h3 className="text-h3 text-navy transition-colors duration-(--dur-base) ease-out-expo group-hover:text-red">
              {item.title}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  )
}
