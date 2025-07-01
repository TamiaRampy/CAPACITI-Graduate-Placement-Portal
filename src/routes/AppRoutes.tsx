import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import GraduateAuth from '../pages/Graduate/GraduateAuth';
import EmployerAuth from '../pages/Employer/EmployerAuth';
import EmployerDashboard from '../pages/Employer/EmployerDashboard';
import GraduateDashboard from '../pages/Graduate/GraduateDashboard';
import GraduateProfile from '../pages/Graduate/GraduateProfile';
import JobMatchingFeed from '../pages/Graduate/JobMatchingFeed';
import { ApplicationTracker } from '../pages/Graduate/ApplicationTracker';
import ForgotPassword from '../pages/ForgotPassword';
import AdminAuth from '../pages/Admin/AdminAuth';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import PlacementTracker from '../pages/Admin/PlacementTracker';
import EmployerMetrics from '../pages/Admin/EmployerMetrics';
import ManageUsers from '../pages/Admin/ManageUsers';
import AdminLayout from '../components/common/AdminLayout';
import ManageAdmins from '../pages/Admin/ManageAdmins';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login/graduate" element={<GraduateAuth mode="login" />} />
      <Route path="/signup/graduate" element={<GraduateAuth mode="signup" />} />
      <Route path="/login/employer" element={<EmployerAuth mode="login" />} />
      <Route path="/signup/employer" element={<EmployerAuth mode="signup" />} />
      <Route path="/employer/dashboard" element={<EmployerDashboard />} />
      <Route path="/login/admin" element={<AdminAuth mode="login" />} />
      <Route path="/signup/admin" element={<AdminAuth mode="signup" />} />
      
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="placement-tracker" element={<PlacementTracker />} />
        <Route path="employer-metrics" element={<EmployerMetrics />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-admins" element={<ManageAdmins />} />
      </Route>

      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Graduate routes */}
      <Route path="/graduate/dashboard" element={<GraduateDashboard />} />
      <Route path="/graduate/profile" element={<GraduateProfile />} />
      <Route path="/graduate/jobs" element={<JobMatchingFeed />} />
      <Route path="/graduate/applications" element={<ApplicationTracker />} />
    </Routes>
  );
}

export default AppRoutes;
