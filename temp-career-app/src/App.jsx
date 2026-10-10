
import { useEffect, useState } from "react";
import CareerDashboard from "./CareerDashboard";
import CareerCompare from "./CareerCompare";
import CareerExplore from "./CareerExplore";
import CollegeFinder from "./CollegeFinder";
import CareerAssessment from "./CareerAssessment";
import CareerRoadmap from "./CareerRoadmap";
import StudentProgress from "./StudentProgress";
import AuthPage from "./AuthPage";
import "./App.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function readSavedStudent() {
  try {
    const value = sessionStorage.getItem("career-gateway-student");
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function CareerChatbot() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage(event) {
    event.preventDefault();

    const text = message.trim();
    if (!text || loading) return;

    const updatedHistory = [...history, { role: "user", content: text }];
    setHistory(updatedHistory);
    setMessage("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      if (!response.ok) {
        throw new Error("The advisor server returned an error.");
      }

      const data = await response.json();

      setHistory([
        ...updatedHistory,
        {
          role: "assistant",
          content: data.reply || "I couldn't generate a reply.",
        },
      ]);
    } catch {
      setError(
        "Could not connect to the career advisor. Make sure the backend is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="cg-chat-panel">
      <section className="cg-home-hero">
        <p>YOUR PERSONAL CAREER GUIDE</p>
        <h1>Ask your Career Advisor 💬</h1>
        <p>
          Ask about careers, courses, skills, entrance exams, and
          your next steps after school.
        </p>
      </section>

      <section className="cg-chat-messages" aria-live="polite">
        {history.length === 0 && (
          <div className="cg-chat-welcome">
            <h3>What would you like help with?</h3>
            <p>
              Try asking: “Which careers suit my interest in technology?”
            </p>
          </div>
        )}

        {history.map((item, index) => (
          <div
            key={`${index}-${item.role}`}
            className={`cg-chat-message ${
              item.role === "user" ? "user-message" : "assistant-message"
            }`}
          >
            <strong>
              {item.role === "user" ? "You" : "Career Advisor"}
            </strong>
            <p>{item.content}</p>
          </div>
        ))}

        {loading && <p className="cg-chat-status">Thinking…</p>}
        {error && <p className="cg-chat-error">{error}</p>}
      </section>

      <form className="cg-chat-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask your career question..."
          aria-label="Your career question"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !message.trim()}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </main>
  );
}

