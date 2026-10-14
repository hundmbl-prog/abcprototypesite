import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { CardImageData } from '@/components/cards/types'

export type MediaMask = 'organic' | 'arch' | 'sharp'

const masks: Record<MediaMask, string> = {
  /* asymmetric corners */
  organic: 'rounded-tl-2xl rounded-tr-sm rounded-br-2xl rounded-bl-sm',
  /* rounded top, flat bottom */
  arch: 'rounded-t-[50cqw] rounded-b-none',
  /* editorial, no rounding */
  sharp: 'rounded-none',
}

/** Image and text side by side with an asymmetric image mask. */
export function SplitMedia({
  image,
  mask = 'organic',
  reverse = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  children,
  className,
}: {
  image: CardImageData
  mask?: MediaMask
  reverse?: boolean
  sizes?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('grid items-center gap-10 lg:grid-cols-12 lg:gap-16', className)}>
      <div className={cn('@container lg:col-span-6', reverse && 'lg:order-2')}>
        <div
          className={cn(
            'overflow-hidden',
            mask === 'arch' ? 'aspect-4/5' : 'aspect-5/4',
            masks[mask],
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            placeholder={image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={image.blurDataURL}
            className="size-full object-cover"
          />
        </div>
      </div>
      <div className={cn('flex flex-col gap-6 lg:col-span-6', reverse && 'lg:order-1')}>
        {children}
      </div>
    </div>
  )
}
