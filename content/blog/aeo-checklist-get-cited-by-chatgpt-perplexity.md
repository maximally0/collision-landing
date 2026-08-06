---
title: "How to Get Cited by ChatGPT and Perplexity: An AEO Checklist"
description: "A practical checklist for getting your brand cited in AI answer engines like ChatGPT, Perplexity, and Google AI Overviews — not just ranked on Google."
date: "2026-06-20"
author: "Collision Labs"
tags: ["AEO", "AI search", "SEO"]
---

Ranking #1 on Google used to be the whole game. Now there's a second scoreboard: does ChatGPT, Perplexity, or Google AI Overviews cite you when someone asks a question in your category? Getting cited there requires a different playbook than classic SEO. Here's the checklist we use.

## 1. Write for extraction, not just for reading

AI answer engines pull specific claims out of your content to synthesize an answer. A paragraph of vague brand language ("we're the leading solution for modern teams") gives a model nothing to extract. A concrete claim — a number, a mechanism, a named comparison — gives it something to cite.

Rewrite soft claims into specific ones:

- ❌ "We help you grow faster."
- ✅ "Collision runs research, writing, and distribution across LinkedIn, X, SEO, and email from a single conversation."

## 2. Ship structured data that matches your visible content

`Organization`, `SoftwareApplication`, and `FAQPage` JSON-LD give crawlers unambiguous signal about what your page is. Two rules matter more than the schema itself:

- **Match it to something visible.** Don't add `FAQPage` schema without a real FAQ section on the page — search engines discount structured data that doesn't correspond to what a visitor actually sees.
- **Keep it current.** Stale structured data (an old product name, a dead pricing tier) actively hurts trust signals.

## 3. Publish a `llms.txt`

This is the fastest-growing convention in AEO: a plain Markdown file at `/llms.txt` that hands AI crawlers a clean summary instead of making them parse animated marketing copy. Include:

- A one-line summary of what you do
- Key facts (product, company, contact, socials)
- A list of your important pages

It costs almost nothing to add and directly improves how accurately a model describes your product when asked.

## 4. Build genuine topical depth

A single landing page can only carry so much weight. A body of specific, well-organized content — like this blog — gives an AI crawler (and a human researcher) more surface area to find and cite the exact claim that answers someone's question. Depth beats a single perfectly-optimized page.

## 5. Keep facts consistent everywhere

If your homepage says one thing and your LinkedIn bio says another, a model has no reliable signal for which is true — and it'll hedge or skip you. Consistency across your website, socials, and structured data compounds into trust an AI system can act on.

## The takeaway

AEO isn't a new set of tricks bolted onto SEO. It's the same discipline — say something specific, structure it clearly, keep it consistent — applied to a new kind of reader that summarizes instead of ranks.
