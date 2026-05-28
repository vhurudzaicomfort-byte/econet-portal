import type { IconProps } from "./index";

export default function IconSms({
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
      <path d="M3.5 6.5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4 3.5v-3.5H5.5a2 2 0 0 1-2-2v-8Z" />
      <path d="M8 10.5h.01" />
      <path d="M12 10.5h.01" />
      <path d="M16 10.5h.01" />
    </svg>
  );
}
