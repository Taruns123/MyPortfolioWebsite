import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { gsap, ScrollTrigger, useScroll } from '../lib/motion.jsx'
import Hero from '../sections/Hero.jsx'
import BuildSection from './BuildSection.jsx'
import { builds } from '../content/builds.js'
import Process from '../sections/Process.jsx'
import Work from '../sections/Work.jsx'
import About from '../sections/About.jsx'
import Contact, { EnvelopeFront } from '../sections/Contact.jsx'

/**
 * The homepage as a napkin on a desk. It starts fully open with the hero on
 * it. Each fold turns half of the napkin over toward you; the back of that
 * flap carries the next section. The paper halves every fold, so the camera
 * zooms back in on every second fold and the faces alternate wide / tall:
 *
 *   hero → SaaS → store → AI → tools → process → work → about → packet
 *
 * Each build face gets an extra scroll step before it folds away, which
 * draws it: sketch → wireframe → shipped. The folded packet then drops into
 * an open envelope, the flap closes, the envelope turns to its address side,
 * and the last step flips it to the letter (the contact form).
 */

const FACES = [
  { hashes: ['#top'], render: (p) => <Hero still={p.still} /> },
  ...builds.map((b, i) => ({
    hashes: i === 0 ? ['#builds'] : [],
    draws: true,
    render: (p) => <BuildSection build={b} mode="scrub" at={p.at} onTimeline={p.onTimeline} copy={p.still} />,
  })),
  { hashes: ['#process'], render: (p) => <Process still={p.still} /> },
  { hashes: ['#work'], render: (p) => <Work still={p.still} /> },
  { hashes: ['#about'], render: (p) => <About still={p.still} /> },
]
// one fold per face: which way it folds, and how far the camera zooms in after
const FOLDS = FACES.map((_, i) => (i % 2 === 0 ? { axis: 'v', zoom: 1 } : { axis: 'h', zoom: i === FACES.length - 1 ? 1 : 2 }))
const PACKET = FOLDS.length // the stage after the last fold: the folded packet
// the scroll timeline, one snap point per segment
const SEGS = [
  ...FACES.flatMap((f, k) => (f.draws ? [{ type: 'draw', k }, { type: 'fold', k }] : [{ type: 'fold', k }])),
  { type: 'insert' },
  { type: 'flip' },
]
const STEPS = SEGS.length

const clamp = (v) => Math.min(1, Math.max(0, v))
const smooth = (t) => t * t * (3 - 2 * t)
const lerp = (a, b, t) => a + (b - a) * t

/** Size of the napkin's top face at each stage, in screen px. */
function sizesFor(W, H) {
  const s = [[W, H]]
  FOLDS.forEach((f, i) => {
    const [w, h] = s[i]
    s.push(f.axis === 'v' ? [(w / 2) * f.zoom, h * f.zoom] : [w * f.zoom, (h / 2) * f.zoom])
  })
  return s
}

const Blank = () => <div className="fold__blank" />
const Face = ({ i, at }) => (i < FACES.length ? FACES[i].render({ still: true, at }) : <Blank />)
const orient = ([w, h]) => (w > h ? 'l' : 'p')

function measureDesk() {
  const rail = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--rail-h')) || 42
  const W = Math.round(Math.min(1320, innerWidth - 64))
  const H = Math.round(innerHeight - rail - 48)
  return { W, H, rail }
}

