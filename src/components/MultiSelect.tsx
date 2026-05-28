import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import clsx from "clsx";
import IconClose from "../icons/IconClose";
import IconChevronDown from "../icons/IconChevronDown";
import IconCheck from "../icons/IconCheck";

export type MultiSelectProps = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  helper?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export default function MultiSelect({
  label,
  options,
  selected,
  onChange,
  helper,
  error,
  placeholder = "Select one or more",
  required,
  className,
}: MultiSelectProps) {
  const reactId = useId();
  const fieldId = `multi-${reactId}`;
  const helperId = helper ? `${fieldId}-helper` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const toggle = useCallback(
    (option: string) => {
      if (selected.includes(option)) {
        onChange(selected.filter((s) => s !== option));
      } else {
        onChange([...selected, option]);
      }
    },
    [selected, onChange]
  );

  const removeChip = useCallback(
    (option: string) => {
      onChange(selected.filter((s) => s !== option));
    },
    [selected, onChange]
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  const hasError = !!error;

  return (
    <div className={clsx("flex flex-col gap-1.5", className)} ref={containerRef} onKeyDown={onKeyDown}>
      <label htmlFor={fieldId} className="text-sm font-semibold text-econet-ink">
        {label}
        {required ? (
          <span className="ml-1 text-econet-red" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <button
        ref={buttonRef}
        id={fieldId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={hasError || undefined}
        aria-describedby={errorId || helperId}
        onClick={() => setOpen((s) => !s)}
        className={clsx(
          "min-h-11 w-full rounded-md border bg-white px-2.5 py-1.5 text-left text-sm transition-colors duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30",
          hasError ? "border-econet-red" : "border-econet-border hover:border-econet-grey focus-visible:border-econet-navy"
        )}
      >
        <span className="flex flex-wrap items-center gap-1.5 pr-6 relative">
          {selected.length === 0 ? (
            <span className="text-econet-grey/80">{placeholder}</span>
          ) : (
            selected.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 rounded bg-econet-navy/10 text-econet-navy px-2 py-0.5 text-xs font-semibold"
              >
                {s}
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Remove ${s}`}
                  className="hover:text-econet-red focus:text-econet-red"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeChip(s);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      removeChip(s);
                    }
                  }}
                >
                  <IconClose size={12} />
                </span>
              </span>
            ))
          )}
          <IconChevronDown
            size={18}
            className={clsx(
              "absolute right-0 top-1/2 -translate-y-1/2 text-econet-grey transition-transform duration-150",
              open && "rotate-180"
            )}
            aria-hidden="true"
          />
        </span>
      </button>

      {open ? (
        <div
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby={fieldId}
          className="relative"
        >
          <ul className="absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-econet-border bg-white shadow-elev scrollbar-thin">
            {options.map((opt) => {
              const isOn = selected.includes(opt);
              return (
                <li key={opt}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isOn}
                    onClick={() => toggle(opt)}
                    className={clsx(
                      "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors duration-150",
                      isOn
                        ? "bg-econet-navy/5 text-econet-navy"
                        : "text-econet-ink hover:bg-econet-surface"
                    )}
                  >
                    <span>{opt}</span>
                    {isOn ? (
                      <IconCheck
                        size={16}
                        className="text-econet-navy"
                        aria-hidden="true"
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {error ? (
        <p id={errorId} className="text-xs text-econet-red">
          {error}
        </p>
      ) : helper ? (
        <p id={helperId} className="text-xs text-econet-grey">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
