export const roles = [
  "Today",
  "SDR",
  "Recruiter",
  "Researcher",
  "Marketer",
  "Founder Associate",
  "Operator",
] as const;

export const activityItems = [
  { label: "replied to 18 comments", tone: "lime" },
  { label: "wrote tomorrow's post", tone: "cyan" },
  { label: "found 3 prospects", tone: "pink" },
  { label: "currently writing to Sam Altman...", tone: "orange" },
] as const;

export const integrations = [
  { label: "Browser", detail: "open tabs", tone: "cyan" },
  { label: "Gmail", detail: "3 replies", tone: "coral" },
  { label: "Calendar", detail: "2 meetings", tone: "blue" },
  { label: "LinkedIn", detail: "18 comments", tone: "pink" },
  { label: "X", detail: "1 draft", tone: "lavender" },
  { label: "WhatsApp", detail: "4 chats", tone: "lime" },
  { label: "Slack", detail: "7 threads", tone: "violet" },
  { label: "Notion", detail: "12 pages", tone: "orange" },
] as const;

export const executionLogs = [
  { tone: "lime", text: "[ACTION] Opening LinkedIn Sales Navigator..." },
  { tone: "cyan", text: "[SEARCH] Query: VP of Engineering at AI Startups" },
  { tone: "muted", text: "[LOG] 42 matches found. Initializing scoring engine..." },
  { tone: "pink", text: "[TASK] Summarizing Sarah Chen, Chief Architect..." },
  { tone: "lime", text: "[ACTION] Drafted personalized InMail." },
  { tone: "orange", text: "[WAIT] Checking calendar for available slots..." },
  { tone: "lime", text: "[ACTION] Booked introductory call on Tuesday 2PM." },
  { tone: "muted", text: "[SUCCESS] Email confirmation sent to both parties." },
  { tone: "muted", text: "--- NEXT TASK / BATCH_02 ---" },
  { tone: "lime", text: "[ACTION] Opening Stripe Dashboard..." },
  { tone: "cyan", text: "[QUERY] Revenue trends for last 30 days" },
  { tone: "pink", text: "[TASK] Creating Slack report for #growth-ops" },
] as const;
