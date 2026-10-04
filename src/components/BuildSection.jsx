import { useLayoutEffect, useMemo, useRef } from 'react'
import { boards } from './boards/index.jsx'
import { makeRough } from '../lib/sketch.js'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion.jsx'
import Typed from './Typed.jsx'
import { Go } from './Transition.jsx'

const STAGES = ['Sketch', 'Wireframe', 'Shipped']
const seedOf = (s) => [...s].reduce((a, c) => a + c.charCodeAt(0) * 131, 7)

const fmt = (el, p) => {
  const v = Number(el.dataset.count) * p
  switch (el.dataset.format) {
    case 'usd': return '$' + Math.round(v).toLocaleString('en-US')
    case 'pct': return v.toFixed(1) + '%'
    default: return String(Math.round(v))
  }
}

/**
 * mode: 'scroll' — pinned, scroll draws it (normal page)
 *       'scrub'  — inside the fold stage; the stage drives the timeline through
 *                  `onTimeline(tl)`, starting at progress `at`
 *       'still'  — a static copy: the finished UI, no motion
 * copy: a decorative duplicate (fold layers), so no ids
 */
export default function BuildSection({ build, mode = 'scroll', at = 0, onTimeline, copy = false }) {
  const { Ship, sketch, wire } = boards[build.key]
  const root = useRef(null)
  const paths = useMemo(() => sketch(makeRough(seedOf(build.key))), [sketch, build.key])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root)
      const sk = q('.sk')
      const draws = q('.ship-layer .draw')
      const blks = q('.ship-layer .blk')
      const counters = q('[data-count]')
      const stages = q('.stage')
      const setStage = (i) => stages.forEach((s, k) => s.classList.toggle('is-on', k === i))
      const setCount = (p) => counters.forEach((c) => { c.textContent = fmt(c, p) })
      const prep = (p) => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }) }

      if (mode === 'still' || prefersReducedMotion()) {
        gsap.set(q('.sketch-layer'), { opacity: 0 })
        gsap.set(q('.ship-layer'), { opacity: 1 })
        setCount(1); setStage(2)
        return
      }

      sk.forEach(prep); draws.forEach(prep)
      gsap.set(sk, { opacity: 0 })
      setCount(0); setStage(0)
      gsap.set(q('.wire-layer'), { opacity: 0 })
      gsap.set(q('.ship-layer'), { opacity: 0 })

      const n = { p: 0 }
      const tl = gsap.timeline({ paused: true })
      tl.to(sk, { strokeDashoffset: 0, opacity: 1, ease: 'none', duration: 0.22, stagger: 0.85 / sk.length })
        .addLabel('wire', '+=0.05')
        .to(q('.wire-layer'), { opacity: 1, duration: 0.25 }, 'wire')
        .to(q('.sketch-layer'), { opacity: 0.3, duration: 0.25 }, 'wire')
        .addLabel('ship', '+=0.15')
        .set(q('.ship-layer'), { opacity: 1 }, 'ship')
        .to(q('.wire-layer'), { opacity: 0, duration: 0.2 }, 'ship')
        .to(q('.sketch-layer'), { opacity: 0, duration: 0.2 }, 'ship')
        .fromTo(blks,
          { x: () => gsap.utils.random(-240, 240), y: () => gsap.utils.random(-170, 170), rotation: () => gsap.utils.random(-22, 22), opacity: 0, transformOrigin: '50% 50%' },
          { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.5)', stagger: 0.05 }, 'ship')
        .to(n, { p: 1, duration: 0.4, ease: 'power1.out', onUpdate: () => setCount(n.p) }, 'ship+=0.25')
      if (draws.length) tl.to(draws, { strokeDashoffset: 0, duration: 0.4, ease: 'power1.inOut' }, 'ship+=0.25')

      const tWire = tl.labels.wire / tl.duration()
      const tShip = tl.labels.ship / tl.duration()
      tl.eventCallback('onUpdate', () => {
        const p = tl.progress()
        setStage(p < tWire ? 0 : p < tShip ? 1 : 2)
      })

      if (mode === 'scrub') { tl.progress(at); onTimeline?.(tl); return }

      const mm = gsap.matchMedia()
      // Desktop: pin and let the scroll draw it.
      mm.add('(min-width: 900px)', () => {
        ScrollTrigger.create({ trigger: root.current, start: 'top top', end: '+=1700', pin: true, scrub: 0.6, animation: tl })
      })
      // Phones: no pinning — play it once when the board comes into view.
      mm.add('(max-width: 899px)', () => {
        ScrollTrigger.create({ trigger: q('.board')[0], start: 'top 75%', once: true, onEnter: () => tl.duration(2.6).play() })
      })
    }, root)
    return () => { if (mode === 'scrub') onTimeline?.(null); ctx.revert() }
  }, [mode]) // eslint-disable-line react-hooks/exhaustive-deps -- `at` only seeds the first frame

  const { proof } = build
  return (
    <section className="build" ref={root} aria-labelledby={copy || mode === 'still' ? undefined : `build-${build.key}`}>
      <aside className="build__aside">
        <div className="build__head">
          <span className="build__num">{build.n}</span>
          <Typed text={build.command} className="mono build__cmd" />
        </div>
        <h3 className="build__title" id={copy || mode === 'still' ? undefined : `build-${build.key}`}>{build.title}</h3>
        <ol className="stages mono">
          {STAGES.map((s, i) => (
            <li key={s} className={`stage${i === 2 ? ' stage--ship' : ''}`}><span>{s}</span><span>{build.stages[i]}</span></li>
          ))}
        </ol>
        <p className="build__body">{build.body}</p>
        <dl className="build__meta mono">
          <dt>Stack</dt><dd>{build.stack}</dd>
          <dt>Time</dt><dd>{build.time}</dd>
        </dl>
        <p className="proof mono">
          Proof → {proof.to ? <Go to={proof.to}>{proof.label}</Go> : <b>{proof.label}</b>} · {proof.note}
        </p>
      </aside>
      <div className="build__canvas" data-cursor="scroll">
        <svg className="board" viewBox="0 0 800 520" role="img" aria-label={`${build.title}: sketched by hand, wireframed, then shipped`}>
          <g className="wire-layer">{wire.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx="5" />)}</g>
          <g className="ship-layer"><Ship /></g>
          <g className="sketch-layer">{paths.map((d, i) => <path key={i} className="sk" d={d} />)}</g>
        </svg>
      </div>
    </section>
  )
}
