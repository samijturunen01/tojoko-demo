import generated from './photos.generated.json'

/**
 * Every photo on the site. Tojoko Oy has no published company photography yet, so all of
 * these are illustrative Pexels photos (free licence) – never presented as Tojoko's
 * premises, staff or work. The UI always shows a "Kuvituskuva" badge and the alt text
 * says so. Replacement plan: docs/IMAGE_REPLACEMENT_LIST.md
 */
export type PhotoKey = keyof typeof generated

export interface PhotoInfo {
  alt: string
  /** Pexels photo page (provenance) */
  source: string
  /** object-position for crops */
  focus?: string
}

export const photoInfo: Record<PhotoKey, PhotoInfo> = {
  tyokaluseina: {
    alt: 'Kuvituskuva: kiintoavaimet koon mukaisessa järjestyksessä petroolinvärisellä reikälevyllä.',
    source: 'https://www.pexels.com/photo/14637833/',
    focus: '50% 40%',
  },
  diagnoosi: {
    alt: 'Kuvituskuva: mekaanikko käyttää vianmääritystablettia, joka on kytketty auton diagnostiikkaliitäntään.',
    source: 'https://www.pexels.com/photo/4116193/',
    focus: '40% 55%',
  },
  akkutesti: {
    alt: 'Kuvituskuva: akkutesteri ja mekaanikon kädet auton konepellin alla.',
    source: 'https://www.pexels.com/photo/13065692/',
    focus: '45% 50%',
  },
  oljy: {
    alt: 'Kuvituskuva: moottoriöljyä lisätään auton moottoriin huollon yhteydessä.',
    source: 'https://www.pexels.com/photo/13065690/',
    focus: '60% 45%',
  },
  mittatikku: {
    alt: 'Kuvituskuva: moottoriöljyn määrä tarkistetaan mittatikulla.',
    source: 'https://www.pexels.com/photo/6870297/',
    focus: '40% 50%',
  },
  alusta: {
    alt: 'Kuvituskuva: mekaanikko tarkastaa nostimella olevan auton alustaa ja pyöränripustusta.',
    source: 'https://www.pexels.com/photo/4116173/',
    focus: '55% 40%',
  },
  moottoritila: {
    alt: 'Kuvituskuva: suojakäsineinen käsi työskentelee auton moottoritilassa.',
    source: 'https://www.pexels.com/photo/10490621/',
    focus: '55% 35%',
  },
  tyokalu: {
    alt: 'Kuvituskuva: vianmäärityslaite moottoritilassa korjauksen aikana.',
    source: 'https://www.pexels.com/photo/4116172/',
    focus: '60% 45%',
  },
}

export const photoSize = (key: PhotoKey) => generated[key]
