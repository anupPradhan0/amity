"""Pydantic request/response models (validation layer)."""

import re

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class LoginRequest(BaseModel):
    email: EmailStr = Field(description="Registered email.")
    password: str = Field(min_length=8, max_length=128, description="Account password.")

    @field_validator("password")
    @classmethod
    def password_not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Password cannot be only whitespace.")
        return v


class RegisterRequest(BaseModel):
    email: EmailStr = Field(description="University or personal email.")
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
    email: EmailStr


class RegisterResponse(BaseModel):
    user: UserPublic
    access_token: str
    token_type: str = "bearer"


class MessageResponse(BaseModel):
    detail: str
