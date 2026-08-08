"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useInView } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  faqItems,
  journeySteps,
  navigationLinks,
  ownershipRows,
  promptSuggestions,
  specialists,
  type Accent,
} from "@/lib/collision-content";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const heroVideo = "https://videos.pexels.com/video-files/14017302/14017302-sd_960_540_30fps.mp4";
const heroPoster = "https://images.pexels.com/videos/14017302/pexels-photo-14017302.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200";

const accentText: Record<Accent, string> = {
  blue: "text-electric",
  coral: "text-coral",
  mint: "text-[#008f7b]",
  yellow: "text-[#b18a20]",
};

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

function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-ink/90 shadow-[0_2px_20px_rgb(21_33_58_/_15%)] backdrop-blur-xl"
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

        <div className="hidden items-center gap-6 text-[11px] font-medium tracking-[0.08em] text-white/80 md:flex">
          {navigationLinks.map(([label, href]) => (
            <Link key={href} href={href} className="transition-colors duration-200 hover:text-white">{label}</Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="https://cal.com/collision" target="_blank" rel="noopener noreferrer">
            <Button type="button" size="lg" className="h-9 rounded-full bg-electric px-5 text-[11px] font-semibold text-white ring-1 ring-white/40 transition-all duration-200 hover:bg-[#1745c2] hover:ring-white/60 sm:h-10 sm:px-6 sm:text-[12px]">
              Meet Collision
            </Button>
          </a>
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="size-9 rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:size-10 md:hidden"
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
            className="mx-4 overflow-hidden rounded-2xl bg-white/95 shadow-xl backdrop-blur-md md:hidden"
          >
            <div className="grid gap-1 p-2">
              {navigationLinks.map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-ink hover:bg-cyan-surface">
                  {label}
                </Link>
              ))}
              <a
                href="https://cal.com/collision"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-electric px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Meet Collision
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}

function GrowthPrompt() {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open("https://cal.com/collision", "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[780px] rounded-[18px] bg-paper p-4 text-left text-ink ring-1 ring-white/55 transition-shadow duration-300 hover:shadow-[0_8px_40px_rgb(31_94_255_/_12%)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="What should we grow today?"
          aria-label="Growth objective"
          className="h-12 flex-1 rounded-xl border-0 bg-transparent px-4 py-3 text-[15px] shadow-none placeholder:text-slate focus-visible:ring-2 focus-visible:ring-electric/30"
        />
        <Button type="submit" size="lg" className="h-11 shrink-0 rounded-full bg-electric px-6 text-[12px] font-semibold text-white hover:bg-[#1745c2]">
          Meet Collision <ArrowRight className="ml-1 size-3.5" aria-hidden="true" />
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 border-t border-ink/10 px-3 pb-2 pt-4">
        {promptSuggestions.map((suggestion, index) => (
          <Button
            key={suggestion}
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setPrompt(suggestion)}
            className={cn("h-auto rounded-full px-3.5 py-2 text-[11px] font-normal text-[#52667d] hover:bg-white", index === promptSuggestions.length - 1 ? "bg-[#fff2cf]" : "bg-[#e9f8fb]")}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </form>
  );
}

function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#77d8ef] sm:min-h-[760px]">
      <video aria-label="Misty mountain landscape" autoPlay className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000" loop muted playsInline poster={heroPoster} preload="metadata" src={heroVideo} />
      <div className="absolute inset-0 bg-[#57cce9]/45 mix-blend-color" aria-hidden="true" />
      <div className="absolute inset-0 bg-[#12335a]/38" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0c2749]/75 via-[#144b6c]/24 to-transparent" aria-hidden="true" />
      <motion.div
        className="sun-haze absolute right-[14%] top-[17%] size-48 rounded-full bg-soft-yellow/35 blur-3xl"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.42, 0.7, 0.42] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[980px] flex-col items-center px-5 pb-12 pt-28 text-center text-white sm:px-7 sm:pt-32">
        <HeroReveal><MicroLabel className="text-white/75">The AI you hire to run growth</MicroLabel></HeroReveal>
        <HeroReveal delay={0.08}>
          <h1 id="hero-title" className="mt-6 max-w-[900px] font-display text-[36px] font-medium leading-[1.05] tracking-[-0.05em] sm:text-[52px] md:text-[74px] lg:text-[88px]">
            Replace your entire <em className="font-normal text-soft-yellow">growth team.</em>
          </h1>
        </HeroReveal>
        <HeroReveal delay={0.16}>
          <BodyCopy className="mt-7 max-w-[760px] text-[16px] text-white/88 sm:text-[18px]">
            A single growth intelligence that researches, writes, distributes, and learns across every surface your business depends on.
          </BodyCopy>
        </HeroReveal>
        <HeroReveal delay={0.24} className="mt-10 w-full">
          <div className="flex justify-center">
            <GrowthPrompt />
          </div>
        </HeroReveal>
        <HeroReveal delay={0.32}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-medium uppercase tracking-[0.15em] text-white/70">
            <span>One conversation</span><span className="text-white/35">·</span><span>One memory</span><span className="text-white/35">·</span><span>One source of truth</span>
            <Badge className="ml-2 h-auto rounded-full border-0 bg-mint/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#12335a]">approval-based</Badge>
          </div>
        </HeroReveal>
      </div>
    </section>
  );
}

