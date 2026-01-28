---
ID: UPGRAI.wbs-111-0100
WBS.Path: C2P > UPGRAI.Foundation > KERNEL > Asset.Governance
WBS.Deliverable: UPGRAI.wbs-111-0100 Governance v.003
Document.Type: Doc
Channel: C2P
Pages: 5-6
Date: 2026-01-25
Version: 003
Source: WBS v.133
---

# Governance UPGRAI

## Introduzione

La governance UPGRAI è l'insieme di principi, regole e strumenti che garantiscono coerenza, qualità e tracciabilità nell'intero ecosistema. Non è burocrazia: è l'infrastruttura invisibile che permette a oltre 350 deliverable di funzionare come un sistema unico.

Questo documento è il punto di partenza per comprendere, utilizzare o contribuire a UPGRAI. Definisce cosa comanda, chi decide, come si numera e perché.

## 1. Il Principio Fondamentale: La WBS Comanda

### 1.1 WBS Excel come Fonte Unica di riferimento UPGRAI

La Work Breakdown Structure in formato Excel è il MASTER ASSOLUTO del progetto UPGRAI. Ogni deliverable, ogni codice, ogni numero, ogni relazione gerarchica deriva dalla WBS. Non esistono eccezioni.

Quando un documento riporta un dato che differisce dalla WBS, il dato è errato per definizione. Quando due fonti dicono cose diverse, la WBS ha ragione. Sempre.

**Implicazione pratica:** Prima di citare qualsiasi numero o struttura UPGRAI, verificare sulla WBS corrente. I documenti derivati (presentazioni, schede, specifiche) sono subordinati alla WBS.

### 1.2 Struttura del File WBS Excel

Il file WBS Excel v.133 contiene:

| Foglio | Contenuto | Uso |
|--------|-----------|-----|
| WBS | 399 elementi con tutti i metadati | Fonte dati principale |
| VolumiDeliverable | Soglie ufficiali per comunicazione | Numeri da usare nei materiali |
| Deliverable | Vista aggregata per tipo | Analisi e pianificazione |
| RACI.Deliverable | Matrice responsabilità | Chi fa cosa |
| Setup | Configurazioni | Parametri di sistema |

### 1.3 I Numeri che Contano (da WBS v.133)

| Metrica | Valore Attuale | Soglia Ufficiale |
|---------|----------------|------------------|
| **Elementi WBS totali** | 399 | - |
| **Deliverable totali** | 355 | 350+ |
| **C2P** | 304 | 300+ |
| **P2C** | 51 | 50+ |
| **UPGRAI.Foundation** | 251 | 250+ |
| **UPGRAI.Voice** | 20 | 20+ |
| **UPGRAI.Practice** | 19 | - |
| **UPGRAI.PAS** | 14 | - |
| **UPGRAI.Go** | 51 | 50+ |

## 2. Architettura a Due Piramidi

UPGRAI opera attraverso due canali complementari, ciascuno con la propria piramide documentale.

### 2.1 La Doppia Piramide

```
       PIRAMIDE C2P                           PIRAMIDE P2C
    (Nexa Data → Partner)                  (Partner → Cliente)
    
         ▲ PRS/FCS                              ▲ PRS/FCS
        ╱ ╲                                    ╱ ╲
       ╱   ╲                                  ╱   ╲
      ╱─────╲                                ╱─────╲
     ╱  DOC  ╲                              ╱  DOC  ╲
    ╱─────────╲                            ╱─────────╲
   ╱  SCHEDE   ╲                          ╱  SCHEDE   ╲
  ╱─────────────╲                        ╱─────────────╲
 ╱   SPEC.TEC    ╲                      ╱   SPEC.TEC    ╲
╱═════════════════╲                    ╱═════════════════╲
     WBS EXCEL                              WBS EXCEL
```

**Principio chiave:** Le presentazioni (PRS) e i Focus (FCS) stanno in cima alla piramide. Derivano dai documenti sottostanti. Se la base non è solida, la presentazione non regge.

### 2.2 Canale C2P: Nexa Data to Partner

Il canale C2P contiene tutto ciò che serve per trasformare un'azienda IT in Partner AI. **304 deliverable** organizzati in:

| Servizio | Deliverable | Scopo |
|----------|-------------|-------|
| UPGRAI.Foundation | 251 | Metodologia completa, Use Case, strumenti |
| UPGRAI.Voice | 20 | Ghostwriting LinkedIn |
| UPGRAI.Practice | 19 | Certificazioni Microsoft |
| UPGRAI.PAS | 14 | Programma assunzione AI Specialist |

**Metodologia C2P:** Setup (2 settimane) → Enable (2 mesi) → Grow (continuo)

### 2.3 Canale P2C: Partner to Client

Il canale P2C contiene tutto ciò che serve al Partner per vendere e consegnare progetti AI. **51 deliverable** concentrati nel servizio UPGRAI.Go:

| Sistema | Deliverable | Scopo |
|---------|-------------|-------|
| KERNEL | 10 | Contenuti da vendere |
| SALES | 18 | Come vendere |
| DELIVERY | 23 | Come consegnare |

**Metodologia P2C:** Assess (2 settimane) → Build (2 mesi) → Scale (3,5 mesi)

## 3. I Tre Sistemi Funzionali

Ogni canale si articola in tre sistemi che rispondono a domande diverse.

### 3.1 KERNEL: Cosa Vendere

183 deliverable totali (173 C2P + 10 P2C) che definiscono il contenuto dell'offerta:
- 20 Use Case standardizzati
- Schede Cliente (benefici, ROI)
- Schede Tecniche (architettura, requisiti)
- Specifiche di Implementazione

