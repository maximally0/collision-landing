export type Accent = "blue" | "coral" | "mint" | "yellow";

export const navigationLinks = [
  ["Product", "#product"],
  ["How it works", "#how-it-works"],
  ["Proof", "#proof"],
  ["FAQ", "#faq"],
] as const;

export const promptSuggestions = [
  "Launch our new product.",
  "Get 500 qualified founders to sign up.",
  "Figure out why acquisition stalled.",
] as const;

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "What does Collision actually do?",
    answer: "You give it a goal. It figures out research, strategy, content, distribution, experiments, and next moves. It doesn't recommend — it executes.",
  },
  {
    question: "Does it replace a marketing team?",
    answer: "For most early/growth-stage companies, yes. It handles what a Head of Growth, content marketer, SEO specialist, and growth analyst would — as one coordinated system.",
  },
  {
    question: "Do I approve everything?",
    answer: "Yes. Approval-based. Nothing ships without your sign-off.",
  },
  {
    question: "How is it different from ChatGPT + tools?",
    answer: "ChatGPT makes you coordinate. Collision coordinates the growth function. You provide the goal — it runs the workflow end to end.",
  },
  {
    question: "Does it remember my company?",
    answer: "Persistent memory. Your positioning, audience, past campaigns, results, and decisions compound over time.",
  },
];
