import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getAllPosts, getAuthor, getPostBySlug, getRelatedPosts } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `https://www.usecollision.com/blog/${slug}`;
  const author = getAuthor(post.authorId);

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthor(post.authorId);
  const related = getRelatedPosts(post);
  const url = `https://www.usecollision.com/blog/${slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      wordCount: post.wordCount,
      author: {
        "@type": "Person",
        name: author.name,
        description: author.bio,
        url: author.url,
      },
      publisher: {
        "@type": "Organization",
        name: "Collision Labs",
        url: "https://www.usecollision.com",
        logo: "https://www.usecollision.com/favicon-96x96.png",
      },
      mainEntityOfPage: url,
      keywords: post.tags.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.usecollision.com" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.usecollision.com/blog" },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <main className="collision-page min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="border-b border-ink/10 bg-paper" aria-label="Blog post navigation">
        <div className="page-shell flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-3 text-ink" aria-label="Back to home">
            <span className="font-display text-[16px] font-semibold tracking-[-0.04em]">collision.</span>
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[12px] font-medium text-slate transition-colors hover:text-electric"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            All posts
          </Link>
        </div>
      </nav>

      <article className="bg-paper px-5 pb-24 pt-16 sm:px-7 lg:px-0 lg:pt-24">
        <div className="page-shell max-w-[720px]">
          <nav aria-label="Breadcrumb" className="text-[11px] text-slate">
            <Link href="/" className="hover:text-electric">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-electric">Blog</Link>
          </nav>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            {" · "}
            {post.readingTime}
          </p>
          <h1 className="mt-5 font-display text-[34px] font-medium leading-[1.1] tracking-[-0.05em] text-ink sm:text-[46px]">
            {post.title}
          </h1>

          {/* Author byline */}
          <div className="mt-6 flex items-center gap-3 border-y border-ink/10 py-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-electric/10 font-display text-[15px] text-electric">
              {author.name.slice(0, 1)}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-ink">{author.name}</p>
              <p className="text-[11px] text-slate">{author.role}</p>
            </div>
          </div>

          {post.tags.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="rounded-full bg-cyan-surface px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-electric transition-colors hover:bg-electric hover:text-white"
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : null}

          {post.headings.length ? (
            <nav aria-label="Table of contents" className="mt-10 rounded-2xl border border-ink/10 bg-white p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate">On this page</p>
              <ul className="mt-3 space-y-2">
                {post.headings.map((heading) => (
                  <li key={heading.slug} className={heading.depth === 3 ? "ml-4" : ""}>
                    <a href={`#${heading.slug}`} className="text-[13px] text-ink/80 hover:text-electric">
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <div
            className="prose prose-blog mt-10 max-w-none text-[16px] leading-7 text-ink [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:font-display [&_h2]:text-[24px] [&_h2]:font-medium [&_h2]:leading-[1.2] [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:scroll-mt-24 [&_h3]:font-display [&_h3]:text-[19px] [&_h3]:font-medium [&_h3]:text-ink [&_p]:mt-4 [&_p]:text-slate [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-2 [&_li]:text-slate [&_strong]:text-ink [&_a]:text-electric [&_a]:underline [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* Author bio card */}
          <div className="mt-14 rounded-2xl border border-ink/10 bg-white p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate">Written by</p>
            <p className="mt-2 font-display text-[19px] text-ink">{author.name}</p>
            <p className="mt-2 text-[14px] leading-6 text-slate">{author.bio}</p>
          </div>

          <div className="mt-10 border-t border-ink/10 pt-8">
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

          {related.length ? (
            <div className="mt-16 border-t border-ink/10 pt-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate">Related reading</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {related.map((item) => (
                  <Link key={item.slug} href={`/blog/${item.slug}`} className="group">
                    <p className="font-display text-[16px] leading-[1.25] text-ink transition-colors group-hover:text-electric">
                      {item.title}
                    </p>
                    <p className="mt-2 text-[12px] text-slate">{item.readingTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </article>

      <footer className="border-t border-ink/10 bg-paper px-5 py-8 sm:px-7 lg:px-0">
        <div className="page-shell flex flex-col justify-between gap-5 text-[11px] text-slate sm:flex-row sm:items-center">
          <Link href="/" className="font-display text-[20px] tracking-[-0.05em] text-ink">
            collision.
          </Link>
          <span>© 2026 Collision Labs</span>
        </div>
      </footer>
    </main>
  );
}
