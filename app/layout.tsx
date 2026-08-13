import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
  metadataBase: new URL("https://www.usecollision.com"),
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
    url: "https://www.usecollision.com",
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
    canonical: "https://www.usecollision.com",
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
    url: "https://www.usecollision.com",
    logo: "https://www.usecollision.com/favicon-96x96.png",
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
    url: "https://www.usecollision.com",
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
      <body className={`${dmSans.variable} ${lora.variable}`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
