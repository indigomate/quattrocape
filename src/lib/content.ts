export const SITE_URL = (
  import.meta.env?.VITE_SITE_URL ||
  (typeof process !== "undefined" ? process.env.VITE_SITE_URL : "") ||
  "https://quattrocape.com"
).replace(/\/$/, "");
export const WHATSAPP = "https://wa.me/27846929334";
export const services = {
  "airport-transfers": {
    name: "Airport pickup",
    label: "Cape Town airport transfers",
    eyebrow: "A calm arrival",
    price: 1000,
    unit: "per pickup",
    title: "Cape Town Airport Transfers | R1,000 | QuattroCape",
    description:
      "Book a private chauffeur pickup from Cape Town International Airport for R1,000. Share your flight and destination, and plan a comfortable arrival with QuattroCape.",
    heading: "Land in Cape Town. Leave the rest to us.",
    intro:
      "From the arrivals hall to your Cape Town destination, make your first journey part of the experience. A private car, your own chauffeur, and a pickup planned around your arrival.",
    image: "/images/services/airport-transfers.png",
    alt: "Airport arrivals setting for a private chauffeur pickup",
    includes: [
      "Private vehicle with a chauffeur",
      "Pickup from Cape Town International Airport",
      "Direct transfer to your agreed destination",
      "Flight and luggage details arranged before travel",
    ],
    details: [
      [
        "Your arrival, planned",
        "Send your flight number, arrival date and time, passenger count, and luggage details. We agree the meeting point with you before your journey.",
      ],
      [
        "From the airport to your stay",
        "Request a transfer to the City Bowl, V&A Waterfront, Sea Point, Camps Bay, or another Cape Town destination. We confirm route coverage and any special requirements before you book.",
      ],
      [
        "One clear pickup price",
        "Airport pickups are R1,000. The route, vehicle suitability, waiting arrangements, and any requested extras are confirmed before you accept the booking.",
      ],
    ],
  },
  "private-day-tours": {
    name: "Daily tour",
    label: "Private Cape Town day tours",
    eyebrow: "The day is yours",
    price: 5000,
    unit: "per day",
    title: "Private Cape Town Day Tours | R5,000 a Day | QuattroCape",
    description:
      "Explore Cape Town with your own chauffeur for R5,000 a day. Plan a private Cape Peninsula, Winelands, or city day tour with QuattroCape.",
    heading: "More Cape Town. At your own pace.",
    intro:
      "An entire day built around what brings you here. Take the coastal road, linger over lunch, or explore the Winelands with your own chauffeur and a private vehicle.",
    image: "/images/services/private-day-tours.png",
    alt: "Cape Town coastal scenery for a private day tour",
    includes: [
      "Private vehicle with a chauffeur for your day",
      "A route planned around your interests",
      "Pickup and return at agreed Cape Town locations",
      "A day itinerary and timings agreed before booking",
    ],
    details: [
      [
        "Cape Peninsula",
        "Plan a coastal day through Camps Bay and Hout Bay, with possible stops along Chapman’s Peak Drive, Cape Point, or Boulders Beach. Your final route depends on opening times, weather, and the agreed schedule.",
      ],
      [
        "Cape Winelands",
        "Explore Stellenbosch or Franschhoek without planning the driving. Tell us which estates or lunch experiences interest you so we can shape a realistic day. Tastings and venue bookings are arranged separately.",
      ],
      [
        "Your own Cape Town",
        "Combine city sights, scenic viewpoints, neighbourhood stops, and time at the V&A Waterfront. Tell us your priorities and we will help put the day together.",
      ],
    ],
  },
} as const;
export type ServiceSlug = keyof typeof services;
export const faqs = [
  [
    "How much is a chauffeur airport pickup in Cape Town?",
    "QuattroCape airport pickups are R1,000 per pickup. Share your flight, destination, passengers, and luggage so we can confirm the arrangements before booking.",
  ],
  [
    "How much does a private Cape Town day tour cost?",
    "A private chauffeur day tour is R5,000 per day. Your itinerary, day length, pickup location, and return arrangements are agreed before booking.",
  ],
  [
    "Is a chauffeur included?",
    "Yes. Both services include a chauffeur and private vehicle. QuattroCape offers chauffeur-driven journeys only; you do not drive the car yourself.",
  ],
  [
    "Are meals, tickets, and wine tastings included?",
    "The advertised price covers the chauffeur and vehicle for the agreed service. Meals, attraction tickets, wine tastings, and other third-party experiences are not included unless expressly agreed in your booking confirmation.",
  ],
  [
    "Can I choose my day-tour itinerary?",
    "Yes. Request a Cape Peninsula route, a Winelands day, a city itinerary, or a combination. We agree a practical route and schedule with you before confirming.",
  ],
  [
    "Does submitting a request confirm my booking?",
    "No. A request lets us check availability and agree your journey details. Your booking is confirmed only when QuattroCape confirms it with you.",
  ],
];
export const homeMeta = {
  title: "Cape Town Chauffeur | Airport R1,000 & Day Tours R5,000",
  description:
    "Discover Cape Town with QuattroCape private chauffeur services. Airport pickups R1,000. Private day tours R5,000 a day. Your car, your chauffeur, your experience.",
};
export function structuredData(slug?: ServiceSlug, siteUrl = SITE_URL) {
  const selected = slug ? [services[slug]] : Object.values(services);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#business`,
        name: "QuattroCape",
        url: siteUrl,
        description:
          "Private chauffeur airport pickups and day tours in Cape Town.",
        areaServed: { "@type": "City", name: "Cape Town" },
        telephone: "+27 84 692 9334",
        image: `${siteUrl}/images/services/private-day-tours.png`,
        priceRange: "R1,000–R5,000",
      },
      ...selected.map((s) => ({
        "@type": "Service",
        name: s.label,
        serviceType: s.name,
        description: s.description,
        provider: { "@id": `${siteUrl}/#business` },
        areaServed: { "@type": "City", name: "Cape Town" },
        offers: {
          "@type": "Offer",
          price: s.price,
          priceCurrency: "ZAR",
          url: `${siteUrl}/${s.name === "Airport pickup" ? "airport-transfers" : "private-day-tours"}`,
          description: `${s.unit}; chauffeur and private vehicle for the agreed service`,
        },
      })),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        })),
      },
      ...(slug
        ? [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteUrl + "/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: services[slug].label,
                  item: `${siteUrl}/${slug}`,
                },
              ],
            },
          ]
        : []),
    ],
  };
}
