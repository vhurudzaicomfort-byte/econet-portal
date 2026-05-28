export type DocSection = {
  slug: string;
  title: string;
  category: string;
  description: string;
  intro: string;
  body: { kind: "p" | "h2" | "h3" | "ul" | "code"; text?: string; items?: string[]; language?: string }[];
  showTryButton?: boolean;
  endpointSlug?: string;
  showErrorTable?: boolean;
  showRateLimitTable?: boolean;
};

export const docSections: DocSection[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    category: "Overview",
    description: "Sign up, claim sandbox credentials and make your first call in under five minutes.",
    intro: "This guide walks you through getting from zero to your first Econet API response.",
    body: [
      { kind: "h2", text: "1. Create an application" },
      { kind: "p", text: "From the dashboard click Build app, choose the APIs you need and pick a team. Sandbox credentials are issued immediately." },
      { kind: "h2", text: "2. Set environment variables" },
      { kind: "p", text: "Export the issued credentials to your shell." },
      { kind: "code", language: "bash", text: 'export ECONET_CLIENT_ID="ec_sand_d491fa20a18e7d56"\nexport ECONET_CLIENT_SECRET="ecsec_sand_demo_2pL1xRfRk6yMmH4vN3qVcU8aJb5zXg"' },
      { kind: "h2", text: "3. Make your first call" },
      { kind: "p", text: "Hit the sandbox health endpoint to confirm everything is wired correctly." },
    ],
    showTryButton: true,
    endpointSlug: "ecocash-collect",
  },
  {
    slug: "authentication",
    title: "Authentication",
    category: "Foundations",
    description: "OAuth 2.0, API keys and mTLS for production-grade integrations.",
    intro: "Econet APIs accept three authentication schemes depending on the sensitivity of the data being accessed.",
    body: [
      { kind: "h2", text: "OAuth 2.0" },
      { kind: "p", text: "Most APIs accept a bearer token issued by Econet ID. Use authorization-code with PKCE for subscriber-facing flows and client-credentials for backend services." },
      { kind: "h2", text: "API Keys" },
      { kind: "p", text: "Marketing-grade APIs such as Bulk SMS accept a static API key in the Authorization header." },
      { kind: "h2", text: "mTLS" },
      { kind: "p", text: "KYC and SIM provisioning APIs require mutual TLS. We issue you a client certificate during onboarding." },
      { kind: "ul", items: ["Tokens are scoped to a single environment.", "Rotate secrets at least every 90 days.", "Never embed credentials in client applications."] },
    ],
    showErrorTable: true,
  },
  {
    slug: "ecocash",
    title: "EcoCash",
    category: "Payments",
    description: "Collect, disburse and inspect EcoCash wallet activity.",
    intro: "EcoCash APIs let you debit and credit wallets across Zimbabwe.",
    body: [
      { kind: "h2", text: "Collect" },
      { kind: "p", text: "Initiate a debit and the subscriber confirms with their PIN on their handset." },
      { kind: "code", language: "json", text: '{\n  "msisdn": "+263774129034",\n  "amount": "25.00",\n  "currency": "USD",\n  "reference": "ORDER-19044"\n}' },
      { kind: "h2", text: "Disburse" },
      { kind: "p", text: "Push funds to one or many wallets. Returns a batch id you can poll for settlement." },
    ],
    showTryButton: true,
    endpointSlug: "ecocash-collect",
    showRateLimitTable: true,
  },
  {
    slug: "sms",
    title: "SMS",
    category: "Messaging",
    description: "Send transactional and marketing SMS across Zimbabwean networks.",
    intro: "A single REST endpoint routes SMS to Econet, NetOne and Telecel subscribers.",
    body: [
      { kind: "h2", text: "Sender IDs" },
      { kind: "p", text: "Register up to 11 alphanumeric characters as your sender ID. Once approved the sender ID is enforced on every message." },
      { kind: "h2", text: "Delivery receipts" },
      { kind: "p", text: "Subscribe to delivery webhooks and receive granular per-recipient status." },
    ],
    showTryButton: true,
    endpointSlug: "bulk-sms",
    showRateLimitTable: true,
  },
  {
    slug: "ussd",
    title: "USSD",
    category: "Messaging",
    description: "Receive USSD legs on the shared *151# gateway or your own shortcode.",
    intro: "Econet routes USSD sessions to your application by webhook.",
    body: [
      { kind: "h2", text: "Session lifecycle" },
      { kind: "p", text: "Sessions are stateful for up to 180 seconds. Reply with continueSession=false to end a session deliberately." },
    ],
    showTryButton: true,
    endpointSlug: "ussd-aggregator",
  },
  {
    slug: "airtime",
    title: "Airtime",
    category: "Recharge",
    description: "Recharge any Zimbabwean mobile number programmatically.",
    intro: "Top-up Econet, NetOne and Telecel subscribers from a single endpoint.",
    body: [
      { kind: "h2", text: "Cross-network rules" },
      { kind: "p", text: "Top-ups for non-Econet subscribers attract a small interconnect fee, billed via your settlement account." },
    ],
    showTryButton: true,
    endpointSlug: "airtime-topup",
  },
  {
    slug: "kyc",
    title: "KYC",
    category: "Identity",
    description: "Verify subscribers with consent-driven KYC.",
    intro: "Subscribers consent through USSD before any KYC field is shared with your application.",
    body: [
      { kind: "h2", text: "Consent" },
      { kind: "p", text: "Request consent via /v1/kyc/consent. The subscriber receives a *151*0# prompt." },
    ],
    showTryButton: true,
    endpointSlug: "kyc-lookup",
  },
  {
    slug: "webhooks",
    title: "Webhooks",
    category: "Integrations",
    description: "Receive event notifications signed with HMAC-SHA256.",
    intro: "Webhooks are delivered with exponential backoff over a maximum of 8 attempts.",
    body: [
      { kind: "h2", text: "Signing" },
      { kind: "p", text: "Each webhook ships with a header Econet-Signature: t=<timestamp> v2=<signature>. Verify by computing HMAC-SHA256 over the timestamp and raw body." },
      { kind: "code", language: "javascript", text: 'const expected = crypto.createHmac("sha256", secret).update(`${t}.${rawBody}`).digest("hex");\nconst valid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));' },
    ],
  },
  {
    slug: "errors",
    title: "Errors",
    category: "Reference",
    description: "Error envelopes, codes and recommended client behaviour.",
    intro: "Every API returns a consistent JSON error envelope on non-2xx responses.",
    body: [
      { kind: "h2", text: "Envelope" },
      { kind: "p", text: "Errors include a stable code, a human-readable message and a request id you can quote in support tickets." },
      { kind: "code", language: "json", text: '{\n  "error": {\n    "code": "WALLET_INSUFFICIENT_FUNDS",\n    "message": "The subscriber has insufficient balance.",\n    "requestId": "req_4a23"\n  }\n}' },
    ],
    showErrorTable: true,
  },
  {
    slug: "rate-limits",
    title: "Rate Limits",
    category: "Reference",
    description: "Per-API rate limits and retry guidance.",
    intro: "Rate limits are enforced per application, per second and per day.",
    body: [
      { kind: "h2", text: "Headers" },
      { kind: "p", text: "Every response includes X-RateLimit-Remaining and X-RateLimit-Reset. Honour these to avoid 429s." },
    ],
    showRateLimitTable: true,
  },
  {
    slug: "sdks",
    title: "SDKs",
    category: "Tools",
    description: "Official SDKs for Node.js, Python, PHP and Go.",
    intro: "Each SDK ships with sandbox preset configuration and an opinionated retry strategy.",
    body: [
      { kind: "h2", text: "Install" },
      { kind: "code", language: "bash", text: "npm install @econet/sdk\npip install econet\ncomposer require econet/sdk\ngo get github.com/econet/sdk-go" },
    ],
  },
  {
    slug: "postman",
    title: "Postman",
    category: "Tools",
    description: "Postman collections for every API in the catalogue.",
    intro: "Import the collection and start exploring in minutes.",
    body: [
      { kind: "h2", text: "Download" },
      { kind: "p", text: "Each API publishes a Postman collection at /v1/resources/postman/{slug}." },
    ],
  },
];

