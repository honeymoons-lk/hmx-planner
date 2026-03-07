# Luna Voyages - Website Design Brief (Condensed)

## Design North Star
The website should feel like the digital equivalent of arriving at a quiet luxury romantic resort - calm, intimate, refined and intentional.

Luna Voyages is a premium concierge-led brand designing romantic journeys for:
- Honeymoons
- Babymoons
- Anniversary escapes

It is **not** a booking site or OTA.

The goal of the site is to inspire couples and convert them into a planning conversation.

Primary CTA: **Start Planning**

---

# Brand Positioning

Primary tone: **Quiet Luxury**  
Secondary tone: **Romantic Editorial**

Visual references:
- Aman - https://www.aman.com
- Jacada Travel - https://www.jacadatravel.com
- Black Tomato - https://www.blacktomato.com

The brand should feel:
- refined
- calm
- architectural
- editorial
- romantic

Avoid anything that feels:
- commercial
- tourism-heavy
- busy
- OTA-like

---

# What Luna Voyages Is

A **concierge-led romantic travel design service**.

Couples are not booking trips online.
They are starting a conversation with a travel designer who will craft their journey.

The site should guide visitors toward this conversation.

---

# Why The Site Does Not Show Hotel Lists

Luna Voyages intentionally avoids long hotel lists.

Reasons:

1. **Experience First**
Couples choose the type of journey before the hotel.

Examples:
- tea hills at sunrise
- train journeys through mountains
- private villas by the ocean

Hotels support the story, not the other way around.

2. **Curation Is The Value**
Hotel lists already exist on Booking.com and Expedia.

Luna Voyages provides **taste and curation**.

3. **Every Journey Is Custom**
Hotels depend on:
- travel dates
- pace
- interests
- budget expectations

4. **Luxury Removes Noise**
Luxury experiences simplify choices rather than overwhelm visitors.

---

# Photography Direction

Photography is the primary emotional driver of the design.

Image mix:
- 80% architectural luxury
- 20% subtle couple moments

Focus imagery:
- villas
- infinity pools
- tea estates
- landscapes
- jungle lodges
- ocean settings

Couples imagery should be natural and minimal.

Examples:
- walking on beach
- sunset dinner setup
- train window moments

Important constraint:
Photography will often come from partner hotels. Image quality and color tone may vary.

The design system must maintain a premium feel even with mixed imagery.

Consistency should come from:
- layout
- typography
- spacing
- framing

---

# Image Philosophy

Use **large cinematic imagery**.

Typical layout rhythm:

hero
text block
large image
text block
large image

The page should feel calm and spacious.

Avoid dense image grids.

---

# Typography

Logo direction: Roman-capitals style wordmark using **Cinzel** (uppercase LUNA VOYAGES).

Website typography should feel editorial and elegant.

Headings:
- refined
- dramatic

Body text:
- calm
- readable

---

# Colour Direction

Primary palette:
- warm beige background
- burgundy accent
- soft neutral tones

Photography should carry most visual richness.

Colour usage should remain restrained.

---

# Monogram Usage

The LV monogram should appear sparingly:
- navigation
- footer
- occasional watermark

Avoid overuse.

---

# Website Structure

## Hero
Goal: immediate emotional positioning.

Left: brand message  
Right: concierge planning form (Step 1 equivalent)

Reference: Aman hero composition.

---

## Signature Moments

Introduce the emotional experiences Luna Voyages designs.

Examples:
- tea country mornings
- barefoot dinners by the sea
- train journeys
- private villas

Reference: Black Tomato storytelling sections.

---

## The Kind of Stays We Curate

Show **types of properties**, not hotel lists.

Categories:
- Luxury Beach Resorts
- Boutique Villas
- Tea Estate Stays
- Heritage Properties

Current implementation direction:
- category-led editorial two-column layout
- category navigation + curated property shortlist on the left
- single large preview image panel on the right
- selecting/hovering a property updates the preview panel
- property names are supporting proof, not primary cards

Avoid:
- hotel lists
- pricing
- ratings
- booking buttons
- comparison cards

Reference: Jacada-inspired curated presentation.

---

## Journey Flow

Narrative itinerary + illustrated Sri Lanka route map.

Example route:
Colombo → Cultural Triangle → Tea Country → South Coast

Current implementation direction:
- left column: itinerary narrative blocks (day ranges, short story, one atmosphere image, one stay example)
- right column: stylized Sri Lanka SVG map with route line and stop markers
- active stop highlight updates as user scrolls itinerary blocks

Reference: Jacada trip narrative + route context.

---

## Example Journeys

Sample honeymoon journeys used for inspiration.

These are not fixed packages.

Each example can show:
- duration
- regions visited
- short story description

---

## Concierge Process

Explain planning approach.

Example steps:
- Discover
- Design
- Refine
- Seamless Travel

Reference: Black Tomato process sections.

---

## Hotel Partners

Show trusted luxury brands used in journeys.

Examples:
- Aman
- Resplendent Ceylon
- Teardrop Hotels
- Uga

Purpose: credibility.

---

## FAQ

Address typical questions:
- Is this a booking site?
- Budget expectations
- What happens after enquiry

---

## Final CTA

Large closing section.

"Ready to plan your Sri Lanka honeymoon?"

Primary CTA: **Start Planning**

---

# Planning Funnel Structure (Current)

Primary planning funnel routes:
- `/plan/journey`
- `/plan/details`
- `/plan/contact`
- `/plan/thank-you`

Legacy aliases (redirects):
- `/plan/consultation` -> `/plan/details`
- `/plan/thanks` -> `/plan/thank-you`

Funnel behavior:
- minimal planning header/footer chrome
- premium 3-stage progress tracker on journey/details/contact
- no progress tracker on thank-you

---

# Book a Call Flow (Current)

Separate from planning wizard, lower-friction call path:
- `/book-a-call`
- `/book-a-call/thank-you`

Purpose:
- for users who prefer a short conversation first
- fewer fields than full planning funnel
- concierge-led, human, non-salesy tone

UI direction:
- premium editorial intro with single wide image
- concise "What to expect" content
- short call request form
- dedicated call confirmation page

---

# UI Component Direction

The site is implemented with **shadcn/ui compatible components**.

Components should:
- remain simple
- feel elegant
- avoid SaaS style UI

Buttons, cards and forms should feel premium and restrained.

---

# What The Designer Should Avoid

Avoid design patterns from:
- Booking.com
- Expedia
- TripAdvisor

Specifically avoid:
- hotel comparison layouts
- price grids
- search/filter heavy UI
- startup landing page aesthetics

This is a **luxury hospitality brand**, not a booking marketplace.

---

# What Success Looks Like

When couples land on the homepage they should immediately feel:

"This is exactly the kind of honeymoon we want."
