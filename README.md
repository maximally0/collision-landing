# Collision — Landing Page

The marketing landing page for **Collision**, a software being that thinks, remembers, and works across your entire stack.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Styling:** Tailwind CSS 4 + custom CSS
- **Animations:** Motion (Framer Motion)
- **UI Components:** shadcn/ui
- **Typography:** Space Grotesk + JetBrains Mono
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
│   ├── globals.css        # Global styles, section layouts, responsive breakpoints
│   ├── layout.tsx         # Root layout with fonts
│   └── page.tsx           # Home page entry
├── components/
│   ├── collision-landing.tsx  # Main landing page component
│   └── ui/                    # shadcn/ui primitives (Button, Input)
├── lib/
│   ├── collision-content.ts   # Static content data (integrations, logs, etc.)
│   └── utils.ts               # Utility functions (cn)
└── public/                    # Static assets
```

## Sections

1. **Hero** — Title, subtitle, CTAs, and abstract network visual
2. **The Shift** — Before/after comparison of legacy vs. Collision
3. **One Being, Infinite Roles** — Role flexibility showcase
4. **Connect Everything** — Integration grid with 8 connected tools
5. **Memory** — Persistent memory graph visualization
6. **It Has Hands** — Live execution stream demo
7. **Waitlist** — CTA to join early access

## License

Private — © 2026 Collision Labs Inc.
