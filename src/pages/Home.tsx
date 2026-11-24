import { useEffect } from 'react'
import { Hero } from '../components/home/Hero'
import { ServiceBoard } from '../components/home/ServiceBoard'
import { SymptomPicker } from '../components/home/SymptomPicker'
import { PhotoBreak } from '../components/home/PhotoBreak'
import { ReviewThemes } from '../components/home/ReviewThemes'
import { Steps } from '../components/home/Steps'
import { Faq } from '../components/ui/Faq'
import { CtaBand } from '../components/ui/CtaBand'
import { SectionTag } from '../components/ui/SectionTag'
import { faqs } from '../data/faq'
import { endIntro, INTRO_MS } from '../lib/intro'

export function Home() {
  // The intro is CSS-only; this just retires the class once it has played.
  useEffect(() => {
    const id = window.setTimeout(endIntro, INTRO_MS)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <>
      <Hero />
      <ServiceBoard />
      <SymptomPicker />
      <ReviewThemes />
      <PhotoBreak />
      <Steps />
      <section className="border-t border-ink/15 bg-paper" aria-labelledby="ukk-title">
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-28">
          <div className="lg:col-span-4">
            <SectionTag num="05">Usein kysyttyä</SectionTag>
            <h2 id="ukk-title" className="display-l mt-5">
              Hyvä tietää ennen kuin tulet.
            </h2>
          </div>
          <Faq items={faqs} className="lg:col-span-8" />
        </div>
      </section>
      <CtaBand
        location="home_close"
        title={
          <>
            Onko autossa jotain, mikä <span className="text-yellow">ei tunnu oikealta?</span>
          </>
        }
        text="Kerro oire tai huoltotarve, niin sovitaan aika Aspitielle. Puhelimitse arkisin 8–17 – aikapyynnön voit jättää milloin vain."
      />
    </>
  )
}
