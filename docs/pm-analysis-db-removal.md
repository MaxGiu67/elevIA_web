# PM Analysis: Rimozione PostgreSQL

**Data:** 2026-01-28
**PM:** John (BMAD Framework)
**Documento di riferimento:** `docs/brainstorming-page-remodulation.md`

## Executive Summary

In base alle decisioni architetturali documentate nel brainstorming, PostgreSQL deve essere rimosso dal progetto. Il contenuto sarà gestito tramite file JSON versionati in Git, e i lead saranno salvati tramite file JSON + notifica email.

## Decisione Architetturale

### PRIMA (BMAD originale)
```
PostgreSQL ───────────────────┐
    │                         │
    ├── Lead Storage          │
    └── (potenziale content)  │
                              ▼
Redis ────────────────────────┤
    │                         │
    └── Session/Cache         │
                              ▼
ChromaDB ─────────────────────┤
    │                         │
    └── RAG Embeddings        │
```

### DOPO (Nuova architettura)
```
JSON Files (Git) ─────────────┐
    │                         │
    ├── Content (Use Cases)   │
    ├── Areas                 │
    ├── Problems              │
    └── Leads (append-only)   │
                              ▼
Redis ────────────────────────┤
    │                         │
    └── Session/Cache         │
                              ▼
ChromaDB ─────────────────────┤
    │                         │
    └── RAG Embeddings        │
```

## File BMAD da Aggiornare

### 1. PRD (`prd.md`)

| Sezione | Riferimento | Azione |
|---------|-------------|--------|
| Backend Architecture | "PostgreSQL 15+ via Railway PRO" | Rimuovere |
| Technical Decisions | Database references | Aggiornare |
| Deployment | "Railway PRO (backend + PostgreSQL + Redis)" | Rimuovere PostgreSQL |

### 2. Epics (`epics.md`)

| Story | Titolo | Azione |
|-------|--------|--------|
| Story 1.2 | Setup Railway Databases | Rinominare in "Setup Railway Redis" - rimuovere PostgreSQL |
| Story 5.3 | PostgreSQL Lead Storage | Cambiare in "JSON Lead Storage" |
| Story 6.1 | Health Check API | Rimuovere check PostgreSQL |

### 3. Architecture (`architecture.md`)

| Sezione | Azione |
|---------|--------|
| Data Layer | Rimuovere PostgreSQL, aggiungere JSON files |
| Deployment | Rimuovere PostgreSQL da Railway |
| Services | Cambiare lead_service.py da PostgreSQL a JSON |
| Docker Compose | Rimuovere PostgreSQL container |

## Stories Aggiornate

### Story 1.2 (AGGIORNATA): Setup Railway Redis

**PRIMA:**
```
As a Developer,
I want to configure PostgreSQL and Redis on Railway PRO,
So that the application has production-ready data persistence.
```

**DOPO:**
```
As a Developer,
I want to configure Redis on Railway PRO,
So that the application has session management and caching.

Acceptance Criteria:
- Given a Railway PRO account is available
- When I create Redis 7+ service
- Then connection string is available in Railway dashboard
- And apps/api can connect to Redis using environment variables
- And redis.py establishes Redis connection with TTL support
- And Health check confirms Redis connection works
```

### Story 5.3 (AGGIORNATA): JSON Lead Storage

**PRIMA:**
```
PostgreSQL Lead Storage
- Lead is saved to PostgreSQL leads table
- Table schema: id, name, email, company, message, created_at
```

**DOPO:**
```
JSON Lead Storage

As a Sistema,
I want to persist lead data in JSON file,
So that leads are available for follow-up without database dependency.

Acceptance Criteria:
- Given a valid lead is submitted
- When the API processes the submission
- Then Lead is appended to data/leads.json file
- And Entry includes: id (UUID), name, email, company, message, created_at
- And File is append-only for data integrity
- And Optional: email notification is sent to admin
- And services/lead_service.py handles JSON file operations
- And File errors are handled gracefully (fallback to email-only)
```

### Story 6.1 (AGGIORNATA): Health Check API

**PRIMA:**
```
Response includes {status: "ok", rag: "ok/error", db: "ok/error"}
Endpoint checks ChromaDB, PostgreSQL, Redis connections
```

**DOPO:**
```
Response includes {status: "ok", rag: "ok/error", redis: "ok/error"}
Endpoint checks ChromaDB and Redis connections
```

## Claude Code Skills Create

Le seguenti skill sono state create e devono essere testate:

| Skill | File | Scopo |
|-------|------|-------|
| /content | `.claude/commands/content.md` | Gestione contenuti JSON |
| /content-update | `.claude/commands/content-update.md` | Aggiornamenti massivi |
| /content-ai | `.claude/commands/content-ai.md` | Generazione AI contenuti |

### Test da Eseguire

1. `/content list use-cases` - Deve listare tutti gli use case
2. `/content create use-case` - Deve creare nuovo JSON
3. `/content-update aggiorna tutti i KPI` - Deve mostrare preview e chiedere conferma
4. `/content-ai genera use case per analisi contratti` - Deve generare JSON completo

## Impatto su File Esistenti

### File da Rimuovere/Non Creare
- `apps/api/infra/database.py` - Non necessario
- `docker-compose.yml` PostgreSQL service - Non necessario
- `services/lead_service.py` versione PostgreSQL

### File da Creare
- `data/leads.json` - Storage lead
- `content/use-cases/*.json` - Use Case
- `content/areas/*.json` - Aree
- `content/problems/*.json` - Problemi

## Checklist PM

- [ ] Aggiornare PRD rimuovendo PostgreSQL
- [ ] Aggiornare Epics con nuove story
- [ ] Aggiornare Architecture document
- [ ] Verificare che le skill Claude Code funzionino
- [ ] Creare struttura cartelle content/
- [ ] Documentare nuovo workflow contenuti

## Rischi Mitigati

| Rischio Originale | Mitigazione |
|-------------------|-------------|
| Complessità database | Eliminato - JSON files |
| Costi Railway PostgreSQL | Eliminato |
| Setup database complesso | Semplificato |
| Backup database | Git versioning automatico |

## Benefici

1. **Semplicità**: No database da gestire
2. **Costi**: Solo Redis su Railway (già incluso nel piano)
3. **SEO**: JSON files → SSG → 100% crawlable
4. **LLM**: Contenuti in plain text facilmente indicizzabili
5. **Versioning**: Git history per tutti i contenuti
6. **Collaboration**: Team può editare JSON direttamente
