import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import type { NewsItem } from '@/content/types'

/**
 * The latest three news as an editorial block, no boxes: the first as the lead story (large photo,
 * category, headline, teaser), the other two stacked beside it with a wide photo. The whole item
 * is the link; on hover the photo zooms slightly and the headline turns red.
 */
export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <ul className="grid gap-12 lg:grid-cols-12 lg:grid-rows-2 lg:gap-x-12 lg:gap-y-10">
      {items.slice(0, 3).map((item, index) => {
        const lead = index === 0
        return (
          <li
            key={item.id}
            className={cn('min-w-0', lead ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5')}
          >
            <Link href={`/news/${item.slug}`} className="group flex flex-col gap-4">
              <div
                className={cn(
                  'shrink-0 overflow-hidden rounded-xl',
                  lead ? 'aspect-3/2 w-full' : 'aspect-video w-full',
                )}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  sizes={
                    lead ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 40vw, 100vw'
                  }
                  placeholder={item.image.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={item.image.blurDataURL}
                  className="size-full object-cover transition-transform duration-(--dur-slower) ease-out-expo motion-safe:group-hover:scale-105"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <span className="text-small font-semibold text-blue">{item.category}</span>
                <h3
                  className={cn(
                    'text-navy transition-colors duration-(--dur-base) ease-out-expo group-hover:text-red',
                    lead ? 'text-h2' : 'text-h4',
                  )}
                >
                  {item.title}
                </h3>
                {lead ? (
                  <p className="max-w-prose text-lead text-ink-muted">{item.excerpt}</p>
                ) : null}
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
