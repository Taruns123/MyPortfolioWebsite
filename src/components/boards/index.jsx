/**
 * Four boards on one 800×520 grid. Each exports:
 *   sketch(r) → array of hand-drawn path strings (r = makeRough helpers)
 *   wire      → grey wireframe rects [x, y, w, h]
 *   Ship      → the finished UI. Every top-level <g className="blk"> snaps
 *               into place in the shipped stage; [data-count] numbers count
 *               up; .draw paths draw themselves.
 */

const INK = '#121212'
const PAPER = '#f1ede2'
const BLUE = '#2c3bff'
const MARKER = '#ffe14d'
const MONO = 'IBM Plex Mono, monospace'

const Label = ({ x, y, children, fill = '#555' }) => (
  <text x={x} y={y} fontSize="11" fill={fill} fontFamily={MONO} letterSpacing=".04em">{children}</text>
)

/* ---------------------------------------------------------------- SaaS */
const saasPts = [[215, 440], [290, 410], [360, 425], [430, 360], [500, 375], [570, 300], [640, 320], [740, 240]]
const saasKpis = [[195, 100], [390, 100], [585, 100]]

const saas = {
  sketch: (r) => [
    ...r.rect(20, 20, 760, 480),
    r.line(170, 20, 170, 500),
    r.line(170, 76, 780, 76),
    ...[110, 150, 190, 230].map((y) => r.line(45, y, 135 + r.j(20), y)),
    ...saasKpis.flatMap(([x, y]) => [...r.rect(x, y, 175, 86), r.line(x + 16, y + 58, x + 90, y + 58)]),
    ...r.rect(195, 206, 565, 274),
    r.poly(saasPts, 6),
    r.line(560, 40, 740, 40, 2),
  ],
  wire: [[20, 20, 150, 480], [45, 102, 90, 14], [45, 142, 90, 14], [45, 182, 90, 14], [45, 222, 90, 14],
    ...saasKpis.map(([x, y]) => [x, y, 175, 86]), [195, 206, 565, 274], [560, 32, 200, 20]],
  Ship: () => (
    <>
      <rect x="20" y="20" width="760" height="480" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <g className="blk">
        <rect x="20" y="20" width="150" height="480" fill={INK} />
        <text x="42" y="60" fill={MARKER} fontWeight="900" fontSize="18">ledgerly</text>
        {['Overview', 'Customers', 'Billing', 'Settings'].map((t, i) => (
          <g key={t}>
            {i === 0 && <rect x="32" y={90} width="126" height="30" fill={BLUE} />}
            <text x="45" y={110 + i * 40} fill={PAPER} fontSize="14" fontWeight={i === 0 ? 700 : 400}>{t}</text>
          </g>
        ))}
      </g>
      <g className="blk">
        <text x="195" y="56" fill={INK} fontSize="22" fontWeight="800">Good evening, Priya</text>
        <rect x="560" y="32" width="200" height="22" rx="11" fill={PAPER} />
        <text x="575" y="48" fill="#777" fontSize="11">Search customers…</text>
      </g>
      {[['MRR', '12480', 'usd', MARKER, BLUE], ['ACTIVE USERS', '342', 'int', PAPER, INK], ['CHURN', '4.1', 'pct', PAPER, INK]].map(([label, v, f, bg, col], i) => {
        const [x, y] = saasKpis[i]
        return (
          <g className="blk" key={label}>
            <rect x={x} y={y} width="175" height="86" fill={bg} stroke={INK} strokeWidth="2" />
            <Label x={x + 14} y={y + 24}>{label}</Label>
            <text x={x + 14} y={y + 64} fontSize="30" fontWeight="900" fill={col} data-count={v} data-format={f}>0</text>
          </g>
        )
      })}
      <g className="blk">
        <rect x="195" y="206" width="565" height="274" fill="#fff" stroke={INK} strokeWidth="2" />
        <Label x={215} y={236}>REVENUE · LAST 8 WEEKS</Label>
        <path d={`M${saasPts.map((p) => p.join(' ')).join(' L')} L740 470 L215 470 Z`} fill={BLUE} opacity=".12" />
        <path className="draw" d={`M${saasPts.map((p) => p.join(' ')).join(' L')}`} fill="none" stroke={BLUE} strokeWidth="4" strokeLinejoin="round" />
        <circle cx="740" cy="240" r="7" fill={BLUE} stroke="#fff" strokeWidth="3" />
      </g>
    </>
  ),
}

