export type ToolName = 'oilcan' | 'wrench' | 'probe'

interface Props {
  name: ToolName
  className?: string
  /** Painted outline (shadow-board paint) or a filled metal silhouette. */
  variant?: 'paint' | 'solid'
}

/**
 * Tool silhouettes drawn for this site (shadow-board language). Decorative only.
 * 200 × 200 viewBox.
 */
export function ToolGlyph({ name, className = '', variant = 'paint' }: Props) {
  const paint = variant === 'paint'
  const common = paint
    ? { fill: 'none', stroke: 'currentColor', strokeWidth: 5, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }
    : { fill: 'currentColor' }
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      {name === 'wrench' && (
        <g transform="rotate(-45 100 100)" {...common}>
          <path
            fillRule="evenodd"
            d="M4 100A18 18 0 1 0 40 100A18 18 0 1 0 4 100ZM22 91L29.79 95.5L29.79 104.5L22 109L14.21 104.5L14.21 95.5Z"
          />
          <rect x="38" y="93" width="126" height="14" rx="7" />
          <path d="M191.49 93A17 17 0 1 0 191.49 107L178 107L178 93Z" />
        </g>
      )}
      {name === 'oilcan' && (
        <g {...common}>
          <path d="M44 172V116Q44 102 58 102H122Q136 102 136 116V172Z" />
          <rect x="76" y="86" width="28" height="16" rx="4" />
          <path d="M124 108L182 56" strokeWidth={paint ? 10 : 0} stroke={paint ? 'currentColor' : 'none'} fill="none" />
          {!paint && <path d="M120 104L178 52L186 60L128 112Z" />}
          <path d="M44 118C14 118 14 160 44 160" fill="none" stroke="currentColor" strokeWidth={paint ? 5 : 10} />
          <path d="M56 136H124" fill="none" stroke="currentColor" strokeWidth={paint ? 3 : 0} opacity={0.6} />
        </g>
      )}
      {name === 'probe' && (
        <g {...common}>
          <rect x="52" y="30" width="96" height="144" rx="16" />
          <rect x="68" y="46" width="64" height="36" rx="5" />
          <circle cx="100" cy="122" r="22" />
          <path d="M100 122L114 108" fill="none" stroke={paint ? 'currentColor' : '#0f3b3f'} strokeWidth="5" strokeLinecap="round" />
          <circle cx="80" cy="160" r="5" />
          <circle cx="120" cy="160" r="5" />
          <path d="M120 165C124 186 158 190 172 170C182 156 176 140 184 128" fill="none" stroke="currentColor" strokeWidth={paint ? 5 : 6} />
        </g>
      )}
    </svg>
  )
}
