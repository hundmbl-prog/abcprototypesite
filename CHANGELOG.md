# Changelog

## Colour sheet again, dark footer, interactive buttons, flat news photos (2026-10-21)

Requested on 21.10.2026.

- **Hero:** the "Willkommen beim ABC e.V." badge and the "Beratung anfragen" link are removed. The video, headline, sentence, "Kurs finden" and the scroll arrow remain.
- **Offer cards 1–3:** the small boxes (A1–C1, A1–C1, Vor Ort) are removed.
- **About section:** the link reads "Mehr Informationen" instead of "Mehr über uns".
- **Colours:** exactly the colour sheet again:
  - ABC Blue #1C4A83, Navy #123054, ABC Red #990111
  - Blue tint #E9EDF3, Blue wash #F4F6F9, Lines #DCE1EC
  - Ink #242222, Text #484343
  - (The lighter blue tried earlier today is reverted.)
- **Footer:** dark navy with all text white. Links get an ABC Blue background and shift slightly on hover, with no underline.
- **Buttons:**
  - Every button zooms slightly on hover.
  - Hover colours always contrast with the background: red buttons turn white with red text and a red ring (also on navy boxes and the footer); blue and navy buttons turn red.
  - Text links turn red and grow slightly, with no underline. Links in cards grow slightly and the arrow moves.
- **News:**
  - Card photos on /news and "Weitere News" are wide and flat (2:1).
  - The article photo is flatter (5:2) in a narrower column.

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: 376 tests, 2 parallel browsers – 364 passed, 8 skipped (desktop- or mobile-only).
  - 4 desktop tests on /projekte and /fotogalerie timed out because the local server was running at the same time. Rerun: all 4 passed.
- Not uploaded to Netlify.

## Back to the live design + video hero, fewer buttons, no repetition, lighter blue (2026-10-21)

Decision from 21.10.2026: the redesign (251c97a) is not used. The live design (b3663a0) is kept, with these changes only. The redesign remains in the git history.

**Hero**

- The same frame as live, with the classroom video from abc-mainz.de instead of the photo (poster image underneath).
  - The video loads only after the page has loaded, never with reduced motion, and pauses off-screen.
- One button ("Kurs finden"). "Beratung anfragen" is now a text link.
- The three stat boxes on the right are removed (their facts appear further down).

**No repeated information on the same page**

- Home:
  - "1997" appears only once, in the About text: it was removed from the hero sentence, the milestones, the "Warum ABC" label, the points and the footer.
  - "telc Hochschulkompetenzzentrum" appears only in the news.
  - "Standorte" appears only once.
  - The milestone boxes are removed.
- The six offer cards have their own link texts instead of six times "Mehr erfahren". So do the three course cards on Kurse.
- Über uns: "1997" appears only in the intro.
- Kurse and Integrationskurse: the repeated "kostenloser Einstufungstest" note and the duplicate closing text are removed, and so is the duplicate childcare item.

**Fewer buttons**

- Section links (Alle Angebote, Mehr über uns, Alle News, section actions) and the secondary closing link are text links.
- Card links are plain text with an arrow instead of red pills with a circle.
- Each area keeps one main button.

**Lighter blue, brighter page**

- Large blue areas (heroes, footer, closing card, headings) use ABC Blue #1C4A83 instead of navy #123054.
- The mid blue is lighter: #2B5FA6.
- The light sections are brighter: #F6F9FD / #EDF2FA, lines #DFE6F1.

**Also kept from the last days**

- The large photos are served as 2400 px web copies (originals unchanged).
- The Netlify settings are unchanged.

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: 376 tests at 4 widths – 368 passed, 8 skipped (desktop- or mobile-only), including axe and the new "1997 once" and video tests.
  - The full run used 2 parallel browsers, because 4 overloaded image processing on this Mac. With 4, eight desktop tests on photo-heavy pages timed out; on their own they pass in 8 s.
  - The tests answer hero-video requests with an empty response.
- Not uploaded to Netlify (requested).

