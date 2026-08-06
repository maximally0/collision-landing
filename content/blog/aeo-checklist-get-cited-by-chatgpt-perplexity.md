---
title: "How to Get Cited by ChatGPT and Perplexity: A Practical AEO Checklist"
description: "A grounded, no-fluff checklist for getting your brand cited in AI answer engines — based on Google's own content guidance, not speculation."
date: "2026-06-20"
updated: "2026-06-20"
authorId: "collision-team"
tags: ["AEO", "AI search", "SEO"]
---

"AEO" (answer engine optimization) has become a buzzword fast, and a lot of the advice attached to it is guesswork dressed up as certainty — nobody outside the AI labs knows the exact retrieval mechanics of every answer engine. What we can ground this in is (a) how these systems fundamentally work — retrieval over indexed content, then synthesis — and (b) what Google's own public guidance says about the kind of content it rewards, which is the same guidance that determines whether your content gets indexed and trusted in the first place. Here's the checklist that follows from both.

## 1. Write claims that can be extracted, not just read

An answer engine's core job is pulling specific, verifiable claims out of source content and stitching them into a synthesized answer. A paragraph of brand language gives it nothing to extract.

Compare these two sentences:

- ❌ "We help you grow faster with less effort."
- ✅ "Collision runs research, writing, and distribution for LinkedIn, X, SEO, and email from a single conversation, with every action requiring human approval before it publishes."

The second sentence contains extractable facts: what channels, what process, what constraint. The first contains none. If a model is deciding what to cite when someone asks "what does Collision actually do," only the second sentence survives.

## 2. Match structured data to visible content — always

`Organization`, `SoftwareApplication`, and `FAQPage` JSON-LD give crawlers unambiguous, machine-readable signal about what a page is. Two rules matter more than the schema syntax itself:

- **Never ship schema without a matching visible section.** If you add `FAQPage` markup, there needs to be a real, visible FAQ section a human can read on the same page. Search engines are known to discount structured data that doesn't correspond to what's actually shown to a visitor — and it's a reasonable bet that AI crawlers apply similar skepticism, since the whole point of the markup is to describe reality, not aspiration.
- **Keep it current.** Stale structured data — an old product name, a dead pricing tier, a founder who left — actively damages the trust signal you were trying to build.

## 3. Publish an `llms.txt`

This is the fastest-growing convention specifically for AEO: a plain Markdown file at `/llms.txt` that hands AI crawlers a clean, structured summary instead of making them parse animated marketing copy, cookie banners, and navigation chrome. A good one includes:

- A one-line summary of what you do, in plain language
- A short paragraph on who it's for and what problem it solves
- Key facts: product name, company, contact, social handles
- A list of your important pages with one-line descriptions

It costs almost nothing to maintain and directly improves how accurately a model describes your product when it's asked — which is the whole game in AEO.

## 4. Build genuine topical depth, not one perfect page

A single landing page, no matter how well-optimized, can only carry so much weight in an answer engine's retrieval. A body of specific, well-organized content around your actual area of expertise gives a crawler — and a human researcher doing the same due diligence — more surface area to find and cite the exact claim that answers a specific question. This is also directly aligned with what Google says it rewards: demonstrated depth of knowledge in a subject area, not a single page trying to cover everything.

## 5. Get authorship right

Google's own guidance on helpful content explicitly recommends bylines that lead to real background on the author — not because it's an SEO trick, but because "who wrote this and what do they actually know" is the most basic trust question any reader (human or synthesizing model) has to answer before treating a claim as reliable. If your content has no visible author, no bio, and no way to verify expertise, you're leaving the most direct trust signal on the table.

## 6. Disclose AI assistance where it's material

If AI tools materially helped produce a piece of content, Google's guidance suggests disclosing that where a reader would reasonably want to know — not as a legal formality, but because it answers the "how was this made" question directly. This isn't a penalty signal by default; it's a transparency signal, and transparency is generally rewarded, not punished.

## 7. Keep facts consistent everywhere your brand appears

If your homepage says one thing, your LinkedIn bio says something slightly different, and your `llms.txt` says a third thing, no system — human or AI — has a reliable signal for which version is authoritative. Consistency across your website, your social profiles, and your structured data compounds into a trust signal that a model can actually act on when deciding whether to cite you at all.

## What to skip

Keyword-stuffing an `llms.txt`, generating dozens of thin FAQ pages hoping volume compensates for depth, and chasing every new "AEO hack" post that appears without primary-source grounding are all lower-value than the seven items above. The mechanism hasn't fundamentally changed from good SEO practice — it's the same discipline (be specific, be structured, be consistent, be honest about authorship) applied to a reader that summarizes instead of ranks.
