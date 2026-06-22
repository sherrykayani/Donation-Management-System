import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useCampaigns } from "../contexts/CampaignsContext.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Modal } from "../components/ui/Modal.jsx";
import { formatMoney } from "../utils/format.js";

export default function DashboardPage() {
  const { user, donations, savedCampaignIds } = useAuth();
  const { getById } = useCampaigns();
  const [receipt, setReceipt] = useState(null);

  const saved = savedCampaignIds.map((id) => getById(id)).filter(Boolean);

  const downloadReceipt = (d) => {
    const text = `HopeFund Receipt\nID: ${d.id}\nCampaign: ${d.campaignTitle}\nAmount: ${formatMoney(d.amount)}\nDate: ${new Date(d.at).toLocaleString()}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${d.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Your dashboard</h1>
      <p className="text-slate-600 dark:text-slate-400">Profile, history, saved campaigns, and activity.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="glass-card lg:col-span-1">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Profile</h2>
          {user ? (
            <div className="mt-4 flex items-center gap-3">
              <img src={user.avatar} alt="" className="h-14 w-14 rounded-2xl ring-2 ring-indigo-200 dark:ring-indigo-500/40" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              You are browsing as a guest.{" "}
              <Link className="font-semibold text-indigo-600" to="/login">
                Log in
              </Link>
            </p>
          )}
        </div>
        <div className="glass-card lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Recent activity</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {donations.slice(0, 4).map((d) => (
              <li key={d.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
                <span>
                  Donated {formatMoney(d.amount)} to <strong>{d.campaignTitle}</strong>
                </span>
                <span className="text-xs text-slate-400">{new Date(d.at).toLocaleDateString()}</span>
              </li>
            ))}
            {donations.length === 0 && <li>No donations yet — start from a campaign page.</li>}
          </ul>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass-card">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Donation history</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="pb-2">Campaign</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2"></th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="py-2 pr-2">{d.campaignTitle}</td>
                    <td className="py-2">{formatMoney(d.amount)}</td>
                    <td className="py-2 text-right">
                      <Button variant="ghost" className="!py-1 !text-xs" onClick={() => setReceipt(d)}>
                        Receipt
                      </Button>
                      <Button variant="ghost" className="!py-1 !text-xs" onClick={() => downloadReceipt(d)}>
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="glass-card">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Saved campaigns</h2>
          <div className="mt-4 space-y-3">
            {saved.map((c) => (
              <Link key={c.id} to={`/campaigns/${c.id}`} className="flex items-center gap-3 rounded-xl border border-slate-200/80 p-3 hover:border-indigo-300 dark:border-slate-700">
                <img src={c.image} alt="" className="h-12 w-16 rounded-lg object-cover" />
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{c.title}</p>
                  <p className="text-xs text-slate-500">{formatMoney(c.raised)} raised</p>
                </div>
              </Link>
            ))}
            {saved.length === 0 && <p className="text-sm text-slate-600 dark:text-slate-400">Save campaigns from the catalog.</p>}
          </div>
        </div>
      </div>

      <Modal open={!!receipt} onClose={() => setReceipt(null)} title="Receipt">
        {receipt && (
          <div className="text-sm text-slate-700 dark:text-slate-200">
            <p>
              <strong>ID:</strong> {receipt.id}
            </p>
            <p className="mt-2">
              <strong>Campaign:</strong> {receipt.campaignTitle}
            </p>
            <p className="mt-2">
              <strong>Amount:</strong> {formatMoney(receipt.amount)}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
