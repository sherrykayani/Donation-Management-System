import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/Badge.jsx";
import { ProgressBar } from "./ui/ProgressBar.jsx";
import { Button } from "./ui/Button.jsx";
import { formatMoney, pct } from "../utils/format.js";
import { useAuth } from "../contexts/AuthContext.jsx";

export function CampaignCard({ campaign, showSave }) {
  const navigate = useNavigate();
  const { savedCampaignIds, toggleSaveCampaign, user } = useAuth();
  const saved = savedCampaignIds.includes(campaign.id);
  const p = pct(campaign.raised, campaign.goal);

  return (
    <article className="group glass-card overflow-hidden p-0">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={campaign.image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {campaign.urgent && <Badge tone="danger">Urgent</Badge>}
          {campaign.trending && <Badge tone="info">Trending</Badge>}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
              {campaign.category}
            </p>
            <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">{campaign.title}</h3>
          </div>
          {showSave && user && (
            <button
              type="button"
              onClick={() => toggleSaveCampaign(campaign.id)}
              className="rounded-lg border border-slate-200 bg-white/70 px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm hover:border-indigo-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            >
              {saved ? "Saved" : "Save"}
            </button>
          )}
        </div>
        <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{campaign.short}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
            <span>{formatMoney(campaign.raised)} raised</span>
            <span>{p}%</span>
          </div>
          <ProgressBar value={p} />
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500">Goal {formatMoney(campaign.goal)}</span>
            <Button variant="secondary" className="!py-2 !text-xs" type="button" onClick={() => navigate(`/campaigns/${campaign.id}`)}>
              View details
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
