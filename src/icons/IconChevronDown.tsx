import type { IconProps } from "./index";

export default function IconChevronDown({
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
