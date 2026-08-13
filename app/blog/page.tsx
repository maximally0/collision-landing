import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Growth, AI Search & GTM — Collision Blog",
  description:
    "Ideas on growth, AI search, and building a coherent growth motion — from the team behind Collision.",
  alternates: {
    canonical: "https://www.usecollision.com/blog",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="collision-page min-h-screen">
      <section className="bg-paper px-5 pb-20 pt-16 sm:px-7 lg:px-0 lg:pt-24">
        <div className="page-shell max-w-[820px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-electric">The blog</p>
          <h1 className="mt-5 font-display text-[38px] font-medium leading-[1.06] tracking-[-0.05em] text-ink sm:text-[52px]">
            Ideas on growth, from Collision.
          </h1>
          <p className="mt-5 max-w-[560px] text-[16px] leading-7 text-slate">
            Notes on AI search, distribution, and what it actually takes to run growth as one coherent
            system instead of ten disconnected tools.
          </p>

          <div className="mt-14 divide-y divide-ink/12 border-y border-ink/15">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-8 transition-colors hover:bg-white/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate">
                    {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    {" · "}
                    {post.readingTime}
                  </p>
                  <h2 className="mt-2 font-display text-[24px] leading-[1.2] text-ink transition-colors group-hover:text-electric sm:text-[28px]">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-[600px] text-[14px] leading-6 text-slate">{post.description}</p>
                  {post.tags.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-cyan-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-electric">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <ArrowRight className="hidden size-5 shrink-0 text-electric opacity-0 transition-opacity group-hover:opacity-100 sm:block" aria-hidden="true" />
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
