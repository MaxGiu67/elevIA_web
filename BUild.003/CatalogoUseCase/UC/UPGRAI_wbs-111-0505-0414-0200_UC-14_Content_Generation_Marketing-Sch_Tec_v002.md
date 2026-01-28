---
ID: 1.1.1.1.1.5.5.4.14.2
WBS.Path: C2P > Foundation > KERNEL > Ast.Krn > Servizi > Analisi UC > Workflow > UC-14 > Sch.Tec
WBS.Deliverable: UPGRAI.wbs-111-0505-0414-0200 UC-14.Content Generation Marketing-Sch.Tec v.002
---

# UC-14. Content Generation Marketing — Scheda Tecnica

## Riepilogo

| Parametro | Valore |
|-----------|--------|
| Effort | 15 gg/persona |
| Tecnologia | Azure OpenAI + RAG |

---

## Incluso

**Funzionalità**
- Generazione contenuti da brief testuale
- Supporto multi-formato (social, email, blog, descrizioni)
- Brand voice enforcement
- Varianti per A/B testing
- Interfaccia web per generazione e review
- Storico contenuti generati

**Formati supportati**
- Post LinkedIn, Facebook, Instagram, X
- Email marketing e commerciali
- Descrizioni prodotto
- Articoli blog (bozza)
- Newsletter

**Deliverable**
- Sistema in produzione
- Brand knowledge base configurata
- Template per canale
- Documentazione
- Formazione team marketing (2 ore)

---

## Escluso

- Generazione immagini/video
- Pubblicazione automatica sui canali
- Traduzione multilingua
- SEO optimization avanzata
- Integrazione CMS (disponibile come CR)

Estensioni disponibili come Change Request.

---

## Prerequisiti cliente

| Cosa | Chi | Quando |
|------|-----|--------|
| Tenant Azure | Cliente | Prima del kickoff |
| Brand guidelines | Marketing | Kickoff |
| 20-30 contenuti esempio | Marketing | Giorno 2 |
| Catalogo prodotti/servizi | Marketing | Giorno 3 |
| Reviewer per validazione | Marketing | Giorno 10 |

---

## Timeline

```
[Setup 2gg]─[Brand Config 4gg]─[Template 5gg]─[Test 2gg]─[Go-Live 2gg]
```

**Milestone**
- Giorno 2: ambiente pronto
- Giorno 6: brand knowledge base popolata
- Giorno 11: template tutti i canali pronti
- Giorno 13: UAT con marketing team
- Giorno 15: go-live

---

## Criteri di accettazione

| Criterio | Target | Verifica |
|----------|--------|----------|
| Coerenza brand | ≥85% | Review 20 contenuti |
| Latenza | < 10 sec | P95 |
| Usability | Approvato | Feedback marketing |
| Copertura canali | 100% | Tutti i formati richiesti |

---

## FAQ

**Il contenuto va rivisto prima di pubblicare?**
Sì, sempre. Il sistema genera bozze, l'umano approva.

**Può generare contenuti in altre lingue?**
Italiano e inglese inclusi. Altre lingue come CR.

**Come impara il mio tone of voice?**
Da esempi di contenuti approvati e brand guidelines.

**Posso generare varianti per A/B test?**
Sì, il sistema può produrre più versioni dello stesso contenuto.

---

*Nexa Data | Foundation | Scheda Tecnica*
