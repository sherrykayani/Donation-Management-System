import React, { useState } from "react";
import { useToast } from "../contexts/ToastContext.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Input, TextArea } from "../components/ui/Input.jsx";
import { api } from "../utils/api.js";

const skills = ["Events", "Logistics", "Design", "Social media", "Medical", "Teaching", "Translation"];

export default function VolunteerPage() {
  const { push } = useToast();
  const [picked, setPicked] = useState([]);
  const toggle = (s) => {
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("vname"),
      email: fd.get("vemail"),
      phone: fd.get("vphone"),
      why: fd.get("vwhy"),
      skills: picked,
    };
    try {
      await api.post("/volunteers", payload);
      push({ title: "Application received", message: "Our coordinator will reach out." });
      setPicked([]);
      e.currentTarget.reset();
    } catch (err) {
      push({ title: "Error", message: err.message || "Failed to submit application." });
    }
  };


  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Volunteer</h1>
      <p className="text-slate-600 dark:text-slate-400">Share your skills and availability.</p>
      <form onSubmit={onSubmit} className="glass-card mt-8 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Full name" name="vname" required />
          <Input label="Email" type="email" name="vemail" required />
        </div>
        <Input label="Phone" name="vphone" />
        <TextArea label="Why do you want to volunteer?" name="vwhy" required />
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Skills & interests</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggle(s)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  picked.includes(s) ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 dark:border-slate-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <Button type="submit" className="w-full">
          Submit application
        </Button>
      </form>
    </div>
  );
}
