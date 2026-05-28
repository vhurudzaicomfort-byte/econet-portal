import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import StatusChip, { statusFromAppStatus } from "../components/StatusChip";
import Button from "../components/Button";
import Switch from "../components/Switch";
import Breadcrumb from "../components/Breadcrumb";
import IconApps from "../icons/IconApps";
import IconPlus from "../icons/IconPlus";
import IconArrowRight from "../icons/IconArrowRight";
import IconActivity from "../icons/IconActivity";
import { useApps } from "../context/AppsContext";
import { useOnboarding } from "../context/OnboardingContext";
import { products } from "../data/products";
import { TopbarBuildAppAction } from "../components/Topbar";
import AppShellSearchBridge from "../components/AppShellSearchBridge";
import { last24Hours } from "../data/usage";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-ZW", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ProgressRing({ value }: { value: number }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  return (
    <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r={r} stroke="#E3E8EC" strokeWidth="5" fill="none" />
      <circle
        cx="24"
        cy="24"
        r={r}
        stroke="#001E96"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform="rotate(-90 24 24)"
      />
      <text x="24" y="28" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-econet-ink dark:fill-white">
        {value}%
      </text>
    </svg>
  );
}

function KpiTile({
  label,
  value,
  delta,
  spark,
}: {
  label: string;
  value: string;
  delta: string;
  spark: number[];
}) {
  const data = spark.map((v, i) => ({ i, v }));
  return (
    <Card className="flex flex-col gap-2">
      <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
        {label}
      </p>
      <p className="text-3xl font-bold text-econet-ink dark:text-white">{value}</p>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-econet-success">{delta}</span>
        <div className="w-24 h-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="v"
                stroke="#001E96"
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}

type LiveRequest = {
  id: string;
  method: string;
  path: string;
  status: number;
  latency: number;
};

const seedRequests: LiveRequest[] = [
  { id: "r1", method: "POST", path: "/v1/ecocash/collect", status: 200, latency: 142 },
  { id: "r2", method: "POST", path: "/v1/sms/messages", status: 200, latency: 88 },
  { id: "r3", method: "GET", path: "/v1/kyc/+263774129034", status: 200, latency: 312 },
  { id: "r4", method: "POST", path: "/v1/airtime/topup", status: 200, latency: 174 },
  { id: "r5", method: "POST", path: "/v1/ecocash/collect", status: 400, latency: 82 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { visibleApps, demoState, setDemoState, notifications } = useApps();
  const { progress } = useOnboarding();
  const [query, setQuery] = useState("");
  const [reqs, setReqs] = useState<LiveRequest[]>(seedRequests);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function tick() {
      if (document.hidden) return;
      const sample = [
        { method: "POST", path: "/v1/ecocash/collect" },
        { method: "POST", path: "/v1/sms/messages" },
        { method: "GET", path: "/v1/wallets/+263774129034" },
        { method: "POST", path: "/v1/airtime/topup" },
        { method: "POST", path: "/v1/whatsapp/messages" },
        { method: "GET", path: "/v1/kyc/+263774129034" },
      ][Math.floor(Math.random() * 6)];
      const ok = Math.random() > 0.1;
      const next: LiveRequest = {
        id: `r${Date.now()}`,
        method: sample.method,
        path: sample.path,
        status: ok ? 200 : Math.random() > 0.5 ? 400 : 503,
        latency: 80 + Math.round(Math.random() * 350),
      };
      setReqs((prev) => [next, ...prev].slice(0, 12));
    }
    if (!prefersReduced) {
      intervalRef.current = window.setInterval(tick, 4000);
    }
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, []);

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
      <div className="flex flex-col gap-8">
        <Breadcrumb items={[{ label: "Dashboard" }]} />
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
              Workspace
            </p>
            <h1 className="text-econet-ink dark:text-white">Dashboard</h1>
            <p className="text-sm text-econet-grey dark:text-white/70 mt-1">
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

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <KpiTile
            label="API calls today"
            value={`${(last24Hours.reduce((s, p) => s + p.requests, 0) / 1000).toFixed(1)}k`}
            delta="+4.8%"
            spark={last24Hours.slice(-12).map((p) => p.requests)}
          />
          <KpiTile
            label="Success rate"
            value="96.4%"
            delta="+0.12%"
            spark={[96, 96.2, 96.1, 96.4, 96.3, 96.4, 96.5, 96.4]}
          />
          <KpiTile
            label="Active apps"
            value={String(filtered.length)}
            delta={filtered.length > 0 ? "+0" : ""}
            spark={[1, 2, 3, 3, 3, 3]}
          />
          <KpiTile
            label="Sandbox today"
            value="4.2k"
            delta="+12%"
            spark={[300, 340, 380, 410, 400, 420, 440, 420]}
          />
        </div>

        {progress < 100 ? (
          <Card className="flex items-center gap-4">
            <ProgressRing value={progress} />
            <div className="flex-1 min-w-0">
              <h3 className="text-econet-ink dark:text-white">Resume onboarding</h3>
              <p className="text-sm text-econet-grey dark:text-white/70">
                You are {progress}% through the eight-step onboarding flow.
              </p>
            </div>
            <Button variant="primary" iconRight={<IconArrowRight size={16} />} onClick={() => navigate("/onboarding")}>
              Continue
            </Button>
          </Card>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-2">
          <Card padded={false}>
            <div className="p-4 border-b border-econet-border dark:border-econet-dark-border flex items-center justify-between">
              <h3 className="text-econet-ink dark:text-white">Live requests</h3>
              <span className="inline-flex items-center gap-1 text-xs text-econet-grey dark:text-white/60">
                <IconActivity size={14} aria-hidden="true" />
                Live
              </span>
            </div>
            <ul className="divide-y divide-econet-border dark:divide-econet-dark-border max-h-80 overflow-y-auto scrollbar-thin">
              {reqs.map((r) => (
                <li
                  key={r.id}
                  className="px-4 py-2 flex items-center gap-3 text-sm text-econet-ink dark:text-white"
                >
                  <span className="font-mono text-xs font-bold w-12">{r.method}</span>
                  <span className="font-mono text-xs flex-1 truncate">{r.path}</span>
                  <span
                    className={clsx(
                      "font-mono text-xs font-bold",
                      r.status < 300
                        ? "text-econet-success"
                        : r.status < 500
                        ? "text-econet-orange"
                        : "text-econet-red"
                    )}
                  >
                    {r.status}
                  </span>
                  <span className="text-xs text-econet-grey dark:text-white/60 w-14 text-right">
                    {r.latency} ms
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card padded={false}>
            <div className="p-4 border-b border-econet-border dark:border-econet-dark-border">
              <h3 className="text-econet-ink dark:text-white">Recent notifications</h3>
            </div>
            <ul className="divide-y divide-econet-border dark:divide-econet-dark-border max-h-80 overflow-y-auto scrollbar-thin">
              {notifications.slice(0, 5).map((n) => (
                <li key={n.id} className="px-4 py-3">
                  <p className="text-sm font-semibold text-econet-ink dark:text-white">{n.title}</p>
                  <p className="text-xs text-econet-grey dark:text-white/60 mt-0.5">{n.body}</p>
                </li>
              ))}
            </ul>
            <div className="p-3 border-t border-econet-border dark:border-econet-dark-border">
              <Button variant="ghost" size="sm" onClick={() => navigate("/notifications")}>
                View all
              </Button>
            </div>
          </Card>
        </div>

        <section>
          <h2 className="text-econet-ink dark:text-white mb-4">My apps</h2>
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
                    {app.subscribedProductSlugs.length > 3 ? (
                      <span className="inline-flex items-center rounded bg-econet-navy/5 dark:bg-white/10 text-econet-navy dark:text-white text-xs font-semibold px-2 py-0.5">
                        +{app.subscribedProductSlugs.length - 3}
                      </span>
                    ) : null}
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
        </section>
      </div>
    </AppShellSearchBridge>
  );
}
