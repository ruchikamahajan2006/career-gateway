
import { useState } from "react";
import "./AuthPage.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function AuthPage({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    try {
      const endpoint =
        mode === "register" ? "/api/auth/register" : "/api/auth/login";

      const payload =
        mode === "register"
          ? { name: name.trim(), email: email.trim(), password }
          : { email: email.trim(), password };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Authentication failed.");
      }

      sessionStorage.setItem("career-gateway-token", data.access_token);
      sessionStorage.setItem(
        "career-gateway-student",
        JSON.stringify(data.student)
      );

      onAuthenticated(data.student);
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect. Check that the FastAPI backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setError("");
    setNotice("");
    setPassword("");
  }

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <div className="auth-brand-mark">✦</div>
        <p className="auth-eyebrow">YOUR FUTURE STARTS HERE</p>
        <h1>
          Your dreams.
          <br />
          Your direction.
          <br />
          <span>Your future.</span>
        </h1>
        <p className="auth-brand-description">
          Explore careers, build skills, discover courses, and plan your
          next step with Career Gateway.
        </p>

        <div className="auth-benefit-list">
          <span>🎯 Discover career possibilities</span>
          <span>🗺️ Track your learning roadmap</span>
          <span>📈 Keep your goals in sight</span>
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-card">
          <div className="auth-mobile-brand">✦ Career Gateway</div>

          <p className="auth-eyebrow">
            {mode === "login" ? "WELCOME BACK" : "START YOUR JOURNEY"}
          </p>

          <h2>
            {mode === "login" ? "Sign in to your account" : "Create your account"}
          </h2>

          <p className="auth-form-description">
            {mode === "login"
              ? "Pick up where your career journey left off."
              : "Join Career Gateway and start planning your future."}
          </p>

          <div className="auth-mode-switch">
            <button
              type="button"
              className={mode === "login" ? "selected" : ""}
              onClick={() => switchMode("login")}
            >
              Sign in
            </button>
            <button
              type="button"
              className={mode === "register" ? "selected" : ""}
              onClick={() => switchMode("register")}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {mode === "register" && (
              <label>
                Full name
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                maxLength={254}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={
                  mode === "register"
                    ? "Create at least 8 characters"
                    : "Enter your password"
                }
                minLength={mode === "register" ? 8 : 1}
                maxLength={128}
                autoComplete={
                  mode === "register" ? "new-password" : "current-password"
                }
                required
              />
            </label>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            {notice && <p className="auth-notice">{notice}</p>}

            <button
              className="auth-submit-button"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign in →"
                : "Create account →"}
            </button>
          </form>

          <p className="auth-security-note">
            🔒 Your password is hashed by the backend before it is stored.
          </p>
        </div>
      </section>
    </main>
  );
}
