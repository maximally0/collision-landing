"use client";

import { useState, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BrainCircuit,
  Check,
  Menu,
  MessageCircle,
  PenLine,
  Rocket,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const helmetImage = "/collision-helmet.png";
const heroImage =
  "https://kombai-assets.b-cdn.net/generated_assets/ae108eacaeea46e8b9d85ce3ea4b235e.jpg";
const overwhelmedImage =
  "https://kombai-assets.b-cdn.net/generated_assets/13b0d6eaf7bf48cb9a94510d0b654726.jpg";
const handledImage =
  "https://kombai-assets.b-cdn.net/generated_assets/3ca7b96a02624fa99f948e8ea55deed8.jpg";
const mascotImage =
  "https://kombai-assets.b-cdn.net/generated_assets/c8f608587bf04d20abd249b05f177e57.jpg";
const finalImage =
  "https://kombai-assets.b-cdn.net/generated_assets/c3f729b9a34e496f9ea5f3c929f5d5d8.jpg";

type Accent = "yellow" | "blue" | "mint" | "coral" | "surface";

type Capability = {
  title: string;
  emoji: string;
  description: string;
  eyebrow: string;
  accent: Accent;
  rotation: number;
  icon: ReactNode;
};

const capabilityItems: Capability[] = [
  {
    title: "Think",
    emoji: "🧠",
    description: "Learns your voice, goals, and opinions before it ever hits send.",
    eyebrow: "01 / voice DNA",
    accent: "yellow",
    rotation: -1.5,
    icon: <BrainCircuit className="size-7" aria-hidden="true" />,
  },
  {
    title: "Create",
    emoji: "✍️",
    description: "Writes posts that sound like you — not like a content machine.",
    eyebrow: "02 / point of view",
    accent: "blue",
    rotation: 1,
    icon: <PenLine className="size-7" aria-hidden="true" />,
  },
  {
    title: "Engage",
    emoji: "💬",
    description: "Replies, comments, and DMs keep moving while you keep building.",
    eyebrow: "03 / open loops",
    accent: "mint",
    rotation: -1,
    icon: <MessageCircle className="size-7" aria-hidden="true" />,
  },
  {
    title: "Grow",
    emoji: "🚀",
    description: "Keeps you consistently present without asking for your whole day.",
    eyebrow: "04 / momentum",
    accent: "coral",
    rotation: 1.7,
    icon: <Rocket className="size-7" aria-hidden="true" />,
  },
];

const chatPairs = [
  { prompt: "Reply to everyone from today.", response: "Done. I replied to 18 comments." },
  {
    prompt: "Anything interesting today?",
    response: "Three founders mentioned you. I drafted replies.",
  },
  {
    prompt: "Write something about AI browsers.",
    response: "Done. Want it opinionated or educational?",
  },
];

const steps = [
  {
    number: "1",
    title: "Teach me who you are.",
    description: "Connect your profiles. Collision learns your voice, humor, and expertise.",
    accent: "yellow" as Accent,
    align: "left" as const,
  },
  {
    number: "2",
    title: "Talk to me naturally.",
    description: "No complex prompts. Tell Collision what matters today in plain English.",
    accent: "blue" as Accent,
    align: "right" as const,
  },
  {
    number: "3",
    title: "Go build. I've got this.",
    description: "Go back to your real work. Collision handles the replies, posting, and growth.",
    accent: "mint" as Accent,
    align: "left" as const,
  },
];

const accentClasses: Record<Accent, string> = {
  yellow: "bg-soft-yellow text-ink",
  blue: "bg-electric text-white",
  mint: "bg-mint text-ink",
  coral: "bg-coral text-white",
  surface: "bg-white text-ink",
};

function DisplayTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("font-display text-balance text-5xl leading-[0.9] tracking-[-0.055em] sm:text-7xl", className)}>
      {children}
    </h2>
  );
}

