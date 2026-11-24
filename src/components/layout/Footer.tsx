import { Link } from 'react-router-dom'
import { ExternalLink, Phone } from 'lucide-react'
import { Wordmark } from '../brand/Wordmark'
import { company } from '../../data/company'
import { mainNav } from '../../data/nav'
import { services } from '../../data/services'
import { navScroll } from './ScrollManager'
import { track } from '../../lib/analytics'

export function Footer() {
  return (
    <footer className="pegboard pegboard--deep on-dark relative">
      <div className="wrap grid gap-12 pb-10 pt-16 lg:grid-cols-12 lg:pt-20">
        <div className="lg:col-span-5">
          <Link to="/" onClick={navScroll} aria-label="Tojoko Oy – etusivulle" className="inline-block py-1">
            <Wordmark className="h-9 w-auto sm:h-11" color="#f4f1e9" okColor="#ffc933" />
          </Link>
          <p className="label mt-4 text-mist">Autokorjaamo · {company.address.area}, Joensuu</p>
          <p className="mt-6 max-w-md text-paper/85">
            Autohuolto, korjaukset ja vianselvitys Joensuun Aspitiellä. Soita tai jätä aikapyyntö – kerro rekisterinumero ja mitä autossa tuntuu.
          </p>
          <a
            href={company.phone.href}
            className="mt-7 inline-flex items-center gap-3 font-[family-name:var(--font-display)] text-3xl font-extrabold text-yellow hover:text-yellow-2"
            onClick={() => track('phone_click', { location: 'footer' })}
          >
            <Phone className="size-7" aria-hidden="true" />
            {company.phone.display}
          </a>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
          <div>
            <h2 className="label text-mist">Sivut</h2>
            <ul className="mt-4 grid gap-2">
              {mainNav.map((n) => (
                <li key={n.path}>
                  <Link to={n.path} onClick={navScroll} className="text-paper hover:text-yellow">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label text-mist">Palvelut</h2>
            <ul className="mt-4 grid gap-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={s.path} className="text-paper hover:text-yellow">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label text-mist">Korjaamo</h2>
            <address className="mt-4 not-italic text-paper">
              {company.name}
              <br />
              {company.address.street}
              <br />
              {company.address.postalCode} {company.address.city}
            </address>
            <p className="mt-3 text-paper">Avoinna {company.hoursShort}</p>
            <p className="mt-3 text-sm text-mist">Y-tunnus {company.businessId}</p>
            <a
              href={company.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-paper underline decoration-yellow underline-offset-4 hover:text-yellow"
              onClick={() => track('directions_click', { location: 'footer' })}
            >
              Reittiohjeet <ExternalLink className="size-3.5" aria-hidden="true" />
              <span className="sr-only">(avautuu uuteen välilehteen)</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="wrap flex flex-col gap-2 py-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>© {company.name}</p>
          <p>
            Konseptidemo · Hades Design – ei Tojoko Oy:n virallinen verkkosivusto. Valokuvat ovat kuvituskuvia.
          </p>
        </div>
      </div>
    </footer>
  )
}
