/**
 * The four kinds of things I build. Each pairs with a board in
 * components/boards/ that draws its sketch → wireframe → shipped stages.
 */

export const builds = [
  {
    key: 'saas',
    n: '01',
    command: 'build --saas-mvp',
    title: 'A SaaS product',
    body: 'Sign-up, Stripe billing, and the one workflow your first customers pay for, on a URL you can demo in week one. You own the repo from the first commit.',
    stack: 'Next.js · Node · Postgres · Stripe',
    time: '4–6 weeks',
    stages: ['day 0', 'day 3', 'week 5'],
    proof: { label: "SaaS starter", to: null, note: "case study in progress" },
  },
  {
    key: 'store',
    n: '02',
    command: 'build --storefront',
    title: 'A Shopify store',
    body: 'A store that loads in under two seconds on a phone and a checkout that doesn’t leak buyers. Every speed change ships with before/after numbers you can check yourself.',
    stack: 'Shopify · Liquid · Hydrogen · Klaviyo',
    time: '2–4 weeks',
    stages: ['day 0', 'day 2', 'week 3'],
    proof: { label: 'Speed case study', to: null, note: 'in progress' },
  },
  {
    key: 'ai',
    n: '03',
    command: 'build --ai-feature',
    title: 'An AI feature',
    body: 'An assistant or automation inside the product you already have, grounded in your own docs and data, with cost caps and checks that catch bad answers before your users do.',
    stack: 'Claude / OpenAI APIs · pgvector · Python',
    time: '2–3 weeks',
    stages: ['day 0', 'day 2', 'week 3'],
    proof: { label: 'Demo', to: null, note: 'coming soon' },
  },
  {
    key: 'tool',
    n: '04',
    command: 'build --internal-tool',
    title: 'An internal tool',
    body: 'The spreadsheet your team lives in, rebuilt as an app with roles, an audit log and one-click exports. Boring on purpose, so it doesn’t break.',
    stack: 'React · Node · Postgres',
    time: '3–5 weeks',
    stages: ['day 0', 'day 3', 'week 4'],
    proof: { label: 'BistroDex', to: '/work/bistrodex', note: 'billing + inventory for a restaurant' },
  },
]
