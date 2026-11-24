import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Phone, X } from 'lucide-react'
import { Wordmark } from '../brand/Wordmark'
import { company } from '../../data/company'
import { mainNav, requestHref } from '../../data/nav'
import { services } from '../../data/services'
import { navScroll } from './ScrollManager'
import { track } from '../../lib/analytics'

const isActive = (pathname: string, path: string) =>
  path === '/' ? pathname === '/' || pathname === '' : pathname === path || pathname.startsWith(`${path}/`)

export function Header() {
  const { pathname: raw } = useLocation()
  const pathname = raw.replace(/\/+$/, '') || '/'
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close the menu whenever the route changes (React's "adjust state during render" pattern).
  const [lastPath, setLastPath] = useState(raw)
  if (raw !== lastPath) {
    setLastPath(raw)
    if (open) setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button') ?? [])
    focusables()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const f = focusables()
        if (!f.length) return
        const firstEl = f[0]
        const lastEl = f[f.length - 1]
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper/95 backdrop-blur-[6px]">
      <div className="wrap flex h-[4.25rem] items-center gap-6 lg:h-[4.75rem]">
        <Link to="/" onClick={navScroll} className="group mr-auto flex items-center gap-3 py-2">
          <Wordmark className="h-[1.35rem] w-auto text-petrol lg:h-[1.55rem]" />
          <span className="sr-only">Tojoko Oy – etusivulle</span>
          {/* Decorative descriptor: hidden from the accessible name, which stays "Tojoko Oy – etusivulle". */}
          <span className="label hidden border-l border-ink/25 pl-3 text-[0.68rem] text-muted xl:block" aria-hidden="true">
            Autokorjaamo
            <br />
            Joensuu
          </span>
        </Link>

        <nav aria-label="Päävalikko" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.path)
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={navScroll}
                    aria-current={active ? 'page' : undefined}
                    className={`relative block rounded-lg px-3.5 py-2.5 font-[family-name:var(--font-display)] text-[1.02rem] font-semibold transition-colors hover:bg-paper-2 ${
                      active ? 'text-petrol' : 'text-ink'
                    }`}
                  >
                    {item.label}
                    {active && <span className="absolute inset-x-3.5 -bottom-0.5 h-[3px] rounded-full bg-yellow" aria-hidden="true" />}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={company.phone.href}
            className="flex items-center gap-2 rounded-lg px-2 py-2 font-[family-name:var(--font-display)] text-[1.05rem] font-bold text-ink hover:text-petrol"
            onClick={() => track('phone_click', { location: 'header' })}
          >
            <Phone className="size-[1.1rem]" aria-hidden="true" />
            {company.phone.display}
          </a>
          <Link to={requestHref()} className="btn btn--primary min-h-[2.75rem] py-2" onClick={() => track('cta_click', { location: 'header' })}>
            Pyydä aikaa
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={company.phone.href}
            className="grid size-11 place-items-center rounded-xl bg-petrol text-paper"
            aria-label={`Soita korjaamolle ${company.phone.display}`}
            onClick={() => track('phone_click', { location: 'header_mobile' })}
          >
            <Phone className="size-5" aria-hidden="true" />
          </a>
          <button
            ref={btnRef}
            type="button"
            className="grid size-11 place-items-center rounded-xl border-2 border-ink"
            aria-label="Avaa valikko"
            aria-expanded={open}
            aria-controls="mobiilivalikko"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobiilivalikko"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Valikko"
          className="pegboard on-dark fixed inset-0 z-50 flex flex-col overflow-y-auto lg:hidden"
        >
          <div className="wrap flex h-[4.25rem] shrink-0 items-center justify-between">
            <Link to="/" onClick={navScroll} aria-label="Tojoko Oy – etusivulle" className="py-2">
              <Wordmark className="h-[1.35rem] w-auto" color="#f4f1e9" okColor="#ffc933" />
            </Link>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-xl border-2 border-paper/70 text-paper"
              aria-label="Sulje valikko"
              onClick={() => {
                setOpen(false)
                btnRef.current?.focus()
              }}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobiilivalikko" className="wrap mt-4 flex-1">
            <ul className="grid gap-1">
              {mainNav.map((item, i) => {
                const active = isActive(pathname, item.path)
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      onClick={navScroll}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-baseline gap-4 rounded-xl px-2 py-3 font-[family-name:var(--font-display)] text-[2.1rem] font-extrabold leading-none tracking-tight ${
                        active ? 'text-yellow' : 'text-paper'
                      }`}
                    >
                      <span className="label w-7 text-[0.72rem] text-mist" aria-hidden="true">
                        0{i + 1}
                      </span>
                      {item.label}
                    </NavLink>
                    {item.path === '/palvelut' && (
                      <ul className="mb-2 ml-[3.25rem] grid gap-0.5">
                        {services.map((s) => (
                          <li key={s.id}>
                            <NavLink
                              to={s.path}
                              onClick={navScroll}
                              className={({ isActive: a }) => `block rounded-lg px-2 py-2 text-[1.08rem] font-semibold ${a ? 'text-yellow' : 'text-mist'}`}
                            >
                              {s.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="wrap grid shrink-0 gap-3 pb-8 pt-6">
            <a href={company.phone.href} className="btn btn--primary w-full" onClick={() => track('phone_click', { location: 'menu' })}>
              <Phone aria-hidden="true" />
              Soita {company.phone.display}
            </a>
            <Link to={requestHref()} className="btn btn--light w-full">
              Pyydä aikaa lomakkeella
            </Link>
            <p className="label mt-2 text-center text-mist">Avoinna {company.hoursShort} · {company.address.street}</p>
          </div>
        </div>
      )}
    </header>
  )
}
