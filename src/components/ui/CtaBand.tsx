import { Link } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { requestHref } from '../../data/nav'
import type { TopicId } from '../../data/services'
import { track } from '../../lib/analytics'
import { OpenNow } from './OpenNow'
import { Wordmark } from '../brand/Wordmark'

interface Props {
  title: React.ReactNode
  text: string
  topic?: TopicId
  location: string
}

/** Closing call to action – the pegboard wall with the two ways to get a time. */
export function CtaBand({ title, text, topic, location }: Props) {
  return (
    <section className="pegboard on-dark relative overflow-hidden" aria-labelledby={`cta-${location}`}>
      <Wordmark
        className="pointer-events-none absolute -right-10 bottom-[-1.2rem] hidden h-40 w-auto opacity-[0.07] lg:block"
        color="#f4f1e9"
      />
      <div className="wrap relative grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:py-24">
        <div className="lg:col-span-7">
          <h2 id={`cta-${location}`} className="display-l text-paper">
            {title}
          </h2>
          <p className="lead mt-5 max-w-2xl text-paper/85">{text}</p>
        </div>
        <div className="grid gap-3 sm:max-w-md lg:col-span-5 lg:ml-auto lg:w-full">
          <Link
            to={requestHref(topic ? { aihe: topic } : undefined)}
            className="btn btn--primary w-full"
            onClick={() => track('cta_click', { location })}
          >
            Pyydä aikaa korjaamolle
          </Link>
          <a href={company.phone.href} className="btn btn--light w-full" onClick={() => track('phone_click', { location })}>
            <Phone aria-hidden="true" />
            Soita {company.phone.display}
          </a>
          <div className="mt-3 grid gap-1.5 text-[0.98rem]">
            <OpenNow dark />
            <p className="inline-flex items-center gap-2.5 text-paper/85">
              <MapPin className="size-4 text-yellow" aria-hidden="true" />
              {company.address.street}, {company.address.postalCode} {company.address.city}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
