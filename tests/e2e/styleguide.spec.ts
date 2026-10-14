import AxeBuilder from '@axe-core/playwright'
import { expect, test, type ConsoleMessage } from '@playwright/test'

test.describe('Styleguide', () => {
  test('loads without console errors or warnings', async ({ page }) => {
    const problems: string[] = []
    page.on('console', (msg: ConsoleMessage) => {
      if (msg.type() === 'error' || msg.type() === 'warning')
        problems.push(`${msg.type()}: ${msg.text()}`)
    })
    page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`))
    const response = await page.goto('/styleguide')
    expect(response?.status()).toBe(200)
    await page.waitForLoadState('networkidle')
    expect(problems).toEqual([])
  })

  test('has one h1, correct heading order and noindex', async ({ page }) => {
    await page.goto('/styleguide')
    await expect(page.locator('h1')).toHaveCount(1)
    const levels = await page
      .locator('h1, h2, h3, h4, h5, h6')
      .evaluateAll((els) => els.map((el) => Number(el.tagName.slice(1))))
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i]! - levels[i - 1]!, `heading jump at index ${i}`).toBeLessThanOrEqual(1)
    }
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })

  test('has no axe accessibility violations (WCAG 2.1 AA)', async ({ page }) => {
    await page.goto('/styleguide')
    await page.waitForLoadState('networkidle')
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.length} × ${v.help}`)
    expect(summary).toEqual([])
  })

  test('has no horizontal overflow', async ({ page }) => {
    await page.goto('/styleguide')
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test('keyboard: skip link and visible focus ring', async ({ page }) => {
    await page.goto('/styleguide')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Zum Inhalt springen' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeVisible()
    await page.keyboard.press('Tab')
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement
      const style = getComputedStyle(el)
      return { style: style.outlineStyle, width: parseFloat(style.outlineWidth) }
    })
    expect(outline.style).toBe('solid')
    expect(outline.width).toBeGreaterThanOrEqual(2)
  })

  test('filter chips toggle aria-pressed', async ({ page }) => {
    await page.goto('/styleguide#tags')
    const group = page.getByRole('group', { name: 'Niveau filtern' })
    const a2 = group.getByRole('button', { name: 'A2' })
    await expect(a2).toHaveAttribute('aria-pressed', 'false')
    await a2.click()
    await expect(a2).toHaveAttribute('aria-pressed', 'true')
  })

  test('whole card is one link', async ({ page }) => {
    await page.goto('/styleguide#karten')
    const card = page.locator('#karten article').first()
    await expect(card.getByRole('link')).toHaveCount(1)
  })
})

test.describe('Card rail (variant 5)', () => {
  test('is a carousel below 1024 px and a grid above', async ({ page }, testInfo) => {
    await page.goto('/styleguide#karten')
    const carousel = page.getByRole('region', { name: /Beispiel-Karussell/ })
    const isDesktop = (testInfo.project.use.viewport?.width ?? 0) >= 1024
    if (isDesktop) {
      await expect(carousel).toHaveCount(0)
      return
    }
    await expect(carousel).toBeVisible()
    const status = carousel.locator('[aria-live="polite"]')
    await expect(status).toHaveText(/^1 \/ \d+$/)
    await carousel.getByRole('button', { name: 'Nächste Karte' }).click()
    await expect(status).toHaveText(/^2 \/ \d+$/)
    await carousel.getByRole('button', { name: 'Vorherige Karte' }).click()
    await expect(status).toHaveText(/^1 \/ \d+$/)
  })
})
