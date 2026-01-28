---
ID: 1.1.1.1.1.6.5.3.11.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Operations > UC-11 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0605-0311-0200 UC-11.Anomaly Detection su Dati Operativi-Sch.Tec v.002
---

# UC-11. Anomaly Detection su Dati Operativi — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure Anomaly Detector + Azure OpenAI |

---

## Incluso

**Funzionalità**
- Monitoraggio fino a 10 metriche
- Rilevamento anomalie multivariate
- Alert configurabili (email, Teams, webhook)
- Dashboard visualizzazione anomalie
- Spiegazione AI delle anomalie rilevate
- Gestione stagionalità e trend

**Integrazioni standard**
- Database SQL (SQL Server, MySQL, PostgreSQL)
- ERP (via API o export schedulato)
- File CSV/Excel su SharePoint
- API REST generiche

**Deliverable**
- Sistema in produzione
- Dashboard monitoraggio
- Configurazione alert
- Documentazione
- Formazione admin (2 ore)

---

## Escluso

- Più di 10 metriche nella fase iniziale
- Dati real-time (latenza < 1 minuto)
- Root cause analysis automatica avanzata
- Integrazione con sistemi SCADA/IoT
- Azioni automatiche di remediation

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Accesso dati storici (≥6 mesi) | Cliente IT | Prima del kickoff |
| Lista metriche da monitorare | Cliente Business | Kickoff |
| Definizione soglie alert | Cliente Business | Giorno 5 |
| Canali notifica (email, Teams) | Cliente IT | Giorno 5 |
| Referente per validazione anomalie | Cliente Business | Giorno 10 |

---

## Timeline

```
[Setup 2gg]─[Ingestion 3gg]─[Training 4gg]─[Alert 3gg]─[Test+Go-Live 3gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 5: dati storici caricati
- Giorno 9: modelli addestrati
- Giorno 12: alert configurati
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| True positive rate | ≥85% | Validazione su anomalie note |
| False positive rate | < 15% | Review periodo test |
| Latenza alert | < 5 min | Dalla detection |
| Uptime | ≥99% | Mensile |

---

## FAQ

**Quanti dati storici servono?**
Minimo 6 mesi per training affidabile. Ideale 12-24 mesi per catturare stagionalità.

**Posso aggiungere metriche dopo?**
Sì, come estensione. Ogni metrica richiede tuning del modello.

**Come gestisce la stagionalità?**
Il modello impara automaticamente pattern giornalieri, settimanali, mensili e annuali.

---

*Nexa Data | Foundation | Scheda Tecnica*
