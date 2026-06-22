import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "../../utils/api.js";
import { formatMoney } from "../../utils/format.js";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await api.get("/dashboard/stats");
        setStats(data);
      } catch (err) {
        console.error("Failed to load dashboard statistics", err);
      }
    }
    loadStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-slate-500">Loading dashboard statistics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Totals, active programs, and monthly trends.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total donations volume", value: formatMoney(stats.totalDonationsVolume) },
          { label: "Active campaigns", value: String(stats.activeCampaignsCount) },
          { label: "Total users", value: stats.totalUsersCount.toLocaleString() },
          { label: "Raised across live catalog", value: formatMoney(stats.totalRaisedCatalog) },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-medium text-slate-500">{c.label}</p>
            <p className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Monthly statistics</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.monthlyStats}>
              <defs>
                <linearGradient id="colorDon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip formatter={(v) => formatMoney(v)} />
              <Area type="monotone" dataKey="donations" stroke="#6366f1" fillOpacity={1} fill="url(#colorDon)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

