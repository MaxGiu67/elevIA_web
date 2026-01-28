---
ID: 1.1.1.1.1.6.5.3.10.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Operations > UC-10 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0605-0310-0300 UC-10.Ricerca Semantica Prodotti e Catalogo-Spec.Tec v.002
---

# UC-10. Ricerca Semantica Prodotti e Catalogo — Specifiche Tecniche

## 1. Overview

**Use Case:** ricerca semantica su catalogo prodotti con comprensione del linguaggio naturale.

**Pattern:** Semantic Search + Hybrid Retrieval

**Complessità:** ●●●○○ (3/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                    FONTI CATALOGO                           │
│   Database Prodotti   ERP   PIM   CSV/Excel                 │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   INGESTION LAYER                           │
│   Connettori → Normalizzazione → Embedding (text-embedding) │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    INDEX LAYER                              │
│         Azure AI Search (Vector + Full-text Index)          │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    QUERY LAYER                              │
│   Query Understanding → Hybrid Search → Reranking → Filter  │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  INTERFACE LAYER                            │
│          REST API   │   Widget JS   │   E-commerce          │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure OpenAI | Embedding | S0 |
| Azure AI Search | Vector + Full-text index | S1 |
| Azure App Service | API Backend | S1 |
| Azure Blob Storage | Cache e static | LRS |
| Azure Monitor | Logging e analytics | Pay-as-you-go |

### 2.3 Integrazioni

| Sistema | Metodo | Note |
|---------|--------|------|
| Database SQL | ODBC/API | Sync schedulato |
| ERP | API/Export | Batch notturno |
| E-commerce | REST API | Real-time o near-real-time |
| PIM | API | Se disponibile |

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Query in linguaggio naturale IT/EN | Must |
| RF-02 | Ricerca per codice esatto | Must |
| RF-03 | Filtri dinamici (prezzo, categoria) | Must |
| RF-04 | Ordinamento per rilevanza | Must |
| RF-05 | Suggerimenti "intendevi..." | Should |
| RF-06 | Autocomplete | Should |
| RF-07 | Sinonimi configurabili | Should |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Latenza | < 3s P95 |
| RNF-02 | Disponibilità | ≥99% |
| RNF-03 | Relevance@5 | ≥85% |
| RNF-04 | Concurrent users | 100 |
| RNF-05 | Catalogo max | 500.000 SKU |
| RNF-06 | Index refresh | < 1h |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Dati | Export catalogo con descrizioni, specifiche, prezzi |
| Qualità | Descrizioni prodotto compilate (anche parzialmente) |
| Infra | Tenant Azure (o hosting Nexa Data) |
| Integrazione | Endpoint e-commerce per widget (opzionale) |
| Test | 50 query rappresentative, feedback rilevanza |

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
| AI Engineer | Mid-Senior | 7 gg |
| Frontend Developer | Mid | 3 gg |
| DevOps | Mid | 2 gg |

**Minimo:** 2 persone (AI Eng + Frontend)

### 4.3 Responsible AI

Prima del go-live verifica:
- [ ] Fairness: nessun bias verso prodotti/categorie
- [ ] Reliability: gestione query malformate
- [ ] Privacy: no tracking utenti senza consenso
- [ ] Transparency: spiegazione ranking (se richiesto)
- [ ] Accountability: log ricerche per audit

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Ingestion | 3 gg | Catalogo indicizzato |
| Tuning | 4 gg | Relevance ≥85% |
| Integration | 3 gg | API/Widget pronti |
| UAT + Go-Live | 3 gg | Produzione |

### 5.2 Deliverable per fase

**Setup:** subscription, resource group, AI Search index, OpenAI deployment, repo Git.

**Ingestion:** connettore catalogo, pipeline normalizzazione, embedding generati, index popolato.

**Tuning:** sinonimi configurati, scoring profile, reranker ottimizzato, test rilevanza.

**Integration:** API REST documentata, widget JS, integrazione e-commerce (se prevista).

**UAT:** test utenti reali, raccolta feedback, fix, documentazione.

### 5.3 Definition of Done

- [ ] Catalogo completo indicizzato
- [ ] Relevance@5 ≥85% su test set
- [ ] Latenza < 3s P95
- [ ] API documentata
- [ ] Widget funzionante
- [ ] Zero bug P1/P2

---

## 6. Rischi

### 6.1 Tecnici

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Descrizioni prodotto scarse | Alta | Alto | Enrichment con AI |
| Catalogo troppo grande | Bassa | Medio | Scaling tier index |
| Latenza eccessiva | Media | Medio | Caching, ottimizzazione |
| Sinonimi mancanti | Alta | Medio | Iterazione con utenti |

### 6.2 Progetto

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Export catalogo ritardato | Media | Alto | Richiedere in pre-sales |
| Aspettative "ricerca Google" | Alta | Medio | Expectation setting |
| Scope creep (configuratore) | Media | Alto | Change request |

### 6.3 Dipendenze critiche

| Dipendenza | Owner | Deadline |
|------------|-------|----------|
| Export catalogo | Cliente | Kickoff |
| Lista sinonimi | Business | Fine fase 2 |
| Query test | Business | Fine fase 3 |
| Endpoint e-commerce | IT | Fine fase 4 |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Latenza P95 | > 2s | > 5s |
| Zero results rate | > 10% | > 20% |
| Error rate | > 1% | > 5% |
| Index staleness | > 2h | > 6h |

### 7.2 Escalation

| Livello | Trigger | Owner | Tempo |
|---------|---------|-------|-------|
| L1 | Anomalia metriche | Operations | 30 min |
| L2 | Non risolto L1 | AI Engineer | 2h |
| L3 | Non risolto L2 | Tech Lead | 4h |
| L4 | Servizio down | Management | Immediato |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Servizi Azure running
- [ ] Index popolato e aggiornato
- [ ] Autoscaling configurato
- [ ] SSL su tutti gli endpoint

**Ricerca**
- [ ] Relevance@5 ≥85%
- [ ] Sinonimi configurati
- [ ] Filtri funzionanti
- [ ] Autocomplete attivo

**Integrazione**
- [ ] API documentata
- [ ] Widget testato cross-browser
- [ ] E-commerce integrato (se previsto)

**Qualità**
- [ ] UAT completato
- [ ] Zero bug P1/P2
- [ ] Feedback utenti positivo

**Go/No-Go**

| Criterio | Status |
|----------|--------|
| Relevance target | ☐ |
| Latenza target | ☐ |
| Integrazione ok | ☐ |
| UAT firmato | ☐ |

---

*Nexa Data | Foundation | Specifiche Tecniche*
