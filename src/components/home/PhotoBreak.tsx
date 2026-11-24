import { useEffect, useRef } from 'react'
import { Photo } from '../ui/Photo'
import { prefersReducedMotion } from '../../lib/intro'

/**
 * Full-bleed editorial break with the brand line. The photo drifts slightly against the
 * scroll (GSAP ScrollTrigger, desktop only, never with reduced motion).
 */
export function PhotoBreak() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !window.matchMedia('(min-width: 1024px)').matches) return
    let cleanup = () => {}
    let cancelled = false
    import('../../lib/motion').then(({ gsap }) => {
      if (cancelled) return
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelector('img'),
          { yPercent: -6 },
          { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      }, el)
      cleanup = () => ctx.revert()
    })
    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-petrol-deep" aria-label="Työkaluseinä">
      <div ref={ref} className="relative h-[min(78vh,40rem)] min-h-[26rem]">
        <Photo name="tyokaluseina" sizes="100vw" className="absolute inset-0 h-full" imgClassName="scale-[1.14]" />
        <div className="absolute inset-0 bg-gradient-to-r from-petrol-deep/90 via-petrol-deep/55 to-transparent" aria-hidden="true" />
        <div className="wrap relative flex h-full items-center">
          <p className="max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2.2rem,1.4rem+3.4vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-paper">
            Jokaisella työkalulla on paikkansa. <span className="text-yellow">Ja jokaisella vialla syynsä.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
