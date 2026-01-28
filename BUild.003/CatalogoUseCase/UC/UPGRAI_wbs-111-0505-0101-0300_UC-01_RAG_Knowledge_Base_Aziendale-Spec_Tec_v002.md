---
ID: 1.1.1.1.1.5.5.1.1.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Knowledge > UC-01 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0101-0300 UC-01.RAG Knowledge Base Aziendale-Spec.Tec v.002
---

# UC-01. RAG Knowledge Base Aziendale — Specifiche Tecniche

## 1. Overview

**Use Case:** interrogazione in linguaggio naturale su knowledge base documentale distribuita.

**Pattern:** RAG (Retrieval-Augmented Generation)

**Complessità:** ●●●○○ (3/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      FONTI DATI                             │
│   SharePoint   File Server   Wiki   Email Archive           │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   INGESTION LAYER                           │
│   Connettori → Chunking → Embedding (text-embedding-ada)    │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   STORAGE LAYER                             │
│              Azure AI Search (Vector Index)                 │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    QUERY LAYER                              │
│   Retrieval (Hybrid) → Reranking → Generation (GPT-4o)      │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  INTERFACE LAYER                            │
│            Web App   │   REST API   │   Teams               │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure OpenAI | Embedding + Generation | S0 |
| Azure AI Search | Vector store | S1 |
| Azure Blob Storage | Document storage | LRS |
| Azure App Service | Backend | S1 |
| Azure Monitor | Logging | Pay-as-you-go |

### 2.3 Integrazioni

| Sistema | Metodo | Note |
|---------|--------|------|
| SharePoint Online | Graph API | Read-only |
| File Server | Azure File Sync | Schedulato |
| Confluence | REST API | Token auth |
| Azure AD | OIDC | SSO |

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Query in linguaggio naturale IT/EN | Must |
| RF-02 | Citazione fonti (doc, pagina) | Must |
| RF-03 | Rispetto permessi documentali | Must |
| RF-04 | Contesto multi-turno | Should |
| RF-05 | Filtri per fonte/data/tipo | Should |
| RF-06 | Segnalazione "non trovato" | Must |
| RF-07 | Logging query per analytics | Must |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Latenza | < 5s P95 |
| RNF-02 | Disponibilità | ≥99% |
| RNF-03 | Accuracy | ≥85% |
| RNF-04 | Concurrent users | 50 |
| RNF-05 | Volume documenti | 100.000 |
| RNF-06 | Refresh | < 24h |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Infra | Tenant Azure, quota OpenAI approvata |
| Dati | Accesso read repository, mappatura fonti |
| Identity | Azure AD configurato |
| Governance | Approvazione privacy |
| Test | 5-10 utenti pilota, 50 domande FAQ |

---

## 4. Competenze

### 4.1 Certificazioni richieste

| Certificazione | Codice | Obbligatoria |
|----------------|--------|--------------|
| Azure AI Engineer | AI-102 | Sì |
| Azure Developer | AZ-204 | Sì |
| Azure Architect | AZ-305 | Raccomandata |

### 4.2 Team

| Ruolo | Seniority | Effort |
|-------|-----------|--------|
| Solution Architect | Senior | 2 gg |
| AI Engineer | Mid-Senior | 8 gg |
| Backend Developer | Mid | 3 gg |
| DevOps | Mid | 2 gg |

**Minimo:** 2 persone (AI Eng + Backend con competenze DevOps)

### 4.3 Responsible AI

Prima del go-live verifica:
- [ ] Fairness: no discriminazione per ruolo/dipartimento
- [ ] Reliability: gestione errori graceful
- [ ] Privacy: no dati personali nei log, GDPR
- [ ] Transparency: citazione fonti, disclosure AI
- [ ] Accountability: audit trail, owner identificato

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Ingestion | 4 gg | Index popolato |
| Core RAG | 5 gg | Demo interna |
| Integration | 2 gg | UAT ready |
| UAT + Go-Live | 2 gg | Produzione |

### 5.2 Deliverable per fase

**Setup:** subscription, resource group, Azure OpenAI deployment, AI Search index, repo Git, accessi verificati.

**Ingestion:** connettori attivi, chunking configurato, embedding generati, refresh schedulato.

**Core RAG:** retrieval ibrido, prompt ottimizzato, multi-turno, citazioni, guardrail.

**Integration:** API REST, web UI, SSO, monitoring.

**UAT:** test pilota, bug fix, documentazione, handover.

### 5.3 Definition of Done

- [ ] Codice in main, code review ok
- [ ] Test automatici passano
- [ ] Deploy completato
- [ ] Documentazione aggiornata
- [ ] Demo fatta (se prevista)
- [ ] Zero bug P1/P2

---

## 6. Rischi

### 6.1 Tecnici

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Quota OpenAI insufficiente | Media | Alto | Verificare in setup |
| Qualità documenti scarsa | Media | Medio | Assessment fase 1 |
| Latenza con corpus grande | Bassa | Medio | Ottimizzare chunk, caching |
| Accuracy sotto target | Media | Alto | Iterare prompt engineering |

### 6.2 Progetto

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Accessi ritardati | Alta | Alto | Richiedere in pre-sales |
| Pilota non disponibili | Media | Medio | Backup, pianificare UAT |
| Scope creep | Alta | Medio | Change request rigoroso |
| Aspettative disallineate | Media | Alto | Demo frequenti |

### 6.3 Dipendenze critiche

| Dipendenza | Owner | Deadline |
|------------|-------|----------|
| Quota Azure OpenAI | Cliente | Kickoff -5gg |
| Accesso SharePoint | Cliente IT | Kickoff |
| Utenti pilota | Business | Fine fase 3 |
| Domande test | Business | Fine fase 2 |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Latenza P95 | > 4s | > 8s |
| Error rate | > 1% | > 5% |
| Uptime | < 99.5% | < 99% |
| Token usage | > 80% quota | > 95% |

### 7.2 Escalation

| Livello | Trigger | Owner | Tempo |
|---------|---------|-------|-------|
| L1 | Anomalia | Operations | 30 min |
| L2 | Non risolto L1 | Tech Lead | 2h |
| L3 | Non risolto L2 | Architect | 4h |
| L4 | Impatto critico | Management | Immediato |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Servizi Azure running
- [ ] Backup configurato
- [ ] Autoscaling attivo
- [ ] SSL/TLS su tutti gli endpoint

**Applicazione**
- [ ] Deploy produzione ok
- [ ] Health check risponde
- [ ] Indice completo
- [ ] Connettori attivi

**Sicurezza**
- [ ] SSO verificato
- [ ] Permessi rispettati
- [ ] Log senza dati sensibili
- [ ] GDPR compliance

**Qualità**
- [ ] Accuracy ≥85%
- [ ] Latenza < 5s
- [ ] Zero bug P1/P2
- [ ] UAT sign-off

**Go/No-Go**

| Criterio | Status |
|----------|--------|
| CA soddisfatti | ☐ |
| Zero P1 | ☐ |
| UAT firmato | ☐ |
| Operations ready | ☐ |

---

*Nexa Data | Foundation | Specifiche Tecniche*
