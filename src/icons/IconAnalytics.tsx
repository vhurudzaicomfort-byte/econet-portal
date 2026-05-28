import type { IconProps } from "./index";

export default function IconAnalytics({
  size = 24,
  className,
  strokeWidth = 1.75,
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
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 16V12" />
      <path d="M12 16V8" />
      <path d="M16 16v-6" />
      <path d="M20 16V6" />
    </svg>
  );
}
