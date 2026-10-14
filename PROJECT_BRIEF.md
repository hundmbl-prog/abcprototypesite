You are a senior full-stack engineer and award-level UI designer. Build the new website for "Akademisches Bildungs-Center e.V. (ABC Mainz)", a non-profit education provider in Mainz. It must be production-quality, error-free, fully responsive, and look hand-crafted by a top agency. It must NOT look like a generic AI/template site.

## References
- Design/feature inspiration: https://bruedergrimm.net/ (structure and feel only; do not copy assets or text)
- Current content & sitemap: https://www.abc-mainz.de/ (carry over all pages and content, redesigned)

## Tech stack
- Next.js 15 (App Router) + TypeScript (strict) + Tailwind CSS
- Payload CMS 3 (runs inside Next.js) as the admin/CMS, with PostgreSQL (SQLite for local dev)
- Framer Motion + GSAP ScrollTrigger + Lenis (smooth scroll) for animation
- Embla Carousel for all sliders, react-hook-form + zod for forms
- Resend (or Nodemailer SMTP fallback) for email
- next/image for all images (AVIF/WebP, responsive sizes, blur placeholders)
- German is the primary language; structure i18n so English can be added later
- Use pnpm, ESLint, Prettier, and a .env.example with every variable documented

## Design system (build this first, as tokens in tailwind.config + CSS variables)
Colour ratio: 60–70% white/light neutrals, 20–30% blue (primary), 5–10% red (accent, used for urgency and CTAs only).
- Light surfaces: #FFFFFF, #F7F9FC, #EEF3FA
- Blue: navy #0B2A5B (dark sections, headings), primary #1D4ED8, soft #DBEAFE
- Red: #D62839 (CTA/accent), soft #FDE8EA
- Text: #0F172A on light, #FFFFFF / #CBD5E1 on dark
Contrast pairing rules (enforce WCAG AA and document them in /styleguide):
- On white/light bg → navy or slate text; primary blue solid buttons; red solid only for the single main CTA per section
- On navy bg → white text; white solid button with navy text, or red solid; ghost buttons with white border
- On soft-blue bg → navy text; navy solid buttons
- On red bg (use rarely, small banners only) → white text; white button with red text
Button variants (not all the same): solid, outline, ghost, pill with arrow icon that slides on hover, magnetic CTA (follows cursor slightly), text-link with animated underline. Each has hover, focus-visible, active, disabled, and loading states.
Vary shapes deliberately: mix rounded-2xl cards, sharp-edged editorial blocks, pill tags, asymmetric image masks, and bento-grid layouts. Avoid uniform identical card grids.
Typography: a distinctive display font for headings (e.g. "Clash Display" or "General Sans") plus "Inter" for body; fluid type with clamp().
Build a /styleguide page that shows every token, pairing, button, and card variant.

## Offer cards (required for EVERY offer section on every page)
Every offer, course, exam, project, and service is shown as a card with a photo. This applies to Angebote, Sprachkurse, Integrationskurse, Prüfungen, Bildungsangebote, Lernförderung, Projekte, and Pädagogische Angebote.
Each card contains:
- A photo (16:10 or 4:5, object-cover, lazy-loaded, blur placeholder) with a subtle zoom on hover
- A category tag/pill (e.g. "Kurs", "Prüfung", "Projekt")
- Title, a 1–2 line description, and key facts as small icons (level, duration, location, start date, price/free)
- A CTA ("Mehr erfahren" / "Jetzt anmelden") linking to the detail page
- Status badges where relevant ("Neu", "Plätze frei", "Ausgebucht" in red)
Card variants to rotate between sections, so pages don't look repetitive:
1. Image-top classic card with lift + shadow on hover
2. Full-bleed image card with gradient overlay and text on the image; the description slides up on hover
3. Horizontal card (image left, content right) for lists like exam dates or courses
4. Bento layout: one large featured card + smaller cards
5. Horizontal scroll/carousel row on mobile, grid on desktop
All cards are fully clickable (with an accessible link), keyboard-focusable, have a spotlight/tilt hover on desktop, and are editable in the admin (photo, text, tag, badge, link, order, visibility).
Where a section has many offers, add filter chips (e.g. by level A1–C1, location, online/in-person) with animated layout transitions.

## Interactivity (tasteful, performant, respects prefers-reduced-motion)
- Hero: full-screen image with a slow Ken Burns zoom (in/out), headline revealed word-by-word, scroll-linked zoom-out as the user scrolls
- Scroll-triggered reveals, staggered card entrances, parallax image layers
- Animated counters (e.g. "25+ Jahre", number of students, courses)
- Hover tilt/spotlight effect on cards, image hover zoom, cursor-aware highlights
- Sticky, shrinking header with mega-menu dropdowns (with small preview images) and a mobile full-screen menu
- Smooth page transitions, skeleton loaders, toast notifications

