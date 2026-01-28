# Ralph Loop + BMAD: Guida Completa all'Integrazione

## Indice

1. [Cos'è Ralph Loop](#1-cosè-ralph-loop)
2. [Come Funziona](#2-come-funziona)
3. [Installazione Ralph Loop](#3-installazione-ralph-loop)
4. [Configurazione BMAD](#4-configurazione-bmad)
5. [Integrazione Ralph + BMAD](#5-integrazione-ralph--bmad)
6. [Workflow Operativo](#6-workflow-operativo)
7. [Struttura File e Cartelle](#7-struttura-file-e-cartelle)
8. [Comandi Essenziali](#8-comandi-essenziali)
9. [Best Practices](#9-best-practices)
10. [Troubleshooting](#10-troubleshooting)
11. [Risorse e Link Utili](#11-risorse-e-link-utili)

---

## 1. Cos'è Ralph Loop

### Definizione

**Ralph Loop** (o "Ralph Wiggum Technique") è un pattern di sviluppo autonomo per Claude Code che permette all'AI di lavorare in loop continuo senza intervento umano fino al completamento dei task.

Il nome deriva da Ralph Wiggum dei Simpson — un personaggio persistente che non si arrende mai.

### Filosofia Core

> "Ralph is a Bash loop" — Geoffrey Huntley

Un semplice ciclo `while-true` che:
1. Fornisce un prompt a Claude
2. Claude lavora sul task
3. Verifica se i test passano
4. Se falliscono → ripete
5. Se passano → commit e prossimo task

### Perché Usarlo

| Vantaggio | Descrizione |
|-----------|-------------|
| **Autonomia** | Claude lavora mentre dormi |
| **Consistenza** | Ogni iterazione segue lo stesso processo |
| **Qualità** | I test devono passare per procedere |
| **Efficienza** | Nessun tempo perso in attesa umana |
| **Tracciabilità** | Ogni step è committato in Git |

### Risultati Reali

- Contratto $50K completato con $297 di API costs
- Team Y Combinator: 6+ repository in una notte
- Compilatore di linguaggio di programmazione in 3 mesi di loop

---

## 2. Come Funziona

### Architettura del Loop

```
┌─────────────────────────────────────────────────────────────┐
│                     RALPH LOOP ENGINE                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐                                           │
│  │  prompt.md   │  ← Istruzioni per Claude                  │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │   prd.json   │  ← Task da completare                     │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────────────────────────────────┐               │
│  │           LOOP ITERATION                  │               │
│  │  ┌─────────────────────────────────────┐ │               │
│  │  │ 1. Claude legge prossimo task       │ │               │
│  │  │ 2. Implementa codice                │ │               │
│  │  │ 3. Esegue test                      │ │               │
│  │  │ 4. Valuta risultato                 │ │               │
│  │  └─────────────────────────────────────┘ │               │
│  └──────────────┬───────────────────────────┘               │
│                 │                                            │
│        ┌────────┴────────┐                                  │
│        │                 │                                  │
│        ▼                 ▼                                  │
│   ❌ TEST FAIL      ✅ TEST PASS                            │
│        │                 │                                  │
│        │                 ├── git commit                     │
│        │                 ├── update progress.txt            │
│        │                 └── next task                      │
│        │                                                    │
│        └──► Retry con stesso task                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Stop Hook Pattern

Il cuore di Ralph è lo **Stop Hook** — un meccanismo che intercetta quando Claude dice "ho finito" e verifica oggettivamente se è vero:

```
Claude: "COMPLETE"
    │
    ▼
Stop Hook intercetta
    │
    ▼
Esegue: npm test / pytest / go test / etc.
    │
    ├── Exit code 0 → OK, procedi
    │
    └── Exit code 1 → Torna a lavorare
```

### Tre Fasi del Workflow

#### Fase 1: Requirements (Umano + AI)
- Documenta requisiti in `specs/`
- Nessuna implementazione
- Output: documentazione chiara

#### Fase 2: Planning (AI)
- Legge specs e codice esistente
- Genera `IMPLEMENTATION_PLAN.md`
- Output: task ordinati per priorità

#### Fase 3: Building (Loop Autonomo)
- Un task per iterazione
- Test → Fix → Commit
- Output: codice funzionante

---

## 3. Installazione Ralph Loop

### Prerequisiti

```bash
# Verifica Node.js (>= 20)
node --version

# Verifica Claude Code
claude --version

# Verifica Git
git --version
```

### Metodo 1: Plugin Ufficiale Anthropic

Il plugin è già incluso in Claude Code:

```bash
# Verifica disponibilità
claude /help | grep ralph

# Usa direttamente
/ralph-loop "Descrizione del task" --max-iterations 50
```

**Opzioni disponibili:**
- `--max-iterations N` — Limite iterazioni (default: 50)
- `--completion-promise "WORD"` — Parola di completamento (default: "COMPLETE")
- `--test-command "cmd"` — Comando test personalizzato

### Metodo 2: frankbria/ralph-claude-code (Consigliato)

Implementazione community con features avanzate:

```bash
# 1. Clona il repository
git clone https://github.com/frankbria/ralph-claude-code.git

# 2. Entra nella cartella
cd ralph-claude-code

# 3. Esegui installer
./install.sh

# 4. Verifica installazione
ralph --version
```

**Comandi installati globalmente:**
- `ralph` — Esegue il loop
- `ralph-monitor` — Monitora in tempo reale
- `ralph-setup` — Configura nuovo progetto
- `ralph-import` — Importa requirements

### Metodo 3: snarktank/ralph (Lightweight)

Versione minimalista:

```bash
# 1. Clona
git clone https://github.com/snarktank/ralph.git

# 2. Copia script nel tuo progetto
cp -r ralph/scripts/ralph ./scripts/

# 3. Rendi eseguibile
chmod +x ./scripts/ralph/ralph.sh
```

### Metodo 4: Setup Manuale

Crea la struttura minima:

```bash
# Crea cartelle
mkdir -p scripts/ralph specs

# Crea script principale
cat > scripts/ralph/ralph.sh << 'EOF'
#!/bin/bash
MAX_ITERATIONS=${1:-50}
ITERATION=0

while [ $ITERATION -lt $MAX_ITERATIONS ]; do
    echo "=== Iteration $((ITERATION + 1)) of $MAX_ITERATIONS ==="

    # Esegui Claude Code con il prompt
    claude --print "$(cat prompt.md)"

    # Esegui test
    if npm test; then
        echo "✅ Tests passed!"
        git add -A
        git commit -m "Ralph iteration $((ITERATION + 1)): tests passing"

        # Controlla se tutti i task sono completati
        if grep -q '"status": "pending"' prd.json; then
            echo "📋 More tasks remaining..."
        else
            echo "🎉 All tasks completed!"
            exit 0
        fi
    else
        echo "❌ Tests failed, retrying..."
    fi

    ITERATION=$((ITERATION + 1))
done

echo "⚠️ Max iterations reached"
EOF

chmod +x scripts/ralph/ralph.sh
```

---

## 4. Configurazione BMAD

### Installazione BMAD

```bash
# Nel tuo progetto
npx bmad-method@alpha install
```

Durante l'installazione:
1. Seleziona **Claude Code** come IDE
2. Scegli i moduli (BMM è il default)
3. Configura le cartelle artifacts
4. Installa i subagent desiderati

### Struttura Post-Installazione

```
tuo-progetto/
├── .claude/
│   └── agents/              # Agenti BMAD
│       ├── analyst.yaml
│       ├── pm.yaml
│       ├── architect.yaml
│       ├── dev.yaml
│       └── ...
├── planning-artifacts/      # Output fasi 1-3
├── implementation-artifacts/# Sprint e stories
├── project-knowledge/       # Documentazione
└── ...
```

### Verifica Installazione

```bash
# In Claude Code
/bmad-help
```

Dovresti vedere la lista di comandi disponibili.

---

## 5. Integrazione Ralph + BMAD

### Flusso Integrato

```
┌─────────────────────────────────────────────────────────────┐
│                    BMAD + RALPH WORKFLOW                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  BMAD PHASE 1: ANALYSIS                                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ /analyst → Brainstorm, Research, Create Brief          │ │
│  │ Output: project-brief.md                               │ │
│  └────────────────────────────────────────────────────────┘ │
│                          │                                   │
│                          ▼                                   │
│  BMAD PHASE 2: PLANNING                                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ /pm → Create PRD, Validate PRD                         │ │
│  │ /ux-designer → Create UX Design                        │ │
│  │ Output: prd.md, ux-design.md                           │ │
│  └────────────────────────────────────────────────────────┘ │
│                          │                                   │
│                          ▼                                   │
│  BMAD PHASE 3: SOLUTIONING                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ /architect → Create Architecture                       │ │
│  │ /pm → Create Epics and Stories                         │ │
│  │ Output: architecture.md, epics-stories.md              │ │
│  └────────────────────────────────────────────────────────┘ │
│                          │                                   │
│                          ▼                                   │
│  ═══════════════════════════════════════════════════════   │
│  │           CONVERSIONE BMAD → RALPH                   │   │
│  │                                                       │   │
│  │   epics-stories.md  ───►  prd.json                   │   │
│  │   architecture.md   ───►  prompt.md                  │   │
│  ═══════════════════════════════════════════════════════   │
│                          │                                   │
│                          ▼                                   │
│  RALPH PHASE 4: IMPLEMENTATION (AUTONOMO)                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ ./scripts/ralph/ralph.sh 100                           │ │
│  │                                                         │ │
│  │ Loop: implement → test → fix → commit → next           │ │
│  │                                                         │ │
│  │ Output: codice funzionante con test                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Script di Conversione BMAD → Ralph

Crea questo script per convertire gli output BMAD in formato Ralph:

```bash
# scripts/bmad-to-ralph.sh
#!/bin/bash

echo "🔄 Converting BMAD artifacts to Ralph format..."

# 1. Leggi epics-stories.md e converti in prd.json
cat > prd.json << 'EOF'
{
  "project": "$(basename $(pwd))",
  "version": "1.0.0",
  "created": "$(date -I)",
  "stories": []
}
EOF

# 2. Genera prompt.md dal contesto BMAD
cat > prompt.md << 'EOF'
# Ralph Loop Instructions

## Context
You are working on this project following the BMAD methodology.
Read the following documents for context:

- planning-artifacts/prd.md
- planning-artifacts/architecture.md
- planning-artifacts/epics-stories.md

## Your Task
1. Read prd.json to find the next pending story
2. Implement the story following TDD
3. Run tests until they pass
4. Update prd.json to mark story as complete
5. Say "COMPLETE" when done with current story

## Rules
- One story per iteration
- Tests MUST pass before marking complete
- Commit after each completed story
- Follow the architecture defined in planning-artifacts/
EOF

echo "✅ Conversion complete!"
echo "📁 Created: prd.json, prompt.md"
```

### Formato prd.json

```json
{
  "project": "mia-app",
  "version": "1.0.0",
  "created": "2026-01-24",
  "stories": [
    {
      "id": "STORY-001",
      "epic": "Pagamenti",
      "title": "Setup StoreKit iOS",
      "description": "Configurare StoreKit per in-app purchases su iOS",
      "acceptance_criteria": [
        "StoreKit configurato in Xcode",
        "Product IDs definiti",
        "Test purchase funzionante in sandbox"
      ],
      "priority": 1,
      "status": "pending",
      "tests": [
        "test_storekit_configuration",
        "test_product_fetch",
        "test_sandbox_purchase"
      ]
    },
    {
      "id": "STORY-002",
      "epic": "Pagamenti",
      "title": "Setup Google Play Billing",
      "description": "Configurare Play Billing Library per Android",
      "acceptance_criteria": [
        "Billing Library integrata",
        "Product IDs sincronizzati",
        "Test purchase in sandbox"
      ],
      "priority": 2,
      "status": "pending",
      "tests": [
        "test_billing_setup",
        "test_product_query",
        "test_sandbox_flow"
      ]
    }
  ]
}
```

---

## 6. Workflow Operativo

### Step-by-Step Completo

#### Giorno 1: Setup e Planning (Con BMAD)

```bash
# 1. Inizia nuovo branch
git checkout -b feature/pagamenti-marketplace

# 2. Installa BMAD se non già fatto
npx bmad-method@alpha install

# 3. Avvia Claude Code
claude

# 4. Crea PRD con BMAD
> /pm
> Create PRD per integrazione pagamenti iOS/Android

# 5. Crea Architecture
> /architect
> Create Architecture per payment system

# 6. Crea Epic e Stories
> /pm
> Create Epics and Stories
```

#### Giorno 1: Conversione per Ralph

```bash
# 7. Converti artifacts BMAD in formato Ralph
./scripts/bmad-to-ralph.sh

# 8. Verifica prd.json
cat prd.json | jq '.stories | length'
# Output: numero di stories da implementare

# 9. Verifica prompt.md
cat prompt.md
```

#### Giorno 1-N: Esecuzione Ralph Loop

```bash
# 10. Avvia Ralph (es. max 100 iterazioni)
./scripts/ralph/ralph.sh 100

# OPPURE con plugin ufficiale
/ralph-loop "Implementa stories da prd.json" --max-iterations 100

# OPPURE con ralph-claude-code
ralph --monitor --max-iterations 100
```

#### Monitoraggio (Opzionale)

```bash
# In un altro terminale
tail -f progress.txt

# Oppure
ralph-monitor
```

#### Dopo il Completamento

```bash
# 11. Verifica risultati
git log --oneline -20  # Vedi commit di Ralph

# 12. Esegui test finali
npm test

# 13. Review del codice
git diff main...HEAD

# 14. Crea PR
gh pr create --title "feat: payment integration" --body "Implemented via BMAD + Ralph Loop"
```

---

## 7. Struttura File e Cartelle

### Struttura Completa Progetto

```
mio-progetto/
│
├── .claude/
│   ├── agents/                    # Agenti BMAD
│   │   ├── analyst.yaml
│   │   ├── pm.yaml
│   │   ├── ux-designer.yaml
│   │   ├── architect.yaml
│   │   ├── dev.yaml
│   │   ├── sm.yaml
│   │   ├── tea.yaml
│   │   └── quick-flow-solo-dev.yaml
│   └── settings.json
│
├── planning-artifacts/            # Output BMAD Phase 1-3
│   ├── project-brief.md
│   ├── market-research.md
│   ├── prd.md
│   ├── ux-design.md
│   ├── architecture.md
│   └── epics-stories.md
│
├── implementation-artifacts/      # Output BMAD Phase 4
│   ├── sprint-plan.md
│   ├── stories/
│   │   ├── STORY-001.md
│   │   ├── STORY-002.md
│   │   └── ...
│   └── code-reviews/
│
├── project-knowledge/             # Documentazione persistente
│   ├── decisions.md
│   ├── learnings.md
│   └── tech-debt.md
│
├── scripts/
│   └── ralph/
│       ├── ralph.sh               # Script loop principale
│       └── hooks/
│           ├── pre-iteration.sh
│           └── post-iteration.sh
│
├── specs/                         # Specifiche dettagliate
│   ├── payments-spec.md
│   └── marketplace-spec.md
│
├── prd.json                       # Task Ralph (generato da BMAD)
├── prompt.md                      # Istruzioni per Claude in loop
├── progress.txt                   # Log delle iterazioni
├── IMPLEMENTATION_PLAN.md         # Piano generato da Ralph
│
├── src/                           # Codice sorgente
├── tests/                         # Test suite
├── package.json
└── README.md
```

### File Chiave Ralph

#### prompt.md (Template)

```markdown
# Ralph Loop Instructions

## Project Context
Project: [Nome Progetto]
Current Phase: Implementation
Methodology: BMAD + Ralph Loop

## Reference Documents
Before starting, read these documents:
1. `planning-artifacts/prd.md` - Product requirements
2. `planning-artifacts/architecture.md` - Technical design
3. `planning-artifacts/epics-stories.md` - Implementation stories

## Current Task
Read `prd.json` and find the first story with `"status": "pending"`.

## Implementation Rules

### TDD Workflow
1. Write failing test first
2. Implement minimum code to pass
3. Refactor if needed
4. All tests must pass

### Code Standards
- Follow existing code patterns
- Add JSDoc/docstrings for public functions
- No console.log in production code
- Handle errors appropriately

### Git Workflow
- Atomic commits per story
- Commit message format: `feat(scope): description`
- Update prd.json status after completion

## Completion Criteria
A story is complete when:
- [ ] All acceptance criteria met
- [ ] All specified tests pass
- [ ] Code follows architecture
- [ ] No linting errors
- [ ] Changes committed

When current story is complete:
1. Update prd.json: set story status to "completed"
2. Say "COMPLETE" to trigger validation
3. Wait for next iteration

## Important Notes
- ONE story per iteration
- Do NOT skip failing tests
- Do NOT mark incomplete work as done
- If stuck for 3+ attempts, add note to progress.txt
```

#### progress.txt (Template)

```
# Ralph Loop Progress Log
# Project: [Nome Progetto]
# Started: [Data]

================================================================================
ITERATION 1 - [Timestamp]
================================================================================
Story: STORY-001 - Setup StoreKit iOS
Status: IN_PROGRESS
Actions:
- Created StoreKit configuration
- Added product IDs
Tests: 2/3 passing
Notes: Sandbox environment issue, retrying...

================================================================================
ITERATION 2 - [Timestamp]
================================================================================
Story: STORY-001 - Setup StoreKit iOS
Status: COMPLETED ✅
Actions:
- Fixed sandbox configuration
- All tests passing
Commit: abc123f

================================================================================
ITERATION 3 - [Timestamp]
================================================================================
Story: STORY-002 - Setup Google Play Billing
Status: IN_PROGRESS
...
```

---

## 8. Comandi Essenziali

### Comandi BMAD

```bash
# Help generale
/bmad-help

# Agenti principali
/analyst          # Mary - Business Analyst
/pm               # John - Product Manager
/ux-designer      # Sally - UX Designer
/architect        # Winston - System Architect
/dev              # Amelia - Developer
/sm               # Bob - Scrum Master
/tea              # Murat - Test Architect

# Workflow comuni
CP                # Create PRD
VP                # Validate PRD
CA                # Create Architecture
VA                # Validate Architecture
CS                # Create Stories
DS                # Dev Story
CR                # Code Review
SP                # Sprint Planning
```

### Comandi Ralph

```bash
# Plugin ufficiale
/ralph-loop "task" --max-iterations 50
/cancel-ralph

# ralph-claude-code
ralph                          # Avvia loop
ralph --monitor                # Con monitoraggio
ralph --max-iterations 100     # Limite iterazioni
ralph-setup                    # Setup nuovo progetto
ralph-import specs.md project  # Importa requirements

# Script manuale
./scripts/ralph/ralph.sh 50    # 50 iterazioni max
```

### Comandi Utili Git

```bash
# Vedi progressi Ralph
git log --oneline --since="1 day ago"

# Conta commit Ralph
git log --oneline | grep -c "Ralph iteration"

# Annulla ultimo commit Ralph (se necessario)
git reset --soft HEAD~1

# Vedi diff totale
git diff main...HEAD --stat
```

### Comandi Monitoraggio

```bash
# Log in tempo reale
tail -f progress.txt

# Stato prd.json
cat prd.json | jq '.stories[] | select(.status == "pending") | .title'

# Conta stories rimanenti
cat prd.json | jq '[.stories[] | select(.status == "pending")] | length'

# Costo stimato (se hai API usage tracking)
# ~$10/ora con Claude Sonnet
```

---

## 9. Best Practices

### Quando Usare Ralph + BMAD

| ✅ Usa | ❌ Evita |
|--------|----------|
| Feature ben definite | Requisiti vaghi |
| Test automatici disponibili | Solo test manuali |
| Architettura chiara | Design esplorativo |
| Stories atomiche | Task giganti |
| Overnight development | Debugging urgente |

### Dimensionamento Stories

```
❌ Troppo grande:
"Implementa tutto il sistema di pagamenti"

✅ Giusto:
"STORY-001: Configura StoreKit"
"STORY-002: Implementa fetch products"
"STORY-003: Implementa purchase flow"
"STORY-004: Implementa restore purchases"
"STORY-005: Aggiungi receipt validation"
```

### Gestione Iterazioni

| Max Iterations | Uso Consigliato |
|----------------|-----------------|
| 10-20 | Bug fix, piccole feature |
| 50-100 | Feature medie |
| 100-200 | Epic complete |
| 200+ | Solo con monitoraggio |

### Controllo Costi

```bash
# Stima costi
# Claude Sonnet: ~$3/1M input tokens, ~$15/1M output tokens
# Media: ~$10/ora di loop continuo

# Per 8 ore overnight:
# ~$80 se loop continuo
# ~$20-40 se task completati prima

# Raccomandazione: imposta budget alert su Anthropic Console
```

### Checkpoint e Recovery

```bash
# Crea checkpoint prima di Ralph
git tag pre-ralph-$(date +%Y%m%d)

# Se qualcosa va storto
git reset --hard pre-ralph-20260124

# Salva stato prd.json
cp prd.json prd.json.backup
```

---

## 10. Troubleshooting

### Ralph Non Parte

```bash
# Verifica Claude Code
claude --version

# Verifica permessi script
chmod +x ./scripts/ralph/ralph.sh

# Verifica sintassi prompt.md
cat prompt.md | head -20

# Verifica prd.json valido
cat prd.json | jq .
```

### Loop Infinito

```bash
# Causa: test non falliscono mai (sempre passano)
# Soluzione: verifica che i test siano realmente eseguiti

# Verifica comando test
npm test --dry-run

# Aggiungi test che falliscono per feature non implementate
```

### Claude Non Capisce il Contesto

```bash
# Causa: prompt.md troppo vago
# Soluzione: aggiungi più contesto

# Verifica che i file riferiti esistano
ls -la planning-artifacts/

# Aggiungi esempi nel prompt.md
```

### Test Falliscono Sempre

```bash
# Causa possibili:
# 1. Test mal scritti
# 2. Ambiente non configurato
# 3. Dipendenze mancanti

# Debug
npm test -- --verbose

# Esegui test singolarmente
npm test -- --testNamePattern="test_name"
```

### Commit Troppo Frequenti

```bash
# Modifica ralph.sh per committare meno spesso
# Cambia da "ogni test pass" a "ogni story completata"
```

### Out of Context (Claude si confonde)

```bash
# Causa: troppo contesto accumulato
# Soluzione: Ralph automaticamente resetta il contesto ogni iterazione

# Se persiste, riduci dimensione stories
# Una story = una cosa specifica
```

---

## 11. Risorse e Link Utili

### Repository Ufficiali

| Risorsa | Link |
|---------|------|
| Claude Code | https://github.com/anthropics/claude-code |
| Ralph Plugin (ufficiale) | https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum |
| BMAD Method | https://github.com/bmad-code-org/BMAD-METHOD |

### Repository Community

| Risorsa | Link |
|---------|------|
| ralph-claude-code | https://github.com/frankbria/ralph-claude-code |
| snarktank/ralph | https://github.com/snarktank/ralph |
| ralph-loop-setup | https://github.com/MarioGiancini/ralph-loop-setup |

### Documentazione

| Risorsa | Link |
|---------|------|
| BMAD Docs | https://docs.bmad-method.org |
| Claude Code Docs | https://docs.anthropic.com/en/docs/claude-code |
| Ralph Wiggum Guide | https://awesomeclaude.ai/ralph-wiggum |

### Articoli e Tutorial

| Titolo | Link |
|--------|------|
| Ralph Wiggum Playbook | https://paddo.dev/blog/ralph-wiggum-playbook/ |
| Autonomous Loops | https://paddo.dev/blog/ralph-wiggum-autonomous-loops/ |
| BMAD + Claude Setup | https://zichen.dev/bmad-claude-code-setup-guide-ide-web-chat/ |

### Community

| Piattaforma | Link |
|-------------|------|
| BMAD Discord | (link nel repo BMAD) |
| Claude Code GitHub Issues | https://github.com/anthropics/claude-code/issues |

---

## Quick Start Checklist

```bash
# ☐ 1. Prerequisiti
node --version  # >= 20
claude --version
git --version

# ☐ 2. Installa BMAD
npx bmad-method@alpha install

# ☐ 3. Installa Ralph (scegli uno)
# Opzione A: Plugin ufficiale (già incluso)
# Opzione B: git clone https://github.com/frankbria/ralph-claude-code.git

# ☐ 4. Crea branch
git checkout -b feature/mia-feature

# ☐ 5. Usa BMAD per planning
/pm → Create PRD
/architect → Create Architecture
/pm → Create Epics and Stories

# ☐ 6. Converti per Ralph
./scripts/bmad-to-ralph.sh

# ☐ 7. Avvia Ralph
/ralph-loop "Implementa stories" --max-iterations 100

# ☐ 8. Monitora (opzionale)
tail -f progress.txt

# ☐ 9. Review e PR
git log --oneline -20
gh pr create
```

---

## Note Finali

Ralph Loop + BMAD è una combinazione potente che permette di:

1. **Pianificare bene** (BMAD) → requisiti chiari, architettura definita
2. **Eseguire autonomamente** (Ralph) → implementazione continua
3. **Garantire qualità** (Test) → solo codice funzionante viene committato

Il risultato è sviluppo software **24/7** con qualità controllata.

---

*Documento generato il 2026-01-24*
*Versioni: BMAD v6.0.0-alpha, Claude Code v2.1.19*
