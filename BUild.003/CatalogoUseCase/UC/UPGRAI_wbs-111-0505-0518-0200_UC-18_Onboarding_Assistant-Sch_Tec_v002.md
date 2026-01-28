---
ID: 1.1.1.1.1.5.5.5.18.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > HR > UC-18 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0518-0200 UC-18.Onboarding Assistant Dipendenti-Sch.Tec v.002
---

# UC-18. Onboarding Assistant — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure OpenAI + Azure AI Search |

---

## Incluso

**Funzionalità**
- Chatbot conversazionale per nuovi dipendenti
- Risposte da knowledge base aziendale
- Personalizzazione per ruolo/dipartimento
- Checklist onboarding interattiva
- Escalation a HR per domande complesse
- Analytics domande frequenti

**Integrazioni standard**
- Microsoft Teams
- Web widget
- SharePoint (knowledge base)

**Deliverable**
- Sistema in produzione
- Knowledge base onboarding configurata
- Checklist per 1 ruolo tipo
- Documentazione
- Formazione HR (2 ore)

---

## Escluso

- Onboarding workflow automatizzato
- Integrazione HRIS per provisioning
- Checklist per ruoli aggiuntivi (ogni ruolo = CR)
- Mobile app nativa
- Gamification

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure + M365 | Cliente | Prima del kickoff |
| Documentazione onboarding | HR | Kickoff |
| Procedure e policy | HR | Giorno 2 |
| FAQ nuovi dipendenti | HR | Giorno 3 |
| Nuovo assunto per test | HR | Giorno 10 |

---

## Timeline

```
[Setup 2gg]─[KB Config 4gg]─[Chatbot 5gg]─[Test 2gg]─[Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 6: knowledge base popolata
- Giorno 11: chatbot funzionante
- Giorno 13: UAT con nuovo assunto
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Accuracy risposte | ≥85% | Test su 50 domande |
| Latenza | < 5 sec | P95 |
| Copertura topic | ≥90% | FAQ principali |
| User satisfaction | ≥4/5 | Survey pilota |

---

## FAQ

**Funziona solo in italiano?**
Italiano e inglese inclusi. Altre lingue come CR.

**Posso personalizzare per dipartimento?**
Sì, il sistema può dare risposte diverse in base al ruolo/team.

**Come si aggiorna la knowledge base?**
HR può aggiornare i documenti fonte. L'indicizzazione è automatica.

**Il nuovo dipendente può parlare con HR se serve?**
Sì, c'è sempre l'opzione di escalation a un umano.

---

*Nexa Data | Foundation | Scheda Tecnica*