## Page standards (applies to ALL pages)
Every page must be:
- Valid: semantic HTML5, a single h1, a correct heading order, no console errors or warnings, no hydration errors, passes W3C validation and axe accessibility checks (WCAG 2.1 AA)
- Minimal: generous white space, clear hierarchy, short scannable text blocks, at most one primary CTA per section, no clutter or decorative noise
- Optimized: Lighthouse 95+ for performance, accessibility, best practices and SEO; LCP < 2.5s, CLS < 0.1, INP < 200ms; server components by default, client components only where interaction is needed; code-split animations; optimized fonts (next/font); static generation with on-demand revalidation when content changes in the admin
- Modern & interactive: every page has its own animated hero (image with subtle zoom or parallax), photo offer cards, and at least one interactive element (tabs, accordion, timeline, filter, slider, or counter). No dry text walls.
Shared page template: hero → intro → offer cards → details (tabs/accordion) → contact person card → CTA banner → footer. Pages may vary this order to fit their content.
Each page has unique SEO metadata, Open Graph image, and breadcrumbs. Include custom 404 and 500 pages in the same style.

## Pages (match the current sitemap)
Home, Sprachkurse (B1/B2 Prüfungsvorbereitung, BSK), Integrationskurse (Allgemeine, Alphabetisierung, Lern- und Sozialbegleitung), Prüfungen (Einbürgerungstest, telc Prüfungen), Bildungsangebote (Viona, Politische Bildungsarbeit), Bildungs- & Lernförderung, Projekte (each project as its own detail page plus an Archiv), Pädagogische Angebote (Familienhilfe, Erziehungsbeistand), Über uns (Mitgliedschaft, Jobs, Warum ABC, Machen Sie mit, Kontakt), Formulare (Beschwerdeformular, Bildung und Teilhabe), Presse, Fotogalerie (masonry grid + lightbox), Impressum, Datenschutz, Hausordnung. Legal pages stay clean and minimal with a sticky table of contents.

## Home page sections
1. Zoom hero with CTA buttons
2. "Unsere Angebote" as a bento grid of photo cards (Sprach- & Integrationskurse, Prüfungen, Nachhilfe, Soziale Projekte, Weiterbildungen, Pädagogische Angebote)
3. News section: a professional slideshow (autoplay, pause on hover, swipe, progress bar, thumbnails), each slide with photo, date, category tag, title, short description, and a link to a full news article page
4. Projects showcase: a cinematic slideshow (large image, project title, short description, partner logos, "Projekt ansehen" link), with drag/swipe and keyboard navigation
5. Counters / "Warum ABC"
6. Contact people cards (Ansprechpartner) with photos
7. Partner logo marquee
8. Locations (Mainz + Bad Kreuznach) with an embedded map and opening hours
9. Rich footer

## telc Prüfungen page
Keep the content of the current page, redesigned: exam levels as photo cards, a filterable exam-dates table (level, date, location, registration deadline, free seats), a fees section, a step-by-step "So melden Sie sich an" timeline, FAQ accordion, and a registration form. Exam dates are editable in the admin.

## Forms
Contact, telc registration, Beschwerdeformular, Bildung und Teilhabe, membership, job application (with file upload).
- Validate client- and server-side, add honeypot + rate limiting, show success/error states
- Send every submission to sameeruddinshaik48@gmail.com (put the recipient in the .env so it can be changed later), with a clean HTML email template
- Also save every submission in the CMS so admins can view and export it

## Admin dashboard (for non-technical staff)
Using Payload CMS at /admin:
- Every page and every section is editable: text, images, cards, buttons, slides, news, projects, team, exam dates, partners, footer, menu
- Block-based page builder so staff can add, reorder, and remove sections, and choose a card variant per section
- Live preview, draft → preview → publish workflow, version history, and scheduled publishing
- Roles: Admin, Editor; image upload with automatic resizing, focal-point cropping, and required alt-text fields
- A simple German-language dashboard with shortcuts ("Neue News", "Neues Angebot", "Prüfungstermin hinzufügen")

## Quality & delivery
- Seed the database with realistic German content from the current site, using placeholder images (not hotlinked Wix images)
- SEO: metadata, Open Graph, sitemap.xml, robots.txt, JSON-LD (EducationalOrganization, Course, Event for exams)
- No TypeScript or ESLint errors; `pnpm build` must pass
- Run Lighthouse and axe on every page template and fix all issues
- Docker setup so it can be hosted anywhere later (Vercel, VPS, etc.)
- A README in simple language: how to run locally, how to edit content, how to deploy

Work step by step: 1) plan and show me the architecture and the design tokens, 2) build the design system, card variants + /styleguide, 3) layout + home page, 4) remaining pages, 5) CMS + admin, 6) forms + email, 7) test, fix every error, and run the build. After each step, run the app and check for errors before moving on.