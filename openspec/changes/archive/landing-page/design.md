# Design: Landing Page + Visual Quote Configurator

## Technical Approach

Server Components for 8 static sections, one Client island (`QuoteConfiguratorShell`) for the interactive configurator. React Context + useReducer drives state. Framer Motion `AnimatePresence` for panel transitions. React Hook Form + Zod for validation. Config-driven product-to-field mapping gates adaptive fields.

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Server/Client boundary | One Client boundary at `QuoteConfiguratorShell` | Minimizes JS shipped. 8 of 13 sections are static (Hero, HowItWorks, Gallery, Benefits, Motorsport, Business, FAQ, Footer). Only the configurator needs interactivity. |
| State management | React Context + useReducer | Single source of truth for selected products, quote items, form state. No external dep. Discriminated union actions (SELECT, DESELECT, UPDATE_FIELD, CLEAR). |
| Form validation | React Hook Form + Zod resolver | Client-side only; no server endpoint. Inline field errors. Schema validates before WhatsApp submit. |
| Animations | Framer Motion `LazyMotion` with `domAnimation` | Tree-shake features not used. Only `AnimatePresence`, `motion.div`, `LayoutGroup` needed. |
| Product→field mapping | Static config object exported from `src/lib/` | Declarative per-field `appliesTo: ProductCategory[]`. Derivations are pure functions — fully unit-testable without render. |

## Component Tree

```
RootLayout (Server)
├── Header (Server)
└── page.tsx (Server)
    ├── Hero (Server)
    ├── QuoteConfiguratorShell (Client)  ← boundary
    │   ├── CategoryFilter (Client)
    │   ├── ProductSelector (Client) → ProductCard[] (Client)
    │   ├── DynamicQuoteForm (Client)
    │   ├── QuoteSummary (Client)
    │   └── WhatsAppQuoteGenerator (Client)
    ├── HowItWorks, ProjectGallery (Server)
    ├── MotorsportSection, BusinessSection (Server)
    ├── Benefits, FAQ, Footer (Server)
```

**Shared**: `FileUploader` is Client (uses `useRef` for input). Wired into `DynamicQuoteForm`.

## Component Classification

| Component | Type | Justification |
|-----------|------|---------------|
| RootLayout, Header, Footer | Server | Static shell: metadata, nav, links |
| page.tsx | Server | Composes sections; no hooks |
| Hero, HowItWorks, Gallery, MotorsportSection, BusinessSection, Benefits, FAQ | Server | Static content; zero interactivity |
| QuoteConfiguratorShell | Client | Provides Context; wraps all interactive children |
| CategoryFilter, ProductSelector, ProductCard | Client | Click handlers, selection state |
| DynamicQuoteForm | Client | Hook Form, controlled inputs, inline validation |
| QuoteSummary | Client | Derived state, real-time from context |
| WhatsAppQuoteGenerator | Client | onClick handler, message construction |
| FileUploader | Client | useRef for file input |

## Data Flow

```
Product Catalog → ProductSelector
                        │ SELECT/DESELECT
                        ▼
                 useReducer state ──▶ QuoteContext
                        │
              DynamicQuoteForm ◀──── (reads selection)
                   │        │
                   │   field filter: motorsport fields only if motorsport products selected
                   ▼        │
              QuoteSummary ◀─ (derived)
                   │
                   ▼
           WhatsAppQuoteGenerator → wa.me deep-link
```

## Animation Variants

```ts
// Hero entrance
const heroFadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

// Product selection
const cardSelected = { borderColor: "#FF6B00", scale: 1.02 };
const cardUnselected = { borderColor: "transparent", scale: 1 };

// Panel transitions
const panelSlideIn = { hidden: { x: "100%", opacity: 0 }, visible: { x: 0, opacity: 1 } };
const drawerSlideUp = { hidden: { y: "100%" }, visible: { y: 0 }, exit: { y: "100%" } };

// Section reveals (scroll-triggered)
const sectionReveal = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
```

## Data Models / Zod Schemas

```ts
// src/lib/schemas.ts

const ProductCategory = z.enum(["motorsport", "business", "packaging", "events", "other"]);

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: ProductCategory,
  description: z.string(),
  image: z.string(),
});

const QuoteItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1),
  size: z.string().optional(),
  material: z.string().optional(),
  finish: z.string().optional(),
  vehicleBrand: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleYear: z.number().int().optional(),
  designStatus: z.enum(["provided", "needed"]).optional(),
});

const QuoteFormDataSchema = z.object({
  contactName: z.string().min(1, "Este campo es obligatorio"),
  contactPhone: z.string().min(1, "Este campo es obligatorio"),
  contactEmail: z.string().email().optional().or(z.literal("")),
  items: z.array(QuoteItemSchema).min(1, "Seleccioná al menos un producto"),
  notes: z.string().optional(),
});
```

## Product → Field Mapping

`FIELD_MAP` config in `src/lib/field-config.ts`. Each field declares `appliesTo: ProductCategory[]`. Motorsport fields (`vehicleBrand`, `vehicleModel`, `vehicleYear`) gated to `["motorsport"]`. `DynamicQuoteForm` derives visible fields via `getVisibleFields(categories)` — a pure function, unit-testable without render.

## Responsive Strategy

| Breakpoint | Layout |
|------------|--------|
| ≥768px | Scrollable column + QuoteSummary as persistent side panel (320-400px, right) |
| <768px | Full-width single column + QuoteSummary as dismissible bottom drawer |
| <375px | Safe minimum; text reflows, no horizontal scroll |

`layout.tsx` body upgrades from `flex-col` to scroll container. `QuoteSummary` uses `matchMedia` listener to switch panel/drawer.

## Theme Tokens

Tailwind v4 `@theme` in `globals.css`:

```css
@theme inline {
  --color-background: #0a0a0a;
  --color-surface: #1a1a1a;
  --color-surface-alt: #2a2a2a;
  --color-primary: #FF6B00;
  --color-primary-hover: #E55F00;
  --color-accent-neon: #00FF88;
  --color-accent-blue: #0088FF;
  --color-text-primary: #ffffff;
  --color-text-secondary: #a0a0a0;
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

## Open Questions

- [ ] Gallery images: placeholder set vs. real client photos?
- [ ] FAQ: keep as Server (static open) or add Client toggle for accordion?
