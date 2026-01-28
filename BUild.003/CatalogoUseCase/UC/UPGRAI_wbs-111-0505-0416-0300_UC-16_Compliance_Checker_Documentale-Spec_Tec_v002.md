---
ID: 1.1.1.1.1.5.5.4.16.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Workflow > UC-16 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0416-0300 UC-16.Compliance Checker Documentale-Spec.Tec v.002
---

# UC-16. Compliance Checker Documentale — Specifiche Tecniche

## 1. Overview

**Use Case:** verifica automatica conformità documenti rispetto a policy e normative.

**Pattern:** RAG + Rule-based Analysis + LLM Reasoning

**Complessità:** ●●●●○ (4/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      INPUT                                  │
│        Upload   │   API   │   SharePoint Watch   │   Email  │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   DOCUMENT PROCESSING                       │
│   OCR (if needed) → Chunking → Structure Analysis           │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   COMPLIANCE ANALYSIS                       │
│   Rule Retrieval → Document vs Rules → Gap Detection        │
│              (RAG)        (LLM)           (LLM)             │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   REPORTING                                 │
│   Finding Aggregation → Severity Rating → Suggestions       │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    OUTPUT                                   │
│      Report PDF   │   Dashboard   │   Webhook   │   API     │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure OpenAI | Analysis + Generation | S0 |
| Azure AI Search | Rules/Templates RAG | S1 |
| Azure Document Intelligence | OCR (se necessario) | S0 |
| Azure Blob Storage | Documents + Rules | LRS |
| Azure Functions | Orchestrazione | Consumption |
| Cosmos DB | Audit trail | Serverless |

### 2.3 Rules Knowledge Base

```
┌─────────────────────────────────────────────────────────────┐
│                   COMPLIANCE KB                             │
│                                                             │
│  ├── rules/                                                │
│  │   ├── gdpr/                                             │
│  │   │   ├── art_28_processor.md                           │
│  │   │   └── art_13_information.md                         │
│  │   ├── internal_policy/                                  │
│  │   │   ├── payment_terms.md                              │
│  │   │   └── liability_caps.md                             │
│  │   └── industry/                                         │
│  │       └── sector_requirements.md                        │
│  │                                                          │
│  ├── templates/                                            │
│  │   ├── contract_standard.docx                            │
│  │   └── nda_template.docx                                 │
│  │                                                          │
│  └── checklists/                                           │
│      ├── contract_checklist.json                           │
│      └── policy_checklist.json                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Upload documento per verifica | Must |
| RF-02 | Detection non-conformità | Must |
| RF-03 | Riferimento regola violata | Must |
| RF-04 | Severity classification | Must |
| RF-05 | Suggerimento correzione | Should |
| RF-06 | Report strutturato | Must |
| RF-07 | Audit trail | Must |
| RF-08 | Batch processing | Should |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Detection rate | ≥90% |
| RNF-02 | False positive rate | <15% |
| RNF-03 | Latenza | < 30s/documento |
| RNF-04 | Disponibilità | ≥99% |
| RNF-05 | Audit retention | 7 anni |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Compliance | Policy/regole documentate |
| Templates | Documenti standard approvati |
| Test | 10-20 documenti con issue note |
| Owner | Responsabile compliance identificato |

---

## 4. Competenze

### 4.1 Certificazioni

| Certificazione | Codice | Obbligatoria |
|----------------|--------|--------------|
| Azure AI Engineer | AI-102 | Sì |
| Azure Developer | AZ-204 | Sì |
| Azure Solutions Architect | AZ-305 | Raccomandata |

### 4.2 Team

| Ruolo | Seniority | Effort |
|-------|-----------|--------|
| Solution Architect | Senior | 2 gg |
| AI Engineer | Senior | 8 gg |
| Backend Developer | Mid | 3 gg |
| DevOps | Mid | 2 gg |

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Rules Config | 4 gg | KB popolata |
| Tuning | 5 gg | Accuracy validata |
| Integration | 2 gg | End-to-end |
| Go-Live | 2 gg | Produzione |

### 5.2 Deliverable

**Setup:** subscription, OpenAI, AI Search, Document Intelligence, storage.

**Rules Config:** knowledge base popolata, regole indicizzate, checklist definite.

**Tuning:** prompt engineering, threshold calibration, test su documenti reali.

**Integration:** UI upload, report generation, audit logging, webhook.

### 5.3 Definition of Done

- [ ] Detection rate ≥90%
- [ ] False positive <15%
- [ ] Tutte le regole mappate
- [ ] Report generation funzionante
- [ ] Legal/Compliance validato

---

## 6. Rischi

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Regole non documentate | Media | Alto | Workshop discovery |
| Ambiguità interpretative | Media | Medio | Review con legal |
| Documenti molto lunghi | Bassa | Medio | Chunking + sintesi |
| Over-reliance | Media | Alto | Training, sempre review umana |

### 6.1 Responsible AI

- [ ] Sistema di supporto, non sostitutivo
- [ ] Disclosure: "verifica automatica, richiede validazione"
- [ ] No decisioni automatiche su compliance
- [ ] Audit trail per accountability
- [ ] Review umana obbligatoria

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Detection rate (feedback) | < 90% | < 80% |
| False positive rate | > 15% | > 25% |
| Latenza | > 45s | > 90s |
| Error rate | > 2% | > 5% |

### 7.2 Continuous Improvement

| Attività | Frequenza | Owner |
|----------|-----------|-------|
| Review feedback | Settimanale | AI + Compliance |
| Rules update | Su richiesta | Compliance + AI |
| Prompt tuning | Mensile | AI Engineer |
| New rule onboarding | Su richiesta | AI Engineer |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Azure OpenAI attivo
- [ ] AI Search con KB indicizzata
- [ ] Document Intelligence (se OCR)
- [ ] Storage configurato

**Knowledge Base**
- [ ] Tutte le regole caricate
- [ ] Template reference pronti
- [ ] Checklist definite
- [ ] Test cases documentati

**Applicazione**
- [ ] UI upload funzionante
- [ ] Analysis pipeline ok
- [ ] Report generation ok
- [ ] Audit trail attivo

**Qualità**
- [ ] Detection ≥90% validata
- [ ] False positive <15%
- [ ] Test su 20 documenti reali
- [ ] Legal/Compliance sign-off

**Governance**
- [ ] Owner compliance identificato
- [ ] Processo review definito
- [ ] Escalation path chiaro

**Go/No-Go**

| Criterio | Status |
|----------|--------|
| Detection target | ☐ |
| False positive ok | ☐ |
| Legal approva | ☐ |
| Audit compliant | ☐ |

---

*Nexa Data | Foundation | Specifiche Tecniche*
