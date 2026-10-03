/**
 * Hand-drawn marks that draw themselves when their parent is hovered
 * (CSS only — pathLength="1" lets one dash cover any path).
 */
const PATHS = {
  under: { box: '0 0 100 12', d: 'M2 8 C 18 3, 36 11, 55 6 S 86 3, 98 8' },
  circle: { box: '0 0 120 50', d: 'M70 6 C 30 2, 4 14, 6 27 S 50 49, 86 44 S 120 26, 108 13 S 60 3, 40 9' },
}

export default function Scribble({ variant = 'under' }) {
  const p = PATHS[variant]
  return (
    <svg className={`scrib scrib--${variant}`} viewBox={p.box} preserveAspectRatio="none" aria-hidden="true">
      <path d={p.d} pathLength="1" />
    </svg>
  )
}
