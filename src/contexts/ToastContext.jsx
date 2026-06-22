import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

let id = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((toast) => {
    const tid = ++id;
    setToasts((t) => [...t, { id: tid, ...toast }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== tid));
    }, toast.duration ?? 4000);
  }, []);

  const value = useMemo(() => ({ toasts, push }), [toasts, push]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
