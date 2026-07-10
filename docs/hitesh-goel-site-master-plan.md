# Hitesh Goel AI-Engineering Credibility Site — Master Plan

*Consolidated handoff document for Claude Code. Domain: `hitesh-goel.com`. July 2026.*

*Combines three previously separate files: the requirements plan, the site copy draft (v3, natural voice), and the technical implementation appendix. Section numbering is preserved within each part for traceability.*

---

# PART 1 — Website Requirements Plan

## 1. One-line summary

A small, static, AI-crawler-optimized personal site documenting Hitesh Goel's real, measured work in agentic AI engineering, separate from and not linked into weekendyogi.com, built for long-horizon credibility, not for a hard sales funnel.

## 2. Goals and non-goals

**Goals:** be citable by AI answer engines (ChatGPT, Claude, Perplexity, Gemini/AI Overviews) and findable by human search for queries about Hitesh's actual work; host a growing archive of real experiments (the same "run it, publish the number, state one honest conclusion" pattern already working on LinkedIn); carry exactly one soft signal that he's open to conversations, without becoming a sales page; stay light enough to maintain weekly, indefinitely, alongside a full-time job.

**Non-goals:** no pricing/services/offer page; no warm outreach, CRM, or lead-gen automation; no e-commerce or booking system; no live-synced LinkedIn/X feeds; no forced content niche; no fixed deadline; no changes to weekendyogi.com.

## 3. Domain

**Decided: `hitesh-goel.com`.** `hiteshgoel.com` and `hiteshgoel.dev` were unavailable. `hitesh-goel.com` was picked over `goelhitesh.com` (also available, briefly considered) because it keeps the natural first-name-first order that matches every other reference to Hitesh (GitHub, LinkedIn, X, resume), at the cost of a hyphen, a small, purely cosmetic tradeoff compared to the surname-first flip `goelhitesh.com` would have required. Still a `.com`, still the most neutral, durable TLD available.

All domain references throughout this document are `hitesh-goel.com`.

## 4. Positioning statement

*"Senior software engineer, 9+ years in distributed systems and Web3, now building and measuring agentic AI tooling in production. This site is the real experiments and real numbers behind that work, published as they happen."*

This single sentence drives the homepage lead, the Person-schema description, and the framing of every article. Proposed as final; Hitesh should read it once and confirm it doesn't overclaim or underclaim before it goes live.

## 5. Technical stack

