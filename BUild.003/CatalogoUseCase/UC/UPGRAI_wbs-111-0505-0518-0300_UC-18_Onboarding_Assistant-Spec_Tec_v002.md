---
ID: 1.1.1.1.1.5.5.5.18.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > HR > UC-18 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0518-0300 UC-18.Onboarding Assistant Dipendenti-Spec.Tec v.002
---

# UC-18. Onboarding Assistant — Specifiche Tecniche

## 1. Overview

**Use Case:** assistente virtuale per onboarding nuovi dipendenti.

**Pattern:** RAG Chatbot + Personalization

**Complessità:** ●●●○○ (3/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      INTERFACE                              │
│         Teams Bot   │   Web Widget   │   Mobile             │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   ORCHESTRATION                             │
│   User Context → Intent Detection → Personalization         │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   RAG LAYER                                 │
│   Query → Retrieval (AI Search) → Generation (OpenAI)       │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   KNOWLEDGE BASE                            │
│   Procedures │ Policies │ Contacts │ Checklist │ FAQ        │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure OpenAI | Generation | S0 |
| Azure AI Search | Knowledge retrieval | S1 |
| Azure Bot Service | Teams integration | S1 |
| Azure Blob Storage | Documents | LRS |
| Cosmos DB | User context, history | Serverless |
| Azure Functions | Orchestration | Consumption |

### 2.3 Personalization Model

```
┌─────────────────────────────────────────────────────────────┐
│                   USER CONTEXT                              │
│                                                             │
│  ├── profile                                               │
│  │   ├── name, email, start_date                           │
│  │   ├── department, role, location                        │
│  │   └── manager, buddy                                    │
│  │                                                          │
│  ├── onboarding_status                                     │
│  │   ├── checklist_progress                                │
│  │   ├── completed_tasks[]                                 │
│  │   └── pending_tasks[]                                   │
│  │                                                          │
│  └── interaction_history                                   │
│      ├── questions_asked[]                                 │
│      └── topics_explored[]                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Q&A in linguaggio naturale | Must |
| RF-02 | Risposte da knowledge base | Must |
| RF-03 | Personalizzazione per ruolo | Must |
| RF-04 | Checklist interattiva | Should |
| RF-05 | Escalation a HR | Must |
| RF-06 | Multi-turno conversation | Should |
| RF-07 | Analytics domande | Should |
| RF-08 | Proactive suggestions | Nice |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Accuracy | ≥85% |
| RNF-02 | Latenza | < 5 secondi |
| RNF-03 | Disponibilità | ≥99% |
| RNF-04 | Concurrent users | 50 |
| RNF-05 | Languages | IT, EN |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Content | Documentazione onboarding |
| Content | Procedure, policy, FAQ |
| Identity | Azure AD per user context |
| Platform | Teams (o web hosting) |

---

## 4. Competenze

### 4.1 Certificazioni

| Certificazione | Codice | Obbligatoria |
|----------------|--------|--------------|
| Azure AI Engineer | AI-102 | Sì |
| Azure Developer | AZ-204 | Sì |

### 4.2 Team

| Ruolo | Seniority | Effort |
|-------|-----------|--------|
| Solution Architect | Senior | 2 gg |
| AI Engineer | Mid-Senior | 7 gg |
| Bot Developer | Mid | 4 gg |
| DevOps | Mid | 2 gg |

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| KB Config | 4 gg | Content indexed |
| Bot Dev | 5 gg | Chatbot ready |
| Test | 2 gg | UAT done |
| Go-Live | 2 gg | Production |

### 5.2 Deliverable

**Setup:** subscription, OpenAI, AI Search, Bot Service, storage.

**KB Config:** documents indexed, topics organized, personalization rules.

**Bot Dev:** Teams bot, conversation flow, escalation, checklist integration.

**Test:** pilot con nuovo assunto, tuning, feedback collection.

### 5.3 Definition of Done

- [ ] Accuracy ≥85%
- [ ] Latenza < 5s
- [ ] Teams integration ok
- [ ] Checklist funzionante
- [ ] Pilota positivo

---

## 6. Rischi

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Content incompleto | Media | Alto | Content audit in fase 1 |
| Bassa adoption | Media | Medio | Change management, demo |
| Risposte errate | Bassa | Alto | Review, escalation path |
| Context stale | Media | Medio | Sync con HRIS |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Accuracy (feedback) | < 85% | < 75% |
| Escalation rate | > 30% | > 50% |
| Latenza | > 8s | > 15s |
| User satisfaction | < 3.5/5 | < 3/5 |

### 7.2 Content Lifecycle

| Attività | Frequenza | Owner |
|----------|-----------|-------|
| Content review | Mensile | HR |
| FAQ update | Su richiesta | HR |
| Analytics review | Settimanale | HR + AI |
| New hire feedback | Per ogni cohort | HR |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Azure OpenAI attivo
- [ ] AI Search configurato
- [ ] Bot Service deployato
- [ ] Teams app registrata

**Knowledge Base**
- [ ] Procedure caricate
- [ ] Policy indicizzate
- [ ] FAQ complete
- [ ] Contatti aggiornati

**Applicazione**
- [ ] Chatbot funzionante
- [ ] Personalizzazione ok
- [ ] Escalation testata
- [ ] Checklist operativa

**Qualità**
- [ ] Accuracy ≥85%
- [ ] Test con nuovo assunto
- [ ] Feedback positivo
- [ ] HR sign-off

**Go/No-Go**

| Criterio | Status |
|----------|--------|
| Accuracy target | ☐ |
| Teams integration | ☐ |
| Content complete | ☐ |
| HR approva | ☐ |

---

*Nexa Data | Foundation | Specifiche Tecniche*
