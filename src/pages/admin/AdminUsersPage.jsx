import React, { useEffect, useState } from "react";
import { Badge } from "../../components/ui/Badge.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { api } from "../../utils/api.js";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await api.get("/auth/users");
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    }
    loadUsers();
  }, []);

  const toggleBlock = async (id) => {
    try {
      const updated = await api.put(`/auth/users/${id}/status`);
      setUsers((u) =>
        u.map((x) => (x.id === id ? { ...x, status: updated.status } : x))
      );
    } catch (err) {
      console.error("Failed to update user status", err);
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">User management</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Block or unblock accounts and review activity.</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Donations</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-900 dark:text-white">{u.name}</p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{u.joined}</td>
                <td className="px-4 py-3">{u.donationsCount}</td>
                <td className="px-4 py-3">
                  <Badge tone={u.status === "active" ? "success" : "danger"}>{u.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="secondary" className="!py-1 !text-xs" onClick={() => toggleBlock(u.id)}>
                    {u.status === "blocked" ? "Unblock" : "Block"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
