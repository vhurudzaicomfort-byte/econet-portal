import clsx from "clsx";
import IconCheck from "../icons/IconCheck";
import IconClose from "../icons/IconClose";
import IconInfo from "../icons/IconInfo";
import IconWarning from "../icons/IconWarning";
import type { ToastKind } from "../context/ToastContext";

type ToastProps = {
  kind: ToastKind;
  title: string;
  body?: string;
  onClose: () => void;
};

const styles: Record<ToastKind, { bar: string; iconColor: string }> = {
  success: { bar: "bg-econet-success", iconColor: "text-econet-success" },
  error: { bar: "bg-econet-red", iconColor: "text-econet-red" },
  info: { bar: "bg-econet-navy", iconColor: "text-econet-navy" },
};

export default function Toast({ kind, title, body, onClose }: ToastProps) {
  const style = styles[kind];
  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      className="pointer-events-auto flex w-full overflow-hidden rounded-lg border border-econet-border bg-white shadow-lift motion-safe:animate-slide-in-right"
    >
      <div className={clsx("w-1.5 flex-none", style.bar)} aria-hidden="true" />
      <div className="flex flex-1 items-start gap-3 p-4">
        <div className={clsx("mt-0.5", style.iconColor)} aria-hidden="true">
          {kind === "success" ? (
            <IconCheck size={20} />
          ) : kind === "error" ? (
            <IconWarning size={20} />
          ) : (
            <IconInfo size={20} />
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-econet-ink">{title}</p>
          {body ? <p className="text-sm text-econet-grey">{body}</p> : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="text-econet-grey hover:text-econet-ink p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
        >
          <IconClose size={16} />
        </button>
      </div>
    </div>
  );
}
