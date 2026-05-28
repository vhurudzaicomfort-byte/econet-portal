import {
  useId,
  useState,
  type ReactElement,
  cloneElement,
  type ReactNode,
} from "react";
import clsx from "clsx";

type TooltipProps = {
  label: string;
  side?: "top" | "bottom";
  children: ReactElement;
  className?: string;
};

export default function Tooltip({
  label,
  side = "top",
  children,
  className,
}: TooltipProps): ReactNode {
  const id = useId();
  const [open, setOpen] = useState(false);

  const trigger = cloneElement(children, {
    "aria-describedby": open ? id : undefined,
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
  });

  return (
    <span className={clsx("relative inline-flex", className)}>
      {trigger}
      {open ? (
        <span
          id={id}
          role="tooltip"
          className={clsx(
            "absolute z-40 whitespace-nowrap rounded-md bg-econet-navy text-white text-xs font-medium px-2 py-1 shadow-elev pointer-events-none",
            side === "top"
              ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
              : "top-full mt-2 left-1/2 -translate-x-1/2"
          )}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}
