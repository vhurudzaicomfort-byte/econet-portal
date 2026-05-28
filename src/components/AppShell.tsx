import { useCallback, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import CommandPalette from "./CommandPalette";
import { useShellChrome } from "./ShellChromeContext";
import { useKeyboardShortcut } from "../hooks/useKeyboardShortcut";

export default function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const location = useLocation();
  const onDashboard = location.pathname === "/dashboard";
  const { chrome } = useShellChrome();

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useKeyboardShortcut({ key: "k", meta: true }, (e) => {
    e.preventDefault();
    setPaletteOpen((p) => !p);
  });
  useKeyboardShortcut({ key: "k", ctrl: true }, (e) => {
    e.preventDefault();
    setPaletteOpen((p) => !p);
  });
  useKeyboardShortcut({ key: "/" }, (e) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    ) {
      return;
    }
    e.preventDefault();
    setPaletteOpen(true);
  });

  return (
    <div className="min-h-screen flex bg-econet-surface dark:bg-econet-dark-bg">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-econet-navy/40 dark:bg-black/60 motion-safe:animate-fade-in"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="relative h-full w-72 max-w-[85%] bg-white dark:bg-econet-dark-bg motion-safe:animate-slide-in-right">
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onMenuClick={() => setDrawerOpen(true)}
          searchPlaceholder={chrome.searchPlaceholder}
          searchValue={chrome.searchValue}
          onSearchChange={chrome.onSearchChange}
          primaryAction={chrome.primaryAction}
          showDemoToggle={chrome.showDemoToggle ?? onDashboard}
          onOpenCommandPalette={openPalette}
        />
        <main
          className={clsx(
            "flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-screen-2xl w-full mx-auto"
          )}
        >
          <Outlet />
        </main>
        <footer className="border-t border-econet-border dark:border-econet-dark-border bg-white dark:bg-econet-dark-bg px-4 sm:px-6 lg:px-10 py-4 text-xs text-econet-grey dark:text-white/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p>
            Econet Developer Portal. Inspired to change your world.
          </p>
          <p>v1.0.0</p>
        </footer>
      </div>

      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </div>
  );
}
