import { Plus } from 'lucide-react'
import type { Qa } from '../../data/services'

export function Faq({ items, className = '' }: { items: Qa[]; className?: string }) {
  return (
    <div className={`faq divide-y divide-ink/15 border-y border-ink/15 ${className}`}>
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex items-start justify-between gap-6 py-5 font-[family-name:var(--font-display)] text-[1.15rem] font-bold leading-snug sm:text-[1.25rem]">
            <span>{f.q}</span>
            <span className="faq__icon mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink/70 group-hover:bg-yellow group-hover:border-ink">
              <Plus className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-12 text-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
