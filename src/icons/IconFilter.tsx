import type { IconProps } from "./index";

export default function IconFilter({
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
      <path d="M3.5 5.5h17l-6.5 8v6l-4 2v-8l-6.5-8Z" />
    </svg>
  );
}
