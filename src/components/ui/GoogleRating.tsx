import { ExternalLink, Star } from 'lucide-react'
import { company } from '../../data/company'
import { track } from '../../lib/analytics'

interface Props {
  location: string
  dark?: boolean
  className?: string
}

/**
 * Verified Google rating (manually checked from the public Google Business Profile – no API,
 * no scraped review texts). Links to the official reviews on Google.
 */
export function GoogleRating({ location, dark = false, className = '' }: Props) {
  const g = company.google
  return (
    <a
      href={g.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('reviews_click', { location })}
      className={`group inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-lg py-1 ${dark ? 'text-paper' : 'text-ink'} ${className}`}
    >
      <span className="flex text-yellow" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`size-[1.05rem] fill-current ${dark ? '' : 'stroke-ink/70'}`} strokeWidth={1.2} />
        ))}
      </span>
      <span className="font-[family-name:var(--font-display)] font-bold">{g.ratingText} Google</span>
      <span className={`underline decoration-yellow decoration-2 underline-offset-4 group-hover:decoration-current ${dark ? 'text-mist' : 'text-muted'}`}>
        {g.count} arviota
      </span>
      <ExternalLink className={`size-3.5 ${dark ? 'text-mist' : 'text-muted'}`} aria-hidden="true" />
      <span className="sr-only">– Google-arvio {g.ratingText}/5, {g.count} arviota. Avaa arviot Googlessa (uusi välilehti).</span>
    </a>
  )
}
