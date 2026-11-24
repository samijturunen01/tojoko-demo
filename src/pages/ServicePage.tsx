import { Link } from 'react-router-dom'
import { ArrowRight, Check, Phone } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { Photo } from '../components/ui/Photo'
import { SectionTag } from '../components/ui/SectionTag'
import { Faq } from '../components/ui/Faq'
import { CtaBand } from '../components/ui/CtaBand'
import { GoogleRating } from '../components/ui/GoogleRating'
import { ToolGlyph } from '../components/ui/ToolGlyph'
import { serviceById, services, type ServiceId } from '../data/services'
import { company } from '../data/company'
import { requestHref } from '../data/nav'
import { track } from '../lib/analytics'

export function ServicePage({ id }: { id: ServiceId }) {
  const s = serviceById(id)
  const others = services.filter((x) => x.id !== id)

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Etusivu', to: '/' }, { label: 'Palvelut', to: '/palvelut' }, { label: s.label }]}
        tag={s.kicker}
        num={s.num}
        title={s.title}
        lead={<p>{s.lead}</p>}
        photo={s.photo}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            to={requestHref({ aihe: s.id })}
            className="btn btn--primary"
            onClick={() => track('cta_click', { location: `service_hero_${s.id}` })}
          >
            Pyydä aikaa: {s.label.toLowerCase()}
          </Link>
          <a href={company.phone.href} className="btn btn--ghost" onClick={() => track('phone_click', { location: `service_hero_${s.id}` })}>
            <Phone aria-hidden="true" />
            Soita {company.phone.display}
          </a>
        </div>
        <GoogleRating location={`service_${s.id}`} className="mt-6" />
      </PageHero>

      <section className="bg-paper" aria-labelledby="tarve-title">
        <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
          <div className="lg:col-span-6">
            <SectionTag>Tausta</SectionTag>
            <h2 id="tarve-title" className="display-l mt-5">
              {s.need.title}
            </h2>
            <p className="lead mt-6 text-ink-2">{s.need.text}</p>
          </div>
          <div className="relative lg:col-span-6">
            <Photo
              name={s.secondaryPhoto}
              sizes="(min-width: 1280px) 38rem, (min-width: 1024px) 48vw, 100vw"
              className="aspect-[3/2] rounded-[1.25rem] bg-paper-3"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-ink/15 bg-paper-2" aria-labelledby="kohdat-title">
        <div className="wrap py-16 sm:py-20 lg:py-24">
          <SectionTag>{s.kicker}</SectionTag>
          <h2 id="kohdat-title" className="display-l mt-5 max-w-3xl">
            {s.pointsTitle}
          </h2>
          <ol className="mt-12 grid border-t-2 border-ink">
            {s.points.map((p, i) => (
              <li key={p.title} className="grid gap-3 border-b border-ink/20 py-8 sm:grid-cols-[4rem_1fr] lg:grid-cols-[4rem_22rem_1fr] lg:gap-10">
                <span className="label pt-1.5 text-muted" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[1.6rem] font-extrabold leading-tight">{p.title}</h3>
                <p className="max-w-2xl text-ink-2 sm:col-start-2 lg:col-start-auto">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pegboard on-dark" aria-labelledby="kerro-title">
        <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
          <div className="lg:col-span-6">
            <SectionTag dark>Ennen kuin soitat</SectionTag>
            <h2 id="kerro-title" className="display-l mt-5 text-paper">
              Kerro nämä, kun otat yhteyttä.
            </h2>
            <p className="lead mt-5 text-paper/85">Mitä tarkemmin kerrot, sitä helpompi työstä on sopia – ja sitä tarkemmin sen voi arvioida.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={requestHref({ aihe: s.id })}
                className="btn btn--primary"
                onClick={() => track('cta_click', { location: `service_tell_${s.id}` })}
              >
                Täytä aikapyyntö
              </Link>
              <a href={company.phone.href} className="btn btn--light" onClick={() => track('phone_click', { location: `service_tell_${s.id}` })}>
                <Phone aria-hidden="true" />
                {company.phone.display}
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="keytag relative bg-paper px-7 pb-8 pt-12 text-ink shadow-[0_30px_50px_-28px_rgb(0_0_0/0.7)] sm:px-10">
              <span className="keytag__hole" aria-hidden="true" style={{ background: 'var(--color-petrol)' }} />
              <ToolGlyph name={s.tool} className="absolute right-6 top-6 size-16 text-petrol/25" />
              <p className="label text-muted">Muistilista</p>
              <ul className="mt-5 grid gap-4">
                {s.tell.map((t) => (
                  <li key={t} className="flex gap-3.5 text-[1.08rem]">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-yellow" aria-hidden="true">
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper" aria-labelledby="palvelu-ukk">
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24">
          <div className="lg:col-span-4">
            <SectionTag>Usein kysyttyä</SectionTag>
            <h2 id="palvelu-ukk" className="display-l mt-5">
              Kysymyksiä: {s.label.toLowerCase()}
            </h2>
          </div>
          <Faq items={s.faq} className="lg:col-span-8" />
        </div>
      </section>

      <section className="border-t border-ink/15 bg-paper-2" aria-labelledby="muut-title">
        <div className="wrap py-14 lg:py-16">
          <h2 id="muut-title" className="label text-muted">
            Muut palvelut
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.id}>
                <Link
                  to={o.path}
                  className="group flex items-center justify-between gap-6 rounded-2xl border-2 border-ink/80 bg-paper px-6 py-5 transition-colors hover:bg-ink hover:text-paper"
                  onClick={() => track('service_interest', { service: o.id, location: `service_${s.id}_others` })}
                >
                  <span>
                    <span className="label block text-muted group-hover:text-mist">{o.num}</span>
                    <span className="mt-1 block font-[family-name:var(--font-display)] text-[1.6rem] font-extrabold leading-tight">{o.label}</span>
                  </span>
                  <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        location={`service_close_${s.id}`}
        topic={s.id}
        title={
          <>
            {s.label}: <span className="text-yellow">sovitaan aika.</span>
          </>
        }
        text={`Soita ${company.phone.display} arkisin 8–17 tai jätä aikapyyntö – aihe on valmiiksi valittuna.`}
      />
    </>
  )
}
