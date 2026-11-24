import { company } from './company'
import type { Qa } from './services'

/** General questions (homepage + Palvelut). Answers use verified facts only. */
export const faqs: Qa[] = [
  {
    q: 'Mitä Tojoko tekee?',
    a: 'Tojoko Oy on joensuulainen autokorjaamo, joka huoltaa ja korjaa autoja sekä selvittää vikoja. Korjaamo sijaitsee Salpakankaalla, osoitteessa Aspitie 16.',
  },
  {
    q: 'Milloin korjaamo on auki?',
    a: `Maanantaista perjantaihin klo 8–17. Lauantaisin ja sunnuntaisin korjaamo on suljettu. Arkipyhien aukiolo kannattaa varmistaa soittamalla numeroon ${company.phone.display}.`,
  },
  {
    q: 'Miten saan ajan korjaamolle?',
    a: `Soita numeroon ${company.phone.display} tai jätä aikapyyntö tällä sivustolla. Kerro rekisterinumero ja mitä autolle pitäisi tehdä, niin ajasta on helppo sopia.`,
  },
  {
    q: 'Missä korjaamo sijaitsee?',
    a: 'Osoitteessa Aspitie 16, 80100 Joensuu – Salpakankaan yritysalueella Raatekankaalla. Reittiohjeet löytyvät Yhteystiedot-sivulta.',
  },
  {
    q: 'Mistä korjauksen hinta muodostuu?',
    a: 'Hinta riippuu työn kestosta, tarvittavista osista sekä auton merkistä ja mallista. Hintoja ei ole julkaistu, joten kysy arviota, kun sovit työstä – mitä tarkemmin kerrot autosta ja oireista, sitä helpompi työtä on arvioida.',
  },
  {
    q: 'Säilyykö takuu, jos huollatan auton riippumattomalla korjaamolla?',
    a: 'EU:n kilpailusääntöjen mukaan valmistaja ei voi asettaa takuun ehdoksi, että määräaikaishuollot tehdään merkkikorjaamolla, kunhan huolto tehdään valmistajan ohjeiden mukaisesti. Takuukorjaukset tehdään yleensä merkkikorjaamolla. Tarkista oman autosi takuuehdot.',
  },
]
