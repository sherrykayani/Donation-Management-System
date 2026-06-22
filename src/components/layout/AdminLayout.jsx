import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const links = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/campaigns", label: "Campaigns" },
  { to: "/admin/donations", label: "Donations" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/volunteers", label: "Volunteers" },
  { to: "/admin/reports", label: "Reports" },
  { to: "/admin/settings", label: "Settings" },
];

export function AdminLayout() {
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="flex">
        <aside
          className={`sticky top-0 hidden h-screen shrink-0 border-r border-slate-200/80 bg-white/90 backdrop-blur-xl transition-[width] dark:border-slate-800 dark:bg-slate-900/90 md:flex md:flex-col ${
            collapsed ? "w-20" : "w-64"
          }`}
        >
          <div className="flex h-14 items-center justify-between border-b border-slate-200/80 px-4 dark:border-slate-800">
            {!collapsed && (
              <Link to="/" className="font-display text-lg font-bold text-slate-900 dark:text-white">
                HF Admin
              </Link>
            )}
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {collapsed ? "»" : "«"}
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                {!collapsed ? l.label : l.label[0]}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-slate-200/80 p-3 dark:border-slate-800">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            >
              {!collapsed ? (theme === "dark" ? "Light mode" : "Dark mode") : "◐"}
            </button>
            <Link
              to="/"
              className="mt-2 block rounded-xl px-3 py-2 text-center text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-950/40"
            >
              {!collapsed ? "View site" : "↗"}
            </Link>
          </div>
        </aside>
        <div className="min-h-screen flex-1">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 md:hidden">
            <span className="font-display font-bold text-slate-900 dark:text-white">Admin</span>
            <Link to="/" className="text-sm font-semibold text-indigo-600">
              Site
            </Link>
          </header>
          <div className="p-4 md:p-8">
            <div className="mx-auto max-w-6xl">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-slate-200 bg-white/95 p-2 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 md:hidden">
        {links.slice(0, 4).map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `flex-1 rounded-lg py-2 text-center text-[11px] font-semibold ${
                isActive ? "bg-indigo-600 text-white" : "text-slate-600 dark:text-slate-300"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>
      <div className="h-14 md:hidden" />
    </div>
  );
}
