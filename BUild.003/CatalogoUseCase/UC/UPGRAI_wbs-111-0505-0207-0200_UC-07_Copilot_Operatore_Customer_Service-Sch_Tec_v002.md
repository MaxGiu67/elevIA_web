---
ID: 1.1.1.1.1.5.5.2.7.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Customer Experience > UC-07 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0207-0200 UC-07.Copilot Operatore Customer Service-Sch.Tec v.002
---

# UC-07. Copilot Operatore Customer Service — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure OpenAI + Azure AI Search |

---

## Incluso

**Funzionalità**
- Suggerimenti risposte in tempo reale
- Ricerca procedure contestuale
- Visualizzazione storico cliente
- Copia-incolla con un click
- Feedback operatore per miglioramento

**Integrazioni standard**
- Zendesk (sidebar app)
- Freshdesk (widget)
- ServiceNow (UI component)
- CRM via API

**Deliverable**
- Copilot in produzione
- Widget/sidebar configurato
- Dashboard usage
- Documentazione
- Formazione operatori (2 ore)

---

## Escluso

- Sistemi ticketing non standard
- Automazione completa (rimane assistito)
- Integrazione telefonia/voce
- Personalizzazione UI avanzata
- Lingue diverse da IT/EN

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure attivo | Cliente | Prima del kickoff |
| Knowledge base procedure | Cliente Business | Kickoff |
| Accesso API ticketing | Cliente IT | Giorno 3 |
| Accesso API CRM | Cliente IT | Giorno 3 |
| 5 operatori pilota | Cliente Business | Giorno 10 |

---

## Timeline

```
[Setup 2gg]─[Knowledge Base 3gg]─[Copilot Dev 5gg]─[Integrazione 3gg]─[Test+Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 5: KB indicizzata
- Giorno 10: copilot funzionante in staging
- Giorno 13: integrazione ticketing
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Relevance suggerimenti | ≥85% | Feedback operatori |
| Latenza | < 2 sec | P95 |
| Uptime | ≥99% | Mensile |
| Adoption rate | ≥70% | Dopo 2 settimane |

---

## FAQ

**L'operatore è obbligato a usare i suggerimenti?**
No. Il copilot suggerisce, l'operatore decide.

**Impara dai feedback?**
Sì. Rating positivo/negativo migliora i suggerimenti.

**Funziona anche in chat?**
Sì. Qualsiasi canale testuale.

---

*Nexa Data | Foundation | Scheda Tecnica*
