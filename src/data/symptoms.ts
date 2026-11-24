import type { TopicId } from './services'

/**
 * "Mitä autossa tuntuu?" – symptom tags on the homepage. They help visitors describe the
 * problem well (better, more qualified requests) and pre-fill the request form.
 * The advice is general, safety-first guidance – not a diagnosis and not a service promise.
 */
export interface Symptom {
  id: string
  label: string
  topic: TopicId
  intro: string
  tell: string[]
  urgent?: string
}

export const symptoms: Symptom[] = [
  {
    id: 'vikavalo',
    label: 'Vikavalo palaa',
    topic: 'vianselvitys',
    intro: 'Vikavalo kertoo, että auton järjestelmä on havainnut poikkeaman. Syy selviää vianselvityksellä.',
    tell: ['Mikä valo palaa ja milloin se syttyi', 'Palaako valo jatkuvasti vai vain joskus', 'Muuttuiko auton käytös: teho, käynti, äänet'],
    urgent: 'Jos punainen varoitusvalo syttyy tai moottorin vikavalo vilkkuu, pysähdy turvalliseen paikkaan ja tarkista käyttöohjeesta, voiko ajoa jatkaa.',
  },
  {
    id: 'aani',
    label: 'Outo ääni tai tärinä',
    topic: 'vianselvitys',
    intro: 'Ääni on usein ensimmäinen merkki viasta. Tarkka kuvaus auttaa paikantamaan sen nopeammin.',
    tell: ['Kuuluuko ääni käynnistäessä, kiihdyttäessä, jarruttaessa vai kaarteissa', 'Mistä päin autoa ääni kuuluu', 'Millainen ääni on: kolina, vinkuna, jyrinä, naksutus'],
  },
  {
    id: 'kaynnistys',
    label: 'Käynnistyy huonosti',
    topic: 'vianselvitys',
    intro: 'Huono käynnistyminen voi johtua monesta asiasta – siksi olosuhteet kannattaa kertoa tarkkaan.',
    tell: ['Käynnistyykö huonosti kylmänä, lämpimänä vai molemmissa', 'Pyöriikö käynnistinmoottori normaalisti', 'Kuinka vanha akku on, ja onko mittaristossa ilmoituksia'],
  },
  {
    id: 'jarrut',
    label: 'Jarrut tuntuvat oudoilta',
    topic: 'korjaus',
    intro: 'Jarrujen muutoksia ei kannata jäädä seuraamaan. Kerro, mitä olet huomannut.',
    tell: ['Onko poljin pehmeä, pitkä tai tavallista raskaampi', 'Vetääkö auto sivulle jarrutettaessa', 'Kuuluuko jarruista ääntä tai tuntuuko tärinää'],
    urgent: 'Jos jarrut tuntuvat selvästi heikoilta, älä jatka ajoa – soita ja sovi, miten edetään.',
  },
  {
    id: 'vuoto',
    label: 'Auton alla on vuoto',
    topic: 'korjaus',
    intro: 'Nesteen väri ja paikka kertovat paljon siitä, mistä vuoto voi olla peräisin.',
    tell: ['Nesteen väri ja koostumus', 'Missä kohtaa autoa läiskä on', 'Kuinka paljon nestettä tulee ja laskeeko jonkin nesteen pinta'],
  },
  {
    id: 'katsastus',
    label: 'Katsastuksessa tuli huomautus',
    topic: 'korjaus',
    intro: 'Katsastuspöytäkirja kertoo tarkasti, mitä pitää korjata – ja mihin mennessä.',
    tell: ['Pöytäkirjassa mainitut viat', 'Jälkitarkastuksen määräaika', 'Rekisterinumero sekä merkki ja malli'],
  },
  {
    id: 'huolto',
    label: 'Huolto lähestyy',
    topic: 'huolto',
    intro: 'Huoltoväli löytyy huoltokirjasta tai valmistajan huolto-ohjelmasta. Muistutus mittaristossa on hyvä hetki sopia aika.',
    tell: ['Rekisterinumero ja mittarilukema', 'Milloin auto on viimeksi huollettu', 'Onko mielessä muuta korjattavaa'],
  },
]

export const symptomById = (id: string | null | undefined) => symptoms.find((s) => s.id === id)
