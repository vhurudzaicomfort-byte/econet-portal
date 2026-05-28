import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Avatar from "./Avatar";
import Button from "./Button";
import SearchField from "./SearchField";
import Switch from "./Switch";
import IconBell from "../icons/IconBell";
import IconChevronDown from "../icons/IconChevronDown";
import IconMenu from "../icons/IconMenu";
import IconPlus from "../icons/IconPlus";
import IconUser from "../icons/IconUser";
import IconLogout from "../icons/IconLogout";
import IconShield from "../icons/IconShield";
import { useApps } from "../context/AppsContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

type TopbarProps = {
  onMenuClick: () => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  primaryAction?: ReactNode;
  showDemoToggle?: boolean;
};

export default function Topbar({
  onMenuClick,
  searchPlaceholder = "Search",
  searchValue,
  onSearchChange,
  primaryAction,
  showDemoToggle = false,
}: TopbarProps) {
  const navigate = useNavigate();
  const { user, signOut, setRole } = useAuth();
  const { notifications, markAllNotificationsRead, demoState, setDemoState } = useApps();
  const { showToast } = useToast();
  const [bellOpen, setBellOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const onSignOut = () => {
    signOut();
    showToast({ kind: "info", title: "Signed out", body: "See you again soon." });
    navigate("/");
  };

  const onSwitchRole = () => {
    const next = user?.role === "admin" ? "developer" : "admin";
    setRole(next);
    setMenuOpen(false);
    showToast({
      kind: "info",
      title: `Switched to ${next === "admin" ? "Admin" : "Developer"} role`,
      body:
        next === "admin"
          ? "You can now review and approve submitted apps."
          : "Admin tools have been hidden.",
    });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 bg-white border-b border-econet-border px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-md text-econet-ink hover:bg-econet-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
      >
        <IconMenu size={22} />
      </button>

      <div className="flex-1 max-w-md hidden md:block">
        {onSearchChange ? (
          <SearchField
            placeholder={searchPlaceholder}
            value={searchValue || ""}
            onChange={(e) => onSearchChange(e.target.value)}
            onClear={() => onSearchChange("")}
          />
        ) : null}
      </div>

      <div className="flex-1 md:hidden">
        {onSearchChange ? (
          <SearchField
            placeholder={searchPlaceholder}
            value={searchValue || ""}
            onChange={(e) => onSearchChange(e.target.value)}
            onClear={() => onSearchChange("")}
          />
        ) : null}
      </div>

      {showDemoToggle ? (
        <div className="hidden xl:flex items-center gap-2 rounded-md border border-econet-border px-3 py-1.5">
          <span className="text-xs font-semibold text-econet-grey uppercase tracking-wider">
            Demo
          </span>
          <Switch
            label={demoState === "Empty" ? "Empty" : "Populated"}
            checked={demoState === "Populated"}
            onChange={(on) => setDemoState(on ? "Populated" : "Empty")}
          />
        </div>
      ) : null}

      {primaryAction ? (
        <div className="hidden sm:block">{primaryAction}</div>
      ) : null}

      <div className="relative" ref={bellRef}>
        <button
          type="button"
          onClick={() => setBellOpen((s) => !s)}
          aria-haspopup="menu"
          aria-expanded={bellOpen}
          aria-label={
            unreadCount > 0 ? `${unreadCount} unread notifications` : "Notifications"
          }
          className="relative h-10 w-10 inline-flex items-center justify-center rounded-md text-econet-ink hover:bg-econet-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
        >
          <IconBell size={20} />
          {unreadCount > 0 ? (
            <span className="absolute top-1 right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-econet-red text-[10px] font-bold text-white px-1">
              {unreadCount}
            </span>
          ) : null}
        </button>
        {bellOpen ? (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-econet-border rounded-lg shadow-lift motion-safe:animate-slide-up overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-econet-border">
              <p className="text-sm font-bold text-econet-ink">Notifications</p>
              <button
                type="button"
                onClick={() => {
                  markAllNotificationsRead();
                  showToast({
                    kind: "success",
                    title: "All notifications marked as read",
                  });
                }}
                className="text-xs font-semibold text-econet-navy hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 rounded"
              >
                Mark all read
              </button>
            </div>
            <ul className="max-h-80 overflow-y-auto divide-y divide-econet-border scrollbar-thin">
              {notifications.slice(0, 5).map((n) => (
                <li key={n.id} className={clsx("p-3", !n.read && "bg-econet-navy/5")}>
                  <p className="text-sm font-semibold text-econet-ink">{n.title}</p>
                  <p className="text-xs text-econet-grey mt-0.5">{n.body}</p>
                </li>
              ))}
            </ul>
            <div className="p-3 border-t border-econet-border">
              <button
                type="button"
                onClick={() => {
                  setBellOpen(false);
                  navigate("/notifications");
                }}
                className="w-full text-sm font-semibold text-econet-navy hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 rounded"
              >
                View all
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((s) => !s)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="inline-flex items-center gap-2 rounded-md px-1.5 h-10 hover:bg-econet-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 transition-colors"
        >
          <Avatar name={user?.name || "Developer"} size="sm" />
          <span className="hidden lg:block text-sm font-semibold text-econet-ink">
            {user?.name?.split(" ")[0] || "Developer"}
          </span>
          <IconChevronDown
            size={16}
            className={clsx("text-econet-grey transition-transform", menuOpen && "rotate-180")}
            aria-hidden="true"
          />
        </button>
        {menuOpen ? (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-64 bg-white border border-econet-border rounded-lg shadow-lift motion-safe:animate-slide-up overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-econet-border">
              <p className="text-sm font-bold text-econet-ink">{user?.name}</p>
              <p className="text-xs text-econet-grey">{user?.email}</p>
            </div>
            <ul className="py-1">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-econet-ink hover:bg-econet-surface focus:outline-none focus-visible:bg-econet-surface"
                >
                  <IconUser size={18} className="text-econet-grey" />
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onSwitchRole}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-econet-ink hover:bg-econet-surface focus:outline-none focus-visible:bg-econet-surface"
                >
                  <IconShield size={18} className="text-econet-grey" />
                  <span>
                    Switch to {user?.role === "admin" ? "Developer" : "Admin"}
                  </span>
                </button>
              </li>
            </ul>
            <div className="border-t border-econet-border py-1">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onSignOut();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-econet-red hover:bg-econet-red/5 focus:outline-none focus-visible:bg-econet-red/5"
              >
                <IconLogout size={18} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export function TopbarBuildAppAction() {
  const navigate = useNavigate();
  return (
    <Button
      variant="primary"
      size="md"
      iconLeft={<IconPlus size={18} />}
      onClick={() => navigate("/apps/new")}
    >
      Build app
    </Button>
  );
}
