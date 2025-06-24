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
    <div className="auth-container">
      <div className="auth-form-box">
        <Link to="/" className="back-to-welcome-btn">
          ← Back to Welcome
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
  );
};

export default GraduateAuth;