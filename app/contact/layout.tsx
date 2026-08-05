import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Collision",
  description:
    "Get in touch with Collision. Whether you're ready to replace your growth stack or want to learn more, we'd love to hear from you.",
  openGraph: {
    title: "Contact — Collision",
    description: "Get in touch with Collision and replace your entire growth stack.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
