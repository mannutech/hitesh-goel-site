---
title: A Claude Code status bar that shows your PRs instead of a spinner
description: Building ContextSpin, an open-source plugin that swaps Claude Code's spinner for live context, and what it taught me about attention.
pubDate: 2026-07-11
---

A Claude Code spinner is the one thing on your screen that's paid to tell you nothing, so I replaced it. ContextSpin is an open-source plugin that swaps the default status bar (model name, token count) for live context: open PRs, CI status, Slack mentions, whatever tools you already have connected. One line to install, runs locally, no daemon, no keys of its own. It's a renderer, not a service.

I barely wrote it by hand. I directed Claude Code, rotated between models when one got stuck, and iterated across nine small releases until it behaved the way I wanted. It began as a weekend itch. I kept glancing at a spinning cursor while the actual thing I wanted to know was one API call away, and it turned into something I now keep open all day.

**The honest takeaway:** the interesting part was never the code, which was mostly the model's. It was noticing how much attention a spinner quietly costs you when the information you actually want is already sitting in a tool you're paying for.

The code is on GitHub: [mannutech/contextspin](https://github.com/mannutech/contextspin).
