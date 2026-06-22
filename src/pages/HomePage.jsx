import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCampaigns } from "../contexts/CampaignsContext.jsx";
import { CampaignCard } from "../components/CampaignCard.jsx";
import { Button } from "../components/ui/Button.jsx";
import { ProgressBar } from "../components/ui/ProgressBar.jsx";
import { testimonials, faqItems } from "../data/mockData.js";
import { formatMoney } from "../utils/format.js";

function useCountUp(target, duration = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setV(Math.floor(target * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

export default function HomePage() {
  const { campaigns } = useCampaigns();
  const featured = campaigns.filter((c) => c.status === "active").slice(0, 3);
  const totalRaised = campaigns.reduce((s, c) => s + c.raised, 0);
  const donors = campaigns.reduce((s, c) => s + c.donors, 0);
  const n = useCountUp(Math.round(totalRaised / 1000), 1400);
  const d = useCountUp(Math.min(donors, 9999), 1400);
  const c = useCountUp(campaigns.filter((x) => x.status === "active").length, 900);

  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-hero-gradient" />
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-fuchsia-400/30 blur-3xl dark:bg-fuchsia-600/20" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-400/25 blur-3xl dark:bg-cyan-500/15" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-24">
          <div className="flex-1 space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/60 dark:text-indigo-200">
              Trusted by donors in 40+ countries
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
              Give with clarity.{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-500 bg-clip-text text-transparent">
                Impact with confidence.
              </span>
            </h1>
            <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300">
              Modern campaigns, transparent goals, and a donor experience designed for mobile-first giving.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/campaigns">
                <Button>Explore campaigns</Button>
              </Link>
              <Link to="/donate">
                <Button variant="secondary">Quick donate</Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { label: "Raised (USD, k)", value: `${n}k+` },
                { label: "Active campaigns", value: `${c}` },
                { label: "Community donors", value: `${d.toLocaleString()}+` },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4 text-center shadow-lg">
                  <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="glass relative overflow-hidden rounded-3xl p-6 shadow-2xl">
              <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-200">Donation highlight</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">Shelter kits — final sprint</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Corporate match unlocked. Every gift doubled until the goal line.
              </p>
              <div className="mt-6 space-y-2">
                <ProgressBar value={98} />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{formatMoney(58900)} raised</span>
                  <span>Goal {formatMoney(60000)}</span>
                </div>
              </div>
              <Link to="/campaigns/c4" className="mt-6 block">
                <Button className="w-full">View campaign</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Featured campaigns</h2>
            <p className="text-slate-600 dark:text-slate-400">Hand-picked programs with strong milestones.</p>
          </div>
          <Link to="/campaigns" className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
            See all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((c) => (
            <CampaignCard key={c.id} campaign={c} showSave />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200/80 bg-white/40 py-14 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-slate-900 dark:text-white">Voices from our community</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote key={t.id} className="glass-card">
                <p className="text-slate-700 dark:text-slate-200">“{t.quote}”</p>
                <footer className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{t.name}</footer>
                <p className="text-xs text-slate-500">{t.role}</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="mb-6 text-center font-display text-2xl font-bold text-slate-900 dark:text-white">FAQ</h2>
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div key={item.q} className="glass-card cursor-pointer p-0">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <span className="font-semibold text-slate-900 dark:text-white">{item.q}</span>
                <span className="text-slate-400">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p className="border-t border-slate-200/80 px-5 pb-4 pt-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
