import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import clsx from "clsx";
import IconChevronDown from "../icons/IconChevronDown";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> & {
  label: string;
  options: SelectOption[];
  helper?: string;
  error?: string;
  hideLabel?: boolean;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, helper, error, hideLabel = false, className, id, required, ...rest },
  ref
) {
  const reactId = useId();
  const selectId = id || `select-${reactId}`;
  const helperId = helper ? `${selectId}-helper` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const hasError = !!error;

  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={selectId}
        className={clsx(
          "text-sm font-semibold text-econet-ink",
          hideLabel && "sr-only"
        )}
      >
        {label}
        {required ? (
          <span className="ml-1 text-econet-red" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <div
        className={clsx(
          "relative flex items-center w-full rounded-md border bg-white transition-colors duration-150 ease-out",
          hasError
            ? "border-econet-red"
            : "border-econet-border hover:border-econet-grey focus-within:border-econet-navy",
          "focus-within:ring-2 focus-within:ring-econet-navy/30"
        )}
      >
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={errorId || helperId}
          className="appearance-none bg-transparent text-sm text-econet-ink h-11 w-full pl-3 pr-9 outline-none"
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <IconChevronDown
          size={18}
          className="pointer-events-none absolute right-3 text-econet-grey"
          aria-hidden="true"
        />
      </div>
      {error ? (
        <p id={errorId} className="text-xs text-econet-red">
          {error}
        </p>
      ) : helper ? (
        <p id={helperId} className="text-xs text-econet-grey">
          {helper}
        </p>
      ) : null}
    </div>
  );
});

export default Select;
