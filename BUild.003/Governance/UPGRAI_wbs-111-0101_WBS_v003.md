---
ID: UPGRAI.wbs-111-0101
WBS.Path: C2P > UPGRAI.Foundation > KERNEL > Asset.Governance > WBS
WBS.Deliverable: UPGRAI.wbs-111-0101 WBS v.003
Document.Type: Doc
Channel: C2P
Pages: 5-6
Date: 2026-01-25
Version: 003
Source: WBS v.133
---

# WBS UPGRAI

## Introduzione

La Work Breakdown Structure è la spina dorsale dell'intero progetto UPGRAI. È il sistema di coordinate che permette di localizzare, comprendere e utilizzare qualsiasi elemento dell'ecosistema. Con 399 elementi e 355 deliverable organizzati in 9 livelli gerarchici, la WBS garantisce tracciabilità completa e navigazione intuitiva.

La WBS non è un semplice elenco: è la bussola del progetto. Ogni decisione su cosa produrre, come organizzarlo e dove posizionarlo passa dalla WBS.

## 1. Snapshot WBS v.133

### 1.1 Numeri Chiave

| Metrica | Valore |
|---------|--------|
| Elementi totali | 399 |
| Deliverable (DLV + CTN+DLV) | 355 |
| Contenitori puri (CTN) | 44 |
| Livelli gerarchici | 9 |
| Canali | 2 (C2P, P2C) |
| Servizi | 5 |
| Sistemi | 3 |

### 1.2 Distribuzione per Canale

| Canale | Elementi | Deliverable | % |
|--------|----------|-------------|---|
| C2P | 333 | 304 | 86% |
| P2C | 66 | 51 | 14% |
| **Totale** | **399** | **355** | **100%** |

### 1.3 Distribuzione per Servizio

| Canale | Servizio | Elementi | Deliverable |
|--------|----------|----------|-------------|
| C2P | UPGRAI.Foundation | 262 | 251 |
| C2P | UPGRAI.Voice | 25 | 20 |
| C2P | UPGRAI.Practice | 24 | 19 |
| C2P | UPGRAI.PAS | 21 | 14 |
| P2C | UPGRAI.Go | 65 | 51 |

### 1.4 Distribuzione per Sistema

| Sistema | Elementi | Deliverable | Funzione |
|---------|----------|-------------|----------|
| KERNEL | 192 | 183 | Cosa vendere |
| SALES | 133 | 119 | Come vendere |
| DELIVERY | 67 | 53 | Come consegnare |

### 1.5 Matrice Canale × Sistema (solo Deliverable)

|  | KERNEL | SALES | DELIVERY | Totale |
|--|--------|-------|----------|--------|
| **C2P** | 173 | 101 | 30 | 304 |
| **P2C** | 10 | 18 | 23 | 51 |
| **Totale** | 183 | 119 | 53 | 355 |

## 2. Architettura Gerarchica

### 2.1 I 9 Livelli

La WBS utilizza una gerarchia a 9 livelli. I primi 3 definiscono il contesto macro, i successivi 6 il dettaglio operativo.

| Livello | Nome | Colonna Excel | Valori Possibili |
|---------|------|---------------|------------------|
| L1 | Canale | L1.Canale | C2P, P2C |
| L2 | Servizio | L2.Servizio | Foundation, Voice, Practice, PAS, Go |
| L3 | Sistema | L3.Sistema | KERNEL, SALES, DELIVERY |
| L4 | Categoria | L4.Categoria | Asset.Governance, Servizi, Metodologia, ... |
| L5 | Modulo | L5.Modulo | WBS, Piano, Use Case, ... |
| L6 | Sezione | L6.Sezione | Dettagli specifici |
| L7 | Item | L7.Item | Elementi |
| L8 | Sub1 | L8.Sub1 | Sotto-dettagli |
| L9 | Sub2 | L9.Sub2 | Sotto-sotto-dettagli |

### 2.2 Pattern di Codifica

Il codice WBS è una stringa che riflette la posizione gerarchica:

**Pattern:** `UPGRAI.wbs-[L1][L2][L3]-[L4L5]-[L6L7]-[L8L9]`

**Esempi:**

| Codice | Lettura | Elemento |
|--------|---------|----------|
| UPGRAI.wbs-1 | C2P | Canale C2P (root) |
| UPGRAI.wbs-11 | C2P > Foundation | Servizio Foundation |
| UPGRAI.wbs-111 | C2P > Foundation > KERNEL | Sistema KERNEL |
| UPGRAI.wbs-111-0100 | ... > Asset.Governance | Categoria Governance |
| UPGRAI.wbs-111-0101 | ... > WBS | Modulo WBS |
| UPGRAI.wbs-111-0101-0100 | ... > Descrizione WBS | Sezione |

### 2.3 Naming Convention per File

I file seguono il pattern:

```
UPGRAI_wbs-[codice]_[Nome]_v[versione].[ext]
```

**Esempi:**
- `UPGRAI_wbs-111-0100_Governance_v003.md`
- `UPGRAI_wbs-111-0301-0100_Servizio_UPGRAI_Foundation_v002.md`
- `UPGRAI_wbs-112-0501_Prs_UPGRAI_r_v001.md`

## 3. Tipi di Elemento

### 3.1 WBS.Tipo

Ogni elemento è classificato per tipo:

| WBS.Tipo | Descrizione | Quantità | Caratteristica |
|----------|-------------|----------|----------------|
| CTN | Contenitore | 44 | Solo struttura, nessun output |
| DLV | Deliverable | 277 | Produce un output concreto |
| CTN+DLV | Ibrido | 78 | Contenitore che produce anche output |

