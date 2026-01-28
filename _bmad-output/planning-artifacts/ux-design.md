---
stepsCompleted: [1, 2, 3, 4]
status: 'complete'
project_name: 'UPGRAI'
date: '2026-01-28'
inspiration: 'totheweb.com'
layoutApproach: 'dynamic-sections'
chatPosition: 'floating-center-bottom'
---

# UX Design Document - UPGRAI

**Project:** UPGRAI - Landing Page con Page Remodulation
**Date:** 2026-01-28
**Inspiration:** totheweb.com (chatbot header pattern)

## 1. Design Philosophy

### Core Principles

| Principle | Implementation |
|-----------|----------------|
| **La pagina È la risposta** | No chat panel separato, i blocchi si rimodulano |
| **Layout dinamico** | Sezioni fluide, no griglie rigide |
| **Chat prominente** | Floating center-bottom, sempre accessibile |
| **Contenuto contestuale** | Hero, CTA, testimonial cambiano con la query |
| **Mobile-first** | Responsive, chat adattivo |

### User Mental Model

```
Utente arriva → Vede landing professionale
       ↓
Nota chat floating → "Posso chiedere qualcosa"
       ↓
Fa domanda → Pagina si TRASFORMA
       ↓
Vede contenuti rilevanti → Capisce il valore
       ↓
CTA contestuale → Converte
```

## 2. Layout Structure

### 2.1 Viewport Zones

```
┌─────────────────────────────────────────────────┐
│                  HEADER ZONE                    │  fixed top
│                   (64px)                        │
├─────────────────────────────────────────────────┤
│                                                 │
│                                                 │
│                                                 │
│               CONTENT ZONE                      │  scrollable
│            (dynamic height)                     │
│                                                 │
│                                                 │
│                                                 │
├─────────────────────────────────────────────────┤
│              CHAT FLOAT ZONE                    │  fixed bottom 15%
│                  (80px)                         │
├─────────────────────────────────────────────────┤
│                 FOOTER ZONE                     │  below chat
│                  (200px)                        │
└─────────────────────────────────────────────────┘
```

### 2.2 Header Component

```
┌─────────────────────────────────────────────────┐
│  [UPGRAI Logo]                    [Nav]    [☰] │
│                                                 │
│  Logo: 120px width                              │
│  Nav: Features | Use Cases | Contatti           │
│  Mobile: Hamburger menu                         │
└─────────────────────────────────────────────────┘
```

**Specs:**
- Height: 64px
- Background: white / glassmorphism on scroll
- Position: fixed top
- z-index: 1000

### 2.3 Chat Floating Component

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ┌─────────────────────────────────────────────┐   │
│   │  🔮                                         │   │
│   │  ┌─────────────────────────────────────┐    │   │
│   │  │ Cosa vuoi sapere su UPGRAI?     │ ➤ │    │   │
│   │  └─────────────────────────────────────┘    │   │
│   │  Es: "Soluzioni PMI" • "Use case retail"    │   │
│   └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Specs:**
- Position: fixed
- Bottom: 15% viewport
- Left: 50%, transform: translateX(-50%)
- Width: min(600px, 90vw)
- Background: rgba(255,255,255,0.95)
- Backdrop-filter: blur(20px)
- Border-radius: 16px
- Box-shadow: 0 8px 32px rgba(0,0,0,0.12)
- z-index: 900

**States:**

| State | Appearance |
|-------|------------|
| **Default** | Placeholder text, subtle glow |
| **Focus** | Border highlight, suggestions appear |
| **Loading** | Shimmer animation, "Rimodulando..." |
| **With Query** | Query visible, X to clear |

## 3. Page Sections (Dynamic)

### 3.1 Hero Section

