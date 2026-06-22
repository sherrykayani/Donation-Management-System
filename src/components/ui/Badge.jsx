import React from "react";

export function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
    warning: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100",
    danger: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-100",
    info: "bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-100",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
