import { ContentPageView, makeGenerateMetadata, makeGenerateStaticParams } from "@/components/content-page";

export const generateStaticParams = makeGenerateStaticParams("compare");
export const generateMetadata = makeGenerateMetadata("compare");

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ContentPageView section="compare" slug={slug} />;
}
