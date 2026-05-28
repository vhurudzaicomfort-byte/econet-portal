import type { IconProps } from "./index";

export default function IconUsers({
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
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 19c1-3.5 4-5 6.5-5s5.5 1.5 6.5 5" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
      <path d="M17 14c2 0 4 1.5 4.5 4" />
    </svg>
  );
}
