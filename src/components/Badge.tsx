import clsx from "clsx";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "navy" | "grey" | "red" | "soft";
  className?: string;
};

const variants = {
  navy: "bg-econet-navy text-white",
  soft: "bg-econet-navy/10 text-econet-navy",
  grey: "bg-econet-surface text-econet-grey border border-econet-border",
  red: "bg-econet-red text-white",
};

export default function Badge({ children, variant = "soft", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
