export const mainNav = [
  { label: 'Etusivu', path: '/' },
  { label: 'Palvelut', path: '/palvelut' },
  { label: 'Korjaamo', path: '/korjaamo' },
  { label: 'Yhteystiedot', path: '/yhteystiedot' },
] as const

/** Request form section on the contact page. */
export const REQUEST_HASH = 'aikapyynto'
export const requestHref = (params?: Record<string, string>) => {
  const qs = params ? new URLSearchParams(params).toString() : ''
  return `/yhteystiedot${qs ? `?${qs}` : ''}#${REQUEST_HASH}`
}
