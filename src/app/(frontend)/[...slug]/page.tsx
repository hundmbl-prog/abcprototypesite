import { notFound } from 'next/navigation'

/**
 * Catch-all for paths without a page yet: shows the styled 404 inside the site layout.
 * In Step 5 this route renders CMS pages by slug and only falls back to notFound().
 */
export default function CatchAllPage() {
  notFound()
}
