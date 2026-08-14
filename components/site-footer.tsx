import Link from "next/link";

const EXPLORE = [
  { href: "/alternatives", label: "Alternatives", note: "Every competitor, honestly compared" },
  { href: "/compare", label: "Compare", note: "Collision vs the market" },
  { href: "/category", label: "Guides", note: "AI marketing, GEO, AEO, AI CMO" },
  { href: "/glossary", label: "Glossary", note: "The category, defined" },
  { href: "/tools", label: "Tools", note: "The AI marketing pricing index" },
  { href: "/integrations", label: "Integrations", note: "Works where your stack lives" },
  { href: "/blog", label: "Blog", note: "Growth thinking from the team" },
];

const POPULAR = [
  { href: "/category/best-ai-cmo-tools", label: "Best AI CMO tools" },
  { href: "/category/ai-cmo", label: "What is an AI CMO?" },
  { href: "/category/geo", label: "What is GEO?" },
  { href: "/category/aeo", label: "What is AEO?" },
  { href: "/alternatives/okara", label: "Okara alternatives" },
  { href: "/alternatives/jasper", label: "Jasper alternatives" },
  { href: "/category/ai-seo-agent", label: "AI SEO agents" },
  { href: "/compare/collision-vs-okara", label: "Collision vs Okara" },
];

const COMPANY = [
  { href: "https://cal.com/collision", label: "Meet Collision" },
  { href: "/contact", label: "Contact" },
  { href: "https://x.com/usecollision", label: "X" },
  { href: "https://linkedin.com/company/usecollision", label: "LinkedIn" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="page-shell px-5 py-14 sm:px-7 lg:px-0">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-display text-[22px] tracking-[-0.05em] text-ink">
              collision.
            </Link>
            <p className="mt-3 max-w-[260px] text-[13px] leading-6 text-slate">
              The AI you hire to run growth. One intelligence, one memory, every surface — approval-based.
            </p>
            <p className="mt-4 text-[11px] leading-5 text-slate/70">
              Competitor pages are data-verified from Collision&apos;s competitive intelligence database.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate">Explore</p>
            <ul className="mt-4 space-y-3">
              {EXPLORE.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group block">
                    <span className="text-[13px] font-medium text-ink transition-colors group-hover:text-electric">
                      {item.label}
                    </span>
                    <span className="block text-[11px] text-slate/70">{item.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate">Popular</p>
            <ul className="mt-4 space-y-3">
              {POPULAR.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13px] text-slate transition-colors hover:text-electric">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate">Company</p>
            <ul className="mt-4 space-y-3">
              {COMPANY.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[13px] text-slate transition-colors hover:text-electric"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-ink/10 pt-6 text-[11px] text-slate/70 sm:flex-row sm:items-center">
          <span>© 2026 Collision Labs. All rights reserved.</span>
          <span>Researched, compared and verified — not scraped.</span>
        </div>
      </div>
    </footer>
  );
}
