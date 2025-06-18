import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome.jsx'
import GraduateAuth from './pages/Graduate/GraduateAuth'
import EmployerAuth from './pages/Employer/EmployerAuth'
import AdminAuth from './pages/Admin/AdminAuth'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login/graduate" element={<GraduateAuth mode="login" />} />
        <Route path="/signup/graduate" element={<GraduateAuth mode="signup" />} />
        <Route path="/login/employer" element={<EmployerAuth mode="login" />} />
        <Route path="/signup/employer" element={<EmployerAuth mode="signup" />} />
        <Route path="/login/admin" element={<AdminAuth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
