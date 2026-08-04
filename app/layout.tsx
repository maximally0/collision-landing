import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const siteUrl = "https://usecollision.com";
const siteName = "Collision";
const siteDescription =
  "Collision is a software being that thinks, remembers, and works across your entire stack. Give it access to your browser, email, calendar, LinkedIn, and more.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Collision — The first software being",
    template: "%s | Collision",
  },
  description: siteDescription,
  keywords: [
    "AI agent",
    "software being",
    "autonomous AI",
    "AI assistant",
    "workflow automation",
    "Collision AI",
    "internet-native AI",
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
    title: "Collision — The first software being",
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Collision — The first software being",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Collision — The first software being",
    description: siteDescription,
    images: ["/og-image.png"],
    creator: "@usecollision",
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
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
