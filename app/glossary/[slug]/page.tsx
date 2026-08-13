import { ContentPageView, makeGenerateMetadata, makeGenerateStaticParams } from "@/components/content-page";

export const generateStaticParams = makeGenerateStaticParams("glossary");
export const generateMetadata = makeGenerateMetadata("glossary");

export default async function GlossaryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ContentPageView section="glossary" slug={slug} />;
}
