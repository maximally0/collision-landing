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
  ["What we own", "#ownership"],
  ["Approach", "#approach"],
  ["Behind the scenes", "#behind"],
  ["Proof", "#proof"],
  ["FAQ", "#faq"],
  ["Blog", "/blog"],
] as const;

export const promptSuggestions = [
  "Launch our product",
  "Grow our LinkedIn",
  "Write this week's newsletter",
  "Optimize us for ChatGPT",
  "Why are signups down?",
] as const;

export const growthActivities: GrowthActivity[] = [
  { action: "Researching your market", detail: "3 high-intent signals found", status: "working" },
  { action: "Drafting your next campaign", detail: "Positioning is taking shape", status: "working" },
  { action: "Learning from recent demand", detail: "Qualified traffic up 2.4×", status: "complete" },
  { action: "Preparing a growth brief", detail: "Ready for your approval", status: "complete" },
];

export const ownershipRows: OwnershipRow[] = [
  { category: "Reach", title: "LinkedIn / X / SEO / AI Search", subtext: "(ChatGPT, Perplexity, Google AI Overviews, Gemini)", description: "Build demand where people are already looking.", accent: "blue" },
  { category: "Content", title: "Blogs / Newsletters / Landing Pages / Website Copy / Product Launches", description: "Turn your point of view into a system people remember.", accent: "coral" },
  { category: "Revenue", title: "Gmail / Email Campaigns / Outbound / Paid Media / Storefront + Store Growth / Community Distribution", description: "Create the motion that turns attention into conversations.", accent: "mint" },
  { category: "Intelligence", title: "Competitor Research / Positioning / Messaging / Analytics / Growth Strategy / Growth Experiments", description: "Learn what works, then make the next decision better.", accent: "yellow" },
];

export const specialists: Specialist[] = [
  { title: "Research", description: "market, customer, competitor signals" },
  { title: "Planning", description: "priorities, sequencing, experiments" },
  { title: "Writing", description: "posts, pages, emails, campaigns" },
  { title: "Optimization", description: "SEO, AI search, conversion signals" },
  { title: "Analysis", description: "what moved, what matters next" },
  { title: "Execution", description: "distribution across every channel", accent: "yellow" },
];

export const journeySteps = [
  { label: "Objective", title: "Get more qualified demand.", description: "A destination stated in plain English.", accent: "coral" as Accent },
  { label: "Work", title: "LinkedIn, SEO, AI search, newsletter, Gmail, outbound.", description: "The right sequence, coordinated behind the scenes.", accent: "blue" as Accent },
  { label: "Outcome", title: "More of the right people finding and choosing you.", description: "Momentum you can actually feel.", accent: "mint" as Accent },
];

export const metrics = [
  { value: "300M", suffix: "+", label: "impressions", accent: "coral" as Accent },
  { value: "14K", label: "inbound conversations" },
  { value: "2.4x", label: "qualified traffic" },
  { value: "+38%", label: "AI search discovery" },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "What is Collision?",
    answer:
      "Collision is the AI you hire to run growth. It's a single growth intelligence that researches, writes, distributes, and learns across every surface your business depends on — replacing a scattered growth stack of separate tools and freelancers.",
  },
  {
    question: "What can Collision own?",
    answer:
      "Reach (LinkedIn, X, SEO, and AI search like ChatGPT, Perplexity, Google AI Overviews, and Gemini), content (blogs, newsletters, landing pages, website copy, product launches), revenue (Gmail, email campaigns, outbound, paid media, storefront growth, community distribution), and intelligence (competitor research, positioning, messaging, analytics, growth strategy and experiments).",
  },
  {
    question: "How do I work with Collision?",
    answer:
      "You talk to Collision in plain English about the outcome you want — like \"grow our LinkedIn\" or \"launch our product\" — and it researches, plans, writes, and distributes across the right channels. Every action is approval-based, so nothing ships without you.",
  },
  {
    question: "Is Collision replacing my marketing team or just another tool?",
    answer:
      "Collision isn't another point tool. It's one intelligence with one memory and one source of truth that sees the full picture and makes decisions across every growth surface, the way a Head of Growth would.",
  },
];
