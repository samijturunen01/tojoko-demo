import { Clock, MapPin, Phone } from 'lucide-react'
import { SectionTag } from '../components/ui/SectionTag'
import { OpenNow } from '../components/ui/OpenNow'
import { GoogleRating } from '../components/ui/GoogleRating'
import { RequestForm } from '../components/forms/RequestForm'
import { MapEmbed } from '../components/contact/MapEmbed'
import { company } from '../data/company'
import { REQUEST_HASH } from '../data/nav'
import { track } from '../lib/analytics'

export function Contact() {
  return (
    <>
      <section className="border-b border-ink/15" aria-labelledby="yht-title">
        <div className="wrap pb-14 pt-10 sm:pt-14 lg:pb-20">
          <SectionTag>Yhteystiedot</SectionTag>
          <h1 id="yht-title" className="display-xl mt-5 max-w-4xl">
            Yhteystiedot ja aikapyyntö
          </h1>
          <p className="lead mt-6 max-w-2xl text-ink-2">
            Soita arkisin klo 8–17 tai jätä aikapyyntö milloin tahansa. Kerro rekisterinumero ja mitä autolle pitäisi tehdä, niin ajasta on helppo sopia.
          </p>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border-2 border-ink bg-ink md:grid-cols-3">
            <div className="pegboard on-dark p-7 sm:p-8">
              <p className="label flex items-center gap-2 text-mist">
                <Phone className="size-4" aria-hidden="true" /> Puhelin
              </p>
              <a
                href={company.phone.href}
                className="mt-4 block font-[family-name:var(--font-display)] text-[clamp(2rem,1.5rem+1.6vw,2.7rem)] font-black leading-none text-yellow hover:text-yellow-2"
                onClick={() => track('phone_click', { location: 'contact_card' })}
              >
                {company.phone.display}
              </a>
              <p className="mt-4 text-paper/85">Nopein tapa sopia aika. Arkisin 8–17.</p>
            </div>
            <div className="bg-paper p-7 sm:p-8">
              <p className="label flex items-center gap-2 text-muted">
                <Clock className="size-4" aria-hidden="true" /> Aukiolo
              </p>
              <dl className="mt-4 grid gap-1.5">
                {company.hoursRows.map((r) => (
                  <div key={r.label} className="flex justify-between gap-4 border-b border-ink/10 pb-1.5">
                    <dt>{r.label}</dt>
                    <dd className="font-[family-name:var(--font-display)] font-bold">{r.value}</dd>
                  </div>
                ))}
              </dl>
              <OpenNow className="mt-4 text-[0.98rem]" />
              <p className="mt-2 text-sm text-muted">Arkipyhien aukiolo kannattaa varmistaa puhelimitse.</p>
            </div>
            <div className="bg-paper p-7 sm:p-8">
              <p className="label flex items-center gap-2 text-muted">
                <MapPin className="size-4" aria-hidden="true" /> Osoite
              </p>
              <address className="mt-4 not-italic">
                <span className="block font-[family-name:var(--font-display)] text-2xl font-extrabold">{company.name}</span>
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
              </address>
              <a href="#kartta" className="mt-4 inline-block font-semibold underline decoration-yellow decoration-2 underline-offset-4">
                Kartta ja reittiohjeet
              </a>
              <GoogleRating location="contact_card" className="mt-4 block text-[0.95rem]" />
            </div>
          </div>
        </div>
      </section>

      <section id={REQUEST_HASH} className="scroll-mt-24 bg-paper" aria-label="Aikapyyntölomake">
        <div className="wrap py-16 sm:py-20 lg:py-24">
          <RequestForm />
        </div>
      </section>

      <section id="kartta" className="scroll-mt-24 border-t border-ink/15 bg-paper-2" aria-labelledby="kartta-title">
        <div className="wrap py-16 sm:py-20 lg:py-24">
          <SectionTag>Sijainti</SectionTag>
          <h2 id="kartta-title" className="display-l mt-5">
            Korjaamo Aspitiellä
          </h2>
          <div className="mt-10">
            <MapEmbed />
          </div>
        </div>
      </section>

      <section className="border-t border-ink/15 bg-paper" aria-labelledby="yritys-title">
        <div className="wrap grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          <h2 id="yritys-title" className="label text-muted sm:col-span-2 lg:col-span-1">
            Yrityksen tiedot
          </h2>
          <dl className="grid gap-1 sm:col-span-2 lg:col-span-3 lg:grid-cols-3 lg:gap-8">
            <div>
              <dt className="text-sm text-muted">Virallinen nimi</dt>
              <dd className="font-[family-name:var(--font-display)] text-lg font-bold">{company.name}</dd>
            </div>
            <div>
              <dt className="mt-3 text-sm text-muted lg:mt-0">Y-tunnus</dt>
              <dd className="font-[family-name:var(--font-display)] text-lg font-bold">{company.businessId}</dd>
            </div>
            <div>
              <dt className="mt-3 text-sm text-muted lg:mt-0">Kotipaikka</dt>
              <dd className="font-[family-name:var(--font-display)] text-lg font-bold">{company.homeCity}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}
