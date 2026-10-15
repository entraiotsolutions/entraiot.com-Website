/**
 * Central SEO / GEO configuration.
 * Change business details here once and they flow into metadata,
 * JSON-LD schema, sitemap and robots.
 */

export const SITE = {
  url: "https://entraiot.com",
  name: "Entraiot Solutions",
  legalName: "Entraiot Solutions Private Limited",
  locale: "en_IN",
  ogImage: "https://entraiot.com/og-image.jpg",
  logo: "https://entraiot.com/logo.webp",
  email: "bde@entraiot.com",
  phones: ["+91-99444-42061", "+91-81245-45524"],
  address: {
    streetAddress: "W-126, 3rd Floor, 3rd Ave, Anna Nagar",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600040",
    addressCountry: "IN",
  },
  // Approximate coordinates for Anna Nagar, Chennai.
  // TODO: replace with the exact pin from Google Maps (right-click your office > copy lat/long).
  geo: { latitude: 13.085, longitude: 80.2101 },
  mapUrl: "https://maps.app.goo.gl/HBdEEgeaMRjYF2MC6",
  googleProfileUrl: "https://g.co/kgs/dNeJiod",
  sameAs: [
    "https://www.linkedin.com/in/entraiot-solutions-a5a235363/",
    "https://www.instagram.com/entraiotsolutions/",
    "https://github.com/entraiotsolutions",
    "https://www.facebook.com/profile.php?id=61577230558744",
    "https://g.co/kgs/dNeJiod",
    "https://maps.app.goo.gl/HBdEEgeaMRjYF2MC6",
  ],
} as const;

export const absoluteUrl = (path = "/") =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "") || SITE.url;

/** Used by sitemap.ts. Update when page content meaningfully changes. */
export const CONTENT_LAST_UPDATED = "2026-10-15";

export const INDUSTRIES = [
  {
    slug: "logistics",
    name: "Logistics",
    description:
      "IoT-enabled fleet tracking and condition monitoring that keeps goods on time and in optimal condition.",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description:
      "Smart factory solutions to automate production lines, monitor machinery health and reduce operational inefficiencies.",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    description:
      "Personalized services, automated room controls and real-time feedback systems that enhance guest experience.",
  },
  {
    slug: "energy-management",
    name: "Energy Management",
    description:
      "Smart energy monitoring to optimize usage, predict load demand and reduce carbon footprint.",
  },
  {
    slug: "smart-cities",
    name: "Smart Cities",
    description:
      "Traffic flow optimization, smart lighting and waste management for safer, cleaner and more efficient cities.",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description:
      "IoT health modules for remote patient monitoring, real-time alerts and predictive diagnostics.",
  },
  {
    slug: "smart-retail",
    name: "Smart Retail",
    description:
      "Track customer behavior, automate inventory and personalize shopping with intelligent retail solutions.",
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    description:
      "Precision farming with AI-powered sensors to boost yield, conserve water and monitor soil health in real time.",
  },
] as const;
