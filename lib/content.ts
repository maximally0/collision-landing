import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Section = "alternatives" | "compare" | "category" | "glossary";

export const SECTIONS: Section[] = ["alternatives", "compare", "category", "glossary"];

export type PageMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  targetPath: string;
  pageType: string;
  entity: string;
  verifiedAgainst?: string;
};

export type ContentPage = PageMeta & {
  html: string;
};

function sectionDir(section: Section): string {
  return path.join(process.cwd(), "content", section);
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
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
    const anchor = `<a class="heading-anchor" href="#${slug}" aria-hidden="true">#</a>`;
    return `<h${depth} id="${slug}">${text}${anchor}</h${depth}>\n`;
  };
  return marked.parse(content, { async: false, renderer }) as string;
}

export function getAllPages(section: Section): ContentPage[] {
  const dir = sectionDir(section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const { data, content } = matter(raw);
      const slug = f.replace(/\.md$/, "");
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "",
        updated: data.updated ?? undefined,
        tags: Array.isArray(data.tags) ? data.tags : [],
        targetPath: data.target_path ?? `/${section}/${slug}`,
        pageType: data.page_type ?? "",
        entity: data.entity ?? "",
        verifiedAgainst: data.verified_against ?? undefined,
        html: renderMarkdown(content),
      } as ContentPage;
    })
    .sort((a, b) => (a.title < b.title ? -1 : 1));
}

export function getPage(section: Section, slug: string): ContentPage | undefined {
  return getAllPages(section).find((p) => p.slug === slug);
}

export function getSectionLabel(section: Section): string {
  switch (section) {
    case "alternatives":
      return "Alternatives";
    case "compare":
      return "Comparisons";
    case "category":
      return "Guides";
    case "glossary":
      return "Glossary";
  }
}
