export const homeContent = {
  header: {
    brand: "LUNA VOYAGES",
    links: [
      { label: "Experiences", href: "#moments" },
      { label: "How It Flows", href: "#flow" },
      { label: "Real Honeymoons", href: "#stories" },
      { label: "Our Approach", href: "#approach" },
    ],
    cta: { label: "Start Planning", href: "/start" },
  },
  hero: {
    kicker: "Sri Lanka Romantic Travel Concierge",
    heading: "Your Sri Lanka romantic escape, handled end-to-end",
    backgroundImage: "/api/media/hero",
    emotionSentence:
      "Tea hills at sunrise. Barefoot dinners by the sea. Quiet villas made just for two.",
    emotionTagline: "Designed around you. Managed by us.",
    testimonials: [
      {
        quote:
          "We felt completely looked after - every detail was seamless from the moment we landed.",
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
    heading: "The moments your honeymoon will be built around",
    subcopy: "Carefully curated, never off-the-shelf",
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
    heading: "Places made for slow mornings and long evenings.",
    subcopy: "Properties chosen for atmosphere, privacy and character.",
    footerNote:
      "We match these to your dates, budget band, and honeymoon style - then handle the details.",
    items: [
      {
        title: "Luxury Beach Resorts",
        description: "Coastal sanctuaries with polished service and space to exhale.",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80",
        alt: "Luxury beach resort atmosphere by the Sri Lankan coast",
        properties: ["Amanwella", "KK Beach", "Cape Weligama", "Anantara Peace Haven"],
      },
      {
        title: "Boutique Villas",
        description: "Private, character-filled stays with intimacy and quiet built in.",
        image:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2200&q=80",
        alt: "Boutique villa with tropical architecture and private atmosphere",
        properties: ["Kahanda Kanda", "The Last House", "Taru Villas", "Maniumpathy"],
      },
      {
        title: "Tea Estate Stays",
        description: "Misty mornings, planter’s bungalows and slower rhythms in the hills.",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=80",
        alt: "Tea estate hills and bungalow mood in Sri Lanka highlands",
        properties: ["Ceylon Tea Trails", "Goatfell", "Nine Skies", "Camellia Hills"],
      },
      {
        title: "Heritage Properties",
        description: "Old walls, courtyards and storied houses that give the journey depth.",
        image:
          "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=80",
        alt: "Heritage property with historic architecture and warm courtyards",
        properties: ["Galle Fort Hotel", "Fort Bazaar", "Maniumpathy", "The Kandy House"],
      },
    ],
  },
  flow: {
    id: "flow",
    eyebrow: "How It Flows",
    heading: "A sample journey, shaped around your pace.",
    subcopy:
      "Every Luna Voyages trip is custom-designed. This example shows how a well-paced Sri Lanka honeymoon can unfold.",
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
    note: "We design the route first - then we match stays and moments to fit.",
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
    subcopy: "Different styles, different budgets - always personal.",
    caseStudies: [
      {
        couple: "N + A",
        route: "Colombo → Ella → Tangalle",
        pricingTier: "Premium",
        summary: "10 nights: boutique stays, tea trails, and a relaxed beach finale.",
      },
      {
        couple: "R + M",
        route: "Sigiriya → Kandy → Galle",
        pricingTier: "Comfortable",
        summary: "8 nights: culture landmarks plus intimate coastal time.",
      },
      {
        couple: "D + S",
        route: "Bentota → Yala → Weligama",
        pricingTier: "Exceptional",
        summary: "9 nights: villa stays, private safari, and signature dining.",
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
          "Not necessarily. We work within your budget band and explain tradeoffs upfront - so you choose with confidence.",
      },
      {
        question: "What happens once we say yes?",
        answer:
          "We handle bookings, transfers, and on-ground coordination - and you’ll have a real person to contact if plans change.",
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
    copyright: "© 2026 LUNA VOYAGES",
  },
} as const;
