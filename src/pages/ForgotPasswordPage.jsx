import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../contexts/ToastContext.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Input } from "../components/ui/Input.jsx";

export default function ForgotPasswordPage() {
  const { push } = useToast();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    push({ title: "Reset link sent", message: "Check your inbox (demo UI)." });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="glass-card space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Forgot password</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">We will email you a reset link.</p>
        </div>
        {sent ? (
          <p className="text-sm text-slate-700 dark:text-slate-200">
            If an account exists for <strong>{email || "that address"}</strong>, you will receive instructions shortly.
          </p>
        ) : (
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </form>
        )}
        <Link to="/login" className="block text-center text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
          Back to login
        </Link>
      </div>
    </div>
  );
}