## Redesign – bright, warm, less template-like (2026-10-21)

Brief from the management review: too dark, too much navy, looks AI-made because of repetition and template patterns.

Decisions from 21.10.2026:

- The brief's colours replace the colour sheet. The closing band uses ABC Blue #1C4A83 from the sheet in combination.
- Slogan: "Bildung, die Perspektiven schafft".
- Hero video: taken from abc-mainz.de. ABC confirmed it may be used outside Wix.
- The Netlify toolbar is switched off by the user in Netlify.
- Home offers have no photos.
- The hero has no text box and no button shape.

**Colours**

- Real 50–900 scales: primary blue #2563C9 (hover #1D4FA6), tint #EEF4FC / #F7FAFE, navy #14325A for text only, red #C1121F.
- No more large navy areas: the subpage heroes, the footer, info boxes, course headers, the fees panel and form notices are light.
- Red is used once per page: the main button in the closing band. Other buttons are blue, slightly rounded (10 px), with no pills and no arrow circles.

**Home page**

- Hero: muted 11 s classroom loop from abc-mainz.de (480p on mobile, 720p otherwise) with the poster image underneath.
  - The video loads only after the page and pauses when off-screen. With reduced motion it is not loaded at all.
  - Headline, one sentence and two text links sit directly on the video, over a soft navy shading at the bottom left.
- Order: hero → offers (text grid, each with its own link text) → "Wer wir sind" (team photo, the only "Seit 1997") → news as a plain list → partner logos (greyscale, colour on hover) → footer.
- Removed:
  - the welcome pill, the stat boxes and the scroll arrow
  - the "Warum ABC" counters and the 1997/2021/Heute timeline
  - the numbered icon cards, the chips and category pills
  - the house shapes and the "Gemeinsam mehr erreichen" headline

**Less repetition, fewer templates**

- No small labels above headings, and no pill buttons beside section headings (plain text links instead).
- "1997" appears at most once in the visible home text, and "Mehr erfahren" not at all.
- Rewritten:
  - the five "Bereit für …?" closing headings
  - "Ein Ort zum Ankommen" (home) and the Über uns menu text
  - "seit 1997" in the footer
- Photo tiles (one photo, title, one line, the whole tile clickable) replace the nested card designs on Kurse, Prüfungen, Projekte and News.
- Steps, features, columns, contacts, press, links and FAQ are simple lists separated by lines, with no card inside a card.

**Subpages**

- Compact light hero: breadcrumb (visible again, as in the brief), heading readable immediately, one sentence, key facts as a text line and one text link. Main pages show a photo beside it, with no badge and no frame.
- The closing section of every page is a full-width ABC Blue band with white text, phone, department e-mail and the red main button.
- Photo cards no longer look blurry: the large 24-megapixel originals are now served as 2400 px web copies (originals unchanged in the repository).

**Typography and motion**

- Clash Display only for h1 and h2, with looser letter-spacing and a little extra word spacing. Inter for everything else.
- Removed: fade-in on scroll, Ken Burns zoom, counters, the scroll-linked hero effect and the "magnetic" button. Only subtle hover states remain.

**Footer**

- Light blue tint and compact: logo with one line, three link columns, and both locations with address, opening hours, phone and e-mail.

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: 364 tests at 4 widths – 356 passed, 8 skipped (desktop- or mobile-only), including axe on all pages.
  - In the full run, 4 /kurse tests at 1280 px timed out while the emptied image cache generated new photo sizes. Rerun with a warm cache: passed.
  - The tests answer hero-video requests with an empty response, so four parallel browsers don't overload the local test server.
- New tests:
  - "1997" at most once, and no "Mehr erfahren"
  - hero video attributes and poster
  - offer link texts are all different
  - breadcrumb visible
- Lighthouse, home page, mobile: performance 90–92 (LCP 3.4–3.6 s), accessibility 96, best practices 100, SEO 100.
- Before/after screenshots at 1440 and 390 px of /, /kurse, /ueber-uns and /pruefungen were reviewed.

