
import os
import re
import sqlite3
from datetime import datetime, timedelta, timezone
from pathlib import Path

import jwt
from pwdlib import PasswordHash
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, Field


router = APIRouter(prefix="/api/auth", tags=["Student Authentication"])

DATABASE_PATH = Path(__file__).with_name("career_gateway_users.db")

# Set JWT_SECRET_KEY in your environment before deploying.
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not SECRET_KEY:
    SECRET_KEY = "local-development-only-change-this-secret-before-deploying"

ALGORITHM = "HS256"
TOKEN_HOURS = 8

password_hasher = PasswordHash.recommended()
bearer_scheme = HTTPBearer(auto_error=False)


def connect_db():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialise_database():
    with connect_db() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE COLLATE NOCASE,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )


initialise_database()


class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: str = Field(min_length=5, max_length=254)
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: str = Field(min_length=5, max_length=254)
    password: str = Field(min_length=1, max_length=128)


def normalise_email(email: str) -> str:
    email = email.strip().lower()
    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Enter a valid email address.",
        )
    return email


def public_student(row):
    return {
        "id": row["id"],
        "name": row["name"],
        "email": row["email"],
        "created_at": row["created_at"],
    }


def create_access_token(student_id: int) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(student_id),
        "iat": now,
        "exp": now + timedelta(hours=TOKEN_HOURS),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_student(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please log in to continue.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        payload = jwt.decode(
            credentials.credentials,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )
        student_id = int(payload["sub"])
    except (jwt.InvalidTokenError, KeyError, TypeError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Your login session is invalid or expired. Please log in again.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    with connect_db() as connection:
        student = connection.execute(
            "SELECT id, name, email, created_at FROM students WHERE id = ?",
            (student_id,),
        ).fetchone()

    if student is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Student account not found.",
        )

    return public_student(student)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_student(request: RegisterRequest):
    name = request.name.strip()
    email = normalise_email(request.email)

    if len(name) < 2:
        raise HTTPException(
            status_code=422,
            detail="Please enter a name with at least two characters.",
        )

    password_hash = password_hasher.hash(request.password)
    created_at = datetime.now(timezone.utc).isoformat()

    try:
        with connect_db() as connection:
            cursor = connection.execute(
                """
                INSERT INTO students (name, email, password_hash, created_at)
                VALUES (?, ?, ?, ?)
                """,
                (name, email, password_hash, created_at),
            )
            student_id = cursor.lastrowid
    except sqlite3.IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists. Please log in.",
        )

    student = {
        "id": student_id,
        "name": name,
        "email": email,
        "created_at": created_at,
    }

    return {
        "message": "Student account created successfully.",
        "access_token": create_access_token(student_id),
        "token_type": "bearer",
        "student": student,
    }


@router.post("/login")
def login_student(request: LoginRequest):
    email = normalise_email(request.email)

    with connect_db() as connection:
        student = connection.execute(
            "SELECT * FROM students WHERE email = ?",
            (email,),
        ).fetchone()

    if student is None or not password_hasher.verify(
        request.password,
        student["password_hash"] if student else password_hasher.hash(
            "dummy-password-for-unknown-account"
        ),
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return {
        "message": "Login successful.",
        "access_token": create_access_token(student["id"]),
        "token_type": "bearer",
        "student": public_student(student),
    }


@router.get("/me")
def get_my_account(student: dict = Depends(get_current_student)):
    return student
