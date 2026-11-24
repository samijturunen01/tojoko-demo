import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { Photo } from '../components/ui/Photo'
import { SectionTag } from '../components/ui/SectionTag'
import { Faq } from '../components/ui/Faq'
import { CtaBand } from '../components/ui/CtaBand'
import { ToolGlyph } from '../components/ui/ToolGlyph'
import { services } from '../data/services'
import { faqs } from '../data/faq'
import { company } from '../data/company'
import { requestHref } from '../data/nav'
import { track } from '../lib/analytics'

const priceFactors = [
  { title: 'Työn kesto', text: 'Kuinka paljon aikaa huolto, korjaus tai vian etsiminen vie.' },
  { title: 'Osat ja tarvikkeet', text: 'Mitä osia, nesteitä ja tarvikkeita työhön tarvitaan.' },
  { title: 'Auto', text: 'Merkki, malli, vuosimalli ja moottori vaikuttavat työhön ja osiin.' },
  { title: 'Vian luonne', text: 'Jos syy ei ole selvä, arvio tarkentuu vasta, kun vika on löydetty.' },
]

export function Services() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Etusivu', to: '/' }, { label: 'Palvelut' }]}
        tag="Palvelut"
        title="Autohuolto, korjaukset ja vianselvitys Joensuussa"
        lead={
          <p>
            Tojoko huoltaa ja korjaa autoja Salpakankaalla, Aspitie 16:ssa. Valitse, mitä autollesi pitäisi tehdä – jokaisella sivulla kerrotaan, mitä
            kannattaa kertoa, kun sovit ajan.
          </p>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to={requestHref()} className="btn btn--primary" onClick={() => track('cta_click', { location: 'services_hero' })}>
            Pyydä aikaa korjaamolle
          </Link>
          <a href={company.phone.href} className="btn btn--ghost" onClick={() => track('phone_click', { location: 'services_hero' })}>
            <Phone aria-hidden="true" />
            Soita {company.phone.display}
          </a>
        </div>
      </PageHero>

      <section aria-label="Palvelut" className="bg-paper">
        {services.map((s, i) => (
          <article key={s.id} className="border-b border-ink/15" aria-labelledby={`palvelu-${s.id}`}>
            <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
              <div className={`relative lg:col-span-6 ${i % 2 ? 'lg:order-2' : ''}`}>
                <Photo
                  name={s.photo}
                  sizes="(min-width: 1280px) 38rem, (min-width: 1024px) 48vw, 100vw"
                  className="aspect-[3/2] rounded-[1.25rem] bg-paper-3"
                />
                <span
                  className={`pegboard absolute -top-6 hidden size-28 rounded-2xl p-3 shadow-[0_16px_30px_-18px_rgb(10_43_46/0.7)] sm:block ${i % 2 ? '-left-6' : '-right-6'}`}
                  aria-hidden="true"
                >
                  <ToolGlyph name={s.tool} variant="solid" className="size-full text-[#c9d5d3]" />
                </span>
              </div>
              <div className="lg:col-span-6">
                <SectionTag num={s.num}>{s.kicker}</SectionTag>
                <h2 id={`palvelu-${s.id}`} className="display-l mt-5">
                  {s.label}
                </h2>
                <p className="lead mt-5 text-ink-2">{s.short}</p>
                <ul className="mt-7 grid gap-3 border-t border-ink/15 pt-6">
                  {s.points.map((p) => (
                    <li key={p.title} className="flex gap-3">
                      <span className="mt-[0.6rem] size-2 shrink-0 rounded-full bg-petrol" aria-hidden="true" />
                      <span className="font-semibold">{p.title}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <Link to={s.path} className="btn btn--petrol" onClick={() => track('service_interest', { service: s.id, location: 'services_list' })}>
                    {s.label}: lue lisää
                    <ArrowRight aria-hidden="true" />
                  </Link>
                  <Link to={requestHref({ aihe: s.id })} className="link-arrow" onClick={() => track('cta_click', { location: `services_${s.id}` })}>
                    Pyydä aikaa <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="pegboard on-dark" aria-labelledby="hinta-title">
        <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24">
          <div className="lg:col-span-5">
            <SectionTag num="04" dark>
              Hinnat
            </SectionTag>
            <h2 id="hinta-title" className="display-l mt-5 text-paper">
              Mistä hinta muodostuu?
            </h2>
            <p className="lead mt-5 text-paper/85">
              Tojokon hintoja ei ole julkaistu, koska jokainen auto ja työ on erilainen. Kysy arviota, kun sovit ajan – rekisterinumero ja tarkka kuvaus
              auttavat arvioimaan työn.
            </p>
            <Link to={requestHref()} className="btn btn--primary mt-8" onClick={() => track('cta_click', { location: 'services_price' })}>
              Kysy arviota aikapyynnöllä
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {priceFactors.map((f, i) => (
              <li key={f.title} data-reveal="hang" style={{ transitionDelay: `${i * 70}ms` }} className="keytag bg-paper px-6 pb-7 pt-10 text-ink">
                <span className="keytag__hole" aria-hidden="true" style={{ background: 'var(--color-petrol)' }} />
                <h3 className="font-[family-name:var(--font-display)] text-[1.4rem] font-extrabold">{f.title}</h3>
                <p className="mt-2 text-ink-2">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper" aria-labelledby="palvelut-ukk">
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24">
          <div className="lg:col-span-4">
            <SectionTag num="05">Usein kysyttyä</SectionTag>
            <h2 id="palvelut-ukk" className="display-l mt-5">
              Kysymyksiä palveluista
            </h2>
          </div>
          <Faq items={faqs} className="lg:col-span-8" />
        </div>
      </section>

      <CtaBand
        location="services_close"
        title="Kerro, mitä autolle pitäisi tehdä."
        text="Huolto, korjaus tai vika, jonka syytä ei vielä tiedetä – soita arkisin 8–17 tai jätä aikapyyntö, niin sovitaan aika."
      />
    </>
  )
}