export default function FoldStage() {
  const scroll = useScroll()
  const root = useRef(null)
  const desk = useRef(null)
  const nap = useRef(null)
  const live = useRef(null)
  const rig = useRef(null)
  const flap = useRef(null)
  const shadeFront = useRef(null)
  const shadeBack = useRef(null)
  const land = useRef(null)
  const env3d = useRef(null)
  const packet = useRef(null)
  const envFlap = useRef(null)
  const letter = useRef(null)
  const envBox = useRef({ left: 0, top: 0, w: 800, h: 600 })

  const [dims, setDims] = useState(measureDesk)
  const [idx, setIdx] = useState(0)
  const [flip, setFlip] = useState(false)
  const liveTl = useRef(null) // the live build face's sketch → ship timeline
  const sizes = sizesFor(dims.W, dims.H)
  const sizesRef = useRef(sizes)
  sizesRef.current = sizes

  useEffect(() => {
    const onResize = () => setDims(measureDesk())
    addEventListener('resize', onResize)
    return () => removeEventListener('resize', onResize)
  }, [])

  useLayoutEffect(() => {
    let cur = { idx: 0, flip: false }
    // flushSync: the napkin's size changes with the stage, and it must not lag the transforms by a frame
    const setI = (k) => { if (k !== cur.idx) { cur.idx = k; flushSync(() => setIdx(k)) } }
    const setF = (f) => { if (f !== cur.flip) { cur.flip = f; setFlip(f) } }
    const show = (el, on) => { if (el) el.style.visibility = on ? 'visible' : 'hidden' }

    // Where the contact envelope sits, so the 3D envelope can land exactly on it.
    const measure = () => {
      const card = letter.current?.querySelector('.envelope__card')
      if (!card || !desk.current) return
      const d = desk.current.getBoundingClientRect()
      const r = card.getBoundingClientRect()
      envBox.current = { left: r.left - d.left, top: r.top - d.top, w: r.width, h: r.height }
      Object.assign(env3d.current.style, { left: `${envBox.current.left}px`, top: `${envBox.current.top}px`, width: `${r.width}px`, height: `${r.height}px` })
    }

    // One fold of the current stage at eased progress e (0 flat → 1 landed).
    const fold = (k, e) => {
      if (!flap.current) return
      const f = FOLDS[k]
      flap.current.style.transform = f.axis === 'v' ? `rotateY(${(-180 * e).toFixed(2)}deg)` : `rotateX(${(180 * e).toFixed(2)}deg)`
      // the lifting half turns away from the light; its back catches it again as it lands
      shadeFront.current.style.opacity = (Math.min(1, e * 2) * 0.5).toFixed(3)
      shadeBack.current.style.opacity = (Math.max(0, 1 - (e - 0.5) * 2) * 0.5).toFixed(3)
      land.current.style.opacity = (Math.sin(Math.PI * Math.min(1, e * 1.08)) * 0.45).toFixed(3)
    }

    const render = (progress) => {
      const pos = Math.min(progress * STEPS, STEPS - 1e-4)
      const j = Math.floor(pos)
      const t = pos - j
      const seg = SEGS[j]
      const S = sizesRef.current

      if (seg.type === 'draw') {
        // a build face at rest; the scroll draws it
        setI(seg.k)
        show(live.current, true)
        show(rig.current, false)
        nap.current.classList.remove('is-folding')
        gsap.set(nap.current, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 1, autoAlpha: 1 })
        liveTl.current?.progress(t)
        show(env3d.current, false)
        show(letter.current, false)
        setF(false)
      } else if (seg.type === 'fold') {
        // fold k: face k → face k+1
        const k = seg.k
        const folding = t > 0.002
        setI(k)
        if (FACES[k].draws) liveTl.current?.progress(1)
        show(live.current, !folding)
        show(rig.current, folding)
        nap.current.classList.toggle('is-folding', folding)
        fold(k, folding ? smooth(t) : 0)
        // the camera follows the half that stays, and zooms in when the napkin gets small
        const { axis, zoom } = FOLDS[k]
        const [w, h] = S[k]
        const c = smooth(clamp((t - 0.12) / 0.88))
        gsap.set(nap.current, {
          xPercent: -50, yPercent: -50, autoAlpha: 1,
          x: axis === 'v' ? (w / 4) * zoom * c : 0,
          y: axis === 'h' ? (h / 4) * zoom * c : 0,
          scale: 1 + (zoom - 1) * c,
        })
        show(env3d.current, false)
        show(letter.current, false)
        setF(false)
      } else if (seg.type === 'insert') {
        // the folded packet drops into an open envelope, the flap closes, it turns over
        setI(PACKET)
        const moving = t > 0.002
        nap.current.classList.remove('is-folding')
        gsap.set(nap.current, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 1, autoAlpha: moving ? 0 : 1 })
        show(live.current, true)
        show(env3d.current, moving)
        show(letter.current, false)
        setF(false)

        const E = envBox.current
        const vw = desk.current.clientWidth
        const vh = desk.current.clientHeight
        const [pw, ph] = S[PACKET]
        const a = smooth(clamp(t / 0.3)) // envelope comes up, packet lines up over it
        const b = smooth(clamp((t - 0.3) / 0.25)) // packet slides into the pocket
        const c = smooth(clamp((t - 0.55) / 0.2)) // flap closes
        const d = smooth(clamp((t - 0.75) / 0.25)) // envelope rises and turns over
        const hover = vh * 0.42
        const dy = d > 0 ? hover * (1 - d) : lerp(vh - E.top + 60, hover, a)
        const sF = Math.min(1, (0.8 * E.w) / pw)
        const sc = lerp(1, sF, a)
        const cx = vw / 2
        const cy = dims.rail + (vh - dims.rail) / 2
        const hoverCy = E.top + hover + 0.3 * E.h - (ph * sF) / 2
        const inCy = E.top + hover + 0.95 * E.h - (ph * sF) / 2
        const pcx = lerp(cx, E.left + E.w / 2, a)
        const pcy = b > 0 ? lerp(hoverCy, inCy, b) : lerp(cy, hoverCy, a)
        gsap.set(env3d.current, { y: dy, rotationY: -180 * d, transformPerspective: 2400 })
        gsap.set(packet.current, {
          x: pcx - E.left - pw / 2, y: pcy - (E.top + dy) - ph / 2, scale: sc,
          z: 1, autoAlpha: t < 0.75 ? 1 : 0,
        })
        gsap.set(envFlap.current, { z: c > 0 ? 3 : -1, rotationX: 180 * (1 - c) })
      } else {
        // the envelope, flipping to the letter
        setI(PACKET)
        gsap.set(nap.current, { autoAlpha: 0 })
        show(env3d.current, false)
        show(letter.current, true)
        setF(t > 0.5)
      }
    }

    const st = ScrollTrigger.create({
      trigger: root.current,
      start: 'top top',
      end: `+=${STEPS * 100}%`,
      pin: true,
      scrub: 0.6,
      snap: { snapTo: 1 / STEPS, duration: { min: 0.25, max: 0.8 }, delay: 0.05, ease: 'power1.inOut' },
      onRefresh: (self) => { measure(); render(self.progress) },
      onUpdate: (self) => render(self.progress),
    })
    measure()
    render(st.progress)

    // Nav links and deep links land on the right fold.
    const steps = { '#contact': STEPS }
    FACES.forEach((f, i) => f.hashes.forEach((h) => { steps[h] = SEGS.findIndex((sg) => sg.k === i) }))
    window.__foldGoTo = (hash) => {
      if (!(hash in steps)) return false
      const y = st.start + (steps[hash] / STEPS) * (st.end - st.start)
      scroll.scrollTo(y + 1, { offset: 0, duration: 1.6 })
      return true
    }
    if (import.meta.env.DEV) window.__foldSeek = (p) => { st.disable(false); render(p) } // dev: freeze any frame
    return () => { delete window.__foldGoTo; delete window.__foldSeek; st.kill() }
  }, [dims, scroll])

  const n = idx
  const [w, h] = sizes[n]
  const f = FOLDS[Math.min(n, FOLDS.length - 1)]
  const next = sizes[Math.min(n + 1, PACKET)]
  const box = (i) => ({ width: sizes[i][0], height: sizes[i][1] })
  const onTimeline = (tl) => { liveTl.current = tl }
  // each fold leaves one more layer of napkin under the top face (the first few show)
  const stack = Array.from({ length: Math.min(n, 4) }, (_, i) => `drop-shadow(${i % 2 ? 1 : 2}px ${i % 2 ? 2 : 1}px 0 ${i % 2 ? '#d8d0bc' : '#e6dfcd'})`)

  return (
    <section className="fold" ref={root} aria-label="Tarun Shetty, full-stack developer">
      <div className="fold__desk" ref={desk}>
        <div className={`nap nap--${f.axis}`} ref={nap} style={{ width: w, height: h, '--stack': stack.join(' ') }}>
          <div className="nap__live" ref={live} data-o={orient(sizes[n])}>
            <Fragment key={n}>{n < FACES.length ? FACES[n].render({ still: false, at: 0, onTimeline }) : <Blank />}</Fragment>
          </div>
          {n < PACKET && (
            <div className="nap__rig" ref={rig} aria-hidden="true">
              <i className="nap__keepshadow" />
              <div className="nap__keep"><div className="nap__face" style={box(n)} data-o={orient(sizes[n])}><Face key={n} i={n} at={1} /></div><i className="nap__land" ref={land} /></div>
              <div className="nap__flap" ref={flap}>
                <div className="nap__side nap__side--front">
                  <div className="nap__face nap__face--shift" style={box(n)} data-o={orient(sizes[n])}><Face key={n} i={n} at={1} /></div>
                  <i className="nap__shade" ref={shadeFront} />
                </div>
                <div className="nap__side nap__side--back">
                  <div className="nap__face" style={{ width: next[0], height: next[1], transform: `scale(${1 / f.zoom})` }} data-o={orient(next)}><Face key={n + 1} i={n + 1} at={0} /></div>
                  <i className="nap__shade" ref={shadeBack} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* the open envelope the packet goes into; its front matches the contact envelope exactly */}
        <div className="env3d" ref={env3d} aria-hidden="true">
          <div className="env3d__inside" />
          <div className="env3d__packet" ref={packet} style={box(PACKET)}><Blank /></div>
          <div className="env3d__pocket"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 0 L50 52 L100 0 M0 100 L38 46 M100 100 L62 46" /></svg></div>
          <div className="env3d__flap" ref={envFlap}>
            <div className="env3d__flap-out"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 0 L50 100 L100 0" /></svg></div>
            <div className="env3d__flap-in" />
          </div>
          <div className="env3d__front"><EnvelopeFront decorative /></div>
        </div>

        <div className="fold__envelope" ref={letter}>
          <Contact stage flip={flip} />
        </div>
      </div>
    </section>
  )
}

/** Desktop with room and motion allowed → the folding napkin. Otherwise the normal page. */
export function useFoldMode() {
  const query = '(min-width: 900px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const fn = () => setOn(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return on
}