## Step 4 (part 10) – No decorative lines, strict white/wash order, photos for news and projects (2026-10-19)

Decisions from 19.10.2026: remove all decorative red lines; section backgrounds only white ↔ Blue wash; photos on the news page, in articles and in "weitere Projekte"; keep the home figures 1.200+ and 60+.

**Decorative lines removed**

- the red line under the active menu item
- the red bars on top of cards, number boxes and info boxes
- the short line before every section label (labels stay red text)
- the red-to-blue reading-progress line at the top of the screen
- the red side bar on the legal review note and the red line on the location cards

**Section backgrounds**

- Every content page: navy hero → white / Blue wash strictly alternating, including the closing contact section → navy footer.
- There are no navy bands or light-pink sections in between anymore.
- Home page:
  - skyline → Blue wash (offers) → white (about us) → Blue wash (news) → white (Warum ABC, now a light section) → Blue wash (partners) → navy footer

**Photos**

- /news, "Weitere News" under each article and "Das könnte Sie auch interessieren" on every project page now show photo cards again.
- The home news strip stays text-only.

**Less repetition**

- Home "Über uns": the "1997 gegründet in Mainz" badge on the photo was removed. 1997 is already in the text and the timeline.

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: 368 tests at 4 widths – 360 passed, 8 skipped (desktop- or mobile-only), including axe on all pages.
- Screenshots checked: home, news, a project page and Integrationskurse.

## Step 4 (part 9) – Previous home hero with the skyline, one colour order, moderate logo use (2026-10-19)

Requested on 19.10.2026.

**Home hero**

- The previous hero frame is back, unchanged except for the photo: welcome badge, headline, two buttons, three key figures and the scroll arrow.
- The Mainz skyline photo is shown sharper:
  - no slow zoom (it enlarged the photo by 12 %)
  - image quality 90 instead of 75
  - lighter navy shading only where the text sits
- The source file is 1774 × 887 px. For a fully sharp result on large and high-resolution screens it should be at least 2560 px wide.

**One colour order on every page**

- navy hero → white / Blue wash alternating → at most one navy band (the first steps or column block) → light pink closing section with the navy CTA card → navy footer
- Home page:
  - skyline → Blue wash (offers) → white (about us) → light pink (news) → navy (Warum ABC) → white (partners) → navy footer
- Light pink is added as an approved colour: ABC Red mixed with white – #FAF2F3, #F4E3E5, #EBCDD0. It is used only for light backgrounds and soft accents.

**Moderate use of the ABC house**

- The house appears only in the page hero and the footer, plus the offers section and the Warum ABC band on the home page.
- It is about 40 % smaller than before.
- It no longer appears in the navy bands, the info panels or the closing card.

**Shorter heroes**

- One sentence, one button and at most three key facts on every content page.

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: 368 tests at 4 widths – 360 passed, 8 skipped (desktop- or mobile-only), including axe on all pages.

## Step 4 (part 8) – Brand colours, Mainz skyline hero, corporate finish (2026-10-19)

Requested on 19.10.2026, with the ABC colour sheet and a Mainz skyline photo.

**Brand colours only**

- All colour tokens now use the colour sheet, plus white:
  - ABC Blue #1C4A83, ABC Red #990111, Navy #123054
  - Ink #242222, Text #484343
  - Blue tint #E9EDF3, Blue wash #F4F6F9, Lines #DCE1EC
- Navy and ABC Red are the main colours. There are no extra in-between shades or green status colours anymore.
- Shadows are navy-based, and the coloured glow under buttons was removed.
- Red buttons turn navy on hover.

**No transparency, no "AI look"**

- Header, menu dropdown and all former glass panels are solid.
- Dark cards and chips use solid ABC Blue on navy.
- Removed: the cursor light, the photo tilt, the blurred colour blobs, the red offset frame around hero photos, the red line under every hero and the gradient line in the footer.
- Removed on the home page: the text fade while scrolling and the "magnetic" button.

**Home hero**

