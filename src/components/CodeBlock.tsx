import clsx from "clsx";
import { useClipboard } from "../hooks/useClipboard";
import IconCopy from "../icons/IconCopy";
import IconCheck from "../icons/IconCheck";

type CodeBlockProps = {
  code: string;
  language?: string;
  className?: string;
  ariaLabel?: string;
};

export default function CodeBlock({
  code,
  language,
  className,
  ariaLabel = "Code block",
}: CodeBlockProps) {
  const { copied, copy } = useClipboard();
  return (
    <div
      className={clsx(
        "relative rounded-lg border border-econet-border bg-econet-navy text-white overflow-hidden",
        className
      )}
      aria-label={ariaLabel}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-xs font-semibold tracking-wide text-white/70">
        <span>{language || "code"}</span>
        <button
          type="button"
          onClick={() => copy(code)}
          aria-label={copied ? "Copied" : "Copy code to clipboard"}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-white/80 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-colors duration-150"
        >
          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-xs leading-6 font-mono scrollbar-thin">
        <code>{code}</code>
      </pre>
    </div>
  );
}
