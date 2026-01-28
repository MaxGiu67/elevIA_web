---
ID: 1.1.1.1.1.6.5.3.12.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Operations > UC-12 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0605-0312-0200 UC-12.Predictive Maintenance Alerting-Sch.Tec v.002
---

# UC-12. Predictive Maintenance Alerting — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure Machine Learning + Azure IoT |

---

## Incluso

**Funzionalità**
- Modello predittivo per max 5 macchine/linee
- Orizzonte previsione 3-7 giorni
- Alert con probabilità e causa probabile
- Dashboard stato salute macchine
- Spiegazione AI dei segnali rilevati
- Integrazione calendario manutenzione

**Integrazioni standard**
- PLC/SCADA (via OPC-UA o export)
- Historian (OSIsoft PI, Wonderware)
- Database sensori
- CMMS per storico interventi

**Deliverable**
- Modelli predittivi in produzione
- Dashboard monitoraggio
- Sistema alerting
- Documentazione
- Formazione operations (2 ore)

---

## Escluso

- Più di 5 macchine nella fase iniziale
- Installazione nuovi sensori
- Integrazione con sistemi di controllo
- Azioni automatiche (stop macchina)
- Predizione guasti senza dati storici

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Accesso dati sensori/PLC | Cliente IT/OT | Prima del kickoff |
| Storico dati ≥6 mesi | Cliente | Prima del kickoff |
| Storico guasti con date | Cliente Manutenzione | Kickoff |
| Lista macchine prioritarie | Cliente Operations | Kickoff |
| Referente dominio macchine | Cliente | Tutto il progetto |

---

## Timeline

```
[Setup 2gg]─[Data prep 3gg]─[Training 5gg]─[Alert 3gg]─[Test+Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 5: dati preparati
- Giorno 10: modelli addestrati
- Giorno 13: alert configurati
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Precision | ≥85% | Validazione su guasti noti |
| Orizzonte | ≥3 giorni | Media alert pre-guasto |
| False alert | < 20% | Review periodo test |
| Uptime | ≥99% | Mensile |

---

## FAQ

**Serve installare sensori?**
No, lavoriamo con i dati già disponibili (PLC, SCADA, historian).

**Quanti guasti servono per il training?**
Minimo 10-15 eventi per tipo di guasto. Più eventi, migliore accuratezza.

**Funziona con macchine vecchie?**
Se hanno dati digitali accessibili (anche solo log), sì.

---

*Nexa Data | Foundation | Scheda Tecnica*
