---
ID: 1.1.1.1.1.5.5.5.20.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > HR > UC-20 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0520-0300 UC-20.Performance Review Assistant-Spec.Tec v.002
---

# UC-20. Performance Review Assistant — Specifiche Tecniche

## 1. Overview

**Use Case:** supporto AI per preparazione e conduzione performance review.

**Pattern:** Data Aggregation + LLM Synthesis + Document Generation

**Complessità:** ●●●●○ (4/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      DATA SOURCES                           │
│   Feedback 360  │  Objectives  │  KPIs  │  Manager Notes    │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   AGGREGATION LAYER                         │
│   Collect → Normalize → Enrich → Store                      │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   AI SYNTHESIS                              │
│   Summarize → Extract Themes → Generate Suggestions         │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   DOCUMENT GENERATION                       │
│   Apply Template → Generate Draft → Export                  │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    OUTPUT                                   │
│   Review Draft  │  Dashboard  │  HR Export  │  Archive      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure OpenAI | Synthesis + Generation | S0 |
| Azure AI Search | Feedback retrieval | S1 |
| Azure Forms | Feedback 360 collection | Included |
| Power Automate | Workflow + reminders | Premium |
| Azure SQL | Review data | S1 |
| Azure Blob | Documents | LRS |

### 2.3 Data Model

```
┌─────────────────────────────────────────────────────────────┐
│                   REVIEW PACKAGE                            │
│                                                             │
│  ├── employee_profile                                      │
│  │   ├── name, role, department, manager                   │
│  │   └── tenure, review_period                             │
│  │                                                          │
│  ├── feedback_360[]                                        │
│  │   ├── respondent_relationship (peer/report/other)       │
│  │   ├── strengths[], improvements[]                       │
│  │   └── ratings{}, comments                               │
│  │                                                          │
│  ├── objectives[]                                          │
│  │   ├── description, target, actual                       │
│  │   └── status, evidence                                  │
│  │                                                          │
│  ├── kpis[] (if available)                                 │
│  │   ├── metric, target, actual                            │
│  │                                                          │
│  └── synthesis                                             │
│      ├── highlights[], concerns[]                          │
│      ├── themes{strengths, development}                    │
│      ├── suggestions[]                                     │
│      └── draft_evaluation                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Raccolta feedback 360 | Must |
| RF-02 | Aggregazione dati multi-fonte | Must |
| RF-03 | Sintesi periodo in linguaggio naturale | Must |
| RF-04 | Suggerimenti discussione | Must |
| RF-05 | Generazione bozza valutazione | Must |
| RF-06 | Export per sistema HR | Should |
| RF-07 | Dashboard manager | Should |
| RF-08 | Storico review | Should |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Completezza sintesi | ≥85% |
| RNF-02 | Latenza generazione | < 10 secondi |
| RNF-03 | Disponibilità | ≥99% |
| RNF-04 | Data privacy | GDPR compliant |
| RNF-05 | Retention | Secondo policy HR |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Process | Template valutazione definito |
| Process | Criteri valutazione documentati |
| Data | Lista dipendenti con manager |
| Governance | Policy privacy feedback |

---

## 4. Competenze

### 4.1 Certificazioni

| Certificazione | Codice | Obbligatoria |
|----------------|--------|--------------|
| Azure AI Engineer | AI-102 | Sì |
| Azure Developer | AZ-204 | Sì |
| Power Platform | PL-200 | Raccomandata |

### 4.2 Team

| Ruolo | Seniority | Effort |
|-------|-----------|--------|
| Solution Architect | Senior | 2 gg |
| AI Engineer | Mid-Senior | 7 gg |
| Power Platform Dev | Mid | 4 gg |
| DevOps | Mid | 2 gg |

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Config | 4 gg | Forms + templates |
| Integration | 5 gg | Synthesis ok |
| Test | 2 gg | UAT done |
| Go-Live | 2 gg | Production |

### 5.2 Deliverable

**Setup:** subscription, OpenAI, AI Search, SQL, Forms, Power Automate.

**Config:** feedback form, evaluation template, criteria mapping, reminder workflow.

**Integration:** data aggregation, synthesis prompts, document generation, export.

**Test:** pilot con 5 review reali, manager feedback, tuning.

### 5.3 Definition of Done

- [ ] Feedback collection funzionante
- [ ] Synthesis accuracy ≥85%
- [ ] Document generation ok
- [ ] Manager pilota soddisfatto
- [ ] HR sign-off

---

## 6. Rischi

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Pochi dati disponibili | Media | Alto | Minimum viable: feedback 360 |
| Bias nel feedback | Media | Medio | Anonymization, aggregation |
| Privacy concerns | Media | Alto | Access control, audit |
| Manager resistance | Media | Medio | Training, quick wins |

### 6.1 Responsible AI

- [ ] Sintesi = supporto, non decisione
- [ ] Feedback anonimizzato nell'aggregazione
- [ ] Manager sempre in controllo
- [ ] Audit trail per accountability
- [ ] Bias monitoring

### 6.2 Privacy & Confidentiality

- [ ] Feedback 360 confidenziale
- [ ] Solo manager vede la sintesi
- [ ] HR vede solo versione finale approvata
- [ ] Retention secondo policy aziendale
- [ ] Right to access/deletion

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Synthesis quality (feedback) | < 4/5 | < 3/5 |
| Feedback response rate | < 60% | < 40% |
| Generation latency | > 15s | > 30s |
| Manager adoption | < 70% | < 50% |

### 7.2 Review Cycle Support

| Attività | Timing | Owner |
|----------|--------|-------|
| Feedback collection | 2 settimane prima | System |
| Reminder automatici | Giorni 3, 7, 10 | System |
| Synthesis generation | Su richiesta manager | System |
| HR reporting | Fine ciclo | HR |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Azure OpenAI attivo
- [ ] AI Search configurato
- [ ] SQL database ready
- [ ] Power Automate flows

**Funzionalità**
- [ ] Form feedback 360
- [ ] Reminder automatici
- [ ] Aggregazione dati
- [ ] Synthesis generation
- [ ] Document export

**Qualità**
- [ ] Test su 5 review reali
- [ ] Manager feedback positivo
- [ ] HR template validato
- [ ] Privacy review ok

**Governance**
- [ ] Access control configurato
- [ ] Audit logging attivo
- [ ] Retention policy

**Go/No-Go**

| Criterio | Status |
|----------|--------|
| Synthesis quality | ☐ |
| Privacy ok | ☐ |
| Manager approva | ☐ |
| HR approva | ☐ |

---

*Nexa Data | Foundation | Specifiche Tecniche*
