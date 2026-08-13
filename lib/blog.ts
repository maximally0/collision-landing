import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import readingTime from "reading-time";

import { getAuthor } from "@/lib/authors";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type Heading = {
  depth: 2 | 3;
  text: string;
  slug: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  authorId: string;
  tags: string[];
  cover?: string;
  readingTime: string;
  wordCount: number;
};

export type BlogPost = BlogPostMeta & {
  html: string;
  headings: Heading[];
};

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const match = /^(##|###)\s+(.*)$/.exec(line.trim());
    if (match) {
      const depth = match[1].length as 2 | 3;
      const text = match[2].trim();
      headings.push({ depth, text, slug: slugifyHeading(text) });
    }
  }
  return headings;
}

function renderMarkdown(content: string): string {
  const renderer = new marked.Renderer();
  const usedSlugs = new Map<string, number>();

  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map((token) => ("text" in token ? token.text : "")).join("");
    let slug = slugifyHeading(text);
    const count = usedSlugs.get(slug) ?? 0;
    usedSlugs.set(slug, count + 1);
    if (count > 0) slug = `${slug}-${count}`;
    const parsedText = marked.parseInline(text, { async: false }) as string;
    return `<h${depth} id="${slug}">${parsedText}</h${depth}>\n`;
  };

  return marked.parse(content, { async: false, renderer }) as string;
}

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function buildMeta(slug: string, data: Record<string, unknown>, content: string): BlogPostMeta {
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    updated: data.updated as string | undefined,
    authorId: (data.authorId as string) ?? "collision-team",
    tags: (data.tags as string[]) ?? [],
    cover: data.cover as string | undefined,
    readingTime: readingTime(content).text,
    wordCount: content.trim().split(/\s+/).length,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = readSlugs();

  const posts = slugs.map((slug) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
    const { data, content } = matter(raw);
    return buildMeta(slug, data, content);
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    ...buildMeta(slug, data, content),
    html: renderMarkdown(content),
    headings: extractHeadings(content),
  };
}

export function getRelatedPosts(current: BlogPostMeta, limit = 3): BlogPostMeta[] {
  const all = getAllPosts().filter((post) => post.slug !== current.slug);

  const scored = all.map((post) => {
    const overlap = post.tags.filter((tag) => current.tags.includes(tag)).length;
    return { post, overlap };
  });

  scored.sort((a, b) => b.overlap - a.overlap || (a.post.date < b.post.date ? 1 : -1));

  return scored.slice(0, limit).map((entry) => entry.post);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export { getAuthor };
