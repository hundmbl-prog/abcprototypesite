import localFont from 'next/font/local'
import { Inter } from 'next/font/google'

export const clashDisplay = localFont({
  src: '../app/fonts/ClashDisplay-Variable.woff2',
  variable: '--font-clash',
  weight: '200 700',
  display: 'swap',
  preload: true,
})

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
