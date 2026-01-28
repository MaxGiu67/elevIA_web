---
ID: 1.1.1.1.1.5.5.1.4.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Knowledge > UC-04 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0104-0300 UC-04.Due Diligence Documentale-Spec.Tec v.002
---

# UC-04. Due Diligence — Specifiche Tecniche

## 1. Overview

**Use Case:** analisi automatica grandi volumi documentali per due diligence, audit, compliance.

**Pattern:** Document Intelligence + RAG + Classification

**Complessità:** ●●●●○ (4/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      INPUT                                  │
│        Data Room Export   │   Folder   │   Upload batch     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   INGESTION                                 │
│   Document Intelligence → Classification → Chunking         │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   ANALYSIS                                  │
│   Clause Detection → Risk Identification → Cross-Reference  │
│              (RAG + Prompt Engineering)                     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   AGGREGATION                               │
│       Per-Document Summary → Area Summary → Executive       │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    OUTPUT                                   │
│         Report PDF   │   Dashboard   │   Export Excel       │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure Document Intelligence | OCR + Layout | S0 |
| Azure OpenAI | Analysis + Generation | S0 |
| Azure AI Search | Vector store | S1 |
| Azure Blob Storage | Document storage | LRS |
| Azure Functions | Orchestrazione | Consumption |
| Azure Cosmos DB | Results + Metadata | Serverless |

### 2.3 Pipeline elaborazione

1. **Ingestion:** upload batch, classificazione per tipo documento
2. **OCR/Parsing:** estrazione testo, tabelle, struttura
3. **Chunking:** suddivisione per analisi
4. **Embedding:** vettorizzazione per retrieval
5. **Analysis:** detection clausole per categoria
6. **Cross-ref:** correlazione tra documenti
7. **Risk scoring:** valutazione impatto/probabilità
8. **Aggregation:** rollup per area/documento
9. **Report:** generazione output strutturato

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Elaborazione PDF, Word, Excel | Must |
| RF-02 | Classificazione automatica documenti | Must |
| RF-03 | Estrazione clausole per categoria | Must |
| RF-04 | Identificazione red flag | Must |
| RF-05 | Cross-reference tra documenti | Should |
| RF-06 | Risk scoring | Should |
| RF-07 | Report per area | Must |
| RF-08 | Export Excel findings | Must |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Throughput | 1000 doc/ora |
| RNF-02 | Volume max | 10.000 documenti |
| RNF-03 | Recall clausole | ≥90% |
| RNF-04 | Precision | ≥85% |
| RNF-05 | Disponibilità | ≥99% |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Dati | Accesso documenti (export o API) |
| Configurazione | Lista clausole/rischi target |
| Validazione | Analista per review |
| Compliance | NDA per dati sensibili |

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
| Solution Architect | Senior | 3 gg |
| AI Engineer | Senior | 8 gg |
| Backend Developer | Mid | 3 gg |
| DevOps | Mid | 1 gg |

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Template | 4 gg | Clausole configurate |
| Tuning | 5 gg | Accuracy validata |
| Integration | 2 gg | Report funzionante |
| Go-Live | 2 gg | Produzione |

### 5.2 Deliverable

**Setup:** subscription, Document Intelligence, OpenAI, AI Search, storage.

**Template:** categorie clausole, red flag list, risk scoring matrix, template report.

**Tuning:** prompt engineering, threshold calibration, test su documenti reali.

**Integration:** UI analista, export Excel/PDF, dashboard.

### 5.3 Definition of Done

- [ ] Recall ≥90% su test set noto
- [ ] Precision ≥85%
- [ ] Throughput 1000 doc/ora
- [ ] Report generato automaticamente
- [ ] Analista validato output

---

## 6. Rischi

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Documenti scan bassa qualità | Media | Alto | Pre-assessment qualità |
| Clausole non standard | Media | Medio | Template estensibile + tuning |
| Volume superiore a 10K | Bassa | Medio | Scaling + batch |
| Lingue miste | Media | Alto | Scope solo IT/EN |
| Dati confidenziali | Alta | Alto | Azure privato, NDA, audit |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Throughput | < 800 doc/h | < 500 doc/h |
| Error rate | > 2% | > 5% |
| Recall | < 90% | < 80% |
| Coda documenti | > 5000 | > 10000 |

### 7.2 Alerting

- Throughput basso → scaling
- Error rate alto → review documenti problematici
- Recall in calo → review prompt/threshold

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Document Intelligence attivo
- [ ] OpenAI configurato
- [ ] AI Search index creato
- [ ] Storage con retention policy
- [ ] Network isolation (se richiesto)

**Applicazione**
- [ ] Pipeline ingestion funzionante
- [ ] Template clausole configurato
- [ ] Risk scoring calibrato
- [ ] Report generation testato
- [ ] Export Excel/PDF ok

**Qualità**
- [ ] Recall ≥90% validato
- [ ] Precision ≥85% validata
- [ ] Test su batch reale
- [ ] Analista formato

**Security**
- [ ] NDA firmato
- [ ] Accessi limitati
- [ ] Log audit attivo
- [ ] Retention definita

---

*Nexa Data | Foundation | Specifiche Tecniche*
