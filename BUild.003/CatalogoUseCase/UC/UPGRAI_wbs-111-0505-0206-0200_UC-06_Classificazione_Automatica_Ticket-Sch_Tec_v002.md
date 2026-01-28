---
ID: 1.1.1.1.1.5.5.2.6.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Customer Experience > UC-06 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0206-0200 UC-06.Classificazione Automatica Ticket-Sch.Tec v.002
---

# UC-06. Classificazione Automatica Ticket — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure OpenAI + Logic Apps |

---

## Incluso

**Funzionalità**
- Classificazione automatica per categoria
- Assegnazione priorità (alta/media/bassa)
- Routing a team/coda
- Confidence score per ogni classificazione
- Override manuale operatore

**Integrazioni standard**
- ServiceNow
- Zendesk
- Freshdesk
- Email (via Logic Apps)

**Deliverable**
- Classificatore in produzione
- Dashboard monitoring
- Report accuracy
- Documentazione
- Formazione admin (2 ore)

---

## Escluso

- Sistemi ticketing non standard
- Classificazione immagini/allegati
- Risposta automatica (solo classificazione)
- Training modelli custom
- Lingue diverse da IT/EN

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure attivo | Cliente | Prima del kickoff |
| Storico ticket 6-12 mesi | Cliente Business | Kickoff |
| Mappatura categorie/team | Cliente Business | Kickoff |
| Accesso API ticketing | Cliente IT | Giorno 3 |
| 100 ticket test | Cliente Business | Giorno 10 |

---

## Timeline

```
[Setup 2gg]─[Analisi/Training 4gg]─[Integrazione 5gg]─[Test 2gg]─[Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 6: modello classificazione pronto
- Giorno 11: integrazione ticketing completata
- Giorno 13: UAT completato
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Accuracy | ≥90% | Test su 100 ticket |
| Latenza | < 2 sec | P95 |
| Uptime | ≥99% | Mensile |
| False positive rate | < 5% | Su priorità alta |

---

## FAQ

**Come gestisce i casi dubbi?**
Assegna confidence score. Sotto soglia, flag per revisione umana.

**Posso modificare le categorie?**
Sì. Interfaccia admin per gestire tassonomia.

**Funziona anche con email?**
Sì. Logic Apps monitora inbox e classifica.

---

*Nexa Data | Foundation | Scheda Tecnica*
