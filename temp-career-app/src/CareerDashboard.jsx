
import { useMemo, useState } from "react";
import "./CareerDashboard.css";

const API_URL = "http://127.0.0.1:8000/api/recommendations";

const CAREERS = [
  {
    title: "Software Developer",
    category: "Technology",
    icon: "💻",
    description: "Build websites, applications and software systems.",
    subjects: ["Mathematics", "Computer Science", "Physics"],
    interests: ["Technology", "Problem solving", "Building things"],
    work_styles: ["Technical", "Practical"],
    skills: ["Programming", "Logical thinking", "Debugging"],
    education_info:
      "Consider computer science, IT or a related degree or diploma.",
    roles: ["Frontend Developer", "Backend Developer", "Full-stack Developer"],
    pathway: [
      "Learn programming fundamentals.",
      "Build small projects.",
      "Learn Git and databases.",
      "Create a project portfolio.",
    ],
  },
  {
    title: "AI / Machine Learning Engineer",
    category: "Technology",
    icon: "🤖",
    description: "Build intelligent systems using data and machine learning.",
    subjects: ["Mathematics", "Computer Science", "Physics"],
    interests: ["Technology", "Problem solving", "Research"],
    work_styles: ["Technical", "Research"],
    skills: ["Python", "Statistics", "Machine learning"],
    education_info:
      "Explore computer science, AI, data science or a related qualification.",
    roles: ["ML Engineer", "AI Developer", "Applied AI Researcher"],
    pathway: [
      "Strengthen mathematics.",
      "Learn Python.",
      "Study statistics and machine learning.",
      "Build a machine learning project.",
    ],
  },
  {
    title: "Cybersecurity Analyst",
    category: "Technology",
    icon: "🔐",
    description: "Help protect computer systems, networks and information.",
    subjects: ["Computer Science", "Mathematics", "Physics"],
    interests: ["Technology", "Problem solving", "Research"],
    work_styles: ["Technical", "Research"],
    skills: ["Networking", "Security fundamentals", "Analytical thinking"],
    education_info:
      "Explore IT, computer science or cybersecurity education and practical training.",
    roles: ["Security Analyst", "SOC Analyst", "Security Consultant"],
    pathway: [
      "Learn networking basics.",
      "Study operating systems.",
      "Practise in authorised security labs.",
      "Build security projects.",
    ],
  },
  {
    title: "Data Analyst",
    category: "Data",
    icon: "📊",
    description: "Turn data into useful insights using analysis and visualisation.",
    subjects: ["Mathematics", "Statistics", "Computer Science"],
    interests: ["Technology", "Problem solving", "Research"],
    work_styles: ["Technical", "Research"],
    skills: ["SQL", "Statistics", "Data visualisation"],
    education_info:
      "Explore data science, statistics, economics, IT or another quantitative field.",
    roles: ["Data Analyst", "Business Analyst", "Reporting Analyst"],
    pathway: [
      "Learn spreadsheets.",
      "Practise SQL.",
      "Learn Python or R.",
      "Create data visualisation projects.",
    ],
  },
  {
    title: "UI/UX Designer",
    category: "Design",
    icon: "🎨",
    description: "Design digital products that are accessible and easy to use.",
    subjects: ["Art and Design", "Computer Science", "Psychology"],
    interests: ["Creativity", "Technology", "Helping people"],
    work_styles: ["Creative", "People-focused"],
    skills: ["Visual design", "User research", "Prototyping"],
    education_info:
      "Explore design education or another suitable route supported by a portfolio.",
    roles: ["UI Designer", "UX Designer", "Product Designer"],
    pathway: [
      "Study design principles.",
      "Learn user research.",
      "Practise wireframing and prototyping.",
      "Create a design portfolio.",
    ],
  },
  {
    title: "Mechanical Engineer",
    category: "Engineering",
    icon: "⚙️",
    description: "Design and improve machines and mechanical systems.",
    subjects: ["Physics", "Mathematics", "Chemistry"],
    interests: ["Building things", "Problem solving", "Technology"],
    work_styles: ["Practical", "Technical"],
    skills: ["Mechanics", "CAD", "Design thinking"],
    education_info:
      "Explore an appropriate mechanical engineering degree or diploma.",
    roles: ["Design Engineer", "Manufacturing Engineer", "Robotics Engineer"],
    pathway: [
      "Strengthen physics and mathematics.",
      "Learn engineering drawing.",
      "Explore CAD tools.",
      "Build practical projects.",
    ],
  },
  {
    title: "Electronics Engineer",
    category: "Engineering",
    icon: "🔌",
    description: "Work with electronic circuits, devices and embedded systems.",
    subjects: ["Physics", "Mathematics", "Computer Science"],
    interests: ["Building things", "Technology", "Problem solving"],
    work_styles: ["Technical", "Practical"],
    skills: ["Circuit analysis", "Electronics", "Embedded programming"],
    education_info:
      "Explore electronics, electrical or electronics and telecommunications qualifications.",
    roles: ["Electronics Engineer", "Embedded Engineer", "Hardware Engineer"],
    pathway: [
      "Study basic circuits.",
      "Practise circuit simulations.",
      "Learn microcontrollers.",
      "Build an electronics project.",
    ],
  },
  {
    title: "Research Scientist",
    category: "Research",
    icon: "🔬",
    description: "Investigate questions and develop evidence-based knowledge.",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics"],
    interests: ["Research", "Problem solving", "Building things"],
    work_styles: ["Research", "Technical"],
    skills: ["Scientific reasoning", "Data analysis", "Communication"],
    education_info:
      "Explore a relevant science degree. Many research careers require postgraduate study.",
    roles: ["Research Assistant", "Laboratory Scientist", "Research Scientist"],
    pathway: [
      "Explore a scientific subject.",
      "Learn research methods.",
      "Complete practical projects.",
      "Explore higher studies.",
    ],
  },
];

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Statistics",
  "Art and Design",
  "Psychology",
];

