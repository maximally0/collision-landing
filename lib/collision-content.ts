export type Accent = "blue" | "coral" | "mint" | "yellow";

export type OwnershipRow = {
  category: string;
  title: string;
  subtext?: string;
  description: string;
  accent: Accent;
};

export type Specialist = {
  title: string;
  description: string;
  accent?: Accent;
};

export type GrowthActivity = {
  action: string;
  detail: string;
  status: string;
};

export const navigationLinks = [
  ["Product", "#product"],
  ["How it works", "#how-it-works"],
  ["Proof", "#proof"],
  ["Resources", "#resources"],
] as const;

export const promptSuggestions = [
  "Launch our new product.",
  "Get 100 qualified leads this month.",
  "Make us the company everyone associates with AI infrastructure.",
  "Figure out why our acquisition stalled.",
  "We need more qualified demand from founders.",
] as const;

export const growthActivities: GrowthActivity[] = [
  { action: "Researching your market", detail: "3 high-intent signals found", status: "working" },
  { action: "Drafting your next campaign", detail: "Positioning is taking shape", status: "working" },
  { action: "Learning from recent demand", detail: "Qualified traffic up 2.4×", status: "complete" },
  { action: "Preparing a growth brief", detail: "Ready for your approval", status: "complete" },
];

export const growthSurfaces = [
  { surface: "Demand", channels: "LinkedIn · X · SEO · AI Search", description: "Build demand where attention already lives." },
  { surface: "Content", channels: "Blog · Newsletter · Landing pages · Launches", description: "Turn your point of view into a system people remember." },
  { surface: "Pipeline", channels: "Outbound · Email · CRM · Community", description: "Create the motion that turns attention into conversations." },
  { surface: "Conversion", channels: "Website · Storefront · Landing pages · Offers", description: "Optimize every step between interest and action." },
  { surface: "Intelligence", channels: "Competitors · Positioning · Analytics · Experiments", description: "Learn what works, then make the next decision better." },
];

export const journeySteps = [
  { label: "Research", title: "Find where founders already spend attention.", description: "Market signals, competitor intelligence, audience patterns.", accent: "blue" as Accent },
  { label: "Strategy", title: "Identify positioning and messages most likely to resonate.", description: "Data-backed decisions, not guesses.", accent: "coral" as Accent },
  { label: "Create", title: "Build the content, pages, sequences and campaigns.", description: "Written, designed, and ready for approval.", accent: "mint" as Accent },
  { label: "Distribute", title: "Publish and push across the relevant channels.", description: "Coordinated across every surface that matters.", accent: "yellow" as Accent },
  { label: "Learn", title: "Track what generates qualified attention.", description: "Signals connected to real business outcomes.", accent: "blue" as Accent },
  { label: "Adapt", title: "Change the strategy based on what actually worked.", description: "Every cycle compounds. Every experiment teaches.", accent: "coral" as Accent },
];

export const metrics = [
  { value: 300, suffix: "M+", label: "organic impressions generated" },
  { value: 14, suffix: "K+", label: "inbound conversations" },
  { value: 1840, suffix: "+", label: "growth experiments run" },
  { value: 67, suffix: "%", label: "experiments produced measurable lift" },
  { value: 3.7, suffix: "×", label: "average increase in content output" },
  { value: 52, suffix: "%", label: "faster campaign execution" },
  { value: 2.9, suffix: "×", label: "increase in qualified inbound" },
  { value: 64, suffix: "%", label: "increase in branded search demand" },
  { value: 28, suffix: "%", label: "landing page conversion improvement" },
  { value: 11.6, suffix: "M+", label: "words researched, written, analyzed" },
  { value: 93, suffix: "%", label: "approved work shipped without manual coordination" },
  { value: 41, suffix: "%", label: "reduction in repetitive growth work" },
];

export const caseStudies = [
  {
    metric: "+183%",
    label: "qualified inbound",
    description: "Rebuilt positioning → launched 31 content assets → expanded AI search presence → increased founder-led inbound.",
  },
  {
    metric: "3.2×",
    label: "organic acquisition",
    description: "Identified 47 underserved search opportunities → created content cluster → improved internal linking → expanded distribution.",
  },
  {
    metric: "+71%",
    label: "conversion rate",
    description: "Reworked messaging → rebuilt landing page → tested 6 variants → consolidated winning positioning.",
  },
];

