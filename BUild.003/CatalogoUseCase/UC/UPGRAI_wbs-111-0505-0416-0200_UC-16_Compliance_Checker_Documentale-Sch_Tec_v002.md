---
ID: 1.1.1.1.1.5.5.4.16.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Workflow > UC-16 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0416-0200 UC-16.Compliance Checker Documentale-Sch.Tec v.002
---

# UC-16. Compliance Checker Documentale — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure OpenAI + Azure AI Search |

---

## Incluso

**Funzionalità**
- Analisi documento vs regole configurate
- Detection non-conformità con severity
- Riferimento alla regola violata
- Suggerimento correzione
- Report compliance strutturato
- Audit trail verifiche

**Ambiti compliance standard**
- Policy interne documentate
- GDPR (clausole standard)
- Requisiti contrattuali
- Standard di settore configurati

**Deliverable**
- Sistema in produzione
- 1 ambito compliance configurato
- Dashboard verifiche
- Documentazione
- Formazione (2 ore)

---

## Escluso

- Ambiti compliance aggiuntivi (ogni ambito = CR)
- Pareri legali (il sistema rileva, non interpreta)
- Firma digitale
- Workflow approvativo integrato
- Verifica documenti in lingue diverse da IT/EN

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure | Cliente | Prima del kickoff |
| Policy/regole documentate | Legal/Compliance | Kickoff |
| Template documenti approvati | Legal | Giorno 2 |
| 10-20 documenti esempio | Legal | Giorno 3 |
| Reviewer per validazione | Legal/Compliance | Giorno 10 |

---

## Timeline

```
[Setup 2gg]─[Rules Config 4gg]─[Tuning 5gg]─[Test 2gg]─[Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 6: regole configurate, prompt ottimizzato
- Giorno 11: tuning su documenti reali
- Giorno 13: UAT con legal/compliance
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Detection rate | ≥90% | Test su doc con issue note |
| False positive rate | <15% | Review manuale |
| Latenza | < 30 sec | Per documento medio |
| Copertura regole | 100% | Tutte le regole mappate |

---

## FAQ

**Sostituisce il parere legale?**
No. Evidenzia potenziali problemi. Il legale valuta e decide.

**Posso aggiungere nuove regole nel tempo?**
Sì, la knowledge base è aggiornabile.

**Come gestisce documenti lunghi?**
Li analizza per sezioni, poi consolida i risultati.

**Funziona con documenti scansionati?**
Sì, se la qualità OCR è sufficiente.

---

*Nexa Data | Foundation | Scheda Tecnica*
