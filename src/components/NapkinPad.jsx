import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { classify, promoteHeading, smoothPath, chartPoints, TAGS } from '../lib/recognize.js'
import { makeRough } from '../lib/sketch.js'
import { gsap, prefersReducedMotion } from '../lib/motion.jsx'

const V = 600 // napkin is a 600×600 coordinate space at any screen size
const MAX_SHAPES = 14
const INK = '#121212', PAPER = '#f1ede2', BLUE = '#2c3bff', MARKER = '#ffe14d', GREY = '#cfc9ba'

/* ---------------------------------------------------------------- demo sketch */
function demoStrokes() {
  const r = makeRough(99)
  const jit = (n) => r.j(n)
  const line = (x1, y1, x2, y2, step = 9, wob = 1.6) => {
    const n = Math.max(2, Math.round(Math.hypot(x2 - x1, y2 - y1) / step))
    return Array.from({ length: n + 1 }, (_, i) => [x1 + ((x2 - x1) * i) / n + jit(wob), y1 + ((y2 - y1) * i) / n + jit(wob)])
  }
  const box = (x, y, w, h) => [...line(x, y, x + w, y), ...line(x + w, y, x + w, y + h), ...line(x + w, y + h, x, y + h), ...line(x, y + h, x + 4, y - 3)]
  const circle = (cx, cy, rad) => Array.from({ length: 30 }, (_, i) => {
    const a = (i / 27) * Math.PI * 2 - 1.2
    return [cx + Math.cos(a) * rad + jit(2), cy + Math.sin(a) * rad + jit(2)]
  })
  const zig = [[330, 520], [372, 470], [410, 492], [452, 430], [492, 452], [540, 392]].flatMap((p, i, a) => (i ? line(a[i - 1][0], a[i - 1][1], p[0], p[1], 8, 1) : []))
  return [
    line(64, 86, 372, 82, 10, 3),     // heading
    circle(510, 92, 40),              // avatar
    box(64, 150, 476, 170),           // image
    line(64, 370, 280, 368, 10, 2.5), // text
    box(64, 420, 190, 56),            // button
    zig,                              // chart
  ]
}

/* ---------------------------------------------------------------- shipped renderers */
const COPY = {
  heading: ['Your idea.', 'Ship it this month.', 'Your big idea, finally live.', 'The thing you sketched, now real.'],
  text: ['Live now.', 'Made for your first 100 users.', 'Built in weeks, not quarters, by one developer.'],
}
const pick = (list, w, size) => list.reduce((best, s) => (Math.abs(s.length * size * 0.56 - w) < Math.abs(best.length * size * 0.56 - w) ? s : best))

