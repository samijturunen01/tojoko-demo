import wordmark from './wordmark.json'

interface Props {
  className?: string
  /** Colour of the letters (default: currentColor). */
  color?: string
  /** Colour of the "OK" letters – omit for a single-colour mark. */
  okColor?: string
  title?: string
}

/**
 * Conceptual TOJOKO wordmark (Hades Design proposal – no authentic logo exists).
 * Three socket "O"s with hex counters; the "OK" in the middle can carry the accent colour.
 */
export function Wordmark({ className = '', color = 'currentColor', okColor, title }: Props) {
  return (
    <svg
      viewBox={wordmark.viewBox}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {wordmark.letters.map((l, i) => (
        <path key={i} d={l.d} fillRule="evenodd" fill={'ok' in l && l.ok && okColor ? okColor : color} />
      ))}
    </svg>
  )
}

export { wordmark }
