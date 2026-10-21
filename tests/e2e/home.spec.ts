import { expect, test } from '@playwright/test'
import { expectHeadingOrder, expectNoAxeViolations, scrollThrough, watchProblems } from './helpers'

// The hero video is not needed for these checks; streaming it to four parallel browsers
// would only slow the single local test server down.
test.beforeEach(async ({ page }) => {
  await page.route('**/media/*.mp4', (route) => route.fulfill({ status: 204, body: '' }))
})

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

  test('has its sections (hero, offers, about, news, partners), one h1 and heading order', async ({
    page,
  }) => {
    await page.goto('/')
    for (const id of ['start', 'angebote', 'ueber-uns', 'news']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1)
    }
    for (const id of ['projekte', 'standorte', 'warum-abc']) {
      await expect(page.locator(`#${id}`)).toHaveCount(0)
    }
    await expect(page.getByRole('navigation', { name: 'Schnellzugriff' })).toHaveCount(0)
    const partners = page.getByRole('heading', { name: 'Unsere Partner und Förderer' })
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

  test('offers: 6 text tiles without photos, each one link with its own link text', async ({
    page,
  }) => {
    await page.goto('/')
    const links = page.locator('#angebote li a')
    await expect(links).toHaveCount(6)
    await expect(page.locator('#angebote img')).toHaveCount(0)
    const labels = await links.evaluateAll((els) =>
      els.map((el) => el.lastElementChild?.textContent?.trim() ?? ''),
    )
    expect(new Set(labels).size).toBe(6)
  })

  test('every fact appears once: "1997" at most once in the visible home page text', async ({
    page,
  }) => {
    await page.goto('/')
    const text = await page.locator('body').innerText()
    expect(text.split('1997').length - 1).toBeLessThanOrEqual(1)
    expect(text.split('Mehr erfahren').length - 1).toBe(0)
  })

  test('hero: muted looping video with poster, headline and two text links (no box)', async ({
    page,
  }) => {
    await page.goto('/')
    const video = page.locator('#start video')
    await expect(video).toHaveAttribute('muted', '')
    await expect(video).toHaveAttribute('playsinline', '')
    await expect(video).toHaveAttribute('loop', '')
    await expect(video).toHaveAttribute('poster', /.+/)
    await expect(page.locator('#start h1')).toHaveText('Bildung, die Perspektiven schafft')
    await expect(page.locator('#start a')).toHaveCount(2)
  })
})

test.describe('About', () => {
  test('about section: photo, short text with the only "Seit 1997", one text link', async ({
    page,
  }) => {
    await page.goto('/')
    const about = page.locator('#ueber-uns')
    await expect(about.getByRole('heading', { level: 2 })).toHaveText('Wer wir sind')
    await expect(about).toContainText('Seit 1997')
    await expect(about.getByRole('link')).toHaveCount(1)
    await expect(about.getByRole('link')).toHaveAttribute('href', '/ueber-uns')
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

  test('main menu items link to their overview, the submenu opens on hover', async ({
    page,
  }, info) => {
    test.skip(!isDesktop(info.project.use.viewport?.width), 'desktop navigation only')
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
    const kurse = nav.getByRole('link', { name: 'Kurse', exact: true })
    await kurse.hover()
    const panel = page.locator('#nav-0')
    await expect(panel.getByRole('link')).toHaveText([
      /B1 & B2/,
      /Berufssprachkurse/,
      /Integrationskurse/,
    ])
    await expect(page.locator('#nav-1')).toHaveCount(0)
    await nav.getByRole('link', { name: 'Prüfungen', exact: true }).hover()
    await expect(page.locator('#nav-1').getByRole('link', { name: /telc Prüfungen/ })).toBeVisible()
    await expect(panel).toHaveCount(0)
    await nav.getByRole('link', { name: 'Kurse', exact: true }).click()
    await expect(page).toHaveURL(/\/kurse$/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('top bar has a Kontakt button; the current section is highlighted in dark blue', async ({
    page,
  }, info) => {
    test.skip(!isDesktop(info.project.use.viewport?.width), 'desktop navigation only')
    await page.goto('/projekte')
    const header = page.locator('header').first()
    await expect(header.getByRole('link', { name: 'Kontakt' })).toHaveAttribute(
      'href',
      '/ueber-uns/kontakt',
    )
    const nav = page.getByRole('navigation', { name: 'Hauptnavigation' })
    const current = nav.getByRole('link', { name: 'Projekte', exact: true }).locator('..')
    await expect(current).toHaveClass(/bg-blue-100/)
  })

  test('footer shows both locations with address and opening hours', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer).toContainText('Rhabanusstr. 5, 55118 Mainz')
    await expect(footer).toContainText('Mo, Di, Mi, Fr: 9:00–16:00 Uhr')
    await expect(footer).toContainText('Mathildenstr. 3–7, 55543 Bad Kreuznach')
    await expect(footer).not.toContainText('seit 1997')
  })

  test('submenu opens with keyboard and closes with Escape', async ({ page }, info) => {
    test.skip(!isDesktop(info.project.use.viewport?.width), 'desktop navigation only')
    await page.goto('/')
    const trigger = page.getByRole('button', { name: 'Untermenü Kurse', exact: true })
    await trigger.focus()
    await page.keyboard.press('Enter')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    const panel = page.locator('#nav-0')
    await expect(panel.getByRole('link', { name: /Berufssprachkurse/ })).toBeVisible()
    await page.keyboard.press('Tab')
    await expect(panel.getByRole('link').first()).toBeFocused()
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
    await dialog.getByRole('button', { name: 'Kurse', exact: true }).click()
    await expect(dialog.getByRole('link', { name: /Berufssprachkurse/ })).toBeVisible()
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

test.describe('Compact news', () => {
  test('shows the three latest headlines as links, without photos or dates', async ({ page }) => {
    await page.goto('/')
    const links = page.locator('#news li a')
    await expect(links).toHaveCount(3)
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('href', /^\/news\//)
    }
    await expect(page.locator('#news img')).toHaveCount(0)
    await expect(page.locator('#news time')).toHaveCount(0)
  })
})

test.describe('Locations on the Kontakt page', () => {
  test('map loads only after consent', async ({ page }) => {
    const osm: string[] = []
    page.on('request', (req) => {
      if (req.url().includes('openstreetmap.org')) osm.push(req.url())
    })
    await page.goto('/ueber-uns/kontakt#standorte')
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
    await page.goto('/ueber-uns/kontakt#standorte')
    const mainz = page.locator('#standorte article').first()
    await expect(mainz).toContainText('Jetzt geöffnet · bis 16:00 Uhr')
    await mainz.getByRole('button', { name: 'Öffnungszeiten & Karte' }).click()
    await expect(mainz.getByRole('row', { name: /Montag/ })).toContainText('Heute')
  })

  test('Mainz shows closed on Thursday with next opening', async ({ page }) => {
    await page.clock.setFixedTime(new Date('2026-10-15T08:00:00Z'))
    await page.goto('/ueber-uns/kontakt#standorte')
    await expect(page.locator('#standorte article').first()).toContainText(
      'Geschlossen · öffnet morgen 9:00 Uhr',
    )
  })

  test('Bad Kreuznach shows appointments only', async ({ page }) => {
    await page.goto('/ueber-uns/kontakt#standorte')
    await expect(page.locator('#standorte article').nth(1)).toContainText(
      'Termine nach Vereinbarung',
    )
  })

  test('copy address shows a confirmation toast', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'clipboard permission is chromium-only')
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto('/ueber-uns/kontakt#standorte')
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
    await page.waitForLoadState('networkidle')
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
