# Changelog

## Step 3g – Uniform offer cards, red buttons, no hover sweep (2026-10-15)

- **Offer cards:** all six use the same soft logo-blue gradient. New `simple` mode on `CardClassic`: only category, title and a two-line description, with no facts or status badges.
- **Red interactive buttons:** the card button is logo-red; on hover it deepens and glows and the arrow slides, and it presses in on click. The "Anrufen" buttons in the location and contact cards use the same red style.
- **Hover effects:** the light-sweep "sheen" and the tilt/spotlight effect are removed everywhere (the utility and the `SpotlightTilt` component are deleted); cards only lift gently.
- **Locations:** the cards use the same gradient as the offer cards.
- **Checks:** lint, typecheck and build pass; 112 tests at 4 widths; Lighthouse mobile 93 / desktop 97.

## Step 3f – Partner logos, joined project cards, calm backgrounds (2026-10-15)

- **Partner section:** real logos instead of names. 11 logos from the current site's media, trimmed and optimised: telc, BAMF, Bundesagentur für Arbeit, Aktion Mensch, BMAS/ESF, Deutsche Fernsehlotterie, Der Paritätische, CERTQUA, InSL, SWL, rückenwind³. Shown on white cards in a slow marquee that pauses on hover, with a gentle lift and zoom; each logo has a descriptive alt text.
- **Projects:** photo and text are now one attached card (no gap); a thin accent line runs along the join, and the text lines slide in one after another when a slide becomes active.
- **Backgrounds:** sections alternate between a soft logo-blue tint (`blue-50`) and white. All dots, colour fields and section gradients are removed, and the `Aurora`/`DotGrid` decoration is deleted.
- **Cards carry the gradients:** offers (tint into white), news slide, stats, people and locations.
- **Animation:** section headings rise in as they scroll into view; the photo in "Warum ABC" reveals with a soft wipe.
- **Accessibility fix:** the scroll reveal now uses opacity only. Before, `visibility: hidden` removed headings below the fold from screen readers until they were scrolled to.
- **Tests:** 112 at 4 widths; the partner check now looks for the logo images.

## Step 3e – Official logo, logo-based palette, compact locations (2026-10-15)

- **Official logo** (supplied as WebP, transparent background):
  - One-line wordmark in the header.
  - Full logo with the house in the footer.
  - Wordmark in the light mobile menu.
  - Favicon and Apple touch icon made from the house mark.
  - The original file is kept in `src/assets/brand/`.
- **Palette rebuilt from the logo:** blue `#1E4B87` (= `blue-600`) and red `#A51111` (= `red-500`). All tints and shades are mixed from these two, so every background is a tint or gradient of the logo colours. Neutrals (`surface-2/3`, `line`) are slightly logo-blue tinted, and shadows and the red glow use the logo colours. All text pairings were rechecked for AA: white only on 500 and darker, navy on 50–300.
- **More professional and calmer:** decorative colour fields toned down; stats background is a soft logo-blue to logo-red gradient; light mobile menu; footer watermark removed.
- **Compact locations:** each card shows name, live status, address with copy button, a one-line hours summary, and Anrufen / E-Mail / Route. The week table, branches and opt-in map sit behind an "Öffnungszeiten & Karte" toggle that expands smoothly.
- **Fix:** the header CTA could push the menu button off-screen at 375 px; it is now hidden reliably on phones.
- **Lighthouse:** mobile 99 (LCP 2.0 s), desktop 96; accessibility, best practices and SEO 100.

## Step 3d – Light, formal and more interactive (2026-10-14)

Feedback: too much dark blue for a corporate site, the locations section didn't work, and it should be subtle, stylish and formal, not bold, but more interactive.

