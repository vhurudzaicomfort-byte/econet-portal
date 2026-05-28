import { Link } from "react-router-dom";
import IconChevronRight from "../icons/IconChevronRight";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-xs text-econet-grey dark:text-white/60">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1">
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="font-semibold hover:text-econet-navy dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 rounded"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-econet-ink dark:text-white">
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <IconChevronRight size={12} aria-hidden="true" className="text-econet-grey/70" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
