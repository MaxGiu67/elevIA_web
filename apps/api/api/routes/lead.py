"""
Lead generation endpoint.
FR15-18: Lead form submission and storage
NFR-R3: Form independence - funzionante indipendentemente da stato AI
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
import uuid


router = APIRouter()


class LeadRequest(BaseModel):
    """Lead submission request model."""

    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=100)
    message: str = Field(..., min_length=10, max_length=2000)


class LeadResponse(BaseModel):
    """Lead submission response model."""

    success: bool
    id: str
    message: str


@router.post("/lead", response_model=LeadResponse)
async def submit_lead(request: LeadRequest) -> LeadResponse:
    """
    Submit a lead form.

    Stores the lead in PostgreSQL for follow-up.
    This endpoint is independent of AI services (NFR-R3).
    """
    try:
        # Generate unique ID
        lead_id = str(uuid.uuid4())

        # TODO: Implement actual PostgreSQL storage in Story 5.3
        # For now, log the lead
        print(f"📧 New lead received:")
        print(f"   ID: {lead_id}")
        print(f"   Name: {request.name}")
        print(f"   Email: {request.email}")
        print(f"   Company: {request.company or 'N/A'}")
        print(f"   Message: {request.message[:50]}...")
        print(f"   Time: {datetime.now().isoformat()}")

        return LeadResponse(
            success=True,
            id=lead_id,
            message="Grazie! Ti contatteremo presto.",
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Si è verificato un errore. Riprova più tardi.",
        )