- New photo: the Mainz skyline with the cathedral along the Rhine.
- Navy covers only the text side, so the skyline stays visible.
- Two solid buttons and a white key-figures bar along the bottom edge.

**Breadcrumbs**

- The visible "Start › Kurse" trail was removed. Search engines still get the path as structured data.

**ABC logo as brand element**

- The ABC house now appears as a solid tone-on-tone shape: ABC Blue on navy, or Blue tint on light backgrounds.
- It is used in all heroes, the blue sections, the closing cards, the "Warum ABC" band, the footer and the home offers section.

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: 368 tests at 4 widths – 360 passed, 8 skipped (desktop- or mobile-only), including axe (contrast) on all pages.
- Breadcrumb tests replaced: no visible trail, and the structured data is still present.

## Step 4 (part 7) – Icon offer cards, small-photo heroes, interactive details (2026-10-16)

Requested on 16.10.2026: no photos in the home offer cards; main pages may show a small hero photo; everything more designed and interactive.

**Home**

- The six offer cards are now numbered icon cards (01–06) without photos. Each has:
  - a blue icon tile that turns red and tilts on hover
  - a large faint icon as a visual
  - category, facts and an arrow button

**Heroes**

- Main pages (Kurse, Prüfungen, Bildungsangebote, Projekte, Über uns): blue hero with a small photo beside the text.
  - The photo sits in a frame with a red offset outline and a white badge showing the first key fact.
  - It leans slightly towards the cursor and zooms slowly.
- All other pages keep the compact blue hero.
- Both heroes have a soft light that follows the cursor. The fact chips lift on hover.

**Interactive details everywhere**

- A soft cursor light on all cards: icon cards, feature, column and step cards, links, news and statistics.
- One shared pointer listener for the whole site:
  - only for mouse and pen, never on touch screens
  - the tilt switches off with reduced motion

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: 368 tests at 4 widths – 360 passed, 8 skipped (desktop- or mobile-only), including axe on all pages.
- Tests updated: home offers use icons (no photos); a hero photo appears only on the five main pages.

## Step 4 (part 6) – Less is more: fewer photos, shorter pages, project landing pages (2026-10-16)

Requested on 16.10.2026. Decisions:

- Photo heroes only on Home, Kurse and Prüfungen.
- Locations only in the footer and on the Kontakt page.
- White logo directly on the blue footer.

**Home (hero + 5 sections)**

- The "Schnellzugriff" box in the hero, the projects slideshow and the locations section were removed.
- News is now a compact strip: three headlines with category, no photos.
- "Warum ABC" is a compact blue band: four counters and the key points as chips, no photo.
- Shorter texts throughout.

**All pages**

- Compact blue hero instead of a photo, except on Home, Kurse and Prüfungen. It has the title, one sentence, the key facts as icon chips, and the ABC house as a faint brand mark.
- At most 6 sections per page:
  - Integrationskurse: the support sections are merged into one icon section.
  - telc: from 11 to 6 sections. The exam-day rules moved into the FAQ, and the exam cards are covered by the level tabs.
  - Über uns: membership and jobs are merged with their forms.
  - Bildungsangebote, Pädagogik, Formulare: the cards that only jumped to sections further down were removed.
- Fewer photos:
  - Secondary sections show icons and blue data panels with the logo mark instead.
  - News and related cards use the new photo-free icon card.
  - Photos stay only for the main offers, the Kurse and Prüfungen cards, project pages, articles and the gallery.
- Section intros removed where they repeated the heading; hero sentences and long paragraphs shortened.
- The closing card shows only the call to action, phone and department e-mail; addresses are in the footer.

**Projekte**

- The overview shows one photo card per project.
- Each project has its own page `/projekte/<projekt>`:
  - key facts in the hero
  - one detail section (photo, text, lists, funding, contact)
  - three related projects as icon cards
- Menu links point to the project pages.

**Top bar and footer**

