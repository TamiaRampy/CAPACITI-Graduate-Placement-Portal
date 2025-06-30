import React, { useState } from "react";
import { app } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);
import { Link } from "react-router-dom";
import "../../styles/AdminAuth.css";

interface Props {
  mode: "login" | "signup";
}

const AdminAuth: React.FC<Props> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-auth-bg">
      <div className="admin-auth-container">
        <Link to="/" className="back-to-welcome-btn">
          ← Back to Welcome
        </Link>
        <img
          src="/Images/CAPACITI-LOGO.jpg"
          alt="CAPACITI Logo"
          className="auth-logo"
        />
        <h2 className="auth-title">Admin Login</h2>
        <p className="auth-subtitle">
          Empowering graduates. Connecting employers.
        </p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
          {error && <p className="auth-error">{error}</p>}
        </form>
        <div className="auth-links">
          <Link to="/forgot-password" className="auth-link">
            Forgot Password?
          </Link>
        </div>
        <footer className="auth-footer">© 2025 CAPACITI Programme</footer>
      </div>
    </div>
  );
};

export default AdminAuth;