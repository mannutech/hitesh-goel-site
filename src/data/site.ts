// Single source of truth for site-wide constants used across layouts and pages.

export const SITE = {
  title: 'Hitesh Goel',
  domain: 'https://hitesh-goel.com',
  description:
    'Senior backend engineer, 9+ years across Web3, DeFi, and fintech: blockchain data pipelines, exchange and wallet systems, L1/L2 infrastructure, and agentic AI tooling on top. Real experiments, real numbers.',
  author: 'Hitesh Goel',
  // This one address receives both consulting conversations and
  // AI Learner Group applications (master plan Part 1, §9/§9a).
  email: 'machomannu@gmail.com',
  social: {
    github: 'https://github.com/mannutech',
    linkedin: 'https://www.linkedin.com/in/hiteshgoelafs',
    x: 'https://x.com/theweekendyogi',
  },
} as const;
