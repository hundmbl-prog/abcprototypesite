# Changelog

## Step 4 (part 1) – Sprachkurse, Integrationskurse, Prüfungen, Einbürgerungstest, telc (2026-10-15)

**22 new pages**, all prerendered as static HTML:

- Sprachkurse: overview plus A1 & A2, B1 & B2 Prüfungsvorbereitung, C1 & C2, C1 Hochschule, Berufssprachkurse (BSK) and the kostenloser Online-Schnupperkurs.
- Integrationskurse: overview plus Allgemeine, Jugendintegrationskurse, Alphabetisierung, Lern- und Sozialbegleitung and Kurstermine.
- Prüfungen: overview plus Einbürgerungstest (taken on site at ABC).
- telc Prüfungen: main page plus one sub-page per exam – A1, A2, B1, B2, C1 and C1 Hochschule.

**Content**

- Text is carried over from the current abc-mainz.de pages.
- No prices are shown yet (decision 15.10.2026), and outdated course dates from 2022–2024 were not carried over.
- Exam facts and durations were checked on 15.10.2026 against the official sources: telc.net (product pages, Prüfungsregularien gültig ab 15.04.2025), bamf.de, g.a.s.t., EinbTestV and StAG.
- Corrections to the old site:
  - The DTZ is now run by g.a.s.t. on behalf of the BAMF, not by telc.
  - "Hartz IV" is now "Bürgergeld".
- External links (telc, BAMF, g.a.s.t., BMI) were checked on 15.10.2026; all reachable. The mock-exam ZIPs, PDFs and MP3 return 206 to a range request, which is normal. The BMI page answers simple tools with HTTP 400 (cookie check) and was confirmed in a browser.

**telc page**

- Exam levels as photo cards with an animated level filter.
- A filterable exam-dates table:
  - filters for exam, location and "nur mit freien Plätzen"
  - status for few seats, fully booked and registration closed
  - turns into cards on phones
  - "Anmelden" hands the exam and date over to the form
  - no dates exist yet, so it shows an honest empty state ("Neue Termine folgen in Kürze") – no invented dates
- A fees section: exam fees "auf Anfrage", plus the official telc service fees (40 € each).
- A six-step registration timeline, the exam-day rules, an FAQ accordion (with FAQPage JSON-LD) and official links.
- A registration form:
  - react-hook-form with one shared zod schema, checked in the browser and in a server action
  - honeypot and rate limit (5 attempts per 10 minutes per address)
  - loading, error and status messages
  - e-mail delivery and saving to the CMS follow in Step 6; until then, submitting says honestly that nothing was sent and asks visitors to register by phone or e-mail

**Exam sub-pages**

- Facts in the hero.
- An interactive exam structure: a time bar sized by minutes, the written parts and the oral part.
- Exam-day rules, the official free mock exam, related exams and a call to action.

**Page system**

- Content pages are built from blocks (intro, cards, columns, steps, tabs, exam structure, FAQ, links, contact, CTA, exam dates, fees, registration) – the same model the Payload CMS will use in Step 5.
- Shared parts: a page hero with Ken Burns zoom, word-by-word title and scroll zoom-out; breadcrumbs with BreadcrumbList JSON-LD; Course JSON-LD; unique SEO title, description and Open Graph image per page.
- Card variants rotate between sections: bento (Sprachkurse), overlay (Integrationskurse), horizontal (Prüfungen), rail with filter (telc), classic (exam sub-pages).
- Each section has its own `[[...slug]]` route. The global catch-all stays on demand, so links to pages that do not exist yet do not cause prefetch errors.

**Other changes**

- New packages, pinned: react-hook-form 7.88.0 and zod 4.6.5 (both in the approved stack). No resolver package – a small resolver uses the shared schema.
- Photos: five more Drive originals are linked in unchanged (DSC00462, DSC00466, DSC00473, DSC00474, DSC03442).
- New icons: download, book, award, pen, mic, ear, mail, phone, id-card and child.
- Styleguide: a new "Prüfungstermine" section with clearly marked example data (dates relative to today), used to test the exam filter.

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: 280 tests at 4 widths (new: tests/e2e/pages.spec.ts).
  - Every new page is checked for console errors, failed requests, one h1 and heading order, breadcrumbs, horizontal overflow, meta description and axe (WCAG 2.1 AA).
  - Also covered: menu links, tabs (keyboard), FAQ, card filter, the exam-dates filter, the form (validation, retake option, date hand-over, server check, rate limit).
  - Full run: 266 passed, 4 skipped, 10 timed out. All 10 timeouts were at the start of the run, while the image cache was empty and the 24-megapixel originals were being resized for the first time; re-run with a warm cache, all 10 passed.
- Lighthouse:
  - telc: mobile 89, desktop 96.
  - Sprachkurse: mobile 88, desktop 99.
  - Accessibility, best practices and SEO 100.
  - Mobile LCP is 3.8–4.0 s, above the 2.5 s target – to be fixed in the performance step together with the home page.

## Step 3n – Uniform stat boxes, dark blue badges (2026-10-15)

- **Warum ABC:** all four stat boxes share one background (white into soft logo-blue).
- **Standorte:** the status badges "Geschlossen · öffnet …" and "Termine nach Vereinbarung" are dark blue with white text (a light-red dot marks "closed"); "Jetzt geöffnet" stays green.
- **Offer cards:** the category labels (KURSE, PRÜFUNG …) are dark blue with white text – new `solid` tone on `Tag`.
- **Checks:** 136 tests at 4 widths pass; accessibility checks (axe) pass, white on blue-900 meets WCAG AA.

## Step 3m – Final home page: previous design, matching photos (2026-10-15)

