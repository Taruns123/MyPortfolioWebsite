import { useLayoutEffect } from 'react'
import { gsap, prefersReducedMotion } from './motion.jsx'

/**
 * Sections marked .fold-away fold back along their bottom edge as they
 * leave the screen, like a sheet being folded over, revealing the section
 * underneath. A shade deepens on the folding part (--fold, 0 → 1).
 *
 * Desktop: real 3D (rotateX around the crease). Phones: a lighter 2D
 * version (squash + shade) so scrolling stays smooth. Reduced motion: none.
 */
export function useFolds() {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    const sections = gsap.utils.toArray('.fold-away')

    mm.add('(min-width: 900px)', () => {
      sections.forEach((el) => {
        gsap.fromTo(el,
          { rotationX: 0, '--fold': 0 },
          {
            rotationX: 62, '--fold': 1, ease: 'power1.in',
            transformOrigin: '50% 100%', transformPerspective: 1400,
            scrollTrigger: { trigger: el, start: 'bottom 75%', end: 'bottom top', scrub: 0.4 },
          })
      })
    })

    mm.add('(max-width: 899px)', () => {
      sections.forEach((el) => {
        gsap.fromTo(el,
          { scaleY: 1, '--fold': 0 },
          {
            scaleY: 0.86, '--fold': 0.8, ease: 'power1.in', transformOrigin: '50% 100%',
            scrollTrigger: { trigger: el, start: 'bottom 60%', end: 'bottom top', scrub: 0.3 },
          })
      })
    })

    return () => mm.revert()
  }, [])
}
