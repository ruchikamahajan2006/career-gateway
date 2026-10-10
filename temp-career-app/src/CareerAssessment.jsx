
import { useState } from "react";
import "./CareerAssessment.css";

const questions = [
  {
    category: "Interests",
    question: "Which activity sounds most exciting to you?",
    options: [
      { text: "Building apps or solving technical problems", tags: ["software", "ai"] },
      { text: "Finding patterns in data and numbers", tags: ["data", "ai"] },
      { text: "Protecting systems and investigating security issues", tags: ["cyber", "software"] },
      { text: "Designing attractive and easy-to-use experiences", tags: ["design"] },
      { text: "Building or improving machines", tags: ["mechanical"] },
    ],
  },
  {
    category: "Subjects",
    question: "Which subject do you enjoy the most?",
    options: [
      { text: "Mathematics and logical reasoning", tags: ["software", "data", "ai"] },
      { text: "Computer Science and programming", tags: ["software", "ai", "cyber", "data"] },
      { text: "Physics and how things work", tags: ["mechanical"] },
      { text: "Art, creativity, and visual design", tags: ["design"] },
      { text: "I enjoy a mix of subjects", tags: ["software", "data", "design"] },
    ],
  },
  {
    category: "Strengths",
    question: "What are you naturally good at?",
    options: [
      { text: "Breaking difficult problems into smaller steps", tags: ["software", "ai", "mechanical"] },
      { text: "Finding patterns and noticing details", tags: ["data", "cyber", "ai"] },
      { text: "Coming up with creative ideas", tags: ["design"] },
      { text: "Understanding how machines and systems work", tags: ["mechanical", "cyber"] },
      { text: "Explaining ideas and understanding people", tags: ["design", "data"] },
    ],
  },
  {
    category: "Work Style",
    question: "What kind of work would you prefer?",
    options: [
      { text: "Writing code and building software", tags: ["software", "ai"] },
      { text: "Researching information and analysing data", tags: ["data", "ai"] },
      { text: "Investigating problems and security threats", tags: ["cyber"] },
      { text: "Creating designs and improving user experiences", tags: ["design"] },
      { text: "Working with physical systems and equipment", tags: ["mechanical"] },
    ],
  },
  {
    category: "Learning",
    question: "Which project would you choose?",
    options: [
      { text: "Create a website or mobile application", tags: ["software"] },
      { text: "Train a model to make predictions", tags: ["ai", "data"] },
      { text: "Test a system for security weaknesses ethically", tags: ["cyber"] },
      { text: "Design an app that is simple and beautiful", tags: ["design"] },
      { text: "Build a robot or mechanical prototype", tags: ["mechanical"] },
    ],
  },
  {
    category: "Interests",
    question: "Which problem would you most like to solve?",
    options: [
      { text: "Make software faster and more reliable", tags: ["software"] },
      { text: "Help computers learn from data", tags: ["ai"] },
      { text: "Keep people's digital information safe", tags: ["cyber"] },
      { text: "Help organisations make decisions using data", tags: ["data"] },
      { text: "Make products easier and more enjoyable to use", tags: ["design"] },
    ],
  },
  {
    category: "Strengths",
    question: "When you face a difficult challenge, you usually...",
    options: [
      { text: "Try logical solutions until something works", tags: ["software", "mechanical"] },
      { text: "Study evidence and look for patterns", tags: ["data", "ai"] },
      { text: "Investigate what went wrong and why", tags: ["cyber", "software"] },
      { text: "Imagine a new approach or solution", tags: ["design"] },
      { text: "Experiment, build, and test ideas", tags: ["mechanical", "ai"] },
    ],
  },
  {
    category: "Goals",
    question: "Which future achievement would make you happiest?",
    options: [
      { text: "Launching an application used by many people", tags: ["software"] },
      { text: "Creating useful AI or machine learning systems", tags: ["ai"] },
      { text: "Helping protect important digital systems", tags: ["cyber"] },
      { text: "Discovering insights that improve decisions", tags: ["data"] },
      { text: "Designing products people love using", tags: ["design", "mechanical"] },
    ],
  },
];

const careers = [
  {
    id: "software",
    title: "Software Developer",
    icon: "💻",
    description: "Build websites, applications, and software systems.",
    skills: ["Programming", "Problem solving", "Data structures"],
    courses: ["Computer Engineering", "Information Technology", "BCA"],
  },
  {
    id: "ai",
    title: "AI / Machine Learning Engineer",
    icon: "🤖",
    description: "Develop intelligent systems that learn from data.",
    skills: ["Python", "Mathematics", "Machine learning"],
    courses: ["Computer Engineering", "AI and Data Science", "Computer Science"],
  },
  {
    id: "data",
    title: "Data Analyst",
    icon: "📊",
    description: "Turn data into insights that help people make decisions.",
    skills: ["Statistics", "SQL", "Data visualisation"],
    courses: ["Computer Science", "Statistics", "Data Science"],
  },
  {
    id: "cyber",
    title: "Cybersecurity Analyst",
    icon: "🔐",
    description: "Help identify security risks and protect digital systems.",
    skills: ["Networking", "Security fundamentals", "Analytical thinking"],
    courses: ["Computer Engineering", "Information Technology", "Cybersecurity"],
  },
  {
    id: "design",
    title: "UI/UX Designer",
    icon: "🎨",
    description: "Design useful, accessible, and enjoyable digital experiences.",
    skills: ["Design tools", "User research", "Prototyping"],
    courses: ["Design", "Interaction Design", "Computer Science"],
  },
  {
    id: "mechanical",
    title: "Mechanical Engineer",
    icon: "⚙️",
    description: "Design, analyse, and improve machines and physical systems.",
    skills: ["Physics", "CAD", "Engineering design"],
    courses: ["Mechanical Engineering", "Mechatronics", "Robotics"],
  },
];