/* ---------------------------------------------------------------- Store */
const cards = [40, 290, 540]
const store = {
  sketch: (r) => [
    ...r.rect(20, 20, 760, 480),
    r.line(20, 76, 780, 76),
    r.scribble(45, 50, 110),
    r.line(330, 48, 380, 48, 2), r.line(400, 48, 450, 48, 2), r.line(470, 48, 520, 48, 2),
    r.circle(740, 48, 13),
    ...r.rect(40, 96, 720, 150),
    r.scribble(70, 145, 280), r.scribble(70, 180, 200),
    ...r.rect(70, 202, 130, 30),
    ...cards.flatMap((x) => [...r.rect(x, 266, 220, 214), ...r.rect(x + 12, 278, 196, 128), r.line(x + 14, 430, x + 140, 430), r.line(x + 14, 456, x + 70, 456)]),
  ],
  wire: [[20, 20, 760, 56], [40, 96, 720, 150], ...cards.flatMap((x) => [[x, 266, 220, 214], [x + 12, 278, 196, 128]])],
  Ship: () => (
    <>
      <rect x="20" y="20" width="760" height="480" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <g className="blk">
        <rect x="20" y="20" width="760" height="56" fill={INK} />
        <text x="44" y="55" fill={MARKER} fontWeight="900" fontSize="18" letterSpacing=".04em">OATMEAL &amp; CO.</text>
        {['Shop', 'Journal', 'About'].map((t, i) => <text key={t} x={330 + i * 70} y="53" fill={PAPER} fontSize="13">{t}</text>)}
        <text x="680" y="53" fill={PAPER} fontSize="13" fontWeight="700">Cart (2)</text>
      </g>
      <g className="blk">
        <rect x="40" y="96" width="720" height="150" fill={BLUE} />
        <text x="70" y="150" fill="#fff" fontSize="34" fontWeight="900">Slow mornings,</text>
        <text x="70" y="186" fill="#fff" fontSize="34" fontWeight="900">good oats.</text>
        <rect x="70" y="202" width="130" height="30" fill={MARKER} />
        <text x="84" y="222" fill={INK} fontSize="13" fontWeight="800">Shop the set →</text>
      </g>
      {[['Oat cup', '$18', MARKER], ['Mill set', '$64', PAPER], ['Gift tin', '$12', '#dfe2ff']].map(([t, p, bg], i) => {
        const x = cards[i]
        return (
          <g className="blk" key={t}>
            <rect x={x} y="266" width="220" height="214" fill="#fff" stroke={INK} strokeWidth="2" />
            <rect x={x + 12} y="278" width="196" height="128" fill={bg} />
            <ellipse cx={x + 110} cy="352" rx="44" ry="26" fill="none" stroke={INK} strokeWidth="3" />
            <path d={`M${x + 66} 352 q44 46 88 0`} fill={INK} opacity=".85" />
            <text x={x + 14} y="436" fill={INK} fontSize="16" fontWeight="800">{t}</text>
            <text x={x + 14} y="462" fill={INK} fontSize="14" fontFamily={MONO}>{p}</text>
            <rect x={x + 148} y="444" width="58" height="26" fill={INK} />
            <text x={x + 162} y="462" fill={PAPER} fontSize="12" fontWeight="700">Add</text>
          </g>
        )
      })}
      <g className="blk">
        <rect x="540" y="110" width="200" height="62" fill={INK} stroke={INK} strokeWidth="2" />
        <Label x={556} y={132} fill={MARKER}>PAGESPEED · MOBILE</Label>
        <text x="556" y="160" fill="#fff" fontSize="22" fontWeight="900">38 → <tspan data-count="91" data-format="int">0</tspan></text>
      </g>
    </>
  ),
}

