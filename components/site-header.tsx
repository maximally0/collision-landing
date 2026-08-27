import Link from "next/link";
import { PixelMark } from "./pixel";

const NAV = [
  { href: "/alternatives", label: "Alternatives" },
  { href: "/compare", label: "Compare" },
  { href: "/category", label: "Guides" },
  { href: "/glossary", label: "Glossary" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="page-shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-ink" aria-label="Collision home">
          <PixelMark className="size-4 text-ink" />
          <span className="font-display text-[17px] font-semibold tracking-[-0.04em]">collision.</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-slate transition-colors hover:text-electric"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href="https://cal.com/collision"
          target="_blank"
          rel="noopener noreferrer"
          className="glitch-hover inline-flex h-9 items-center rounded-md bg-electric px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#6b8cff] hover:text-[#0a0a0a]"
        >
          Meet Collision
        </a>
      </div>
    </header>
  );
}
