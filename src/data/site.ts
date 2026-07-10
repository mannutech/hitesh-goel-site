// Single source of truth for site-wide constants used across layouts and pages.

export const SITE = {
  title: 'Hitesh Goel',
  domain: 'https://hitesh-goel.com',
  description:
    'Senior software engineer (9+ years, distributed systems & Web3) building and measuring agentic AI tooling in production. Real experiments, real numbers.',
  author: 'Hitesh Goel',
  // PLACEHOLDER — Hitesh to confirm the real dedicated address before launch
  // (master plan Part 1, §14.4). This one address receives both consulting
  // conversations and AI Learner Group applications.
  email: 'hello@hitesh-goel.com',
  social: {
    github: 'https://github.com/mannutech',
    linkedin: 'https://www.linkedin.com/in/hiteshgoelafs',
    x: 'https://x.com/theweekendyogi',
  },
} as const;
