import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metaFor, routes } from '../../data/seo'

/** Keeps <title> and the meta description in sync on client-side navigation (prerender sets them on load). */
export function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    const meta = routes.some((r) => r.path === path) ? metaFor(path) : metaFor('/404')
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [pathname])
  return null
}