- **Static-site generator:** Astro (or Eleventy as fallback), zero-JS-by-default output, so AI crawlers (which do not execute JavaScript, confirmed for GPTBot, ClaudeBot, and PerplexityBot) see fully-rendered content, not an empty shell. Not raw hand-written HTML (doesn't scale to a weekly cadence with consistent schema); not Next.js (default client hydration works against non-JS crawlers).
- **Content format:** Markdown, one dated file per Field Note.
- **Hosting/deploy:** a new, dedicated GitHub repository (suggested name `hitesh-goel-site`, under `mannutech`, public by default) connected to Cloudflare Pages via native Git integration, same general pattern already used for weekendyogi.com. Everything lives in this one repo: site source, all Field Notes as markdown, the curated projects data file, and a `/docs` folder holding the planning documents, so the spec travels with the code rather than staying only in chat history. See Part 3, §0 for the full repo setup.
- **Deploy trigger:** push to `main` (via Cloudflare Pages' native Git integration, no custom workflow needed for the basic case) plus manual `workflow_dispatch` if a custom GitHub Actions workflow is used instead. No nightly cron. If live GitHub star counts are wanted on the Projects page, a weekly cron is the ceiling, never more frequent than that, and only via a custom Actions workflow, since the native integration doesn't support scheduled runs.

## 6. Site structure

- **Home** — 2-4 sentence direct-answer lead (the positioning statement, in prose), then links into the sections below.
- **About** — the canonical entity page. Full background, the one "open to" line (see §9), the AI Learner Group line (see §9a), contact method. Optional single unlinked sentence acknowledging the coaching practice, Hitesh's call, not required.
- **FAQ** — entity-level Q&A (see §10), carries `FAQPage` schema. This is the only page with FAQ schema.
- **Projects** — curated list of real shipped work (ContextSpin, RecallCheck, the RAG/evals harness, the Zvec vector-search experiment), each with a short description and links. Data lives in a small committed file (JSON or Markdown frontmatter), updated by hand when something new ships, not an automated pull of all 34 GitHub repos, which would dilute the signal with irrelevant forks and noise.
- **Field Notes** — dated articles, one per mirrored LinkedIn/X post going forward. Direct-answer-first. Each carries visible byline, dateline, and a link back to About (concentrates entity authority rather than scattering it). No topic restriction, this section is meant to hold whatever Hitesh is genuinely experimenting with that week.

## 7. Content specifications

**Field Notes format (per post):** title framed as the direct answer/finding, not a teaser; opening 2-4 sentences stating the result before the narrative; body describing the experiment and what it showed; one honest conclusion; dateline and byline visible on the page (not just in metadata) for both crawler and human trust signals.

**Projects format (per entry):** name, one-sentence description, tech/stack tags, link to repo, and, where applicable, a link to the Field Note that documents it.

## 8. AEO/GEO technical requirements

- **`robots.txt`** explicitly allowing GPTBot, ClaudeBot, Google-Extended, PerplexityBot, OAI-SearchBot, Bingbot, CCBot, and Applebot-Extended. This is the deliberate inverse of weekendyogi.com's current Cloudflare-default configuration, which blocks all of these.
- **Meta AI-crawler tags** in `<head>` on every page: `ClaudeBot: index, follow`, `GPTBot: index, follow`, `Google-Extended: index, follow`, `OAI-SearchBot: index, follow`, `PerplexityBot: index, follow`, the same explicit-invitation pattern found on sundeepteki.org.
- **`sitemap.xml`** auto-generated by the SSG.
- **`llms.txt`** curated markdown index: positioning statement plus links to About, FAQ, Projects, and the most substantive Field Notes, one-line description each. Authored once, updated as new substantial content is added, not auto-generated.
- **Bing Webmaster Tools** submit the sitemap directly; enable **IndexNow** (Cloudflare has a native integration) so new Field Notes reach ChatGPT Search (which draws from Bing's index) quickly rather than waiting on a crawl cycle.
- **Structured data (JSON-LD), kept minimal and accurate:**
  - `Person` schema, sitewide: name, role (from the positioning statement), `sameAs` limited to GitHub, LinkedIn, and X, deliberately excluding weekendyogi.com, since a structured link risks an answer engine summarizing Hitesh as "a yoga coach who also does AI," undoing the reason a neutral domain was chosen.
  - `Article`/`BlogPosting` schema per Field Note (headline, datePublished, author reference).
  - `FAQPage` schema on the FAQ page only, not stamped on every article.
- **Every page:** direct-answer-first structure (2-4 sentence answer before narrative), since this is what AI engines weight most heavily when selecting what to cite.

## 9. The "open to" signal

Exactly one instance, on the About page (and optionally mirrored in the site footer), never repeated per-article, never a pricing or services page:

> "Currently building and writing about agentic AI tooling in production. Open to a small number of consulting conversations with teams working on similar problems, get in touch."

**Contact mechanism:** plain `mailto:` link to a dedicated address. No contact form (avoids needing a backend and spam handling), no scheduling tool, and explicitly not the topmate.io link used for the yoga coaching business.

**Accepted tradeoff:** this signal optimizes for credibility discovery, not for ranking against "AI consultant for hire"-type searches. That's intentional given the no-hard-sell, no-deadline stance, worth remembering later if the instinct is to wonder why consulting-intent traffic isn't showing up.

## 9a. AI Learner Group (community layer, separate from the site's low-maintenance design)

A second, clearly separate soft line on the About page (not repeated elsewhere), inviting interest in a small, private group for people building seriously with AI to share real experiments, no judgment unless asked for. This is an **application, not a join button**: the qualification step is folded directly into the same `mailto:` used for the consulting line, no separate form or backend needed. The email ask doubles as the onboarding filter: reply with one real thing you've tried and measured, and what happened. That single request screens for seriousness and seeds the eventual group with real content instead of empty air.

**Sequencing:** do not create the actual WhatsApp group at site launch. Collect applications first; only stand up the group once there's a real qualified cohort (roughly 10-15 people), not the first three clicks. A group that goes quiet in week one is worse for credibility than no group at all.

**Ongoing cost, stated plainly:** unlike the rest of this site, this is not a publish-and-forget asset. Once the group exists it needs active hosting, presence, and moderation. This is explicitly out of scope for Claude Code's build (it's a manual, human process, not a feature to automate) and is a standing time commitment Hitesh is taking on knowingly, separate from the site's weekly-content cadence.

## 10. FAQ content (proposed, entity-level, for the FAQ page)

1. **What does Hitesh Goel work on?** Distributed systems and Web3 infrastructure professionally, with a growing focus on building and evaluating agentic AI tooling, MCP servers, coding-agent evals, internal developer tools.
2. **What's his background?** 9+ years as a software engineer, including JPMorgan, Crypto.com, Gelato, and currently Moralis, where he builds production AI/agent infrastructure.
3. **What is this "real experiments, real numbers" series?** An ongoing practice of publishing hands-on AI engineering experiments, what was tried, the actual measured result, and one honest conclusion, rather than tutorials or hot takes.
4. **What has he actually shipped?** Open-source Claude Code plugins (ContextSpin, RecallCheck) and internal AI tooling in production at Moralis (a Grafana MCP server, code-review agents, an evals harness for RAG systems).
5. **Is he available for consulting or advisory work?** Open to a small number of conversations with teams working on similar problems, see contact link.
6. **Is there a community for people building this seriously?** A small, private group for sharing real experiments, not hot takes, no judgment unless you ask for it. Kept small on purpose: email one thing you've tried and measured to be considered.

Proposed as a complete, ready-to-use set; Hitesh should sanity-check accuracy on #2 and #4 before publishing (job titles/dates, and which specific projects he wants named publicly).

## 11. Seed target-query list (what this site should aim to be cited for)

- "engineer building AI coding-agent tooling"
- "Claude Code plugins for developer context / MCP"
- "how to evaluate RAG groundedness in production"
- "hybrid search vs vector search evals real numbers"
- "experienced backend engineer transitioning into AI engineering"
- "distributed systems engineer AI agent tooling UAE"

This list exists to seed article titles, FAQ answers, and direct-answer leads, not to be published anywhere on the site itself.

## 12. Baseline quality bar

Mobile-first responsive; semantic HTML; reasonable accessibility (proper heading hierarchy, alt text, sufficient contrast); OpenGraph and Twitter card meta for human sharing; minimal visual design, system font stack, one accent color, no heavy CSS framework. Analytics: a single privacy-light option (Cloudflare Web Analytics or Plausible) is fine to include; doesn't affect crawlability either way.

## 13. Explicitly out of scope

weekendyogi.com (untouched, no structured cross-link, kept out of nav and out of `sameAs`); warm outreach, CRM, or any lead-gen automation; e-commerce, booking, or payment systems; live-synced LinkedIn/X feeds (LinkedIn has no public API for this; X's API removed its free read tier in Feb 2026 and even a paid embed would render client-side and be invisible to non-JS-executing AI crawlers, manual mirroring into Field Notes is the mechanism instead); any pricing/offer/services page; a fixed project deadline; actually creating or automating the AI Learner Group (§9a), that's a manual, human process Hitesh runs himself once there's a real cohort, not something the build includes.

## 14. Open items requiring Hitesh's sign-off before build starts

1. ~~Register the domain~~ — **done: `hitesh-goel.com`** (§3).
2. **Confirm the positioning statement** (§4) doesn't over- or under-claim.
3. **Confirm the FAQ answers** (§10), specifically the exact job history and which shipped projects to name publicly.
4. **Confirm `mailto:` as the contact mechanism** (§9), and provide the address to use, this same address now also receives AI Learner Group applications (§9a).
5. **Confirm Astro (or Eleventy) as the generator** (§5), this is the one architecturally consequential choice in the whole plan.
6. **Decide whether to acknowledge the coaching practice on About at all** (§6), optional, not required.
7. **Analytics in or out** (§12), either is fine, just needs a yes/no.

---

# PART 2 — Site Copy (natural voice, em dashes removed)

*Same facts, same numbers, same structure throughout. Every em dash replaced with a period, comma, colon, or parenthesis, whichever reads most like something a person would actually say out loud.*

## HOME

> # Hitesh Goel
> Senior software engineer working in distributed systems and Web3, now building agentic AI tooling in production.
>
> I've spent 9+ years shipping backend and blockchain infrastructure (JPMorgan, Crypto.com, Gelato, and currently Moralis). Most of my work now is agentic AI tooling: MCP servers, coding-agent evals, internal dev tools. This site is where I publish the experiments behind it. What I tried, the actual number, one honest conclusion. Usually the honest conclusion is that the obvious answer was wrong and a cheaper one measured better.
>
> [The things I've built →](/projects) · [Field notes: experiments and numbers →](/notes) · [Who's writing this →](/about)

## ABOUT

> ## About
> I'm a software engineer with 9+ years across distributed systems and Web3: JPMorgan, Crypto.com, Gelato, and currently Moralis, where I build production agentic-AI infrastructure. That means a Grafana MCP server, code-review agents that remember what they've seen before, an automated reviewer that goes over a work session after it ends, and eval harnesses for RAG systems. It's the boring plumbing that decides whether an "AI feature" actually holds up once real traffic hits it.
>
> Outside work I ship open-source Claude Code plugins, ContextSpin and RecallCheck, and keep a running habit of publishing real, measured experiments instead of tutorials or predictions. I'd rather post one number I actually observed than ten opinions about where the field is going.
>
> **Background**
> - 9+ years, distributed systems & Web3
> - Currently: Senior Software Engineer @ Moralis
> - Past: JPMorgan, Crypto.com, Gelato
> - Ships: Claude Code plugins (ContextSpin, RecallCheck), production MCP/agent tooling
>
> I'm open to a small number of consulting conversations with teams working on similar problems: agentic tooling, evals, the parts of this that only break in production.
>
> I'm also collecting interest for a small, private group for people building seriously with AI to share real experiments, no judgment unless you ask for it. If that's you, email me one thing you've tried and measured, and what happened.
>
> Find me elsewhere: GitHub · LinkedIn · X

## FAQ

Same six entries as Part 1, §10. Each opens with the direct answer, no em dashes in the actual text.

## PROJECTS

> ### ContextSpin
> A Claude Code plugin that replaces the spinner with live org context: open PRs, CI status, your next meeting, whatever you've got connected. It's a renderer, not a service. No daemon, no API keys of its own, it just reads from tools you already have. MIT licensed, one line to install. The whole idea started from noticing the spinner is the one thing on screen that's paid to tell you nothing.
>
> ### RecallCheck
> A Claude Code plugin that quizzes you on the code you just wrote, right before you push. Questions are pulled from your real diff, weighted to the riskiest parts. It never blocks the push; it's a nudge, not a gate. The premise: shipping is cheap now, anyone can push a working feature in an afternoon, so the scarce part isn't the code. It's still being able to explain it an hour later.
>
> ### RAG Evals Harness
> A groundedness-and-citation harness built on the Cohere stack, tested against a real 150-question set. It caught the agent quietly refusing questions it should have answered, the kind of failure that looks fine in a demo and only shows up when you measure it. It also settled hybrid-vs-single-mode search with a number instead of a hallway argument.
>
> ### Local Semantic Code Search (Zvec)
> An experiment testing whether Claude could understand a ~5,000-file codebase using Zvec, Alibaba's open-source vector DB, running fully local. The obvious fix was a bigger model. I tried the cheap thing first: adding file paths to the index took retrieval from 6/25 to 16/25. That's a free change that beat a 15x bigger model, which only reached 20/25 while running 4x slower.

## FIELD NOTES — worked example

> ### A Claude Code status bar that shows your PRs instead of a spinner
> *Hitesh Goel · July 2026*
>
> A Claude Code spinner is the one thing on your screen that's paid to tell you nothing, so I replaced it. ContextSpin is an open-source plugin that swaps the default status bar (model name, token count) for live context: open PRs, CI status, Slack mentions, whatever tools you already have connected. One line to install, runs locally, no daemon, no keys of its own. It's a renderer, not a service.
>
> I barely wrote it by hand. I directed Claude Code, rotated between models when one got stuck, and iterated across nine small releases until it behaved the way I wanted. It began as a weekend itch. I kept glancing at a spinning cursor while the actual thing I wanted to know was one API call away, and it turned into something I now keep open all day.
>
> **The honest takeaway:** the interesting part was never the code, which was mostly the model's. It was noticing how much attention a spinner quietly costs you when the information you actually want is already sitting in a tool you're paying for.

**Still needs Hitesh:** the real contact email, and whether the About page's coaching-mention sentence stays in or out.

---

# PART 3 — Technical Implementation Appendix

*Everything below is meant to be copy-pasted and adapted directly, not re-derived. Domain is final: `hitesh-goel.com`, already filled in throughout.*

## 0. Repository setup

Create a single new GitHub repository to hold everything for this project: source code, content, configuration, and the planning docs themselves. Suggested name: `hitesh-goel-site`, under the `mannutech` account.

- **Visibility:** public, by default. This matches the open-source pattern already set by ContextSpin and RecallCheck, and a publicly inspectable source is itself a small, on-brand credibility signal for an engineering site. Private is a fine alternative if preferred; it's a one-time call, not a hard requirement.
- **What lives in the repo:** the full Astro (or Eleventy) site source; `/public/robots.txt` and `/public/llms.txt`; the curated `/src/data/projects.json`; every Field Note as a markdown file under `/src/content/notes`; `.github/workflows/build.yml` if used; and a `/docs` folder containing this master plan, so the full spec travels with the code instead of living only in chat history.
- **Deploy:** connect the repo directly to Cloudflare Pages via its native Git integration (Cloudflare dashboard → Pages → Connect to Git), which auto-builds and deploys on every push with no custom workflow needed for the basic case. Only add the `.github/workflows/build.yml` from §6 if the optional weekly GitHub-star-count refresh on Projects is wanted, since that needs a scheduled trigger the native integration doesn't provide on its own.
- **Ongoing maintenance:** every new Field Note is a markdown file committed and pushed to this repo; every Projects update is a one-line edit to `projects.json`. No separate CMS, dashboard, or database. This repo is the single source of truth for the whole project going forward.

## 1. `robots.txt`

```
# Explicit allow list for AI crawlers — the deliberate inverse of weekendyogi.com's
# Cloudflare-default configuration, which blocks all of these.

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: *
Allow: /

Sitemap: https://hitesh-goel.com/sitemap.xml
```

This file is enough on its own to allow every AI crawler. There's a separate Cloudflare-dashboard-level setting that can override or add to it (that's what's currently blocking weekendyogi.com), see §9, deferred, not part of this build.

## 2. `llms.txt`

```markdown
# Hitesh Goel

> Senior software engineer (9+ years, distributed systems & Web3) building and measuring agentic AI tooling in production. This site publishes real experiments and real numbers, not tutorials or predictions.

## About
- [About](https://hitesh-goel.com/about): background, current work, and how to reach me.
- [FAQ](https://hitesh-goel.com/faq): quick answers on background, what's shipped, and availability.

## Projects
- [ContextSpin](https://hitesh-goel.com/projects#contextspin): Claude Code plugin that replaces the spinner with live org context.
- [RecallCheck](https://hitesh-goel.com/projects#recallcheck): Claude Code plugin that quizzes you on code you just shipped, before you push.

## Field Notes
- [A Claude Code status bar that shows your PRs instead of a spinner](https://hitesh-goel.com/notes/contextspin): building ContextSpin and what it taught me about attention.

<!-- Add one line per new Field Note as it's published. Keep descriptions to one sentence. -->
```

## 3. Structured data (JSON-LD)

### 3a. Person schema — sitewide, in the base layout `<head>`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Hitesh Goel",
  "url": "https://hitesh-goel.com",
  "description": "Senior software engineer (9+ years, distributed systems & Web3) building and measuring agentic AI tooling in production.",
  "jobTitle": "Senior Software Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "Moralis"
  },
  "sameAs": [
    "https://github.com/mannutech",
    "https://www.linkedin.com/in/hiteshgoelafs",
    "https://x.com/theweekendyogi"
  ]
}
</script>
```

Note: `sameAs` deliberately excludes weekendyogi.com. Do not add it.

### 3b. Article/BlogPosting schema — one per Field Note

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "A Claude Code status bar that shows your PRs instead of a spinner",
  "datePublished": "2026-07-14",
  "author": {
    "@type": "Person",
    "name": "Hitesh Goel",
    "url": "https://hitesh-goel.com/about"
  }
}
</script>
```

Template this per-note in the SSG (Astro content collection frontmatter → `headline`/`datePublished` fields feed this block automatically).

### 3c. FAQPage schema — on the FAQ page only, nowhere else

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Hitesh Goel work on?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Distributed systems and Web3 infrastructure professionally, with a growing focus on building and evaluating agentic AI tooling: MCP servers, coding-agent evals, internal developer tools."
      }
    },
    {
      "@type": "Question",
      "name": "What's his background?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "9+ years as a software engineer, including JPMorgan, Crypto.com, Gelato, and currently Moralis, where he builds production AI and agent infrastructure."
      }
    },
    {
      "@type": "Question",
      "name": "What is this real experiments, real numbers series?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An ongoing practice of publishing hands-on AI engineering experiments: what was tried, the actual measured result, and one honest conclusion, rather than tutorials or hot takes."
      }
    },
    {
      "@type": "Question",
      "name": "What has he actually shipped?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open-source Claude Code plugins (ContextSpin, RecallCheck) and internal AI tooling in production at Moralis, including a Grafana MCP server, code-review agents, and an evals harness for RAG systems."
      }
    },
    {
      "@type": "Question",
      "name": "Is he available for consulting or advisory work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open to a small number of conversations with teams working on similar problems. See the contact link on the About page."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a community for people building this seriously?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A small, private group for sharing real experiments, not hot takes, with no judgment unless asked for. Kept small on purpose: email one thing you've tried and measured to be considered."
      }
    }
  ]
}
</script>
```

## 4. AI-crawler meta tags — every page `<head>`

```html
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="GPTBot" content="index, follow">
<meta name="ClaudeBot" content="index, follow">
<meta name="Google-Extended" content="index, follow">
<meta name="OAI-SearchBot" content="index, follow">
<meta name="PerplexityBot" content="index, follow">
<meta name="bingbot" content="index, follow">
```

## 5. `sitemap.xml`

Auto-generated by the SSG (Astro's `@astrojs/sitemap` integration, or Eleventy's sitemap plugin). No manual authoring needed. Just confirm the integration is installed and `site: "https://hitesh-goel.com"` is set in the site config, since that's what the sitemap generator reads to build absolute URLs.

## 6. Build/deploy pipeline (GitHub Actions → Cloudflare Pages)

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  workflow_dispatch: {}
  # Only include this schedule block if live GitHub star counts are wanted on /projects.
  # Weekly is the ceiling — do not run more often than this.
  schedule:
    - cron: '0 6 * * 1'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: REPLACE_WITH_CLOUDFLARE_PAGES_PROJECT_NAME
          directory: dist
```