- The red top-bar button is now "Kontakt"; on phones it shows as an icon.
- The open or current menu item is highlighted in dark blue with white text.
- Footer: white logo without a box. Both locations are listed with address, opening hours, phone and e-mail.

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: 372 tests at 4 widths – 364 passed, 8 skipped (desktop- or mobile-only), including axe on all pages.
- New tests:
  - at most 6 sections per page, and photo heroes only on Kurse and Prüfungen
  - project landing pages
  - compact news
  - Kontakt button and dark highlight in the top bar
  - footer locations
- The tests for the counters and the back-to-top button now wait for hydration, which fixes a timing race on mobile.

## Step 4 (part 5) – Spotlight photos shown in full (2026-10-16)

Requested on 16.10.2026: no large photo with the text on top; the whole photo should be visible, beside or below the text, and not too big.

- The large-photo layout with the text panel on top was removed on all pages.
- Every spotlight (projects, Über uns, Bildungsangebote, Pädagogik) now shows its photo uncropped at its natural shape:
  - on desktop, beside the text in the narrower column
  - on mobile, above the text
- The key facts stay as blue tiles under the photo, and the photo side keeps alternating left/right.

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: 404 tests at 4 widths – 398 passed, 6 skipped (desktop- or mobile-only).
- Screenshots of /projekte at 1440 and 390 px.

## Step 4 (part 4) – Blue footer, combined closing card, more varied sections (2026-10-15)

Decisions from 15.10.2026: the footer becomes blue; texts are shortened and repeats merged without losing facts; text boxes get mixed styles per page.

**Footer**

- Brand blue (navy) with white text, the logo on a white plate, and a red-to-blue line on top.

**Less repetition**

- On every page, the separate contact box and the closing call to action are now one deep-blue closing card:
  - call to action with buttons
  - phone and department e-mail
  - address and opening hours
- `#kontakt` links still lead to this card. A "Beratung anfragen" button that pointed to the card itself now opens an e-mail to the department.
- Kontakt page: the closing contact box was removed, because the locations above already show the same details.
- Berufssprachkurse: the section with a single BAMF link was removed.
- Shorter texts on Über uns (history, Warum ABC, Machen Sie mit) and Projekte (introduction, Menschen stärken Menschen). No facts were removed.

**More variety**

- Section backgrounds rotate white / light blue.
  - Step and column sections are deep blue, with glass cards, white text and red numbers.
  - The deep-blue sections are never directly below the hero and never two in a row.
- Information notes are now coloured cards (white on blue sections, blue on light sections) with a large info icon.
- Feature cards show a red number (01, 02 …).
- Spotlights alternate between two layouts:
  - photo beside the text, with the key facts as blue tiles
  - large photo with a white text panel on top
- Lists inside spotlights are white cards with a red top line.
- Funding notes are blue cards.

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: 404 tests at 4 widths – 398 passed, 6 skipped (desktop- or mobile-only), including axe on all pages.
- Section screenshots at 1440 and 390 px (BSK, telc, Über uns, Projekte).

## Step 4 (part 3) – Compact main navigation (2026-10-15)

Requested on 15.10.2026: no large menu panel; a click on a top item opens its overview page, and hovering shows its sub-pages.

- Each top item (Kurse, Prüfungen, Bildung & Förderung, Projekte, Über uns) is now a link to its overview page.
- On hover, a small dropdown directly below the item lists its sub-pages with a short description (for example under Kurse: B1 & B2, BSK, Integrationskurse).
- Keyboard: the small arrow next to each item opens the dropdown; Escape closes it and returns focus to the arrow.
- The large mega menu with preview image was removed. The mobile menu is unchanged.

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: home tests at 4 widths – 106 passed, 6 skipped (desktop- or mobile-only); menu-link and page tests 12 passed.
- New tests: top item links to its overview, hover opens only its own dropdown, keyboard open and Escape.

## Step 4 (part 2) – Remaining pages: Pädagogische Angebote, Über uns, Kontakt, Formulare, News, Presse, Fotogalerie, legal pages (2026-10-15)

Decisions from 15.10.2026:

- Über uns is one page plus a separate Kontakt page.
- Forms are built now and connected in Step 6.
- Impressum and Datenschutz are carried over unchanged and marked for review.
- The gallery uses web copies of the Drive photos.

