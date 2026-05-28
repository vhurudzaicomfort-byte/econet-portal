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
import IconCommand from "../icons/IconCommand";
import IconHelp from "../icons/IconHelp";
import IconSun from "../icons/IconSun";
import IconMoon from "../icons/IconMoon";
import IconUsers from "../icons/IconUsers";
import IconKey from "../icons/IconKey";
import IconDocument from "../icons/IconDocument";
import { useApps } from "../context/AppsContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useEnv } from "../context/EnvContext";
import { useTheme } from "../context/ThemeContext";

type TopbarProps = {
  onMenuClick: () => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  primaryAction?: ReactNode;
  showDemoToggle?: boolean;
  onOpenCommandPalette: () => void;
};

export default function Topbar({
  onMenuClick,
  searchPlaceholder = "Search",
  searchValue,
  onSearchChange,
  primaryAction,
  showDemoToggle = false,
  onOpenCommandPalette,
}: TopbarProps) {
  const navigate = useNavigate();
  const { user, signOut, setRole } = useAuth();
  const { notifications, markAllNotificationsRead, demoState, setDemoState } = useApps();
  const { showToast } = useToast();
  const { env, setEnv } = useEnv();
  const { theme, toggle: toggleTheme } = useTheme();
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
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setBellOpen(false);
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
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
    <header className="sticky top-0 z-30 bg-white dark:bg-econet-dark-bg border-b border-econet-border dark:border-econet-dark-border">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-md text-econet-ink dark:text-white hover:bg-econet-surface dark:hover:bg-econet-dark-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
        >
          <IconMenu size={22} />
        </button>

        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="flex-1 max-w-md hidden md:flex items-center gap-2 rounded-md border border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-surface px-3 h-10 hover:border-econet-grey dark:hover:border-white/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
          aria-label="Open command palette"
        >
          <IconCommand size={16} className="text-econet-grey dark:text-white/60" aria-hidden="true" />
          <span className="flex-1 text-left text-sm text-econet-grey dark:text-white/60">
            Search the portal
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-econet-grey dark:text-white/60">
            <kbd className="rounded border border-econet-border dark:border-econet-dark-border px-1.5 py-0.5 font-mono">
              Ctrl
            </kbd>
            <kbd className="rounded border border-econet-border dark:border-econet-dark-border px-1.5 py-0.5 font-mono">
              K
            </kbd>
          </span>
        </button>

        <div className="md:hidden flex-1">
          {onSearchChange ? (
            <SearchField
              placeholder={searchPlaceholder}
              value={searchValue || ""}
              onChange={(e) => onSearchChange(e.target.value)}
              onClear={() => onSearchChange("")}
            />
          ) : (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="w-full inline-flex items-center gap-2 rounded-md border border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-surface px-3 h-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
              aria-label="Open command palette"
            >
              <IconCommand size={16} className="text-econet-grey dark:text-white/60" aria-hidden="true" />
              <span className="text-sm text-econet-grey dark:text-white/60">Search</span>
            </button>
          )}
        </div>

        <div className="hidden lg:inline-flex items-center rounded-md border border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-surface p-0.5">
          {(["Sandbox", "Production"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setEnv(mode)}
              className={clsx(
                "px-3 h-8 text-xs font-bold rounded-[5px] transition-colors duration-150",
                env === mode
                  ? mode === "Production"
                    ? "bg-econet-red text-white"
                    : "bg-econet-navy text-white"
                  : "text-econet-grey dark:text-white/60 hover:text-econet-ink dark:hover:text-white"
              )}
              aria-pressed={env === mode}
            >
              {mode}
            </button>
          ))}
        </div>

        {showDemoToggle ? (
          <div className="hidden xl:flex items-center gap-2 rounded-md border border-econet-border dark:border-econet-dark-border px-3 py-1.5">
            <span className="text-xs font-semibold text-econet-grey dark:text-white/60 uppercase tracking-wider">
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

        <div className="hidden xl:flex flex-col leading-tight text-right min-w-0 max-w-[260px] ml-auto pr-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-econet-grey dark:text-white/60">
            Econet Developer Platform
          </span>
          <span className="text-base font-extrabold text-econet-navy dark:text-white truncate">
            Onboarding Automation Portal
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate("/support")}
          aria-label="Help"
          className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-md text-econet-ink dark:text-white hover:bg-econet-surface dark:hover:bg-econet-dark-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
        >
          <IconHelp size={20} />
        </button>

        <div className="relative" ref={bellRef}>
          <button
            type="button"
            onClick={() => setBellOpen((s) => !s)}
            aria-haspopup="menu"
            aria-expanded={bellOpen}
            aria-label={
              unreadCount > 0 ? `${unreadCount} unread notifications` : "Notifications"
            }
            className="relative h-10 w-10 inline-flex items-center justify-center rounded-md text-econet-ink dark:text-white hover:bg-econet-surface dark:hover:bg-econet-dark-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
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
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-econet-dark-surface border border-econet-border dark:border-econet-dark-border rounded-lg shadow-lift motion-safe:animate-slide-up overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-econet-border dark:border-econet-dark-border">
                <p className="text-sm font-bold text-econet-ink dark:text-white">Notifications</p>
                <button
                  type="button"
                  onClick={() => {
                    markAllNotificationsRead();
                    showToast({
                      kind: "success",
                      title: "All notifications marked as read",
                    });
                  }}
                  className="text-xs font-semibold text-econet-navy dark:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 rounded"
                >
                  Mark all read
                </button>
              </div>
              <ul className="max-h-80 overflow-y-auto divide-y divide-econet-border dark:divide-econet-dark-border scrollbar-thin">
                {notifications.slice(0, 5).map((n) => (
                  <li
                    key={n.id}
                    className={clsx(
                      "p-3",
                      !n.read && "bg-econet-navy/5 dark:bg-white/5"
                    )}
                  >
                    <p className="text-sm font-semibold text-econet-ink dark:text-white">{n.title}</p>
                    <p className="text-xs text-econet-grey dark:text-white/70 mt-0.5">{n.body}</p>
                  </li>
                ))}
              </ul>
              <div className="p-3 border-t border-econet-border dark:border-econet-dark-border">
                <button
                  type="button"
                  onClick={() => {
                    setBellOpen(false);
                    navigate("/notifications");
                  }}
                  className="w-full text-sm font-semibold text-econet-navy dark:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 rounded"
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
            className="inline-flex items-center gap-2 rounded-md px-1.5 h-10 hover:bg-econet-surface dark:hover:bg-econet-dark-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30 transition-colors"
          >
            <Avatar name={user?.name || "Developer"} size="sm" />
            <span className="hidden lg:block text-sm font-semibold text-econet-ink dark:text-white">
              {user?.name?.split(" ")[0] || "Developer"}
            </span>
            <IconChevronDown
              size={16}
              className={clsx(
                "text-econet-grey dark:text-white/60 transition-transform",
                menuOpen && "rotate-180"
              )}
              aria-hidden="true"
            />
          </button>
          {menuOpen ? (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-72 bg-white dark:bg-econet-dark-surface border border-econet-border dark:border-econet-dark-border rounded-lg shadow-lift motion-safe:animate-slide-up overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-econet-border dark:border-econet-dark-border">
                <p className="text-sm font-bold text-econet-ink dark:text-white">{user?.name}</p>
                <p className="text-xs text-econet-grey dark:text-white/70">{user?.email}</p>
              </div>
              <ul className="py-1">
                <MenuItem
                  icon={<IconUser size={18} />}
                  label="Profile"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                />
                <MenuItem
                  icon={<IconShield size={18} />}
                  label="Organization"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                />
                <MenuItem
                  icon={<IconUsers size={18} />}
                  label="Teams"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/teams");
                  }}
                />
                <MenuItem
                  icon={<IconKey size={18} />}
                  label="Access Tokens"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/tokens");
                  }}
                />
                <MenuItem
                  icon={theme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
                  label={theme === "dark" ? "Light mode" : "Dark mode"}
                  onClick={() => {
                    toggleTheme();
                  }}
                />
                <MenuItem
                  icon={<IconShield size={18} />}
                  label={`Switch to ${user?.role === "admin" ? "Developer" : "Admin"}`}
                  onClick={onSwitchRole}
                />
              </ul>
              <ul className="border-t border-econet-border dark:border-econet-dark-border py-1">
                <MenuItem
                  icon={<IconHelp size={18} />}
                  label="Help & Support"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/support");
                  }}
                />
                <MenuItem
                  icon={<IconDocument size={18} />}
                  label="FAQs"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/faqs");
                  }}
                />
                <MenuItem
                  icon={<IconDocument size={18} />}
                  label="Terms"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/terms");
                  }}
                />
                <MenuItem
                  icon={<IconDocument size={18} />}
                  label="Privacy"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/privacy");
                  }}
                />
              </ul>
              <div className="border-t border-econet-border dark:border-econet-dark-border py-1">
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
      </div>

      {env === "Production" ? (
        <div className="bg-econet-red text-white text-xs font-semibold px-4 sm:px-6 py-1.5 text-center">
          You are operating in Production. Live wallets, real money, real subscribers.
        </div>
      ) : null}
    </header>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-econet-ink dark:text-white hover:bg-econet-surface dark:hover:bg-econet-dark-border focus:outline-none focus-visible:bg-econet-surface dark:focus-visible:bg-econet-dark-border"
      >
        <span className="text-econet-grey dark:text-white/70">{icon}</span>
        <span>{label}</span>
      </button>
    </li>
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
