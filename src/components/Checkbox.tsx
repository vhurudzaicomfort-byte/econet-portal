import clsx from "clsx";
import { useId, type InputHTMLAttributes } from "react";
import IconCheck from "../icons/IconCheck";

type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> & {
  label: string;
  description?: string;
};

export default function Checkbox({
  label,
  description,
  id,
  className,
  checked,
  ...rest
}: CheckboxProps) {
  const reactId = useId();
  const inputId = id || `cb-${reactId}`;
  return (
    <label htmlFor={inputId} className={clsx("inline-flex items-start gap-2 cursor-pointer", className)}>
      <span className="relative inline-flex h-5 w-5 flex-none items-center justify-center mt-0.5">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          className="peer absolute h-5 w-5 cursor-pointer opacity-0"
          {...rest}
        />
        <span
          aria-hidden="true"
          className={clsx(
            "h-5 w-5 rounded border border-econet-border bg-white inline-flex items-center justify-center transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-econet-navy/30 peer-checked:bg-econet-navy peer-checked:border-econet-navy"
          )}
        >
          {checked ? <IconCheck size={14} className="text-white" /> : null}
        </span>
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-econet-ink">{label}</span>
        {description ? (
          <span className="text-xs text-econet-grey">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
