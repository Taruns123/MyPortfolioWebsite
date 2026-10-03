import { builds } from '../content/builds.js'
import { ticker } from '../content/site.js'
import BuildSection from '../components/BuildSection.jsx'

export function Ticker() {
  const items = [...ticker, ...ticker]
  return (
    <div className="ticker mono" aria-label={ticker.join(', ')}>
      <div className="ticker__track" aria-hidden="true">
        {items.map((t, i) => <span key={i}>{t} <b>✶</b></span>)}
      </div>
    </div>
  )
}

export default function Builds() {
  return (
    <div id="builds">
      <header className="section-head">
        <span className="mono">Builds</span>
        <h2>Four things I build. <em>Watch each one go from napkin to shipped.</em></h2>
      </header>
      {builds.map((b) => <BuildSection key={b.key} build={b} />)}
    </div>
  )
}
