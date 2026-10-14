# Changelog

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
