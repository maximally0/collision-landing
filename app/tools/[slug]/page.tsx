import { ContentPageView, makeGenerateMetadata, makeGenerateStaticParams } from "@/components/content-page";

export const generateStaticParams = makeGenerateStaticParams("tools");
export const generateMetadata = makeGenerateMetadata("tools");

export default async function ToolsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ContentPageView section="tools" slug={slug} />;
}
