import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import StatusChip, { statusFromAppStatus } from "../components/StatusChip";
import EmptyState from "../components/EmptyState";
import SearchField from "../components/SearchField";
import IconApps from "../icons/IconApps";
import IconPlus from "../icons/IconPlus";
import IconArrowRight from "../icons/IconArrowRight";
import { useApps } from "../context/AppsContext";
import { products } from "../data/products";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZW", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function MyApps() {
  const navigate = useNavigate();
  const { visibleApps } = useApps();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return visibleApps;
    return visibleApps.filter(
      (a) =>
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.partner.toLowerCase().includes(query.toLowerCase())
    );
  }, [visibleApps, query]);

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "My Apps" }]} />
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
            Manage
          </p>
          <h1 className="text-econet-ink dark:text-white">My Apps</h1>
        </div>
        <Button
          variant="primary"
          iconLeft={<IconPlus size={18} />}
          onClick={() => navigate("/apps/new")}
        >
          Build app
        </Button>
      </header>

      <div className="max-w-xl">
        <SearchField
          placeholder="Search apps"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery("")}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No apps yet"
          body="Build your first application to receive sandbox credentials."
          icon={<IconApps size={28} />}
          action={
            <Button
              variant="primary"
              iconLeft={<IconPlus size={18} />}
              onClick={() => navigate("/apps/new")}
            >
              Create app
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((app) => (
            <Card key={app.id} hoverable className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-econet-ink dark:text-white">{app.name}</h3>
                  <p className="text-xs text-econet-grey dark:text-white/60 mt-0.5">
                    {app.partner}
                  </p>
                </div>
                <StatusChip status={statusFromAppStatus(app.status)} />
              </div>
              <p className="text-sm text-econet-ink dark:text-white/85 leading-6">
                {app.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {app.subscribedProductSlugs.slice(0, 3).map((slug) => {
                  const p = products.find((x) => x.slug === slug);
                  if (!p) return null;
                  return (
                    <span
                      key={slug}
                      className="inline-flex items-center rounded bg-econet-navy/5 dark:bg-white/10 text-econet-navy dark:text-white text-xs font-semibold px-2 py-0.5"
                    >
                      {p.name}
                    </span>
                  );
                })}
              </div>
              <div className="flex items-center justify-between border-t border-econet-border dark:border-econet-dark-border pt-3 mt-auto">
                <p className="text-xs text-econet-grey dark:text-white/60">
                  Updated {formatDate(app.updatedAt)}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  iconRight={<IconArrowRight size={16} />}
                  onClick={() => navigate(`/apps/${app.id}`)}
                >
                  Open
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
