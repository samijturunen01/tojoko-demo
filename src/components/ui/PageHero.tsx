import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { PhotoKey } from '../../data/photos'
import { Photo } from './Photo'
import { SectionTag } from './SectionTag'

interface Crumb {
  label: string
  to?: string
}

interface Props {
  crumbs: Crumb[]
  tag: string
  num?: string
  title: React.ReactNode
  lead: React.ReactNode
  children?: React.ReactNode
  photo?: PhotoKey
}

/** Subpage hero: breadcrumb, key-tag marker, H1, lead, actions and an optional photo panel. */
export function PageHero({ crumbs, tag, num, title, lead, children, photo }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-ink/15">
      <div className={`wrap grid gap-10 pb-14 pt-8 sm:pt-10 lg:gap-14 lg:pb-20 ${photo ? 'lg:grid-cols-12 lg:items-end' : ''}`}>
        <div className={photo ? 'lg:col-span-7' : 'max-w-4xl'}>
          <nav aria-label="Murupolku" className="mb-8 sm:mb-10">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.92rem] text-muted">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3.5" aria-hidden="true" />}
                  {c.to ? (
                    <Link to={c.to} className="underline decoration-ink/30 underline-offset-4 hover:text-ink hover:decoration-yellow">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <SectionTag num={num}>{tag}</SectionTag>
          <h1 className="display-xl mt-5 text-ink">{title}</h1>
          <div className="lead mt-6 max-w-2xl text-ink-2">{lead}</div>
          {children && <div className="mt-8">{children}</div>}
        </div>
        {photo && (
          <div className="relative lg:col-span-5">
            <div className="absolute -inset-3 -z-0 hidden rounded-[1.6rem] pegboard lg:block" aria-hidden="true" />
            <Photo
              name={photo}
              priority
              sizes="(min-width: 1280px) 34rem, (min-width: 1024px) 40vw, 100vw"
              className="relative aspect-[4/3] rounded-[1.25rem] bg-paper-3 lg:aspect-[4/5]"
            />
          </div>
        )}
      </div>
    </section>
  )
}
