---
ID: 1.1.1.1.1.6.5.3.11.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Operations > UC-11 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0605-0311-0300 UC-11.Anomaly Detection su Dati Operativi-Spec.Tec v.002
---

# UC-11. Anomaly Detection su Dati Operativi — Specifiche Tecniche

## 1. Overview

**Use Case:** rilevamento automatico di anomalie su dati operativi con alert proattivi.

**Pattern:** Time Series Anomaly Detection + LLM Explanation

**Complessità:** ●●●●○ (4/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      FONTI DATI                             │
│   Database   ERP   Sensori   File   API                     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   INGESTION LAYER                           │
│   Azure Data Factory → Normalizzazione → Time Series DB     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  DETECTION LAYER                            │
│   Azure Anomaly Detector (Multivariate) + Custom Models     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 EXPLANATION LAYER                           │
│   Azure OpenAI → Analisi contestuale → Narrative            │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    ALERT LAYER                              │
│         Email   │   Teams   │   Webhook   │   Dashboard     │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure Anomaly Detector | Detection engine | S0 |
| Azure OpenAI | Explanation generation | S0 |
| Azure Data Factory | ETL scheduling | Standard |
| Azure SQL Database | Time series storage | S1 |
| Azure Logic Apps | Alert routing | Consumption |
| Azure Monitor | Logging | Pay-as-you-go |

### 2.3 Integrazioni

| Sistema | Metodo | Note |
|---------|--------|------|
| Database SQL | ODBC | Polling schedulato |
| ERP | API/Export | Batch |
| IoT Hub | Stream (opzionale) | Real-time |
| Teams | Webhook | Alert |
| Email | SMTP/Graph API | Alert |

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Monitoraggio fino a 10 metriche | Must |
| RF-02 | Detection univariate e multivariate | Must |
| RF-03 | Gestione stagionalità automatica | Must |
| RF-04 | Alert configurabili per metrica | Must |
| RF-05 | Spiegazione anomalia in linguaggio naturale | Should |
| RF-06 | Dashboard con timeline anomalie | Must |
| RF-07 | Feedback loop (conferma/ignora anomalia) | Should |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Latenza detection | < 5 min |
| RNF-02 | Disponibilità | ≥99% |
| RNF-03 | True positive rate | ≥85% |
| RNF-04 | False positive rate | < 15% |
| RNF-05 | Retention dati | 24 mesi |
| RNF-06 | Metriche max | 100 (scalabile) |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Dati | Storico ≥6 mesi, frequenza almeno oraria |
| Qualità | Dati completi, timestamp consistenti |
| Infra | Tenant Azure, accesso rete a fonti |
| Business | Definizione metriche critiche, soglie |
| Test | Anomalie note per validazione |

---

## 4. Competenze

### 4.1 Certificazioni richieste

| Certificazione | Codice | Obbligatoria |
|----------------|--------|--------------|
| Azure Data Engineer | DP-203 | Sì |
| Azure AI Engineer | AI-102 | Sì |
| Azure Developer | AZ-204 | Raccomandata |

### 4.2 Team

| Ruolo | Seniority | Effort |
|-------|-----------|--------|
| Data Engineer | Mid-Senior | 6 gg |
| AI Engineer | Mid-Senior | 5 gg |
| Backend Developer | Mid | 2 gg |
| DevOps | Mid | 2 gg |

**Minimo:** 2 persone (Data Eng + AI Eng)

### 4.3 Responsible AI

Prima del go-live verifica:
- [ ] Fairness: detection non biased per periodo/fonte
- [ ] Reliability: gestione dati mancanti
- [ ] Privacy: no PII nei log anomalie
- [ ] Transparency: spiegazione detection
- [ ] Accountability: audit trail alert

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Ingestion | 3 gg | Dati caricati |
| Training | 4 gg | Modelli addestrati |
| Alert | 3 gg | Notifiche attive |
| UAT + Go-Live | 3 gg | Produzione |

### 5.2 Deliverable per fase

**Setup:** subscription, resource group, Anomaly Detector, SQL Database, Data Factory.

**Ingestion:** connettori attivi, pipeline ETL, time series normalizzate, storico caricato.

**Training:** modelli addestrati per metrica, baseline definite, threshold configurati.

**Alert:** Logic Apps configurate, canali notifica attivi, dashboard pronta.

**UAT:** test su anomalie note, tuning false positive, documentazione.

### 5.3 Definition of Done

- [ ] Modelli addestrati su storico
- [ ] True positive ≥85% su test set
- [ ] Alert funzionanti
- [ ] Dashboard operativa
- [ ] Documentazione completa
- [ ] Handover operations

---

## 6. Rischi

### 6.1 Tecnici

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Storico insufficiente | Media | Alto | Assessment in pre-sales |
| Dati di scarsa qualità | Alta | Alto | Data cleaning fase 1 |
| Troppi false positive | Media | Medio | Tuning iterativo |
| Pattern non stazionari | Media | Medio | Re-training periodico |

### 6.2 Progetto

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Metriche non definite | Media | Alto | Workshop kickoff |
| Aspettative irrealistiche | Alta | Medio | Expectation setting |
| Alert fatigue | Media | Medio | Soglie conservative |

### 6.3 Dipendenze critiche

| Dipendenza | Owner | Deadline |
|------------|-------|----------|
| Accesso dati storici | IT | Kickoff |
| Lista metriche | Business | Kickoff +2gg |
| Anomalie note (test) | Business | Fine fase 3 |
| Canali notifica | IT | Fine fase 3 |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Detection latency | > 10 min | > 30 min |
| False positive rate | > 20% | > 30% |
| Pipeline failure | 1 | 3 consecutivi |
| Alert delivery failure | 1 | 3 |

### 7.2 Escalation

| Livello | Trigger | Owner | Tempo |
|---------|---------|-------|-------|
| L1 | Alert non consegnato | Operations | 30 min |
| L2 | Non risolto L1 | Data Engineer | 2h |
| L3 | Non risolto L2 | Tech Lead | 4h |
| L4 | Detection down | Management | Immediato |

### 7.3 Manutenzione

| Attività | Frequenza |
|----------|-----------|
| Re-training modelli | Trimestrale |
| Review false positive | Mensile |
| Tuning soglie | Al bisogno |
| Pulizia dati obsoleti | Annuale |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Servizi Azure running
- [ ] Pipeline ETL attive
- [ ] Storage configurato
- [ ] Backup attivo

**Detection**
- [ ] Modelli addestrati
- [ ] Baseline validate
- [ ] Soglie configurate
- [ ] True positive ≥85%

**Alert**
- [ ] Canali configurati
- [ ] Routing corretto
- [ ] Test notifiche ok

**Dashboard**
- [ ] Visualizzazione anomalie
- [ ] Drill-down funzionante
- [ ] Accessi configurati

**Go/No-Go**

| Criterio | Status |
|----------|--------|
| Detection accuracy | ☐ |
| Alert funzionanti | ☐ |
| Dashboard pronta | ☐ |
| UAT firmato | ☐ |

---

*Nexa Data | Foundation | Specifiche Tecniche*
