import type { IconProps } from "./index";

export default function IconProducts({
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
      <path d="M12 3 3.5 7v10L12 21l8.5-4V7L12 3Z" />
      <path d="m3.5 7 8.5 4 8.5-4" />
      <path d="M12 11v10" />
    </svg>
  );
}
