
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from auth import router as auth_router
# --------------------------------------------------
# 1. CREATE THE APPLICATION
# --------------------------------------------------

app = FastAPI(title="Career Gateway API")
app.include_router(auth_router)

# --------------------------------------------------
# 2. ALLOW CONNECTIONS FROM THE REACT FRONTEND
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5176",
        "http://127.0.0.1:5176",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# 3. CHAT REQUEST FORMAT
# --------------------------------------------------

class ChatRequest(BaseModel):
    message: str
    history: list[dict] = Field(default_factory=list)


# --------------------------------------------------
# 4. HOME / HEALTH CHECK
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "Career Gateway API is running!"
    }


# --------------------------------------------------
# 5. CAREER GUIDANCE LOGIC
# --------------------------------------------------

def get_reply(message: str, history: list[dict]) -> str:

    question = message.lower().strip()

    # Find the previous assistant response
    previous_assistant = next(
        (
            item.get("text", "").lower()
            for item in reversed(history)
            if item.get("role") == "assistant"
        ),
        "",
    )

    # ----------------------------------------------
    # A. PERSONALISE BASED ON PREFERRED WORK STYLE
    # ----------------------------------------------

    if any(
        phrase in previous_assistant
        for phrase in [
            "technical problems",
            "creative work",
            "practical activities",
            "working with people",
        ]
    ):

        if any(
            word in question
            for word in ["technical", "problem-solving", "coding", "programming"]
        ):
            return (
                "Your interests may fit technical careers! 💻\n\n"
                "Here are some paths to explore:\n\n"
                "1. Software Developer\n"
                "2. AI/ML Engineer\n"
                "3. Data Analyst\n"
                "4. Electronics Engineer\n\n"
                "Next step: try a small coding project and explore "
                "which subjects and activities you enjoy most."
            )

        if any(
            word in question
            for word in ["creative", "design", "art"]
        ):
            return (
                "You may enjoy careers combining creativity and technology! 🎨\n\n"
                "Explore these options:\n\n"
                "1. UI/UX Designer\n"
                "2. Product Designer\n"
                "3. Game Designer\n"
                "4. Frontend Developer\n\n"
                "Try a small design project to discover which direction "
                "interests you."
            )

        if any(
            word in question
            for word in ["research", "science", "experiments"]
        ):
            return (
                "Research could be an interesting direction for you! 🔬\n\n"
                "Explore:\n\n"
                "1. Scientific Research\n"
                "2. Data Science\n"
                "3. AI Research\n"
                "4. Engineering Research and Development\n\n"
                "Research the qualifications and study paths for "
                "each option before deciding."
            )

        if any(
            word in question
            for word in ["people", "helping", "communication"]
        ):
            return (
                "You may enjoy careers involving communication and people! 🤝\n\n"
                "Explore:\n\n"
                "1. Teaching\n"
                "2. Technical Consulting\n"
                "3. Product Management\n"
                "4. Human Resources\n\n"
                "Your best options will depend on your interests, "
                "strengths and preferred education path."
            )

        if any(
            word in question
            for word in ["practical", "hands-on", "building", "machines"]
        ):
            return (
                "You might enjoy hands-on and practical careers! 🛠️\n\n"
                "Consider exploring:\n\n"
                "1. Mechanical Engineering\n"
                "2. Robotics Engineering\n"
                "3. Electrical Engineering\n"
                "4. Mechatronics\n\n"
                "Try a practical project to see which areas interest you."
            )

        return (
            "Thanks for sharing your preference! 😊\n\n"
            "You could explore technical, creative, research, practical "
            "or people-focused careers. Tell me which type sounds "
            "most interesting to you."
        )

    # ----------------------------------------------
    # B. SCHOLARSHIPS
    # ----------------------------------------------

    if any(
        word in question
        for word in ["scholarship", "financial aid"]
    ):
        return (
            "Let's explore scholarship opportunities! 🎓\n\n"
            "Tell me your current class or degree, preferred course "
            "and state. We can then identify relevant opportunities.\n\n"
            "Please verify eligibility and deadlines using official sources."
        )

    # ----------------------------------------------
    # C. COLLEGES AND ADMISSIONS
    # ----------------------------------------------

    if any(
        word in question
        for word in ["college", "colleges", "admission"]
    ):
        return (
            "Let's plan your college search! 🏫\n\n"
            "Tell me:\n"
            "1. Your preferred course\n"
            "2. Your preferred city or state\n"
            "3. Your approximate yearly budget\n\n"
            "We can use these details to narrow your options."
        )

    # ----------------------------------------------
    # D. ENGINEERING CAREERS
    # ----------------------------------------------

    if any(
        word in question
        for word in ["engineering", "engineer"]
    ):
        return (
            "Engineering offers several paths! 💻\n\n"
            "You could explore:\n"
            "• Computer Science Engineering\n"
            "• Information Technology\n"
            "• AI and Data Science\n"
            "• Electronics Engineering\n"
            "• Mechanical Engineering\n"
            "• Civil Engineering\n\n"
            "What class or degree are you studying, and which "
            "subjects do you enjoy most?"
        )

    # ----------------------------------------------
    # E. CAREER ROADMAP
    # ----------------------------------------------

    if any(
        word in question
        for word in ["roadmap", "career plan"]
    ):
        return (
            "Let's build your career roadmap step by step! 🗺️\n\n"
            "First, tell me your current class or degree. Then we'll "
            "discuss your interests, strengths, career options and "
            "the education needed."
        )

    # ----------------------------------------------
    # F. ANSWER TO CLASS / DEGREE QUESTION
    # ----------------------------------------------

    if any(
        phrase in previous_assistant
        for phrase in [
            "which class or degree",
            "what class",
            "current class or degree",
        ]
    ):
        return (
            f"Thanks for sharing that you're studying {message}! 🎓\n\n"
            "Which subjects do you enjoy most? For example, "
            "Mathematics, Physics, Biology, Computer Science or Art."
        )

    # ----------------------------------------------
    # G. ANSWER TO SUBJECT QUESTION
    # ----------------------------------------------

    if any(
        phrase in previous_assistant
        for phrase in [
            "which subjects",
            "what subjects",
            "subjects do you enjoy",
        ]
    ):
        return (
            f"Thanks for sharing your interests in {message}! ✨\n\n"
            "What type of work do you prefer?\n\n"
            "• Solving technical problems\n"
            "• Creative work and design\n"
            "• Research and experiments\n"
            "• Practical activities\n"
            "• Working with people"
        )

    # ----------------------------------------------
    # H. GREETINGS
    # ----------------------------------------------

    if any(
        word in question
        for word in ["hello", "hi", "hey"]
    ):
        return (
            "Hi! 👋 Welcome to Career Gateway.\n\n"
            "Which class or degree are you studying? I can help you "
            "explore careers, courses, colleges and scholarships."
        )

    # ----------------------------------------------
    # I. DEFAULT RESPONSE
    # ----------------------------------------------

    return (
        "I'd love to help you explore your options! 😊\n\n"
        "Tell me your current class or degree and what you'd like "
        "to explore: careers, courses, colleges or scholarships."
    )


