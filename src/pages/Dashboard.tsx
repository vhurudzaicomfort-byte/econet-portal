import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import StatusChip, { statusFromAppStatus } from "../components/StatusChip";
import Button from "../components/Button";
import Switch from "../components/Switch";
import IconApps from "../icons/IconApps";
import IconPlus from "../icons/IconPlus";
import IconArrowRight from "../icons/IconArrowRight";
import { useApps } from "../context/AppsContext";
import { products } from "../data/products";
import { TopbarBuildAppAction } from "../components/Topbar";
import AppShellSearchBridge from "../components/AppShellSearchBridge";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-ZW", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { visibleApps, demoState, setDemoState } = useApps();
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
    <AppShellSearchBridge
      searchPlaceholder="Search your apps"
      searchValue={query}
      onSearchChange={setQuery}
      primaryAction={<TopbarBuildAppAction />}
      showDemoToggle
    >
      <div className="flex flex-col gap-6">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
              Workspace
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-econet-ink">
              My apps
            </h1>
            <p className="text-sm text-econet-grey mt-1">
              Manage your integrations, credentials and promotion requests.
            </p>
          </div>
          <div className="flex xl:hidden items-center gap-2 rounded-md border border-econet-border bg-white px-3 py-1.5">
            <span className="text-xs font-semibold text-econet-grey uppercase tracking-wider">
              Demo
            </span>
            <Switch
              label={demoState === "Empty" ? "Empty" : "Populated"}
              checked={demoState === "Populated"}
              onChange={(on) => setDemoState(on ? "Populated" : "Empty")}
            />
          </div>
        </header>

        {filtered.length === 0 ? (
          <EmptyState
            title="Looks like you don't have any apps yet"
            body="Create your first application to receive sandbox credentials and start integrating Econet products. You can promote to production at any time."
            icon={<IconApps size={28} />}
            action={
              <Button
                variant="primary"
                size="md"
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
                    <h2 className="text-lg font-bold text-econet-ink">
                      {app.name}
                    </h2>
                    <p className="text-xs text-econet-grey mt-0.5">
                      {app.partner}
                    </p>
                  </div>
                  <StatusChip status={statusFromAppStatus(app.status)} />
                </div>
                <p className="text-sm text-econet-ink leading-6">
                  {app.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {app.subscribedProductSlugs.slice(0, 3).map((slug) => {
                    const p = products.find((x) => x.slug === slug);
                    if (!p) return null;
                    return (
                      <span
                        key={slug}
                        className="inline-flex items-center rounded bg-econet-navy/5 text-econet-navy text-xs font-semibold px-2 py-0.5"
                      >
                        {p.name}
                      </span>
                    );
                  })}
                  {app.subscribedProductSlugs.length > 3 ? (
                    <span className="inline-flex items-center rounded bg-econet-navy/5 text-econet-navy text-xs font-semibold px-2 py-0.5">
                      +{app.subscribedProductSlugs.length - 3}
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center justify-between border-t border-econet-border pt-3 mt-auto">
                  <p className="text-xs text-econet-grey">
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
    </AppShellSearchBridge>
  );
}
