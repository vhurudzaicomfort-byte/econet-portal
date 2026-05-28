import type { IconProps } from "./index";

export default function IconEyeOff({
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
      <path d="m4 4 16 16" />
      <path d="M6.5 7.5C4.5 9 3 12 3 12s3.5 6.5 9.5 6.5c1.6 0 3-.3 4.2-.9" />
      <path d="M10 6c.7-.2 1.3-.2 2-.2 6 0 9.5 6.2 9.5 6.2-.5.8-1.4 2.1-2.6 3.3" />
      <path d="M10 10.3a3 3 0 0 0 3.7 3.7" />
    </svg>
  );
}
