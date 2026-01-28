---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
workflowType: 'epics'
status: 'complete'
completedAt: '2026-01-28'
project_name: 'UPGRAI'
user_name: 'Max'
date: '2026-01-28'
totalEpics: 6
totalStories: 24
frCoverage: '26/26 (100%)'
---

# UPGRAI - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for UPGRAI, decomposing the requirements from the PRD and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

**Content Presentation (4 FRs):**
- FR1: Il Visitatore può visualizzare la landing page con tutti i contenuti UPGRAI in formato statico
- FR2: Il Visitatore può navigare i diversi blocchi di contenuto (Hero, Use Cases, Features, CTA)
- FR3: Il Visitatore può visualizzare i blocchi UI in configurazioni diverse in base al Page Plan attivo
- FR4: Il sistema può renderizzare la pagina in modo SEO-friendly (SSR/SSG)

**Chatbot Interaction (5 FRs):**
- FR5: Il Visitatore può aprire il chatbot dalla landing page
- FR6: Il Visitatore può digitare domande in linguaggio naturale nel chatbot
- FR7: Il Visitatore può ricevere risposte testuali basate sulla knowledge base RAG
- FR8: Il Visitatore può vedere le fonti (Use Case) da cui proviene la risposta
- FR9: Il sistema può processare query in italiano

**Page Remodulation (5 FRs):**
- FR10: Il sistema può analizzare l'intento dell'utente dalla domanda chatbot
- FR11: Il sistema può generare un Page Plan (JSON) che descrive la nuova organizzazione UI
- FR12: Il sistema può riorganizzare i blocchi UI in base al Page Plan generato
- FR13: Il Visitatore può vedere la transizione tra layout statico e layout rimodulato
- FR14: Il sistema può prioritizzare blocchi di contenuto rilevanti all'intento

**Lead Generation (4 FRs):**
- FR15: Il Visitatore può visualizzare un form di contatto
- FR16: Il Visitatore può compilare il form con nome, email, azienda (opzionale), messaggio
- FR17: Il Visitatore può inviare il form e ricevere conferma
- FR18: Il sistema può salvare i lead submissions

**System Resilience (4 FRs):**
- FR19: Il sistema può rilevare quando l'AI/LLM non è disponibile
- FR20: Il sistema può mostrare la landing page statica come fallback
- FR21: Il sistema può mostrare un messaggio appropriato se il chatbot non è disponibile
- FR22: Il sistema può rispondere a health check per monitoraggio

**Content Intelligence - RAG (4 FRs):**
- FR23: Il sistema può indicizzare tutti i documenti Use Case da Build.003/
- FR24: Il sistema può eseguire retrieval semantico sui documenti indicizzati
- FR25: Il sistema può generare risposte basate esclusivamente sui documenti retrieval
- FR26: Il sistema può evitare risposte su argomenti non presenti nella knowledge base

### NonFunctional Requirements

**Performance (5 NFRs):**
- NFR-P1: Page Load - Largest Contentful Paint (LCP) < 3 secondi
- NFR-P2: Chatbot Response - Risposta completa < 10 secondi
- NFR-P3: Remodulation - Transizione UI < 500ms (animazione smooth)
- NFR-P4: Interactivity - Time to Interactive (TTI) < 5 secondi
- NFR-P5: Health Check - API response < 200ms

**Security (6 NFRs):**
- NFR-S1: API Key Protection - Chiavi API mai esposte nel frontend (backend-only)
- NFR-S2: Input Sanitization - Input chatbot sanitizzato contro XSS e injection
- NFR-S3: Prompt Injection - Validazione input per prevenire manipolazione prompt
- NFR-S4: Transport Security - HTTPS obbligatorio per tutte le comunicazioni
- NFR-S5: Rate Limiting - Max 10 richieste/minuto per IP su endpoint chat
- NFR-S6: CORS Policy - Richieste accettate solo da dominio frontend autorizzato

**Reliability (5 NFRs):**
- NFR-R1: Static Availability - Landing page statica disponibile 99.9% del tempo
- NFR-R2: Graceful Degradation - Fallback a statico entro 15 secondi se AI non risponde
- NFR-R3: Form Independence - Form lead funzionante indipendentemente da stato AI
- NFR-R4: Error Handling - Nessun crash visibile utente (error boundary)
- NFR-R5: Monitoring - Health check endpoint sempre disponibile

