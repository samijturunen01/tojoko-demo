import { ExternalLink, Star } from 'lucide-react'
import { company } from '../../data/company'
import { track } from '../../lib/analytics'
import { SectionTag } from '../ui/SectionTag'

/**
 * Social proof without republishing review texts: the verified Google rating and count,
 * plus a neutral summary of what the public written reviews mention (checked 24.11.2026,
 * see docs/CONTENT_SOURCES.md). Visitors read the reviews themselves on Google.
 */
const themes = [
  { title: 'Ystävällinen palvelu', text: 'Mainitaan jokaisessa neljässä kirjoitetussa arviossa.' },
  { title: 'Autotekniikan osaaminen', text: 'Arvioissa kiitetään autotekniikan tuntemusta ja osaavaa autohuoltoa.' },
  { title: 'Sitkeys hankalissa vioissa', text: 'Arvioissa kiitetään vikojen selvittämistä silloinkin, kun syy ei löydy helpolla.' },
  { title: 'Vakipaikka', text: 'Kahdessa arviossa Tojokoa kuvataan omaksi vakipaikaksi autoasioissa.' },
]

export function ReviewThemes({ num = '03' }: { num?: string }) {
  const g = company.google
  return (
    <section className="border-t border-ink/15 bg-paper-2" aria-labelledby="arviot-title">
      <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-28">
        <div className="lg:col-span-5">
          <SectionTag num={num}>Asiakkaiden arviot</SectionTag>
          <h2 id="arviot-title" className="display-l mt-5">
            Mitä Googlessa sanotaan?
          </h2>
          <div className="mt-9 flex items-end gap-5">
            <p className="font-[family-name:var(--font-display)] text-[clamp(5rem,3.5rem+6vw,8.5rem)] font-black leading-[0.8] tracking-[-0.05em] text-petrol">
              {g.ratingText}
            </p>
            <div className="pb-1">
              <p className="flex text-yellow" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-6 fill-current stroke-ink/70" strokeWidth={1.2} />
                ))}
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold">
                <span className="sr-only">Google-arvio {g.ratingText} / 5, </span>
                {g.count} Google-arviota
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-[0.95rem] text-muted">
            Arvosana ja arvioiden määrä tarkistettu Tojoko Oy:n julkisesta Google-yritysprofiilista {g.checked}. Arvioita ei ole valikoitu eikä muokattu – lue ne kaikki Googlessa.
          </p>
          <a
            href={g.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost mt-7"
            onClick={() => track('reviews_click', { location: 'home_reviews' })}
          >
            Lue arviot Googlessa
            <ExternalLink aria-hidden="true" />
            <span className="sr-only">(avautuu uuteen välilehteen)</span>
          </a>
        </div>

        <div className="lg:col-span-7">
          <p className="label text-muted">Kirjoitetuissa arvioissa toistuu</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {themes.map((t, i) => (
              <li
                key={t.title}
                data-reveal="hang"
                style={{ transitionDelay: `${i * 80}ms` }}
                className="keytag relative bg-paper px-6 pb-7 pt-10 shadow-[0_14px_30px_-22px_rgb(21_25_24/0.7)] ring-1 ring-ink/10"
              >
                <span className="keytag__hole" aria-hidden="true" style={{ background: 'var(--color-paper-2)' }} />
                <h3 className="font-[family-name:var(--font-display)] text-[1.45rem] font-extrabold leading-tight">{t.title}</h3>
                <p className="mt-2 text-ink-2">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
