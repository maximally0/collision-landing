"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Mail, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In production, this would send to an API
    setSubmitted(true);
  };

  return (
    <main className="collision-page min-h-screen">
      {/* Nav */}
      <nav className="border-b border-ink/10 bg-paper" aria-label="Contact page navigation">
        <div className="page-shell flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-3 text-ink" aria-label="Back to home">
            <Image
              src="/collision-helmet.png"
              alt="Collision helmet mark"
              width={28}
              height={28}
              className="size-7 rounded-full object-cover ring-1 ring-ink/20"
            />
            <span className="text-[16px] font-semibold tracking-[-0.04em]">collision.</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-[12px] font-medium text-slate transition-colors hover:text-electric"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-paper px-7 pb-20 pt-20 lg:px-0 lg:pt-28">
        <div className="page-shell grid gap-16 lg:grid-cols-[1.1fr_.9fr] lg:items-start lg:gap-24">
          {/* Left — Info */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-electric">
              Get in touch
            </p>
            <h1 className="mt-5 font-display text-[42px] font-medium leading-[1.06] tracking-[-0.055em] text-ink sm:text-[56px]">
              Meet Collision.
            </h1>
            <p className="mt-6 max-w-[480px] text-[16px] leading-7 text-slate">
              Whether you&apos;re ready to replace your growth stack or just want to see how Collision
              thinks — we&apos;d love to hear from you.
            </p>

            <div className="mt-12 space-y-6 border-t border-ink/10 pt-8">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-electric/10">
                  <Mail className="size-4 text-electric" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink">Email us</p>
                  <a
                    href="mailto:hi@usecollision.com"
                    className="text-[14px] text-electric hover:underline"
                  >
                    hi@usecollision.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-electric/10">
                  <MessageCircle className="size-4 text-electric" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink">Quick response</p>
                  <p className="text-[14px] text-slate">Usually within a few hours</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://cal.com/collision"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-electric px-6 text-[12px] font-semibold text-white transition-colors hover:bg-[#1745c2]"
              >
                Meet Collision
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-10 flex gap-5 border-t border-ink/10 pt-6">
              <a href="https://x.com/usecollision" target="_blank" rel="noopener noreferrer" className="text-[12px] font-medium text-slate hover:text-electric">
                X (Twitter)
              </a>
              <a href="https://linkedin.com/company/usecollision" target="_blank" rel="noopener noreferrer" className="text-[12px] font-medium text-slate hover:text-electric">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="rounded-2xl border border-ink/10 bg-white p-8 shadow-[0_4px_24px_rgb(21_33_58_/_5%)] sm:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-12 text-center"
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-mint/20">
                  <Check className="size-6 text-[#008f7b]" aria-hidden="true" />
                </div>
                <h2 className="mt-5 font-display text-[24px] font-medium text-ink">
                  We&apos;ll be in touch.
                </h2>
                <p className="mt-3 max-w-[300px] text-[14px] text-slate">
                  Thanks for reaching out. Collision will get back to you shortly.
                </p>
                <Link href="/">
                  <Button
                    type="button"
                    className="mt-8 h-10 rounded-full bg-electric px-6 text-[12px] font-semibold text-white hover:bg-[#1745c2]"
                  >
                    Back to home
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate"
                  >
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="h-12 rounded-xl border-ink/15 bg-paper px-4 text-[14px] placeholder:text-slate/60 focus-visible:ring-2 focus-visible:ring-electric/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="h-12 rounded-xl border-ink/15 bg-paper px-4 text-[14px] placeholder:text-slate/60 focus-visible:ring-2 focus-visible:ring-electric/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your growth goals..."
                    rows={5}
                    required
                    className="w-full resize-none rounded-xl border border-ink/15 bg-paper px-4 py-3 text-[14px] placeholder:text-slate/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/30"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full rounded-xl bg-electric text-[13px] font-semibold text-white hover:bg-[#1745c2]"
                >
                  Send Message
                </Button>

                <p className="text-center text-[11px] text-slate">
                  We&apos;ll respond within a few hours. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 bg-paper px-7 py-8 lg:px-0">
        <div className="page-shell flex flex-col justify-between gap-5 text-[11px] text-slate sm:flex-row sm:items-center">
          <Link href="/" className="font-display text-[20px] tracking-[-0.05em] text-ink">
            collision.
          </Link>
          <span>© 2026 Collision Labs</span>
        </div>
      </footer>
    </main>
  );
}
