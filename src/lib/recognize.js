/**
 * Turns one hand-drawn stroke (array of [x, y] in napkin units) into a UI
 * component guess. Deliberately simple geometry, no ML: closed vs open,
 * aspect ratio, roundness, and how often the line changes direction.
 */

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1])

export const TAGS = {
  card: '<Card/>',
  image: '<Image/>',
  button: '<Button/>',
  input: '<Input/>',
  avatar: '<Avatar/>',
  heading: '<Heading/>',
  text: '<Text/>',
  chart: '<LineChart/>',
  sidebar: '<Sidebar/>',
  divider: '<Divider/>',
}

export function classify(pts) {
  if (!pts || pts.length < 4) return null
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, len = 0
  pts.forEach((p, i) => {
    minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0])
    minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1])
    if (i) len += dist(p, pts[i - 1])
  })
  const w = maxX - minX
  const h = maxY - minY
  const diag = Math.hypot(w, h)
  if (len < 24 || diag < 16) return null // a dot or a twitch

  const base = { x: minX, y: minY, w, h, pts }
  const ar = w / Math.max(h, 1)
  const closed = dist(pts[0], pts[pts.length - 1]) < Math.max(34, diag * 0.3) && len > diag * 1.7

  if (closed) {
    const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length
    const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length
    const ds = pts.map((p) => Math.hypot(p[0] - cx, p[1] - cy))
    const mean = ds.reduce((s, d) => s + d, 0) / ds.length
    const sd = Math.sqrt(ds.reduce((s, d) => s + (d - mean) ** 2, 0) / ds.length)
    // Boxes reach into their bounding-box corners; circles never do. Roundness
    // alone can't tell a square from a circle.
    const corners = [[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]]
    const reached = corners.filter((c) => Math.min(...pts.map((p) => dist(p, c))) < diag * 0.09).length
    if (reached < 3 && sd / mean < 0.25 && ar > 0.6 && ar < 1.65) return { ...base, type: 'avatar' }
    if (h < 85 && ar > 2.3) return { ...base, type: w < 240 ? 'button' : 'input' }
    if (ar < 0.5 && h > 170) return { ...base, type: 'sidebar' }
    if (w * h > 300 * 160 && ar > 1.25) return { ...base, type: 'image' }
    return { ...base, type: 'card' }
  }

  // Count direction changes in y (ignoring hand tremor under 14 units).
  let turns = 0, dir = 0, ext = pts[0][1]
  for (const [, y] of pts) {
    if (!dir) { if (Math.abs(y - ext) > 14) { dir = Math.sign(y - ext); ext = y } continue }
    if ((dir > 0 && y > ext) || (dir < 0 && y < ext)) ext = y
    else if (Math.abs(y - ext) > 14) { turns++; dir = -dir; ext = y }
  }

  if (turns >= 2 && w > 110 && h > 30) return { ...base, type: 'chart' }
  if (h < w * 0.3 || h < 26) return { ...base, type: 'text' }
  if (w < h * 0.3) return { ...base, type: 'divider' }
  if (turns >= 2) return { ...base, type: 'chart' }
  return { ...base, type: len < diag * 1.2 ? 'divider' : 'card' }
}

/** The topmost wide text line becomes the heading; the rest stay body text. */
export function promoteHeading(shapes) {
  const texts = shapes.filter((s) => s.type === 'text' && s.w > 120)
  if (!texts.length) return shapes
  const top = texts.reduce((a, b) => (b.y < a.y ? b : a))
  return shapes.map((s) => (s === top ? { ...s, type: 'heading' } : s))
}

/** Smooth path through raw pointer samples (midpoint quadratic curves). */
export function smoothPath(pts) {
  if (!pts.length) return ''
  if (pts.length < 3) return `M${pts.map((p) => p.join(' ')).join(' L')}`
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2
    const my = (pts[i][1] + pts[i + 1][1]) / 2
    d += ` Q${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`
  }
  const last = pts[pts.length - 1]
  return `${d} L${last[0].toFixed(1)} ${last[1].toFixed(1)}`
}

/** Resample a stroke into n points ordered left → right (for charts). */
export function chartPoints(pts, n = 10) {
  const sorted = [...pts].sort((a, b) => a[0] - b[0])
  const out = []
  for (let i = 0; i < n; i++) out.push(sorted[Math.round((i / (n - 1)) * (sorted.length - 1))])
  return out
}
