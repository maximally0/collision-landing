# Collision — Marketing Site

Marketing landing page for [Collision](https://usecollision.com) — the AI you hire to run growth. Collision is a single growth intelligence that researches, writes, distributes, and learns across every surface a business depends on (LinkedIn, X, SEO, AI search, email, outbound, and more), approval-based so nothing ships without a human sign-off.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Styling:** Tailwind CSS 4 + custom CSS design tokens
- **Animations:** Motion (Framer Motion)
- **UI Components:** shadcn/ui + Base UI
- **Typography:** DM Sans + Lora (display)
- **Blog:** Markdown files (`content/blog/*.md`) rendered via `gray-matter` + `marked`, statically generated
- **Package Manager:** pnpm

## Project Structure

```
app/
  page.tsx              # Homepage (renders components/collision-landing.tsx)
  layout.tsx            # Root layout, metadata, JSON-LD structured data
  contact/               # Contact page
  blog/
    page.tsx            # Blog index
    [slug]/page.tsx      # Individual blog post (statically generated from content/blog)
  opengraph-image.tsx   # Dynamic OG image (next/og)
  robots.ts             # robots.txt
  sitemap.ts            # sitemap.xml (includes all blog posts)
content/
  blog/*.md             # Blog posts as Markdown with frontmatter (title, description, date, author, tags)
components/
  collision-landing.tsx # All homepage sections (hero, ownership, FAQ, proof, CTA, footer, etc.)
  ui/                    # shadcn/ui primitives (button, input, badge)
lib/
  collision-content.ts  # Homepage copy/content data (nav links, FAQ items, ownership rows, etc.)
  blog.ts                # Markdown blog post loader (frontmatter parsing, HTML rendering)
  utils.ts                # cn() className helper
public/
  llms.txt               # AEO summary for LLM crawlers (ChatGPT, Perplexity, Claude, etc.)
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Adding a blog post

Create a new Markdown file in `content/blog/` with frontmatter:

```md
---
title: "Post title"
description: "One-sentence summary used for meta description and previews."
date: "2026-01-01"
updated: "2026-01-01"
authorId: "collision-team"
tags: ["growth", "product"]
---

## A real heading

Post body in Markdown. Use `##`/`###` headings — they're automatically
extracted into a table of contents and get stable anchor IDs.
```

The slug is the filename (without `.md`). New posts are picked up automatically by the blog index, the individual post route, tag pages, related-posts, and `sitemap.ts` — no code changes needed. Author profiles (name, role, bio) live in `lib/authors.ts`; add a new entry there before referencing a new `authorId`.

**Writing bar:** posts should be genuinely researched and specific — real mechanisms, named frameworks, primary-source claims — not generic filler. Google's own [helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) is explicit that word count is not a ranking factor, but that depth, first-hand expertise, and clear authorship are what the ranking systems actually reward. Aim for posts that would genuinely change how a founder thinks about a problem, not posts that just hit a word count.

## SEO / AEO

- `app/robots.ts` and `app/sitemap.ts` generate `robots.txt` / `sitemap.xml` at build time.
- `app/layout.tsx` includes JSON-LD structured data (`Organization`, `SoftwareApplication`, `FAQPage`).
- Each blog post includes `BlogPosting` JSON-LD and per-post Open Graph metadata.
- `public/llms.txt` gives AI crawlers a clean, structured summary of the product.
- The homepage FAQ section (`#faq`) has visible content matching the `FAQPage` schema — required so structured data isn't discounted.

## Deployment

Production deploys automatically via Vercel on push to `main`.
