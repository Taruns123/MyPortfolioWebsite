/**
 * Case studies. `status: 'soon'` entries show in the index but don't link
 * to a page yet. Flip to 'live' once the work and screenshots exist.
 *
 * shots: { src, caption, device: 'browser' | 'phone' }. The first shot is the hero.
 * Every screenshot must be of the app actually running.
 */

const ss = (name) => `/assets/project-ss/v2/${name}.jpg`

export const work = [
  {
    slug: 'shopify-speed',
    status: 'soon',
    title: 'Shopify speed rebuild',
    kind: 'Shopify store',
    year: '2026',
    summary: 'A slow, app-heavy store taken to a fast mobile PageSpeed score, with before/after numbers.',
  },
  {
    slug: 'saas-starter',
    status: 'soon',
    title: 'SaaS starter',
    kind: 'SaaS product',
    year: '2026',
    summary: 'Auth, Stripe billing and a real workflow, live on a URL.',
  },
  {
    slug: 'chainify',
    status: 'live',
    title: 'Chainify',
    kind: 'Web platform',
    year: '',
    summary: 'A land registry where every parcel, owner and transfer is recorded on a Hyperledger Fabric ledger.',
    stack: ['React', 'Hyperledger Fabric', 'Node.js', 'Express'],
    links: [
      ['Front end', 'https://github.com/Taruns123/HyperLedgerFabricProject'],
      ['Backend', 'https://github.com/Taruns123/Backend-Chainify'],
    ],
    overview: 'Registrars record land parcels with their boundary, owners and liens, then transfer ownership. Each change becomes a transaction on a permissioned blockchain, so the full history of any parcel can be audited by every party without trusting any single one.',
    features: [
      ['Asset register', 'Search and filter parcels by state, district, land use and status.'],
      ['Parcel detail', 'Boundary map drawn from GeoJSON, area, current owners and their shares, valuation and liens.'],
      ['Ownership history', 'Every transfer with its block number, transaction hash and registry office.'],
      ['Create asset', 'A sectioned form with live validation, dependent State → District → Taluka fields and a boundary preview.'],
      ['Transfer review', 'Stamp duty, registration fee and lien warnings shown before anything is submitted.'],
      ['Co-ownership', 'Split a parcel between owners, with shares that must add up to 100%.'],
    ],
    built: 'A React front end calls a Node.js and Express API that invokes Fabric chaincode. All network calls go through one API module, which can also serve an in-memory demo ledger. The screenshots here run on that demo ledger.',
    shots: [
      { src: ss('chainify-01-landing'), caption: 'Landing', device: 'browser' },
      { src: ss('chainify-02-asset-register'), caption: 'Asset register with filters', device: 'browser' },
      { src: ss('chainify-03-asset-detail'), caption: 'Parcel detail and boundary map', device: 'browser' },
      { src: ss('chainify-04-ownership-history'), caption: 'Ownership history, one entry per ledger transaction', device: 'browser' },
      { src: ss('chainify-05-create-asset'), caption: 'Registering a parcel, with live validation', device: 'browser' },
      { src: ss('chainify-06-transfer'), caption: 'Transfer review: duty, fees and lien warning', device: 'browser' },
      { src: ss('chainify-08-mobile-asset-detail'), caption: 'Parcel detail on a phone', device: 'phone' },
    ],
  },
  {
    slug: 't-charts',
    status: 'soon', // flip to 'live' once the library is reviewed; screenshots wait in design/pending-shots
    title: 'T-Charts',
    kind: 'Open-source library',
    year: '2026',
    summary: 'A small React charting library (line, area, bar) with tooltips, keyboard navigation and a live playground. In progress.',
  },
  {
    slug: 'bistrodex',
    status: 'live',
    title: 'BistroDex',
    kind: 'Desktop app',
    year: '',
    summary: 'A point-of-sale desktop app for small restaurants: orders, GST billing, tables and stock.',
    stack: ['Electron', 'React', 'TypeScript'],
    links: [['Code', 'https://github.com/Taruns123/BistroDex']],
    overview: 'Made for a busy dinner service. Waiters take orders table by table, the counter bills with GST and takes UPI, card or cash, and the owner sees the day’s sales and what’s about to run out.',
    features: [
      ['Today', 'Net sales, sales by hour, payment mix, top sellers and the tables that need attention.'],
      ['Order screen', 'Menu by category with veg and non-veg marks and sold-out states. New items stay separate from what is already in the kitchen.'],
      ['GST billing', 'CGST and SGST, round-off and discounts, printed as a proper tax invoice.'],
      ['Payments', 'UPI QR, card or cash, and the table closes itself once paid.'],
      ['Floor map', 'Every table’s status, covers, time seated and running total.'],
      ['Stock', 'Levels against par, with reorder flags and quantities.'],
    ],
    built: 'The Electron main process keeps data locally and talks to a React renderer over typed IPC. The same API contract has an in-memory demo implementation, so the interface also runs in a browser. The screenshots here use that demo implementation.',
    shots: [
      { src: ss('bistrodex-01-dashboard'), caption: 'Today: the day at a glance', device: 'browser' },
      { src: ss('bistrodex-02-pos-billing'), caption: 'A running order with GST and round-off', device: 'browser' },
      { src: ss('bistrodex-06-payment'), caption: 'Taking payment by UPI', device: 'browser' },
      { src: ss('bistrodex-03-floor'), caption: 'Floor map with live table status', device: 'browser' },
      { src: ss('bistrodex-04-inventory'), caption: 'Stock against par with reorder flags', device: 'browser' },
      { src: ss('bistrodex-05-receipt'), caption: 'Bills and a GST tax invoice', device: 'browser' },
    ],
  },
  {
    slug: 't-note',
    status: 'live',
    title: 'T-Note',
    kind: 'Android app',
    year: '',
    summary: 'A notes app for Android in Jetpack Compose, built on clean architecture.',
    stack: ['Kotlin', 'Jetpack Compose', 'Room', 'Hilt'],
    links: [['Code', 'https://github.com/Taruns123/TNote']],
    overview: 'A calm, quick notes app. Notes are colour-coded in a staggered grid, open into a full-page editor in their own colour, and can be searched, filtered and sorted, in light or dark.',
    features: [
      ['Staggered grid', 'Notes drawn on a Canvas as paper cards with a folded corner in each note’s colour.'],
      ['Search', 'Instant search across titles and content.'],
      ['Filter and sort', 'Filter by colour; sort by last edited, title or colour.'],
      ['Editor', 'The page takes the note’s colour and shows the edit time and word count.'],
      ['Undo', 'Long-press to delete, with Undo in case you didn’t mean it.'],
      ['Light and dark', 'Two full themes with their own palette.'],
    ],
    built: 'Clean architecture with three layers: data (Room), domain (use cases) and presentation (Compose with ViewModels), wired with Hilt. Storage or UI can change without touching the rest.',
    shots: [
      { src: ss('t-note-01-notes-light'), caption: 'Notes grid', device: 'phone' },
      { src: ss('t-note-02-note-editor'), caption: 'Editor', device: 'phone' },
      { src: ss('t-note-06-notes-dark'), caption: 'Dark theme', device: 'phone' },
      { src: ss('t-note-03-search'), caption: 'Search', device: 'phone' },
      { src: ss('t-note-04-sort-sheet'), caption: 'Sort', device: 'phone' },
      { src: ss('t-note-07-editor-dark'), caption: 'Editor, dark', device: 'phone' },
    ],
  },
]

export const findWork = (slug) => work.find((w) => w.slug === slug && w.status === 'live')
