---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
workflowStatus: completed
completedAt: '2026-01-28'
inputDocuments:
  - Analisi_Funzionale_Framework_Agentic_Website.md
  - Backend_Python_LangChain_LangGraph_Guida_Tecnica.md
  - Frontend_NextJS_PagePlan_Guida_Tecnica.md
  - analisi_framework_siti_agentici.md
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 4
projectType: brownfield
classification:
  projectType: web_app_api_backend
  domain: martech_ai
  complexity: medium-high
  projectContext: brownfield
---

# Product Requirements Document - UPGRAI

**Author:** Max
**Date:** 2026-01-27

## Executive Summary

UPGRAI è una landing page B2B con sistema agentico innovativo che **rimodula dinamicamente la visualizzazione** in base alle domande dell'utente nel chatbot. L'innovazione chiave è il **Page Plan**: l'AI analizza l'intento della domanda e genera un JSON che riorganizza i blocchi UI, creando un effetto "aha!" dove l'utente vede esattamente quello che cercava. Il sistema utilizza RAG sui documenti Use Case aziendali (Build.003/) per le risposte, con graceful degradation a landing statica se l'AI non è disponibile. **Obiettivo MVP (10 giorni)**: validare il meccanismo di rimodulazione e generare lead tramite form contatto.

## Panoramica Prodotto

UPGRAI è un sito web con sistema agentico che rimodula dinamicamente la visualizzazione della landing page in base alle domande dell'utente nel chatbot. Il contenuto proviene da una knowledge base RAG (Use Case aziendali), ma la presentazione si adatta all'intento dell'utente tramite il meccanismo di Page Plan.

**Flusso utente:**
1. L'utente arriva sulla landing page di UPGRAI
2. Naviga il sito normalmente, trova tutte le informazioni
3. Fa una domanda nel chatbot
4. Il sistema agentico rimodula la visualizzazione della pagina
5. L'utente vede esattamente quello che cercava e compila il form di contatto

## Criteri di Successo

### Successo Utente

- L'utente fa una domanda e la pagina si **rimodula dinamicamente** mostrando contenuti pertinenti
- L'utente prova **sorpresa ed efficienza** nel vedere esattamente quello che cercava
- L'utente continua la navigazione e **compila il form** di contatto/lead
- Tempo di risposta accettabile (qualche secondo, da validare con test)

### Successo Business

- **Lead generation** tramite compilazione form di contatto
- Nessun target numerico per MVP - l'obiettivo è validare il meccanismo di rimodulazione
- Il sito funziona come **landing statica** anche quando l'AI non è disponibile (graceful degradation)

### Successo Tecnico

- **SEO preservata** anche dopo rimodulazione (URL canonical stabile)
- **UI consistente** prima e dopo la rimodulazione (stesso design system)
- **Graceful degradation**: il sito statico è sempre funzionante
- **RAG completo**: tutti gli Use Case di `Build.003/` indicizzati e interrogabili
- **Page Plan funzionante**: l'AI genera JSON che riorganizza i blocchi UI in base all'intento

### Metriche Misurabili

| Metrica | Target MVP |
|---------|------------|
| Rimodulazione pagina | Funzionante al 100% delle richieste |
| Tempo risposta chat | < 10 secondi (da validare) |
| Fallback statico | Sempre disponibile |
| Use Case nel RAG | 100% di Build.003/ |
| Form lead | Funzionante |

## User Journey - Visitatore (MVP)

### Tipo Utente
**Visitatore**: Potenziale cliente B2B che cerca informazioni su UPGRAI per valutare se contattare l'azienda.

### Journey Map

