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
    for (const id of [
      'start',
      'angebote',
      'news',
      'projekte',
      'warum-abc',
      'ansprechpartner',
      'standorte',
    ]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1)
    }
    await expect(page.getByRole('heading', { name: 'Gemeinsam mehr erreichen' })).toBeVisible()
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

test.describe('Header navigation', () => {
  test('header becomes solid after scrolling', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header').first()
    await expect(header).toHaveClass(/bg-transparent/)
    await page.mouse.wheel(0, 600)
    await expect(header).not.toHaveClass(/bg-transparent/)
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
    await region.getByRole('button', { name: /Zu News: Frauenintegrationskurs/ }).click()
    await expect(counter).toContainText('05 / 06')
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
    const live = region.locator('[aria-live="polite"]')
    await region.focus()
    await page.keyboard.press('ArrowRight')
    await expect(live).toContainText('Projekt 2 von 6')
    await page.keyboard.press('ArrowLeft')
    await expect(live).toContainText('Projekt 1 von 6')
    await region.getByRole('button', { name: 'Nächstes Projekt' }).click()
    await expect(live).toContainText('Projekt 2 von 6')
  })
})

test.describe('Counters, locations, map', () => {
  test('counters end at their target value', async ({ page }) => {
    await page.goto('/')
    const stats = page.locator('#warum-abc dd')
    await stats.first().scrollIntoViewIfNeeded()
    await expect(stats.nth(1)).toHaveText('5', { timeout: 5000 })
  })

  test('location tabs switch with arrow keys; map loads only after consent', async ({ page }) => {
    const osm: string[] = []
    page.on('request', (req) => {
      if (req.url().includes('openstreetmap.org')) osm.push(req.url())
    })
    await page.goto('/#standorte')
    const tabs = page.getByRole('tablist', { name: 'Standort wählen' })
    const mainz = tabs.getByRole('tab', { name: 'Mainz' })
    await mainz.focus()
    await page.keyboard.press('ArrowRight')
    const bk = tabs.getByRole('tab', { name: 'Bad Kreuznach' })
    await expect(bk).toHaveAttribute('aria-selected', 'true')
    await expect(page.getByRole('tabpanel')).toContainText('Mathildenstr.')
    expect(osm).toEqual([])
    await page.getByRole('button', { name: 'Karte laden' }).click()
    await expect(page.locator('iframe[title^="Karte: Bad Kreuznach"]')).toBeVisible()
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
