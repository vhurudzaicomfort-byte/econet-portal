export type ChangelogTag = "Added" | "Changed" | "Deprecated" | "Fixed" | "Security";

export type ChangelogEntry = {
  id: string;
  date: string;
  version: string;
  tag: ChangelogTag;
  title: string;
  body: string;
};

export const changelog: ChangelogEntry[] = [
  {
    id: "cl_2026_05_25",
    date: "2026-05-25",
    version: "v1.8",
    tag: "Added",
    title: "WhatsApp Business API generally available",
    body: "Send templated and session WhatsApp messages with a single endpoint. Supports media attachments and quick-reply buttons.",
  },
  {
    id: "cl_2026_05_18",
    date: "2026-05-18",
    version: "v1.7.2",
    tag: "Fixed",
    title: "EcoCash Collect retry-after header now compliant",
    body: "The Retry-After header is now an HTTP-date as well as delta-seconds, matching RFC 7231.",
  },
  {
    id: "cl_2026_05_10",
    date: "2026-05-10",
    version: "v1.7",
    tag: "Added",
    title: "Coverage Heatmap API",
    body: "Anonymised, aggregated heatmaps for any cell in Zimbabwe. Free tier available for non-commercial use.",
  },
  {
    id: "cl_2026_04_30",
    date: "2026-04-30",
    version: "v1.6.4",
    tag: "Security",
    title: "Webhook signature scheme upgraded to v2",
    body: "Webhook signatures now use HMAC-SHA256 over a versioned payload. The v1 scheme remains supported until 30 September 2026.",
  },
  {
    id: "cl_2026_04_12",
    date: "2026-04-12",
    version: "v1.6.3",
    tag: "Changed",
    title: "Default rate-limit window shortened",
    body: "The default rate-limit window is now 1 second for finer granularity. Existing daily limits are unchanged.",
  },
  {
    id: "cl_2026_03_22",
    date: "2026-03-22",
    version: "v1.6",
    tag: "Added",
    title: "Shona and Ndebele translation in beta",
    body: "Translate between English, Shona and Ndebele via /v1/translate. Tuned to mobile-money domain language.",
  },
  {
    id: "cl_2026_03_06",
    date: "2026-03-06",
    version: "v1.5.4",
    tag: "Deprecated",
    title: "Legacy /v0 endpoints retire 30 September 2026",
    body: "All v0 endpoints have a 1.5.x successor under /v1. Plan your migration before the cut-off date.",
  },
  {
    id: "cl_2026_02_20",
    date: "2026-02-20",
    version: "v1.5",
    tag: "Added",
    title: "SIM Swap Check API",
    body: "Returns the age of the current SIM in days, useful for lenders pausing withdrawals after a swap.",
  },
  {
    id: "cl_2026_02_05",
    date: "2026-02-05",
    version: "v1.4.1",
    tag: "Fixed",
    title: "OpenID Connect discovery document",
    body: "Corrected the issuer claim in the OIDC discovery document.",
  },
  {
    id: "cl_2026_01_18",
    date: "2026-01-18",
    version: "v1.4",
    tag: "Added",
    title: "USSD Dedicated Shortcode API",
    body: "Provision and manage your own dedicated USSD shortcode through a single REST endpoint.",
  },
  {
    id: "cl_2026_01_09",
    date: "2026-01-09",
    version: "v1.3.7",
    tag: "Fixed",
    title: "Webhook retry storm guarded",
    body: "We now cap webhook retries at 8 attempts with exponential backoff to avoid hammering misconfigured endpoints.",
  },
  {
    id: "cl_2025_12_14",
    date: "2025-12-14",
    version: "v1.3.6",
    tag: "Security",
    title: "TLS 1.0 and 1.1 disabled across all environments",
    body: "All API endpoints now require TLS 1.2 or higher, in line with our published TLS policy.",
  },
];