# --------------------------------------------------
# 6. CHAT API ENDPOINT
# --------------------------------------------------

@app.post("/api/chat")
def chat(request: ChatRequest):

    question = request.message.strip()

    if not question:
        return {
            "reply": "Please enter a question."
        }

    reply = get_reply(
        question,
        request.history
    )

    return {
        "reply": reply
    }

from pydantic import BaseModel
from typing import List


class CareerProfile(BaseModel):
    education: str
    subjects: List[str] = []
    interests: List[str] = []
    work_styles: List[str] = []


CAREER_DATA = [
    {
        "title": "Software Developer",
        "category": "Technology",
        "description": "Build websites, applications and software systems.",
        "subjects": ["Mathematics", "Computer Science", "Physics"],
        "interests": ["Technology", "Problem solving", "Building things"],
        "work_styles": ["Technical", "Practical"],
        "skills": ["Programming", "Logical thinking", "Debugging"],
    },
    {
        "title": "AI / Machine Learning Engineer",
        "category": "Technology",
        "description": "Build intelligent systems using data and machine learning.",
        "subjects": ["Mathematics", "Computer Science", "Physics"],
        "interests": ["Technology", "Problem solving", "Research"],
        "work_styles": ["Technical", "Research"],
        "skills": ["Python", "Statistics", "Machine learning"],
    },
    {
        "title": "Cybersecurity Analyst",
        "category": "Technology",
        "description": "Help protect systems, networks and information.",
        "subjects": ["Computer Science", "Mathematics", "Physics"],
        "interests": ["Technology", "Problem solving", "Research"],
        "work_styles": ["Technical", "Research"],
        "skills": ["Networking", "Security fundamentals", "Analysis"],
    },
    {
        "title": "Data Analyst",
        "category": "Data",
        "description": "Analyse data and communicate useful insights.",
        "subjects": ["Mathematics", "Statistics", "Computer Science"],
        "interests": ["Technology", "Problem solving", "Research"],
        "work_styles": ["Technical", "Research"],
        "skills": ["SQL", "Statistics", "Data visualisation"],
    },
    {
        "title": "UI/UX Designer",
        "category": "Design",
        "description": "Design accessible and easy-to-use digital experiences.",
        "subjects": ["Art and Design", "Computer Science", "Psychology"],
        "interests": ["Creativity", "Technology", "Helping people"],
        "work_styles": ["Creative", "People-focused"],
        "skills": ["Visual design", "User research", "Prototyping"],
    },
    {
        "title": "Mechanical Engineer",
        "category": "Engineering",
        "description": "Design and improve machines and mechanical systems.",
        "subjects": ["Physics", "Mathematics", "Chemistry"],
        "interests": ["Building things", "Problem solving", "Technology"],
        "work_styles": ["Practical", "Technical"],
        "skills": ["Mechanics", "CAD", "Design thinking"],
    },
]


@app.post("/api/recommendations")
def recommend_careers(profile: CareerProfile):
    results = []

    for career in CAREER_DATA:
        matched_subjects = [
            item for item in profile.subjects
            if item in career["subjects"]
        ]
        matched_interests = [
            item for item in profile.interests
            if item in career["interests"]
        ]
        matched_styles = [
            item for item in profile.work_styles
            if item in career["work_styles"]
        ]

        # Equal contribution from each preference group that was provided.
        groups = [
            (profile.subjects, career["subjects"]),
            (profile.interests, career["interests"]),
            (profile.work_styles, career["work_styles"]),
        ]

        scores = [
            len(set(selected) & set(available)) / len(selected)
            for selected, available in groups
            if selected
        ]

        score = round(100 * sum(scores) / len(scores)) if scores else 0

        results.append({
            "title": career["title"],
            "category": career["category"],
            "description": career["description"],
            "skills": career["skills"],
            "score": score,
            "matched_subjects": matched_subjects,
            "matched_interests": matched_interests,
            "matched_work_styles": matched_styles,
        })

    results.sort(key=lambda item: item["score"], reverse=True)

    return {
        "education": profile.education,
        "recommendations": results,
        "note": (
            "These are exploratory preference matches, not a validated "
            "aptitude assessment or a prediction of career success."
        ),
    }
