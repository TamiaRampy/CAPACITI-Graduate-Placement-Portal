import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "../../styles/AdminDashboard.css";

const AdminLayout: React.FC = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <main style={{ flexGrow: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
