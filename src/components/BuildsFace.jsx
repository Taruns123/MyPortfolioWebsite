import { useEffect, useRef } from 'react'
import { builds } from '../content/builds.js'
import BuildSection from './BuildSection.jsx'

/**
 * The four builds on one napkin face, as tabs. Live, it cycles through
 * them on its own until someone picks a tab; the still copy shows whichever
 * tab is up so a fold never swaps the picture underneath you.
 */
export default function BuildsFace({ still = false, active = false, tab = 0, setTab }) {
  const touched = useRef(false)

  useEffect(() => {
    if (still || !active) return
    const id = setInterval(() => { if (!touched.current) setTab((t) => (t + 1) % builds.length) }, 5200)
    return () => clearInterval(id)
  }, [still, active, setTab])

  return (
    <div className="builds-face" id={still ? undefined : 'builds'}>
      <div className="builds-face__tabs mono" role={still ? undefined : 'tablist'} aria-label="What I build">
        {builds.map((b, i) => (
          <button
            key={b.key}
            type="button"
            role={still ? undefined : 'tab'}
            aria-selected={still ? undefined : i === tab}
            tabIndex={still ? -1 : undefined}
            className={i === tab ? 'is-on' : ''}
            onClick={() => { touched.current = true; setTab(i) }}
          >
            <span>{b.n}</span> {b.title.replace(/^An? /, '')}
          </button>
        ))}
      </div>
      <BuildSection key={builds[tab].key} build={builds[tab]} mode={still ? 'still' : 'play'} active={active} />
    </div>
  )
}
