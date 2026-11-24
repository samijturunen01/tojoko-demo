import type { Page } from '@playwright/test'

export const BASE = '/tojoko-demo/'
export const url = (p = '') => `${BASE}${p}`

export const routes = [
  { path: '', h1: /Autohuolto ja korjaus Joensuussa/i },
  { path: 'palvelut/', h1: /Autohuolto, korjaukset ja vianselvitys Joensuussa/i },
  { path: 'palvelut/autohuolto/', h1: /^Autohuolto Joensuussa$/i },
  { path: 'palvelut/autokorjaukset/', h1: /^Autokorjaukset Joensuussa$/i },
  { path: 'palvelut/vianselvitys/', h1: /Vianselvitys – kun vika ei löydy helpolla/i },
  { path: 'korjaamo/', h1: /Autokorjaamo Salpakankaalla, Aspitie 16/i },
  { path: 'yhteystiedot/', h1: /Yhteystiedot ja aikapyyntö/i },
]

export const navLabels = ['Etusivu', 'Palvelut', 'Korjaamo', 'Yhteystiedot']

export const PHONE = 'tel:+358401695277'

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024

/** Wait until the app has hydrated. */
export const ready = (page: Page) => page.waitForFunction(() => (window as unknown as { __tojokoReady?: boolean }).__tojokoReady === true)

export async function openNav(page: Page) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Avaa valikko' }).click()
    await page.getByRole('dialog', { name: 'Valikko' }).waitFor()
    return page.getByRole('navigation', { name: 'Mobiilivalikko' })
  }
  return page.getByRole('navigation', { name: 'Päävalikko' })
}

export const hasIntro = (page: Page) => page.evaluate(() => document.documentElement.classList.contains('intro'))

/** The request form on the contact page. */
export const requestForm = (page: Page) => page.locator('form').filter({ has: page.getByRole('heading', { name: 'Aikapyyntö', exact: true }) })
