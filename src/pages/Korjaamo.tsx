import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionTag } from '../components/ui/SectionTag'
import { CtaBand } from '../components/ui/CtaBand'
import { ReviewThemes } from '../components/home/ReviewThemes'
import { Wordmark } from '../components/brand/Wordmark'
import { company } from '../data/company'
import { requestHref } from '../data/nav'
import { track } from '../lib/analytics'

const plate = [
  { k: 'Yritys', v: company.name },
  { k: 'Y-tunnus', v: company.businessId },
  { k: 'Perustettu', v: company.founded },
  { k: 'Toimiala', v: company.lineOfBusiness },
  { k: 'Osoite', v: `${company.address.street}, ${company.address.postalCode} ${company.address.city}` },
  { k: 'Alue', v: `${company.address.area}, Raatekangas` },
  { k: 'Aukiolo', v: 'ma–pe 8–17' },
  { k: 'Puhelin', v: company.phone.display },
]

const tips = [
  {
    title: 'Soita arkisin 8–17',
    text: 'Puhelimessa ajan sopiminen on nopeinta. Jos et saa heti vastausta, jätä aikapyyntö – se odottaa korjaamolla.',
  },
  {
    title: 'Kerro, mitä olet huomannut',
    text: 'Oireet, tilanteet ja aiemmat korjaukset auttavat selvittämään vian nopeammin. Rekisterinumero kertoo auton tiedot.',
  },
  {
    title: 'Kysy arviota',
    text: 'Hintoja ei ole julkaistu, koska jokainen työ on erilainen. Kysy arviota työn kestosta ja hinnasta, kun sovit ajan.',
  },
]

export function Korjaamo() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Etusivu', to: '/' }, { label: 'Korjaamo' }]}
        tag="Korjaamo"
        title="Autokorjaamo Salpakankaalla, Aspitie 16"
        lead={
          <p>
            Tojoko Oy on vuonna 2020 perustettu joensuulainen autokorjaamo. Korjaamo huoltaa ja korjaa autoja ja selvittää vikoja – ja Google-arvioissa
            sitä kiitetään ystävällisestä palvelusta ja sitkeydestä hankalissa vioissa.
          </p>
        }
        photo="tyokaluseina"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to={requestHref()} className="btn btn--primary" onClick={() => track('cta_click', { location: 'korjaamo_hero' })}>
            Pyydä aikaa korjaamolle
          </Link>
          <a href={company.phone.href} className="btn btn--ghost" onClick={() => track('phone_click', { location: 'korjaamo_hero' })}>
            <Phone aria-hidden="true" />
            Soita {company.phone.display}
          </a>
        </div>
      </PageHero>

      <section className="bg-paper" aria-labelledby="tiedot-title">
        <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
          <div className="lg:col-span-5">
            <SectionTag num="01">Korjaamon tiedot</SectionTag>
            <h2 id="tiedot-title" className="display-l mt-5">
              Pieni korjaamo, selkeät tiedot.
            </h2>
            <p className="lead mt-5 text-ink-2">
              Tojoko toimii Salpakankaan yritysalueella Raatekankaalla, Joensuun kantakaupungissa. Korjaamo on avoinna arkisin, ja ajan saa sovittua
              soittamalla tai jättämällä aikapyynnön.
            </p>
          </div>
          <div className="lg:col-span-7">
            {/* Data plate – like the type plate riveted to every machine in the workshop */}
            <div className="relative rounded-[1.25rem] border-2 border-ink bg-[#e7e2d4] p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.7),0_24px_40px_-30px_rgb(21_25_24/0.8)] sm:p-9">
              {['left-3 top-3', 'right-3 top-3', 'left-3 bottom-3', 'right-3 bottom-3'].map((p) => (
                <span key={p} className={`absolute ${p} size-3 rounded-full border border-ink/40 bg-paper-3`} aria-hidden="true" />
              ))}
              <div className="flex items-center justify-between gap-6 border-b-2 border-ink pb-4">
                <Wordmark className="h-7 w-auto text-petrol sm:h-8" okColor="#0f3b3f" />
                <span className="label text-[0.68rem] text-muted">Tyyppikilpi</span>
              </div>
              <dl className="mt-2 grid sm:grid-cols-2 sm:gap-x-10">
                {plate.map((r) => (
                  <div key={r.k} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-ink/15 py-3 sm:grid-cols-[6rem_1fr]">
                    <dt className="label pt-1 text-[0.68rem] text-muted">{r.k}</dt>
                    <dd className="font-[family-name:var(--font-display)] font-bold">
                      {r.k === 'Puhelin' ? (
                        <a href={company.phone.href} className="underline decoration-yellow decoration-2 underline-offset-4" onClick={() => track('phone_click', { location: 'korjaamo_plate' })}>
                          {r.v}
                        </a>
                      ) : (
                        r.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <ReviewThemes num="02" />

      <section className="border-t border-ink/15 bg-paper" aria-labelledby="asiointi-title">
        <div className="wrap py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <SectionTag num="03">Asiointi</SectionTag>
            <h2 id="asiointi-title" className="display-l mt-5">
              Näin asiointi sujuu.
            </h2>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] border-2 border-ink bg-ink lg:grid-cols-3">
            {tips.map((t, i) => (
              <li key={t.title} className="bg-paper p-7 sm:p-9">
                <span className="label text-muted">0{i + 1}</span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.55rem] font-extrabold leading-tight">{t.title}</h3>
                <p className="mt-3 text-ink-2">{t.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/yhteystiedot" className="link-arrow mt-9">
            Kartta, aukiolo ja yhteystiedot <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CtaBand
        location="korjaamo_close"
        title={
          <>
            Tule käymään <span className="text-yellow">Aspitiellä.</span>
          </>
        }
        text="Sovi aika huoltoon, korjaukseen tai vianselvitykseen – puhelimitse arkisin 8–17 tai aikapyynnöllä milloin vain."
      />
    </>
  )
}
