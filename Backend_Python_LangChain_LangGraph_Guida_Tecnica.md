# Guida Tecnica: Backend Python con LangChain e LangGraph

**Framework per Siti Web Agentici - Fasi 0-3**

**Versione 1.0 - Gennaio 2026**

---

## Indice

### Fase 0-1: Foundation
1. [Struttura del Progetto](#1-struttura-del-progetto)
2. [Setup Ambiente e Dipendenze](#2-setup-ambiente-e-dipendenze)
3. [Configurazione e Environment](#3-configurazione-e-environment)
4. [Content Layer: Gestione Markdown](#4-content-layer-gestione-markdown)

### Fase 2: RAG Chat MVP
5. [Ingestion Pipeline](#5-ingestion-pipeline)
6. [Vector Store e Embeddings](#6-vector-store-e-embeddings)
7. [Retrieval Strategy](#7-retrieval-strategy)
8. [LLM Provider Abstraction](#8-llm-provider-abstraction)
9. [API FastAPI con Streaming](#9-api-fastapi-con-streaming)

### Fase 3: Agentic Features
10. [LangGraph: Architettura Agente](#10-langgraph-architettura-agente)
11. [Intent Classification](#11-intent-classification)
12. [Page Plan Generation](#12-page-plan-generation)
13. [Lead Generation Integration](#13-lead-generation-integration)
14. [Memoria e Contesto](#14-memoria-e-contesto)
15. [Sicurezza e Monitoring](#15-sicurezza-e-monitoring)

### Appendici
- [A. Comandi CLI](#appendice-a-comandi-cli)
- [B. Docker e Deployment](#appendice-b-docker-e-deployment)
- [C. Testing](#appendice-c-testing)

---

# FASE 0-1: FOUNDATION

---

## 1. Struttura del Progetto

### 1.1 Directory Structure

```
apps/api/
├── src/
│   ├── __init__.py
│   ├── main.py                    # Entry point FastAPI
│   ├── config.py                  # Configurazione centralizzata
│   │
│   ├── api/                       # Layer API
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── chat.py            # POST /api/chat
│   │   │   ├── lead.py            # POST /api/lead
│   │   │   ├── search.py          # GET /api/search
│   │   │   └── health.py          # GET /health
│   │   ├── middleware/
│   │   │   ├── __init__.py
│   │   │   ├── rate_limit.py
│   │   │   ├── cors.py
│   │   │   └── logging.py
│   │   └── deps.py                # Dependency injection
│   │
│   ├── core/                      # Business logic core
│   │   ├── __init__.py
│   │   ├── agent/                 # LangGraph agent
│   │   │   ├── __init__.py
│   │   │   ├── graph.py           # Definizione grafo
│   │   │   ├── state.py           # Stato dell'agente
│   │   │   ├── nodes/             # Nodi del grafo
│   │   │   │   ├── __init__.py
│   │   │   │   ├── detect_language.py
│   │   │   │   ├── classify_intent.py
│   │   │   │   ├── retrieve_docs.py
│   │   │   │   ├── generate_answer.py
│   │   │   │   ├── page_plan.py
│   │   │   │   └── lead_trigger.py
│   │   │   └── tools/             # Tools per l'agente
│   │   │       ├── __init__.py
│   │   │       ├── search_docs.py
│   │   │       └── create_lead.py
│   │   │
│   │   ├── rag/                   # RAG pipeline
│   │   │   ├── __init__.py
│   │   │   ├── ingestion.py       # Pipeline di ingestion
│   │   │   ├── chunking.py        # Strategie di chunking
│   │   │   ├── retriever.py       # Retrieval logic
│   │   │   └── reranker.py        # Re-ranking (opzionale)
│   │   │
│   │   └── llm/                   # LLM abstraction
│   │       ├── __init__.py
│   │       ├── base.py            # Interfaccia base
│   │       ├── openai_provider.py
│   │       ├── anthropic_provider.py
│   │       ├── gemini_provider.py
│   │       └── factory.py         # Factory pattern
│   │
│   ├── models/                    # Pydantic models
│   │   ├── __init__.py
│   │   ├── chat.py
│   │   ├── content.py
│   │   ├── lead.py
│   │   └── page_plan.py
│   │
│   ├── services/                  # Servizi esterni
│   │   ├── __init__.py
│   │   ├── content_service.py     # Accesso ai contenuti
│   │   ├── vector_store.py        # Gestione vector DB
│   │   ├── lead_service.py        # Salvataggio lead
│   │   └── analytics_service.py   # Metriche e log
│   │
│   └── utils/                     # Utilities
│       ├── __init__.py
│       ├── markdown.py            # Parsing Markdown
│       ├── text.py                # Text processing
│       └── security.py            # Sanitization
│
├── content/                       # Contenuti Markdown (può essere symlink)
│   ├── it/
│   │   ├── pages/
│   │   ├── articles/
│   │   └── faq/
│   └── en/
│       ├── pages/
│       ├── articles/
│       └── faq/
│
├── scripts/                       # Script CLI
│   ├── ingest.py                  # Ingestion manuale
│   ├── search.py                  # Test search
│   └── migrate.py                 # Migrazioni DB
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_api/
│   ├── test_rag/
│   └── test_agent/
│
├── .env.example
├── .env
├── pyproject.toml
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

### 1.2 Principi Architetturali

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARCHITETTURA A LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    API LAYER (FastAPI)                      │ │
│  │  Routes → Middleware → Validation → Response                │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    CORE LAYER                               │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │ │
│  │  │  Agent   │  │   RAG    │  │   LLM    │                  │ │
│  │  │(LangGraph)│  │(LangChain)│ │(Providers)│                 │ │
│  │  └──────────┘  └──────────┘  └──────────┘                  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   SERVICES LAYER                            │ │
│  │  Content │ VectorStore │ Lead │ Analytics                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   DATA LAYER                                │ │
│  │  Markdown Files │ Vector DB │ PostgreSQL │ Redis            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Setup Ambiente e Dipendenze

### 2.1 pyproject.toml

```toml
[project]
name = "agentic-web-api"
version = "1.0.0"
description = "Backend API for Agentic Websites"
requires-python = ">=3.11"
dependencies = [
    # Web Framework
    "fastapi>=0.109.0",
    "uvicorn[standard]>=0.27.0",
    "python-multipart>=0.0.6",

    # LangChain ecosystem
    "langchain>=0.1.0",
    "langchain-core>=0.1.0",
    "langchain-community>=0.0.10",
    "langchain-openai>=0.0.5",
    "langchain-anthropic>=0.1.0",
    "langchain-google-genai>=0.0.6",
    "langgraph>=0.0.20",

    # Vector stores
    "chromadb>=0.4.22",
    "faiss-cpu>=1.7.4",

    # Embeddings
    "sentence-transformers>=2.2.2",

    # Content processing
    "pyyaml>=6.0",
    "python-frontmatter>=1.1.0",
    "markdown>=3.5",
    "beautifulsoup4>=4.12.0",

    # Database
    "sqlalchemy>=2.0.25",
    "asyncpg>=0.29.0",
    "redis>=5.0.0",

    # Utilities
    "pydantic>=2.5.0",
    "pydantic-settings>=2.1.0",
    "httpx>=0.26.0",
    "tenacity>=8.2.0",

    # Observability
    "opentelemetry-api>=1.22.0",
    "opentelemetry-sdk>=1.22.0",
    "opentelemetry-instrumentation-fastapi>=0.43b0",
    "structlog>=24.1.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.4.0",
    "pytest-asyncio>=0.23.0",
    "pytest-cov>=4.1.0",
    "httpx>=0.26.0",
    "ruff>=0.1.0",
    "mypy>=1.8.0",
]

[tool.ruff]
line-length = 100
target-version = "py311"

[tool.pytest.ini_options]
asyncio_mode = "auto"
```

### 2.2 Requirements.txt (alternativo)

```txt
# Core
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-multipart==0.0.6

# LangChain
langchain==0.1.0
langchain-core==0.1.0
langchain-community==0.0.10
langchain-openai==0.0.5
langchain-anthropic==0.1.0
langchain-google-genai==0.0.6
langgraph==0.0.20

# Vector stores
chromadb==0.4.22
faiss-cpu==1.7.4

# Embeddings
sentence-transformers==2.2.2

# Content
pyyaml==6.0
python-frontmatter==1.1.0
markdown==3.5
beautifulsoup4==4.12.0

# Database
sqlalchemy==2.0.25
asyncpg==0.29.0
redis==5.0.0

# Utils
pydantic==2.5.0
pydantic-settings==2.1.0
httpx==0.26.0
tenacity==8.2.0

# Observability
structlog==24.1.0
```

### 2.3 Setup Iniziale

```bash
# Crea virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows

# Installa dipendenze
pip install -e ".[dev]"

# Oppure con requirements.txt
pip install -r requirements.txt

# Copia configurazione
cp .env.example .env

# Inizializza vector store (primo avvio)
python scripts/ingest.py --init
```

---

## 3. Configurazione e Environment

### 3.1 File .env.example

```env
# ===================
# APPLICATION
# ===================
APP_NAME=agentic-web-api
APP_ENV=development
DEBUG=true
LOG_LEVEL=INFO

# ===================
# API
# ===================
API_HOST=0.0.0.0
API_PORT=8000
API_PREFIX=/api
CORS_ORIGINS=["http://localhost:3000"]

# ===================
# LLM PROVIDERS
# ===================
# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-haiku-20240307

# Google
GOOGLE_API_KEY=...
GOOGLE_MODEL=gemini-1.5-flash

# Default provider
DEFAULT_LLM_PROVIDER=openai
FALLBACK_LLM_PROVIDER=anthropic

# ===================
# VECTOR STORE
# ===================
VECTOR_STORE_TYPE=chroma
CHROMA_PERSIST_DIR=./data/chroma
# Oppure per FAISS:
# VECTOR_STORE_TYPE=faiss
# FAISS_INDEX_PATH=./data/faiss

# ===================
# CONTENT
# ===================
CONTENT_DIR=./content
SUPPORTED_LANGUAGES=it,en
DEFAULT_LANGUAGE=it

# ===================
# DATABASE (per lead e logs)
# ===================
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/agentic_db
# Oppure SQLite per sviluppo:
# DATABASE_URL=sqlite+aiosqlite:///./data/app.db

# ===================
# REDIS (cache e sessioni)
# ===================
REDIS_URL=redis://localhost:6379/0

# ===================
# SECURITY
# ===================
RATE_LIMIT_REQUESTS=60
RATE_LIMIT_PERIOD=60
MAX_INPUT_LENGTH=2000
MAX_TOKENS_PER_REQUEST=4000

# ===================
# OBSERVABILITY
# ===================
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
OTEL_SERVICE_NAME=agentic-web-api
```

### 3.2 Configurazione Centralizzata

```python
# src/config.py
from functools import lru_cache
from typing import Literal
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Configurazione centralizzata dell'applicazione."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # Application
    app_name: str = "agentic-web-api"
    app_env: Literal["development", "staging", "production"] = "development"
    debug: bool = False
    log_level: str = "INFO"

    # API
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_prefix: str = "/api"
    cors_origins: list[str] = Field(default_factory=lambda: ["http://localhost:3000"])

    # LLM Providers
    openai_api_key: str | None = None
    openai_model: str = "gpt-4o-mini"
    openai_embedding_model: str = "text-embedding-3-small"

    anthropic_api_key: str | None = None
    anthropic_model: str = "claude-3-haiku-20240307"

    google_api_key: str | None = None
    google_model: str = "gemini-1.5-flash"

    default_llm_provider: Literal["openai", "anthropic", "google"] = "openai"
    fallback_llm_provider: Literal["openai", "anthropic", "google"] | None = "anthropic"

    # Vector Store
    vector_store_type: Literal["chroma", "faiss"] = "chroma"
    chroma_persist_dir: str = "./data/chroma"
    faiss_index_path: str = "./data/faiss"

    # Content
    content_dir: str = "./content"
    supported_languages: list[str] = Field(default_factory=lambda: ["it", "en"])
    default_language: str = "it"

    # Database
    database_url: str = "sqlite+aiosqlite:///./data/app.db"

    # Redis
    redis_url: str | None = None

    # Security
    rate_limit_requests: int = 60
    rate_limit_period: int = 60
    max_input_length: int = 2000
    max_tokens_per_request: int = 4000

    # Observability
    otel_exporter_otlp_endpoint: str | None = None
    otel_service_name: str = "agentic-web-api"

    @property
    def is_production(self) -> bool:
        return self.app_env == "production"

    @property
    def is_development(self) -> bool:
        return self.app_env == "development"


@lru_cache
def get_settings() -> Settings:
    """Singleton per le settings."""
    return Settings()


# Alias per import più comodo
settings = get_settings()
```

---

## 4. Content Layer: Gestione Markdown

### 4.1 Models per i Contenuti

```python
# src/models/content.py
from datetime import datetime
from typing import Literal
from pydantic import BaseModel, Field


class ContentFrontmatter(BaseModel):
    """Front-matter di un file Markdown."""

    id: str
    type: Literal["page", "article", "faq"]
    lang: Literal["it", "en"]
    title: str
    description: str
    slug: str
    canonical: str
    alternate: dict[str, str] | None = None
    tags: list[str] = Field(default_factory=list)
    published_at: datetime | None = None
    updated_at: datetime | None = None
    hero_image: str | None = None
    draft: bool = False


class ContentItem(BaseModel):
    """Contenuto completo con metadati."""

    frontmatter: ContentFrontmatter
    content: str  # Markdown raw
    html: str | None = None  # HTML renderizzato (opzionale)

    @property
    def full_url(self) -> str:
        return self.frontmatter.canonical

    @property
    def language(self) -> str:
        return self.frontmatter.lang


class ContentChunk(BaseModel):
    """Chunk di contenuto per RAG."""

    id: str  # Unique ID per il chunk
    content_id: str  # ID del contenuto originale
    text: str
    metadata: dict = Field(default_factory=dict)

    # Metadati per retrieval
    lang: str
    content_type: str
    url: str
    title: str
    section_title: str | None = None

    def to_langchain_doc(self):
        """Converte in Document LangChain."""
        from langchain_core.documents import Document
        return Document(
            page_content=self.text,
            metadata={
                "id": self.id,
                "content_id": self.content_id,
                "lang": self.lang,
                "content_type": self.content_type,
                "url": self.url,
                "title": self.title,
                "section_title": self.section_title,
                **self.metadata,
            }
        )
```

### 4.2 Content Service

```python
# src/services/content_service.py
import os
from pathlib import Path
from typing import Iterator
import frontmatter
import markdown
from bs4 import BeautifulSoup

from src.config import settings
from src.models.content import ContentFrontmatter, ContentItem, ContentChunk
from src.utils.text import clean_text


class ContentService:
    """Servizio per accesso e gestione dei contenuti Markdown."""

    def __init__(self, content_dir: str | None = None):
        self.content_dir = Path(content_dir or settings.content_dir)
        self._md = markdown.Markdown(extensions=["tables", "fenced_code", "toc"])

    def get_content(
        self,
        lang: str,
        content_type: str,
        slug: str
    ) -> ContentItem | None:
        """Carica un singolo contenuto."""
        file_path = self.content_dir / lang / content_type / f"{slug}.md"

        if not file_path.exists():
            return None

        return self._parse_file(file_path)

    def get_all_content(
        self,
        lang: str | None = None,
        content_type: str | None = None,
        include_drafts: bool = False
    ) -> list[ContentItem]:
        """Carica tutti i contenuti con filtri opzionali."""
        contents = []

        languages = [lang] if lang else settings.supported_languages
        types = [content_type] if content_type else ["pages", "articles", "faq"]

        for language in languages:
            for ctype in types:
                dir_path = self.content_dir / language / ctype
                if not dir_path.exists():
                    continue

                for file_path in dir_path.glob("*.md"):
                    content = self._parse_file(file_path)
                    if content:
                        if include_drafts or not content.frontmatter.draft:
                            contents.append(content)

        return contents

    def iter_content(
        self,
        lang: str | None = None,
        content_type: str | None = None
    ) -> Iterator[ContentItem]:
        """Itera sui contenuti (memory efficient)."""
        languages = [lang] if lang else settings.supported_languages
        types = [content_type] if content_type else ["pages", "articles", "faq"]

        for language in languages:
            for ctype in types:
                dir_path = self.content_dir / language / ctype
                if not dir_path.exists():
                    continue

                for file_path in dir_path.glob("*.md"):
                    content = self._parse_file(file_path)
                    if content and not content.frontmatter.draft:
                        yield content

    def _parse_file(self, file_path: Path) -> ContentItem | None:
        """Parsa un file Markdown con front-matter."""
        try:
            post = frontmatter.load(file_path)

            # Valida front-matter
            fm = ContentFrontmatter(**post.metadata)

            # Renderizza HTML
            self._md.reset()
            html = self._md.convert(post.content)

            return ContentItem(
                frontmatter=fm,
                content=post.content,
                html=html,
            )
        except Exception as e:
            print(f"Error parsing {file_path}: {e}")
            return None

    def extract_sections(self, content: ContentItem) -> list[dict]:
        """Estrae sezioni dal contenuto per chunking intelligente."""
        soup = BeautifulSoup(content.html or "", "html.parser")
        sections = []

        current_section = {
            "title": content.frontmatter.title,
            "level": 0,
            "content": [],
        }

        for element in soup.children:
            if element.name in ["h1", "h2", "h3"]:
                # Salva sezione precedente
                if current_section["content"]:
                    sections.append({
                        **current_section,
                        "content": "\n".join(current_section["content"]),
                    })

                # Nuova sezione
                level = int(element.name[1])
                current_section = {
                    "title": element.get_text().strip(),
                    "level": level,
                    "content": [],
                }
            else:
                text = element.get_text().strip() if hasattr(element, 'get_text') else str(element).strip()
                if text:
                    current_section["content"].append(text)

        # Ultima sezione
        if current_section["content"]:
            sections.append({
                **current_section,
                "content": "\n".join(current_section["content"]),
            })

        return sections


# Singleton
_content_service: ContentService | None = None


def get_content_service() -> ContentService:
    global _content_service
    if _content_service is None:
        _content_service = ContentService()
    return _content_service
```

---

# FASE 2: RAG CHAT MVP

---

## 5. Ingestion Pipeline

### 5.1 Chunking Strategies

```python
# src/core/rag/chunking.py
from abc import ABC, abstractmethod
from typing import Iterator
import hashlib
import re

from langchain.text_splitter import (
    RecursiveCharacterTextSplitter,
    MarkdownHeaderTextSplitter,
)

from src.models.content import ContentItem, ContentChunk
from src.services.content_service import ContentService


class ChunkingStrategy(ABC):
    """Interfaccia per strategie di chunking."""

    @abstractmethod
    def chunk(self, content: ContentItem) -> list[ContentChunk]:
        pass


class HeadingBasedChunker(ChunkingStrategy):
    """Chunking basato su heading Markdown (consigliato)."""

    def __init__(
        self,
        max_chunk_size: int = 1000,
        chunk_overlap: int = 100,
    ):
        self.max_chunk_size = max_chunk_size
        self.chunk_overlap = chunk_overlap

        # Splitter per heading
        self.header_splitter = MarkdownHeaderTextSplitter(
            headers_to_split_on=[
                ("#", "h1"),
                ("##", "h2"),
                ("###", "h3"),
            ]
        )

        # Splitter per chunk troppo grandi
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=max_chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", ". ", " ", ""],
        )

    def chunk(self, content: ContentItem) -> list[ContentChunk]:
        chunks = []

        # Split per heading
        header_splits = self.header_splitter.split_text(content.content)

        for i, doc in enumerate(header_splits):
            # Estrai titolo sezione dai metadata
            section_title = None
            for key in ["h1", "h2", "h3"]:
                if key in doc.metadata:
                    section_title = doc.metadata[key]
                    break

            text = doc.page_content.strip()

            if not text:
                continue

            # Se il chunk è troppo grande, splitta ulteriormente
            if len(text) > self.max_chunk_size:
                sub_chunks = self.text_splitter.split_text(text)
                for j, sub_text in enumerate(sub_chunks):
                    chunk = self._create_chunk(
                        content=content,
                        text=sub_text,
                        section_title=section_title,
                        index=f"{i}-{j}",
                    )
                    chunks.append(chunk)
            else:
                chunk = self._create_chunk(
                    content=content,
                    text=text,
                    section_title=section_title,
                    index=str(i),
                )
                chunks.append(chunk)

        return chunks

    def _create_chunk(
        self,
        content: ContentItem,
        text: str,
        section_title: str | None,
        index: str,
    ) -> ContentChunk:
        # Genera ID unico basato sul contenuto
        chunk_id = hashlib.md5(
            f"{content.frontmatter.id}:{index}:{text[:50]}".encode()
        ).hexdigest()[:16]

        return ContentChunk(
            id=chunk_id,
            content_id=content.frontmatter.id,
            text=text,
            lang=content.frontmatter.lang,
            content_type=content.frontmatter.type,
            url=content.frontmatter.canonical,
            title=content.frontmatter.title,
            section_title=section_title,
            metadata={
                "tags": content.frontmatter.tags,
                "updated_at": content.frontmatter.updated_at.isoformat() if content.frontmatter.updated_at else None,
            },
        )


class RecursiveChunker(ChunkingStrategy):
    """Chunking ricorsivo semplice (fallback)."""

    def __init__(
        self,
        chunk_size: int = 500,
        chunk_overlap: int = 50,
    ):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", ". ", " ", ""],
        )

    def chunk(self, content: ContentItem) -> list[ContentChunk]:
        chunks = []
        texts = self.splitter.split_text(content.content)

        for i, text in enumerate(texts):
            chunk_id = hashlib.md5(
                f"{content.frontmatter.id}:{i}".encode()
            ).hexdigest()[:16]

            chunks.append(ContentChunk(
                id=chunk_id,
                content_id=content.frontmatter.id,
                text=text,
                lang=content.frontmatter.lang,
                content_type=content.frontmatter.type,
                url=content.frontmatter.canonical,
                title=content.frontmatter.title,
                section_title=None,
            ))

        return chunks


def get_chunker(strategy: str = "heading") -> ChunkingStrategy:
    """Factory per chunker."""
    if strategy == "heading":
        return HeadingBasedChunker()
    elif strategy == "recursive":
        return RecursiveChunker()
    else:
        raise ValueError(f"Unknown chunking strategy: {strategy}")
```

### 5.2 Ingestion Pipeline

```python
# src/core/rag/ingestion.py
import asyncio
from typing import Callable
import structlog

from src.config import settings
from src.models.content import ContentChunk
from src.services.content_service import get_content_service
from src.services.vector_store import get_vector_store
from src.core.rag.chunking import get_chunker, ChunkingStrategy

logger = structlog.get_logger()


class IngestionPipeline:
    """Pipeline per indicizzazione contenuti nel vector store."""

    def __init__(
        self,
        chunker: ChunkingStrategy | None = None,
        batch_size: int = 100,
        on_progress: Callable[[int, int], None] | None = None,
    ):
        self.content_service = get_content_service()
        self.vector_store = get_vector_store()
        self.chunker = chunker or get_chunker("heading")
        self.batch_size = batch_size
        self.on_progress = on_progress

    async def run(
        self,
        lang: str | None = None,
        content_type: str | None = None,
        force_reindex: bool = False,
    ) -> dict:
        """Esegue l'ingestion completa."""
        logger.info(
            "Starting ingestion",
            lang=lang,
            content_type=content_type,
            force_reindex=force_reindex,
        )

        # Reset se richiesto
        if force_reindex:
            await self.vector_store.clear(
                filter={"lang": lang} if lang else None
            )

        # Raccogli contenuti
        contents = self.content_service.get_all_content(
            lang=lang,
            content_type=content_type,
            include_drafts=False,
        )

        total = len(contents)
        processed = 0
        chunks_total = 0
        errors = []

        # Processa in batch
        all_chunks: list[ContentChunk] = []

        for content in contents:
            try:
                chunks = self.chunker.chunk(content)
                all_chunks.extend(chunks)
                processed += 1
                chunks_total += len(chunks)

                if self.on_progress:
                    self.on_progress(processed, total)

                # Batch insert
                if len(all_chunks) >= self.batch_size:
                    await self._insert_batch(all_chunks)
                    all_chunks = []

            except Exception as e:
                logger.error(
                    "Error processing content",
                    content_id=content.frontmatter.id,
                    error=str(e),
                )
                errors.append({
                    "content_id": content.frontmatter.id,
                    "error": str(e),
                })

        # Insert remaining
        if all_chunks:
            await self._insert_batch(all_chunks)

        result = {
            "total_contents": total,
            "processed": processed,
            "chunks_created": chunks_total,
            "errors": errors,
        }

        logger.info("Ingestion completed", **result)
        return result

    async def _insert_batch(self, chunks: list[ContentChunk]):
        """Inserisce un batch di chunk nel vector store."""
        documents = [chunk.to_langchain_doc() for chunk in chunks]
        await self.vector_store.add_documents(documents)

    async def update_content(self, content_id: str):
        """Aggiorna un singolo contenuto (per webhook)."""
        # Rimuovi vecchi chunk
        await self.vector_store.delete(
            filter={"content_id": content_id}
        )

        # Trova e reindicizza
        for content in self.content_service.iter_content():
            if content.frontmatter.id == content_id:
                chunks = self.chunker.chunk(content)
                await self._insert_batch(chunks)
                return True

        return False

    async def delete_content(self, content_id: str):
        """Rimuove un contenuto dal vector store."""
        await self.vector_store.delete(
            filter={"content_id": content_id}
        )


async def run_ingestion(
    lang: str | None = None,
    force: bool = False,
):
    """Entry point per script CLI."""
    pipeline = IngestionPipeline(
        on_progress=lambda p, t: print(f"Progress: {p}/{t}")
    )
    return await pipeline.run(lang=lang, force_reindex=force)
```

---

## 6. Vector Store e Embeddings

### 6.1 Vector Store Abstraction

```python
# src/services/vector_store.py
from abc import ABC, abstractmethod
from typing import Any
import asyncio

from langchain_core.documents import Document
from langchain_core.embeddings import Embeddings
from langchain_openai import OpenAIEmbeddings
from langchain_community.embeddings import HuggingFaceEmbeddings

from src.config import settings


class VectorStoreBase(ABC):
    """Interfaccia base per vector store."""

    @abstractmethod
    async def add_documents(self, documents: list[Document]) -> list[str]:
        """Aggiunge documenti al vector store."""
        pass

    @abstractmethod
    async def similarity_search(
        self,
        query: str,
        k: int = 4,
        filter: dict | None = None,
    ) -> list[Document]:
        """Ricerca per similarità."""
        pass

    @abstractmethod
    async def delete(self, filter: dict) -> bool:
        """Elimina documenti per filtro."""
        pass

    @abstractmethod
    async def clear(self, filter: dict | None = None) -> bool:
        """Svuota il vector store."""
        pass


class ChromaVectorStore(VectorStoreBase):
    """Vector store basato su ChromaDB."""

    def __init__(
        self,
        collection_name: str = "content",
        persist_directory: str | None = None,
        embeddings: Embeddings | None = None,
    ):
        import chromadb
        from langchain_community.vectorstores import Chroma

        self.persist_directory = persist_directory or settings.chroma_persist_dir
        self.embeddings = embeddings or self._get_embeddings()

        # Inizializza client
        self._client = chromadb.PersistentClient(path=self.persist_directory)

        # Inizializza LangChain Chroma
        self._store = Chroma(
            client=self._client,
            collection_name=collection_name,
            embedding_function=self.embeddings,
        )

    def _get_embeddings(self) -> Embeddings:
        """Ottiene embeddings in base alla configurazione."""
        if settings.openai_api_key:
            return OpenAIEmbeddings(
                model=settings.openai_embedding_model,
                openai_api_key=settings.openai_api_key,
            )
        else:
            # Fallback a modello locale
            return HuggingFaceEmbeddings(
                model_name="sentence-transformers/all-MiniLM-L6-v2"
            )

    async def add_documents(self, documents: list[Document]) -> list[str]:
        # Chroma è sincrono, wrappa in executor
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(
            None,
            lambda: self._store.add_documents(documents)
        )

    async def similarity_search(
        self,
        query: str,
        k: int = 4,
        filter: dict | None = None,
    ) -> list[Document]:
        loop = asyncio.get_event_loop()

        def _search():
            return self._store.similarity_search(
                query,
                k=k,
                filter=filter,
            )

        return await loop.run_in_executor(None, _search)

    async def similarity_search_with_score(
        self,
        query: str,
        k: int = 4,
        filter: dict | None = None,
    ) -> list[tuple[Document, float]]:
        loop = asyncio.get_event_loop()

        def _search():
            return self._store.similarity_search_with_score(
                query,
                k=k,
                filter=filter,
            )

        return await loop.run_in_executor(None, _search)

    async def delete(self, filter: dict) -> bool:
        try:
            # ChromaDB delete by metadata
            collection = self._client.get_collection("content")

            # Trova IDs che matchano il filtro
            results = collection.get(where=filter)
            if results["ids"]:
                collection.delete(ids=results["ids"])
            return True
        except Exception as e:
            print(f"Delete error: {e}")
            return False

    async def clear(self, filter: dict | None = None) -> bool:
        try:
            if filter:
                return await self.delete(filter)
            else:
                self._client.delete_collection("content")
                # Ricrea collection
                self._store = Chroma(
                    client=self._client,
                    collection_name="content",
                    embedding_function=self.embeddings,
                )
            return True
        except Exception as e:
            print(f"Clear error: {e}")
            return False


class FAISSVectorStore(VectorStoreBase):
    """Vector store basato su FAISS (alternativa locale)."""

    def __init__(
        self,
        index_path: str | None = None,
        embeddings: Embeddings | None = None,
    ):
        from langchain_community.vectorstores import FAISS

        self.index_path = index_path or settings.faiss_index_path
        self.embeddings = embeddings or OpenAIEmbeddings(
            model=settings.openai_embedding_model,
        )

        # Carica indice esistente o crea nuovo
        try:
            self._store = FAISS.load_local(
                self.index_path,
                self.embeddings,
                allow_dangerous_deserialization=True,
            )
        except Exception:
            # Crea store vuoto
            self._store = None

    async def add_documents(self, documents: list[Document]) -> list[str]:
        loop = asyncio.get_event_loop()

        def _add():
            nonlocal self
            if self._store is None:
                from langchain_community.vectorstores import FAISS
                self._store = FAISS.from_documents(documents, self.embeddings)
            else:
                self._store.add_documents(documents)

            # Persisti
            self._store.save_local(self.index_path)
            return [doc.metadata.get("id", str(i)) for i, doc in enumerate(documents)]

        return await loop.run_in_executor(None, _add)

    async def similarity_search(
        self,
        query: str,
        k: int = 4,
        filter: dict | None = None,
    ) -> list[Document]:
        if self._store is None:
            return []

        loop = asyncio.get_event_loop()

        def _search():
            results = self._store.similarity_search(query, k=k * 2)  # Fetch extra for filtering

            if filter:
                # Filter manuale (FAISS non supporta filter nativamente)
                filtered = []
                for doc in results:
                    match = all(
                        doc.metadata.get(key) == value
                        for key, value in filter.items()
                    )
                    if match:
                        filtered.append(doc)
                return filtered[:k]

            return results[:k]

        return await loop.run_in_executor(None, _search)

    async def delete(self, filter: dict) -> bool:
        # FAISS non supporta delete efficiente, richiede rebuild
        return False

    async def clear(self, filter: dict | None = None) -> bool:
        import os
        import shutil

        if os.path.exists(self.index_path):
            shutil.rmtree(self.index_path)

        self._store = None
        return True


# Factory e singleton
_vector_store: VectorStoreBase | None = None


def get_vector_store() -> VectorStoreBase:
    """Ottiene l'istanza del vector store."""
    global _vector_store

    if _vector_store is None:
        if settings.vector_store_type == "chroma":
            _vector_store = ChromaVectorStore()
        elif settings.vector_store_type == "faiss":
            _vector_store = FAISSVectorStore()
        else:
            raise ValueError(f"Unknown vector store type: {settings.vector_store_type}")

    return _vector_store
```

---

## 7. Retrieval Strategy

### 7.1 Retriever con Filtri

```python
# src/core/rag/retriever.py
from dataclasses import dataclass
from typing import Literal

from langchain_core.documents import Document

from src.services.vector_store import get_vector_store


@dataclass
class RetrievalConfig:
    """Configurazione per retrieval."""

    top_k: int = 5
    score_threshold: float = 0.3
    include_metadata: bool = True
    rerank: bool = False
    rerank_top_k: int = 3


@dataclass
class RetrievalResult:
    """Risultato del retrieval."""

    documents: list[Document]
    scores: list[float] | None = None
    query: str = ""
    lang: str | None = None


class ContentRetriever:
    """Retriever per contenuti con supporto filtri."""

    def __init__(self, config: RetrievalConfig | None = None):
        self.config = config or RetrievalConfig()
        self.vector_store = get_vector_store()

    async def retrieve(
        self,
        query: str,
        lang: str | None = None,
        content_type: str | None = None,
        tags: list[str] | None = None,
    ) -> RetrievalResult:
        """Esegue retrieval con filtri."""

        # Costruisci filtro
        filter_dict = {}
        if lang:
            filter_dict["lang"] = lang
        if content_type:
            filter_dict["content_type"] = content_type

        # Retrieval base
        results = await self.vector_store.similarity_search_with_score(
            query=query,
            k=self.config.top_k,
            filter=filter_dict if filter_dict else None,
        )

        # Filtra per score threshold
        filtered_results = [
            (doc, score) for doc, score in results
            if score >= self.config.score_threshold
        ]

        # Filtra per tags (se specificati)
        if tags:
            filtered_results = [
                (doc, score) for doc, score in filtered_results
                if any(tag in doc.metadata.get("tags", []) for tag in tags)
            ]

        documents = [doc for doc, _ in filtered_results]
        scores = [score for _, score in filtered_results]

        # Reranking opzionale
        if self.config.rerank and len(documents) > self.config.rerank_top_k:
            documents, scores = await self._rerank(
                query, documents, scores, self.config.rerank_top_k
            )

        return RetrievalResult(
            documents=documents,
            scores=scores,
            query=query,
            lang=lang,
        )

    async def _rerank(
        self,
        query: str,
        documents: list[Document],
        scores: list[float],
        top_k: int,
    ) -> tuple[list[Document], list[float]]:
        """Reranking con cross-encoder o LLM."""
        # Implementazione base: usa i punteggi esistenti
        # Per produzione: usa un reranker dedicato (Cohere, cross-encoder, etc.)

        paired = list(zip(documents, scores))
        paired.sort(key=lambda x: x[1], reverse=True)

        return (
            [doc for doc, _ in paired[:top_k]],
            [score for _, score in paired[:top_k]],
        )

    def format_context(
        self,
        result: RetrievalResult,
        max_tokens: int = 3000,
    ) -> str:
        """Formatta i documenti come contesto per il prompt."""
        context_parts = []
        total_chars = 0
        char_limit = max_tokens * 4  # Approssimazione caratteri/token

        for i, doc in enumerate(result.documents):
            # Formatta documento
            source_info = f"[Fonte: {doc.metadata.get('title', 'N/A')}]"
            if doc.metadata.get("section_title"):
                source_info += f" > {doc.metadata['section_title']}"
            source_info += f" ({doc.metadata.get('url', '')})"

            text = f"{source_info}\n{doc.page_content}\n"

            # Verifica limite
            if total_chars + len(text) > char_limit:
                break

            context_parts.append(text)
            total_chars += len(text)

        return "\n---\n".join(context_parts)

    def extract_sources(self, result: RetrievalResult) -> list[dict]:
        """Estrae le fonti dai risultati."""
        sources = []
        seen_urls = set()

        for doc in result.documents:
            url = doc.metadata.get("url", "")
            if url and url not in seen_urls:
                sources.append({
                    "title": doc.metadata.get("title", ""),
                    "url": url,
                    "section": doc.metadata.get("section_title"),
                })
                seen_urls.add(url)

        return sources
```

---

## 8. LLM Provider Abstraction

### 8.1 Interfaccia Base

```python
# src/core/llm/base.py
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import AsyncIterator, Any

from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, SystemMessage


@dataclass
class LLMResponse:
    """Risposta da un LLM."""

    content: str
    model: str
    usage: dict | None = None
    finish_reason: str | None = None


@dataclass
class LLMStreamChunk:
    """Chunk di streaming."""

    content: str
    is_final: bool = False


class LLMProvider(ABC):
    """Interfaccia base per provider LLM."""

    @property
    @abstractmethod
    def model_name(self) -> str:
        """Nome del modello."""
        pass

    @abstractmethod
    async def generate(
        self,
        messages: list[BaseMessage],
        temperature: float = 0.7,
        max_tokens: int | None = None,
        stop: list[str] | None = None,
    ) -> LLMResponse:
        """Genera una risposta."""
        pass

    @abstractmethod
    async def stream(
        self,
        messages: list[BaseMessage],
        temperature: float = 0.7,
        max_tokens: int | None = None,
        stop: list[str] | None = None,
    ) -> AsyncIterator[LLMStreamChunk]:
        """Genera una risposta in streaming."""
        pass

    @abstractmethod
    async def generate_with_tools(
        self,
        messages: list[BaseMessage],
        tools: list[dict],
        temperature: float = 0.7,
    ) -> tuple[LLMResponse, list[dict] | None]:
        """Genera con tool calling."""
        pass

    def _convert_messages(self, messages: list[BaseMessage]) -> list[dict]:
        """Converte messaggi LangChain in formato provider."""
        result = []
        for msg in messages:
            if isinstance(msg, SystemMessage):
                result.append({"role": "system", "content": msg.content})
            elif isinstance(msg, HumanMessage):
                result.append({"role": "user", "content": msg.content})
            elif isinstance(msg, AIMessage):
                result.append({"role": "assistant", "content": msg.content})
        return result
```

### 8.2 OpenAI Provider

```python
# src/core/llm/openai_provider.py
from typing import AsyncIterator
import openai
from openai import AsyncOpenAI

from langchain_core.messages import BaseMessage

from src.config import settings
from src.core.llm.base import LLMProvider, LLMResponse, LLMStreamChunk


class OpenAIProvider(LLMProvider):
    """Provider per OpenAI GPT."""

    def __init__(
        self,
        model: str | None = None,
        api_key: str | None = None,
    ):
        self._model = model or settings.openai_model
        self._client = AsyncOpenAI(
            api_key=api_key or settings.openai_api_key
        )

    @property
    def model_name(self) -> str:
        return self._model

    async def generate(
        self,
        messages: list[BaseMessage],
        temperature: float = 0.7,
        max_tokens: int | None = None,
        stop: list[str] | None = None,
    ) -> LLMResponse:
        response = await self._client.chat.completions.create(
            model=self._model,
            messages=self._convert_messages(messages),
            temperature=temperature,
            max_tokens=max_tokens,
            stop=stop,
        )

        return LLMResponse(
            content=response.choices[0].message.content or "",
            model=response.model,
            usage={
                "prompt_tokens": response.usage.prompt_tokens,
                "completion_tokens": response.usage.completion_tokens,
                "total_tokens": response.usage.total_tokens,
            } if response.usage else None,
            finish_reason=response.choices[0].finish_reason,
        )

    async def stream(
        self,
        messages: list[BaseMessage],
        temperature: float = 0.7,
        max_tokens: int | None = None,
        stop: list[str] | None = None,
    ) -> AsyncIterator[LLMStreamChunk]:
        stream = await self._client.chat.completions.create(
            model=self._model,
            messages=self._convert_messages(messages),
            temperature=temperature,
            max_tokens=max_tokens,
            stop=stop,
            stream=True,
        )

        async for chunk in stream:
            if chunk.choices[0].delta.content:
                yield LLMStreamChunk(
                    content=chunk.choices[0].delta.content,
                    is_final=chunk.choices[0].finish_reason is not None,
                )

    async def generate_with_tools(
        self,
        messages: list[BaseMessage],
        tools: list[dict],
        temperature: float = 0.7,
    ) -> tuple[LLMResponse, list[dict] | None]:
        response = await self._client.chat.completions.create(
            model=self._model,
            messages=self._convert_messages(messages),
            temperature=temperature,
            tools=tools,
            tool_choice="auto",
        )

        message = response.choices[0].message

        llm_response = LLMResponse(
            content=message.content or "",
            model=response.model,
            usage={
                "prompt_tokens": response.usage.prompt_tokens,
                "completion_tokens": response.usage.completion_tokens,
                "total_tokens": response.usage.total_tokens,
            } if response.usage else None,
            finish_reason=response.choices[0].finish_reason,
        )

        tool_calls = None
        if message.tool_calls:
            tool_calls = [
                {
                    "id": tc.id,
                    "name": tc.function.name,
                    "arguments": tc.function.arguments,
                }
                for tc in message.tool_calls
            ]

        return llm_response, tool_calls
```

### 8.3 Anthropic Provider

```python
# src/core/llm/anthropic_provider.py
from typing import AsyncIterator
from anthropic import AsyncAnthropic

from langchain_core.messages import BaseMessage, SystemMessage

from src.config import settings
from src.core.llm.base import LLMProvider, LLMResponse, LLMStreamChunk


class AnthropicProvider(LLMProvider):
    """Provider per Anthropic Claude."""

    def __init__(
        self,
        model: str | None = None,
        api_key: str | None = None,
    ):
        self._model = model or settings.anthropic_model
        self._client = AsyncAnthropic(
            api_key=api_key or settings.anthropic_api_key
        )

    @property
    def model_name(self) -> str:
        return self._model

    def _prepare_messages(self, messages: list[BaseMessage]) -> tuple[str | None, list[dict]]:
        """Prepara messaggi per Claude (system separato)."""
        system_prompt = None
        chat_messages = []

        for msg in messages:
            if isinstance(msg, SystemMessage):
                system_prompt = msg.content
            else:
                role = "user" if msg.type == "human" else "assistant"
                chat_messages.append({"role": role, "content": msg.content})

        return system_prompt, chat_messages

    async def generate(
        self,
        messages: list[BaseMessage],
        temperature: float = 0.7,
        max_tokens: int | None = None,
        stop: list[str] | None = None,
    ) -> LLMResponse:
        system, msgs = self._prepare_messages(messages)

        response = await self._client.messages.create(
            model=self._model,
            messages=msgs,
            system=system or "",
            temperature=temperature,
            max_tokens=max_tokens or 4096,
            stop_sequences=stop,
        )

        return LLMResponse(
            content=response.content[0].text if response.content else "",
            model=response.model,
            usage={
                "input_tokens": response.usage.input_tokens,
                "output_tokens": response.usage.output_tokens,
            },
            finish_reason=response.stop_reason,
        )

    async def stream(
        self,
        messages: list[BaseMessage],
        temperature: float = 0.7,
        max_tokens: int | None = None,
        stop: list[str] | None = None,
    ) -> AsyncIterator[LLMStreamChunk]:
        system, msgs = self._prepare_messages(messages)

        async with self._client.messages.stream(
            model=self._model,
            messages=msgs,
            system=system or "",
            temperature=temperature,
            max_tokens=max_tokens or 4096,
            stop_sequences=stop,
        ) as stream:
            async for text in stream.text_stream:
                yield LLMStreamChunk(content=text, is_final=False)

        yield LLMStreamChunk(content="", is_final=True)

    async def generate_with_tools(
        self,
        messages: list[BaseMessage],
        tools: list[dict],
        temperature: float = 0.7,
    ) -> tuple[LLMResponse, list[dict] | None]:
        system, msgs = self._prepare_messages(messages)

        # Converti tools in formato Claude
        claude_tools = [
            {
                "name": t["function"]["name"],
                "description": t["function"]["description"],
                "input_schema": t["function"]["parameters"],
            }
            for t in tools
        ]

        response = await self._client.messages.create(
            model=self._model,
            messages=msgs,
            system=system or "",
            temperature=temperature,
            max_tokens=4096,
            tools=claude_tools,
        )

        llm_response = LLMResponse(
            content="",
            model=response.model,
            usage={
                "input_tokens": response.usage.input_tokens,
                "output_tokens": response.usage.output_tokens,
            },
            finish_reason=response.stop_reason,
        )

        tool_calls = None
        for block in response.content:
            if block.type == "text":
                llm_response.content = block.text
            elif block.type == "tool_use":
                if tool_calls is None:
                    tool_calls = []
                tool_calls.append({
                    "id": block.id,
                    "name": block.name,
                    "arguments": block.input,
                })

        return llm_response, tool_calls
```

### 8.4 LLM Factory

```python
# src/core/llm/factory.py
from typing import Literal
from tenacity import retry, stop_after_attempt, wait_exponential

from src.config import settings
from src.core.llm.base import LLMProvider, LLMResponse
from src.core.llm.openai_provider import OpenAIProvider
from src.core.llm.anthropic_provider import AnthropicProvider


ProviderType = Literal["openai", "anthropic", "google"]


class LLMFactory:
    """Factory con fallback per provider LLM."""

    _providers: dict[str, LLMProvider] = {}

    @classmethod
    def get_provider(cls, provider_type: ProviderType | None = None) -> LLMProvider:
        """Ottiene un provider (con caching)."""
        provider_type = provider_type or settings.default_llm_provider

        if provider_type not in cls._providers:
            cls._providers[provider_type] = cls._create_provider(provider_type)

        return cls._providers[provider_type]

    @classmethod
    def _create_provider(cls, provider_type: ProviderType) -> LLMProvider:
        """Crea un'istanza di provider."""
        if provider_type == "openai":
            return OpenAIProvider()
        elif provider_type == "anthropic":
            return AnthropicProvider()
        elif provider_type == "google":
            from src.core.llm.gemini_provider import GeminiProvider
            return GeminiProvider()
        else:
            raise ValueError(f"Unknown provider: {provider_type}")

    @classmethod
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=1, max=10),
        reraise=True,
    )
    async def generate_with_fallback(
        cls,
        messages,
        temperature: float = 0.7,
        max_tokens: int | None = None,
    ) -> LLMResponse:
        """Genera con retry e fallback automatico."""
        primary = cls.get_provider(settings.default_llm_provider)

        try:
            return await primary.generate(
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
            )
        except Exception as e:
            if settings.fallback_llm_provider:
                fallback = cls.get_provider(settings.fallback_llm_provider)
                return await fallback.generate(
                    messages=messages,
                    temperature=temperature,
                    max_tokens=max_tokens,
                )
            raise


# Shortcut functions
def get_llm(provider: ProviderType | None = None) -> LLMProvider:
    return LLMFactory.get_provider(provider)


async def generate(messages, **kwargs) -> LLMResponse:
    return await LLMFactory.generate_with_fallback(messages, **kwargs)
```

---

## 9. API FastAPI con Streaming

### 9.1 Main Application

```python
# src/main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import structlog

from src.config import settings
from src.api.routes import chat, lead, search, health
from src.api.middleware.rate_limit import RateLimitMiddleware
from src.api.middleware.logging import LoggingMiddleware


logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle management."""
    logger.info("Starting application", env=settings.app_env)

    # Startup
    # - Verifica connessioni
    # - Carica modelli se necessario

    yield

    # Shutdown
    logger.info("Shutting down application")


def create_app() -> FastAPI:
    """Factory per l'applicazione FastAPI."""

    app = FastAPI(
        title=settings.app_name,
        version="1.0.0",
        docs_url="/docs" if settings.debug else None,
        redoc_url="/redoc" if settings.debug else None,
        lifespan=lifespan,
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Custom middleware
    app.add_middleware(LoggingMiddleware)
    app.add_middleware(RateLimitMiddleware)

    # Routes
    app.include_router(health.router, tags=["Health"])
    app.include_router(chat.router, prefix=settings.api_prefix, tags=["Chat"])
    app.include_router(lead.router, prefix=settings.api_prefix, tags=["Lead"])
    app.include_router(search.router, prefix=settings.api_prefix, tags=["Search"])

    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "src.main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=settings.debug,
    )
```

### 9.2 Chat Route con Streaming SSE

```python
# src/api/routes/chat.py
from typing import AsyncGenerator
import json
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
import structlog

from src.models.chat import ChatRequest, ChatResponse, ChatMessage
from src.models.page_plan import PagePlan
from src.core.agent.graph import get_agent_graph
from src.core.agent.state import AgentState
from src.api.deps import get_session_id, validate_input


router = APIRouter()
logger = structlog.get_logger()


class ChatRequestBody(BaseModel):
    """Request body per chat."""

    message: str = Field(..., max_length=2000)
    lang: str = Field(default="it", pattern="^(it|en)$")
    session_id: str | None = None
    history: list[ChatMessage] = Field(default_factory=list, max_length=20)
    stream: bool = True


class ChatResponseBody(BaseModel):
    """Response body per chat (non-streaming)."""

    answer: str
    sources: list[dict]
    intent: str | None = None
    page_plan: PagePlan | None = None


@router.post("/chat")
async def chat_endpoint(
    body: ChatRequestBody,
    session_id: str = Depends(get_session_id),
):
    """
    Endpoint chat con supporto streaming SSE.

    Streaming response format:
    ```
    data: {"type": "content", "content": "Hello"}
    data: {"type": "content", "content": " world"}
    data: {"type": "sources", "sources": [...]}
    data: {"type": "page_plan", "page_plan": {...}}
    data: [DONE]
    ```
    """
    logger.info(
        "Chat request",
        session_id=session_id,
        lang=body.lang,
        message_length=len(body.message),
    )

    # Valida input
    validate_input(body.message)

    if body.stream:
        return StreamingResponse(
            stream_chat_response(body, session_id),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        )
    else:
        # Non-streaming response
        result = await run_agent(body, session_id)
        return ChatResponseBody(**result)


async def stream_chat_response(
    body: ChatRequestBody,
    session_id: str,
) -> AsyncGenerator[str, None]:
    """Genera stream SSE per la risposta chat."""

    try:
        graph = get_agent_graph()

        # Stato iniziale
        initial_state = AgentState(
            session_id=session_id,
            lang=body.lang,
            user_query=body.message,
            chat_history=[
                {"role": m.role, "content": m.content}
                for m in body.history
            ],
        )

        # Esegui grafo con streaming
        full_answer = ""
        sources = []
        page_plan = None
        intent = None

        async for event in graph.astream_events(initial_state, version="v1"):

            # Stream content tokens
            if event["event"] == "on_chat_model_stream":
                chunk = event["data"]["chunk"]
                if hasattr(chunk, "content") and chunk.content:
                    full_answer += chunk.content
                    yield f"data: {json.dumps({'type': 'content', 'content': chunk.content})}\n\n"

            # Cattura risultati finali dai nodi
            elif event["event"] == "on_chain_end":
                output = event.get("data", {}).get("output", {})

                if "sources" in output:
                    sources = output["sources"]

                if "page_plan" in output:
                    page_plan = output["page_plan"]

                if "intent" in output:
                    intent = output["intent"]

        # Invia metadata finali
        if sources:
            yield f"data: {json.dumps({'type': 'sources', 'sources': sources})}\n\n"

        if page_plan:
            yield f"data: {json.dumps({'type': 'page_plan', 'page_plan': page_plan})}\n\n"

        if intent:
            yield f"data: {json.dumps({'type': 'intent', 'intent': intent})}\n\n"

        # Fine stream
        yield "data: [DONE]\n\n"

        # Log completamento
        logger.info(
            "Chat completed",
            session_id=session_id,
            intent=intent,
            sources_count=len(sources),
            has_page_plan=page_plan is not None,
        )

    except Exception as e:
        logger.error("Chat error", error=str(e), session_id=session_id)
        yield f"data: {json.dumps({'type': 'error', 'error': str(e)})}\n\n"


async def run_agent(body: ChatRequestBody, session_id: str) -> dict:
    """Esegue l'agente senza streaming."""
    graph = get_agent_graph()

    initial_state = AgentState(
        session_id=session_id,
        lang=body.lang,
        user_query=body.message,
        chat_history=[
            {"role": m.role, "content": m.content}
            for m in body.history
        ],
    )

    result = await graph.ainvoke(initial_state)

    return {
        "answer": result.get("answer", ""),
        "sources": result.get("sources", []),
        "intent": result.get("intent"),
        "page_plan": result.get("page_plan"),
    }
```

### 9.3 Models per Chat

```python
# src/models/chat.py
from typing import Literal
from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    """Messaggio nella chat history."""

    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    """Request per chat endpoint."""

    message: str = Field(..., max_length=2000)
    lang: str = Field(default="it")
    session_id: str | None = None
    history: list[ChatMessage] = Field(default_factory=list)
    stream: bool = True


class Source(BaseModel):
    """Fonte citata nella risposta."""

    title: str
    url: str
    section: str | None = None


class ChatResponse(BaseModel):
    """Response dal chat endpoint."""

    answer: str
    sources: list[Source]
    intent: str | None = None
    page_plan: dict | None = None
```

---

# FASE 3: AGENTIC FEATURES

---

## 10. LangGraph: Architettura Agente

### 10.1 Stato dell'Agente

```python
# src/core/agent/state.py
from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage
from langgraph.graph import add_messages


class AgentState(TypedDict):
    """Stato condiviso tra i nodi del grafo."""

    # Identificazione sessione
    session_id: str
    lang: str

    # Input utente
    user_query: str
    chat_history: Annotated[Sequence[BaseMessage], add_messages]

    # Risultati retrieval
    retrieved_docs: list[dict]
    context: str

    # Classificazione
    intent: str  # info, pricing, demo, support, other
    detected_lang: str

    # Output
    answer: str
    sources: list[dict]

    # Page plan (opzionale)
    page_plan: dict | None

    # Lead trigger (opzionale)
    should_trigger_lead: bool
    lead_data: dict | None

    # Metadata
    actions: list[str]
    errors: list[str]
```

### 10.2 Definizione del Grafo

```python
# src/core/agent/graph.py
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

from src.core.agent.state import AgentState
from src.core.agent.nodes import (
    detect_language,
    classify_intent,
    retrieve_docs,
    generate_answer,
    create_page_plan,
    check_lead_trigger,
    postprocess,
)


def create_agent_graph() -> StateGraph:
    """Crea il grafo dell'agente."""

    # Inizializza grafo
    graph = StateGraph(AgentState)

    # Aggiungi nodi
    graph.add_node("detect_language", detect_language)
    graph.add_node("classify_intent", classify_intent)
    graph.add_node("retrieve_docs", retrieve_docs)
    graph.add_node("generate_answer", generate_answer)
    graph.add_node("create_page_plan", create_page_plan)
    graph.add_node("check_lead_trigger", check_lead_trigger)
    graph.add_node("postprocess", postprocess)

    # Definisci edges
    graph.set_entry_point("detect_language")

    graph.add_edge("detect_language", "classify_intent")
    graph.add_edge("classify_intent", "retrieve_docs")
    graph.add_edge("retrieve_docs", "generate_answer")

    # Conditional edge dopo generate_answer
    graph.add_conditional_edges(
        "generate_answer",
        should_create_page_plan,
        {
            True: "create_page_plan",
            False: "check_lead_trigger",
        }
    )

    graph.add_edge("create_page_plan", "check_lead_trigger")
    graph.add_edge("check_lead_trigger", "postprocess")
    graph.add_edge("postprocess", END)

    return graph


def should_create_page_plan(state: AgentState) -> bool:
    """Decide se creare un page plan."""
    # Crea page plan per intent specifici sulla homepage
    return state.get("intent") in ["pricing", "demo", "features"]


# Singleton compilato
_compiled_graph = None


def get_agent_graph():
    """Ottiene il grafo compilato (singleton)."""
    global _compiled_graph

    if _compiled_graph is None:
        graph = create_agent_graph()

        # Memory per mantenere stato tra invocazioni
        memory = MemorySaver()

        _compiled_graph = graph.compile(checkpointer=memory)

    return _compiled_graph
```

### 10.3 Visualizzazione del Grafo

```
┌─────────────────────────────────────────────────────────────────┐
│                         AGENT GRAPH                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [START]                                                         │
│     │                                                            │
│     ▼                                                            │
│  ┌──────────────────┐                                           │
│  │ detect_language  │ → Rileva lingua dell'input                │
│  └────────┬─────────┘                                           │
│           │                                                      │
│           ▼                                                      │
│  ┌──────────────────┐                                           │
│  │ classify_intent  │ → Classifica: info/pricing/demo/support   │
│  └────────┬─────────┘                                           │
│           │                                                      │
│           ▼                                                      │
│  ┌──────────────────┐                                           │
│  │  retrieve_docs   │ → RAG: recupera documenti rilevanti       │
│  └────────┬─────────┘                                           │
│           │                                                      │
│           ▼                                                      │
│  ┌──────────────────┐                                           │
│  │ generate_answer  │ → LLM: genera risposta con contesto       │
│  └────────┬─────────┘                                           │
│           │                                                      │
│           ▼                                                      │
│     ┌─────┴─────┐                                               │
│     │ CONDITION │ → Intent in [pricing, demo, features]?       │
│     └─────┬─────┘                                               │
│       │       │                                                  │
│    YES│       │NO                                               │
│       ▼       │                                                  │
│  ┌────────────┴───┐                                             │
│  │create_page_plan│ → Genera JSON per personalizzazione pagina  │
│  └────────┬───────┘                                             │
│           │                                                      │
│           ▼                                                      │
│  ┌──────────────────┐                                           │
│  │check_lead_trigger│ → Verifica se proporre form contatto      │
│  └────────┬─────────┘                                           │
│           │                                                      │
│           ▼                                                      │
│  ┌──────────────────┐                                           │
│  │   postprocess    │ → Formatta, sanitizza, log                │
│  └────────┬─────────┘                                           │
│           │                                                      │
│           ▼                                                      │
│       [END]                                                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 11. Intent Classification

### 11.1 Nodo Classificazione Intent

```python
# src/core/agent/nodes/classify_intent.py
from langchain_core.messages import SystemMessage, HumanMessage

from src.core.agent.state import AgentState
from src.core.llm.factory import get_llm


INTENT_CLASSIFICATION_PROMPT = """Sei un classificatore di intent per un sito web aziendale.

Classifica la domanda dell'utente in una delle seguenti categorie:
- info: domande generali, informazioni sui servizi, "cosa fate", "come funziona"
- pricing: domande su prezzi, costi, piani, abbonamenti, "quanto costa"
- demo: richieste di demo, prove gratuite, "vorrei vedere", "posso provare"
- support: problemi tecnici, assistenza, "non funziona", "ho un problema"
- contact: volontà esplicita di contatto, "vorrei parlare con", "chiamatemi"
- other: tutto ciò che non rientra nelle categorie precedenti

Rispondi SOLO con la categoria, senza spiegazioni.

Domanda: {query}

Categoria:"""


async def classify_intent(state: AgentState) -> AgentState:
    """Classifica l'intent della query utente."""

    llm = get_llm()

    messages = [
        SystemMessage(content="Sei un classificatore di intent preciso e conciso."),
        HumanMessage(content=INTENT_CLASSIFICATION_PROMPT.format(
            query=state["user_query"]
        )),
    ]

    response = await llm.generate(
        messages=messages,
        temperature=0.0,  # Deterministic
        max_tokens=10,
    )

    # Estrai intent dalla risposta
    intent = response.content.strip().lower()

    # Valida intent
    valid_intents = ["info", "pricing", "demo", "support", "contact", "other"]
    if intent not in valid_intents:
        intent = "info"  # Default

    return {
        **state,
        "intent": intent,
        "actions": state.get("actions", []) + [f"classified_intent:{intent}"],
    }
```

### 11.2 Detect Language

```python
# src/core/agent/nodes/detect_language.py
import re
from src.core.agent.state import AgentState


# Pattern semplici per rilevamento lingua
ITALIAN_PATTERNS = [
    r'\b(che|cosa|come|quando|dove|perché|vorrei|posso|sono|siamo)\b',
    r'\b(grazie|prego|ciao|salve|buongiorno)\b',
]

ENGLISH_PATTERNS = [
    r'\b(what|how|when|where|why|would|can|is|are|do|does)\b',
    r'\b(thanks|please|hello|hi|good)\b',
]


async def detect_language(state: AgentState) -> AgentState:
    """Rileva la lingua dell'input utente."""

    text = state["user_query"].lower()

    # Conta match per lingua
    it_score = sum(
        len(re.findall(pattern, text, re.IGNORECASE))
        for pattern in ITALIAN_PATTERNS
    )

    en_score = sum(
        len(re.findall(pattern, text, re.IGNORECASE))
        for pattern in ENGLISH_PATTERNS
    )

    # Determina lingua
    if it_score > en_score:
        detected = "it"
    elif en_score > it_score:
        detected = "en"
    else:
        # Fallback alla lingua della sessione
        detected = state.get("lang", "it")

    return {
        **state,
        "detected_lang": detected,
        # Usa lingua rilevata se diversa da quella specificata
        "lang": detected if detected != state.get("lang") else state.get("lang", "it"),
    }
```

---

## 12. Page Plan Generation

### 12.1 Nodo Page Plan

```python
# src/core/agent/nodes/page_plan.py
import json
from langchain_core.messages import SystemMessage, HumanMessage

from src.core.agent.state import AgentState
from src.core.llm.factory import get_llm
from src.models.page_plan import PagePlan, PageBlock


PAGE_PLAN_PROMPT = """Sei un designer di landing page. Basandoti sull'intent dell'utente,
genera un piano per personalizzare la homepage.

Intent dell'utente: {intent}
Domanda originale: {query}
Lingua: {lang}

Genera un JSON con i blocchi da mostrare. Blocchi disponibili:
- Hero: headline, subheadline, cta (text, href), background
- Features: title, items[]
- FAQ: title, content_ref (riferimento a FAQ esistenti)
- CTA: variant (simple/prominent), title, text, buttonText, href
- Testimonials: title, content_ref
- CaseStudy: title, content_ref

Regole:
1. Massimo 4-5 blocchi
2. Sempre iniziare con Hero
3. Sempre terminare con CTA
4. Usa content_ref per riferimenti a contenuti esistenti
5. Adatta i testi alla lingua specificata

Rispondi SOLO con il JSON valido, senza markdown o spiegazioni.

JSON:"""


async def create_page_plan(state: AgentState) -> AgentState:
    """Genera un page plan per personalizzare la landing."""

    intent = state.get("intent", "info")

    # Solo per intent specifici
    if intent not in ["pricing", "demo", "features", "support"]:
        return {**state, "page_plan": None}

    llm = get_llm()

    messages = [
        SystemMessage(content="Sei un assistente che genera JSON validi per UI."),
        HumanMessage(content=PAGE_PLAN_PROMPT.format(
            intent=intent,
            query=state["user_query"],
            lang=state["lang"],
        )),
    ]

    response = await llm.generate(
        messages=messages,
        temperature=0.3,
        max_tokens=1000,
    )

    try:
        # Parse JSON
        plan_data = json.loads(response.content)

        # Valida struttura
        page_plan = {
            "variant_id": f"{state['lang']}_home_intent_{intent}",
            "blocks": plan_data.get("blocks", []),
        }

        return {
            **state,
            "page_plan": page_plan,
            "actions": state.get("actions", []) + ["page_plan_created"],
        }

    except json.JSONDecodeError:
        # Fallback: nessun page plan
        return {**state, "page_plan": None}


# Page plans predefiniti (fallback)
DEFAULT_PAGE_PLANS = {
    "pricing": {
        "it": {
            "variant_id": "it_home_intent_pricing",
            "blocks": [
                {
                    "type": "Hero",
                    "props": {
                        "headline": "Piani e Prezzi",
                        "subheadline": "Scegli la soluzione più adatta alle tue esigenze",
                        "cta": {"text": "Confronta i piani", "href": "#pricing"},
                        "background": "gradient-blue"
                    }
                },
                {
                    "type": "Features",
                    "props": {"title": "Cosa include ogni piano"},
                    "content_ref": "pricing-features"
                },
                {
                    "type": "FAQ",
                    "props": {"title": "Domande sui prezzi"},
                    "content_ref": "faq-pricing"
                },
                {
                    "type": "CTA",
                    "props": {
                        "variant": "prominent",
                        "title": "Pronto a iniziare?",
                        "text": "Richiedi un preventivo personalizzato",
                        "buttonText": "Contattaci",
                        "href": "/it/contatti"
                    }
                }
            ]
        },
        "en": {
            # ... versione inglese
        }
    },
    "demo": {
        "it": {
            "variant_id": "it_home_intent_demo",
            "blocks": [
                {
                    "type": "Hero",
                    "props": {
                        "headline": "Prova la nostra soluzione",
                        "subheadline": "Richiedi una demo personalizzata gratuita",
                        "cta": {"text": "Prenota demo", "href": "/it/contatti?type=demo"},
                        "background": "gradient-purple"
                    }
                },
                {
                    "type": "Features",
                    "props": {"title": "Cosa vedrai nella demo"},
                    "content_ref": "demo-features"
                },
                {
                    "type": "Testimonials",
                    "props": {"title": "Cosa dicono i nostri clienti"},
                    "content_ref": "testimonials"
                },
                {
                    "type": "CTA",
                    "props": {
                        "variant": "prominent",
                        "title": "Inizia ora",
                        "text": "Prenota la tua demo gratuita di 30 minuti",
                        "buttonText": "Prenota ora",
                        "href": "/it/contatti?type=demo"
                    }
                }
            ]
        }
    }
}


def get_default_page_plan(intent: str, lang: str) -> dict | None:
    """Ottiene un page plan predefinito."""
    if intent in DEFAULT_PAGE_PLANS:
        return DEFAULT_PAGE_PLANS[intent].get(lang)
    return None
```

### 12.2 Model Page Plan

```python
# src/models/page_plan.py
from typing import Literal
from pydantic import BaseModel, Field


class CTAProps(BaseModel):
    text: str
    href: str


class HeroProps(BaseModel):
    headline: str
    subheadline: str | None = None
    cta: CTAProps | None = None
    secondaryCta: CTAProps | None = None
    image: str | None = None
    background: Literal["white", "gray", "gradient-blue", "gradient-purple"] = "white"


class FeaturesProps(BaseModel):
    title: str
    columns: int = 3
    items: list[dict] | None = None


class FAQProps(BaseModel):
    title: str
    items: list[dict] | None = None


class CTABlockProps(BaseModel):
    variant: Literal["simple", "prominent", "inline"] = "simple"
    title: str | None = None
    text: str | None = None
    buttonText: str
    href: str
    secondaryButton: CTAProps | None = None


class PageBlock(BaseModel):
    """Singolo blocco del page plan."""

    type: Literal["Hero", "Features", "FAQ", "CTA", "Testimonials", "CaseStudy", "ArticleList", "Newsletter", "RichText"]
    props: dict = Field(default_factory=dict)
    content_ref: str | None = None


class PagePlan(BaseModel):
    """Piano completo per personalizzazione pagina."""

    variant_id: str
    blocks: list[PageBlock]
```

---

## 13. Lead Generation Integration

### 13.1 Check Lead Trigger

```python
# src/core/agent/nodes/lead_trigger.py
from src.core.agent.state import AgentState


LEAD_TRIGGER_INTENTS = ["pricing", "demo", "contact", "support"]


async def check_lead_trigger(state: AgentState) -> AgentState:
    """Verifica se attivare un trigger per lead generation."""

    intent = state.get("intent", "info")

    should_trigger = intent in LEAD_TRIGGER_INTENTS

    lead_data = None
    if should_trigger:
        lead_data = {
            "intent": intent,
            "query": state["user_query"],
            "lang": state["lang"],
            "suggested_cta": get_cta_for_intent(intent, state["lang"]),
        }

    return {
        **state,
        "should_trigger_lead": should_trigger,
        "lead_data": lead_data,
    }


def get_cta_for_intent(intent: str, lang: str) -> dict:
    """Ottiene la CTA appropriata per l'intent."""

    ctas = {
        "pricing": {
            "it": {
                "text": "Vuoi ricevere un preventivo personalizzato?",
                "button": "Richiedi preventivo",
                "href": "/it/contatti?type=quote",
            },
            "en": {
                "text": "Would you like a personalized quote?",
                "button": "Request quote",
                "href": "/en/contact?type=quote",
            },
        },
        "demo": {
            "it": {
                "text": "Vuoi prenotare una demo gratuita?",
                "button": "Prenota demo",
                "href": "/it/contatti?type=demo",
            },
            "en": {
                "text": "Would you like to book a free demo?",
                "button": "Book demo",
                "href": "/en/contact?type=demo",
            },
        },
        "contact": {
            "it": {
                "text": "Vuoi essere ricontattato da un nostro esperto?",
                "button": "Richiedi contatto",
                "href": "/it/contatti",
            },
            "en": {
                "text": "Would you like to be contacted by our team?",
                "button": "Request contact",
                "href": "/en/contact",
            },
        },
        "support": {
            "it": {
                "text": "Hai bisogno di assistenza tecnica?",
                "button": "Apri ticket",
                "href": "/it/supporto",
            },
            "en": {
                "text": "Need technical support?",
                "button": "Open ticket",
                "href": "/en/support",
            },
        },
    }

    return ctas.get(intent, {}).get(lang, ctas.get(intent, {}).get("it", {}))
```

### 13.2 Lead Service

```python
# src/services/lead_service.py
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert

from src.models.lead import Lead, LeadCreate
from src.services.database import get_db_session


class LeadService:
    """Servizio per gestione lead."""

    async def create_lead(self, data: LeadCreate) -> Lead:
        """Crea un nuovo lead."""
        async with get_db_session() as session:
            lead = Lead(
                email=data.email,
                name=data.name,
                company=data.company,
                message=data.message,
                lang=data.lang,
                source=data.source or "chat",
                intent=data.intent,
                context=data.context,
                created_at=datetime.utcnow(),
            )

            session.add(lead)
            await session.commit()
            await session.refresh(lead)

            return lead

    async def get_lead_by_email(self, email: str) -> Lead | None:
        """Recupera lead per email."""
        async with get_db_session() as session:
            result = await session.execute(
                select(Lead).where(Lead.email == email)
            )
            return result.scalar_one_or_none()


# Singleton
_lead_service: LeadService | None = None


def get_lead_service() -> LeadService:
    global _lead_service
    if _lead_service is None:
        _lead_service = LeadService()
    return _lead_service
```

---

## 14. Memoria e Contesto

### 14.1 Nodo Retrieve Docs

```python
# src/core/agent/nodes/retrieve_docs.py
from src.core.agent.state import AgentState
from src.core.rag.retriever import ContentRetriever, RetrievalConfig


async def retrieve_docs(state: AgentState) -> AgentState:
    """Recupera documenti rilevanti dal vector store."""

    config = RetrievalConfig(
        top_k=5,
        score_threshold=0.3,
        rerank=True,
        rerank_top_k=3,
    )

    retriever = ContentRetriever(config)

    # Retrieval con filtro lingua
    result = await retriever.retrieve(
        query=state["user_query"],
        lang=state.get("lang") or state.get("detected_lang", "it"),
    )

    # Formatta contesto
    context = retriever.format_context(result, max_tokens=3000)

    # Estrai fonti
    sources = retriever.extract_sources(result)

    return {
        **state,
        "retrieved_docs": [
            {
                "content": doc.page_content,
                "metadata": doc.metadata,
            }
            for doc in result.documents
        ],
        "context": context,
        "sources": sources,
        "actions": state.get("actions", []) + [f"retrieved:{len(result.documents)}_docs"],
    }
```

### 14.2 Nodo Generate Answer

```python
# src/core/agent/nodes/generate_answer.py
from langchain_core.messages import SystemMessage, HumanMessage

from src.core.agent.state import AgentState
from src.core.llm.factory import get_llm


SYSTEM_PROMPT_IT = """Sei un assistente virtuale per il sito web aziendale.
Rispondi alle domande degli utenti basandoti ESCLUSIVAMENTE sulle informazioni fornite nel contesto.

Regole:
1. Usa SOLO le informazioni dal contesto. Non inventare.
2. Se l'informazione non è nel contesto, dì "Non ho trovato questa informazione nei nostri contenuti".
3. Sii conciso ma completo.
4. Usa un tono professionale ma amichevole.
5. Se appropriato, suggerisci pagine correlate.
6. Rispondi in italiano.

Contesto:
{context}"""

SYSTEM_PROMPT_EN = """You are a virtual assistant for the company website.
Answer user questions based EXCLUSIVELY on the information provided in the context.

Rules:
1. Use ONLY information from the context. Do not make things up.
2. If the information is not in the context, say "I couldn't find this information in our content".
3. Be concise but complete.
4. Use a professional but friendly tone.
5. If appropriate, suggest related pages.
6. Answer in English.

Context:
{context}"""


async def generate_answer(state: AgentState) -> AgentState:
    """Genera la risposta usando LLM + contesto RAG."""

    lang = state.get("lang", "it")
    context = state.get("context", "")

    # Seleziona prompt per lingua
    system_template = SYSTEM_PROMPT_IT if lang == "it" else SYSTEM_PROMPT_EN
    system_prompt = system_template.format(context=context)

    # Costruisci history per contesto conversazionale
    messages = [SystemMessage(content=system_prompt)]

    # Aggiungi chat history (ultimi N messaggi)
    for msg in state.get("chat_history", [])[-6:]:
        if msg["role"] == "user":
            messages.append(HumanMessage(content=msg["content"]))
        else:
            from langchain_core.messages import AIMessage
            messages.append(AIMessage(content=msg["content"]))

    # Aggiungi query corrente
    messages.append(HumanMessage(content=state["user_query"]))

    # Genera risposta
    llm = get_llm()
    response = await llm.generate(
        messages=messages,
        temperature=0.7,
        max_tokens=1000,
    )

    return {
        **state,
        "answer": response.content,
        "actions": state.get("actions", []) + ["answer_generated"],
    }
```

### 14.3 Postprocess

```python
# src/core/agent/nodes/postprocess.py
import re
from src.core.agent.state import AgentState
from src.utils.security import sanitize_output


async def postprocess(state: AgentState) -> AgentState:
    """Post-processing finale della risposta."""

    answer = state.get("answer", "")

    # Sanitizza output
    answer = sanitize_output(answer)

    # Formatta link come markdown
    answer = format_internal_links(answer, state.get("lang", "it"))

    # Aggiungi CTA se appropriato
    if state.get("should_trigger_lead") and state.get("lead_data"):
        cta = state["lead_data"].get("suggested_cta", {})
        if cta:
            answer += f"\n\n---\n\n{cta.get('text', '')}"

    return {
        **state,
        "answer": answer,
        "actions": state.get("actions", []) + ["postprocessed"],
    }


def format_internal_links(text: str, lang: str) -> str:
    """Formatta riferimenti a pagine interne come link markdown."""
    # Pattern per trovare riferimenti a pagine
    # Esempio: "vedi la pagina Chi siamo" -> "[Chi siamo](/it/chi-siamo)"

    page_mappings = {
        "it": {
            "chi siamo": "/it/chi-siamo",
            "contatti": "/it/contatti",
            "faq": "/it/faq",
            "prezzi": "/it/prezzi",
        },
        "en": {
            "about": "/en/about",
            "contact": "/en/contact",
            "faq": "/en/faq",
            "pricing": "/en/pricing",
        },
    }

    mappings = page_mappings.get(lang, {})

    for page_name, url in mappings.items():
        pattern = rf'\b{re.escape(page_name)}\b'
        text = re.sub(
            pattern,
            f"[{page_name}]({url})",
            text,
            flags=re.IGNORECASE,
        )

    return text
```

---

## 15. Sicurezza e Monitoring

### 15.1 Input Sanitization

```python
# src/utils/security.py
import re
from src.config import settings


# Pattern per prompt injection comuni
INJECTION_PATTERNS = [
    r"ignore (all )?(previous|above) instructions",
    r"disregard (all )?(previous|above)",
    r"forget (everything|all)",
    r"new instructions:",
    r"system prompt:",
    r"you are now",
    r"act as",
    r"pretend (to be|you are)",
]


def sanitize_input(text: str) -> str:
    """Sanitizza input utente."""

    # Limite lunghezza
    if len(text) > settings.max_input_length:
        text = text[:settings.max_input_length]

    # Rimuovi caratteri di controllo
    text = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', text)

    # Rileva tentativi di injection
    text_lower = text.lower()
    for pattern in INJECTION_PATTERNS:
        if re.search(pattern, text_lower):
            raise ValueError("Input non valido")

    return text.strip()


def sanitize_output(text: str) -> str:
    """Sanitizza output dell'LLM."""

    # Rimuovi eventuali leak del system prompt
    text = re.sub(r'<\|.*?\|>', '', text)
    text = re.sub(r'\[SYSTEM\].*?\[/SYSTEM\]', '', text, flags=re.DOTALL)

    # Rimuovi PII comuni (email, telefoni)
    # Solo se non sono nel contesto originale
    # text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '[email]', text)
    # text = re.sub(r'\b\d{10,}\b', '[phone]', text)

    return text.strip()


def validate_input(text: str) -> bool:
    """Valida input e solleva eccezione se non valido."""
    try:
        sanitize_input(text)
        return True
    except ValueError as e:
        raise e
```

### 15.2 Rate Limiting Middleware

```python
# src/api/middleware/rate_limit.py
import time
from collections import defaultdict
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware

from src.config import settings


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Middleware per rate limiting."""

    def __init__(self, app):
        super().__init__(app)
        self.requests = defaultdict(list)
        self.limit = settings.rate_limit_requests
        self.period = settings.rate_limit_period

    async def dispatch(self, request: Request, call_next):
        # Skip per health check
        if request.url.path == "/health":
            return await call_next(request)

        # Identifica client
        client_ip = self._get_client_ip(request)

        # Pulisci vecchie request
        now = time.time()
        self.requests[client_ip] = [
            t for t in self.requests[client_ip]
            if now - t < self.period
        ]

        # Verifica limite
        if len(self.requests[client_ip]) >= self.limit:
            raise HTTPException(
                status_code=429,
                detail="Too many requests. Please try again later.",
            )

        # Registra request
        self.requests[client_ip].append(now)

        return await call_next(request)

    def _get_client_ip(self, request: Request) -> str:
        # Considera header proxy
        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return request.client.host if request.client else "unknown"
```

### 15.3 Logging Middleware

```python
# src/api/middleware/logging.py
import time
import uuid
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import structlog

logger = structlog.get_logger()


class LoggingMiddleware(BaseHTTPMiddleware):
    """Middleware per logging strutturato."""

    async def dispatch(self, request: Request, call_next):
        request_id = str(uuid.uuid4())[:8]
        start_time = time.time()

        # Aggiungi request_id al context
        structlog.contextvars.clear_contextvars()
        structlog.contextvars.bind_contextvars(request_id=request_id)

        # Log request
        logger.info(
            "Request started",
            method=request.method,
            path=request.url.path,
            client=request.client.host if request.client else None,
        )

        try:
            response = await call_next(request)

            # Log response
            duration = time.time() - start_time
            logger.info(
                "Request completed",
                status_code=response.status_code,
                duration_ms=round(duration * 1000, 2),
            )

            # Aggiungi header request_id
            response.headers["X-Request-ID"] = request_id

            return response

        except Exception as e:
            duration = time.time() - start_time
            logger.error(
                "Request failed",
                error=str(e),
                duration_ms=round(duration * 1000, 2),
            )
            raise
```

---

## Appendice A: Comandi CLI

### Script Ingestion

```python
# scripts/ingest.py
import asyncio
import argparse

from src.core.rag.ingestion import run_ingestion


def main():
    parser = argparse.ArgumentParser(description="Ingestion contenuti nel vector store")
    parser.add_argument("--lang", choices=["it", "en"], help="Lingua specifica")
    parser.add_argument("--force", action="store_true", help="Forza re-indicizzazione completa")
    parser.add_argument("--init", action="store_true", help="Inizializza vector store")

    args = parser.parse_args()

    result = asyncio.run(run_ingestion(
        lang=args.lang,
        force=args.force or args.init,
    ))

    print(f"\n✅ Ingestion completata:")
    print(f"   - Contenuti processati: {result['processed']}/{result['total_contents']}")
    print(f"   - Chunks creati: {result['chunks_created']}")

    if result['errors']:
        print(f"   - Errori: {len(result['errors'])}")
        for err in result['errors']:
            print(f"     - {err['content_id']}: {err['error']}")


if __name__ == "__main__":
    main()
```

### Script Search Test

```python
# scripts/search.py
import asyncio
import argparse

from src.core.rag.retriever import ContentRetriever, RetrievalConfig


async def search(query: str, lang: str, top_k: int):
    config = RetrievalConfig(top_k=top_k)
    retriever = ContentRetriever(config)

    result = await retriever.retrieve(query=query, lang=lang)

    print(f"\n🔍 Query: {query}")
    print(f"   Lingua: {lang}")
    print(f"   Risultati: {len(result.documents)}\n")

    for i, (doc, score) in enumerate(zip(result.documents, result.scores or [])):
        print(f"{i+1}. [{score:.3f}] {doc.metadata.get('title', 'N/A')}")
        print(f"   URL: {doc.metadata.get('url', '')}")
        print(f"   Sezione: {doc.metadata.get('section_title', '-')}")
        print(f"   Preview: {doc.page_content[:200]}...")
        print()


def main():
    parser = argparse.ArgumentParser(description="Test search nel vector store")
    parser.add_argument("query", help="Query di ricerca")
    parser.add_argument("--lang", default="it", choices=["it", "en"])
    parser.add_argument("--top-k", type=int, default=5)

    args = parser.parse_args()

    asyncio.run(search(args.query, args.lang, args.top_k))


if __name__ == "__main__":
    main()
```

---

## Appendice B: Docker e Deployment

### Dockerfile

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY src/ ./src/
COPY scripts/ ./scripts/

# Create data directory
RUN mkdir -p /app/data

# Environment
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# Expose port
EXPOSE 8000

# Run
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: "3.8"

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - APP_ENV=production
      - DATABASE_URL=postgresql+asyncpg://user:pass@db:5432/agentic
      - REDIS_URL=redis://redis:6379/0
      - CHROMA_PERSIST_DIR=/app/data/chroma
    volumes:
      - ./content:/app/content:ro
      - ./data:/app/data
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: agentic
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  # Worker per job asincroni (opzionale)
  worker:
    build: .
    command: python -m src.worker
    environment:
      - APP_ENV=production
      - DATABASE_URL=postgresql+asyncpg://user:pass@db:5432/agentic
      - REDIS_URL=redis://redis:6379/0
    volumes:
      - ./content:/app/content:ro
      - ./data:/app/data
    depends_on:
      - db
      - redis

volumes:
  postgres_data:
  redis_data:
```

---

## Appendice C: Testing

### Conftest

```python
# tests/conftest.py
import pytest
from httpx import AsyncClient
from src.main import app


@pytest.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac


@pytest.fixture
def sample_content():
    return {
        "id": "test-article",
        "type": "article",
        "lang": "it",
        "title": "Articolo di Test",
        "description": "Descrizione test",
        "slug": "test-article",
        "canonical": "/it/articles/test-article",
        "content": "# Test\n\nContenuto di test per RAG.",
    }
```

### Test Chat API

```python
# tests/test_api/test_chat.py
import pytest


@pytest.mark.asyncio
async def test_chat_endpoint(client):
    response = await client.post(
        "/api/chat",
        json={
            "message": "Cosa fate?",
            "lang": "it",
            "stream": False,
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert "sources" in data


@pytest.mark.asyncio
async def test_chat_rate_limit(client):
    # Simula molte richieste
    for _ in range(65):
        await client.post(
            "/api/chat",
            json={"message": "test", "stream": False},
        )

    # La 66esima dovrebbe fallire
    response = await client.post(
        "/api/chat",
        json={"message": "test", "stream": False},
    )

    assert response.status_code == 429
```

---

## Conclusioni

Questa guida copre l'implementazione completa del backend Python per siti web agentici:

### Fase 0-1: Foundation
- Struttura progetto modulare
- Configurazione centralizzata con Pydantic
- Content service per gestione Markdown

### Fase 2: RAG Chat MVP
- Pipeline di ingestion con chunking intelligente
- Vector store (Chroma/FAISS) con embeddings
- Retrieval con filtri e reranking
- API FastAPI con streaming SSE
- LLM provider abstraction multi-provider

### Fase 3: Agentic Features
- LangGraph per orchestrazione a stati
- Intent classification
- Page Plan generation
- Lead generation triggers
- Memoria conversazionale
- Sicurezza e monitoring

Il sistema è progettato per essere **modulare**, **scalabile** e **production-ready**.

---

*— Fine Documento —*
