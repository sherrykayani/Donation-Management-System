import React from "react";
import { useToast } from "../contexts/ToastContext.jsx";

export function ToastStack() {
  const { toasts } = useToast();
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2 p-2 sm:bottom-6 sm:right-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto glass rounded-xl border p-4 shadow-xl"
        >
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.title}</p>
          {t.message && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t.message}</p>}
        </div>
      ))}
    </div>
  );
}
