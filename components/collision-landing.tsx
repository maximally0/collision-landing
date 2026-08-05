"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  growthActivities,
  journeySteps,
  metrics,
  navigationLinks,
  ownershipRows,
  promptSuggestions,
  specialists,
  type Accent,
} from "@/lib/collision-content";
import { cn } from "@/lib/utils";

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
    <h2 id={id} className={cn("font-display text-balance text-[45px] font-medium leading-[1.04] tracking-[-0.055em] sm:text-[64px]", className)}>
      {children}
    </h2>
  );
}

function BodyCopy({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[15px] leading-7", className)}>{children}</p>;
}

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.16 }}
      variants={revealVariants}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
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
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={revealVariants}
      transition={{ duration: 0.75, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function LiveGrowthActivity() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % growthActivities.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const activity = growthActivities[activeIndex];

  return (
    <div className="mt-7 w-full max-w-[480px] border-t border-white/20 pt-4 text-left text-white/80" aria-live="polite" aria-label="Live growth activity">
      <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
        <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-mint shadow-[0_0_0_4px_rgb(0_229_192_/_14%)]" aria-hidden="true" />Live growth loop</span>
        <span>{String(activeIndex + 1).padStart(2, "0")} / {String(growthActivities.length).padStart(2, "0")}</span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activity.action}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex items-center justify-between gap-5"
        >
          <div>
            <p className="text-[14px] font-medium text-white">{activity.action}</p>
            <p className="mt-1 text-[12px] text-white/55">{activity.detail}</p>
          </div>
          <Badge className={cn("h-auto shrink-0 rounded-full border-0 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink", activity.status === "working" ? "bg-soft-yellow" : "bg-mint")}>
            {activity.status}
          </Badge>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function FloatingNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute inset-x-0 top-0 z-30" aria-label="Primary navigation">
      <div className="page-shell flex items-center justify-between py-6">
        <a href="#top" className="flex items-center gap-3 text-white" aria-label="Collision home">
          <Image src="/collision-helmet.png" alt="Collision helmet mark" width={32} height={32} className="size-8 rounded-full object-cover ring-1 ring-white/40" priority />
          <span className="text-[17px] font-semibold tracking-[-0.04em]">collision.</span>
        </a>

        <div className="hidden items-center gap-8 text-[11px] font-medium tracking-[0.08em] text-white/80 md:flex">
          {navigationLinks.map(([label, href]) => (
            <a key={href} href={href} className="transition-colors hover:text-white">{label}</a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="https://cal.com/collision" target="_blank" rel="noopener noreferrer">
            <Button type="button" size="lg" className="h-10 rounded-full bg-electric px-5 text-[12px] font-semibold text-white ring-1 ring-white/40 hover:bg-[#1745c2]">
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
            className="size-10 rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white md:hidden"
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
            className="mx-4 overflow-hidden rounded-2xl bg-white/95 shadow-xl backdrop-blur-md md:hidden"
          >
            <div className="grid gap-1 p-2">
              {navigationLinks.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-ink hover:bg-cyan-surface">
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}

function GrowthPrompt() {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open("https://cal.com/collision", "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="quiet-float w-full max-w-[780px] rounded-[18px] bg-paper p-2.5 text-left text-ink ring-1 ring-white/55">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="What should we grow today?"
          aria-label="Growth objective"
          className="h-14 flex-1 rounded-xl border-0 bg-transparent px-4 py-4 text-[15px] shadow-none placeholder:text-slate focus-visible:ring-2 focus-visible:ring-electric/30"
        />
        <Button type="submit" size="lg" className="h-14 rounded-xl bg-electric px-6 text-[13px] font-semibold text-white hover:bg-[#1745c2]">
          Meet Collision
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-ink/10 px-3 pb-2 pt-3">
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
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-[#77d8ef]">
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

      <div className="relative z-10 mx-auto flex w-full max-w-[980px] flex-col items-center px-7 pb-12 pt-32 text-center text-white">
        <HeroReveal><MicroLabel className="text-white/75">The AI you hire to run growth</MicroLabel></HeroReveal>
        <HeroReveal delay={0.08}>
          <h1 id="hero-title" className="mt-6 max-w-[900px] font-display text-[52px] font-medium leading-[1.02] tracking-[-0.06em] sm:text-[74px] lg:text-[88px]">
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
        <HeroReveal delay={0.4}>
          <p className="mt-4 text-[11px] tracking-[0.08em] text-white/60">Not a chatbot. Not an agency. Not another dashboard.</p>
        </HeroReveal>
        <LiveGrowthActivity />
      </div>
    </section>
  );
}

function OwnershipSection() {
  return (
    <section id="ownership" aria-labelledby="ownership-title" className="bg-paper px-7 py-24 lg:px-0 lg:py-28">
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
            <Reveal key={row.category} delay={index * 0.06} className="grid gap-5 py-7 lg:grid-cols-[160px_1fr_260px] lg:items-center">
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

function ConversationCard({ speaker, children, response = false }: { speaker: string; children: ReactNode; response?: boolean }) {
  return (
    <div className={cn("max-w-[430px] border p-6", response ? "ml-auto border-electric/35 bg-electric text-white" : "bg-white border-ink/15 text-ink")}>
      <MicroLabel className={cn("mb-3", response ? "text-right text-white/65" : "text-slate")}>{speaker}</MicroLabel>
      <p className="font-display text-[27px] leading-[1.15]">{children}</p>
    </div>
  );
}

function ExperienceSection() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="bg-cyan-surface px-7 py-28 lg:px-0 lg:py-36">
      <Reveal className="page-shell grid gap-16 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-28">
        <div>
          <MicroLabel className="text-electric">The experience</MicroLabel>
          <DisplayTitle id="approach-title" className="mt-6 max-w-[700px]">Working with Collision should feel like working with the best Head of Growth you&apos;ve ever met.</DisplayTitle>
          <BodyCopy className="mt-8 max-w-[590px] text-[17px] text-[#52667d]">You never think about prompts, workflows, or which AI model to use. You simply talk to Collision, and the work moves forward with context.</BodyCopy>
        </div>
        <div className="space-y-6" aria-label="Example conversation with Collision">
          <ConversationCard speaker="You">“Launch our product.”</ConversationCard>
          <ConversationCard speaker="Collision" response>“Understood. I&apos;ll research, plan, write, distribute, and learn.”</ConversationCard>
        </div>
      </Reveal>
    </section>
  );
}

function BehindScenesSection() {
  return (
    <section id="behind" aria-labelledby="behind-title" className="bg-deep-blue px-7 py-24 text-white lg:px-0 lg:py-32">
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
              <Reveal key={item.title} delay={index * 0.05} className={cn("border-b border-white/15 py-6", index % 2 === 0 ? "sm:border-r sm:pr-8" : "sm:pl-8", index >= specialists.length - 2 && "border-b-0")}>
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
    <section aria-labelledby="journey-title" className="bg-paper px-7 py-28 lg:px-0 lg:py-36">
      <Reveal className="page-shell">
        <div className="max-w-[650px]">
          <MicroLabel className="text-electric">Objective → work → outcome</MicroLabel>
          <DisplayTitle id="journey-title" className="mt-6">Growth moves as one system.</DisplayTitle>
        </div>
        <div className="mt-16 grid gap-0 border-y border-ink/15 lg:grid-cols-3">
          {journeySteps.map((step, index) => (
            <Reveal key={step.label} delay={index * 0.08} className={cn("py-8", index < journeySteps.length - 1 ? "border-b border-ink/15 lg:border-b-0 lg:border-r" : "", index === 0 ? "lg:pr-10" : index === 1 ? "lg:px-10" : "lg:pl-10")}>
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
  return (
    <section id="proof" aria-labelledby="proof-title" className="border-t border-ink/12 bg-cyan-surface px-7 py-20 lg:px-0 lg:py-24">
      <Reveal className="page-shell">
        <h2 id="proof-title" className="sr-only">Growth proof</h2>
        <div className="grid gap-10 lg:grid-cols-4 lg:gap-0">
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.08} className={cn("lg:border-ink/15", index < metrics.length - 1 ? "lg:border-r" : "flex items-center justify-between gap-5 lg:pl-8")}>
              <div className={cn(index > 0 && index < 3 ? "lg:px-8" : "", index === 0 ? "lg:pr-8" : "") }>
                <p className="font-display text-[42px] leading-none text-ink">{metric.value}{metric.suffix ? <span className={accentText[metric.accent ?? "coral"]}>{metric.suffix}</span> : null}</p>
                <MicroLabel className="mt-3 text-slate">{metric.label}</MicroLabel>
              </div>
              {index === metrics.length - 1 ? (
                <svg className="h-16 w-28 shrink-0" viewBox="0 0 112 64" fill="none" role="img" aria-label="Rising growth trend">
                  <motion.path
                    d="M2 55 C18 52 22 44 34 47 C46 50 48 35 60 39 C70 43 74 27 84 30 C95 33 100 17 110 8"
                    stroke="var(--electric)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                  />
                  <motion.circle
                    cx="110"
                    cy="8"
                    r="3.5"
                    fill="var(--coral)"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                  />
                </svg>
              ) : null}
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section id="contact" aria-labelledby="cta-title" className="relative overflow-hidden bg-paper px-7 py-28 text-center lg:px-0 lg:py-36">
      <div className="sun-haze absolute left-1/2 top-8 size-28 -translate-x-1/2 rounded-full bg-soft-yellow/70 blur-xl" aria-hidden="true" />
      <Reveal className="relative mx-auto max-w-[820px]">
        <div className="mx-auto mb-7 h-8 w-52 border-b border-electric/35" aria-hidden="true" />
        <MicroLabel className="text-electric">A calmer way to grow</MicroLabel>
        <DisplayTitle id="cta-title" className="mt-6 sm:text-[70px]">Collision can replace your entire growth stack.</DisplayTitle>
        <a href="https://cal.com/collision" target="_blank" rel="noopener noreferrer">
          <Button type="button" size="lg" className="mt-10 h-12 rounded-full bg-electric px-7 text-[13px] font-semibold text-white hover:bg-[#1745c2]">
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
    <footer className="border-t border-ink/15 bg-white px-7 py-8 lg:px-0">
      <div className="page-shell flex flex-col justify-between gap-5 text-[11px] text-slate sm:flex-row sm:items-center">
        <a href="#top" className="font-display text-[23px] tracking-[-0.05em] text-ink">collision.</a>
        <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Footer navigation">
          <a href="#ownership" className="hover:text-electric">What we own</a>
          <a href="#behind" className="hover:text-electric">Behind the scenes</a>
          <a href="/contact" className="hover:text-electric">Contact</a>
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
      <FinalCtaSection />
      <Footer />
    </main>
  );
}
