---
name: content
description: Gestisci contenuti elevIA (Use Cases, Problems, Areas)
---

# Skill: Gestione Contenuti elevIA

Sei un assistente per la gestione dei contenuti del framework elevIA.
I contenuti sono file JSON in `content/` e devono essere indicizzabili da Google e LLM.

## Struttura Directory

```
content/
├── use-cases/          # 20 Use Case AI
│   └── {slug}.json
├── problems/           # Problemi aziendali
│   └── {slug}.json
└── areas/              # 5 Aree di intervento
    └── {slug}.json
```

## Comandi Disponibili

Chiedi all'utente cosa vuole fare:

1. **Crea nuovo** - Use Case, Problema, o Area
2. **Modifica** - Aggiorna contenuto esistente
3. **Lista** - Mostra tutti i contenuti
4. **Valida** - Controlla errori nei JSON
5. **Genera** - Rigenera llms.txt, robots.txt

## Schema Use Case

Quando crei o modifichi un Use Case, usa questo schema:

```json
{
  "id": "slug-identificativo",
  "name": "Nome Use Case",
  "area": "knowledge|cx|operations|workflow|hr",

  "hero": {
    "image": "nome-file.jpg",
    "tagline": "Area di appartenenza",
    "title": "Titolo principale",
    "subtitle": "Descrizione in una frase"
  },

  "mattoncini": [
    {
      "type": "problem",
      "title": "Il problema",
      "content": {
        "statement": "Descrizione del problema",
        "pain_points": ["Punto 1", "Punto 2", "Punto 3"]
      }
    },
    {
      "type": "solution",
      "title": "La soluzione",
      "content": {
        "overview": "Come lo risolviamo",
        "steps": [
          { "title": "Step 1", "description": "Descrizione" },
          { "title": "Step 2", "description": "Descrizione" },
          { "title": "Step 3", "description": "Descrizione" }
        ]
      }
    },
    {
      "type": "kpi",
      "title": "Risultati garantiti",
      "content": {
        "metrics": [
          { "value": "-60%", "label": "carico operatori", "icon": "📉" },
          { "value": "<5s", "label": "tempo risposta", "icon": "⚡" },
          { "value": "≥85%", "label": "accuracy", "icon": "🎯" }
        ]
      }
    },
    {
      "type": "how-it-works",
      "title": "Come funziona",
      "content": {
        "description": "Spiegazione tecnica",
        "diagram": "nome-diagramma.svg"
      }
    },
    {
      "type": "tech-stack",
      "title": "Tecnologie",
      "content": {
        "stack": ["LLM", "RAG", "Vector DB"],
        "integrations": ["Sistema 1", "Sistema 2"]
      }
    },
    {
      "type": "related",
      "title": "Use Case correlati",
      "content": {
        "use_cases": ["altro-use-case-id"]
      }
    },
    {
      "type": "cta",
      "title": "Inizia ora",
      "content": {
        "text": "Vuoi implementare questo Use Case?",
        "button": "Richiedi Assessment Gratuito",
        "link": "#contact"
      }
    }
  ],

  "solves_problems": ["id-problema-1"],
  "related_use_cases": ["altro-use-case"],

  "seo": {
    "meta_title": "Nome Use Case | elevIA",
    "meta_description": "Descrizione per Google (max 160 caratteri)",
    "keywords": ["keyword1", "keyword2", "AI"],
    "canonical": "/use-case/slug-identificativo"
  }
}
```

## Schema Problem

```json
{
  "id": "slug-problema",
  "name": "Nome Problema",
  "area": "knowledge|cx|operations|workflow|hr",

  "hero": {
    "image": "problema.jpg",
    "tagline": "Il problema",
    "title": "Titolo Problema",
    "subtitle": "Descrizione breve"
  },

  "mattoncini": [
    {
      "type": "problem",
      "title": "Sintomi comuni",
      "content": {
        "pain_points": ["Sintomo 1", "Sintomo 2", "Sintomo 3"]
      }
    },
    {
      "type": "solution",
      "title": "Le nostre soluzioni",
      "content": {
        "use_cases": ["use-case-1", "use-case-2"]
      }
    }
  ],

  "solved_by": ["use-case-1", "use-case-2"],

  "seo": {
    "meta_title": "Problema: Nome | elevIA",
    "meta_description": "Descrizione SEO",
    "canonical": "/problema/slug-problema"
  }
}
```

## Schema Area

```json
{
  "id": "area-slug",
  "name": "Nome Area",
  "description": "Descrizione area",
  "icon": "📚",
  "color": "orange|blue",

  "hero": {
    "image": "area.jpg",
    "tagline": "Area di intervento",
    "title": "Nome Area",
    "subtitle": "Descrizione"
  },

  "use_cases": ["use-case-1", "use-case-2", "use-case-3", "use-case-4"],

  "seo": {
    "meta_title": "Area: Nome | elevIA",
    "meta_description": "Descrizione SEO",
    "canonical": "/area/area-slug"
  }
}
```

## Aree Disponibili

- `knowledge` - Knowledge (arancione)
- `cx` - Customer Experience (arancione)
- `operations` - Operations (blu)
- `workflow` - Workflow (blu)
- `hr` - HR (arancione)

## Regole di Validazione

1. **ID**: solo lettere minuscole, numeri, trattini
2. **Links**: `related_use_cases` e `solves_problems` devono esistere
3. **Immagini**: verificare che esistano in `public/images/heroes/`
4. **SEO**: `meta_description` max 160 caratteri
5. **Mattoncini**: almeno `problem`, `solution`, `kpi`, `cta`

## Istruzioni per Claude

### Se l'utente dice "crea nuovo use case":
1. Chiedi nome e area
2. Chiedi il problema che risolve
3. Chiedi i KPI principali
4. Genera il JSON completo
5. Scrivi il file con Write tool
6. Suggerisci di aggiungere l'immagine hero

### Se l'utente dice "modifica X":
1. Leggi il file JSON esistente
2. Chiedi cosa vuole modificare
3. Applica le modifiche
4. Riscrivi il file

### Se l'utente dice "lista":
1. Leggi tutti i file in content/
2. Mostra tabella riassuntiva

### Se l'utente dice "valida":
1. Leggi tutti i JSON
2. Verifica schema, links, immagini
3. Riporta errori e warning

### Se l'utente dice "genera":
1. Rigenera `public/llms.txt` con tutti i contenuti
2. Rigenera `public/robots.txt`
3. Conferma completamento

## Template llms.txt

Quando generi llms.txt:

```
# elevIA - Framework AI per Aziende
# https://elevia.nexadata.it
# Aggiornato: {data}

> elevIA offre {n} Use Case AI standardizzati, pronti all'uso in 15 giorni.
> Accuracy ≥85%, latenza <5s, disponibilità 99%.

## Aree ({n})
{per ogni area: - Nome: lista use cases}

## Use Cases ({n})
{per ogni use case: - Nome: descrizione breve → /use-case/slug}

## Problemi che Risolviamo ({n})
{per ogni problema: - Nome → /problema/slug}

## Contatti
- Website: https://elevia.nexadata.it
- Email: elevia@nexadata.it
- Assessment: https://elevia.nexadata.it/#contact

## Citazione
elevIA - Framework AI con {n} Use Case pronti all'uso (https://elevia.nexadata.it)
```
