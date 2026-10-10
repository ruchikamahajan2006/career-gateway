
import { useEffect, useMemo, useState } from "react";
import "./StudentProgress.css";

const ROADMAP_KEY = "career-gateway-roadmap-progress-v1";
const GOAL_KEY = "career-gateway-student-goal-v1";
const ASSESSMENT_KEY = "career-gateway-assessment-completed-v1";

const careers = [
  { id: "software", title: "Software Developer", icon: "💻", tasks: 12 },
  { id: "ai", title: "AI / Machine Learning Engineer", icon: "🤖", tasks: 12 },
  { id: "data", title: "Data Analyst", icon: "📊", tasks: 12 },
  { id: "cyber", title: "Cybersecurity Analyst", icon: "🔐", tasks: 12 },
  { id: "design", title: "UI/UX Designer", icon: "🎨", tasks: 12 },
  { id: "mechanical", title: "Mechanical Engineer", icon: "⚙️", tasks: 12 },
];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export default function StudentProgress() {
  const [careerId, setCareerId] = useState(() =>
    readStorage(GOAL_KEY, "software")
  );
  const [roadmapProgress, setRoadmapProgress] = useState(() =>
    readStorage(ROADMAP_KEY, {})
  );
  const [assessmentCompleted, setAssessmentCompleted] = useState(() =>
    readStorage(ASSESSMENT_KEY, false) === true
  );

  const career =
    careers.find((item) => item.id === careerId) || careers[0];

  useEffect(() => {
    try {
      localStorage.setItem(GOAL_KEY, JSON.stringify(careerId));
    } catch {
      // The dashboard still works if browser storage is unavailable.
    }
  }, [careerId]);

  useEffect(() => {
    function refreshProgress() {
      setRoadmapProgress(readStorage(ROADMAP_KEY, {}));
      setAssessmentCompleted(readStorage(ASSESSMENT_KEY, false) === true);
    }

    window.addEventListener("focus", refreshProgress);
    window.addEventListener("storage", refreshProgress);

    return () => {
      window.removeEventListener("focus", refreshProgress);
      window.removeEventListener("storage", refreshProgress);
    };
  }, []);

  const completedTasks = useMemo(() => {
    return Object.keys(roadmapProgress).filter((taskId) => {
      return (
        taskId.startsWith(`${career.id}-`) &&
        roadmapProgress[taskId] === true
      );
    }).length;
  }, [career.id, roadmapProgress]);

  const totalTasks = career.tasks;
  const remainingTasks = Math.max(totalTasks - completedTasks, 0);
  const percentage = Math.min(
    100,
    Math.round((completedTasks / totalTasks) * 100)
  );

  function updateAssessmentStatus(checked) {
    setAssessmentCompleted(checked);

    try {
      localStorage.setItem(ASSESSMENT_KEY, JSON.stringify(checked));
    } catch {
      // Keep the current session usable if storage is unavailable.
    }
  }

  function refreshNow() {
    setRoadmapProgress(readStorage(ROADMAP_KEY, {}));
    setAssessmentCompleted(readStorage(ASSESSMENT_KEY, false) === true);
  }

  return (
    <main className="student-progress-page">
      <section className="student-progress-hero">
        <span className="student-progress-eyebrow">
          YOUR PERSONAL LEARNING SPACE
        </span>
        <h1>Your progress, your future 📈</h1>
        <p>
          Keep track of your career goal, celebrate completed milestones,
          and decide what to work on next.
        </p>

        <div className="student-progress-hero-actions">
          <button
            type="button"
            onClick={refreshNow}
            className="progress-primary-button"
          >
            ↻ Refresh progress
          </button>
        </div>
      </section>

      <section className="student-progress-stats">
        <article className="student-progress-stat">
          <span className="progress-stat-icon">🗺️</span>
          <p>Roadmap completion</p>
          <strong>{percentage}%</strong>
          <span className="progress-stat-caption">
            For your selected career
          </span>
        </article>

        <article className="student-progress-stat">
          <span className="progress-stat-icon">✅</span>
          <p>Tasks completed</p>
          <strong>{completedTasks}</strong>
          <span className="progress-stat-caption">
            Out of {totalTasks} roadmap tasks
          </span>
        </article>

        <article className="student-progress-stat">
          <span className="progress-stat-icon">📝</span>
          <p>Tasks remaining</p>
          <strong>{remainingTasks}</strong>
          <span className="progress-stat-caption">
            Small steps add up
          </span>
        </article>

        <article className="student-progress-stat">
          <span className="progress-stat-icon">🧠</span>
          <p>Career assessment</p>
          <strong>{assessmentCompleted ? "Done" : "Pending"}</strong>
          <span className="progress-stat-caption">
            Update this below
          </span>
        </article>
      </section>

      <section className="student-progress-card">
        <div className="student-progress-section-heading">
          <div>
            <span className="progress-section-label">YOUR CAREER GOAL</span>
            <h2>What are you working towards?</h2>
            <p>
              Choose the career whose roadmap you want to track.
            </p>
          </div>
          <span className="progress-large-icon">{career.icon}</span>
        </div>

        <label
          className="progress-field-label"
          htmlFor="student-career-goal"
        >
          Selected career
        </label>

        <select
          id="student-career-goal"
          className="progress-career-select"
          value={career.id}
          onChange={(event) => setCareerId(event.target.value)}
        >
          {careers.map((item) => (
            <option key={item.id} value={item.id}>
              {item.icon} {item.title}
            </option>
          ))}
        </select>

        <div className="student-progress-bar-heading">
          <strong>Roadmap progress</strong>
          <span>{completedTasks} / {totalTasks} tasks</span>
        </div>

        <div
          className="student-progress-bar"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Selected career roadmap progress"
        >
          <div style={{ width: `${percentage}%` }} />
        </div>

        <p className="progress-motivation">
          {percentage === 100
            ? "Amazing work! You have completed every task in this roadmap. 🎉"
            : percentage >= 50
            ? "You're making progress. Keep going, one task at a time! 🌟"
            : completedTasks > 0
            ? "Nice start! Keep building momentum with your next task. 💪"
            : "Your journey starts with one task. Open your roadmap and begin! 🚀"}
        </p>
      </section>

      <section className="student-progress-card">
        <span className="progress-section-label">ASSESSMENT CHECK-IN</span>
        <h2>Have you completed your career assessment?</h2>
        <p>
          Take the Career Assessment page first. Then mark it complete here
          to track it on your dashboard.
        </p>

        <label className="progress-assessment-check">
          <input
            type="checkbox"
            checked={assessmentCompleted}
            onChange={(event) =>
              updateAssessmentStatus(event.target.checked)
            }
          />
          <span>
            I have completed the Career Assessment
          </span>
        </label>

        <p className="progress-small-note">
          This check-in is saved in this browser. It is not automatically
          verified against your assessment answers.
        </p>
      </section>

      <section className="student-progress-next">
        <div>
          <span className="progress-section-label">YOUR NEXT STEP</span>
          <h2>Progress comes from practice.</h2>
          <p>
            Open your roadmap, tick off a task when you finish it, and
            return here to see your updated progress.
          </p>
        </div>
        <div className="progress-next-steps">
          <div><span>1</span> Choose your career goal</div>
          <div><span>2</span> Complete a roadmap task</div>
          <div><span>3</span> Refresh this dashboard</div>
        </div>
      </section>
    </main>
  );
}
