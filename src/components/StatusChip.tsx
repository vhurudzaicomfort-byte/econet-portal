import clsx from "clsx";

export type ChipStatus =
  | "sandbox"
  | "in-review"
  | "live"
  | "draft"
  | "approved"
  | "rejected"
  | "pending";

type StatusChipProps = {
  status: ChipStatus;
  label?: string;
  className?: string;
};

const styleMap: Record<
  ChipStatus,
  { dot: string; bg: string; text: string; border: string; label: string }
> = {
  sandbox: {
    dot: "bg-econet-info",
    bg: "bg-econet-info/10",
    text: "text-econet-info",
    border: "border-econet-info/30",
    label: "Sandbox",
  },
  "in-review": {
    dot: "bg-econet-orange",
    bg: "bg-econet-orange/10",
    text: "text-econet-orange",
    border: "border-econet-orange/30",
    label: "In review",
  },
  live: {
    dot: "bg-econet-success",
    bg: "bg-econet-success/10",
    text: "text-econet-success",
    border: "border-econet-success/30",
    label: "Live",
  },
  draft: {
    dot: "bg-econet-grey",
    bg: "bg-econet-surface",
    text: "text-econet-grey",
    border: "border-econet-border",
    label: "Draft",
  },
  approved: {
    dot: "bg-econet-success",
    bg: "bg-econet-success/10",
    text: "text-econet-success",
    border: "border-econet-success/30",
    label: "Approved",
  },
  rejected: {
    dot: "bg-econet-red",
    bg: "bg-econet-red/10",
    text: "text-econet-red",
    border: "border-econet-red/30",
    label: "Rejected",
  },
  pending: {
    dot: "bg-econet-orange",
    bg: "bg-econet-orange/10",
    text: "text-econet-orange",
    border: "border-econet-orange/30",
    label: "Pending",
  },
};

export default function StatusChip({ status, label, className }: StatusChipProps) {
  const s = styleMap[status];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        s.bg,
        s.text,
        s.border,
        className
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", s.dot)} aria-hidden="true" />
      <span>{label || s.label}</span>
    </span>
  );
}

export function statusFromAppStatus(
  appStatus:
    | "Draft"
    | "In Review"
    | "Approved"
    | "Rejected"
    | "Sandbox"
    | "Live"
): ChipStatus {
  switch (appStatus) {
    case "Draft":
      return "draft";
    case "In Review":
      return "in-review";
    case "Approved":
      return "approved";
    case "Rejected":
      return "rejected";
    case "Live":
      return "live";
    case "Sandbox":
      return "sandbox";
    default:
      return "draft";
  }
}