const INTEREST_OPTIONS = [
  "Technology",
  "Problem solving",
  "Creativity",
  "Research",
  "Building things",
  "Helping people",
];

const STYLE_OPTIONS = [
  "Technical",
  "Creative",
  "Research",
  "Practical",
  "People-focused",
];

function MultiSelect({ options, selected, onChange }) {
  function toggle(option) {
    onChange(
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option]
    );
  }

  return (
    <div className="cg-options">
      {options.map((option) => (
        <button
          type="button"
          key={option}
          className={`cg-chip ${selected.includes(option) ? "selected" : ""}`}
          aria-pressed={selected.includes(option)}
          onClick={() => toggle(option)}
        >
          {selected.includes(option) ? "✓ " : "+ "}
          {option}
        </button>
      ))}
    </div>
  );
}

function CareerCard({ career, onExplore }) {
  return (
    <article className="cg-career-card">
      <div className="cg-career-card-top">
        <span className="cg-career-icon">{career.icon || "✦"}</span>
        <span className="cg-category">{career.category}</span>
      </div>

      <h3>{career.title}</h3>
      <p>{career.description}</p>

      <div className="cg-match-row">
        <span>Profile match</span>
        <strong>{career.score}%</strong>
      </div>

      <div className="cg-match-track">
        <div
          className="cg-match-fill"
          style={{ width: `${career.score}%` }}
        />
      </div>

      <p className="cg-card-note">
        An exploratory match based on your selected preferences.
      </p>

      <button
        type="button"
        className="cg-button cg-button-outline"
        onClick={onExplore}
      >
        Explore career →
      </button>
    </article>
  );
}

