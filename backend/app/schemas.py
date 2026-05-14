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


class ProductPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    name: str
    brand: str
    category: str
    sub_category: str
    price: int
    mrp: int
    rating: float
    reviews: int
    image_path: str
    colors: list[str]
    sizes: list[str] | None = None
    tags: list[str]
    best_seller: bool
    new_arrival: bool
    active: bool


class ProductCreate(BaseModel):
    slug: str = Field(min_length=2, max_length=220)
    name: str = Field(min_length=1, max_length=500)
    brand: str = Field(min_length=1, max_length=200)
    category: str = Field(min_length=1, max_length=64)
    sub_category: str = Field(min_length=1, max_length=200)
    price: int = Field(ge=0)
    mrp: int = Field(ge=0)
    rating: float = Field(ge=0, le=5)
    reviews: int = Field(ge=0)
    image_path: str = Field(min_length=1, max_length=500)
    colors: list[str] = Field(default_factory=list)
    sizes: list[str] | None = None
    tags: list[str] = Field(default_factory=list)
    best_seller: bool = False
    new_arrival: bool = False
    active: bool = True


class ProductUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=500)
    brand: str | None = Field(default=None, min_length=1, max_length=200)
    category: str | None = Field(default=None, min_length=1, max_length=64)
    sub_category: str | None = Field(default=None, min_length=1, max_length=200)
    price: int | None = Field(default=None, ge=0)
    mrp: int | None = Field(default=None, ge=0)
    rating: float | None = Field(default=None, ge=0, le=5)
    reviews: int | None = Field(default=None, ge=0)
    image_path: str | None = Field(default=None, min_length=1, max_length=500)
    colors: list[str] | None = None
    sizes: list[str] | None = None
    tags: list[str] | None = None
    best_seller: bool | None = None
    new_arrival: bool | None = None
    active: bool | None = None
