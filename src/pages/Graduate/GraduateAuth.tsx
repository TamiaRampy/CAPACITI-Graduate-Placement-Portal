import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import "../../styles/GraduateAuth.css";

interface Props {
  mode: "login" | "signup";
}

const GraduateAuth: React.FC<Props> = ({ mode }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        if (!userCredential.user.emailVerified) {
          setError(
            "Please verify your email before logging in. Check your inbox for a verification email.",
          );
          // Optionally, resend verification email:
          await sendEmailVerification(userCredential.user);
          return;
        }
        navigate("/graduate/dashboard");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await sendEmailVerification(userCredential.user);
        setSuccess(
          "Sign up successful! Please check your email for a verification link before logging in.",
        );
        setName("");
        setSurname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setSuccess("");
          navigate("/login/graduate");
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="graduate-auth-bg">
      <div className="graduate-auth-container">
        <div className="auth-form-box">
          <Link to="/" className="back-to-welcome-btn">
            <span className="back-arrow-icon" aria-hidden="true">
              {/* Unique SVG Arrow */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle
                  cx="14"
                  cy="14"
                  r="13"
                  stroke="#ff6f61"
                  strokeWidth="2"
                  fill="#fff"
                />
                <path
                  d="M16 9l-5 5 5 5"
                  stroke="#ff6f61"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Back to Welcome
          </Link>
          <img
            src="/Images/CAPACITI-LOGO.jpg"
            alt="CAPACITI Logo"
            className="auth-logo"
          />
          <h2 className="auth-title">
            Graduate {mode === "login" ? "Login" : "Sign Up"}
          </h2>
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
            <div className="input-group" style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye-off SVG
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.61 3.31-4.77 6-6.32M1 1l22 22"
                      stroke="currentColor"
                    />
                    <path
                      d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5a3.5 3.5 0 0 0 2.47-5.97"
                      stroke="currentColor"
                    />
                  </svg>
                ) : (
                  // Eye SVG
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <ellipse
                      cx="12"
                      cy="12"
                      rx="10"
                      ry="7"
                      stroke="currentColor"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" />
                  </svg>
                )}
            </button>
            </div>
            {mode === "signup" && (
              <div className="input-group" style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="auth-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    // Eye-off SVG
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.61 3.31-4.77 6-6.32M1 1l22 22"
                        stroke="currentColor"
                      />
                      <path
                        d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5a3.5 3.5 0 0 0 2.47-5.97"
                        stroke="currentColor"
                      />
                    </svg>
                  ) : (
                    // Eye SVG
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <ellipse
                        cx="12"
                        cy="12"
                        rx="10"
                        ry="7"
                        stroke="currentColor"
                      />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" />
                    </svg>
                  )}
                </button>
              </div>
            )}
            <button type="submit" className="auth-button">
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
            {error && <p className="auth-error">{error}</p>}
            {success && <p className="auth-success">{success}</p>}
            <div className="auth-links">
              <Link to="/forgot-password" className="auth-link">
                Forgot password?
              </Link>
            </div>
          </form>
          <div className="auth-switch">
            {mode === "login" ? (
              <p className="auth-switch-text">
                Don't have an account?{" "}
                <Link to="/signup/graduate" className="auth-switch-link">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="auth-switch-text">
                Already have an account?{" "}
                <Link to="/login/graduate" className="auth-switch-link">
                  Login
                </Link>
              </p>
            )}
          </div>
          <footer className="auth-footer">© 2025 CAPACITI Programme</footer>
        </div>
      </div>
    </div>
  );
};

export default GraduateAuth;