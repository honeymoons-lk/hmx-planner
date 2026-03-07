export const homeContent = {
  header: {
    brand: "LUNA VOYAGES",
    links: [
      { label: "Experiences", href: "#experiences" },
      { label: "The Journey", href: "#the-journey" },
      { label: "Real Honeymoons", href: "#real-honeymoons" },
      { label: "Our Approach", href: "#our-approach" },
    ],
    cta: { label: "Start Planning", href: "/plan/journey" },
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
    id: "experiences",
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
        id: "beach-resorts",
        title: "Luxury Beach Resorts",
        description: "Coastal sanctuaries with polished service and space to exhale.",
        framingLine: "A few places we return to often",
        reassuranceLine: "Chosen to match the rhythm, privacy and atmosphere of your journey.",
        properties: [
          {
            name: "Amanwella",
            location: "Tangalle Coast",
            image:
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80",
            alt: "Ocean-facing luxury beach resort atmosphere on Sri Lanka's southern coast",
          },
          {
            name: "Cape Weligama",
            location: "Southern Coast",
            image:
              "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=2200&q=80",
            alt: "Luxury seaside terrace and coastal horizon at sunset",
          },
          {
            name: "KK Beach",
            location: "Habaraduwa",
            image:
              "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=2200&q=80",
            alt: "Refined coastal resort interiors with warm, relaxed atmosphere",
          },
          {
            name: "Anantara Peace Haven",
            location: "Tangalle",
            image:
              "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2200&q=80",
            alt: "Modern luxury resort pool framed by tropical greenery",
          },
        ],
      },
      {
        id: "boutique-villas",
        title: "Boutique Villas",
        description: "Private, character-filled stays with intimacy and quiet built in.",
        framingLine: "A few places we return to often",
        reassuranceLine: "Chosen for intimacy, character and the feeling of having space of your own.",
        properties: [
          {
            name: "Kahanda Kanda",
            location: "Koggala",
            image:
              "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2200&q=80",
            alt: "Private boutique villa with tropical landscape and architectural character",
          },
          {
            name: "The Last House",
            location: "Tangalle",
            image:
              "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=2200&q=80",
            alt: "Quiet villa suite with warm tones and intimate atmosphere",
          },
          {
            name: "Taru Villas",
            location: "Various Locations",
            image:
              "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=2200&q=80",
            alt: "Boutique villa garden walkway with restrained luxury details",
          },
          {
            name: "Maniumpathy",
            location: "Colombo",
            image:
              "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=80",
            alt: "Elegant heritage-villa blend with calm premium interiors",
          },
        ],
      },
      {
        id: "tea-estate-stays",
        title: "Tea Estate Stays",
        description: "Misty mornings, planter’s bungalows and slower rhythms in the hills.",
        framingLine: "A few places we return to often",
        reassuranceLine: "Chosen for atmosphere, stillness and a slower pace in the highlands.",
        properties: [
          {
            name: "Ceylon Tea Trails",
            location: "Hatton",
            image:
              "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2200&q=80",
            alt: "Tea country bungalow with expansive misty hill views",
          },
          {
            name: "Goatfell",
            location: "Nuwara Eliya",
            image:
              "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2200&q=80",
            alt: "Planter's bungalow lounge with fireplace in the highlands",
          },
          {
            name: "Nine Skies",
            location: "Demodara",
            image:
              "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4c3?auto=format&fit=crop&w=2200&q=80",
            alt: "Tea estate stay with classic interiors and mountain outlook",
          },
          {
            name: "Camellia Hills",
            location: "Dickoya",
            image:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=80",
            alt: "Elegant tea estate veranda with still, cinematic atmosphere",
          },
        ],
      },
      {
        id: "heritage-properties",
        title: "Heritage Properties",
        description: "Old walls, courtyards and storied houses that give the journey depth.",
        framingLine: "A few places we return to often",
        reassuranceLine: "Chosen for character, sense of place and the stories they bring into the journey.",
        properties: [
          {
            name: "Galle Fort Hotel",
            location: "Galle Fort",
            image:
              "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&w=2200&q=80",
            alt: "Historic courtyard setting in a restored heritage property",
          },
          {
            name: "Fort Bazaar",
            location: "Galle Fort",
            image:
              "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=2200&q=80",
            alt: "Refined heritage hotel architecture with warm colonial character",
          },
          {
            name: "Maniumpathy",
            location: "Colombo",
            image:
              "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2200&q=80",
            alt: "Heritage suite with layered textures and calm lighting",
          },
          {
            name: "The Kandy House",
            location: "Kandy",
            image:
              "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=80",
            alt: "Classic Sri Lankan manor architecture in a lush tropical setting",
          },
        ],
      },
    ],
  },
  flow: {
    id: "the-journey",
    eyebrow: "HOW IT FLOWS",
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
    id: "real-honeymoons",
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
    id: "our-approach",
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
    eyebrow: "WHY Luna Voyages",
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
