import { useMemo, useState } from "react";
import clsx from "clsx";
import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import Select from "../components/Select";
import SearchField from "../components/SearchField";
import { auditLog } from "../data/auditLog";

const PAGE_SIZE = 20;

export default function AuditLogs() {
  const [search, setSearch] = useState("");
  const [actor, setActor] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [page, setPage] = useState(0);

  const actors = useMemo(() => Array.from(new Set(auditLog.map((a) => a.actor))).sort(), []);
  const actions = useMemo(() => Array.from(new Set(auditLog.map((a) => a.action))).sort(), []);

  const filtered = useMemo(() => {
    return auditLog.filter((row) => {
      if (actor && row.actor !== actor) return false;
      if (action && row.action !== action) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !row.actor.toLowerCase().includes(q) &&
          !row.action.toLowerCase().includes(q) &&
          !row.resource.toLowerCase().includes(q) &&
          !row.ip.includes(q)
        )
          return false;
      }
      return true;
    });
  }, [search, actor, action]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const rows = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Audit Logs" }]} />
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
          Trail of every action
        </p>
        <h1 className="text-econet-ink dark:text-white">Audit Logs</h1>
      </header>

      <Card className="flex flex-col gap-3">
        <div className="grid gap-3 sm:grid-cols-3">
          <SearchField
            placeholder="Search by actor, action, resource or IP"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            onClear={() => setSearch("")}
          />
          <Select
            label="Actor"
            hideLabel
            value={actor}
            onChange={(e) => {
              setActor(e.target.value);
              setPage(0);
            }}
            options={[{ value: "", label: "All actors" }, ...actors.map((a) => ({ value: a, label: a }))]}
          />
          <Select
            label="Action"
            hideLabel
            value={action}
            onChange={(e) => {
              setAction(e.target.value);
              setPage(0);
            }}
            options={[{ value: "", label: "All actions" }, ...actions.map((a) => ({ value: a, label: a }))]}
          />
        </div>
        <p className="text-xs text-econet-grey dark:text-white/60">
          Showing {filtered.length === 0 ? 0 : safePage * PAGE_SIZE + 1}–
          {safePage * PAGE_SIZE + rows.length} of {filtered.length}
        </p>
      </Card>

      <Card padded={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-econet-surface dark:bg-econet-dark-border text-left text-xs font-semibold uppercase tracking-wide text-econet-grey dark:text-white/70">
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Resource</th>
                <th className="px-4 py-3">IP</th>
                <th className="px-4 py-3">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-econet-border dark:divide-econet-dark-border">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-econet-grey dark:text-white/60">
                    No audit log entries match the filters.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="text-econet-ink dark:text-white">
                    <td className="px-4 py-3 font-mono text-xs">
                      {new Date(row.timestamp).toLocaleString("en-ZW")}
                    </td>
                    <td className="px-4 py-3">{row.actor}</td>
                    <td className="px-4 py-3">{row.action}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.resource}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.ip}</td>
                    <td className="px-4 py-3">
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-0.5",
                          row.result === "Success"
                            ? "bg-econet-success/10 text-econet-success"
                            : "bg-econet-red/10 text-econet-red"
                        )}
                      >
                        {row.result}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-econet-border dark:border-econet-dark-border">
          <p className="text-xs text-econet-grey dark:text-white/60">
            Page {safePage + 1} of {pageCount}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={safePage === 0}
              onClick={() => setPage(Math.max(0, safePage - 1))}
            >
              Previous
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={safePage >= pageCount - 1}
              onClick={() => setPage(Math.min(pageCount - 1, safePage + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
