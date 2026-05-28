export type ThreadKind = "Discussion" | "Showcase" | "Announcement";

export type Thread = {
  id: string;
  kind: ThreadKind;
  title: string;
  snippet: string;
  author: string;
  tags: string[];
  replies: number;
  views: number;
  lastActivity: string;
};

export const initialThreads: Thread[] = [
  {
    id: "th1",
    kind: "Announcement",
    title: "WhatsApp Business API now GA",
    snippet: "We are rolling WhatsApp Business out to all developers from 1 June 2026.",
    author: "Econet Platform",
    tags: ["whatsapp", "messaging", "ga"],
    replies: 22,
    views: 1842,
    lastActivity: "2 hours ago",
  },
  {
    id: "th2",
    kind: "Discussion",
    title: "Best practice: idempotency keys on Collect",
    snippet: "Curious how others structure idempotency keys for retries on EcoCash Collect.",
    author: "Tinashe (Steward)",
    tags: ["ecocash", "best-practice"],
    replies: 14,
    views: 612,
    lastActivity: "5 hours ago",
  },
  {
    id: "th3",
    kind: "Showcase",
    title: "Pindula bill-split USSD demo",
    snippet: "We shipped a *151*3# bill-split flow using the USSD aggregator.",
    author: "Tariro (Pindula)",
    tags: ["ussd", "showcase"],
    replies: 9,
    views: 488,
    lastActivity: "Yesterday",
  },
  {
    id: "th4",
    kind: "Discussion",
    title: "Handling SIM swap edge cases",
    snippet: "How do you handle the gap between swap detection and the next 24h?",
    author: "Farai (Steward)",
    tags: ["sim-swap", "fraud"],
    replies: 11,
    views: 421,
    lastActivity: "2 days ago",
  },
  {
    id: "th5",
    kind: "Discussion",
    title: "Webhook signature v2 migration tips",
    snippet: "Sharing our drop-in middleware for verifying the new v2 signatures.",
    author: "Rumbi (Pindula)",
    tags: ["webhooks", "security"],
    replies: 7,
    views: 388,
    lastActivity: "3 days ago",
  },
  {
    id: "th6",
    kind: "Showcase",
    title: "Cassava Care USSD assistant",
    snippet: "Renewing funeral cover in 6 USSD steps.",
    author: "Nyasha (Cassava)",
    tags: ["ussd", "ecosure", "showcase"],
    replies: 5,
    views: 312,
    lastActivity: "4 days ago",
  },
  {
    id: "th7",
    kind: "Discussion",
    title: "Recommended batch size for Bulk SMS?",
    snippet: "Is 5,000 still the sweet spot or has the throughput limit changed?",
    author: "Kudzai (Pindula)",
    tags: ["sms", "performance"],
    replies: 6,
    views: 244,
    lastActivity: "5 days ago",
  },
  {
    id: "th8",
    kind: "Announcement",
    title: "TLS 1.2 minimum from 1 July 2026",
    snippet: "Reminder that TLS 1.0 and 1.1 will be rejected on all endpoints from 1 July 2026.",
    author: "Econet Security",
    tags: ["security", "policy"],
    replies: 2,
    views: 901,
    lastActivity: "1 week ago",
  },
  {
    id: "th9",
    kind: "Discussion",
    title: "Anyone using AI Translate in production?",
    snippet: "Share your experience translating customer support tickets to Ndebele.",
    author: "Tendai (Steward)",
    tags: ["ai", "translate", "ndebele"],
    replies: 4,
    views: 188,
    lastActivity: "1 week ago",
  },
  {
    id: "th10",
    kind: "Showcase",
    title: "FBC Mobile Banking integration",
    snippet: "Shipped EcoCash Collect inside the FBC Mobile Banking app.",
    author: "Brighton (FBC)",
    tags: ["ecocash", "banking"],
    replies: 8,
    views: 422,
    lastActivity: "2 weeks ago",
  },
  {
    id: "th11",
    kind: "Discussion",
    title: "Question about Growth tier limits",
    snippet: "What is the daily limit for Bulk SMS on Growth plan?",
    author: "Mary (Zimnat)",
    tags: ["billing", "limits"],
    replies: 3,
    views: 156,
    lastActivity: "2 weeks ago",
  },
  {
    id: "th12",
    kind: "Discussion",
    title: "Best language for SDKs in 2026?",
    snippet: "Curious about adoption of Go vs Python vs Node for new services.",
    author: "Joel (Cassava)",
    tags: ["sdks", "general"],
    replies: 17,
    views: 511,
    lastActivity: "3 weeks ago",
  },
];

export const topContributors = [
  { name: "Tariro Chikomba", org: "Pindula Pay", posts: 142 },
  { name: "Tendai Madziva", org: "Steward Bank", posts: 98 },
  { name: "Nyasha Banda", org: "Cassava Fintech", posts: 73 },
  { name: "Rumbi Sibanda", org: "Pindula Pay", posts: 61 },
  { name: "Farai Nleya", org: "Steward Bank", posts: 49 },
];

export const trendingTags = [
  "ecocash",
  "whatsapp",
  "webhooks",
  "ussd",
  "security",
  "kyc",
  "sim-swap",
  "ai",
];
