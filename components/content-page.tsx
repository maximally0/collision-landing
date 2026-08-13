import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getPage, getSectionLabel, type Section } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE = "https://www.usecollision.com";

function sectionHref(section: Section): string {
  switch (section) {
    case "alternatives":
      return "/alternatives";
    case "compare":
      return "/compare";
    case "category":
      return "/category";
    case "glossary":
      return "/glossary";
  }
}

function sectionLabel(section: Section): string {
  return getSectionLabel(section);
}

export function makeGenerateStaticParams(section: Section) {
  return async function generateStaticParams() {
    const { getAllPages } = await import("@/lib/content");
    return getAllPages(section).map((p) => ({ slug: p.slug }));
  };
}

export function makeGenerateMetadata(section: Section) {
  return async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const page = getPage(section, slug);
    if (!page) return {};
    const url = `${SITE}${page.targetPath}`;
    return {
      title: page.title,
      description: page.description,
      alternates: { canonical: url },
      openGraph: { title: page.title, description: page.description, url, type: "website" },
      twitter: { card: "summary_large_image", title: page.title, description: page.description },
    };
  };
}

export function ContentPageView({ section, slug }: { section: Section; slug: string }) {
  const page = getPage(section, slug);
  if (!page) return null;
  const url = `${SITE}${page.targetPath}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      headline: page.title,
      description: page.description,
      publisher: { "@type": "Organization", name: "Collision Labs", url: SITE },
      mainEntityOfPage: url,
      keywords: page.tags.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: sectionLabel(section), item: `${SITE}${sectionHref(section)}` },
        { "@type": "ListItem", position: 3, name: page.title, item: url },
      ],
    },
  ];

  return (
    <main className="collision-page min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="bg-paper px-5 pb-24 pt-16 sm:px-7 lg:px-0 lg:pt-24">
        <div className="page-shell max-w-[760px]">
          <nav aria-label="Breadcrumb" className="text-[11px] text-slate">
            <Link href="/" className="hover:text-electric">Home</Link>
            <span className="mx-2">/</span>
            <Link href={sectionHref(section)} className="hover:text-electric">{sectionLabel(section)}</Link>
          </nav>

          <h1 className="mt-6 font-display text-[34px] font-medium leading-[1.1] tracking-[-0.05em] text-ink sm:text-[46px]">
            {page.title}
          </h1>
          {page.description ? (
            <p className="mt-5 text-[17px] leading-7 text-slate">{page.description}</p>
          ) : null}

          {page.verifiedAgainst ? (
            <p className="mt-5 text-[11px] uppercase tracking-[0.12em] text-slate/70">
              {page.verifiedAgainst}
            </p>
          ) : null}

          <div
            className="prose prose-blog mt-10 max-w-none text-[16px] leading-7 text-ink [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:font-display [&_h2]:text-[24px] [&_h2]:font-medium [&_h2]:leading-[1.2] [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:scroll-mt-24 [&_h3]:font-display [&_h3]:text-[19px] [&_h3]:font-medium [&_h3]:text-ink [&_p]:mt-4 [&_p]:text-slate [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-2 [&_li]:text-slate [&_strong]:text-ink [&_a]:text-electric [&_a]:underline [&_a]:underline-offset-2 [&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-ink/10 [&_th]:bg-white [&_th]:p-3 [&_th]:text-left [&_th]:text-[12px] [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-[0.1em] [&_td]:border [&_td]:border-ink/10 [&_td]:p-3 [&_td]:text-[14px] [&_td]:text-slate"
            dangerouslySetInnerHTML={{ __html: page.html }}
          />

          <div className="mt-12 border-t border-ink/10 pt-8">
            <a
              href="https://cal.com/collision"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-electric px-6 text-[12px] font-semibold text-white transition-colors hover:bg-[#1745c2]"
            >
              Meet Collision
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
