import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getAllTags, getPostsByTag } from "@/lib/blog";

type Props = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `${decoded} — Blog`,
    description: `Posts tagged "${decoded}" from the Collision blog.`,
    alternates: { canonical: `https://www.usecollision.com/blog/tag/${tag}` },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (!posts.length) notFound();

  return (
    <main className="collision-page min-h-screen">
      <nav className="border-b border-ink/10 bg-paper" aria-label="Blog navigation">
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

      <section className="bg-paper px-5 pb-20 pt-16 sm:px-7 lg:px-0 lg:pt-24">
        <div className="page-shell max-w-[820px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-electric">Tag</p>
          <h1 className="mt-5 font-display text-[34px] font-medium leading-[1.06] tracking-[-0.05em] text-ink sm:text-[44px]">
            {decoded}
          </h1>

          <div className="mt-12 divide-y divide-ink/12 border-y border-ink/15">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col gap-2 py-8 hover:bg-white/40">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate">
                  {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  {" · "}
                  {post.readingTime}
                </p>
                <h2 className="font-display text-[22px] leading-[1.2] text-ink transition-colors group-hover:text-electric">
                  {post.title}
                </h2>
                <p className="max-w-[600px] text-[14px] leading-6 text-slate">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
