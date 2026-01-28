---
ID: 1.1.1.1.1.5.5.5.17.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > HR > UC-17 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0517-0200 UC-17.Screening CV e Candidate Matching-Sch.Tec v.002
---

# UC-17. Screening CV e Candidate Matching — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure Document Intelligence + Azure OpenAI |

---

## Incluso

**Funzionalità**
- Parsing CV multi-formato (PDF, Word, immagine)
- Estrazione strutturata: competenze, esperienze, formazione
- Matching con requisiti posizione
- Score di fit con motivazione
- Shortlist ordinata
- Export per ATS

**Integrazioni standard**
- Upload batch file
- API REST per ATS
- Export CSV/Excel

**Deliverable**
- Sistema in produzione
- 1 template posizione configurato
- Dashboard recruiting
- Documentazione
- Formazione recruiter (2 ore)

---

## Escluso

- Integrazione nativa ATS (disponibile come CR)
- Screening video interview
- Assessment tecnici automatici
- Background check
- Lingue diverse da IT/EN

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure | Cliente | Prima del kickoff |
| Template job description | HR | Kickoff |
| 50 CV esempio (vari livelli fit) | HR | Giorno 2 |
| Criteri valutazione documentati | HR | Giorno 3 |
| Recruiter per validazione | HR | Giorno 10 |

---

## Timeline

```
[Setup 2gg]─[Config 4gg]─[Tuning 5gg]─[Test 2gg]─[Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 6: parsing + matching configurato
- Giorno 11: tuning su CV reali
- Giorno 13: UAT con recruiter
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Accuracy matching | ≥85% | Confronto con valutazione HR |
| Parsing completeness | ≥95% | Campi estratti correttamente |
| Latenza | < 10 sec/CV | P95 |
| Throughput | 100 CV/ora | Batch test |

---

## FAQ

**Rispetta il GDPR?**
Sì. I CV vengono processati e non conservati oltre il necessario. Audit trail per consent.

**Funziona con CV non standard?**
Sì, entro limiti ragionevoli. CV troppo creativi o immagine-only possono avere accuracy ridotta.

**Posso personalizzare i criteri?**
Sì, i criteri di matching sono configurabili per ogni posizione.

**Sostituisce il recruiter?**
No. Fa lo screening iniziale. Il recruiter valuta la shortlist e conduce i colloqui.

---

*Nexa Data | Foundation | Scheda Tecnica*
