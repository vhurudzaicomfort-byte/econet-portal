import type { IconProps } from "./index";

export default function IconAuth({
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
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 1 1 8 0v2.5" />
      <circle cx="12" cy="15" r="1.25" />
      <path d="M12 16.5v2" />
    </svg>
  );
}
