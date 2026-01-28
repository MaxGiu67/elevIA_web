# Guida Tecnica: Frontend Next.js + Page Plan per Siti Agentici

**Versione 1.0 - Gennaio 2026**

---

## Indice

1. [Panoramica e Obiettivi](#1-panoramica-e-obiettivi)
2. [Struttura del Progetto Next.js](#2-struttura-del-progetto-nextjs)
3. [Rendering dei Contenuti Markdown](#3-rendering-dei-contenuti-markdown)
4. [Sistema Page Plan: Architettura](#4-sistema-page-plan-architettura)
5. [Componenti Building Blocks](#5-componenti-building-blocks)
6. [Chat Widget: Implementazione](#6-chat-widget-implementazione)
7. [Gestione Stato e Context](#7-gestione-stato-e-context)
8. [SEO: Best Practices](#8-seo-best-practices)
9. [Multilingua IT/EN](#9-multilingua-iten)
10. [Performance e Ottimizzazioni](#10-performance-e-ottimizzazioni)
11. [Esempi di Codice Completi](#11-esempi-di-codice-completi)

---

## 1. Panoramica e Obiettivi

### 1.1 Cosa Costruiamo

Un frontend Next.js che:

- **Renderizza pagine SEO-perfect** da file Markdown (SSG/SSR)
- **Integra una chat agentica** nell'header con streaming delle risposte
- **Supporta il Page Plan**: personalizzazione dinamica della landing basata sull'intent dell'utente
- **Mantiene la SEO intatta**: le varianti agentiche non compromettono l'indicizzazione
- **Gestisce multilingua** IT/EN con hreflang e URL dedicati

### 1.2 Principi Architetturali

```
┌─────────────────────────────────────────────────────────────────┐
│                         PRINCIPI                                 │
├─────────────────────────────────────────────────────────────────┤
│  1. SEO First: HTML completo al primo render (SSG/SSR)          │
│  2. Progressive Enhancement: chat e personalizzazione sono      │
│     "on top" del contenuto statico                              │
│  3. Canonical Stability: URL e canonical non cambiano mai       │
│     con le varianti agentiche                                   │
│  4. Graceful Degradation: se l'API AI è down, il sito          │
│     funziona perfettamente come portale statico                 │
│  5. Component-Driven: blocchi riusabili per contenuti e UI      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Struttura del Progetto Next.js

### 2.1 Directory Structure (App Router - Next.js 14+)

```
apps/web/
├── app/
│   ├── [lang]/                      # Route dinamica per lingua
│   │   ├── layout.tsx               # Layout con header/footer
│   │   ├── page.tsx                 # Homepage
│   │   ├── [slug]/
│   │   │   └── page.tsx             # Pagine generiche
│   │   ├── articles/
│   │   │   ├── page.tsx             # Lista articoli
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Singolo articolo
│   │   ├── faq/
│   │   │   └── page.tsx             # Pagina FAQ
│   │   └── contatti/
│   │       └── page.tsx             # Form contatti
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts             # Webhook per ISR on-demand
│   ├── layout.tsx                   # Root layout
│   └── globals.css
├── components/
│   ├── blocks/                      # Building blocks per Page Plan
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTA.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CaseStudy.tsx
│   │   └── index.ts                 # Export centralizzato
│   ├── chat/
│   │   ├── ChatWidget.tsx           # Widget chat principale
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessages.tsx
│   │   ├── ChatSources.tsx
│   │   └── useChatStream.ts         # Hook per streaming
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── seo/
│   │   ├── JsonLd.tsx               # Schema.org components
│   │   └── MetaTags.tsx
│   └── ui/                          # Componenti UI base
│       ├── Button.tsx
│       ├── Input.tsx
│       └── ...
├── lib/
│   ├── content/
│   │   ├── loader.ts                # Carica e parsa Markdown
│   │   ├── types.ts                 # Tipi per contenuti
│   │   └── utils.ts
│   ├── api/
│   │   └── chat.ts                  # Client API per chat
│   ├── hooks/
│   │   ├── usePagePlan.ts
│   │   └── useLanguage.ts
│   └── utils/
│       └── seo.ts
├── content/                         # Contenuti Markdown (può essere in root)
│   ├── it/
│   │   ├── pages/
│   │   ├── articles/
│   │   └── faq/
│   └── en/
│       ├── pages/
│       ├── articles/
│       └── faq/
├── public/
│   ├── images/
│   ├── robots.txt
│   └── sitemap.xml                  # Generato a build time
├── next.config.js
├── tailwind.config.js
└── package.json
```

### 2.2 Dipendenze Principali

```json
{
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "gray-matter": "^4.0.3",
    "remark": "^15.0.0",
    "remark-html": "^16.0.0",
    "rehype-highlight": "^7.0.0",
    "next-intl": "^3.0.0",
    "zustand": "^4.5.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0"
  }
}
```

---

## 3. Rendering dei Contenuti Markdown

### 3.1 Content Loader

```typescript
// lib/content/loader.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { ContentItem, ContentFrontmatter, Language } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Carica un singolo file Markdown con front-matter
 */
export async function getContent(
  lang: Language,
  type: 'pages' | 'articles' | 'faq',
  slug: string
): Promise<ContentItem | null> {
  const filePath = path.join(CONTENT_DIR, lang, type, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  // Converti Markdown in HTML
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content);

  return {
    frontmatter: data as ContentFrontmatter,
    content: processedContent.toString(),
    rawContent: content,
  };
}

/**
 * Ottieni tutti i contenuti di un tipo per una lingua
 */
export async function getAllContent(
  lang: Language,
  type: 'pages' | 'articles' | 'faq'
): Promise<ContentItem[]> {
  const dir = path.join(CONTENT_DIR, lang, type);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  const contents = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace('.md', '');
      return getContent(lang, type, slug);
    })
  );

  return contents.filter((c): c is ContentItem => c !== null);
}

/**
 * Genera static params per SSG
 */
export async function getContentSlugs(
  lang: Language,
  type: 'pages' | 'articles' | 'faq'
): Promise<string[]> {
  const dir = path.join(CONTENT_DIR, lang, type);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
}
```

### 3.2 Tipi TypeScript

```typescript
// lib/content/types.ts
export type Language = 'it' | 'en';

export interface ContentFrontmatter {
  id: string;
  type: 'page' | 'article' | 'faq';
  lang: Language;
  title: string;
  description: string;
  slug: string;
  canonical: string;
  alternate?: Record<Language, string>;
  tags?: string[];
  published_at?: string;
  updated_at?: string;
  hero_image?: string;
  draft?: boolean;
}

export interface ContentItem {
  frontmatter: ContentFrontmatter;
  content: string;      // HTML renderizzato
  rawContent: string;   // Markdown originale
}

export interface PagePlan {
  variant_id: string;
  blocks: PageBlock[];
}

export interface PageBlock {
  type: BlockType;
  props?: Record<string, any>;
  content_ref?: string;  // Riferimento a contenuto Markdown
}

export type BlockType =
  | 'Hero'
  | 'Features'
  | 'FAQ'
  | 'CTA'
  | 'Testimonials'
  | 'CaseStudy'
  | 'ArticleList'
  | 'Newsletter'
  | 'RichText';
```

### 3.3 Pagina con SSG

```typescript
// app/[lang]/articles/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent, getContentSlugs } from '@/lib/content/loader';
import { Language } from '@/lib/content/types';
import { ArticleJsonLd } from '@/components/seo/JsonLd';

interface Props {
  params: {
    lang: Language;
    slug: string;
  };
}

// Genera le pagine statiche a build time
export async function generateStaticParams() {
  const languages: Language[] = ['it', 'en'];
  const params: { lang: Language; slug: string }[] = [];

  for (const lang of languages) {
    const slugs = await getContentSlugs(lang, 'articles');
    slugs.forEach(slug => {
      params.push({ lang, slug });
    });
  }

  return params;
}

// Genera metadata SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await getContent(params.lang, 'articles', params.slug);

  if (!content) {
    return { title: 'Not Found' };
  }

  const { frontmatter } = content;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: {
      canonical: frontmatter.canonical,
      languages: frontmatter.alternate,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.published_at,
      modifiedTime: frontmatter.updated_at,
      images: frontmatter.hero_image ? [frontmatter.hero_image] : [],
    },
  };
}

// Componente pagina
export default async function ArticlePage({ params }: Props) {
  const content = await getContent(params.lang, 'articles', params.slug);

  if (!content) {
    notFound();
  }

  const { frontmatter, content: htmlContent } = content;

  return (
    <>
      {/* Schema.org JSON-LD */}
      <ArticleJsonLd
        title={frontmatter.title}
        description={frontmatter.description}
        datePublished={frontmatter.published_at}
        dateModified={frontmatter.updated_at}
        url={frontmatter.canonical}
        image={frontmatter.hero_image}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
          <p className="text-xl text-gray-600">{frontmatter.description}</p>
          {frontmatter.published_at && (
            <time className="text-sm text-gray-500">
              {new Date(frontmatter.published_at).toLocaleDateString(params.lang)}
            </time>
          )}
        </header>

        {/* Contenuto HTML dal Markdown */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </>
  );
}
```

---

## 4. Sistema Page Plan: Architettura

### 4.1 Concetto Chiave

Il **Page Plan** è un JSON strutturato che l'agente AI genera per personalizzare la visualizzazione della pagina in base all'intent dell'utente.

**Regole fondamentali:**
1. La pagina SSG/SSR rimane sempre disponibile (fallback SEO)
2. Il Page Plan viene applicato **client-side**
3. L'URL e il canonical **non cambiano mai**
4. I blocchi del Page Plan fanno riferimento a contenuti esistenti (non generati)

### 4.2 Flusso Completo

```
┌──────────────────────────────────────────────────────────────────────┐
│                          FLUSSO PAGE PLAN                             │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  1. RICHIESTA INIZIALE                                               │
│     ┌─────────┐         ┌──────────────┐                             │
│     │ Browser │ ──GET─▶ │  Next.js SSG │ ──▶ HTML completo (SEO)    │
│     └─────────┘         └──────────────┘                             │
│                                                                       │
│  2. UTENTE INTERAGISCE CON CHAT                                      │
│     ┌─────────┐         ┌──────────────┐         ┌──────────┐       │
│     │ Browser │ ──POST─▶│  /api/chat   │ ──────▶ │ LangGraph│       │
│     └─────────┘         └──────────────┘         └──────────┘       │
│                                                        │              │
│                              ┌─────────────────────────┘              │
│                              ▼                                        │
│                    { answer, sources, page_plan }                    │
│                                                                       │
│  3. FRONTEND RICEVE PAGE PLAN                                        │
│     ┌───────────────────────────────────────────────────────┐        │
│     │  React State aggiornato con page_plan                 │        │
│     │  ↓                                                    │        │
│     │  DynamicPage component ri-renderizza con nuovi blocchi│        │
│     │  ↓                                                    │        │
│     │  URL rimane invariato: /it/home                       │        │
│     │  Canonical rimane: /it/home                           │        │
│     └───────────────────────────────────────────────────────┘        │
│                                                                       │
│  4. SE UTENTE FA REFRESH → Torna a pagina SSG originale              │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### 4.3 Struttura JSON del Page Plan

```typescript
// Esempio di Page Plan generato dall'agente
const pagePlan: PagePlan = {
  variant_id: "it_home_intent_pricing",
  blocks: [
    {
      type: "Hero",
      props: {
        headline: "Scopri i nostri piani",
        subheadline: "Soluzioni su misura per ogni esigenza",
        cta: {
          text: "Vedi i prezzi",
          href: "#pricing"
        },
        background: "gradient-blue"
      }
    },
    {
      type: "Features",
      props: {
        title: "Cosa include ogni piano",
        columns: 3
      },
      content_ref: "pricing-features"  // Riferimento a contenuto esistente
    },
    {
      type: "FAQ",
      props: {
        title: "Domande frequenti sui prezzi"
      },
      content_ref: "faq-pricing"  // Carica FAQ specifiche
    },
    {
      type: "CTA",
      props: {
        variant: "prominent",
        title: "Pronto a iniziare?",
        text: "Richiedi un preventivo personalizzato",
        href: "/it/contatti",
        buttonText: "Contattaci"
      }
    }
  ]
};
```

### 4.4 Hook usePagePlan

```typescript
// lib/hooks/usePagePlan.ts
import { create } from 'zustand';
import { PagePlan } from '@/lib/content/types';

interface PagePlanState {
  pagePlan: PagePlan | null;
  isPersonalized: boolean;
  setPagePlan: (plan: PagePlan | null) => void;
  resetToDefault: () => void;
}

export const usePagePlanStore = create<PagePlanState>((set) => ({
  pagePlan: null,
  isPersonalized: false,
  setPagePlan: (plan) => set({
    pagePlan: plan,
    isPersonalized: plan !== null
  }),
  resetToDefault: () => set({
    pagePlan: null,
    isPersonalized: false
  }),
}));

// Hook per usare il page plan nei componenti
export function usePagePlan() {
  const { pagePlan, isPersonalized, setPagePlan, resetToDefault } = usePagePlanStore();

  return {
    pagePlan,
    isPersonalized,
    setPagePlan,
    resetToDefault,
  };
}
```

### 4.5 Componente DynamicPage

```typescript
// components/DynamicPage.tsx
'use client';

import { usePagePlan } from '@/lib/hooks/usePagePlan';
import { PageBlock, ContentItem } from '@/lib/content/types';
import { BlockRenderer } from './blocks';

interface DynamicPageProps {
  // Contenuto statico SSG (sempre presente come fallback)
  staticContent: ContentItem;
  // Blocchi di default della pagina
  defaultBlocks: PageBlock[];
  // Contenuti extra caricabili per i blocchi dinamici
  availableContent?: Record<string, any>;
}

export function DynamicPage({
  staticContent,
  defaultBlocks,
  availableContent = {}
}: DynamicPageProps) {
  const { pagePlan, isPersonalized, resetToDefault } = usePagePlan();

  // Se c'è un page plan, usa quei blocchi; altrimenti usa i default
  const blocksToRender = isPersonalized && pagePlan
    ? pagePlan.blocks
    : defaultBlocks;

  return (
    <main>
      {/* Banner per indicare che la pagina è personalizzata */}
      {isPersonalized && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 text-sm text-blue-700 flex justify-between items-center">
          <span>
            ✨ Pagina personalizzata in base alla tua richiesta
          </span>
          <button
            onClick={resetToDefault}
            className="text-blue-600 hover:underline"
          >
            Torna alla versione standard
          </button>
        </div>
      )}

      {/* Renderizza i blocchi */}
      {blocksToRender.map((block, index) => (
        <BlockRenderer
          key={`${block.type}-${index}`}
          block={block}
          contentMap={availableContent}
        />
      ))}

      {/* Contenuto SEO nascosto (sempre presente per crawler) */}
      {isPersonalized && (
        <div className="sr-only" aria-hidden="true">
          <div dangerouslySetInnerHTML={{ __html: staticContent.content }} />
        </div>
      )}
    </main>
  );
}
```

---

## 5. Componenti Building Blocks

### 5.1 Block Renderer

```typescript
// components/blocks/BlockRenderer.tsx
import { PageBlock } from '@/lib/content/types';
import { Hero } from './Hero';
import { Features } from './Features';
import { FAQ } from './FAQ';
import { CTA } from './CTA';
import { Testimonials } from './Testimonials';
import { CaseStudy } from './CaseStudy';
import { ArticleList } from './ArticleList';
import { Newsletter } from './Newsletter';
import { RichText } from './RichText';

const BLOCK_COMPONENTS: Record<string, React.ComponentType<any>> = {
  Hero,
  Features,
  FAQ,
  CTA,
  Testimonials,
  CaseStudy,
  ArticleList,
  Newsletter,
  RichText,
};

interface BlockRendererProps {
  block: PageBlock;
  contentMap?: Record<string, any>;
}

export function BlockRenderer({ block, contentMap = {} }: BlockRendererProps) {
  const Component = BLOCK_COMPONENTS[block.type];

  if (!Component) {
    console.warn(`Block type "${block.type}" not found`);
    return null;
  }

  // Se c'è un content_ref, carica il contenuto
  const refContent = block.content_ref
    ? contentMap[block.content_ref]
    : undefined;

  return (
    <section data-block-type={block.type} className="py-12">
      <Component {...block.props} content={refContent} />
    </section>
  );
}
```

### 5.2 Esempio: Hero Block

```typescript
// components/blocks/Hero.tsx
import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  headline: string;
  subheadline?: string;
  cta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  image?: string;
  background?: 'white' | 'gray' | 'gradient-blue' | 'gradient-purple';
}

export function Hero({
  headline,
  subheadline,
  cta,
  secondaryCta,
  image,
  background = 'white',
}: HeroProps) {
  const bgClasses: Record<string, string> = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    'gradient-blue': 'bg-gradient-to-br from-blue-600 to-blue-800 text-white',
    'gradient-purple': 'bg-gradient-to-br from-purple-600 to-indigo-800 text-white',
  };

  const isLight = background === 'white' || background === 'gray';

  return (
    <div className={`${bgClasses[background]} py-20 px-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isLight ? 'text-gray-900' : 'text-white'
            }`}>
              {headline}
            </h1>

            {subheadline && (
              <p className={`text-xl mb-8 ${
                isLight ? 'text-gray-600' : 'text-white/90'
              }`}>
                {subheadline}
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              {cta && (
                <Link
                  href={cta.href}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${
                    isLight
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  {cta.text}
                </Link>
              )}

              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className={`px-6 py-3 rounded-lg font-semibold transition border ${
                    isLight
                      ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'border-white/50 text-white hover:bg-white/10'
                  }`}
                >
                  {secondaryCta.text}
                </Link>
              )}
            </div>
          </div>

          {image && (
            <div className="relative h-80 md:h-96">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

### 5.3 Esempio: FAQ Block

```typescript
// components/blocks/FAQ.tsx
'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItem[];
  content?: FAQItem[];  // Contenuto caricato da content_ref
}

export function FAQ({ title, items, content }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Usa items se forniti, altrimenti content da ref
  const faqItems = items || content || [];

  if (faqItems.length === 0) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {title && (
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      )}

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <span className="text-gray-500">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 5.4 Esempio: CTA Block

```typescript
// components/blocks/CTA.tsx
import Link from 'next/link';

interface CTAProps {
  variant?: 'simple' | 'prominent' | 'inline';
  title?: string;
  text?: string;
  buttonText: string;
  href: string;
  secondaryButton?: {
    text: string;
    href: string;
  };
}

export function CTA({
  variant = 'simple',
  title,
  text,
  buttonText,
  href,
  secondaryButton,
}: CTAProps) {
  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-center gap-4 py-8">
        <span className="text-gray-700">{text}</span>
        <Link
          href={href}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {buttonText}
        </Link>
      </div>
    );
  }

  if (variant === 'prominent') {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {title && (
            <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
          )}
          {text && (
            <p className="text-xl text-white/90 mb-8">{text}</p>
          )}
          <div className="flex justify-center gap-4">
            <Link
              href={href}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              {buttonText}
            </Link>
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // variant === 'simple'
  return (
    <div className="max-w-4xl mx-auto px-4 text-center py-12">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      )}
      {text && (
        <p className="text-gray-600 mb-6">{text}</p>
      )}
      <Link
        href={href}
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {buttonText}
      </Link>
    </div>
  );
}
```

---

## 6. Chat Widget: Implementazione

### 6.1 Architettura del Chat

```
┌─────────────────────────────────────────────────────────────┐
│                      CHAT WIDGET                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ ChatWidget (container)                               │   │
│  │  ├── ChatInput (input + button)                      │   │
│  │  ├── ChatMessages (lista messaggi)                   │   │
│  │  │    ├── UserMessage                                │   │
│  │  │    ├── AssistantMessage (con streaming)           │   │
│  │  │    └── ChatSources (link alle fonti)              │   │
│  │  └── ChatActions (CTA suggerite)                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Hooks:                                                      │
│  - useChatStream: gestisce SSE streaming                    │
│  - useChatHistory: gestisce storico messaggi                │
│  - usePagePlan: riceve e applica page plan                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Hook useChatStream

```typescript
// components/chat/useChatStream.ts
import { useState, useCallback, useRef } from 'react';
import { usePagePlan } from '@/lib/hooks/usePagePlan';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  isStreaming?: boolean;
}

interface Source {
  title: string;
  url: string;
  section?: string;
}

interface ChatResponse {
  answer: string;
  sources: Source[];
  intent?: string;
  page_plan?: PagePlan;
}

interface UseChatStreamOptions {
  apiUrl?: string;
  lang: string;
  onPagePlan?: (plan: PagePlan) => void;
}

export function useChatStream({
  apiUrl = '/api/chat',
  lang,
  onPagePlan
}: UseChatStreamOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { setPagePlan } = usePagePlan();

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    // Aggiungi messaggio utente
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage,
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    // Prepara messaggio assistente vuoto per streaming
    const assistantId = `assistant-${Date.now()}`;
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      isStreaming: true,
    };

    setMessages(prev => [...prev, assistantMsg]);

    try {
      // Abort controller per cancellazione
      abortControllerRef.current = new AbortController();

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          lang,
          session_id: getSessionId(),
          history: messages.slice(-10).map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error('Errore nella risposta');
      }

      // Gestisci streaming SSE
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      let sources: Source[] = [];
      let pagePlan: PagePlan | null = null;

      while (reader) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);

            if (data === '[DONE]') {
              continue;
            }

            try {
              const parsed = JSON.parse(data);

              if (parsed.type === 'content') {
                fullContent += parsed.content;
                setMessages(prev =>
                  prev.map(m =>
                    m.id === assistantId
                      ? { ...m, content: fullContent }
                      : m
                  )
                );
              } else if (parsed.type === 'sources') {
                sources = parsed.sources;
              } else if (parsed.type === 'page_plan') {
                pagePlan = parsed.page_plan;
              }
            } catch (e) {
              // Ignora errori di parsing
            }
          }
        }
      }

      // Aggiorna messaggio finale
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: fullContent, sources, isStreaming: false }
            : m
        )
      );

      // Applica page plan se presente
      if (pagePlan) {
        setPagePlan(pagePlan);
        onPagePlan?.(pagePlan);
      }

    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }

      setError('Si è verificato un errore. Riprova.');
      setMessages(prev => prev.filter(m => m.id !== assistantId));
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [apiUrl, lang, messages, isLoading, setPagePlan, onPagePlan]);

  const cancelStream = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const clearHistory = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    cancelStream,
    clearHistory,
  };
}

