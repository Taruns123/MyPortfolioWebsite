import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion.jsx'

/**
 * A pen tip that follows the pointer. Over anything with data-cursor="label"
 * it grows into a highlighter dot carrying that label; over links and buttons
 * it opens into a ring. Also drives [data-magnetic] elements, which lean
 * toward the pointer. Mouse/trackpad only.
 */
export default function Cursor() {
  const root = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const html = document.documentElement
    html.classList.add('has-cursor')
    const el = root.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.16, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.16, ease: 'power3' })

    // magnetic elements, one set of quickTo tweens per element
    const mags = new WeakMap()
    let magEl = null
    const magFor = (m) => {
      if (!mags.has(m)) mags.set(m, {
        x: gsap.quickTo(m, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.45)' }),
        y: gsap.quickTo(m, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.45)' }),
      })
      return mags.get(m)
    }
    const releaseMag = () => { if (magEl) { const f = magFor(magEl); f.x(0); f.y(0); magEl = null } }

    let mode = ''
    const setMode = (m, text = '') => {
      if (m === mode && label.current.textContent === text) return
      mode = m
      el.dataset.mode = m
      label.current.textContent = text
    }

    const move = (e) => {
      xTo(e.clientX); yTo(e.clientY)
      const t = e.target instanceof Element ? e.target : null
      const tagged = t?.closest('[data-cursor]')
      if (tagged) setMode(tagged.dataset.cursor === 'draw' ? 'draw' : 'label', tagged.dataset.cursor)
      else if (t?.closest('input, textarea')) setMode('text')
      else if (t?.closest('a, button, label, summary')) setMode('link')
      else setMode('')

      const m = t?.closest('[data-magnetic]')
      if (m !== magEl) releaseMag()
      if (m) {
        magEl = m
        const r = m.getBoundingClientRect()
        const f = magFor(m)
        f.x((e.clientX - (r.left + r.width / 2)) * 0.3)
        f.y((e.clientY - (r.top + r.height / 2)) * 0.3)
      }
    }
    const leave = () => { el.dataset.hidden = 'true'; releaseMag() }
    const enter = () => { el.dataset.hidden = 'false' }
    const down = () => el.classList.add('is-down')
    const up = () => el.classList.remove('is-down')

    addEventListener('pointermove', move)
    addEventListener('pointerdown', down)
    addEventListener('pointerup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    return () => {
      html.classList.remove('has-cursor')
      removeEventListener('pointermove', move)
      removeEventListener('pointerdown', down)
      removeEventListener('pointerup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [])

  return (
    <div className="cursor" ref={root} data-mode="" data-hidden="false" aria-hidden="true">
      <span className="cursor__dot" />
      <span className="cursor__label" ref={label} />
    </div>
  )
}
