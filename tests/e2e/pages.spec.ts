import { expect, test, type Page } from '@playwright/test'
import {
  expectHeadingOrder,
  expectNoAxeViolations,
  scrollThrough,
  waitForReveals,
  watchProblems,
} from './helpers'

// The hero video is not needed for these checks; streaming it to four parallel browsers
// would only slow the single local test server down.
test.beforeEach(async ({ page }) => {
  await page.route('**/media/*.mp4', (route) => route.fulfill({ status: 204, body: '' }))
})

const pages = [
  '/kurse',
  '/kurse/b1-b2',
  '/kurse/bsk',
  '/kurse/integrationskurse',
  '/pruefungen',
  '/pruefungen/einbuergerungstest',
  '/pruefungen/telc',
  '/projekte',
  '/bildungsangebote',
  '/lernfoerderung',
  '/paedagogische-angebote',
  '/ueber-uns',
  '/ueber-uns/kontakt',
  '/formulare',
  '/news',
  '/news/wir-sind-offizielles-telc-hochschulkompetenzzentrum',
  '/news/qualifizierung-von-kindertagespflegepersonen',
  '/news/jugendintegrationskurs-mit-100-prozent-erfolg',
  '/news/frauenintegrationskurs',
  '/news/schulung-zum-qualitaets-manager',
  '/news/jetzt-kostenlose-nachhilfe-in-bad-kreuznach',
  '/projekte/startklar',
  '/projekte/strassenfotografie',
  '/presse',
  '/fotogalerie',
  '/impressum',
  '/datenschutz',
  '/hausordnung',
]

