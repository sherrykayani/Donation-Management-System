import React, { useMemo, useState } from "react";
import { useCampaigns } from "../contexts/CampaignsContext.jsx";
import { categories } from "../data/mockData.js";
import { CampaignCard } from "../components/CampaignCard.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import { Skeleton } from "../components/ui/Skeleton.jsx";

export default function CampaignsPage() {
  const { campaigns } = useCampaigns();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return campaigns.filter((c) => {
      if (c.status !== "active") return false;
      const matchQ =
        !q ||
        c.title.toLowerCase().includes(q.toLowerCase()) ||
        c.short.toLowerCase().includes(q.toLowerCase());
      const matchC = cat === "all" || c.category === cat;
      return matchQ && matchC;
    });
  }, [campaigns, q, cat]);

  const trending = useMemo(() => campaigns.filter((c) => c.trending && c.status === "active"), [campaigns]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Campaigns</h1>
          <p className="text-slate-600 dark:text-slate-400">Search, filter, and support programs you care about.</p>
        </div>
        <div className="w-full md:max-w-sm">
          <Input placeholder="Search campaigns…" value={q} onChange={(e) => setQ(e.target.value)} name="search" />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              cat === c.id
                ? "bg-indigo-600 text-white shadow-md"
                : "glass text-slate-700 hover:border-indigo-200 dark:text-slate-200"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {trending.length > 0 && (
        <section className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">Trending</h2>
            <Badge tone="info">Popular</Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {trending.map((c) => (
              <CampaignCard key={c.id} campaign={c} showSave />
            ))}
          </div>
        </section>
      )}

      <h2 className="mb-4 font-display text-lg font-bold text-slate-900 dark:text-white">All active</h2>
      {loading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-2xl border border-slate-200/80 p-4 dark:border-slate-800">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-2 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {filtered.map((c) => (
            <CampaignCard key={c.id} campaign={c} showSave />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-600 dark:border-slate-700 dark:text-slate-400">
          No campaigns match your filters.
        </p>
      )}
    </div>
  );
}
