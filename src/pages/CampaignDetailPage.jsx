import React from "react";
import { Link, useParams } from "react-router-dom";
import { useCampaigns } from "../contexts/CampaignsContext.jsx";
import { Button } from "../components/ui/Button.jsx";
import { ProgressBar } from "../components/ui/ProgressBar.jsx";
import { Badge } from "../components/ui/Badge.jsx";
import { formatMoney, pct } from "../utils/format.js";

export default function CampaignDetailPage() {
  const { id } = useParams();
  const { getById, campaigns } = useCampaigns();
  const campaign = getById(id);
  const related = campaigns.filter((c) => c.id !== id && c.category === campaign?.category && c.status === "active").slice(0, 3);

  if (!campaign) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Campaign not found</h1>
        <Link to="/campaigns" className="mt-4 inline-block text-indigo-600">
          Back to campaigns
        </Link>
      </div>
    );
  }

  const p = pct(campaign.raised, campaign.goal);

  const share = () => {
    const url = window.location.href;
    if (navigator.share) navigator.share({ title: campaign.title, url }).catch(() => {});
    else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="overflow-hidden rounded-3xl border border-white/40 shadow-xl">
            <img src={campaign.image} alt="" className="aspect-[21/9] w-full object-cover" />
          </div>
          <div className="flex flex-wrap gap-2">
            {campaign.urgent && <Badge tone="danger">Urgent</Badge>}
            {campaign.trending && <Badge tone="info">Trending</Badge>}
            <Badge tone="neutral">{campaign.category}</Badge>
          </div>
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">{campaign.title}</h1>
          <p className="text-slate-700 dark:text-slate-300">{campaign.description}</p>
          <div>
            <h2 className="mb-3 font-display text-lg font-semibold text-slate-900 dark:text-white">Gallery</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {(campaign.gallery?.length ? campaign.gallery : [campaign.image]).map((src) => (
                <img key={src} src={src} alt="" className="h-32 w-full rounded-xl object-cover ring-1 ring-slate-200/80 dark:ring-slate-700" />
              ))}
            </div>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="glass-card sticky top-24 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Goal tracker</p>
              <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">{p}% funded</p>
            </div>
            <ProgressBar value={p} />
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300">
              <span>{formatMoney(campaign.raised)}</span>
              <span>{formatMoney(campaign.goal)}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800/80">
              <span className="text-slate-600 dark:text-slate-300">Donors</span>
              <span className="font-semibold text-slate-900 dark:text-white">{campaign.donors.toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-500">Organized by {campaign.organizer}</p>
            <Link to={`/donate/${campaign.id}`}>
              <Button className="w-full">Donate now</Button>
            </Link>
            <Button variant="secondary" className="w-full" onClick={share}>
              Share
            </Button>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 font-display text-xl font-bold text-slate-900 dark:text-white">Related campaigns</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((c) => (
              <Link key={c.id} to={`/campaigns/${c.id}`} className="glass-card block hover:border-indigo-300">
                <img src={c.image} alt="" className="mb-3 h-36 w-full rounded-xl object-cover" />
                <h3 className="font-semibold text-slate-900 dark:text-white">{c.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{c.short}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
