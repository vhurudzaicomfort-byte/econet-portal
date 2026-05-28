import type { IconProps } from "./index";

export default function IconCloud({
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
      <path d="M17.5 19a4.5 4.5 0 1 0-1.7-8.7 7 7 0 0 0-13.6 2.2A4 4 0 0 0 6 19h11.5z" />
    </svg>
  );
}
