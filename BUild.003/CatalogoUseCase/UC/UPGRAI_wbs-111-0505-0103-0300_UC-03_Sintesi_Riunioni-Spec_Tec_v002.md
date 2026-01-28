---
ID: 1.1.1.1.1.5.5.1.3.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Knowledge > UC-03 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0103-0300 UC-03.Sintesi Automatica Riunioni-Spec.Tec v.002
---

# UC-03. Sintesi Riunioni — Specifiche Tecniche

## 1. Overview

**Use Case:** trascrizione e sintesi automatica riunioni con estrazione decisioni e action item.

**Pattern:** Speech-to-Text + LLM Summarization

**Complessità:** ●●●○○ (3/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      INPUT                                  │
│      Teams Recording   │   Zoom   │   Upload Audio/Video    │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   TRANSCRIPTION                             │
│   Azure Speech → Diarization → Speaker Identification       │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   ANALYSIS                                  │
│   Azure OpenAI → Summarization → Decision/Action Extraction │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    OUTPUT                                   │
│      Verbale PDF   │   Web UI   │   API   │   Email         │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure Speech | Trascrizione + Diarization | S0 |
| Azure OpenAI | Summarization | S0 |
| Azure Blob Storage | Media storage | LRS |
| Azure Functions | Orchestrazione | Consumption |
| Azure Cosmos DB | Metadata + Search | Serverless |

### 2.3 Flusso dati

1. Recording disponibile (webhook Teams/Zoom o upload)
2. Estrazione audio se video
3. Trascrizione con timestamp
4. Diarization (chi parla quando)
5. Speaker identification (match con profili noti)
6. Chunking trascrizione
7. Summarization LLM
8. Estrazione decisioni/action item
9. Generazione verbale
10. Notifica + storage

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Trascrizione IT/EN | Must |
| RF-02 | Diarization (chi parla) | Must |
| RF-03 | Estrazione decisioni | Must |
| RF-04 | Estrazione action item | Must |
| RF-05 | Assegnazione action a speaker | Should |
| RF-06 | Verbale strutturato | Must |
| RF-07 | Ricerca full-text | Should |
| RF-08 | Export PDF/Word | Should |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Latenza | < 5 min post-meeting |
| RNF-02 | WER (Word Error Rate) | < 15% |
| RNF-03 | Disponibilità | ≥99% |
| RNF-04 | Durata max riunione | 4 ore |
| RNF-05 | Retention | 1 anno |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Piattaforma | Teams/Zoom con recording abilitato |
| Compliance | Policy registrazione approvata |
| Dati | 5 riunioni esempio per tuning |
| Speaker | Lista partecipanti frequenti per training |

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
| Speech Config | 4 gg | Trascrizione ok |
| Summarization | 5 gg | Sintesi + action |
| Integration | 2 gg | End-to-end |
| Go-Live | 2 gg | Produzione |

### 5.2 Deliverable

**Setup:** subscription, Speech service, OpenAI, storage, Cosmos DB.

**Speech Config:** trascrizione funzionante, diarization calibrata, speaker enrollment.

**Summarization:** prompt engineering, estrazione decisioni/action, template verbale.

**Integration:** webhook Teams/Zoom, UI consultazione, notifiche.

### 5.3 Definition of Done

- [ ] Trascrizione WER < 15%
- [ ] Diarization accuracy ≥ 90%
- [ ] Action item estratti correttamente ≥ 80%
- [ ] Verbale generato automaticamente
- [ ] Integrazione Teams/Zoom attiva

---

## 6. Rischi

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Audio scarsa qualità | Media | Alto | Requisiti minimi audio |
| Sovrapposizione speaker | Media | Medio | Tuning diarization |
| Gergo tecnico non riconosciuto | Media | Medio | Custom vocabulary |
| Riunioni multilingua | Bassa | Alto | Scope solo IT/EN |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Latenza processing | > 8 min | > 15 min |
| WER | > 15% | > 25% |
| Error rate | > 5% | > 15% |
| Coda processing | > 10 | > 25 |

### 7.2 Alerting

- Latenza alta → scaling Functions
- WER alto → review audio quality
- Errori → check formato input

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Speech service attivo
- [ ] OpenAI configurato
- [ ] Storage + Cosmos DB
- [ ] Functions deployate

**Applicazione**
- [ ] Webhook Teams/Zoom attivi
- [ ] Trascrizione funzionante
- [ ] Summarization calibrato
- [ ] UI consultazione ok

**Qualità**
- [ ] WER < 15%
- [ ] Action item accuracy ≥ 80%
- [ ] Test su 5 riunioni reali
- [ ] Utenti formati

**Privacy**
- [ ] Policy recording comunicata
- [ ] Retention configurata
- [ ] Accessi limitati

---

*Nexa Data | Foundation | Specifiche Tecniche*
