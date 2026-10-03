import { nav, profile } from '../content/site.js'
import { Go } from './Transition.jsx'

export default function Rail() {
  return (
    <header className="rail mono">
      <Go to="/" className="rail__name">{profile.name}</Go>
      <nav className="rail__nav" aria-label="Sections">
        {nav.map((n) => <Go key={n.href} to={`/${n.href}`}>{n.label}</Go>)}
      </nav>
      <Go to="/#contact" className="rail__cta">Send the napkin ↗</Go>
    </header>
  )
}
