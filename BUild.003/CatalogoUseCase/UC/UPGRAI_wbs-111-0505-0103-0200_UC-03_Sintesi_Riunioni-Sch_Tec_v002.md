---
ID: 1.1.1.1.1.5.5.1.3.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Knowledge > UC-03 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0103-0200 UC-03.Sintesi Automatica Riunioni-Sch.Tec v.002
---

# UC-03. Sintesi Riunioni — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure Speech + Azure OpenAI |

---

## Incluso

**Funzionalità**
- Trascrizione automatica audio/video
- Identificazione speaker (diarization)
- Estrazione decisioni
- Estrazione action item con assegnazioni
- Verbale strutturato in formato standard
- Ricerca full-text su storico riunioni

**Integrazioni standard**
- Microsoft Teams
- Zoom
- Upload file audio/video

**Deliverable**
- Sistema in produzione
- Interfaccia web per consultazione
- API per integrazioni
- Documentazione
- Formazione (2 ore)

---

## Escluso

- Lingue diverse da italiano/inglese
- Traduzione simultanea
- Riconoscimento speaker non registrati
- Integrazione calendar automatica
- Mobile app nativa

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure | Cliente | Prima del kickoff |
| Teams/Zoom con recording abilitato | Cliente IT | Kickoff |
| Policy privacy per recording | Cliente Legal | Kickoff |
| 5 riunioni test registrate | Cliente | Giorno 3 |
| Lista speaker per training voce | Cliente | Giorno 5 |

---

## Timeline

```
[Setup 2gg]─[Configurazione 4gg]─[Integrazione 5gg]─[Test 2gg]─[Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 6: trascrizione funzionante
- Giorno 11: sintesi + action item
- Giorno 13: UAT con riunioni reali
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Accuracy trascrizione | ≥85% | WER su 5 riunioni |
| Identificazione speaker | ≥90% | Test su riunioni note |
| Estrazione action item | ≥80% | Review manuale |
| Latenza | < 5 min | Post-meeting |

---

## FAQ

**Serve il consenso dei partecipanti?**
Sì. Devi gestirlo tu secondo le tue policy privacy.

**Funziona con riunioni in presenza?**
Sì, se registri l'audio con qualità sufficiente.

**Posso correggere la trascrizione?**
Sì, c'è un'interfaccia di editing.

**Gli action item vanno su Jira/Planner?**
Integrazioni aggiuntive disponibili come CR.

---

*Nexa Data | Foundation | Scheda Tecnica*
