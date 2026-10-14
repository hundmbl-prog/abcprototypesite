import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkipLink } from '@/components/layout/SkipLink'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import { clashDisplay, inter } from '@/lib/fonts'
import { cn } from '@/lib/cn'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Akademisches Bildungs-Center e.V. | ABC Mainz',
    template: '%s | ABC Mainz',
  },
  description:
    'Akademisches Bildungs-Center e.V. – gemeinnütziger Bildungsträger in Mainz und Bad Kreuznach.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={cn(clashDisplay.variable, inter.variable)}>
      <body>
        <SmoothScroll>
          <SkipLink />
          <SiteHeader />
          <main id="inhalt" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <ScrollReveal />
        </SmoothScroll>
      </body>
    </html>
  )
}
