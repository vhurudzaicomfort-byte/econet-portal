import clsx from "clsx";
import { useId } from "react";

type SwitchProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
};

export default function Switch({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className,
}: SwitchProps) {
  const reactId = useId();
  const descId = description ? `${reactId}-desc` : undefined;
  return (
    <label
      className={clsx(
        "flex items-center gap-3 select-none",
        disabled && "opacity-50",
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={descId}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={clsx(
          "relative inline-flex h-6 w-11 flex-none items-center rounded-full transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/40 focus-visible:ring-offset-2",
          checked ? "bg-econet-navy" : "bg-econet-border",
          disabled && "cursor-not-allowed"
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 motion-reduce:transition-none",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-econet-ink">{label}</span>
        {description ? (
          <span id={descId} className="text-xs text-econet-grey">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
