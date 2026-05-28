export type AppStatus =
  | "Draft"
  | "In Review"
  | "Approved"
  | "Rejected"
  | "Sandbox"
  | "Live";

export type AppPromotionEvent = {
  status: "Draft" | "Submitted" | "In Review" | "Approved" | "Rejected";
  date: string;
  note?: string;
};

export type AppRecord = {
  id: string;
  name: string;
  partner: string;
  contact: string;
  description: string;
  channels: string[];
  callbackUrl: string;
  teamId: string;
  status: AppStatus;
  environment: "Sandbox" | "Production";
  subscribedProductSlugs: string[];
  clientId: string;
  clientSecret: string;
  webhookSecret: string;
  createdAt: string;
  updatedAt: string;
  promotion: AppPromotionEvent[];
};

export const initialApps: AppRecord[] = [
  {
    id: "app_01h8z4",
    name: "Pindula Wallet",
    partner: "Pindula Pay (Pvt) Ltd",
    contact: "+263 77 412 9034",
    description: "Multi-rail wallet bundling EcoCash, airtime and bundle sales.",
    channels: ["MyEcoApp", "USSD", "EcoCash"],
    callbackUrl: "https://api.pindula.co.zw/callbacks/econet",
    teamId: "team_payments",
    status: "Live",
    environment: "Production",
    subscribedProductSlugs: ["ecocash-collect", "airtime-topup", "ussd-aggregator"],
    clientId: "ec_live_8c2bb017f44d2c91",
    clientSecret: "ecsec_live_demo_5pH2yRkRr8mZkM3vQ1tWzN9aLb7uXf",
    webhookSecret: "ecwh_live_demo_g7N3xQpY2nB6mTzD",
    createdAt: "2026-01-12T08:14:00Z",
    updatedAt: "2026-05-19T11:02:00Z",
    promotion: [
      { status: "Draft", date: "2026-01-12T08:14:00Z" },
      { status: "Submitted", date: "2026-01-14T10:00:00Z" },
      { status: "In Review", date: "2026-01-15T09:30:00Z", note: "Compliance check started." },
      { status: "Approved", date: "2026-01-22T16:45:00Z", note: "Promoted to production." },
    ],
  },
  {
    id: "app_02k4t9",
    name: "Steward OTP Service",
    partner: "Steward Bank",
    contact: "+263 78 221 9988",
    description: "Bank-grade one-time-password delivery over Bulk SMS.",
    channels: ["SMS", "Email"],
    callbackUrl: "https://otp.stewardbank.co.zw/hooks/econet",
    teamId: "team_security",
    status: "In Review",
    environment: "Sandbox",
    subscribedProductSlugs: ["bulk-sms", "econet-id"],
    clientId: "ec_sand_d491fa20a18e7d56",
    clientSecret: "ecsec_sand_demo_2pL1xRfRk6yMmH4vN3qVcU8aJb5zXg",
    webhookSecret: "ecwh_sand_demo_q5J9wRzZ1hF8nKlX",
    createdAt: "2026-04-02T12:30:00Z",
    updatedAt: "2026-05-21T09:15:00Z",
    promotion: [
      { status: "Draft", date: "2026-04-02T12:30:00Z" },
      { status: "Submitted", date: "2026-05-18T13:42:00Z" },
      { status: "In Review", date: "2026-05-19T08:00:00Z", note: "Risk review in progress." },
    ],
  },
  {
    id: "app_03n7v2",
    name: "Cassava Care Bot",
    partner: "Cassava Fintech",
    contact: "+263 77 998 4421",
    description: "Self-service USSD assistant for funeral cover renewals.",
    channels: ["USSD", "MyEcoApp"],
    callbackUrl: "https://care.cassava.co.zw/econet",
    teamId: "team_care",
    status: "Sandbox",
    environment: "Sandbox",
    subscribedProductSlugs: ["ussd-aggregator", "ecosure-premium"],
    clientId: "ec_sand_c108aa7c4b62e913",
    clientSecret: "ecsec_sand_demo_9qK4xPhRm7xLnG3wO2rTbV6aHc4yWe",
    webhookSecret: "ecwh_sand_demo_r4M2vXyW0gE7mJqY",
    createdAt: "2026-05-20T14:00:00Z",
    updatedAt: "2026-05-25T17:22:00Z",
    promotion: [
      { status: "Draft", date: "2026-05-20T14:00:00Z" },
    ],
  },
];
