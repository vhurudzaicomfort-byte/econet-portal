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
};

const baseGroups: NavGroup[] = [
  {
    id: "manage",
    heading: "Manage",
    items: [
      { to: "/profile", label: "My profile", icon: <IconUser size={20} /> },
      { to: "/dashboard", label: "My apps", icon: <IconApps size={20} /> },
      { to: "/teams", label: "My teams", icon: <IconUsers size={20} /> },
      { to: "/notifications", label: "Notifications", icon: <IconBell size={20} /> },
    ],
  },
  {
    id: "discover",
    heading: "Discover",
    items: [
      { to: "/products", label: "Products", icon: <IconProducts size={20} /> },
      { to: "/sandbox", label: "Sandbox tester", icon: <IconAnalytics size={20} /> },
    ],
  },
];

type SidebarProps = {
  onNavigate?: () => void;
  className?: string;
};

export default function Sidebar({ onNavigate, className }: SidebarProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <aside
      className={clsx(
        "flex h-full w-72 flex-none flex-col bg-white border-r border-econet-border",
        className
      )}
      aria-label="Primary"
    >
      <div className="flex items-center gap-2 px-5 h-16 border-b border-econet-border">
        <EconetLogo size={120} />
      </div>
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        {baseGroups.map((group) => (
          <div key={group.id} className="px-3 mb-6">
            <p className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-econet-grey">
              {group.heading}
            </p>
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      clsx(
                        "flex items-center gap-3 rounded-md px-3 h-10 text-sm font-semibold transition-colors duration-150",
                        isActive
                          ? "bg-econet-navy text-white"
                          : "text-econet-ink hover:bg-econet-surface"
                      )
                    }
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {isAdmin ? (
          <div className="px-3 mb-6">
            <p className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-econet-grey">
              Admin
            </p>
            <ul className="flex flex-col gap-1">
              <li>
                <NavLink
                  to="/admin"
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 rounded-md px-3 h-10 text-sm font-semibold transition-colors duration-150",
                      isActive
                        ? "bg-econet-navy text-white"
                        : "text-econet-ink hover:bg-econet-surface"
                    )
                  }
                >
                  <span aria-hidden="true">
                    <IconShield size={20} />
                  </span>
                  <span>Submissions queue</span>
                </NavLink>
              </li>
            </ul>
          </div>
        ) : null}
      </nav>
      <div className="border-t border-econet-border p-4">
        <p className="text-xs text-econet-grey leading-5">
          Developer support
          <br />
          <span className="text-econet-ink font-semibold">developers@econet.co.zw</span>
        </p>
      </div>
    </aside>
  );
}
