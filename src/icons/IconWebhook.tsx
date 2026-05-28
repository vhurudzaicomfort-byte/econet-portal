import type { IconProps } from "./index";

export default function IconWebhook({
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
      <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 1 1 8.05 13.4" />
      <path d="m12 7-2.4 4.2a4 4 0 1 0 5.85 3.8" />
      <path d="M9 12.5 6.5 17a4 4 0 1 0 6.5-4.5" />
    </svg>
  );
}
