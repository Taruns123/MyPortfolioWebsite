/**
 * Every piece of copy on the site lives here or in builds.js / work.js.
 * Components never hard-code text.
 */

export const profile = {
  name: 'Tarun Shetty',
  role: 'Full-stack developer',
  city: 'Mumbai, India',
  email: 'hello@tarunshetty.dev',
  // Leave empty to hide the "book a call" link.
  bookingUrl: '',
  liveWindowUtc: '13:30–17:00 UTC',
  socials: [
    { name: 'GitHub', href: 'https://github.com/Taruns123' },
    { name: 'LinkedIn', href: '' }, // TODO: add profile URL
    { name: 'X', href: 'https://x.com/Tarun_Shetty_' },
  ],
}

export const nav = [
  { label: 'Builds', href: '#builds' },
  { label: 'How I work', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
]

export const hero = {
  intro: { name: 'Tarun Shetty', line: 'full-stack developer in Mumbai. I build SaaS products, Shopify stores, AI features and internal tools for founders and small teams.' },
  lines: ['You bring', 'the', 'napkin.'], // last word gets the blue + scribble
  sub: 'I bring it back working. Fixed price, a demo every week, and the code is yours from the first commit.',
  terminal: [
    '2+ years shipping production web apps',
    'live 13:30–17:00 utc · us mornings, uk/eu afternoons',
    'next.js · node · python · shopify',
  ],
  cta: 'Show me the napkin',
  cue: '(try the napkin →)',
}

export const ticker = [
  'Fixed price',
  'Weekly demos',
  'You own the code from commit one',
  'Two clients at a time',
  'Live 13:30–17:00 UTC',
  'Mumbai → US · UK · EU',
]

export const process = {
  title: 'How a napkin becomes a product',
  steps: [
    { n: '01', title: 'Napkin call', time: '20 min', body: 'You tell me what it should do and who it is for. I ask the awkward questions early: budget, deadline, what happens if it works.' },
    { n: '02', title: 'Written scope', time: '2 days', body: 'One page: what ships, what does not, the fixed price and the milestones. Nothing starts until you have agreed to it in writing.' },
    { n: '03', title: 'Weekly demos', time: 'every Friday', body: 'You click through real software on a staging URL each week, not a status report. Changes go in the next sprint, not the next invoice.' },
    { n: '04', title: 'Handover', time: 'day one, really', body: 'The repo, hosting and accounts are in your name from the start. You get docs, a recorded walkthrough and a bug-fix window.' },
  ],
  facts: [
    ['Price', 'Fixed, in milestones'],
    ['Overlap', '13:30–17:00 UTC daily'],
    ['Updates', 'Every evening, your time'],
    ['Code', 'Yours from commit one'],
  ],
}

export const about = {
  title: 'Hi, I’m Tarun.',
  paragraphs: [
    'I have spent about two and a half years shipping production web software: a make-to-order supply chain platform in React at Vector Consulting, and before that Angular and Next.js client work at Pixolo.',
    'Now I build for founders and small teams directly. I take two projects at a time so each one gets proper attention, and I would rather ship one thing that works than five that almost do.',
    'Outside of client work I build things to learn: a charting library, a blockchain land registry, a restaurant billing app. They are below.',
  ],
  // Swap for a real photo at /public/assets/tarun.jpg and set photo: '/assets/tarun.jpg'
  photo: '',
  facts: [
    ['Based in', 'Mumbai, India'],
    ['Experience', '~2.5 years, production'],
    ['Stack', 'React, Next.js, Node, Python, Shopify'],
    ['Taking', '2 projects at a time'],
  ],
}

export const contact = {
  command: 'send --napkin',
  title: 'Send me the napkin.',
  sub: 'A few lines is enough. I reply within one working day with questions or a rough plan.',
  kinds: ['SaaS product', 'Shopify store', 'AI feature', 'Internal tool', 'Something else'],
  budgets: ['Under $1k', '$1k–3k', '$3k–8k', '$8k+', 'Not sure yet'],
  success: 'Got it. I’ll reply within one working day.',
  failure: 'That didn’t send. Email me directly instead:',
}
