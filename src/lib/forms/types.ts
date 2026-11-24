import type { TopicId } from '../../data/services'

export type Timing = 'heti' | 'tama-viikko' | 'ensi-viikko' | 'joustava'

/** Time request – what a small car repair shop needs to plan the job and get back to you. */
export interface ServiceRequest {
  topic: TopicId | ''
  plate: string
  vehicle: string
  description: string
  timing: Timing | ''
  name: string
  phone: string
  email: string
  /** Honeypot – must stay empty (bots fill it). */
  website: string
}

export type FieldErrors = Partial<Record<keyof ServiceRequest, string>>

export interface SubmitResult {
  ok: boolean
  /** True when nothing was actually sent (demo mode). */
  demo: boolean
  message: string
}

/** Every delivery mechanism implements this – the UI never knows which one is active. */
export interface FormAdapter {
  submit(data: ServiceRequest): Promise<SubmitResult>
}

export const timings: { id: Timing; label: string }[] = [
  { id: 'heti', label: 'Mahdollisimman pian' },
  { id: 'tama-viikko', label: 'Tällä viikolla' },
  { id: 'ensi-viikko', label: 'Ensi viikolla' },
  { id: 'joustava', label: 'Ajankohta on joustava' },
]

export const emptyRequest = (topic: TopicId | '' = '', description = ''): ServiceRequest => ({
  topic,
  plate: '',
  vehicle: '',
  description,
  timing: '',
  name: '',
  phone: '',
  email: '',
  website: '',
})
