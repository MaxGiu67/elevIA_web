---
ID: 1.1.1.1.1.5.5.1.2.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Knowledge > UC-02 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0102-0200 UC-02.Estrazione Dati da Doc. Non Strutturati-Sch.Tec v.002
---

# UC-02. Estrazione Dati — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure Document Intelligence + Azure OpenAI |

---

## Incluso

**Funzionalità**
- Estrazione dati da 1 tipologia documentale (es. fatture)
- Mappatura campi verso sistema target
- Interfaccia di validazione per casi dubbi
- Confidence score per ogni campo estratto
- Export verso gestionale (API o file)

**Formati supportati**
- PDF (nativi e scansionati)
- Immagini (JPG, PNG, TIFF)
- Word, Excel

**Deliverable**
- Sistema in produzione
- API per integrazione
- Dashboard accuracy/volumi
- Documentazione
- Formazione operatori (2 ore)

---

## Escluso

- Tipologie documentali aggiuntive (ogni tipologia = CR)
- OCR per documenti manoscritti
- Integrazione con gestionali custom senza API
- Elaborazione batch massiva (> 1000 doc/giorno)
- Training modelli custom

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure attivo | Cliente | Prima del kickoff |
| 20-30 documenti esempio per tipo | Cliente Business | Kickoff |
| Mappatura campi (cosa estrarre) | Cliente Business | Giorno 2 |
| Accesso API gestionale | Cliente IT | Giorno 5 |
| Operatore per validazione test | Cliente | Giorno 10 |

---

## Timeline

```
[Setup 2gg]─[Configurazione 4gg]─[Integrazione 5gg]─[Test 2gg]─[Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto, modello configurato
- Giorno 6: estrazione funzionante su documenti esempio
- Giorno 11: integrazione gestionale completata
- Giorno 13: UAT con operatori
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Accuracy campi | ≥85% | Test su 50 documenti |
| Latenza | < 5 sec/doc | P95 |
| Copertura campi | 100% | Tutti i campi mappati |
| Integrazione | Ok | Dati nel gestionale |

---

## FAQ

**Serve modificare il gestionale?**
No, se ha API. Altrimenti usiamo export file (CSV, XML).

**Che succede se il sistema non è sicuro?**
Il documento va in coda di validazione manuale.

**Posso aggiungere altri tipi di documenti dopo?**
Sì, con Change Request per ogni tipologia.

---

*Nexa Data | Foundation | Scheda Tecnica*
