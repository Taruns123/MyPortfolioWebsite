/**
 * Case studies. `status: 'soon'` entries show in the index but don't link
 * to a page yet — flip to 'live' and fill `sections` when the work exists.
 */

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
    year: '', // TODO: confirm
    summary: 'Land-registry asset management on Hyperledger Fabric.',
    stack: ['Hyperledger Fabric', 'Node.js', 'Express', 'React', 'Three.js'],
    repo: 'https://github.com/Taruns123/Backend-Chainify',
    images: ['/assets/project-ss/chainify-1.jpg', '/assets/project-ss/chainify-2.jpg', '/assets/project-ss/chainify-3.jpg'],
    sections: [
      ['The problem', 'Land registrars record ownership transfers in systems that are slow to audit and easy to dispute. Every transfer needs a trail that several parties can trust without trusting each other.'],
      ['What I built', 'A permissioned blockchain application on Hyperledger Fabric where each asset transaction is recorded on a shared ledger. A Node.js and Express API sits in front of the chaincode, and a React front end lets registrars search, transfer and audit assets.'],
      ['What it shows', 'I can work in an unfamiliar, heavily specified stack and still ship a usable interface on top of it: auth, data modelling, an API layer and a front end people can actually operate.'],
    ],
  },
  {
    slug: 't-charts',
    status: 'live',
    title: 'T-Charts',
    kind: 'Open-source library',
    year: '', // TODO: confirm
    summary: 'A React charting library for bar, line and area charts.',
    stack: ['React', 'SVG', 'Rollup'],
    repo: 'https://github.com/Taruns123/charts-react',
    images: ['/assets/project-ss/t-charts-1.jpg', '/assets/project-ss/t-charts-2.jpg'],
    sections: [
      ['The problem', 'Off-the-shelf chart libraries were either too heavy or too rigid for the custom dashboards I was building.'],
      ['What I built', 'A small, composable React charting library for bar, line and area charts with full control over styling, published as open source.'],
      ['What it shows', 'Dashboards are most of what SaaS products are. I know how to make data readable, and how to package code so other developers can use it.'],
    ],
  },
  {
    slug: 'bistrodex',
    status: 'live',
    title: 'BistroDex',
    kind: 'Internal tool',
    year: '', // TODO: confirm
    summary: 'A desktop app for restaurant billing and inventory.',
    stack: ['Electron', 'React', 'MySQL'],
    repo: 'https://github.com/Taruns123/BistroDex',
    images: ['/assets/project-ss/bistrodex-1.jpg'],
    sections: [
      ['The problem', 'A restaurant running billing and stock on paper and spreadsheets: slow at the till and wrong by the end of the week.'],
      ['What I built', 'A cross-platform Electron app with a React interface for billing, menu and inventory management, backed by MySQL.'],
      ['What it shows', 'Internal tools live or die on boring reliability. This is the shape of most ops software I build: tables, roles, data that has to add up.'],
    ],
  },
  {
    slug: 't-note',
    status: 'live',
    title: 'T-Note',
    kind: 'Android app',
    year: '', // TODO: confirm
    summary: 'A notes app built on clean architecture.',
    stack: ['Kotlin', 'Jetpack Compose', 'Dagger Hilt'],
    repo: 'https://github.com/Taruns123/TNote',
    images: ['/assets/project-ss/t-notes-1.jpg', '/assets/project-ss/t-notes-2.jpg', '/assets/project-ss/t-notes-3.jpg'],
    sections: [
      ['The problem', 'Most notes apps are either bloated or fragile. I wanted to build one properly, the way production Android apps are structured.'],
      ['What I built', 'A Jetpack Compose app with clean architecture layers, Dagger Hilt for dependency injection and a custom Canvas-drawn UI.'],
      ['What it shows', 'Structure that survives change. The same separation of concerns goes into every codebase I hand over.'],
    ],
  },
]

export const findWork = (slug) => work.find((w) => w.slug === slug && w.status === 'live')
