---
ID: 1.1.1.1.1.5.5.1.1.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Knowledge > UC-01 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0101-0200 UC-01.RAG Knowledge Base Aziendale-Sch.Tec v.002
---

# UC-01. RAG Knowledge Base Aziendale — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure OpenAI + Azure AI Search |

---

## Incluso

**Funzionalità**
- Interfaccia web per domande in linguaggio naturale
- Risposte con citazione fonte (documento, pagina)
- Supporto italiano e inglese
- Ricerca su tutti i repository concordati

**Integrazioni standard**
- SharePoint Online
- File server (via Azure File Sync)
- Confluence / Wiki

**Deliverable**
- Sistema in produzione
- API per integrazioni
- Dashboard monitoraggio
- Documentazione
- Formazione utenti (2 ore)

---

## Escluso

- Connettori custom per sistemi non standard
- Traduzione automatica contenuti
- Training modelli personalizzati
- Migrazione documenti
- Lingue diverse da IT/EN

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure attivo | Cliente | Prima del kickoff |
| Accesso read ai repository | Cliente IT | Giorno 2 |
| Lista fonti prioritarie | Cliente Business | Kickoff |
| 5-10 utenti pilota | Cliente Business | Giorno 10 |
| 50 domande test | Cliente Business | Giorno 8 |

---

## Timeline

```
[Setup 2gg]─[Indicizzazione 4gg]─[Sviluppo 5gg]─[Test 2gg]─[Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 6: documenti indicizzati
- Giorno 11: demo interna
- Giorno 13: UAT completato
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Accuracy | ≥85% | Test su 50 domande |
| Latenza | < 5 sec | P95 |
| Uptime | ≥99% | Mensile |
| Copertura | 100% | Fonti concordate |

---

## FAQ

**Devo spostare i documenti?**
No. Il sistema legge dove sono.

**I permessi vengono rispettati?**
Sì. Ogni utente vede solo quello a cui ha accesso.

**Nuovi documenti?**
Indicizzati automaticamente entro 24h.

---

*Nexa Data | Foundation | Scheda Tecnica*
