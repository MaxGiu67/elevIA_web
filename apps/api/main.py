"""
UPGRAI API - FastAPI Backend
Main application entry point
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import health, chat, lead
from core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler for startup/shutdown events."""
    # Startup
    print("🚀 UPGRAI API starting up...")
    # TODO: Initialize database connections
    # TODO: Initialize vector store
    yield
    # Shutdown
    print("👋 UPGRAI API shutting down...")
    # TODO: Close database connections


app = FastAPI(
    title="UPGRAI API",
    description="AI-powered landing page with Page Remodulation",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(chat.router, prefix="/api", tags=["chat"])
app.include_router(lead.router, prefix="/api", tags=["lead"])


@app.get("/")
async def root():
    """Root endpoint - API information."""
    return {
        "name": "UPGRAI API",
        "version": "0.1.0",
        "status": "running",
        "docs": "/docs",
    }
