import clsx from "clsx";

type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full bg-econet-navy text-white font-bold tracking-wide",
        sizes[size],
        className
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
