import React, { useEffect, useState } from "react";
import { Badge } from "../../components/ui/Badge.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { api } from "../../utils/api.js";

export default function AdminVolunteersPage() {
  const [rows, setRows] = useState([]);
  const [taskDraft, setTaskDraft] = useState({});

  useEffect(() => {
    async function loadVolunteers() {
      try {
        const data = await api.get("/volunteers");
        setRows(data);
      } catch (err) {
        console.error("Failed to load volunteers", err);
      }
    }
    loadVolunteers();
  }, []);

  const assign = async (id) => {
    const t = taskDraft[id];
    if (!t) return;
    try {
      const updated = await api.put(`/volunteers/${id}/status`, { task: t });
      setRows((r) =>
        r.map((x) => (x.id === id ? { ...x, task: updated.task, status: updated.status } : x))
      );
    } catch (err) {
      console.error("Failed to assign task", err);
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Volunteer management</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Review applications and assign tasks.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((v) => (
          <div key={v.id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{v.name}</p>
                <p className="text-xs text-slate-500">{v.email}</p>
              </div>
              <Badge tone={v.status === "approved" ? "success" : "warning"}>{v.status}</Badge>
            </div>
            <p className="mt-2 text-xs text-slate-500">Skills: {v.skills.join(", ")}</p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              <span className="font-medium">Task:</span> {v.task}
            </p>
            <div className="mt-3 flex gap-2">
              <div className="min-w-0 flex-1">
                <Input
                  label="Assign task"
                  placeholder="e.g. Field orientation — Sat 9am"
                  value={taskDraft[v.id] ?? ""}
                  onChange={(e) => setTaskDraft((d) => ({ ...d, [v.id]: e.target.value }))}
                  name={`task-${v.id}`}
                />
              </div>
              <div className="flex items-end">
                <Button className="shrink-0" type="button" onClick={() => assign(v.id)}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
