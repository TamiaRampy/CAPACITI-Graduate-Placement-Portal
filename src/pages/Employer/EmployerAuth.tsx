import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import "../../styles/EmployerAuth.css";

interface Props {
  mode: "login" | "signup";
}

const EmployerAuth: React.FC<Props> = ({ mode }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (mode === "signup") {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!name.trim() || !surname.trim()) {
        setError("Name and Surname are required.");
        return;
      }
    }
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        // navigate('/employer/dashboard');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess("You have signed up successfully! Redirecting to login...");
        setName("");
        setSurname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setSuccess("");
          navigate("/login/employer");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="employer-auth-bg">
      <div className="employer-auth-container">
        <Link to="/" className="back-to-welcome-btn">
          ← Back to Welcome
        </Link>
        <img
          src="/Images/CAPACITI-LOGO.jpg"
          alt="CAPACITI Logo"
          className="auth-logo"
        />
        <h1 className="auth-title">
          Employer {mode === "login" ? "Login" : "Sign Up"}
        </h1>
        <p className="auth-subtitle">
          Empowering graduates. Connecting employers.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "signup" && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="First Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="auth-input"
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                  className="auth-input"
                />
              </div>
            </>
          )}

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

          {mode === "signup" && (
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>
          )}

          <button type="submit" className="auth-button">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <Link to="/forgot-password" className="auth-link">
            Forgot password?
          </Link>

          <div className="auth-switch">
            {mode === "login" ? (
              <p className="auth-switch-text">
                Don't have an account?{" "}
                <Link to="/signup/employer" className="auth-switch-link">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="auth-switch-text">
                Already have an account?{" "}
                <Link to="/login/employer" className="auth-switch-link">
                  Login
                </Link>
              </p>
            )}
          </div>
        </form>

        <div className="auth-footer">© 2025 CAPACITI Programme</div>
      </div>
    </div>
  );
};

export default EmployerAuth;