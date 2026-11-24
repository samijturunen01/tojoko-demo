import { expect, test } from '@playwright/test'
import { hasIntro, openNav, ready, routes, url } from './helpers'

const YELLOW = 'rgb(255, 201, 51)'
const okFill = (page: import('@playwright/test').Page) => page.locator('.hb-ok:visible').first().evaluate((el) => getComputedStyle(el).fill)

test('intro plays on every fresh homepage load and refresh, and content is usable at once', async ({ page }) => {
  await page.goto(url())
  expect(await hasIntro(page)).toBe(true)
  // H1 and primary CTA are visible immediately – the intro never blocks the page
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Pyydä aikaa korjaamolle' }).first()).toBeVisible()
  await ready(page)
  await expect.poll(() => hasIntro(page), { timeout: 6000 }).toBe(false)

  await page.reload()
  expect(await hasIntro(page)).toBe(true)
})

test('the wordmark ends with every letter in place and "OK" lit', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await expect.poll(() => hasIntro(page), { timeout: 6000 }).toBe(false)
  expect(await okFill(page)).toBe(YELLOW)
  const opacities = await page.locator('.hb-letter:visible').evaluateAll((els) => els.map((e) => getComputedStyle(e).opacity))
  expect(opacities.length).toBe(6)
  expect(opacities.every((o) => o === '1')).toBe(true)
})

test('intro does not replay when returning to the homepage via in-app navigation', async ({ page }) => {
  await page.goto(url('palvelut/'))
  await ready(page)
  expect(await hasIntro(page)).toBe(false)
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Etusivu$/ }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
  expect(await hasIntro(page)).toBe(false)

  // also: start on the homepage, leave during the intro and come back
  await page.goto(url())
  await ready(page)
  const nav2 = await openNav(page)
  await nav2.getByRole('link', { name: /Korjaamo$/ }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[5].h1)
  await page.goBack()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
  expect(await hasIntro(page)).toBe(false)
  expect(await okFill(page)).toBe(YELLOW)
})

test('reduced motion: no intro, final state shown', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto(url())
  expect(await hasIntro(page)).toBe(false)
  expect(await okFill(page)).toBe(YELLOW)
  await ctx.close()
})

test('without JavaScript the prerendered page shows content and the wordmark in place', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false })
  const page = await ctx.newPage()
  await page.goto(url())
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
  // inline script cannot run → no intro class → final state
  expect(await page.evaluate(() => document.documentElement.className)).toBe('')
  await ctx.close()
})
