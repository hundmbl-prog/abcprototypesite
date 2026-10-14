# Changelog

## Step 3 – Layout and home page (2026-10-14)

- **Header:** sticky; transparent over the hero, then solid and shorter after scrolling. Desktop mega-menu (from 1280 px) with link descriptions and a preview image that follows the hovered link; keyboard support (Enter/Escape, focus return, click outside closes). Full-screen mobile menu with accordion, focus trap, Escape and scroll lock.
- **Footer:** about text, three link columns, both locations with opening hours, legal links, and a decorative SVG watermark.
- **Motion:** Lenis smooth scrolling synced with GSAP ScrollTrigger; batched scroll reveals (`data-reveal`, content stays visible without JS); page transitions on client navigation only (first load is not animated, so LCP isn't delayed). Everything is off with reduced motion.
- **Home page, 9 sections:**
  1. Zoom hero: Ken Burns, CSS word-by-word headline, scroll-linked zoom-out.
  2. Offers bento with 6 photo cards; BentoGrid now supports 6.
  3. News slideshow: autoplay with progress bar, pause on hover/focus, pause button, swipe, thumbnails.
  4. Cinematic projects slideshow: drag, arrow keys, partners.
  5. Counters and "Warum ABC".
  6. Contact people.
  7. Partner marquee.
  8. Locations with tabs and a consent-based OpenStreetMap.
  9. Footer.
- **Content layer:** `src/content/` is typed like the planned Payload collections. News, projects, addresses and opening hours come from abc-mainz.de. Invented entries are marked `placeholder: true`.
- **Images:** 23 placeholder photos from the current site's own media, optimised and stored locally.
- **Error pages:** styled 404 (via a catch-all route that becomes the CMS page route in Step 5) and a 500 error page.
- **Packages added (pinned):** framer-motion 13.4.6, gsap 3.15.0, lenis 1.3.26, embla-carousel-autoplay 8.6.0.
- **Tests:** Playwright suite for home, navigation, sliders, tabs, map consent and 404; 88 tests at 4 widths.
- **Fixes:** German long words no longer overflow; sr-only labels in the scroll strip no longer widen the page; Inter is limited to the latin subset (removes the preload warning).

## Step 2 – Design system, card variants and /styleguide (2026-10-14)

- Next.js 15.4.11 project with TypeScript (strict), Tailwind CSS 4.3.3, ESLint 9, Prettier, Playwright + axe. All versions pinned exactly.
- Design tokens in `src/styles/tokens.css` (Tailwind defaults switched off): colours, fluid type scale, 4 px spacing, fluid section spacing, radius, navy-tinted shadows, motion, breakpoints.
- Fonts: Clash Display (self-hosted, ITF Free Font License) and Inter via `next/font`.
- Contrast fixes compared with the brief: `red-strong` (#B01E2E) for red text on light/soft-red backgrounds, `control` (#7C8AA0) for form borders (≥ 3:1), red text on navy not allowed.
- Components: 9 button variants (solid primary/navy/CTA/white/white-red, outline, ghost, pill with sliding arrow, text link) with hover, focus, active, disabled and loading states, plus a magnetic CTA wrapper. Tags, status badges, filter chips, icons.
- Form fields: input, textarea, select, checkbox, radio, file upload, with label, hint, error and disabled states.
- 5 offer-card variants: classic, full-bleed overlay, horizontal, bento, carousel-on-mobile rail (Embla 8.6.0). Spotlight/tilt hover on desktop, the whole card is one link, and reduced motion is respected.
- Section layouts: Section (6 tones), SectionHeader, SplitMedia (3 asymmetric masks), EditorialBlock, CtaBanner.
- /styleguide page (noindex). Contrast ratios are computed from tokens.css at build time.
- Playwright tests for the style guide at 4 widths: console clean, axe WCAG 2.1 AA, headings, overflow, keyboard focus, filter chips, carousel.
- The project moved to `~/Desktop/abc-mainz-site` because the backtick in the old folder name broke pnpm scripts.
