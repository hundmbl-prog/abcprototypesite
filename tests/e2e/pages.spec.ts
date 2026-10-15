import { expect, test, type Page } from '@playwright/test'
import {
  expectHeadingOrder,
  expectNoAxeViolations,
  scrollThrough,
  waitForReveals,
  watchProblems,
} from './helpers'

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

  test('breadcrumbs show the path with the current page marked', async ({ page }) => {
    await page.goto('/kurse/integrationskurse')
    const crumbs = page.getByRole('navigation', { name: 'Brotkrümelnavigation' })
    await expect(crumbs.getByRole('link')).toHaveText(['Start', 'Kurse'])
    await expect(crumbs.locator('[aria-current="page"]')).toHaveText('Integrationskurse')
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

  test('telc exam cards filter by level', async ({ page }) => {
    await page.goto('/pruefungen/telc#pruefungen')
    const section = page.locator('#pruefungen')
    await expect(section.locator('article')).toHaveCount(6)
    await section.getByRole('button', { name: /^B2/ }).click()
    await expect(section.locator('article')).toHaveCount(1)
    await expect(section.locator('article h3')).toHaveText('telc Deutsch B2')
    await section.getByRole('button', { name: /^Alle/ }).click()
    await expect(section.locator('article')).toHaveCount(6)
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
    await expect(page.locator('#lern-und-sozialbegleitung')).toBeVisible()
  })

  for (const [path, list] of [
    ['/projekte', '#projekte'],
    ['/bildungsangebote', '#angebote'],
  ] as const) {
    test(`${path}: every card jumps to an existing detail section`, async ({ page }) => {
      await page.goto(path)
      const targets = await page
        .locator(`${list} article a[href*="#"]`)
        .evaluateAll((links) => links.map((a) => a.getAttribute('href')!.split('#')[1]!))
      expect(targets.length).toBeGreaterThan(1)
      for (const id of targets) await expect(page.locator(`section#${id}`)).toHaveCount(1)
    })
  }

  test('a project card scrolls to its section', async ({ page }) => {
    await page.goto('/projekte')
    await page.locator('#projekte article', { hasText: 'STARTklar' }).getByRole('link').click()
    await expect(page).toHaveURL(/#startklar$/)
    // the section starts right below the header (on phones the photo comes before the heading)
    await expect(page.locator('section#startklar')).toBeInViewport()
    await expect
      .poll(() =>
        page.locator('section#startklar').evaluate((el) => el.getBoundingClientRect().top),
      )
      .toBeLessThan(200)
  })

  test('a link from another page lands on the project section', async ({ page }) => {
    await page.goto('/projekte#natur-erleben')
    await expect(page.locator('section#natur-erleben')).toBeInViewport()
    await expect
      .poll(() =>
        page.locator('section#natur-erleben').evaluate((el) => el.getBoundingClientRect().top),
      )
      .toBeLessThan(200)
  })

  test('home slideshow links point to existing project sections', async ({ page, request }) => {
    await page.goto('/')
    const ids = await page
      .locator('#projekte a[href^="/projekte#"]')
      .evaluateAll((links) => [
        ...new Set(links.map((a) => a.getAttribute('href')!.split('#')[1]!)),
      ])
    expect(ids.length).toBeGreaterThan(0)
    const html = await (await request.get('/projekte')).text()
    for (const id of ids) expect(html, id).toContain(`id="${id}"`)
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

  test('clicking an exam card selects its level', async ({ page }) => {
    await page.goto('/pruefungen/telc')
    await page
      .locator('#pruefungen article', { hasText: 'C1 Hochschule' })
      .getByRole('link')
      .click()
    await expect(page.locator('#aufbau [role="tabpanel"] h3')).toHaveText(
      'telc Deutsch C1 Hochschule',
    )
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
