import type { PhotoKey } from './photos'

/**
 * Services. Only what is supported by the sources is presented as the company's offer:
 * the registered line of business ("autokorjaamo ja autohuolto"), the Google category
 * ("Auton korjaus ja huolto") and what the public Google reviews describe (servicing,
 * repairs, persistent troubleshooting). Specific job types (tyres, A/C, brands …) are NOT
 * claimed – they are listed for owner confirmation in docs/CONTENT_SOURCES.md.
 */
export type TopicId = 'huolto' | 'korjaus' | 'vianselvitys' | 'muu'
export type ServiceId = Exclude<TopicId, 'muu'>

export const topics: { id: TopicId; label: string }[] = [
  { id: 'huolto', label: 'Huolto' },
  { id: 'korjaus', label: 'Korjaus' },
  { id: 'vianselvitys', label: 'Vianselvitys' },
  { id: 'muu', label: 'Muu asia' },
]

export interface Qa {
  q: string
  a: string
}

export interface Service {
  id: ServiceId
  path: string
  num: string
  label: string
  title: string
  kicker: string
  short: string
  lead: string
  photo: PhotoKey
  secondaryPhoto: PhotoKey
  tool: 'oilcan' | 'wrench' | 'probe'
  need: { title: string; text: string }
  pointsTitle: string
  points: { title: string; text: string }[]
  tell: string[]
  faq: Qa[]
  seo: { title: string; description: string }
}

