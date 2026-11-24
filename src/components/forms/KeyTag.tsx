import type { ServiceRequest } from '../../lib/forms/types'
import { topics } from '../../data/services'
import { timings } from '../../lib/forms/types'

/**
 * Live preview of the request as a workshop key tag ("avainlappu") – the tag a garage
 * hangs on your keys. Purely visual (aria-hidden): the form itself is the accessible source.
 */
export function KeyTag({ data }: { data: ServiceRequest }) {
  const topic = topics.find((t) => t.id === data.topic)?.label
  const timing = timings.find((t) => t.id === data.timing)?.label
  const desc = data.description.trim()
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[22rem] select-none">
      {/* key ring */}
      <svg viewBox="0 0 120 70" className="mx-auto -mb-5 block w-24 text-[#9fb1af]">
        <circle cx="60" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth="5" />
        <path d="M60 54V70" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <div className="keytag relative rotate-[2deg] bg-yellow px-7 pb-8 pt-12 text-ink shadow-[0_30px_50px_-28px_rgb(10_43_46/0.8)]">
        <span className="keytag__hole" style={{ background: 'var(--color-paper)' }} />
        <div className="flex items-baseline justify-between gap-3 border-b-2 border-ink/80 pb-3">
          <span className="font-[family-name:var(--font-display)] text-xl font-black tracking-tight">TOJOKO</span>
          <span className="label text-[0.65rem]">Avainlappu</span>
        </div>

        <div className="mt-5 flex items-stretch overflow-hidden rounded-md border-2 border-ink bg-white">
          <span className="flex w-7 flex-col items-center justify-end bg-[#1f4fa3] pb-1 text-[0.55rem] font-bold text-white">FIN</span>
          <span className="flex-1 px-3 py-1.5 text-center font-[family-name:var(--font-display)] text-[1.9rem] font-black tracking-[0.08em]">
            {data.plate.trim() || 'ABC-123'}
          </span>
        </div>

        <dl className="mt-5 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-2 text-[0.95rem]">
          <dt className="label pt-0.5 text-[0.65rem] text-ink/75">Työ</dt>
          <dd className="font-[family-name:var(--font-display)] font-bold">{topic ?? '—'}</dd>
          <dt className="label pt-0.5 text-[0.65rem] text-ink/75">Auto</dt>
          <dd className="truncate">{data.vehicle.trim() || '—'}</dd>
          <dt className="label pt-0.5 text-[0.65rem] text-ink/75">Ajankohta</dt>
          <dd>{timing ?? '—'}</dd>
          <dt className="label pt-0.5 text-[0.65rem] text-ink/75">Asiakas</dt>
          <dd className="truncate">{data.name.trim() || '—'}</dd>
        </dl>
        <p className="mt-4 min-h-[4.5rem] rounded-md border border-dashed border-ink/50 p-3 font-[family-name:var(--font-mono)] text-[0.8rem] leading-relaxed">
          {desc ? (desc.length > 120 ? `${desc.slice(0, 120)}…` : desc) : 'Kuvaus näkyy tässä, kun kirjoitat.'}
        </p>
      </div>
    </div>
  )
}
