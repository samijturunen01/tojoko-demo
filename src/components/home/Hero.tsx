import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { company } from '../../data/company'
import { requestHref } from '../../data/nav'
import { track } from '../../lib/analytics'
import { GoogleRating } from '../ui/GoogleRating'
import { OpenNow } from '../ui/OpenNow'
import { HeroBoard, HeroStrip } from './HeroBoard'

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="paper-rule pointer-events-none absolute inset-0 hidden opacity-60 lg:block" aria-hidden="true" />
      <div className="wrap relative grid gap-10 pb-16 pt-5 sm:pt-8 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-14 xl:gap-16">
        <div className="lg:col-span-6">
          <HeroStrip />
          <p className="label mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted lg:mt-0">
            <span className="rounded-[0.4rem] bg-petrol px-2 py-1 text-yellow">Autokorjaamo</span>
            <span>
              {company.address.street} · {company.address.area}, Joensuu
            </span>
          </p>
          <h1 id="hero-title" className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.55rem,1.55rem+3.6vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink">
            Autohuolto ja korjaus Joensuussa.
            <span className="mt-4 block text-[0.5em] font-bold leading-[1.1] tracking-[-0.02em] text-petrol">
              Myös ne viat, joiden syy ei löydy helpolla.
            </span>
          </h1>
          <p className="lead mt-6 max-w-xl text-ink-2">
            Tojoko huoltaa ja korjaa autoja Salpakankaalla, Aspitie 16:ssa. Google-arvioissa kiitellään ystävällistä palvelua ja sitkeää vianselvitystä.
            Kerro rekisterinumero ja mitä autossa tuntuu – sovitaan aika.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to={requestHref()} className="btn btn--primary" onClick={() => track('cta_click', { location: 'hero' })}>
              Pyydä aikaa korjaamolle
            </Link>
            <a href={company.phone.href} className="btn btn--ghost" onClick={() => track('phone_click', { location: 'hero' })}>
              <Phone aria-hidden="true" />
              Soita {company.phone.display}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-ink/15 pt-5 text-[0.98rem]">
            <GoogleRating location="hero" />
            <OpenNow />
            <p className="text-muted">Toiminut vuodesta {company.foundedYear}</p>
          </div>
        </div>

        <div className="relative hidden lg:col-span-6 lg:block">
          <HeroBoard />
        </div>
      </div>
    </section>
  )
}