```
┌─────────────────────────────────────────────────────────────────────┐
│  VISITATORE JOURNEY                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. ARRIVO                                                          │
│     ├─ Landing page con contenuto statico completo                  │
│     └─ Visualizza: Hero, Use Cases, Features, CTA                   │
│                                                                      │
│  2. ESPLORAZIONE                                                    │
│     ├─ Naviga la pagina scrollando                                  │
│     ├─ Legge informazioni generali su UPGRAI                        │
│     └─ Ha una domanda specifica                                     │
│                                                                      │
│  3. INTERAZIONE CHATBOT                                             │
│     ├─ Apre il chatbot                                              │
│     ├─ Fa una domanda (es: "avete use case per il settore retail?") │
│     └─ Attende risposta (< 10 sec)                                  │
│                                                                      │
│  4. RIMODULAZIONE PAGINA ⚡                                          │
│     ├─ La pagina si riorganizza dinamicamente                       │
│     ├─ Use Case retail in evidenza                                  │
│     ├─ Contenuti non pertinenti nascosti/ridotti                    │
│     └─ Effetto "aha!" - sorpresa positiva                           │
│                                                                      │
│  5. CONVERSIONE                                                      │
│     ├─ Trova esattamente quello che cercava                         │
│     ├─ Form di contatto ben visibile                                │
│     └─ Compila il form → LEAD GENERATO ✓                            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Touch Points

| Fase | Azione Utente | Risposta Sistema | Success Metric |
|------|--------------|------------------|----------------|
| Arrivo | Carica pagina | Landing statica completa | Page load < 3s |
| Esplorazione | Scroll/navigazione | UI responsive | - |
| Chatbot | Domanda | Risposta RAG + Page Plan | < 10s |
| Rimodulazione | Visualizza | Blocchi UI riorganizzati | Transizione smooth |
| Conversione | Compila form | Conferma invio | Lead salvato |

### Fallback Journey (AI non disponibile)

```
1. Arrivo → Landing statica funzionante ✓
2. Esplorazione → Navigazione normale ✓
3. Chatbot → Messaggio "servizio temporaneamente non disponibile"
4. Fallback → Mostra CTA diretto al form di contatto
5. Conversione → Form sempre funzionante ✓
```

## Requisiti E2E Testing Framework

### Overview

Sistema di test End-to-End automatizzati basato sul framework BMAD, adattato per applicazione web (non mobile).

### Architettura Test

```
UPGRAI E2E Testing
├── 🔧 API Tests (Bash + curl + jq)
│   ├── Test endpoint RAG
│   ├── Test Page Plan generation
│   └── Test form submission
├── 🌐 Frontend Tests (Playwright/Cypress)
│   ├── Landing page rendering
│   ├── Chatbot interaction
│   ├── Page remodulation
│   └── Form submission flow
├── 🗄️ Database/RAG Management
│   ├── Endpoint reset per test environment
│   ├── Seed data Use Cases
│   └── Vector store test isolation
└── ⚙️ CI/CD Automation
    ├── Test su PR
    └── Test pre-deploy
