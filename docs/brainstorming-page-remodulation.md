# UPGRAI - Agentic Page Remodulation System

## Brainstorming Completo

**Data**: 28 Gennaio 2026
**Versione**: 1.0

---

## Indice

1. [Overview del Sistema](#1-overview-del-sistema)
2. [AI Overview Dropdown](#2-ai-overview-dropdown)
3. [Esplora - Page Remodulation](#3-go-live---page-remodulation)
4. [Struttura Blocchi (Granularità)](#4-struttura-blocchi-granularità)
5. [Persistenza Stato](#5-persistenza-stato)
6. [Transizioni UI](#6-transizioni-ui)
7. [Fallback Strategy](#7-fallback-strategy)
8. [Multi-turn Context](#8-multi-turn-context)
9. [Architettura Tecnica](#9-architettura-tecnica)
10. [Schema Dati](#10-schema-dati)
11. [Componenti Frontend](#11-componenti-frontend)
12. [API Endpoints](#12-api-endpoints)
13. [Content Management (JSON)](#13-content-management-json)
14. [SEO Strategy](#14-seo-strategy)
15. [LLM & Robot Strategy](#15-llm--robot-strategy)
16. [Claude Code Skills](#16-claude-code-skills)
17. [Prossimi Passi](#17-prossimi-passi)

---

## 1. Overview del Sistema

UPGRAI implementa un sistema di **"Agentic Page Remodulation"** in due fasi:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   FASE 1: AI Overview Dropdown                                         │
│   ─────────────────────────────                                        │
│   Utente fa domanda → Risposta breve in dropdown (stile Google AI)     │
│   La pagina NON cambia. Risposta immediata, non invasiva.              │
│                                                                         │
│                              ↓                                          │
│                                                                         │
│   FASE 2: Esplora (Page Remodulation)                                  │
│   ───────────────────────────────────                                  │
│   Utente clicca "ESPLORA" → Pagina si riorganizza                      │
│   Mostra Use Case rilevanti, nasconde il resto, aggiunge CTA.          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Principio chiave**: L'utente ha sempre il controllo. La pagina non cambia mai automaticamente.

---

## 2. AI Overview Dropdown

### 2.1 Layout Visivo

**Il Chatbot è FLOATING al centro in basso. Il dropdown si apre VERSO L'ALTO.**

```
┌────────────────────────────────────────────────────────────────────────────┐
│ UPGRAI    [HOME] [USE CASE] [PROBLEMI] [PERCHÉ NOI]        [ASSESSMENT]    │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│                                                                            │
│                         [ CONTENUTO PAGINA ]                               │
│                                                                            │
│                                                                            │
│                                                                            │
│                                                                            │
│                                                                            │
│                                                                            │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                                     │
└────────────────────────────────────────────────────────────────────────────┘

                              FLOATING (position: fixed, bottom: 24px)
                                              ↓
                    ┌─────────────────────────────────┐
                    │  ✨ Chiedimi qualcosa...        │
                    └─────────────────────────────────┘
```

**Quando l'utente digita una domanda → Dropdown verso l'ALTO:**

```
                    ┌──────────────────────────────────────────┬──────────┐
                    │                                          │          │
                    │  ✨ AI Overview                          │          │
                    │                                          │    🚀    │
                    │  UPGRAI risolve il **customer service    │          │
                    │  sovraccarico** con due Use Case:        │ ESPLORA  │
                    │                                          │          │
                    │  • **Chatbot FAQ** — Risponde alle FAQ,  │  Mostra  │
                    │    riducendo il carico operatori -60%    │  sulla   │
                    │                                          │  pagina  │
                    │  • **Classificazione Ticket** — Smista   │          │
                    │    automaticamente al team giusto        │          │
                    │                                          │          │
                    │  ┌────────────────────────────────────┐  │          │
                    │  │ ≥85% accuracy • <5s • 15gg setup  │  │          │
                    │  └────────────────────────────────────┘  │          │
                    │                                          │          │
                    │              [Mostra altro ▼]            │          │
                    │                                          │          │
                    └──────────────────────────────────────────┴──────────┘
                                          ↑
                              max-height: 25vh, overflow-y: scroll

                    ┌─────────────────────────────────────────────────────┐
                    │  customer service sovraccarico              [✕]    │
                    └─────────────────────────────────────────────────────┘
                                      ↑
                              Input sempre visibile in basso
```

### 2.2 Espansione "Mostra altro"

```
┌──────────────────────────────────────────────────────┬─────────────────┐
│                                                      │                 │
│ ✨ AI Overview                                       │   ┌───────────┐ │
│                                                      │   │           │ │
│ UPGRAI risolve il **customer service sovraccarico** │   │    🚀     │ │
│ con due Use Case specifici:                         │   │           │ │
│                                                      │   │  ESPLORA  │ │
│ • **Chatbot FAQ** — Risponde automaticamente...     │   │           │ │
│ • **Classificazione Ticket** — Smista...            │   │  Mostra   │ │
│                                                      │   │  sulla    │ │
│ ─────────────────────────────────────────────────── │   │  pagina   │ │
│                                                      │   │           │ │
│ 📋 **Come funziona:**                               │   └───────────┘ │
│                                                      │                 │
│ 1. Assessment gratuito (2h) per capire i volumi     │                 │
│ 2. Configurazione chatbot su FAQ esistenti          │                 │
│ 3. Integrazione con ticketing system                │                 │
│ 4. Go-live in 15 giorni                             │                 │
│                                                      │                 │
│ 📊 **KPI tipici:**                                  │                 │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐       │                 │
│ │   -60%     │ │   <5s      │ │   85%+     │       │                 │
│ │  carico    │ │  risposta  │ │ accuracy   │       │                 │
│ │ operatori  │ │            │ │            │       │                 │
│ └────────────┘ └────────────┘ └────────────┘       │                 │
│                                                      │                 │
│                         [Mostra meno ▲]             │                 │
│                                                      │                 │
└──────────────────────────────────────────────────────┴─────────────────┘
```

### 2.3 Link Inline nella Risposta

La risposta AI Overview contiene **link cliccabili** direttamente nel testo:

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│ ✨ AI Overview                                                           │
│                                                                          │
│ UPGRAI risolve il **customer service sovraccarico** con soluzioni        │
│ AI pronte all'uso.                                                       │
│                                                                          │
│ Scopri come [Chatbot FAQ] può rispondere automaticamente alle            │
│ domande frequenti, riducendo il carico operatori del 60%.                │
│                    ↑ link                                                │
│                                                                          │
│ Per casi complessi, [Classificazione Ticket] smista automaticamente      │
│ le richieste al team giusto.                                             │
│              ↑ link                                                      │
│                                                                          │
│ Se vuoi valutare la tua situazione, richiedi un [Assessment gratuito].   │
│                                                     ↑ link scroll        │
│                                                                          │
│ Scopri tutti i nostri [Use Case per Customer Experience].                │
│                        ↑ link pagina                                     │
│                                                                          │
│ ┌─────────────────┐                                                      │
│ │ 📞 Contattaci   │  ← CTA button                                        │
│ └─────────────────┘                                                      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**Tipi di link:**

| Tipo | Azione | Esempio |
|------|--------|---------|
| `internal` | ESPLORA → mostra Use Case | `[Chatbot FAQ]` → rimodula pagina |
| `scroll` | Scroll a sezione | `[Assessment gratuito]` → scroll a #contact |
| `page` | Naviga a pagina | `[Use Case CX]` → /use-case/customer-experience |
| `external` | Link esterno | `[documentazione]` → docs.upgrai.it |

**Markup nel testo:**
```
// Bold
**customer service sovraccarico**

// Link interno (Use Case) - triggera ESPLORA mini
[[chatbot-faq|Chatbot FAQ]]

// Link scroll (ancora nella pagina)
[[#contact|Assessment gratuito]]

// Link pagina
[[/use-case/cx|Use Case per Customer Experience]]

// Link esterno
[documentazione](https://docs.upgrai.it)
```

### 2.4 Azioni Utente

| Azione | Risultato |
|--------|-----------|
| **ESPLORA** | Chiude dropdown → Rimodula pagina → Scroll a sezione rilevante |
| **Mostra altro** | Espande dropdown con dettagli (pagina invariata) |
| **Click su Use Case** | Scroll a quel Use Case specifico (senza rimodulare) |
| **✕ o click fuori** | Chiude dropdown, pagina invariata |
| **ESC** | Chiude dropdown |
| **Nuova domanda** | Sostituisce risposta precedente |

### 2.5 Stili CSS

```css
/* ===== FLOATING CHATBOT ===== */
.floating-chatbot {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  width: 100%;
  max-width: 600px;
  padding: 0 16px;
}

.chatbot-input {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;

  background: white;
  border-radius: 9999px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  border: 2px solid transparent;

  transition: all 0.2s;
}

.chatbot-input:focus-within {
  border-color: #F5921B;
  box-shadow: 0 8px 30px rgba(245, 146, 27, 0.2);
}


/* ===== AI OVERVIEW DROPDOWN (verso l'alto) ===== */
.ai-overview-dropdown {
  position: absolute;
  bottom: 100%;           /* Apre SOPRA l'input */
  left: 0;
  right: 0;
  margin-bottom: 12px;

  max-height: 25vh;       /* Max 60% viewport height */
  overflow-y: auto;       /* Scroll se contenuto lungo */

  background: white;
  border-radius: 24px;
  box-shadow: 0 -10px 40px rgba(0,0,0,0.15);

  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* ===== ESPLORA BUTTON ===== */
.go-live-button {
  background: linear-gradient(135deg, #F5921B, #FF6B00);
  color: white;
  padding: 24px 20px;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  transition: transform 0.2s, box-shadow 0.2s;
}

.go-live-button:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(245, 146, 27, 0.4);
}


/* ===== SCROLLBAR CUSTOM ===== */
.ai-overview-dropdown::-webkit-scrollbar {
  width: 6px;
}

.ai-overview-dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.ai-overview-dropdown::-webkit-scrollbar-thumb {
  background: #F5921B;
  border-radius: 3px;
}
```

---

## 3. Esplora - Page Remodulation

### 3.1 Cosa succede quando clicchi ESPLORA

Con la struttura **Hero Image + Mattoncini**, ESPLORA diventa semplice:

```
PRIMA (Homepage)                          DOPO (ESPLORA: "customer service")
─────────────────────────                 ─────────────────────────

┌─────────────────────┐                   ┌─────────────────────┐
│    HERO IMAGE       │                   │    HERO IMAGE       │
│ "20 Use Case AI     │      ═══>         │ 🖼️ Immagine CX      │
│  pronti all'uso"    │                   │ "Soluzioni per il   │
│ 🖼️ Immagine generica │                   │  Customer Service"  │
└─────────────────────┘                   └─────────────────────┘

┌─────────────────────┐                   ┌─────────────────────┐
│ MATTONCINO          │                   │ MATTONCINO          │
│ 5 Aree (tutte)      │                   │ 🔴 Problema         │
└─────────────────────┘                   │ "CS sovraccarico"   │
                                          └─────────────────────┘
┌─────────────────────┐
│ MATTONCINO          │                   ┌─────────────────────┐
│ Stats (generiche)   │                   │ MATTONCINO          │
└─────────────────────┘                   │ ⭐ Chatbot FAQ      │
                                          │ (highlight)         │
┌─────────────────────┐                   └─────────────────────┘
│ MATTONCINO          │
│ 6 Problemi (tutti)  │                   ┌─────────────────────┐
└─────────────────────┘                   │ MATTONCINO          │
                                          │ ⭐ Classif. Ticket  │
┌─────────────────────┐                   │ (highlight)         │
│ MATTONCINO          │                   └─────────────────────┘
│ Perché Noi          │
└─────────────────────┘                   ┌───────┬───────┬───────┐
                                          │ -60%  │ <5s   │ 85%+  │
┌─────────────────────┐                   │ KPI   │ KPI   │ KPI   │
│ MATTONCINO          │                   └───────┴───────┴───────┘
│ Contact             │
└─────────────────────┘                   ┌─────────────────────┐
                                          │ MATTONCINO          │
                                          │ 📞 CTA Assessment   │
                                          └─────────────────────┘

                                          ┌─────────────────────┐
                                          │ [← Torna alla Home] │
                                          └─────────────────────┘
```

**Operazioni ESPLORA:**
1. **Cambia Hero Image** → immagine + titolo contestualizzati
2. **Rimuovi mattoncini** non rilevanti
3. **Aggiungi mattoncini** specifici (problema, use cases)
4. **Highlight** sui mattoncini principali
5. **Aggiungi "Torna"** per reset

### 3.2 Regole di Rimodulazione

```typescript
interface RemodulationRules {
  // Cosa mostrare
  show: {
    matched_problem: boolean      // Sempre true
    matched_use_cases: boolean    // Sempre true, in formato espanso
    relevant_stats: boolean       // Solo KPI rilevanti
    contextual_cta: boolean       // CTA specifico per il problema
    back_button: boolean          // Sempre true
  }

  // Cosa nascondere
  hide: {
    unrelated_areas: boolean      // Nasconde aree non rilevanti
    unrelated_problems: boolean   // Nasconde altri problemi
    generic_hero: boolean         // Sostituisce con hero contestuale
  }

  // Cosa modificare
  modify: {
    hero_title: string            // Es: "Soluzioni per Customer Experience"
    hero_subtitle: string         // Es: "Risolvi il sovraccarico del customer service"
    cta_text: string              // Es: "Richiedi Assessment CX"
  }
}
```

### 3.3 Animazione Transizione

```
T=0ms     Utente clicca ESPLORA
T=100ms   Dropdown fade out
T=200ms   Overlay semi-trasparente sulla pagina
T=300ms   Blocchi non rilevanti: fade out + slide up
T=500ms   Nuovi blocchi: fade in + slide down
T=700ms   Hero cambia contenuto (crossfade)
T=900ms   Scroll automatico al primo Use Case
T=1000ms  Highlight pulse arancione sui Use Case
T=1200ms  Transizione completata, overlay rimosso
```

---

## 4. Struttura Pagine Interne

### 4.1 Template Standard: Hero Image + Mattoncini

**Tutte le pagine interne seguono lo stesso template semplificato:**

```
┌────────────────────────────────────────────────────────────────────────────┐
│ HEADER: Logo + Nav (HOME, USE CASE, PROBLEMI, PERCHÉ NOI) + [ASSESSMENT]   │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │                      HERO IMAGE                                      │  │
│  │                                                                      │  │
│  │    ┌─────────────────────────────────────────────────┐              │  │
│  │    │  Tagline: "Risolvi il customer service"         │              │  │
│  │    │                                                 │              │  │
│  │    │  TITOLO GRANDE                                  │              │  │
│  │    │  "Chatbot FAQ per Risposte Automatiche"        │              │  │
│  │    └─────────────────────────────────────────────────┘              │  │
│  │                                                                      │  │
│  │  Immagine in tonalità arancione UPGRAI (#F5921B)                    │  │
│  │  con overlay gradient                                                │  │
│  │                                                                      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ════════════════════════════════════════════════════════════════════════  │
│                                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                     │
│  │  MATTONCINO  │  │  MATTONCINO  │  │  MATTONCINO  │                     │
│  │  Problema    │  │  Soluzione   │  │  KPI         │                     │
│  └──────────────┘  └──────────────┘  └──────────────┘                     │
│                                                                            │
│  ┌──────────────┐  ┌──────────────┐                                       │
│  │  MATTONCINO  │  │  MATTONCINO  │                                       │
│  │  Come Funz.  │  │  CTA         │                                       │
│  └──────────────┘  └──────────────┘                                       │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                                     │
└────────────────────────────────────────────────────────────────────────────┘

                    ┌─────────────────────────────────┐
                    │  ✨ Chiedimi qualcosa...        │  ← FLOATING CHATBOT
                    │     position: fixed             │     bottom: 24px
                    │     left: 50%, transform        │     center
                    └─────────────────────────────────┘
```

### 4.2 Hero Image Component

```typescript
interface HeroImage {
  // Immagine
  image_url: string           // URL immagine (pre-generata per ogni Use Case/Area)
  image_alt: string

  // Overlay (sempre in tonalità UPGRAI)
  overlay: {
    type: "gradient" | "solid"
    color: "orange" | "blue" | "dark"  // primary, secondary, dark
    opacity: number           // 0.3 - 0.7
  }

  // Testo
  tagline: string             // "Risolvi il customer service"
  title: string               // "Chatbot FAQ"
  subtitle?: string           // descrizione breve opzionale
}
```

**Palette Hero Images:**

| Area | Colore Dominante | Esempio Immagine |
|------|------------------|------------------|
| Knowledge | Arancione (#F5921B) | Documenti, libri, database |
| Customer Experience | Arancione (#F5921B) | Persone, chat, supporto |
| Operations | Blu (#2FA7E6) | Grafici, dashboard, analytics |
| Workflow | Blu (#2FA7E6) | Flussi, automazioni, processi |
| HR | Arancione (#F5921B) | Team, persone, colloqui |

### 4.3 Libreria Hero Images

Ogni Area e Use Case ha una **Hero Image dedicata** in tonalità UPGRAI:

```typescript
// Definizione immagini per ogni contenuto
const heroImages: Record<string, HeroImageConfig> = {

  // AREE (5)
  "area-knowledge": {
    image: "/images/heroes/knowledge.jpg",
    alt: "Gestione della conoscenza aziendale",
    overlay: { color: "orange", opacity: 0.6 }
  },
  "area-cx": {
    image: "/images/heroes/customer-experience.jpg",
    alt: "Customer Experience",
    overlay: { color: "orange", opacity: 0.6 }
  },
  "area-operations": {
    image: "/images/heroes/operations.jpg",
    alt: "Operations e Analytics",
    overlay: { color: "blue", opacity: 0.6 }
  },
  "area-workflow": {
    image: "/images/heroes/workflow.jpg",
    alt: "Automazione Workflow",
    overlay: { color: "blue", opacity: 0.6 }
  },
  "area-hr": {
    image: "/images/heroes/hr.jpg",
    alt: "Human Resources",
    overlay: { color: "orange", opacity: 0.6 }
  },

  // USE CASES (20) - esempi
  "chatbot-faq": {
    image: "/images/heroes/chatbot.jpg",
    alt: "Chatbot per FAQ",
    overlay: { color: "orange", opacity: 0.5 }
  },
  "rag-knowledge-base": {
    image: "/images/heroes/rag.jpg",
    alt: "RAG Knowledge Base",
    overlay: { color: "orange", opacity: 0.5 }
  },
  // ... altri 18 use cases

  // PROBLEMI (10)
  "problema-cs-sovraccarico": {
    image: "/images/heroes/support-overload.jpg",
    alt: "Customer Service sovraccarico",
    overlay: { color: "orange", opacity: 0.7 }
  },
  // ... altri problemi

  // DEFAULT / HOMEPAGE
  "default": {
    image: "/images/heroes/upgrai-home.jpg",
    alt: "UPGRAI - 20 Use Case AI",
    overlay: { color: "orange", opacity: 0.5 }
  }
}
```

**Stile immagini:**
- Persone in contesti aziendali
- Tonalità calde (arancione) o fredde (blu) secondo l'area
- Overlay gradient per leggibilità testo
- Formato: 1920x600px (desktop), 768x400px (mobile)

**Generazione:** Immagini stock o AI-generated (Midjourney/DALL-E) con post-processing per uniformare i colori ai brand UPGRAI.

### 4.4 Vantaggi di questa struttura

1. **Semplicità**: Ogni pagina = Hero + N mattoncini
2. **Riusabilità**: I mattoncini sono gli stessi ovunque
3. **Rimodulazione facile**: Cambia hero, aggiungi/rimuovi mattoncini
4. **Consistenza visiva**: Tutte le pagine hanno lo stesso look
5. **Generazione AI**: Facile descrivere la struttura al sistema

### 4.4 Tipi di Mattoncini

```typescript
type BlockType =
  | "problem"           // Il problema che risolviamo
  | "solution"          // Come lo risolviamo (3 step)
  | "kpi"               // Metriche garantite
  | "how-it-works"      // Dettaglio tecnico
  | "benefits"          // Lista benefici
  | "testimonial"       // Quote cliente
  | "comparison"        // Prima/Dopo o vs competitor
  | "faq"               // Domande frequenti
  | "related"           // Use Case correlati
  | "cta"               // Call to action
  | "tech-stack"        // Tecnologie usate
  | "timeline"          // Tempi di implementazione
```

### 5.1 Esempio Pagina Use Case

**URL**: `/use-case/chatbot-faq`

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  🖼️ HERO IMAGE                                                       │  │
│  │  Background: persona con headset + overlay arancione                 │  │
│  │                                                                      │  │
│  │  Tagline: "Customer Experience"                                      │  │
│  │  Title: "Chatbot FAQ"                                               │  │
│  │  Subtitle: "Risposte automatiche 24/7 alle domande frequenti"       │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔴 MATTONCINO: Problema                                             │   │
│  │ "Il customer service è sovraccarico di domande ripetitive"          │   │
│  │ • 60% delle richieste sono FAQ                                      │   │
│  │ • Tempi di attesa elevati                                           │   │
│  │ • Operatori frustrati                                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🟢 MATTONCINO: Soluzione                                            │   │
│  │ "Chatbot AI che risponde automaticamente"                           │   │
│  │ 1. Analizza la domanda dell'utente                                  │   │
│  │ 2. Cerca la risposta nella knowledge base                           │   │
│  │ 3. Risponde in linguaggio naturale                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐                  │
│  │ 📊 KPI        │  │ 📊 KPI        │  │ 📊 KPI        │                  │
│  │ -60%          │  │ <5s           │  │ ≥85%          │                  │
│  │ carico op.    │  │ risposta      │  │ accuracy      │                  │
│  └───────────────┘  └───────────────┘  └───────────────┘                  │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔧 MATTONCINO: Come Funziona                                        │   │
│  │ [Diagramma tecnico o schema]                                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 🔗 MATTONCINO: Use Case Correlati                                   │   │
│  │ [Classificazione Ticket] [Copilot Operatore]                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ 📞 MATTONCINO: CTA                                                  │   │
│  │ "Vuoi implementare Chatbot FAQ?"                                    │   │
│  │ [Richiedi Assessment Gratuito]                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Gerarchia Contenuti

### 5.2 3 Livelli

```
LIVELLO 1: Area (macro)
├── Knowledge
├── Customer Experience
├── Operations
├── Workflow
└── HR

LIVELLO 2: Use Case (unità atomica principale)
├── RAG Knowledge Base
├── Chatbot FAQ
├── Classificazione Ticket
├── ... (20 totali)

LIVELLO 3: Mattoncini (blocchi componibili)
├── problem         → il problema che risolve
├── solution        → come lo risolve (3 step)
├── kpi             → metriche garantite
├── how-it-works    → dettaglio tecnico
├── benefits        → lista benefici
├── testimonial     → quote cliente
├── faq             → domande frequenti
├── related         → use case correlati
└── cta             → call to action
```

### 4.2 Schema Use Case

```typescript
interface UseCase {
  id: string                    // "chatbot-faq"
  name: string                  // "Chatbot FAQ"
  area: Area                    // "cx"

  // Componenti (ogni parte può essere mostrata/nascosta)
  components: {
    header: {
      title: string             // "Chatbot FAQ"
      tagline: string           // "Risposte automatiche 24/7"
      icon: string              // "💬"
    }

    problem: {
      statement: string         // "Il customer service è sovraccarico"
      pain_points: string[]     // ["60% domande ripetitive", "Attese lunghe"]
    }

    solution: {
      overview: string          // "AI che risponde alle FAQ"
      steps: {
        title: string
        description: string
      }[]
    }

    kpi: {
      metrics: {
        value: string           // "-60%"
        label: string           // "carico operatori"
        icon: string            // "📉"
      }[]
    }

    tech: {
      stack: string[]           // ["LLM", "RAG", "Vector DB"]
      integrations: string[]    // ["Zendesk", "Freshdesk", "Intercom"]
    }

    cta: {
      text: string              // "Scopri Chatbot FAQ"
      urgency: "low" | "medium" | "high"
    }
  }

  // Mappature
  solves_problems: string[]     // ["customer-service-sovraccarico"]
  related_use_cases: string[]   // ["classificazione-ticket"]
}
```

### 4.3 Modalità di Visualizzazione

```typescript
type DisplayMode = "compact" | "standard" | "expanded"

// Compact: solo header (titolo + tagline)
// Standard: header + problem + solution overview
// Expanded: tutti i componenti visibili
```

| Query | Modalità |
|-------|----------|
| "cos'è UPGRAI?" | Tutti i Use Case in `compact` |
| "problemi customer service" | Use Case CX in `standard` |
| "come funziona chatbot FAQ" | Chatbot FAQ in `expanded` |

---

## 5. Persistenza Stato

### 5.1 Tre Livelli di Persistenza

```
┌─────────────────────────────────────────────────────────────────┐
│ LIVELLO 1: Session State (Redis)                                │
│ TTL: 30 minuti                                                  │
│ Contiene: current_plan, plan_history, scroll_position           │
├─────────────────────────────────────────────────────────────────┤
│ LIVELLO 2: Browser State (localStorage)                         │
│ TTL: 30 giorni                                                  │
│ Contiene: session_id, preferences, bookmarked_plans             │
├─────────────────────────────────────────────────────────────────┤
│ LIVELLO 3: URL State (query params)                             │
│ Permanente (condivisibile)                                      │
│ Esempio: /explore?plan=abc123&uc=chatbot-faq                    │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Schema Session State

```typescript
interface SessionState {
  session_id: string
  created_at: Date
  last_activity: Date

  // Piano corrente
  current_plan: PagePlan | null

  // Storia (ultimi 10)
  plan_history: {
    plan_id: string
    query: string
    timestamp: Date
  }[]

  // Posizione scroll
  scroll_position: number

  // Contesto conversazione
  conversation: ConversationContext
}
```

### 5.3 Navigazione History

```
┌─────────────────────────────────────────────────────────────────┐
│  [←] [→]  [🏠 Home]  [📚 History ▼]  [🔗 Condividi]            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  History dropdown:                                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ • 14:52 "customer service sovraccarico" → CX           │   │
│  │ • 14:48 "documenti dispersi" → Knowledge               │   │
│  │ • 14:45 Vista iniziale                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.4 URL Condivisibili

```
# Vista specifica Use Case
https://upgrai.it/use-case/chatbot-faq

# Vista da problema
https://upgrai.it/problema/customer-service-sovraccarico

# Piano salvato (rimodulazione specifica)
https://upgrai.it/explore?plan=abc123

# Confronto Use Case
https://upgrai.it/compare?uc=chatbot-faq,classificazione-ticket
```

---

## 6. Transizioni UI

### 6.1 Libreria: Framer Motion

```typescript
// Tipi di transizione
type TransitionType =
  | "fade_in"       // nuovo blocco appare
  | "fade_out"      // blocco scompare
  | "highlight"     // blocco esistente evidenziato (pulse arancione)
  | "reorder"       // blocchi cambiano posizione
  | "expand"        // compact → expanded
  | "collapse"      // expanded → compact
  | "crossfade"     // contenuto cambia (es. hero)
```

### 6.2 Componente Blocco Animato

```tsx
import { motion, AnimatePresence } from 'framer-motion'

interface DynamicBlockProps {
  block: PageBlock
  isNew: boolean
  isHighlighted: boolean
  displayMode: DisplayMode
}

function DynamicBlock({ block, isNew, isHighlighted, displayMode }: DynamicBlockProps) {
  return (
    <motion.div
      layout
      layoutId={block.id}
      initial={isNew ? { opacity: 0, y: 30, scale: 0.95 } : false}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        boxShadow: isHighlighted
          ? [
              "0 0 0 0 rgba(245, 146, 27, 0)",
              "0 0 0 4px rgba(245, 146, 27, 0.4)",
              "0 0 0 0 rgba(245, 146, 27, 0)"
            ]
          : "none"
      }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        boxShadow: { duration: 1.5, repeat: 2 }
      }}
      className="dynamic-block"
    >
      <BlockContent block={block} mode={displayMode} />
    </motion.div>
  )
}
```

### 6.3 Scroll Automatico

```typescript
function scrollToRelevantContent(plan: PagePlan) {
  // Trova il primo blocco con alta rilevanza
  const primaryBlock = plan.blocks.find(b => b.relevance_score > 0.8)

  if (primaryBlock) {
    const element = document.getElementById(`block-${primaryBlock.id}`)

    // Scroll smooth con offset per header fisso
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })

    // Dopo scroll, triggera highlight
    setTimeout(() => {
      element?.classList.add('highlight-pulse')
    }, 500)
  }
}
```

### 6.4 CSS Animazioni

```css
/* Pulse highlight arancione */
@keyframes highlightPulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(245, 146, 27, 0);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(245, 146, 27, 0.4);
  }
}

.highlight-pulse {
  animation: highlightPulse 1s ease-in-out 3;
}

/* Slide down dropdown */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Overlay durante transizione */
.page-transition-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  z-index: 40;

  animation: fadeIn 0.3s ease-out;
}
```

---

## 7. Fallback Strategy

### 7.1 Gerarchia di Fallback

```typescript
async function handleQuery(query: string): Promise<AIOverviewResponse> {

  // STEP 1: Cerca nel RAG
  const ragResults = await ragEngine.search(query, { limit: 5 })

  // Caso A: Risultato buono (score > 0.7)
  if (ragResults.length > 0 && ragResults[0].score > 0.7) {
    return generateGoodResponse(ragResults)
  }

  // Caso B: Risultato parziale (score 0.4-0.7)
  if (ragResults.length > 0 && ragResults[0].score > 0.4) {
    return generatePartialResponse(ragResults, query)
  }

  // STEP 2: Classifica intent
  const intent = await classifyIntent(query)

  // Caso C: Saluto
  if (intent === "greeting") {
    return generateGreetingResponse()
  }

  // Caso D: Fuori scope
  if (intent === "off_topic") {
    return generateOffTopicResponse(query)
  }

  // Caso E: Fallback finale
  return generateFallbackResponse()
}
```

### 7.2 Risposte per Caso

**Caso A - Risultato Buono:**
```
✨ AI Overview

UPGRAI risolve il **customer service sovraccarico** con soluzioni AI pronte all'uso.

Scopri come [[chatbot-faq|Chatbot FAQ]] può rispondere automaticamente alle
domande frequenti, riducendo il carico operatori del 60%.

Per casi complessi, [[classificazione-ticket|Classificazione Ticket]] smista
automaticamente le richieste al team giusto.

Entrambe le soluzioni garantiscono **accuracy ≥85%** e **latenza <5 secondi**.

Per valutare la tua situazione, richiedi un [[#contact|Assessment gratuito]].

[📞 Contattaci]                                              [🚀 ESPLORA]
```

**Caso B - Risultato Parziale:**
```
✨ AI Overview

Ecco i risultati più vicini alla tua ricerca:

• [[chatbot-faq|Chatbot FAQ]] potrebbe essere utile se vuoi automatizzare
  le risposte alle domande frequenti

• [[classificazione-ticket|Classificazione Ticket]] se il problema è lo
  smistamento manuale delle richieste

💡 Forse cercavi:
• "ridurre ticket ripetitivi"
• "automatizzare risposte clienti"

[[#contact|Parliamone insieme]] per capire la soluzione migliore.

[🚀 ESPLORA]
```

**Caso C - Saluto:**
```
✨ AI Overview

Ciao! 👋 Sono l'assistente UPGRAI.

Posso aiutarti a trovare soluzioni AI per:
• Gestione documenti e knowledge
• Customer service
• Operations e report
• Workflow automatizzati
• HR e recruiting

Qual è la sfida che vuoi affrontare?
```

**Caso D - Fuori Scope:**
```
✨ AI Overview

Non ho trovato risultati per "blockchain per gatti" 🤔

Mi occupo di soluzioni AI per aziende. Posso aiutarti con:

• [Knowledge] Documenti dispersi, ricerca informazioni
• [CX] Customer service, ticket, chatbot
• [Operations] Report, anomalie, manutenzione
• [Workflow] Approvazioni, lead scoring
• [HR] CV screening, onboarding

Dimmi di più sul problema che vuoi risolvere!
```

**Caso E - Fallback Finale:**
```
✨ AI Overview

Ecco una panoramica delle nostre 20 soluzioni AI:

[Grid compatta delle 5 aree con 4 Use Case ciascuna]

Clicca su un'area per esplorare, oppure descrivi il tuo problema.
```

---

## 8. Multi-turn Context

### 8.1 Schema Contesto Conversazionale

```typescript
interface ConversationContext {
  session_id: string
  started_at: Date

  // Turni della conversazione
  turns: ConversationTurn[]

  // Stato accumulato
  accumulated: {
    areas_of_interest: Set<Area>
    use_cases_discussed: Set<string>
    problems_mentioned: Set<string>
    user_constraints: Constraint[]
    user_profile: UserProfile
    funnel_stage: FunnelStage
  }

  // Metriche
  topic_switches: number
  last_activity: Date
}

interface ConversationTurn {
  turn_id: string
  query: string
  intent: Intent
  entities: Entity[]
  response_type: "good" | "partial" | "fallback"
  plan_id: string | null
  timestamp: Date
}

interface Constraint {
  type: "budget" | "timeline" | "team_size" | "tech_stack" | "industry"
  value: string
  confidence: number  // 0-1
  source_turn: string
}

type UserProfile = "technical" | "business" | "executive" | "unknown"
type FunnelStage = "discovery" | "evaluation" | "decision"
type Intent = "explore" | "solve_problem" | "compare" | "learn" | "contact" | "greeting" | "off_topic"
```

### 8.2 Logica di Accumulo

```typescript
function updateContext(
  ctx: ConversationContext,
  newQuery: string,
  response: AIOverviewResponse
): ConversationContext {

  const newTurn = createTurn(newQuery, response)

  // Detect topic switch
  const isTopicSwitch = detectTopicSwitch(ctx.turns.slice(-3), newTurn)

  if (isTopicSwitch && ctx.turns.length > 2) {
    // Topic switch - reset parziale
    return {
      ...ctx,
      turns: [...ctx.turns, newTurn],
      topic_switches: ctx.topic_switches + 1,
      accumulated: {
        ...ctx.accumulated,
        // Mantieni aree (potrebbe voler confrontare)
        areas_of_interest: new Set([
          ...ctx.accumulated.areas_of_interest,
          ...response.matched_areas
        ]),
        // Reset problemi e use case
        problems_mentioned: new Set(response.matched_problems),
        use_cases_discussed: new Set(response.matched_use_cases),
        // Mantieni constraints e profile
        user_constraints: ctx.accumulated.user_constraints,
        user_profile: ctx.accumulated.user_profile,
        funnel_stage: ctx.accumulated.funnel_stage
      }
    }
  }

  // Accumulo normale
  return {
    ...ctx,
    turns: [...ctx.turns, newTurn],
    accumulated: {
      areas_of_interest: new Set([
        ...ctx.accumulated.areas_of_interest,
        ...response.matched_areas
      ]),
      use_cases_discussed: new Set([
        ...ctx.accumulated.use_cases_discussed,
        ...response.matched_use_cases
      ]),
      problems_mentioned: new Set([
        ...ctx.accumulated.problems_mentioned,
        ...response.matched_problems
      ]),
      user_constraints: mergeConstraints(
        ctx.accumulated.user_constraints,
        extractConstraints(newQuery)
      ),
      user_profile: updateProfile(ctx.accumulated.user_profile, newQuery),
      funnel_stage: updateFunnelStage(ctx, newTurn)
    },
    last_activity: new Date()
  }
}
```

### 8.3 Esempio Multi-turn

```
TURN 1
──────
User: "Ho problemi con i documenti dispersi"
Context: areas={knowledge}, problems={conoscenza-dispersa}
Response: RAG Knowledge Base (focus problema)

TURN 2
──────
User: "Come funziona tecnicamente?"
Context: SAME TOPIC, user_profile→technical
Response: RAG Knowledge Base (focus tecnico, architettura)

TURN 3
──────
User: "Quanto costa?"
Context: SAME TOPIC, funnel_stage→evaluation
Response: RAG KB + Stats + CTA Assessment
Chat extra: "Vuoi un preventivo personalizzato?"

TURN 4
──────
User: "E per il customer service?"
Context: TOPIC SWITCH, areas+={cx}
Response: Chatbot FAQ + Classificazione Ticket
Chat extra: "Vedo che ti interessa anche CX. Vuoi confrontarlo con Knowledge?"

TURN 5
──────
User: "Sì, confronta"
Context: intent=compare
Response: Tabella comparativa Knowledge vs CX
ESPLORA: Mostra pagina con entrambe le aree side-by-side
```

### 8.4 Gestione Contraddizioni

```typescript
function handleContradiction(
  ctx: ConversationContext,
  newQuery: string
): ContradictionResult | null {

  const newConstraints = extractConstraints(newQuery)

  for (const newC of newConstraints) {
    const existing = ctx.accumulated.user_constraints.find(
      c => c.type === newC.type && c.value !== newC.value
    )

    if (existing && existing.confidence > 0.7 && newC.confidence > 0.7) {
      return {
        type: newC.type,
        old_value: existing.value,
        new_value: newC.value,
        clarification_needed: true
      }
    }
  }

  return null
}

// Se trovata contraddizione, rispondi con:
// "Prima hai menzionato '{old}', ma ora dici '{new}'.
//  Quale situazione descrive meglio la tua realtà?"
```

---

## 9. Architettura Tecnica

### 9.1 Diagramma Completo

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (Next.js)                              │
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ SearchBar    │  │ AIOverview   │  │ PageEngine   │  │ BlockRenderer│ │
│  │              │→ │ Dropdown     │→ │              │→ │              │ │
│  │ (input)      │  │ (risposta)   │  │ (remodula)   │  │ (output)     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘ │
│         │                 │                 │                 │          │
│         └─────────────────┴─────────────────┴─────────────────┘          │
│                                    │                                      │
│                                    │ WebSocket / REST                     │
└────────────────────────────────────┼──────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                           BACKEND (FastAPI)                               │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                        Agent Orchestrator                            │ │
│  │                                                                      │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐    │ │
│  │  │ Intent     │  │ RAG        │  │ Summary    │  │ Decision   │    │ │
│  │  │ Parser     │→ │ Engine     │→ │ Engine     │→ │ Engine     │    │ │
│  │  │            │  │            │  │ (AI Overv) │  │ (PagePlan) │    │ │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘    │ │
│  │                                                                      │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│         │                 │                 │                 │          │
└─────────┼─────────────────┼─────────────────┼─────────────────┼──────────┘
          │                 │                 │                 │
          ▼                 ▼                 ▼                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                            DATA LAYER                                     │
│                                                                          │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐             │
│  │   ChromaDB     │  │   PostgreSQL   │  │     Redis      │             │
│  │   (Azure)      │  │   (Azure)      │  │   (Railway)    │             │
│  │                │  │                │  │                │             │
│  │ • Embeddings   │  │ • Use Cases    │  │ • Sessions     │             │
│  │ • Vectors      │  │ • Problems     │  │ • Cache        │             │
│  │ • Similarity   │  │ • Content      │  │ • Rate limit   │             │
│  └────────────────┘  └────────────────┘  └────────────────┘             │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Flusso Dati

```
1. User digita query
        ↓
2. Frontend invia POST /api/ai-overview
        ↓
3. Intent Parser classifica (explore/solve/compare/learn)
        ↓
4. RAG Engine cerca Use Case rilevanti in ChromaDB
        ↓
5. Summary Engine genera risposta breve (AI Overview)
        ↓
6. Decision Engine prepara PagePlan (per eventuale ESPLORA)
        ↓
7. Backend risponde con AIOverviewResponse
        ↓
8. Frontend mostra dropdown
        ↓
9. [Se ESPLORA] Frontend applica PagePlan
```

---

## 10. Schema Dati

### 10.1 AIOverviewResponse

```typescript
interface AIOverviewResponse {
  // Identificatori
  response_id: string
  session_id: string
  query: string
  timestamp: Date

  // Risposta principale (con link inline)
  summary: {
    // Testo con markup: **bold**, [link text](url), [[internal:use-case-id]]
    text: string

    // Link inline nella risposta
    inline_links: {
      text: string            // testo cliccabile
      type: "internal" | "external" | "scroll" | "page"
      target: string          // URL, anchor, o use_case_id
    }[]
  }

  // Use Case trovati
  matched_use_cases: {
    id: string
    name: string
    area: Area
    one_liner: string         // max 20 parole
    relevance_score: number   // 0-1
    icon: string
  }[]

  // KPI inline
  kpi_badges: {
    value: string
    label: string
  }[]

  // Contenuto espandibile (Mostra altro)
  expandable?: {
    how_it_works: {
      steps: { title: string; description: string }[]
    }
    detailed_kpi: {
      value: string
      label: string
      description: string
    }[]
    tech_stack?: string[]
  }

  // CTA
  cta: {
    esplora: {
      enabled: boolean
      label: string           // "ESPLORA", "Mostra", etc.
    }
    assessment: {
      enabled: boolean
      label: string
      urgency: "low" | "medium" | "high"
    }
  }

  // Page Plan (per ESPLORA)
  page_plan?: PagePlan

  // Suggerimenti (se risultato parziale)
  suggestions?: string[]

  // Metadata
  response_type: "good" | "partial" | "greeting" | "off_topic" | "fallback"
  processing_time_ms: number
}
```

### 10.2 PagePlan

```typescript
interface PagePlan {
  plan_id: string
  created_at: Date
  query: string

  // Cosa mostrare
  blocks: PageBlock[]

  // Modifiche all'hero
  hero_override?: {
    title: string
    subtitle: string
    show_problem?: string
  }

  // Blocchi da nascondere
  hidden_block_ids: string[]

  // Configurazione
  config: {
    scroll_to_first: boolean
    highlight_relevant: boolean
    show_back_button: boolean
    show_compare_option: boolean
  }
}

interface PageBlock {
  block_id: string
  block_type: BlockType
  content_id: string          // ID del Use Case o Problem

  position: number            // ordine nella pagina
  display_mode: DisplayMode   // compact | standard | expanded
  relevance_score: number     // 0-1

  highlight: boolean          // evidenziare con pulse?
  is_new: boolean             // animazione fade-in?
}

type BlockType =
  | "hero"
  | "problem-card"
  | "use-case-card"
  | "area-overview"
  | "stats"
  | "kpi-grid"
  | "comparison"
  | "cta"
  | "back-button"
```

### 10.3 Database Schema (PostgreSQL)

```sql
-- Use Cases
CREATE TABLE use_cases (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  area VARCHAR(20) NOT NULL,
  tagline VARCHAR(200),

  -- Componenti JSON
  components JSONB NOT NULL,

  -- Relazioni
  solves_problems VARCHAR(50)[] DEFAULT '{}',
  related_use_cases VARCHAR(50)[] DEFAULT '{}',

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Problems
CREATE TABLE problems (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  pain_points TEXT[],

  -- Soluzioni
  solved_by_use_cases VARCHAR(50)[] DEFAULT '{}',

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sessions (cache in Redis, backup in PostgreSQL)
CREATE TABLE sessions (
  session_id UUID PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  last_activity TIMESTAMP DEFAULT NOW(),

  -- Stato
  current_plan_id VARCHAR(50),
  conversation_context JSONB,

  -- Cleanup
  expires_at TIMESTAMP
);

-- Page Plans
CREATE TABLE page_plans (
  plan_id VARCHAR(50) PRIMARY KEY,
  session_id UUID REFERENCES sessions(session_id),
  query TEXT NOT NULL,

  plan_data JSONB NOT NULL,

  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 11. Componenti Frontend

### 11.1 Struttura Cartelle

```
src/
├── components/
│   ├── search/
│   │   ├── SearchBar.tsx           # Input principale
│   │   ├── AIOverviewDropdown.tsx  # Dropdown risposta
│   │   └── ExpandedContent.tsx     # "Mostra altro"
│   │
│   ├── blocks/
│   │   ├── BlockRenderer.tsx       # Orchestratore blocchi
│   │   ├── UseCaseCard.tsx         # Singolo Use Case
│   │   ├── ProblemCard.tsx         # Singolo Problema
│   │   ├── AreaOverview.tsx        # Overview area
│   │   ├── StatsGrid.tsx           # Griglia KPI
│   │   ├── ComparisonTable.tsx     # Confronto
│   │   └── CTABlock.tsx            # Call to action
│   │
│   ├── layout/
│   │   ├── Header.tsx              # Con SearchBar integrata
│   │   ├── DynamicPage.tsx         # Pagina rimodulabile
│   │   └── NavigationBar.tsx       # Back, History, Share
│   │
│   └── common/
│       ├── HighlightText.tsx       # Testo con bold
│       ├── KPIBadge.tsx            # Badge singolo KPI
│       └── EsploraButton.tsx        # Bottone ESPLORA
│
├── hooks/
│   ├── useAIOverview.ts            # Fetch + stato dropdown
│   ├── usePageRemodulation.ts      # Applica PagePlan
│   ├── useSession.ts               # Gestione sessione
│   └── useConversation.ts          # Contesto multi-turn
│
├── store/
│   ├── pageStore.ts                # Zustand - stato pagina
│   └── sessionStore.ts             # Zustand - sessione
│
└── lib/
    ├── api.ts                      # Client API
    └── animations.ts               # Configurazioni Framer Motion
```

### 11.2 Componente SearchBar

```tsx
// components/search/SearchBar.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Sparkles } from 'lucide-react'
import { AIOverviewDropdown } from './AIOverviewDropdown'
import { useAIOverview } from '@/hooks/useAIOverview'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    response,
    isLoading,
    isOpen,
    search,
    close
  } = useAIOverview()

  // Debounce search
  useEffect(() => {
    if (query.length < 3) return

    const timer = setTimeout(() => {
      search(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <div className="relative">
      {/* Search Input */}
      <div className={`
        flex items-center gap-3 px-4 py-3
        bg-gray-50 rounded-full
        border-2 transition-all duration-200
        ${isFocused ? 'border-primary-500 bg-white shadow-lg' : 'border-transparent'}
      `}>
        <Sparkles className="w-5 h-5 text-primary-500" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Cosa posso fare per te?"
          className="flex-1 bg-transparent outline-none text-gray-700"
        />

        {query && (
          <button onClick={() => { setQuery(''); close() }}>
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* AI Overview Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <AIOverviewDropdown
            response={response}
            isLoading={isLoading}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
```

### 11.3 Componente AIOverviewDropdown

```tsx
// components/search/AIOverviewDropdown.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ChevronDown, ChevronUp, Rocket } from 'lucide-react'
import { HighlightText } from '@/components/common/HighlightText'
import { KPIBadge } from '@/components/common/KPIBadge'
import { EsploraButton } from '@/components/common/EsploraButton'
import { ExpandedContent } from './ExpandedContent'
import { usePageRemodulation } from '@/hooks/usePageRemodulation'
import type { AIOverviewResponse } from '@/types'

interface AIOverviewDropdownProps {
  response: AIOverviewResponse | null
  isLoading: boolean
  onClose: () => void
}

export function AIOverviewDropdown({
  response,
  isLoading,
  onClose
}: AIOverviewDropdownProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { applyPlan } = usePageRemodulation()

  const handleEsplora = () => {
    if (response?.page_plan) {
      applyPlan(response.page_plan)
      onClose()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 mt-2
                 bg-white rounded-2xl shadow-2xl border border-gray-100
                 overflow-hidden z-50"
    >
      {isLoading ? (
        <LoadingState />
      ) : response ? (
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Header */}
            <div className="flex items-center gap-2 text-primary-500 mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">AI Overview</span>
            </div>

            {/* Summary */}
            <div className="text-gray-700 mb-4">
              <HighlightText
                text={response.summary.text}
                highlights={response.summary.highlights}
              />
            </div>

            {/* Use Cases */}
            <div className="space-y-3 mb-4">
              {response.matched_use_cases.map(uc => (
                <div key={uc.id} className="flex items-start gap-3">
                  <span className="text-2xl">{uc.icon}</span>
                  <div>
                    <span className="font-semibold text-dark-900">{uc.name}</span>
                    <span className="text-gray-500"> — {uc.one_liner}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* KPI Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {response.kpi_badges.map((kpi, i) => (
                <KPIBadge key={i} value={kpi.value} label={kpi.label} />
              ))}
            </div>

            {/* Expanded Content */}
            {isExpanded && response.expandable && (
              <ExpandedContent content={response.expandable} />
            )}

            {/* Expand Toggle */}
            {response.expandable && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-gray-500 hover:text-primary-500
                           text-sm mt-2"
              >
                {isExpanded ? (
                  <>Mostra meno <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>Mostra altro <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>

          {/* ESPLORA Sidebar */}
          {response.cta.esplora.enabled && (
            <div className="w-40 bg-gray-50 p-4 flex items-center justify-center">
              <EsploraButton
                label={response.cta.esplora.label}
                onClick={handleEsplora}
              />
            </div>
          )}
        </div>
      ) : null}
    </motion.div>
  )
}

function LoadingState() {
  return (
    <div className="p-6 flex items-center gap-3">
      <div className="animate-spin w-5 h-5 border-2 border-primary-500
                      border-t-transparent rounded-full" />
      <span className="text-gray-500">Sto cercando...</span>
    </div>
  )
}
```

### 11.4 Componente RichText (Link Inline)

```tsx
// components/common/RichText.tsx
'use client'

import Link from 'next/link'
import { usePageRemodulation } from '@/hooks/usePageRemodulation'

interface RichTextProps {
  text: string
  onInternalLink?: (useCaseId: string) => void
}

export function RichText({ text, onInternalLink }: RichTextProps) {
  const { scrollToSection, showUseCase } = usePageRemodulation()

  // Parse markup: **bold**, [[internal]], [[#anchor]], [[/page]], [ext](url)
  const parseText = (input: string) => {
    const parts: React.ReactNode[] = []
    let lastIndex = 0

    // Regex per tutti i tipi di markup
    const regex = /\*\*(.+?)\*\*|\[\[(.+?)\|(.+?)\]\]|\[(.+?)\]\((.+?)\)/g
    let match

    while ((match = regex.exec(input)) !== null) {
      // Testo prima del match
      if (match.index > lastIndex) {
        parts.push(input.slice(lastIndex, match.index))
      }

      if (match[1]) {
        // **bold**
        parts.push(<strong key={match.index} className="font-semibold text-dark-900">{match[1]}</strong>)
      }
      else if (match[2] && match[3]) {
        // [[target|text]]
        const target = match[2]
        const linkText = match[3]

        if (target.startsWith('#')) {
          // Scroll link
          parts.push(
            <button
              key={match.index}
              onClick={() => scrollToSection(target)}
              className="text-primary-500 underline hover:text-primary-600"
            >
              {linkText}
            </button>
          )
        }
        else if (target.startsWith('/')) {
          // Page link
          parts.push(
            <Link
              key={match.index}
              href={target}
              className="text-primary-500 underline hover:text-primary-600"
            >
              {linkText}
            </Link>
          )
        }
        else {
          // Internal Use Case link → mini ESPLORA
          parts.push(
            <button
              key={match.index}
              onClick={() => {
                showUseCase(target)
                onInternalLink?.(target)
              }}
              className="text-primary-500 underline hover:text-primary-600 font-medium"
            >
              {linkText}
            </button>
          )
        }
      }
      else if (match[4] && match[5]) {
        // [text](url) - external
        parts.push(
          <a
            key={match.index}
            href={match[5]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 underline hover:text-primary-600"
          >
            {match[4]}
          </a>
        )
      }

      lastIndex = match.index + match[0].length
    }

    // Testo dopo l'ultimo match
    if (lastIndex < input.length) {
      parts.push(input.slice(lastIndex))
    }

    return parts
  }

  return <span>{parseText(text)}</span>
}
```

**Uso nel dropdown:**
```tsx
<div className="text-gray-700 mb-4">
  <RichText
    text={response.summary.text}
    onInternalLink={(id) => console.log('Show use case:', id)}
  />
</div>
```

### 11.5 Componente EsploraButton

```tsx
// components/common/EsploraButton.tsx
'use client'

import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

interface EsploraButtonProps {
  label: string
  onClick: () => void
}

export function EsploraButton({ label, onClick }: EsploraButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4
                 bg-gradient-to-br from-primary-500 to-orange-600
                 text-white rounded-xl shadow-lg
                 hover:shadow-xl transition-shadow"
    >
      <Rocket className="w-8 h-8" />
      <span className="font-bold text-lg">{label}</span>
      <span className="text-xs text-orange-100">Mostra sulla pagina</span>
    </motion.button>
  )
}
```

---

## 12. API Endpoints

### 12.1 Endpoint Principali

```
POST /api/ai-overview
────────────────────
Request:
{
  "query": "customer service sovraccarico",
  "session_id": "uuid-xxx",
  "include_page_plan": true
}

Response:
{
  "response_id": "resp_xxx",
  "summary": { ... },
  "matched_use_cases": [ ... ],
  "page_plan": { ... },
  ...
}


POST /api/page-plan/apply
─────────────────────────
Request:
{
  "session_id": "uuid-xxx",
  "plan_id": "plan_xxx"
}

Response:
{
  "success": true,
  "blocks": [ ... ],
  "animations": { ... }
}


GET /api/session/{session_id}
─────────────────────────────
Response:
{
  "session_id": "uuid-xxx",
  "conversation_context": { ... },
  "plan_history": [ ... ]
}


POST /api/session/{session_id}/reset
────────────────────────────────────
Response:
{
  "success": true,
  "new_session_id": "uuid-yyy"
}
```

### 12.2 WebSocket (Opzionale, per streaming)

```
WS /ws/ai-overview
──────────────────

Client → Server:
{
  "type": "query",
  "query": "customer service sovraccarico"
}

Server → Client (streaming):
{
  "type": "chunk",
  "content": "UPGRAI risolve il "
}
{
  "type": "chunk",
  "content": "**customer service sovraccarico**"
}
{
  "type": "complete",
  "response": { ... full AIOverviewResponse }
}
```

---

## 13. Content Management (JSON)

### 13.1 Architettura Semplificata

**Niente PostgreSQL per i contenuti.** Tutto è JSON → Static HTML → Crawlabile.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│   content/                      BUILD TIME                       │
│   ├── use-cases/*.json    ───────────────►  Static HTML Pages   │
│   ├── problems/*.json                       (SSG Next.js)        │
│   └── areas/*.json                                               │
│                                                                  │
│         │                                        │               │
│         │                                        ▼               │
│         │                              ┌─────────────────┐       │
│         │                              │   /use-case/*   │       │
│         │                              │   /problema/*   │       │
│         │                              │   /area/*       │       │
│         │                              │                 │       │
│         │                              │  100% Crawlable │       │
│         │                              │  by Google/LLM  │       │
│         │                              └─────────────────┘       │
│         │                                                        │
│         ▼                                                        │
│   ┌───────────┐     RUNTIME                                      │
│   │  ChromaDB │ ◄── Embeddings per RAG (indicizza JSON)         │
│   └───────────┘                                                  │
│                                                                  │
│   ┌───────────┐                                                  │
│   │   Redis   │ ◄── Solo sessioni + cache                       │
│   └───────────┘                                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 13.2 Struttura Directory

```
UPGRAI-web/
├── content/
│   ├── use-cases/
│   │   ├── chatbot-faq.json
│   │   ├── rag-knowledge-base.json
│   │   ├── classificazione-ticket.json
│   │   └── ... (20 files)
│   │
│   ├── problems/
│   │   ├── customer-service-sovraccarico.json
│   │   ├── conoscenza-dispersa.json
│   │   └── ... (10 files)
│   │
│   ├── areas/
│   │   ├── knowledge.json
│   │   ├── customer-experience.json
│   │   ├── operations.json
│   │   ├── workflow.json
│   │   └── hr.json
│   │
│   └── site/
│       ├── homepage.json
│       └── navigation.json
│
├── public/
│   ├── robots.txt
│   ├── llms.txt
│   └── images/heroes/
│
└── app/
    ├── use-case/[slug]/page.tsx   → SSG da JSON
    ├── problema/[slug]/page.tsx   → SSG da JSON
    ├── area/[slug]/page.tsx       → SSG da JSON
    └── sitemap.ts                 → Genera da JSON
```

### 13.3 Schema JSON Use Case

```json
{
  "id": "chatbot-faq",
  "name": "Chatbot FAQ",
  "area": "cx",

  "hero": {
    "image": "chatbot-faq.jpg",
    "tagline": "Customer Experience",
    "title": "Chatbot FAQ",
    "subtitle": "Risposte automatiche 24/7 alle domande frequenti"
  },

  "mattoncini": [
    {
      "type": "problem",
      "title": "Il problema",
      "content": {
        "statement": "Il customer service è sovraccarico di domande ripetitive",
        "pain_points": [
          "60% delle richieste sono FAQ",
          "Tempi di attesa elevati",
          "Operatori frustrati su task ripetitivi"
        ]
      }
    },
    {
      "type": "solution",
      "title": "La soluzione",
      "content": {
        "overview": "AI che risponde automaticamente alle FAQ",
        "steps": [
          { "title": "Analisi", "description": "Analizza la domanda dell'utente" },
          { "title": "Ricerca", "description": "Cerca nella knowledge base" },
          { "title": "Risposta", "description": "Genera risposta naturale" }
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
        "description": "Il chatbot utilizza RAG per cercare risposte nella knowledge base.",
        "diagram": "chatbot-architecture.svg"
      }
    },
    {
      "type": "tech-stack",
      "title": "Tecnologie",
      "content": {
        "stack": ["LLM", "RAG", "Vector DB"],
        "integrations": ["Zendesk", "Freshdesk", "Intercom", "WhatsApp"]
      }
    },
    {
      "type": "related",
      "title": "Use Case correlati",
      "content": {
        "use_cases": ["classificazione-ticket", "copilot-operatore"]
      }
    },
    {
      "type": "cta",
      "title": "Inizia ora",
      "content": {
        "text": "Vuoi implementare Chatbot FAQ?",
        "button": "Richiedi Assessment Gratuito",
        "link": "#contact"
      }
    }
  ],

  "solves_problems": ["customer-service-sovraccarico"],
  "related_use_cases": ["classificazione-ticket", "copilot-operatore"],

  "seo": {
    "meta_title": "Chatbot FAQ AI per Customer Service | UPGRAI",
    "meta_description": "Riduci del 60% il carico del customer service con un chatbot AI. Risposte automatiche 24/7, accuracy ≥85%, setup in 15 giorni.",
    "keywords": ["chatbot", "FAQ", "customer service", "AI", "automazione"],
    "canonical": "/use-case/chatbot-faq"
  }
}
```

### 13.4 Schema JSON Problem

```json
{
  "id": "customer-service-sovraccarico",
  "name": "Customer service sovraccarico",
  "area": "cx",

  "hero": {
    "image": "support-overload.jpg",
    "tagline": "Il problema",
    "title": "Customer Service Sovraccarico",
    "subtitle": "Operatori impegnati su domande ripetitive invece che su casi complessi"
  },

  "mattoncini": [
    {
      "type": "problem",
      "title": "Sintomi comuni",
      "content": {
        "pain_points": [
          "Tempi di risposta oltre 24h",
          "Operatori frustrati",
          "Clienti insoddisfatti",
          "Costi in crescita"
        ]
      }
    },
    {
      "type": "solution",
      "title": "Le nostre soluzioni",
      "content": {
        "use_cases": ["chatbot-faq", "classificazione-ticket"]
      }
    }
  ],

  "solved_by": ["chatbot-faq", "classificazione-ticket"],

  "seo": {
    "meta_title": "Problema: Customer Service Sovraccarico | UPGRAI",
    "meta_description": "Risolvi il sovraccarico del customer service con soluzioni AI.",
    "canonical": "/problema/customer-service-sovraccarico"
  }
}
```

### 13.5 Schema JSON Area

```json
{
  "id": "cx",
  "name": "Customer Experience",
  "description": "Migliora l'esperienza dei tuoi clienti",
  "icon": "💬",
  "color": "orange",

  "hero": {
    "image": "customer-experience.jpg",
    "tagline": "Area di intervento",
    "title": "Customer Experience",
    "subtitle": "Soluzioni AI per migliorare l'esperienza cliente"
  },

  "use_cases": ["chatbot-faq", "classificazione-ticket", "copilot-operatore", "analisi-sentiment"],

  "seo": {
    "meta_title": "Customer Experience AI | UPGRAI",
    "meta_description": "4 Use Case AI per migliorare la customer experience.",
    "canonical": "/area/customer-experience"
  }
}
```

### 13.6 Lib per Leggere Content

```typescript
// lib/content.ts
import { readFile, readdir } from 'fs/promises'
import { join } from 'path'
import { cache } from 'react'

const CONTENT_DIR = join(process.cwd(), 'content')

export const getAllUseCases = cache(async () => {
  const dir = join(CONTENT_DIR, 'use-cases')
  const files = await readdir(dir)

  const useCases = await Promise.all(
    files
      .filter(f => f.endsWith('.json'))
      .map(async f => {
        const content = await readFile(join(dir, f), 'utf-8')
        return JSON.parse(content)
      })
  )

  return useCases
})

export const getUseCase = cache(async (slug: string) => {
  const path = join(CONTENT_DIR, 'use-cases', `${slug}.json`)
  const content = await readFile(path, 'utf-8')
  return JSON.parse(content)
})

export const getAllProblems = cache(async () => {
  const dir = join(CONTENT_DIR, 'problems')
  const files = await readdir(dir)

  return Promise.all(
    files
      .filter(f => f.endsWith('.json'))
      .map(async f => JSON.parse(await readFile(join(dir, f), 'utf-8')))
  )
})

export const getProblem = cache(async (slug: string) => {
  const path = join(CONTENT_DIR, 'problems', `${slug}.json`)
  return JSON.parse(await readFile(path, 'utf-8'))
})

export const getAllAreas = cache(async () => {
  const dir = join(CONTENT_DIR, 'areas')
  const files = await readdir(dir)

  return Promise.all(
    files
      .filter(f => f.endsWith('.json'))
      .map(async f => JSON.parse(await readFile(join(dir, f), 'utf-8')))
  )
})

export const getArea = cache(async (slug: string) => {
  const path = join(CONTENT_DIR, 'areas', `${slug}.json`)
  return JSON.parse(await readFile(path, 'utf-8'))
})
```

### 13.7 Pagine Statiche (SSG)

```typescript
// app/use-case/[slug]/page.tsx
import { getUseCase, getAllUseCases } from '@/lib/content'
import { UseCasePage } from '@/components/pages/UseCasePage'
import { generateUseCaseJsonLd } from '@/lib/seo'

// Genera tutte le pagine a build time
export async function generateStaticParams() {
  const useCases = await getAllUseCases()
  return useCases.map(uc => ({ slug: uc.id }))
}

// Meta tags
export async function generateMetadata({ params }) {
  const useCase = await getUseCase(params.slug)
  return {
    title: useCase.seo.meta_title,
    description: useCase.seo.meta_description,
    keywords: useCase.seo.keywords,
    alternates: {
      canonical: `https://upgrai.it${useCase.seo.canonical}`
    },
    openGraph: {
      title: useCase.seo.meta_title,
      description: useCase.seo.meta_description,
      images: [`/images/heroes/${useCase.hero.image}`],
    }
  }
}

// Pagina
export default async function Page({ params }) {
  const useCase = await getUseCase(params.slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateUseCaseJsonLd(useCase))
        }}
      />
      <UseCasePage useCase={useCase} />
    </>
  )
}
```

### 13.8 Indicizzazione RAG

```typescript
// scripts/index-rag.ts
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

const CONTENT_DIR = join(process.cwd(), 'content')

export async function indexAllContent() {
  const { ChromaClient } = await import('chromadb')
  const client = new ChromaClient({ path: process.env.CHROMA_URL })

  // Ricrea collection
  try {
    await client.deleteCollection({ name: 'upgrai-content' })
  } catch {}

  const collection = await client.createCollection({ name: 'upgrai-content' })

  // Indicizza Use Cases
  const useCases = await loadAllJson('use-cases')
  for (const uc of useCases) {
    const text = buildSearchableText(uc)

    await collection.add({
      ids: [`uc-${uc.id}`],
      documents: [text],
      metadatas: [{
        type: 'use-case',
        id: uc.id,
        name: uc.name,
        area: uc.area,
        url: `/use-case/${uc.id}`
      }]
    })
    console.log(`✓ Indexed: ${uc.name}`)
  }
}

function buildSearchableText(uc: any): string {
  const parts = [
    uc.name,
    uc.hero?.tagline,
    uc.hero?.subtitle,
  ]

  for (const m of uc.mattoncini || []) {
    if (m.type === 'problem') {
      parts.push(m.content?.statement)
      parts.push(...(m.content?.pain_points || []))
    }
    if (m.type === 'solution') {
      parts.push(m.content?.overview)
    }
  }

  parts.push(...(uc.seo?.keywords || []))

  return parts.filter(Boolean).join('\n')
}
```

---

## 14. SEO Strategy

### 14.1 Struttura URL

```
/                          → Homepage (statica, SSG)
/use-case/chatbot-faq      → Pagina Use Case (statica, SSG)
/use-case/rag-knowledge    → Pagina Use Case (statica, SSG)
/problema/cs-sovraccarico  → Pagina Problema (statica, SSG)
/area/customer-experience  → Pagina Area (statica, SSG)

La RIMODULAZIONE è un enhancement client-side,
non sostituisce le pagine statiche.
```

### 14.2 JSON-LD Structured Data

```typescript
// lib/seo.ts
export function generateUseCaseJsonLd(useCase: any) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": useCase.name,
    "description": useCase.seo.meta_description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Assessment gratuito"
    },
    "provider": {
      "@type": "Organization",
      "name": "UPGRAI",
      "url": "https://upgrai.it"
    },
    "featureList": useCase.mattoncini
      .find((m: any) => m.type === 'kpi')
      ?.content.metrics.map((m: any) => `${m.value} ${m.label}`)
  }
}
```

### 14.3 Sitemap Automatica

```typescript
// app/sitemap.ts
import { getAllUseCases, getAllProblems, getAllAreas } from '@/lib/content'

export default async function sitemap() {
  const useCases = await getAllUseCases()
  const problems = await getAllProblems()
  const areas = await getAllAreas()

  const baseUrl = 'https://upgrai.it'

  return [
    { url: baseUrl, priority: 1.0 },

    ...useCases.map(uc => ({
      url: `${baseUrl}/use-case/${uc.id}`,
      priority: 0.8,
    })),

    ...problems.map(p => ({
      url: `${baseUrl}/problema/${p.id}`,
      priority: 0.7,
    })),

    ...areas.map(a => ({
      url: `${baseUrl}/area/${a.id}`,
      priority: 0.7,
    })),
  ]
}
```

---

## 15. LLM & Robot Strategy

### 15.1 Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│   robots.txt     → Regole per crawler tradizionali              │
│   llms.txt       → Istruzioni per LLM (nuovo standard)          │
│   meta tags      → Direttive per pagina                         │
│   sitemap.xml    → Mappa contenuti                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 15.2 robots.txt

```txt
# /public/robots.txt

User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://upgrai.it/sitemap.xml
```

### 15.3 llms.txt (Nuovo Standard)

```txt
# /public/llms.txt
# UPGRAI - Framework AI per Aziende
# https://upgrai.it

> UPGRAI offre 20 Use Case AI standardizzati, pronti all'uso in 15 giorni.
> Accuracy ≥85%, latenza <5s, disponibilità 99%.

## Aree (5)
- Knowledge: RAG Knowledge Base, Estrazione Dati, Sintesi Riunioni, Due Diligence
- Customer Experience: Chatbot FAQ, Classificazione Ticket, Copilot Operatore, Analisi Sentiment
- Operations: Report Automatici, Ricerca Semantica, Anomaly Detection, Predictive Maintenance
- Workflow: Workflow Approval, Content Generation, Lead Scoring, Compliance Checker
- HR: Screening CV, Onboarding Assistant, Employee Self-Service, Performance Review

## Problemi che Risolviamo
- Conoscenza dispersa tra sistemi diversi
- Estrazione dati manuale da documenti
- Customer service sovraccarico
- Report manuali settimanali
- Anomalie scoperte in ritardo
- HR sovraccarico di task ripetitivi

## Link Principali
- Homepage: https://upgrai.it
- Use Cases: https://upgrai.it/use-case/
- Contatti: https://upgrai.it/#contact

## Citazione
UPGRAI - Framework AI con 20 Use Case pronti all'uso (https://upgrai.it)
```

### 15.4 Generazione Automatica llms.txt

```typescript
// scripts/generate-llms-txt.ts
async function generateLlmsTxt() {
  const useCases = await loadContent('use-case')
  const areas = await loadContent('area')

  const content = `# UPGRAI - Framework AI per Aziende
# https://upgrai.it
# Generato automaticamente il ${new Date().toISOString()}

> UPGRAI offre ${useCases.length} Use Case AI standardizzati, pronti all'uso in 15 giorni.
> Accuracy ≥85%, latenza <5s, disponibilità 99%.

## Aree (${areas.length})
${areas.map(a => {
  const areaUseCases = useCases.filter(uc => uc.area === a.id)
  return `- ${a.name}: ${areaUseCases.map(uc => uc.name).join(', ')}`
}).join('\n')}

## Use Cases (${useCases.length})
${useCases.map(uc => `- ${uc.name}: ${uc.hero?.subtitle || ''} → /use-case/${uc.id}`).join('\n')}

## Contatti
- Email: info@upgrai.it
- Assessment: https://upgrai.it/#contact

## Citazione
UPGRAI - Framework AI con ${useCases.length} Use Case pronti all'uso (https://upgrai.it)
`

  await writeFile(join(process.cwd(), 'public/llms.txt'), content)
  console.log('✓ public/llms.txt')
}
```

### 15.5 Schema Riassuntivo Crawler

```
UTENTE UMANO
└── Vede pagina dinamica, può usare chatbot + ESPLORA

GOOGLEBOT / BINGBOT
└── Crawla pagine statiche SSG, vede HTML completo
└── Legge sitemap.xml, robots.txt
└── Indicizza meta tags + JSON-LD

GPTBot / ClaudeBot / LLM
└── Legge llms.txt per contesto rapido
└── Crawla pagine statiche se permesso
└── Può citare UPGRAI con link
```

---

## 16. Claude Code Skills

### 16.1 Skill `/content` - Gestione Contenuti

```markdown
// .claude/commands/content.md

---
name: content
description: Gestisci contenuti UPGRAI (Use Cases, Problems, Areas)
---

# Skill: Gestione Contenuti UPGRAI

Sei un assistente per la gestione dei contenuti del framework UPGRAI.
I contenuti sono file JSON in `content/` e devono essere indicizzabili da Google e LLM.

## Struttura Directory

content/
├── use-cases/          # 20 Use Case AI
│   └── {slug}.json
├── problems/           # Problemi aziendali
│   └── {slug}.json
└── areas/              # 5 Aree di intervento
    └── {slug}.json

## Comandi Disponibili

Chiedi all'utente cosa vuole fare:

1. **Crea nuovo** - Use Case, Problema, o Area
2. **Modifica** - Aggiorna contenuto esistente
3. **Lista** - Mostra tutti i contenuti
4. **Valida** - Controlla errori nei JSON
5. **Genera** - Rigenera llms.txt, robots.txt

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
4. Genera il JSON completo con lo schema corretto
5. Scrivi il file con Write tool in content/use-cases/{slug}.json
6. Suggerisci di aggiungere l'immagine hero

### Se l'utente dice "modifica X":
1. Leggi il file JSON esistente con Read tool
2. Chiedi cosa vuole modificare
3. Applica le modifiche
4. Riscrivi il file con Write tool

### Se l'utente dice "lista":
1. Usa Glob per trovare tutti i file in content/
2. Leggi ogni file e mostra tabella riassuntiva

### Se l'utente dice "valida":
1. Leggi tutti i JSON
2. Verifica schema, links, immagini
3. Riporta errori e warning

### Se l'utente dice "genera":
1. Rigenera `public/llms.txt` con tutti i contenuti
2. Rigenera `public/robots.txt`
3. Conferma completamento
```

### 16.2 Skill `/content-update` - Aggiornamenti Massivi

```markdown
// .claude/commands/content-update.md

---
name: content-update
description: Aggiorna massivamente i contenuti UPGRAI
---

# Skill: Aggiornamento Massivo Contenuti

Permette di aggiornare più contenuti contemporaneamente.

## Comandi

### "aggiorna tutti i KPI"
Modifica i KPI in tutti gli Use Case.

### "aggiungi mattoncino X a tutti"
Aggiunge un nuovo tipo di mattoncino a tutti gli Use Case.

### "rinomina area X in Y"
Rinomina un'area e aggiorna tutti i riferimenti.

### "aggiungi keyword SEO X a tutti"
Aggiunge una keyword a tutti i contenuti.

### "rigenera meta description"
Rigenera automaticamente le meta description basandosi sul contenuto.

## Procedura

1. Leggi tutti i file interessati con Glob + Read
2. Mostra anteprima delle modifiche
3. Chiedi conferma all'utente
4. Applica modifiche con Edit/Write
5. Rigenera file derivati (llms.txt)

## Esempio: Aggiorna KPI

Utente: "aggiorna il KPI accuracy da 85% a 90% in tutti gli use case"

1. Glob "content/use-cases/*.json"
2. Per ogni file, trova mattoncino type=kpi
3. Trova metrica con label contenente "accuracy"
4. Cambia value da "≥85%" a "≥90%"
5. Mostra lista file che verranno modificati
6. Chiedi conferma
7. Scrivi modifiche
```

### 16.3 Skill `/content-ai` - Generazione con AI

```markdown
// .claude/commands/content-ai.md

---
name: content-ai
description: Genera contenuti UPGRAI con AI
---

# Skill: Generazione Contenuti AI

Genera automaticamente contenuti per nuovi Use Case basandosi sul contesto UPGRAI.

## Comandi

### "genera use case per {descrizione}"
Crea un nuovo Use Case completo partendo da una descrizione.

### "migliora testi di {use-case}"
Riscrive i testi per renderli più efficaci.

### "genera FAQ per {use-case}"
Crea domande frequenti per un Use Case.

## Stile UPGRAI

Quando generi contenuti, usa questo stile:
- **Tono**: Professionale ma accessibile
- **Focus**: Problemi concreti → Soluzioni misurabili
- **KPI**: Sempre quantificati (%, tempi, €)
- **CTA**: Sempre presente, orientato all'assessment

## Template Pain Points

Per generare pain points efficaci:
- "Il [processo] richiede [tempo/risorse] manuale"
- "[N]% delle [risorse] sono sprecate in [attività]"
- "Errori in [processo] costano [€/tempo/reputazione]"
- "[Stakeholder] sono frustrati da [problema]"

## Template Solution Steps

Per generare step soluzione:
1. **Acquisizione**: Come raccogliamo i dati
2. **Elaborazione**: Come l'AI processa
3. **Output**: Cosa ottiene l'utente

## Template Meta Description (max 160 char)

"[Verbo] [beneficio quantificato] con [nome use case]. [Vantaggio principale]. Setup in 15 giorni."

Esempio:
"Riduci del 60% il carico del customer service con Chatbot FAQ AI. Risposte automatiche 24/7 con accuracy ≥85%. Setup in 15 giorni."

## Esempio: Genera Use Case

Utente: "genera use case per sentiment analysis email"

1. Identifica area (cx)
2. Identifica problemi correlati (customer-service-sovraccarico)
3. Genera struttura completa:
   - ID: analisi-sentiment-email
   - Nome: Analisi Sentiment Email
   - Problema: difficoltà a capire il tono delle email clienti
   - Soluzione: classificazione automatica positivo/negativo/neutro
   - KPI: 90% accuracy, <2s elaborazione, prioritizzazione automatica
4. Genera JSON completo
5. Chiedi conferma
6. Scrivi file
```

### 16.4 Installazione Skills

```bash
# Crea directory skills
mkdir -p .claude/commands

# I file verranno creati automaticamente quando usi /content
```

### 16.5 Uso Skills

```bash
# In Claude Code
/content              # Gestione base contenuti
/content-update       # Aggiornamenti massivi
/content-ai           # Generazione con AI

# Esempi d'uso
> /content
> crea nuovo use case per analisi documenti legali

> /content-update
> aggiorna tutti i KPI accuracy a 90%

> /content-ai
> genera use case per traduzione automatica documenti
```

---

## 17. Prossimi Passi

### Fase 1: Content Setup
- [ ] Creare struttura directory `content/`
- [ ] Creare JSON per i 20 Use Case
- [ ] Creare JSON per i 10 Problemi
- [ ] Creare JSON per le 5 Aree
- [ ] Creare immagini hero per ogni contenuto

### Fase 2: Static Pages
- [ ] Implementare `lib/content.ts`
- [ ] Creare pagine SSG `/use-case/[slug]`
- [ ] Creare pagine SSG `/problema/[slug]`
- [ ] Creare pagine SSG `/area/[slug]`
- [ ] Implementare JSON-LD per ogni pagina

### Fase 3: SEO & LLM
- [ ] Creare `robots.txt`
- [ ] Creare `llms.txt`
- [ ] Implementare `sitemap.ts`
- [ ] Testare crawling con Google Search Console

### Fase 4: AI Overview
- [ ] Creare componente FloatingChatbot
- [ ] Creare componente AIOverviewDropdown
- [ ] Endpoint POST /api/ai-overview
- [ ] Integrare RAG con ChromaDB

### Fase 5: ESPLORA
- [ ] Componente EsploraButton
- [ ] Hook usePageRemodulation
- [ ] Animazioni Framer Motion
- [ ] Persistenza sessione Redis

### Fase 6: Claude Code Skills
- [ ] Creare `.claude/commands/content.md`
- [ ] Creare `.claude/commands/content-update.md`
- [ ] Creare `.claude/commands/content-ai.md`
- [ ] Testare workflow di creazione contenuti

---

## Appendice: Glossario

| Termine | Definizione |
|---------|-------------|
| **AI Overview** | Risposta breve in dropdown, stile Google |
| **ESPLORA** | Bottone che attiva la rimodulazione pagina ("Mostra sulla pagina") |
| **Page Remodulation** | Riorganizzazione dinamica della pagina |
| **PagePlan** | Schema che definisce come riorganizzare la pagina |
| **Block/Mattoncino** | Unità componibile della pagina (Use Case, Problem, etc.) |
| **Turn** | Singolo scambio domanda-risposta |
| **Topic Switch** | Quando l'utente cambia argomento |
| **Funnel Stage** | Fase del percorso utente (discovery → evaluation → decision) |
| **SSG** | Static Site Generation - pagine pre-generate a build time |
| **llms.txt** | File per istruire LLM crawler sul contenuto del sito |
| **RAG** | Retrieval Augmented Generation - ricerca + generazione |

---

## Appendice: Riepilogo Architettura

| Componente | Tecnologia | Scopo |
|------------|------------|-------|
| **Content** | JSON files in Git | Source of truth, versionato |
| **Pages** | Next.js SSG | 100% static, crawlable |
| **Search** | ChromaDB | RAG per chatbot |
| **Sessions** | Redis | Cache + sessioni utente |
| **SEO** | sitemap.xml + robots.txt + JSON-LD | Google/Bing |
| **LLM** | llms.txt + pagine statiche | GPT/Claude crawlers |
| **Content Mgmt** | Claude Code Skills | Gestione contenuti via chat |