**Pages (all "same style" – cards that jump to detail sections where it fits)**

- `/paedagogische-angebote`: Familienhilfe and Erziehungsbeistand as cards and sections, the way to support in 4 steps, and contact via sozialarbeit@.
- `/ueber-uns`:
  - history, then cards leading to the sections Warum ABC, Mitgliedschaft, Machen Sie mit and Jobs
  - membership form, the three job areas and the application form with PDF upload
- `/ueber-uns/kontakt`: both locations (live status, opening hours, map only after consent), contacts by topic from the old site (integration@, bsk@, pruefungen@, sprachkurse@, nachhilfe@, viona@, sozialarbeit@, badkreuznach@) and the contact form.
- `/formulare`: the complaint form (anonymous possible) and the Bildung und Teilhabe enquiry.
- `/news` and 6 article pages:
  - a category filter on the overview
  - older items in the past tense with the year in the text, and no separate dates
  - the home slider links to the article pages
- `/presse`: the press review from the old site (outlet, date, headline).
- `/fotogalerie`:
  - 28 photos in 4 albums with a filter, a masonry grid and a lightbox (native dialog, arrow keys, Escape)
  - 18 new photos are 2400 px web copies of the Drive originals, which stay untouched
- `/impressum`, `/datenschutz`, `/hausordnung`:
  - a clean legal layout with a sticky table of contents
  - texts word for word from the old site, with visible review notes

**Forms**

- One definition per form (Kontakt, Beschwerde, Bildung und Teilhabe, Mitgliedschaft, Bewerbung). The browser and the server build the same zod schema from it.
- Every form has a honeypot, a rate limit, a loading state and honest status messages.
- The PDF check (at most 5 MB) runs on both sides, and the server-action body limit is 6 MB.
- Delivery by e-mail and storage in the CMS follow in Step 6.

**Not carried over on purpose**

- The donation bank details: the old site shows two different accounts, so donations are handled via "Schreiben Sie uns".
- Job salaries and start dates (from 2023), and a Bad Kreuznach address that differs from the current one.
- The empty or test news posts.

**Review before launch**

- Impressum: DDG instead of TMG; the EU dispute-resolution platform was shut down; postal code; contact details and representatives.
- Datenschutz:
  - IONOS hosting and analytics, Facebook/Instagram, Google Fonts and Google Maps are no longer used
  - map consent, the new hosting and the forms must be added

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: 400 tests at 4 widths – 382 passed and 4 skipped in the full run.
  - 14 timed out at the start of a width, while the image cache (cleared for disk space) resized the 24-megapixel originals for the first time.
  - Re-run with a warm cache: all 14 passed.
- New tests:
  - all 20 pages (structure, console, axe, overflow)
  - cards → sections, menu links
  - every form: empty submit, honeypot, valid entry, anonymous complaint, PDF check, rate limit
  - gallery filter and lightbox, news filter, legal table of contents
- Lighthouse:
  - /ueber-uns: mobile 86, desktop 98.
  - /fotogalerie: mobile 89, desktop 98.
  - Accessibility, best practices and SEO 100.
  - Mobile LCP is about 4 s – open for the performance step.

**Other changes**

- Card grids with 2 or 4 cards fill whole rows.
- The card filter can also filter by category.
- Long words in legal headings now wrap.
- Navigation and footer point to the new sections.
- The telc, BSK and Integrationskurse contact boxes use the department addresses (pruefungen@, bsk@, integration@).

## Step 4 (part 1b) – New structure: Kurse, Prüfungen, Projekte, Bildungsangebote, Lernförderung (2026-10-15)

Decisions from 15.10.2026: Kurse gets an overview plus 3 pages; the other course pages are merged in. Prüfungen keeps the ABC format, and telc becomes one page. Projekte becomes one page with all current projects.

**Kurse (new menu item, layout modelled on bruedergrimm.net)**