function OwnershipSection() {
  return (
    <section id="ownership" aria-labelledby="ownership-title" className="bg-paper px-5 py-20 sm:px-7 lg:px-0 lg:py-28">
      <Reveal className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <MicroLabel className="text-electric">The whole function</MicroLabel>
            <DisplayTitle id="ownership-title" className="mt-5 max-w-[570px]">If it contributes to growth, Collision can own it.</DisplayTitle>
          </div>
          <div className="border-l-2 border-electric pl-7 lg:mb-1">
            <BodyCopy className="text-[18px] text-[#405570]">Most AI products solve one problem. Collision owns one outcome: <span className="font-semibold text-electric">growth.</span></BodyCopy>
            <BodyCopy className="mt-4 max-w-[510px] text-[14px] text-slate">Not another SEO tool. Not another writing tool. Not another analytics dashboard or marketing automation platform. One intelligence sees the full picture and makes decisions across every surface.</BodyCopy>
          </div>
        </div>

        <div className="mt-16 divide-y divide-ink/12 border-y border-ink/15">
          {ownershipRows.map((row, index) => (
            <Reveal key={row.category} delay={index * 0.1} className="grid gap-5 py-7 lg:grid-cols-[160px_1fr_260px] lg:items-center">
              <div className={cn("text-[12px] font-semibold uppercase tracking-[0.18em]", accentText[row.accent])}>{row.category}</div>
              <p className="font-display text-[24px] leading-[1.2] text-ink">{row.title} {row.subtext ? <span className="font-sans text-[15px] text-slate">{row.subtext}</span> : null}</p>
              <BodyCopy className="text-[13px] leading-5 text-slate">{row.description}</BodyCopy>
            </Reveal>
          ))}
        </div>
        <p className="mt-7 text-right font-display text-[13px] italic text-slate">You ask for the outcome. Collision figures out the work.</p>
      </Reveal>
    </section>
  );
}

function ChatBubble({ message, isResponse, delay = 0 }: { message: string; isResponse?: boolean; delay?: number }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={cn("flex", isResponse ? "justify-end" : "justify-start")}
      initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className={cn(
        "relative max-w-[380px] rounded-2xl px-5 py-4",
        isResponse
          ? "rounded-br-sm bg-electric text-white shadow-[0_4px_16px_rgb(31_94_255_/_25%)]"
          : "rounded-bl-sm bg-white text-ink shadow-[0_2px_12px_rgb(21_33_58_/_8%)]"
      )}>
        <p className={cn("text-[11px] font-semibold uppercase tracking-[0.12em] mb-2", isResponse ? "text-white/60" : "text-slate")}>
          {isResponse ? "Collision" : "You"}
        </p>
        <p className="font-display text-[20px] leading-[1.2] sm:text-[24px]">{message}</p>
      </div>
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) {
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
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <span ref={ref}>
      <span className="sr-only">{value}{suffix}</span>
      <span aria-hidden="true">{display}{suffix}</span>
    </span>
  );
}

function ExperienceSection() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="bg-cyan-surface px-5 py-20 sm:px-7 lg:px-0 lg:py-36">
      <Reveal className="page-shell grid gap-16 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-28">
        <div>
          <MicroLabel className="text-electric">The experience</MicroLabel>
          <DisplayTitle id="approach-title" className="mt-6 max-w-[700px]">Working with Collision should feel like working with <span className="text-coral">the best Head of Growth</span> you&apos;ve ever met.</DisplayTitle>
          <BodyCopy className="mt-8 max-w-[590px] text-[17px] text-[#52667d]">You never think about prompts, workflows, or which AI model to use. You simply talk to Collision, and the work moves forward with context.</BodyCopy>
        </div>
        <div className="space-y-4" aria-label="Example conversation with Collision">
          <ChatBubble message="Launch our product." delay={0.15} />
          <ChatBubble message="Understood. I'll research, plan, write, distribute, and learn." isResponse delay={0.55} />
        </div>
      </Reveal>
    </section>
  );
}


