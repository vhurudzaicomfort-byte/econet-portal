export type IncidentStatus = "Resolved" | "Investigating" | "Monitoring" | "Identified";

export type Incident = {
  id: string;
  title: string;
  service: string;
  status: IncidentStatus;
  startedAt: string;
  resolvedAt?: string;
  postMortemUrl?: string;
  updates: { time: string; body: string; status: IncidentStatus }[];
};

export const incidents: Incident[] = [
  {
    id: "inc_2026_05_18",
    title: "EcoCash Collect elevated 5xx error rate",
    service: "EcoCash API",
    status: "Resolved",
    startedAt: "2026-05-18T08:42:00Z",
    resolvedAt: "2026-05-18T10:14:00Z",
    postMortemUrl: "https://status.econet.co.zw/incidents/2026-05-18",
    updates: [
      { time: "2026-05-18T08:42:00Z", body: "Investigating elevated 5xx on /v1/ecocash/collect.", status: "Investigating" },
      { time: "2026-05-18T09:10:00Z", body: "Root cause identified in the wallet service.", status: "Identified" },
      { time: "2026-05-18T09:58:00Z", body: "Mitigation in place, recovery confirmed.", status: "Monitoring" },
      { time: "2026-05-18T10:14:00Z", body: "Incident resolved. Total impact 92 minutes.", status: "Resolved" },
    ],
  },
  {
    id: "inc_2026_04_30",
    title: "SMS delivery delays to Telecel subscribers",
    service: "SMS Gateway",
    status: "Resolved",
    startedAt: "2026-04-30T14:22:00Z",
    resolvedAt: "2026-04-30T16:10:00Z",
    updates: [
      { time: "2026-04-30T14:22:00Z", body: "Reports of delayed SMS delivery to Telecel.", status: "Investigating" },
      { time: "2026-04-30T15:30:00Z", body: "Interconnect issue identified.", status: "Identified" },
      { time: "2026-04-30T16:10:00Z", body: "Throughput restored.", status: "Resolved" },
    ],
  },
  {
    id: "inc_2026_04_12",
    title: "USSD session timeouts on *151#",
    service: "USSD Aggregator",
    status: "Resolved",
    startedAt: "2026-04-12T07:15:00Z",
    resolvedAt: "2026-04-12T08:48:00Z",
    updates: [
      { time: "2026-04-12T07:15:00Z", body: "Session timeouts under investigation.", status: "Investigating" },
      { time: "2026-04-12T08:48:00Z", body: "Resolved after gateway restart.", status: "Resolved" },
    ],
  },
  {
    id: "inc_2026_03_06",
    title: "OAuth token endpoint slow responses",
    service: "OAuth",
    status: "Resolved",
    startedAt: "2026-03-06T11:01:00Z",
    resolvedAt: "2026-03-06T11:34:00Z",
    updates: [
      { time: "2026-03-06T11:01:00Z", body: "Latency at p95 jumped to 2.4s.", status: "Investigating" },
      { time: "2026-03-06T11:34:00Z", body: "Cache warmed, latency back to nominal.", status: "Resolved" },
    ],
  },
  {
    id: "inc_2026_02_20",
    title: "KYC lookup intermittent failures",
    service: "KYC",
    status: "Resolved",
    startedAt: "2026-02-20T13:40:00Z",
    resolvedAt: "2026-02-20T15:01:00Z",
    updates: [
      { time: "2026-02-20T13:40:00Z", body: "Investigating intermittent 503s on KYC lookups.", status: "Investigating" },
      { time: "2026-02-20T15:01:00Z", body: "Upstream connector restarted, all green.", status: "Resolved" },
    ],
  },
  {
    id: "inc_2026_01_09",
    title: "Webhook deliveries delayed",
    service: "Webhooks",
    status: "Resolved",
    startedAt: "2026-01-09T05:30:00Z",
    resolvedAt: "2026-01-09T07:12:00Z",
    updates: [
      { time: "2026-01-09T05:30:00Z", body: "Webhook backlog observed.", status: "Investigating" },
      { time: "2026-01-09T07:12:00Z", body: "Backlog cleared.", status: "Resolved" },
    ],
  },
];

export type ScheduledMaintenance = {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  scope: string;
};

export const scheduledMaintenance: ScheduledMaintenance[] = [
  {
    id: "maint_2026_06_02",
    title: "Sandbox database upgrade",
    startsAt: "2026-06-02T22:00:00Z",
    endsAt: "2026-06-02T23:30:00Z",
    scope: "Sandbox environment only. Production unaffected.",
  },
];

export type ServiceUptime = {
  service: string;
  ninetyDay: number[];
  status: "Operational" | "Degraded" | "Outage";
};

function genUptime(seed: number, outageDay?: number): number[] {
  let v = seed;
  const out: number[] = [];
  for (let i = 0; i < 90; i++) {
    v = (v * 9301 + 49297) % 233280;
    const r = v / 233280;
    let val = r > 0.985 ? 1 : 0;
    if (outageDay !== undefined && i === outageDay) val = 2;
    if (outageDay !== undefined && i === outageDay - 1) val = 1;
    out.push(val);
  }
  return out;
}

export const serviceUptime: ServiceUptime[] = [
  { service: "EcoCash API", ninetyDay: genUptime(11, 70), status: "Operational" },
  { service: "SMS Gateway", ninetyDay: genUptime(22, 58), status: "Operational" },
  { service: "USSD Aggregator", ninetyDay: genUptime(33, 76), status: "Operational" },
  { service: "OAuth", ninetyDay: genUptime(44, 82), status: "Operational" },
  { service: "KYC", ninetyDay: genUptime(55, 88), status: "Operational" },
  { service: "Airtime", ninetyDay: genUptime(66), status: "Operational" },
  { service: "Webhooks", ninetyDay: genUptime(77, 80), status: "Operational" },
  { service: "Dashboard", ninetyDay: genUptime(88), status: "Operational" },
];
