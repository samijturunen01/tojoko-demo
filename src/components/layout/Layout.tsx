import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { CallBar } from './CallBar'
import { ScrollManager } from './ScrollManager'
import { Seo } from './Seo'
import { useReveals } from '../../hooks/useReveals'

export function Layout() {
  const location = useLocation()
  useReveals(location.pathname)
  return (
    <>
      <a
        href="#sisalto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:font-semibold focus:text-paper"
      >
        Siirry sisältöön
      </a>
      <ScrollManager />
      <Seo />
      {/* One line at every width (a font swap must not re-wrap it and shift the page). */}
      <p className="overflow-hidden whitespace-nowrap bg-ink px-4 py-1.5 text-center font-[family-name:var(--font-mono)] text-[0.68rem] uppercase leading-5 tracking-[0.08em] text-paper/85 sm:text-[0.7rem] sm:tracking-[0.1em]">
        <span className="sm:hidden">Konseptidemo – ei virallinen sivusto</span>
        <span className="hidden sm:inline">Konseptidemo · Hades Design – ei Tojoko Oy:n virallinen sivusto</span>
      </p>
      <Header />
      <main id="sisalto" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <CallBar />
    </>
  )
}
