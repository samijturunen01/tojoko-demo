import type { FieldErrors, ServiceRequest } from './types'

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE = /^\+?[0-9 ()-]{6,20}$/
/** Finnish plates are typically ABC-123; other formats (e.g. foreign plates) are allowed. */
export const PLATE = /^[A-ZÅÄÖ0-9]{1,4}-?[A-ZÅÄÖ0-9]{1,4}$/

/** Normalise typed plate text: uppercase, no spaces, hyphen between letters and digits. */
export function formatPlate(raw: string) {
  const v = raw.toUpperCase().replace(/[^A-ZÅÄÖ0-9-]/g, '').slice(0, 9)
  const m = v.replace(/-/g, '').match(/^([A-ZÅÄÖ]{1,3})(\d{1,3})$/)
  return m ? `${m[1]}-${m[2]}` : v
}

/** Client-side validation. A future backend must validate again server-side. */
export function validate(d: ServiceRequest): FieldErrors {
  const e: FieldErrors = {}
  if (!d.topic) e.topic = 'Valitse, mitä asia koskee.'
  if (d.plate.trim() && !PLATE.test(d.plate.trim())) e.plate = 'Tarkista rekisterinumero (esim. ABC-123) – tai jätä kenttä tyhjäksi.'
  if (d.topic && d.topic !== 'huolto' && d.description.trim().length < 5)
    e.description = 'Kerro lyhyesti, mitä autossa tuntuu tai mitä pitäisi tehdä.'
  if (d.description.length > 2000) e.description = 'Kuvaus on liian pitkä (enintään 2000 merkkiä).'
  if (d.name.trim().length < 2) e.name = 'Kirjoita nimesi.'
  if (!d.phone.trim()) e.phone = 'Kirjoita puhelinnumero, johon korjaamo voi soittaa.'
  else if (!PHONE.test(d.phone.trim())) e.phone = 'Tarkista puhelinnumero (esim. 040 123 4567).'
  if (d.email.trim() && !EMAIL.test(d.email.trim())) e.email = 'Tarkista sähköpostiosoite – tai jätä kenttä tyhjäksi.'
  return e
}
