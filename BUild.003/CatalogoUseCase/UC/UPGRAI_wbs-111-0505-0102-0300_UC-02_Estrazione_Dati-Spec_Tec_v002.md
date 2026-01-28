---
ID: 1.1.1.1.1.5.5.1.2.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Knowledge > UC-02 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0102-0300 UC-02.Estrazione Dati da Doc. Non Strutturati-Spec.Tec v.002
---

# UC-02. Estrazione Dati — Specifiche Tecniche

## 1. Overview

**Use Case:** estrazione automatica dati da documenti non strutturati verso sistemi gestionali.

**Pattern:** Document Intelligence + Post-processing LLM

**Complessità:** ●●●○○ (3/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      INPUT                                  │
│       Email    │    Folder Watch    │    Upload manuale     │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   PROCESSING                                │
│   Document Intelligence → Estrazione → Post-processing LLM  │
│                          (OCR + Layout)   (normalizzazione) │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   VALIDATION                                │
│         Confidence Check → Human Review Queue               │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    OUTPUT                                   │
│           API Gestionale   │   Export File   │   Database   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure Document Intelligence | OCR + Estrazione | S0 |
| Azure OpenAI | Post-processing | S0 |
| Azure Blob Storage | Document storage | LRS |
| Azure Functions | Orchestrazione | Consumption |
| Azure Logic Apps | Connettori | Consumption |

### 2.3 Modelli Document Intelligence

| Modello | Uso |
|---------|-----|
| prebuilt-invoice | Fatture |
| prebuilt-receipt | Scontrini |
| prebuilt-idDocument | Documenti identità |
| prebuilt-layout | Layout generico |
| custom | Documenti specifici cliente |

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Elaborazione PDF nativi e scansionati | Must |
| RF-02 | Estrazione campi configurabili | Must |
| RF-03 | Confidence score per campo | Must |
| RF-04 | Coda validazione per low-confidence | Must |
| RF-05 | Export verso gestionale | Must |
| RF-06 | Dashboard volumi/accuracy | Should |
| RF-07 | Retry automatico su errori | Should |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Latenza | < 5s/documento |
| RNF-02 | Disponibilità | ≥99% |
| RNF-03 | Accuracy | ≥85% per campo |
| RNF-04 | Throughput | 100 doc/ora |
| RNF-05 | Retention documenti | 90 giorni |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Dati | 20-30 documenti esempio per tipologia |
| Dati | Mappatura campi (source → target) |
| Integrazione | API gestionale documentate |
| Processo | Owner validazione identificato |

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
| Integration Developer | Mid | 4 gg |
| DevOps | Mid | 2 gg |

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Configurazione | 4 gg | Modello configurato |
| Integrazione | 5 gg | Flusso end-to-end |
| Test | 2 gg | UAT completato |
| Go-Live | 2 gg | Produzione |

### 5.2 Deliverable

**Setup:** subscription, resource group, Document Intelligence, storage, Functions.

**Configurazione:** modello selezionato/custom, mappatura campi, threshold confidence.

**Integrazione:** connettore input (email/folder), connettore output (gestionale), UI validazione.

**Test:** test con documenti reali, tuning threshold, formazione operatori.

### 5.3 Definition of Done

- [ ] Estrazione funziona su documenti tipo
- [ ] Integrazione gestionale verificata
- [ ] Accuracy ≥85% su test set
- [ ] Operatori formati
- [ ] Documentazione completa

---

## 6. Rischi

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Qualità scan scarsa | Media | Alto | Assessment documenti in fase 1 |
| Layout molto variabile | Media | Medio | Usare modello custom |
| API gestionale non standard | Bassa | Alto | Verificare in pre-sales |
| Volume superiore a stima | Bassa | Medio | Scaling Azure Functions |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Error rate | > 5% | > 15% |
| Coda validazione | > 50 doc | > 100 doc |
| Latenza | > 8s | > 15s |
| Accuracy | < 85% | < 75% |

### 7.2 Alerting

- Error rate alto → verifica documenti problematici
- Coda lunga → alert a validatori
- Accuracy in calo → review modello

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Document Intelligence attivo
- [ ] Storage configurato
- [ ] Functions deployate
- [ ] Connettore input attivo
- [ ] Connettore output testato

**Applicazione**
- [ ] Modello calibrato su documenti reali
- [ ] Threshold confidence impostati
- [ ] UI validazione funzionante
- [ ] Export gestionale verificato

**Qualità**
- [ ] Accuracy ≥85% su test set
- [ ] Zero documenti persi
- [ ] Operatori formati
- [ ] Documentazione consegnata

---

*Nexa Data | Foundation | Specifiche Tecniche*