// Helper per session ID
function getSessionId(): string {
  const key = 'chat_session_id';
  let sessionId = sessionStorage.getItem(key);

  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(key, sessionId);
  }

  return sessionId;
}
```

### 6.3 Componente ChatWidget

```typescript
// components/chat/ChatWidget.tsx
'use client';

import { useState } from 'react';
import { useChatStream } from './useChatStream';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';
import { Language } from '@/lib/content/types';

interface ChatWidgetProps {
  lang: Language;
  placeholder?: string;
  position?: 'header' | 'floating' | 'sidebar';
}

export function ChatWidget({
  lang,
  placeholder,
  position = 'header'
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(position === 'header');

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    cancelStream,
  } = useChatStream({ lang });

  const defaultPlaceholder = lang === 'it'
    ? 'Chiedi qualcosa...'
    : 'Ask something...';

  // Versione header (sempre visibile, compatta)
  if (position === 'header') {
    return (
      <div className="relative">
        <ChatInput
          onSend={sendMessage}
          isLoading={isLoading}
          placeholder={placeholder || defaultPlaceholder}
          compact
        />

        {/* Dropdown con messaggi */}
        {messages.length > 0 && (
          <div className="absolute top-full right-0 mt-2 w-96 max-h-[60vh] bg-white rounded-lg shadow-xl border overflow-hidden z-50">
            <ChatMessages messages={messages} lang={lang} />

            {error && (
              <div className="px-4 py-2 bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Versione floating (bottone + modal)
  if (position === 'floating') {
    return (
      <>
        {/* Bottone floating */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition z-50"
          aria-label={lang === 'it' ? 'Apri chat' : 'Open chat'}
        >
          {isOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <ChatIcon className="w-6 h-6" />
          )}
        </button>

        {/* Modal chat */}
        {isOpen && (
          <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl border flex flex-col z-50">
            <header className="px-4 py-3 border-b flex justify-between items-center">
              <h3 className="font-semibold">
                {lang === 'it' ? 'Assistente' : 'Assistant'}
              </h3>
              <button onClick={() => setIsOpen(false)}>
                <XIcon className="w-5 h-5 text-gray-500" />
              </button>
            </header>

            <div className="flex-1 overflow-hidden">
              <ChatMessages messages={messages} lang={lang} />
            </div>

            {error && (
              <div className="px-4 py-2 bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="p-4 border-t">
              <ChatInput
                onSend={sendMessage}
                isLoading={isLoading}
                placeholder={placeholder || defaultPlaceholder}
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}

// Icone semplici
function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
```

### 6.4 Componente ChatMessages

```typescript
// components/chat/ChatMessages.tsx
import { useEffect, useRef } from 'react';
import { ChatSources } from './ChatSources';
import { Language } from '@/lib/content/types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ title: string; url: string; section?: string }>;
  isStreaming?: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
  lang: Language;
}

export function ChatMessages({ messages, lang }: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll verso il basso
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-gray-500">
        <p className="text-center">
          {lang === 'it'
            ? 'Fai una domanda per iniziare'
            : 'Ask a question to start'}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {/* Contenuto del messaggio */}
            <div className="whitespace-pre-wrap">
              {message.content}
              {message.isStreaming && (
                <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
              )}
            </div>

            {/* Fonti (solo per assistente) */}
            {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
              <ChatSources sources={message.sources} lang={lang} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 6.5 Componente ChatSources

```typescript
// components/chat/ChatSources.tsx
import Link from 'next/link';
import { Language } from '@/lib/content/types';

interface Source {
  title: string;
  url: string;
  section?: string;
}

interface ChatSourcesProps {
  sources: Source[];
  lang: Language;
}

export function ChatSources({ sources, lang }: ChatSourcesProps) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <p className="text-xs text-gray-500 mb-2">
        {lang === 'it' ? 'Fonti:' : 'Sources:'}
      </p>
      <ul className="space-y-1">
        {sources.map((source, index) => (
          <li key={index}>
            <Link
              href={source.url}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>📄</span>
              <span>{source.title}</span>
              {source.section && (
                <span className="text-gray-400">→ {source.section}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 6.6 Componente ChatInput

```typescript
// components/chat/ChatInput.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
  compact?: boolean;
}

export function ChatInput({
  onSend,
  isLoading,
  placeholder = 'Scrivi un messaggio...',
  compact = false
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  // Focus su input quando non è loading
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-64 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>→</span>
          )}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {isLoading ? (
          <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <span>Invia</span>
        )}
      </button>
    </form>
  );
}
```

---

## 7. Gestione Stato e Context

### 7.1 App Context con Zustand

```typescript
// lib/store/appStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, PagePlan } from '@/lib/content/types';

interface AppState {
  // Lingua corrente
  lang: Language;
  setLang: (lang: Language) => void;

  // Page Plan
  pagePlan: PagePlan | null;
  isPersonalized: boolean;
  setPagePlan: (plan: PagePlan | null) => void;
  resetPagePlan: () => void;

  // Chat
  isChatOpen: boolean;
  toggleChat: () => void;

  // UI
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Lingua
      lang: 'it',
      setLang: (lang) => set({ lang }),

      // Page Plan
      pagePlan: null,
      isPersonalized: false,
      setPagePlan: (plan) => set({
        pagePlan: plan,
        isPersonalized: plan !== null
      }),
      resetPagePlan: () => set({
        pagePlan: null,
        isPersonalized: false
      }),

      // Chat
      isChatOpen: false,
      toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

      // UI
      isMenuOpen: false,
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ lang: state.lang }), // Persisti solo la lingua
    }
  )
);
```

### 7.2 Provider per Language

```typescript
// components/providers/LanguageProvider.tsx
'use client';

import { createContext, useContext, useEffect } from 'react';
import { useAppStore } from '@/lib/store/appStore';
import { Language } from '@/lib/content/types';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Traduzioni base per UI
const translations: Record<Language, Record<string, string>> = {
  it: {
    'chat.placeholder': 'Chiedi qualcosa...',
    'chat.send': 'Invia',
    'chat.sources': 'Fonti:',
    'chat.error': 'Si è verificato un errore. Riprova.',
    'nav.home': 'Home',
    'nav.about': 'Chi siamo',
    'nav.contact': 'Contatti',
    'personalized.banner': 'Pagina personalizzata in base alla tua richiesta',
    'personalized.reset': 'Torna alla versione standard',
  },
  en: {
    'chat.placeholder': 'Ask something...',
    'chat.send': 'Send',
    'chat.sources': 'Sources:',
    'chat.error': 'An error occurred. Please try again.',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'personalized.banner': 'Page personalized based on your request',
    'personalized.reset': 'Back to standard version',
  },
};

export function LanguageProvider({
  children,
  initialLang
}: {
  children: React.ReactNode;
  initialLang: Language;
}) {
  const { lang, setLang } = useAppStore();

  // Sincronizza con la lingua della route
  useEffect(() => {
    if (lang !== initialLang) {
      setLang(initialLang);
    }
  }, [initialLang, lang, setLang]);

  const t = (key: string): string => {
    return translations[lang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
```

---

## 8. SEO: Best Practices

### 8.1 Componente JsonLd

```typescript
// components/seo/JsonLd.tsx
import { Language } from '@/lib/content/types';

interface OrganizationJsonLdProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
}

export function OrganizationJsonLd({ name, url, logo, description }: OrganizationJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo && { logo }),
    ...(description && { description }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  url: string;
  image?: string;
  author?: string;
}

export function ArticleJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  url,
  image,
  author = 'Team',
}: ArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(image && { image }),
    author: {
      '@type': 'Person',
      name: author,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQJsonLdProps {
  items: Array<{ question: string; answer: string }>;
}

export function FAQJsonLd({ items }: FAQJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 8.2 Generazione Sitemap

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllContent, getContentSlugs } from '@/lib/content/loader';
import { Language } from '@/lib/content/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
const LANGUAGES: Language[] = ['it', 'en'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Pagine statiche per lingua
  for (const lang of LANGUAGES) {
    // Homepage
    entries.push({
      url: `${BASE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });

    // Pagine
    const pages = await getAllContent(lang, 'pages');
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}${page.frontmatter.canonical}`,
        lastModified: page.frontmatter.updated_at
          ? new Date(page.frontmatter.updated_at)
          : new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }

    // Articoli
    const articles = await getAllContent(lang, 'articles');
    for (const article of articles) {
      entries.push({
        url: `${BASE_URL}${article.frontmatter.canonical}`,
        lastModified: article.frontmatter.updated_at
          ? new Date(article.frontmatter.updated_at)
          : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }

    // FAQ
    entries.push({
      url: `${BASE_URL}/${lang}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
```

### 8.3 Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

### 8.4 Layout con Metadata

```typescript
// app/[lang]/layout.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Language } from '@/lib/content/types';

const LANGUAGES: Language[] = ['it', 'en'];
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

interface Props {
  children: React.ReactNode;
  params: { lang: Language };
}

export async function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params;

  const titles: Record<Language, string> = {
    it: 'Il Tuo Sito Agentico',
    en: 'Your Agentic Website',
  };

  const descriptions: Record<Language, string> = {
    it: 'Descrizione del sito in italiano',
    en: 'Website description in English',
  };

  return {
    title: {
      default: titles[lang],
      template: `%s | ${titles[lang]}`,
    },
    description: descriptions[lang],
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'it': '/it',
        'en': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'it' ? 'it_IT' : 'en_US',
      url: `${BASE_URL}/${lang}`,
      siteName: titles[lang],
    },
  };
}

export default function LangLayout({ children, params }: Props) {
  if (!LANGUAGES.includes(params.lang)) {
    notFound();
  }

  return (
    <LanguageProvider initialLang={params.lang}>
      <Header lang={params.lang} />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer lang={params.lang} />
    </LanguageProvider>
  );
}
```

---

## 9. Multilingua IT/EN

### 9.1 Language Switcher

```typescript
// components/layout/LanguageSwitcher.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Language } from '@/lib/content/types';

interface LanguageSwitcherProps {
  currentLang: Language;
  alternateUrls?: Record<Language, string>;
}

export function LanguageSwitcher({ currentLang, alternateUrls }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const languages: { code: Language; label: string }[] = [
    { code: 'it', label: 'IT' },
    { code: 'en', label: 'EN' },
  ];

  // Genera URL per l'altra lingua
  const getAlternateUrl = (targetLang: Language): string => {
    // Se abbiamo URL alternate specifici (da front-matter)
    if (alternateUrls?.[targetLang]) {
      return alternateUrls[targetLang];
    }

    // Altrimenti, sostituisci solo la lingua nel path
    return pathname.replace(`/${currentLang}`, `/${targetLang}`);
  };

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          {index > 0 && <span className="text-gray-300 mx-1">|</span>}
          {lang.code === currentLang ? (
            <span className="font-semibold text-blue-600">{lang.label}</span>
          ) : (
            <Link
              href={getAlternateUrl(lang.code)}
              className="text-gray-600 hover:text-blue-600 transition"
              hrefLang={lang.code}
            >
              {lang.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
```

### 9.2 Hreflang in Head

```typescript
// components/seo/HreflangTags.tsx
import { Language } from '@/lib/content/types';

interface HreflangTagsProps {
  currentUrl: string;
  alternates?: Record<Language, string>;
}

export function HreflangTags({ currentUrl, alternates }: HreflangTagsProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

  if (!alternates) return null;

  return (
    <>
      {Object.entries(alternates).map(([lang, url]) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${BASE_URL}${url}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}${currentUrl}`}
      />
    </>
  );
}
```

---

## 10. Performance e Ottimizzazioni

### 10.1 Next.js Config Ottimizzato

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output statico per migliori performance
  output: 'standalone',

  // Compressione
  compress: true,

  // Immagini ottimizzate
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 giorni
  },

  // Headers per caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Rewrites per API
  async rewrites() {
    return [
      {
        source: '/api/chat',
        destination: process.env.AI_API_URL + '/api/chat',
      },
    ];
  },
};

module.exports = nextConfig;
```

### 10.2 Lazy Loading dei Blocchi

```typescript
// components/blocks/index.ts
import dynamic from 'next/dynamic';

// Caricamento lazy per blocchi pesanti
export const Hero = dynamic(() => import('./Hero').then(m => m.Hero));
export const Features = dynamic(() => import('./Features').then(m => m.Features));
export const FAQ = dynamic(() => import('./FAQ').then(m => m.FAQ));
export const CTA = dynamic(() => import('./CTA').then(m => m.CTA));
export const Testimonials = dynamic(() => import('./Testimonials').then(m => m.Testimonials), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});
export const CaseStudy = dynamic(() => import('./CaseStudy').then(m => m.CaseStudy), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});
```

### 10.3 Prefetch delle Pagine Correlate

```typescript
// components/PrefetchLinks.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PrefetchLinksProps {
  urls: string[];
}

export function PrefetchLinks({ urls }: PrefetchLinksProps) {
  const router = useRouter();

  useEffect(() => {
    // Prefetch delle pagine correlate dopo il caricamento iniziale
    const timer = setTimeout(() => {
      urls.forEach(url => {
        router.prefetch(url);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [urls, router]);

  return null;
}
```

---

## 11. Esempi di Codice Completi

### 11.1 Homepage con Page Plan Support

```typescript
// app/[lang]/page.tsx
import { Metadata } from 'next';
import { getContent, getAllContent } from '@/lib/content/loader';
import { DynamicPage } from '@/components/DynamicPage';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';
import { Language, PageBlock } from '@/lib/content/types';

interface Props {
  params: { lang: Language };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await getContent(params.lang, 'pages', 'home');

  if (!content) {
    return { title: 'Home' };
  }

  return {
    title: content.frontmatter.title,
    description: content.frontmatter.description,
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = params;

  // Carica contenuto statico
  const homeContent = await getContent(lang, 'pages', 'home');
  const faqContent = await getAllContent(lang, 'faq');
  const articles = await getAllContent(lang, 'articles');

  if (!homeContent) {
    return <div>Contenuto non trovato</div>;
  }

  // Blocchi di default per la homepage
  const defaultBlocks: PageBlock[] = [
    {
      type: 'Hero',
      props: {
        headline: homeContent.frontmatter.title,
        subheadline: homeContent.frontmatter.description,
        cta: {
          text: lang === 'it' ? 'Scopri di più' : 'Learn more',
          href: `/${lang}/chi-siamo`,
        },
        background: 'gradient-blue',
      },
    },
    {
      type: 'Features',
      props: {
        title: lang === 'it' ? 'Le nostre soluzioni' : 'Our solutions',
      },
      content_ref: 'features',
    },
    {
      type: 'FAQ',
      props: {
        title: lang === 'it' ? 'Domande frequenti' : 'FAQ',
      },
      content_ref: 'faq-general',
    },
    {
      type: 'CTA',
      props: {
        variant: 'prominent',
        title: lang === 'it' ? 'Pronto a iniziare?' : 'Ready to start?',
        text: lang === 'it' ? 'Contattaci per una consulenza gratuita' : 'Contact us for a free consultation',
        buttonText: lang === 'it' ? 'Contattaci' : 'Contact us',
        href: `/${lang}/contatti`,
      },
    },
  ];

  // Mappa contenuti disponibili per i blocchi
  const availableContent = {
    'faq-general': faqContent.flatMap(f =>
      // Estrai Q/A dal markdown...
      []
    ),
    'features': {
      // Features estratte dal contenuto...
    },
  };

  return (
    <>
      <OrganizationJsonLd
        name="Il Tuo Brand"
        url={process.env.NEXT_PUBLIC_BASE_URL!}
        description={homeContent.frontmatter.description}
      />

      <DynamicPage
        staticContent={homeContent}
        defaultBlocks={defaultBlocks}
        availableContent={availableContent}
      />
    </>
  );
}
```

### 11.2 Header con Chat

```typescript
// components/layout/Header.tsx
import Link from 'next/link';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Language } from '@/lib/content/types';

interface HeaderProps {
  lang: Language;
}

export function Header({ lang }: HeaderProps) {
  const navItems = {
    it: [
      { label: 'Home', href: '/it' },
      { label: 'Chi siamo', href: '/it/chi-siamo' },
      { label: 'Articoli', href: '/it/articles' },
      { label: 'FAQ', href: '/it/faq' },
      { label: 'Contatti', href: '/it/contatti' },
    ],
    en: [
      { label: 'Home', href: '/en' },
      { label: 'About', href: '/en/about' },
      { label: 'Articles', href: '/en/articles' },
      { label: 'FAQ', href: '/en/faq' },
      { label: 'Contact', href: '/en/contact' },
    ],
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${lang}`} className="font-bold text-xl text-blue-600">
            Brand
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems[lang].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Chat + Language */}
          <div className="flex items-center gap-4">
            {/* Chat Widget */}
            <ChatWidget
              lang={lang}
              position="header"
              placeholder={lang === 'it' ? 'Chiedi...' : 'Ask...'}
            />

            {/* Language Switcher */}
            <LanguageSwitcher currentLang={lang} />
          </div>
        </div>
      </div>
    </header>
  );
}
```

---

## Conclusioni

Questa guida fornisce un'implementazione completa del frontend per un sito web agentico con:

1. **Struttura progetto Next.js** ottimizzata per SSG/SSR
2. **Sistema Page Plan** per personalizzazione dinamica senza compromettere SEO
3. **Building Blocks** modulari e riutilizzabili
4. **Chat Widget** con streaming SSE e integrazione Page Plan
5. **SEO completa**: JSON-LD, sitemap, hreflang, metadata
6. **Multilingua** IT/EN con gestione alternates
7. **Performance** ottimizzate con lazy loading e caching

Il sistema mantiene sempre una **versione canonica stabile** per i crawler, mentre offre **personalizzazione dinamica** per gli utenti reali basata sull'intent rilevato dall'agente AI.

---

*— Fine Documento —*
