import React from "react";

export function ProgressBar({ value }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 transition-all duration-700"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
