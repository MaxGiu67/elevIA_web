---
ID: 1.1.1.1.1.6.5.3.9.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Operations > UC-09 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0605-0309-0200 UC-09.Generazione Report Automatici-Sch.Tec v.002
---

# UC-09. Generazione Report Automatici — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure OpenAI + Azure Data Factory |

---

## Incluso

**Funzionalità**
- Estrazione dati da fonti multiple
- Aggregazione secondo regole configurabili
- Generazione report in formato Word/Excel/PDF
- Commenti AI su trend e anomalie
- Distribuzione automatica (email, SharePoint)
- Scheduling (giornaliero, settimanale, mensile)

**Integrazioni standard**
- Database SQL (SQL Server, MySQL, PostgreSQL)
- ERP (SAP, Dynamics, Zucchetti via API/ODBC)
- CRM (Salesforce, HubSpot, Dynamics CRM)
- Excel/CSV su SharePoint

**Deliverable**
- Pipeline dati in produzione
- Template report configurati
- Scheduler attivo
- Dashboard monitoraggio
- Documentazione
- Formazione admin (2 ore)

---

## Escluso

- Connettori per sistemi legacy senza API/ODBC
- Redesign completo dei report esistenti
- Data quality/cleansing delle fonti
- Report interattivi (Power BI embedding)
- Più di 5 report nella fase iniziale

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure attivo | Cliente | Prima del kickoff |
| Accesso read ai database | Cliente IT | Giorno 2 |
| Template report attuali | Cliente Business | Kickoff |
| Credenziali sistemi fonte | Cliente IT | Giorno 2 |
| Lista destinatari | Cliente Business | Giorno 5 |

---

## Timeline

```
[Setup 2gg]─[Connettori 3gg]─[Pipeline 4gg]─[Template 3gg]─[Test+Go-Live 3gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 5: connettori attivi
- Giorno 9: pipeline funzionante
- Giorno 12: template completati
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Accuracy dati | 100% | Confronto fonte |
| Puntualità | 100% | Rispetto scheduling |
| Uptime pipeline | ≥99% | Mensile |
| Qualità commenti AI | ≥85% | Review sample |

---

## FAQ

**Posso modificare i report dopo il go-live?**
Sì. I template sono configurabili, modifiche minori self-service.

**Cosa succede se una fonte non è disponibile?**
Alert automatico, report generato con dati parziali e nota.

**Posso aggiungere nuovi report?**
Sì, come Change Request o estensione contrattuale.

---

*Nexa Data | Foundation | Scheda Tecnica*
