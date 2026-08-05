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
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL("https://usecollision.com"),
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
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://usecollision.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${lora.variable}`}>{children}</body>
    </html>
  );
}
