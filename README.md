# hitesh-goel-site

Source for [hitesh-goel.com](https://hitesh-goel.com) — a small, static, AI-crawler-optimized personal site documenting Hitesh Goel's real, measured work in agentic AI engineering.

Built with [Astro](https://astro.build) (zero-JS-by-default output, so AI crawlers see fully-rendered content). Deployed to Cloudflare Pages via its native Git integration: every push to `main` builds and deploys automatically.

The full spec lives in [`docs/hitesh-goel-site-master-plan.md`](docs/hitesh-goel-site-master-plan.md).

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # static build to dist/
npm run preview  # serve the built site locally
```

## Publish a new Field Note

1. Add a markdown file under `src/content/notes/` with frontmatter:

   ```markdown
   ---
   title: The finding, stated as the answer, not a teaser
   description: One-sentence summary used in listings and meta tags.
   pubDate: 2026-07-11
   ---

   Two to four sentences stating the result first. Then the experiment,
   the actual number, and one honest conclusion.
   ```

2. Add a one-line entry for it in `public/llms.txt`.
3. Commit and push. Cloudflare Pages deploys it.

## Update Projects

Edit `src/data/projects.json` (name, description, tags, repo link, optional Field Note link) and push. It's a curated, hand-maintained list on purpose — not an automated pull of all repos.

## Where things live

- `src/layouts/BaseLayout.astro` — sitewide Person JSON-LD, AI-crawler meta tags, nav/footer
- `src/pages/faq.astro` — the only page with FAQPage schema
- `src/pages/notes/[id].astro` — per-note BlogPosting schema, fed from frontmatter
- `src/data/site.ts` — site-wide constants, including the contact email
- `public/robots.txt` — explicit allow list for AI crawlers
- `public/llms.txt` — curated markdown index for LLMs, updated by hand
