import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { monthlyStats, adminDonations } from "../../data/mockData.js";
import { Button } from "../../components/ui/Button.jsx";
import { formatMoney } from "../../utils/format.js";

export default function AdminReportsPage() {
  const byCampaign = adminDonations.reduce((acc, d) => {
    acc[d.campaign] = (acc[d.campaign] || 0) + d.amount;
    return acc;
  }, {});
  const chartData = Object.entries(byCampaign).map(([name, total]) => ({ name: name.slice(0, 18), total }));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Reports & analytics</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Charts and export-ready summaries.</p>
        </div>
        <div className="flex gap-2">
          <Button type="button" onClick={() => alert("Connect to PDF service.")}>
            Export PDF
          </Button>
          <Button variant="secondary" type="button" onClick={() => alert("Connect to spreadsheet export.")}>
            Export Excel
          </Button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Donations by campaign</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" />
                <Tooltip formatter={(v) => formatMoney(v)} />
                <Bar dataKey="total" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Campaigns vs donations</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="donations" stroke="#6366f1" strokeWidth={2} dot />
                <Line type="monotone" dataKey="campaigns" stroke="#22d3ee" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
