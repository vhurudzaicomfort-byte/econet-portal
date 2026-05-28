export type FaqCategory =
  | "Getting Started"
  | "Authentication"
  | "Billing"
  | "Sandbox"
  | "Production"
  | "Compliance";

export type Faq = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  { id: "f1", category: "Getting Started", question: "How do I get sandbox credentials?", answer: "Create an app from the dashboard. Sandbox credentials are issued automatically within seconds." },
  { id: "f2", category: "Getting Started", question: "Can I subscribe to multiple APIs from one application?", answer: "Yes. Each application can subscribe to as many APIs as you need." },
  { id: "f3", category: "Getting Started", question: "Is there a sandbox SDK?", answer: "Official SDKs for Node.js, Python, PHP and Go are available. Each ships with sandbox preset configuration." },
  { id: "f4", category: "Getting Started", question: "Where can I find OpenAPI specs?", answer: "Every API in the catalogue publishes an OpenAPI 3.1 document at /v1/resources/openapi/{slug}." },
  { id: "f5", category: "Getting Started", question: "Do I need to be in Zimbabwe to use the platform?", answer: "No. You can integrate from anywhere. Subscriber-facing flows complete on Econet Zimbabwe handsets." },

  { id: "f6", category: "Authentication", question: "Which OAuth grant types are supported?", answer: "Authorization code with PKCE, client credentials, and refresh token. Implicit grant is not supported." },
  { id: "f7", category: "Authentication", question: "How long do access tokens last?", answer: "Sandbox tokens last 24 hours. Production tokens last 1 hour with a refresh token valid for 30 days." },
  { id: "f8", category: "Authentication", question: "Can I rotate my client secret?", answer: "Yes. Use the dashboard's rotate-secret action. Previous secrets remain valid for 24 hours after rotation." },
  { id: "f9", category: "Authentication", question: "What is mTLS used for?", answer: "Mutual TLS is required for KYC and SIM provisioning APIs. We issue you a client certificate during onboarding." },
  { id: "f10", category: "Authentication", question: "Where do I store credentials?", answer: "Use environment variables or a secret manager. Never commit credentials to source control." },

  { id: "f11", category: "Billing", question: "What currencies are supported?", answer: "Settlement is available in USD and ZWG. Invoices are issued monthly in USD by default." },
  { id: "f12", category: "Billing", question: "Are there minimum monthly commitments?", answer: "No. Pay-as-you-go has no minimum. Enterprise tiers may include committed-use discounts." },
  { id: "f13", category: "Billing", question: "How do I view invoices?", answer: "Visit Billing in the portal. Invoices are PDF and can be downloaded for up to 24 months." },
  { id: "f14", category: "Billing", question: "Is there a free tier?", answer: "Yes. The Free tier covers sandbox usage and limited production allowances on selected APIs." },
  { id: "f15", category: "Billing", question: "Can I prepay?", answer: "Yes. Top up your billing wallet via EcoCash or bank transfer and we will debit it as you go." },

  { id: "f16", category: "Sandbox", question: "Is sandbox data real?", answer: "No. Sandbox uses simulated msisdns, wallets and balances. No real money or SMS leaves the platform." },
  { id: "f17", category: "Sandbox", question: "How realistic are sandbox responses?", answer: "Sandbox mirrors production behaviour including error codes, headers and rate limits." },
  { id: "f18", category: "Sandbox", question: "Can I reset sandbox state?", answer: "Yes. Use the Sandbox page to reset wallets and clear transaction history." },
  { id: "f19", category: "Sandbox", question: "Are sandbox webhooks signed?", answer: "Yes. Sandbox webhooks use the same signing scheme as production, with a sandbox-only signing key." },
  { id: "f20", category: "Sandbox", question: "How do I simulate failures?", answer: "Append ?force=4xx or ?force=5xx to any sandbox endpoint to force the corresponding error class." },

  { id: "f21", category: "Production", question: "How do I promote my app to production?", answer: "Use Promote to Production from the app detail page. Reviews typically complete within 3 business days." },
  { id: "f22", category: "Production", question: "What is required for production review?", answer: "Production review requires KYC of the legal entity, signed terms, and a working sandbox integration." },
  { id: "f23", category: "Production", question: "Can I run multiple production apps?", answer: "Yes. Each app has its own credentials and quota." },
  { id: "f24", category: "Production", question: "How is uptime measured?", answer: "We measure successful HTTP responses (2xx/4xx) excluding scheduled maintenance windows." },
  { id: "f25", category: "Production", question: "Are there regional restrictions?", answer: "Subscriber-facing services run on the Econet Zimbabwe network. Calling the APIs is allowed from anywhere." },

  { id: "f26", category: "Compliance", question: "Are you POPIA compliant?", answer: "Yes. We process personal data on a lawful-basis matrix and publish DPAs on request." },
  { id: "f27", category: "Compliance", question: "Where is data stored?", answer: "All subscriber data resides in Zimbabwean data centres operated by Econet." },
  { id: "f28", category: "Compliance", question: "Do you support GDPR?", answer: "We support GDPR data-subject rights for any EU residents who use your application." },
  { id: "f29", category: "Compliance", question: "Are there age restrictions?", answer: "Yes. End users must be 18 or older to consent to mobile-money transactions." },
  { id: "f30", category: "Compliance", question: "How do I report a security issue?", answer: "Email security@econet.co.zw or use the Security Center page. We respond within one business day." },
];

export const faqCategories: FaqCategory[] = [
  "Getting Started",
  "Authentication",
  "Billing",
  "Sandbox",
  "Production",
  "Compliance",
];
