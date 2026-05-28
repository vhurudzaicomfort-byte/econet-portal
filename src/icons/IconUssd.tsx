import type { IconProps } from "./index";

export default function IconUssd({
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
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10 18.5h4" />
      <path d="M9 6h6" />
      <path d="M9 9h6" />
      <path d="M9 12h6" />
    </svg>
  );
}
