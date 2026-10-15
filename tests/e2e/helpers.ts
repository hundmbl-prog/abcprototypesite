import AxeBuilder from '@axe-core/playwright'
import { expect, type Page } from '@playwright/test'

/** Collects console errors/warnings, page errors and failed requests (status ≥ 400) for one page. */
export function watchProblems(page: Page) {
  const problems: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning')
      problems.push(`${msg.type()}: ${msg.text()}`)
  })
  page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`))
  page.on('response', (res) => {
    if (res.status() >= 400) problems.push(`HTTP ${res.status()}: ${res.url()}`)
  })
  return problems
}

export async function expectNoAxeViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
  const summary = results.violations.map(
    (v) =>
      `${v.id}: ${v.nodes.length} × ${v.help} → ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`,
  )
  expect(summary).toEqual([])
}

export async function expectHeadingOrder(page: Page) {
  await expect(page.locator('h1')).toHaveCount(1)
  const levels = await page
    .locator('h1, h2, h3, h4, h5, h6')
    .evaluateAll((els) => els.map((el) => Number(el.tagName.slice(1))))
  for (let i = 1; i < levels.length; i++) {
    expect(levels[i]! - levels[i - 1]!, `heading jump at index ${i}`).toBeLessThanOrEqual(1)
  }
}

/** Scrolls through the whole page so lazy images and scroll reveals run. */
export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
  })
}

/** Waits until all scroll-reveal animations have finished (elements fully visible). */
export async function waitForReveals(page: Page) {
  await page.waitForFunction(() =>
    Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).every(
      (el) => getComputedStyle(el).opacity === '1',
    ),
  )
}
