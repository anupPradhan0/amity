"""Password hashing (bcrypt) and JWT creation."""

from datetime import UTC, datetime, timedelta

import bcrypt
from jose import JWTError, jwt

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


def decode_access_token(token: str) -> str:
    """Return JWT subject (user id as string). Raises ValueError if invalid or expired."""
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=["HS256"])
    except JWTError as e:
        raise ValueError("invalid token") from e
    sub = payload.get("sub")
    if sub is None:
        raise ValueError("missing subject")
    return str(sub)
