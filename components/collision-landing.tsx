"use client";

import { useState, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CircleDot,
  Command,
  Database,
  Mail,
  MessageCircle,
  MousePointer2,
  Network,
  Play,
  Send,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { executionLogs, integrations } from "@/lib/collision-content";
import { cn } from "@/lib/utils";

const connectionImage =
  "https://kombai-assets.b-cdn.net/generated_assets/761269e56b5e4eb2a58a8f36d5b2c8be.jpg?auto=format&w=1200&q=85&fit=crop";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const toneClass = {
  lime: "text-lime",
  cyan: "text-cyan",
  pink: "text-pink",
  lavender: "text-lavender",
  orange: "text-orange",
  muted: "text-white/35",
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduce ? false : reveal.hidden}
      whileInView={reveal.visible}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: shouldReduce ? 0 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FloatingNav({ onEarlyAccess }: { onEarlyAccess: () => void }) {
  return (
    <nav className="floating-nav" aria-label="Primary navigation">
      <a className="flex items-center gap-3 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-cyan" href="#top" aria-label="Collision home">
        <span className="font-heading text-sm font-bold uppercase tracking-[-0.04em] sm:text-base">
          Collision
        </span>
      </a>
      <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/50 sm:flex">
        <span className="status-dot" />
        Live / Batch 01
      </div>
      <Button
        type="button"
        size="lg"
        onClick={onEarlyAccess}
        className="h-9 rounded-full bg-white px-4 text-xs font-bold text-black shadow-none hover:bg-lavender focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-cyan sm:h-10 sm:px-5"
      >
        Get Early Access
      </Button>
    </nav>
  );
}

type SurfaceTool = {
  label: string;
  detail: string;
  tone: "cyan" | "pink" | "lavender";
  icon: ReactNode;
};

const surfaceTools: SurfaceTool[] = [
  { label: "Browser", detail: "synced", tone: "lavender", icon: <Command className="size-4" aria-hidden="true" /> },
  { label: "Gmail", detail: "3 replies", tone: "pink", icon: <Mail className="size-4" aria-hidden="true" /> },
  { label: "LinkedIn", detail: "18 comments", tone: "cyan", icon: <Network className="size-4" aria-hidden="true" /> },
];

const surfaceStages = ["Context", "Intent", "Action", "Result"] as const;

function SurfaceToolCard({ tool, index, shouldReduce }: { tool: SurfaceTool; index: number; shouldReduce: boolean }) {
  return (
    <motion.div
      className="signal-tool-card"
      initial={shouldReduce ? false : { opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: shouldReduce ? 0 : 0.45, delay: shouldReduce ? 0 : 0.18 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-2 text-xs font-semibold text-white/85">
          <span className={cn("signal-tool-icon", toneClass[tool.tone])}>{tool.icon}</span>
          <span>{tool.label}</span>
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-cyan">{tool.detail}</span>
      </div>
      <div className="mt-3 h-1.5 w-[78%] rounded-full bg-white/12" />
      <div className="mt-2 h-1.5 w-[52%] rounded-full bg-white/7" />
    </motion.div>
  );
}

function SignalWorkSurface() {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <motion.div
      className="signal-work-surface"
      initial={shouldReduce ? false : { opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: shouldReduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Collision live work surface showing a task moving from context to result"
    >
      <div className="signal-surface-header">
        <div className="flex items-center gap-3">
          <span className="signal-command-icon"><Command className="size-4" aria-hidden="true" /></span>
          <div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-cyan">Live work surface</div>
            <div className="mt-1 text-[11px] text-white/56">Collision is moving through your stack.</div>
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">
          <span>Task / 0042</span>
          <span className="status-dot status-dot-lime" />
        </div>
      </div>
      <div className="signal-surface-body">
        <div className="signal-stage-labels" aria-label="Work surface stages">
          {surfaceStages.map((stage, index) => (
            <div key={stage} className={cn("signal-stage-label", index === surfaceStages.length - 1 ? "text-lime" : "text-cyan")}>
              <span className="signal-stage-number">0{index + 1}</span>
              {stage}
            </div>
          ))}
        </div>
        <div className="signal-progress-track" aria-hidden="true"><span /></div>
        <div className="signal-flow-grid">
          <div className="signal-context-stack">
            {surfaceTools.map((tool, index) => <SurfaceToolCard key={tool.label} tool={tool} index={index} shouldReduce={shouldReduce} />)}
          </div>
          <div className="signal-connector signal-connector-cyan" aria-hidden="true"><span /></div>
          <div className="signal-intent-stack">
            <motion.article
              className="signal-stage-card signal-intent-card"
              initial={shouldReduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-cyan"><span>Intent detected</span><span>92%</span></div>
              <p className="mt-4 text-sm font-medium leading-[1.25] text-white">Build a warm intro to Sarah Chen.</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-white/60"><span className="size-1.5 rounded-full bg-cyan" />relationship + timing + context</div>
            </motion.article>
            <div className="signal-support-card"><span className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/52">Memory match</span><span className="mt-2 block text-[11px] leading-[1.35] text-white/70">Last discussed at <span className="text-white/90">Collision / Batch 01</span></span></div>
          </div>
          <div className="signal-connector signal-connector-blue" aria-hidden="true"><span /></div>
          <div className="signal-action-stack">
            <motion.article
              className="signal-stage-card signal-action-card"
              initial={shouldReduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between"><span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-electric">Action plan</span><span className="text-[10px] text-lime">Ready</span></div>
              <div className="mt-4 space-y-3 text-[11px] text-white/72"><div className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-electric" />Draft personalized intro</div><div className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-electric" />Check calendar availability</div><div className="flex items-start gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-electric" />Send for review</div></div>
            </motion.article>
            <div className="signal-support-card"><div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.15em] text-white/52"><span>Connected tools</span><span>04</span></div><div className="mt-3 flex gap-1.5"><span className="size-2 rounded-full bg-cyan" /><span className="size-2 rounded-full bg-pink" /><span className="size-2 rounded-full bg-lime" /><span className="size-2 rounded-full bg-electric" /></div></div>
          </div>
          <div className="signal-connector signal-connector-lime" aria-hidden="true"><span /></div>
          <motion.article
            className="signal-stage-card signal-result-card"
            initial={shouldReduce ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.55, delay: shouldReduce ? 0 : 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between font-mono text-[8px] font-bold uppercase tracking-[0.15em]"><span className="text-lime">Result ready</span><span className="text-white/52">04 / 04</span></div>
            <h3 className="mt-5 text-[17px] font-semibold leading-[1.12] tracking-[-0.025em] text-white">Warm intro drafted for Sarah Chen.</h3>
            <p className="mt-3 text-[11px] leading-[1.45] text-white/64">Personalized with shared context, timing, and a clear next step.</p>
            <div className="signal-running-status"><span className="status-dot status-dot-lime" />Autonomous / running</div>
          </motion.article>
        </div>
        <div className="signal-surface-footer"><span>System ready</span><span className="flex items-center gap-3"><span className="size-1.5 rounded-full bg-cyan" /> <strong>Result locked</strong></span></div>
      </div>
    </motion.div>
  );
}

function HeroSection({ onEarlyAccess }: { onEarlyAccess: () => void }) {
  return (
    <section id="top" className="hero-section">
      <motion.div
        className="hero-layout page-shell"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-copy">
          <div className="eyebrow eyebrow-cyan">
            <span className="status-dot status-dot-cyan" />
            Software being / 01
          </div>
          <h1 className="hero-title">
            <span className="block text-white">The first</span>
            <span className="block text-lavender">software</span>
            <span className="block text-white">being.</span>
          </h1>
          <p className="hero-subtitle">It thinks. It remembers. It works.</p>
          <p className="hero-description">
            Give it access to your browser, email, calendar, LinkedIn, X, WhatsApp, and the rest of your stack.
          </p>
          <div className="hero-actions">
            <Button
              type="button"
              size="lg"
              onClick={onEarlyAccess}
              className="hero-primary-cta focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-cyan"
            >
              Get Early Access
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={() => document.getElementById("hands")?.scrollIntoView({ behavior: "smooth" })}
              className="hero-secondary-cta focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-cyan"
            >
              Watch Collision Work
              <Play className="size-4 fill-cyan text-cyan" aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div className="hero-visual">
          <SignalWorkSurface />
        </div>
      </motion.div>
      <div className="hero-scroll-hint page-shell" aria-hidden="true">
        <span>Scroll to wake it up</span>
        <ArrowDownRight className="size-4" />
      </div>
    </section>
  );
}

function ShiftSection() {
  return (
    <section id="shift" className="shift-section">
      <div className="shift-dots" aria-hidden="true" />
      <div className="page-shell">
        <Reveal className="relative z-10">
          <div className="section-kicker justify-center text-pink">Chapter 02 / The shift</div>
          <h2 className="display-title mx-auto mt-8 max-w-4xl text-center">The Shift</h2>
        </Reveal>
        <div className="shift-grid">
          <Reveal delay={0.1} className="shift-column shift-column-muted">
            <div className="section-kicker">
              <span className="h-px w-10 bg-white/20" />
              Legacy systems
            </div>
            <p>Software used to wait. It was static. You clicked buttons. Filled forms. Manually synced.</p>
          </Reveal>
          <Reveal delay={0.2} className="shift-bridge">
            <span>
              <ArrowRight className="size-5" />
            </span>
          </Reveal>
          <Reveal delay={0.3} className="shift-column shift-column-active">
            <div className="section-kicker text-pink">
              <span className="h-px w-10 bg-pink/50" />
              Collision being
            </div>
            <p>It works instead. It remembers your stacks. It executes. It grows with you.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function RolesSection() {
  return (
    <section id="roles" className="roles-section">
      <div className="page-shell">
        <Reveal className="roles-panel">
          <div className="role-wash role-wash-one" aria-hidden="true" />
          <div className="role-wash role-wash-two" aria-hidden="true" />
          <div className="relative z-10 max-w-3xl">
            <div className="section-kicker text-black/60">Chapter 03 / One being</div>
            <h2 className="display-title mt-8 max-w-4xl text-black">One Being. Infinite Roles.</h2>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-black/70 sm:text-2xl">
              Instead of hiring another tool, you give Collision another responsibility. One intelligence, specialized for your unique workflows.
            </p>
          </div>
          <div className="role-pills" aria-label="Example Collision roles">
            {["Today", "Tomorrow", "Analyst", "Designer", "Support"].map((role, index) => (
              <motion.span
                key={role}
                className={cn("role-pill", index === 2 && "role-pill-active")}
                whileHover={{ y: -6, rotate: index % 2 ? 2 : -2 }}
              >
                {role}
              </motion.span>
            ))}
          </div>
          <Sparkles className="absolute bottom-10 right-12 size-12 text-black/20" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}

function IntegrationCard({ label, detail, tone }: (typeof integrations)[number]) {
  return (
    <div className={cn("integration-card", `integration-card-${tone}`)}>
      <div className="flex items-center gap-3">
        <span className="integration-icon" aria-hidden="true">
          {label === "Gmail" ? <Mail className="size-4" /> : label === "Calendar" ? <CalendarDays className="size-4" /> : label === "Slack" ? <MessageCircle className="size-4" /> : label === "Browser" ? <Command className="size-4" /> : label === "LinkedIn" ? <Network className="size-4" /> : label === "WhatsApp" ? <MessageCircle className="size-4" /> : label === "X" ? <CircleDot className="size-4" /> : <Database className="size-4" />}
        </span>
        <span className="text-sm font-semibold text-white">{label}</span>
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">{detail}</span>
    </div>
  );
}

function ConnectionSection() {
  return (
    <section id="connections" className="connection-section">
      <div className="page-shell">
        <div className="connection-grid">
          <Reveal className="connection-copy">
            <div className="section-kicker text-lime">Chapter 04 / The connection</div>
            <h2 className="display-title mt-8 max-w-2xl text-lime">Connect everything.</h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 sm:text-2xl">
              Browser, Gmail, Calendar, LinkedIn, X, WhatsApp, Slack, Notion. If you can use it, Collision can too.
            </p>
            <div className="integration-grid">
              {integrations.map((integration) => (
                <IntegrationCard key={integration.label} {...integration} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="connection-art-wrap">
            <div className="connection-art">
              <img
                src={connectionImage}
                alt="Glowing app spheres joined by neon connection lines"
                className="connection-art-image"
                decoding="async"
                loading="lazy"
              />
              <div className="connection-art-overlay" aria-hidden="true" />
              <span className="connection-orb connection-orb-one"><MessageCircle className="size-5" /></span>
              <span className="connection-orb connection-orb-two"><CalendarDays className="size-5" /></span>
              <span className="connection-orb connection-orb-three"><Mail className="size-5" /></span>
              <svg className="connection-lines" viewBox="0 0 600 520" role="img" aria-label="Animated connection lines between integrated tools">
                <motion.path d="M90 126 C200 42 330 42 500 136" pathLength={0} animate={{ pathLength: 1 }} transition={{ duration: 2.1, delay: 0.25 }} />
                <motion.path d="M118 370 C240 290 360 280 516 354" pathLength={0} animate={{ pathLength: 1 }} transition={{ duration: 2.5, delay: 0.45 }} />
                <motion.path d="M180 150 C270 240 350 260 432 392" pathLength={0} animate={{ pathLength: 1 }} transition={{ duration: 2.8, delay: 0.65 }} />
              </svg>
            </div>
            <div className="connection-caption">
              <span className="status-dot status-dot-lime" />
              08 connected / all systems available
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MemorySection() {
  return (
    <section id="memory" className="memory-section">
      <div className="page-shell">
        <Reveal className="memory-panel">
          <div className="memory-copy">
            <div className="section-kicker text-black/60">Chapter 05 / Memory</div>
            <h2 className="display-title mt-8 text-black">It remembers. Everything.</h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/65 sm:text-2xl">
              Every conversation. Every preference. Every customer. Every decision. The longer you work together, the better Collision becomes.
            </p>
            <div className="memory-stat">
              <span className="memory-stat-dot" />
              142 memories active
            </div>
          </div>
          <div className="memory-graph-wrap" aria-label="Persistent core memory graph">
            <motion.svg className="memory-graph" viewBox="0 0 500 340" role="img" aria-label="Node graph showing Collision's persistent core">
              <g className="memory-edges">
                <motion.path d="M74 84 L250 164 L420 82 L362 280 L132 240 L74 84" pathLength={0} animate={{ pathLength: 1 }} transition={{ duration: 2.8 }} />
                <motion.path d="M250 164 L132 240 M250 164 L362 280 M420 82 L250 164" pathLength={0} animate={{ pathLength: 1 }} transition={{ duration: 2.8, delay: 0.35 }} />
              </g>
              {["74,84", "250,164", "420,82", "362,280", "132,240"].map((point, index) => {
                const [cx, cy] = point.split(",");
                return <motion.circle key={point} cx={cx} cy={cy} r={index === 1 ? 12 : 7} className="memory-node" animate={{ r: index === 1 ? [12, 17, 12] : [7, 10, 7] }} transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.25 }} />;
              })}
            </motion.svg>
            <div className="persistent-core">Persistent Core</div>
            <span className="memory-graph-label memory-graph-label-one">preferences</span>
            <span className="memory-graph-label memory-graph-label-two">decisions</span>
            <span className="memory-graph-label memory-graph-label-three">context</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ExecutionStream() {
  return (
    <div className="execution-window">
      <div className="execution-window-top">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan">Core / Process / Exec</span>
        <div className="flex gap-2" aria-label="Execution stream status">
          <span className="window-light bg-lime" />
          <span className="window-light bg-pink" />
          <span className="window-light bg-cyan" />
        </div>
      </div>
      <div className="execution-viewport" aria-label="Collision execution log">
        <div className="execution-marquee">
          {[...executionLogs, ...executionLogs].map((log, index) => (
            <div key={`${log.text}-${index}`} className={cn("execution-log", toneClass[log.tone])}>
              {log.text}
            </div>
          ))}
        </div>
      </div>
      <div className="execution-footer">
        <span className="status-dot status-dot-lime" />
        autonomous / running
      </div>
    </div>
  );
}

function HandsSection() {
  return (
    <section id="hands" className="hands-section">
      <div className="page-shell">
        <div className="hands-grid">
          <Reveal className="hands-copy">
            <div className="section-kicker text-electric">Chapter 06 / Execution</div>
            <h2 className="display-title mt-8 text-electric">It has hands.</h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/60 sm:text-2xl">
              Collision doesn&apos;t stop at advice. It clicks. Types. Posts. Replies. Researches. Books meetings. Runs workflows.
            </p>
            <Button
              type="button"
              size="lg"
              onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-10 h-12 rounded-full bg-electric px-6 text-sm font-bold text-white shadow-[0_16px_30px_rgba(37,99,255,0.2)] hover:bg-electric/85"
            >
              See the executions
              <ChevronRight className="size-4" />
            </Button>
          </Reveal>
          <Reveal delay={0.15}>
            <ExecutionStream />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WaitlistSection({ onEarlyAccess }: { onEarlyAccess: () => void }) {
  return (
    <section id="waitlist" className="waitlist-section">
      <div className="waitlist-glow" aria-hidden="true" />
      <div className="page-shell">
        <Reveal className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="section-kicker text-pink">Chapter 07 / Meet Collision</div>
          <h2 className="display-title mt-8 max-w-4xl">Meet Collision.</h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/55 sm:text-2xl">
            Collision isn&apos;t pretending to be human. It&apos;s something new. A software being built to work alongside you. <span className="text-white">Persistent. Autonomous. Internet-native.</span>
          </p>
          <Button
            type="button"
            size="lg"
            onClick={onEarlyAccess}
            className="waitlist-cta mt-12 h-14 rounded-full bg-white px-8 text-base font-bold text-black hover:bg-lavender sm:h-16 sm:px-12 sm:text-lg"
          >
            Join the Waitlist
            <ArrowRight className="size-5" />
          </Button>
          <div className="mt-10 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 sm:gap-8 sm:text-[10px]">
            <span>Est. arrival 2026</span>
            <span className="size-1.5 rounded-full bg-white/20" />
            <span>Limited batch 01</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-bar page-shell">
        <span>© 2026 Collision Labs Inc.</span>
        <div className="flex items-center gap-6">
          <a href="https://x.com/usecollision" target="_blank" rel="noopener noreferrer" className="footer-link">X</a>
          <a href="https://linkedin.com/company/usecollision" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="https://instagram.com/usecollision" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
          <a href="mailto:hi@usecollision.com" className="footer-link">Email</a>
        </div>
        <span>Software being / 001</span>
      </div>
    </footer>
  );
}

export default function CollisionLanding() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleEarlyAccess = () => {
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 3200);
  };

  return (
    <main className="collision-page">
      <FloatingNav onEarlyAccess={handleEarlyAccess} />
      <HeroSection onEarlyAccess={handleEarlyAccess} />
      <ShiftSection />
      <RolesSection />
      <ConnectionSection />
      <MemorySection />
      <HandsSection />
      <WaitlistSection onEarlyAccess={handleEarlyAccess} />
      <Footer />
      <motion.div
        className="access-toast"
        initial={false}
        animate={{ opacity: toastVisible ? 1 : 0, y: toastVisible ? 0 : 18, pointerEvents: toastVisible ? "auto" : "none" }}
        role="status"
        aria-live="polite"
      >
        <Send className="size-4 text-lime" />
        You&apos;re on the signal. We&apos;ll be in touch.
      </motion.div>
      <span className="page-cursor-label" aria-hidden="true">
        <MousePointer2 className="size-3" />
        follow the signal
      </span>
    </main>
  );
}
