"""
Chat endpoint with SSE streaming.
FR6: Il Visitatore può digitare domande in linguaggio naturale nel chatbot
FR7: Il Visitatore può ricevere risposte testuali basate sulla knowledge base RAG
NFR-P2: Risposta completa < 10 secondi
NFR-S2: Input chatbot sanitizzato contro XSS e injection
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
import asyncio
import json
from typing import Optional


router = APIRouter()


class ChatRequest(BaseModel):
    """Chat request model."""

    message: str = Field(..., min_length=1, max_length=1000)
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    """Non-streaming chat response model."""

    response: str
    sources: list[dict]
    page_plan: Optional[dict] = None


@router.post("/chat")
async def chat(request: ChatRequest):
    """
    Process a chat message and return streaming SSE response.

    Events:
    - chat_chunk: Partial response text
    - sources: Retrieved document sources
    - page_plan: Page remodulation plan (if applicable)
    - done: Stream complete
    """

    async def generate_sse():
        """Generate Server-Sent Events for streaming response."""
        try:
            # TODO: Implement actual RAG + LangGraph processing in Epic 2-4
            # For now, return placeholder response

            # Simulate streaming response
            placeholder_response = (
                "Grazie per la tua domanda! "
                "UPGRAI offre soluzioni AI personalizzate per il tuo business. "
                "Questa è una risposta placeholder che verrà sostituita "
                "con il sistema RAG completo nell'Epic 2."
            )

            # Stream response in chunks
            words = placeholder_response.split()
            for i in range(0, len(words), 3):
                chunk = " ".join(words[i : i + 3])
                yield f"event: chat_chunk\ndata: {json.dumps({'text': chunk + ' '})}\n\n"
                await asyncio.sleep(0.1)

            # Send sources
            sources = [
                {"title": "Use Case Placeholder", "reference": "build.003/example"}
            ]
            yield f"event: sources\ndata: {json.dumps(sources)}\n\n"

            # Send page plan (placeholder)
            page_plan = {
                "variant_id": "default",
                "blocks": [
                    {"type": "hero", "priority": 1},
                    {"type": "features", "priority": 2},
                    {"type": "use_cases", "priority": 3},
                ],
            }
            yield f"event: page_plan\ndata: {json.dumps(page_plan)}\n\n"

            # Done
            yield f"event: done\ndata: {json.dumps({'status': 'complete'})}\n\n"

        except Exception as e:
            yield f"event: error\ndata: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(
        generate_sse(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    )