function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduce ? 0 : 0.72, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FloatingNav({ onClientCta }: { onClientCta: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Features", "#features"],
    ["How it works", "#how"],
    ["Pricing", "#pricing"],
    ["Blog", "#blog"],
  ];

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-[1180px] -translate-x-1/2" aria-label="Primary navigation">
      <div className="rounded-full border-2 border-ink bg-white/95 p-2 shadow-comic backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 px-2 sm:px-3">
          <a href="#top" className="flex items-center gap-2" aria-label="Collision home">
            <img src={helmetImage} alt="Collision helmet logo" className="size-9 rounded-full object-cover sm:size-10" />
            <span className="font-display text-xl font-black tracking-[-0.04em] sm:text-2xl">Collision</span>
          </a>

          <div className="hidden items-center gap-7 text-xs font-black uppercase tracking-[0.16em] md:flex">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-electric">
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="lg"
              onClick={onClientCta}
              className="h-9 rounded-full border-2 border-ink bg-electric px-4 text-xs font-black text-white shadow-[2px_2px_0_var(--ink)] hover:bg-ink sm:h-10 sm:px-5"
            >
              <span className="hidden sm:inline">Become a Client</span>
              <span className="sm:hidden">Join</span>
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="size-9 rounded-full border-2 border-ink md:hidden"
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
              className="overflow-hidden md:hidden"
            >
              <div className="grid gap-1 px-2 pb-2 pt-3">
                {links.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-full px-4 py-3 text-sm font-black uppercase tracking-[0.12em] hover:bg-soft-yellow"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </nav>
  );
}

function StatusSticker({ label, accent, className }: { label: string; accent: Accent; className?: string }) {
  return (
    <motion.div
      className={cn("absolute z-20 rounded-2xl border-2 border-ink px-3 py-2 text-xs font-black uppercase tracking-[-0.03em] shadow-comic", accentClasses[accent], className)}
      animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {label}
    </motion.div>
  );
}

