import { expect, test } from '@playwright/test'
import { expectHeadingOrder, expectNoAxeViolations, scrollThrough, watchProblems } from './helpers'

const isDesktop = (width?: number) => (width ?? 0) >= 1280

test.describe('Home page', () => {
  test('loads without console errors, warnings or failed requests', async ({ page }) => {
    const problems = watchProblems(page)
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)
    await scrollThrough(page)
    await page.waitForLoadState('networkidle')
    expect(problems).toEqual([])
  })

  test('has all 9 sections, one h1 and correct heading order', async ({ page }) => {
    await page.goto('/')
    for (const id of ['start', 'angebote', 'news', 'projekte', 'warum-abc', 'standorte']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1)
    }
    const partners = page.getByRole('heading', { name: 'Gemeinsam mehr erreichen' })
    await page.locator('#partner-titel').evaluate((el) => el.scrollIntoView({ block: 'center' }))
    await expect(partners).toBeVisible()
    await expect(page.getByRole('img', { name: 'Logo Aktion Mensch' })).toHaveCount(1)
    await expect(page.locator('footer')).toBeVisible()
    await expectHeadingOrder(page)
  })

  test('has no axe violations (WCAG 2.1 AA)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await scrollThrough(page)
    await expectNoAxeViolations(page)
  })

  test('has no horizontal overflow', async ({ page }) => {
    await page.goto('/')
    await scrollThrough(page)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test('offers bento shows 6 photo cards, each a single link', async ({ page }) => {
    await page.goto('/')
    const cards = page.locator('#angebote article')
    await expect(cards).toHaveCount(6)
    for (const card of await cards.all()) await expect(card.locator('a[href]')).toHaveCount(1)
  })
})

test.describe('Offer cards and about', () => {
  test('photo and info box form one link per card', async ({ page }) => {
    await page.goto('/')
    const card = page.locator('#angebote article').first()
    await expect(card.locator('a[href]')).toHaveCount(1)
    await expect(page.locator('#angebote [aria-label="Angebote filtern"]')).toHaveCount(0)
    const link = card.locator('a[href]')
    const box = await link.boundingBox()
    const img = await card.locator('img').boundingBox()
    expect(box && img && box.y <= img.y && box.y + box.height >= img.y + img.height).toBeTruthy()
  })

  test('about section shows story, milestones and a red button', async ({ page }) => {
    await page.goto('/')
    const about = page.locator('#ueber-uns')
    await expect(about.getByRole('heading', { level: 2 })).toHaveText(
      'Aus der Community – für die Community',
    )
    await expect(about.locator('li')).toHaveCount(3)
    await expect(about.getByRole('link', { name: /Mehr über uns/ })).toHaveAttribute(
      'href',
      '/ueber-uns',
    )
  })
})

test.describe('Header navigation', () => {
  test('floating glass header shrinks after scrolling', async ({ page }) => {
    await page.goto('/')
    const bar = page.locator('header .glass-strong').first()
    await expect(bar).toHaveClass(/h-16/)
    await page.mouse.wheel(0, 600)
    await expect(bar).toHaveClass(/h-14/)
  })

  test('mega menu opens with keyboard and closes with Escape', async ({ page }, info) => {
    test.skip(!isDesktop(info.project.use.viewport?.width), 'desktop navigation only')
    await page.goto('/')
    const trigger = page.getByRole('button', { name: 'Sprachkurse' })
    await trigger.focus()
    await page.keyboard.press('Enter')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    const panel = page.locator('#mega-0')
    await expect(panel.getByRole('link', { name: /C1 Hochschule/ })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(panel).toHaveCount(0)
    await expect(trigger).toBeFocused()
  })

  test('mobile menu opens full screen, traps focus and closes', async ({ page }, info) => {
    test.skip(isDesktop(info.project.use.viewport?.width), 'mobile navigation only')
    await page.goto('/')
    const open = page.getByRole('button', { name: 'Menü', exact: true })
    await open.click()
    const dialog = page.getByRole('dialog', { name: 'Hauptmenü' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('button', { name: 'Menü schließen' })).toBeFocused()
    await dialog.getByRole('button', { name: 'Integrationskurse' }).click()
    await expect(dialog.getByRole('link', { name: 'Jugendintegrationskurse' })).toBeVisible()
    for (let i = 0; i < 40; i++) await page.keyboard.press('Tab')
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true)
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(open).toBeFocused()
  })

  test('skip link moves focus to main content', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Zum Inhalt springen' })
    await expect(skip).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.locator('main#inhalt')).toBeFocused()
  })
})

test.describe('Sliders', () => {
  test('news slideshow: next button, thumbnails and pause', async ({ page }) => {
    await page.goto('/#news')
    const region = page.getByRole('region', { name: 'Aktuelle News' })
    const counter = region.locator('p.font-mono')
    await expect(counter).toContainText('01 / 06')
    await region.getByRole('button', { name: 'Nächste News' }).click()
    await expect(counter).toContainText('02 / 06')
    await region.getByRole('button', { name: 'Vorherige News' }).click()
    await expect(counter).toContainText('01 / 06')
    const pause = region.getByRole('button', { name: 'Automatisches Abspielen pausieren' })
    await pause.click()
    await expect(region.getByRole('button', { name: 'Automatisch abspielen' })).toBeVisible()
  })

  test('news slideshow does not autoplay with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/#news')
    const region = page.getByRole('region', { name: 'Aktuelle News' })
    await expect(region.getByRole('button', { name: 'Automatisch abspielen' })).toBeVisible()
  })

  test('projects slideshow: arrow keys and buttons', async ({ page }) => {
    await page.goto('/#projekte')
    const region = page.getByRole('region', { name: /Projekte/ })
    const live = region.locator('p[aria-live]')
    await region.focus()
    await page.keyboard.press('ArrowRight')
    await expect(live).toContainText('Projekt 2 von 6')
    await page.keyboard.press('ArrowLeft')
    await expect(live).toContainText('Projekt 1 von 6')
    await region.getByRole('button', { name: 'Nächstes Projekt' }).click()
    await expect(live).toContainText('Projekt 2 von 6')
  })
})

