import React from "react";

export function Button({ children, className = "", variant = "primary", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-slate-900";
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow-lg shadow-indigo-500/25 hover:brightness-110",
    secondary:
      "glass text-slate-800 hover:bg-white/80 dark:text-slate-100 dark:hover:bg-slate-800/80",
    ghost: "text-indigo-600 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-950/50",
    danger: "bg-rose-600 text-white hover:bg-rose-500",
  };
  return (
    <button type="button" className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
