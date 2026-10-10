
import { useEffect, useState } from "react";
import "./CareerRoadmap.css";

const roadmaps = {
  software: {
    title: "Software Developer",
    icon: "💻",
    description: "Learn to build websites, applications, and reliable software.",
    duration: "Suggested plan: 6–12 months",
    stages: [
      {
        title: "Build your foundations",
        time: "Weeks 1–4",
        description: "Understand programming basics and problem solving.",
        tasks: [
          "Learn variables, conditions, loops, and functions",
          "Practise basic problems using Python or Java",
          "Learn Git and GitHub fundamentals",
        ],
      },
      {
        title: "Learn core development skills",
        time: "Months 2–3",
        description: "Learn how applications are built and maintained.",
        tasks: [
          "Practise data structures and algorithms",
          "Learn HTML, CSS, and JavaScript",
          "Understand APIs and databases",
        ],
      },
      {
        title: "Build real projects",
        time: "Months 4–6",
        description: "Turn your knowledge into practical work.",
        tasks: [
          "Build a responsive personal portfolio",
          "Create a full-stack application",
          "Upload your projects to GitHub",
        ],
      },
      {
        title: "Prepare for opportunities",
        time: "Ongoing",
        description: "Prepare to demonstrate your skills.",
        tasks: [
          "Practise coding interview questions",
          "Write a clear technical resume",
          "Apply for suitable internships and entry-level roles",
        ],
      },
    ],
  },

  ai: {
    title: "AI / Machine Learning Engineer",
    icon: "🤖",
    description: "Learn how to create intelligent systems using data and algorithms.",
    duration: "Suggested plan: 9–18 months",
    stages: [
      {
        title: "Strengthen the foundations",
        time: "Months 1–2",
        description: "Build the mathematics and programming knowledge needed for AI.",
        tasks: [
          "Learn Python fundamentals",
          "Revise algebra, functions, and probability",
          "Practise NumPy and Pandas",
        ],
      },
      {
        title: "Learn machine learning",
        time: "Months 3–5",
        description: "Understand how models learn from examples.",
        tasks: [
          "Study supervised and unsupervised learning",
          "Practise regression and classification",
          "Learn model evaluation and overfitting",
        ],
      },
      {
        title: "Build AI projects",
        time: "Months 6–9",
        description: "Apply your learning to real datasets.",
        tasks: [
          "Build a prediction model",
          "Create a recommendation or classification project",
          "Document your experiments on GitHub",
        ],
      },
      {
        title: "Deploy and prepare",
        time: "Ongoing",
        description: "Learn to make your models useful to other people.",
        tasks: [
          "Learn FastAPI or another serving framework",
          "Build a simple interface for a model",
          "Practise explaining your model and its limitations",
        ],
      },
    ],
  },

  data: {
    title: "Data Analyst",
    icon: "📊",
    description: "Use data to discover patterns and support better decisions.",
    duration: "Suggested plan: 4–9 months",
    stages: [
      {
        title: "Learn data fundamentals",
        time: "Month 1",
        description: "Understand datasets and basic analysis.",
        tasks: [
          "Practise spreadsheets and formulas",
          "Learn descriptive statistics",
          "Understand data cleaning",
        ],
      },
      {
        title: "Master analysis tools",
        time: "Months 2–3",
        description: "Learn tools used for querying and analysing data.",
        tasks: [
          "Learn SQL queries and joins",
          "Practise Pandas in Python",
          "Learn charts and data visualisation",
        ],
      },
      {
        title: "Create a portfolio",
        time: "Months 4–5",
        description: "Demonstrate how you turn data into insights.",
        tasks: [
          "Analyse a public dataset",
          "Build a dashboard",
          "Write a report with evidence-based findings",
        ],
      },
      {
        title: "Prepare for roles",
        time: "Ongoing",
        description: "Practise presenting your analysis clearly.",
        tasks: [
          "Practise SQL and analytical questions",
          "Prepare two or three portfolio projects",
          "Apply for relevant internships and junior roles",
        ],
      },
    ],
  },

  cyber: {
    title: "Cybersecurity Analyst",
    icon: "🔐",
    description: "Develop skills to identify threats and protect digital systems.",
    duration: "Suggested plan: 6–12 months",
    stages: [
      {
        title: "Learn IT fundamentals",
        time: "Months 1–2",
        description: "Understand the systems you want to protect.",
        tasks: [
          "Learn networking fundamentals",
          "Understand operating systems and Linux basics",
          "Learn basic command-line tools",
        ],
      },
      {
        title: "Study security basics",
        time: "Months 3–4",
        description: "Learn how common security risks are identified and reduced.",
        tasks: [
          "Understand authentication and access control",
          "Study common web security risks",
          "Learn logs, monitoring, and incident response basics",
        ],
      },
      {
        title: "Practise in safe labs",
        time: "Months 5–6",
        description: "Build practical experience in authorised environments.",
        tasks: [
          "Use beginner-friendly cybersecurity labs",
          "Practise analysing sample security logs",
          "Write reports about findings and mitigations",
        ],
      },
      {
        title: "Build your portfolio",
        time: "Ongoing",
        description: "Demonstrate responsible security skills.",
        tasks: [
          "Document lab exercises and defensive projects",
          "Learn incident investigation workflows",
          "Prepare for relevant internships and certifications",
        ],
      },
    ],
  },

  design: {
    title: "UI/UX Designer",
    icon: "🎨",
    description: "Create digital products that are useful, accessible, and easy to use.",
    duration: "Suggested plan: 4–8 months",
    stages: [
      {
        title: "Learn design fundamentals",
        time: "Month 1",
        description: "Understand what makes interfaces clear and usable.",
        tasks: [
          "Study layout, typography, and colour",
          "Learn usability and accessibility basics",
          "Explore a design tool such as Figma",
        ],
      },
      {
        title: "Understand users",
        time: "Months 2–3",
        description: "Learn to design around real user needs.",
        tasks: [
          "Create user personas and user flows",
          "Sketch wireframes",
          "Design interactive prototypes",
        ],
      },
      {
        title: "Build case studies",
        time: "Months 3–5",
        description: "Show your design process, not just the final screens.",
        tasks: [
          "Redesign a small app experience",
          "Test a prototype with users",
          "Document the problem, process, and decisions",
        ],
      },
      {
        title: "Prepare your portfolio",
        time: "Ongoing",
        description: "Present your work clearly and professionally.",
        tasks: [
          "Create a portfolio website",
          "Practise explaining design decisions",
          "Apply for suitable design internships",
        ],
      },
    ],
  },

  mechanical: {
    title: "Mechanical Engineer",
    icon: "⚙️",
    description: "Understand and design machines, products, and physical systems.",
    duration: "Suggested plan: 6–12 months for supplementary skills",
    stages: [
      {
        title: "Strengthen engineering foundations",
        time: "Months 1–2",
        description: "Build a strong base in mathematics and physics.",
        tasks: [
          "Revise mechanics and basic engineering mathematics",
          "Understand materials and manufacturing fundamentals",
          "Practise technical drawing",
        ],
      },
      {
        title: "Learn design tools",
        time: "Months 3–4",
        description: "Develop practical computer-aided design skills.",
        tasks: [
          "Learn a CAD tool",
          "Create and dimension 2D drawings",
          "Model simple 3D components",
        ],
      },
      {
        title: "Complete practical projects",
        time: "Months 5–6",
        description: "Connect theory with engineering applications.",
        tasks: [
          "Design a simple mechanical assembly",
          "Document calculations and design choices",
          "Study basic manufacturing and testing methods",
        ],
      },
      {
        title: "Prepare for industry",
        time: "Ongoing",
        description: "Build experience relevant to your preferred specialisation.",
        tasks: [
          "Explore simulation or manufacturing tools",
          "Document academic and personal projects",
          "Look for relevant internships and practical training",
        ],
      },
    ],
  },
};

