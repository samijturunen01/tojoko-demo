import { useState } from 'react'
import { ExternalLink, MapPin, Navigation } from 'lucide-react'
import { company } from '../../data/company'
import { track } from '../../lib/analytics'

/**
 * Privacy-conscious Google Maps embed: nothing is loaded from Google until the visitor asks
 * for the map. No API key. The placeholder is a drawn sketch of the street grid, not a map.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="grid overflow-hidden rounded-[1.5rem] bg-ink lg:grid-cols-[1.55fr_1fr]">
      <div className="relative aspect-[4/3] bg-petrol-deep sm:aspect-[16/10] lg:aspect-auto lg:min-h-[30rem]">
        {loaded ? (
          <iframe
            title={`Kartta: ${company.name}, ${company.address.street}, ${company.address.city}`}
            src={company.mapEmbedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="pegboard on-dark absolute inset-0 grid place-items-center overflow-hidden">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g stroke="#f4f1e9" strokeOpacity=".16" strokeWidth="26" fill="none" strokeLinecap="round">
                <path d="M-20 360 C180 330 420 300 820 250" />
                <path d="M300 -20 C320 160 350 330 380 520" />
              </g>
              <g stroke="#f4f1e9" strokeOpacity=".1" strokeWidth="10" fill="none" strokeLinecap="round">
                <path d="M-20 150 C220 170 520 120 820 140" />
                <path d="M600 -20 L560 520" />
                <path d="M120 520 L210 330" />
              </g>
              <path d="M300 -20 C320 160 350 330 380 520" stroke="#ffc933" strokeOpacity=".7" strokeWidth="2" strokeDasharray="12 12" fill="none" />
              <text x="398" y="88" fill="#b5cbc9" style={{ fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: '0.2em' }}>
                ASPITIE
              </text>
            </svg>
            <div className="relative flex flex-col items-center gap-4 px-6 text-center text-paper">
              <span className="grid size-14 place-items-center rounded-full bg-yellow text-ink shadow-[0_0_0_10px_rgb(255_201_51/0.22)]">
                <MapPin className="size-7" aria-hidden="true" />
              </span>
              <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-none">
                {company.address.street}, {company.address.city}
              </p>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  setLoaded(true)
                  track('map_load', { location: 'contact' })
                }}
              >
                Näytä kartta
              </button>
              <p className="max-w-sm text-sm text-mist">Kartta ladataan Googlelta vasta, kun valitset ”Näytä kartta”.</p>
            </div>
          </div>
        )}
      </div>
      <div className="on-dark flex flex-col gap-5 p-7 text-paper sm:p-9">
        <p className="label text-mist">Käyntiosoite</p>
        <address className="not-italic">
          <span className="block font-[family-name:var(--font-display)] text-4xl font-extrabold leading-none">{company.address.street}</span>
          <span className="mt-2 block text-xl">
            {company.address.postalCode} {company.address.city}
          </span>
        </address>
        <p className="text-paper/80">
          Salpakankaan yritysalueella Raatekankaalla, Joensuun kantakaupungissa. Avoinna {company.hoursShort}.
        </p>
        <div className="mt-auto grid gap-3">
          <a
            href={company.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary w-full"
            onClick={() => track('directions_click', { location: 'contact_map' })}
          >
            <Navigation aria-hidden="true" />
            Katso reittiohjeet
            <span className="sr-only">(avautuu uuteen välilehteen)</span>
          </a>
          <a
            href={company.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--light w-full"
            onClick={() => track('directions_click', { location: 'contact_map_open' })}
          >
            <ExternalLink aria-hidden="true" />
            Avaa Google Mapsissa
            <span className="sr-only">(avautuu uuteen välilehteen)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
