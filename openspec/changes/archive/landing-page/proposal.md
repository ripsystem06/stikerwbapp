# Proposal: Landing Page + Visual Quote Configurator

## Intent

Replace the Next.js scaffold with a conversion-oriented landing page for a sticker design/manufacturing company. The primary funnel is a visual quote configurator — not e-commerce. Motorsport/off-road is a KEY specialized vertical, NOT the sole identity. The page MUST appeal equally to businesses, brands, packaging, events, schools, automotive, and individual clients.

## Scope

### In Scope
- 13-section landing page: Hero, Product Selector, Category Nav, Dynamic Quote Form, Quote Summary, WhatsApp Flow, How It Works, Gallery, Motorsport Section, Business Section, Benefits, FAQ, Footer
- Multi-product quote configurator with real-time summary panel/drawer
- Adaptive form: motorsport fields (vehicle brand, model, year) appear ONLY for motorsport/vehicle products
- WhatsApp structured-message generation from quote data
- Framer Motion animations, responsive mobile-first layout, accessible markup
- 16+ reusable components (ProductCard, QuoteSummary, DynamicQuoteForm, FileUploader, WhatsAppQuoteGenerator, etc.)

### Out of Scope
- Cart, payments, user accounts, inventory, admin dashboard, analytics, email, CMS, SSR/API form submission

## Capabilities

### New Capabilities
- `landing-page-sections`: Hero, how-it-works, gallery, benefits, motorsport, business, FAQ, footer
- `quote-configurator`: Product selector with multi-select, adaptive form fields, real-time quote summary
- `whatsapp-quote-flow`: Structured message generation and WhatsApp deep-link submission

### Modified Capabilities
None — greenfield on fresh scaffold.

## Approach

**Server Components** for static sections (Hero, How It Works, Benefits, FAQ, Footer). **Client island** (`QuoteConfiguratorShell`) wraps interactive configurator via React Context + useReducer. Framer Motion `AnimatePresence` for panel transitions. React Hook Form + Zod for validation. Adaptive fields driven by product-to-field mapping config. Tailwind 4 dark theme: orange (`#FF6B00`) primary, neon green + electric blue secondaries.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/app/page.tsx` | Replaced | Full landing page composition |
| `src/app/layout.tsx` | Modified | Metadata, dark theme, fonts |
| `src/components/landing/` | New | 16+ components |
| `src/hooks/` | New | `useQuoteConfigurator`, `useWhatsAppMessage` |
| `src/lib/` | New | Product catalog, WhatsApp template, Zod schemas |
| `public/images/` | New | Placeholder images for gallery and product cards |
| `src/app/globals.css` | Modified | Custom theme tokens |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Motorsport-heavy visuals alienate non-vehicle clients | Medium | Product cards and gallery balance all verticals; business section featured prominently |
| Adaptive form logic grows unwieldy | Medium | Product→field mapping as config object, unit-tested per product type |
| Component count bloats first PR (>400 lines) | High | Slice into chained PRs: foundation → sections → configurator → polish |

## Rollback Plan

Revert `page.tsx` and `layout.tsx` to scaffold defaults. Delete `src/components/landing/`, `src/hooks/`, `src/lib/`. Remove custom tokens from `globals.css`. No database or external services to unwind.

## Dependencies

- `framer-motion`, `react-hook-form`, `@hookform/resolvers`, `zod`, `lucide-react` (all in stack)
- Static placeholder images in `public/` — no external CDN

## Success Criteria

- [ ] All 13 sections render; Lighthouse accessibility ≥ 90
- [ ] Quote configurator supports multi-product selection with real-time summary
- [ ] Motorsport fields appear only for motorsport/vehicle products, never for business/label/packaging
- [ ] WhatsApp deep-link opens with correct structured message for any valid quote
- [ ] Responsive: mobile drawer replaces desktop side panel at <768px
- [ ] Zero e-commerce patterns visible (no cart icon, prices, or checkout)
