import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import IconClose from "../icons/IconClose";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  footer?: ReactNode;
};

const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  children,
  footer,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [open, onClose]
  );

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    }, 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
      window.clearTimeout(t);
      lastFocused.current?.focus?.();
    };
  }, [open, onKey]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 motion-safe:animate-fade-in"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-econet-navy/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-desc" : undefined}
        className={clsx(
          "relative w-full bg-white rounded-lg shadow-lift border border-econet-border motion-safe:animate-slide-up",
          sizes[size]
        )}
      >
        <div className="flex items-start justify-between gap-4 p-5 border-b border-econet-border">
          <div className="flex flex-col gap-1">
            <h2 id="modal-title" className="text-lg font-bold text-econet-ink">
              {title}
            </h2>
            {description ? (
              <p id="modal-desc" className="text-sm text-econet-grey">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-econet-grey hover:text-econet-ink rounded-md p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
          >
            <IconClose size={20} />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {footer ? (
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 p-5 border-t border-econet-border bg-econet-surface/40 rounded-b-lg">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
