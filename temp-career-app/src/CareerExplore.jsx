import { useMemo, useState } from "react";
import "./CareerExplore.css";

const options = [
  {
    course: "B.Tech / B.E. Computer Engineering",
    category: "Engineering",
    duration: "4 years",
    eligibility: "12th Science with PCM; entrance requirements vary",
    careers: "Software Developer, Systems Engineer",
    subjects: ["Mathematics", "Physics", "Computer Science"],
  },
  {
    course: "B.Tech Artificial Intelligence & Machine Learning",
    category: "Engineering",
    duration: "4 years",
    eligibility: "12th Science with PCM; entrance requirements vary",
    careers: "AI Engineer, Machine Learning Engineer",
    subjects: ["Mathematics", "Physics", "Computer Science"],
  },
  {
    course: "B.Sc. Computer Science",
    category: "Science",
    duration: "Usually 3–4 years, depending on the programme",
    eligibility: "Eligibility varies by university",
    careers: "Data Analyst, Software Developer",
    subjects: ["Mathematics", "Computer Science"],
  },
  {
    course: "BCA",
    category: "Computer Applications",
    duration: "Usually 3–4 years, depending on the programme",
    eligibility: "Eligibility varies by university",
    careers: "Web Developer, Application Developer",
    subjects: ["Computer Science", "Mathematics"],
  },
  {
    course: "B.Des. UI/UX or Communication Design",
    category: "Design",
    duration: "Usually 4 years",
    eligibility: "Eligibility and entrance requirements vary",
    careers: "UI/UX Designer, Product Designer",
    subjects: ["Design", "Creativity", "Problem solving"],
  },
  {
    course: "B.Tech Mechanical Engineering",
    category: "Engineering",
    duration: "4 years",
    eligibility: "12th Science with PCM; entrance requirements vary",
    careers: "Mechanical Engineer, Design Engineer",
    subjects: ["Mathematics", "Physics"],
  },
];

export default function CareerExplore() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredOptions = useMemo(() => {
    const query = search.toLowerCase().trim();

    return options.filter((item) => {
      const matchesCategory =
        category === "All" || item.category === category;

      const searchableText = [
        item.course,
        item.category,
        item.careers,
        item.eligibility,
        ...item.subjects,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [search, category]);

  return (
    <main className="explore-page">
      <section className="explore-hero">
        <span className="explore-eyebrow">YOUR NEXT STEP</span>
        <h1>Explore Courses 🎓</h1>
        <p>
          Discover courses, understand eligibility, and connect your
          education choices with possible career paths.
        </p>
      </section>

      <section className="explore-controls">
        <input
          type="text"
          placeholder="Search courses, subjects or careers..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search courses"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter by course category"
        >
          <option value="All">All categories</option>
          <option value="Engineering">Engineering</option>
          <option value="Science">Science</option>
          <option value="Computer Applications">Computer Applications</option>
          <option value="Design">Design</option>
        </select>
      </section>

      <p className="explore-count">
        {filteredOptions.length} course
        {filteredOptions.length === 1 ? "" : "s"} found
      </p>

      <section className="explore-grid">
        {filteredOptions.map((item) => (
          <article className="explore-card" key={item.course}>
            <span className="explore-category">{item.category}</span>
            <h2>{item.course}</h2>

            <p>
              <strong>Duration:</strong> {item.duration}
            </p>
            <p>
              <strong>Eligibility:</strong> {item.eligibility}
            </p>
            <p>
              <strong>Possible careers:</strong> {item.careers}
            </p>

            <div className="explore-tags">
              {item.subjects.map((subject) => (
                <span key={subject}>{subject}</span>
              ))}
            </div>
          </article>
        ))}
      </section>

      {filteredOptions.length === 0 && (
        <div className="explore-empty">
          No courses found. Try another search or category.
        </div>
      )}

      <p className="explore-disclaimer">
        These are general examples, not verified college listings.
        Check the relevant university's official website for current
        eligibility, course duration, fees, and admission rules.
      </p>
    </main>
  );
}