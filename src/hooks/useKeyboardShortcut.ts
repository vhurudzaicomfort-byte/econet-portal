import { useEffect } from "react";

type KeyOptions = {
  key: string;
  meta?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
};

export function useKeyboardShortcut(
  opts: KeyOptions,
  handler: (e: KeyboardEvent) => void
) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== opts.key.toLowerCase()) return;
      if (opts.meta !== undefined && opts.meta !== e.metaKey) return;
      if (opts.ctrl !== undefined && opts.ctrl !== e.ctrlKey) return;
      if (opts.shift !== undefined && opts.shift !== e.shiftKey) return;
      if (opts.alt !== undefined && opts.alt !== e.altKey) return;
      handler(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [opts.key, opts.meta, opts.ctrl, opts.shift, opts.alt, handler]);
}