**Default State:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│         [Tagline piccolo]                       │
│                                                 │
│   HEADLINE GRANDE SU                            │
│   DUE O TRE RIGHE                              │
│                                                 │
│         [CTA Primario]  [CTA Secondario]        │
│                                                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Remodulated State (es. query "PMI"):**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│         Soluzioni per le PMI                    │
│                                                 │
│   TRASFORMA LA TUA PMI                          │
│   CON L'INTELLIGENZA ARTIFICIALE               │
│                                                 │
│         [Demo per PMI]  [Scopri Use Case]       │
│                                                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Specs:**
- Min-height: 60vh (desktop), 50vh (mobile)
- Padding: 120px top (per header), 80px bottom
- Background: gradient subtle o immagine
- Headline: font-size 48-64px, font-weight 700
- Animation: fade + slide su remodulation

### 3.2 Value Proposition Section

**Layout:** Alternating image + text

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌──────────────┐                               │
│  │              │    TITOLO FEATURE             │
│  │   [IMAGE]    │                               │
│  │              │    Descrizione del valore     │
│  │              │    che questa feature porta   │
│  └──────────────┘    al cliente...              │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│                      ┌──────────────┐           │
│    TITOLO FEATURE    │              │           │
│                      │   [IMAGE]    │           │
│    Descrizione...    │              │           │
│                      │              │           │
│                      └──────────────┘           │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Specs:**
- Image: 45% width, aspect-ratio 4:3
- Text: 55% width
- Gap: 64px
- Mobile: Stack vertical

### 3.3 Use Case Cards Section

**Default - Horizontal Scroll o Grid fluido:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│   Use Case in Evidenza                          │
│   ─────────────────────                         │
│                                                 │
│   ┌───────────┐ ┌───────────┐ ┌───────────┐    │
│   │  RETAIL   │ │  MANUFAC. │ │  SERVICE  │    │
│   │           │ │           │ │           │    │
│   │  Brief... │ │  Brief... │ │  Brief... │    │
│   │      →    │ │      →    │ │      →    │    │
│   └───────────┘ └───────────┘ └───────────┘    │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Remodulated - Rilevante espanso:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│   Use Case per Te                               │
│   ─────────────────                             │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │  ⭐ RETAIL                              │   │
│   │                                         │   │
│   │  Descrizione estesa del use case...     │   │
│   │                                         │   │
│   │  • Benefit 1                            │   │
│   │  • Benefit 2                            │   │
│   │  • Benefit 3                            │   │
│   │                                         │   │
│   │  [Scopri di più]  [Richiedi Demo]       │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   ┌─────────┐ ┌─────────┐                       │
│   │ MANUFAC.│ │ SERVICE │  Altri settori       │
│   │    →    │ │    →    │                       │
│   └─────────┘ └─────────┘                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Specs:**
- Card default: 320px width, 240px height
- Card expanded: 100% width, auto height
- Border-radius: 12px
- Hover: subtle lift + shadow
- Transition: 0.3s ease-out

### 3.4 Testimonial Section

**Full-width quote:**
```
┌─────────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░                                            ░░│
│░░   "Quote del cliente che descrive         ░░│
│░░    il valore ricevuto da UPGRAI"          ░░│
│░░                                            ░░│
│░░              — Nome, Ruolo, Azienda        ░░│
│░░                                            ░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└─────────────────────────────────────────────────┘
```

**Specs:**
- Background: brand color gradient
- Padding: 80px vertical
- Quote font: 24-32px, italic
- Attribution: 16px, regular
- Remodulation: mostra testimonial del settore richiesto

### 3.5 Features List Section

**Non cards, ma lista elegante:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│   Le nostre Capabilities                        │
│                                                 │
│   ◆ RAG Avanzato                               │
│     Retrieval semantico sui tuoi documenti      │
│                                                 │
│   ◆ Page Remodulation                          │
│     Layout che si adatta alle domande           │
│                                                 │
│   ◆ Lead Generation                            │
│     Form intelligenti contestuali               │
│                                                 │
│   ◆ Analytics                                  │
│     Insights sulle interazioni                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Specs:**
- Icon: 24px, brand color
- Title: 20px, bold
- Description: 16px, gray-600
- Spacing: 32px between items
- Remodulation: riordina per rilevanza

### 3.6 CTA Section