function BehindScenesSection() {
  return (
    <section id="behind" aria-labelledby="behind-title" className="bg-deep-blue px-5 py-20 text-white sm:px-7 lg:px-0 lg:py-32">
      <Reveal className="page-shell grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:gap-28">
        <div>
          <MicroLabel className="text-[#9beef2]">Behind the scenes</MicroLabel>
          <DisplayTitle id="behind-title" className="mt-6 max-w-[470px] text-white">One conversation. A network of specialists.</DisplayTitle>
          <BodyCopy className="mt-7 max-w-[390px] text-[16px] text-white/70">Collision appears as a single AI. Behind that conversation, specialized systems handle the work. You only know Collision.</BodyCopy>
          <div className="mt-8 flex flex-wrap gap-2">
            <Badge className="h-auto rounded-full border-0 bg-mint px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">approval-based</Badge>
            <Badge className="h-auto rounded-full border-0 bg-soft-yellow px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">private memory</Badge>
            <Badge className="h-auto rounded-full border-0 bg-[#ff9b87] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">one source of truth</Badge>
          </div>
        </div>

        <div className="border-y border-white/20">
          <div className="flex items-center justify-between border-b border-white/20 py-5 text-[11px] uppercase tracking-[0.15em] text-[#b9d3ec]">
            <span>Collision / operating layer</span><span>always on</span>
          </div>
          <div className="grid gap-0 sm:grid-cols-2">
            {specialists.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} variant="fade" className={cn("border-b border-white/15 py-6", index % 2 === 0 ? "sm:border-r sm:pr-8" : "sm:pl-8", index >= specialists.length - 2 && "border-b-0")}>
                <p className={cn("text-[17px]", item.accent ? "text-soft-yellow" : "text-white")}>{item.title}</p>
                <p className="mt-2 text-[12px] text-white/55">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function JourneySection() {
  return (
    <section aria-labelledby="journey-title" className="bg-paper px-5 py-20 sm:px-7 lg:px-0 lg:py-36">
      <Reveal className="page-shell">
        <div className="max-w-[650px]">
          <MicroLabel className="text-electric">Objective → work → outcome</MicroLabel>
          <DisplayTitle id="journey-title" className="mt-6">Growth moves as one system.</DisplayTitle>
        </div>
        <div className="mt-16 grid gap-0 border-y border-ink/15 lg:grid-cols-3">
          {journeySteps.map((step, index) => (
            <Reveal key={step.label} delay={index * 0.12} variant="scale" className={cn("py-8", index < journeySteps.length - 1 ? "border-b border-ink/15 lg:border-b-0 lg:border-r" : "", index === 0 ? "lg:pr-10" : index === 1 ? "lg:px-10" : "lg:pl-10")}>
              <MicroLabel className={accentText[step.accent]}>{step.label}</MicroLabel>
              <p className="mt-5 font-display text-[29px] leading-[1.1]">{step.title}</p>
              <BodyCopy className="mt-5 text-[14px] text-slate">{step.description}</BodyCopy>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function ProofSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="proof" aria-labelledby="proof-title" className="border-t border-ink/12 bg-cyan-surface px-5 py-16 sm:px-7 lg:px-0 lg:py-24">
      <div ref={ref} className="page-shell">
        <h2 id="proof-title" className="sr-only">Growth proof</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <motion.div
            className="lg:border-r lg:border-ink/15 lg:pr-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="font-display text-[42px] leading-none text-ink sm:text-[48px]">
              <AnimatedCounter value={300} suffix="M+" delay={0.1} />
            </p>
            <MicroLabel className="mt-3 text-slate">impressions</MicroLabel>
          </motion.div>

          <motion.div
            className="lg:border-r lg:border-ink/15 lg:px-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="font-display text-[42px] leading-none text-ink sm:text-[48px]">
              <AnimatedCounter value={14} suffix="K" delay={0.25} />
            </p>
            <MicroLabel className="mt-3 text-slate">inbound conversations</MicroLabel>
          </motion.div>

          <motion.div
            className="lg:border-r lg:border-ink/15 lg:px-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="font-display text-[42px] leading-none text-ink sm:text-[48px]">
              <AnimatedCounter value={2} suffix=".4x" delay={0.4} />
            </p>
            <MicroLabel className="mt-3 text-slate">qualified traffic</MicroLabel>
          </motion.div>

          <motion.div
            className="flex items-center justify-between gap-5 lg:pl-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div>
              <p className="font-display text-[42px] leading-none text-ink sm:text-[48px]">
                +<AnimatedCounter value={38} suffix="%" delay={0.55} />
              </p>
              <MicroLabel className="mt-3 text-slate">AI search discovery</MicroLabel>
            </div>
            <svg className="h-16 w-28 shrink-0" viewBox="0 0 112 64" fill="none" role="img" aria-label="Rising growth trend">
              <motion.path
                d="M2 55 C18 52 22 44 34 47 C46 50 48 35 60 39 C70 43 74 27 84 30 C95 33 100 17 110 8"
                stroke="var(--electric)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : undefined}
                transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
              />
              <motion.circle
                cx="110"
                cy="8"
                r="4"
                fill="var(--coral)"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : undefined}
                transition={{ delay: 1.8, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper px-5 py-20 sm:px-7 lg:px-0 lg:py-28">
      <Reveal className="page-shell max-w-[760px]">
        <MicroLabel className="text-electric">Questions, answered</MicroLabel>
        <DisplayTitle id="faq-title" className="mt-6">Frequently asked.</DisplayTitle>
        <div className="mt-14 divide-y divide-ink/12 border-y border-ink/15">
          {faqItems.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.08} variant="fade" className="py-7">
              <h3 className="font-display text-[22px] leading-[1.2] text-ink sm:text-[26px]">{item.question}</h3>
              <BodyCopy className="mt-3 max-w-[640px] text-slate">{item.answer}</BodyCopy>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section id="contact" aria-labelledby="cta-title" className="relative overflow-hidden bg-paper px-5 py-20 text-center sm:px-7 lg:px-0 lg:py-36">
      <motion.div
        className="absolute left-1/2 top-8 size-36 -translate-x-1/2 rounded-full bg-soft-yellow/50 blur-2xl"
        aria-hidden="true"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <Reveal variant="scale" className="relative mx-auto max-w-[820px]">
        <div className="mx-auto mb-7 h-8 w-52 border-b border-electric/35" aria-hidden="true" />
        <MicroLabel className="text-electric">A calmer way to grow</MicroLabel>
        <DisplayTitle id="cta-title" className="mt-6 sm:text-[50px] md:text-[70px]">Collision can replace your entire growth stack.</DisplayTitle>
        <a href="https://cal.com/collision" target="_blank" rel="noopener noreferrer">
          <Button type="button" size="lg" className="mt-10 h-12 rounded-full bg-electric px-7 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#1745c2] hover:shadow-[0_4px_20px_rgb(31_94_255_/_35%)]">
            Meet Collision <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </a>
        <MicroLabel className="mt-6 text-slate">One conversation. One memory. One personality. One source of truth.</MicroLabel>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/15 bg-white px-5 py-8 sm:px-7 lg:px-0">
      <div className="page-shell flex flex-col justify-between gap-5 text-[11px] text-slate sm:flex-row sm:items-center">
        <a href="#top" className="font-display text-[23px] tracking-[-0.05em] text-ink">collision.</a>
        <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Footer navigation">
          <a href="#ownership" className="hover:text-electric">What we own</a>
          <a href="#behind" className="hover:text-electric">Behind the scenes</a>
          <Link href="/blog" className="hover:text-electric">Blog</Link>
          <Link href="/contact" className="hover:text-electric">Contact</Link>
          <a href="https://x.com/usecollision" target="_blank" rel="noopener noreferrer" className="hover:text-electric">X</a>
          <a href="https://linkedin.com/company/usecollision" target="_blank" rel="noopener noreferrer" className="hover:text-electric">LinkedIn</a>
        </nav>
        <span>© 2026 Collision Labs</span>
      </div>
    </footer>
  );
}

export default function CollisionLanding() {
  return (
    <main className="collision-page">
      <FloatingNav />
      <HeroSection />
      <OwnershipSection />
      <ExperienceSection />
      <BehindScenesSection />
      <JourneySection />
      <ProofSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}