/** Each form test gets its own client address, so the rate limit never mixes tests. */
async function asNewVisitor(page: Page) {
  const ip = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`
  await page.setExtraHTTPHeaders({ 'x-forwarded-for': ip })
}

test.describe('Content pages', () => {
  for (const path of pages) {
    test(`${path}: loads cleanly, valid structure, accessible`, async ({ page }) => {
      const problems = watchProblems(page)
      const response = await page.goto(path)
      expect(response?.status()).toBe(200)
      await scrollThrough(page)
      await page.waitForLoadState('networkidle')
      expect(problems).toEqual([])
      await expectHeadingOrder(page)
      await expect(page.getByRole('navigation', { name: 'Brotkrümelnavigation' })).toBeVisible()
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      )
      expect(overflow).toBeLessThanOrEqual(0)
      expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy()
      await waitForReveals(page)
      await expectNoAxeViolations(page)
    })
  }

  test('every menu link of these sections leads to a page', async ({ page }) => {
    for (const path of [
      '/kurse',
      '/pruefungen',
      '/projekte',
      '/bildungsangebote',
      '/lernfoerderung',
      '/ueber-uns',
      '/news',
    ]) {
      await page.goto(path)
      const hrefs = await page
        .locator(`a[href^="${path}"]`)
        .evaluateAll((links) => [
          ...new Set(links.map((a) => a.getAttribute('href')!.split('#')[0]!)),
        ])
      for (const href of hrefs) {
        const res = await page.request.get(href)
        expect(res.status(), href).toBe(200)
      }
    }
  })

  test('every page has at most six sections; only the five main pages have a hero photo', async ({
    page,
  }) => {
    for (const path of pages.filter(
      (p) => !['/impressum', '/datenschutz', '/hausordnung'].includes(p),
    )) {
      await page.goto(path)
      const sections = await page.locator('main > section:not(#seitenkopf)').count()
      expect(sections, path).toBeLessThanOrEqual(6)
      const heroPhotos = await page.locator('#seitenkopf img').count()
      expect(heroPhotos > 0, path).toBe(
        ['/kurse', '/pruefungen', '/bildungsangebote', '/projekte', '/ueber-uns'].includes(path),
      )
    }
  })

  test('breadcrumbs are visible and also given to search engines', async ({ page }) => {
    await page.goto('/kurse/integrationskurse')
    const crumbs = page.getByRole('navigation', { name: 'Brotkrümelnavigation' })
    await expect(crumbs.getByRole('link')).toHaveText(['Start', 'Kurse'])
    await expect(crumbs.locator('[aria-current="page"]')).toHaveText('Integrationskurse')
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.map((el) => el.textContent ?? ''))
    expect(jsonLd.find((text) => text.includes('BreadcrumbList'))).toContain('Integrationskurse')
  })
})

test.describe('Interactive elements', () => {
  test('tabs switch with click and arrow keys', async ({ page }) => {
    await page.goto('/pruefungen#welche-pruefung')
    const tabs = page.locator('#welche-pruefung').getByRole('tab')
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true')
    await tabs.first().focus()
    await page.keyboard.press('ArrowRight')
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
    await expect(tabs.nth(1)).toBeFocused()
    await expect(page.locator('#welche-pruefung [role="tabpanel"] h3')).toHaveText(
      'Einfache Deutschkenntnisse (A1)',
    )
    await tabs.nth(2).click()
    await expect(page.locator('#welche-pruefung [role="tabpanel"] h3')).toHaveText(
      'Deutsch für den Hochschulzugang',
    )
  })

  test('FAQ answers open and close', async ({ page }) => {
    await page.goto('/pruefungen/telc#faq')
    const item = page.locator('#faq details').first()
    await expect(item).not.toHaveAttribute('open', '')
    await item.locator('summary').click()
    await expect(item).toHaveAttribute('open', '')
    await expect(item.locator('p')).toBeVisible()
  })

  test('without dates the telc page shows the empty state, not invented dates', async ({
    page,
  }) => {
    await page.goto('/pruefungen/telc#termine')
    await expect(page.locator('#termine').getByText('Neue Termine folgen in Kürze')).toBeVisible()
    await expect(page.locator('#termine table')).toHaveCount(0)
  })
})

test.describe('Kurse, Projekte, Bildungsangebote', () => {
  test('the Kurse overview shows the three courses, each linking to its page', async ({ page }) => {
    await page.goto('/kurse')
    const cards = page.locator('#kurse article')
    await expect(cards).toHaveCount(3)
    const hrefs = await cards
      .locator('a[href]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href')))
    expect(hrefs).toEqual(['/kurse/b1-b2', '/kurse/bsk', '/kurse/integrationskurse'])
  })

  test('integration courses are shown as course blocks with module plans', async ({ page }) => {
    await page.goto('/kurse/integrationskurse')
    const courses = page.locator('#kursaufbau article')
    await expect(courses).toHaveCount(3)
    await expect(courses.first().locator('ol > li')).toHaveCount(7)
    await expect(courses.first().getByText('Niveaustufen')).toBeVisible()
    await expect(page.locator('#begleitung')).toBeVisible()
  })

  test('every project card opens its own landing page with at most two sections', async ({
    page,
    request,
  }) => {
    await page.goto('/projekte')
    const hrefs = await page
      .locator('#projekte article a[href]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href')!))
    expect(hrefs.length).toBe(9)
    for (const href of hrefs) {
      expect(href).toMatch(/^\/projekte\/[a-z-]+$/)
      expect((await request.get(href)).status(), href).toBe(200)
    }
    await page.goto(hrefs[0]!)
    expect(await page.locator('main > section:not(#seitenkopf)').count()).toBeLessThanOrEqual(2)
  })

  test('a project card opens the project page', async ({ page }) => {
    await page.goto('/projekte')
    await page.locator('#projekte article', { hasText: 'STARTklar' }).getByRole('link').click()
    await expect(page).toHaveURL(/\/projekte\/startklar$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('STARTklar')
  })

  test('Lernförderung shows all subjects as tabs', async ({ page }) => {
    await page.goto('/lernfoerderung#faecher')
    await expect(page.locator('#faecher').getByRole('tab')).toHaveCount(7)
  })
})

test.describe('telc level tabs', () => {
  test('a link to #pruefung-<level> opens that level', async ({ page }) => {
    await page.goto('/pruefungen/telc#pruefung-b2')
    const tabs = page.locator('#aufbau').getByRole('tab')
    await expect(tabs.filter({ hasText: /^B2$/ })).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator('#aufbau [role="tabpanel"] h3')).toHaveText('telc Deutsch B2')
  })

  test('levels switch with the arrow keys', async ({ page }) => {
    await page.goto('/pruefungen/telc#aufbau')
    const tabs = page.locator('#aufbau').getByRole('tab')
    await tabs.first().focus()
    await page.keyboard.press('ArrowRight')
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
    await expect(tabs.nth(1)).toBeFocused()
  })
})

test.describe('telc exam-dates filter (styleguide example data)', () => {
  test('filters by exam, location and free seats', async ({ page }) => {
    await page.goto('/styleguide#pruefungstermine')
    const box = page.locator('#pruefungstermine')
    const rows = box.locator('tbody tr')
    await expect(rows).toHaveCount(5)

    await box
      .getByRole('group', { name: 'Nach Prüfung filtern' })
      .getByRole('button', { name: 'B1', exact: true })
      .click()
    await expect(rows).toHaveCount(2)
    await box.getByRole('button', { name: 'Nur mit freien Plätzen' }).click()
    await expect(rows).toHaveCount(1)

    await box
      .getByRole('group', { name: 'Nach Prüfung filtern' })
      .getByRole('button', { name: 'Alle' })
      .click()
    await expect(rows).toHaveCount(3)
    await box.getByRole('button', { name: 'Nur mit freien Plätzen' }).click()

    await box
      .getByRole('group', { name: 'Nach Ort filtern' })
      .getByRole('button', { name: 'Bad Kreuznach' })
      .click()
    await expect(rows).toHaveCount(1)
    await expect(rows.first().getByText('Ausgebucht')).toBeVisible()
    await expect(rows.first().getByRole('button', { name: /Anmelden/ })).toBeDisabled()
  })

  test('closed registration is marked and cannot be booked', async ({ page }) => {
    await page.goto('/styleguide#pruefungstermine')
    const closed = page.locator('#pruefungstermine tbody tr', { hasText: 'Anmeldung geschlossen' })
    await expect(closed).toHaveCount(1)
    await expect(closed.getByRole('button', { name: /Anmelden/ })).toBeDisabled()
  })
})

test.describe('telc registration form', () => {
  test('shows errors for missing fields and keeps the honeypot hidden', async ({ page }) => {
    await asNewVisitor(page)
    await page.goto('/pruefungen/telc#anmeldung')
    const form = page.locator('#anmeldung form')
    await expect(form.locator('#website')).not.toBeInViewport()
    await form.getByRole('button', { name: 'Angaben prüfen und absenden' }).click()
    await expect(form.getByText('Bitte wählen Sie eine Prüfung.')).toBeVisible()
    await expect(form.getByText('Bitte geben Sie Ihren Vornamen an.')).toBeVisible()
    await expect(form.getByText('Bitte stimmen Sie der Datenverarbeitung zu.')).toBeVisible()
    await expect(form.locator('#email')).toHaveAttribute('aria-invalid', 'true')
  })

  test('partial retake is offered only for B1 and above', async ({ page }) => {
    await page.goto('/pruefungen/telc#anmeldung')
    const form = page.locator('#anmeldung form')
    await form.locator('#examId').selectOption('a1')
    await expect(form.getByText('Teilprüfung wiederholen?')).toHaveCount(0)
    await form.locator('#examId').selectOption('b1')
    await expect(form.getByText('Teilprüfung wiederholen?')).toBeVisible()
  })

  test('a date picked in the table is taken over by the form', async ({ page }) => {
    await page.goto('/pruefungen/telc#anmeldung')
    // retry until the form is hydrated and listening
    await expect
      .poll(async () => {
        await page.evaluate(() =>
          window.dispatchEvent(
            new CustomEvent('telc:select', { detail: { examId: 'c1-hochschule', dateId: '' } }),
          ),
        )
        return page.locator('#examId').inputValue()
      })
      .toBe('c1-hochschule')
  })

  test('a valid entry is checked by the server and answered honestly', async ({ page }) => {
    await asNewVisitor(page)
    await page.goto('/pruefungen/telc#anmeldung')
    const form = page.locator('#anmeldung form')
    await form.locator('#examId').selectOption('b1')
    await form.locator('#firstName').fill('Erika')
    await form.locator('#lastName').fill('Musterfrau')
    await form.locator('#birthDate').fill('1990-05-17')
    await form.locator('#birthPlace').fill('Mainz')
    await form.locator('#email').fill('erika@example.org')
    await form.locator('#phone').fill('+49 6131 123456')
    await form.locator('#privacy').check()
    await form.getByRole('button', { name: 'Angaben prüfen und absenden' }).click()
    await expect(form.getByText('Ihre Angaben sind vollständig.')).toBeVisible()
    await expect(form.getByText(/Ihre Daten wurden nicht gesendet/)).toBeVisible()
  })

  test('the server rate-limits repeated submissions', async ({ page }) => {
    await asNewVisitor(page)
    await page.goto('/pruefungen/telc#anmeldung')
    const form = page.locator('#anmeldung form')
    await form.locator('#examId').selectOption('a2')
    await form.locator('#firstName').fill('Max')
    await form.locator('#lastName').fill('Mustermann')
    await form.locator('#birthDate').fill('1985-01-02')
    await form.locator('#birthPlace').fill('Mainz')
    await form.locator('#email').fill('max@example.org')
    await form.locator('#phone').fill('06131 123456')
    await form.locator('#privacy').check()
    const submit = form.getByRole('button', { name: 'Angaben prüfen und absenden' })
    for (let i = 0; i < 5; i++) {
      await submit.click()
      await expect(form.getByText('Ihre Angaben sind vollständig.')).toBeVisible()
    }
    await submit.click()
    await expect(form.getByText(/Zu viele Versuche/)).toBeVisible()
  })
})

test.describe('General forms', () => {
  async function newVisitor(page: Page) {
    const n = () => Math.floor(Math.random() * 250)
    await page.setExtraHTTPHeaders({ 'x-forwarded-for': `10.${n()}.${n()}.${n()}` })
  }
  const formOf = (page: Page, formId: string) =>
    page.locator(`form[aria-describedby="${formId}-hinweis"]`)

  for (const [path, formId] of [
    ['/ueber-uns/kontakt', 'kontakt'],
    ['/formulare', 'beschwerde'],
    ['/formulare', 'bildung-und-teilhabe'],
    ['/ueber-uns', 'mitgliedschaft'],
    ['/ueber-uns', 'bewerbung'],
  ] as const) {
    test(`${formId}: empty submit shows errors, honeypot stays hidden`, async ({ page }) => {
      await page.goto(path)
      const form = formOf(page, formId)
      await form.scrollIntoViewIfNeeded()
      await expect(form.locator(`#${formId}-website`)).not.toBeInViewport()
      await form.locator('button[type="submit"]').click()
      await expect(form.getByText('Bitte stimmen Sie der Datenverarbeitung zu.')).toBeVisible()
      await expect(form.locator('[aria-invalid="true"]').first()).toBeVisible()
    })
  }

  test('contact form: a valid message is checked by the server and answered honestly', async ({
    page,
  }) => {
    await newVisitor(page)
    await page.goto('/ueber-uns/kontakt')
    const form = formOf(page, 'kontakt')
    await form.locator('#kontakt-name').fill('Erika Musterfrau')
    await form.locator('#kontakt-email').fill('erika@example.org')
    await form.locator('#kontakt-location').selectOption('Mainz')
    await form.locator('#kontakt-topic').selectOption('Kurse')
    await form.locator('#kontakt-message').fill('Ich interessiere mich für einen B1-Kurs.')
    await form.locator('#kontakt-privacy').check()
    await form.locator('button[type="submit"]').click()
    await expect(form.getByText('Ihre Angaben sind vollständig.')).toBeVisible()
    await expect(form.getByText(/Ihre Daten wurden nicht gesendet/)).toBeVisible()
  })

  test('complaint form works anonymously', async ({ page }) => {
    await newVisitor(page)
    await page.goto('/formulare#beschwerde')
    const form = formOf(page, 'beschwerde')
    await form.locator('#beschwerde-area').selectOption('Kurs')
    await form.locator('#beschwerde-message').fill('Der Raum war zu kalt.')
    await form.locator('#beschwerde-privacy').check()
    await form.locator('button[type="submit"]').click()
    await expect(form.getByText('Ihre Angaben sind vollständig.')).toBeVisible()
  })

  test('application form accepts only a PDF', async ({ page }) => {
    await newVisitor(page)
    await page.goto('/ueber-uns#bewerben')
    const form = formOf(page, 'bewerbung')
    await form.locator('#bewerbung-firstName').fill('Max')
    await form.locator('#bewerbung-lastName').fill('Mustermann')
    await form.locator('#bewerbung-email').fill('max@example.org')
    await form.locator('#bewerbung-phone').fill('06131 123456')
    await form.locator('#bewerbung-position').selectOption('Initiativbewerbung')
    await form.locator('#bewerbung-privacy').check()
    await form
      .locator('#bewerbung-cv')
      .setInputFiles({ name: 'cv.txt', mimeType: 'text/plain', buffer: Buffer.from('Lebenslauf') })
    await form.locator('button[type="submit"]').click()
    await expect(form.getByText('Bitte laden Sie eine PDF-Datei hoch.')).toBeVisible()
    await form.locator('#bewerbung-cv').setInputFiles({
      name: 'cv.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('%PDF-1.4 test'),
    })
    await form.locator('button[type="submit"]').click()
    await expect(form.getByText('Ihre Angaben sind vollständig.')).toBeVisible()
  })

  test('the server rate-limits repeated messages', async ({ page }) => {
    await newVisitor(page)
    await page.goto('/formulare#beschwerde')
    const form = formOf(page, 'beschwerde')
    await form.locator('#beschwerde-area').selectOption('Sonstiges')
    await form.locator('#beschwerde-message').fill('Test der Begrenzung.')
    await form.locator('#beschwerde-privacy').check()
    const submit = form.locator('button[type="submit"]')
    for (let i = 0; i < 5; i++) {
      await submit.click()
      await expect(form.getByText('Ihre Angaben sind vollständig.')).toBeVisible()
    }
    await submit.click()
    await expect(form.getByText(/Zu viele Versuche/)).toBeVisible()
  })
})

