---
ID: 1.1.1.1.1.6.5.3.9.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Operations > UC-09 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0605-0309-0300 UC-09.Generazione Report Automatici-Spec.Tec v.002
---

# UC-09. Generazione Report Automatici — Specifiche Tecniche

## 1. Overview

**Use Case:** generazione automatica di report periodici con estrazione dati multi-fonte e commenti AI.

**Pattern:** ETL + LLM Generation

**Complessità:** ●●●○○ (3/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      FONTI DATI                             │
│   SQL Server   ERP   CRM   SharePoint   API Esterne         │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   INGESTION LAYER                           │
│   Azure Data Factory → Connettori → Staging Tables          │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 TRANSFORMATION LAYER                        │
│   Aggregazioni → KPI Calculation → Data Mart                │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  GENERATION LAYER                           │
│   Template Engine + Azure OpenAI (commenti, insight)        │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 DISTRIBUTION LAYER                          │
│            Email   │   SharePoint   │   Teams               │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure Data Factory | Orchestrazione ETL | Standard |
| Azure SQL Database | Data mart | S1 |
| Azure OpenAI | Generazione commenti | S0 |
| Azure Blob Storage | Template e output | LRS |
| Azure Logic Apps | Distribuzione | Consumption |
| Azure Monitor | Logging | Pay-as-you-go |

### 2.3 Integrazioni

| Sistema | Metodo | Note |
|---------|--------|------|
| SQL Server | ODBC/Linked Service | Read-only |
| SAP | RFC/OData | Modulo specifico |
| Salesforce | REST API | OAuth 2.0 |
| SharePoint | Graph API | Read/Write |
| SMTP | Connector | Per distribuzione |

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Estrazione dati da almeno 3 fonti | Must |
| RF-02 | Aggregazione configurabile (sum, avg, count) | Must |
| RF-03 | Generazione Word/Excel/PDF | Must |
| RF-04 | Commenti AI su trend | Should |
| RF-05 | Scheduling configurabile | Must |
| RF-06 | Distribuzione multi-canale | Must |
| RF-07 | Gestione errori con notifica | Must |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Tempo generazione | < 5 min |
| RNF-02 | Disponibilità | ≥99% |
| RNF-03 | Accuracy dati | 100% |
| RNF-04 | Report/giorno | 50 |
| RNF-05 | Retention output | 90 giorni |
| RNF-06 | Recovery | < 1h |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Infra | Tenant Azure, accesso rete a fonti |
| Dati | Credenziali read database, API key |
| Template | Report esistenti come riferimento |
| Governance | Approvazione distribuzione dati |
| Test | Destinatari pilota, validazione output |

---

## 4. Competenze

### 4.1 Certificazioni richieste

| Certificazione | Codice | Obbligatoria |
|----------------|--------|--------------|
| Azure Data Engineer | DP-203 | Sì |
| Azure AI Engineer | AI-102 | Raccomandata |
| Azure Developer | AZ-204 | Raccomandata |

### 4.2 Team

| Ruolo | Seniority | Effort |
|-------|-----------|--------|
| Data Engineer | Mid-Senior | 8 gg |
| AI Engineer | Mid | 4 gg |
| Backend Developer | Mid | 2 gg |
| DevOps | Mid | 1 gg |

**Minimo:** 2 persone (Data Eng + AI Eng)

### 4.3 Responsible AI

Prima del go-live verifica:
- [ ] Fairness: commenti non discriminatori
- [ ] Reliability: gestione dati mancanti
- [ ] Privacy: no PII nei report non autorizzati
- [ ] Transparency: fonte dati citata
- [ ] Accountability: audit trail generazione

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Connettori | 3 gg | Fonti connesse |
| Pipeline | 4 gg | ETL funzionante |
| Generation | 3 gg | Report generati |
| UAT + Go-Live | 3 gg | Produzione |

### 5.2 Deliverable per fase

**Setup:** subscription, resource group, Data Factory, SQL Database, storage account.

**Connettori:** linked services attivi, test connessione ok, credenziali in Key Vault.

**Pipeline:** dataset definiti, pipeline ETL, data mart popolato, scheduling configurato.

**Generation:** template report, prompt AI ottimizzato, Logic App distribuzione.

**UAT:** test con dati reali, validazione output, fix, documentazione.

### 5.3 Definition of Done

- [ ] Pipeline eseguita senza errori
- [ ] Report generato correttamente
- [ ] Dati validati vs fonte
- [ ] Commenti AI pertinenti
- [ ] Distribuzione funzionante
- [ ] Documentazione completa

---

## 6. Rischi

### 6.1 Tecnici

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Fonti non accessibili | Media | Alto | Verificare in setup |
| Qualità dati scarsa | Media | Medio | Data profiling fase 1 |
| Performance ETL | Bassa | Medio | Ottimizzare query |
| Commenti AI irrilevanti | Media | Basso | Iterare prompt |

### 6.2 Progetto

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Credenziali ritardate | Alta | Alto | Richiedere in pre-sales |
| Scope creep (nuovi report) | Alta | Medio | Change request rigoroso |
| Template non definiti | Media | Medio | Workshop kickoff |

### 6.3 Dipendenze critiche

| Dipendenza | Owner | Deadline |
|------------|-------|----------|
| Credenziali database | Cliente IT | Kickoff |
| Template report | Business | Kickoff +2gg |
| Lista destinatari | Business | Fine fase 3 |
| Validazione output | Business | Fine fase 4 |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Pipeline failure | 1 | 3 consecutivi |
| Tempo esecuzione | > 10 min | > 30 min |
| Data freshness | > 2h | > 6h |
| Delivery failure | 1 | 3 |

### 7.2 Escalation

| Livello | Trigger | Owner | Tempo |
|---------|---------|-------|-------|
| L1 | Pipeline fallita | Operations | 30 min |
| L2 | Non risolto L1 | Data Engineer | 2h |
| L3 | Non risolto L2 | Tech Lead | 4h |
| L4 | Report non distribuito | Management | Immediato |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Servizi Azure running
- [ ] Connessioni fonti attive
- [ ] Scheduling configurato
- [ ] Alerting attivo

**Pipeline**
- [ ] ETL testato con dati reali
- [ ] Data mart popolato
- [ ] Aggregazioni validate

**Generation**
- [ ] Template approvati
- [ ] Commenti AI verificati
- [ ] Output formattato correttamente

**Distribution**
- [ ] Email funzionante
- [ ] SharePoint upload ok
- [ ] Destinatari configurati

**Go/No-Go**

| Criterio | Status |
|----------|--------|
| Dati accurati 100% | ☐ |
| Report generato | ☐ |
| Distribuzione ok | ☐ |
| UAT firmato | ☐ |

---

*Nexa Data | Foundation | Specifiche Tecniche*
