---
ID: 1.1.1.1.1.5.5.4.15.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Workflow > UC-15 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0415-0300 UC-15.Lead Scoring e Qualification-Spec.Tec v.002
---

# UC-15. Lead Scoring & Qualification — Specifiche Tecniche

## 1. Overview

**Use Case:** scoring e qualifica automatica lead con insight e next best action.

**Pattern:** ML Classification + LLM Insight Generation

**Complessità:** ●●●●○ (4/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      DATA SOURCES                           │
│      CRM   │   Marketing Automation   │   Web Analytics     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATA LAYER                                │
│   ETL → Feature Store → Lead Profile Aggregation            │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   ML LAYER                                  │
│   Scoring Model → Qualification Rules → Propensity Model    │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   INSIGHT LAYER                             │
│   Azure OpenAI → Insight Generation → Next Best Action      │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    OUTPUT                                   │
│    CRM Writeback   │   Dashboard   │   Alerts   │   API     │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure Machine Learning | Scoring model | S0 |
| Azure OpenAI | Insight generation | S0 |
| Azure Data Factory | ETL | Pay-as-you-go |
| Azure SQL | Feature store | S1 |
| Power BI | Dashboard | Pro |
| Logic Apps | Alerts + CRM sync | Consumption |

### 2.3 Feature Categories

```
┌─────────────────────────────────────────────────────────────┐
│                   FEATURE ENGINEERING                       │
│                                                             │
│  FIRMOGRAPHIC              BEHAVIORAL              ENGAGEMENT│
│  ├── Company size          ├── Page views          ├── Email│
│  ├── Industry              ├── Content downloads   │   opens │
│  ├── Revenue               ├── Pricing page visits │   clicks│
│  ├── Location              ├── Demo requests       ├── Events│
│  └── Tech stack            └── Time on site        └── Calls │
│                                                             │
│  TEMPORAL                  DERIVED                          │
│  ├── Recency              ├── Engagement velocity           │
│  ├── Frequency            ├── ICP fit score                 │
│  └── Tenure               └── Buying stage signals          │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Scoring 0-100 per ogni lead | Must |
| RF-02 | Qualifica automatica MQL/SQL | Must |
| RF-03 | Insight in linguaggio naturale | Must |
| RF-04 | Next best action | Should |
| RF-05 | Dashboard pipeline | Must |
| RF-06 | Alert su lead caldi | Should |
| RF-07 | Writeback score su CRM | Must |
| RF-08 | Explainability (why this score) | Should |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Accuracy | ≥85% (AUC-ROC) |
| RNF-02 | Latenza scoring | < 5 secondi |
| RNF-03 | Batch scoring | < 1 ora (10K lead) |
| RNF-04 | Disponibilità | ≥99% |
| RNF-05 | Model refresh | Settimanale |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Dati | Storico lead 12 mesi con outcome |
| Dati | Almeno 500 lead, 50 conversioni |
| CRM | API access (read + write) |
| Business | Definizione ICP |
| Business | Criteri qualifica MQL/SQL |

---

## 4. Competenze

### 4.1 Certificazioni

| Certificazione | Codice | Obbligatoria |
|----------------|--------|--------------|
| Azure Data Scientist | DP-100 | Sì |
| Azure AI Engineer | AI-102 | Raccomandata |
| Azure Data Engineer | DP-203 | Raccomandata |

### 4.2 Team

| Ruolo | Seniority | Effort |
|-------|-----------|--------|
| Solution Architect | Senior | 2 gg |
| Data Scientist | Mid-Senior | 7 gg |
| Data Engineer | Mid | 4 gg |
| DevOps/MLOps | Mid | 2 gg |

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Data Prep | 3 gg | Feature store |
| Modelling | 5 gg | Model validated |
| Integration | 3 gg | End-to-end |
| Go-Live | 2 gg | Produzione |

### 5.2 Deliverable

**Setup:** subscription, ML workspace, Data Factory, SQL, connettori CRM.

**Data Prep:** ETL pipeline, feature engineering, train/test split, data quality report.

**Modelling:** model training, hyperparameter tuning, validation, insight prompt engineering.

**Integration:** scoring pipeline, CRM writeback, dashboard, alerts.

### 5.3 Definition of Done

- [ ] AUC-ROC ≥0.85
- [ ] Scoring pipeline attiva
- [ ] CRM integration funzionante
- [ ] Dashboard operativa
- [ ] Sales team formato

---

## 6. Rischi

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Dati insufficienti | Media | Alto | Assessment pre-sales |
| Data quality scarsa | Media | Alto | Data profiling fase 1 |
| CRM integration complessa | Bassa | Medio | Verificare API |
| Resistenza sales | Media | Medio | Change management, pilot |
| Model drift | Media | Medio | Monitoring + retraining |

### 6.1 Dipendenze critiche

| Dipendenza | Owner | Deadline |
|------------|-------|----------|
| Accesso CRM | Cliente IT | Kickoff |
| Storico lead | Sales Ops | Giorno 2 |
| Definizione ICP | Sales/Marketing | Giorno 3 |
| Feedback labeling | Sales | Giorno 8 |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Model AUC | < 0.80 | < 0.70 |
| Scoring latency | > 10s | > 30s |
| Pipeline failure | > 1% | > 5% |
| Data freshness | > 24h | > 48h |

### 7.2 Model Lifecycle

| Attività | Frequenza | Owner |
|----------|-----------|-------|
| Performance review | Settimanale | Data Scientist |
| Conversion feedback | Continuo | Automated |
| Retraining | Mensile | Data Scientist |
| Feature review | Trimestrale | DS + Sales |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] ML workspace attivo
- [ ] Data Factory pipeline ok
- [ ] SQL feature store
- [ ] CRM connettori attivi

**Data Pipeline**
- [ ] ETL funzionante
- [ ] Feature store popolato
- [ ] Data quality verificata

**Modello**
- [ ] Training completato
- [ ] AUC ≥0.85 validato
- [ ] Inference pipeline attiva
- [ ] Insight generation ok

**Integrazione**
- [ ] CRM writeback funzionante
- [ ] Dashboard Power BI
- [ ] Alerts configurati

**Qualità**
- [ ] Test su 100 lead
- [ ] Feedback sales positivo
- [ ] Explainability verificata

**Go/No-Go**

| Criterio | Status |
|----------|--------|
| Model accuracy ok | ☐ |
| CRM integration ok | ☐ |
| Dashboard ok | ☐ |
| Sales team trained | ☐ |

---

*Nexa Data | Foundation | Specifiche Tecniche*
