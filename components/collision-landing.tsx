"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useInView } from "motion/react";
import { ArrowRight, Menu, X, ArrowDown, Brain, Target, Zap, BarChart3, RefreshCw, PenTool, Search, Send, FlaskConical, Globe, ShoppingBag, Users, LineChart, Crosshair, Lightbulb } from "lucide-react";
import { SiGoogle, SiGmail, SiWordpress, SiShopify, SiGooglechrome, SiPerplexity } from "react-icons/si";
import { FaLinkedinIn, FaXTwitter, FaNewspaper, FaRobot, FaChartLine } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  faqItems,
  navigationLinks,
  promptSuggestions,
} from "@/lib/collision-content";
import { cn } from "@/lib/utils";
import { useRef } from "react";

/* ─────────────── Utilities ─────────────── */

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = "", prefix = "", delay = 0 }: { value: number; suffix?: string; prefix?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const duration = 1600;
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const cur = eased * value;
        setDisplay(value % 1 === 0 ? Math.round(cur) : parseFloat(cur.toFixed(1)));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);
  return <span ref={ref} aria-label={`${prefix}${value}${suffix}`}>{prefix}{display}{suffix}</span>;
}

/* ─────────────── Nav ─────────────── */

const heroVideo = "https://www.youtube-nocookie.com/embed/ztVV54sPOns?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&loop=1&modestbranding=1&playlist=ztVV54sPOns&playsinline=1&rel=0&start=330&end=390";

function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.nav
      className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "bg-ink/85 shadow-lg backdrop-blur-xl" : "bg-transparent")}
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-5 py-4 sm:px-7">
        <a href="#top" className="text-white"><span className="font-display text-[20px] font-medium tracking-[-0.04em]">collision.</span></a>
        <div className="hidden items-center gap-7 text-[11px] font-medium tracking-[0.08em] text-white/70 md:flex">
          {navigationLinks.map(([label, href]) => (<Link key={href} href={href} className="hover:text-white transition-colors">{label}</Link>))}
        </div>
        <div className="flex items-center gap-3">
          <a href="https://cal.com/collision" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="h-9 rounded-full bg-electric px-5 text-[11px] font-semibold text-white hover:bg-[#1745c2] sm:h-10 sm:px-6">Get started</Button>
          </a>
          <Button size="icon" variant="outline" onClick={() => setOpen(v => !v)} className="size-9 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 md:hidden" aria-label="Menu">
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>
      <AnimatePresence>{open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mx-4 overflow-hidden rounded-2xl bg-ink/95 backdrop-blur-md md:hidden">
          <div className="grid gap-1 p-3">
            {navigationLinks.map(([label, href]) => (<Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/10">{label}</Link>))}
          </div>
        </motion.div>
      )}</AnimatePresence>
    </motion.nav>
  );
}

/* ─────────────── Hero ─────────────── */

function HeroSection() {
  const [prompt, setPrompt] = useState("");
  const handleSubmit = (e: FormEvent) => { e.preventDefault(); window.open("https://cal.com/collision", "_blank"); };
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#77d8ef]">
      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <iframe className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2" src={heroVideo} title="Background" allow="autoplay; encrypted-media" tabIndex={-1} />
      </div>
      <div className="absolute inset-0 bg-[#57cce9]/40 mix-blend-color" aria-hidden="true" />
      <div className="absolute inset-0 bg-[#0c1e38]/50" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0c2749]/80 to-transparent" aria-hidden="true" />
      <motion.div className="absolute right-[14%] top-[17%] size-48 rounded-full bg-soft-yellow/30 blur-3xl" animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 12, repeat: Infinity }} aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center px-5 pb-16 pt-28 text-center text-white sm:pt-36">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
          The AI you hire to run growth
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }} className="mt-6 font-display text-[40px] font-medium leading-[1.05] tracking-[-0.04em] sm:text-[58px] md:text-[76px]">
          Replace your entire <span className="text-soft-yellow">growth team.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="mt-7 max-w-[680px] text-[15px] leading-relaxed text-white/85 sm:text-[17px]">
          One growth intelligence that researches, writes, distributes, and learns across every surface your business depends on.
        </motion.p>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-10 w-full max-w-[640px] rounded-2xl border border-white/15 bg-white/[0.06] p-3 backdrop-blur-md">
          <div className="flex gap-2">
            <Input value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="What should we grow?" className="h-12 flex-1 rounded-xl border-0 bg-transparent text-[15px] text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-electric/50" />
            <Button type="submit" className="h-12 shrink-0 rounded-xl bg-electric px-5 text-[12px] font-semibold text-white hover:bg-[#1745c2]">
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 px-1 pt-2">
            {promptSuggestions.map(s => (
              <button key={s} type="button" onClick={() => setPrompt(s)} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/50 transition hover:bg-white/10 hover:text-white/80">{s}</button>
            ))}
          </div>
        </motion.form>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-medium uppercase tracking-[0.15em] text-white/70">
          <span>One conversation</span><span className="text-white/35">·</span><span>One memory</span><span className="text-white/35">·</span><span>One source of truth</span>
          <span className="rounded-full bg-mint/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#12335a]">approval-based</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────── Visual Flow: How It Works ─────────────── */

