---
ID: 1.1.1.1.1.5.5.5.19.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > HR > UC-19 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0519-0300 UC-19.Employee Self-Service Chatbot-Spec.Tec v.002
---

# UC-19. Employee Self-Service Chatbot — Specifiche Tecniche

## 1. Overview

**Use Case:** chatbot self-service per dipendenti su temi HR.

**Pattern:** RAG Chatbot + System Integration + Personalization

**Complessità:** ●●●○○ (3/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      INTERFACE                              │
│              Teams Bot   │   Web Widget                     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   ORCHESTRATION                             │
│   Auth (AAD) → Intent → Route (KB vs API) → Response        │
└──────────────────────┬──────────────────────────────────────┘
                       │
           ┌───────────┴───────────┐
           ▼                       ▼
┌─────────────────────┐ ┌─────────────────────────────────────┐
│   KNOWLEDGE BASE    │ │         HR SYSTEM API               │
│   Policies, FAQ     │ │   Leave Balance, Payslip, Profile   │
│   Procedures        │ │                                     │
└─────────────────────┘ └─────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure OpenAI | Generation | S0 |
| Azure AI Search | KB retrieval | S1 |
| Azure Bot Service | Teams | S1 |
| Azure Functions | API orchestration | Consumption |
| Azure API Management | HR system proxy | Developer |
| Cosmos DB | Conversation history | Serverless |

### 2.3 Intent Categories

```
┌─────────────────────────────────────────────────────────────┐
│                   INTENT ROUTING                            │
│                                                             │
│  KNOWLEDGE-BASED              SYSTEM-BASED                  │
│  ├── Policy questions         ├── Leave balance            │
│  ├── Procedure how-to         ├── Payslip info             │
│  ├── Benefit info             ├── Personal data            │
│  ├── General HR FAQ           ├── Request status           │
│  └── Contact/escalation       └── Manager info             │
│                                                             │
│  HYBRID                       ACTION                        │
│  ├── "Can I work remote?"     ├── Link to form             │
│  │   (policy + personal)      ├── Open ticket              │
│  └── "Holiday policy + my     └── Escalate to HR           │
│       remaining days"                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Q&A da knowledge base | Must |
| RF-02 | Query dati personali | Must |
| RF-03 | Autenticazione SSO | Must |
| RF-04 | Link a moduli/procedure | Must |
| RF-05 | Escalation a HR | Must |
| RF-06 | Multi-turno | Should |
| RF-07 | Analytics | Should |
| RF-08 | Proactive notifications | Nice |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Accuracy | ≥85% |
| RNF-02 | Latenza | < 5 secondi |
| RNF-03 | Disponibilità | ≥99% |
| RNF-04 | Concurrent users | 100 |
| RNF-05 | Data privacy | GDPR compliant |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Content | Policy e procedure documentate |
| System | API HR con dati dipendente |
| Identity | Azure AD SSO |
| Platform | Microsoft Teams |

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
| AI Engineer | Mid-Senior | 6 gg |
| Integration Developer | Mid | 5 gg |
| DevOps | Mid | 2 gg |

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| KB Config | 4 gg | Content indexed |
| Integration | 5 gg | API connected |
| Test | 2 gg | UAT done |
| Go-Live | 2 gg | Production |

### 5.2 Deliverable

**Setup:** subscription, OpenAI, AI Search, Bot Service, API Management.

**KB Config:** policy indexed, FAQ structured, procedures documented.

**Integration:** HR API connection, SSO, intent routing, response formatting.

**Test:** pilot group, accuracy validation, feedback loop.

### 5.3 Definition of Done

- [ ] Accuracy ≥85%
- [ ] Latenza < 5s
- [ ] HR API integration ok
- [ ] Teams deployment ok
- [ ] Pilota positivo

---

## 6. Rischi

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| HR API non disponibile | Media | Alto | Verificare in pre-sales |
| Content incompleto | Media | Medio | Content audit fase 1 |
| Privacy concerns | Bassa | Alto | Security review, AAD |
| Low adoption | Media | Medio | Change management |

### 6.1 Security & Privacy

- [ ] SSO obbligatorio
- [ ] Dati personali solo al proprietario
- [ ] Audit log accessi
- [ ] No storage dati sensibili
- [ ] GDPR compliance review

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Accuracy (feedback) | < 85% | < 75% |
| Latenza | > 8s | > 15s |
| Deflection rate | < 50% | < 30% |
| Error rate | > 3% | > 10% |

### 7.2 Continuous Improvement

| Attività | Frequenza | Owner |
|----------|-----------|-------|
| FAQ review | Settimanale | HR |
| Analytics analysis | Settimanale | HR + AI |
| Content update | Su richiesta | HR |
| Model tuning | Mensile | AI Engineer |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Azure OpenAI attivo
- [ ] AI Search configurato
- [ ] Bot Service deployato
- [ ] API Management ok

**Integrazione**
- [ ] HR API connessa
- [ ] SSO funzionante
- [ ] Teams app pubblicata

**Knowledge Base**
- [ ] Policy caricate
- [ ] FAQ complete
- [ ] Procedure documentate

**Qualità**
- [ ] Accuracy ≥85%
- [ ] Test con 20 dipendenti
- [ ] Privacy review ok
- [ ] HR sign-off

**Go/No-Go**

| Criterio | Status |
|----------|--------|
| Accuracy target | ☐ |
| Integration ok | ☐ |
| Privacy ok | ☐ |
| HR approva | ☐ |

---

*Nexa Data | Foundation | Specifiche Tecniche*
