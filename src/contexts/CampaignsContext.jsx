import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { api } from "../utils/api.js";
import { useAuth } from "./AuthContext.jsx";

const CampaignsContext = createContext(null);

export function CampaignsProvider({ children }) {
  const { user } = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const endpoint = user?.role === "Admin" ? "/campaigns/all" : "/campaigns";
        const data = await api.get(endpoint);
        setList(data);
      } catch (err) {
        console.error("Failed to load campaigns", err);
      }
    }
    fetchCampaigns();
  }, [user]);

  const getById = (id) => list.find((c) => c.id === id);

  const addCampaign = async (payload) => {
    try {
      const created = await api.post("/campaigns", {
        title: payload.title,
        category: payload.category,
        short: payload.short,
        description: payload.description,
        goal: Number(payload.goal) || 0,
        raised: Number(payload.raised) || 0,
        donors: Number(payload.donors) || 0,
        urgent: !!payload.urgent,
        trending: !!payload.trending,
        image: payload.image,
        gallery: payload.gallery?.length ? payload.gallery : [payload.image].filter(Boolean),
        organizer: payload.organizer || "HopeFund",
        status: payload.status || "active",
      });
      setList((prev) => [created, ...prev]);
      return created.id;
    } catch (err) {
      console.error("Failed to add campaign", err);
      throw err;
    }
  };

  const updateCampaign = async (id, payload) => {
    try {
      const updated = await api.put(`/campaigns/${id}`, {
        title: payload.title,
        category: payload.category,
        short: payload.short,
        description: payload.description,
        goal: Number(payload.goal) || 0,
        raised: Number(payload.raised) || 0,
        donors: Number(payload.donors) || 0,
        urgent: !!payload.urgent,
        trending: !!payload.trending,
        image: payload.image,
        gallery: payload.gallery,
        organizer: payload.organizer,
        status: payload.status,
      });
      setList((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      console.error("Failed to update campaign", err);
      throw err;
    }
  };

  const deleteCampaign = async (id) => {
    try {
      await api.delete(`/campaigns/${id}`);
      setList((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete campaign", err);
      throw err;
    }
  };

  const value = useMemo(
    () => ({
      campaigns: list.filter((c) => c.status !== "archived"),
      allCampaigns: list,
      getById,
      addCampaign,
      updateCampaign,
      deleteCampaign,
    }),
    [list]
  );

  return <CampaignsContext.Provider value={value}>{children}</CampaignsContext.Provider>;
}

export function useCampaigns() {
  const ctx = useContext(CampaignsContext);
  if (!ctx) throw new Error("useCampaigns must be used within CampaignsProvider");
  return ctx;
}

