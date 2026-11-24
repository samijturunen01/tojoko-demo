import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { company } from '../../data/company'
import { SectionTag } from '../ui/SectionTag'

/** "Näin pääset alkuun" – the customer's steps, described from the customer's side only. */
const steps = [
  {
    title: 'Kerro, mitä autolle pitäisi tehdä',
    text: `Soita ${company.phone.display} arkisin klo 8–17 tai jätä aikapyyntö milloin tahansa. Rekisterinumero ja lyhyt kuvaus riittävät alkuun.`,
  },
  {
    title: 'Sovitaan aika',
    text: 'Sovit korjaamon kanssa ajan. Kysy samalla arviota työn kestosta ja hinnasta – mitä tarkemmin kerrot, sitä tarkempi arvio.',
  },
  {
    title: 'Tuo auto Aspitielle',
    text: `Korjaamo on Salpakankaan yritysalueella, osoitteessa ${company.address.street}, ${company.address.city}.`,
    link: { to: '/yhteystiedot', label: 'Kartta ja reittiohjeet' },
  },
]

export function Steps({ num = '04' }: { num?: string }) {
  return (
    <section className="border-t border-ink/15 bg-paper" aria-labelledby="alkuun-title">
      <div className="wrap py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl">
          <SectionTag num={num}>Näin pääset alkuun</SectionTag>
          <h2 id="alkuun-title" className="display-l mt-5">
            Kolme askelta korjaamolle.
          </h2>
        </div>
        <ol className="relative mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          <span className="absolute left-6 right-6 top-[1.05rem] hidden h-[3px] rounded-full bg-ink/80 lg:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <li key={s.title} data-reveal="hang" style={{ transitionDelay: `${i * 110}ms` }} className="relative">
              <span className="relative z-10 mx-auto hidden size-[2.35rem] place-items-center rounded-full border-[3px] border-ink bg-paper lg:grid" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-ink" />
              </span>
              <div className="keytag relative mt-0 h-full bg-petrol px-6 pb-8 pt-10 text-paper lg:mt-3">
                <span className="keytag__hole" aria-hidden="true" />
                <p className="label text-yellow">Vaihe {i + 1}</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.55rem] font-extrabold leading-tight">{s.title}</h3>
                <p className="mt-3 text-paper/85">{s.text}</p>
                {s.link && (
                  <Link to={s.link.to} className="link-arrow mt-5 text-paper">
                    {s.link.label} <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
