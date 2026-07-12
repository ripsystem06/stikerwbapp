# quote-configurator Specification

## Purpose

Interactive quote configurator: multi-product selection with visual card feedback, category filtering, adaptive form fields driven by product type, real-time quote summary, file upload, and mobile bottom drawer. Motorsport fields appear ONLY for motorsport/vehicle products.

## Requirements

| # | Requirement | Strength | Summary |
|---|-------------|----------|---------|
| R1 | Multi-select feedback | MUST | Card border + checkmark toggle on selection |
| R2 | Category filtering | MUST | Filterable by category; non-matching cards hidden |
| R3 | Adaptive form fields | MUST | Motorsport fields ONLY for motorsport/vehicle; NEVER for business/packaging/labels |
| R4 | Real-time summary | MUST | Panel updates within 300ms of any change |
| R5 | Mobile drawer | MUST | Bottom drawer at <768px; side panel at ≥768px |
| R6 | File upload | SHOULD | Image upload per product with design-status option |
| R7 | Form validation | MUST | Inline errors before WhatsApp submission |

### Requirement: Multi-product selection with visual feedback

Product cards MUST toggle states on click/tap. Selected cards SHALL show border accent and checkmark. Deselection MUST clear associated fields and remove the product from the quote summary.

#### Scenario: User selects and deselects a product card

- GIVEN the product selector renders
- WHEN the user taps a "Stickers para Motos" card
- THEN border changes to accent color and a checkmark appears
- AND motorsport form fields appear
- WHEN the user taps the same card again
- THEN the card returns to default state, motorsport fields are removed, and the product is removed from the summary

### Requirement: Adaptive form fields — motorsport gating

Motorsport-specific fields (vehicle brand, model, year) MUST appear ONLY when at least one selected product is motorsport/vehicle. These fields SHALL NEVER appear for business, packaging, or label selections.

#### Scenario: Business-only selection hides motorsport fields

- GIVEN the user selects only "Etiquetas para Negocios" (business)
- WHEN the form renders
- THEN no vehicle brand, model, or year fields are present

#### Scenario: Mixed selection shows motorsport fields

- GIVEN the user selects "Stickers para Motos" AND "Etiquetas para Negocios"
- WHEN the form renders
- THEN motorsport fields (brand, model, year) appear alongside business fields
- AND each product's fields are visually grouped

### Requirement: Real-time quote summary

The summary MUST reflect selection state within 300ms of any change. It SHALL show per-product line items with quantity and selected options.

#### Scenario: User changes a product quantity

- GIVEN a selected product with quantity 50
- WHEN the user changes quantity to 100
- THEN the summary updates within 300ms showing quantity 100

### Requirement: Mobile bottom drawer

Below 768px viewport, the summary MUST render as a dismissible bottom drawer with pull handle. Above 768px, it SHALL render as a persistent side panel.

#### Scenario: Resizing from desktop to mobile

- GIVEN the page at 1024px with side panel summary
- WHEN viewport resizes below 768px
- THEN the side panel becomes a dismissible bottom drawer

### Requirement: Form validation before submission

All required fields — product-specific fields, contact name, and phone — MUST be validated before WhatsApp message generation. Inline errors SHALL appear next to invalid fields and be announced to screen readers.

#### Scenario: Submission blocked on missing fields

- GIVEN a selected product with empty contact name
- WHEN the user taps "Enviar por WhatsApp"
- THEN inline error "Este campo es obligatorio" appears on contact name
- AND the WhatsApp message is not generated
