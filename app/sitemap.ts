import type { MetadataRoute } from "next";

import { getAllPosts, getAllTags } from "@/lib/blog";
import { getAllPages, SECTIONS } from "@/lib/content";

const SITE = "https://www.usecollision.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();
  const sections = SECTIONS.flatMap((section) =>
    getAllPages(section).map((page) => ({
      url: `${SITE}${page.targetPath}`,
      lastModified: new Date(page.updated ?? page.date),
      changeFrequency: "weekly" as const,
      priority: section === "alternatives" || section === "compare" ? 0.8 : 0.6,
    })),
  );

  return [
    {
      url: `${SITE}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...tags.map((tag) => ({
      url: `${SITE}/blog/tag/${encodeURIComponent(tag)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.3,
    })),
    ...sections,
  ];
}