```

### Suite di Test MVP

| Suite | Focus | Test Count Target |
|-------|-------|-------------------|
| **API RAG** | Query Use Cases, embedding | 10-15 |
| **API Page Plan** | JSON generation, validation | 10-15 |
| **Frontend Core** | Rendering, navigation | 10-15 |
| **Frontend Chatbot** | Interaction, remodulation | 15-20 |
| **Integration** | Full user journey | 5-10 |

### Pattern di Test

**API Test Pattern (Bash + curl + jq):**
```
1. Setup: Seed test data in RAG
2. Execute: Call API endpoint
3. Assert: Validate JSON response
4. Cleanup: Reset test state
```

**Frontend Test Pattern:**
```
1. Launch: Navigate to landing page
2. Interact: Use chatbot
3. Wait: Page remodulation
4. Assert: Verify UI state
5. Screenshot: Capture for debugging
```

### Safety Features

- 🔒 Test endpoints bloccati in produzione
- 🔄 Isolation tra test run
- 📊 Database/RAG reset automatico
- 🎯 Test data con ID univoci

### Metriche Test

| Metrica | Target MVP |
|---------|------------|
| Copertura API | 100% endpoint critici |
| Copertura Frontend | User journey completo |
| Esecuzione | < 5 minuti totali |
| Flaky rate | < 5% |

## Requisiti Domain-Specific (MarTech AI)

### AI/LLM Requirements

- **Qualità risposte**: Le risposte del chatbot devono essere pertinenti e basate esclusivamente sulla knowledge base RAG
- **Prevenzione allucinazioni**: Il sistema non deve inventare informazioni non presenti negli Use Case
- **Prompt injection protection**: Validazione input utente per prevenire manipolazioni
- **Gestione costi API**: Monitoraggio e limiti sull'utilizzo delle API LLM
- **Rate limiting**: Protezione da abusi (flood di richieste)

### RAG System Requirements

- **Accuratezza retrieval**: I documenti recuperati devono essere rilevanti alla query utente
- **Qualità embedding**: Embedding semantici accurati per tutti i documenti Build.003/
- **Knowledge base freshness**: Processo di re-indicizzazione quando i contenuti cambiano
- **Chunk strategy**: Dimensione chunk ottimale per contesto e precisione

### Privacy & Security

- **No PII nel chatbot**: Il sistema non raccoglie né memorizza dati personali dalle conversazioni
- **API key protection**: Chiavi API backend-only, mai esposte al frontend
- **GDPR readiness**: Struttura predisposta per compliance EU (post-MVP)
- **Secure transport**: HTTPS obbligatorio per tutte le comunicazioni

> **Nota**: I requisiti di performance sono documentati nella sezione [Non-Functional Requirements](#non-functional-requirements).

## Innovation & Novel Patterns

### Detected Innovation Areas

1. **Page Remodulation Pattern**
   - La landing page si riorganizza dinamicamente in base alle domande nel chatbot
   - Pattern UI novel: i siti esistenti sono statici o personalizzati su login/profilo, non su domande real-time
   - Combinazione unica di interazione conversazionale e trasformazione visiva

2. **Page Plan Mechanism**
   - L'AI genera JSON strutturato che descrive come riorganizzare i blocchi UI
   - Combinazione unica di RAG (contenuto) + generazione layout (presentazione)
   - Il contenuto rimane lo stesso, cambia solo l'organizzazione e la priorità visiva

3. **Chatbot-Driven UX Transformation**
   - Il chatbot non è solo Q&A, ma trasforma l'esperienza visiva dell'utente
   - Effetto "aha!" come obiettivo di design esplicito
   - L'utente vede la pagina adattarsi alle sue esigenze in tempo reale

### Market Context & Competitive Landscape

- **Siti tradizionali**: Contenuto statico, navigazione manuale
- **Siti con chatbot**: Q&A separato dal contenuto della pagina
- **Siti personalizzati**: Personalizzazione basata su profilo/login, non su domande real-time
- **UPGRAI**: Unico nel combinare chatbot + rimodulazione pagina in tempo reale

### Validation Approach

- **MVP testing**: Misurare se gli utenti completano il form dopo rimodulazione vs senza interazione chatbot
- **Metriche qualitative**: Feedback utente sull'effetto "aha!"
- **A/B test futuro** (post-MVP): Confronto conversioni sito statico vs rimodulabile
- **Fallback sicuro**: Se la feature non funziona come previsto, il sito statico è sempre disponibile

## Web App & API Backend Requirements

### Frontend Architecture (Next.js 14+)

- **Rendering**: SSR/SSG ibrido per SEO ottimale
- **Browser support**: Chrome, Firefox, Safari, Edge (ultimi 2 anni)
- **Responsive**: Desktop-first, mobile-friendly
- **Accessibility**: WCAG 2.1 AA base (form navigabile, contrasti, labels)
- **Real-time**: Streaming risposte chatbot, transizioni UI smooth per remodulation

### Backend Architecture (Python FastAPI + LangChain + LangGraph)

#### API Endpoints MVP

| Endpoint | Metodo | Input | Output | Descrizione |
|----------|--------|-------|--------|-------------|
| `/api/chat` | POST | `{message: string}` | `{response: string, sources: array}` | Query RAG, ritorna risposta + fonti |
| `/api/page-plan` | POST | `{intent: string, context: object}` | `{blocks: array, priority: array}` | Genera JSON per rimodulazione UI |
| `/api/lead` | POST | `{name, email, company?, message}` | `{success: boolean, id: string}` | Salva lead da form contatto |
| `/api/health` | GET | - | `{status: "ok", rag: "ok"}` | Health check sistema |

#### RAG System (LangChain)

- **Vector Store**: ChromaDB o FAISS (locale per MVP)
- **Embedding Model**: OpenAI text-embedding-ada-002 o alternativa
- **LLM**: GPT-4 o Claude per generazione risposte
- **Knowledge Base**: Documenti Build.003/ (Use Case aziendali)

#### Technical Decisions

| Aspetto | Decisione MVP |
|---------|---------------|
| Authentication | Non richiesta (landing pubblica) |
| Rate limiting | 10 req/min per IP |
| Error codes | Standard HTTP (200, 400, 500) + messaggi user-friendly |
| Data format | JSON (request/response) |
| CORS | Configurato per dominio frontend |
| Logging | Structured logging per debug |

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP - Dimostrare l'effetto "aha!" della rimodulazione pagina
**Timeline:** 10 giorni
**Team:** 1 sviluppatore full-stack + AI/LLM expertise
**Philosophy:** Non serve tutto perfetto, serve che l'utente provi la magia della rimodulazione

### MVP Feature Set (Phase 1 - 10 giorni)

**Core User Journey Supportato:** Visitatore → Chatbot → Rimodulazione → Lead

**Must-Have Capabilities:**

| ID | Feature | Priorità | Rationale |
|----|---------|----------|-----------|
| MVP-01 | Landing page statica completa | P0 | Fallback sempre funzionante |
| MVP-02 | Chatbot UI | P0 | Entry point per interazione |
| MVP-03 | RAG su Build.003/ | P0 | Knowledge base per risposte |
| MVP-04 | Page Plan JSON generation | P0 | Core del meccanismo innovativo |
| MVP-05 | UI remodulation engine | P0 | L'effetto "aha!" |
| MVP-06 | Form lead generation | P0 | Obiettivo business |
| MVP-07 | Graceful degradation | P0 | Resilienza sistema |
| MVP-08 | Health check API | P1 | Monitoraggio base |

### Post-MVP Features

**Phase 2 (Growth):**
- Supporto multilingua (EN)
- Analytics comportamento utente
- Ottimizzazione performance/latenza
- Caching risposte frequenti
- A/B testing varianti Page Plan
- Metriche conversione dettagliate

**Phase 3 (Expansion):**
- Pagine multiple rimodulabili
- Protocollo comunicazione agenti (A2A/MCP/UCP)
- Integrazione CRM esterni
- AI discoverability (llms.txt, endpoint JSON pubblici)
- Framework riusabile per altri progetti/clienti
- Personalizzazione basata su storico utente

### Risk Mitigation Strategy

**Technical Risks:**
| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| LLM troppo lento (>10s) | Media | Alto | Fallback statico, timeout 15s, streaming |
| RAG retrieval impreciso | Bassa | Medio | Test coverage 100% Use Case, tuning embedding |
| Page Plan JSON malformato | Bassa | Alto | Schema validation, fallback a layout default |

**Market Risks:**
| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Utenti non capiscono rimodulazione | Bassa | Medio | Transizione smooth, feedback visivo chiaro |
| Effetto "aha!" non percepito | Media | Alto | Test utente, iterazione UX |

**Resource Risks:**
| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| 10 giorni insufficienti | Media | Alto | Scope MVP stretto, cut features se necessario |
| Costi API LLM elevati | Bassa | Medio | Rate limiting, monitoring usage |

## Functional Requirements

### Content Presentation

- **FR1**: Il Visitatore può visualizzare la landing page con tutti i contenuti UPGRAI in formato statico
- **FR2**: Il Visitatore può navigare i diversi blocchi di contenuto (Hero, Use Cases, Features, CTA)
- **FR3**: Il Visitatore può visualizzare i blocchi UI in configurazioni diverse in base al Page Plan attivo
- **FR4**: Il sistema può renderizzare la pagina in modo SEO-friendly (SSR/SSG)

### Chatbot Interaction

- **FR5**: Il Visitatore può aprire il chatbot dalla landing page
- **FR6**: Il Visitatore può digitare domande in linguaggio naturale nel chatbot
- **FR7**: Il Visitatore può ricevere risposte testuali basate sulla knowledge base RAG
- **FR8**: Il Visitatore può vedere le fonti (Use Case) da cui proviene la risposta
- **FR9**: Il sistema può processare query in italiano

### Page Remodulation

- **FR10**: Il sistema può analizzare l'intento dell'utente dalla domanda chatbot
- **FR11**: Il sistema può generare un Page Plan (JSON) che descrive la nuova organizzazione UI
- **FR12**: Il sistema può riorganizzare i blocchi UI in base al Page Plan generato
- **FR13**: Il Visitatore può vedere la transizione tra layout statico e layout rimodulato
- **FR14**: Il sistema può prioritizzare blocchi di contenuto rilevanti all'intento

### Lead Generation

- **FR15**: Il Visitatore può visualizzare un form di contatto
- **FR16**: Il Visitatore può compilare il form con nome, email, azienda (opzionale), messaggio
- **FR17**: Il Visitatore può inviare il form e ricevere conferma
- **FR18**: Il sistema può salvare i lead submissions

### System Resilience

- **FR19**: Il sistema può rilevare quando l'AI/LLM non è disponibile
- **FR20**: Il sistema può mostrare la landing page statica come fallback
- **FR21**: Il sistema può mostrare un messaggio appropriato se il chatbot non è disponibile
- **FR22**: Il sistema può rispondere a health check per monitoraggio

### Content Intelligence (RAG)

- **FR23**: Il sistema può indicizzare tutti i documenti Use Case da Build.003/
- **FR24**: Il sistema può eseguire retrieval semantico sui documenti indicizzati
- **FR25**: Il sistema può generare risposte basate esclusivamente sui documenti retrieval
- **FR26**: Il sistema può evitare risposte su argomenti non presenti nella knowledge base

## Non-Functional Requirements

### Performance

| ID | Requisito | Criterio Misurabile |
|----|-----------|---------------------|
| **NFR-P1** | Page Load | Largest Contentful Paint (LCP) < 3 secondi |
| **NFR-P2** | Chatbot Response | Risposta completa < 10 secondi |
| **NFR-P3** | Remodulation | Transizione UI < 500ms (animazione smooth) |
| **NFR-P4** | Interactivity | Time to Interactive (TTI) < 5 secondi |
| **NFR-P5** | Health Check | API response < 200ms |

### Security

| ID | Requisito | Criterio Misurabile |
|----|-----------|---------------------|
| **NFR-S1** | API Key Protection | Chiavi API mai esposte nel frontend (backend-only) |
| **NFR-S2** | Input Sanitization | Input chatbot sanitizzato contro XSS e injection |
| **NFR-S3** | Prompt Injection | Validazione input per prevenire manipolazione prompt |
| **NFR-S4** | Transport Security | HTTPS obbligatorio per tutte le comunicazioni |
| **NFR-S5** | Rate Limiting | Max 10 richieste/minuto per IP su endpoint chat |
| **NFR-S6** | CORS Policy | Richieste accettate solo da dominio frontend autorizzato |

### Reliability

| ID | Requisito | Criterio Misurabile |
|----|-----------|---------------------|
| **NFR-R1** | Static Availability | Landing page statica disponibile 99.9% del tempo |
| **NFR-R2** | Graceful Degradation | Fallback a statico entro 15 secondi se AI non risponde |
| **NFR-R3** | Form Independence | Form lead funzionante indipendentemente da stato AI |
| **NFR-R4** | Error Handling | Nessun crash visibile utente (error boundary) |
| **NFR-R5** | Monitoring | Health check endpoint sempre disponibile |

### Accessibility

| ID | Requisito | Criterio Misurabile |
|----|-----------|---------------------|
| **NFR-A1** | WCAG Compliance | Level AA per form e navigation principali |
| **NFR-A2** | Color Contrast | Rapporto contrasto minimo 4.5:1 |
| **NFR-A3** | Form Labels | Labels e ARIA attributes corretti su tutti i form |
| **NFR-A4** | Keyboard Navigation | Tab order logico, focus visibile |
| **NFR-A5** | Screen Reader | Chatbot utilizzabile con screen reader (supporto base) |

