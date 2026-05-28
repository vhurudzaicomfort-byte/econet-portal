import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-econet-red text-white border border-econet-red hover:bg-econet-red-deep hover:border-econet-red-deep active:bg-econet-red-deep focus-visible:ring-econet-red/40",
  secondary:
    "bg-econet-navy text-white border border-econet-navy hover:bg-econet-navy-deep hover:border-econet-navy-deep active:bg-econet-navy-deep focus-visible:ring-econet-navy/40",
  ghost:
    "bg-transparent text-econet-navy border border-transparent hover:bg-econet-navy/5 active:bg-econet-navy/10 focus-visible:ring-econet-navy/30",
  danger:
    "bg-transparent text-econet-red border border-econet-red hover:bg-econet-red hover:text-white active:bg-econet-red-deep active:border-econet-red-deep focus-visible:ring-econet-red/40",
};

function Spinner() {
  return (
    <svg
      className="motion-safe:animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    iconLeft,
    iconRight,
    fullWidth = false,
    className,
    disabled,
    type = "button",
    children,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;
  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={clsx(
        "inline-flex items-center justify-center font-semibold rounded-pill transition-all duration-micro ease-econet focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:translate-y-px",
        sizeClass[size],
        variantClass[variant],
        fullWidth && "w-full",
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Working</span>
        </>
      ) : (
        <>
          {iconLeft ? <span className="inline-flex">{iconLeft}</span> : null}
          {children}
          {iconRight ? <span className="inline-flex">{iconRight}</span> : null}
        </>
      )}
    </button>
  );
});

export default Button;
