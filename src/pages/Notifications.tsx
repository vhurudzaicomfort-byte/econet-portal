import { useMemo, useState } from "react";
import AppShellSearchBridge from "../components/AppShellSearchBridge";
import Card from "../components/Card";
import Button from "../components/Button";
import IconBell from "../icons/IconBell";
import IconShield from "../icons/IconShield";
import IconInfo from "../icons/IconInfo";
import IconCheck from "../icons/IconCheck";
import clsx from "clsx";
import { useApps } from "../context/AppsContext";
import { useToast } from "../context/ToastContext";
import type { NotificationCategory } from "../data/notifications";

const FILTERS: ("All" | NotificationCategory)[] = [
  "All",
  "Approvals",
  "System",
  "Security",
];

function timeAgo(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function iconFor(cat: NotificationCategory) {
  if (cat === "Approvals") return <IconCheck size={20} />;
  if (cat === "Security") return <IconShield size={20} />;
  return <IconInfo size={20} />;
}

export default function Notifications() {
  const { notifications, markAllNotificationsRead, markNotificationRead } =
    useApps();
  const { showToast } = useToast();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return notifications;
    return notifications.filter((n) => n.category === filter);
  }, [notifications, filter]);

  return (
    <AppShellSearchBridge>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-econet-grey">
              Manage
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-econet-ink">
              Notifications
            </h1>
            <p className="text-sm text-econet-grey mt-1">
              Approvals, system alerts and security notices in one feed.
            </p>
          </div>
          <Button
            variant="secondary"
            iconLeft={<IconCheck size={16} />}
            onClick={() => {
              markAllNotificationsRead();
              showToast({
                kind: "success",
                title: "All caught up",
                body: "Every notification has been marked as read.",
              });
            }}
          >
            Mark all read
          </Button>
        </header>

        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={clsx(
                "h-8 px-3 rounded-full text-xs font-semibold border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30",
                filter === f
                  ? "bg-econet-navy text-white border-econet-navy"
                  : "bg-white text-econet-ink border-econet-border hover:border-econet-grey"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <Card padded={false}>
          <ul className="divide-y divide-econet-border">
            {filtered.length === 0 ? (
              <li className="p-8 text-center text-sm text-econet-grey">
                <IconBell size={28} className="mx-auto text-econet-grey/60 mb-2" />
                No notifications match this filter.
              </li>
            ) : (
              filtered.map((n) => (
                <li
                  key={n.id}
                  className={clsx(
                    "flex items-start gap-3 p-4 sm:p-5",
                    !n.read && "bg-econet-navy/5"
                  )}
                >
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-econet-navy/10 text-econet-navy mt-0.5">
                    {iconFor(n.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-econet-ink">
                        {n.title}
                      </p>
                      <p className="text-xs text-econet-grey flex-none">
                        {timeAgo(n.timestamp)}
                      </p>
                    </div>
                    <p className="text-sm text-econet-grey mt-1 leading-6">
                      {n.body}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-xs font-semibold text-econet-grey uppercase tracking-wider">
                        {n.category}
                      </span>
                      {!n.read ? (
                        <button
                          type="button"
                          onClick={() => markNotificationRead(n.id)}
                          className="text-xs font-semibold text-econet-navy hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 rounded"
                        >
                          Mark read
                        </button>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </Card>
      </div>
    </AppShellSearchBridge>
  );
}
