"""Pydantic request/response models (validation layer)."""

import re
from typing import Annotated

from pydantic import BaseModel, BeforeValidator, ConfigDict, Field, field_validator

# Loose email validation (allows .local, .internal, etc.) — avoids EmailStr rejecting reserved TLDs.
_EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+(?:\.[^\s@]+)+$")


def normalize_email(value: object) -> str:
    if not isinstance(value, str):
        raise ValueError("Email must be a string.")
    s = value.strip().lower()
    if not s:
        raise ValueError("Enter your email.")
    if len(s) > 320:
        raise ValueError("Email too long.")
    if not _EMAIL_RE.fullmatch(s):
        raise ValueError("Enter a valid email address.")
    return s


LooseEmail = Annotated[str, BeforeValidator(normalize_email)]


class LoginRequest(BaseModel):
    email: LooseEmail = Field(description="Registered email.")
    password: str = Field(min_length=8, max_length=128, description="Account password.")

    @field_validator("password")
    @classmethod
    def password_not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Password cannot be only whitespace.")
        return v


class RegisterRequest(BaseModel):
    email: LooseEmail = Field(description="University or personal email.")
    password: str = Field(min_length=8, max_length=128)

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Password cannot be only whitespace.")
        if not re.search(r"[A-Za-z]", v):
            raise ValueError("Password must contain at least one letter.")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one digit.")
        return v


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: LooseEmail
    is_admin: bool


class AuthSuccessResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic


class MessageResponse(BaseModel):
    detail: str
