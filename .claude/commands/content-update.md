---
name: content-update
description: Aggiorna massivamente i contenuti UPGRAI
---

# Skill: Aggiornamento Massivo Contenuti

Questa skill permette di aggiornare più contenuti contemporaneamente.

## Comandi Disponibili

### "aggiorna tutti i KPI"
Modifica i KPI in tutti gli Use Case.

Esempio: "aggiorna il KPI accuracy da 85% a 90% in tutti gli use case"

### "aggiungi mattoncino X a tutti"
Aggiunge un nuovo tipo di mattoncino a tutti gli Use Case.

Esempio: "aggiungi mattoncino timeline a tutti gli use case"

### "rinomina area X in Y"
Rinomina un'area e aggiorna tutti i riferimenti.

Esempio: "rinomina area cx in customer-experience"

### "aggiungi keyword SEO X a tutti"
Aggiunge una keyword a tutti i contenuti.

Esempio: "aggiungi keyword 'automazione' a tutti gli use case"

### "rigenera meta description"
Rigenera automaticamente le meta description basandosi sul contenuto.

### "aggiorna riferimenti"
Verifica e aggiorna tutti i link interni (related_use_cases, solves_problems).

## Procedura Standard

Per ogni comando di aggiornamento massivo:

1. **Leggi** tutti i file interessati con Glob + Read
2. **Analizza** quali file verranno modificati
3. **Mostra anteprima** delle modifiche in formato tabella:
   ```
   | File                  | Campo      | Prima      | Dopo       |
   |-----------------------|------------|------------|------------|
   | chatbot-faq.json     | kpi.value  | ≥85%       | ≥90%       |
   | rag-knowledge.json   | kpi.value  | ≥85%       | ≥90%       |
   ```
4. **Chiedi conferma** esplicita: "Vuoi applicare queste modifiche? (sì/no)"
5. **Applica** le modifiche solo dopo conferma
6. **Rigenera** file derivati (llms.txt) se necessario
7. **Conferma** completamento con riepilogo

## Esempi Dettagliati

### Esempio 1: Aggiorna KPI

**Input utente**: "aggiorna il KPI accuracy da 85% a 90% in tutti gli use case"

**Procedura**:
```
1. Glob("content/use-cases/*.json")
2. Per ogni file:
   - Read file
   - Trova mattoncino con type="kpi"
   - Trova metrica con label contenente "accuracy"
   - Se value contiene "85%", prepara cambio a "90%"
3. Mostra tabella modifiche
4. Chiedi conferma
5. Se confermato, applica con Edit tool
```

### Esempio 2: Aggiungi Mattoncino

**Input utente**: "aggiungi mattoncino testimonial a tutti gli use case"

**Template mattoncino da aggiungere**:
```json
{
  "type": "testimonial",
  "title": "Cosa dicono i clienti",
  "content": {
    "quote": "Da completare",
    "author": "Nome Cliente",
    "company": "Azienda",
    "role": "Ruolo"
  }
}
```

**Procedura**:
1. Chiedi posizione: "Dove vuoi inserire il mattoncino? (prima di cta / dopo kpi / ...)"
2. Mostra lista file che verranno modificati
3. Chiedi conferma
4. Inserisci mattoncino nella posizione corretta

### Esempio 3: Aggiorna Riferimenti

**Input utente**: "aggiorna riferimenti"

**Procedura**:
1. Leggi tutti gli use case, problems, areas
2. Per ogni use case:
   - Verifica che `related_use_cases` contengano ID esistenti
   - Verifica che `solves_problems` contengano ID esistenti
3. Per ogni problem:
   - Verifica che `solved_by` contengano ID esistenti
4. Mostra errori trovati
5. Proponi correzioni automatiche
6. Chiedi conferma prima di applicare

## Sicurezza

- **Mai** modificare senza mostrare anteprima
- **Mai** applicare senza conferma esplicita
- **Sempre** creare backup mentale (mostrare stato "prima")
- Se l'operazione è rischiosa, avvisa: "⚠️ Questa operazione modificherà N file"

## Post-Aggiornamento

Dopo ogni aggiornamento massivo:

1. Suggerisci: "Vuoi che rigeneri llms.txt?"
2. Suggerisci: "Vuoi che validi tutti i contenuti?"
3. Mostra riepilogo:
   ```
   ✅ Aggiornamento completato
   - File modificati: 15
   - Campo aggiornato: kpi.metrics[2].value
   - Valore: ≥85% → ≥90%
   ```
