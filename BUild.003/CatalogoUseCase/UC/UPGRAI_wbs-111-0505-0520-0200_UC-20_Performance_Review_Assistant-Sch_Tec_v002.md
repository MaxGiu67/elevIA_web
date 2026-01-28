---
ID: 1.1.1.1.1.5.5.5.20.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > HR > UC-20 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0520-0200 UC-20.Performance Review Assistant-Sch.Tec v.002
---

# UC-20. Performance Review Assistant — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure OpenAI + Azure AI Search |

---

## Incluso

**Funzionalità**
- Aggregazione dati performance
- Raccolta feedback 360 (form + reminder)
- Sintesi automatica del periodo
- Suggerimenti punti di discussione
- Generazione bozza valutazione
- Export per sistema HR

**Fonti dati supportate**
- Obiettivi (se documentati)
- Feedback 360 (form incluso)
- Note manager (se disponibili)
- KPI (se accessibili via API)

**Deliverable**
- Sistema in produzione
- Form feedback 360
- Template review configurato
- Documentazione
- Formazione manager (2 ore)

---

## Escluso

- Integrazione sistemi performance complessi
- Calibration automatica
- Compensation planning
- Succession planning
- Mobile app nativa

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure + M365 | Cliente | Prima del kickoff |
| Template valutazione | HR | Kickoff |
| Criteri di valutazione | HR | Giorno 2 |
| Lista dipendenti per pilota | HR | Giorno 3 |
| Manager per test | HR | Giorno 10 |

---

## Timeline

```
[Setup 2gg]─[Config 4gg]─[Integration 5gg]─[Test 2gg]─[Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 6: form 360 + template configurati
- Giorno 11: aggregazione dati funzionante
- Giorno 13: UAT con manager pilota
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Completezza sintesi | ≥85% | Review HR |
| Qualità suggerimenti | Approvato | Feedback manager |
| Latenza generazione | < 10 sec | P95 |
| Manager satisfaction | ≥4/5 | Survey pilota |

---

## FAQ

**Sostituisce il giudizio del manager?**
No. Prepara una bozza. Il manager rivede, modifica e decide.

**Come raccoglie il feedback 360?**
Form semplice inviato via email/Teams. Reminder automatici.

**Funziona senza sistema HR?**
Sì. Usa i dati disponibili (feedback, note). Più dati = sintesi più ricca.

**Posso personalizzare il template?**
Sì, il template è configurabile secondo il processo aziendale.

---

*Nexa Data | Foundation | Scheda Tecnica*
