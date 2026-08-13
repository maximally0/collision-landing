import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getAllPages, getSectionLabel, type Section } from "@/lib/content";

export function SectionIndex({ section }: { section: Section }) {
  const pages = getAllPages(section);
  return (
    <main className="collision-page min-h-screen">
      <nav className="border-b border-ink/10 bg-paper" aria-label="Section navigation">
        <div className="page-shell flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-3 text-ink" aria-label="Back to home">
            <span className="font-display text-[16px] font-semibold tracking-[-0.04em]">collision.</span>
          </Link>
        </div>
      </nav>
      <div className="bg-paper px-5 pb-24 pt-16 sm:px-7 lg:px-0 lg:pt-24">
        <div className="page-shell max-w-[760px]">
          <nav aria-label="Breadcrumb" className="text-[11px] text-slate">
            <Link href="/" className="hover:text-electric">Home</Link>
            <span className="mx-2">/</span>
            <span>{getSectionLabel(section)}</span>
          </nav>
          <h1 className="mt-6 font-display text-[34px] font-medium leading-[1.1] tracking-[-0.05em] text-ink sm:text-[46px]">
            {getSectionLabel(section)}
          </h1>
          <p className="mt-5 text-[16px] leading-7 text-slate">
            {pages.length} pages — researched and verified from Collision&apos;s competitive intelligence database.
          </p>
          <div className="mt-10 grid gap-4">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={page.targetPath}
                className="group rounded-2xl border border-ink/10 bg-white p-6 transition-colors hover:border-electric/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-[19px] leading-[1.25] text-ink transition-colors group-hover:text-electric">
                    {page.title}
                  </h2>
                  <ArrowRight className="size-4 shrink-0 text-slate transition-colors group-hover:text-electric" aria-hidden="true" />
                </div>
                {page.description ? (
                  <p className="mt-2 text-[13px] leading-6 text-slate">{page.description}</p>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