/* ---------------------------------------------------------------- AI */
const ai = {
  sketch: (r) => [
    ...r.rect(20, 20, 760, 480),
    r.line(230, 20, 230, 500),
    ...[70, 110, 150, 190].flatMap((y) => [...r.rect(44, y - 12, 16, 20, 2), r.line(72, y, 180 + r.j(20), y, 2)]),
    ...r.rect(470, 50, 280, 44),
    ...r.rect(260, 116, 420, 84), r.scribble(280, 148, 340), r.scribble(280, 176, 240),
    ...r.rect(520, 222, 230, 44),
    ...r.rect(260, 290, 440, 110), r.scribble(280, 322, 360), r.scribble(280, 350, 300),
    ...r.rect(260, 430, 500, 46),
    r.circle(732, 453, 12),
  ],
  wire: [[20, 20, 210, 480], [470, 50, 280, 44], [260, 116, 420, 84], [520, 222, 230, 44], [260, 290, 440, 110], [260, 430, 500, 46]],
  Ship: () => (
    <>
      <rect x="20" y="20" width="760" height="480" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <g className="blk">
        <rect x="20" y="20" width="210" height="480" fill={INK} />
        <Label x={44} y={46} fill={MARKER}>SOURCES</Label>
        {['plans.md', 'billing.md', 'refunds.md', 'faq.md'].map((t, i) => (
          <g key={t}>
            {i === 2 && <rect x="32" y={58 + i * 40} width="186" height="28" fill={BLUE} />}
            <text x="48" y={77 + i * 40} fill={PAPER} fontSize="13" fontFamily={MONO}>{t}</text>
          </g>
        ))}
        <Label x={44} y={470} fill="#aaa">COST CAP $40/MO</Label>
        <rect x="44" y="478" width="160" height="8" fill="#333" />
        <rect x="44" y="478" width="58" height="8" fill={MARKER} />
      </g>
      <g className="blk">
        <rect x="470" y="50" width="280" height="44" fill={MARKER} stroke={INK} strokeWidth="2" />
        <text x="486" y="77" fontSize="14" fill={INK}>Can I change plans mid-cycle?</text>
      </g>
      <g className="blk">
        <rect x="260" y="116" width="420" height="84" fill={PAPER} stroke={INK} strokeWidth="2" />
        <text x="278" y="146" fontSize="14" fill={INK}>Yes. Upgrades apply now and are pro-rated;</text>
        <text x="278" y="168" fontSize="14" fill={INK}>downgrades start next billing cycle.</text>
        <rect x="278" y="178" width="132" height="16" fill="#fff" stroke={INK} />
        <text x="284" y="190" fontSize="10" fontFamily={MONO} fill={INK}>source: billing.md §3</text>
      </g>
      <g className="blk">
        <rect x="520" y="222" width="230" height="44" fill={MARKER} stroke={INK} strokeWidth="2" />
        <text x="536" y="249" fontSize="14" fill={INK}>And refunds?</text>
      </g>
      <g className="blk">
        <rect x="260" y="290" width="440" height="110" fill={PAPER} stroke={INK} strokeWidth="2" />
        <text x="278" y="320" fontSize="14" fill={INK}>Within 14 days you get a full refund, minus</text>
        <text x="278" y="342" fontSize="14" fill={INK}>usage. After that it becomes account credit.</text>
        <rect x="278" y="358" width="136" height="16" fill="#fff" stroke={INK} />
        <text x="284" y="370" fontSize="10" fontFamily={MONO} fill={INK}>source: refunds.md §1</text>
        <text x="560" y="390" fontSize="10" fontFamily={MONO} fill="#777">checked · 1.4s</text>
      </g>
      <g className="blk">
        <rect x="260" y="430" width="500" height="46" fill="#fff" stroke={INK} strokeWidth="2" />
        <text x="278" y="458" fontSize="14" fill="#888">Ask anything about your account…</text>
        <circle cx="732" cy="453" r="14" fill={BLUE} />
        <path d="M726 453 h12 m-5 -5 l5 5 l-5 5" stroke="#fff" strokeWidth="2.5" fill="none" />
      </g>
    </>
  ),
}