- `/kurse`: three photo cards with key facts – B1 & B2, BSK, Integrationskurse – plus advantages, requirements and registration, steps, FAQ, contact and a call to action.
- `/kurse/b1-b2` "Prüfung und Prüfungsvorbereitung":
  - three feature cards, plus the "Kursinhalte" and "Für wen?" lists
  - course models (FLEX, SMART, INTENSIV, Einzelunterricht)
  - telc B1 and B2 shown as level tabs
- `/kurse/bsk`: the same structure, plus a section on courses for companies and official BAMF information.
- `/kurse/integrationskurse` uses new course-catalogue blocks:
  - one block per course type: general integration course with 6 modules + orientation course, youth integration course, integration course with literacy
  - each block shows hours, target group, level chips, course contents and a module plan
  - also on the page: Lern- und Sozialbegleitung, child supervision, the DTZ and "Leben in Deutschland" exams, requirements and registration, official links and FAQ
- Removed pages, now merged: A1–A2, C1–C2, C1 Hochschule, Schnupperkurs, the separate Jugend-/Alpha-/Lern- und Sozialbegleitung pages, and Kurstermine.

**Prüfungen**

- The overview now shows only telc and the Einbürgerungstest.
- telc is a single page. The six per-level pages are replaced by level tabs (arrow keys, Home/End), and the exam cards jump straight to their level (`#pruefung-<level>`).

**Projekte (one page)**

- Order: intro "Warum Projekte?", nine project cards (photo + short text + "Mehr erfahren"), then one detail section per project, then "Mitmachen" and a call to action.
- Each detail section has facts, lists, funding, contact and a link back to the overview.
- Projects: Straßenfotografie, Natur erleben, STARTklar, Wir sind Vielfalt, Medien.Machen.Meinung, Integrationsgeschichten, ABC UPLOADED, Menschen stärken Menschen, Mainzer Jugendplattform.
- The home slideshow now uses the same data (Brücken AGs was archived on the old site and no longer appears there).

**Bildungsangebote and Lernförderung (one page each)**

- `/bildungsangebote`: Viona and Politische Bildungsarbeit as cards leading to detail sections, plus a Viona FAQ (Bildungsgutschein).
- `/lernfoerderung`: offer, all subjects as tabs, consultation and trial lesson, Bildung und Teilhabe, and the partner InSL e.V.

**Navigation**

- The menu, footer and home links now point to the new pages and sections.
- No link to a removed page remains.

**Fixes**

- Same-page section links written with the path (e.g. `/projekte#startklar`, the "Mehr erfahren" buttons, menu links) now scroll exactly to their section.
  - Before, Lenis undid the jump, or – after scrolling with the scrollbar – started from a stale position and stopped partway.
  - The scroll now syncs with the real position and scrolls to the section's absolute position.
- Links from other pages now land on their section; before, every new page started at the top.
- Two cards in a classic grid now fill two wide columns.
- Long fact values in the hero now hyphenate on phones.

**Checks**

- lint 0 / tsc 0 / build OK.
- Playwright: 272 passed, 4 skipped, 0 failed at 375 / 768 / 1280 / 1920.
- New tests:
  - each card leads to an existing section, and a card click scrolls there
  - links from other pages land on the right section
  - the home slideshow links point to existing project sections
  - the course blocks and module plans render
  - telc level tabs (link, card click, arrow keys) and the Lernförderung subject tabs work
- Header navigation tests now use the new "Kurse" menu.
- Lighthouse:
  - /kurse/integrationskurse: mobile 87, desktop 100.
  - /projekte: mobile 87, desktop 97.
  - Accessibility, best practices and SEO 100.
  - Mobile LCP is about 4 s – open for the performance step.

**Content**

- Taken from the current abc-mainz.de pages.
- No prices, and no outdated dates or programmes.
- Coordinators and project e-mail addresses are as published on the old site.
- External links were checked on 15.10.2026: only reachable pages are linked (esf.de WIR, wirsindvielfalt.de, bpb.de, plus the existing BAMF, telc and g.a.s.t. links).

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
