import React, { useState } from "react";
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Button } from "../ui/Button.jsx";

const nav = [
  { to: "/", label: "Home" },
  { to: "/campaigns", label: "Campaigns" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/contact", label: "Contact" },
];

export function PublicLayout() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/80 via-white to-cyan-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Hope<span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">Fund</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-600/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200"
                      : "text-slate-600 hover:bg-white/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
            >
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="secondary" className="!py-2">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/notifications">
                  <Button variant="ghost" className="!py-2">
                    Alerts
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  className="!py-2"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="!py-2">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="!py-2">Sign up</Button>
                </Link>
              </>
            )}
            <Link to="/admin">
              <span className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400">
                Admin
              </span>
            </Link>
          </div>
          <button
            type="button"
            className="inline-flex rounded-lg border border-slate-200 bg-white/80 p-2 md:hidden dark:border-slate-700 dark:bg-slate-900/60"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
        {open && (
          <div className="border-t border-white/40 bg-white/95 p-4 dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
            <div className="flex flex-col gap-2">
              {nav.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium">
                  {item.label}
                </Link>
              ))}
              <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm">
                Dashboard
              </Link>
              <Link to="/notifications" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm">
                Notifications
              </Link>
              <Link to="/admin" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm">
                Admin
              </Link>
              <button type="button" onClick={toggleTheme} className="rounded-lg px-3 py-2 text-left text-sm">
                Toggle theme
              </button>
            </div>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mt-16 border-t border-slate-200/80 bg-white/50 py-10 dark:border-slate-800 dark:bg-slate-950/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:justify-between">
          <div>
            <p className="font-display text-lg font-bold text-slate-900 dark:text-white">HopeFund</p>
            <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
              A demonstration donation management experience built with React and modern UI patterns.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-400">
            <Link to="/campaigns" className="hover:text-indigo-600">
              Campaigns
            </Link>
            <Link to="/contact" className="hover:text-indigo-600">
              Support
            </Link>
            <Link to="/volunteer" className="hover:text-indigo-600">
              Volunteer
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