export const cascadeFlow = {
  objective: "1 business objective",
  research: "17 research signals",
  strategy: "8 strategic decisions",
  work: "42 pieces of work",
  surfaces: "6 distribution surfaces",
  signals: "14,000+ measurable signals",
  outcome: "1 better growth decision",
};

export const surfaceDetails = [
  { surface: "LinkedIn", action: "Researches, writes, publishes, analyzes" },
  { surface: "X", action: "Finds conversations, creates content, learns what resonates" },
  { surface: "SEO", action: "Researches demand, builds content, identifies opportunities" },
  { surface: "AI Search", action: "Tracks visibility across ChatGPT, Perplexity, Gemini, Google" },
  { surface: "Content", action: "Plans, writes, repurposes and optimizes" },
  { surface: "Website", action: "Identifies conversion opportunities and creates improvements" },
  { surface: "Email", action: "Researches, writes, sequences and analyzes" },
  { surface: "Outbound", action: "Finds prospects, develops messaging, improves campaigns" },
  { surface: "Paid", action: "Researches audiences, develops creative, analyzes performance" },
  { surface: "Storefront", action: "Finds growth opportunities across acquisition and conversion" },
  { surface: "Community", action: "Identifies distribution opportunities, coordinates campaigns" },
  { surface: "Analytics", action: "Connects activity to outcomes, identifies what changed" },
  { surface: "Competitors", action: "Tracks positioning, launches, messaging, market movement" },
  { surface: "Experiments", action: "Generates hypotheses, prioritizes tests, learns from results" },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "What does Collision actually do?",
    answer:
      "Collision is an AI Head of Growth. You give it an outcome — like \"get more qualified demand from founders\" — and it figures out the research, strategy, content, distribution, experiments, and next moves required to get there. It doesn't just recommend. It executes.",
  },
  {
    question: "Is Collision a replacement for a marketing team?",
    answer:
      "For most early and growth-stage companies, yes. Collision handles the work that would normally require a Head of Growth, content marketer, SEO specialist, and growth analyst. For larger teams, it acts as a force multiplier — handling coordination and execution so your team can focus on decisions.",
  },
  {
    question: "Does Collision actually execute work or just recommend it?",
    answer:
      "Collision executes. It writes content, publishes posts, runs experiments, builds landing pages, sequences outbound, and distributes across channels. It's not a strategy tool that tells you what to do. It does the work.",
  },
  {
    question: "Do I approve everything before it goes live?",
    answer:
      "Yes. Collision is approval-based. Nothing ships without your explicit sign-off. You maintain full control over what goes out — Collision handles everything up to that point and everything after.",
  },
  {
    question: "How is this different from ChatGPT + marketing tools?",
    answer:
      "ChatGPT makes you coordinate the work. You have to decide what to create, where to publish, what to test, and what to do next. Collision coordinates the growth function. You provide the objective. It handles the entire workflow from research to distribution to learning.",
  },
  {
    question: "Does Collision remember my company and previous decisions?",
    answer:
      "Yes. Collision maintains a persistent memory of your company, positioning, audience, previous campaigns, results, and strategic decisions. Every interaction builds context. It gets smarter and more aligned over time.",
  },
  {
    question: "What happens when Collision doesn't know what to do?",
    answer:
      "It asks. Collision surfaces decisions that require your judgment or approval, explains its reasoning, and waits for direction. It never guesses on high-stakes decisions.",
  },
  {
    question: "Can I see what it researched and why it made a decision?",
    answer:
      "Everything is transparent. You can see the research, the reasoning behind strategic decisions, the data that informed content choices, and the results of every action. Full audit trail, always.",
  },
  {
    question: "Who is Collision built for?",
    answer:
      "Founders, growth leaders, and small teams who want to run a serious growth function without assembling a 6-person team or juggling 12 tools. If you know what you want to achieve but don't have the bandwidth to coordinate all the work required — Collision is built for you.",
  },
];
