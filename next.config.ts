import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

/**
 * The dev server writes to ".next-dev", production builds to ".next".
 * This way `pnpm dev` and `pnpm build` can run at the same time without breaking each other.
 */
export default function config(phase: string): NextConfig {
  return {
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
    reactStrictMode: true,
    poweredByHeader: false,
    // job applications may carry a PDF of up to 5 MB
    experimental: { serverActions: { bodySizeLimit: '6mb' } },
    images: {
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
    },
  }
}
