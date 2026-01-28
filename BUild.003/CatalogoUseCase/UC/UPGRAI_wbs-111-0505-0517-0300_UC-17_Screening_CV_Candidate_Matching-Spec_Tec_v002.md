---
ID: 1.1.1.1.1.5.5.5.17.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > HR > UC-17 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0517-0300 UC-17.Screening CV e Candidate Matching-Spec.Tec v.002
---

# UC-17. Screening CV e Candidate Matching — Specifiche Tecniche

## 1. Overview

**Use Case:** screening automatico CV e matching con requisiti posizione.

**Pattern:** Document Intelligence + LLM Extraction + Semantic Matching

**Complessità:** ●●●○○ (3/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      INPUT                                  │
│       Upload Batch   │   ATS Webhook   │   Email Inbox      │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   CV PARSING                                │
│   Document Intelligence → Structure Extraction → Normalize  │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   ENRICHMENT                                │
│   Skill Taxonomy → Experience Calculation → Education Map   │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   MATCHING                                  │
│   Job Requirements → Semantic Similarity → Score & Rank     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    OUTPUT                                   │
│      Shortlist   │   Dashboard   │   ATS Export   │   API   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure Document Intelligence | CV parsing | S0 |
| Azure OpenAI | Extraction + Matching | S0 |
| Azure AI Search | Skill taxonomy | S1 |
| Azure Blob Storage | CV storage | LRS |
| Azure Functions | Orchestrazione | Consumption |
| Azure SQL | Candidate database | S1 |

### 2.3 CV Data Model

```
┌─────────────────────────────────────────────────────────────┐
│                   CANDIDATE PROFILE                         │
│                                                             │
│  ├── personal_info                                         │
│  │   ├── name, email, phone, location                      │
│  │                                                          │
│  ├── experience[]                                          │
│  │   ├── company, role, duration, description              │
│  │   └── extracted_skills[]                                │
│  │                                                          │
│  ├── education[]                                           │
│  │   ├── institution, degree, field, year                  │
│  │                                                          │
│  ├── skills[]                                              │
│  │   ├── name, category, level, source                     │
│  │                                                          │
│  ├── languages[]                                           │
│  │   ├── language, level                                   │
│  │                                                          │
│  └── certifications[]                                      │
│      ├── name, issuer, date                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Parsing CV multi-formato | Must |
| RF-02 | Estrazione competenze strutturata | Must |
| RF-03 | Matching con job requirements | Must |
| RF-04 | Score con motivazione | Must |
| RF-05 | Shortlist ordinata | Must |
| RF-06 | Filtri knockout (must-have) | Must |
| RF-07 | Export per ATS | Should |
| RF-08 | Bulk processing | Should |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Accuracy matching | ≥85% |
| RNF-02 | Parsing completeness | ≥95% |
| RNF-03 | Latenza | < 10s/CV |
| RNF-04 | Throughput | 100 CV/ora |
| RNF-05 | GDPR compliance | Sì |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Job | Template job description strutturato |
| Test | 50 CV con valutazione HR nota |
| Taxonomy | Lista skill rilevanti per settore |
| Compliance | Policy privacy recruiting |

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
| Backend Developer | Mid | 4 gg |
| DevOps | Mid | 2 gg |

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Parsing Config | 4 gg | Extraction ok |
| Matching | 5 gg | Scoring calibrato |
| Integration | 2 gg | End-to-end |
| Go-Live | 2 gg | Produzione |

### 5.2 Deliverable

**Setup:** subscription, Document Intelligence, OpenAI, storage, SQL.

**Parsing Config:** CV parser configurato, skill taxonomy, extraction prompts.

**Matching:** job template, matching algorithm, scoring logic, knockout filters.

**Integration:** UI upload, dashboard, export, API.

### 5.3 Definition of Done

- [ ] Parsing accuracy ≥95%
- [ ] Matching accuracy ≥85%
- [ ] Latenza < 10s/CV
- [ ] GDPR compliance verificata
- [ ] Recruiter validato

---

## 6. Rischi

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| CV formati non standard | Media | Medio | Fallback manual review |
| Bias nel matching | Media | Alto | Audit fairness, blind fields |
| Privacy concerns | Bassa | Alto | GDPR compliance, consent |
| Skill taxonomy incompleta | Media | Medio | Iterative enrichment |

### 6.1 Responsible AI

- [ ] Fairness: no discriminazione per età, genere, origine
- [ ] Transparency: motivazione score visibile
- [ ] Privacy: minimizzazione dati, retention policy
- [ ] Human oversight: recruiter decide sempre
- [ ] Audit trail: decisioni tracciabili

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Parsing failure | > 5% | > 15% |
| Matching accuracy (feedback) | < 85% | < 75% |
| Latenza | > 15s | > 30s |
| Throughput | < 80 CV/h | < 50 CV/h |

### 7.2 Continuous Improvement

| Attività | Frequenza | Owner |
|----------|-----------|-------|
| Feedback review | Settimanale | AI + HR |
| Skill taxonomy update | Mensile | HR + AI |
| Bias audit | Trimestrale | Compliance |
| Model tuning | Su feedback | AI Engineer |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Document Intelligence attivo
- [ ] OpenAI configurato
- [ ] Storage con encryption
- [ ] Database ready

**Applicazione**
- [ ] CV parsing funzionante
- [ ] Matching calibrato
- [ ] Dashboard operativa
- [ ] Export testato

**Qualità**
- [ ] Parsing ≥95%
- [ ] Matching ≥85%
- [ ] Test su 50 CV reali
- [ ] Recruiter sign-off

**Compliance**
- [ ] GDPR review ok
- [ ] Retention policy
- [ ] Consent management
- [ ] Bias audit iniziale

**Go/No-Go**

| Criterio | Status |
|----------|--------|
| Accuracy target | ☐ |
| GDPR compliant | ☐ |
| HR approva | ☐ |
| Bias check ok | ☐ |

---

*Nexa Data | Foundation | Specifiche Tecniche*
