---
name: content-ai
description: Genera contenuti elevIA con AI
---

# Skill: Generazione Contenuti AI

Genera automaticamente contenuti per nuovi Use Case basandosi sul contesto elevIA.

## Comandi Disponibili

### "genera use case per {descrizione}"
Crea un nuovo Use Case completo partendo da una descrizione.

Esempio: "genera use case per analisi automatica dei contratti"

### "migliora testi di {use-case}"
Riscrive i testi per renderli più efficaci e persuasivi.

Esempio: "migliora testi di chatbot-faq"

### "genera FAQ per {use-case}"
Crea domande frequenti per un Use Case.

Esempio: "genera FAQ per rag-knowledge-base"

### "suggerisci use case per {problema}"
Propone nuovi Use Case per risolvere un problema specifico.

Esempio: "suggerisci use case per gestione email"

### "espandi mattoncino {tipo} di {use-case}"
Arricchisce un mattoncino specifico con più dettagli.

Esempio: "espandi mattoncino how-it-works di screening-cv"

## Stile elevIA

Quando generi contenuti, rispetta queste linee guida:

### Tono
- **Professionale** ma accessibile
- **Concreto** con esempi reali
- **Orientato ai risultati** con metriche

### Focus
- Problema → Soluzione → Risultato
- Pain points specifici e riconoscibili
- KPI sempre quantificati

### Linguaggio
- Verbi attivi ("Riduci", "Automatizza", "Elimina")
- Numeri concreti (-60%, 15 giorni, €50k)
- Evita gergo tecnico quando possibile

## Template Pain Points

Usa questi pattern per generare pain points efficaci:

```
- "Il [processo] richiede [tempo/risorse] manuale"
- "[N]% delle [risorse] sono sprecate in [attività]"
- "Errori in [processo] costano [€/tempo/reputazione]"
- "[Stakeholder] sono frustrati da [problema]"
- "I tempi di [attività] superano le aspettative dei clienti"
- "La [risorsa] è dispersa tra [N] sistemi diversi"
```

## Template Solution Steps

Per generare step soluzione coerenti con elevIA:

```
1. **Acquisizione**: Come raccogliamo i dati
   - "Connessione ai tuoi sistemi esistenti"
   - "Importazione automatica dei documenti"
   - "Integrazione con [sistema]"

2. **Elaborazione**: Come l'AI processa
   - "Analisi con modelli AI avanzati"
   - "Classificazione automatica"
   - "Estrazione informazioni chiave"

3. **Output**: Cosa ottiene l'utente
   - "Dashboard con risultati in tempo reale"
   - "Notifiche automatiche"
   - "Report pronti all'uso"
```

## Template KPI

KPI standard elevIA (adatta i valori al caso specifico):

| Tipo | Valore | Label | Quando usare |
|------|--------|-------|--------------|
| Riduzione | -60% | carico [ruolo] | Automazione task ripetitivi |
| Tempo | <5s | risposta | Chatbot, ricerca |
| Accuracy | ≥85% | accuracy | Classificazione, estrazione |
| Risparmio | €50k/anno | risparmio | ROI calcolabile |
| Tempo | -70% | tempo [attività] | Automazione processi |
| Copertura | 24/7 | disponibilità | Servizi automatici |

## Template Meta Description

Formula (max 160 caratteri):

```
"[Verbo] [beneficio quantificato] con [nome use case]. [Vantaggio principale]. Setup in 15 giorni."
```

Esempi:
- "Riduci del 60% il carico del customer service con Chatbot FAQ AI. Risposte automatiche 24/7 con accuracy ≥85%. Setup in 15 giorni."
- "Automatizza lo screening CV e riduci del 70% i tempi di selezione. AI che valuta competenze e fit culturale. Setup in 15 giorni."

## Procedura: Genera Use Case

Quando l'utente chiede di generare un nuovo Use Case:

### Step 1: Analisi
```
1. Identifica l'area più appropriata:
   - knowledge: documenti, informazioni, conoscenza
   - cx: clienti, supporto, ticket
   - operations: dati, report, anomalie
   - workflow: approvazioni, processi, automazioni
   - hr: recruiting, onboarding, dipendenti

2. Identifica problemi correlati esistenti
3. Identifica use case simili per ispirazione
```

### Step 2: Generazione
```
1. Genera ID (slug): lettere minuscole, trattini
2. Genera nome: breve, descrittivo
3. Genera hero: tagline, title, subtitle
4. Genera mattoncini:
   - problem: statement + 3-4 pain points
   - solution: overview + 3 steps
   - kpi: 3 metriche con valori realistici
   - how-it-works: descrizione tecnica
   - tech-stack: tecnologie + integrazioni
   - related: 2-3 use case correlati
   - cta: testo + button
5. Genera SEO: title, description, keywords
```

### Step 3: Review
```
1. Mostra JSON generato formattato
2. Chiedi: "Vuoi modificare qualcosa?"
3. Se sì, applica modifiche
4. Chiedi conferma finale
5. Scrivi file in content/use-cases/{id}.json
```

### Step 4: Post-creazione
```
1. Suggerisci: "Ricorda di creare l'immagine hero: public/images/heroes/{id}.jpg"
2. Suggerisci: "Vuoi che aggiorni i riferimenti negli use case correlati?"
3. Suggerisci: "Vuoi che rigeneri llms.txt?"
```

## Procedura: Migliora Testi

Quando l'utente chiede di migliorare i testi:

1. Leggi il file JSON esistente
2. Per ogni campo di testo:
   - Analizza chiarezza e impatto
   - Proponi versione migliorata
3. Mostra confronto prima/dopo
4. Chiedi conferma per ogni modifica
5. Applica modifiche approvate

### Criteri di miglioramento:
- **Più concreto**: aggiungi numeri e esempi
- **Più attivo**: usa verbi d'azione
- **Più breve**: elimina ridondanze
- **Più persuasivo**: focus su benefici

## Procedura: Genera FAQ

Per ogni Use Case, genera 5-7 FAQ:

```json
{
  "type": "faq",
  "title": "Domande frequenti",
  "content": {
    "questions": [
      {
        "q": "Quanto tempo serve per implementare [use case]?",
        "a": "Il setup standard richiede 15 giorni. Include configurazione, integrazione con i tuoi sistemi e training del modello sui tuoi dati."
      },
      {
        "q": "Che accuracy posso aspettarmi?",
        "a": "Garantiamo accuracy ≥85% dopo il periodo di training. Con dati di qualità superiore si raggiunge facilmente il 90%+."
      },
      {
        "q": "Si integra con [sistema comune]?",
        "a": "Sì, abbiamo integrazioni native con [lista sistemi]. Per altri sistemi offriamo API REST."
      },
      {
        "q": "I miei dati sono al sicuro?",
        "a": "Assolutamente. I dati restano nei tuoi sistemi, usiamo solo embeddings anonimi. Siamo GDPR compliant."
      },
      {
        "q": "Cosa succede se l'AI non sa rispondere?",
        "a": "In caso di incertezza, la richiesta viene escalata a un operatore umano con tutto il contesto già raccolto."
      }
    ]
  }
}
```

## Colori e Icone per Area

| Area | Colore | Icone suggerite |
|------|--------|-----------------|
| knowledge | orange | 📚 📖 🔍 💡 |
| cx | orange | 💬 🎧 ⭐ 🤝 |
| operations | blue | 📊 📈 ⚙️ 🔧 |
| workflow | blue | 🔄 ✅ 📋 ⚡ |
| hr | orange | 👥 🎯 📝 🚀 |
