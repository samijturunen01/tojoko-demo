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
      <Header />
      <main id="sisalto" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <CallBar />
    </>
  )
}
