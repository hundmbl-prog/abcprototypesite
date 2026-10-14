# PROJECT RULES — ABC Mainz Website
These rules are mandatory. Follow them in every session, for every task. If a rule conflicts with a request, stop and ask me.

## 1. Before writing code
- Read this file and the README before starting any task.
- Restate the task in 2–3 lines and list the files you will create or change.
- If anything is unclear or missing (content, design choice, behaviour), ask me. Never guess.
- Check the existing code first. Reuse existing components, tokens, and utilities. Never create duplicates.

## 2. While writing code
- TypeScript strict mode. No `any`, no `@ts-ignore`, no `eslint-disable` unless I approve it.
- Use only the approved stack: Next.js 15, TypeScript, Tailwind, Payload CMS 3, Framer Motion, GSAP, Lenis, Embla, react-hook-form, zod, Resend. Ask before adding any other package.
- Pin exact package versions. Never use "latest".
- Use only design tokens for colours, spacing, radius, and fonts. No hard-coded hex values or random pixel sizes in components.
- Follow the colour pairing rules: 60–70% light, blue primary, red only for accents and the main CTA. Check text contrast (WCAG AA) for every new colour combination.
- Server components by default. Add "use client" only where interaction is needed.
- All images through next/image with width, height, alt text, and sizes.
- Every offer is a photo card using one of the defined card variants. Do not invent new card styles without asking.
- All visible text in German, with no placeholder text like "Lorem ipsum" in finished pages.
- Every animation respects prefers-reduced-motion.
- All content comes from the CMS. Never hard-code editable content in components.
- Secrets and email addresses only in .env, never in code. Never commit .env.
- Small, focused changes. Do not rewrite or delete working code unless the task requires it.

## 3. Forms and data
- Validate every form on both client and server with the same zod schema.
- Every form has: honeypot, rate limiting, loading state, success message, error message, and saves to the CMS.
- Submissions go to the address in CONTACT_EMAIL (sameeruddinshaik48@gmail.com).
- Test each form by actually submitting it and confirming the email arrives and the entry is saved.
- Never expose API keys, database URLs, or admin routes to the browser.

## 4. After every change (mandatory checklist)
Run all of these and fix every problem before saying a task is done:
1. pnpm lint — 0 errors, 0 warnings
2. pnpm tsc --noEmit — 0 errors
3. pnpm build — must succeed
4. pnpm dev — open every affected page; check that the browser console has no errors, warnings, or hydration errors
5. Check the page at 375px, 768px, 1280px, and 1920px widths
6. Check keyboard navigation and visible focus states
7. Check that the admin can still edit, preview, and publish the changed content
If any step fails, fix it and run the whole checklist again.

## 5. Testing
- Write Playwright tests for: navigation, every form, sliders, the admin publish flow, and the telc exam filter.
- Run all tests after every major step. Never delete or skip a failing test to make it pass; fix the cause.
- Run Lighthouse (target 95+) and axe on each page template before marking a page finished.

## 6. Reporting
- At the end of every task, report: what you changed, which files, checklist results, and anything left open.
- Never say "done" or "working" unless the full checklist passed. If something is not finished or you are unsure, say so clearly.
- Never claim you tested something you did not run.
- Keep a CHANGELOG.md entry for every completed step.

## 7. Safety
- Commit to git after every completed step with a clear message, so any mistake can be rolled back.
- Never run destructive commands (dropping the database, deleting folders, force-pushing) without asking me first.
- Never modify these rules unless I ask.