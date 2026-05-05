"""Password hashing (bcrypt) and JWT creation."""

from datetime import UTC, datetime, timedelta

import bcrypt
from jose import jwt

from app.config import settings


def hash_password(password: str) -> str:
    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt(rounds=12))
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8"),
    )


def create_access_token(*, subject: str) -> str:
    exp = datetime.now(UTC) + timedelta(days=settings.access_token_expire_days)
    to_encode = {"sub": subject, "exp": int(exp.timestamp())}
    return jwt.encode(to_encode, settings.secret_key, algorithm="HS256")