export default function CareerAssessment() {
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = questions[current];
  const progress = showResults
    ? 100
    : (Object.keys(answers).length / questions.length) * 100;

  const scores = careers
    .map((career) => ({
      ...career,
      score: questions.reduce((total, item, index) => {
        const selected = item.options[answers[index]];
        return total + (selected?.tags.includes(career.id) ? 1 : 0);
      }, 0),
    }))
    .sort((a, b) => b.score - a.score);

  function selectAnswer(optionIndex) {
    setAnswers((previous) => ({
      ...previous,
      [current]: optionIndex,
    }));
  }

  function nextQuestion() {
    if (answers[current] === undefined) return;

    if (current === questions.length - 1) {
      setShowResults(true);
    } else {
      setCurrent((previous) => previous + 1);
    }
  }

  function resetAssessment() {
    setAnswers({});
    setCurrent(0);
    setShowResults(false);
  }

  if (showResults) {
    const maximumScore = questions.length;

    return (
      <main className="assessment-page">
        <section className="assessment-results-hero">
          <span className="assessment-eyebrow">YOUR ASSESSMENT RESULTS</span>
          <h1>Your career possibilities ✨</h1>
          <p>
            These suggestions are based on the interests and preferences
            you selected. Explore them as starting points, not fixed decisions.
          </p>
        </section>

        <div className="assessment-progress">
          <div style={{ width: `${progress}%` }} />
        </div>

        <section className="assessment-results-list">
          {scores.filter((career) => career.score > 0).length === 0 ? (
            <p>No matches found. Try taking the assessment again.</p>
          ) : (
            scores
              .filter((career) => career.score > 0)
              .map((career, index) => (
                <article className="assessment-career-card" key={career.id}>
                  <div className="assessment-career-heading">
                    <span className="assessment-career-icon">
                      {career.icon}
                    </span>
                    <div>
                      <span className="assessment-rank">
                        {index === 0 ? "TOP MATCH" : `MATCH ${index + 1}`}
                      </span>
                      <h2>{career.title}</h2>
                    </div>
                  </div>

                  <div className="assessment-score-track">
                    <div
                      style={{
                        width: `${(career.score / maximumScore) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="assessment-score-label">
                    {career.score} of {maximumScore} answers matched
                    this career
                  </p>

                  <p>{career.description}</p>

                  <div className="assessment-detail-block">
                    <strong>Skills to explore</strong>
                    <div className="assessment-tags">
                      {career.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="assessment-detail-block">
                    <strong>Related courses</strong>
                    <div className="assessment-tags">
                      {career.courses.map((course) => (
                        <span key={course}>{course}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))
          )}
        </section>

        <div className="assessment-results-actions">
          <button
            className="assessment-primary-button"
            onClick={resetAssessment}
          >
            Retake assessment ↻
          </button>
        </div>

        <p className="assessment-disclaimer">
          This is a simple, rule-based interest assessment, not a
          scientifically validated psychometric test. Scores show how
          many selected answers matched each career's tags; they do not
          measure ability, guarantee success, or determine your future.
        </p>
      </main>
    );
  }

  return (
    <main className="assessment-page">
      <section className="assessment-hero">
        <span className="assessment-eyebrow">GET TO KNOW YOURSELF</span>
        <h1>Discover your career direction 🧭</h1>
        <p>
          Answer 8 quick questions about your interests, strengths,
          favourite subjects, and work preferences.
        </p>

        <div className="assessment-benefits">
          <span>✓ No right or wrong answers</span>
          <span>✓ Takes about 2–3 minutes</span>
          <span>✓ Explore possible career matches</span>
        </div>
      </section>

      <section className="assessment-quiz-card">
        <div className="assessment-question-top">
          <span className="assessment-category">{question.category}</span>
          <span className="assessment-question-count">
            Question {current + 1} of {questions.length}
          </span>
        </div>

        <div
          className="assessment-progress"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Assessment progress"
        >
          <div style={{ width: `${progress}%` }} />
        </div>

        <h2>{question.question}</h2>
        <p className="assessment-hint">
          Choose the option that feels most like you.
        </p>

        <div className="assessment-options">
          {question.options.map((option, index) => (
            <button
              type="button"
              key={option.text}
              className={`assessment-option ${
                answers[current] === index ? "selected" : ""
              }`}
              onClick={() => selectAnswer(index)}
              aria-pressed={answers[current] === index}
            >
              <span className="assessment-option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option.text}</span>
              <span className="assessment-option-check">
                {answers[current] === index ? "✓" : ""}
              </span>
            </button>
          ))}
        </div>

        <div className="assessment-navigation">
          <button
            type="button"
            className="assessment-back-button"
            disabled={current === 0}
            onClick={() => setCurrent((previous) => previous - 1)}
          >
            ← Previous
          </button>

          <button
            type="button"
            className="assessment-primary-button"
            disabled={answers[current] === undefined}
            onClick={nextQuestion}
          >
            {current === questions.length - 1
              ? "See my results →"
              : "Next question →"}
          </button>
        </div>
      </section>

      <p className="assessment-disclaimer">
        Your results depend on your selected answers. You can change
        your choices by going back before submitting the assessment.
      </p>
    </main>
  );
}
