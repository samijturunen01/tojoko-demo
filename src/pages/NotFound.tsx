import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { ToolGlyph } from '../components/ui/ToolGlyph'
import { company } from '../data/company'
import { services } from '../data/services'

export function NotFound() {
  return (
    <section className="bg-paper" aria-labelledby="nf-title">
      <div className="wrap grid gap-12 py-16 sm:py-24 lg:grid-cols-12 lg:items-center lg:py-28">
        <div className="lg:col-span-7">
          <p className="label text-muted">Virhe 404</p>
          <h1 id="nf-title" className="display-xl mt-5">
            Tämä koukku on tyhjä.
          </h1>
          <p className="lead mt-6 max-w-xl text-ink-2">
            Hakemaasi sivua ei löytynyt – se on ehkä siirretty tai osoitteessa on kirjoitusvirhe. Tästä pääset eteenpäin:
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/" className="btn btn--primary">
              Etusivulle
            </Link>
            <a href={company.phone.href} className="btn btn--ghost">
              <Phone aria-hidden="true" />
              Soita {company.phone.display}
            </a>
          </div>
          <ul className="mt-10 grid gap-2 border-t border-ink/15 pt-6">
            {[...services.map((s) => ({ to: s.path, label: s.label })), { to: '/yhteystiedot', label: 'Yhteystiedot ja aikapyyntö' }].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-arrow">
                  {l.label} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <div className="pegboard relative mx-auto aspect-square max-w-sm overflow-hidden rounded-[1.5rem]" aria-hidden="true">
            <span className="absolute left-1/2 top-[18%] size-3 -translate-x-1/2 rounded-full bg-[#d7e1df]" />
            <ToolGlyph name="wrench" className="absolute inset-[16%] text-yellow/70" />
          </div>
        </div>
      </div>
    </section>
  )
}
