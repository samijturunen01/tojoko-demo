interface Props {
  num?: string
  children: React.ReactNode
  dark?: boolean
  className?: string
}

/** Section marker styled as a workshop key tag: punched hole, number, label. */
export function SectionTag({ num, children, dark = false, className = '' }: Props) {
  return (
    <p className={`label inline-flex items-center gap-3 ${dark ? 'text-mist' : 'text-muted'} ${className}`}>
      {num && (
        <span
          aria-hidden="true"
          className={`relative inline-flex h-7 items-center rounded-[0.45rem] pl-6 pr-2.5 text-[0.75rem] font-medium tracking-[0.08em] ${
            dark ? 'bg-yellow text-ink' : 'bg-petrol text-yellow'
          }`}
        >
          <span className={`absolute left-2 top-1/2 size-2 -translate-y-1/2 rounded-full ${dark ? 'bg-petrol' : 'bg-paper'}`} />
          {num}
        </span>
      )}
      <span>{children}</span>
    </p>
  )
}