/* ---------------------------------------------------------------- Tool */
const rows = [
  ['#2041', 'Kaveri Foods', '1240', 'paid'],
  ['#2042', 'Northwind', '380', 'hold'],
  ['#2043', 'Ostia Ltd', '2100', 'paid'],
  ['#2044', 'Bramble', '96', 'refund'],
  ['#2045', 'Halden & Co', '760', 'paid'],
]
const pill = { paid: [BLUE, '#fff'], hold: [MARKER, INK], refund: ['#d9d4c6', INK] }
const tool = {
  sketch: (r) => [
    ...r.rect(20, 20, 760, 480),
    r.line(20, 70, 780, 70),
    r.scribble(40, 48, 120),
    ...r.rect(640, 34, 120, 26, 2),
    r.line(200, 70, 200, 500),
    ...[110, 150, 190, 230].flatMap((y) => [...r.rect(40, y - 10, 14, 14, 2), r.line(64, y - 3, 160, y - 3, 2)]),
    r.line(220, 128, 760, 128),
    ...[0, 1, 2, 3, 4].map((i) => r.line(220, 178 + i * 50, 760, 178 + i * 50, 2)),
    ...[0, 1, 2, 3, 4].flatMap((i) => [r.line(240, 158 + i * 50, 300, 158 + i * 50, 2), r.line(340, 158 + i * 50, 450, 158 + i * 50, 2), ...r.rect(650, 144 + i * 50, 70, 22, 2)]),
  ],
  wire: [[20, 20, 760, 50], [640, 34, 120, 26], [20, 70, 180, 430], [220, 90, 540, 38], ...[0, 1, 2, 3, 4].map((i) => [650, 144 + i * 50, 70, 22])],
  Ship: () => (
    <>
      <rect x="20" y="20" width="760" height="480" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <g className="blk">
        <rect x="20" y="20" width="760" height="50" fill={INK} />
        <text x="40" y="51" fill={PAPER} fontSize="15" fontWeight="800">ops / <tspan fill={MARKER}>orders</tspan></text>
        <rect x="640" y="32" width="120" height="26" fill={MARKER} />
        <text x="656" y="50" fontSize="12" fontWeight="800" fill={INK}>Export CSV ↓</text>
      </g>
      <g className="blk">
        <rect x="20" y="70" width="180" height="430" fill={PAPER} />
        <Label x={40} y={98}>FILTERS</Label>
        {['Paid', 'On hold', 'Refunded', 'This month'].map((t, i) => (
          <g key={t}>
            <rect x="40" y={112 + i * 40} width="14" height="14" fill={i === 1 ? INK : '#fff'} stroke={INK} strokeWidth="2" />
            <text x="64" y={124 + i * 40} fontSize="13" fill={INK}>{t}</text>
          </g>
        ))}
      </g>
      <g className="blk">
        <rect x="220" y="90" width="540" height="38" fill={PAPER} />
        {[['ORDER', 240], ['CLIENT', 340], ['AMOUNT', 520], ['STATE', 650]].map(([t, x]) => <Label key={t} x={x} y={114}>{t}</Label>)}
      </g>
      {rows.map(([id, client, amt, st], i) => (
        <g className="blk" key={id}>
          <line x1="220" y1={178 + i * 50} x2="760" y2={178 + i * 50} stroke="#ddd" />
          <text x="240" y={160 + i * 50} fontSize="13" fontFamily={MONO} fill={INK}>{id}</text>
          <text x="340" y={160 + i * 50} fontSize="14" fill={INK}>{client}</text>
          <text x="520" y={160 + i * 50} fontSize="14" fontWeight="700" fill={INK}>${Number(amt).toLocaleString('en-US')}</text>
          <rect x="650" y={144 + i * 50} width="70" height="22" fill={pill[st][0]} stroke={INK} />
          <text x="660" y={159 + i * 50} fontSize="11" fontWeight="700" fill={pill[st][1]} fontFamily={MONO}>{st}</text>
        </g>
      ))}
      <g className="blk">
        <rect x="430" y="438" width="320" height="46" fill={INK} />
        <text x="446" y="458" fontSize="11" fill={MARKER} fontFamily={MONO}>AUDIT LOG · 2 MIN AGO</text>
        <text x="446" y="475" fontSize="13" fill={PAPER}>Priya moved #2042 to hold</text>
      </g>
    </>
  ),
}

export const boards = { saas, store, ai, tool }
