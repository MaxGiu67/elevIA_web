---
ID: 1.1.1.1.1.5.5.1.4.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Knowledge > UC-04 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0104-0200 UC-04.Due Diligence Documentale-Sch.Tec v.002
---

# UC-04. Due Diligence — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure Document Intelligence + Azure OpenAI |

---

## Incluso

**Funzionalità**
- Analisi automatica documenti (PDF, Word, Excel)
- Estrazione clausole per categoria configurabile
- Identificazione rischi e red flag
- Cross-reference tra documenti
- Report strutturato per area
- Export in formato standard

**Template clausole standard**
- Change of control
- Penali e indennizzi
- Garanzie e scadenze
- Obblighi di riservatezza
- Proprietà intellettuale

**Deliverable**
- Sistema configurato
- Template analisi personalizzato
- Report template
- Documentazione
- Formazione analisti (4 ore)

---

## Escluso

- Analisi documenti in lingue diverse da IT/EN
- Pareri legali (il sistema evidenzia, non interpreta)
- Integrazione data room proprietarie
- OCR per documenti manoscritti
- Analisi finanziaria avanzata

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure | Cliente | Prima del kickoff |
| Accesso data room | Cliente | Kickoff |
| Lista clausole/rischi target | Cliente + Legal | Giorno 2 |
| Documenti esempio (50-100) | Cliente | Giorno 3 |
| Analista per validazione | Cliente | Giorno 10 |

---

## Timeline

```
[Setup 2gg]─[Config Template 4gg]─[Tuning 5gg]─[Test 2gg]─[Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 6: template clausole configurato
- Giorno 11: tuning su documenti reali
- Giorno 13: validazione con analista
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Recall clausole critiche | ≥90% | Test su 100 doc noti |
| Precision | ≥85% | False positive < 15% |
| Throughput | 1000 doc/ora | Batch test |
| Copertura | 100% | Tutti i doc processati |

---

## FAQ

**Sostituisce l'analista legale?**
No. Accelera il lavoro. L'analista valida e interpreta.

**Posso personalizzare le clausole da cercare?**
Sì, in fase di configurazione definiamo insieme il template.

**Funziona con data room esterne?**
Serve export dei documenti. Integrazione diretta è CR.

**Come gestisce documenti molto lunghi?**
Li suddivide internamente, poi consolida i risultati.

---

*Nexa Data | Foundation | Scheda Tecnica*
