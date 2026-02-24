export const homeContent = {
  header: {
    brand: "Honeymoons.lk",
    links: [
      { label: "Moments", href: "#moments" },
      { label: "Journey", href: "#flow" },
      { label: "Real Honeymoons", href: "#stories" },
      { label: "Our Approach", href: "#approach" },
    ],
    cta: { label: "Start Planning", href: "/start" },
  },
  hero: {
    kicker: "Sri Lanka Romantic Travel Concierge",
    heading: "Your Sri Lanka romantic escape, handled end-to-end",
    emotionSentence:
      "Tea hills at sunrise. Barefoot dinners by the sea. Quiet villas made just for two.",
    emotionTagline: "Designed around you. Managed by us.",
    testimonials: [
      {
        quote:
          "We felt completely looked after — every detail was seamless from the moment we landed.",
        name: "Emma & Daniel",
        origin: "UK",
      },
      {
        quote:
          "The stays were stunning and the pacing was perfect. It felt effortless the whole way through.",
        name: "Nadia & Aaron",
        origin: "AU",
      },
      {
        quote: "It didn’t feel like a package. It felt like it was built for us.",
        name: "Rhea & Mark",
        origin: "SG",
      },
    ],
    secondaryStrip: {
      label: "Also designing romantic escapes for",
      items: ["Mini-moons", "Anniversary escapes", "Baby-moons"],
    },
  },
  moments: {
    id: "moments",
    eyebrow: "THE MOMENTS WE DESIGN",
    heading: "The highlights your honeymoon will be built around.",
    subcopy: "Not a list of activities. The experiences that shape the story.",
    panels: [
      {
        title: "PRIVATE BEACH DINNERS",
        label: "Beach dinner",
        body: "Sunset. Candlelight. Just the two of you, with the ocean doing the rest.",
        image:
          "https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&w=2200&q=80",
      },
      {
        title: "TEA COUNTRY SLOW MORNINGS",
        label: "Tea country",
        body: "Misty hills, estate breakfasts, and mornings you don’t feel the need to hurry.",
        image:
          "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=2200&q=80",
      },
      {
        title: "SAFARI SUNDOWNERS",
        label: "Safari",
        body: "Private jeeps, golden light, and champagne in the wild.",
        image:
          "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=2200&q=80",
      },
      {
        title: "HERITAGE EVENINGS",
        label: "Heritage",
        body: "Old forts, quiet courtyards, and stories in stone.",
        image:
          "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=2200&q=80",
      },
    ],
  },
  stays: {
    id: "stays",
    eyebrow: "THE KIND OF STAYS WE CURATE",
    heading: "Where you’ll stay — thoughtfully chosen.",
    subcopy: "Chosen for privacy, character, and how they fit your journey.",
    footerNote:
      "We match these to your dates, budget band, and honeymoon style — then handle the details.",
    items: [
      {
        title: "Luxury beach resorts",
        description:
          "Barefoot mornings, private stretches of coast, and sunsets worth dressing up for.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        alt: "Luxury beach resort setting by the coast",
      },
      {
        title: "Boutique villas",
        description: "Intimate stays with personality — often just a handful of rooms.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
        alt: "Boutique villa architecture and pool",
      },
      {
        title: "Tea estate retreats",
        description: "Historic bungalows in the hills, where mist rolls in before breakfast.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        alt: "Tea estate retreat in misty hills",
      },
      {
        title: "Heritage stays",
        description: "Restored courtyards, old-world charm, and a real sense of place.",
        image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba",
        alt: "Heritage stay with restored courtyard design",
      },
    ],
  },
  flow: {
    id: "flow",
    eyebrow: "A TYPICAL SRI LANKA HONEYMOON FLOW",
    heading: "A journey that flows — tailored to you.",
    subcopy: "Balanced pacing, fewer hotel changes, time to actually enjoy it.",
    steps: [
      {
        id: "colombo",
        stop: "Colombo",
        nights: "1 night",
        caption: "Reset after landing. Great food, easy pace.",
      },
      {
        id: "cultural",
        stop: "Cultural Triangle",
        nights: "2–3 nights",
        caption: "Sigiriya, temples, and slow luxury.",
      },
      {
        id: "tea",
        stop: "Tea Country",
        nights: "2 nights",
        caption: "Scenic train + estate mornings.",
      },
      {
        id: "south",
        stop: "South Coast",
        nights: "3–5 nights",
        caption: "Beach time, dinners, and downtime.",
      },
    ],
    note: "We design the route first — then we match stays and moments to fit.",
  },
  partners: {
    id: "partners",
    eyebrow: "TRUSTED SRI LANKAN PARTNERS",
    heading: "The brands we regularly design journeys with.",
    subcopy: "A few names we trust for quality and consistency.",
    logos: [
      "Jetwing",
      "Cinnamon",
      "Aitken Spence",
      "Shangri-La",
      "Anantara",
      "Uga",
      "Resplendent Ceylon",
      "Teardrop Hotels",
      "Dilmah",
      "SriLankan Airlines",
    ],
  },
  stories: {
    id: "stories",
    eyebrow: "REAL HONEYMOONS",
    heading: "Journeys we’ve recently designed.",
    subcopy: "Different styles, different budgets — always personal.",
    caseStudies: [
      {
        couple: "N + A",
        route: "Colombo → Ella → Tangalle",
        budget: "$4,200–$5,000",
        summary: "10 nights: boutique stays, tea trails, and a relaxed beach finale.",
        quote: "Sample itinerary",
      },
      {
        couple: "R + M",
        route: "Sigiriya → Kandy → Galle",
        budget: "$2,800–$3,400",
        summary: "8 nights: culture landmarks plus intimate coastal time.",
        quote: "Sample itinerary",
      },
      {
        couple: "D + S",
        route: "Bentota → Yala → Weligama",
        budget: "$5,500–$6,600",
        summary: "9 nights: villa stays, private safari, and signature dining.",
        quote: "Sample itinerary",
      },
    ],
  },
  approach: {
    id: "approach",
    eyebrow: "OUR APPROACH",
    heading: "Concierge-crafted, not booking-engine complexity.",
    subcopy: "Discovery, design, refinement, then seamless travel.",
    steps: [
      {
        title: "Discovery",
        description: "We learn your pace, priorities, and what matters most to you.",
      },
      {
        title: "Design",
        description: "We craft a route, stays, and moments around you.",
      },
      {
        title: "Refinement",
        description: "We adjust details together until it feels exactly right.",
      },
      {
        title: "Seamless travel",
        description: "We handle bookings, transfers, and on-ground support.",
      },
    ],
  },
  why: {
    id: "why",
    eyebrow: "WHY HONEYMOONS.LK",
    heading: "Sri Lanka honeymoon design, done properly.",
    subcopy: "Local insight, clear guidance, end-to-end handling.",
    objections: [
      {
        question: "Is this just another booking site?",
        answer:
          "No. We don’t send you a catalogue. We design a route around you, then handpick stays and moments that fit.",
      },
      {
        question: "Will it be expensive?",
        answer:
          "Not necessarily. We work within your budget band and explain tradeoffs upfront — so you choose with confidence.",
      },
      {
        question: "What happens once we say yes?",
        answer:
          "We handle bookings, transfers, and on-ground coordination — and you’ll have a real person to contact if plans change.",
      },
    ],
    closing: "Designed around you. Managed by us.",
  },
  finalCta: {
    heading: "Ready to plan your Sri Lanka honeymoon?",
    subcopy:
      "Share your brief and we’ll come back with tailored options within 24–48 hours.",
    primary: "Start Planning",
    secondary: "Explore Our Approach",
  },
  footer: {
    note: "Concierge-crafted Sri Lanka honeymoons for modern couples.",
    links: [
      { label: "About", href: "/about" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact", href: "/contact" },
      { label: "Partner With Us", href: "/partner-with-us" },
      { label: "Privacy", href: "/privacy" },
    ],
    copyright: "© 2026 Honeymoons.lk",
  },
} as const;