- **No dark sections:** only the hero photo is dark (unchanged). Stats, partners and footer are now light; section titles are calm navy everywhere, and accent colours appear only in eyebrows, chips and thin lines.
- **Offer cards:** soft tints (`blue-50/100`, `red-50`) with navy text instead of saturated blocks. New light pill button (`pill-light`: white with a blue arrow) for section actions.
- **New interactions:**
  - Animated offer filter: shared sliding pill, cards glide into place, count announced to screen readers.
  - Live opening status per location in Europe/Berlin time ("Jetzt geöffnet · bis 16:00 Uhr" / "Geschlossen · öffnet …"), refreshed every minute.
  - Weekly hours table with today highlighted.
  - Copy-address button with a toast.
  - Route-planning link.
  - Thin reading-progress line and a back-to-top button.
  - All of it respects reduced motion.
- **Locations redesigned:** the tabs are replaced by two location cards side by side, each with status, actions, hours, branches and an opt-in map.
- **Contact cards:** thick colour frames replaced by a thin accent line.
- **Footer:** light, with a brand gradient line, navigation, a compact contact block and the legal row.
- **New code:** `lib/opening-hours.ts`, `ui/Toast`, `motion/ScrollExtras`, `home/OffersFilter`, `home/LocationCards`; `schedule` and `kind` added to locations; filters added to the offers content.
- **Tests:** 112 at 4 widths, including fixed-clock tests for open/closed status, filter, toast and back-to-top.

## Step 3c – Colour worlds per section, no text on photos (2026-10-14)

Feedback: use different shades of the brand colours with cards matching their section; text boxes on photos are hard to read. The hero stays unchanged.

- **New shade scales:** `blue-50…950` and `red-50…800`, built from the brand colours. Rule: white text only on 500 and darker, navy text on 50–200. Every pairing was checked for AA, and axe passes at all 4 widths.
- **Each section has its own colour world, with cards in matching shades:**
  - Angebote (cool blue): 6 cards whose text areas run from `blue-500` to `blue-900` and end on red, with photos fading into each card colour.
  - News (warm red): red chips, dates, progress bar and active thumbnail.
  - Warum ABC (deep blue band): glowing colour fields; four stat cards in different blue/red gradients; the photo moves into its own frame.
  - Projekte (sky blue): text sits beside the photo on a white card, with an accent shade per project.
  - Ansprechpartner (blush): photo on top, text below; coloured frame per person; names are never hyphenated.
  - Partner (dark navy band): bright white partner cards.
  - Standorte (light blue).
  - Footer (`blue-950`).
- **No more text over photos:** projects, people and stats were changed; the hero is unchanged, as requested.
- **Components:** `CardClassic` gets an optional `shade`; `OfferCards` gets `shades` to cycle; `SectionHeader` gets `accent` (blue/red); new `Aurora` presets and a `DotGrid` texture.

## Step 3b – Home page redesign after feedback (2026-10-14)

Feedback: the page was too blue, too uniform, mixed card styles within a section, and didn't feel like bruedergrimm.net.

- **Floating glass header:** a rounded, frosted bar inset from the edges, the same over the hero and while scrolling; it shrinks on scroll; the active section gets a red underline. The mega-menu is now a glass panel below the bar.
- **Hero:** the photo keeps its natural colours, with a new neutral `shade` colour instead of navy and shading only where the text sits. Glass "Willkommen" badge, red CTA with a glow plus a glass button. On desktop: a frosted "Schnellzugriff" panel with a mirror sheen and glass highlight chips.
- **Each section has its own look, with uniform elements inside:**
  1. Angebote: light grey with 6 identical photo cards.
  2. News: white with soft colour fields; floating slideshow and glass thumbnails.
  3. Warum ABC: full-width photo band with glass stat cards.
  4. Projekte: light gradient; large photos with frosted info panels.
  5. Ansprechpartner: portraits with glass name plates and Anrufen / E-Mail buttons.
  6. Partner: white logo cards in the marquee.
  7. Standorte: floating cards.
  8. Footer: neutral dark slate instead of navy.
- **Section buttons:** every section's main action uses the same pill-with-arrow button.
- **New tokens and utilities:** `glass`, `glass-strong`, `glass-dark`, `sheen` (mirror reflection on hover), `shadow-float`, `shadow-glow-red`, `tone-ink`, colour `shade`.
- **Tests:** the header test now checks the floating bar shrinking instead of the old transparent-to-solid behaviour.

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
