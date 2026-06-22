import React from "react";
import { Routes, Route } from "react-router-dom";
import { CampaignsProvider } from "./contexts/CampaignsContext.jsx";
import { PublicLayout } from "./components/layout/PublicLayout.jsx";
import { AdminLayout } from "./components/layout/AdminLayout.jsx";
import { ToastStack } from "./components/ToastStack.jsx";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import CampaignsPage from "./pages/CampaignsPage.jsx";
import CampaignDetailPage from "./pages/CampaignDetailPage.jsx";
import DonatePage from "./pages/DonatePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import VolunteerPage from "./pages/VolunteerPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import AdminCampaignsPage from "./pages/admin/AdminCampaignsPage.jsx";
import AdminDonationsPage from "./pages/admin/AdminDonationsPage.jsx";
import AdminUsersPage from "./pages/admin/AdminUsersPage.jsx";
import AdminVolunteersPage from "./pages/admin/AdminVolunteersPage.jsx";
import AdminReportsPage from "./pages/admin/AdminReportsPage.jsx";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage.jsx";

export default function App() {
  return (
    <CampaignsProvider>
      <ToastStack />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="campaigns/:id" element={<CampaignDetailPage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="donate/:campaignId" element={<DonatePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="volunteer" element={<VolunteerPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="campaigns" element={<AdminCampaignsPage />} />
          <Route path="donations" element={<AdminDonationsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="volunteers" element={<AdminVolunteersPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </CampaignsProvider>
  );
}
