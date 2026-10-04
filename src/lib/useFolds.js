import { useLayoutEffect } from 'react'
import { gsap, prefersReducedMotion } from './motion.jsx'

/**
 * Sections marked .fold-away get folded closed as you scroll past them:
 * the bottom of the napkin is folded up over the content, crease first.
 *
 * What sells it as paper (rather than a panel sliding in):
 *  - the flap grows from the crease, showing the paper's blank back
 *  - a rounded, doubled edge at the crease where the sheet bends back
 *  - the free top edge lifts toward you mid-fold, then settles flat
 *  - a soft shadow cast from that edge onto the content still showing
 * The content itself never moves, so it stays sharp until it's covered.
 */
export function useFolds() {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const made = []
    const tweens = []

    gsap.utils.toArray('.fold-away').forEach((section) => {
      const flap = document.createElement('div')
      flap.className = 'fold-flap'
      flap.setAttribute('aria-hidden', 'true')
      section.appendChild(flap)
      made.push(flap)

      const state = { p: 0 }
      const render = () => {
        const p = state.p
        const full = Math.min(section.offsetHeight, window.innerHeight * 0.95)
        const lift = Math.sin(Math.PI * p) // 0 → 1 → 0: the edge rises mid-fold, then lies flat
        flap.style.height = `${(full * p).toFixed(1)}px`
        flap.style.transform = `perspective(1400px) rotateX(${(lift * 22).toFixed(2)}deg)`
        flap.style.setProperty('--edge', lift.toFixed(3))
        section.style.setProperty('--fold', (p * 0.6).toFixed(3))
      }

      render()
      tweens.push(gsap.to(state, {
        p: 1, ease: 'power2.in', onUpdate: render,
        scrollTrigger: { trigger: section, start: 'bottom 72%', end: 'bottom 6%', scrub: 0.5, onRefresh: render },
      }))
    })

    return () => {
      tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill() })
      made.forEach((f) => { f.parentNode?.style.removeProperty('--fold'); f.remove() })
    }
  }, [])
}
