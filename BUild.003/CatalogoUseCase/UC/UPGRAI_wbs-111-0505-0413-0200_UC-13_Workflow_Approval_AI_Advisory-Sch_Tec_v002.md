---
ID: 1.1.1.1.1.5.5.4.13.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Workflow > UC-13 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0413-0200 UC-13.Workflow Approval con AI Advisory-Sch.Tec v.002
---

# UC-13. Workflow Approval con AI Advisory — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure OpenAI + Power Automate |

---

## Incluso

**Funzionalità**
- Analisi automatica richieste di approvazione
- Verifica policy configurabili
- Raccomandazione (approve/reject/escalate)
- Motivazione in linguaggio naturale
- Interfaccia approvatore con one-click action
- Audit trail completo

**Integrazioni standard**
- Microsoft Power Automate
- SharePoint (per policy)
- SAP / Dynamics 365 (via connettore)
- Email / Teams notification

**Deliverable**
- Sistema in produzione
- 1 workflow tipo configurato
- Dashboard approvazioni
- Documentazione
- Formazione (2 ore)

---

## Escluso

- Workflow aggiuntivi oltre il primo (ogni tipo = CR)
- Integrazione ERP custom senza API
- Firma digitale
- Approvazione automatica senza supervisione umana
- Mobile app nativa

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure + M365 | Cliente | Prima del kickoff |
| Policy approvative documentate | Cliente HR/Finance | Kickoff |
| Accesso sistema workflow esistente | Cliente IT | Giorno 2 |
| 50 richieste esempio | Cliente Business | Giorno 3 |
| Approvatore per test | Cliente | Giorno 10 |

---

## Timeline

```
[Setup 2gg]─[Config Policy 4gg]─[Integrazione 5gg]─[Test 2gg]─[Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 6: policy configurate, prompt ottimizzato
- Giorno 11: integrazione workflow completata
- Giorno 13: UAT con approvatori
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Accuracy raccomandazioni | ≥85% | Test su 50 richieste |
| Latenza | < 3 sec | P95 |
| Copertura policy | 100% | Tutte le regole mappate |
| Uptime | ≥99% | Mensile |

---

## FAQ

**Il sistema approva da solo?**
No. Suggerisce e motiva. L'umano decide sempre.

**Posso aggiungere altri tipi di workflow?**
Sì, con Change Request per ogni tipologia.

**Come gestisce le eccezioni?**
Le segnala per escalation all'approvatore di livello superiore.

**Funziona con il mio ERP?**
Se ha API REST o connettore Power Automate, sì.

---

*Nexa Data | Foundation | Scheda Tecnica*
