---
ID: 1.1.1.1.1.5.5.2.6.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Customer Experience > UC-06 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0206-0300 UC-06.Classificazione Automatica Ticket-Spec.Tec v.002
---

# UC-06. Classificazione Automatica Ticket — Specifiche Tecniche

## 1. Overview

**Use Case:** classificazione automatica di ticket di supporto per categoria, priorità e routing.

**Pattern:** Zero-shot/Few-shot Classification con LLM

**Complessità:** ●●●○○ (3/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      INPUT                                  │
│   Ticketing System   Email   Web Form   API                 │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   INGESTION LAYER                           │
│   Logic Apps / Event Grid → Queue → Function                │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 CLASSIFICATION LAYER                        │
│   GPT-4o (structured output) → Categoria + Priorità + Team  │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   ROUTING LAYER                             │
│   Update Ticket → Assign Queue → Notify                     │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure OpenAI | Classification | S0 |
| Azure Logic Apps | Orchestrazione | Consumption |
| Azure Functions | Processing | Consumption |
| Azure Service Bus | Queue | Basic |
| Azure Monitor | Logging | Pay-as-you-go |

### 2.3 Integrazioni

| Sistema | Metodo | Note |
|---------|--------|------|
| ServiceNow | REST API | Update ticket |
| Zendesk | API v2 | Webhook trigger |
| Freshdesk | API | Auto-routing |
| Email | Logic Apps connector | Inbox monitoring |

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Classificazione categoria (multi-level) | Must |
| RF-02 | Assegnazione priorità | Must |
| RF-03 | Routing a team/coda | Must |
| RF-04 | Confidence score | Must |
| RF-05 | Flag low-confidence per review | Must |
| RF-06 | Override manuale | Must |
| RF-07 | Audit trail classificazioni | Must |
| RF-08 | Dashboard accuracy | Should |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Latenza classificazione | < 2s P95 |
| RNF-02 | Disponibilità | ≥99% |
| RNF-03 | Accuracy | ≥90% |
| RNF-04 | Throughput | 100 ticket/min |
| RNF-05 | Retention log | 1 anno |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Infra | Tenant Azure, quota OpenAI approvata |
| Dati | Storico ticket 6-12 mesi, mappatura categorie |
| Integrazione | API ticketing system disponibile |
| Governance | Approvazione per elaborazione testo ticket |
| Test | 100 ticket campione per validation |

---

## 4. Competenze

### 4.1 Certificazioni richieste

| Certificazione | Codice | Obbligatoria |
|----------------|--------|--------------|
| Azure AI Engineer | AI-102 | Sì |
| Azure Developer | AZ-204 | Sì |
| Logic Apps | — | Esperienza pratica |

### 4.2 Team

| Ruolo | Seniority | Effort |
|-------|-----------|--------|
| Solution Architect | Senior | 1 gg |
| AI Engineer | Mid-Senior | 6 gg |
| Integration Developer | Mid | 5 gg |
| DevOps | Mid | 2 gg |
| QA | Mid | 1 gg |

**Minimo:** 2 persone (AI Eng + Integration Dev)

### 4.3 Responsible AI

Prima del go-live verifica:
- [ ] Fairness: classificazione uniforme indipendentemente dal linguaggio usato
- [ ] Reliability: gestione errori, fallback a coda manuale
- [ ] Privacy: no retention dati sensibili oltre necessario
- [ ] Transparency: confidence score visibile, motivazione disponibile
- [ ] Accountability: audit trail completo

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Analisi/Prompt | 4 gg | Classificatore pronto |
| Integrazione | 5 gg | Ticketing connesso |
| Test | 2 gg | UAT completato |
| Go-Live | 2 gg | Produzione |

### 5.2 Deliverable per fase

**Setup:** subscription, resource group, Azure OpenAI deployment, Logic Apps workspace, accessi verificati.

**Analisi/Prompt:** analisi storico ticket, definizione tassonomia, prompt engineering, few-shot examples, validation su campione.

**Integrazione:** connettore ticketing, workflow Logic Apps, update automatico ticket, notifiche.

**Test:** validation su 100 ticket, tuning soglie confidence, test edge cases.

**Go-Live:** deploy produzione, shadow mode (opzionale), cutover, monitoring.

### 5.3 Definition of Done

- [ ] Codice in main, code review ok
- [ ] Test automatici passano
- [ ] Accuracy ≥90% su test set
- [ ] Integrazione ticketing funzionante
- [ ] Dashboard monitoring attiva
- [ ] Documentazione aggiornata
- [ ] Zero bug P1/P2

---

## 6. Rischi

### 6.1 Tecnici

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Quota OpenAI insufficiente | Bassa | Alto | Rate limiting, caching |
| Accuracy sotto target | Media | Alto | Iterare prompt, few-shot |
| Latenza con picchi | Bassa | Medio | Queue, async processing |
| Tassonomia ambigua | Alta | Medio | Workshop definizione categorie |

### 6.2 Progetto

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Storico ticket non disponibile | Media | Alto | Richiedere in pre-sales |
| API ticketing limitata | Media | Alto | Verificare capabilities prima |
| Resistenza operatori | Media | Medio | Coinvolgere in UAT, override facile |
| Categorie cambiano spesso | Media | Medio | Admin interface per update |

### 6.3 Dipendenze critiche

| Dipendenza | Owner | Deadline |
|------------|-------|----------|
| Quota Azure OpenAI | Cliente | Kickoff -5gg |
| Storico ticket | Business | Kickoff |
| Mappatura categorie | Business | Giorno 2 |
| API access ticketing | IT | Giorno 3 |
| Ticket campione test | Business | Giorno 10 |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Latenza P95 | > 1.5s | > 3s |
| Error rate | > 1% | > 5% |
| Accuracy (rolling) | < 92% | < 88% |
| Low confidence rate | > 20% | > 30% |

### 7.2 Escalation

| Livello | Trigger | Owner | Tempo |
|---------|---------|-------|-------|
| L1 | Anomalia metriche | Operations | 30 min |
| L2 | Non risolto L1 | Tech Lead | 2h |
| L3 | Accuracy degradata | AI Engineer | 4h |
| L4 | Impatto SLA | Management | Immediato |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Servizi Azure running
- [ ] Logic Apps attivi
- [ ] Service Bus configurato
- [ ] Monitoring attivo

**Applicazione**
- [ ] Classificatore risponde correttamente
- [ ] Integrazione ticketing funzionante
- [ ] Workflow end-to-end verificato
- [ ] Fallback a coda manuale testato

**Sicurezza**
- [ ] API keys in Key Vault
- [ ] Log senza dati sensibili
- [ ] Accessi minimi necessari

**Qualità**
- [ ] Accuracy ≥90%
- [ ] Latenza < 2s
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