Secrets (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`) go in the GitHub repo's Actions secrets, not committed anywhere.

## 7. Bing Webmaster Tools

Verify the domain and submit `https://hitesh-goel.com/sitemap.xml` directly. This is a one-time manual step on Bing's site, not part of the codebase. (IndexNow, which speeds this up further, is a Cloudflare dashboard setting, deferred, see §9.)

## 8. Suggested project structure (Astro)

```
/public
  robots.txt
  llms.txt
/src
  /layouts
    BaseLayout.astro       ← Person schema + AI-crawler meta tags injected here, sitewide
  /pages
    index.astro             ← Home
    about.astro              ← About (hosts the "open to" and AI Learner Group lines)
    faq.astro                 ← FAQ (FAQPage schema only here)
    projects.astro           ← Projects (curated data, not auto-pulled from all repos)
  /content
    /notes                    ← Field Notes as markdown, one file per post
  /data
    projects.json            ← Curated project list, hand-updated when something ships
.github/workflows/build.yml   ← Section 6 above
```

## 9. Deferred — Cloudflare dashboard settings (do later, not part of this build)

These are dashboard toggles Hitesh handles directly once the site is live on Cloudflare Pages, not something Claude Code needs to configure in code:

- Confirm the new Cloudflare Pages project doesn't have "Block AI Bots" or similar bot-management enabled by default (this is exactly what's currently blocking weekendyogi.com). The `robots.txt` in §1 handles the standards-based allow list either way, but Cloudflare's own bot-management layer can override it, so it's worth a quick check after first deploy.
- Set Content-Signal to `search=yes, ai-train=yes, ai-input=yes` if Cloudflare's managed content-signal block appears in the served `robots.txt` (the direct inverse of weekendyogi.com's current `ai-train=no`).
- Enable IndexNow under Cloudflare's Crawlers settings, so new Field Notes reach Bing's index (and therefore ChatGPT Search) quickly.
- Optional: turn on Cloudflare Web Analytics if that's the chosen analytics option from Part 1, §12.

None of this blocks Claude Code's build. It can happen anytime after the first deploy.

**Also out of scope for the build:** the AI Learner Group mentioned on About and FAQ (§3c, question 6) is a manual, human-run process, not a feature. No sign-up form, no automation, no group-creation code. The `mailto:` link already in the copy is the entire mechanism; applications are just replies to that address, reviewed by hand.
