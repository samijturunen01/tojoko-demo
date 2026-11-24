import { expect, test } from '@playwright/test'
import { isMobile, ready, requestForm, url } from './helpers'

test.describe('request form (demo mode)', () => {
  test('validates required fields, keeps input and focuses the first problem', async ({ page }) => {
    await page.goto(url('yhteystiedot/'))
    await ready(page)
    const form = requestForm(page)
    await form.getByLabel('Rekisterinumero').fill('abc123')
    await expect(form.getByLabel('Rekisterinumero')).toHaveValue('ABC-123')
    await form.getByRole('button', { name: 'Lähetä aikapyyntö' }).click()
    await expect(form.getByText('Valitse, mitä asia koskee.')).toBeVisible()
    await expect(form.getByText('Kirjoita nimesi.')).toBeVisible()
    await expect(form.getByText('Kirjoita puhelinnumero')).toBeVisible()
    await expect(form.locator('input[name="topic"]').first()).toBeFocused()
    await expect(form.getByLabel('Rekisterinumero')).toHaveValue('ABC-123')

    // a repair needs a short description; a bad email is flagged
    await form.getByText('Korjaus', { exact: true }).click()
    await form.getByLabel('Sähköposti').fill('ei-osoite')
    await form.getByRole('button', { name: 'Lähetä aikapyyntö' }).click()
    await expect(form.getByText('Kerro lyhyesti, mitä autossa tuntuu')).toBeVisible()
    await expect(form.getByText('Tarkista sähköpostiosoite')).toBeVisible()
    await expect(form.getByLabel(/Mitä autossa tuntuu/)).toBeFocused()
  })

  test('submits nothing anywhere and says so', async ({ page }) => {
    const posts: string[] = []
    page.on('request', (r) => r.method() !== 'GET' && posts.push(r.url()))
    await page.goto(url('yhteystiedot/'))
    await ready(page)
    const form = requestForm(page)
    await form.getByText('Huolto', { exact: true }).click()
    await form.getByLabel('Nimi').fill('Testi Asiakas')
    await form.getByLabel('Puhelin').fill('040 123 4567')
    await form.getByRole('button', { name: 'Lähetä aikapyyntö' }).click()
    await expect(page.getByText('Demoversio – viestiä ei lähetetty.')).toBeVisible()
    expect(posts).toEqual([])
    const stored = await page.evaluate(() => localStorage.length + sessionStorage.length)
    expect(stored).toBe(0)
  })

  test('service pages preselect the topic', async ({ page }) => {
    await page.goto(url('palvelut/autohuolto/'))
    await ready(page)
    await page.getByRole('link', { name: 'Pyydä aikaa: autohuolto' }).click()
    await expect(page).toHaveURL(/yhteystiedot\/?\?aihe=huolto#aikapyynto/)
    await expect(page.locator('input[name="topic"][value="huolto"]')).toBeChecked()
  })

  test('key tag preview follows the form (desktop)', async ({ page }) => {
    test.skip(isMobile(page), 'preview is desktop-only')
    await page.goto(url('yhteystiedot/'))
    await ready(page)
    const form = requestForm(page)
    await form.getByLabel('Rekisterinumero').fill('xyz-789')
    await form.getByText('Vianselvitys', { exact: true }).click()
    const tag = page.getByRole('complementary', { name: 'Aikapyynnön esikatselu' })
    await expect(tag.getByText('XYZ-789')).toBeVisible()
    await expect(tag.getByText('Vianselvitys')).toBeVisible()
  })
})

test('symptom picker explains what to tell and pre-fills the request', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const tag = page.getByRole('button', { name: /Jarrut tuntuvat oudoilta/ })
  await tag.click()
  await expect(tag).toHaveAttribute('aria-pressed', 'true')
  const panel = page.locator('#oire-paneeli')
  await expect(panel.getByRole('heading', { name: 'Jarrut tuntuvat oudoilta' })).toBeVisible()
  await expect(panel.getByText(/älä jatka ajoa/)).toBeVisible()
  await panel.getByRole('link', { name: /Jatka aikapyyntöön/ }).click()
  await expect(page).toHaveURL(/yhteystiedot\/?\?aihe=korjaus&oire=jarrut#aikapyynto/)
  await expect(page.locator('input[name="topic"][value="korjaus"]')).toBeChecked()
  await expect(page.locator('textarea[name="description"]')).toHaveValue('Jarrut tuntuvat oudoilta: ')
})

test('map loads only on request and points to Aspitie 16, Joensuu', async ({ page }) => {
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  await expect(page.locator('iframe')).toHaveCount(0)
  await expect(page.getByRole('link', { name: /Katso reittiohjeet/ })).toHaveAttribute('href', /destination=Tojoko%20Oy%2C%20Aspitie%2016%2C%2080100%20Joensuu/)
  await expect(page.getByRole('link', { name: /Avaa Google Mapsissa/ })).toHaveAttribute('href', /query_place_id=ChIJN7pv_nGGm0YRkVATXzlg6wU/)
  await page.getByRole('button', { name: 'Näytä kartta' }).click()
  await expect(page.locator('iframe')).toHaveAttribute('src', /Aspitie%2016%2C%2080100%20Joensuu/)
})

test('Google rating links to the official reviews', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const link = page.getByRole('link', { name: /Google-arvio 5,0\/5, 6 arviota/ }).first()
  await expect(link).toHaveAttribute('href', 'https://search.google.com/local/reviews?placeid=ChIJN7pv_nGGm0YRkVATXzlg6wU')
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('rel', /noopener/)
})

test('FAQ items expand', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const item = page.locator('details').filter({ hasText: 'Milloin korjaamo on auki?' })
  await item.locator('summary').click()
  await expect(item.getByText('Maanantaista perjantaihin klo 8–17')).toBeVisible()
})

test('open-now indicator follows Finnish weekday hours', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-24T10:00:00+02:00')) // Tuesday 10.00
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  await expect(page.getByText('Korjaamo on auki – tänään klo 17.00 asti').first()).toBeVisible()
  await page.clock.setFixedTime(new Date('2026-11-28T12:00:00+02:00')) // Saturday
  await page.reload()
  await ready(page)
  await expect(page.getByText('Korjaamo aukeaa maanantaina klo 8.00').first()).toBeVisible()
})
