# ABC Mainz – Website

New website for the Akademisches Bildungs-Center e.V. (ABC Mainz).
Built with Next.js 15, TypeScript, and Tailwind CSS 4. The Payload CMS will be added in Step 5.

## Run it on your computer

You need **Node.js 20.9 or newer**. pnpm is pinned in `package.json`; if `pnpm` is not
installed, use `npx pnpm@10.34.7` in place of `pnpm` below.

```bash
pnpm install          # install everything (one time)
pnpm dev              # start the dev server → http://localhost:3000
```

Open **http://localhost:3000** for the home page and **http://localhost:3000/styleguide** for the design system.

## Checks (run before every commit)

```bash
pnpm lint             # ESLint, 0 warnings allowed
pnpm typecheck        # TypeScript
pnpm build            # production build
pnpm test:e2e         # Playwright tests (stop pnpm dev first – build and dev share the .next folder) at 375 / 768 / 1280 / 1920 px (first time: pnpm exec playwright install chromium)
```

## Where things are

| Folder                          | What it contains                                                                                   |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| `src/styles/tokens.css`         | **All** design tokens (colours, fonts, spacing, radius, shadows, motion). Change values only here. |
| `src/components/ui`             | Buttons, tags, badges, filter chips, icons                                                         |
| `src/components/cards`          | The 5 offer-card variants (`OfferCards` picks one per section)                                     |
| `src/components/forms`          | Form fields with label, hint and error message                                                     |
| `src/components/sections`       | Section layouts (section, header, image + text, CTA banner, editorial block)                       |
| `src/app/(frontend)/styleguide` | The /styleguide page                                                                               |
| `tests/e2e`                     | Playwright tests                                                                                   |

## Rules

See `CLAUDE.md` (project rules) and `PROJECT_BRIEF.md` (full brief).