test.describe('Projects autoplay', () => {
  test('advances on its own and can be paused', async ({ page }) => {
    test.setTimeout(60_000)
    await page.clock.install()
    await page.goto('/')
    const region = page.getByRole('region', { name: /Projekte/ })
    const live = region.locator('p[aria-live]')
    await expect(live).toContainText('Projekt 1 von 6')
    await page.clock.runFor(7000)
    await expect(live).toContainText('Projekt 2 von 6')
    await region
      .getByRole('button', { name: 'Projekte: automatisches Abspielen pausieren' })
      .click()
    await page.mouse.move(0, 0)
    await region.getByRole('button', { name: 'Projekte automatisch abspielen' }).focus()
    // longer than one autoplay interval (6.5 s): a paused slideshow must not move
    await page.clock.runFor(8000)
    await expect(live).toContainText('Projekt 2 von 6')
  })

  test('does not autoplay with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const region = page.getByRole('region', { name: /Projekte/ })
    await expect(
      region.getByRole('button', { name: 'Projekte automatisch abspielen' }),
    ).toBeAttached()
  })

  test('news slides show no dates', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#news time')).toHaveCount(0)
  })
})

test.describe('Counters, locations, map', () => {
  test('counters end at their target value', async ({ page }) => {
    await page.goto('/')
    const stats = page.locator('#warum-abc dd')
    await stats.first().scrollIntoViewIfNeeded()
    await expect(stats.nth(1)).toHaveText('5', { timeout: 5000 })
  })

  test('counters never stay at 0 after scrolling past quickly', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(2500)
    const values = await page.locator('#warum-abc dd > span:first-child').allTextContents()
    expect(values).toEqual(['29', '5', '1.200+', '60+'])
  })

  test('offer cards show photos that match their topic', async ({ page }) => {
    await page.goto('/')
    const alts = await page
      .locator('#angebote article img')
      .evaluateAll((imgs) => imgs.map((img) => img.getAttribute('alt')))
    expect(alts[0]).toContain('Lehrerin')
    expect(alts[1]).toContain('telc')
  })

  test('map loads only after consent', async ({ page }) => {
    const osm: string[] = []
    page.on('request', (req) => {
      if (req.url().includes('openstreetmap.org')) osm.push(req.url())
    })
    await page.goto('/#standorte')
    const cards = page.locator('#standorte article')
    await expect(cards).toHaveCount(2)
    await page.waitForTimeout(500)
    expect(osm).toEqual([])
    const toggle = cards.first().getByRole('button', { name: 'Öffnungszeiten & Karte' })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await cards.first().getByRole('button', { name: 'Karte laden' }).click()
    await expect(page.locator('iframe[title^="Karte: Mainz"]')).toBeVisible()
  })
})

test.describe('Locations live status', () => {
  test('Mainz shows open on Monday 10:00 (Berlin time)', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2026-10-12T08:00:00Z'))
    await page.goto('/#standorte')
    const mainz = page.locator('#standorte article').first()
    await expect(mainz).toContainText('Jetzt geöffnet · bis 16:00 Uhr')
    await mainz.getByRole('button', { name: 'Öffnungszeiten & Karte' }).click()
    await expect(mainz.getByRole('row', { name: /Montag/ })).toContainText('Heute')
  })

  test('Mainz shows closed on Thursday with next opening', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2026-10-15T08:00:00Z'))
    await page.goto('/#standorte')
    await expect(page.locator('#standorte article').first()).toContainText(
      'Geschlossen · öffnet morgen 9:00 Uhr',
    )
  })

  test('Bad Kreuznach shows appointments only', async ({ page }) => {
    await page.goto('/#standorte')
    await expect(page.locator('#standorte article').nth(1)).toContainText(
      'Termine nach Vereinbarung',
    )
  })

  test('copy address shows a confirmation toast', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'clipboard permission is chromium-only')
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto('/#standorte')
    await page.getByRole('button', { name: 'Adresse Mainz kopieren' }).click()
    await expect(page.getByRole('status').filter({ hasText: 'Adresse kopiert' })).toBeVisible()
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Rhabanusstr. 5')
  })
})

test.describe('Scroll extras', () => {
  test('back-to-top button appears after scrolling and returns to top', async ({ page }) => {
    await page.goto('/')
    const button = page.getByRole('button', { name: 'Nach oben' })
    await expect(button).toHaveCount(0)
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2))
    await expect(button).toBeVisible()
    await button.click()
    await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 }).toBeLessThan(10)
  })
})

test.describe('404 page', () => {
  test('unknown path shows the styled 404 with header and footer', async ({ page }) => {
    const response = await page.goto('/diese-seite-gibt-es-nicht')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Diese Seite gibt es')
    await expect(page.locator('header').first()).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
    await expectNoAxeViolations(page)
  })
})
