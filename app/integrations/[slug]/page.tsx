import { ContentPageView, makeGenerateMetadata, makeGenerateStaticParams } from "@/components/content-page";

export const generateStaticParams = makeGenerateStaticParams("integrations");
export const generateMetadata = makeGenerateMetadata("integrations");

export default async function IntegrationsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ContentPageView section="integrations" slug={slug} />;
}
