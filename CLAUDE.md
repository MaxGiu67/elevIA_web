# UPGRAI Project Structure

## Overview

UPGRAI is an AI framework with 20 standardized Use Cases in 5 areas (Knowledge, Customer Experience, Operations, Workflow, HR). The project is a monorepo with:

- **apps/api**: FastAPI backend with RAG capabilities
- **apps/web**: Next.js frontend landing page

## Infrastructure

- **Railway**: Frontend + Backend + Redis
- **Azure**: ChromaDB

---

## Monorepo Structure

```
UPGRAI/
├── apps/
│   ├── api/           # FastAPI backend
│   └── web/           # Next.js frontend
├── packages/          # Shared packages
├── docs/              # Documentation
├── _bmad/             # BMAD methodology files
├── _bmad-output/      # BMAD generated artifacts
├── docker-compose.yml
└── package.json       # Root workspace config
```

---

## apps/api Structure

```
apps/api/
├── .gitignore
├── Dockerfile
├── main.py
├── railway.toml
├── requirements.txt
├── api/
│   ├── __init__.py
│   └── routes/
│       ├── __init__.py
│       ├── chat.py
│       ├── health.py
│       └── lead.py
├── core/
│   ├── __init__.py
│   ├── config.py
│   ├── agent/
│   │   ├── __init__.py
│   │   └── nodes/
│   │       └── __init__.py
│   └── rag/
│       └── __init__.py
├── middleware/
│   └── __init__.py
├── models/
│   └── __init__.py
├── scripts/
│   └── __init__.py
└── services/
    └── __init__.py
```

### Key Files

- `main.py` - FastAPI application entry point
- `Dockerfile` - Container configuration for Railway deployment
- `railway.toml` - Railway deployment settings (healthcheck, commands)
- `api/routes/chat.py` - Chat endpoint for AI interactions
- `api/routes/health.py` - Health check endpoint
- `api/routes/lead.py` - Lead capture endpoint
- `core/config.py` - Configuration settings
- `core/agent/` - Agentic system components
- `core/rag/` - RAG (Retrieval Augmented Generation) components

---

## apps/web Structure

```
apps/web/
├── .gitignore
├── Dockerfile
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── content/           # JSON content files
│   ├── areas/
│   ├── problems/
│   └── use-cases/
├── public/
│   └── .gitkeep
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    └── components/
        ├── index.ts
        ├── ChatFloat.tsx
        ├── Footer.tsx
        ├── Header.tsx
        └── Hero.tsx
```

### Key Files

- `src/app/page.tsx` - Main landing page with 5 Areas, 20 Use Cases, Problems section
- `src/app/globals.css` - Global styles and button classes
- `src/components/Header.tsx` - Navigation header
- `src/components/Hero.tsx` - Hero section with key benefits
- `src/components/Footer.tsx` - Footer with CTA and links
- `src/components/ChatFloat.tsx` - Floating chat widget
- `tailwind.config.ts` - Tailwind configuration with UPGRAI color scheme
- `content/` - JSON files for dynamic content (Use Cases, Problems, Areas)

---

## Color Scheme

- **Primary (Orange)**: `#F5921B`
- **Secondary (Blue)**: `#2FA7E6`
- **Dark**: `#0A0A0A`

---

## UPGRAI Product: 20 Use Cases in 5 Areas

### 1. Knowledge
- RAG Knowledge Base
- Estrazione Dati
- Sintesi Riunioni
- Due Diligence

### 2. Customer Experience
- Chatbot FAQ
- Classificazione Ticket
- Copilot Operatore
- Analisi Sentiment

### 3. Operations
- Report Automatici
- Ricerca Semantica
- Anomaly Detection
- Predictive Maintenance

### 4. Workflow
- Workflow Approval
- Content Generation
- Lead Scoring
- Compliance Checker

### 5. HR
- Screening CV
- Onboarding Assistant
- Employee Self-Service
- Performance Review

---

## Key Metrics

- **20** Use Case AI
- **15 giorni** Tempo medio di delivery
- **85%+** Accuracy garantita
- **99%** Disponibilità
