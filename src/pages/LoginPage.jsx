import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useToast } from "../contexts/ToastContext.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Input } from "../components/ui/Input.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const { push } = useToast();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    login(email || "you@example.com", password, remember);
    push({ title: "Welcome back", message: "You are signed in (demo)." });
    nav("/dashboard");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="glass-card space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Log in</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Access your donor dashboard and receipts.</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input label="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <Input label="Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded border-slate-300" />
            Remember me
          </label>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
        <div className="flex justify-between text-sm">
          <Link to="/forgot-password" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
            Forgot password?
          </Link>
          <Link to="/signup" className="font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
