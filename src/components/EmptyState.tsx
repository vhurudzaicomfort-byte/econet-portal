import clsx from "clsx";
import type { ReactNode } from "react";
import StarBurstBackground from "./StarBurstBackground";

type EmptyStateProps = {
  title: string;
  body: string;
  action?: ReactNode;
  icon?: ReactNode;
  showStarBurst?: boolean;
  className?: string;
};

export default function EmptyState({
  title,
  body,
  action,
  icon,
  showStarBurst = true,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-lg border border-econet-border bg-white shadow-soft",
        className
      )}
    >
      {showStarBurst ? (
        <StarBurstBackground
          className="absolute inset-0 h-full w-full"
          opacity={0.08}
        />
      ) : null}
      <div className="relative flex flex-col items-start gap-4 p-8 sm:p-12 max-w-xl">
        {icon ? (
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-econet-navy text-white">
            {icon}
          </div>
        ) : null}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-econet-ink">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-econet-grey">{body}</p>
        </div>
        {action ? <div className="mt-2">{action}</div> : null}
      </div>
    </div>
  );
}
