import { services } from './services'

export interface RouteMeta {
  path: string
  label: string
  title: string
  description: string
}

/** Every prerendered route with its unique title and meta description. */
export const routes: RouteMeta[] = [
  {
    path: '/',
    label: 'Etusivu',
    title: 'Autokorjaamo Joensuu – huolto, korjaus ja vianselvitys | Tojoko Oy',
    description:
      'Tojoko Oy huoltaa ja korjaa autoja Joensuun Aspitiellä ja selvittää myös hankalat viat. Google-arvio 5,0. Avoinna ma–pe 8–17 – soita 040 169 5277 tai jätä aikapyyntö.',
  },
  {
    path: '/palvelut',
    label: 'Palvelut',
    title: 'Palvelut – autohuolto, korjaukset ja vianselvitys | Tojoko, Joensuu',
    description:
      'Autohuolto, autokorjaukset ja vianselvitys Joensuussa. Näin asioit Tojokon kanssa, mistä hinta muodostuu ja mitä kannattaa kertoa, kun sovit ajan.',
  },
  ...services.map((s) => ({ path: s.path, label: s.label, title: s.seo.title, description: s.seo.description })),
  {
    path: '/korjaamo',
    label: 'Korjaamo',
    title: 'Korjaamo – autokorjaamo Salpakankaalla, Aspitie 16 | Tojoko Oy',
    description:
      'Tojoko Oy on vuonna 2020 perustettu joensuulainen autokorjaamo Salpakankaalla. Google-arvioissa kiitetään ystävällistä palvelua ja sitkeää vianselvitystä.',
  },
  {
    path: '/yhteystiedot',
    label: 'Yhteystiedot',
    title: 'Yhteystiedot ja aikapyyntö | Tojoko Oy, Aspitie 16 Joensuu',
    description:
      'Tojoko Oy, Aspitie 16, 80100 Joensuu. Puhelin 040 169 5277, avoinna ma–pe 8–17. Jätä aikapyyntö huoltoon, korjaukseen tai vianselvitykseen.',
  },
  {
    path: '/404',
    label: 'Sivua ei löytynyt',
    title: 'Sivua ei löytynyt | Tojoko Oy',
    description: 'Hakemaasi sivua ei löytynyt. Palaa etusivulle tai ota yhteyttä korjaamoon.',
  },
]

export const metaFor = (path: string) => routes.find((r) => r.path === path) ?? routes[routes.length - 1]