export const errorTable = [
  { code: "AUTH_INVALID_TOKEN", message: "Bearer token is invalid or expired.", http: 401, description: "Refresh or reissue the token." },
  { code: "AUTH_MISSING_SCOPE", message: "The token lacks required scopes.", http: 403, description: "Request a token with broader scope." },
  { code: "WALLET_INSUFFICIENT_FUNDS", message: "Subscriber has insufficient balance.", http: 402, description: "Prompt the subscriber to top up." },
  { code: "RATE_LIMITED", message: "Rate limit exceeded.", http: 429, description: "Back off using exponential delay." },
  { code: "VALIDATION_FAILED", message: "Request validation failed.", http: 400, description: "Inspect the error details object for field-level reasons." },
  { code: "UPSTREAM_TIMEOUT", message: "Upstream service did not respond in time.", http: 504, description: "Retry the call." },
  { code: "DUPLICATE_REFERENCE", message: "Reference has already been used.", http: 409, description: "Use a fresh idempotency key." },
];

export const rateLimitTable = [
  { tier: "Free", perSecond: 20, perDay: 50000, burst: 40 },
  { tier: "Growth", perSecond: 100, perDay: 250000, burst: 200 },
  { tier: "Enterprise", perSecond: 500, perDay: 5000000, burst: 1000 },
];
