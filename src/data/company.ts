/**
 * Verified company facts – single source of truth for the whole site.
 * Sources and verification dates: docs/CONTENT_SOURCES.md
 *  - PRH / YTJ open data (avoindata.prh.fi): name, Y-tunnus, registration dates, address, line of business
 *  - Google Business Profile "Tojoko Oy": phone, opening hours, category, rating + review count
 *  - Fonecta / Finder: address, line of business, phone prefix 040 169 … (matches Google)
 * Nothing here is invented. Items that still need the owner's confirmation are listed in the docs.
 */
const placeId = 'ChIJN7pv_nGGm0YRkVATXzlg6wU'
const q = encodeURIComponent('Tojoko Oy, Aspitie 16, 80100 Joensuu')

export const company = {
  name: 'Tojoko Oy',
  brand: 'Tojoko',
  businessId: '3119564-8',
  /** Y-tunnus granted 14.2.2020, Trade Register entry 7.4.2020 */
  foundedYear: 2020,
  founded: '14.2.2020',
  homeCity: 'Joensuu',
  lineOfBusiness: 'Autokorjaamo ja autohuolto',
  phone: {
    display: '040 169 5277',
    e164: '+358401695277',
    href: 'tel:+358401695277',
  },
  address: {
    street: 'Aspitie 16',
    postalCode: '80100',
    city: 'Joensuu',
    area: 'Salpakangas',
    region: 'Pohjois-Karjala',
  },
  geo: { lat: 62.6293595, lon: 29.786832 },
  /** Regular opening hours (Google Business Profile, checked 24.11.2026). Minutes since midnight. */
  schedule: [{ days: [1, 2, 3, 4, 5] as const, open: 8 * 60, close: 17 * 60 }],
  hoursShort: 'ma–pe 8–17',
  hoursRows: [
    { label: 'Maanantai–perjantai', value: '8.00–17.00' },
    { label: 'Lauantai', value: 'suljettu' },
    { label: 'Sunnuntai', value: 'suljettu' },
  ],
  google: {
    placeId,
    rating: 5,
    ratingText: '5,0',
    count: 6,
    checked: '24.11.2026',
    reviewsUrl: `https://search.google.com/local/reviews?placeid=${placeId}`,
    writeReviewUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
  },
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${q}&query_place_id=${placeId}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${q}&destination_place_id=${placeId}`,
  mapEmbedUrl: `https://maps.google.com/maps?q=${q}&z=15&hl=fi&output=embed`,
} as const

export type Company = typeof company
