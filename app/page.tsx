import CollisionLanding from "@/components/collision-landing";

const faqJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Collision?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Collision is the AI you hire to run growth. It's a single growth intelligence that researches, writes, distributes, and learns across every surface your business depends on — replacing a scattered growth stack of separate tools and freelancers.",
        },
      },
      {
        "@type": "Question",
        name: "What can Collision own?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Reach (LinkedIn, X, SEO, and AI search like ChatGPT, Perplexity, Google AI Overviews, and Gemini), content (blogs, newsletters, landing pages, website copy, product launches), revenue (Gmail, email campaigns, outbound, storefront growth, community distribution), and intelligence (competitor research, positioning, messaging, analytics, growth strategy and experiments).",
        },
      },
      {
        "@type": "Question",
        name: "How do I work with Collision?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You talk to Collision in plain English about the outcome you want — like 'grow our LinkedIn' or 'launch our product' — and it researches, plans, writes, and distributes across the right channels. Every action is approval-based, so nothing ships without you.",
        },
      },
      {
        "@type": "Question",
        name: "Is Collision replacing my marketing team or just another tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Collision isn't another point tool. It's one intelligence with one memory and one source of truth that sees the full picture and makes decisions across every growth surface, the way a Head of Growth would.",
        },
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CollisionLanding />
    </>
  );
}
