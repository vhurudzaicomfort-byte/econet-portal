import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  padded?: boolean;
  hoverable?: boolean;
  as?: "div" | "section" | "article";
  children?: ReactNode;
};

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padded = true, hoverable = false, className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx(
        "bg-white border border-econet-border rounded-lg shadow-soft transition-all duration-200 ease-out",
        padded && "p-5 sm:p-6",
        hoverable &&
          "motion-safe:hover:-translate-y-0.5 hover:shadow-elev hover:border-econet-navy/20",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export default Card;
