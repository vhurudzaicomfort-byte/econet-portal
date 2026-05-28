import { useState, type FormEvent } from "react";
import clsx from "clsx";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Breadcrumb from "../components/Breadcrumb";
import IconCheck from "../icons/IconCheck";
import IconClock from "../icons/IconClock";
import { incidents, scheduledMaintenance, serviceUptime } from "../data/incidents";
import { useToast } from "../context/ToastContext";

function UptimeBar({ days }: { days: number[] }) {
  return (
    <svg
      width="100%"
      height="32"
      viewBox={`0 0 ${days.length * 5} 32`}
      preserveAspectRatio="none"
      role="img"
      aria-label="90-day uptime"
    >
      {days.map((d, i) => {
        const color = d === 2 ? "#E2231A" : d === 1 ? "#F2682A" : "#4C8C40";
        return <rect key={i} x={i * 5} y={2} width={3} height={28} rx={1} fill={color} />;
      })}
    </svg>
  );
}

export default function Status() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast({ kind: "error", title: "Email required" });
      return;
    }
    showToast({
      kind: "success",
      title: "Subscribed",
      body: "You will receive status updates at " + email,
    });
    setEmail("");
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Status" }]} />
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60">
          Real-time platform health
        </p>
        <h1 className="text-econet-ink dark:text-white">Status</h1>
      </header>

      <Card className="bg-econet-success/10 border-econet-success/30">
        <div className="flex items-start gap-3">
          <span className="h-12 w-12 flex items-center justify-center rounded-full bg-econet-success text-white">
            <IconCheck size={26} />
          </span>
          <div>
            <h2 className="text-econet-ink dark:text-white">All systems operational</h2>
            <p className="text-sm text-econet-grey dark:text-white/70">
              No active incidents. Updated 30 seconds ago.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-econet-ink dark:text-white mb-3">Service uptime (last 90 days)</h3>
        <ul className="divide-y divide-econet-border dark:divide-econet-dark-border">
          {serviceUptime.map((s) => {
            const downDays = s.ninetyDay.filter((d) => d === 2).length;
            const uptimePct = ((90 - downDays) / 90) * 100;
            return (
              <li key={s.service} className="py-3 flex items-center gap-4">
                <div className="w-44">
                  <p className="text-sm font-semibold text-econet-ink dark:text-white">{s.service}</p>
                  <p className="text-xs text-econet-grey dark:text-white/60">
                    {uptimePct.toFixed(2)}% uptime
                  </p>
                </div>
                <div className="flex-1 max-w-xl">
                  <UptimeBar days={s.ninetyDay} />
                </div>
                <span
                  className={clsx(
                    "inline-flex items-center rounded-full text-xs font-semibold px-2.5 py-0.5",
                    s.status === "Operational"
                      ? "bg-econet-success/10 text-econet-success"
                      : "bg-econet-orange/10 text-econet-orange"
                  )}
                >
                  {s.status}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card>
        <h3 className="text-econet-ink dark:text-white mb-3">Incident history</h3>
        <ul className="space-y-4">
          {incidents.map((inc) => (
            <li
              key={inc.id}
              className="border-l-2 border-econet-success pl-4"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="text-sm font-semibold text-econet-ink dark:text-white">{inc.title}</p>
                <span className="text-xs text-econet-grey dark:text-white/60">
                  {new Date(inc.startedAt).toLocaleDateString("en-ZW", { day: "2-digit", month: "short", year: "numeric" })}
                </span>
              </div>
              <p className="text-xs text-econet-grey dark:text-white/60">{inc.service}</p>
              <p className="text-sm text-econet-ink dark:text-white/85 mt-1">
                {inc.updates[inc.updates.length - 1]?.body}
              </p>
              {inc.postMortemUrl ? (
                <button
                  type="button"
                  onClick={() =>
                    showToast({ kind: "info", title: "Post-mortem opens in a new tab" })
                  }
                  className="text-xs font-semibold text-econet-navy dark:text-white hover:underline mt-1"
                >
                  Read post-mortem
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h3 className="text-econet-ink dark:text-white mb-3">Scheduled maintenance</h3>
        {scheduledMaintenance.length === 0 ? (
          <p className="text-sm text-econet-grey dark:text-white/70">No scheduled maintenance.</p>
        ) : (
          <ul className="space-y-3">
            {scheduledMaintenance.map((m) => (
              <li key={m.id} className="flex items-start gap-3">
                <span className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-econet-info/10 text-econet-info">
                  <IconClock size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-econet-ink dark:text-white">{m.title}</p>
                  <p className="text-xs text-econet-grey dark:text-white/60">
                    {new Date(m.startsAt).toLocaleString("en-ZW")} – {new Date(m.endsAt).toLocaleString("en-ZW")}
                  </p>
                  <p className="text-sm text-econet-ink dark:text-white/85 mt-0.5">{m.scope}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <h3 className="text-econet-ink dark:text-white mb-3">Subscribe to updates</h3>
        <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row items-end gap-2 max-w-lg">
          <div className="flex-1 w-full">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <Button type="submit" variant="primary">
            Subscribe
          </Button>
        </form>
      </Card>
    </div>
  );
}
