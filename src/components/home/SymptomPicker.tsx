import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, Phone } from 'lucide-react'
import { symptoms } from '../../data/symptoms'
import { company } from '../../data/company'
import { requestHref } from '../../data/nav'
import { track } from '../../lib/analytics'
import { prefersReducedMotion } from '../../lib/intro'
import { SectionTag } from '../ui/SectionTag'

/**
 * "Mitä autossa tuntuu?" – custom interaction. Symptoms hang on the pegboard as key tags.
 * Picking one swings it (GSAP elastic, loaded on first use) and shows what to tell the
 * workshop; the CTA carries the choice to the request form (?aihe=…&oire=…, no personal data).
 */
export function SymptomPicker() {
  const [active, setActive] = useState(symptoms[0].id)
  const tagRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const s = symptoms.find((x) => x.id === active)!

  const choose = (id: string) => {
    setActive(id)
    track('symptom_select', { symptom: id })
    const el = tagRefs.current[id]
    if (!el || prefersReducedMotion()) return
    import('gsap').then(({ gsap }) => {
      gsap.fromTo(
        el,
        { rotation: -9 },
        { rotation: 0, duration: 1.3, ease: 'elastic.out(1.1, 0.28)', transformOrigin: '50% 0.9rem', overwrite: true },
      )
    })
  }

  return (
    <section className="pegboard on-dark relative" aria-labelledby="oire-title">
      <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-28">
        <div className="lg:col-span-7">
          <SectionTag num="02" dark>
            Ennen kuin soitat
          </SectionTag>
          <h2 id="oire-title" className="display-l mt-5 text-paper">
            Mitä autossa tuntuu?
          </h2>
          <p className="lead mt-5 max-w-xl text-paper/85">
            Valitse oire. Näet, mitä korjaamolle kannattaa kertoa – ja voit jatkaa suoraan aikapyyntöön valmiiksi täytetyllä aiheella.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-3 gap-y-5" role="group" aria-label="Oireet">
            {symptoms.map((x, i) => {
              const on = x.id === active
              return (
                <span key={x.id} data-reveal="hang" className="inline-block" style={{ transitionDelay: `${i * 60}ms` }}>
                  <button
                    ref={(el) => {
                      tagRefs.current[x.id] = el
                    }}
                    type="button"
                    aria-pressed={on}
                    aria-controls="oire-paneeli"
                    onClick={() => choose(x.id)}
                    className={`keytag flex min-h-[3.6rem] items-end gap-3 px-4 pb-3 pt-7 text-left font-[family-name:var(--font-display)] text-[1.05rem] font-bold leading-tight shadow-[0_10px_20px_-12px_rgb(0_0_0/0.6)] transition-colors ${
                      on ? 'bg-yellow text-ink' : 'bg-paper text-ink hover:bg-yellow-2'
                    }`}
                  >
                    <span className="keytag__hole" aria-hidden="true" style={{ background: 'var(--color-petrol)' }} />
                    <span className="label text-[0.68rem] text-ink/70" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {x.label}
                  </button>
                </span>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            id="oire-paneeli"
            aria-live="polite"
            className="relative rounded-[1.4rem] bg-paper p-7 text-ink shadow-[0_30px_50px_-28px_rgb(0_0_0/0.7)] sm:p-9"
          >
            <p className="label text-muted">Valittu oire</p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.9rem] font-extrabold leading-tight">{s.label}</h3>
            <p className="mt-3 text-ink-2">{s.intro}</p>
            <p className="mt-6 font-[family-name:var(--font-display)] font-bold">Kerro korjaamolle:</p>
            <ul className="mt-3 grid gap-2.5">
              {s.tell.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-[0.55rem] size-2 shrink-0 rounded-full bg-petrol" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            {s.urgent && (
              <p className="mt-6 flex gap-3 rounded-xl border-2 border-rust/70 bg-[#fbe9e1] p-4 text-[0.98rem] text-ink">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-rust" aria-hidden="true" />
                <span>{s.urgent}</span>
              </p>
            )}
            <div className="mt-7 grid gap-3">
              <Link
                to={requestHref({ aihe: s.topic, oire: s.id })}
                className="btn btn--primary w-full"
                onClick={() => track('cta_click', { location: 'symptom_panel', symptom: s.id })}
              >
                Jatka aikapyyntöön
                <ArrowRight aria-hidden="true" />
              </Link>
              <a
                href={company.phone.href}
                className="btn btn--ghost w-full"
                onClick={() => track('phone_click', { location: 'symptom_panel' })}
              >
                <Phone aria-hidden="true" />
                Soita {company.phone.display}
              </a>
            </div>
            <p className="mt-5 text-sm text-muted">Ohjeet ovat yleisiä, eivät vianmääritys. Epävarmassa tilanteessa soita.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
