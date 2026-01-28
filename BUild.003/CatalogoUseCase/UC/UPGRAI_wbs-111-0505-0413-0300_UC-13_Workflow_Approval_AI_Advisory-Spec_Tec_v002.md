---
ID: 1.1.1.1.1.5.5.4.13.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Workflow > UC-13 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0413-0300 UC-13.Workflow Approval con AI Advisory-Spec.Tec v.002
---

# UC-13. Workflow Approval con AI Advisory — Specifiche Tecniche

## 1. Overview

**Use Case:** supporto decisionale AI per workflow approvativi con raccomandazione e motivazione.

**Pattern:** RAG + Rule Engine + LLM Reasoning

**Complessità:** ●●●○○ (3/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      TRIGGER                                │
│   Power Automate   │   Webhook   │   Scheduled Polling      │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   CONTEXT GATHERING                         │
│   Request Data → Policy Lookup → History Check → Budget     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   AI ANALYSIS                               │
│   Azure OpenAI → Policy Matching → Recommendation Engine    │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   PRESENTATION                              │
│   Adaptive Card (Teams) │ Email │ Web Portal │ Mobile       │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   ACTION                                    │
│   Approve → Reject → Escalate → Request Info → Audit Log    │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure OpenAI | Reasoning + Generation | S0 |
| Azure AI Search | Policy retrieval | S1 |
| Power Automate | Orchestrazione | Premium |
| Azure Functions | Business logic | Consumption |
| Cosmos DB | Audit trail | Serverless |
| Azure Blob | Policy documents | LRS |

### 2.3 Flusso decisionale

```
┌─────────────────────────────────────────────────────────────┐
│                   DECISION FLOW                             │
│                                                             │
│  Request → Extract Fields → Match Policy → Check Rules      │
│     │           │               │              │            │
│     ▼           ▼               ▼              ▼            │
│  [JSON]    [Richiedente]   [RAG lookup]   [Soglie,         │
│            [Importo]       [Regole]        Budget,         │
│            [Tipo]          [Eccezioni]     Storico]        │
│                                                             │
│                       ▼                                     │
│              Recommendation Engine                          │
│                       │                                     │
│     ┌─────────────────┼─────────────────┐                  │
│     ▼                 ▼                 ▼                  │
│  APPROVE          ESCALATE           REJECT                │
│  (conf >90%)     (conf 70-90%)      (policy violation)     │
│                  (eccezione)                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Analisi automatica richiesta | Must |
| RF-02 | Verifica policy applicabili | Must |
| RF-03 | Raccomandazione con confidence | Must |
| RF-04 | Motivazione in linguaggio naturale | Must |
| RF-05 | One-click approve/reject | Must |
| RF-06 | Escalation automatica | Should |
| RF-07 | Richiesta informazioni aggiuntive | Should |
| RF-08 | Audit trail immutabile | Must |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Latenza | < 3 secondi |
| RNF-02 | Accuracy | ≥85% |
| RNF-03 | Disponibilità | ≥99% |
| RNF-04 | Concurrent requests | 100 |
| RNF-05 | Audit retention | 7 anni |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Policy | Documentazione regole approvative |
| Dati | Storico richieste (se disponibile) |
| Integrazione | Accesso sistema workflow |
| Governance | Owner processo identificato |

---

## 4. Competenze

### 4.1 Certificazioni

| Certificazione | Codice | Obbligatoria |
|----------------|--------|--------------|
| Azure AI Engineer | AI-102 | Sì |
| Power Platform | PL-200 | Sì |
| Azure Developer | AZ-204 | Raccomandata |

### 4.2 Team

| Ruolo | Seniority | Effort |
|-------|-----------|--------|
| Solution Architect | Senior | 2 gg |
| AI Engineer | Mid-Senior | 6 gg |
| Power Platform Dev | Mid | 5 gg |
| DevOps | Mid | 2 gg |

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Policy Config | 4 gg | Regole mappate |
| Integration | 5 gg | End-to-end |
| Test | 2 gg | UAT completato |
| Go-Live | 2 gg | Produzione |

### 5.2 Deliverable

**Setup:** subscription, OpenAI, AI Search, Power Automate premium, Cosmos DB.

**Policy Config:** policy indicizzate, prompt engineering, threshold calibration, template raccomandazioni.

**Integration:** connettore sistema sorgente, Adaptive Card Teams, email template, audit logging.

**Test:** test con richieste reali, tuning accuracy, formazione approvatori.

### 5.3 Definition of Done

- [ ] Accuracy ≥85% su test set
- [ ] Latenza < 3s P95
- [ ] Integrazione workflow ok
- [ ] Audit trail funzionante
- [ ] Approvatori formati

---

## 6. Rischi

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Policy non documentate | Media | Alto | Workshop discovery |
| Integrazione ERP complessa | Media | Alto | Verificare API in pre-sales |
| Resistenza approvatori | Media | Medio | Change management, demo |
| Eccezioni non previste | Alta | Medio | Escalation path + learning |

### 6.1 Dipendenze critiche

| Dipendenza | Owner | Deadline |
|------------|-------|----------|
| Documentazione policy | Cliente HR/Finance | Kickoff |
| Accesso sistema workflow | Cliente IT | Giorno 2 |
| Approvatore champion | Cliente Business | Giorno 8 |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Latenza | > 5s | > 10s |
| Accuracy (feedback) | < 85% | < 75% |
| Escalation rate | > 30% | > 50% |
| Error rate | > 2% | > 5% |

### 7.2 Continuous Improvement

| Attività | Frequenza | Owner |
|----------|-----------|-------|
| Review accuracy | Settimanale | AI Engineer |
| Policy update | Su richiesta | Business + AI |
| Prompt tuning | Mensile | AI Engineer |
| Feedback analysis | Settimanale | Product Owner |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Azure OpenAI attivo
- [ ] AI Search con policy indicizzate
- [ ] Power Automate flows attivi
- [ ] Cosmos DB per audit

**Applicazione**
- [ ] Connessione sistema sorgente
- [ ] Adaptive Card funzionante
- [ ] Email notification attive
- [ ] Audit logging verificato

**Qualità**
- [ ] Accuracy ≥85% validata
- [ ] Latenza < 3s verificata
- [ ] Test con 50 richieste reali
- [ ] Approvatori formati

**Governance**
- [ ] Owner processo identificato
- [ ] Escalation path definito
- [ ] Policy review schedulata

**Go/No-Go**

| Criterio | Status |
|----------|--------|
| Accuracy target | ☐ |
| Integration ok | ☐ |
| Approvatori ok | ☐ |
| Audit compliant | ☐ |

---

*Nexa Data | Foundation | Specifiche Tecniche*
