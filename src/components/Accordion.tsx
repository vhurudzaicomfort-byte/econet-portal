import { useId, useState, type ReactNode } from "react";
import clsx from "clsx";
import IconChevronDown from "../icons/IconChevronDown";

export type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpen?: string[];
  multiple?: boolean;
  className?: string;
};

export default function Accordion({
  items,
  defaultOpen = [],
  multiple = true,
  className,
}: AccordionProps) {
  const idBase = useId();
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (multiple) return [...prev, id];
      return [id];
    });
  };

  return (
    <div className={clsx("flex flex-col divide-y divide-econet-border border border-econet-border rounded-lg overflow-hidden bg-white", className)}>
      {items.map((item) => {
        const open = openIds.includes(item.id);
        const panelId = `${idBase}-acc-${item.id}`;
        const buttonId = `${idBase}-acc-btn-${item.id}`;
        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 h-12 text-left font-semibold text-econet-ink hover:bg-econet-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 focus-visible:ring-inset"
              >
                <span>{item.title}</span>
                <IconChevronDown
                  size={20}
                  className={clsx(
                    "text-econet-grey transition-transform duration-200 motion-reduce:transition-none",
                    open && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {open ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-4 sm:px-5 pb-5 text-sm text-econet-ink leading-7 motion-safe:animate-slide-up"
              >
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
