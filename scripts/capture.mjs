/**
 * Dev tool: screenshots of the built site (serve dist first: npm run preview).
 * Usage: node scripts/capture.mjs <outDir> [route=/] [widths=1440,390] [--full] [--wait=ms] [--reduced]
 */
import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'

const [outDir = 'shots', route = '/', widthsArg = '1440,390', ...flags] = process.argv.slice(2)
const full = flags.includes('--full')
const reduced = flags.includes('--reduced')
const wait = Number((flags.find((f) => f.startsWith('--wait=')) || '--wait=2600').split('=')[1])
const base = process.env.BASE || 'http://127.0.0.1:4336/tojoko-demo'
await fs.mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
for (const w of widthsArg.split(',').map(Number)) {
  const h = w < 500 ? 844 : w < 900 ? 1024 : 900
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
    reducedMotion: reduced ? 'reduce' : 'no-preference',
    isMobile: w < 500,
    hasTouch: w < 500,
  })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(base + route, { waitUntil: 'networkidle' })
  await page.waitForTimeout(wait)
  if (full) {
    // trigger reveals
    const height = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < height; y += 500) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y)
      await page.waitForTimeout(90)
    }
    // Full-page shots don't scroll: load lazy images and finish reveals explicitly.
    await page.evaluate(() =>
      Promise.all(
        [...document.images].map((i) => {
          i.loading = 'eager'
          return i.complete ? 0 : new Promise((r) => ((i.onload = r), (i.onerror = r)))
        }),
      ),
    )
    await page.evaluate(() => document.querySelectorAll('[data-reveal],[data-wipe]').forEach((e) => e.classList.add('is-in')))
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(1200)
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  const name = `${outDir}/${route.replace(/[^a-z0-9]+/gi, '_') || 'home'}_${w}${full ? '_full' : ''}.png`
  await page.screenshot({ path: name, fullPage: full })
  console.log(name, 'overflowX:', overflow, errors.length ? 'ERRORS: ' + errors.join(' | ') : '')
  await ctx.close()
}
await browser.close()
