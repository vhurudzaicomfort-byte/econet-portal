import type { IconProps } from "./index";

export default function IconResource({
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
      <path d="M5 4.5a1.5 1.5 0 0 1 1.5-1.5H17a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6.5A1.5 1.5 0 0 1 5 19.5v-15Z" />
      <path d="M5 17h12.5" />
      <path d="M9 8h6" />
      <path d="M9 11h6" />
    </svg>
  );
}
