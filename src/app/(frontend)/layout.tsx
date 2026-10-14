import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
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
      <body>{children}</body>
    </html>
  )
}
