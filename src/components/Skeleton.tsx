import clsx from "clsx";

type SkeletonProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: "sm" | "md" | "lg" | "full";
};

export default function Skeleton({
  className,
  width,
  height = 16,
  rounded = "md",
}: SkeletonProps) {
  const roundedMap = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "block bg-econet-border/60 dark:bg-econet-dark-border motion-safe:animate-shimmer",
        roundedMap[rounded],
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        backgroundImage:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
        backgroundSize: "800px 100%",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
