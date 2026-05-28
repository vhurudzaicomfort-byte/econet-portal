import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import clsx from "clsx";
import IconWarning from "../icons/IconWarning";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helper?: string;
  error?: string;
  adornmentLeft?: ReactNode;
  adornmentRight?: ReactNode;
  hideLabel?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    helper,
    error,
    adornmentLeft,
    adornmentRight,
    hideLabel = false,
    className,
    id,
    required,
    ...rest
  },
  ref
) {
  const reactId = useId();
  const inputId = id || `input-${reactId}`;
  const helperId = helper ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const hasError = !!error;

  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={inputId}
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
          "flex items-center gap-2 w-full rounded-md border bg-white transition-colors duration-150 ease-out",
          hasError
            ? "border-econet-red"
            : "border-econet-border hover:border-econet-grey focus-within:border-econet-navy",
          "focus-within:ring-2 focus-within:ring-econet-navy/30"
        )}
      >
        {adornmentLeft ? (
          <span className="pl-3 text-econet-grey flex-none">{adornmentLeft}</span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={errorId || helperId}
          className={clsx(
            "flex-1 bg-transparent text-sm text-econet-ink placeholder:text-econet-grey/70 h-11 outline-none w-full",
            adornmentLeft ? "pl-1" : "pl-3",
            adornmentRight ? "pr-1" : "pr-3"
          )}
          {...rest}
        />
        {adornmentRight ? (
          <span className="pr-2 text-econet-grey flex-none">{adornmentRight}</span>
        ) : null}
      </div>
      {error ? (
        <p
          id={errorId}
          className="text-xs text-econet-red flex items-center gap-1"
        >
          <IconWarning size={14} aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : helper ? (
        <p id={helperId} className="text-xs text-econet-grey">
          {helper}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