**Pre-footer call to action:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│         Pronto a trasformare                    │
│         il tuo business?                        │
│                                                 │
│         ┌─────────────────────────┐             │
│         │      CONTATTACI         │             │
│         └─────────────────────────┘             │
│                                                 │
│         oppure chiedi nel chat ↓                │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Remodulated:**
- CTA text cambia: "Richiedi Demo per [settore]"
- Subtitle contestuale

## 4. Page Remodulation Behavior

### 4.1 Trigger Flow

```
User Input → Backend Analysis → Page Plan JSON → Frontend Remodulation
    │              │                  │                   │
    │              │                  │                   │
    ▼              ▼                  ▼                   ▼
  Query      Intent Detection    Block Priority      Framer Motion
  "PMI"      sector: "pmi"       [useCase_pmi,       animate layout
             size: "small"        feature_scale,     transitions
                                  testimonial_pmi]
```

### 4.2 Animation Specs

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Hero text | fadeIn + slideUp | 400ms | ease-out |
| Use Case expand | height + opacity | 500ms | spring |
| Cards reorder | layoutId (Framer) | 300ms | ease-in-out |
| Testimonial swap | crossfade | 400ms | ease |
| Features reorder | stagger 50ms | 300ms | ease-out |

### 4.3 Loading State

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   [Shimmer skeleton hero]                       │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│╔═══════════════════════════════════════════════╗│
│║  🔮 Rimodulando la pagina...              ◌  ║│
│╚═══════════════════════════════════════════════╝│
│                                                 │
└─────────────────────────────────────────────────┘
```

- Skeleton shimmer sui blocchi
- Spinner nel chat
- Duration: max 500ms (NFR-P3)

## 5. Lead Form Design

### 5.1 Form Appearance

**Triggered by CTA or contextual:**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│   Richiedi informazioni                         │
│   ─────────────────────                         │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │ Nome *                                  │   │
│   └─────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────┐   │
│   │ Email *                                 │   │
│   └─────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────┐   │
│   │ Azienda                                 │   │
│   └─────────────────────────────────────────┘   │
│   ┌─────────────────────────────────────────┐   │
│   │ Messaggio                               │   │
│   │                                         │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │             INVIA RICHIESTA             │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 5.2 Form Placement Options

| Trigger | Placement |
|---------|-----------|
| CTA button click | Modal overlay |
| Scroll to section | Inline in page |
| Post-remodulation | Contextual inline |

### 5.3 Form States

| State | Behavior |
|-------|----------|
| Default | Empty fields, placeholder text |
| Focus | Label floats, border highlight |
| Error | Red border, error message below |
| Submitting | Button disabled, spinner |
| Success | Green check, thank you message |

## 6. Responsive Design

### 6.1 Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Stack, hamburger menu |
| Tablet | 640-1024px | 2 columns, compact chat |
| Desktop | > 1024px | Full layout |

### 6.2 Mobile Adaptations

**Chat Floating - Mobile:**
```
┌───────────────────────┐
│ UPGRAI            ☰   │
├───────────────────────┤
│                       │
│  Hero content         │
│  stacked              │
│                       │
│  ┌─────────────────┐  │
│  │   Use Case 1    │  │
│  └─────────────────┘  │
│  ┌─────────────────┐  │
│  │   Use Case 2    │  │
│  └─────────────────┘  │
│                       │
│╔═════════════════════╗│
│║ 🔮 Chiedi...     ➤ ║│  ← Più compatto
│╚═════════════════════╝│
│                       │
│  Footer               │
└───────────────────────┘
```

**Mobile Chat Specs:**
- Width: 95vw
- Bottom: 10%
- Font-size: 16px (prevent zoom)
- Height: 56px

### 6.3 Touch Interactions

| Element | Touch Behavior |
|---------|----------------|
| Chat input | Tap to focus, keyboard up |
| Cards | Tap to expand, swipe to dismiss |
| Menu | Hamburger → slide-in drawer |
| Form | Large touch targets (44px min) |

## 7. Color System

### 7.1 Brand Colors

```
Primary:    #6366F1 (Indigo 500) - CTA, links, accents
Secondary:  #8B5CF6 (Violet 500) - Gradients, highlights
Background: #FFFFFF - Main bg
Surface:    #F9FAFB - Cards, sections
Text:       #111827 - Headings
Text-muted: #6B7280 - Body, descriptions
Border:     #E5E7EB - Dividers, inputs
Success:    #10B981 - Confirmations
Error:      #EF4444 - Errors
```

### 7.2 Chat Floating Colors

```
Background: rgba(255, 255, 255, 0.95)
Border:     rgba(99, 102, 241, 0.2)
Shadow:     0 8px 32px rgba(99, 102, 241, 0.15)
Icon:       #6366F1
Placeholder: #9CA3AF
Input bg:   #F3F4F6
```

### 7.3 Remodulation Highlight

```
Relevant badge:  #FEF3C7 bg, #D97706 text (amber)
Star icon:       #F59E0B
Expanded card:   subtle indigo border glow
```

## 8. Typography

### 8.1 Font Stack

```css
--font-heading: 'Inter', -apple-system, sans-serif;
--font-body: 'Inter', -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### 8.2 Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Hero) | 48-64px | 700 | 1.1 |
| H2 (Section) | 32-40px | 600 | 1.2 |
| H3 (Card title) | 24px | 600 | 1.3 |
| Body | 16-18px | 400 | 1.6 |
| Small | 14px | 400 | 1.5 |
| Chat input | 16px | 400 | 1.4 |

