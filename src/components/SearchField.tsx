import { forwardRef, useId, type InputHTMLAttributes } from "react";
import clsx from "clsx";
import IconSearch from "../icons/IconSearch";
import IconClose from "../icons/IconClose";

type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
  onClear?: () => void;
};

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    { label = "Search", placeholder = "Search", className, value, onClear, id, ...rest },
    ref
  ) {
    const reactId = useId();
    const inputId = id || `search-${reactId}`;
    const hasValue = typeof value === "string" && value.length > 0;
    return (
      <div
        className={clsx(
          "flex items-center gap-2 w-full rounded-md border border-econet-border bg-white px-3 h-10 hover:border-econet-grey focus-within:border-econet-navy focus-within:ring-2 focus-within:ring-econet-navy/30 transition-colors duration-150",
          className
        )}
      >
        <IconSearch size={18} className="text-econet-grey flex-none" aria-hidden="true" />
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          type="search"
          value={value}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-econet-ink placeholder:text-econet-grey/70 outline-none"
          {...rest}
        />
        {hasValue && onClear ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="text-econet-grey hover:text-econet-ink rounded p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
          >
            <IconClose size={14} />
          </button>
        ) : null}
      </div>
    );
  }
);

export default SearchField;
