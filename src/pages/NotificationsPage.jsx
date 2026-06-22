import React, { useEffect, useState } from "react";
import { api } from "../utils/api.js";
import { Badge } from "../components/ui/Badge.jsx";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.get("/notifications");
        setNotifications(data);
      } catch (err) {
        console.error("Failed to load notifications", err);
      }
    }
    load();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Notifications</h1>
      <p className="text-slate-600 dark:text-slate-400">Donation confirmations, campaign updates, and reminders.</p>
      <div className="mt-8 space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="glass-card flex gap-4">
            <div className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-slate-900 dark:text-white">{n.title}</h2>
                {n.type === "success" && <Badge tone="success">Donation</Badge>}
                {n.type === "update" && <Badge tone="info">Update</Badge>}
                {n.type === "reminder" && <Badge tone="warning">Reminder</Badge>}
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{n.body}</p>
              <p className="mt-2 text-xs text-slate-400">{n.time}</p>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="text-sm text-slate-600 dark:text-slate-400">No notifications at this time.</p>
        )}
      </div>
    </div>
  );
}

