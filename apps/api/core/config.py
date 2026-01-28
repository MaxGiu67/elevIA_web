"""
Application configuration using Pydantic Settings.
"""

from functools import lru_cache
from typing import List
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Application
    app_name: str = "UPGRAI API"
    debug: bool = False

    # Server
    api_host: str = "0.0.0.0"
    api_port: int = 8000

    # Database
    database_url: str = "postgresql://upgrai:upgrai_dev_password@localhost:5432/upgrai"

    # Redis
    redis_url: str = "redis://localhost:6379"

    # Vector Store
    chroma_host: str = "localhost"
    chroma_port: int = 8001

    # AI / LLM
    openai_api_key: str = ""

    # Security
    cors_origins: List[str] = ["http://localhost:3000"]
    secret_key: str = "change-me-in-production"

    # Rate Limiting
    rate_limit_requests: int = 10
    rate_limit_window: int = 60  # seconds

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


settings = get_settings()
