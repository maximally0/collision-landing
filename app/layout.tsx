import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://usecollision.com";
const siteName = "Collision";
const siteDescription =
  "Collision is the AI that represents you online. It writes, replies, engages, and keeps your online presence alive while you're busy doing real work.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Collision — The AI that represents you online",
    template: "%s | Collision",
  },
  description: siteDescription,
  keywords: [
    "Collision",
    "AI teammate",
    "online presence",
    "AI agent",
    "content creation",
    "social media AI",
    "founders",
    "internet teammate",
    "autonomous AI",
  ],
  authors: [{ name: "Collision Labs" }],
  creator: "Collision Labs",
  publisher: "Collision Labs",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Collision — The AI that represents you online",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: "@usecollision",
    creator: "@usecollision",
    title: "Collision — The AI that represents you online",
    description: siteDescription,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    legalName: "Collision Labs",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description: siteDescription,
    email: "hi@usecollision.com",
    sameAs: [
      "https://x.com/usecollision",
      "https://www.linkedin.com/company/usecollision",
      "https://instagram.com/usecollision",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description: siteDescription,
    offers: {
      "@type": "Offer",
      category: "Subscription",
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
          text: "Collision is an AI teammate that represents founders and builders online. It writes, replies, engages, and keeps your online presence alive while you focus on building.",
        },
      },
      {
        "@type": "Question",
        name: "How does Collision work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You connect your profiles and Collision learns your voice, humor, and expertise. Then you talk to it naturally in plain English about what matters that day, and it handles the replies, posting, and growth for you.",
        },
      },
      {
        "@type": "Question",
        name: "Who is Collision for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Collision is built for founders and builders who want a consistent, authentic online presence without spending their day writing posts and replying to comments and DMs.",
        },
      },
      {
        "@type": "Question",
        name: "Does Collision sound like a generic AI bot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Collision learns your voice, goals, and opinions first, so the posts and replies it writes sound like you, not a content machine.",
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${fraunces.variable}`}>{children}</body>
    </html>
  );
}
