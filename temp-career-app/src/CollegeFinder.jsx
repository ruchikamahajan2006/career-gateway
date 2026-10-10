
import { useMemo, useState } from "react";
import "./CollegeFinder.css";

const colleges = [
  {
    id: 1,
    name: "COEP Technological University",
    city: "Pune",
    type: "Government",
    courses: ["Computer Science", "Mechanical", "Civil", "Electrical"],
    description:
      "A public technological university offering undergraduate engineering programmes.",
    website:
      "https://www.coeptech.ac.in/admissions/undergraduate/",
    emoji: "🏛️",
  },
  {
    id: 2,
    name: "Pune Institute of Computer Technology (PICT)",
    city: "Pune",
    type: "Private",
    courses: [
      "Computer Engineering",
      "Information Technology",
      "AI and Data Science",
      "Electronics and Telecommunication",
    ],
    description:
      "Explore computing and technology-related undergraduate programmes.",
    website: "https://admissions.pict.edu/",
    emoji: "💻",
  },
  {
    id: 3,
    name: "Pimpri Chinchwad College of Engineering",
    city: "Pimpri-Chinchwad",
    type: "Private",
    courses: [
      "Computer Engineering",
      "Mechanical",
      "Civil",
      "AI and Data Science",
    ],
    description:
      "An engineering college in the Pimpri-Chinchwad area of Pune.",
    website: "https://www.pccoepune.com/",
    emoji: "🎓",
  },
  {
    id: 4,
    name: "Vishwakarma Institute of Technology",
    city: "Pune",
    type: "Private",
    courses: [
      "Computer Engineering",
      "Information Technology",
      "Mechanical",
      "Electronics",
    ],
    description:
      "Explore engineering programmes and official admission information.",
    website: "https://www.vit.edu/",
    emoji: "🔬",
  },
  {
    id: 5,
    name: "MIT World Peace University",
    city: "Pune",
    type: "Private",
    courses: [
      "Computer Engineering",
      "Mechanical",
      "Civil",
      "Electronics",
    ],
    description:
      "Explore university programmes, eligibility, and admission options.",
    website: "https://mitwpu.edu.in/",
    emoji: "🌟",
  },
];

export default function CollegeFinder() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [type, setType] = useState("All");
  const [course, setCourse] = useState("All");

  const filteredColleges = useMemo(() => {
    const query = search.trim().toLowerCase();

    return colleges.filter((college) => {
      const matchesSearch = [
        college.name,
        college.city,
        college.type,
        ...college.courses,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

      const matchesCity =
        city === "All" || college.city === city;

      const matchesType =
        type === "All" || college.type === type;

      const matchesCourse =
        course === "All" || college.courses.includes(course);

      return (
        matchesSearch &&
        matchesCity &&
        matchesType &&
        matchesCourse
      );
    });
  }, [search, city, type, course]);

  function resetFilters() {
    setSearch("");
    setCity("All");
    setType("All");
    setCourse("All");
  }

  return (
    <main className="college-page">
      <section className="college-hero">
        <span className="college-eyebrow">FIND YOUR NEXT CAMPUS</span>
        <h1>Discover your dream college 🎓</h1>
        <p>
          Search colleges, explore engineering courses, and find
          official admission information in one place.
        </p>

        <div className="college-hero-stats">
          <div>
            <strong>{colleges.length}</strong>
            <span>College listings</span>
          </div>
          <div>
            <strong>{new Set(colleges.map((c) => c.city)).size}</strong>
            <span>Locations</span>
          </div>
          <div>
            <strong>{new Set(colleges.flatMap((c) => c.courses)).size}</strong>
            <span>Course options</span>
          </div>
        </div>
      </section>

      <section className="college-search-section">
        <h2>Find colleges that match you</h2>
        <p>Use the search box and filters to narrow your options.</p>

        <div className="college-filters">
          <input
            type="search"
            placeholder="🔎 Search college, city or course..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search colleges"
          />

          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            aria-label="Filter by city"
          >
            <option value="All">All locations</option>
            <option value="Pune">Pune</option>
            <option value="Pimpri-Chinchwad">Pimpri-Chinchwad</option>
          </select>

          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            aria-label="Filter by college type"
          >
            <option value="All">All college types</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
          </select>

          <select
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            aria-label="Filter by course"
          >
            <option value="All">All courses</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="AI and Data Science">AI and Data Science</option>
            <option value="Mechanical">Mechanical Engineering</option>
            <option value="Civil">Civil Engineering</option>
            <option value="Electrical">Electrical Engineering</option>
            <option value="Electronics">Electronics</option>
            <option value="Electronics and Telecommunication">
              Electronics and Telecommunication
            </option>
          </select>

          <button
            className="college-reset-button"
            type="button"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </div>
      </section>

      <section className="college-results">
        <div className="college-results-heading">
          <div>
            <h2>Explore colleges</h2>
            <p>
              {filteredColleges.length} result
              {filteredColleges.length === 1 ? "" : "s"} found
            </p>
          </div>
        </div>

        {filteredColleges.length > 0 ? (
          <div className="college-grid">
            {filteredColleges.map((college) => (
              <article className="college-card" key={college.id}>
                <div className="college-card-top">
                  <div className="college-icon">{college.emoji}</div>
                  <span
                    className={`college-type ${
                      college.type === "Government"
                        ? "government"
                        : "private"
                    }`}
                  >
                    {college.type}
                  </span>
                </div>

                <h3>{college.name}</h3>

                <p className="college-location">
                  <span>📍</span> {college.city}
                </p>

                <p className="college-description">
                  {college.description}
                </p>

                <div className="college-course-heading">
                  Courses listed in this demo
                </div>

                <div className="college-course-tags">
                  {college.courses.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <a
                  className="college-website-button"
                  href={college.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Official website <span>↗</span>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="college-no-results">
            <span>🔍</span>
            <h3>No colleges found</h3>
            <p>Try changing your search or filters.</p>
            <button type="button" onClick={resetFilters}>
              Show all colleges
            </button>
          </div>
        )}
      </section>

      <aside className="college-notice">
        <strong>Before you apply</strong>
        <p>
          Course availability, eligibility, entrance examinations,
          fees, scholarships, and cutoffs can change each year.
          These course tags are illustrative, not a verified current
          course list for each institution. Check the official college
          website and the Maharashtra State CET Cell for current
          admission information. This page does not rank colleges.
        </p>
      </aside>
    </main>
  );
}
