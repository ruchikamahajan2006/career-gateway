
import { useState } from "react";
import "./CareerCompare.css";

const careers = [
  {
    name: "Software Developer",
    icon: "💻",
    description: "Build applications, websites and software systems.",
    education: "Computer Science, IT or a related qualification.",
    skills: ["Programming", "Problem solving", "Debugging"],
    roles: ["Frontend Developer", "Backend Developer", "Full-stack Developer"],
    roadmap: ["Learn Python or JavaScript", "Build projects", "Learn Git and databases"],
  },
  {
    name: "AI / ML Engineer",
    icon: "🤖",
    description: "Develop intelligent systems using data and machine learning.",
    education: "Computer Science, AI, Data Science or a related qualification.",
    skills: ["Python", "Mathematics", "Statistics", "Machine learning"],
    roles: ["ML Engineer", "AI Developer", "Applied AI Researcher"],
    roadmap: ["Strengthen mathematics", "Learn Python", "Build an ML project"],
  },
  {
    name: "Data Analyst",
    icon: "📊",
    description: "Analyse data and communicate useful insights.",
    education: "Data Science, Statistics, IT or another quantitative field.",
    skills: ["SQL", "Statistics", "Data visualisation"],
    roles: ["Data Analyst", "Business Analyst", "Reporting Analyst"],
    roadmap: ["Learn spreadsheets", "Practise SQL", "Create data dashboards"],
  },
  {
    name: "UI/UX Designer",
    icon: "🎨",
    description: "Design digital experiences that are accessible and easy to use.",
    education: "Design education or another suitable route with a portfolio.",
    skills: ["Visual design", "User research", "Prototyping"],
    roles: ["UI Designer", "UX Designer", "Product Designer"],
    roadmap: ["Learn design principles", "Practise wireframes", "Build a portfolio"],
  },
  {
    name: "Cybersecurity Analyst",
    icon: "🔐",
    description: "Help protect networks, systems and information.",
    education: "IT, Computer Science or cybersecurity training.",
    skills: ["Networking", "Security fundamentals", "Analysis"],
    roles: ["Security Analyst", "SOC Analyst", "Security Consultant"],
    roadmap: ["Learn networking", "Study operating systems", "Practise in legal labs"],
  },
];

function CareerColumn({ career }) {
  return (
    <article className="compare-card">
      <div className="compare-icon">{career.icon}</div>
      <h2>{career.name}</h2>
      <p>{career.description}</p>

      <h3>Education</h3>
      <p>{career.education}</p>

      <h3>Skills to develop</h3>
      <ul>
        {career.skills.map((skill) => <li key={skill}>{skill}</li>)}
      </ul>

      <h3>Possible roles</h3>
      <ul>
        {career.roles.map((role) => <li key={role}>{role}</li>)}
      </ul>

      <h3>Getting started</h3>
      <ol>
        {career.roadmap.map((step) => <li key={step}>{step}</li>)}
      </ol>
    </article>
  );
}

export default function CareerCompare() {
  const [first, setFirst] = useState("Software Developer");
  const [second, setSecond] = useState("AI / ML Engineer");

  const firstCareer = careers.find((career) => career.name === first);
  const secondCareer = careers.find((career) => career.name === second);

  return (
    <section className="compare-page">
      <div className="compare-heading">
        <span>MAKE AN INFORMED CHOICE</span>
        <h1>Compare career paths</h1>
        <p>
          Explore the differences between two careers before deciding what to
          research further.
        </p>
      </div>

      <div className="compare-controls">
        <label>
          First career
          <select value={first} onChange={(event) => setFirst(event.target.value)}>
            {careers.map((career) => (
              <option key={career.name}>{career.name}</option>
            ))}
          </select>
        </label>

        <div className="compare-vs">VS</div>

        <label>
          Second career
          <select value={second} onChange={(event) => setSecond(event.target.value)}>
            {careers.map((career) => (
              <option key={career.name}>{career.name}</option>
            ))}
          </select>
        </label>
      </div>

      {first === second ? (
        <p className="compare-warning">Choose two different careers to compare.</p>
      ) : (
        <div className="compare-grid">
          <CareerColumn career={firstCareer} />
          <CareerColumn career={secondCareer} />
        </div>
      )}

      <p className="compare-disclaimer">
        Education routes vary by institution and country. These are general
        career exploration examples, not personalised professional advice.
      </p>
    </section>
  );
}
