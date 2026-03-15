export const homeContent = {
  header: {
    brand: "LUNA VOYAGES",
    links: [
      { label: "Experiences", href: "#experiences" },
      { label: "The Journey", href: "#the-journey" },
      { label: "Sample Journeys", href: "#sample-journeys" },
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
      {
        title: "SCENIC TRAIN MOMENTS",
        label: "Hill country rail",
        body: "Windows open, tea slopes rolling by, and the kind of journey that becomes part of the honeymoon itself.",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=80",
      },
      {
        title: "SECLUDED POOLSIDE AFTERNOONS",
        label: "Private villas",
        body: "Quiet hours between plans, a book, a breeze, and nowhere else you need to be.",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2200&q=80",
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
    heading: "Hospitality names we trust with your experience.",
    subcopy: "We are independent planners, but we regularly collaborate with Sri Lanka’s most respected hospitality brands when their properties are the perfect fit for your journey.",
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
    id: "sample-journeys",
    eyebrow: "SAMPLE JOURNEYS",
    heading: "A few journey shapes couples often begin with.",
    subcopy: "These are starting points, not fixed packages. We tailor the pacing, stays, and moments around the two of you.",
    caseStudies: [
      {
        title: "Tea Hills to South Coast",
        duration: "10 nights",
        route: "Colombo → Tea Country → Tangalle",
        mood: "Slow romance with a graceful beach finish",
        stayStyle: "Estate bungalows + beachfront suites",
        summary: "A softly paced honeymoon built around scenic rail, misty mornings, and a final stretch of sea-facing downtime.",
        image:
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2200&q=80",
      },
      {
        title: "Culture to Coast",
        duration: "8 nights",
        route: "Sigiriya → Kandy → Galle",
        mood: "Ancient sites, boutique charm, and ocean evenings",
        stayStyle: "Design-led villas + heritage stays",
        summary: "Ideal for couples who want meaningful landmark moments without losing the calm, intimate feel of the trip.",
        image:
          "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2200&q=80",
      },
      {
        title: "Safari and Villa Escape",
        duration: "9 nights",
        route: "Bentota → Yala → Weligama",
        mood: "Private wildlife moments with a polished coastal close",
        stayStyle: "Riverside villas + clifftop ocean suites",
        summary: "For couples who want nature, privacy, and a stronger sense of occasion woven through the route.",
        image:
          "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=2200&q=80",
      },
    ],
  },
  approach: {
    id: "our-approach",
    eyebrow: "OUR APPROACH",
    heading: "A journey shaped around your pace, managed down to the details.",
    subcopy: "We handle the complexity of Sri Lanka—from shaping the route to securing the bookings—so your only job is to arrive and exhale.",
    steps: [
      {
        title: "Trip Shaping",
        description: "We begin by understanding how you want to feel. Then, we design a custom route that balances iconic moments with quiet, unhurried downtime.",
      },
      {
        title: "Stay Selection",
        description: "Instead of overwhelming you with options, we handpick a few properties chosen for their privacy, atmosphere, and how well they fit the rhythm of your trip.",
      },
      {
        title: "Seamless Booking",
        description: "Once the shape of the journey feels right, we quietly secure every detail—from boutique stays and private guides to the subtle romantic extras.",
      },
      {
        title: "On-Ground Coordination",
        description: "From the moment you land, a private chauffeur guides your route, while our team works behind the scenes to ensure every transition is effortless.",
      },
    ],
  },
  why: {
    id: "why",
    eyebrow: "FAQ / REASSURANCE",
    heading: "Questions couples often ask before we begin.",
    subcopy: "Clear answers on how we work, what we handle, and why it matters.",
    objections: [
      {
        question: "Why use Luna instead of booking Sri Lanka ourselves?",
        answer:
          "Sri Lanka is stunning, but logistically complex. We remove the friction of piecing together routes, vetting boutique stays, and arranging reliable private transport—giving you the space to simply enjoy the journey.",
      },
      {
        question: "Do you handle bookings as well as planning?",
        answer:
          "Yes. We are an end-to-end concierge. Once we design your itinerary, we secure all reservations for your stays, private chauffeur, and curated moments.",
      },
      {
        question: "Do we need to know exactly where we want to go?",
        answer:
          "Not at all. Most couples come to us with just their dates and a sense of the mood they want. We guide you toward the best regions, pacing, and stays for the season.",
      },
      {
        question: "Can you tailor the trip around our pace and preferences?",
        answer:
          "Absolutely. Every journey is built from scratch. Whether you prefer to cover ground and see the icons, or settle into a few slow, luxurious stops, the rhythm of the trip is entirely yours.",
      },
      {
        question: "Can you help with special moments and romantic extras?",
        answer:
          "Yes. From arranging private beach dinners and spa time to quietly ensuring your hotels know it’s a celebration, we handle the subtle details that make the trip feel special.",
      },
      {
        question: "Do you only plan honeymoons?",
        answer:
          "While we specialize in honeymoons, we also design anniversary trips, baby-moons, and highly curated escapes for any couple seeking a premium, unhurried experience.",
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
