import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { endIntro, prefersReducedMotion } from '../../lib/intro'

const positions = new Map<string, number>()
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
const norm = (p: string) => p.replace(/\/+$/, '') || '/'

/**
 * Main-navigation links call this. Navigating to another page already opens it at the top
 * (see ScrollManager); this covers clicking the link of the page you are already on.
 * It never scrolls before a real navigation, so the page you leave keeps its saved position.
 */
export function navScroll(e: React.MouseEvent<HTMLAnchorElement>) {
  if (norm(new URL(e.currentTarget.href).pathname) === norm(window.location.pathname)) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }
}

/**
 * Scroll behaviour for client-side navigation:
 *  - PUSH/REPLACE without a hash → destination opens instantly at the top (no visible scroll)
 *  - links with a hash (#aikapyynto) → scroll to that section
 *  - browser back/forward (POP) → restore the saved position
 * No transition curtains, no blocking overlays.
 */
export function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()
  const first = useRef(true)
  const prevPath = useRef(location.pathname)
  const keyRef = useRef(location.key)

  // One listener for the whole session; positions are filed under the entry that is
  // current at the moment of scrolling (keyRef switches synchronously on navigation).
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const save = () => positions.set(keyRef.current, window.scrollY)
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [])

  useIsoLayoutEffect(() => {
    const samePage = prevPath.current === location.pathname
    prevPath.current = location.pathname
    keyRef.current = location.key
    if (first.current) {
      // Initial document load: the browser has already handled any #hash.
      first.current = false
      return
    }
    // Any in-app navigation ends the homepage intro for good (no replay when returning home).
    endIntro()
    if (navType === 'POP') {
      window.scrollTo({ top: positions.get(location.key) ?? 0, left: 0, behavior: 'instant' })
      return
    }
    if (location.hash) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (el) {
        // From another page: start at the top, then glide to the section. Same page: just glide.
        if (!samePage) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        requestAnimationFrame(() => el.scrollIntoView({ behavior: prefersReducedMotion() ? 'instant' : 'smooth', block: 'start' }))
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.key])

  return null
}
