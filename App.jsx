
import { useState } from "react";
import "./App.css";

const options = [
  "Choosing a career",
  "Choosing a course",
  "Finding colleges",
  "Scholarships",
  "Talk to a professional",
  "Build my career roadmap",
];

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function sendMessage(text = message) {
    const question = text.trim();
    if (!question) return;

    setMessages((old) => [
      ...old,
      { role: "student", text: question },
      {
        role: "assistant",
        text: "Let's explore that together! Which class are you studying, and what subjects do you enjoy?",
      },
    ]);

    setMessage("");
  }

  function startChat() {
    document
      .getElementById("assistant")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">CG</span>
          Career Gateway
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#careers">Explore careers</a>
          <a href="#opportunities">Opportunities</a>
        </nav>

        <button className="primary-button" onClick={startChat}>
          Get started →
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div>
            <span className="eyebrow">YOUR FUTURE, MADE CLEARER</span>
            <h1>
              Your future starts
              <br />
              with <span>one conversation.</span>
            </h1>
            <p>
              Discover careers, explore courses, find colleges
              and build a roadmap that fits your interests.
            </p>
            <button className="primary-button" onClick={startChat}>
              Meet your career assistant →
            </button>
            <p className="trust-note">
              Explore possibilities. Make informed decisions.
            </p>
          </div>

          <div className="hero-card">
            <div className="card-top">
              <span className="bot-avatar">✦</span>
              <div>
                <strong>Gateway Advisor</strong>
                <p>Your career exploration companion</p>
              </div>
              <span className="online-dot" />
            </div>

            <div className="welcome-message">
              <strong>Hi there! 👋</strong>
              <p>
                You don't need to have your entire future
                figured out. Let's discover your options.
              </p>
            </div>

            <span className="mini-label">
              WHAT WOULD YOU LIKE HELP WITH?
            </span>

            {options.map((option) => (
              <button
                className="suggestion"
                key={option}
                onClick={() => sendMessage(option)}
              >
                {option} <span>↗</span>
              </button>
            ))}
          </div>
        </section>

        <section className="features" id="careers">
          <div className="section-heading">
            <span>EXPLORE YOUR POSSIBILITIES</span>
            <h2>Find a path that feels right for you.</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <span className="feature-icon">✦</span>
              <h3>Discover careers</h3>
              <p>
                Explore career paths, required skills and
                future job opportunities.
              </p>
            </article>

            <article className="feature-card">
              <span className="feature-icon">⌂</span>
              <h3>Find courses & colleges</h3>
              <p>
                Explore courses, fees, eligibility and
                admission requirements.
              </p>
            </article>

            <article className="feature-card" id="opportunities">
              <span className="feature-icon">◇</span>
              <h3>Find opportunities</h3>
              <p>
                Discover scholarships, internships and
                skill-development programs.
              </p>
            </article>
          </div>
        </section>

        <section className="assistant-section" id="assistant">
          <div>
            <span className="eyebrow">LET'S START WITH YOU</span>
            <h2>Your career journey begins here.</h2>
            <p>
              Tell us what you're curious about. We'll explore
              your options one step at a time.
            </p>
          </div>

          <div className="chat-box">
            <div className="card-top">
              <span className="bot-avatar">✦</span>
              <div>
                <strong>Gateway Advisor</strong>
                <p>Career exploration demo</p>
              </div>
            </div>

            <div className="chat-messages">
              <div className="chat-bubble assistant">
                Welcome to Career Gateway! What would you
                like to explore today?
              </div>

              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${item.role}`}
                >
                  {item.text}
                </div>
              ))}
            </div>

            <form
              className="chat-input"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask about a career or course..."
                aria-label="Your message"
              />
              <button className="primary-button" type="submit">
                Send ↑
              </button>
            </form>

            <p className="demo-note">
              Demo responses only · Real AI comes later
            </p>
          </div>
        </section>
      </main>

      <footer>
        <strong>Career Gateway</strong>
        <p>
          AI for access. Counsellors for guidance.
          Professionals for experience.
        </p>
      </footer>
    </div>
  );
}
