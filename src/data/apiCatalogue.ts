export type ApiCategory =
  | "EcoCash"
  | "Airtime"
  | "SMS"
  | "USSD"
  | "KYC"
  | "Identity"
  | "Advertising"
  | "AI"
  | "Device"
  | "Payments"
  | "Collections"
  | "Disbursement"
  | "Wallet"
  | "Merchant"
  | "Messaging"
  | "Voice"
  | "SIM"
  | "Location";

export type AuthType = "OAuth 2.0" | "API Key" | "mTLS";
export type EnvironmentType = "Sandbox" | "Production" | "Both";
export type PricingTier = "Free" | "Pay-as-you-go" | "Enterprise";
export type ApiStatus = "Live" | "Beta" | "Sandbox" | "Deprecated";

export type ApiParameter = {
  name: string;
  in: "path" | "query" | "body" | "header";
  type: string;
  required: boolean;
  description: string;
};

export type ApiEndpointDef = {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  summary: string;
  description?: string;
  parameters: ApiParameter[];
  requestBodyExample?: string;
  responseExample?: string;
};

export type ApiProduct = {
  id: string;
  slug: string;
  name: string;
  category: ApiCategory;
  summary: string;
  longDescription: string;
  authType: AuthType;
  environments: EnvironmentType[];
  pricingTier: PricingTier;
  rateLimit: { perSecond: number; perDay: number; burst: number };
  status: ApiStatus;
  baseUrl: string;
  endpoints: ApiEndpointDef[];
  featured?: boolean;
  popular?: boolean;
  recentlyUpdated?: boolean;
  recommended?: boolean;
  iconKey?: string;
};

const standardParams: ApiParameter[] = [
  {
    name: "Authorization",
    in: "header",
    type: "string",
    required: true,
    description: "Bearer token issued by Econet ID.",
  },
];

