import { useMemo, useState } from "react";
import clsx from "clsx";
import Card from "../components/Card";
import Breadcrumb from "../components/Breadcrumb";
import { changelog, type ChangelogTag } from "../data/changelog";

const tagColors: Record<ChangelogTag, string> = {
  Added: "bg-econet-success/10 text-econet-success border-econet-success/30",
  Changed: "bg-econet-info/10 text-econet-info border-econet-info/30",
  Deprecated: "bg-econet-orange/10 text-econet-orange border-econet-orange/30",
  Fixed: "bg-econet-navy/10 text-econet-navy border-econet-navy/30",
  Security: "bg-econet-red/10 text-econet-red border-econet-red/30",
};

const allTags: ChangelogTag[] = ["Added", "Changed", "Deprecated", "Fixed", "Security"];

export default function Changelog() {
  const [tagFilter, setTagFilter] = useState<ChangelogTag | "All">("All");

  const filtered = useMemo(
    () => (tagFilter === "All" ? changelog : changelog.filter((c) => c.tag === tagFilter)),
    [tagFilter]
  );

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Changelog" }]} />
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
          What changed and when
        </p>
        <h1 className="text-econet-ink dark:text-white">Changelog</h1>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setTagFilter("All")}
          className={clsx(
            "h-8 px-3 rounded-full text-xs font-semibold border",
            tagFilter === "All"
              ? "bg-econet-navy text-white border-econet-navy"
              : "bg-white dark:bg-econet-dark-surface text-econet-ink dark:text-white border-econet-border dark:border-econet-dark-border hover:border-econet-grey"
          )}
        >
          All
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTagFilter(t)}
            className={clsx(
              "h-8 px-3 rounded-full text-xs font-semibold border",
              tagFilter === t
                ? "bg-econet-navy text-white border-econet-navy"
                : "bg-white dark:bg-econet-dark-surface text-econet-ink dark:text-white border-econet-border dark:border-econet-dark-border hover:border-econet-grey"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <ol className="relative border-l-2 border-econet-border dark:border-econet-dark-border pl-6 space-y-6">
        {filtered.map((entry) => (
          <li key={entry.id} className="relative">
            <span
              className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-econet-navy border-2 border-white dark:border-econet-dark-bg"
              aria-hidden="true"
            />
            <Card>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span
                  className={clsx(
                    "inline-flex items-center rounded-full text-xs font-semibold border px-2.5 py-0.5",
                    tagColors[entry.tag]
                  )}
                >
                  {entry.tag}
                </span>
                <span className="text-xs font-semibold text-econet-grey dark:text-white/60">
                  {entry.version}
                </span>
                <span className="text-xs text-econet-grey dark:text-white/60">
                  {new Date(entry.date).toLocaleDateString("en-ZW", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h3 className="text-econet-ink dark:text-white">{entry.title}</h3>
              <p className="text-sm text-econet-grey dark:text-white/70 mt-2">{entry.body}</p>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