**Accessibility (5 NFRs):**
- NFR-A1: WCAG Compliance - Level AA per form e navigation principali
- NFR-A2: Color Contrast - Rapporto contrasto minimo 4.5:1
- NFR-A3: Form Labels - Labels e ARIA attributes corretti su tutti i form
- NFR-A4: Keyboard Navigation - Tab order logico, focus visibile
- NFR-A5: Screen Reader - Chatbot utilizzabile con screen reader (supporto base)

### Additional Requirements

**From Architecture:**

- **Starter Template (EPIC 1 STORY 1)**:
  - Frontend: `npx create-next-app@latest apps/web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
  - Backend: Custom structure from guida tecnica con FastAPI + LangChain + LangGraph
- **Content Storage**: JSON files in Git (`content/use-cases/`, `content/areas/`, `content/problems/`)
- **Lead Storage**: JSON file append-only (`data/leads.json`) + email notification
- **Cache Setup**: Redis 7+ via Railway PRO per session/conversation memory
- **Vector Store**: ChromaDB 0.4+ per RAG embeddings
- **State Management**: Zustand 4.x per Page Plan state
- **Animations**: Framer Motion 11.x per layout transitions durante remodulation
- **File Size Rule**: 800-1000 righe per file, split obbligatorio se supera
- **RAG Knowledge Base**: `content/` JSON files (Use Cases, Areas, Problems)
- **API Communication**: REST + SSE (Server-Sent Events) per chat streaming
- **Deployment**: Vercel (frontend) + Railway PRO (backend + Redis)

> **Architecture Decision (2026-01-28):** PostgreSQL rimosso. JSON files come source of truth, versionati in Git. Vedi `docs/brainstorming-page-remodulation.md` sezione 13.

**From PRD - MVP Features (P0):**
- MVP-01: Landing page statica completa
- MVP-02: Chatbot UI
- MVP-03: RAG su Build.003/
- MVP-04: Page Plan JSON generation
- MVP-05: UI remodulation engine
- MVP-06: Form lead generation
- MVP-07: Graceful degradation
- MVP-08: Health check API

### FR Coverage Map

| FR | Epic | Descrizione |
|----|------|-------------|
| FR1 | Epic 1 | Landing page statica completa |
| FR2 | Epic 1 | Navigazione blocchi contenuto |
| FR3 | Epic 4 | Blocchi UI in configurazioni diverse |
| FR4 | Epic 1 | Rendering SEO-friendly |
| FR5 | Epic 3 | Apertura chatbot |
| FR6 | Epic 3 | Input domande naturali |
| FR7 | Epic 3 | Risposte RAG-based |
| FR8 | Epic 3 | Visualizzazione fonti |
| FR9 | Epic 3 | Query in italiano |
| FR10 | Epic 4 | Analisi intento utente |
| FR11 | Epic 4 | Generazione Page Plan JSON |
| FR12 | Epic 4 | Riorganizzazione blocchi UI |
| FR13 | Epic 4 | Transizione layout animata |
| FR14 | Epic 4 | Prioritizzazione contenuti |
| FR15 | Epic 5 | Form contatto visibile |
| FR16 | Epic 5 | Compilazione form |
| FR17 | Epic 5 | Invio e conferma |
| FR18 | Epic 5 | Salvataggio lead |
| FR19 | Epic 6 | Rilevamento AI non disponibile |
| FR20 | Epic 1 | Fallback landing statica |
| FR21 | Epic 6 | Messaggio chatbot non disponibile |
| FR22 | Epic 6 | Health check endpoint |
| FR23 | Epic 2 | Indicizzazione documenti Build.003/ |
| FR24 | Epic 2 | Retrieval semantico |
| FR25 | Epic 2 | Risposte basate su retrieval |
| FR26 | Epic 2 | Evitare risposte fuori scope |

**Copertura:** 26/26 FRs mappati (100%)

## Epic List

### Epic 1: Project Foundation & Static Landing
**Goal:** Il Visitatore può accedere e navigare la landing page UPGRAI in modo completo, anche quando il sistema AI non è disponibile. La pagina è ottimizzata per SEO e rappresenta il fallback sempre funzionante.

**FRs covered:** FR1, FR2, FR4, FR20
**NFRs addressed:** NFR-P1, NFR-P4, NFR-R1, NFR-S4, NFR-A1-A4

**Stories previste:**
- Setup monorepo (Next.js + FastAPI)
- Setup databases (PostgreSQL, Redis via Railway)
- Landing page statica con blocchi UI
- SEO optimization e metadata

---

### Epic 2: RAG Knowledge System
**Goal:** Il sistema può comprendere e recuperare informazioni dalla knowledge base aziendale (Build.003/), fornendo risposte accurate basate esclusivamente sui documenti indicizzati.

**FRs covered:** FR23, FR24, FR25, FR26
**NFRs addressed:** NFR-S1, NFR-S3

**Stories previste:**
- Setup ChromaDB vector store
- Ingestion pipeline documenti
- Retrieval semantico
- Guardrails anti-hallucination

---

### Epic 3: Conversational Experience
**Goal:** Il Visitatore può interagire con un chatbot intelligente che risponde alle domande in italiano, mostrando le fonti delle risposte e fornendo un'esperienza conversazionale fluida.

**FRs covered:** FR5, FR6, FR7, FR8, FR9
**NFRs addressed:** NFR-P2, NFR-S2, NFR-S5, NFR-A5

**Stories previste:**
- ChatWidget UI component
- SSE streaming responses
- Visualizzazione fonti
- Rate limiting

---

### Epic 4: Page Remodulation Magic
**Goal:** Il Visitatore vive l'effetto "aha!" quando la pagina si riorganizza dinamicamente in base alle sue domande, mostrando esattamente i contenuti più rilevanti per il suo intento.

**FRs covered:** FR3, FR10, FR11, FR12, FR13, FR14
**NFRs addressed:** NFR-P3

**Stories previste:**
- Intent analysis node (LangGraph)
- Page Plan JSON generation
- PagePlanRenderer + Zustand store
- Framer Motion layout animations

---

### Epic 5: Lead Generation
**Goal:** Il Visitatore può contattare l'azienda compilando un form sempre funzionante, con i dati salvati in JSON file + notifica email per il follow-up commerciale.

**FRs covered:** FR15, FR16, FR17, FR18
**NFRs addressed:** NFR-R3, NFR-A3

**Stories previste:**
- LeadForm component
- API endpoint /api/lead
- JSON file persistence (append-only)
- Email notification
- Conferma invio

---

### Epic 6: System Resilience & Monitoring
**Goal:** Il sistema è sempre affidabile grazie a graceful degradation automatica, health checks e gestione errori che garantiscono un'esperienza utente consistente anche in caso di problemi.

**FRs covered:** FR19, FR21, FR22
**NFRs addressed:** NFR-R2, NFR-R4, NFR-R5, NFR-P5

**Stories previste:**
- Health check API
- Circuit breaker pattern
- Error boundaries frontend
- Fallback messaging

---

## Epic 1: Project Foundation & Static Landing

Il Visitatore può accedere e navigare la landing page UPGRAI in modo completo, anche quando il sistema AI non è disponibile.

### Story 1.1: Setup Monorepo Structure

As a Developer,
I want to initialize the monorepo with Next.js frontend and FastAPI backend,
So that I have a solid foundation for building the UPGRAI application.

**Acceptance Criteria:**

**Given** an empty project directory
**When** I run the initialization commands from Architecture document
**Then** the monorepo structure is created with apps/web and apps/api folders
**And** Next.js 14+ is configured with TypeScript, Tailwind, ESLint, App Router
**And** FastAPI backend has the layered structure from guida tecnica
**And** Both projects have .env.example files with required variables
**And** docker-compose.yml is created for local PostgreSQL and Redis

---

### Story 1.2: Setup Railway Redis

As a Developer,
I want to configure Redis on Railway PRO,
So that the application has session management and caching capabilities.

**Acceptance Criteria:**

**Given** a Railway PRO account is available
**When** I create Redis 7+ service
**Then** connection string is available in Railway dashboard
**And** apps/api can connect to Redis using environment variables
**And** redis.py establishes Redis connection with TTL support
**And** Health check confirms Redis connection works

> **Note:** PostgreSQL removed from architecture. Content is managed via JSON files in Git, leads via JSON file + email notification.

---

### Story 1.3: Static Landing Page Hero Section

As a Visitatore,
I want to see a compelling Hero section when I land on the page,
So that I immediately understand what UPGRAI offers.

**Acceptance Criteria:**

**Given** I navigate to the UPGRAI landing page
**When** the page loads
**Then** I see a Hero section with headline, subheadline, and CTA button
**And** The page loads with LCP < 3 seconds (NFR-P1)
**And** The Hero is server-side rendered for SEO (FR4)
**And** Color contrast meets WCAG 2.1 AA (NFR-A2)
**And** The layout is responsive (desktop-first, mobile-friendly)

---

### Story 1.4: Landing Page Content Blocks

As a Visitatore,
I want to navigate different content sections on the landing page,
So that I can learn about UPGRAI's features and use cases.

**Acceptance Criteria:**

**Given** I am on the UPGRAI landing page
**When** I scroll down the page
**Then** I see Features section with key product benefits
**And** I see Use Cases section with examples
**And** I see a CTA section encouraging contact
**And** Each block is a separate component in features/landing/components/
**And** Navigation between blocks is smooth
**And** Keyboard navigation works correctly (NFR-A4)
**And** Page is fully functional as static fallback (FR20)

---

### Story 1.5: SEO Optimization and Metadata

As a Search Engine,
I want to properly index the UPGRAI landing page,
So that potential customers can find it through search.

**Acceptance Criteria:**

**Given** the landing page is deployed
**When** a search engine crawler visits the page
**Then** proper meta tags are present (title, description, og:image)
**And** Canonical URL is set and stable
**And** The page is SSR/SSG rendered (not client-only)
**And** robots.txt allows indexing
**And** sitemap.xml includes the landing page
**And** Structured data (JSON-LD) for organization is present

---

## Epic 2: RAG Knowledge System

Il sistema può comprendere e recuperare informazioni dalla knowledge base aziendale (Build.003/).

### Story 2.1: Setup ChromaDB Vector Store

As a Developer,
I want to configure ChromaDB as the vector store,
So that documents can be embedded and retrieved semantically.

**Acceptance Criteria:**

**Given** the FastAPI backend is running
**When** the vector store service is initialized
**Then** ChromaDB 0.4+ collection is created for UPGRAI documents
**And** services/vector_store.py provides add/query interfaces
**And** Embeddings use OpenAI text-embedding-ada-002 (configurable)
**And** API keys are stored only in backend (NFR-S1)
**And** Collection persists across application restarts

---

### Story 2.2: Document Ingestion Pipeline

As a Developer,
I want to ingest all documents from Build.003/,
So that the RAG system has knowledge to answer questions.

**Acceptance Criteria:**

**Given** documents exist in Build.003/CatalogoUseCase/ and Build.003/Governance/
**When** I run the ingestion script (scripts/ingest.py)
**Then** all markdown/text documents are chunked appropriately
**And** Each chunk is embedded and stored in ChromaDB
**And** Metadata includes source file path and section
**And** 100% of Build.003/ documents are indexed (FR23)
**And** Ingestion is idempotent (can re-run safely)
**And** Log output shows progress and any errors

---

### Story 2.3: Semantic Retrieval Service

As a Sistema,
I want to retrieve relevant documents for user queries,
So that answers are grounded in actual knowledge base content.

**Acceptance Criteria:**

**Given** documents are indexed in ChromaDB
**When** a query is submitted to core/rag/retriever.py
**Then** top-k most relevant chunks are returned (FR24)
**And** Similarity scores are included with results
**And** Retrieved chunks include source metadata
**And** Query in Italian returns relevant Italian content (FR9)
**And** Empty results are handled gracefully

---

### Story 2.4: Anti-Hallucination Guardrails

As a Sistema,
I want to prevent the AI from inventing information,
So that users only receive accurate, sourced responses.

**Acceptance Criteria:**

**Given** a user asks a question
**When** no relevant documents are found in retrieval
**Then** the system responds with "I don't have information on that topic" (FR26)
**And** The system never generates content without retrieval sources (FR25)
**And** Prompt engineering includes explicit grounding instructions
**And** Input is validated against prompt injection patterns (NFR-S3)
**And** System prompt is protected from manipulation

---

## Epic 3: Conversational Experience

Il Visitatore può interagire con un chatbot intelligente che risponde alle domande in italiano.

### Story 3.1: ChatWidget UI Component

As a Visitatore,
I want to open a chat widget on the landing page,
So that I can ask questions about UPGRAI.

**Acceptance Criteria:**

**Given** I am on the landing page
**When** I click the chat icon
**Then** a chat widget opens (FR5)
**And** I see a text input field for my question
**And** The widget is accessible via keyboard (NFR-A4)
**And** Screen reader announces the chat is open (NFR-A5)
**And** The widget uses Zustand for local state (chatStore.ts)
**And** The widget is positioned consistently (bottom-right)

---

### Story 3.2: Chat API Endpoint with SSE Streaming

As a Visitatore,
I want to receive streaming responses to my questions,
So that I see the answer appearing progressively.

**Acceptance Criteria:**

**Given** I have typed a question in the chatbot
**When** I submit the question (FR6)
**Then** POST /api/chat receives my message
**And** Response streams via SSE (event: chat_chunk)
**And** Each chunk updates the UI progressively
**And** Complete response arrives within 10 seconds (NFR-P2)
**And** Input is sanitized against XSS (NFR-S2)
**And** useChatStream.ts hook manages the SSE connection

---

### Story 3.3: Source Citation Display

As a Visitatore,
I want to see where the answer comes from,
So that I can trust the information is accurate.

**Acceptance Criteria:**

**Given** I receive a chatbot response
**When** the response includes retrieved sources
**Then** I see a "Sources" section below the answer (FR8)
**And** Each source shows the Use Case name/reference
**And** Sources are clickable or expandable for details
**And** If no sources, a note indicates the answer is general
**And** ChatSources.tsx component renders the citations

---

### Story 3.4: Rate Limiting Middleware

As a Sistema,
I want to limit chat requests per IP,
So that the system is protected from abuse.

**Acceptance Criteria:**

**Given** a user is sending chat requests
**When** they exceed 10 requests per minute (NFR-S5)
**Then** subsequent requests return 429 Too Many Requests
**And** Error message is user-friendly ("Please wait before asking another question")
**And** Rate limit resets after 1 minute
**And** middleware/rate_limit.py tracks requests per IP
**And** Legitimate users are not affected under normal use

---

## Epic 4: Page Remodulation Magic

Il Visitatore vive l'effetto "aha!" quando la pagina si riorganizza dinamicamente.

### Story 4.1: Intent Analysis Node

As a Sistema,
I want to analyze the user's intent from their question,
So that I can determine how to reorganize the page.

**Acceptance Criteria:**

**Given** a user submits a question in the chatbot
**When** the LangGraph agent processes the message
**Then** core/agent/nodes/classify_intent.py extracts the intent
**And** Intent categories include: use_case_query, feature_inquiry, contact_request, general_info
**And** Intent includes relevant keywords/topics
**And** Intent analysis completes within the 10s response time (FR10)
**And** Intent is passed to the page_plan node

---

### Story 4.2: Page Plan JSON Generation

As a Sistema,
I want to generate a Page Plan JSON based on user intent,
So that the frontend knows how to reorganize the UI.

**Acceptance Criteria:**

**Given** user intent has been classified
**When** core/agent/nodes/page_plan.py executes
**Then** a Page Plan JSON is generated (FR11)
**And** JSON follows the schema: {variant_id, blocks: [{type, props, content_ref}]}
**And** Blocks are prioritized by relevance to intent (FR14)
**And** Page Plan is sent via SSE event: page_plan
**And** Invalid intents result in default layout (no error)
**And** models/page_plan.py validates the JSON with Pydantic

---

### Story 4.3: PagePlanRenderer with Zustand Store

As a Visitatore,
I want to see the page reorganize based on my question,
So that relevant content is immediately visible.

**Acceptance Criteria:**

**Given** a Page Plan JSON is received from the API
**When** the frontend processes the event
**Then** pagePlanStore.ts updates with the new plan
**And** PagePlanRenderer.tsx renders blocks in new order (FR12)
**And** Irrelevant blocks are hidden or minimized
**And** Relevant blocks are expanded/highlighted
**And** CTA remains always visible
**And** The new layout reflects my question's topic

---

### Story 4.4: Framer Motion Layout Animations

As a Visitatore,
I want to see a smooth transition when the page reorganizes,
So that the change feels natural and delightful (aha! effect).

**Acceptance Criteria:**

**Given** the Page Plan triggers a layout change
**When** blocks reorder on the page
**Then** Framer Motion animates the transition (FR13)
**And** Animation completes within 500ms (NFR-P3)
**And** Layout animations use layoutId for smooth morphing
**And** blockTransitions.ts defines reusable animation variants
**And** No layout shift or jank during animation
**And** Reduced motion preference is respected (prefers-reduced-motion)

---

## Epic 5: Lead Generation

Il Visitatore può contattare l'azienda compilando un form sempre funzionante.

### Story 5.1: Lead Form Component

As a Visitatore,
I want to see and interact with a contact form,
So that I can request more information from UPGRAI.

**Acceptance Criteria:**

**Given** I am on the landing page
**When** I navigate to the contact section
**Then** I see a form with fields: name, email, company (optional), message (FR15, FR16)
**And** All fields have proper labels and ARIA attributes (NFR-A3)
**And** Form validation shows clear error messages
**And** Required fields are marked appropriately
**And** LeadForm.tsx is accessible via keyboard (NFR-A4)
**And** Form is always visible regardless of AI status (NFR-R3)

---

### Story 5.2: Lead API Endpoint

As a Sistema,
I want to receive and validate lead submissions,
So that valid leads are processed correctly.

**Acceptance Criteria:**

**Given** a user submits the lead form
**When** POST /api/lead receives the data
**Then** Input is validated (email format, required fields)
**And** Valid submissions return {success: true, id: uuid}
**And** Invalid submissions return 400 with clear error message
**And** models/lead.py defines Pydantic schema
**And** api/routes/lead.py handles the endpoint

---

### Story 5.3: JSON Lead Storage

As a Sistema,
I want to persist lead data in JSON file,
So that leads are available for follow-up without database dependency.

**Acceptance Criteria:**

**Given** a valid lead is submitted
**When** the API processes the submission
**Then** Lead is appended to data/leads.json file (FR18)
**And** Entry schema: {id: UUID, name, email, company, message, created_at, source_page}
**And** services/lead_service.py handles JSON file operations (append-only)
**And** Lead ID (UUID) is returned in the API response
**And** Optional: Email notification sent to admin on new lead
**And** File errors are handled gracefully (fallback to email-only notification)

> **Note:** JSON file is append-only for data integrity. Git versioning provides automatic backup.

---

### Story 5.4: Form Submission Confirmation

As a Visitatore,
I want to receive confirmation when I submit the form,
So that I know my message was received.

**Acceptance Criteria:**

**Given** I submit the lead form
**When** the submission is successful
**Then** I see a success message "Grazie! Ti contatteremo presto." (FR17)
**And** FormSuccess.tsx component displays the confirmation
**And** Form fields are reset after successful submission
**And** Success state is managed in local component state
**And** If submission fails, I see an error message with retry option

---

## Epic 6: System Resilience & Monitoring

Il sistema è sempre affidabile grazie a graceful degradation automatica.

### Story 6.1: Health Check API

As a DevOps Engineer,
I want to monitor system health via API,
So that I can ensure all services are running correctly.

**Acceptance Criteria:**

**Given** the backend is deployed
**When** GET /api/health is called
**Then** Response includes {status: "ok", rag: "ok/error", redis: "ok/error"} (FR22)
**And** Response time is < 200ms (NFR-P5)
**And** Endpoint checks ChromaDB and Redis connections
**And** If any service is down, status reflects the issue
**And** api/routes/health.py implements the endpoint
**And** Health endpoint is always available (NFR-R5)

> **Note:** PostgreSQL check removed - no database in architecture.

---

### Story 6.2: Error Boundaries Frontend

As a Visitatore,
I want the application to handle errors gracefully,
So that I never see a blank page or crash.

**Acceptance Criteria:**

**Given** a component encounters a runtime error
**When** the error occurs
**Then** ErrorBoundary.tsx catches the error (NFR-R4)
**And** A user-friendly fallback UI is shown
**And** The rest of the application continues working
**And** Error is logged for debugging (console in dev, structured in prod)
**And** Each major section has its own error boundary

---

### Story 6.3: Graceful Degradation & Fallback

As a Visitatore,
I want the site to work even when AI is unavailable,
So that I can still access information and contact UPGRAI.

**Acceptance Criteria:**

**Given** the AI/LLM service is unavailable
**When** I try to use the chatbot
**Then** System detects the unavailability within 15 seconds (FR19, NFR-R2)
**And** Chatbot shows "Servizio temporaneamente non disponibile" (FR21)
**And** A direct CTA to the contact form is displayed
**And** Static landing page remains fully functional (FR20)
**And** Form submission works independently (NFR-R3)

---

### Story 6.4: Circuit Breaker Pattern

As a Sistema,
I want to prevent cascade failures when external services fail,
So that the application remains stable under stress.

**Acceptance Criteria:**

**Given** the LLM API is responding slowly or failing
**When** multiple requests timeout
**Then** Circuit breaker opens after 3 consecutive failures
**And** Subsequent requests fail fast (no waiting)
**And** After 30 seconds, circuit enters half-open state
**And** One test request determines if circuit closes
**And** All circuit breaker states are logged
**And** Frontend receives appropriate error messages
