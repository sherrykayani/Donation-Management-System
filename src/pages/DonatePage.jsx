import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCampaigns } from "../contexts/CampaignsContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useToast } from "../contexts/ToastContext.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Input, Select } from "../components/ui/Input.jsx";
import { Modal } from "../components/ui/Modal.jsx";
import { formatMoney } from "../utils/format.js";

const presets = [25, 50, 100, 250];

export default function DonatePage() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { getById, campaigns } = useCampaigns();
  const { addDonation, user } = useAuth();
  const { push } = useToast();
  const initial = campaignId ? getById(campaignId) : null;
  const [selectedId, setSelectedId] = useState(initial?.id || campaigns.find((c) => c.status === "active")?.id);
  const campaign = useMemo(() => getById(selectedId), [getById, selectedId]);

  useEffect(() => {
    if (campaignId && getById(campaignId)) setSelectedId(campaignId);
  }, [campaignId, getById]);
  const [amount, setAmount] = useState("50");
  const [custom, setCustom] = useState("");
  const [method, setMethod] = useState("card");
  const [anonymous, setAnonymous] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [lastReceipt, setLastReceipt] = useState(null);

  const finalAmount = custom ? Number(custom) : Number(amount);

  const submit = (e) => {
    e.preventDefault();
    if (!campaign || !finalAmount || finalAmount < 1) return;
    const id = `R-${Date.now()}`;
    const record = {
      id,
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      amount: finalAmount,
      method,
      anonymous,
      at: new Date().toISOString(),
    };
    addDonation(record);
    setLastReceipt(record);
    setSuccessOpen(true);
    push({ title: "Donation successful", message: `${formatMoney(finalAmount)} to ${campaign.title}` });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Donate</h1>
        <p className="text-slate-600 dark:text-slate-400">Choose an amount and payment method. Demo flow only.</p>
      </div>
      <form onSubmit={submit} className="glass-card space-y-5">
        <Select label="Campaign" name="campaign" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          {campaigns
            .filter((c) => c.status === "active")
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
        </Select>
        {campaign && (
          <div className="flex gap-3 rounded-xl border border-slate-200/80 p-3 dark:border-slate-700">
            <img src={campaign.image} alt="" className="h-16 w-24 rounded-lg object-cover" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{campaign.title}</p>
              <p className="text-xs text-slate-500">{campaign.organizer}</p>
            </div>
          </div>
        )}
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Amount</p>
          <div className="flex flex-wrap gap-2">
            {presets.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setAmount(String(n));
                  setCustom("");
                }}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                  !custom && amount === String(n)
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/60"
                }`}
              >
                {formatMoney(n)}
              </button>
            ))}
          </div>
          <div className="mt-3">
            <Input label="Custom amount (USD)" name="custom" type="number" min="1" placeholder="Enter amount" value={custom} onChange={(e) => setCustom(e.target.value)} />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Payment method</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { id: "card", label: "Card" },
              { id: "ach", label: "ACH" },
              { id: "wallet", label: "Wallet" },
            ].map((m) => (
              <label
                key={m.id}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold ${
                  method === m.id ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} />
                {m.label}
              </label>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
          Donate anonymously
        </label>
        {!user && <p className="text-xs text-amber-700 dark:text-amber-300">Tip: log in to sync history across devices.</p>}
        <Button type="submit" className="w-full" disabled={!finalAmount || finalAmount < 1}>
          Complete donation
        </Button>
      </form>

      <Modal open={successOpen} onClose={() => setSuccessOpen(false)} title="Thank you!">
        <p className="text-sm text-slate-600 dark:text-slate-300">Your donation was recorded locally for this demo.</p>
        <div className="mt-4 flex gap-2">
          <Button
            type="button"
            onClick={() => {
              setSuccessOpen(false);
              setReceiptOpen(true);
            }}
          >
            View receipt
          </Button>
          <Button variant="secondary" type="button" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
        </div>
      </Modal>

      <Modal open={receiptOpen} onClose={() => setReceiptOpen(false)} title="Receipt" wide>
        {lastReceipt && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-700 dark:bg-slate-950">
            <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
              <span>Receipt ID</span>
              <span className="font-mono text-xs">{lastReceipt.id}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span>Campaign</span>
              <span className="max-w-[60%] text-right font-medium">{lastReceipt.campaignTitle}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span>Amount</span>
              <span className="font-semibold">{formatMoney(lastReceipt.amount)}</span>
            </div>
            <div className="mt-2 flex justify-between text-slate-500">
              <span>Method</span>
              <span className="uppercase">{lastReceipt.method}</span>
            </div>
            <div className="mt-2 flex justify-between text-slate-500">
              <span>Anonymous</span>
              <span>{lastReceipt.anonymous ? "Yes" : "No"}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
