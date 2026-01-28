---
ID: 1.1.1.1.1.5.5.5.19.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > HR > UC-19 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0519-0200 UC-19.Employee Self-Service Chatbot-Sch.Tec v.002
---

# UC-19. Employee Self-Service Chatbot — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure OpenAI + Azure AI Search + Bot Service |

---

## Incluso

**Funzionalità**
- Chatbot conversazionale in Teams
- Risposte da knowledge base HR
- Query dati personali (ferie, cedolino)
- Link a moduli e procedure
- Escalation a HR per casi complessi
- Analytics domande frequenti

**Integrazioni standard**
- Microsoft Teams
- SharePoint (documenti HR)
- API HR system (read-only)

**Deliverable**
- Sistema in produzione
- Knowledge base HR configurata
- Integrazione 1 sistema HR
- Documentazione
- Formazione HR (2 ore)

---

## Escluso

- Integrazione sistemi HR aggiuntivi (ogni sistema = CR)
- Azioni transazionali (es. approvazione ferie)
- Mobile app standalone
- Multilingua oltre IT/EN
- Integrazione payroll complessa

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure + M365 | Cliente | Prima del kickoff |
| Documentazione policy HR | HR | Kickoff |
| API sistema HR | IT | Giorno 2 |
| FAQ frequenti | HR | Giorno 3 |
| Dipendente per test | HR | Giorno 10 |

---

## Timeline

```
[Setup 2gg]─[KB Config 4gg]─[Integration 5gg]─[Test 2gg]─[Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 6: knowledge base popolata
- Giorno 11: integrazione HR system
- Giorno 13: UAT con dipendenti pilota
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Accuracy risposte | ≥85% | Test 50 domande |
| Latenza | < 5 sec | P95 |
| Deflection rate | ≥60% | Ticket ridotti |
| User satisfaction | ≥4/5 | Survey pilota |

---

## FAQ

**Vede i dati personali del dipendente?**
Sì, se integrato con sistema HR. Il dipendente vede solo i propri dati.

**Può approvare richieste?**
No. Mostra informazioni e link. Le approvazioni restano nel sistema HR.

**Come si aggiornano le policy?**
HR aggiorna i documenti SharePoint. L'indicizzazione è automatica.

**Funziona fuori Teams?**
Sì, con web widget. Teams è il canale primario.

---

*Nexa Data | Foundation | Scheda Tecnica*
