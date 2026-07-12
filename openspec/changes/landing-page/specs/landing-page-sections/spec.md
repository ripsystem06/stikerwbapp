# landing-page-sections Specification

## Purpose

Defines the static landing-page sections: Hero, How It Works, Gallery, Benefits, Motorsport, Business, FAQ, and Footer. These sections communicate the company's diverse sticker capabilities — motorsport is a specialized vertical, not the sole identity.

## Requirements

| # | Requirement | Strength | Summary |
|---|-------------|----------|---------|
| R1 | Hero diversity | MUST | Show sticker applications across business, events, automotive, packaging, schools, and individuals — not vehicles only |
| R2 | Section rendering | MUST | Render all 13 sections as listed in the proposal scope |
| R3 | Motorsport as subsection | MUST | Present motorsport as a specialized subsection, not the page's dominant visual identity |
| R4 | Business prominence | SHOULD | Feature the business section at equal or greater visual weight than motorsport |
| R5 | No e-commerce | MUST | Display zero e-commerce patterns: no cart icon, prices, or checkout elements |
| R6 | Mobile responsive | MUST | All sections adapt to viewports < 768px without horizontal scroll or content loss |

### Requirement: Hero section shows diverse sticker applications

The Hero section MUST display imagery and copy representing at least four distinct sticker application verticals: business/labels, events/branding, packaging, and automotive/motorsport. Vehicle-only imagery SHALL NOT dominate the hero.

#### Scenario: First-time visitor sees a balanced hero

- GIVEN a first-time visitor lands on the page
- WHEN the hero section renders
- THEN the hero imagery and copy MUST represent at least four distinct verticals (business, events, packaging, automotive)
- AND no single vertical occupies more than 40% of the hero's visual area

### Requirement: Motorsport is a specialized subsection

The Motorsport section MUST be visually contained as one section among equals. It SHALL NOT set the page's color palette, typography, or overall identity. The page's design language MUST work without the motorsport section present.

#### Scenario: Non-motorsport user browses the page

- GIVEN a business-packaging prospect reads the page
- WHEN they scroll through all sections
- THEN the motorsport section appears as one specialized offering among others
- AND the page's identity does not read as "motorsport-first"

### Requirement: Zero e-commerce patterns

The page MUST NOT display any e-commerce UI patterns: cart icons, price tags, "Add to Cart" buttons, checkout flows, or inventory counts.

#### Scenario: Reviewing the page for e-commerce leakage

- GIVEN the full landing page is rendered
- WHEN a reviewer inspects all visible elements
- THEN no cart icon, price display, "Buy Now", or checkout element is present
- AND the primary CTA is "Request a Quote" or equivalent

### Requirement: Mobile responsive all sections

All 13 sections MUST render without horizontal scroll at viewports ≥ 320px. Content SHALL reflow and text SHALL remain readable without zoom.

#### Scenario: Page loads on a 375px mobile viewport

- GIVEN a mobile device with a 375px-wide viewport
- WHEN the page loads
- THEN all sections are visible without horizontal scroll
- AND text is readable at default font size without manual zoom
