---
ID: 1.1.1.1.1.6.5.3.10.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Operations > UC-10 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0605-0310-0200 UC-10.Ricerca Semantica Prodotti e Catalogo-Sch.Tec v.002
---

# UC-10. Ricerca Semantica Prodotti e Catalogo — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure OpenAI + Azure AI Search |

---

## Incluso

**Funzionalità**
- Ricerca in linguaggio naturale su catalogo prodotti
- Comprensione sinonimi e varianti terminologiche
- Filtri dinamici (prezzo, categoria, specifiche)
- Ordinamento per rilevanza
- Suggerimenti "intendevi..." per query ambigue
- Supporto italiano e inglese

**Integrazioni standard**
- Database prodotti (SQL, MySQL, PostgreSQL)
- Export CSV/Excel
- ERP (via API o export schedulato)
- E-commerce (Magento, Shopify, WooCommerce)

**Deliverable**
- Motore ricerca in produzione
- API REST per integrazione
- Widget web embeddabile
- Dashboard analytics ricerche
- Documentazione
- Formazione admin (2 ore)

---

## Escluso

- Redesign catalogo o schede prodotto
- Integrazione con PIM non standard
- Ricerca su immagini
- Configuratore prodotto
- Multilingua oltre IT/EN

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Export catalogo completo | Cliente | Prima del kickoff |
| Schede tecniche (se presenti) | Cliente | Kickoff |
| Lista sinonimi/gergo settore | Cliente Business | Giorno 3 |
| 50 query di test | Cliente Business | Giorno 8 |
| Accesso e-commerce (se integrazione) | Cliente IT | Giorno 5 |

---

## Timeline

```
[Setup 2gg]─[Indicizzazione 3gg]─[Tuning 4gg]─[Integrazione 3gg]─[Test+Go-Live 3gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 5: catalogo indicizzato
- Giorno 9: ricerca ottimizzata
- Giorno 12: integrazione completata
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Relevance@5 | ≥85% | Test su 50 query |
| Latenza | < 3 sec | P95 |
| Zero results | < 5% | Su query ragionevoli |
| Uptime | ≥99% | Mensile |

---

## FAQ

**Devo rifare il catalogo?**
No. Lavoriamo con i dati che hai. Migliore è la qualità delle descrizioni, migliori i risultati.

**Funziona anche con codici prodotto?**
Sì. La ricerca ibrida trova sia per codice esatto che per descrizione semantica.

**Posso integrarlo nel mio e-commerce?**
Sì. Forniamo API REST e widget JavaScript embeddabile.

---

*Nexa Data | Foundation | Scheda Tecnica*
