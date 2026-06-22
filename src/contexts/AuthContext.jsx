import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { api } from "../utils/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [savedCampaignIds, setSavedCampaignIds] = useState([]);
  const [donations, setDonations] = useState([]);

  // Restore user session on startup
  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem("dms-token");
      if (token) {
        try {
          const profile = await api.get("/auth/profile");
          setUser(profile);
          
          // Load user's saved campaigns & donations
          const savedIds = await api.get("/auth/saved-campaigns");
          setSavedCampaignIds(savedIds);
          
          const history = await api.get("/donations/my");
          setDonations(history);
        } catch (err) {
          console.error("Failed to restore session", err);
          logout();
        }
      }
    }
    restoreSession();
  }, []);

  const login = async (email, password, remember) => {
    const data = await api.post("/auth/login", { email, password });
    if (data.token) {
      localStorage.setItem("dms-token", data.token);
    }
    setUser(data);
    
    // Load associated data
    try {
      const savedIds = await api.get("/auth/saved-campaigns");
      setSavedCampaignIds(savedIds);
      
      const history = await api.get("/donations/my");
      setDonations(history);
    } catch (e) {
      console.error("Failed to fetch session metadata", e);
    }
  };

  const logout = () => {
    localStorage.removeItem("dms-token");
    setUser(null);
    setSavedCampaignIds([]);
    setDonations([]);
  };

  const signup = async (payload) => {
    const data = await api.post("/auth/register", {
      name: payload.name,
      email: payload.email,
      password: payload.password || "password123",
    });
    if (data.token) {
      localStorage.setItem("dms-token", data.token);
    }
    setUser(data);
    setSavedCampaignIds([]);
    setDonations([]);
  };

  const toggleSaveCampaign = async (id) => {
    if (!user) return;
    try {
      const next = await api.post(`/auth/saved-campaigns/${id}`);
      setSavedCampaignIds(next);
    } catch (err) {
      console.error("Failed to toggle saved campaign", err);
    }
  };

  const addDonation = async (record) => {
    try {
      const donation = await api.post("/donations", {
        campaignId: record.campaignId,
        amount: record.amount,
        method: record.method,
        anonymous: record.anonymous,
      });
      // Prepend the new donation receipt
      setDonations((prev) => [donation, ...prev]);
    } catch (err) {
      console.error("Donation processing failed", err);
      throw err;
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      signup,
      savedCampaignIds,
      toggleSaveCampaign,
      donations,
      addDonation,
    }),
    [user, savedCampaignIds, donations]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

