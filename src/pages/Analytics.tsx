import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../components/Card";
import Button from "../components/Button";
import Breadcrumb from "../components/Breadcrumb";
import Skeleton from "../components/Skeleton";
import IconActivity from "../icons/IconActivity";
import {
  last24Hours,
  last30DaysUsage,
  statusCodeDistribution,
  topApisByVolume,
  topErrorEndpoints,
} from "../data/usage";

const palette = {
  navy: "#001E96",
  red: "#E2231A",
  info: "#0083BF",
  success: "#4C8C40",
  orange: "#F2682A",
  grey: "#677A81",
};

const ranges = [
  { id: "7d", label: "7d", days: 7 },
  { id: "30d", label: "30d", days: 30 },
  { id: "90d", label: "90d", days: 90 },
  { id: "custom", label: "Custom", days: 14 },
];

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
  const up = !delta.startsWith("-");
  return (
    <Card className="flex flex-col gap-2">
      <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
        {label}
      </p>
      <p className="text-3xl font-bold text-econet-ink dark:text-white">{value}</p>
      <div className="flex items-center justify-between gap-2">
        <span
          className={clsx(
            "text-xs font-semibold",
            up ? "text-econet-success" : "text-econet-red"
          )}
        >
          {delta}
        </span>
        <div className="w-24 h-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={palette.navy}
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

export default function Analytics() {
  const [range, setRange] = useState("30d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(t);
  }, [range]);

  const days = ranges.find((r) => r.id === range)?.days ?? 30;
  const trimmed = useMemo(
    () => last30DaysUsage.slice(Math.max(0, last30DaysUsage.length - days)),
    [days]
  );

  const totals = useMemo(() => {
    const total = trimmed.reduce((s, p) => s + p.success + p.errors, 0);
    const success = trimmed.reduce((s, p) => s + p.success, 0);
    const successRate = total > 0 ? (success / total) * 100 : 0;
    return { total, successRate };
  }, [trimmed]);

  const onExport = () => {
    const rows = [
      ["date", "sandbox", "production", "success", "errors"],
      ...trimmed.map((p) => [p.date, p.sandbox, p.production, p.success, p.errors]),
    ]
      .map((r) => r.join(","))
      .join("\n");
    const blob = new Blob([rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `econet-analytics-${range}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Analytics" }]} />
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
            Insights
          </p>
          <h1 className="text-econet-ink dark:text-white">Analytics</h1>
          <p className="text-sm text-econet-grey dark:text-white/70 mt-1">
            Real-time API usage, error rates and top callers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center rounded-md border border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-surface p-0.5">
            {ranges.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRange(r.id)}
                className={clsx(
                  "px-3 h-8 text-xs font-bold rounded-[5px]",
                  range === r.id
                    ? "bg-econet-navy text-white"
                    : "text-econet-grey dark:text-white/60 hover:text-econet-ink dark:hover:text-white"
                )}
                aria-pressed={range === r.id}
              >
                {r.label}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={onExport}>
            Export CSV
          </Button>
        </div>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <Card key={i} className="flex flex-col gap-3">
              <Skeleton width={120} height={12} />
              <Skeleton width={140} height={28} />
              <Skeleton height={28} />
            </Card>
          ))
        ) : (
          <>
            <KpiTile
              label="API calls today"
              value={`${(totals.total / Math.max(1, days)).toFixed(0)}k`}
              delta="+4.8%"
              spark={trimmed.slice(-12).map((p) => p.success)}
            />
            <KpiTile
              label="Success rate"
              value={`${totals.successRate.toFixed(2)}%`}
              delta="+0.12%"
              spark={trimmed.slice(-12).map((p) => p.success / Math.max(1, p.success + p.errors))}
            />
            <KpiTile
              label="P95 latency"
              value="218 ms"
              delta="-8 ms"
              spark={[210, 222, 215, 230, 224, 218, 219, 217]}
            />
            <KpiTile
              label="Active apps"
              value="34"
              delta="+2"
              spark={[28, 29, 31, 30, 32, 33, 33, 34]}
            />
          </>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h3 className="text-econet-ink dark:text-white mb-3">Requests per hour (last 24h)</h3>
          {loading ? (
            <Skeleton height={240} />
          ) : (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last24Hours}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E3E8EC" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke={palette.grey} />
                  <YAxis tick={{ fontSize: 11 }} stroke={palette.grey} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    stroke={palette.navy}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-econet-ink dark:text-white mb-3">Sandbox vs Production</h3>
          {loading ? (
            <Skeleton height={240} />
          ) : (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trimmed}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E3E8EC" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke={palette.grey} />
                  <YAxis tick={{ fontSize: 11 }} stroke={palette.grey} />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="sandbox"
                    stackId="1"
                    stroke={palette.info}
                    fill={palette.info}
                    fillOpacity={0.5}
                    isAnimationActive={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="production"
                    stackId="1"
                    stroke={palette.navy}
                    fill={palette.navy}
                    fillOpacity={0.5}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-econet-ink dark:text-white mb-3">Top APIs (last 7 days)</h3>
          {loading ? (
            <Skeleton height={240} />
          ) : (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topApisByVolume} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E3E8EC" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke={palette.grey} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke={palette.grey} width={150} />
                  <Tooltip />
                  <Bar dataKey="calls" fill={palette.navy} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card>
          <h3 className="text-econet-ink dark:text-white mb-3">Status code distribution</h3>
          {loading ? (
            <Skeleton height={240} />
          ) : (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusCodeDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={90}
                    label
                    isAnimationActive={false}
                  >
                    <Cell fill={palette.success} />
                    <Cell fill={palette.orange} />
                    <Cell fill={palette.red} />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-econet-ink dark:text-white">Top error endpoints</h3>
          <span className="inline-flex items-center gap-1 text-xs text-econet-grey dark:text-white/60">
            <IconActivity size={14} aria-hidden="true" /> Updated 30s ago
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-econet-surface dark:bg-econet-dark-border text-left text-xs font-semibold uppercase tracking-wide text-econet-grey dark:text-white/70">
                <th className="px-4 py-3">Endpoint</th>
                <th className="px-4 py-3">Errors</th>
                <th className="px-4 py-3">Rate</th>
                <th className="px-4 py-3">Last seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-econet-border dark:divide-econet-dark-border">
              {topErrorEndpoints.map((e) => (
                <tr key={e.endpoint} className="text-econet-ink dark:text-white">
                  <td className="px-4 py-3 font-mono text-xs">{e.endpoint}</td>
                  <td className="px-4 py-3">{e.count}</td>
                  <td className="px-4 py-3">{e.rate.toFixed(2)}%</td>
                  <td className="px-4 py-3 text-econet-grey dark:text-white/60">{e.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
