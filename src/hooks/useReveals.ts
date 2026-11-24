import { useEffect } from 'react'

/**
 * Reveals [data-reveal] / [data-wipe] elements when they enter the viewport (adds .is-in).
 * Content is visible without JavaScript; the hidden start state only applies under html.js.
 */
export function useReveals(key: string) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], [data-wipe]')).filter(
      (el) => !el.classList.contains('is-in'),
    )
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
}
