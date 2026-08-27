# Pixel assets — drop-in folder

Drop your generated pixel art here, one file per asset. The full manifest and
the image-gen brief for every slot live in `lib/visual-assets.ts`.

| id | file | where it's used |
|---|---|---|
| hero-pixel-backdrop | `hero-pixel-backdrop.png` | Hero (slot already wired) |
| brand-mark | `brand-mark.png` | Header brand, footer, favicon family |
| agent-icons-pack | `agent-icons-pack.png` | "How it works" flow + surface cards |
| surface-icons-pack | `surface-icons-pack.png` | Surfaces grid |
| vertical-icons-pack | `vertical-icons-pack.png` | Brand verticals |
| og-pixel-card | `og-pixel-card.png` | Social share (1200×630) |
| favicon-pixel | `favicon-pixel.png` | Favicon / touch icon |
| decor-sprites | `decor-sprites.png` | Optional decoration |

## Prompt tail (paste on every prompt so the pack matches)

> 8-bit pixel art, hard crisp edges, limited palette of electric blue #3B5BFF,
> deep space #05070F, black #0A0A0A, white and icy cyan #59D8FF, retro
> terminal / CRT / cosmic universe aesthetic, no gradients, no soft shadows,
> single subject, centered, transparent background

## Notes

- The site ships a CSS/phosphor pixel backdrop + scanlines + sparkles by default,
  so it already looks "pixel" before you add art. Generated art layers on top.
- Real integration logos (Shopify, Klaviyo, Meta, Google, TikTok) — never
  generate them; use official SVGs.
- If a slot already has a live placeholder, just overwrite the file / delete the
  dashed `PixelSlot` box and it's wired.
