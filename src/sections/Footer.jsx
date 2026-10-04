import { useEffect, useRef } from 'react'
import { profile } from '../content/site.js'
import { prefersReducedMotion } from '../lib/motion.jsx'

const MARK = 'Tarun Shetty'

export default function Footer() {
  const mark = useRef(null)

  // Letters near the pointer thin out, like ink lifting off the page.
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const letters = [...mark.current.querySelectorAll('span')]
    const weight = letters.map(() => 900)
    let target = letters.map(() => 900)
    let centers = []
    let raf = 0
    const measure = () => { centers = letters.map((l) => { const r = l.getBoundingClientRect(); return r.left + r.width / 2 }) }
    const tick = () => {
      let moving = false
      letters.forEach((l, i) => {
        weight[i] += (target[i] - weight[i]) * 0.15
        if (Math.abs(target[i] - weight[i]) > 1) moving = true
        l.style.fontVariationSettings = `'wdth' 125, 'wght' ${weight[i].toFixed(0)}`
      })
      raf = moving ? requestAnimationFrame(tick) : 0
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick) }
    const move = (e) => {
      target = centers.map((c) => 900 - 650 * Math.max(0, 1 - Math.abs(e.clientX - c) / 220))
      kick()
    }
    const leave = () => { target = letters.map(() => 900); kick() }
    const el = mark.current
    el.addEventListener('pointerenter', measure)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointerenter', measure)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <footer className="footer">
      <div className="footer__row mono">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <span>{profile.city} · live {profile.liveWindowUtc}</span>
        <span className="footer__socials">
          {profile.socials.filter((s) => s.href).map((s) => <a key={s.name} href={s.href} target="_blank" rel="noreferrer">{s.name} ↗</a>)}
        </span>
      </div>
      <div className="footer__mark" ref={mark} role="img" aria-label={MARK}>
        {[...MARK].map((ch, i) => <span key={i} aria-hidden="true">{ch === ' ' ? ' ' : ch}</span>)}
      </div>
      <div className="footer__row mono">
        <span>© {new Date().getFullYear()}</span>
        <span>Sketched and built by hand in Mumbai.</span>
      </div>
    </footer>
  )
}
