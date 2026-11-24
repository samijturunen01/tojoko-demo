import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CheckCircle2, Info, Loader2, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { topics, type TopicId } from '../../data/services'
import { symptomById } from '../../data/symptoms'
import { emptyRequest, timings, type FieldErrors, type ServiceRequest } from '../../lib/forms/types'
import { formatPlate, validate } from '../../lib/forms/validate'
import { getFormAdapter, isDemoMode } from '../../lib/forms/submit'
import { track } from '../../lib/analytics'
import { useIsClient } from '../../hooks/useIsClient'
import { KeyTag } from './KeyTag'

const order: (keyof ServiceRequest)[] = ['topic', 'plate', 'vehicle', 'description', 'timing', 'name', 'phone', 'email']
const isTopic = (v: string | null): v is TopicId => !!v && topics.some((t) => t.id === v)

/**
 * Time request ("aikapyyntö"). Pre-selection comes from ?aihe=…&oire=… (applied after
 * hydration so the prerendered HTML matches). Delivery is delegated to lib/forms/submit –
 * in the demo nothing leaves the browser and nothing is stored.
 */
export function RequestForm() {
  const client = useIsClient()
  const { search } = useLocation()
  const [data, setData] = useState<ServiceRequest>(() => emptyRequest())
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const started = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Apply URL pre-selection once per distinct query (adjust-state-during-render pattern).
  const query = client ? search : ''
  const [appliedQuery, setAppliedQuery] = useState('')
  if (query !== appliedQuery) {
    setAppliedQuery(query)
    const p = new URLSearchParams(query)
    const topic = p.get('aihe')
    const symptom = symptomById(p.get('oire'))
    if (isTopic(topic) || symptom) {
      setData((d) => ({
        ...d,
        topic: isTopic(topic) ? topic : (symptom?.topic ?? d.topic),
        description: symptom && !d.description.trim() ? `${symptom.label}: ` : d.description,
      }))
    }
  }

  const set = <K extends keyof ServiceRequest>(key: K, value: ServiceRequest[K]) => {
    if (!started.current) {
      started.current = true
      track('form_start', { form: 'aikapyynto' })
    }
    setData((d) => ({ ...d, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
    if (status !== 'idle' && status !== 'sending') setStatus('idle')
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (data.website) return // honeypot
    const found = validate(data)
    setErrors(found)
    const first = order.find((k) => found[k])
    if (first) {
      track('form_validation_error', { field: first })
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)
      el?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await getFormAdapter().submit(data)
      setStatus('done')
      setMessage(res.message)
      track('form_submit_success', { topic: data.topic, demo: res.demo })
    } catch {
      setStatus('error')
      setMessage(`Lähetys ei onnistunut. Soita korjaamolle: ${company.phone.display}.`)
    }
  }

  const err = (k: keyof ServiceRequest) =>
    errors[k] ? (
      <p id={`${k}-virhe`} className="field-error">
        {errors[k]}
      </p>
    ) : null
  const aria = (k: keyof ServiceRequest, hint?: string) => ({
    'aria-invalid': errors[k] ? (true as const) : undefined,
    'aria-describedby': [errors[k] ? `${k}-virhe` : '', hint ?? ''].filter(Boolean).join(' ') || undefined,
  })
  const descRequired = data.topic !== '' && data.topic !== 'huolto'

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
      <form ref={formRef} noValidate onSubmit={onSubmit} className="relative grid gap-7 lg:col-span-7" aria-labelledby="aikapyynto-title">
        <div>
          <h2 id="aikapyynto-title" className="display-l">
            Aikapyyntö
          </h2>
          <p className="mt-4 max-w-xl text-ink-2">
            Kerro, mitä autolle pitäisi tehdä. Sovit ajan ja yksityiskohdat korjaamon kanssa. Pakolliset kentät on merkitty tähdellä (*).
          </p>
          {isDemoMode() && (
            <p className="mt-5 flex gap-3 rounded-xl border-2 border-ink/20 bg-paper-2 p-4 text-[0.95rem]">
              <Info className="mt-0.5 size-5 shrink-0 text-petrol" aria-hidden="true" />
              <span>
                <strong>Konseptidemo:</strong> lomake ei lähetä eikä tallenna tietoja. Kiireellisissä asioissa soita{' '}
                <a href={company.phone.href} className="font-bold underline decoration-yellow decoration-2 underline-offset-4">
                  {company.phone.display}
                </a>
                .
              </span>
            </p>
          )}
        </div>

        <fieldset className="field" aria-describedby={errors.topic ? 'topic-virhe' : undefined}>
          <legend>Mitä asia koskee? *</legend>
          <div className="mt-1 flex flex-wrap gap-2.5">
            {topics.map((t) => (
              <label key={t.id} className="chip">
                <input type="radio" name="topic" value={t.id} checked={data.topic === t.id} onChange={() => set('topic', t.id)} />
                <span className="chip__dot" aria-hidden="true" />
                {t.label}
              </label>
            ))}
          </div>
          {err('topic')}
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="field">
            <label htmlFor="plate">
              Rekisterinumero <span className="font-normal text-muted">(valinnainen)</span>
            </label>
            <input
              id="plate"
              name="plate"
              className="input font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-[0.06em]"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              inputMode="text"
              placeholder="ABC-123"
              value={data.plate}
              onChange={(e) => set('plate', formatPlate(e.target.value))}
              {...aria('plate')}
            />
            {err('plate')}
          </div>
          <div className="field">
            <label htmlFor="vehicle">
              Merkki, malli ja vuosimalli <span className="font-normal text-muted">(valinnainen)</span>
            </label>
            <input
              id="vehicle"
              name="vehicle"
              className="input"
              autoComplete="off"
              placeholder="esim. Toyota Avensis 2012"
              value={data.vehicle}
              onChange={(e) => set('vehicle', e.target.value)}
              maxLength={80}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="description">
            {data.topic === 'huolto' ? 'Lisätiedot' : 'Mitä autossa tuntuu tai mitä pitäisi tehdä?'} {descRequired ? '*' : <span className="font-normal text-muted">(valinnainen)</span>}
          </label>
          <p id="description-ohje" className="text-[0.95rem] text-muted">
            {data.topic === 'huolto'
              ? 'Esimerkiksi mittarilukema ja milloin auto on viimeksi huollettu.'
              : 'Kerro, milloin oire alkoi ja missä tilanteessa se ilmenee. Mainitse myös palavat vikavalot.'}
          </p>
          <textarea
            id="description"
            name="description"
            className="input"
            rows={5}
            value={data.description}
            onChange={(e) => set('description', e.target.value)}
            maxLength={2000}
            {...aria('description', 'description-ohje')}
          />
          {err('description')}
        </div>

        <div className="field sm:max-w-sm">
          <label htmlFor="timing">
            Toivottu ajankohta <span className="font-normal text-muted">(valinnainen)</span>
          </label>
          <select id="timing" name="timing" className="input" value={data.timing} onChange={(e) => set('timing', e.target.value as ServiceRequest['timing'])}>
            <option value="">Valitse…</option>
            {timings.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 border-t border-ink/15 pt-7 sm:grid-cols-2">
          <div className="field sm:col-span-2">
            <label htmlFor="name">Nimi *</label>
            <input
              id="name"
              name="name"
              className="input"
              autoComplete="name"
              value={data.name}
              onChange={(e) => set('name', e.target.value)}
              maxLength={100}
              {...aria('name')}
            />
            {err('name')}
          </div>
          <div className="field">
            <label htmlFor="phone">Puhelin *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              className="input"
              autoComplete="tel"
              placeholder="040 123 4567"
              value={data.phone}
              onChange={(e) => set('phone', e.target.value)}
              maxLength={20}
              {...aria('phone')}
            />
            {err('phone')}
          </div>
          <div className="field">
            <label htmlFor="email">
              Sähköposti <span className="font-normal text-muted">(valinnainen)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              className="input"
              autoComplete="email"
              value={data.email}
              onChange={(e) => set('email', e.target.value)}
              maxLength={120}
              {...aria('email')}
            />
            {err('email')}
          </div>
        </div>

        {/* Honeypot: hidden from people and assistive tech */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Jätä tämä kenttä tyhjäksi</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set('website', e.target.value)} />
        </div>

        <div className="grid gap-4">
          <button type="submit" className="btn btn--primary w-full sm:w-auto sm:justify-self-start" disabled={status === 'sending'}>
            {status === 'sending' ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
            {status === 'sending' ? 'Käsitellään…' : 'Lähetä aikapyyntö'}
          </button>
          <div role="status" aria-live="polite">
            {status === 'done' && (
              <p className="flex gap-3 rounded-xl border-2 border-petrol bg-[#e3eeec] p-4 font-semibold text-ink">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-petrol" aria-hidden="true" />
                <span>
                  {message}
                  {isDemoMode() && (
                    <span className="mt-1 block font-normal text-ink-2">
                      Tämä on konseptidemo. Varaa aika soittamalla {company.phone.display}.
                    </span>
                  )}
                </span>
              </p>
            )}
            {status === 'error' && <p className="field-error">{message}</p>}
          </div>
          <p className="text-[0.92rem] text-muted">
            Älä kirjoita lomakkeeseen arkaluonteisia tietoja, kuten terveystietoja tai henkilötunnusta.
          </p>
        </div>
      </form>

      <aside className="hidden lg:col-span-5 lg:block" aria-label="Aikapyynnön esikatselu">
        <div className="sticky top-32">
          <KeyTag data={data} />
          <p className="mt-8 text-center text-[0.95rem] text-muted">Avainlappu täyttyy sitä mukaa kuin kirjoitat.</p>
          <a
            href={company.phone.href}
            className="btn btn--ghost mx-auto mt-6 flex w-fit"
            onClick={() => track('phone_click', { location: 'form_aside' })}
          >
            <Phone aria-hidden="true" />
            Mieluummin puhelimitse? {company.phone.display}
          </a>
        </div>
      </aside>
    </div>
  )
}