const flowSteps = [
  { icon: Target, label: "Goal", color: "bg-electric" },
  { icon: Search, label: "Research", color: "bg-[#8b5cf6]" },
  { icon: Brain, label: "Strategy", color: "bg-coral" },
  { icon: PenTool, label: "Create", color: "bg-mint" },
  { icon: Send, label: "Distribute", color: "bg-soft-yellow" },
  { icon: BarChart3, label: "Learn", color: "bg-[#06b6d4]" },
  { icon: RefreshCw, label: "Adapt", color: "bg-electric" },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-paper px-5 py-20 sm:px-7 lg:py-28">
      <div className="mx-auto max-w-[900px]">
        <Reveal className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-electric">How it works</p>
          <h2 className="mt-4 font-display text-[28px] font-medium leading-tight tracking-tight text-ink sm:text-[40px]">One goal in. Growth out.</h2>
        </Reveal>

        {/* Visual flow - icons connected by lines */}
        <Reveal delay={0.15} className="mt-14">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-2">
            {flowSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  className={cn("flex flex-col items-center gap-2")}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <div className={cn("flex size-14 items-center justify-center rounded-2xl text-white shadow-lg sm:size-16", step.color)}>
                    <step.icon className="size-6 sm:size-7" />
                  </div>
                  <span className="text-[11px] font-semibold text-ink/70">{step.label}</span>
                </motion.div>
                {i < flowSteps.length - 1 && (
                  <ArrowRight className="size-4 text-ink/20 sm:size-5" />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* One-liner */}
        <Reveal delay={0.3} className="mt-12 text-center">
          <p className="mx-auto max-w-[500px] text-[14px] text-slate">You don&apos;t coordinate the work. You don&apos;t pick the channel. You don&apos;t decide the sequence. You just say what you want.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── Surfaces — icon grid ─────────────── */

const surfaces = [
  { icon: FaLinkedinIn, label: "LinkedIn", color: "#0a66c2" },
  { icon: FaXTwitter, label: "X", color: "#ffffff" },
  { icon: SiGoogle, label: "SEO", color: "#4285f4" },
  { icon: SiPerplexity, label: "AI Search", color: "#20b8cd" },
  { icon: FaNewspaper, label: "Newsletter", color: "#f59e0b" },
  { icon: SiWordpress, label: "Blog", color: "#21759b" },
  { icon: Globe, label: "Website", color: "#10b981" },
  { icon: SiGmail, label: "Email", color: "#ea4335" },
  { icon: Send, label: "Outbound", color: "#8b5cf6" },
  { icon: SiGooglechrome, label: "Paid", color: "#f97316" },
  { icon: SiShopify, label: "Storefront", color: "#95bf47" },
  { icon: Users, label: "Community", color: "#ec4899" },
  { icon: LineChart, label: "Analytics", color: "#06b6d4" },
  { icon: Crosshair, label: "Competitors", color: "#ef4444" },
  { icon: FlaskConical, label: "Experiments", color: "#a855f7" },
  { icon: ShoppingBag, label: "CRM", color: "#14b8a6" },
];

function SurfacesSection() {
  return (
    <section id="product" className="bg-[#0a0f1a] px-5 py-20 text-white sm:px-7 lg:py-28">
      <div className="mx-auto max-w-[900px]">
        <Reveal className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-mint">Every growth surface</p>
          <h2 className="mt-4 font-display text-[28px] font-medium leading-tight text-white sm:text-[40px]">Collision decides what matters for the goal.</h2>
        </Reveal>

        {/* Icon grid */}
        <div className="mt-14 grid grid-cols-4 gap-4 sm:grid-cols-8 sm:gap-5">
          {surfaces.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.03}>
              <motion.div
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 transition-all hover:border-white/15 hover:bg-white/[0.07]"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <s.icon className="size-6" style={{ color: s.color }} />
                <span className="text-[10px] font-medium text-white/60">{s.label}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4} className="mt-10 text-center">
          <p className="text-[13px] text-white/40">You don&apos;t pick the channel. <span className="text-mint font-medium">That&apos;s the product.</span></p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── Cascade Visual ─────────────── */

const cascadeItems = [
  { label: "1 objective", icon: Target, size: "text-[18px]" },
  { label: "17 research signals", icon: Search, size: "text-[16px]" },
  { label: "8 strategic decisions", icon: Brain, size: "text-[15px]" },
  { label: "42 pieces of work", icon: PenTool, size: "text-[14px]" },
  { label: "6 surfaces", icon: Globe, size: "text-[14px]" },
  { label: "14,000+ signals", icon: BarChart3, size: "text-[13px]" },
  { label: "1 better decision", icon: Lightbulb, size: "text-[18px]" },
];

function CascadeSection() {
  return (
    <section className="bg-paper px-5 py-20 sm:px-7 lg:py-28">
      <div className="mx-auto max-w-[500px]">
        <Reveal className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-electric">The cascade</p>
          <h2 className="mt-4 font-display text-[28px] font-medium leading-tight text-ink sm:text-[36px]">One request → hundreds of actions.</h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {cascadeItems.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <motion.div
                className={cn(
                  "flex items-center gap-4 rounded-xl border px-5 py-4 transition-all",
                  i === 0 ? "border-electric/30 bg-electric/5" : i === cascadeItems.length - 1 ? "border-mint/30 bg-mint/5" : "border-ink/8 bg-white"
                )}
                whileHover={{ x: 6 }}
              >
                <item.icon className={cn("size-5 shrink-0", i === 0 ? "text-electric" : i === cascadeItems.length - 1 ? "text-[#008f7b]" : "text-slate")} />
                <span className={cn("font-medium text-ink", item.size)}>{item.label}</span>
              </motion.div>
              {i < cascadeItems.length - 1 && (
                <div className="flex justify-center py-1"><ArrowDown className="size-3.5 text-ink/20" /></div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Proof — visual metrics ─────────────── */

const proofMetrics = [
  { value: 300, suffix: "M+", label: "impressions", icon: Globe },
  { value: 14, suffix: "K+", label: "conversations", icon: Users },
  { value: 1840, suffix: "+", label: "experiments", icon: FlaskConical },
  { value: 67, suffix: "%", label: "produced lift", icon: FaChartLine },
  { value: 3.7, suffix: "×", label: "content output", icon: PenTool },
  { value: 52, suffix: "%", label: "faster execution", icon: Zap },
  { value: 2.9, suffix: "×", label: "qualified inbound", icon: Target },
  { value: 93, suffix: "%", label: "auto-shipped", icon: FaRobot },
];

function ProofSection() {
  return (
    <section id="proof" className="bg-[#0a0f1a] px-5 py-20 text-white sm:px-7 lg:py-28">
      <div className="mx-auto max-w-[900px]">
        <Reveal className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-soft-yellow">Growth proof</p>
          <h2 className="mt-4 font-display text-[28px] font-medium leading-tight text-white sm:text-[40px]">Measured. Not promised.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {proofMetrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.05}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 text-center transition-all hover:border-white/15 hover:bg-white/[0.06]">
                <m.icon className="mx-auto size-5 text-white/30 group-hover:text-electric transition-colors" />
                <p className="mt-3 font-display text-[28px] leading-none text-white sm:text-[34px]">
                  <AnimatedCounter value={m.value} suffix={m.suffix} delay={0.3 + i * 0.08} />
                </p>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-white/40">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mini case studies as visual cards */}
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {[
            { metric: "+183%", label: "qualified inbound", color: "from-electric/20 to-transparent" },
            { metric: "3.2×", label: "organic acquisition", color: "from-mint/20 to-transparent" },
            { metric: "+71%", label: "conversion rate", color: "from-coral/20 to-transparent" },
          ].map((c, i) => (
            <Reveal key={c.label} delay={0.1 * i}>
              <div className={cn("rounded-2xl border border-white/[0.06] bg-gradient-to-b p-6", c.color)}>
                <p className="font-display text-[32px] leading-none text-white">{c.metric}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">{c.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Architecture — one visual ─────────────── */

function ArchitectureSection() {
  const layers = [
    { icons: [Brain, Search, PenTool, Send, BarChart3, RefreshCw], label: "Growth Engine" },
  ];

  return (
    <section className="bg-cyan-surface px-5 py-20 sm:px-7 lg:py-24">
      <div className="mx-auto max-w-[600px] text-center">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-electric">Under the hood</p>
          <h2 className="mt-4 font-display text-[28px] font-medium leading-tight text-ink sm:text-[36px]">One AI. A growth team underneath.</h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="flex flex-col items-center gap-4">
            {/* You */}
            <div className="rounded-full border-2 border-ink bg-white px-6 py-3 text-[13px] font-bold text-ink shadow-sm">You</div>
            <div className="h-8 w-px bg-ink/15" />
            {/* Collision */}
            <div className="rounded-full bg-electric px-8 py-4 text-[14px] font-bold text-white shadow-[0_4px_24px_rgb(31_94_255_/_30%)]">Collision</div>
            <div className="h-8 w-px bg-ink/15" />
            {/* Specialist icons */}
            <div className="flex flex-wrap justify-center gap-3">
              {layers[0].icons.map((Icon, i) => (
                <motion.div
                  key={i}
                  className="flex size-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-ink/10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                >
                  <Icon className="size-5 text-ink/60" />
                </motion.div>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-slate">You never pick the agent, model, or workflow.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── FAQ — compact accordion ─────────────── */

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="bg-paper px-5 py-20 sm:px-7 lg:py-24">
      <div className="mx-auto max-w-[640px]">
        <Reveal className="text-center">
          <h2 className="font-display text-[28px] font-medium text-ink sm:text-[36px]">FAQ</h2>
        </Reveal>
        <div className="mt-10 space-y-2">
          {faqItems.map((item, i) => (
            <Reveal key={item.question} delay={i * 0.04}>
              <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
                <button type="button" onClick={() => setOpenIdx(openIdx === i ? null : i)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
                  <span className="text-[14px] font-medium text-ink">{item.question}</span>
                  <motion.span animate={{ rotate: openIdx === i ? 45 : 0 }} className="shrink-0 text-[18px] text-electric">+</motion.span>
                </button>
                <AnimatePresence>{openIdx === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <p className="border-t border-ink/8 px-5 pb-4 pt-3 text-[13px] leading-relaxed text-slate">{item.answer}</p>
                  </motion.div>
                )}</AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CTA ─────────────── */

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f1a] px-5 py-24 text-center text-white lg:py-32">
      <div className="absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#1f5eff15_0%,transparent_70%)]" aria-hidden="true" />
      <Reveal className="relative mx-auto max-w-[600px]">
        <h2 className="font-display text-[32px] font-medium leading-tight sm:text-[48px]">You own the goal.<br /><span className="text-electric">Collision owns the work.</span></h2>
        <a href="https://cal.com/collision" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block">
          <Button size="lg" className="h-12 rounded-full bg-electric px-8 text-[13px] font-semibold text-white hover:bg-[#1745c2] hover:shadow-[0_0_30px_rgb(31_94_255_/_40%)]">
            Meet Collision <ArrowRight className="ml-2 size-4" />
          </Button>
        </a>
      </Reveal>
    </section>
  );
}

/* ─────────────── Explore (minimal) ─────────────── */

function ExploreSection() {
  return (
    <section id="resources" className="bg-paper px-5 py-16 sm:px-7">
      <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-center gap-3">
        {[
          { href: "/alternatives", label: "Alternatives" },
          { href: "/compare", label: "Compare" },
          { href: "/category", label: "Guides" },
          { href: "/blog", label: "Blog" },
          { href: "/glossary", label: "Glossary" },
        ].map(item => (
          <Link key={item.href} href={item.href} className="rounded-full border border-ink/10 bg-white px-5 py-2.5 text-[12px] font-semibold text-ink transition hover:border-electric/30 hover:text-electric">
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─────────────── Main ─────────────── */

export default function CollisionLanding() {
  return (
    <main className="collision-page">
      <FloatingNav />
      <HeroSection />
      <HowItWorksSection />
      <SurfacesSection />
      <CascadeSection />
      <ProofSection />
      <ArchitectureSection />
      <FaqSection />
      <ExploreSection />
      <FinalCta />
    </main>
  );
}
