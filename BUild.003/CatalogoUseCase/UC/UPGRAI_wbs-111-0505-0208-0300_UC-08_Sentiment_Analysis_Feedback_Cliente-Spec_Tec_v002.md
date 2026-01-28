---
ID: 1.1.1.1.1.5.5.2.8.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Customer Experience > UC-08 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0208-0300 UC-08.Sentiment Analysis Feedback Cliente-Spec.Tec v.002
---

# UC-08. Sentiment Analysis Feedback Cliente — Specifiche Tecniche

## 1. Overview

**Use Case:** analisi automatica sentiment e topic extraction su feedback clienti multi-source.

**Pattern:** NLP Pipeline + Classification + Aggregation

**Complessità:** ●●●○○ (3/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      DATA SOURCES                           │
│   Survey   Reviews   Email   CRM   Social (future)          │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   INGESTION LAYER                           │
│   Logic Apps / Functions → Normalize → Queue                │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  ANALYSIS LAYER                             │
│   Sentiment (Azure AI) → Topic Extraction (GPT) → Score     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 AGGREGATION LAYER                           │
│   Time Series → Trends → Alerts → Dashboard                 │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure AI Language | Sentiment analysis | S |
| Azure OpenAI | Topic extraction | S0 |
| Azure Logic Apps | Ingestion | Consumption |
| Azure SQL | Data store | Basic |
| Power BI | Dashboard | Pro |
| Azure Monitor | Alerting | Pay-as-you-go |

### 2.3 Integrazioni

| Sistema | Metodo | Note |
|---------|--------|------|
| Typeform | Webhook | Real-time |
| SurveyMonkey | API | Polling |
| Google Reviews | API | Via Place ID |
| Trustpilot | API | Business account |
| Email | Logic Apps | Inbox rules |

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Sentiment classification (pos/neg/neu) | Must |
| RF-02 | Confidence score | Must |
| RF-03 | Topic extraction | Must |
| RF-04 | Keyword extraction | Should |
| RF-05 | Aggregazione per periodo | Must |
| RF-06 | Alert su soglie | Must |
| RF-07 | Dashboard interattiva | Must |
| RF-08 | Export dati | Should |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Latenza analisi | < 3s P95 |
| RNF-02 | Disponibilità | ≥99% |
| RNF-03 | Accuracy sentiment | ≥85% |
| RNF-04 | Throughput | 1000 feedback/ora |
| RNF-05 | Retention dati | 2 anni |
| RNF-06 | Alert latency | < 5 min |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Infra | Tenant Azure, Power BI Pro |
| Dati | Accesso fonti feedback, storico opzionale |
| Config | Lista topic di interesse |
| Governance | Consenso elaborazione feedback |
| Test | 100 feedback campione |

---

## 4. Competenze

### 4.1 Certificazioni richieste

| Certificazione | Codice | Obbligatoria |
|----------------|--------|--------------|
| Azure AI Engineer | AI-102 | Sì |
| Azure Developer | AZ-204 | Sì |
| Power BI | PL-300 | Raccomandata |

### 4.2 Team

| Ruolo | Seniority | Effort |
|-------|-----------|--------|
| Solution Architect | Senior | 1 gg |
| AI Engineer | Mid-Senior | 5 gg |
| Data Engineer | Mid | 4 gg |
| BI Developer | Mid | 3 gg |
| DevOps | Mid | 2 gg |

**Minimo:** 2 persone (AI Eng + Data/BI)

### 4.3 Responsible AI

Prima del go-live verifica:
- [ ] Fairness: sentiment uniforme su diverse formulazioni
- [ ] Reliability: gestione feedback malformati
- [ ] Privacy: anonimizzazione se richiesto, GDPR
- [ ] Transparency: metodologia sentiment documentata
- [ ] Accountability: audit trail analisi

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Connettori | 4 gg | Fonti connesse |
| Analysis Engine | 4 gg | Pipeline funzionante |
| Dashboard | 3 gg | Visualizzazioni pronte |
| UAT + Go-Live | 2 gg | Produzione |

### 5.2 Deliverable per fase

**Setup:** subscription, resource group, Azure AI Language, SQL database, Power BI workspace.

**Connettori:** webhook/API per ogni fonte, normalizzazione formato, queue management.

**Analysis Engine:** sentiment classification, topic extraction prompt, confidence scoring, data enrichment.

**Dashboard:** visualizzazioni trend, drill-down per topic/fonte, alert configuration.

**UAT:** validation accuracy, test alert, training utenti, go-live.

### 5.3 Definition of Done

- [ ] Codice in main, code review ok
- [ ] Pipeline end-to-end funzionante
- [ ] Accuracy ≥85% su test set
- [ ] Dashboard pubblicata
- [ ] Alert configurati e testati
- [ ] Documentazione aggiornata
- [ ] Zero bug P1/P2

---

## 6. Rischi

### 6.1 Tecnici

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Accuracy sotto target | Media | Alto | Iterare prompt, fine-tuning |
| API rate limit fonti | Media | Medio | Batch processing, caching |
| Volume picchi | Bassa | Medio | Queue, autoscaling |
| Topic ambigui | Alta | Medio | Workshop definizione, esempi |

### 6.2 Progetto

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Accesso fonti ritardato | Alta | Alto | Richiedere in pre-sales |
| Topic non definiti | Media | Medio | Workshop prioritario |
| Power BI license | Bassa | Medio | Verificare prima |
| Aspettative disallineate | Media | Alto | Demo incrementali |

### 6.3 Dipendenze critiche

| Dipendenza | Owner | Deadline |
|------------|-------|----------|
| Accesso Azure | Cliente | Kickoff -5gg |
| API fonti feedback | IT | Kickoff |
| Lista topic | Business | Giorno 3 |
| Power BI workspace | IT | Giorno 8 |
| Feedback campione | Business | Giorno 5 |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Latenza P95 | > 2.5s | > 5s |
| Error rate | > 2% | > 5% |
| Pipeline lag | > 10 min | > 30 min |
| Alert delivery | > 10 min | > 30 min |

### 7.2 Escalation

| Livello | Trigger | Owner | Tempo |
|---------|---------|-------|-------|
| L1 | Anomalia metriche | Operations | 30 min |
| L2 | Non risolto L1 | Tech Lead | 2h |
| L3 | Accuracy degradata | AI Engineer | 4h |
| L4 | Dashboard down | Management | Immediato |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Servizi Azure running
- [ ] Connettori attivi
- [ ] SQL database operativo
- [ ] Power BI pubblicato

**Applicazione**
- [ ] Pipeline end-to-end ok
- [ ] Sentiment accuracy verificata
- [ ] Topic extraction funzionante
- [ ] Alert configurati

**Sicurezza**
- [ ] Dati sensibili mascherati
- [ ] GDPR compliance verificata
- [ ] Accessi minimi necessari

**Qualità**
- [ ] Accuracy ≥85%
- [ ] Latenza < 3s
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