## 9. Iconography

### 9.1 Icon Style

- Style: Outline, 1.5px stroke
- Size: 20-24px
- Library: Lucide React (recommended)

### 9.2 Key Icons

| Purpose | Icon |
|---------|------|
| Chat/AI | Sparkles, MessageSquare |
| Send | ArrowRight, Send |
| Clear | X |
| Expand | ChevronRight |
| Star/Relevant | Star |
| Menu | Menu |
| Close | X |

## 10. Accessibility (WCAG 2.1 AA)

### 10.1 Requirements

| Requirement | Implementation |
|-------------|----------------|
| NFR-A1 WCAG 2.1 AA | Full compliance |
| NFR-A2 Contrast 4.5:1 | All text passes |
| NFR-A3 Form labels | Proper labeling + ARIA |
| NFR-A4 Keyboard nav | Tab order, focus visible |
| NFR-A5 Screen reader | ARIA live regions |

### 10.2 Chat Accessibility

```html
<div
  role="search"
  aria-label="Chat con UPGRAI AI"
>
  <input
    type="text"
    aria-label="Scrivi la tua domanda"
    aria-describedby="chat-hints"
  />
  <button aria-label="Invia domanda">
    <SendIcon aria-hidden="true" />
  </button>
</div>
<div id="chat-hints" class="sr-only">
  Esempio: Soluzioni PMI, Use case retail
</div>

<!-- Remodulation announcement -->
<div
  role="status"
  aria-live="polite"
  aria-label="Pagina rimodulata per: PMI"
/>
```

### 10.3 Focus Management

- Chat input: auto-focus on page load (optional)
- After remodulation: focus on first changed element
- Skip link: "Vai al contenuto principale"
- Focus trap in modal form

## 11. Component Inventory

### 11.1 Core Components

| Component | File | Description |
|-----------|------|-------------|
| Header | `Header.tsx` | Logo + Nav + Mobile menu |
| ChatFloat | `ChatFloat.tsx` | Floating chat input |
| Hero | `Hero.tsx` | Dynamic hero section |
| UseCase | `UseCase.tsx` | Expandable use case card |
| Feature | `Feature.tsx` | Feature list item |
| Testimonial | `Testimonial.tsx` | Quote section |
| LeadForm | `LeadForm.tsx` | Contact form |
| Footer | `Footer.tsx` | Footer links |

### 11.2 UI Primitives

| Component | Purpose |
|-----------|---------|
| Button | Primary, Secondary, Ghost variants |
| Input | Text, Email, Textarea |
| Card | Container with shadow |
| Badge | Relevance indicator |
| Skeleton | Loading placeholder |
| Modal | Overlay container |

