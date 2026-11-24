import { company } from '../data/company'

/** Current weekday (1 = Mon … 7 = Sun) and minutes since midnight in Finnish time. */
function helsinkiNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Helsinki',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(get('weekday')) + 1
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

const fmt = (m: number) => `${Math.floor(m / 60)}.${String(m % 60).padStart(2, '0')}`

export interface OpenState {
  open: boolean
  text: string
}

/**
 * Regular opening hours only – public holidays are not published by the company,
 * so the UI always pairs this with a note to confirm holiday hours by phone.
 */
export function openState(date = new Date()): OpenState {
  const { day, minutes } = helsinkiNow(date)
  const today = company.schedule.find((s) => (s.days as readonly number[]).includes(day))
  if (today && minutes >= today.open && minutes < today.close) {
    return { open: true, text: `Korjaamo on auki – tänään klo ${fmt(today.close)} asti` }
  }
  // Next opening
  for (let i = 0; i < 8; i++) {
    const d = ((day - 1 + i) % 7) + 1
    const s = company.schedule.find((x) => (x.days as readonly number[]).includes(d))
    if (!s) continue
    if (i === 0 && minutes < s.open) return { open: false, text: `Korjaamo aukeaa tänään klo ${fmt(s.open)}` }
    if (i === 1) return { open: false, text: `Korjaamo aukeaa huomenna klo ${fmt(s.open)}` }
    if (i > 1) {
      const names = ['', 'maanantaina', 'tiistaina', 'keskiviikkona', 'torstaina', 'perjantaina', 'lauantaina', 'sunnuntaina']
      return { open: false, text: `Korjaamo aukeaa ${names[d]} klo ${fmt(s.open)}` }
    }
  }
  return { open: false, text: 'Korjaamo on suljettu' }
}
