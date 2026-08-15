"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useInView } from "motion/react";
import { ArrowRight, Menu, X, Check, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  faqItems,
  journeySteps,
  navigationLinks,
  promptSuggestions,
  growthSurfaces,
  metrics,
  caseStudies,
  cascadeFlow,
  surfaceDetails,
} from "@/lib/collision-content";
import { cn } from "@/lib/utils";
import { useRef } from "react";

/* ─── Utility Components ─── */

function MicroLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[10px] font-semibold uppercase tracking-[0.22em]", className)}>{children}</p>;
}

function DisplayTitle({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <h2 id={id} className={cn("font-display text-balance text-[32px] font-medium leading-[1.08] tracking-[-0.045em] sm:text-[45px] sm:leading-[1.04] sm:tracking-[-0.055em] md:text-[64px]", className)}>
      {children}
    </h2>
  );
}

function BodyCopy({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[15px] leading-7", className)}>{children}</p>;
}

/* ─── Animation Variants ─── */

const revealVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

function Reveal({ children, className, delay = 0, variant = "default" }: { children: ReactNode; className?: string; delay?: number; variant?: "default" | "fade" | "scale" }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const variants = variant === "scale" ? scaleInVariants : variant === "fade" ? fadeUpVariants : revealVariants;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : "hidden"}
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HeroReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Counter ─── */

function AnimatedCounter({ value, suffix = "", prefix = "", delay = 0 }: { value: number; suffix?: string; prefix?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const duration = 1800;
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = eased * value;
        setDisplay(value % 1 === 0 ? Math.round(current) : parseFloat(current.toFixed(1)));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <span ref={ref}>
      <span className="sr-only">{prefix}{value}{suffix}</span>
      <span aria-hidden="true">{prefix}{display}{suffix}</span>
    </span>
  );
}

/* ─── Navigation ─── */

function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0a0f1a]/90 shadow-[0_2px_20px_rgb(0_0_0_/_25%)] backdrop-blur-xl"
          : "bg-transparent"
      )}
      aria-label="Primary navigation"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-5 py-4 sm:px-7">
        <a href="#top" className="text-white" aria-label="Collision home">
          <span className="font-display text-[20px] font-medium tracking-[-0.04em] sm:text-[22px]">collision.</span>
        </a>

        <div className="hidden items-center gap-7 text-[11px] font-medium tracking-[0.08em] text-white/70 md:flex">
          {navigationLinks.map(([label, href]) => (
            <Link key={href} href={href} className="transition-colors duration-200 hover:text-white">{label}</Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="https://cal.com/collision" target="_blank" rel="noopener noreferrer">
            <Button type="button" size="lg" className="h-9 rounded-full bg-electric px-5 text-[11px] font-semibold text-white ring-1 ring-white/20 transition-all duration-200 hover:bg-[#1745c2] hover:shadow-[0_0_20px_rgb(31_94_255_/_40%)] sm:h-10 sm:px-6 sm:text-[12px]">
              Get started
            </Button>
          </a>
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="size-9 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:size-10 md:hidden"
          >
            {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="mx-4 overflow-hidden rounded-2xl bg-[#0a0f1a]/95 shadow-xl backdrop-blur-md md:hidden"
          >
            <div className="grid gap-1 p-2">
              {navigationLinks.map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">
                  {label}
                </Link>
              ))}
              <a href="https://cal.com/collision" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="rounded-xl bg-electric px-4 py-3 text-center text-sm font-semibold text-white">
                Get started
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── Hero Section ─── */

function GrowthPrompt() {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open("https://cal.com/collision", "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[720px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_8px_40px_rgb(31_94_255_/_15%)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="What should we grow today?"
          aria-label="Growth objective"
          className="h-12 flex-1 rounded-xl border-0 bg-transparent px-4 py-3 text-[15px] text-white shadow-none placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-electric/40"
        />
        <Button type="submit" size="lg" className="h-11 shrink-0 rounded-full bg-electric px-6 text-[12px] font-semibold text-white hover:bg-[#1745c2] hover:shadow-[0_0_20px_rgb(31_94_255_/_50%)]">
          Meet Collision <ArrowRight className="ml-1 size-3.5" aria-hidden="true" />
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 border-t border-white/10 px-1 pb-1 pt-4">
        {promptSuggestions.map((suggestion) => (
          <Button
            key={suggestion}
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setPrompt(suggestion)}
            className="h-auto rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11px] font-normal text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white/90"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </form>
  );
}

function AuroraBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#1a3a6b_0%,#0a0f1a_100%)]" />

      {/* Aurora blobs */}
      <motion.div
        className="absolute -left-[20%] top-[10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,#1f5eff33_0%,transparent_70%)] blur-3xl"
        animate={reduceMotion ? undefined : {
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[15%] top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,#00e5c044_0%,transparent_70%)] blur-3xl"
        animate={reduceMotion ? undefined : {
          x: [0, -60, 40, 0],
          y: [0, 80, -30, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[30%] top-[50%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,#ff7b6322_0%,transparent_70%)] blur-3xl"
        animate={reduceMotion ? undefined : {
          x: [0, 50, -70, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[60%] top-[5%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,#ffe16a18_0%,transparent_70%)] blur-3xl"
        animate={reduceMotion ? undefined : {
          x: [0, -30, 50, 0],
          y: [0, 50, -20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
    </div>
  );
}

function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#0a0f1a] sm:min-h-[800px]">
      <AuroraBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[980px] flex-col items-center px-5 pb-16 pt-28 text-center text-white sm:px-7 sm:pt-36">
        <HeroReveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
            <Sparkles className="size-3 text-soft-yellow" />
            <span className="text-[11px] font-medium tracking-wide text-white/70">The AI you hire to run growth</span>
          </div>
        </HeroReveal>

        <HeroReveal delay={0.1}>
          <h1 id="hero-title" className="mt-8 max-w-[900px] font-display text-[38px] font-medium leading-[1.05] tracking-[-0.04em] sm:text-[56px] md:text-[72px] lg:text-[84px]">
            You ask for the outcome.<br />
            <span className="bg-gradient-to-r from-electric via-[#4ecaff] to-mint bg-clip-text text-transparent">Collision figures out the work.</span>
          </h1>
        </HeroReveal>

        <HeroReveal delay={0.2}>
          <p className="mt-7 max-w-[680px] text-[16px] leading-relaxed text-white/65 sm:text-[18px]">
            Tell Collision what you want to achieve. It figures out the research, strategy, content, distribution, experiments, and next moves required to get there.
          </p>
        </HeroReveal>

        <HeroReveal delay={0.3} className="mt-10 w-full">
          <div className="flex justify-center">
            <GrowthPrompt />
          </div>
        </HeroReveal>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent" aria-hidden="true" />
    </section>
  );
}

/* ─── Fundamental Difference Section ─── */

function DifferenceSection() {
  return (
    <section id="product" aria-labelledby="difference-title" className="bg-paper px-5 py-20 sm:px-7 lg:px-0 lg:py-32">
      <Reveal className="page-shell">
        <div className="mx-auto max-w-[780px] text-center">
          <MicroLabel className="text-electric">The fundamental difference</MicroLabel>
          <DisplayTitle id="difference-title" className="mt-6">
            Most marketing software asks:<br />
            <span className="text-slate">What do you want to create?</span><br />
            Collision asks:<br />
            <span className="text-electric">What are you trying to accomplish?</span>
          </DisplayTitle>
        </div>

        {/* Flow diagram */}
        <Reveal delay={0.2} className="mx-auto mt-20 max-w-[900px]">
          <div className="relative rounded-3xl border border-ink/10 bg-white p-8 shadow-[0_4px_40px_rgb(31_94_255_/_6%)] sm:p-12">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-7 sm:items-center">
              {["Goal", "Research", "Strategy", "Work", "Distribution", "Learning", "Next move"].map((step, i) => (
                <div key={step} className="flex items-center gap-3 sm:flex-col sm:gap-2">
                  <div className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white sm:size-12",
                    i === 0 ? "bg-electric" : i === 6 ? "bg-coral" : "bg-ink/80"
                  )}>
                    {i + 1}
                  </div>
                  <span className="text-[12px] font-semibold text-ink sm:text-center">{step}</span>
                  {i < 6 && <ArrowRight className="hidden size-3 text-ink/30 sm:block sm:absolute" style={{ left: `calc(${(i + 1) * 14.28}% - 6px)`, top: "50%" }} aria-hidden="true" />}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl bg-cyan-surface/60 p-5 text-center">
              <p className="text-[13px] font-medium text-ink/70">A normal marketing stack makes you coordinate the tools. A marketing agency makes you coordinate the people.<br />ChatGPT makes you coordinate the work. <span className="font-bold text-electric">Collision coordinates the growth function.</span></p>
            </div>
          </div>
        </Reveal>
      </Reveal>
    </section>
  );
}

/* ─── Surfaces Section ─── */

function SurfacesSection() {
  return (
    <section aria-labelledby="surfaces-title" className="bg-[#0a0f1a] px-5 py-20 text-white sm:px-7 lg:px-0 lg:py-32">
      <Reveal className="page-shell">
        <div className="mx-auto max-w-[700px] text-center">
          <MicroLabel className="text-mint">One growth system. Every surface.</MicroLabel>
          <DisplayTitle id="surfaces-title" className="mt-6 text-white">
            Collision decides which surfaces matter for the goal.
          </DisplayTitle>
          <p className="mt-5 text-[16px] text-white/55">You&apos;re not buying 30 integrations. You&apos;re buying coordination across 30 surfaces.</p>
        </div>

        <div className="mx-auto mt-16 max-w-[900px] space-y-3">
          {growthSurfaces.map((item, i) => (
            <Reveal key={item.surface} delay={i * 0.08} variant="fade">
              <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all duration-300 hover:border-electric/30 hover:bg-white/[0.06]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-bold uppercase tracking-wider text-electric">{item.surface}</span>
                    <span className="text-[13px] text-white/40">{item.channels}</span>
                  </div>
                  <span className="text-[13px] text-white/50">{item.description}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5} className="mt-12 text-center">
          <p className="text-[14px] font-medium text-white/40">You don&apos;t need to know which of these you need. <span className="text-mint">That&apos;s the product.</span></p>
        </Reveal>
      </Reveal>
    </section>
  );
}

/* ─── How It Works / Journey Section ─── */

function HowItWorksSection() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="bg-paper px-5 py-20 sm:px-7 lg:px-0 lg:py-32">
      <Reveal className="page-shell">
        <div className="mx-auto max-w-[700px] text-center">
          <MicroLabel className="text-electric">How it works</MicroLabel>
          <DisplayTitle id="how-title" className="mt-6">You gave it a goal.<br />It figured out the function.</DisplayTitle>
        </div>

        {/* Example conversation */}
        <Reveal delay={0.15} className="mx-auto mt-16 max-w-[680px]">
          <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-[0_8px_40px_rgb(0_0_0_/_5%)]">
            <div className="mb-6 flex items-center gap-2 border-b border-ink/10 pb-4">
              <div className="size-2 rounded-full bg-mint" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate">Live example</span>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl bg-cyan-surface px-5 py-4">
                <p className="text-[11px] font-semibold uppercase text-slate">You</p>
                <p className="mt-1 font-display text-[18px] text-ink">&quot;We need more qualified demand from founders.&quot;</p>
              </div>
              <div className="rounded-xl bg-electric/5 px-5 py-4">
                <p className="text-[11px] font-semibold uppercase text-electric">Collision figures out</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Journey steps */}
        <div className="mx-auto mt-10 max-w-[680px]">
          <div className="space-y-0 border-l-2 border-electric/20 pl-8">
            {journeySteps.map((step, i) => (
              <Reveal key={step.label} delay={0.2 + i * 0.1} variant="fade">
                <div className="relative pb-8 last:pb-0">
                  <div className="absolute -left-[41px] top-1 flex size-5 items-center justify-center rounded-full bg-electric">
                    <Check className="size-3 text-white" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-electric">{step.label}</p>
                  <p className="mt-1 font-display text-[18px] leading-snug text-ink">{step.title}</p>
                  <p className="mt-1 text-[13px] text-slate">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Architecture Section (minimal) ─── */

function ArchitectureSection() {
  return (
    <section className="bg-cyan-surface px-5 py-20 sm:px-7 lg:px-0 lg:py-28">
      <Reveal className="page-shell mx-auto max-w-[700px] text-center">
        <MicroLabel className="text-electric">Under the hood</MicroLabel>
        <DisplayTitle className="mt-6">One AI on the surface.<br />A growth team underneath.</DisplayTitle>
        <p className="mx-auto mt-5 max-w-[500px] text-[15px] text-slate">You never have to decide which agent, model, workflow, or tool should handle the work.</p>

        {/* Visual flow */}
        <Reveal delay={0.2} variant="scale" className="mt-12">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="rounded-full border-2 border-electric bg-white px-6 py-3 text-[14px] font-bold text-electric">You</div>
            <div className="h-6 w-px bg-electric/30" />
            <div className="rounded-full bg-electric px-6 py-3 text-[14px] font-bold text-white shadow-[0_4px_20px_rgb(31_94_255_/_30%)]">Collision</div>
            <div className="h-6 w-px bg-electric/30" />
            <div className="flex flex-wrap justify-center gap-2">
              {["Research", "Strategy", "Content", "Distribution", "Analytics", "Optimization"].map((item) => (
                <span key={item} className="rounded-full bg-white px-4 py-2 text-[12px] font-medium text-ink shadow-sm ring-1 ring-ink/10">{item}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </Reveal>
    </section>
  );
}

/* ─── Proof Section ─── */

function ProofSection() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="bg-[#0a0f1a] px-5 py-20 text-white sm:px-7 lg:px-0 lg:py-32">
      <div className="page-shell">
        <Reveal className="mx-auto max-w-[700px] text-center">
          <MicroLabel className="text-mint">Growth proof</MicroLabel>
          <DisplayTitle id="proof-title" className="mt-6 text-white">Growth isn&apos;t a promise.<br />It&apos;s a system you can measure.</DisplayTitle>
          <p className="mt-5 text-[15px] text-white/50">Across companies, campaigns and growth programs run with Collision.</p>
        </Reveal>

        {/* Metrics grid */}
        <div className="mx-auto mt-16 grid max-w-[1000px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06} variant="scale">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center transition-all duration-300 hover:border-electric/20 hover:bg-white/[0.06]">
                <p className="font-display text-[36px] leading-none text-white sm:text-[42px]">
                  <AnimatedCounter value={m.value} suffix={m.suffix} delay={0.3 + i * 0.1} />
                </p>
                <p className="mt-3 text-[12px] font-medium uppercase tracking-wider text-white/40">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Cascade flow */}
        <Reveal delay={0.4} className="mx-auto mt-20 max-w-[500px]">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-electric">From one request to hundreds of growth actions</p>
            <div className="mt-8 space-y-3">
              {Object.values(cascadeFlow).map((item, i) => (
                <motion.div
                  key={item}
                  className={cn(
                    "rounded-xl px-5 py-3 text-[14px] font-medium",
                    i === 0 ? "bg-electric/20 text-electric" : i === Object.values(cascadeFlow).length - 1 ? "bg-mint/20 text-mint" : "bg-white/[0.06] text-white/70"
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Case studies */}
        <div className="mx-auto mt-16 grid max-w-[1000px] gap-4 sm:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.label} delay={0.1 * i} variant="fade">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7">
                <p className="font-display text-[32px] leading-none text-electric">{study.metric}</p>
                <p className="mt-2 text-[12px] font-bold uppercase tracking-wider text-white/60">{study.label}</p>
                <p className="mt-4 text-[13px] leading-relaxed text-white/45">{study.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Surface Detail Section ─── */

function SurfaceDetailSection() {
  return (
    <section className="bg-paper px-5 py-20 sm:px-7 lg:px-0 lg:py-28">
      <Reveal className="page-shell">
        <div className="mx-auto max-w-[700px] text-center">
          <MicroLabel className="text-electric">Built for the entire growth loop</MicroLabel>
          <DisplayTitle className="mt-6">What Collision does across every surface.</DisplayTitle>
        </div>

        <Reveal delay={0.2} className="mx-auto mt-14 max-w-[800px] overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
          <div className="divide-y divide-ink/8">
            {surfaceDetails.map((item) => (
              <div key={item.surface} className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-cyan-surface/40">
                <span className="text-[13px] font-bold text-ink">{item.surface}</span>
                <span className="text-right text-[13px] text-slate">{item.action}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.4} className="mx-auto mt-10 max-w-[600px] text-center">
          <p className="text-[15px] text-slate">You don&apos;t need to know that you need an SEO campaign. You don&apos;t need to decide whether the answer is LinkedIn, outbound, content, paid, or something nobody has thought of yet.</p>
          <p className="mt-4 font-display text-[20px] text-ink">You tell Collision the goal. Collision works backward from the outcome.</p>
        </Reveal>
      </Reveal>
    </section>
  );
}

/* ─── FAQ Section ─── */

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-cyan-surface px-5 py-20 sm:px-7 lg:px-0 lg:py-28">
      <Reveal className="page-shell max-w-[760px]">
        <MicroLabel className="text-electric">Questions, answered</MicroLabel>
        <DisplayTitle id="faq-title" className="mt-6">The questions you actually have.</DisplayTitle>
        <div className="mt-14 space-y-3">
          {faqItems.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.05} variant="fade">
              <div className="overflow-hidden rounded-xl border border-ink/10 bg-white transition-shadow hover:shadow-sm">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <h3 className="font-display text-[18px] leading-snug text-ink sm:text-[20px]">{item.question}</h3>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-[20px] text-electric"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      <div className="border-t border-ink/8 px-6 pb-6 pt-4">
                        <BodyCopy className="text-[14px] text-slate">{item.answer}</BodyCopy>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Resources / Explore Section ─── */

function ExploreSection() {
  const sections = [
    { href: "/alternatives", title: "Alternatives", note: "Every competitor, honestly compared." },
    { href: "/compare", title: "Compare", note: "Side-by-side capability tables." },
    { href: "/category", title: "Guides", note: "The 2026 landscape, explained." },
    { href: "/blog", title: "Blog", note: "Thinking on growth, AI, and systems." },
  ];

  return (
    <section id="resources" aria-labelledby="explore-title" className="bg-paper px-5 py-20 sm:px-7 lg:px-0 lg:py-28">
      <Reveal className="page-shell max-w-[880px]">
        <MicroLabel className="text-electric">Resources</MicroLabel>
        <DisplayTitle id="explore-title" className="mt-6">Go deeper.</DisplayTitle>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {sections.map((item) => (
            <Reveal key={item.href} variant="fade">
              <Link href={item.href} className="group block h-full rounded-2xl border border-ink/10 bg-white p-7 transition-all duration-200 hover:border-electric/30 hover:shadow-[0_4px_20px_rgb(31_94_255_/_8%)]">
                <p className="font-display text-[22px] text-ink transition-colors group-hover:text-electric">{item.title}</p>
                <p className="mt-2 text-[13px] text-slate">{item.note}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-electric">
                  Browse <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Final CTA ─── */

function FinalCtaSection() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-[#0a0f1a] px-5 py-24 text-center text-white sm:px-7 lg:px-0 lg:py-36">
      {/* Background glow */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#1f5eff22_0%,transparent_70%)] blur-2xl" />
      </div>

      <Reveal variant="scale" className="relative mx-auto max-w-[750px]">
        <MicroLabel className="text-electric">Ready?</MicroLabel>
        <DisplayTitle id="cta-title" className="mt-6 text-white sm:text-[50px] md:text-[64px]">
          You own the goal.<br />
          <span className="bg-gradient-to-r from-electric to-mint bg-clip-text text-transparent">Collision owns the work.</span>
        </DisplayTitle>
        <p className="mx-auto mt-6 max-w-[480px] text-[15px] text-white/50">One conversation. One memory. One intelligence that compounds every decision into better growth.</p>
        <a href="https://cal.com/collision" target="_blank" rel="noopener noreferrer">
          <Button type="button" size="lg" className="mt-10 h-13 rounded-full bg-electric px-8 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#1745c2] hover:shadow-[0_0_30px_rgb(31_94_255_/_50%)]">
            Meet Collision <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Button>
        </a>
      </Reveal>
    </section>
  );
}

/* ─── Main Export ─── */

export default function CollisionLanding() {
  return (
    <main className="collision-page">
      <FloatingNav />
      <HeroSection />
      <DifferenceSection />
      <SurfacesSection />
      <HowItWorksSection />
      <ArchitectureSection />
      <ProofSection />
      <SurfaceDetailSection />
      <FaqSection />
      <ExploreSection />
      <FinalCtaSection />
    </main>
  );
}
