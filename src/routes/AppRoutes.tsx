import { Routes, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import GraduateAuth from '../pages/Graduate/GraduateAuth';
import EmployerAuth from '../pages/Employer/EmployerAuth';
import GraduateDashboard from '../pages/Graduate/GraduateDashboard';
import ForgotPassword from '../pages/ForgotPassword';
import AdminAuth from '../pages/Admin/AdminAuth';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login/graduate" element={<GraduateAuth mode="login" />} />
      <Route path="/signup/graduate" element={<GraduateAuth mode="signup" />} />
      <Route path="/login/employer" element={<EmployerAuth mode="login" />} />
      <Route path="/signup/employer" element={<EmployerAuth mode="signup" />} />
      <Route path="/graduate/dashboard" element={<GraduateDashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/login/admin" element={<AdminAuth mode="login" />} />
      <Route path="/signup/admin" element={<AdminAuth mode="signup" />} />
    </Routes>
  );
}

export default AppRoutes;