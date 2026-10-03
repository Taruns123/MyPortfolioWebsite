/**
 * Hand-drawn SVG path helpers. Seeded, so a sketch looks wobbly but is
 * identical on every visit (and between server/client if we ever prerender).
 */

export function makeRough(seed = 7) {
  let s = seed
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647
  const j = (n) => (rnd() - 0.5) * n

  const line = (x1, y1, x2, y2, w = 3) => {
    const mx = (x1 + x2) / 2 + j(w * 2)
    const my = (y1 + y2) / 2 + j(w * 2)
    return `M${(x1 + j(w)).toFixed(1)} ${(y1 + j(w)).toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${(x2 + j(w)).toFixed(1)} ${(y2 + j(w)).toFixed(1)}`
  }

  const rect = (x, y, w, h, wob = 3) => [
    line(x, y, x + w, y, wob),
    line(x + w, y, x + w, y + h, wob),
    line(x + w, y + h, x, y + h, wob),
    line(x, y + h, x, y, wob),
  ]

  const poly = (pts, wob = 5) =>
    'M' + pts.map(([x, y]) => `${(x + j(wob)).toFixed(1)} ${(y + j(wob)).toFixed(1)}`).join(' L')

  // A slightly-unclosed circle, the way people actually draw them.
  const circle = (cx, cy, r) => {
    const n = 10
    const pts = []
    for (let i = 0; i <= n + 1; i++) {
      const a = (i / n) * Math.PI * 2 - 0.4
      const rr = r + j(r * 0.18)
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr])
    }
    return 'M' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L')
  }

  // Short wavy "text" scribble standing in for a line of copy.
  const scribble = (x, y, w) => {
    let d = `M${x} ${y}`
    for (let cx = x; cx < x + w; cx += 14) {
      d += ` q7 ${(-5 + j(3)).toFixed(1)} 14 0`
    }
    return d
  }

  return { line, rect, poly, circle, scribble, j }
}