### 3.2 TipoDoc (per Deliverable)

| TipoDoc | Descrizione | Quantità | Template |
|---------|-------------|----------|----------|
| Doc | Documento | 153 | prm_CREA_DOC |
| Prs | Presentazione 10 slide | 31 | prm_CREA_PRS_TXT |
| Fcs | Focus 4 slide | 23 | prm_CREA_FCS_TXT |
| Prc | Processo | 28 | prm_CREA_PRC |
| Art | Artefatto | 23 | - |
| Spec.Tec | Specifica Tecnica | 20 | prm_CREA_SPEC |
| Sch.Tec | Scheda Tecnica | 20 | prm_CREA_SCH |
| Sch.Cli | Scheda Cliente | 20 | prm_CREA_SCH |
| Sch.Prb | Scheda Problema | 10 | prm_CREA_SCH |
| Sch.Mtd | Scheda Metodologia | 6 | prm_CREA_SCH |
| Sch.Srv | Scheda Servizio | 5 | prm_CREA_SCH |

## 4. Navigazione nella WBS

### 4.1 Come Trovare un Elemento

1. **Identifica il Canale:** Stai cercando qualcosa per abilitare il Partner (C2P) o per vendere al Cliente (P2C)?

2. **Identifica il Servizio:** Foundation (metodologia), Voice (LinkedIn), Practice (certificazioni), PAS (formazione), Go (delivery)?

3. **Identifica il Sistema:** KERNEL (contenuti), SALES (commerciale), DELIVERY (operativo)?

4. **Scendi nei livelli:** Usa i filtri Excel o il campo WBS.Desc per il breadcrumb completo.

### 4.2 Campo WBS.Desc

Il campo WBS.Desc fornisce il percorso leggibile:

```
C2P > UPGRAI.Foundation > KERNEL > Asset.Governance > WBS > WBS Descr.
```

### 4.3 Ricerca nel File Excel

| Per Trovare | Usa |
|-------------|-----|
| Elemento specifico | Filtro su colonna ID |
| Tutti i deliverable | Filtro WBS.Tipo = DLV o CTN+DLV |
| Per servizio | Filtro su L2.Servizio |
| Per sistema | Filtro su L3.Sistema |
| Per tipo documento | Filtro su TipoDoc |

## 5. Colonne della WBS Excel

### 5.1 Colonne Principali

| Colonna | Descrizione | Uso |
|---------|-------------|-----|
| ID | Codice WBS univoco | Identificazione |
| WBS.Deliverable | Nome completo con versione | Display |
| WBS.Tipo | CTN, DLV, CTN+DLV | Classificazione |
| TipoDoc | Tipo di documento | Template da usare |
| WBS.Name | Nome breve | Navigazione |
| WBS.Desc | Breadcrumb completo | Contesto |

### 5.2 Colonne Gerarchiche

| Colonna | Contenuto |
|---------|-----------|
| #Canale, L1.Canale | Numero e nome del canale |
| #Servizio, L2.Servizio | Numero e nome del servizio |
| #Sistema, L3.Sistema | Numero e nome del sistema |
| #Categoria → #Sub2 | Livelli 4-9 |

### 5.3 Colonne di Stato

| Colonna | Valori | Uso |
|---------|--------|-----|
| Priorità | Alta, Media, Bassa | Pianificazione |
| SAL | In corso, Iniziato, Backlog, N/D | Stato avanzamento |
| HaFigli | True/False | Struttura |
| HaOutput | True/False | Produce deliverable |

## 6. Manutenzione e Versionamento

### 6.1 Regole di Modifica

1. Solo Nexa Data modifica la struttura WBS
2. I Partner propongono, non applicano
3. Ogni modifica richiede verifica di impatto
4. Le versioni obsolete si archiviano, mai cancellate

### 6.2 Versionamento

| Elemento | Pattern | Esempio |
|----------|---------|---------|
| File WBS Excel | WBS_v_XXX.xlsx | WBS_v_133.xlsx |
| Documenti | v.XXX | v.003 |
| Incremento | +1 ad ogni modifica sostanziale | v.002 → v.003 |

### 6.3 Sincronizzazione

Quando la WBS si aggiorna:
1. Verificare tutti i documenti che citano numeri
2. Aggiornare le soglie se necessario
3. Rigenerare presentazioni impattate
4. Comunicare ai team

## 7. Problemi e Qualità (v.133)

### 7.1 Verifica MECE Superata

✅ **Mutua Esclusività:** 100% ok
✅ **Completezza:** 100% elementi hanno ID, Tipo, Canale, Nome
✅ **Pattern Codici:** 399/399 conformi al pattern atteso

### 7.2 Issue Aperte

| Issue | Dettaglio | Azione |
|-------|-----------|--------|
| ID duplicato | UPGRAI.wbs-113-0202 appare 2 volte | Correggere in WBS |
| Parent mancante | UPGRAI.wbs-112-0402 non esiste | 4 figli orfani |

## Documenti Collegati

| Documento | WBS ID | Focus |
|-----------|--------|-------|
| Governance | 111-0100 | Principi e regole |
| WBS C2P Partner | 111-0101-0200 | Dettaglio canale C2P |
| WBS P2C Cliente | 111-0101-0300 | Dettaglio canale P2C |
| Volumi Deliverable | 111-0101-0400 | Soglie ufficiali |

---

*Nexa Data | UPGRAI.Foundation | KERNEL > Asset.Governance > WBS*
