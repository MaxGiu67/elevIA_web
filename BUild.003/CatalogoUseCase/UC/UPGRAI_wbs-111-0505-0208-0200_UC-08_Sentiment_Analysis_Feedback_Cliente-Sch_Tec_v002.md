---
ID: 1.1.1.1.1.5.5.2.8.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Customer Experience > UC-08 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0208-0200 UC-08.Sentiment Analysis Feedback Cliente-Sch.Tec v.002
---

# UC-08. Sentiment Analysis Feedback Cliente — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure OpenAI + Azure AI Language |

---

## Incluso

**Funzionalità**
- Analisi sentiment (positivo/negativo/neutro)
- Estrazione topic e keyword
- Score confidence per sentiment
- Dashboard aggregata
- Alert su soglie configurabili

**Integrazioni standard**
- Survey tools (Typeform, SurveyMonkey, Google Forms)
- Recensioni (Google Business, Trustpilot)
- CRM (feedback field)
- Email (via Logic Apps)

**Deliverable**
- Pipeline analisi in produzione
- Dashboard Power BI
- Sistema alert
- Documentazione
- Formazione utenti (2 ore)

---

## Escluso

- Social media listening (richiede tool dedicato)
- Analisi audio/video
- Sentiment su immagini
- Lingue diverse da IT/EN
- Integrazione chatbot/voicebot

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure attivo | Cliente | Prima del kickoff |
| Accesso fonti feedback | Cliente IT | Kickoff |
| Lista topic di interesse | Cliente Business | Giorno 3 |
| Power BI workspace | Cliente IT | Giorno 8 |
| Storico 3-6 mesi (opzionale) | Cliente Business | Giorno 5 |

---

## Timeline

```
[Setup 2gg]─[Connettori 4gg]─[Analisi Engine 4gg]─[Dashboard 3gg]─[Test+Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 6: fonti connesse
- Giorno 10: analisi funzionante
- Giorno 13: dashboard pronta
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Accuracy sentiment | ≥85% | Test su 100 feedback |
| Latenza analisi | < 3 sec | P95 |
| Uptime | ≥99% | Mensile |
| Alert delivery | < 5 min | Da trigger |

---

## FAQ

**Funziona con feedback in italiano?**
Sì. Ottimizzato per IT e EN.

**Posso aggiungere topic custom?**
Sì. Interfaccia admin per gestire tassonomia.

**Come funzionano gli alert?**
Email/Teams quando sentiment negativo supera soglia configurata.

---

*Nexa Data | Foundation | Scheda Tecnica*