test.describe('Gallery, news and legal pages', () => {
  test('gallery: album filter and lightbox with arrow keys and Escape', async ({ page }) => {
    await page.goto('/fotogalerie#fotos')
    const grid = page.locator('#fotos ul > li')
    const total = await grid.count()
    expect(total).toBeGreaterThan(20)
    const albums = page.getByRole('group', { name: 'Nach Album filtern' })
    await albums.getByRole('button', { name: /^Projekte/ }).click()
    await expect(grid).toHaveCount(4)
    await albums.getByRole('button', { name: /^Alle/ }).click()
    await expect(grid).toHaveCount(total)
    await grid.first().getByRole('button').click()
    const dialog = page.getByRole('dialog', { name: 'Foto-Ansicht' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText(`1 / ${total}`)).toBeVisible()
    await page.keyboard.press('ArrowRight')
    await expect(dialog.getByText(`2 / ${total}`)).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
  })

  test('news can be filtered by topic', async ({ page }) => {
    await page.goto('/news#beitraege')
    const section = page.locator('#beitraege')
    await expect(section.locator('article')).toHaveCount(6)
    await section.getByRole('button', { name: /^Integrationskurse/ }).click()
    await expect(section.locator('article')).toHaveCount(2)
  })

  test('legal pages: the table of contents links to every section, review note shown', async ({
    page,
  }) => {
    await page.goto('/impressum')
    const toc = page.getByRole('navigation', { name: 'Inhaltsverzeichnis' }).getByRole('link')
    const ids = await toc.evaluateAll((links) => links.map((a) => a.getAttribute('href')!.slice(1)))
    expect(ids.length).toBeGreaterThan(3)
    for (const id of ids) await expect(page.locator(`section#${id}`)).toHaveCount(1)
    await expect(page.getByText(/Vor dem Livegang prüfen/)).toBeVisible()
  })
})
