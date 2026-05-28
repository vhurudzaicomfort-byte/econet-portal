import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import clsx from "clsx";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultId?: string;
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
  variant?: "underline" | "pill";
};

export default function Tabs({
  items,
  defaultId,
  activeId,
  onChange,
  className,
  variant = "underline",
}: TabsProps) {
  const internalIdBase = useId();
  const [internalActive, setInternalActive] = useState<string>(
    defaultId || items[0]?.id || ""
  );
  const current = activeId !== undefined ? activeId : internalActive;

  const select = (id: string) => {
    if (activeId === undefined) setInternalActive(id);
    onChange?.(id);
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (idx + dir + items.length) % items.length;
      select(items[next].id);
      const el = document.getElementById(
        `${internalIdBase}-tab-${items[next].id}`
      );
      el?.focus();
    }
  };

  const activeItem = items.find((t) => t.id === current) || items[0];

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={clsx(
          variant === "underline"
            ? "flex items-end gap-1 border-b border-econet-border overflow-x-auto scrollbar-thin"
            : "inline-flex items-center gap-1 p-1 rounded-lg bg-econet-surface border border-econet-border"
        )}
      >
        {items.map((t, idx) => {
          const isActive = t.id === current;
          return (
            <button
              key={t.id}
              id={`${internalIdBase}-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${internalIdBase}-panel-${t.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={(e) => onTabKey(e, idx)}
              className={clsx(
                "transition-colors duration-150 ease-out font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30",
                variant === "underline"
                  ? clsx(
                      "px-4 h-11 text-sm border-b-2 -mb-px whitespace-nowrap",
                      isActive
                        ? "border-econet-red text-econet-navy"
                        : "border-transparent text-econet-grey hover:text-econet-ink"
                    )
                  : clsx(
                      "px-3 h-9 text-sm rounded-md whitespace-nowrap",
                      isActive
                        ? "bg-white text-econet-navy shadow-soft"
                        : "text-econet-grey hover:text-econet-ink"
                    )
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div
        id={`${internalIdBase}-panel-${activeItem.id}`}
        role="tabpanel"
        aria-labelledby={`${internalIdBase}-tab-${activeItem.id}`}
        className="pt-6"
      >
        {activeItem.content}
      </div>
    </div>
  );
}
