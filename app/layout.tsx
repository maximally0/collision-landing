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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Collision — The AI that represents you online",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@usecollision",
    creator: "@usecollision",
    title: "Collision — The AI that represents you online",
    description: siteDescription,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${fraunces.variable}`}>{children}</body>
    </html>
  );
}
