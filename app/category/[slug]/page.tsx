import { ContentPageView, makeGenerateMetadata, makeGenerateStaticParams } from "@/components/content-page";

export const generateStaticParams = makeGenerateStaticParams("category");
export const generateMetadata = makeGenerateMetadata("category");

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ContentPageView section="category" slug={slug} />;
}
