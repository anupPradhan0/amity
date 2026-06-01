"""Campus Merch FastAPI application."""

import logging
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, text
from sqlalchemy.orm import Session

from app.config import settings
from app.database import Base, SessionLocal, engine
from app.deps import get_current_user, get_db
from app.models import ContactMessage, NewsletterSubscriber, User
from app.routers.catalog import admin_router, public_router
from app.schemas import (
    AuthSuccessResponse,
    ContactRequest,
    LoginRequest,
    MessageResponse,
    NewsletterRequest,
    RegisterRequest,
    UserPublic,
)
from app.security import create_access_token, hash_password, verify_password
from app.seed_products import drop_products_table_if_incompatible, seed_products, seed_reviews

logger = logging.getLogger(__name__)


def bootstrap_admin_user(db: Session) -> None:
    if not settings.admin_email or not settings.admin_password:
        return
    if len(settings.admin_password) < 8:
        logger.warning("ADMIN_PASSWORD must be at least 8 characters; admin bootstrap skipped.")
        return

    email = settings.admin_email
    hashed = hash_password(settings.admin_password)
    user = db.execute(select(User).where(User.email == email)).scalar_one_or_none()
    try:
        if user is None:
            db.add(User(email=email, hashed_password=hashed, is_admin=True))
            db.commit()
            logger.info("Bootstrap admin user created.")
        else:
            user.hashed_password = hashed
            user.is_admin = True
            db.commit()
            logger.info("Bootstrap admin user synced from environment.")
    except Exception:
        db.rollback()
        logger.exception("Admin bootstrap failed.")


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    if "postgresql" in settings.database_url:
        with engine.begin() as conn:
            conn.execute(
                text(
                    "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE"
                )
            )
            # `images` was added after the initial release; backfill the column on existing DBs.
            conn.execute(text("ALTER TABLE products ADD COLUMN IF NOT EXISTS images JSON"))

    drop_products_table_if_incompatible()
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        bootstrap_admin_user(db)
    finally:
        db.close()

    db_seed = SessionLocal()
    try:
        seed_products(db_seed)
        seed_reviews(db_seed)
    finally:
        db_seed.close()

    yield


app = FastAPI(
    title="Campus Merch API",
    description="PostgreSQL-backed API for learner accounts.",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(public_router)
app.include_router(admin_router)


@app.get("/health", response_model=MessageResponse)
def health():
    return MessageResponse(detail="ok")


@app.post("/auth/register", response_model=AuthSuccessResponse, status_code=status.HTTP_201_CREATED)
def register(body: RegisterRequest, db: Session = Depends(get_db)):
    if settings.admin_email and body.email == settings.admin_email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This email is reserved for the administrator account.",
        )

    exists = db.execute(select(User).where(User.email == body.email.lower().strip())).scalar_one_or_none()
    if exists:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    user = User(
        email=body.email.lower().strip(),
        hashed_password=hash_password(body.password),
        is_admin=False,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(subject=str(user.id))
    return AuthSuccessResponse(user=UserPublic.model_validate(user), access_token=token, token_type="bearer")


@app.post("/auth/login", response_model=AuthSuccessResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.execute(select(User).where(User.email == body.email.lower().strip())).scalar_one_or_none()
    if user is None or not verify_password(body.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    token = create_access_token(subject=str(user.id))
    return AuthSuccessResponse(
        access_token=token,
        token_type="bearer",
        user=UserPublic.model_validate(user),
    )


@app.get("/auth/me", response_model=UserPublic)
def auth_me(user: User = Depends(get_current_user)):
    return UserPublic.model_validate(user)


@app.post("/newsletter", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def subscribe_newsletter(body: NewsletterRequest, db: Session = Depends(get_db)):
    email = body.email
    existing = db.execute(
        select(NewsletterSubscriber).where(NewsletterSubscriber.email == email)
    ).scalar_one_or_none()
    if existing is not None:
        # Idempotent: a repeat subscribe is a success, not an error.
        return MessageResponse(detail="You're already on the list — see you in your inbox.")
    db.add(NewsletterSubscriber(email=email))
    db.commit()
    return MessageResponse(detail="Subscribed! Check your inbox for the next Campus Merch drop.")


@app.post("/contact", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def submit_contact(body: ContactRequest, db: Session = Depends(get_db)):
    db.add(
        ContactMessage(
            name=body.name,
            email=body.email,
            topic=body.topic,
            message=body.message,
        )
    )
    db.commit()
    return MessageResponse(detail="Thanks for reaching out — the Campus Merch team will reply by email soon.")
