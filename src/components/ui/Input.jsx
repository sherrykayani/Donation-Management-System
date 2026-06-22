import React from "react";

export function Input({ label, className = "", id, ...props }) {
  const inputId = id || props.name;
  return (
    <label className="block space-y-1.5 text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor={inputId}>
      {label && <span>{label}</span>}
      <input
        id={inputId}
        className={`w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 ${className}`}
        {...props}
      />
    </label>
  );
}

export function TextArea({ label, className = "", id, ...props }) {
  const inputId = id || props.name;
  return (
    <label className="block space-y-1.5 text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor={inputId}>
      {label && <span>{label}</span>}
      <textarea
        id={inputId}
        className={`min-h-[120px] w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 ${className}`}
        {...props}
      />
    </label>
  );
}

export function Select({ label, children, className = "", id, ...props }) {
  const inputId = id || props.name;
  return (
    <label className="block space-y-1.5 text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor={inputId}>
      {label && <span>{label}</span>}
      <select
        id={inputId}
        className={`w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
