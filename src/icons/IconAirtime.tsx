import type { IconProps } from "./index";

export default function IconAirtime({
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
      <path d="M12 3v9" />
      <path d="m7 8 5-5 5 5" />
      <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
      <path d="M9 17h.01" />
      <path d="M13 17h.01" />
      <path d="M17 17h.01" />
    </svg>
  );
}