export const services: Service[] = [
  {
    id: 'huolto',
    path: '/palvelut/autohuolto',
    num: '01',
    label: 'Autohuolto',
    title: 'Autohuolto Joensuussa',
    kicker: 'Huolto',
    short: 'Määräaikaishuolto pitää auton luotettavana. Kerro rekisterinumero ja mittarilukema, niin huollosta on helppo sopia.',
    lead: 'Säännöllinen huolto pitää auton luotettavana ja auttaa huomaamaan kuluneet osat ennen kuin niistä tulee vikoja tien päällä. Tojoko huoltaa autoja Joensuun Salpakankaalla, Aspitie 16:ssa.',
    photo: 'oljy',
    secondaryPhoto: 'mittatikku',
    tool: 'oilcan',
    need: {
      title: 'Milloin huoltoon?',
      text: 'Auton huoltoväli löytyy huoltokirjasta tai valmistajan huolto-ohjelmasta, yleensä sekä kilometreinä että aikana – kumpi täyttyy ensin. Myös mittaristoon syttyvä huoltomuistutus kertoo, että huolto lähestyy.',
    },
    pointsTitle: 'Miksi huolto kannattaa tehdä ajallaan',
    points: [
      {
        title: 'Toimintavarma arki',
        text: 'Säännöllisesti huollettu auto pysyy paremmin toimintakuntoisena – myös pohjoiskarjalaisina pakkasaamuina, kun autoa tarvitaan eniten.',
      },
      {
        title: 'Kuluneet osat ajoissa',
        text: 'Kun kuluminen huomataan huollon yhteydessä, korjauksen voi tehdä suunnitellusti – ennen kuin siitä tulee kiireellinen ja kalliimpi vika.',
      },
      {
        title: 'Huoltohistoria talteen',
        text: 'Dokumentoitu huoltohistoria kertoo auton kunnosta myös seuraavalle omistajalle. Kysy huoltomerkinnästä, kun sovit huollosta.',
      },
    ],
    tell: [
      'Rekisterinumero',
      'Mittarilukema',
      'Milloin auto on viimeksi huollettu',
      'Onko mielessä muuta – äänet, vikavalot tai lähestyvä katsastus',
    ],
    faq: [
      {
        q: 'Säilyykö auton takuu, jos huollatan sen muualla kuin merkkikorjaamolla?',
        a: 'EU:n kilpailusääntöjen mukaan autonvalmistaja ei voi asettaa takuun ehdoksi, että määräaikaishuollot tehdään valmistajan omassa huoltoverkostossa, kunhan huolto tehdään valmistajan ohjeiden mukaisesti. Takuukorjaukset tehdään yleensä merkkikorjaamolla. Tarkista oman autosi takuuehdot ja mainitse takuu, kun sovit huollosta.',
      },
      {
        q: 'Mitä huolto maksaa?',
        a: 'Huoltojen hintoja ei ole julkaistu, koska hinta riippuu auton merkistä, mallista ja huollon laajuudesta. Kysy hinta-arviota puhelimessa tai aikapyynnössä – rekisterinumero ja mittarilukema auttavat arvioimaan työn.',
      },
      {
        q: 'Kauanko huolto kestää?',
        a: 'Kesto riippuu autosta ja huollon laajuudesta. Kysy arvio, kun sovit ajan, niin osaat suunnitella päiväsi.',
      },
    ],
    seo: {
      title: 'Autohuolto Joensuu – määräaikaishuolto | Tojoko Oy',
      description:
        'Autohuolto Joensuussa: Tojoko huoltaa autoja Aspitie 16:ssa, Salpakankaalla. Avoinna ma–pe 8–17. Soita 040 169 5277 tai jätä aikapyyntö.',
    },
  },
  {
    id: 'korjaus',
    path: '/palvelut/autokorjaukset',
    num: '02',
    label: 'Autokorjaukset',
    title: 'Autokorjaukset Joensuussa',
    kicker: 'Korjaukset',
    short: 'Äänet, vuodot, kuluneet osat ja katsastuksessa löytyneet viat. Kerro mitä olet huomannut, niin korjauksesta on helppo sopia.',
    lead: 'Kolina alustasta, läiskä pihassa tai hylätty katsastus – kun autossa on jotain vialla, kerro mitä olet huomannut ja sovi aika korjaamolle. Tojoko korjaa autoja Aspitie 16:ssa, Joensuussa.',
    photo: 'alusta',
    secondaryPhoto: 'moottoritila',
    tool: 'wrench',
    need: {
      title: 'Kun jokin ei tunnu oikealta',
      text: 'Pieni ääni tai hidas vuoto harvoin korjaantuu itsestään. Kun vika tarkistetaan ajoissa, korjaus on usein pienempi ja sen voi ajoittaa omaan kalenteriin sopivaksi.',
    },
    pointsTitle: 'Tyypillisiä tilanteita',
    points: [
      {
        title: 'Katsastuksessa tuli huomautus',
        text: 'Kerro katsastuspöytäkirjassa mainitut viat ja jälkitarkastuksen määräaika, niin korjauksen voi suunnitella aikataulun mukaan.',
      },
      {
        title: 'Ääni, tärinä tai outo tuntuma',
        text: 'Kolina kuoppaisella tiellä, vinkuna jarrutettaessa tai tärinä tietyllä nopeudella ovat merkkejä, jotka kannattaa tarkistuttaa ennen kuin vika pahenee.',
      },
      {
        title: 'Vuoto tai kulunut osa',
        text: 'Nesteläiskä auton alla tai osa, joka on tullut tiensä päähän. Kerro nesteen väri ja kohta, josta se näyttää tulevan.',
      },
    ],
    tell: [
      'Rekisterinumero sekä merkki ja malli',
      'Mitä olet huomannut ja milloin se alkoi',
      'Missä tilanteessa oire ilmenee',
      'Katsastuspöytäkirjan viat, jos korjaus liittyy katsastukseen',
    ],
    faq: [
      {
        q: 'Voinko kysyä hinta-arviota ennen korjausta?',
        a: 'Kysy arviota, kun sovit korjauksesta. Mitä tarkemmin kerrot oireista ja autosta, sitä helpompi työtä on arvioida. Jos vian syy ei ole vielä selvä, arvio tarkentuu, kun vika on löydetty.',
      },
      {
        q: 'Korjataanko Tojokolla kaikkia automerkkejä?',
        a: 'Kerro auton merkki, malli ja vuosimalli puhelimessa tai aikapyynnössä, niin kuulet suoraan, sopiiko työ korjaamolle.',
      },
      {
        q: 'Mitä teen, jos auto hylättiin katsastuksessa?',
        a: 'Sovi korjaus hyvissä ajoin ennen jälkitarkastuksen määräaikaa ja kerro pöytäkirjassa mainitut viat. Kun viat on korjattu, auto viedään jälkitarkastukseen katsastusasemalle.',
      },
    ],
    seo: {
      title: 'Autokorjaukset Joensuu – korjaamo Aspitiellä | Tojoko Oy',
      description:
        'Autojen korjaukset Joensuussa: äänet, vuodot, kuluneet osat ja katsastuksessa havaitut viat. Tojoko Oy, Aspitie 16, avoinna ma–pe 8–17. Soita 040 169 5277.',
    },
  },
  {
    id: 'vianselvitys',
    path: '/palvelut/vianselvitys',
    num: '03',
    label: 'Vianselvitys',
    title: 'Vianselvitys – kun vika ei löydy helpolla',
    kicker: 'Vianselvitys',
    short: 'Vikavalot, ajoittain ilmenevät oireet ja viat, joiden syy ei ole löytynyt. Google-arvioissa kiitetään sitkeyttä juuri näissä.',
    lead: 'Osa vioista ilmenee vain joskus, osa piiloutuu auton sähköjärjestelmiin ja osan syytä on jo etsitty muualla. Google-arvioissa Tojokoa kiitetään erityisesti sitkeydestä hankalien vikojen selvittämisessä.',
    photo: 'diagnoosi',
    secondaryPhoto: 'akkutesti',
    tool: 'probe',
    need: {
      title: 'Miksi jotkin viat ovat hankalia?',
      text: 'Vika voi näkyä vain kylmällä moottorilla tai vasta pitkällä ajolla, oireen taustalla voi olla useampi syy, ja nykyauton toiminnot kulkevat ohjainlaitteiden ja johtosarjojen kautta. Syyn löytäminen vaatii järjestelmällistä selvittämistä – ja tietoa siitä, mitä kuljettaja on huomannut.',
    },
    pointsTitle: 'Mistä vianselvitys usein alkaa',
    points: [
      {
        title: 'Vikavalo mittaristossa',
        text: 'Vikavalo kertoo, että auton järjestelmä on havainnut poikkeaman. Pelkkä vikakoodi ei aina kerro syytä – se on lähtöpiste, ei vastaus.',
      },
      {
        title: 'Ajoittain ilmenevä oire',
        text: 'Oire, joka tulee ja menee, on vaikein selvitettävä. Kirjaa ylös, missä tilanteessa se ilmenee: lämpötila, nopeus, kuormitus, sää.',
      },
      {
        title: 'Vika, jonka syy ei ole löytynyt',
        text: 'Jos autoa on jo tutkittu tai osia vaihdettu ilman apua, kerro mitä on tehty. Se säästää aikaa ja auttaa rajaamaan vaihtoehtoja.',
      },
    ],
    tell: [
      'Milloin oire alkoi ja kuinka usein se toistuu',
      'Missä tilanteessa oire ilmenee – kylmä tai lämmin moottori, nopeus, sää',
      'Palaako mittaristossa varoitusvaloja (valokuva mittaristosta auttaa)',
      'Mitä autolle on jo tehty: luetut vikakoodit, vaihdetut osat, aiemmat korjaukset',
    ],
    faq: [
      {
        q: 'Mitä vianselvitys maksaa?',
        a: 'Vianselvityksen kesto riippuu viasta, joten tarkkaa hintaa on vaikea sanoa ennen kuin autoa on tutkittu. Kysy, miten työstä sovitaan ja miten se laskutetaan, kun sovit ajan.',
      },
      {
        q: 'Voinko tuoda auton, jonka vikaa ei ole löytynyt muualla?',
        a: 'Kysy rohkeasti – Google-arvioissa Tojokoa kiitetään juuri tällaisten vikojen selvittämisestä. Kerro, mitä autolle on jo tehty ja mitä on todettu, esimerkiksi luetut vikakoodit ja vaihdetut osat.',
      },
      {
        q: 'Voinko ajaa autolla, jos vikavalo palaa?',
        a: 'Se riippuu valosta. Jos mittaristoon syttyy punainen varoitusvalo tai moottorin vikavalo vilkkuu, pysähdy turvalliseen paikkaan ja tarkista auton käyttöohjeesta, voiko ajoa jatkaa. Keltainen valo tarkoittaa yleensä, että vika kannattaa selvittää pian. Epävarmassa tilanteessa soita.',
      },
    ],
    seo: {
      title: 'Vianselvitys Joensuu – vikavalot ja hankalat viat | Tojoko Oy',
      description:
        'Vikavalo palaa tai vika ei löydy? Tojoko selvittää autojen vikoja Joensuun Aspitiellä. Google-arvioissa kiitetään sitkeyttä hankalissa vioissa. Soita 040 169 5277.',
    },
  },
]

export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!
