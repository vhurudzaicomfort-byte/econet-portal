import type { IconProps } from "./index";

export default function IconTicket({
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
      <path d="M3 9.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.25a2 2 0 0 0 0 4v1.25a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.25a2 2 0 0 0 0-4V9.5Z" />
      <path d="M12 7.5v9" />
    </svg>
  );
}