function ShipShape({ s }) {
  const { x, y, w, h } = s
  const cx = x + w / 2, cy = y + h / 2
  switch (s.type) {
    case 'heading': {
      const size = Math.max(22, Math.min(48, w / 9))
      const str = pick(COPY.heading, w, size)
      return <text x={x} y={cy + size * 0.35} fontSize={size} fontWeight="900" fill={INK} textLength={w} lengthAdjust="spacingAndGlyphs">{str}</text>
    }
    case 'text': {
      const size = 15
      return <text x={x} y={cy + 5} fontSize={size} fill="#444" textLength={w} lengthAdjust="spacingAndGlyphs">{pick(COPY.text, w, size)}</text>
    }
    case 'button': {
      const bh = Math.max(36, Math.min(h, 64)), by = cy - bh / 2
      return (<>
        <rect x={x + 5} y={by + 5} width={w} height={bh} fill={INK} />
        <rect x={x} y={by} width={w} height={bh} fill={BLUE} stroke={INK} strokeWidth="2.5" />
        <text x={cx} y={by + bh / 2 + 6} fontSize={Math.min(17, bh * 0.38)} fontWeight="800" fill="#fff" textAnchor="middle">{w > 150 ? 'Get started →' : 'Go →'}</text>
      </>)
    }
    case 'input': {
      const ih = Math.max(36, Math.min(h, 60)), iy = cy - ih / 2
      return (<>
        <rect x={x} y={iy} width={w} height={ih} fill="#fff" stroke={INK} strokeWidth="2.5" />
        <text x={x + 14} y={iy + ih / 2 + 5} fontSize="15" fill="#888">you@company.com</text>
        <rect x={x + w - Math.min(110, w * 0.35) - 6} y={iy + 6} width={Math.min(110, w * 0.35)} height={ih - 12} fill={INK} />
        <text x={x + w - Math.min(110, w * 0.35) / 2 - 6} y={iy + ih / 2 + 5} fontSize="13" fontWeight="800" fill={MARKER} textAnchor="middle">Join</text>
      </>)
    }
    case 'avatar': {
      const rad = Math.min(w, h) / 2
      return (<>
        <circle cx={cx} cy={cy} r={rad} fill={MARKER} stroke={INK} strokeWidth="2.5" />
        <text x={cx} y={cy + rad * 0.19} fontSize={rad * 0.52} fontWeight="900" fill={INK} textAnchor="middle">YOU</text>
      </>)
    }
    case 'image': return (<>
      <rect x={x + 7} y={y + 7} width={w} height={h} fill={INK} />
      <rect x={x} y={y} width={w} height={h} fill={BLUE} stroke={INK} strokeWidth="2.5" />
      <circle cx={x + w * 0.78} cy={y + h * 0.3} r={Math.min(w, h) * 0.12} fill={MARKER} />
      <path d={`M${x} ${y + h} L${x + w * 0.32} ${y + h * 0.45} L${x + w * 0.52} ${y + h * 0.72} L${x + w * 0.68} ${y + h * 0.55} L${x + w} ${y + h} Z`} fill={PAPER} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
    </>)
    case 'chart': {
      const pad = 12
      const pts = chartPoints(s.pts)
      const d = `M${pts.map((p) => p.join(' ')).join(' L')}`
      return (<>
        <rect x={x - pad} y={y - pad - 18} width={w + pad * 2} height={h + pad * 2 + 18} fill="#fff" stroke={INK} strokeWidth="2.5" />
        <text x={x - pad + 10} y={y - pad - 3} fontSize="11" fill="#666" fontFamily="IBM Plex Mono, monospace">REVENUE ↗</text>
        <path d={`${d} L${pts.at(-1)[0]} ${y + h + pad} L${pts[0][0]} ${y + h + pad} Z`} fill={BLUE} opacity=".14" />
        <path d={d} fill="none" stroke={BLUE} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={pts.at(-1)[0]} cy={pts.at(-1)[1]} r="6" fill={BLUE} stroke="#fff" strokeWidth="2.5" />
      </>)
    }
    case 'sidebar': return (<>
      <rect x={x} y={y} width={w} height={h} fill={INK} />
      {['Home', 'Projects', 'Billing', 'Team'].slice(0, Math.max(1, Math.floor(h / 50))).map((t, i) => (
        <text key={t} x={x + 14} y={y + 34 + i * 34} fontSize="14" fontWeight={i ? 400 : 800} fill={i ? PAPER : MARKER}>{t}</text>
      ))}
    </>)
    case 'divider': return <line x1={s.pts[0][0]} y1={s.pts[0][1]} x2={s.pts.at(-1)[0]} y2={s.pts.at(-1)[1]} stroke={INK} strokeWidth="3" />
    default: return (<>
      <rect x={x + 6} y={y + 6} width={w} height={h} fill={INK} />
      <rect x={x} y={y} width={w} height={h} fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect x={x} y={y} width={w} height={Math.min(34, h * 0.3)} fill={MARKER} stroke={INK} strokeWidth="2.5" />
      {h > 70 && <rect x={x + 14} y={y + Math.min(34, h * 0.3) + 16} width={w * 0.6} height="8" fill={GREY} />}
      {h > 95 && <rect x={x + 14} y={y + Math.min(34, h * 0.3) + 32} width={w * 0.4} height="8" fill={GREY} />}
    </>)
  }
}

