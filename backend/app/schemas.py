"""Pydantic request/response models (validation layer)."""

import re
from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, BeforeValidator, ConfigDict, Field, field_validator, model_validator

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
    images: list[str] = Field(default_factory=list)
    colors: list[str]
    sizes: list[str] | None = None
    tags: list[str]
    best_seller: bool
    new_arrival: bool
    active: bool

    @field_validator("images", mode="before")
    @classmethod
    def none_to_empty(cls, v: object) -> object:
        # DB column is nullable; treat NULL as "no extra photos".
        return [] if v is None else v

    @model_validator(mode="after")
    def ensure_gallery(self) -> "ProductPublic":
        # Always expose at least the primary photo; never fabricate duplicates.
        if not self.images:
            self.images = [self.image_path]
        return self


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
    images: list[str] = Field(default_factory=list)
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
    images: list[str] | None = None
    colors: list[str] | None = None
    sizes: list[str] | None = None
    tags: list[str] | None = None
    best_seller: bool | None = None
    new_arrival: bool | None = None
    active: bool | None = None


# ---- Reviews ----------------------------------------------------------------


class ReviewPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    author_name: str
    rating: int
    title: str | None = None
    body: str
    created_at: datetime


class ReviewCreate(BaseModel):
    author_name: str = Field(min_length=1, max_length=120)
    rating: int = Field(ge=1, le=5)
    title: str | None = Field(default=None, max_length=200)
    body: str = Field(min_length=1, max_length=2000)

    @field_validator("author_name", "body")
    @classmethod
    def not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("This field cannot be blank.")
        return v.strip()


# ---- Newsletter & contact ---------------------------------------------------


class NewsletterRequest(BaseModel):
    email: LooseEmail = Field(description="Subscriber email.")


class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: LooseEmail
    topic: str = Field(default="general", max_length=64)
    message: str = Field(min_length=1, max_length=4000)

    @field_validator("name", "message")
    @classmethod
    def strip_not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("This field cannot be blank.")
        return v.strip()