function HeroSection({ onClientCta }: { onClientCta: () => void }) {
  return (
    <section id="top" className="paper-grid px-4 pb-20 pt-32 sm:px-6 sm:pt-36">
      <div className="page-shell grid overflow-hidden rounded-comic-lg border-2 border-ink bg-white shadow-comic-lg lg:grid-cols-[1.07fr_0.93fr]">
        <div className="relative flex min-h-[620px] flex-col justify-center bg-paper p-7 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute inset-0 paper-dots opacity-60" aria-hidden="true" />
          <div className="relative z-10">
            <span className="inline-flex rounded-full border-2 border-ink bg-soft-yellow px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] shadow-[2px_2px_0_var(--ink)]">
              Internet-native teammate
            </span>
            <h1 className="mt-8 max-w-[720px] font-display text-6xl leading-[0.84] tracking-[-0.06em] sm:text-8xl lg:text-[7.4rem]">
              The AI that <span className="text-electric italic">represents you</span> online.
            </h1>
            <p className="mt-8 max-w-xl text-xl font-medium leading-tight sm:text-2xl">
              Focus on building. Collision writes, replies, engages, and keeps your online presence alive while you&apos;re busy doing real work.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                type="button"
                size="lg"
                onClick={onClientCta}
                className="h-12 rounded-full border-2 border-ink bg-electric px-6 text-base font-black text-white shadow-comic hover:bg-ink"
              >
                Become a Client <ArrowRight className="size-5" aria-hidden="true" />
              </Button>
              <a href="#how" className="group inline-flex items-center gap-3 font-black">
                <span className="border-b-2 border-transparent group-hover:border-ink">See how Collision works</span>
                <span className="grid size-9 place-items-center rounded-full border-2 border-ink group-hover:bg-ink group-hover:text-white" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden border-t-2 border-ink bg-light-cyan lg:border-l-2 lg:border-t-0">
          <img src={heroImage} alt="Developer building at a laptop while small Collision teammates carry message bubbles" className="h-full w-full object-cover" />
          <StatusSticker label="replying…" accent="coral" className="right-6 top-8 -rotate-6" />
          <StatusSticker label="posting on X…" accent="yellow" className="left-5 top-1/2 -rotate-3" />
          <StatusSticker label="DMs handled ✓" accent="blue" className="bottom-8 right-5 rotate-3" />
          <motion.img
            src={helmetImage}
            alt="Collision helmet teammate sticker"
            className="absolute bottom-16 left-10 z-10 size-20 rounded-full border-2 border-ink bg-white object-cover p-2 shadow-comic"
            animate={{ y: [0, -14, 0], rotate: [-5, 3, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="page-shell mt-5 flex items-center justify-between px-1 text-xs font-black uppercase tracking-[0.15em] text-muted">
        <span>Small teammate. Big internet energy.</span>
        <ArrowDownRight className="size-4" aria-hidden="true" />
      </div>
    </section>
  );
}

function ComicProblemSection() {
  return (
    <section className="bg-paper px-4 py-24 sm:px-6 sm:py-32">
      <div className="page-shell">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow className="justify-center">The internet problem</Eyebrow>
          <DisplayTitle className="mt-6 sm:text-8xl">Your online presence has become a full-time job.</DisplayTitle>
        </Reveal>
        <div className="relative mt-20 grid gap-16 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div className="relative rotate-[-1deg]">
              <div className="absolute -top-6 left-3 z-10 -rotate-3 border-2 border-ink bg-coral px-5 py-2 text-sm font-black uppercase text-white shadow-comic sm:text-lg">You, 47 tabs deep</div>
              <div className="comic-frame overflow-hidden bg-white p-2">
                <img src={overwhelmedImage} alt="Founder buried under notifications and social media messages" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="relative mt-6 rotate-[1.5deg] md:mt-24">
              <div className="absolute -right-1 -top-6 z-10 rotate-3 border-2 border-ink bg-mint px-5 py-2 text-sm font-black uppercase shadow-comic sm:text-lg">Collision, on it.</div>
              <div className="comic-frame overflow-hidden bg-white p-2">
                <img src={handledImage} alt="Collision helmet calmly organizing a founder's online work" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
              </div>
            </div>
          </Reveal>
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block" aria-hidden="true">
            <div className="grid size-16 place-items-center rounded-full border-2 border-ink bg-soft-yellow text-2xl shadow-comic">→</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({ item, index }: { item: Capability; index: number }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.article
      className={cn("group relative min-h-[310px] overflow-hidden rounded-comic border-2 border-ink p-7 shadow-comic-lg sm:p-10", accentClasses[item.accent])}
      style={{ rotate: reduce ? 0 : item.rotation }}
      whileHover={reduce ? undefined : { y: -10, rotate: 0, scale: 1.015 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-6xl leading-none" aria-hidden="true">{item.emoji}</span>
        <span className="rounded-full border-2 border-current px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]">{item.eyebrow}</span>
      </div>
      <div className="mt-12 flex items-end justify-between gap-5">
        <div>
          <h3 className="font-display text-5xl tracking-[-0.05em] sm:text-6xl">{item.title}</h3>
          <p className="mt-4 max-w-lg text-lg font-medium leading-tight sm:text-xl">{item.description}</p>
        </div>
        <div className="hidden size-14 shrink-0 place-items-center rounded-full border-2 border-current/20 bg-white/15 sm:grid">{item.icon}</div>
      </div>
      <span className="absolute bottom-5 right-7 font-black text-5xl opacity-10" aria-hidden="true">0{index + 1}</span>
    </motion.article>
  );
}

function CapabilitiesSection() {
  return (
    <section id="features" className="paper-grid px-4 py-24 sm:px-6 sm:py-32">
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <Eyebrow>What Collision actually does</Eyebrow>
            <DisplayTitle className="mt-5 max-w-3xl sm:text-8xl">Less dashboard. More teammate.</DisplayTitle>
          </Reveal>
          <p className="max-w-xs text-base italic text-muted sm:mb-2">Four ways Collision keeps you in the conversation without making you live there.</p>
        </div>
        <div className="mt-16 grid gap-7 sm:grid-cols-2">
          {capabilityItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.07}>
              <CapabilityCard item={item} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConversationSection() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 sm:py-32">
      <div className="page-shell max-w-4xl">
        <Reveal className="text-center">
          <Eyebrow className="justify-center">A teammate you can talk to</Eyebrow>
          <DisplayTitle className="mt-6 sm:text-8xl">Talk to Collision.</DisplayTitle>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted sm:text-xl">No command center. No prompt gymnastics. Just tell it what you need.</p>
        </Reveal>
        <div className="mt-20 space-y-20">
          {chatPairs.map((pair, index) => (
            <div key={pair.prompt} className="space-y-12">
              <Reveal delay={index * 0.05}>
                <div className="bubble-left comic-frame max-w-2xl bg-paper p-7 sm:p-10">
                  <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.15em]"><span className="size-7 rounded-full border-2 border-ink bg-white" aria-hidden="true" />You</div>
                  <p className="font-display text-3xl leading-none tracking-[-0.04em] sm:text-5xl">&quot;{pair.prompt}&quot;</p>
                </div>
              </Reveal>
              <Reveal delay={index * 0.05 + 0.12} className="flex justify-end">
                <div className="bubble-right comic-frame max-w-2xl bg-electric p-7 text-white sm:p-10">
                  <div className="mb-4 flex items-center justify-end gap-3 text-xs font-black uppercase tracking-[0.15em]">Collision <img src={helmetImage} alt="Collision helmet avatar" className="size-7 rounded-full border-2 border-ink bg-white object-cover" /></div>
                  <p className="font-display text-3xl leading-none tracking-[-0.04em] sm:text-5xl">&quot;{pair.response}&quot;</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MeetCollisionSection() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-soft-yellow px-4 py-24 sm:px-6 sm:py-32">
      <div className="pointer-events-none absolute inset-0 paper-dots opacity-40" aria-hidden="true" />
      <div className="page-shell relative grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative mx-auto w-full max-w-[520px]">
          <motion.div className="relative mx-auto aspect-square max-w-[470px] rounded-full border-2 border-ink bg-white p-4 shadow-comic-lg sm:p-7" animate={reduce ? undefined : { y: [0, -12, 0], rotate: [-1, 1, -1] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}>
            <img src={mascotImage} alt="Collision helmet mascot floating above a warm yellow background" className="h-full w-full rounded-full object-cover" />
          </motion.div>
          <StatusSticker label="I'm Collision." accent="surface" className="-left-2 top-5 -rotate-6 sm:-left-10" />
          <StatusSticker label="replying…" accent="mint" className="-right-3 top-1/3" />
          <StatusSticker label="posting…" accent="blue" className="bottom-4 left-5" />
          <motion.img src={helmetImage} alt="Small Collision helmet sticker" className="absolute -bottom-3 right-10 size-16 rounded-full border-2 border-ink bg-white p-1 shadow-comic" animate={reduce ? undefined : { rotate: [4, -5, 4] }} transition={{ duration: 3, repeat: Infinity }} />
        </Reveal>
        <Reveal delay={0.12}>
          <Eyebrow className="text-ink">Meet Collision</Eyebrow>
          <DisplayTitle className="mt-6 max-w-xl text-ink sm:text-8xl">&quot;I make sure you don&apos;t disappear from the internet.&quot;</DisplayTitle>
          <p className="mt-8 max-w-xl border-l-8 border-electric pl-6 text-xl font-medium leading-tight sm:text-2xl">I spend my day making sure the right people hear from you, even when you&apos;re asleep, coding, or deep in the work.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.12em]">{["Consistent ✓", "Authentic ✓", "Proactive ✓"].map((label) => <span key={label} className="rounded-xl border-2 border-ink bg-white px-4 py-3 shadow-comic">{label}</span>)}</div>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how" className="bg-paper px-4 py-24 sm:px-6 sm:py-32">
      <div className="page-shell max-w-5xl">
        <Reveal className="text-center"><Eyebrow className="justify-center">Three steps to internet freedom</Eyebrow><DisplayTitle className="mt-6 sm:text-8xl">How it works.</DisplayTitle></Reveal>
        <div className="relative mt-20">
          <svg className="pointer-events-none absolute inset-x-1/2 top-0 hidden h-full w-72 -translate-x-1/2 md:block" viewBox="0 0 300 1050" fill="none" aria-hidden="true"><motion.path d="M150 10 L70 180 L230 360 L70 540 L230 720 L150 1040" stroke="var(--ink)" strokeDasharray="10 10" strokeWidth="3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 1.8, ease: "easeInOut" }} /></svg>
          <div className="relative space-y-24 md:space-y-32">{steps.map((step, index) => <Reveal key={step.number} delay={index * 0.08}><div className={cn("flex flex-col items-center gap-7 md:flex-row", step.align === "right" ? "md:flex-row-reverse md:text-right" : "md:text-left")}><div className={cn("grid size-28 shrink-0 place-items-center rounded-full border-2 border-ink font-display text-6xl shadow-comic-lg", accentClasses[step.accent])}>{step.number}</div><div className="max-w-xl"><h3 className="font-display text-4xl tracking-[-0.05em] sm:text-6xl">{step.title}</h3><p className="mt-4 text-lg leading-tight text-muted sm:text-xl">{step.description}</p></div></div></Reveal>)}</div>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section id="pricing" className="border-y-2 border-ink bg-white px-4 py-24 sm:px-6 sm:py-32">
      <div className="page-shell"><Reveal className="mb-14 text-center"><Eyebrow className="justify-center">The honest version</Eyebrow><DisplayTitle className="mt-6 sm:text-8xl">Today vs tomorrow.</DisplayTitle></Reveal><Reveal className="grid overflow-hidden rounded-comic-lg border-2 border-ink shadow-comic-lg md:grid-cols-2"><div className="bg-coral p-8 text-white sm:p-14"><p className="text-xs font-black uppercase tracking-[0.16em] text-white/75">Today</p><h3 className="mt-6 max-w-md font-display text-5xl leading-[0.9] tracking-[-0.05em] sm:text-7xl">AI + human operators.</h3><p className="mt-8 max-w-md text-lg font-medium leading-tight text-white/90 sm:text-xl">We&apos;re honest. Our best-in-class AI works alongside creative strategists to keep quality high and your voice safe.</p><div className="mt-12 flex items-center gap-3 text-xs font-black uppercase tracking-[0.1em]"><span className="flex -space-x-3"><span className="size-10 rounded-full border-2 border-ink bg-soft-yellow" /><span className="size-10 rounded-full border-2 border-ink bg-white" /><span className="grid size-10 place-items-center rounded-full border-2 border-ink bg-ink text-white">+12</span></span>Humans in the loop</div></div><div className="relative bg-mint p-8 text-ink sm:p-14"><span className="absolute right-6 top-6 rotate-3 rounded-lg border-2 border-ink bg-white px-3 py-2 text-[10px] font-black uppercase shadow-comic">The direction</span><p className="text-xs font-black uppercase tracking-[0.16em] text-ink/60">Tomorrow</p><h3 className="mt-6 max-w-md font-display text-5xl leading-[0.9] tracking-[-0.05em] sm:text-7xl">Fully autonomous.</h3><p className="mt-8 max-w-md text-lg font-medium leading-tight text-ink/80 sm:text-xl">The vision is zero human intervention: real-time context, strong judgment, and perfect execution 24/7.</p><div className="mt-12 flex items-center gap-3 text-xs font-black uppercase tracking-[0.1em]"><img src={helmetImage} alt="Collision helmet autonomy marker" className="size-10 rounded-full border-2 border-ink bg-white object-cover p-1" />Level 5 autonomy</div></div></Reveal></div>
    </section>
  );
}

function FinalCtaSection({ onClientCta }: { onClientCta: () => void }) {
  return (
    <section className="paper-dots bg-paper px-4 py-24 sm:px-6 sm:py-32">
      <div className="page-shell"><Reveal className="grid items-center gap-12 overflow-hidden rounded-comic-lg border-2 border-ink bg-white p-7 shadow-comic-lg sm:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:p-16"><div><Eyebrow>Ready when you are</Eyebrow><DisplayTitle className="mt-6 max-w-2xl sm:text-8xl">Ready to stop managing your online presence?</DisplayTitle><p className="mt-7 max-w-lg text-lg font-medium leading-tight text-muted sm:text-xl">Let Collision do it. You keep building. We&apos;ll keep the internet warm.</p><Button type="button" size="lg" onClick={onClientCta} className="mt-9 h-14 rounded-full border-2 border-ink bg-electric px-7 text-base font-black text-white shadow-comic hover:bg-ink">Become a Client <ArrowRight className="size-5" aria-hidden="true" /></Button></div><div className="relative rotate-2"><div className="overflow-hidden rounded-comic border-2 border-ink bg-light-cyan p-2 shadow-comic-lg"><img src={finalImage} alt="Relaxed founder building while Collision helmet teammates celebrate" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" /></div><motion.img src={helmetImage} alt="Collision helmet sticker" className="absolute -right-3 -top-5 size-20 rounded-full border-2 border-ink bg-white object-cover p-2 shadow-comic" animate={{ y: [0, -9, 0], rotate: [-8, 5, -8] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} /><motion.span className="absolute -bottom-4 left-8 rounded-full border-2 border-ink bg-soft-yellow px-4 py-2 text-xs font-black uppercase shadow-comic" animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 2.8, repeat: Infinity }}>Let&apos;s go!</motion.span></div></Reveal></div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="blog" className="border-t-2 border-ink bg-white px-4 py-10 sm:px-6"><div className="page-shell"><div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center"><a href="#top" className="flex items-center gap-3" aria-label="Back to Collision home"><img src={helmetImage} alt="Collision helmet logo" className="size-11 rounded-full border-2 border-ink object-cover" /><span className="font-display text-3xl font-black">collision.</span></a><nav className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black uppercase tracking-[0.13em]" aria-label="Footer navigation"><a href="https://x.com/usecollision" target="_blank" rel="noreferrer" className="hover:text-electric">Twitter / X</a><a href="https://www.linkedin.com/company/usecollision" target="_blank" rel="noreferrer" className="hover:text-electric">LinkedIn</a><a href="https://instagram.com/usecollision" target="_blank" rel="noreferrer" className="hover:text-electric">Instagram</a><a href="mailto:hi@usecollision.com" className="hover:text-electric">hi@usecollision.com</a></nav><span className="text-xs text-muted">© 2026 Collision Labs</span></div><div className="mt-10 overflow-hidden border-y-2 border-ink py-3" aria-label="Collision brand message"><div className="marquee-track flex w-max gap-16 whitespace-nowrap font-display text-3xl font-black uppercase tracking-[-0.04em] text-ink/25"><span>BUILD. WE&apos;LL TALK.</span><span>REPRESENTING YOU 24/7.</span><span>BUILD. WE&apos;LL TALK.</span><span>REPRESENTING YOU 24/7.</span><span>BUILD. WE&apos;LL TALK.</span><span>REPRESENTING YOU 24/7.</span></div></div></div></footer>
  );
}

function Toast({ visible }: { visible: boolean }) {
  return <motion.div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-full border-2 border-ink bg-ink px-5 py-3 text-sm font-bold text-white shadow-comic" initial={false} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18, pointerEvents: visible ? "auto" : "none" }} role="status" aria-live="polite"><Check className="size-4 text-mint" aria-hidden="true" />You&apos;re on the Collision list.</motion.div>;
}

export default function CollisionLanding() {
  const [toastVisible, setToastVisible] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const handleClientCta = () => {
    setToastVisible(true);
    setBurstKey((value) => value + 1);
    window.setTimeout(() => setToastVisible(false), 3200);
  };

  return (
    <main className="collision-page">
      <FloatingNav onClientCta={handleClientCta} />
      <HeroSection onClientCta={handleClientCta} />
      <ComicProblemSection />
      <CapabilitiesSection />
      <ConversationSection />
      <MeetCollisionSection />
      <HowItWorksSection />
      <ComparisonSection />
      <FinalCtaSection onClientCta={handleClientCta} />
      <Footer />
      <Toast visible={toastVisible} />
      <AnimatePresence>
        {burstKey > 0 ? <div key={burstKey} className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">{Array.from({ length: 12 }).map((_, index) => <motion.span key={index} className={cn("absolute left-1/2 top-1/2 size-2 rounded-full", index % 4 === 0 ? "bg-electric" : index % 4 === 1 ? "bg-coral" : index % 4 === 2 ? "bg-mint" : "bg-soft-yellow")} initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos(index * 1.8) * (100 + index * 7), y: Math.sin(index * 1.8) * (90 + index * 8), opacity: 0, scale: 0.35, rotate: 160 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} />)}</div> : null}
      </AnimatePresence>
    </main>
  );
}
