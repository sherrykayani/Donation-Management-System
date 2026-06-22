import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useToast } from "../contexts/ToastContext.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Input } from "../components/ui/Input.jsx";

export default function SignupPage() {
  const { signup } = useAuth();
  const { push } = useToast();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    signup({ name: name || "New donor", email: email || "new@example.com" });
    push({ title: "Account created", message: "Welcome to HopeFund (demo)." });
    nav("/dashboard");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="glass-card space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Sign up</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Join to save campaigns and track donations.</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input label="Full name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
