---
ID: 1.1.1.1.1.5.5.2.5.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Customer Experience > UC-05 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0205-0200 UC-05.Chatbot FAQ Cliente-Sch.Tec v.002
---

# UC-05. Chatbot FAQ Cliente — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure OpenAI + Azure Bot Service |

---

## Incluso

**Funzionalità**
- Interfaccia conversazionale multicanale
- Risposte basate su knowledge base documentale
- Escalation automatica a operatore con contesto
- Supporto italiano e inglese
- Analytics conversazioni

**Integrazioni standard**
- Web widget (iframe/JS)
- WhatsApp Business (via Twilio)
- Microsoft Teams

**Deliverable**
- Bot in produzione
- Widget configurato
- Dashboard analytics
- Documentazione
- Formazione admin (2 ore)

---

## Escluso

- Canali non standard (Telegram, social DM)
- Integrazione CRM real-time
- Personalizzazione grafica avanzata widget
- Training modelli personalizzati
- Lingue diverse da IT/EN

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure attivo | Cliente | Prima del kickoff |
| FAQ e documentazione | Cliente Business | Kickoff |
| Accesso al sito per widget | Cliente IT | Giorno 5 |
| WhatsApp Business account | Cliente | Giorno 5 (se richiesto) |
| 20 conversazioni test | Cliente Business | Giorno 10 |

---

## Timeline

```
[Setup 2gg]─[Knowledge Base 3gg]─[Bot Dev 5gg]─[Integrazione 3gg]─[Test+Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 5: knowledge base indicizzata
- Giorno 10: bot funzionante in staging
- Giorno 13: canali integrati
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Accuracy risposte | ≥85% | Test su 50 domande |
| Latenza risposta | < 3 sec | P95 |
| Uptime | ≥99% | Mensile |
| Escalation rate | < 30% | Primo mese |

---

## FAQ

**Funziona anche fuori orario?**
Sì, 24/7. L'escalation a operatore attiva solo in orario.

**Come si aggiorna la knowledge base?**
Interfaccia admin per caricare nuovi documenti. Refresh automatico.

**I clienti capiscono che è un bot?**
Disclosure configurabile. Consigliamo trasparenza.

---

*Nexa Data | Foundation | Scheda Tecnica*
