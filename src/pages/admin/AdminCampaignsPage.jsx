import React, { useState } from "react";
import { useCampaigns } from "../../contexts/CampaignsContext.jsx";
import { categories } from "../../data/mockData.js";
import { Button } from "../../components/ui/Button.jsx";
import { Input, TextArea, Select } from "../../components/ui/Input.jsx";
import { Modal } from "../../components/ui/Modal.jsx";
import { Badge } from "../../components/ui/Badge.jsx";
import { formatMoney, pct } from "../../utils/format.js";

const emptyForm = {
  title: "",
  short: "",
  description: "",
  category: "health",
  goal: "",
  raised: "0",
  donors: "0",
  organizer: "HopeFund",
  status: "active",
  urgent: false,
  trending: false,
  image: "",
};

export default function AdminCampaignsPage() {
  const { allCampaigns, addCampaign, updateCampaign, deleteCampaign } = useCampaigns();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");

  const openCreate = () => {
    setForm(emptyForm);
    setPreview("");
    setModal("create");
  };

  const openEdit = (c) => {
    setForm({
      title: c.title,
      short: c.short,
      description: c.description,
      category: c.category,
      goal: String(c.goal),
      raised: String(c.raised),
      donors: String(c.donors),
      organizer: c.organizer,
      status: c.status,
      urgent: c.urgent,
      trending: c.trending,
      image: c.image,
    });
    setPreview(c.image);
    setModal({ type: "edit", id: c.id });
  };

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      setPreview(url);
      setForm((f) => ({ ...f, image: url }));
    };
    reader.readAsDataURL(file);
  };

  const save = (e) => {
    e.preventDefault();
    if (modal === "create") {
      addCampaign(form);
    } else if (modal?.type === "edit") {
      updateCampaign(modal.id, { ...form, gallery: [preview || form.image] });
    }
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Campaign management</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Add, edit, delete, upload images, manage status.</p>
        </div>
        <Button onClick={openCreate}>Add campaign</Button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Campaign</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {allCampaigns.map((c) => (
              <tr key={c.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={c.image} alt="" className="h-10 w-14 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{c.title}</p>
                      <p className="text-xs text-slate-500">{c.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-xs text-slate-500">{pct(c.raised, c.goal)}% · {formatMoney(c.raised)} / {formatMoney(c.goal)}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={c.status === "active" ? "success" : "warning"}>{c.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" className="!py-1 !text-xs" onClick={() => openEdit(c)}>
                    Edit
                  </Button>
                  <Button variant="danger" className="!py-1 !text-xs" onClick={() => deleteCampaign(c.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "create" ? "New campaign" : "Edit campaign"} wide>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={save}>
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {categories
              .filter((x) => x.id !== "all")
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
          </Select>
          <TextArea className="md:col-span-2" label="Short summary" value={form.short} onChange={(e) => setForm({ ...form, short: e.target.value })} required />
          <TextArea className="md:col-span-2" label="Full description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <Input label="Goal (USD)" type="number" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} required />
          <Input label="Raised (USD)" type="number" value={form.raised} onChange={(e) => setForm({ ...form, raised: e.target.value })} />
          <Input label="Donors count" type="number" value={form.donors} onChange={(e) => setForm({ ...form, donors: e.target.value })} />
          <Input label="Organizer" value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} />
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="active">active</option>
            <option value="paused">paused</option>
            <option value="archived">archived</option>
          </Select>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Campaign image upload</label>
            <input type="file" accept="image/*" onChange={onFile} className="text-sm" />
            {(preview || form.image) && (
              <img src={preview || form.image} alt="" className="mt-2 h-40 max-w-md rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700" />
            )}
          </div>
          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input type="checkbox" checked={form.urgent} onChange={(e) => setForm({ ...form, urgent: e.target.checked })} />
            Urgent badge
          </label>
          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input type="checkbox" checked={form.trending} onChange={(e) => setForm({ ...form, trending: e.target.checked })} />
            Trending badge
          </label>
          <div className="md:col-span-2 flex justify-end gap-2">
            <Button variant="secondary" type="button" onClick={() => setModal(null)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
