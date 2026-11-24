import { useEffect, useState } from 'react'
import { company } from '../../data/company'
import { openState, type OpenState } from '../../lib/hours'
import { useIsClient } from '../../hooks/useIsClient'

/**
 * "Open now" status in Finnish time, from the regular hours. Prerendered HTML shows the
 * static hours; the live state appears after hydration (no hydration mismatch).
 */
export function OpenNow({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  const client = useIsClient()
  const [state, setState] = useState<OpenState | null>(null)
  useEffect(() => {
    if (!client) return
    const tick = () => setState(openState())
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [client])

  const open = state?.open
  return (
    <p className={`inline-flex items-center gap-2.5 ${dark ? 'text-paper' : 'text-ink'} ${className}`}>
      <span className="relative flex size-2.5" aria-hidden="true">
        {open && <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#3fbf7f] opacity-60 motion-reduce:hidden" />}
        <span className={`relative inline-flex size-2.5 rounded-full ${state ? (open ? 'bg-[#2fa36b]' : 'bg-rust') : dark ? 'bg-mist' : 'bg-muted'}`} />
      </span>
      <span>{state ? state.text : `Avoinna ${company.hoursShort}`}</span>
    </p>
  )
}