export const apiCatalogue: ApiProduct[] = [
  {
    id: "api_ecocash_collect",
    slug: "ecocash-collect",
    name: "EcoCash Collect",
    category: "EcoCash",
    summary: "Charge an EcoCash wallet with PIN confirmation on the subscriber's handset.",
    longDescription:
      "EcoCash Collect is the merchant-initiated debit API for EcoCash wallets in Zimbabwe. Settlements land at Steward Bank on T+1.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 100, perDay: 250000, burst: 200 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    featured: true,
    popular: true,
    recommended: true,
    iconKey: "ecocash",
    endpoints: [
      {
        id: "collect",
        method: "POST",
        path: "/v1/ecocash/collect",
        summary: "Initiate a wallet debit",
        parameters: [
          ...standardParams,
          { name: "msisdn", in: "body", type: "string", required: true, description: "Customer mobile number in E.164." },
          { name: "amount", in: "body", type: "string", required: true, description: "Amount in USD or ZWG." },
          { name: "currency", in: "body", type: "string", required: true, description: "USD or ZWG." },
          { name: "reference", in: "body", type: "string", required: true, description: "Idempotent merchant reference." },
        ],
        requestBodyExample: `{
  "msisdn": "+263774129034",
  "amount": "25.00",
  "currency": "USD",
  "reference": "ORDER-19044"
}`,
        responseExample: `{
  "id": "txn_8c2bb017f44d2c91",
  "status": "PENDING_CONFIRMATION",
  "reference": "ORDER-19044",
  "expiresAt": "2026-05-28T10:42:00Z"
}`,
      },
      {
        id: "get-transaction",
        method: "GET",
        path: "/v1/ecocash/transactions/{id}",
        summary: "Retrieve transaction status",
        parameters: [
          ...standardParams,
          { name: "id", in: "path", type: "string", required: true, description: "Transaction identifier." },
        ],
        responseExample: `{
  "id": "txn_8c2bb017f44d2c91",
  "status": "SUCCEEDED",
  "amount": "25.00",
  "currency": "USD"
}`,
      },
    ],
  },
  {
    id: "api_ecocash_disburse",
    slug: "ecocash-disburse",
    name: "EcoCash Disburse",
    category: "Disbursement",
    summary: "Push funds to any EcoCash wallet for payroll, payouts and refunds.",
    longDescription:
      "Disburse to one or many wallets in a single request. Bulk batches up to 10,000 wallets.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 75, perDay: 200000, burst: 150 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    popular: true,
    iconKey: "ecocash",
    endpoints: [
      {
        id: "disburse",
        method: "POST",
        path: "/v1/ecocash/disburse",
        summary: "Send funds to one or many wallets",
        parameters: [
          ...standardParams,
          { name: "currency", in: "body", type: "string", required: true, description: "USD or ZWG." },
          { name: "payouts", in: "body", type: "array", required: true, description: "List of payouts." },
        ],
        requestBodyExample: `{
  "currency": "USD",
  "payouts": [
    { "msisdn": "+263774129034", "amount": "120.00", "reference": "PAYROLL-001" }
  ]
}`,
      },
    ],
  },
  {
    id: "api_ecocash_merchant",
    slug: "ecocash-merchant",
    name: "EcoCash Merchant",
    category: "Merchant",
    summary: "Provision merchant tills and accept biller payments at *151#.",
    longDescription:
      "Onboard merchants, generate biller codes and reconcile till payments.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Enterprise",
    rateLimit: { perSecond: 60, perDay: 150000, burst: 120 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    iconKey: "ecocash",
    endpoints: [
      {
        id: "create-till",
        method: "POST",
        path: "/v1/merchants/tills",
        summary: "Provision a new till for a merchant",
        parameters: [
          ...standardParams,
          { name: "merchantId", in: "body", type: "string", required: true, description: "Merchant identifier." },
          { name: "label", in: "body", type: "string", required: true, description: "Display label." },
        ],
      },
    ],
  },
  {
    id: "api_ecocash_wallet",
    slug: "ecocash-wallet",
    name: "EcoCash Wallet",
    category: "Wallet",
    summary: "Inspect EcoCash wallet balance, KYC tier and recent activity.",
    longDescription:
      "Wallet inspection endpoint with explicit consent receipt from the wallet holder.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 80, perDay: 200000, burst: 150 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    iconKey: "ecocash",
    endpoints: [
      {
        id: "get-wallet",
        method: "GET",
        path: "/v1/wallets/{msisdn}",
        summary: "Retrieve wallet details",
        parameters: [
          ...standardParams,
          { name: "msisdn", in: "path", type: "string", required: true, description: "Wallet holder MSISDN." },
        ],
      },
    ],
  },
  {
    id: "api_airtime_topup",
    slug: "airtime-topup",
    name: "Airtime Top-up",
    category: "Airtime",
    summary: "Recharge any Zimbabwean mobile number programmatically.",
    longDescription:
      "Convert wallet balance into voice/data airtime for Econet, NetOne and Telecel subscribers.",
    authType: "API Key",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 200, perDay: 500000, burst: 400 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    featured: true,
    popular: true,
    iconKey: "airtime",
    endpoints: [
      {
        id: "topup",
        method: "POST",
        path: "/v1/airtime/topup",
        summary: "Recharge a single subscriber",
        parameters: [
          ...standardParams,
          { name: "msisdn", in: "body", type: "string", required: true, description: "Recipient MSISDN." },
          { name: "amount", in: "body", type: "string", required: true, description: "Top-up amount." },
          { name: "currency", in: "body", type: "string", required: true, description: "USD or ZWG." },
        ],
        requestBodyExample: `{
  "msisdn": "+263774129034",
  "amount": "5.00",
  "currency": "USD"
}`,
      },
    ],
  },
  {
    id: "api_bundle_catalogue",
    slug: "bundle-catalogue",
    name: "Bundle Catalogue",
    category: "Airtime",
    summary: "List and activate Buddie, Yo!Time and Khuluma bundles.",
    longDescription: "Inspect available bundles per subscriber tier and activate them on demand.",
    authType: "API Key",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 150, perDay: 400000, burst: 300 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    recommended: true,
    iconKey: "airtime",
    endpoints: [
      {
        id: "list-bundles",
        method: "GET",
        path: "/v1/bundles",
        summary: "List bundles for a subscriber",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_bulk_sms",
    slug: "bulk-sms",
    name: "Bulk SMS",
    category: "SMS",
    summary: "Send transactional and marketing SMS to all Zimbabwean networks.",
    longDescription:
      "A single REST endpoint dispatching SMS across Econet, NetOne and Telecel.",
    authType: "API Key",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 500, perDay: 5000000, burst: 1000 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    featured: true,
    popular: true,
    iconKey: "sms",
    endpoints: [
      {
        id: "send-sms",
        method: "POST",
        path: "/v1/sms/messages",
        summary: "Send one or many SMS",
        parameters: [
          ...standardParams,
          { name: "from", in: "body", type: "string", required: true, description: "Sender ID." },
          { name: "to", in: "body", type: "array", required: true, description: "Recipient MSISDNs." },
          { name: "body", in: "body", type: "string", required: true, description: "SMS body." },
        ],
        requestBodyExample: `{
  "from": "ECONET",
  "to": ["+263774129034"],
  "body": "Your OTP is 348201. Valid for 5 minutes."
}`,
      },
    ],
  },
  {
    id: "api_sms_receive",
    slug: "sms-receive",
    name: "SMS Receive",
    category: "SMS",
    summary: "Receive inbound SMS on a shared shortcode.",
    longDescription: "Subscribe to a shared shortcode and receive inbound SMS via webhook.",
    authType: "API Key",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 200, perDay: 1000000, burst: 400 },
    status: "Beta",
    baseUrl: "https://api.econet.co.zw",
    recentlyUpdated: true,
    iconKey: "sms",
    endpoints: [
      {
        id: "list-inbound",
        method: "GET",
        path: "/v1/sms/inbound",
        summary: "List recent inbound SMS",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_ussd_aggregator",
    slug: "ussd-aggregator",
    name: "USSD Aggregator",
    category: "USSD",
    summary: "Build menu-driven services on Econet's national *151# shared USSD gateway.",
    longDescription:
      "Routes USSD legs on *151# and *143# to your application with session affinity.",
    authType: "API Key",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 200, perDay: 800000, burst: 400 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    featured: true,
    iconKey: "ussd",
    endpoints: [
      {
        id: "receive-leg",
        method: "POST",
        path: "/v1/ussd/sessions",
        summary: "Receive an inbound USSD leg",
        parameters: [
          ...standardParams,
          { name: "shortCode", in: "body", type: "string", required: true, description: "USSD shortcode." },
          { name: "sessionId", in: "body", type: "string", required: true, description: "Session identifier." },
          { name: "msisdn", in: "body", type: "string", required: true, description: "Subscriber MSISDN." },
          { name: "input", in: "body", type: "string", required: false, description: "Input from subscriber." },
        ],
      },
    ],
  },
  {
    id: "api_ussd_dedicated",
    slug: "ussd-dedicated",
    name: "USSD Dedicated Shortcode",
    category: "USSD",
    summary: "Operate your own dedicated USSD shortcode end to end.",
    longDescription:
      "Get a dedicated *XYZ# code for your service with carrier-grade SLA.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Enterprise",
    rateLimit: { perSecond: 150, perDay: 600000, burst: 300 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    iconKey: "ussd",
    endpoints: [
      {
        id: "provision",
        method: "POST",
        path: "/v1/ussd/shortcodes",
        summary: "Provision a new shortcode",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_kyc_lookup",
    slug: "kyc-lookup",
    name: "KYC Lookup",
    category: "KYC",
    summary: "Verify a subscriber's name, ID number and address with consent.",
    longDescription:
      "Pull verified KYC fields from the Econet customer master after the subscriber consents through *151#.",
    authType: "mTLS",
    environments: ["Both"],
    pricingTier: "Enterprise",
    rateLimit: { perSecond: 60, perDay: 100000, burst: 120 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    featured: true,
    iconKey: "customer",
    endpoints: [
      {
        id: "lookup",
        method: "GET",
        path: "/v1/kyc/{msisdn}",
        summary: "Look up KYC details for a subscriber",
        parameters: [
          ...standardParams,
          { name: "msisdn", in: "path", type: "string", required: true, description: "Subscriber MSISDN." },
        ],
      },
    ],
  },
  {
    id: "api_kyc_consent",
    slug: "kyc-consent",
    name: "KYC Consent",
    category: "KYC",
    summary: "Request consent from a subscriber to share their KYC data.",
    longDescription:
      "Trigger a consent prompt over USSD and retrieve a signed consent receipt.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 50, perDay: 80000, burst: 100 },
    status: "Beta",
    baseUrl: "https://api.econet.co.zw",
    recentlyUpdated: true,
    iconKey: "customer",
    endpoints: [
      {
        id: "request-consent",
        method: "POST",
        path: "/v1/kyc/consent",
        summary: "Request KYC consent",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_econet_id",
    slug: "econet-id",
    name: "Econet ID (OpenID Connect)",
    category: "Identity",
    summary: "Sign subscribers in using their Econet mobile number.",
    longDescription:
      "OAuth 2.0 and OpenID Connect identity provider backed by the SIM with PKCE and silent header-based authentication on Econet data.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Free",
    rateLimit: { perSecond: 300, perDay: 1000000, burst: 600 },
    status: "Live",
    baseUrl: "https://auth.econet.co.zw",
    featured: true,
    popular: true,
    iconKey: "auth",
    endpoints: [
      {
        id: "authorize",
        method: "GET",
        path: "/v1/oauth/authorize",
        summary: "Start an authorisation code flow",
        parameters: [
          { name: "client_id", in: "query", type: "string", required: true, description: "Your client identifier." },
          { name: "redirect_uri", in: "query", type: "string", required: true, description: "Where to redirect on completion." },
          { name: "response_type", in: "query", type: "string", required: true, description: "Use 'code'." },
          { name: "scope", in: "query", type: "string", required: false, description: "Requested scopes." },
        ],
      },
      {
        id: "token",
        method: "POST",
        path: "/v1/oauth/token",
        summary: "Exchange a code for tokens",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_identity_silent",
    slug: "identity-silent",
    name: "Silent Authentication",
    category: "Identity",
    summary: "Authenticate Econet subscribers silently on the data network.",
    longDescription:
      "Use Econet network header enrichment to identify a subscriber without an SMS OTP.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Enterprise",
    rateLimit: { perSecond: 200, perDay: 600000, burst: 400 },
    status: "Beta",
    baseUrl: "https://auth.econet.co.zw",
    iconKey: "auth",
    endpoints: [
      {
        id: "silent",
        method: "GET",
        path: "/v1/silent/identify",
        summary: "Identify a subscriber over Econet data",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_advertising_audience",
    slug: "advertising-audience",
    name: "Audience Targeting",
    category: "Advertising",
    summary: "Define and reach segmented subscriber audiences for SMS or USSD campaigns.",
    longDescription:
      "Build anonymised audiences with up to 12 facets including age band, province and tariff plan.",
    authType: "API Key",
    environments: ["Both"],
    pricingTier: "Enterprise",
    rateLimit: { perSecond: 20, perDay: 50000, burst: 40 },
    status: "Beta",
    baseUrl: "https://ads.econet.co.zw",
    iconKey: "analytics",
    endpoints: [
      {
        id: "create-audience",
        method: "POST",
        path: "/v1/audiences",
        summary: "Create a new audience",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_advertising_campaign",
    slug: "advertising-campaign",
    name: "Campaign Delivery",
    category: "Advertising",
    summary: "Schedule and deliver SMS or USSD campaigns to an audience.",
    longDescription: "Run measured campaigns with built-in opt-out compliance.",
    authType: "API Key",
    environments: ["Both"],
    pricingTier: "Enterprise",
    rateLimit: { perSecond: 30, perDay: 80000, burst: 60 },
    status: "Live",
    baseUrl: "https://ads.econet.co.zw",
    iconKey: "analytics",
    endpoints: [
      {
        id: "create-campaign",
        method: "POST",
        path: "/v1/campaigns",
        summary: "Create a new campaign",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_ai_translate",
    slug: "ai-translate",
    name: "Shona/Ndebele Translate",
    category: "AI",
    summary: "Translate between English, Shona and Ndebele in real time.",
    longDescription:
      "Locally trained translation model tuned to mobile-money and telecom domain language.",
    authType: "API Key",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 40, perDay: 100000, burst: 80 },
    status: "Beta",
    baseUrl: "https://ai.econet.co.zw",
    recentlyUpdated: true,
    recommended: true,
    iconKey: "resource",
    endpoints: [
      {
        id: "translate",
        method: "POST",
        path: "/v1/translate",
        summary: "Translate text",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_ai_voice",
    slug: "ai-voice",
    name: "Voice Synthesis",
    category: "AI",
    summary: "Generate natural Shona, Ndebele and English voice for IVR.",
    longDescription:
      "Stream MP3 or G711 audio for IVR prompts in three local languages.",
    authType: "API Key",
    environments: ["Sandbox", "Production"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 30, perDay: 60000, burst: 60 },
    status: "Beta",
    baseUrl: "https://ai.econet.co.zw",
    iconKey: "resource",
    endpoints: [
      {
        id: "tts",
        method: "POST",
        path: "/v1/voice/synthesize",
        summary: "Synthesize speech",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_device_info",
    slug: "device-info",
    name: "Device Info",
    category: "Device",
    summary: "Retrieve handset model, capabilities and tariff for a subscriber.",
    longDescription:
      "Detect WAP-only handsets to deliver appropriate experiences.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 80, perDay: 200000, burst: 160 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    iconKey: "customer",
    endpoints: [
      {
        id: "device",
        method: "GET",
        path: "/v1/devices/{msisdn}",
        summary: "Retrieve device profile",
        parameters: [
          ...standardParams,
          { name: "msisdn", in: "path", type: "string", required: true, description: "Subscriber MSISDN." },
        ],
      },
    ],
  },
  {
    id: "api_payments_qr",
    slug: "payments-qr",
    name: "QR Payments",
    category: "Payments",
    summary: "Generate ZIPIT and EcoCash QR codes for in-store and in-app checkout.",
    longDescription:
      "Interoperable QR codes that work across Steward Bank and ZIPIT-connected wallets.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 150, perDay: 300000, burst: 300 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    recommended: true,
    iconKey: "ecocash",
    endpoints: [
      {
        id: "qr",
        method: "POST",
        path: "/v1/qr",
        summary: "Generate a payment QR",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_collections_recurring",
    slug: "collections-recurring",
    name: "Recurring Collections",
    category: "Collections",
    summary: "Authorise and run recurring debits for subscriptions.",
    longDescription:
      "One-time consent collected from the subscriber covers subsequent monthly debits.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 80, perDay: 200000, burst: 160 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    iconKey: "ecocash",
    endpoints: [
      {
        id: "mandate",
        method: "POST",
        path: "/v1/collections/mandates",
        summary: "Create a recurring mandate",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_messaging_whatsapp",
    slug: "messaging-whatsapp",
    name: "WhatsApp Business",
    category: "Messaging",
    summary: "Send templated and session messages over WhatsApp Business.",
    longDescription:
      "Authorised WhatsApp Business Platform partner for Zimbabwean enterprises.",
    authType: "API Key",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 80, perDay: 200000, burst: 200 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    popular: true,
    iconKey: "sms",
    endpoints: [
      {
        id: "send-wa",
        method: "POST",
        path: "/v1/whatsapp/messages",
        summary: "Send a WhatsApp message",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_voice_outbound",
    slug: "voice-outbound",
    name: "Outbound Voice",
    category: "Voice",
    summary: "Place programmable outbound calls with TwiML-style action XML.",
    longDescription: "Schedule outbound calls and stream audio over Econet's voice network.",
    authType: "API Key",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 40, perDay: 80000, burst: 80 },
    status: "Beta",
    baseUrl: "https://voice.econet.co.zw",
    iconKey: "ticket",
    endpoints: [
      {
        id: "call",
        method: "POST",
        path: "/v1/voice/calls",
        summary: "Place an outbound call",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_voice_ivr",
    slug: "voice-ivr",
    name: "IVR",
    category: "Voice",
    summary: "Host menu-driven IVR experiences on Econet shortcodes.",
    longDescription: "Drive call flows with declarative XML or webhooks.",
    authType: "API Key",
    environments: ["Both"],
    pricingTier: "Enterprise",
    rateLimit: { perSecond: 60, perDay: 100000, burst: 120 },
    status: "Live",
    baseUrl: "https://voice.econet.co.zw",
    iconKey: "ticket",
    endpoints: [
      {
        id: "ivr",
        method: "POST",
        path: "/v1/ivr/flows",
        summary: "Create an IVR flow",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_sim_provision",
    slug: "sim-provision",
    name: "SIM Provisioning",
    category: "SIM",
    summary: "Provision and activate SIMs programmatically.",
    longDescription: "Manage SIM lifecycle for M2M and B2B fleets.",
    authType: "mTLS",
    environments: ["Both"],
    pricingTier: "Enterprise",
    rateLimit: { perSecond: 20, perDay: 40000, burst: 40 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    iconKey: "resource",
    endpoints: [
      {
        id: "activate",
        method: "POST",
        path: "/v1/sims/activate",
        summary: "Activate a SIM",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_sim_swap",
    slug: "sim-swap",
    name: "SIM Swap Check",
    category: "SIM",
    summary: "Detect recent SIM swap activity for fraud prevention.",
    longDescription:
      "Returns the age of the current SIM in days so that lenders can pause withdrawals after a swap.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Enterprise",
    rateLimit: { perSecond: 80, perDay: 200000, burst: 160 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    recommended: true,
    iconKey: "auth",
    endpoints: [
      {
        id: "swap-check",
        method: "GET",
        path: "/v1/sim-swap/{msisdn}",
        summary: "Inspect recent SIM swap activity",
        parameters: [
          ...standardParams,
          { name: "msisdn", in: "path", type: "string", required: true, description: "Subscriber MSISDN." },
        ],
      },
    ],
  },
  {
    id: "api_location_cell",
    slug: "location-cell",
    name: "Cell Location",
    category: "Location",
    summary: "Coarse cell-level location for a subscriber with consent.",
    longDescription:
      "Returns the serving cell ID and approximate town. Personalised consent receipt required.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Enterprise",
    rateLimit: { perSecond: 40, perDay: 80000, burst: 80 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    iconKey: "customer",
    endpoints: [
      {
        id: "cell",
        method: "GET",
        path: "/v1/location/cell/{msisdn}",
        summary: "Retrieve cell-level location",
        parameters: [
          ...standardParams,
          { name: "msisdn", in: "path", type: "string", required: true, description: "Subscriber MSISDN." },
        ],
      },
    ],
  },
  {
    id: "api_location_heatmap",
    slug: "location-heatmap",
    name: "Coverage Heatmap",
    category: "Location",
    summary: "Aggregated anonymised heatmap of network coverage by cell.",
    longDescription: "Daily-rollup heatmap data, never linked to any subscriber.",
    authType: "API Key",
    environments: ["Sandbox", "Production"],
    pricingTier: "Free",
    rateLimit: { perSecond: 30, perDay: 60000, burst: 60 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    iconKey: "analytics",
    endpoints: [
      {
        id: "heatmap",
        method: "GET",
        path: "/v1/location/heatmap",
        summary: "Retrieve aggregate coverage heatmap",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_payments_settlement",
    slug: "payments-settlement",
    name: "Settlement Reports",
    category: "Payments",
    summary: "Daily settlement and reconciliation reports per merchant.",
    longDescription:
      "Download daily reports for completed collections and disbursements.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Free",
    rateLimit: { perSecond: 20, perDay: 40000, burst: 40 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    iconKey: "ecocash",
    endpoints: [
      {
        id: "settlements",
        method: "GET",
        path: "/v1/settlements",
        summary: "List daily settlement reports",
        parameters: [...standardParams],
      },
    ],
  },
  {
    id: "api_wallet_history",
    slug: "wallet-history",
    name: "Wallet History",
    category: "Wallet",
    summary: "Last 90 days of subscriber wallet transactions with consent.",
    longDescription: "Useful for personal-finance dashboards and lender affordability checks.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Pay-as-you-go",
    rateLimit: { perSecond: 60, perDay: 150000, burst: 120 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    iconKey: "ecocash",
    endpoints: [
      {
        id: "history",
        method: "GET",
        path: "/v1/wallets/{msisdn}/history",
        summary: "Retrieve wallet history",
        parameters: [
          ...standardParams,
          { name: "msisdn", in: "path", type: "string", required: true, description: "Subscriber MSISDN." },
        ],
      },
    ],
  },
  {
    id: "api_merchant_invoicing",
    slug: "merchant-invoicing",
    name: "Merchant Invoicing",
    category: "Merchant",
    summary: "Issue, track and reconcile merchant invoices over USSD or SMS.",
    longDescription: "Invoice-style flows that the subscriber confirms via *151#.",
    authType: "OAuth 2.0",
    environments: ["Both"],
    pricingTier: "Enterprise",
    rateLimit: { perSecond: 50, perDay: 100000, burst: 100 },
    status: "Live",
    baseUrl: "https://api.econet.co.zw",
    iconKey: "customer",
    endpoints: [
      {
        id: "invoice",
        method: "POST",
        path: "/v1/invoices",
        summary: "Issue a new invoice",
        parameters: [...standardParams],
      },
    ],
  },
];

export const apiCategories: ApiCategory[] = [
  "EcoCash",
  "Airtime",
  "SMS",
  "USSD",
  "KYC",
  "Identity",
  "Advertising",
  "AI",
  "Device",
  "Payments",
  "Collections",
  "Disbursement",
  "Wallet",
  "Merchant",
  "Messaging",
  "Voice",
  "SIM",
  "Location",
];

export function findApi(slug: string): ApiProduct | undefined {
  return apiCatalogue.find((a) => a.slug === slug);
}
