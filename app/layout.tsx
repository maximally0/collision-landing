import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collision — Replace Your Entire Growth Stack",
  description:
    "Collision is the AI that can replace your entire growth stack. One intelligence that researches, writes, distributes, and learns across every surface your business depends on.",
  metadataBase: new URL("https://usecollision.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Collision — Replace Your Entire Growth Stack",
    description:
      "One AI growth intelligence that researches, writes, distributes, and learns across every surface your business depends on.",
    url: "https://usecollision.com",
    siteName: "Collision",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Collision — Replace Your Entire Growth Stack",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Collision — Replace Your Entire Growth Stack",
    description:
      "One AI growth intelligence that researches, writes, distributes, and learns across every surface your business depends on.",
    images: ["/og-image.png"],
    site: "@usecollision",
    creator: "@usecollision",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://usecollision.com",
  },
  other: {
    "linkedin:company": "usecollision",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Collision",
    legalName: "Collision Labs",
    url: "https://usecollision.com",
    logo: "https://usecollision.com/favicon-96x96.png",
    description:
      "Collision is the AI you hire to run growth — one growth intelligence that researches, writes, distributes, and learns across every surface a business depends on.",
    sameAs: [
      "https://x.com/usecollision",
      "https://linkedin.com/company/usecollision",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Collision",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://usecollision.com",
    description:
      "Collision is a single growth intelligence that owns reach (LinkedIn, X, SEO, AI search), content (blogs, newsletters, landing pages), revenue (email, outbound, storefront), and intelligence (competitor research, positioning, analytics, growth experiments).",
    offers: {
      "@type": "Offer",
      category: "Subscription",
      url: "https://cal.com/collision",
    },
    publisher: {
      "@type": "Organization",
      name: "Collision Labs",
    },
  },
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${lora.variable}`}>{children}</body>
    </html>
  );
}
