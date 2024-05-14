import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "@/components/Layout/AuthLayout";
import AppLayout from "@/components/Layout/AppLayout";
import AdminDashboardLayout from "@/components/Layout/AdminDashboardLayout";
const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<AppLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/admin/*" element={<AdminDashboardLayout />} />
    </Routes>
  );
};

export default Router;