export default function CareerDashboard() {
  const [education, setEducation] = useState("Class 12");
  const [subjects, setSubjects] = useState(["Mathematics", "Physics"]);
  const [interests, setInterests] = useState([
    "Technology",
    "Problem solving",
  ]);
  const [styles, setStyles] = useState(["Technical"]);

  const [search, setSearch] = useState("");
  const [apiCareers, setApiCareers] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [apiNote, setApiNote] = useState("");

  async function generateRecommendations(event) {
    event.preventDefault();

    setApiLoading(true);
    setApiError("");
    setSelectedCareer(null);
    setHasSearched(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          education,
          subjects,
          interests,
          work_styles: styles,
        }),
      });

      if (!response.ok) {
        throw new Error(`The server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data.recommendations)) {
        throw new Error("The API response did not contain recommendations.");
      }

      const enrichedCareers = data.recommendations.map((career) => {
        const localCareer = CAREERS.find(
          (item) => item.title === career.title
        );

        return {
          ...localCareer,
          ...career,
          icon: localCareer?.icon || "✦",
          skills: career.skills || localCareer?.skills || [],
          roles: localCareer?.roles || [],
          pathway: localCareer?.pathway || [],
          education_info: localCareer?.education_info || "",
        };
      });

      setApiCareers(enrichedCareers);
      setApiNote(data.note || "");
    } catch (error) {
      console.error("Career recommendation error:", error);
      setApiError(
        "We couldn't load recommendations from the Python backend. " +
          "Check that FastAPI is running on port 8000 and CORS allows your frontend."
      );
      setApiCareers([]);
      setApiNote("");
    } finally {
      setApiLoading(false);

      document.getElementById("cg-results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  const displayedCareers = useMemo(() => {
    const source = hasSearched && !apiError ? apiCareers : [];

    return source
      .filter((career) =>
        `${career.title} ${career.category} ${career.description}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .map((career) => ({
        ...career,
        score: Math.max(0, Math.min(100, Number(career.score) || 0)),
      }));
  }, [apiCareers, apiError, hasSearched, search]);

  return (
    <section className="cg-dashboard">
      <header className="cg-dashboard-header">
        <a href="#career-dashboard" className="cg-brand">
          <span className="cg-brand-mark">CG</span>
          <span>Career Gateway</span>
        </a>
        <span className="cg-header-label">
          Your career discovery space
        </span>
      </header>

      <div className="cg-dashboard-hero">
        <div>
          <span className="cg-eyebrow">YOUR NEXT CHAPTER</span>
          <h1>
            Discover careers that fit <span>you.</span>
          </h1>
          <p>
            Explore career possibilities based on your education, favourite
            subjects, interests and preferred work style.
          </p>
        </div>

        <div className="cg-hero-card">
          <span className="cg-hero-sparkle">✦</span>
          <h2>Your future, your choices.</h2>
          <p>
            Explore multiple pathways and decide which ones you want to learn
            more about.
          </p>
          <div className="cg-hero-pills">
            <span>Explore</span>
            <span>Compare</span>
            <span>Plan</span>
          </div>
        </div>
      </div>

      <div className="cg-dashboard-layout">
        <aside className="cg-profile-panel">
          <div className="cg-section-heading">
            <span className="cg-step-number">01</span>
            <div>
              <h2>Your student profile</h2>
              <p>Tell us about your preferences.</p>
            </div>
          </div>

          <form onSubmit={generateRecommendations}>
            <label className="cg-field-label" htmlFor="cg-education">
              Current education
            </label>

            <select
              id="cg-education"
              className="cg-select"
              value={education}
              onChange={(event) => setEducation(event.target.value)}
            >
              <option>Class 9–10</option>
              <option>Class 11</option>
              <option>Class 12</option>
              <option>Diploma</option>
              <option>Undergraduate</option>
              <option>Graduate</option>
            </select>

            <div className="cg-field">
              <span className="cg-field-label">Favourite subjects</span>
              <p className="cg-field-hint">Select all that apply.</p>
              <MultiSelect
                options={SUBJECT_OPTIONS}
                selected={subjects}
                onChange={setSubjects}
              />
            </div>

            <div className="cg-field">
              <span className="cg-field-label">Your interests</span>
              <p className="cg-field-hint">What do you enjoy?</p>
              <MultiSelect
                options={INTEREST_OPTIONS}
                selected={interests}
                onChange={setInterests}
              />
            </div>

            <div className="cg-field">
              <span className="cg-field-label">Preferred work style</span>
              <p className="cg-field-hint">How do you prefer to work?</p>
              <MultiSelect
                options={STYLE_OPTIONS}
                selected={styles}
                onChange={setStyles}
              />
            </div>

            <button
              className="cg-button cg-button-primary cg-submit"
              type="submit"
              disabled={apiLoading}
            >
              {apiLoading ? "Finding careers..." : "Find careers for me →"}
            </button>

            <p className="cg-privacy-note">
              Your selections are sent to your local Python backend to calculate
              exploratory preference matches.
            </p>
          </form>
        </aside>

        <main className="cg-results-panel" id="cg-results">
          <div className="cg-results-heading">
            <div>
              <span className="cg-eyebrow">02 · EXPLORE YOUR OPTIONS</span>
              <h2>Career possibilities</h2>
              <p>
                {hasSearched
                  ? "Explore the careers returned for your selected profile."
                  : "Complete your profile and generate your recommendations."}
              </p>
            </div>

            <span className="cg-result-count">
              {displayedCareers.length} paths
            </span>
          </div>

          <label className="cg-search-label" htmlFor="cg-search">
            Search recommendations
          </label>

          <input
            id="cg-search"
            className="cg-search"
            type="search"
            placeholder="Try software, engineering, data..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {apiLoading && (
            <div className="cg-status-message" role="status">
              ✨ Finding career paths that match your profile...
            </div>
          )}

          {apiError && (
            <div className="cg-error-message" role="alert">
              <strong>Couldn't load recommendations</strong>
              <p>{apiError}</p>
              <button
                type="button"
                className="cg-button cg-button-outline"
                onClick={() =>
                  document
                    .querySelector(".cg-submit")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" })
                }
              >
                Check profile and try again
              </button>
            </div>
          )}

          {!hasSearched && (
            <div className="cg-intro-note">
              <span>✦</span>
              <div>
                <strong>Start with your interests</strong>
                <p>
                  Select your preferences and press Find careers for me to
                  request recommendations from your Python API.
                </p>
              </div>
            </div>
          )}

          {hasSearched && !apiLoading && !apiError && apiNote && (
            <div className="cg-intro-note">
              <span>ℹ</span>
              <div>
                <strong>About your results</strong>
                <p>{apiNote}</p>
              </div>
            </div>
          )}

          <div className="cg-career-grid">
            {displayedCareers.map((career, index) => (
              <CareerCard
                key={career.title || index}
                career={career}
                onExplore={() => setSelectedCareer(career)}
              />
            ))}
          </div>

          {hasSearched &&
            !apiLoading &&
            !apiError &&
            displayedCareers.length === 0 && (
              <div className="cg-empty-state">
                <span>🔎</span>
                <h3>No matching careers found</h3>
                <p>Try a different search term or update your preferences.</p>
              </div>
            )}

          {selectedCareer && (
            <section className="cg-detail-panel" aria-live="polite">
              <button
                type="button"
                className="cg-close"
                onClick={() => setSelectedCareer(null)}
                aria-label="Close career details"
              >
                ×
              </button>

              <span className="cg-eyebrow">CAREER EXPLORER</span>
              <h2>
                {selectedCareer.icon} {selectedCareer.title}
              </h2>
              <p>{selectedCareer.description}</p>

              <h3>Skills to explore</h3>
              <div className="cg-options">
                {(selectedCareer.skills || []).map((skill) => (
                  <span className="cg-chip selected" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>

              <h3>Education route</h3>
              <p>
                {selectedCareer.education_info ||
                  "Research the qualifications and entry requirements for this career."}
              </p>

              <h3>Possible roles</h3>
              {selectedCareer.roles?.length ? (
                <ul className="cg-detail-list">
                  {selectedCareer.roles.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              ) : (
                <p>Explore related roles in this career area.</p>
              )}

              <h3>Your starter roadmap</h3>
              {selectedCareer.pathway?.length ? (
                <ol className="cg-roadmap">
                  {selectedCareer.pathway.map((step, index) => (
                    <li key={step}>
                      <span>{index + 1}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p>
                  Start by researching this role, its qualifications, and
                  beginner projects.
                </p>
              )}

              <p className="cg-disclaimer">
                These are exploratory matches, not validated aptitude scores or
                predictions of future success. Verify course requirements and
                career information with official sources.
              </p>
            </section>
          )}
        </main>
      </div>

      <footer className="cg-dashboard-footer">
        <strong>Career Gateway</strong>
        <p>
          AI for access. Counsellors for guidance. Professionals for experience.
        </p>
      </footer>
    </section>
  );
}

