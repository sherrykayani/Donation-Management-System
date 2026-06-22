import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Input, TextArea } from "../../components/ui/Input.jsx";
import { useToast } from "../../contexts/ToastContext.jsx";

export default function AdminSettingsPage() {
  const { theme, setTheme } = useTheme();
  const { push } = useToast();
  const [siteName, setSiteName] = useState("HopeFund");
  const [supportEmail, setSupportEmail] = useState("support@hopefund.org");
  const [adminName, setAdminName] = useState("Jamie Admin");
  const [adminBio, setAdminBio] = useState("Operations lead");

  const save = (e) => {
    e.preventDefault();
    push({ title: "Settings saved", message: "Stored in session for this demo." });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Website preferences, admin profile, and theme.</p>
      </div>
      <form onSubmit={save} className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Website settings</h2>
          <div className="mt-4 space-y-4">
            <Input label="Public site name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            <Input label="Support email" type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Admin profile</h2>
          <div className="mt-4 space-y-4">
            <Input label="Display name" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
            <TextArea label="Bio / signature" value={adminBio} onChange={(e) => setAdminBio(e.target.value)} />
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Theme settings</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Choose the default admin workspace appearance.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" variant={theme === "light" ? "primary" : "secondary"} onClick={() => setTheme("light")}>
              Light
            </Button>
            <Button type="button" variant={theme === "dark" ? "primary" : "secondary"} onClick={() => setTheme("dark")}>
              Dark
            </Button>
          </div>
        </section>
        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
}