const STORAGE_KEY = "career-gateway-roadmap-progress-v1";

function readProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export default function CareerRoadmap() {
  const [careerId, setCareerId] = useState("software");
  const [progress, setProgress] = useState(readProgress);

  const roadmap = roadmaps[careerId];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // The roadmap remains usable if browser storage is unavailable.
    }
  }, [progress]);

  const tasks = roadmap.stages.flatMap((stage, stageIndex) =>
    stage.tasks.map((task, taskIndex) => ({
      id: `${careerId}-${stageIndex}-${taskIndex}`,
      stageIndex,
      task,
    }))
  );

  const completedCount = tasks.filter(
    (task) => progress[task.id]
  ).length;

  const percentage = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  function toggleTask(taskId) {
    setProgress((previous) => ({
      ...previous,
      [taskId]: !previous[taskId],
    }));
  }

  function resetCareerProgress() {
    setProgress((previous) => {
      const updated = { ...previous };

      tasks.forEach((task) => {
        delete updated[task.id];
      });

      return updated;
    });
  }

  return (
    <main className="roadmap-page">
      <section className="roadmap-hero">
        <span className="roadmap-eyebrow">YOUR FUTURE, STEP BY STEP</span>
        <h1>Build your career roadmap 🗺️</h1>
        <p>
          Choose a career, follow practical learning milestones,
          and track your progress as you build your skills.
        </p>

        <label className="roadmap-select-label" htmlFor="roadmap-career">
          Choose your career path
        </label>

        <select
          id="roadmap-career"
          className="roadmap-career-select"
          value={careerId}
          onChange={(event) => setCareerId(event.target.value)}
        >
          {Object.entries(roadmaps).map(([id, career]) => (
            <option key={id} value={id}>
              {career.icon} {career.title}
            </option>
          ))}
        </select>
      </section>

      <section className="roadmap-progress-card">
        <div className="roadmap-progress-heading">
          <div>
            <span className="roadmap-small-label">YOUR PROGRESS</span>
            <h2>{roadmap.icon} {roadmap.title}</h2>
            <p>{roadmap.duration}</p>
          </div>

          <div className="roadmap-percentage">{percentage}%</div>
        </div>

        <div
          className="roadmap-progress-track"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Career roadmap completion"
        >
          <div style={{ width: `${percentage}%` }} />
        </div>

        <div className="roadmap-progress-footer">
          <span>{completedCount} of {tasks.length} tasks completed</span>
          <button
            type="button"
            onClick={resetCareerProgress}
            disabled={completedCount === 0}
          >
            Reset progress
          </button>
        </div>
      </section>

      <section className="roadmap-intro">
        <h2>Your learning journey</h2>
        <p>{roadmap.description}</p>
      </section>

      <section className="roadmap-timeline">
        {roadmap.stages.map((stage, stageIndex) => {
          const stageTasks = tasks.filter(
            (task) => task.stageIndex === stageIndex
          );

          const stageCompleted = stageTasks.filter(
            (task) => progress[task.id]
          ).length;

          const stageFinished =
            stageCompleted === stageTasks.length;

          return (
            <article
              className="roadmap-stage"
              key={`${careerId}-${stage.title}`}
            >
              <div className="roadmap-stage-marker">
                {stageFinished ? "✓" : stageIndex + 1}
              </div>

              <div className="roadmap-stage-card">
                <div className="roadmap-stage-heading">
                  <div>
                    <span className="roadmap-stage-time">{stage.time}</span>
                    <h3>{stage.title}</h3>
                  </div>

                  <span
                    className={`roadmap-stage-count ${
                      stageFinished ? "completed" : ""
                    }`}
                  >
                    {stageCompleted}/{stageTasks.length}
                  </span>
                </div>

                <p className="roadmap-stage-description">
                  {stage.description}
                </p>

                <div className="roadmap-task-list">
                  {stageTasks.map((task) => (
                    <label
                      className={`roadmap-task ${
                        progress[task.id] ? "task-complete" : ""
                      }`}
                      key={task.id}
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(progress[task.id])}
                        onChange={() => toggleTask(task.id)}
                      />
                      <span>{task.task}</span>
                    </label>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <aside className="roadmap-tip">
        <span>💡</span>
        <div>
          <strong>Remember: consistency beats speed.</strong>
          <p>
            These are suggested learning milestones, not guaranteed
            timelines. Adjust them to your education, schedule, and goals.
            You don't need to finish everything in one go.
          </p>
        </div>
      </aside>
    </main>
  );
}
