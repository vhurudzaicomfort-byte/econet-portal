export type ProductCategory =
  | "USSD"
  | "SMS"
  | "Auth"
  | "Payments"
  | "Airtime"
  | "Customer"
  | "Analytics"
  | "Tickets"
  | "Resource";

export type ProductProvider =
  | "Econet Wireless"
  | "EcoCash Holdings"
  | "EcoSure";

export type EndpointMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ProductEndpoint = {
  method: EndpointMethod;
  path: string;
  summary: string;
  authRequired: boolean;
};

export type ProductCodeSample = {
  language: "cURL" | "Node.js" | "Python";
  code: string;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  provider: ProductProvider;
  iconKey:
    | "ussd"
    | "sms"
    | "auth"
    | "ecocash"
    | "airtime"
    | "customer"
    | "analytics"
    | "ticket"
    | "resource";
  availability: "Live" | "Beta" | "Sandbox";
  shortDescription: string;
  description: string;
  features: string[];
  rateLimit: string;
  endpoints: ProductEndpoint[];
  samples: ProductCodeSample[];
};

export const products: Product[] = [
  {
    slug: "ussd-aggregator",
    name: "USSD Aggregator (*151#)",
    category: "USSD",
    provider: "Econet Wireless",
    iconKey: "ussd",
    availability: "Live",
    shortDescription:
      "Build menu-driven services on Econet's national *151# shared USSD gateway.",
    description:
      "The USSD Aggregator routes interactive sessions on shortcodes such as *151# and *143# to your registered application. Manage menu state, collect input from any handset, and bill via airtime or EcoCash. Session affinity is preserved across legs.",
    features: [
      "Session-based interaction with up to 180 second TTL",
      "Multi-language menus (English, Shona, Ndebele)",
      "Per-leg billing or post-paid",
      "Webhook-driven menu rendering",
    ],
    rateLimit: "200 sessions/sec per app in production; 20 in sandbox.",
    endpoints: [
      {
        method: "POST",
        path: "/v1/ussd/sessions",
        summary: "Receive an inbound USSD leg",
        authRequired: true,
      },
      {
        method: "GET",
        path: "/v1/ussd/sessions/{sessionId}",
        summary: "Inspect a session and its prior legs",
        authRequired: true,
      },
      {
        method: "POST",
        path: "/v1/ussd/sessions/{sessionId}/end",
        summary: "Force-terminate an active session",
        authRequired: true,
      },
    ],
    samples: [
      {
        language: "cURL",
        code: `curl -X POST https://api.econet.co.zw/v1/ussd/sessions \\
  -H "Authorization: Bearer $ECONET_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "shortCode": "*151#",
    "sessionId": "sess_8c2b",
    "msisdn": "+263774129034",
    "input": "1"
  }'`,
      },
      {
        language: "Node.js",
        code: `import { EconetClient } from "@econet/sdk";

const econet = new EconetClient({ token: process.env.ECONET_TOKEN });

const reply = await econet.ussd.respond({
  sessionId: "sess_8c2b",
  message: "Welcome to Pindula Pay\\n1. Send money\\n2. Buy airtime",
  continueSession: true,
});`,
      },
      {
        language: "Python",
        code: `from econet import EconetClient

econet = EconetClient(token=os.environ["ECONET_TOKEN"])

reply = econet.ussd.respond(
    session_id="sess_8c2b",
    message="Welcome to Pindula Pay\\n1. Send money\\n2. Buy airtime",
    continue_session=True,
)`,
      },
    ],
  },
  {
    slug: "bulk-sms",
    name: "Bulk SMS",
    category: "SMS",
    provider: "Econet Wireless",
    iconKey: "sms",
    availability: "Live",
    shortDescription:
      "Send transactional and marketing SMS to all Zimbabwean networks.",
    description:
      "A single REST endpoint to dispatch SMS across Econet, NetOne and Telecel subscribers. Supports delivery receipts via webhook, sender ID registration, and bulk batching up to 50,000 recipients per request.",
    features: [
      "Cross-network delivery",
      "Custom sender ID up to 11 alphanumeric characters",
      "Delivery receipt webhooks",
      "Batch dispatch with idempotency keys",
    ],
    rateLimit: "500 messages/sec; 50,000 per batch.",
    endpoints: [
      {
        method: "POST",
        path: "/v1/sms/messages",
        summary: "Send one or many SMS messages",
        authRequired: true,
      },
      {
        method: "GET",
        path: "/v1/sms/messages/{id}",
        summary: "Get delivery status",
        authRequired: true,
      },
      {
        method: "POST",
        path: "/v1/sms/sender-ids",
        summary: "Register a new sender ID",
        authRequired: true,
      },
    ],
    samples: [
      {
        language: "cURL",
        code: `curl -X POST https://api.econet.co.zw/v1/sms/messages \\
  -H "Authorization: Bearer $ECONET_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "PINDULA",
    "to": ["+263774129034", "+263782219988"],
    "body": "Your OTP is 348201. Valid for 5 minutes."
  }'`,
      },
      {
        language: "Node.js",
        code: `await econet.sms.send({
  from: "PINDULA",
  to: ["+263774129034"],
  body: "Your OTP is 348201. Valid for 5 minutes.",
});`,
      },
      {
        language: "Python",
        code: `econet.sms.send(
    from_="PINDULA",
    to=["+263774129034"],
    body="Your OTP is 348201. Valid for 5 minutes.",
)`,
      },
    ],
  },
  {
    slug: "econet-id",
    name: "Econet ID (OAuth 2.0)",
    category: "Auth",
    provider: "Econet Wireless",
    iconKey: "auth",
    availability: "Live",
    shortDescription:
      "Let any Econet subscriber sign in to your app with their mobile number.",
    description:
      "Econet ID is an OAuth 2.0 + OpenID Connect identity provider backed by the SIM. Supports authorisation code with PKCE and silent header-based authentication on the Econet network.",
    features: [
      "OpenID Connect compliant",
      "Header enrichment auth on Econet data",
      "MFA via SIM applet",
      "Granular consented scopes",
    ],
    rateLimit: "300 authorisations/sec per app.",
    endpoints: [
      {
        method: "GET",
        path: "/v1/oauth/authorize",
        summary: "Start an authorisation code flow",
        authRequired: false,
      },
      {
        method: "POST",
        path: "/v1/oauth/token",
        summary: "Exchange a code for tokens",
        authRequired: true,
      },
      {
        method: "GET",
        path: "/v1/oauth/userinfo",
        summary: "Return the authenticated subscriber",
        authRequired: true,
      },
    ],
    samples: [
      {
        language: "cURL",
        code: `curl -X POST https://api.econet.co.zw/v1/oauth/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=authorization_code&code=4l2k...&redirect_uri=https://pindula.co.zw/cb&client_id=$ECONET_CLIENT&client_secret=$ECONET_SECRET"`,
      },
      {
        language: "Node.js",
        code: `const tokens = await econet.auth.exchangeCode({
  code: req.query.code,
  redirectUri: "https://pindula.co.zw/cb",
});

const user = await econet.auth.userInfo(tokens.access_token);`,
      },
      {
        language: "Python",
        code: `tokens = econet.auth.exchange_code(
    code=request.args["code"],
    redirect_uri="https://pindula.co.zw/cb",
)

user = econet.auth.user_info(tokens["access_token"])`,
      },
    ],
  },
  {
    slug: "ecocash-collect",
    name: "EcoCash Collect",
    category: "Payments",
    provider: "EcoCash Holdings",
    iconKey: "ecocash",
    availability: "Live",
    shortDescription:
      "Charge an EcoCash wallet with a pop-up PIN confirmation on the subscriber's phone.",
    description:
      "EcoCash Collect is the merchant-initiated debit API for EcoCash wallets in Zimbabwe. Funds are held in your settlement account at Steward Bank and disbursed on T+1.",
    features: [
      "USD and ZWG settlement",
      "Webhook on payment.success and payment.failed",
      "Per-merchant refunds API",
      "Customer dispute hooks",
    ],
    rateLimit: "100 charges/sec per app.",
    endpoints: [
      {
        method: "POST",
        path: "/v1/ecocash/collect",
        summary: "Initiate a wallet debit",
        authRequired: true,
      },
      {
        method: "GET",
        path: "/v1/ecocash/transactions/{id}",
        summary: "Retrieve transaction status",
        authRequired: true,
      },
      {
        method: "POST",
        path: "/v1/ecocash/refunds",
        summary: "Refund a settled transaction",
        authRequired: true,
      },
    ],
    samples: [
      {
        language: "cURL",
        code: `curl -X POST https://api.econet.co.zw/v1/ecocash/collect \\
  -H "Authorization: Bearer $ECONET_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "msisdn": "+263774129034",
    "amount": "25.00",
    "currency": "USD",
    "reference": "ORDER-19044"
  }'`,
      },
      {
        language: "Node.js",
        code: `const txn = await econet.ecocash.collect({
  msisdn: "+263774129034",
  amount: "25.00",
  currency: "USD",
  reference: "ORDER-19044",
});`,
      },
      {
        language: "Python",
        code: `txn = econet.ecocash.collect(
    msisdn="+263774129034",
    amount="25.00",
    currency="USD",
    reference="ORDER-19044",
)`,
      },
    ],
  },
  {
    slug: "ecocash-disburse",
    name: "EcoCash Disburse",
    category: "Payments",
    provider: "EcoCash Holdings",
    iconKey: "ecocash",
    availability: "Live",
    shortDescription:
      "Push funds to any EcoCash wallet for payroll, payouts and refunds.",
    description:
      "Disburse to one or many wallets in a single request. Supports merchant float and pre-funded settlement accounts.",
    features: [
      "Bulk payouts up to 10,000 per batch",
      "Currency conversion at interbank rates",
      "Per-batch settlement report",
    ],
    rateLimit: "75 payouts/sec; 10,000 per batch.",
    endpoints: [
      {
        method: "POST",
        path: "/v1/ecocash/disburse",
        summary: "Send funds to one or many wallets",
        authRequired: true,
      },
      {
        method: "GET",
        path: "/v1/ecocash/batches/{id}",
        summary: "Inspect a disbursement batch",
        authRequired: true,
      },
    ],
    samples: [
      {
        language: "cURL",
        code: `curl -X POST https://api.econet.co.zw/v1/ecocash/disburse \\
  -H "Authorization: Bearer $ECONET_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "currency": "USD",
    "payouts": [
      { "msisdn": "+263774129034", "amount": "120.00", "reference": "PAYROLL-001" }
    ]
  }'`,
      },
      {
        language: "Node.js",
        code: `await econet.ecocash.disburse({
  currency: "USD",
  payouts: [{ msisdn: "+263774129034", amount: "120.00", reference: "PAYROLL-001" }],
});`,
      },
      {
        language: "Python",
        code: `econet.ecocash.disburse(
    currency="USD",
    payouts=[{"msisdn": "+263774129034", "amount": "120.00", "reference": "PAYROLL-001"}],
)`,
      },
    ],
  },
  {
    slug: "airtime-topup",
    name: "Airtime Top-up",
    category: "Airtime",
    provider: "Econet Wireless",
    iconKey: "airtime",
    availability: "Live",
    shortDescription:
      "Recharge any Zimbabwean mobile number programmatically.",
    description:
      "Convert wallet balance, bank funds or merchant credit into voice/data airtime for Econet, NetOne and Telecel subscribers.",
    features: [
      "Cross-network top-ups",
      "Bulk recharge API",
      "Real-time confirmation",
    ],
    rateLimit: "200 top-ups/sec per app.",
    endpoints: [
      {
        method: "POST",
        path: "/v1/airtime/topup",
        summary: "Recharge a single subscriber",
        authRequired: true,
      },
      {
        method: "POST",
        path: "/v1/airtime/topup/bulk",
        summary: "Recharge many subscribers at once",
        authRequired: true,
      },
    ],
    samples: [
      {
        language: "cURL",
        code: `curl -X POST https://api.econet.co.zw/v1/airtime/topup \\
  -H "Authorization: Bearer $ECONET_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "msisdn": "+263774129034",
    "amount": "5.00",
    "currency": "USD"
  }'`,
      },
      {
        language: "Node.js",
        code: `await econet.airtime.topup({
  msisdn: "+263774129034",
  amount: "5.00",
  currency: "USD",
});`,
      },
      {
        language: "Python",
        code: `econet.airtime.topup(
    msisdn="+263774129034",
    amount="5.00",
    currency="USD",
)`,
      },
    ],
  },
  {
    slug: "ecosure-premium",
    name: "EcoSure Premium Verify",
    category: "Customer",
    provider: "EcoSure",
    iconKey: "customer",
    availability: "Beta",
    shortDescription:
      "Validate funeral-policy and life-cover premiums before settling claims.",
    description:
      "Check the status of an EcoSure policy in real time and confirm contributions are up to date.",
    features: [
      "Policy lookup by national ID or msisdn",
      "Premium history",
      "Beneficiary verification",
    ],
    rateLimit: "60 lookups/sec per app.",
    endpoints: [
      {
        method: "GET",
        path: "/v1/ecosure/policies/{policyNo}",
        summary: "Look up a policy",
        authRequired: true,
      },
      {
        method: "GET",
        path: "/v1/ecosure/policies/{policyNo}/premiums",
        summary: "List policy premiums",
        authRequired: true,
      },
    ],
    samples: [
      {
        language: "cURL",
        code: `curl https://api.econet.co.zw/v1/ecosure/policies/EC-1208765 \\
  -H "Authorization: Bearer $ECONET_TOKEN"`,
      },
      {
        language: "Node.js",
        code: `const policy = await econet.ecosure.getPolicy("EC-1208765");`,
      },
      {
        language: "Python",
        code: `policy = econet.ecosure.get_policy("EC-1208765")`,
      },
    ],
  },
  {
    slug: "buddie-bundles",
    name: "Buddie Bundles",
    category: "Airtime",
    provider: "Econet Wireless",
    iconKey: "airtime",
    availability: "Live",
    shortDescription:
      "Sell data, voice and social bundles directly from your app.",
    description:
      "List, purchase and confirm bundle activations across the Buddie, Yo!Time and Khuluma product families.",
    features: [
      "Bundle catalogue API",
      "Bundle activation",
      "Customer eligibility checks",
    ],
    rateLimit: "150 requests/sec per app.",
    endpoints: [
      {
        method: "GET",
        path: "/v1/bundles",
        summary: "List available bundles",
        authRequired: true,
      },
      {
        method: "POST",
        path: "/v1/bundles/purchase",
        summary: "Purchase a bundle for a subscriber",
        authRequired: true,
      },
    ],
    samples: [
      {
        language: "cURL",
        code: `curl https://api.econet.co.zw/v1/bundles \\
  -H "Authorization: Bearer $ECONET_TOKEN"`,
      },
      {
        language: "Node.js",
        code: `const bundles = await econet.bundles.list();`,
      },
      {
        language: "Python",
        code: `bundles = econet.bundles.list()`,
      },
    ],
  },
  {
    slug: "customer-lookup",
    name: "Customer Lookup",
    category: "Customer",
    provider: "Econet Wireless",
    iconKey: "customer",
    availability: "Live",
    shortDescription:
      "Resolve an Econet number to a verified customer profile.",
    description:
      "Pulls confirmed first name, surname and KYC tier from the customer master, with explicit subscriber consent.",
    features: [
      "Name-on-line",
      "KYC tier check",
      "Subscriber consent receipt",
    ],
    rateLimit: "100 lookups/sec per app.",
    endpoints: [
      {
        method: "GET",
        path: "/v1/customers/{msisdn}",
        summary: "Look up a customer by mobile number",
        authRequired: true,
      },
    ],
    samples: [
      {
        language: "cURL",
        code: `curl https://api.econet.co.zw/v1/customers/+263774129034 \\
  -H "Authorization: Bearer $ECONET_TOKEN"`,
      },
      {
        language: "Node.js",
        code: `const profile = await econet.customers.lookup("+263774129034");`,
      },
      {
        language: "Python",
        code: `profile = econet.customers.lookup("+263774129034")`,
      },
    ],
  },
  {
    slug: "network-analytics",
    name: "Network Analytics",
    category: "Analytics",
    provider: "Econet Wireless",
    iconKey: "analytics",
    availability: "Beta",
    shortDescription:
      "Aggregated, anonymised insights on network coverage and traffic.",
    description:
      "Query population density and signal strength for any cell in Zimbabwe. Returns hourly rollups with no personal data.",
    features: [
      "Cell-level rollups",
      "Coverage heatmap export",
      "Anonymised, never linked to a subscriber",
    ],
    rateLimit: "30 queries/sec per app.",
    endpoints: [
      {
        method: "GET",
        path: "/v1/analytics/cells",
        summary: "List network cells with traffic stats",
        authRequired: true,
      },
    ],
    samples: [
      {
        language: "cURL",
        code: `curl https://api.econet.co.zw/v1/analytics/cells?province=Harare \\
  -H "Authorization: Bearer $ECONET_TOKEN"`,
      },
      {
        language: "Node.js",
        code: `const cells = await econet.analytics.cells({ province: "Harare" });`,
      },
      {
        language: "Python",
        code: `cells = econet.analytics.cells(province="Harare")`,
      },
    ],
  },
  {
    slug: "service-tickets",
    name: "Service Tickets",
    category: "Tickets",
    provider: "Econet Wireless",
    iconKey: "ticket",
    availability: "Sandbox",
    shortDescription:
      "Raise and manage customer-care tickets directly from your app.",
    description:
      "Create, update and resolve tickets in the Econet care system on behalf of subscribers.",
    features: [
      "Ticket creation",
      "Status webhooks",
      "Attachment uploads",
    ],
    rateLimit: "40 tickets/sec per app.",
    endpoints: [
      {
        method: "POST",
        path: "/v1/tickets",
        summary: "Open a ticket",
        authRequired: true,
      },
      {
        method: "GET",
        path: "/v1/tickets/{id}",
        summary: "Retrieve a ticket",
        authRequired: true,
      },
    ],
    samples: [
      {
        language: "cURL",
        code: `curl -X POST https://api.econet.co.zw/v1/tickets \\
  -H "Authorization: Bearer $ECONET_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "msisdn": "+263774129034", "subject": "Data not loading", "body": "Customer reports slow downloads in Borrowdale." }'`,
      },
      {
        language: "Node.js",
        code: `await econet.tickets.create({
  msisdn: "+263774129034",
  subject: "Data not loading",
  body: "Customer reports slow downloads in Borrowdale.",
});`,
      },
      {
        language: "Python",
        code: `econet.tickets.create(
    msisdn="+263774129034",
    subject="Data not loading",
    body="Customer reports slow downloads in Borrowdale.",
)`,
      },
    ],
  },
  {
    slug: "documentation-resources",
    name: "Documentation Resources",
    category: "Resource",
    provider: "Econet Wireless",
    iconKey: "resource",
    availability: "Live",
    shortDescription:
      "Programmatic access to OpenAPI specs, Postman collections and SDK changelogs.",
    description:
      "Pull the canonical OpenAPI document for any product, the matching Postman collection, and the version history of the official SDKs.",
    features: [
      "OpenAPI 3.1 specs",
      "Postman collection export",
      "SDK release notes",
    ],
    rateLimit: "200 requests/sec per app.",
    endpoints: [
      {
        method: "GET",
        path: "/v1/resources/openapi/{product}",
        summary: "Fetch the OpenAPI spec for a product",
        authRequired: false,
      },
      {
        method: "GET",
        path: "/v1/resources/postman/{product}",
        summary: "Fetch the Postman collection for a product",
        authRequired: false,
      },
    ],
    samples: [
      {
        language: "cURL",
        code: `curl https://api.econet.co.zw/v1/resources/openapi/ecocash-collect`,
      },
      {
        language: "Node.js",
        code: `const spec = await econet.resources.openapi("ecocash-collect");`,
      },
      {
        language: "Python",
        code: `spec = econet.resources.openapi("ecocash-collect")`,
      },
    ],
  },
];

export const productCategories: ProductCategory[] = [
  "USSD",
  "SMS",
  "Auth",
  "Payments",
  "Airtime",
  "Customer",
  "Analytics",
  "Tickets",
  "Resource",
];

export const productProviders: ProductProvider[] = [
  "Econet Wireless",
  "EcoCash Holdings",
  "EcoSure",
];
