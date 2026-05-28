import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import IconSearch from "../icons/IconSearch";
import IconArrowRight from "../icons/IconArrowRight";
import IconClose from "../icons/IconClose";
import { apiCatalogue } from "../data/apiCatalogue";
import { docSections } from "../data/docs";
import { useApps } from "../context/AppsContext";

type Item = {
  id: string;
  group: "Pages" | "APIs" | "Docs" | "Apps";
  label: string;
  hint?: string;
  to: string;
};

const staticPages: Item[] = [
  { id: "p-dash", group: "Pages", label: "Dashboard", to: "/dashboard" },
  { id: "p-onb", group: "Pages", label: "Onboarding", to: "/onboarding" },
  { id: "p-apis", group: "Pages", label: "APIs", to: "/apis" },
  { id: "p-docs", group: "Pages", label: "Documentation", to: "/docs" },
  { id: "p-explorer", group: "Pages", label: "API Explorer", to: "/api-explorer" },
  { id: "p-sandbox", group: "Pages", label: "Sandbox", to: "/sandbox" },
  { id: "p-apps", group: "Pages", label: "My Apps", to: "/apps" },
  { id: "p-teams", group: "Pages", label: "Teams", to: "/teams" },
  { id: "p-webhooks", group: "Pages", label: "Webhooks", to: "/webhooks" },
  { id: "p-tokens", group: "Pages", label: "Access Tokens", to: "/tokens" },
  { id: "p-environments", group: "Pages", label: "Environments", to: "/environments" },
  { id: "p-analytics", group: "Pages", label: "Analytics", to: "/analytics" },
  { id: "p-billing", group: "Pages", label: "Billing", to: "/billing" },
  { id: "p-audit", group: "Pages", label: "Audit Logs", to: "/audit" },
  { id: "p-status", group: "Pages", label: "Status", to: "/status" },
  { id: "p-changelog", group: "Pages", label: "Changelog", to: "/changelog" },
  { id: "p-support", group: "Pages", label: "Support", to: "/support" },
  { id: "p-faqs", group: "Pages", label: "FAQs", to: "/faqs" },
  { id: "p-community", group: "Pages", label: "Community", to: "/community" },
  { id: "p-security", group: "Pages", label: "Security Center", to: "/security" },
  { id: "p-compliance", group: "Pages", label: "Compliance", to: "/compliance" },
  { id: "p-profile", group: "Pages", label: "Profile", to: "/profile" },
  { id: "p-notifications", group: "Pages", label: "Notifications", to: "/notifications" },
];

const apiItems: Item[] = apiCatalogue.map((a) => ({
  id: `api-${a.slug}`,
  group: "APIs",
  label: a.name,
  hint: a.category,
  to: `/apis/${a.slug}`,
}));

const docItems: Item[] = docSections.map((d) => ({
  id: `doc-${d.slug}`,
  group: "Docs",
  label: d.title,
  hint: d.category,
  to: `/docs/${d.slug}`,
}));

function fuzzyMatch(query: string, label: string): number {
  const q = query.trim().toLowerCase();
  const l = label.toLowerCase();
  if (!q) return 0;
  if (l.includes(q)) return 100;
  let qi = 0;
  let li = 0;
  let score = 0;
  while (qi < q.length && li < l.length) {
    if (q[qi] === l[li]) {
      score += 1;
      qi += 1;
    }
    li += 1;
  }
  if (qi < q.length) return -1;
  return score;
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CommandPalette({ open, onClose }: Props) {
  const navigate = useNavigate();
  const { apps } = useApps();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);

  const appItems: Item[] = useMemo(
    () =>
      apps.slice(0, 8).map((a) => ({
        id: `app-${a.id}`,
        group: "Apps" as const,
        label: a.name,
        hint: a.partner,
        to: `/apps/${a.id}`,
      })),
    [apps]
  );

  const allItems: Item[] = useMemo(
    () => [...staticPages, ...apiItems, ...docItems, ...appItems],
    [appItems]
  );

  const results = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 24);
    const scored = allItems
      .map((it) => ({ it, score: fuzzyMatch(query, `${it.label} ${it.hint || ""}`) }))
      .filter((s) => s.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 30);
    return scored.map((s) => s.it);
  }, [query, allItems]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const it = results[activeIdx];
        if (it) {
          navigate(it.to);
          onClose();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, navigate, results, activeIdx]);

  if (!open) return null;

  const grouped: Record<string, Item[]> = {};
  for (const r of results) {
    grouped[r.group] = grouped[r.group] || [];
    grouped[r.group].push(r);
  }

  let cursor = 0;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh] motion-safe:animate-fade-in"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-econet-navy/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-xl bg-white dark:bg-econet-dark-surface rounded-xl shadow-lift border border-econet-border dark:border-econet-dark-border motion-safe:animate-slide-up overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 h-12 border-b border-econet-border dark:border-econet-dark-border">
          <IconSearch size={18} className="text-econet-grey dark:text-white/60" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, APIs, docs and apps"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-econet-ink dark:text-white placeholder:text-econet-grey/70 outline-none"
            aria-label="Command palette search"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="text-econet-grey hover:text-econet-ink dark:hover:text-white rounded p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
          >
            <IconClose size={16} />
          </button>
        </div>
        <ul
          role="listbox"
          aria-label="Search results"
          className="max-h-[60vh] overflow-y-auto scrollbar-thin py-1"
        >
          {results.length === 0 ? (
            <li className="px-4 py-8 text-sm text-econet-grey dark:text-white/70 text-center">
              Nothing matched "{query}".
            </li>
          ) : (
            Object.entries(grouped).map(([group, items]) => (
              <li key={group}>
                <p className="px-4 pt-3 pb-1 text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
                  {group}
                </p>
                <ul>
                  {items.map((it) => {
                    const myIdx = cursor++;
                    const active = myIdx === activeIdx;
                    return (
                      <li key={it.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={active}
                          onMouseEnter={() => setActiveIdx(myIdx)}
                          onClick={() => {
                            navigate(it.to);
                            onClose();
                          }}
                          className={clsx(
                            "w-full flex items-center gap-2 px-4 h-10 text-left text-sm focus:outline-none",
                            active
                              ? "bg-econet-navy/10 dark:bg-white/10 text-econet-navy dark:text-white"
                              : "text-econet-ink dark:text-white/90 hover:bg-econet-surface dark:hover:bg-econet-dark-border"
                          )}
                        >
                          <span className="flex-1 font-semibold">{it.label}</span>
                          {it.hint ? (
                            <span className="text-xs text-econet-grey dark:text-white/60">{it.hint}</span>
                          ) : null}
                          <IconArrowRight
                            size={14}
                            className="text-econet-grey dark:text-white/60"
                            aria-hidden="true"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))
          )}
        </ul>
        <div className="flex items-center justify-between border-t border-econet-border dark:border-econet-dark-border px-4 py-2 text-xs text-econet-grey dark:text-white/60">
          <span>Up/Down to navigate, Enter to select</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
