import type { IconProps } from "./index";

export default function IconCheck({
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
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
