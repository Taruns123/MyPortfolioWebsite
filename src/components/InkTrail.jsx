import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion.jsx'

/** A short pen stroke that follows the cursor and fades. Mouse/trackpad only. */
export default function InkTrail() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const c = ref.current
    const x = c.getContext('2d')
    let pts = []
    let raf
    const LIFE = 450

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      c.width = innerWidth * dpr
      c.height = innerHeight * dpr
      x.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const move = (e) => {
      if (e.buttons && e.target.closest?.('.napkin-pad__svg')) return // the napkin has its own ink
      pts.push({ x: e.clientX, y: e.clientY, t: performance.now() })
    }
    const draw = () => {
      const now = performance.now()
      pts = pts.filter((p) => now - p.t < LIFE)
      x.clearRect(0, 0, innerWidth, innerHeight)
      x.lineCap = 'round'
      for (let i = 1; i < pts.length; i++) {
        const a = 1 - (now - pts[i].t) / LIFE
        x.strokeStyle = `rgba(18,18,18,${a * 0.85})`
        x.lineWidth = 2.4 * a
        x.beginPath()
        x.moveTo(pts[i - 1].x, pts[i - 1].y)
        x.lineTo(pts[i].x, pts[i].y)
        x.stroke()
      }
      raf = requestAnimationFrame(draw)
    }

    size()
    addEventListener('resize', size)
    addEventListener('pointermove', move)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', size)
      removeEventListener('pointermove', move)
    }
  }, [])

  return <canvas ref={ref} className="ink" aria-hidden="true" />
}
