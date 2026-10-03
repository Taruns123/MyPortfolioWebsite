import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { nav, profile } from '../content/site.js'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion.jsx'
import { Go } from './Transition.jsx'
import Scribble from './Scribble.jsx'

export default function Rail() {
  const progress = useRef(null)
  const { pathname } = useLocation()

  // A pencil line under the rail that tracks how far down the page you are.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const tween = gsap.fromTo(progress.current, { scaleX: 0 }, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => { cancelAnimationFrame(id); tween.scrollTrigger?.kill(); tween.kill() }
  }, [pathname])

  return (
    <header className="rail mono">
      <Go to="/" className="rail__name">{profile.name}</Go>
      <nav className="rail__nav" aria-label="Sections">
        {nav.map((n) => <Go key={n.href} to={`/${n.href}`}>{n.label}<Scribble /></Go>)}
      </nav>
      <Go to="/#contact" className="rail__cta" data-cursor="say hi">Send the napkin ↗</Go>
      <span className="rail__progress" ref={progress} aria-hidden="true" />
    </header>
  )
}
