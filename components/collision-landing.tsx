"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useInView } from "motion/react";
import {
  ArrowRight, Menu, X, ArrowDown, Brain, Target, Zap, BarChart3, RefreshCw,
  PenTool, Search, Send, FlaskConical, Globe, ShoppingBag, Users, LineChart,
  Crosshair, Lightbulb, Check, TrendingUp, Eye, MessageSquare, FileText,
  LayoutDashboard, Megaphone, Mail, MousePointerClick, Repeat
} from "lucide-react";
import {
  SiGoogle, SiGmail, SiWordpress, SiShopify, SiPerplexity, SiReddit,
  SiHubspot, SiNotion, SiMixpanel, SiPosthog, SiFramer, SiWebflow,
  SiProducthunt, SiGoogleanalytics, SiGooglesearchconsole
} from "react-icons/si";
import { FaLinkedinIn, FaXTwitter, FaNewspaper, FaRobot, FaChartLine, FaSlack, FaSalesforce } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { faqItems, navigationLinks, promptSuggestions } from "@/lib/collision-content";
import { cn } from "@/lib/utils";
import { useRef } from "react";

/* ═══════════════ UTILITIES ═══════════════ */

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div ref={ref} className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >{children}</motion.div>
  );
}

function AnimatedCounter({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => {
      const dur = 1500, start = performance.now();
      const anim = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 4);
        setDisplay(value % 1 === 0 ? Math.round(e * value) : parseFloat((e * value).toFixed(1)));
        if (p < 1) requestAnimationFrame(anim);
      };
      requestAnimationFrame(anim);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [isInView, value, delay]);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ═══════════════ NAV ═══════════════ */

function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h, { passive: true }); h(); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <motion.nav className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "bg-ink/85 shadow-lg backdrop-blur-xl" : "bg-transparent")}
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-5 py-4 sm:px-7">
        <a href="#top" className="text-white"><span className="font-display text-[20px] font-medium tracking-[-0.04em]">collision.</span></a>
        <div className="hidden items-center gap-7 text-[11px] font-medium tracking-[0.08em] text-white/70 md:flex">
          {navigationLinks.map(([l, h]) => <Link key={h} href={h} className="hover:text-white transition-colors">{l}</Link>)}
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
          <div className="grid gap-1 p-3">{navigationLinks.map(([l, h]) => <Link key={h} href={h} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/10">{l}</Link>)}</div>
        </motion.div>
      )}</AnimatePresence>
    </motion.nav>
  );
}

/* ═══════════════ 1. HERO ═══════════════ */

