import { expect, test } from '@playwright/test'
import { ready, routes, url } from './helpers'

test.describe('every page', () => {
  for (const r of routes) {
    test(`/${r.path} renders, is noindex and has unique metadata`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (e) => errors.push(String(e)))
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
      const res = await page.goto(url(r.path))
      expect(res?.status()).toBe(200)
      await ready(page)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(r.h1)
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
      expect(await page.title()).toMatch(/Tojoko/)
      expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy()
      // Prerendered HTML already contains the page content (no client-only rendering)
      const html = await (await page.request.get(url(r.path))).text()
      expect(html).toContain('<h1')
      expect(errors).toEqual([])
    })
  }

  test('titles and descriptions are unique', async ({ request }) => {
    const titles = new Set<string>()
    const descs = new Set<string>()
    for (const r of routes) {
      const html = await (await request.get(url(r.path))).text()
      titles.add(html.match(/<title>([^<]+)<\/title>/)![1])
      descs.add(html.match(/<meta name="description" content="([^"]+)"/)![1])
    }
    expect(titles.size).toBe(routes.length)
    expect(descs.size).toBe(routes.length)
  })

  test('custom 404 page for unknown URLs', async ({ page }) => {
    const res = await page.goto(url('ei-tallaista-sivua/'))
    expect(res?.status()).toBe(404)
    await ready(page)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Tämä koukku on tyhjä/i)
    await page.getByRole('link', { name: 'Etusivulle', exact: true }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
  })

  test('robots.txt allows crawling so the noindex directive can be read; sitemap exists', async ({ request }) => {
    const robots = await (await request.get(url('robots.txt'))).text()
    expect(robots).toContain('Allow: /')
    expect(robots).not.toMatch(/Disallow:\s*\/\s*$/m)
    expect((await request.get(url('sitemap.xml'))).status()).toBe(200)
  })
})

test.describe('layout at representative widths', () => {
  for (const width of [360, 390, 768, 1024, 1440]) {
    test(`no horizontal overflow at ${width}px`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } })
      const page = await ctx.newPage()
      for (const r of routes) {
        await page.goto(url(r.path))
        await ready(page)
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
        expect(overflow, `/${r.path} at ${width}px`).toBeLessThanOrEqual(0)
      }
      await ctx.close()
    })
  }
})

test('no third-party requests, cookies or trackers on load', async ({ page, context }) => {
  const external: string[] = []
  page.on('request', (req) => {
    const u = new URL(req.url())
    if (!['127.0.0.1', 'localhost', 'samijturunen01.github.io'].includes(u.hostname)) external.push(u.hostname)
  })
  for (const r of routes) {
    await page.goto(url(r.path))
    await ready(page)
  }
  expect(external).toEqual([])
  expect(await context.cookies()).toEqual([])
})

test('images load and have alt text', async ({ page }) => {
  for (const r of routes) {
    await page.goto(url(r.path))
    await ready(page)
    await page.evaluate(() => document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')))
    await page.waitForLoadState('networkidle')
    const broken = await page.evaluate(() =>
      [...document.images].filter((i) => !i.complete || i.naturalWidth === 0 || i.getAttribute('alt') === null).map((i) => i.src),
    )
    expect(broken, `/${r.path}`).toEqual([])
  }
})
