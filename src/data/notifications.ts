export type NotificationCategory = "Approvals" | "System" | "Security";

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  category: NotificationCategory;
  read: boolean;
};

export const initialNotifications: NotificationItem[] = [
  {
    id: "n_001",
    title: "Pindula Wallet approved",
    body: "Your production credentials are now active for EcoCash Collect.",
    timestamp: "2026-05-27T08:14:00Z",
    category: "Approvals",
    read: false,
  },
  {
    id: "n_002",
    title: "Steward OTP Service moved to review",
    body: "A compliance officer will respond within 3 business days.",
    timestamp: "2026-05-21T09:15:00Z",
    category: "Approvals",
    read: false,
  },
  {
    id: "n_003",
    title: "Scheduled maintenance on Sandbox",
    body: "Sandbox will be unavailable on 30 May 2026 from 22:00 to 23:30 CAT.",
    timestamp: "2026-05-22T16:00:00Z",
    category: "System",
    read: true,
  },
  {
    id: "n_004",
    title: "New IP detected on Cassava Care Bot",
    body: "We saw a new IP making sandbox calls. Review if this is expected.",
    timestamp: "2026-05-24T07:42:00Z",
    category: "Security",
    read: false,
  },
  {
    id: "n_005",
    title: "Documentation refresh",
    body: "EcoCash Collect docs have been updated to v1.4.",
    timestamp: "2026-05-12T10:00:00Z",
    category: "System",
    read: true,
  },
];
