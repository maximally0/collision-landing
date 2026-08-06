import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getAllPosts, getPostBySlug } from "@/lib/blog";

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

  const url = `https://usecollision.com/blog/${slug}`;

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
      authors: [post.author],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Collision Labs" },
    mainEntityOfPage: `https://usecollision.com/blog/${slug}`,
  };

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
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            {" · "}
            {post.readingTime}
            {" · "}
            {post.author}
          </p>
          <h1 className="mt-5 font-display text-[34px] font-medium leading-[1.1] tracking-[-0.05em] text-ink sm:text-[46px]">
            {post.title}
          </h1>
          {post.tags.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-cyan-surface px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-electric">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div
            className="prose prose-blog mt-10 max-w-none text-[16px] leading-7 text-ink [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[24px] [&_h2]:font-medium [&_h2]:leading-[1.2] [&_h2]:text-ink [&_p]:mt-4 [&_p]:text-slate [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-2 [&_li]:text-slate [&_strong]:text-ink"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="mt-14 border-t border-ink/10 pt-8">
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