function HeroSection() {
  const [prompt, setPrompt] = useState("");
  const handleSubmit = (e: FormEvent) => { e.preventDefault(); window.open("https://cal.com/collision", "_blank"); };
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#0c1e38]">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster="/hero-bg-poster.jpg" tabIndex={-1}>
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-[#57cce9]/40 mix-blend-color" aria-hidden="true" />
      <div className="absolute inset-0 bg-[#0c1e38]/50" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0c2749]/80 to-transparent" aria-hidden="true" />
      <motion.div className="absolute right-[14%] top-[17%] size-48 rounded-full bg-soft-yellow/30 blur-3xl" animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 12, repeat: Infinity }} aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center px-5 pb-16 pt-28 text-center text-white sm:pt-36">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">The AI you hire to run growth</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }} className="mt-6 font-display text-[40px] font-medium leading-[1.05] tracking-[-0.04em] sm:text-[58px] md:text-[76px]">
          Replace your entire <span className="text-soft-yellow">growth team.</span>
        </motion.h1>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-10 w-full max-w-[640px] rounded-2xl border border-white/15 bg-white/[0.06] p-3 backdrop-blur-md">
          <div className="flex gap-2">
            <Input value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="What should we grow?" className="h-12 flex-1 rounded-xl border-0 bg-transparent text-[15px] text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-electric/50" />
            <Button type="submit" className="h-12 shrink-0 rounded-xl bg-electric px-5 text-[12px] font-semibold text-white hover:bg-[#1745c2]"><ArrowRight className="size-4" /></Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 px-1 pt-2">
            {promptSuggestions.map(s => <button key={s} type="button" onClick={() => setPrompt(s)} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/50 transition hover:bg-white/10 hover:text-white/80">{s}</button>)}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

/* ═══════════════ 2. GIVE COLLISION A GOAL → SHOW THE MACHINE ═══════════════ */

const executionSteps = [
  { text: "Found 47 competitor campaigns", icon: Crosshair, done: true },
  { text: "Identified 12 audience segments", icon: Users, done: true },
  { text: "Generated 38 content opportunities", icon: Lightbulb, done: true },
  { text: "Built launch strategy", icon: Brain, done: true },
  { text: "Created 24 X posts", icon: FaXTwitter, done: true },
  { text: "Drafted 3 email campaigns", icon: Mail, done: true },
  { text: "Found 16 distribution partners", icon: Send, done: true },
  { text: "Published 11 assets", icon: FileText, done: true },
  { text: "7 experiments running", icon: FlaskConical, done: false },
];

function ExecutionSection() {
  return (
    <section id="product" className="bg-paper px-5 py-20 sm:px-7 lg:py-28">
      <div className="mx-auto max-w-[900px]">
        <Reveal className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-electric">Here&apos;s what actually happens</p>
          <h2 className="mt-4 font-display text-[28px] font-medium leading-tight text-ink sm:text-[40px]">You asked for growth. Collision got to work.</h2>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* Goal input */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate">Your goal</p>
              <p className="mt-3 font-display text-[20px] leading-snug text-ink">&quot;Get 500 qualified founders to sign up for our launch.&quot;</p>
              <div className="mt-4 h-px bg-ink/10" />
              <p className="mt-4 text-[11px] font-medium text-electric">Collision is working...</p>
            </div>
          </Reveal>

          {/* Execution stream */}
          <div className="space-y-2">
            {executionSteps.map((step, i) => (
              <motion.div
                key={step.text}
                className={cn("flex items-center gap-3 rounded-xl border px-4 py-3 transition-all", step.done ? "border-mint/20 bg-mint/5" : "border-electric/20 bg-electric/5")}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                {step.done
                  ? <Check className="size-4 shrink-0 text-[#008f7b]" />
                  : <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}><RefreshCw className="size-4 shrink-0 text-electric" /></motion.div>
                }
                <step.icon className="size-4 shrink-0 text-ink/40" />
                <span className="text-[13px] text-ink/80">{step.text}</span>
              </motion.div>
            ))}
            <Reveal delay={0.7} className="pt-3 text-center">
              <p className="text-[12px] font-semibold text-electric">Goal → 147 actions</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ 3. AI AGENTS GRID ═══════════════ */

const agents = [
  { name: "Research", icon: Search, desc: "Markets, competitors & opportunities", color: "bg-[#8b5cf6]" },
  { name: "Strategy", icon: Brain, desc: "Turns research into a growth plan", color: "bg-coral" },
  { name: "Content", icon: PenTool, desc: "Creates across all channels", color: "bg-mint" },
  { name: "SEO", icon: SiGoogle, desc: "Finds & attacks search opportunities", color: "bg-[#4285f4]" },
  { name: "Social", icon: FaXTwitter, desc: "Runs X + LinkedIn distribution", color: "bg-ink" },
  { name: "Email", icon: Mail, desc: "Builds campaigns & sequences", color: "bg-[#ea4335]" },
  { name: "Ads", icon: Megaphone, desc: "Creates & optimizes campaigns", color: "bg-[#f97316]" },
  { name: "Analytics", icon: BarChart3, desc: "Measures what actually worked", color: "bg-[#06b6d4]" },
  { name: "CRO", icon: MousePointerClick, desc: "Improves pages & conversion", color: "bg-[#10b981]" },
];

function AgentsSection() {
  return (
    <section id="how-it-works" className="bg-[#0a0f1a] px-5 py-20 text-white sm:px-7 lg:py-28">
      <div className="mx-auto max-w-[900px]">
        <Reveal className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-mint">One growth team underneath</p>
          <h2 className="mt-4 font-display text-[28px] font-medium leading-tight text-white sm:text-[40px]">Specialized agents. One conversation.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-4">
          {agents.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.04}>
              <motion.div
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 text-center transition-all hover:border-white/15 hover:bg-white/[0.06]"
                whileHover={{ y: -4 }}
              >
                <div className={cn("flex size-11 items-center justify-center rounded-xl text-white", a.color)}>
                  <a.icon className="size-5" />
                </div>
                <span className="text-[12px] font-bold text-white">{a.name}</span>
                <span className="text-[10px] leading-tight text-white/40 hidden sm:block">{a.desc}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ 4. GROWTH LOOP (circular) ═══════════════ */

const loopSteps = [
  { icon: Search, label: "Research", color: "#8b5cf6" },
  { icon: Brain, label: "Strategy", color: "#ff7b63" },
  { icon: PenTool, label: "Execute", color: "#00e5c0" },
  { icon: BarChart3, label: "Measure", color: "#06b6d4" },
  { icon: Lightbulb, label: "Learn", color: "#ffe16a" },
];

function GrowthLoopSection() {
  return (
    <section className="bg-paper px-5 py-20 sm:px-7 lg:py-28">
      <div className="mx-auto max-w-[700px] text-center">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-electric">The growth loop</p>
          <h2 className="mt-4 font-display text-[28px] font-medium text-ink sm:text-[36px]">Every action makes Collision smarter.</h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <div className="relative mx-auto flex size-[280px] items-center justify-center sm:size-[340px]">
            {/* Circular ring */}
            <svg className="absolute inset-0 size-full" viewBox="0 0 340 340" fill="none">
              <motion.circle cx="170" cy="170" r="140" stroke="url(#loopGrad)" strokeWidth="2" strokeDasharray="6 6"
                initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center" }}
              />
              <defs><linearGradient id="loopGrad" x1="0" y1="0" x2="340" y2="340"><stop stopColor="#1f5eff" /><stop offset="1" stopColor="#00e5c0" /></linearGradient></defs>
            </svg>

            {/* Loop icons positioned in a circle */}
            {loopSteps.map((step, i) => {
              const angle = (i / loopSteps.length) * 2 * Math.PI - Math.PI / 2;
              const r = 120;
              const x = 50 + (Math.cos(angle) * r / 170) * 50;
              const y = 50 + (Math.sin(angle) * r / 170) * 50;
              return (
                <motion.div
                  key={step.label}
                  className="absolute flex flex-col items-center gap-1.5"
                  style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-white shadow-md ring-1 ring-ink/10 sm:size-14">
                    <step.icon className="size-5 sm:size-6" style={{ color: step.color }} />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-ink/60 sm:text-[10px]">{step.label}</span>
                </motion.div>
              );
            })}

            {/* Center */}
            <div className="relative z-10 flex flex-col items-center">
              <Repeat className="size-5 text-electric" />
              <span className="mt-1 text-[9px] font-bold uppercase tracking-wider text-electric">Compounds</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-8 text-[13px] text-slate">Every campaign gives Collision more context. Every experiment produces another signal. Every result changes what it recommends next.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ 5. CAMPAIGN ANATOMY ═══════════════ */

function CampaignAnatomySection() {
  const steps = [
    { label: "Objective", value: "Get 1,000 qualified users", icon: Target, accent: "text-electric" },
    { label: "Insight", value: "Audience lives in X founder communities", icon: Eye, accent: "text-[#8b5cf6]" },
    { label: "Strategy", value: "Founder-led launch + community seeding", icon: Brain, accent: "text-coral" },
    { label: "Assets", value: "12 posts · 3 threads · 2 pages · 4 emails · 1 video", icon: FileText, accent: "text-mint" },
    { label: "Distribution", value: "X · LinkedIn · Communities · Newsletter", icon: Send, accent: "text-[#06b6d4]" },
    { label: "Result", value: "1,847 users · 31% activation", icon: TrendingUp, accent: "text-[#10b981]" },
  ];

  return (
    <section className="bg-[#0a0f1a] px-5 py-20 text-white sm:px-7 lg:py-28">
      <div className="mx-auto max-w-[700px]">
        <Reveal className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-soft-yellow">Anatomy of a campaign</p>
          <h2 className="mt-4 font-display text-[28px] font-medium text-white sm:text-[36px]">One request. An entire growth program.</h2>
        </Reveal>

        <div className="mt-14 space-y-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-4"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <s.icon className={cn("size-5 shrink-0 mt-0.5", s.accent)} />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">{s.label}</span>
                <p className="mt-0.5 text-[14px] text-white/80">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ 6. WHAT COLLISION REPLACES ═══════════════ */

function ReplacesSection() {
  const oldStack = [
    { icon: Users, label: "Growth marketer" },
    { icon: PenTool, label: "Content person" },
    { icon: SiGoogle, label: "SEO agency" },
    { icon: Megaphone, label: "Paid ads agency" },
    { icon: Users, label: "Freelancers" },
    { icon: BarChart3, label: "Analytics tools" },
  ];

  const newStack = [
    { icon: Search, label: "Research" },
    { icon: Brain, label: "Strategy" },
    { icon: PenTool, label: "Content" },
    { icon: Send, label: "Distribution" },
    { icon: FlaskConical, label: "Experiments" },
    { icon: BarChart3, label: "Analytics" },
  ];

  return (
    <section className="bg-paper px-5 py-20 sm:px-7 lg:py-28">
      <div className="mx-auto max-w-[900px]">
        <Reveal className="text-center">
          <h2 className="font-display text-[28px] font-medium text-ink sm:text-[36px]">What Collision replaces</h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {/* Before */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-ink/10 bg-white p-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-coral">Today</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="rounded-full border border-ink/10 bg-cyan-surface px-3 py-1.5 text-[11px] font-bold text-ink">Founder</div>
                <ArrowDown className="size-3 text-ink/30 rotate-0" />
              </div>
              <div className="mt-3 space-y-2">
                {oldStack.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-coral/5 px-3 py-2.5">
                    <item.icon className="size-4 text-coral/60" />
                    <span className="text-[12px] text-ink/60">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-coral/10 px-3 py-2">
                <span className="text-[11px] font-bold text-coral">= Chaos</span>
              </div>
            </div>
          </Reveal>

          {/* After */}
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-electric/20 bg-white p-6 shadow-[0_4px_24px_rgb(31_94_255_/_6%)]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-electric">With Collision</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="rounded-full border border-ink/10 bg-cyan-surface px-3 py-1.5 text-[11px] font-bold text-ink">Goal</div>
                <ArrowDown className="size-3 text-ink/30" />
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-lg bg-electric/10 px-4 py-3">
                <div className="size-5 rounded-full bg-electric" />
                <span className="text-[13px] font-bold text-electric">Collision</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {newStack.map((item, i) => (
                  <motion.div key={i} className="flex flex-col items-center gap-1.5 rounded-lg bg-electric/5 p-2.5"
                    initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.05 }}>
                    <item.icon className="size-4 text-electric/60" />
                    <span className="text-[9px] font-medium text-ink/50">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ 7. INTEGRATIONS — by function ═══════════════ */

const integrationGroups = [
  { label: "Research", icons: [{ icon: SiGoogle, color: "#4285f4" }, { icon: SiReddit, color: "#ff4500" }, { icon: SiProducthunt, color: "#da552f" }, { icon: SiPerplexity, color: "#20b8cd" }] },
  { label: "Distribute", icons: [{ icon: FaXTwitter, color: "#000" }, { icon: FaLinkedinIn, color: "#0a66c2" }, { icon: SiGmail, color: "#ea4335" }, { icon: FaSlack, color: "#4a154b" }] },
  { label: "Build", icons: [{ icon: SiWebflow, color: "#4353ff" }, { icon: SiFramer, color: "#0055ff" }, { icon: SiShopify, color: "#95bf47" }, { icon: SiWordpress, color: "#21759b" }] },
  { label: "Measure", icons: [{ icon: SiGoogleanalytics, color: "#e37400" }, { icon: SiPosthog, color: "#1d4aff" }, { icon: SiMixpanel, color: "#7856ff" }, { icon: SiGooglesearchconsole, color: "#458cf5" }] },
  { label: "CRM", icons: [{ icon: SiHubspot, color: "#ff7a59" }, { icon: FaSalesforce, color: "#00a1e0" }, { icon: SiNotion, color: "#000" }, { icon: FaSlack, color: "#4a154b" }] },
];

function IntegrationsSection() {
  return (
    <section className="bg-[#0a0f1a] px-5 py-20 text-white sm:px-7 lg:py-28">
      <div className="mx-auto max-w-[800px]">
        <Reveal className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-mint">Connected to your stack</p>
          <h2 className="mt-4 font-display text-[28px] font-medium text-white sm:text-[36px]">Works where growth already happens.</h2>
        </Reveal>

        <div className="mt-14 space-y-4">
          {integrationGroups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.08}>
              <div className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-4">
                <span className="w-20 shrink-0 text-[11px] font-bold uppercase tracking-wider text-white/40">{group.label}</span>
                <div className="flex flex-1 flex-wrap gap-3">
                  {group.icons.map((ic, ii) => (
                    <motion.div key={ii} className="flex size-9 items-center justify-center rounded-lg bg-white/[0.06]" whileHover={{ scale: 1.15 }}>
                      <ic.icon className="size-4" style={{ color: ic.color }} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4} className="mt-8 text-center">
          <p className="text-[12px] text-white/40">Collision doesn&apos;t just tell you what to do. <span className="text-white/70 font-medium">It can actually do it.</span></p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ 8. PROOF ═══════════════ */

const proofMetrics = [
  { value: 300, suffix: "M+", label: "impressions", icon: Globe },
  { value: 14, suffix: "K+", label: "conversations", icon: MessageSquare },
  { value: 1840, suffix: "+", label: "experiments", icon: FlaskConical },
  { value: 67, suffix: "%", label: "produced lift", icon: TrendingUp },
  { value: 3.7, suffix: "×", label: "content output", icon: PenTool },
  { value: 93, suffix: "%", label: "auto-shipped", icon: FaRobot },
];

function ProofSection() {
  return (
    <section id="proof" className="bg-paper px-5 py-20 sm:px-7 lg:py-28">
      <div className="mx-auto max-w-[900px]">
        <Reveal className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-electric">Growth proof</p>
          <h2 className="mt-4 font-display text-[28px] font-medium text-ink sm:text-[36px]">Measured. Not promised.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {proofMetrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.05}>
              <div className="group rounded-2xl border border-ink/8 bg-white p-5 text-center shadow-sm transition-all hover:border-electric/20 hover:shadow-md">
                <m.icon className="mx-auto size-5 text-ink/25 group-hover:text-electric transition-colors" />
                <p className="mt-3 font-display text-[30px] leading-none text-ink sm:text-[36px]">
                  <AnimatedCounter value={m.value} suffix={m.suffix} delay={0.2 + i * 0.08} />
                </p>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-slate">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Case studies */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            { metric: "+183%", label: "qualified inbound", color: "border-electric/20 bg-electric/5" },
            { metric: "3.2×", label: "organic acquisition", color: "border-mint/20 bg-mint/5" },
            { metric: "+71%", label: "conversion rate", color: "border-coral/20 bg-coral/5" },
          ].map((c, i) => (
            <Reveal key={c.label} delay={0.1 * i}>
              <div className={cn("rounded-2xl border p-5 text-center", c.color)}>
                <p className="font-display text-[28px] leading-none text-ink">{c.metric}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-ink/50">{c.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ 9. FAQ ═══════════════ */

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="faq" className="bg-cyan-surface px-5 py-20 sm:px-7 lg:py-24">
      <div className="mx-auto max-w-[640px]">
        <Reveal className="text-center"><h2 className="font-display text-[28px] font-medium text-ink sm:text-[36px]">FAQ</h2></Reveal>
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

/* ═══════════════ 10. CTA ═══════════════ */

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

/* ═══════════════ EXPLORE ═══════════════ */

function ExploreSection() {
  return (
    <section className="bg-paper px-5 py-14 sm:px-7">
      <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-center gap-3">
        {[{ href: "/alternatives", label: "Alternatives" }, { href: "/compare", label: "Compare" }, { href: "/category", label: "Guides" }, { href: "/blog", label: "Blog" }, { href: "/glossary", label: "Glossary" }].map(item => (
          <Link key={item.href} href={item.href} className="rounded-full border border-ink/10 bg-white px-5 py-2.5 text-[12px] font-semibold text-ink transition hover:border-electric/30 hover:text-electric">{item.label}</Link>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ MAIN ═══════════════ */

export default function CollisionLanding() {
  return (
    <main className="collision-page">
      <FloatingNav />
      <HeroSection />
      <ExecutionSection />
      <AgentsSection />
      <GrowthLoopSection />
      <CampaignAnatomySection />
      <ReplacesSection />
      <IntegrationsSection />
      <ProofSection />
      <FaqSection />
      <ExploreSection />
      <FinalCta />
    </main>
  );
}