function AuthLoading() {
  return (
    <main className="auth-loading">
      <div className="auth-loading-mark">✦</div>
      <h1>Career Gateway</h1>
      <p>Checking your student account…</p>
    </main>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [student, setStudent] = useState(readSavedStudent);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const token = sessionStorage.getItem("career-gateway-token");

    if (!token) {
      setStudent(null);
      setAuthLoading(false);
      return () => {
        cancelled = true;
      };
    }

    async function validateSession() {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Session expired");
        }

        const account = await response.json();

        if (!cancelled) {
          setStudent(account);
          sessionStorage.setItem(
            "career-gateway-student",
            JSON.stringify(account)
          );
        }
      } catch {
        if (!cancelled) {
          sessionStorage.removeItem("career-gateway-token");
          sessionStorage.removeItem("career-gateway-student");
          setStudent(null);
        }
      } finally {
        if (!cancelled) setAuthLoading(false);
      }
    }

    validateSession();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleAuthenticated(account) {
    setStudent(account);
    setActivePage("home");
    setAuthLoading(false);
  }

  function handleLogout() {
    sessionStorage.removeItem("career-gateway-token");
    sessionStorage.removeItem("career-gateway-student");
    setStudent(null);
    setActivePage("home");
  }

  function openPage(page) {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (authLoading) {
    return <AuthLoading />;
  }

  if (!student) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  const navigation = [
    { id: "home", label: "Home" },
    { id: "dashboard", label: "Careers" },
    { id: "chat", label: "Advisor" },
    { id: "compare", label: "Compare" },
    { id: "explore", label: "Explore Courses" },
    { id: "colleges", label: "College Finder" },
    { id: "assessment", label: "Career Assessment" },
    { id: "roadmap", label: "Career Roadmap" },
    { id: "progress", label: "My Progress" },
  ];

  return (
    <div className="career-gateway-app">
      <header className="cg-header">
        <button
          className="cg-brand"
          type="button"
          onClick={() => openPage("home")}
        >
          <span className="cg-brand-icon">✦</span>
          <span>Career Gateway</span>
        </button>

        <nav className="app-navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activePage === item.id ? "active" : ""}
              aria-current={activePage === item.id ? "page" : undefined}
              onClick={() => openPage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="cg-account-controls">
          <span className="cg-account-name">
            👋 {student.name}
          </span>
          <button
            type="button"
            className="cg-logout-button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </header>

      {activePage === "home" && (
        <main className="cg-home">
          <section className="cg-home-hero">
            <p>WELCOME BACK, {student.name.toUpperCase()}!</p>
            <h1>
              Find a career that fits <span>you.</span>
            </h1>
            <p>
              Discover career paths, explore courses, compare options,
              and get guidance for your next step.
            </p>

            <div className="cg-home-actions">
              <button onClick={() => openPage("dashboard")}>
                Discover Careers
              </button>
              <button onClick={() => openPage("explore")}>
                Explore Courses
              </button>
              <button onClick={() => openPage("colleges")}>
                Find Colleges
              </button>
              <button onClick={() => openPage("assessment")}>
                Take Career Test
              </button>
              <button onClick={() => openPage("roadmap")}>
                View Career Roadmap
              </button>
              <button onClick={() => openPage("progress")}>
                View My Progress 📊
              </button>
            </div>
          </section>

          <section className="cg-feature-grid">
            <button onClick={() => openPage("dashboard")}>
              <span>🎯</span>
              <h2>Career Recommendations</h2>
              <p>Explore possible careers based on your interests.</p>
            </button>
            <button onClick={() => openPage("chat")}>
              <span>💬</span>
              <h2>Career Advisor</h2>
              <p>Ask questions and get career guidance.</p>
            </button>
            <button onClick={() => openPage("compare")}>
              <span>⚖️</span>
              <h2>Compare Careers</h2>
              <p>Compare career paths side by side.</p>
            </button>
            <button onClick={() => openPage("explore")}>
              <span>🎓</span>
              <h2>Courses Explorer</h2>
              <p>Discover courses, durations, and eligibility.</p>
            </button>
            <button onClick={() => openPage("colleges")}>
              <span>🏫</span>
              <h2>College Finder</h2>
              <p>Search colleges by location and course.</p>
            </button>
            <button onClick={() => openPage("assessment")}>
              <span>🧠</span>
              <h2>Career Assessment</h2>
              <p>Answer questions to discover career possibilities.</p>
            </button>
            <button onClick={() => openPage("roadmap")}>
              <span>🗺️</span>
              <h2>Career Roadmap</h2>
              <p>Track milestones as you build career skills.</p>
            </button>
            <button onClick={() => openPage("progress")}>
              <span>📊</span>
              <h2>Student Progress</h2>
              <p>Review your career goal and learning milestones.</p>
            </button>
          </section>
        </main>
      )}

      {activePage === "dashboard" && <CareerDashboard />}
      {activePage === "chat" && <CareerChatbot />}
      {activePage === "compare" && <CareerCompare />}
      {activePage === "explore" && <CareerExplore />}
      {activePage === "colleges" && <CollegeFinder />}
      {activePage === "assessment" && <CareerAssessment />}
      {activePage === "roadmap" && <CareerRoadmap />}
      {activePage === "progress" && <StudentProgress />}

      <footer className="cg-footer">
        <p>Career Gateway · Explore possibilities. Plan your future.</p>
      </footer>
    </div>
  );
}
