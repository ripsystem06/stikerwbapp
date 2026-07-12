# whatsapp-quote-flow Specification

## Purpose

Generates a structured WhatsApp message from the quote configurator state and opens a WhatsApp deep-link for submission. No server-side processing — the message is assembled client-side and sent via the WhatsApp API deep-link.

## Requirements

| # | Requirement | Strength | Summary |
|---|-------------|----------|---------|
| R1 | Structured message generation | MUST | Assemble a human-readable message containing all selected products, quantities, specifications, file references, and contact information |
| R2 | WhatsApp deep-link | MUST | Open `https://wa.me/{number}?text={encoded-message}` in a new tab when user confirms submission |
| R3 | Invalid state guard | MUST | Block message generation when validation errors exist; surface errors before deep-link fires |
| R4 | Message template | SHOULD | Follow a consistent template: greeting, product list with specs, contact info, design status, closing |

### Requirement: Structured WhatsApp message generation

The system MUST generate a WhatsApp message string from the current quote state. The message SHALL include: greeting line, each selected product with quantity and specifications, contact name and phone, design status per product, and any file references. Motorsport products MUST include vehicle brand, model, and year in their line item.

#### Scenario: Multi-product quote generates complete message

- GIVEN the user has selected "Stickers para Motos" (quantity 100, brand Honda, model CRF450, year 2025, design provided) AND "Etiquetas para Negocios" (quantity 500, need design)
- AND the user has filled contact name "María" and phone "+5491112345678"
- WHEN the user taps "Enviar por WhatsApp"
- THEN a new browser tab opens to `https://wa.me/5491112345678?text=...`
- AND the decoded message contains:
  - Greeting
  - "Stickers para Motos — 100 unidades — Honda CRF450 2025 — Diseño propio"
  - "Etiquetas para Negocios — 500 unidades — Necesita diseño"
  - Contact: "María — +5491112345678"

#### Scenario: Message blocked when validation fails

- GIVEN the user has selected a product but left contact phone empty
- WHEN the user taps "Enviar por WhatsApp"
- THEN the WhatsApp deep-link does NOT open
- AND inline validation errors are displayed
- AND the message generation function returns early

### Requirement: WhatsApp deep-link opens correctly

The generated deep-link MUST use the WhatsApp `wa.me` format with the recipient number configured for the business. The message text MUST be URL-encoded. The link SHALL open in a new tab (`target="_blank"`).

#### Scenario: Structured link opens WhatsApp

- GIVEN a complete valid quote with all required fields filled
- WHEN the user confirms submission
- THEN a new tab opens with URL matching `https://wa.me/{business-number}?text={encoded-message}`
- AND the WhatsApp web/desktop client opens with the pre-filled message
