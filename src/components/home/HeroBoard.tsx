import { wordmark } from '../brand/Wordmark'

/**
 * Signature hero visual – "Kaikki paikallaan" (everything in its place).
 *
 * A pegboard tool wall with painted shadow outlines. On a fresh homepage load the outlines
 * are painted first, then the TOJOKO letters hang onto their pegs like tools onto their
 * shadows, a wrench swings into place and the "OK" inside the name lights up.
 * Choreography lives in index.css (html.intro …); the final state is the default state,
 * so without JS / with reduced motion everything is simply in place.
 *
 * Two framings of the same drawing: the full board (desktop) and a compact wordmark strip
 * that sits above the H1 on phones, so the intro is seen without scrolling.
 */
const S = 0.92 // wordmark scale inside the 680 × 440 board
const WX = (680 - wordmark.width * S) / 2
const WY = 118

const METAL = '#c9d5d3'
const PEG = '#d7e1df'

/* Vertical combination wrench, local coords, top centre at (0,0) */
const wrenchRing = 'M-16 16A16 16 0 1 0 16 16A16 16 0 1 0 -16 16ZM0 8L6.93 12L6.93 20L0 24L-6.93 20L-6.93 12Z'
const wrenchHandle = 'M-6 28H6V132H-6Z'
const wrenchOpen = 'M6 153.75A15 15 0 1 0 -6 153.75L-6 142L6 142Z'
const wrenchOutline = 'M-16 16A16 16 0 1 1 16 16A16 16 0 1 1 -16 16ZM-6 30V130M6 30V130M6 153.75A15 15 0 1 0 -6 153.75L-6 142L6 142Z'

const TOOLS_Y = 304
const sockets = [
  { x: 372, w: 17, h: 27 },
  { x: 402, w: 19, h: 30 },
  { x: 434, w: 22, h: 33 },
  { x: 470, w: 26, h: 37 },
]

function Wrench({ x, y, scale, swing = false }: { x: number; y: number; scale: number; swing?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d={wrenchOutline} className="hb-shadow" pathLength={1} />
      <g className={swing ? 'hb-tool' : undefined}>
        <circle cx="0" cy="-7" r="4.5" fill={PEG} />
        <g fill={METAL}>
          <path d={wrenchRing} fillRule="evenodd" />
          <path d={wrenchHandle} />
          <path d={wrenchOpen} />
        </g>
        <path d="M-2 40V120" stroke="#ffffff" strokeOpacity=".35" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </g>
  )
}

function Letters() {
  return (
    <>
      {/* Painted shadows of the letters */}
      <g transform={`translate(${WX} ${WY}) scale(${S})`}>
        {wordmark.letters.map((l, i) => (
          <path key={i} d={l.d} fillRule="evenodd" className="hb-shadow" pathLength={1} strokeWidth={5} />
        ))}
      </g>
      {/* Pegs + letters hanging on them */}
      <g transform={`translate(${WX} ${WY}) scale(${S})`}>
        {wordmark.letters.map((l, i) => {
          const ok = 'ok' in l && l.ok
          return (
            <g key={i} className={ok ? 'hb-letter hb-ok' : 'hb-letter'} style={{ '--i': i } as React.CSSProperties}>
              <path d={`M${l.x} -16V4`} stroke={PEG} strokeWidth={5} strokeLinecap="round" fill="none" />
              <circle cx={l.x} cy={-18} r={5.5} fill={PEG} />
              <path d={l.d} fillRule="evenodd" />
            </g>
          )
        })}
      </g>
      <text x="340" y="262" textAnchor="middle" fill="#b5cbc9" style={{ fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: '0.32em' }}>
        AUTOKORJAAMO · JOENSUU
      </text>
    </>
  )
}

const LABEL = 'Tojoko – autokorjaamo. Kirjaimet ja työkalut ripustettuina työkaluseinälle.'

export function HeroBoard() {
  return (
    <div className="pegboard on-dark relative hidden aspect-[680/440] w-full overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-30px_rgb(10_43_46/0.65)] lg:block">
      <p className="label absolute left-6 top-5 z-10 text-[0.72rem] text-mist">Työkaluseinä · Aspitie 16</p>
      <p className="label absolute right-6 top-5 z-10 text-[0.72rem] text-mist">Joensuu</p>

      <svg viewBox="0 0 680 440" className="absolute inset-0 h-full w-full" role="img" aria-label={LABEL}>
        <Letters />

        {/* Tool rail */}
        <path d={`M150 ${TOOLS_Y - 12}H530`} stroke="#061a1c" strokeOpacity=".5" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />

        <Wrench x={196} y={TOOLS_Y} scale={0.74} swing />
        <Wrench x={244} y={TOOLS_Y} scale={0.62} />
        <Wrench x={284} y={TOOLS_Y} scale={0.5} />

        {/* Screwdriver */}
        <g transform={`translate(328 ${TOOLS_Y}) scale(0.82)`}>
          <path d="M-11 9Q-11 0 -2 0H2Q11 0 11 9V50Q11 58 2 58H-2Q-11 58 -11 50ZM-6 58H6V66H-6ZM-3 66H3V128L1.2 138H-1.2L-3 128Z" className="hb-shadow" pathLength={1} />
          <circle cx="0" cy="-7" r="4.5" fill={PEG} />
          <rect x="-11" y="0" width="22" height="58" rx="9" fill="#e06a3a" />
          <path d="M-4 10V48M4 10V48" stroke="#9c3d1a" strokeWidth="2" strokeLinecap="round" />
          <rect x="-6" y="58" width="12" height="8" fill={METAL} />
          <path d="M-3 66H3V128L1.2 138H-1.2L-3 128Z" fill={METAL} />
        </g>

        {/* Sockets on a rail */}
        <path d={`M356 ${TOOLS_Y - 4}H490`} stroke={PEG} strokeWidth="4" strokeLinecap="round" />
        {sockets.map((s) => (
          <g key={s.x} transform={`translate(${s.x} ${TOOLS_Y + 4})`}>
            <rect x={-s.w / 2} y={0} width={s.w} height={s.h} rx={3} className="hb-shadow" pathLength={1} />
            <rect x={-s.w / 2} y={0} width={s.w} height={s.h} rx={3} fill={METAL} />
            <path d={`M${-s.w / 2} ${s.h * 0.38}H${s.w / 2}`} stroke="#8fa3a1" strokeWidth="1.6" />
          </g>
        ))}
      </svg>

      <p className="hb-status label absolute bottom-5 right-6 z-10 flex items-center gap-2 rounded-md bg-petrol-deep/80 px-2.5 py-1.5 text-[0.72rem] text-paper">
        <span className="size-2 rounded-full bg-yellow" aria-hidden="true" />
        Kaikki paikallaan
      </p>
    </div>
  )
}

/** Phone framing: just the pegs, the hanging wordmark and the descriptor. */
export function HeroStrip() {
  return (
    <div className="pegboard on-dark relative overflow-hidden rounded-2xl lg:hidden">
      <svg viewBox="40 84 600 196" className="block h-auto w-full" role="img" aria-label={LABEL}>
        <Letters />
      </svg>
    </div>
  )
}
