---
ID: 1.1.1.1.1.5.5.4.15.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Workflow > UC-15 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0415-0200 UC-15.Lead Scoring e Qualification-Sch.Tec v.002
---

# UC-15. Lead Scoring & Qualification — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure Machine Learning + Azure OpenAI |

---

## Incluso

**Funzionalità**
- Scoring automatico lead (0-100)
- Qualifica MQL/SQL automatica
- Insight in linguaggio naturale
- Suggerimento next best action
- Dashboard pipeline con score
- Alert su lead caldi

**Integrazioni standard**
- Salesforce
- HubSpot
- Dynamics 365
- CSV import

**Deliverable**
- Sistema in produzione
- Modello scoring calibrato
- Dashboard Power BI
- Documentazione
- Formazione sales team (2 ore)

---

## Escluso

- CRM custom senza API
- Scoring real-time su traffico web
- Integrazione marketing automation
- Predictive revenue
- Enrichment dati terze parti

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure | Cliente | Prima del kickoff |
| Accesso CRM (API) | Cliente IT | Kickoff |
| Storico lead 12 mesi | Sales Ops | Giorno 2 |
| Definizione ICP | Sales/Marketing | Giorno 3 |
| Feedback su 50 lead storici | Sales | Giorno 8 |

---

## Timeline

```
[Setup 2gg]─[Data Prep 3gg]─[Modelling 5gg]─[Integration 3gg]─[Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto, dati estratti
- Giorno 5: dataset preparato, feature definite
- Giorno 10: modello trainato, accuracy validata
- Giorno 13: integrazione CRM + dashboard
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Accuracy scoring | ≥85% | Confronto con conversioni reali |
| Latenza | < 5 sec | Scoring singolo lead |
| Copertura | 100% | Tutti i lead scorati |
| Adoption | Approvato | Feedback sales team |

---

## FAQ

**Come definite lo score?**
Combinazione di dati profilo (firmografici) e comportamento (engagement).

**Il modello migliora nel tempo?**
Sì, con feedback sulle conversioni. Retraining periodico incluso.

**Funziona se ho pochi dati storici?**
Servono almeno 500 lead e 50 conversioni. Sotto questa soglia, partiamo con regole e poi evolviamo.

**Lo score sostituisce il giudizio del sales?**
No. È un supporto. Il sales decide sempre.

---

*Nexa Data | Foundation | Scheda Tecnica*