- **Back to the approved design (Step 3k):** offer cards are again a photo with a white info box below; the bento grid is removed. Sections alternate plain white and soft logo-blue again; the dot and grid patterns and the dark navy band are removed.
- **Photos that match the card text:** Sprach- & Integrationskurse – ABC teacher in front of the class (own photo); Prüfungen – the telc examination centre sign (own photo); Nachhilfe – girl learning with a teacher; Soziale Projekte – project group with their street photos; Weiterbildungen – ABC talk in front of an audience; Pädagogische Angebote – counselling conversation. All 70 Drive originals stay unchanged in `../drive-photos-2026/`; the four unused ones were removed from the site.
- **Kept from Step 3l:** counters can no longer get stuck at 0; "Warum ABC" icons all blue, top lines red.
- **Projekte:** photo and info box are one light card with rounded corners; the box is tinted very softly by the same photo, with a larger title and text. (Fixes the square corners from Step 3l.)
- **Tests:** 136 at 4 widths, including the counter regression and photo-topic checks.

## Step 3l – Modern offer bento with real ABC photos, fixed counters, joined project cards (2026-10-15)

- **Real photos:** all 70 photos from the shared Drive folder "Photos 2026" are downloaded unchanged to `../drive-photos-2026/` (871 MB). Six of them are used at full original size (6000 × 4000) in `src/assets/photos/`; Next.js serves visitors automatically resized AVIF/WebP versions.
- **Offers:** new bento grid (one large feature card, two small, three wide). Full-bleed photo, frosted navy info panel, index number, red arrow button. On hover or keyboard focus the photo zooms, the description opens, the arrow turns and a red line runs along the bottom; on touch screens the description is always visible.
- **Warum ABC:** counters can no longer get stuck at 0 (fast scrolling past them now still finishes the count). All icons are logo blue, all top lines red, numbers red.
- **Projekte:** photo and info panel are now one card. The panel uses the same photo, heavily blurred and darkened, so its colours always match the image. Bigger title and text; the section is a dark navy "stage".
- **Backgrounds:** dot pattern (Angebote, Warum ABC), fine grid (Über uns, Standorte), dark stage with soft light (Projekte). On dark sections the section label is a light red.
- **Tests:** 131 at 4 widths, including hover/focus reveal and a counter regression test. Lighthouse mobile 93, desktop 94–95; accessibility, best practices and SEO 100.

## Step 3k – Final home page polish and new "Über uns" section (2026-10-15)

- **Angebote:** filter chips removed. Cards are now a photo with a solid white info box overlapping its lower edge; on hover the photo zooms and the box lifts. One overlay link covers photo and box. Cards contrast clearly with the blue section, and the gradient is very subtle and fully opaque.
- **Über uns (new):** founding story from the current site, a team photo with a "1997" badge, three milestones (1997 founding · 2021 telc Hochschulkompetenzzentrum · today 5 locations) and a red "Mehr über uns" button.
- **News:** thumbnails and progress bar removed. One compact control pill (‹ 01 / 06 ›) with a small pause icon inside, required for auto-advancing content (WCAG 2.2.2). Each new slide's photo zooms out softly and the text lines slide in.
- **Warum ABC:** all numbers in logo red; card tint, icon and accent line alternate between logo blue and logo red.
- **Projekte:** large photo with a small, solid info box attached to its corner (below the photo, slightly overlapping, on phones). Red controls and button.
- **Standorte:** both cards share one distinct look – soft logo-blue tint, red accent line, faint logo-house watermark – on the white section. E-mail, route, toggle and map buttons are red.
- **Red buttons:** new `pill-red` button for all section actions; the mobile "Menü" button is red. The unused `pill-light` variant is removed.
- **Order:** Hero · Angebote · Über uns · News · Warum ABC · Projekte · Standorte · Partner, alternating soft blue and white.
- **Checks:** 128 tests at 4 widths; Lighthouse mobile 91 / desktop 91 (performance), accessibility, best practices and SEO 100.

## Step 3j – Back to the previous home page, contact people removed (2026-10-15)

- Step 3i (Kursfinder, four-step timeline, contact band) reverted at the user's request (commit `7a6675c`). It is still in the git history and can be restored any time.
- **Section "Ansprechpartner" removed:** the component, its content, the `Person` type and the four placeholder portrait photos are deleted.
- **Backgrounds:** the sections still alternate soft logo-blue and white (Angebote · News · Warum ABC · Projekte · Partner · Standorte). The checklist box in "Warum ABC" is now white so it stands out from its blue section.
- **Checks:** 124 tests at 4 widths; Lighthouse mobile 93, desktop 90; accessibility, best practices and SEO 100.

## Step 3h – Red section labels, uniform stats, no dates, autoplay projects (2026-10-15)

- **Section labels:** the small label with the line at the top of every section ("— UNSERE ANGEBOTE" etc.) is now logo-red. The `accent` option on `SectionHeader` is removed.
- **Stats:** all four stat boxes share the same look, including "5 Standorte"; only the icon differs.
- **News:** dates are removed from the slides.
- **Projects:** the slideshow now plays automatically (6.5 s per project). The active line fills with progress; there is a pause/play button, and it pauses while hovered or while keyboard focus is on it. No autoplay with reduced motion. The live announcement is off while it runs and polite while it is paused.
- **Tooling:** the dev server writes to `.next-dev`, the production build to `.next`, so `pnpm dev` and `pnpm build` can no longer break each other (this caused a false 500 on the 404 page during testing).
- **Tests:** 124 at 4 widths, including autoplay advance and pause (fake clock), no autoplay with reduced motion, and no news dates.
- **Lighthouse:** mobile 100 (LCP 1.9 s), desktop 92 (measured while the dev server was running).

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
