---
ID: 1.1.1.1.1.6.5.3.12.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Operations > UC-12 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0605-0312-0300 UC-12.Predictive Maintenance Alerting-Spec.Tec v.002
---

# UC-12. Predictive Maintenance Alerting — Specifiche Tecniche

## 1. Overview

**Use Case:** predizione guasti macchine con alert preventivi basati su analisi dati operativi.

**Pattern:** Time Series Classification + Survival Analysis

**Complessità:** ●●●●● (5/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                    FONTI DATI MACCHINE                      │
│   PLC   SCADA   Historian   Sensori IoT   Log               │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   INGESTION LAYER                           │
│   Azure IoT Hub / Data Factory → Time Series Normalization  │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   FEATURE LAYER                             │
│   Feature Engineering → Rolling Stats → Degradation Index   │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  PREDICTION LAYER                           │
│   Azure ML (Classification + RUL) → Probability Scoring     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 EXPLANATION LAYER                           │
│   Azure OpenAI → Root Cause Hypothesis → Alert Narrative    │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    OUTPUT LAYER                             │
│      Dashboard   │   Alert   │   CMMS Integration           │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure IoT Hub | Ingestion dati (opzionale) | S1 |
| Azure Data Factory | ETL batch | Standard |
| Azure Machine Learning | Training e inference | Basic |
| Azure OpenAI | Explanation generation | S0 |
| Azure SQL Database | Feature store | S1 |
| Azure Logic Apps | Alert routing | Consumption |
| Azure Monitor | Logging | Pay-as-you-go |

### 2.3 Integrazioni

| Sistema | Metodo | Note |
|---------|--------|------|
| PLC | OPC-UA / Modbus | Via gateway |
| SCADA | API / Export | Batch |
| Historian | SQL / API | OSIsoft PI, Wonderware |
| CMMS | API | Per storico guasti |
| Teams/Email | Webhook | Alert |

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Predizione guasto per max 5 macchine | Must |
| RF-02 | Orizzonte 3-7 giorni | Must |
| RF-03 | Probabilità failure con confidence | Must |
| RF-04 | Identificazione componente a rischio | Should |
| RF-05 | Spiegazione cause in linguaggio naturale | Should |
| RF-06 | Dashboard health score macchine | Must |
| RF-07 | Integrazione CMMS per work order | Could |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Precision | ≥85% |
| RNF-02 | Recall | ≥80% |
| RNF-03 | Orizzonte medio | ≥3 giorni |
| RNF-04 | Latenza inference | < 5 min |
| RNF-05 | Disponibilità | ≥99% |
| RNF-06 | Retention dati | 24 mesi |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Dati | Storico sensori ≥6 mesi, frequenza ≥1/min |
| Guasti | Storico eventi guasto con timestamp e tipo |
| Infra | Accesso dati PLC/SCADA, tenant Azure |
| Dominio | Referente con conoscenza macchine |
| Test | Guasti noti per validazione modello |

---

## 4. Competenze

### 4.1 Certificazioni richieste

| Certificazione | Codice | Obbligatoria |
|----------------|--------|--------------|
| Azure Data Scientist | DP-100 | Sì |
| Azure AI Engineer | AI-102 | Sì |
| Azure IoT Developer | AZ-220 | Raccomandata |

### 4.2 Team

| Ruolo | Seniority | Effort |
|-------|-----------|--------|
| ML Engineer | Senior | 7 gg |
| Data Engineer | Mid-Senior | 4 gg |
| IoT/OT Specialist | Mid | 2 gg |
| DevOps | Mid | 2 gg |

**Minimo:** 2 persone (ML Eng + Data Eng con competenze OT)

### 4.3 Responsible AI

Prima del go-live verifica:
- [ ] Fairness: modello non biased per turno/operatore
- [ ] Reliability: gestione dati mancanti, sensor drift
- [ ] Safety: no azioni automatiche senza validazione umana
- [ ] Transparency: spiegazione predizioni
- [ ] Accountability: audit trail decisioni

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Data prep | 3 gg | Feature dataset |
| Training | 5 gg | Modello validato |
| Alert | 3 gg | Sistema attivo |
| UAT + Go-Live | 2 gg | Produzione |

### 5.2 Deliverable per fase

**Setup:** subscription, ML workspace, IoT Hub/connettori, storage, accessi OT verificati.

**Data prep:** ingestion pipeline, feature engineering, labeling guasti, dataset training/test.

**Training:** modello addestrato, hyperparameter tuning, validazione su guasti storici, deployment endpoint.

**Alert:** soglie configurate, Logic Apps attive, dashboard health score, integrazione CMMS (se prevista).

**UAT:** monitoraggio real-time, validazione con operations, tuning, documentazione.

### 5.3 Definition of Done

- [ ] Modello precision ≥85%
- [ ] Orizzonte medio ≥3 giorni
- [ ] Alert funzionanti
- [ ] Dashboard operativa
- [ ] Documentazione completa
- [ ] Handover operations

---

## 6. Rischi

### 6.1 Tecnici

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Dati insufficienti | Media | Alto | Assessment in pre-sales |
| Pochi eventi guasto | Alta | Alto | Approcci unsupervised |
| Sensor drift | Media | Medio | Monitoring drift, retrain |
| Modello non generalizza | Media | Alto | Validazione rigorosa |

### 6.2 Progetto

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Accesso OT bloccato | Alta | Alto | Coinvolgere IT/OT early |
| Storico guasti incompleto | Alta | Medio | Interviste manutentori |
| Aspettative 100% accuracy | Media | Alto | Expectation setting |

### 6.3 Dipendenze critiche

| Dipendenza | Owner | Deadline |
|------------|-------|----------|
| Accesso dati PLC/SCADA | IT/OT | Kickoff -5gg |
| Storico guasti | Manutenzione | Kickoff |
| Referente dominio | Operations | Tutto progetto |
| Validazione predizioni | Operations | Fase 4 |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Prediction drift | > 10% | > 20% |
| Data freshness | > 1h | > 4h |
| False positive rate | > 25% | > 40% |
| Inference latency | > 10 min | > 30 min |

### 7.2 Escalation

| Livello | Trigger | Owner | Tempo |
|---------|---------|-------|-------|
| L1 | Alert non consegnato | Operations | 30 min |
| L2 | Non risolto L1 | ML Engineer | 2h |
| L3 | Non risolto L2 | Tech Lead | 4h |
| L4 | Predizione mancata | Management | Immediato |

### 7.3 Manutenzione

| Attività | Frequenza |
|----------|-----------|
| Re-training modelli | Trimestrale o post-guasto |
| Review performance | Mensile |
| Update feature engineering | Al bisogno |
| Calibrazione soglie | Trimestrale |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Servizi Azure running
- [ ] Pipeline dati attive
- [ ] ML endpoint deployed
- [ ] Backup configurato

**Modello**
- [ ] Precision ≥85%
- [ ] Validato su guasti storici
- [ ] Monitoring drift attivo
- [ ] Soglie calibrate

**Alert**
- [ ] Canali configurati
- [ ] Routing corretto
- [ ] Test notifiche ok

**Dashboard**
- [ ] Health score visibile
- [ ] Trend storico
- [ ] Drill-down macchina

**Go/No-Go**

| Criterio | Status |
|----------|--------|
| Model performance | ☐ |
| Alert funzionanti | ☐ |
| Operations trained | ☐ |
| UAT firmato | ☐ |

---

*Nexa Data | Foundation | Specifiche Tecniche*
