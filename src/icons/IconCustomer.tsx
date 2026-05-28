import type { IconProps } from "./index";

export default function IconCustomer({
  size = 24,
  className,
  strokeWidth = 1.5,
  ...rest
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19.5c.5-3.5 3.5-5.5 7-5.5s6.5 2 7 5.5" />
      <circle cx="12" cy="12.5" r="9" />
    </svg>
  );
}
