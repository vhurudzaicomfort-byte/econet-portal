export type AuditResult = "Success" | "Failure";
export type AuditAction =
  | "App Created"
  | "App Deleted"
  | "Key Rotated"
  | "Member Invited"
  | "Member Removed"
  | "Role Changed"
  | "Environment Promoted"
  | "Secret Viewed"
  | "Webhook Created"
  | "Webhook Deleted"
  | "Token Generated"
  | "Token Revoked"
  | "Signed In"
  | "Signed Out"
  | "Plan Changed"
  | "Invoice Downloaded";

export type AuditEntry = {
  id: string;
  timestamp: string;
  actor: string;
  action: AuditAction;
  resource: string;
  ip: string;
  result: AuditResult;
};

const actors = [
  "tariro@pindulapay.co.zw",
  "kudzai@pindulapay.co.zw",
  "rumbi@pindulapay.co.zw",
  "tendai@stewardbank.co.zw",
  "farai@stewardbank.co.zw",
  "nyasha@cassava.co.zw",
];

const actions: AuditAction[] = [
  "App Created",
  "App Deleted",
  "Key Rotated",
  "Member Invited",
  "Member Removed",
  "Role Changed",
  "Environment Promoted",
  "Secret Viewed",
  "Webhook Created",
  "Webhook Deleted",
  "Token Generated",
  "Token Revoked",
  "Signed In",
  "Plan Changed",
  "Invoice Downloaded",
];

const resources = [
  "app:pindula-wallet",
  "app:steward-otp-service",
  "app:cassava-care-bot",
  "team:payments-platform",
  "team:security-auth",
  "webhook:wh_4c8a",
  "webhook:wh_88a1",
  "token:tok_2a4f",
  "invoice:inv_2026_04",
  "plan:growth",
];

const ips = [
  "196.220.144.12",
  "196.220.144.21",
  "196.220.144.37",
  "102.176.18.4",
  "41.220.10.55",
];

function seededRand(seed: number) {
  let v = seed;
  return () => {
    v = (v * 9301 + 49297) % 233280;
    return v / 233280;
  };
}

function isoFromOffset(daysAgo: number, hour: number, minute: number) {
  const d = new Date("2026-05-28T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - daysAgo);
  d.setUTCHours(hour, minute, 0, 0);
  return d.toISOString();
}

const rng = seededRand(42);

export const auditLog: AuditEntry[] = Array.from({ length: 64 }, (_, i) => {
  const daysAgo = Math.floor(rng() * 30);
  const hour = Math.floor(rng() * 24);
  const minute = Math.floor(rng() * 60);
  const action = actions[Math.floor(rng() * actions.length)];
  const actor = actors[Math.floor(rng() * actors.length)];
  const resource = resources[Math.floor(rng() * resources.length)];
  const ip = ips[Math.floor(rng() * ips.length)];
  const result: AuditResult = rng() > 0.92 ? "Failure" : "Success";
  return {
    id: `aud_${(i + 1).toString().padStart(4, "0")}`,
    timestamp: isoFromOffset(daysAgo, hour, minute),
    actor,
    action,
    resource,
    ip,
    result,
  };
}).sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
