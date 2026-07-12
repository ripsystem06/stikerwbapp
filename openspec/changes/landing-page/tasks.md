# Tasks: Landing Page + Visual Quote Configurator

## Review Workload Forecast

**Estimate**: ~3,300 changed lines. **Risk**: High — well above 800-line budget.

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

**Suggested chain** (6 PRs, feature-branch or stacked):
1. Foundation (~250L): theme, schemas, catalog, field-config, layout → base main
2. Static A (~450L): Header, Hero, ProcessSteps → base PR 1
3. Static B (~450L): Benefits, FAQ, Footer → base PR 2
4. Configurator Core (~700L): context, reducer, shell, filters, cards, selector → base PR 3
5. Quote Form & Summary (~600L): form, uploader, summary, WhatsApp → base PR 4
6. Visual + Polish (~850L): gallery, motorsport, business, wiring, QA, a11y, animation → base PR 5

## Phase 1: Foundation

- [x] 1.1 `src/app/globals.css` — `@theme inline`: dark tokens (background, surface, primary #FF6B00, accents, text, fonts)
- [x] 1.2 `src/app/layout.tsx` — metadata, `<html class="dark">`, Geist fonts via `next/font`, flex-column body
- [x] 1.3 `src/lib/schemas.ts` — `ProductCategory`, `ProductSchema`, `QuoteItemSchema`, `QuoteFormDataSchema` (Zod)
- [x] 1.4 `src/lib/products.ts` — 12–15 products: motorcycles, UTVs, cars, business, packaging, events, school, sports
- [x] 1.5 `src/lib/field-config.ts` — `FIELD_MAP` with `appliesTo`, `getVisibleFields(categories)`; motorsport gated to `["motorsport"]`
- [x] 1.6 `src/lib/whatsapp-template.ts` — `buildWhatsAppMessage()`, `BUSINESS_PHONE`

## Phase 2: Static Sections A

- [x] 2.1 `src/components/landing/Header.tsx` — Server, logo+nav (no cart), sticky+scroll background
- [x] 2.2 `src/components/landing/Hero.tsx` — four verticals, `motion.div` fade-up+stagger, "Solicitar Cotización" CTA
- [x] 2.3 `src/components/landing/ProcessSteps.tsx` — 3-step timeline (Elegí→Completá→Recibí), Lucide, Server

## Phase 3: Static Sections B

- [ ] 3.1 `src/components/landing/Benefits.tsx` — 5–6 icon+text benefit cards, Lucide, Server
- [ ] 3.2 `src/components/landing/FAQ.tsx` — 6–8 static-open accordion items, Server
- [ ] 3.3 `src/components/landing/Footer.tsx` — logo, links (Productos/Empresa/Contacto), social placeholders

## Phase 4: Configurator Core

- [ ] 4.1 `src/hooks/useQuoteConfigurator.ts` — Context+useReducer: SELECT, DESELECT, UPDATE_QUANTITY, UPDATE_FIELD, CLEAR
- [ ] 4.2 `src/components/landing/QuoteConfiguratorShell.tsx` — `"use client"`, `QuoteProvider`, `LazyMotion`+`domAnimation`
- [ ] 4.3 `src/components/landing/CategoryFilter.tsx` — category pills, filter dispatch, active styling
- [ ] 4.4 `src/components/landing/ProductCard.tsx` — image+name+badge, `motion.div` border+checkmark toggle via context
- [ ] 4.5 `src/components/landing/ProductSelector.tsx` — responsive grid `grid-cols-1 sm:2 lg:3`, filtered cards

## Phase 5: Quote Form & Summary

- [ ] 5.1 `src/components/landing/DynamicQuoteForm.tsx` — RHF+zodResolver, `getVisibleFields()` adaptive, motorsport conditional, inline errors
- [ ] 5.2 `src/components/landing/FileUploader.tsx` — `useRef` file input, design-status radio, preview thumbnail
- [ ] 5.3 `src/components/landing/QuoteSummary.tsx` — side panel≥768px/drawer<768px via matchMedia, AnimatePresence
- [ ] 5.4 `src/hooks/useWhatsAppMessage.ts` — encode QuoteFormDataSchema→wa.me URL
- [ ] 5.5 `src/components/landing/WhatsAppQuoteGenerator.tsx` — validate→`window.open(url,"_blank")`, disabled-on-error

## Phase 6: Visual Sections & Integration

- [ ] 6.1 `src/components/landing/ProjectGallery.tsx` — Server, filterable grid, `public/images/gallery/` placeholders
- [ ] 6.2 `src/components/landing/MotorsportSection.tsx` — contained visual weight, specialized subsection
- [ ] 6.3 `src/components/landing/BusinessSection.tsx` — equal/greater prominence, business use cases
- [ ] 6.4 `src/app/page.tsx` — compose Server sections+`QuoteConfiguratorShell` island
- [ ] 6.5 Responsive QA — 375/768/1024/1440px, zero horizontal scroll
- [ ] 6.6 Accessibility — `aria-label`, `aria-live` errors, focus on drawer, keyboard nav
- [ ] 6.7 Animation — `whileInView` reveals, AnimatePresence panel/drawer, 300ms summary budget