## 12. Interaction Patterns

### 12.1 Chat Flow

```
1. User sees floating chat
2. User clicks/taps input
3. Input expands slightly, suggestions appear
4. User types query
5. User presses Enter or clicks send
6. Loading state (shimmer + spinner)
7. Page remodulates with animation
8. Query remains visible in chat
9. User can clear (X) to reset
```

### 12.2 Reset Flow

```
1. User clicks X in chat
2. Confirmation: "Tornare alla pagina originale?"
3. If yes: reverse animation, reset to default
4. If no: keep current state
```

### 12.3 Error Handling

| Error | User Feedback |
|-------|---------------|
| AI timeout | "Sistema AI temporaneamente non disponibile. Esplora la pagina manualmente." |
| No results | "Non ho trovato contenuti specifici. Prova una domanda diversa." |
| Network error | "Errore di connessione. Riprova." |

## 13. Performance Targets

| Metric | Target | Implementation |
|--------|--------|----------------|
| LCP | < 3s | SSG, image optimization |
| TTI | < 5s | Code splitting, lazy load |
| Remodulation | < 500ms | Optimistic UI, cached data |
| Chat response | < 10s | Streaming, timeout handling |

## 14. Figma/Design Handoff Notes

### 14.1 Key Screens to Design

1. **Landing - Default State** (Desktop + Mobile)
2. **Landing - Post Remodulation** (Desktop + Mobile)
3. **Chat States** (Default, Focus, Loading, With Query)
4. **Lead Form** (Modal + Inline variants)
5. **Error States** (AI unavailable, network error)
6. **Loading States** (Skeleton, spinner)

### 14.2 Animation Prototypes

1. Page remodulation transition
2. Card expand/collapse
3. Chat input focus
4. Form submission feedback

---

## Appendix: Wireframe Summary

### Desktop - Default
```
┌─────────────────────────────────────────────────┐
│ UPGRAI                              Nav      ☰  │
├─────────────────────────────────────────────────┤
│                    HERO                         │
│            Headline + CTA                       │
├─────────────────────────────────────────────────┤
│  [Image]     Value Prop Text                    │
│              Value Prop Text      [Image]       │
├─────────────────────────────────────────────────┤
│  Use Case Cards (horizontal)                    │
├─────────────────────────────────────────────────┤
│  ░░░░░░░░ Testimonial Quote ░░░░░░░░           │
├─────────────────────────────────────────────────┤
│  Features List                                  │
│╔═══════════════════════════════════════════════╗│
│║        🔮 Chat Floating Input              ➤ ║│
│╚═══════════════════════════════════════════════╝│
├─────────────────────────────────────────────────┤
│  CTA Section                                    │
├─────────────────────────────────────────────────┤
│  Footer                                         │
└─────────────────────────────────────────────────┘
```

### Desktop - Remodulated
```
┌─────────────────────────────────────────────────┐
│ UPGRAI                              Nav      ☰  │
├─────────────────────────────────────────────────┤
│              HERO CONTESTUALE                   │
│         Headline Specifico + CTA                │
├─────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐    │
│  │  ⭐ USE CASE RILEVANTE (expanded)       │    │
│  └─────────────────────────────────────────┘    │
│  [altri use case piccoli]                       │
├─────────────────────────────────────────────────┤
│  ░░░░░░ Testimonial Settore Specifico ░░░░░░   │
├─────────────────────────────────────────────────┤
│  Features Riordinate per Rilevanza              │
│╔═══════════════════════════════════════════════╗│
│║  🔮 "Query utente"                        ✕ ➤║│
│╚═══════════════════════════════════════════════╝│
├─────────────────────────────────────────────────┤
│  CTA Contestuale                                │
├─────────────────────────────────────────────────┤
│  Footer                                         │
└─────────────────────────────────────────────────┘
```

---

**Document Status:** Complete
**Next Step:** Implementation (Epic 1)
