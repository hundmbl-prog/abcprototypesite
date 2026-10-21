import { getImageProps } from 'next/image'
import Link from 'next/link'
import type { HeroContent } from '@/content/types'
import { HeroVideo } from './HeroVideo'

/**
 * Home hero: bright classroom video (poster image under reduced motion). Headline, one
 * sentence and two text links sit directly on the video in white, over a soft navy
 * shading in the bottom-left corner only – no box, no button shapes.
 */
export function HomeHero({ hero }: { hero: HeroContent }) {
  const {
    props: { srcSet, sizes, src, alt, width, height },
  } = getImageProps({
    src: hero.image.src,
    alt: hero.image.alt,
    width: hero.image.width,
    height: hero.image.height,
    sizes: '100vw',
    quality: 70,
    priority: true,
  })
  return (
    <section
      id="start"
      aria-labelledby="hero-titel"
      className="relative isolate flex h-[70svh] min-h-[34rem] items-end overflow-hidden bg-navy md:h-[88svh]"
    >
      {/* Poster: shown until the video plays, and instead of it with reduced motion */}
      {/* eslint-disable-next-line @next/next/no-img-element -- optimised via getImageProps */}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        fetchPriority="high"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <HeroVideo poster={src} />
      {/* Soft navy shading only behind the text (bottom left); the rest of the video stays bright */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-navy/60 via-navy/15 to-transparent md:bg-linear-to-tr md:from-navy/55 md:via-navy/10 md:to-transparent"
      />

      <div className="relative container-wide pb-12 text-on-dark md:pb-20">
        <div className="max-w-[40rem] [text-shadow:0_1px_12px_rgb(20_50_90/0.35)]">
          <h1 id="hero-titel" className="text-display">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-prose text-lead">{hero.text}</p>
          <p className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 text-lead font-semibold">
            <Link
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-2 border-b-2 border-on-dark pb-1 hov:border-red-300"
            >
              {hero.primaryCta.label}
              <span
                aria-hidden
                className="transition-transform duration-(--dur-base) group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="group inline-flex items-center gap-2 pb-1 hov:underline"
            >
              {hero.secondaryCta.label}
              <span
                aria-hidden
                className="transition-transform duration-(--dur-base) group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
