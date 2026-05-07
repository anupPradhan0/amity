from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    database_url: str = "postgresql+psycopg://campus:campus@localhost:5432/campus_merch"
    secret_key: str = "change-me-dev-only-use-openssl-rand-hex-32-in-prod"
    access_token_expire_days: int = 7

    # Set both to bootstrap or refresh an admin on startup (Docker + local uvicorn).
    admin_email: str | None = None
    admin_password: str | None = None

    cors_origins: list[str] = [
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    @field_validator("cors_origins", mode="before")
    @classmethod
    def split_origins(cls, v: list[str] | str) -> list[str]:
        if isinstance(v, str):
            return [x.strip() for x in v.split(",") if x.strip()]
        return v

    @field_validator("admin_email", "admin_password", mode="before")
    @classmethod
    def normalize_optional_str(cls, v: object) -> str | None:
        if v is None:
            return None
        if isinstance(v, str):
            stripped = v.strip()
            return stripped if stripped else None
        return str(v)

    @field_validator("admin_email", mode="after")
    @classmethod
    def lowercase_admin_email(cls, v: str | None) -> str | None:
        return v.lower() if v else None


settings = Settings()
