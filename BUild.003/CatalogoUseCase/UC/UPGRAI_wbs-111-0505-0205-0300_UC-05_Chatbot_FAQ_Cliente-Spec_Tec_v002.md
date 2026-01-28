---
ID: 1.1.1.1.1.5.5.2.5.3
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Customer Experience > UC-05 > Spec.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0205-0300 UC-05.Chatbot FAQ Cliente-Spec.Tec v.002
---

# UC-05. Chatbot FAQ Cliente — Specifiche Tecniche

## 1. Overview

**Use Case:** chatbot conversazionale per rispondere alle FAQ dei clienti con escalation a operatore.

**Pattern:** RAG + Bot Framework

**Complessità:** ●●●○○ (3/5)

**Effort:** 15 gg/persona

---

## 2. Architettura

### 2.1 Schema

```
┌─────────────────────────────────────────────────────────────┐
│                      CANALI                                 │
│     Web Widget    WhatsApp    Teams    (altri)              │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   BOT LAYER                                 │
│   Azure Bot Service → Dialog Management → State             │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   RAG LAYER                                 │
│   Retrieval (AI Search) → Generation (GPT-4o)               │
└──────────────────────┬──────────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 KNOWLEDGE BASE                              │
│            FAQ │ Manuali │ Policy │ Docs                    │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Servizi Azure

| Servizio | Funzione | Tier |
|----------|----------|------|
| Azure Bot Service | Orchestrazione conversazione | S1 |
| Azure OpenAI | Embedding + Generation | S0 |
| Azure AI Search | Vector store FAQ | S1 |
| Azure Blob Storage | Document storage | LRS |
| Azure App Service | Backend | S1 |
| Application Insights | Logging + Analytics | Pay-as-you-go |

### 2.3 Integrazioni

| Sistema | Metodo | Note |
|---------|--------|------|
| Web | iframe / JS SDK | Widget responsive |
| WhatsApp | Twilio API | Business account richiesto |
| Teams | Bot Framework connector | Opzionale |
| CRM | Webhook escalation | Contesto passato |

---

## 3. Requisiti

### 3.1 Funzionali

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Risposta in linguaggio naturale IT/EN | Must |
| RF-02 | Citazione fonte (se configurato) | Should |
| RF-03 | Escalation a operatore | Must |
| RF-04 | Passaggio contesto all'operatore | Must |
| RF-05 | Gestione multi-turno | Must |
| RF-06 | Risposta "non so" graceful | Must |
| RF-07 | Analytics conversazioni | Must |
| RF-08 | Quick replies suggerite | Should |

### 3.2 Non Funzionali

| ID | Requisito | Target |
|----|-----------|--------|
| RNF-01 | Latenza risposta | < 3s P95 |
| RNF-02 | Disponibilità | ≥99% |
| RNF-03 | Accuracy | ≥85% |
| RNF-04 | Concurrent conversations | 100 |
| RNF-05 | Retention conversazioni | 90 giorni |
| RNF-06 | GDPR compliance | Full |

### 3.3 Prerequisiti Cliente

| Categoria | Requisito |
|-----------|-----------|
| Infra | Tenant Azure, quota OpenAI approvata |
| Dati | FAQ documentate, manuali, policy |
| Canali | Sito web per widget, WhatsApp Business (opz) |
| Governance | Approvazione privacy, disclosure AI |
| Test | 20 conversazioni realistiche per UAT |

---

## 4. Competenze

### 4.1 Certificazioni richieste

| Certificazione | Codice | Obbligatoria |
|----------------|--------|--------------|
| Azure AI Engineer | AI-102 | Sì |
| Azure Developer | AZ-204 | Sì |
| Bot Framework | — | Esperienza pratica |

### 4.2 Team

| Ruolo | Seniority | Effort |
|-------|-----------|--------|
| Solution Architect | Senior | 1 gg |
| AI Engineer | Mid-Senior | 7 gg |
| Backend Developer | Mid | 4 gg |
| Frontend Developer | Mid | 2 gg |
| DevOps | Mid | 1 gg |

**Minimo:** 2 persone (AI Eng + Backend con competenze frontend)

### 4.3 Responsible AI

Prima del go-live verifica:
- [ ] Fairness: risposte uniformi indipendentemente da formulazione
- [ ] Reliability: gestione errori graceful, fallback
- [ ] Privacy: no dati personali nei log, anonimizzazione
- [ ] Transparency: disclosure "sono un assistente virtuale"
- [ ] Accountability: audit trail, owner identificato

---

## 5. Delivery

### 5.1 Fasi

| Fase | Durata | Gate |
|------|--------|------|
| Setup | 2 gg | Ambiente pronto |
| Knowledge Base | 3 gg | FAQ indicizzate |
| Bot Development | 5 gg | Bot funzionante |
| Integration | 3 gg | Canali attivi |
| UAT + Go-Live | 2 gg | Produzione |

### 5.2 Deliverable per fase

**Setup:** subscription, resource group, Azure Bot registration, App Service, accessi verificati.

**Knowledge Base:** documenti caricati, chunking, embedding, index popolato, retrieval testato.

**Bot Development:** dialog flows, RAG integration, escalation logic, error handling, quick replies.

**Integration:** web widget configurato, WhatsApp connector (se previsto), webhook escalation.

**UAT:** test con utenti reali, bug fix, documentazione, formazione admin.

### 5.3 Definition of Done

- [ ] Codice in main, code review ok
- [ ] Test automatici passano
- [ ] Deploy completato
- [ ] Widget funzionante su staging
- [ ] Escalation verificata end-to-end
- [ ] Documentazione aggiornata
- [ ] Zero bug P1/P2

---

## 6. Rischi

### 6.1 Tecnici

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Quota OpenAI insufficiente | Media | Alto | Verificare in setup, rate limiting |
| FAQ incomplete | Alta | Medio | Assessment contenuti in fase 1 |
| Latenza con picchi traffico | Media | Medio | Autoscaling, caching |
| Accuracy sotto target | Media | Alto | Iterare prompt, ampliare KB |

### 6.2 Progetto

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Widget non installabile | Media | Alto | Verificare accesso sito in pre-sales |
| WhatsApp approval ritardo | Media | Medio | Avviare processo subito |
| Escalation non testabile | Bassa | Medio | Mock operatore in staging |
| Aspettative disallineate | Alta | Alto | Demo frequenti, acceptance criteria chiari |

### 6.3 Dipendenze critiche

| Dipendenza | Owner | Deadline |
|------------|-------|----------|
| Quota Azure OpenAI | Cliente | Kickoff -5gg |
| FAQ e documentazione | Business | Kickoff |
| Accesso sito per widget | IT | Giorno 5 |
| WhatsApp Business | Marketing | Giorno 5 |
| Utenti test | Business | Giorno 10 |

---

## 7. Operations

### 7.1 Monitoring

| Metrica | Warning | Critical |
|---------|---------|----------|
| Latenza P95 | > 2.5s | > 5s |
| Error rate | > 2% | > 5% |
| Uptime | < 99.5% | < 99% |
| Escalation rate | > 40% | > 50% |
| CSAT (se tracciato) | < 3.5 | < 3.0 |

### 7.2 Escalation

| Livello | Trigger | Owner | Tempo |
|---------|---------|-------|-------|
| L1 | Anomalia metriche | Operations | 30 min |
| L2 | Non risolto L1 | Tech Lead | 2h |
| L3 | Non risolto L2 | Architect | 4h |
| L4 | Impatto business | Management | Immediato |

---

## 8. Checklist Go-Live

**Infrastruttura**
- [ ] Servizi Azure running
- [ ] Autoscaling configurato
- [ ] SSL/TLS su tutti gli endpoint
- [ ] Rate limiting attivo

**Applicazione**
- [ ] Bot risponde correttamente
- [ ] Widget caricato su sito
- [ ] WhatsApp attivo (se previsto)
- [ ] Escalation funzionante

**Sicurezza**
- [ ] Nessun dato sensibile nei log
- [ ] GDPR compliance verificata
- [ ] Disclosure AI visibile

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
