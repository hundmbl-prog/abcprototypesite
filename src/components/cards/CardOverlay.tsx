import { cn } from '@/lib/cn'
import { CardCta, CardFacts, CardImage, CardMeta, CardTitle, cardFocus } from './parts'
import type { HeadingLevel, OfferCardData } from './types'

type CardOverlayProps = {
  card: OfferCardData
  headingLevel?: HeadingLevel
  sizes?: string
  /** featured = large bento tile, tile = fills its grid cell, default = 4:5 portrait */
  size?: 'default' | 'featured' | 'tile'
  preview?: 'hover'
  className?: string
}

/**
 * Variant 2 – full-bleed photo with a navy gradient; text sits on the image.
 * On desktop the description slides up on hover/focus; on touch devices it is always visible.
 */
export function CardOverlay({
  card,
  headingLevel = 'h3',
  sizes = '(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw',
  size = 'default',
  preview,
  className,
}: CardOverlayProps) {
  return (
    <article
      data-preview={preview}
      className={cn(
        'group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-2xl bg-shade text-on-dark shadow-md',
        size === 'default' && 'aspect-4/5',
        size === 'featured' && 'min-h-120 lg:min-h-full',
        size === 'tile' && 'min-h-72',
        cardFocus,
        className,
      )}
    >
      <div className="absolute inset-0 -z-10">
        <CardImage image={card.image} sizes={sizes} />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-shade/90 via-shade/50 to-shade/0 transition-opacity duration-(--dur-slow) group-hov:via-shade/60"
      />
      <div className={cn('flex flex-col gap-3', size === 'featured' ? 'p-8 lg:p-10' : 'p-6')}>
        <CardMeta card={card} tagTone="image" />
        <CardTitle
          card={card}
          as={headingLevel}
          className={size === 'featured' ? 'text-h2' : 'text-h3'}
        />
        <div
          className={cn(
            'grid transition-[grid-template-rows,opacity] duration-(--dur-slow) ease-out-expo',
            'grid-rows-[1fr] opacity-100',
            'fine-pointer:grid-rows-[0fr] fine-pointer:opacity-0 fine-pointer:group-has-[a:focus-visible]:grid-rows-[1fr] fine-pointer:group-has-[a:focus-visible]:opacity-100 fine-pointer:group-hov:grid-rows-[1fr] fine-pointer:group-hov:opacity-100',
          )}
        >
          <div className="flex min-h-0 flex-col gap-3 overflow-hidden">
            <p
              className={cn(
                'text-on-dark-muted',
                size === 'featured' ? 'text-lead' : 'line-clamp-2',
              )}
            >
              {card.description}
            </p>
            <CardFacts facts={card.facts} tone="dark" max={3} />
          </div>
        </div>
        <CardCta label={card.ctaLabel ?? 'Mehr erfahren'} tone="dark" className="pt-1" />
      </div>
    </article>
  )
}