function WireShape({ s }) {
  const { x, y, w, h } = s
  let el
  if (s.type === 'avatar') el = <circle cx={x + w / 2} cy={y + h / 2} r={Math.min(w, h) / 2} />
  else if (s.type === 'divider') el = <rect x={x} y={y + h / 2 - 2} width={Math.max(w, 4)} height={Math.max(4, h)} />
  else if (s.type === 'heading' || s.type === 'text') el = <rect x={x} y={y + h / 2 - (s.type === 'heading' ? 12 : 6)} width={w} height={s.type === 'heading' ? 24 : 12} rx="3" />
  else el = <rect x={x} y={y} width={w} height={h} rx="5" />
  return (
    <g className="np-wire-item">
      {el}
      <text className="np-tag" x={x} y={Math.max(14, y - 8)}>{TAGS[s.type]}</text>
    </g>
  )
}

/* ---------------------------------------------------------------- the pad */
export default function NapkinPad({ still = false }) {
  const svg = useRef(null)
  const live = useRef(null)
  const current = useRef(null)
  const demoTimer = useRef(null)
  const demoRaf = useRef(null)
  const touched = useRef(false)
  const [strokes, setStrokes] = useState([]) // { d, shape }
  const [stage, setStage] = useState('draw') // draw | wire | ship
  const [status, setStatus] = useState('')
  const [demoDone, setDemoDone] = useState(false)
  const reduce = prefersReducedMotion()

  const toLocal = (e) => {
    const r = svg.current.getBoundingClientRect()
    return [((e.clientX - r.left) / r.width) * V, ((e.clientY - r.top) / r.height) * V]
  }

  const stopDemo = () => {
    clearTimeout(demoTimer.current)
    cancelAnimationFrame(demoRaf.current)
  }

  const reset = useCallback(() => {
    stopDemo()
    setStrokes([]); setStage('draw'); setStatus('')
  }, [])

  const addStroke = (pts) => {
    const shape = classify(pts)
    setStrokes((s) => (s.length >= MAX_SHAPES ? s : [...s, { d: smoothPath(pts), shape }]))
  }

  /* -- pointer drawing -- */
  const down = (e) => {
    touched.current = true
    stopDemo()
    if (stage !== 'draw') { setStrokes([]); setStage('draw'); setStatus('') }
    svg.current.setPointerCapture(e.pointerId)
    current.current = [toLocal(e)]
    live.current.setAttribute('d', '')
  }
  const move = (e) => {
    if (!current.current) return
    const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e]
    for (const ev of evs) current.current.push(toLocal(ev))
    live.current.setAttribute('d', smoothPath(current.current))
  }
  const up = () => {
    if (!current.current) return
    addStroke(current.current)
    current.current = null
    live.current.setAttribute('d', '')
  }

  /* -- build: sketch → wireframe (tagged) → shipped -- */
  const shapes = promoteHeading(strokes.map((s) => s.shape).filter(Boolean))
  const build = useCallback(() => {
    if (!shapes.length || stage !== 'draw') return
    stopDemo()
    setStage('wire')
    setStatus(`$ build --from-napkin  ·  ${shapes.length} component${shapes.length > 1 ? 's' : ''} found`)
    setTimeout(() => {
      setStage('ship')
      setStatus(`✓ shipped ${shapes.length} component${shapes.length > 1 ? 's' : ''}. Now imagine it with your idea.`)
    }, reduce ? 600 : 1500)
  }, [shapes.length, stage, reduce])

  /* -- "draw for me": animate a pen over the demo strokes, then build -- */
  const drawForMe = useCallback(() => {
    stopDemo()
    setStrokes([]); setStage('draw'); setStatus('drawing…')
    const all = demoStrokes()
    if (reduce) {
      setStrokes(all.map((pts) => ({ d: smoothPath(pts), shape: classify(pts) })))
      setStatus('')
      return
    }
    let si = 0, pi = 2
    const step = () => {
      if (!live.current) return // unmounted mid-demo
      const pts = all[si]
      pi += 3
      live.current.setAttribute('d', smoothPath(pts.slice(0, pi)))
      if (pi >= pts.length) {
        live.current.setAttribute('d', '')
        setStrokes((s) => [...s, { d: smoothPath(pts), shape: classify(pts) }])
        si += 1; pi = 2
        if (si >= all.length) { setStatus(''); demoTimer.current = setTimeout(() => setDemoDone(true), 450); return }
        demoTimer.current = setTimeout(() => { demoRaf.current = requestAnimationFrame(step) }, 160)
        return
      }
      demoRaf.current = requestAnimationFrame(step)
    }
    demoRaf.current = requestAnimationFrame(step)
  }, [reduce])

  // after the demo finishes drawing, build it (needs fresh `shapes`)
  useEffect(() => { if (demoDone) { setDemoDone(false); build() } }, [demoDone, build])

  // Nobody touched the napkin after a few seconds in view? Draw one.
  useEffect(() => {
    if (still) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !touched.current) {
        demoTimer.current = setTimeout(() => { if (!touched.current) drawForMe() }, 2600)
        io.disconnect()
      }
    }, { threshold: 0.6 })
    io.observe(svg.current)
    return () => { io.disconnect(); stopDemo() }
  }, [drawForMe, still])

  /* -- stage animations -- */
  useLayoutEffect(() => {
    if (reduce) return
    const ctx = gsap.context(() => {
      if (stage === 'wire') {
        gsap.to('.np-strokes', { opacity: 0.22, duration: 0.3 })
        gsap.from('.np-wire-item', { scale: 0.7, opacity: 0, transformOrigin: '50% 50%', duration: 0.45, ease: 'back.out(1.7)', stagger: 0.07 })
      }
      if (stage === 'ship') {
        gsap.to('.np-strokes', { opacity: 0, duration: 0.25 })
        gsap.from('.np-ship-item', {
          x: () => gsap.utils.random(-160, 160), y: () => gsap.utils.random(-120, 120), rotation: () => gsap.utils.random(-18, 18),
          opacity: 0, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(1.5)', stagger: 0.06,
        })
      }
      if (stage === 'draw') gsap.set('.np-strokes', { opacity: 1 })
    }, svg)
    return () => ctx.revert()
  }, [stage, reduce])

  const ordered = [...shapes].sort((a, b) => b.w * b.h - a.w * a.h) // big things behind small ones
  const ring = makeRough(5).circle(470, 470, 62)

  return (
    <div className="napkin-pad">
      <div className="napkin-pad__sheet">
        <svg
          ref={svg}
          className={`napkin-pad__svg is-${stage}`}
          viewBox={`0 0 ${V} ${V}`}
          role="img"
          aria-label="A paper napkin you can draw on. Boxes, lines, circles and zigzags turn into real interface components."
          data-cursor="draw"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        >
          <rect className="napkin-pad__emboss" x="18" y="18" width="564" height="564" rx="4" />
          <path className="napkin-pad__coffee" d={ring} />
          {!strokes.length && stage === 'draw' && (
            <g className="napkin-pad__hint" aria-hidden="true">
              <text x="300" y="282" textAnchor="middle">draw here</text>
              <text x="300" y="316" textAnchor="middle" className="napkin-pad__hint-sub">a box · a button · a circle · a zigzag chart</text>
            </g>
          )}
          {stage === 'ship' && <g className="np-ship">{ordered.map((s, i) => <g className="np-ship-item" key={i}><ShipShape s={s} /></g>)}</g>}
          {stage === 'wire' && <g className="np-wire">{ordered.map((s, i) => <WireShape key={i} s={s} />)}</g>}
          <g className="np-strokes">{strokes.map((s, i) => <path key={i} d={s.d} />)}</g>
          <path ref={live} className="np-live" />
        </svg>
      </div>
      <div className="napkin-pad__bar mono">
        <span className="napkin-pad__status" role="status">{status || (shapes.length ? `${shapes.length} shape${shapes.length > 1 ? 's' : ''} sketched` : 'your napkin')}</span>
        <span className="napkin-pad__actions">
          {stage === 'draw' && shapes.length > 0 && <button className="np-btn np-btn--go" onClick={build}>Build it →</button>}
          {stage !== 'draw' || strokes.length ? <button className="np-btn" data-magnetic onClick={reset}>Clear</button> : null}
          <button className="np-btn" data-magnetic onClick={drawForMe}>Draw for me</button>
        </span>
      </div>
    </div>
  )
}
