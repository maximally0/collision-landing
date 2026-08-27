// ─────────────────────────────────────────────────────────────
// COLLISION · PIXEL VISUAL SLOTS
// Every slot below is a place where YOUR generated pixel art drops in.
// Drop the file at public/assets/pixel/<id>.png and it's ready to wire.
// This file is a reference only — it is NOT rendered on the page.
// ─────────────────────────────────────────────────────────────

export type VisualSlotId =
  | "hero-pixel-backdrop"
  | "brand-mark"
  | "agent-icons-pack"
  | "surface-icons-pack"
  | "vertical-icons-pack"
  | "og-pixel-card"
  | "favicon-pixel"
  | "decor-sprites";

export interface VisualSlot {
  id: VisualSlotId;
  /** Where it sits on the site */
  location: string;
  /** What to generate */
  purpose: string;
  /** The generation brief */
  prompt: string;
}

// Reusable tail that keeps every asset in the same pixel family.
// Paste this onto the end of every prompt so the pack looks cohesive.
const TAIL =
  "8-bit pixel art, hard crisp edges, limited palette of electric blue #3B5BFF, deep space #05070F, black #0A0A0A, white and icy cyan #59D8FF, retro terminal / CRT / cosmic universe aesthetic, no gradients, no soft shadows, single subject, centered, transparent background";

export const VISUAL_SLOTS: VisualSlot[] = [
  {
    id: "hero-pixel-backdrop",
    location: "Hero section (already wired in as a slot)",
    purpose:
      "The full-bleed pixel backdrop behind the hero — replace the animated placeholder or layer on top of it.",
    prompt: `A wide 8-bit pixel-art scene for a brand's AI growth console: a retro computer terminal / command-room horizon, data streams, abstract growth sparkles. ${TAIL}`,
  },
  {
    id: "brand-mark",
    location: "Header brand, footer, favicon family",
    purpose:
      "The animated pixel 'collision' glyph. A pixel star/spark (or collision-impact sprite) on transparent.",
    prompt: `A single pixel-art spark / collision star mark for the wordmark "collision", small glyph, bold silhouette. ${TAIL}`,
  },
  {
    id: "agent-icons-pack",
    location: "The 'How it works' flow + surface cards (replace lucide icons)",
    purpose:
      "A matching set of ~14 pixel icons: goal, research, strategy, create, distribute, learn, adapt, plus the growth surfaces.",
    prompt: `A set of 14 matching 8-bit pixel icons: target, magnifier, brain, pen, send, bar-chart, refresh, globe, plus, mail, megaphone, store, group, spark. ${TAIL}`,
  },
  {
    id: "surface-icons-pack",
    location: "Surfaces grid (currently brand SVG icons)",
    purpose:
      "Optional pixel stand-ins for LinkedIn/X/SEO/AI-search/email/storefront so the grid feels cohesive.",
    prompt: `A set of 12 matching 8-bit pixel channel icons: linkedin, x, search, answer-engine, newsletter, blog, website, email, outbound, paid, storefront, community. ${TAIL}`,
  },
  {
    id: "vertical-icons-pack",
    location: "Brands / vertical cards (future)",
    purpose:
      "Pixel icons for each brand vertical — skincare, supplements, food & bev, apparel, fitness, pet, home.",
    prompt: `A set of 8 matching 8-bit pixel icons for D2C brand verticals: skincare, supplement, coffee, apparel, fitness, pet, home, jewelry. ${TAIL}`,
  },
  {
    id: "og-pixel-card",
    location: "OpenGraph / social share image (1200×630)",
    purpose:
      "The social-share card that carries the pixel identity when links get posted.",
    prompt: `A 1200x630 pixel-art social share card for "Collision — Replace Your Entire Growth Stack", retro terminal scene with a bold pixel star. ${TAIL}`,
  },
  {
    id: "favicon-pixel",
    location: "Favicon / apple-touch-icon / manifest",
    purpose:
      "Tiny pixel version of the brand mark, legible at 16–48px.",
    prompt: `A 48x48 8-bit pixel favicon of the collision spark/star. ${TAIL}`,
  },
  {
    id: "decor-sprites",
    location: "Scattered decoration across sections (optional)",
    purpose:
      "Small pixel sprites (arrow, cursor, sparkle, keycap) to float between sections. The site already ships CSS sparkles; these are extra flavor.",
    prompt: `A small set of 8-bit pixel decorative sprites: cursor arrow, keycap, plus, star, lightning. ${TAIL}`,
  },
];
