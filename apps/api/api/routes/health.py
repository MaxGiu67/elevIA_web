"""
Health check endpoint.
FR22: Il sistema può rispondere a health check per monitoraggio
NFR-P5: API response < 200ms
NFR-R5: Health check endpoint sempre disponibile
"""

from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter()


class HealthStatus(BaseModel):
    """Health check response model."""

    status: str
    rag: str
    db: str
    redis: str


@router.get("/health", response_model=HealthStatus)
async def health_check() -> HealthStatus:
    """
    Check the health of all services.

    Returns status of:
    - RAG/Vector Store (ChromaDB)
    - Database (PostgreSQL)
    - Cache (Redis)
    """
    # TODO: Implement actual health checks in Story 6.1
    # For now, return placeholder status
    return HealthStatus(
        status="ok",
        rag="ok",  # TODO: Check ChromaDB connection
        db="ok",  # TODO: Check PostgreSQL connection
        redis="ok",  # TODO: Check Redis connection
    )
