import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services } from '../../data/services'
import { track } from '../../lib/analytics'
import { SectionTag } from '../ui/SectionTag'
import { ToolGlyph } from '../ui/ToolGlyph'

/**
 * The three services as a shadow board: each row has a painted tool outline; on hover/focus
 * the tool hangs back into its place. Rows are plain links – easy to scan and to tap.
 */
export function ServiceBoard() {
  return (
    <section className="relative border-t border-ink/15 bg-paper" aria-labelledby="palvelut-title">
      <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionTag num="01">Palvelut</SectionTag>
            <h2 id="palvelut-title" className="display-l mt-5">
              Mitä autollesi pitäisi tehdä?
            </h2>
            <p className="mt-5 max-w-sm text-ink-2">
              Huolto, korjaus vai vika, jonka syytä ei vielä tiedetä? Valitse lähin – jokaisella sivulla kerrotaan, mitä kannattaa kertoa, kun sovit ajan.
            </p>
            <Link to="/palvelut" className="link-arrow mt-7">
              Kaikki palvelut <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ul className="border-t-2 border-ink lg:col-span-8">
          {services.map((s) => (
            <li key={s.id} className="border-b border-ink/20">
              <Link
                to={s.path}
                onClick={() => track('service_interest', { service: s.id, location: 'home_board' })}
                className="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-3 py-7 sm:grid-cols-[3.5rem_1fr_8.5rem] sm:items-center sm:gap-x-8 sm:py-9"
              >
                <span className="label pt-2 text-muted sm:pt-0" aria-hidden="true">
                  {s.num}
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-3 font-[family-name:var(--font-display)] text-[clamp(1.7rem,1.3rem+1.6vw,2.6rem)] font-extrabold leading-none tracking-tight transition-colors group-hover:text-petrol">
                    {s.label}
                    <ArrowRight
                      className="size-6 -translate-x-2 text-petrol opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-3 block max-w-xl text-ink-2">{s.short}</span>
                </span>
                <span
                  className="pegboard relative col-span-2 hidden aspect-square w-full overflow-hidden rounded-2xl sm:col-span-1 sm:block"
                  aria-hidden="true"
                >
                  <ToolGlyph name={s.tool} className="absolute inset-[14%] text-yellow/70" />
                  <ToolGlyph
                    name={s.tool}
                    variant="solid"
                    className="absolute inset-[14%] origin-top -translate-y-2 -rotate-6 text-[#c9d5d3] opacity-0 transition-all duration-500 ease-[var(--ease-hang)] group-hover:translate-y-0 group-hover:rotate-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:rotate-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:rotate-0 [@media(hover:none)]:opacity-100"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
