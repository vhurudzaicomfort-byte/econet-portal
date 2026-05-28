export type UsagePoint = {
  date: string;
  sandbox: number;
  production: number;
  success: number;
  errors: number;
};

function isoMinusDays(days: number): string {
  const d = new Date("2026-05-28T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function seededRand(seed: number) {
  let v = seed;
  return () => {
    v = (v * 9301 + 49297) % 233280;
    return v / 233280;
  };
}

const rng = seededRand(1234);

export const last30DaysUsage: UsagePoint[] = Array.from({ length: 30 }, (_, i) => {
  const dayIndex = 29 - i;
  const base = 18000 + Math.round(rng() * 8000);
  const sandbox = Math.round(base * (0.25 + rng() * 0.15));
  const production = base - sandbox + Math.round(rng() * 2000);
  const total = sandbox + production;
  const errorRate = 0.012 + rng() * 0.025;
  const errors = Math.round(total * errorRate);
  return {
    date: isoMinusDays(dayIndex),
    sandbox,
    production,
    success: total - errors,
    errors,
  };
});

export type HourlyPoint = { hour: string; requests: number };
export const last24Hours: HourlyPoint[] = Array.from({ length: 24 }, (_, h) => {
  const factor = 0.4 + Math.sin((h / 24) * Math.PI * 2) * 0.3 + rng() * 0.3;
  return {
    hour: `${h.toString().padStart(2, "0")}:00`,
    requests: Math.max(80, Math.round(800 * factor + 200)),
  };
});

export type TopApiPoint = { name: string; calls: number };
export const topApisByVolume: TopApiPoint[] = [
  { name: "EcoCash Collect", calls: 41023 },
  { name: "Bulk SMS", calls: 36901 },
  { name: "Airtime Top-up", calls: 28412 },
  { name: "USSD Aggregator", calls: 22014 },
  { name: "Econet ID", calls: 18540 },
  { name: "KYC Lookup", calls: 9842 },
  { name: "WhatsApp Business", calls: 7211 },
];

export type StatusPoint = { name: string; value: number };
export const statusCodeDistribution: StatusPoint[] = [
  { name: "2xx", value: 96.4 },
  { name: "4xx", value: 2.7 },
  { name: "5xx", value: 0.9 },
];

export type ErrorEndpoint = {
  endpoint: string;
  count: number;
  rate: number;
  lastSeen: string;
};
export const topErrorEndpoints: ErrorEndpoint[] = [
  { endpoint: "POST /v1/ecocash/collect", count: 184, rate: 0.42, lastSeen: "2 minutes ago" },
  { endpoint: "POST /v1/sms/messages", count: 142, rate: 0.21, lastSeen: "8 minutes ago" },
  { endpoint: "GET /v1/kyc/{msisdn}", count: 96, rate: 1.18, lastSeen: "12 minutes ago" },
  { endpoint: "POST /v1/oauth/token", count: 72, rate: 0.09, lastSeen: "21 minutes ago" },
  { endpoint: "POST /v1/airtime/topup", count: 41, rate: 0.06, lastSeen: "32 minutes ago" },
];
