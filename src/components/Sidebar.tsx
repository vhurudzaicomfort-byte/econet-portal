import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import EconetLogo from "./EconetLogo";
import IconApps from "../icons/IconApps";
import IconUsers from "../icons/IconUsers";
import IconUser from "../icons/IconUser";
import IconProducts from "../icons/IconProducts";
import IconAnalytics from "../icons/IconAnalytics";
import IconBell from "../icons/IconBell";
import IconShield from "../icons/IconShield";
import IconKey from "../icons/IconKey";
import IconWebhook from "../icons/IconWebhook";
import IconBilling from "../icons/IconBilling";
import IconBook from "../icons/IconBook";
import IconActivity from "../icons/IconActivity";
import IconCloud from "../icons/IconCloud";
import IconHelp from "../icons/IconHelp";
import IconChat from "../icons/IconChat";
import IconDocument from "../icons/IconDocument";
import IconChevronRight from "../icons/IconChevronRight";
import IconResource from "../icons/IconResource";
import IconSettings from "../icons/IconSettings";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

type NavItem = {
  to: string;
  label: string;
  icon: ReactNode;
};

type NavGroup = {
  id: string;
  heading: string;
  items: NavItem[];
  adminOnly?: boolean;
};

const groups: NavGroup[] = [
  {
    id: "overview",
    heading: "Overview",
    items: [
      { to: "/onboarding", label: "Onboarding", icon: <IconActivity size={20} /> },
      { to: "/dashboard", label: "Dashboard", icon: <IconApps size={20} /> },
    ],
  },
  {
    id: "build",
    heading: "Build",
    items: [
      { to: "/apis", label: "APIs", icon: <IconProducts size={20} /> },
      { to: "/products", label: "Products", icon: <IconResource size={20} /> },
      { to: "/docs", label: "Documentation", icon: <IconBook size={20} /> },
      { to: "/sdks", label: "SDK Downloads", icon: <IconResource size={20} /> },
      { to: "/sandbox", label: "Sandbox", icon: <IconCloud size={20} /> },
      { to: "/api-explorer", label: "API Explorer", icon: <IconDocument size={20} /> },
    ],
  },
  {
    id: "manage",
    heading: "Manage",
    items: [
      { to: "/apps", label: "My Apps", icon: <IconApps size={20} /> },
      { to: "/teams", label: "Teams", icon: <IconUsers size={20} /> },
      { to: "/webhooks", label: "Webhooks", icon: <IconWebhook size={20} /> },
      { to: "/tokens", label: "Access Tokens", icon: <IconKey size={20} /> },
      { to: "/environments", label: "Environments", icon: <IconSettings size={20} /> },
    ],
  },
  {
    id: "operate",
    heading: "Operate",
    items: [
      { to: "/analytics", label: "Analytics", icon: <IconAnalytics size={20} /> },
      { to: "/billing", label: "Billing", icon: <IconBilling size={20} /> },
      { to: "/audit", label: "Audit Logs", icon: <IconDocument size={20} /> },
      { to: "/status", label: "Status", icon: <IconActivity size={20} /> },
    ],
  },
  {
    id: "support",
    heading: "Support",
    items: [
      { to: "/notifications", label: "Notifications", icon: <IconBell size={20} /> },
      { to: "/support", label: "Support", icon: <IconHelp size={20} /> },
      { to: "/faqs", label: "FAQs", icon: <IconChat size={20} /> },
      { to: "/changelog", label: "Changelog", icon: <IconActivity size={20} /> },
      { to: "/community", label: "Community", icon: <IconUsers size={20} /> },
    ],
  },
  {
    id: "trust",
    heading: "Trust",
    items: [
      { to: "/security", label: "Security Center", icon: <IconShield size={20} /> },
      { to: "/compliance", label: "Compliance", icon: <IconDocument size={20} /> },
    ],
  },
  {
    id: "admin",
    heading: "Admin",
    adminOnly: true,
    items: [
      { to: "/admin", label: "Submissions", icon: <IconShield size={20} /> },
      { to: "/admin/org", label: "Org Management", icon: <IconSettings size={20} /> },
    ],
  },
];

type SidebarProps = {
  onNavigate?: () => void;
  className?: string;
};

const COLLAPSE_KEY = "econet.sidebar.collapsed";

export default function Sidebar({ onNavigate, className }: SidebarProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const stored = window.localStorage.getItem(COLLAPSE_KEY);
      return stored ? (JSON.parse(stored) as Record<string, boolean>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(COLLAPSE_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  const toggleGroup = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside
      className={clsx(
        "flex h-full lg:h-screen lg:sticky lg:top-0 w-72 flex-none flex-col bg-white dark:bg-econet-dark-bg border-r border-econet-border dark:border-econet-dark-border",
        className
      )}
      aria-label="Primary"
    >
      <div className="flex items-start gap-2 px-5 pt-4 pb-3 border-b border-econet-border dark:border-econet-dark-border">
        <EconetLogo size={130} />
      </div>
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        {groups
          .filter((g) => !g.adminOnly || isAdmin)
          .map((group) => {
            const isCollapsed = collapsed[group.id] === true;
            return (
              <div key={group.id} className="px-3 mb-3">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={!isCollapsed}
                  className="w-full flex items-center justify-between px-3 mb-1.5 text-xs font-bold uppercase tracking-wider text-econet-grey dark:text-white/60 hover:text-econet-navy dark:hover:text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-econet-navy/30"
                >
                  <span>{group.heading}</span>
                  <IconChevronRight
                    size={14}
                    className={clsx(
                      "transition-transform duration-200",
                      !isCollapsed && "rotate-90"
                    )}
                    aria-hidden="true"
                  />
                </button>
                {!isCollapsed ? (
                  <ul className="flex flex-col gap-0.5">
                    {group.items.map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          onClick={onNavigate}
                          end={item.to === "/dashboard"}
                          className={({ isActive }) =>
                            clsx(
                              "flex items-center gap-3 rounded-md pl-3 pr-3 h-9 text-sm font-semibold transition-colors duration-150 border-l-[3px]",
                              isActive
                                ? "bg-econet-navy/5 dark:bg-white/10 text-econet-navy dark:text-white border-econet-navy dark:border-white"
                                : "text-econet-ink dark:text-white/85 border-transparent hover:bg-econet-surface dark:hover:bg-econet-dark-surface"
                            )
                          }
                        >
                          <span aria-hidden="true">{item.icon}</span>
                          <span>{item.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
      </nav>
      <div className="border-t border-econet-border dark:border-econet-dark-border p-4">
        <p className="text-xs text-econet-grey dark:text-white/60 leading-5">
          Developer support
          <br />
          <span className="text-econet-ink dark:text-white font-semibold">developers@econet.co.zw</span>
        </p>
      </div>
    </aside>
  );
}
