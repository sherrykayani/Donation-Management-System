import React, { useState } from "react";
import { faqItems } from "../data/mockData.js";
import { useToast } from "../contexts/ToastContext.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Input, TextArea } from "../components/ui/Input.jsx";
import { api } from "../utils/api.js";

export default function ContactPage() {
  const { push } = useToast();
  const [tab, setTab] = useState("form");
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hi! I am the HopeFund assistant. How can I help today?" },
  ]);
  const [chat, setChat] = useState("");

  const sendChat = (e) => {
    e.preventDefault();
    if (!chat.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), from: "user", text: chat }]);
    setChat("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, from: "bot", text: "Thanks for your message. A human teammate typically replies within a few hours." },
      ]);
    }, 600);
  };

  const onContact = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("cname"),
      email: fd.get("cemail"),
      message: fd.get("cmsg"),
    };
    try {
      await api.post("/contact", payload);
      push({ title: "Message sent", message: "Support will follow up shortly." });
      e.currentTarget.reset();
    } catch (err) {
      push({ title: "Error", message: err.message || "Failed to send message." });
    }
  };


  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Contact & support</h1>
      <p className="text-slate-600 dark:text-slate-400">Reach the team or browse quick answers.</p>

      <div className="mt-6 flex gap-2">
        <Button variant={tab === "form" ? "primary" : "secondary"} className="!py-2" onClick={() => setTab("form")}>
          Contact form
        </Button>
        <Button variant={tab === "chat" ? "primary" : "secondary"} className="!py-2" onClick={() => setTab("chat")}>
          Live chat UI
        </Button>
        <Button variant={tab === "faq" ? "primary" : "secondary"} className="!py-2" onClick={() => setTab("faq")}>
          Support FAQ
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {tab === "form" && (
          <form onSubmit={onContact} className="glass-card space-y-4">
            <Input label="Name" name="cname" required />
            <Input label="Email" type="email" name="cemail" required />
            <TextArea label="How can we help?" name="cmsg" required />
            <Button type="submit" className="w-full">
              Send message
            </Button>
          </form>
        )}

        {tab === "chat" && (
          <div className="glass-card flex h-[420px] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      m.from === "user" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendChat} className="mt-3 flex gap-2">
              <input
                className="flex-1 rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/60"
                placeholder="Type a message…"
                value={chat}
                onChange={(e) => setChat(e.target.value)}
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        )}

        {tab === "faq" && (
          <div className="glass-card space-y-3 lg:col-span-2">
            {faqItems.map((f) => (
              <div key={f.q}>
                <p className="font-semibold text-slate-900 dark:text-white">{f.q}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{f.a}</p>
              </div>
            ))}
          </div>
        )}

        {tab !== "faq" && (
          <div className="glass-card">
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Support FAQ</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
              {faqItems.slice(0, 3).map((f) => (
                <li key={f.q}>{f.q}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