### 3.2 SALES: Come Vendere

119 deliverable totali (101 C2P + 18 P2C) che definiscono il motore commerciale:
- Processi Lead Generation
- Processi Lead Conversion
- Presentazioni e Focus
- Template offerta

### 3.3 DELIVERY: Come Consegnare

53 deliverable totali (30 C2P + 23 P2C) che definiscono la macchina operativa:
- Guide fase per fase
- Checklist di completamento
- Verbali e template
- Procedure di handover

## 4. Gerarchia a 9 Livelli

La WBS utilizza una struttura gerarchica profonda per garantire granularità e navigabilità.

### 4.1 I Livelli

| Livello | Nome | Esempio | Descrizione |
|---------|------|---------|-------------|
| L1 | Canale | C2P, P2C | Direzione del flusso |
| L2 | Servizio | UPGRAI.Foundation | Pacchetto di appartenenza |
| L3 | Sistema | KERNEL | Area funzionale |
| L4 | Categoria | Asset.Governance | Raggruppamento tematico |
| L5 | Modulo | WBS | Componente |
| L6 | Sezione | WBS Descr. | Sotto-componente |
| L7 | Item | - | Elemento |
| L8 | Sub1 | - | Dettaglio 1 |
| L9 | Sub2 | - | Dettaglio 2 |

### 4.2 Codifica WBS

Il codice WBS riflette la posizione gerarchica:

```
UPGRAI.wbs-111-0100
         │││ ││││
         │││ └┴┴┴── L4.Categoria: 0100 = Asset.Governance
         ││└─────── L3.Sistema: 1 = KERNEL
         │└──────── L2.Servizio: 1 = Foundation
         └───────── L1.Canale: 1 = C2P
```

I codici figli aggiungono segmenti: `111-0101` per WBS, `111-0101-0100` per WBS Descr.

## 5. Tipi di Deliverable

La WBS classifica gli elementi per tipo, determinando struttura e template.

### 5.1 Classificazione WBS.Tipo

| Tipo | Significato | Quantità |
|------|-------------|----------|
| CTN | Contenitore (solo struttura) | 44 |
| DLV | Deliverable (produce output) | 277 |
| CTN+DLV | Contenitore che produce anche output | 78 |

### 5.2 Classificazione TipoDoc (per i Deliverable)

| TipoDoc | Descrizione | Quantità |
|---------|-------------|----------|
| Doc | Documento descrittivo | 153 |
| Prs | Presentazione (10 slide) | 31 |
| Fcs | Focus (4 slide) | 23 |
| Prc | Processo | 28 |
| Art | Artefatto | 23 |
| Spec.Tec | Specifica Tecnica | 20 |
| Sch.Tec | Scheda Tecnica | 20 |
| Sch.Cli | Scheda Cliente | 20 |
| Sch.Prb | Scheda Problema | 10 |
| Sch.Mtd | Scheda Metodologia | 6 |
| Sch.Srv | Scheda Servizio | 5 |
| Altri | LP, LM, Scr, Sqn, Email | 16 |

## 6. Regole di Comunicazione

### 6.1 Soglie Conservative

UPGRAI non comunica mai numeri esatti nei materiali commerciali. Utilizza sempre soglie conservative con pattern "oltre X" o "X+".

| Contesto | Formula |
|----------|---------|
| Pitch C2P | "oltre 300 deliverable" |
| Workshop C2P | "oltre 300 deliverable" + dettaglio sistemi |
| Pitch P2C | "oltre 50 deliverable" |
| Contratto | MAI numeri – solo riferimento a catalogo |

### 6.2 Frasi Vietate vs Corrette

| ❌ Non Dire | ✓ Dire Invece |
|-------------|---------------|
| "355 deliverable" | "oltre 350 deliverable" |
| "304 C2P" | "oltre 300 deliverable C2P" |
| "esattamente 20 Use Case" | "20 Use Case" (numero fisso OK) |

## 7. Ruoli e Responsabilità

### 7.1 Nexa Data

- Mantiene la WBS Excel come fonte unica di verità
- Produce e versiona i deliverable
- Aggiorna le soglie ufficiali
- Autorizza modifiche strutturali

### 7.2 Partner

- Utilizza i deliverable secondo le regole stabilite
- Segnala incongruenze riscontrate
- Propone miglioramenti (senza modificare direttamente)
- Non modifica struttura né contenuti metodologici

### 7.3 Regola d'Oro

**In caso di dubbio, la WBS decide.**

Ogni deviazione dalla governance richiede autorizzazione esplicita di Nexa Data.

## 8. Problemi Noti nella WBS v.133

L'analisi MECE ha identificato:

| Problema | Dettaglio | Impatto |
|----------|-----------|---------|
| ID duplicato | UPGRAI.wbs-113-0202 (2 occorrenze) | Da correggere |
| Parent mancante | UPGRAI.wbs-112-0402 non esiste | 4 elementi orfani |
| Elementi senza L3 | 7 elementi (sono i nodi Canale e Servizio) | Normale |

## Documenti Collegati

| Documento | WBS ID | Contenuto |
|-----------|--------|-----------|
| WBS | 111-0101 | Struttura completa della WBS |
| WBS C2P Partner | 111-0101-0200 | Dettaglio canale C2P |
| WBS P2C Cliente | 111-0101-0300 | Dettaglio canale P2C |
| Volumi Deliverable | 111-0101-0400 | Soglie ufficiali |

---

*Nexa Data | UPGRAI.Foundation | KERNEL > Asset.Governance*
