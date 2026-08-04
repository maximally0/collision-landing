# Collision — The AI that represents you online

Marketing landing page for [Collision](https://usecollision.com) — an AI teammate that writes, replies, engages, and keeps your online presence alive while you focus on building.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Styling:** Tailwind CSS 4 + custom CSS (neo-brutalist / comic design system)
- **Animations:** Motion (Framer Motion)
- **UI Components:** shadcn/ui
- **Typography:** DM Sans + Fraunces (display)
- **Package Manager:** pnpm

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
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/
│   ├── globals.css          # Design system tokens, component styles, responsive breakpoints
│   ├── layout.tsx           # Root layout with SEO metadata, fonts, OG tags
│   ├── page.tsx             # Home page entry
│   ├── robots.ts            # robots.txt generation
│   └── sitemap.ts           # sitemap.xml generation
├── components/
│   ├── collision-landing.tsx # Full landing page (single-file component)
│   └── ui/                  # shadcn/ui primitives (Button, Input)
├── lib/
│   ├── collision-content.ts # Static content data
│   └── utils.ts             # Utility functions (cn)
└── public/
    ├── collision-helmet.png # Mascot/logo asset
    ├── icon.svg             # Favicon
    └── og-image.png         # Social sharing preview (1200×630) — YOU MUST ADD THIS
```

## Sections

1. **Hero** — "The AI that represents you online" with comic-style split layout
2. **The Internet Problem** — Before/after visual comparison
3. **Capabilities** — Think, Create, Engage, Grow cards
4. **Conversation** — Chat-style interaction demo
5. **Meet Collision** — Mascot introduction with personality
6. **How It Works** — Three-step onboarding flow
7. **Today vs Tomorrow** — Transparency section (AI + humans → full autonomy)
8. **Final CTA** — Become a Client conversion section

## SEO & Social

- Open Graph meta tags for rich link previews
- Twitter Card (summary_large_image) for X/Twitter sharing
- Auto-generated `sitemap.xml` and `robots.txt`
- Structured metadata with keywords and authorship

## Missing Assets (add before launch)

- [ ] `public/og-image.png` — Social sharing preview image (1200×630px)

## Links

- **Website:** [usecollision.com](https://usecollision.com)
- **Twitter/X:** [@usecollision](https://x.com/usecollision)
- **LinkedIn:** [usecollision](https://linkedin.com/company/usecollision)
- **Instagram:** [@usecollision](https://instagram.com/usecollision)
- **Email:** hi@usecollision.com

## License

Private — © 2026 Collision Labs Inc.
