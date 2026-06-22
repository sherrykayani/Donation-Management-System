import React, { useEffect, useState } from "react";
import { Badge } from "../../components/ui/Badge.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { formatMoney } from "../../utils/format.js";
import { Modal } from "../../components/ui/Modal.jsx";
import { api } from "../../utils/api.js";

export default function AdminDonationsPage() {
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("all");
  const [reportOpen, setReportOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDonations() {
      try {
        const data = await api.get("/donations/all");
        // Map backend DTO names to match existing table fields
        const mapped = data.map((x) => ({
          ...x,
          campaign: x.campaignTitle,
          date: new Date(x.at).toLocaleDateString(),
        }));
        setRows(mapped);
      } catch (err) {
        console.error("Failed to load admin donations", err);
      } finally {
        setLoading(false);
      }
    }
    loadDonations();
  }, []);


  const filtered = rows.filter((r) => filter === "all" || r.status === filter);

  const tone = (s) => {
    if (s === "completed") return "success";
    if (s === "pending") return "warning";
    return "danger";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Donation management</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Transactions, payment status, reporting tools.</p>
        </div>
        <Button onClick={() => setReportOpen(true)}>Generate report</Button>
      </div>
      <div className="flex gap-2">
        {["all", "completed", "pending", "failed"].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              filter === f ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Donor</th>
              <th className="px-4 py-3">Campaign</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{r.donor}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{r.campaign}</td>
                <td className="px-4 py-3">{formatMoney(r.amount)}</td>
                <td className="px-4 py-3">{r.method}</td>
                <td className="px-4 py-3">
                  <Badge tone={tone(r.status)}>{r.status}</Badge>
                </td>
                <td className="px-4 py-3 text-slate-500">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={reportOpen} onClose={() => setReportOpen(false)} title="Report preview">
        <p className="text-sm text-slate-600 dark:text-slate-300">Summary for {filtered.length} records (demo).</p>
        <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 dark:text-slate-200">
          <li>Total volume: {formatMoney(filtered.reduce((s, r) => s + r.amount, 0))}</li>
          <li>Completed count: {filtered.filter((r) => r.status === "completed").length}</li>
        </ul>
        <div className="mt-4 flex gap-2">
          <Button type="button" onClick={() => alert("PDF export UI (wire to backend).")}>
            Export PDF
          </Button>
          <Button variant="secondary" type="button" onClick={() => alert("Excel export UI (wire to backend).")}>
            Export Excel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
