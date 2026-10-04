import { useLayoutEffect } from 'react'
import { SplitText } from 'gsap/SplitText'
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion.jsx'

gsap.registerPlugin(SplitText)

/**
 * Page-wide scroll moments that aren't tied to one section:
 *  - section headlines rise in word by word from behind a mask
 *  - ==highlighted== phrases get a highlighter swipe when they arrive
 */
export function useHomeMotion() {
  useLayoutEffect(() => {
    const marks = gsap.utils.toArray('.hl')
    if (prefersReducedMotion()) { marks.forEach((m) => m.classList.add('is-on')); return }

    const splits = []
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.section-head h2, .about__text h2, .contact__head h2').forEach((h) => {
        const split = SplitText.create(h, { type: 'words', mask: 'words' })
        splits.push(split)
        gsap.from(split.words, {
          yPercent: 115, rotation: 4, duration: 0.9, ease: 'expo.out', stagger: 0.045,
          scrollTrigger: { trigger: h, start: 'top 85%' },
        })
      })
      marks.forEach((m) => ScrollTrigger.create({ trigger: m, start: 'top 80%', once: true, onEnter: () => m.classList.add('is-on') }))
    })
    return () => { ctx.revert(); splits.forEach((s) => s.revert()) }
  }, [])
}
